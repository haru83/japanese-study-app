"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeNewTier, getNextReviewMs } from "@/lib/review-logic";

export interface ReviewItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  source: string;
  tier: number;
}

export async function addVocabToReview(
  userId: string,
  vocab: Array<{ word: string; reading?: string; meaning: string }>,
  source: string
): Promise<void> {
  if (vocab.length === 0) return;

  await Promise.all(
    vocab.map((v) =>
      prisma.vocabReview.upsert({
        where: { userId_word: { userId, word: v.word } },
        create: {
          userId,
          word: v.word,
          reading: v.reading ?? "",
          meaning: v.meaning,
          source,
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
    },
    orderBy: { nextReviewAt: "asc" },
    take: 20,
    select: { id: true, word: true, reading: true, meaning: true, source: true, tier: true },
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
    where: { userId, word: { not: excludeWord } },
    select: { meaning: true },
    take: 50,
  });

  const meanings = [...new Set(pool.map((p) => p.meaning))];
  const shuffled = meanings.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function submitReview(reviewId: string, correct: boolean): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const item = await prisma.vocabReview.findUnique({
    where: { id: reviewId },
    select: { userId: true, tier: true },
  });

  if (!item || item.userId !== session.user.id) return;

  const newTier = computeNewTier(item.tier, correct);
  const nextMs = getNextReviewMs(newTier);

  await prisma.vocabReview.update({
    where: { id: reviewId },
    data: {
      tier: newTier,
      nextReviewAt: new Date(Date.now() + nextMs),
      reviewCount: { increment: 1 },
    },
  });
}
