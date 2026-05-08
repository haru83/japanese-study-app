"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeXpResult, XP_REWARDS } from "@/lib/xp";
import { shouldIncrementStreak } from "@/lib/streak";

export async function completeLearningDiary(
  diaryId: string,
  quizScore: number,
  quizTotal: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const existing = await prisma.learningDiaryProgress.findUnique({
    where: { userId_diaryId: { userId, diaryId } },
  });

  const isPerfect = quizScore === quizTotal && quizTotal > 0;
  let xpToAdd = 0;
  let stampsToAdd = 0;

  if (!existing) {
    xpToAdd = XP_REWARDS.LEARNING_DIARY_COMPLETE;
    stampsToAdd = XP_REWARDS.STAMP_PER_LESSON;
  }
  if (isPerfect) {
    xpToAdd += XP_REWARDS.LEARNING_DIARY_QUIZ_PERFECT;
  }

  await prisma.learningDiaryProgress.upsert({
    where: { userId_diaryId: { userId, diaryId } },
    update: { quizScore, quizTotal, completedAt: new Date(), xpAwarded: xpToAdd },
    create: { userId, diaryId, quizScore, quizTotal, xpAwarded: xpToAdd },
  });

  if (xpToAdd === 0) {
    return { xpGained: 0, stampsGained: 0, newXp: 0, newLevel: 1, leveledUp: false };
  }

  const result = await prisma.$transaction(async (tx) => {
    const userProgress = await tx.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);
    const incrementStreak = shouldIncrementStreak(userProgress.lastStudyAt);

    await tx.userProgress.update({
      where: { userId },
      data: {
        xp: result.newXp,
        level: result.newLevel,
        totalStamps: { increment: stampsToAdd },
        lastStudyAt: new Date(),
        ...(incrementStreak ? { streakDays: { increment: 1 } } : {}),
      },
    });

    return result;
  });

  revalidatePath("/profile");
  revalidatePath("/home");
  revalidatePath("/diary/learn");

  return result;
}

export async function getCompletedLearningDiaries(): Promise<string[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const records = await prisma.learningDiaryProgress.findMany({
    where: { userId: session.user.id },
    select: { diaryId: true },
  });

  return records.map((r) => r.diaryId);
}
