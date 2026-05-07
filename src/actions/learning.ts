"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type GrammarPoint = {
  rule: string;
  explanation: string;
  source: string;
};

export type VocabItem = {
  word: string;
  reading: string;
  meaning: string;
  source: string;
};

export async function getCompletedGrammarPoints(): Promise<GrammarPoint[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const [keigoProgress, diaryProgress] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId: session.user.id, completed: true },
      select: { lessonId: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId: session.user.id },
      select: { diaryId: true },
    }),
  ]);

  const completedLessonIds = keigoProgress.map((p) => p.lessonId);
  const completedDiaryIds = diaryProgress.map((p) => p.diaryId);

  const [keigoLessons, diaryEntries] = await Promise.all([
    completedLessonIds.length > 0
      ? prisma.keigoLesson.findMany({
          where: { id: { in: completedLessonIds }, isActive: true },
          select: { title: true, grammarPoints: true },
        })
      : Promise.resolve([]),
    completedDiaryIds.length > 0
      ? prisma.learningDiaryEntry.findMany({
          where: { id: { in: completedDiaryIds }, isActive: true },
          select: { title: true, grammarPoints: true },
        })
      : Promise.resolve([]),
  ]);

  const seen = new Set<string>();
  const result: GrammarPoint[] = [];

  for (const lesson of keigoLessons) {
    const gps = JSON.parse(lesson.grammarPoints) as Array<{ rule: string; explanation: string }>;
    for (const gp of gps) {
      if (!seen.has(gp.rule)) {
        seen.add(gp.rule);
        result.push({ rule: gp.rule, explanation: gp.explanation, source: lesson.title });
      }
    }
  }

  for (const diary of diaryEntries) {
    const gps = JSON.parse(diary.grammarPoints) as Array<{ rule: string; explanation: string }>;
    for (const gp of gps) {
      if (!seen.has(gp.rule)) {
        seen.add(gp.rule);
        result.push({ rule: gp.rule, explanation: gp.explanation, source: diary.title });
      }
    }
  }

  return result;
}

export async function getCompletedVocab(): Promise<VocabItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const [keigoProgress, diaryProgress] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId: session.user.id, completed: true },
      select: { lessonId: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId: session.user.id },
      select: { diaryId: true },
    }),
  ]);

  const completedLessonIds = keigoProgress.map((p) => p.lessonId);
  const completedDiaryIds = diaryProgress.map((p) => p.diaryId);

  const [keigoLessons, diaryEntries] = await Promise.all([
    completedLessonIds.length > 0
      ? prisma.keigoLesson.findMany({
          where: { id: { in: completedLessonIds }, isActive: true },
          select: { title: true, vocab: true },
        })
      : Promise.resolve([]),
    completedDiaryIds.length > 0
      ? prisma.learningDiaryEntry.findMany({
          where: { id: { in: completedDiaryIds }, isActive: true },
          select: { title: true, vocabulary: true },
        })
      : Promise.resolve([]),
  ]);

  const seen = new Set<string>();
  const result: VocabItem[] = [];

  for (const lesson of keigoLessons) {
    const vocab = JSON.parse(lesson.vocab) as Array<{ word: string; reading: string; meaning: string }>;
    for (const v of vocab) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        result.push({ word: v.word, reading: v.reading, meaning: v.meaning, source: lesson.title });
      }
    }
  }

  for (const diary of diaryEntries) {
    const vocabulary = JSON.parse(diary.vocabulary) as Array<{ word: string; reading: string; meaning: string }>;
    for (const v of vocabulary) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        result.push({ word: v.word, reading: v.reading, meaning: v.meaning, source: diary.title });
      }
    }
  }

  return result;
}
