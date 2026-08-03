"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateFSRS } from "@/lib/review-logic";
import { incrementChallengeProgress } from "@/actions/dailyChallenge";

export interface ReviewItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  source: string;
  itemType: string;
  tier: number;
}

export async function addVocabToReview(
  userId: string,
  vocab: Array<{ word: string; reading?: string; meaning: string; itemType?: string }>,
  source: string
): Promise<void> {
  if (vocab.length === 0) return;

  await Promise.all(
    vocab.map((v) =>
      prisma.vocabReview.upsert({
        where: { userId_word_itemType: { userId, word: v.word, itemType: v.itemType ?? "vocab" } },
        create: {
          userId,
          word: v.word,
          reading: v.reading ?? "",
          meaning: v.meaning,
          source,
          itemType: v.itemType ?? "vocab",
        },
        update: {},
      })
    )
  );
}

export async function getReviewItems(): Promise<ReviewItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const now = new Date();
  const items = await prisma.vocabReview.findMany({
    where: {
      userId: session.user.id,
      nextReviewAt: { lte: now },
      itemType: "vocab",
    },
    orderBy: { nextReviewAt: "asc" },
    take: 20,
    select: { id: true, word: true, reading: true, meaning: true, source: true, tier: true, itemType: true },
  });

  return items;
}

// Server-side only — caller must validate and pass authenticated userId
export async function getDistractors(
  userId: string,
  excludeWord: string,
  count: number
): Promise<string[]> {
  const pool = await prisma.vocabReview.findMany({
    where: { userId, word: { not: excludeWord }, itemType: "vocab" },
    select: { meaning: true },
    take: 50,
  });

  const meanings = [...new Set(pool.map((p) => p.meaning))];
  const shuffled = meanings.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function submitReview(reviewId: string, correct: boolean): Promise<void> {
  return submitReviewWithRating(reviewId, correct ? 3 : 1);
}

export async function submitReviewWithRating(reviewId: string, rating: 1 | 2 | 3 | 4): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const item = await prisma.vocabReview.findUnique({
    where: { id: reviewId },
    select: { userId: true, tier: true, reviewCount: true, updatedAt: true },
  });

  if (!item || item.userId !== session.user.id) return;

  const state = {
    stability: Math.max(0.4, item.tier * 2.5 || 0.4),
    difficulty: 5.0,
    reps: item.reviewCount,
    lapses: 0,
    lastReviewAt: item.updatedAt,
  };

  const fsrs = calculateFSRS(state, rating);
  const newTier = Math.min(4, Math.max(0, Math.floor(fsrs.stability / 2.5)));

  await prisma.vocabReview.update({
    where: { id: reviewId },
    data: {
      tier: newTier,
      nextReviewAt: fsrs.nextReviewAt,
      reviewCount: { increment: 1 },
    },
  });

  await incrementChallengeProgress("REVIEW", 1);
}
