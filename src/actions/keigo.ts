"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeXpResult, XP_REWARDS } from "@/lib/xp";
import { shouldIncrementStreak } from "@/lib/streak";

export async function completeKeigoLesson(
  lessonId: string,
  quizScore: number,
  quizTotal: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  // Check if already completed (don't double-award)
  const existing = await prisma.keigoLessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  const isPerfect = quizScore === quizTotal && quizTotal > 0;
  let xpToAdd = 0;
  let stampsToAdd = 0;

  if (!existing?.completed) {
    xpToAdd = XP_REWARDS.KEIGO_LESSON_COMPLETE;
    stampsToAdd = XP_REWARDS.STAMP_PER_LESSON;
  }
  if (isPerfect) {
    xpToAdd += XP_REWARDS.KEIGO_QUIZ_PERFECT;
  }

  await prisma.keigoLessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: {
      completed: true,
      quizScore,
      quizTotal,
      completedAt: new Date(),
      xpAwarded: xpToAdd,
    },
    create: {
      userId,
      lessonId,
      completed: true,
      quizScore,
      quizTotal,
      completedAt: new Date(),
      xpAwarded: xpToAdd,
    },
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
  revalidatePath("/keigo");

  return result;
}

export async function getKeigoProgress(userId: string) {
  return prisma.keigoLessonProgress.findMany({
    where: { userId, completed: true },
    select: { lessonId: true, quizScore: true, quizTotal: true },
  });
}
