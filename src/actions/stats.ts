"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { selectWordOfTheDay, type WotdEntry, type VocabItem } from "@/lib/wotd-logic";

export interface UserStats {
  completedKeigo: number;
  completedDiary: number;
  writtenDiaries: number;
  completedLearningDiaries: number;
  totalCompleted: number;
  keigoAccuracy: number | null;
  diaryAccuracy: number | null;
  vocabTotal: number;
  vocabMastered: number;
  vocabDueToday: number;
}

export interface LearningProgress {
  /** 경어 레슨 */
  keigoTotal: number;
  keigoCompleted: number;
  keigoNextId: string | null;
  keigoNextTitle: string | null;
  /** 학습 일기 */
  learningDiaryTotal: number;
  learningDiaryCompleted: number;
  learningDiaryNextId: string | null;
  learningDiaryNextTitle: string | null;
  /** 작성 일기 */
  writtenDiaries: number;
  /** 복습 */
  vocabTotal: number;
  vocabMastered: number;
  vocabDueToday: number;
  /** 스트릭 */
  streakDays: number;
  lastStudyAt: Date | null;
}

export async function getUserStats(): Promise<UserStats | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const [keigoProgress, diaryProgress, writtenDiaries, vocabTotal, vocabMastered, vocabDueToday] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true },
      select: { quizScore: true, quizTotal: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { quizScore: true, quizTotal: true },
    }),
    prisma.diary.count({
      where: { userId },
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
    writtenDiaries,
    completedLearningDiaries: diaryProgress.length,
    totalCompleted: keigoProgress.length + diaryProgress.length,
    keigoAccuracy: calcAccuracy(keigoProgress),
    diaryAccuracy: calcAccuracy(diaryProgress),
    vocabTotal,
    vocabMastered,
    vocabDueToday,
  };
}

/** 홈 대시보드용 — 다음 학습 위치 포함 */
export async function getLearningProgress(): Promise<LearningProgress | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const [
    keigoTotal,
    keigoCompletedRows,
    learningDiaryTotal,
    learningDiaryCompletedRows,
    writtenDiaries,
    vocabTotal,
    vocabMastered,
    vocabDueToday,
    userProgress,
  ] = await Promise.all([
    prisma.keigoLesson.count({ where: { isActive: true } }),
    prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    }),
    prisma.learningDiaryEntry.count({ where: { isActive: true } }),
    prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { diaryId: true },
    }),
    prisma.diary.count({ where: { userId } }),
    prisma.vocabReview.count({ where: { userId } }),
    prisma.vocabReview.count({ where: { userId, tier: 4 } }),
    prisma.vocabReview.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
    prisma.userProgress.findUnique({ where: { userId } }),
  ]);

  const completedKeigoIds = new Set(keigoCompletedRows.map((r) => r.lessonId));
  const completedDiaryIds = new Set(learningDiaryCompletedRows.map((r) => r.diaryId));

  // 다음 경어 레슨 찾기
  const nextKeigo = await prisma.keigoLesson.findFirst({
    where: { isActive: true, id: { notIn: Array.from(completedKeigoIds) } },
    orderBy: { sortOrder: "asc" },
    select: { id: true, title: true },
  });

  // 다음 학습 일기 찾기
  const nextDiary = await prisma.learningDiaryEntry.findFirst({
    where: { isActive: true, id: { notIn: Array.from(completedDiaryIds) } },
    orderBy: { sortOrder: "asc" },
    select: { id: true, title: true },
  });

  return {
    keigoTotal,
    keigoCompleted: keigoCompletedRows.length,
    keigoNextId: nextKeigo?.id ?? null,
    keigoNextTitle: nextKeigo?.title ?? null,
    learningDiaryTotal,
    learningDiaryCompleted: learningDiaryCompletedRows.length,
    learningDiaryNextId: nextDiary?.id ?? null,
    learningDiaryNextTitle: nextDiary?.title ?? null,
    writtenDiaries,
    vocabTotal,
    vocabMastered,
    vocabDueToday,
    streakDays: userProgress?.streakDays ?? 0,
    lastStudyAt: userProgress?.lastStudyAt ?? null,
  };
}

export async function getWordOfTheDay(): Promise<WotdEntry | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const now = new Date();

  const [keigoLessons, learningDiaries] = await Promise.all([
    prisma.keigoLesson.findMany({
      where: { isActive: true },
      select: { id: true, vocab: true },
    }),
    prisma.learningDiaryEntry.findMany({
      where: { isActive: true },
      select: { id: true, vocabulary: true },
    }),
  ]);

  const keigoVocab: VocabItem[] = keigoLessons.flatMap((lesson) => {
    try {
      const parsed = JSON.parse(lesson.vocab) as Array<{ word: string; reading?: string; meaning: string }>;
      return parsed;
    } catch {
      return [];
    }
  });

  const diaryVocab: VocabItem[] = learningDiaries.flatMap((diary) => {
    try {
      const parsed = JSON.parse(diary.vocabulary) as Array<{ word: string; reading?: string; meaning: string }>;
      return parsed;
    } catch {
      return [];
    }
  });

  return selectWordOfTheDay(now, keigoVocab, diaryVocab);
}
