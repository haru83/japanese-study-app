// src/actions/stats.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export interface UserStats {
  completedKeigo: number;
  completedDiary: number;
  totalCompleted: number;
  keigoAccuracy: number | null;
  diaryAccuracy: number | null;
  vocabTotal: number;
  vocabMastered: number;
  vocabDueToday: number;
}

export async function getUserStats(): Promise<UserStats | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const [keigoProgress, diaryProgress, vocabTotal, vocabMastered, vocabDueToday] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true },
      select: { quizScore: true, quizTotal: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { quizScore: true, quizTotal: true },
    }),
    prisma.vocabReview.count({ where: { userId } }),
    prisma.vocabReview.count({ where: { userId, tier: 4 } }),
    prisma.vocabReview.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
  ]);

  function calcAccuracy(
    rows: Array<{ quizScore: number | null; quizTotal: number | null }>
  ): number | null {
    const valid = rows.filter((r) => r.quizTotal && r.quizTotal > 0);
    if (valid.length === 0) return null;
    const total = valid.reduce((sum, r) => sum + (r.quizScore ?? 0), 0);
    const max = valid.reduce((sum, r) => sum + (r.quizTotal ?? 0), 0);
    return max === 0 ? null : Math.round((total / max) * 100);
  }

  return {
    completedKeigo: keigoProgress.length,
    completedDiary: diaryProgress.length,
    totalCompleted: keigoProgress.length + diaryProgress.length,
    keigoAccuracy: calcAccuracy(keigoProgress),
    diaryAccuracy: calcAccuracy(diaryProgress),
    vocabTotal,
    vocabMastered,
    vocabDueToday,
  };
}
