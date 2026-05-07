"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { lessons } from "@/data/lessons";
import { learningDiaries } from "@/data/learningDiaries";
import { VOCAB_READINGS } from "@/data/vocabReadings";

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

  const completedLessonIds = new Set(keigoProgress.map((p) => p.lessonId));
  const completedDiaryIds = new Set(diaryProgress.map((p) => p.diaryId));

  const seen = new Set<string>();
  const result: GrammarPoint[] = [];

  for (const lesson of lessons) {
    if (!completedLessonIds.has(lesson.id)) continue;
    for (const gp of lesson.grammarPoints) {
      if (!seen.has(gp.rule)) {
        seen.add(gp.rule);
        result.push({ rule: gp.rule, explanation: gp.explanation, source: lesson.title });
      }
    }
  }

  for (const diary of learningDiaries) {
    if (!completedDiaryIds.has(diary.id)) continue;
    for (const gp of diary.grammarPoints) {
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

  const completedLessonIds = new Set(keigoProgress.map((p) => p.lessonId));
  const completedDiaryIds = new Set(diaryProgress.map((p) => p.diaryId));

  const seen = new Set<string>();
  const result: VocabItem[] = [];

  for (const lesson of lessons) {
    if (!completedLessonIds.has(lesson.id)) continue;
    for (const v of lesson.vocab) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        result.push({
          word: v.word,
          reading: VOCAB_READINGS[v.word] ?? "",
          meaning: v.meaning,
          source: lesson.title,
        });
      }
    }
  }

  for (const diary of learningDiaries) {
    if (!completedDiaryIds.has(diary.id)) continue;
    for (const v of diary.vocabulary) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        result.push({
          word: v.word,
          reading: v.reading,
          meaning: v.meaning,
          source: diary.title,
        });
      }
    }
  }

  return result;
}
