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

  const userId = session.user.id;

  const [keigoLessons, diaryEntries] = await Promise.all([
    prisma.keigoLesson.findMany({
      where: {
        isActive: true,
        id: {
          in: await prisma.keigoLessonProgress.findMany({
            where: {
              userId: userId,
              completed: true,
            },
            select: { lessonId: true },
          }).then(p => p.map(d => d.lessonId)),
        },
      },
      select: { title: true, grammarPoints: true },
    }),
    prisma.learningDiaryEntry.findMany({
      where: {
        isActive: true,
        id: {
          in: await prisma.learningDiaryProgress.findMany({
            where: { userId: userId },
            select: { diaryId: true },
          }).then(p => p.map(d => d.diaryId)),
        },
      },
      select: { title: true, grammarPoints: true },
    }),
  ]);

  const seen = new Set<string>();
  const result: GrammarPoint[] = [];

  for (const lesson of keigoLessons) {
    try {
      const gps = JSON.parse(lesson.grammarPoints) as Array<{ rule: string; explanation: string }>;
      for (const gp of gps) {
        if (!seen.has(gp.rule)) {
          seen.add(gp.rule);
          result.push({ rule: gp.rule, explanation: gp.explanation, source: lesson.title });
        }
      }
    } catch (e) {
      console.error(`Error parsing grammarPoints for lesson ${lesson.title}:`, e);
    }
  }

  for (const diary of diaryEntries) {
    try {
      const gps = JSON.parse(diary.grammarPoints) as Array<{ rule: string; explanation: string }>;
      for (const gp of gps) {
        if (!seen.has(gp.rule)) {
          seen.add(gp.rule);
          result.push({ rule: gp.rule, explanation: gp.explanation, source: diary.title });
        }
      }
    } catch (e) {
      console.error(`Error parsing grammarPoints for diary ${diary.title}:`, e);
    }
  }

  return result;
}

export async function getCompletedVocab(): Promise<VocabItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const userId = session.user.id;

  const [keigoLessons, diaryEntries] = await Promise.all([
    prisma.keigoLesson.findMany({
      where: {
        isActive: true,
        id: {
          in: await prisma.keigoLessonProgress.findMany({
            where: {
              userId: userId,
              completed: true,
            },
            select: { lessonId: true },
          }).then(p => p.map(d => d.lessonId)),
        },
      },
      select: { title: true, vocab: true },
    }),
    prisma.learningDiaryEntry.findMany({
      where: {
        isActive: true,
        id: {
          in: await prisma.learningDiaryProgress.findMany({
            where: { userId: userId },
            select: { diaryId: true },
          }).then(p => p.map(d => d.diaryId)),
        },
      },
      select: { title: true, vocabulary: true },
    }),
  ]);

  const seen = new Set<string>();
  const result: VocabItem[] = [];

  for (const lesson of keigoLessons) {
    try {
      const vocab = JSON.parse(lesson.vocab) as Array<{ word: string; reading: string; meaning: string }>;
      for (const v of vocab) {
        if (!seen.has(v.word)) {
          seen.add(v.word);
          result.push({ word: v.word, reading: v.reading, meaning: v.meaning, source: lesson.title });
        }
      }
    } catch (e) {
      console.error(`Error parsing vocab for lesson ${lesson.title}:`, e);
    }
  }

  for (const diary of diaryEntries) {
    try {
      const vocabulary = JSON.parse(diary.vocabulary) as Array<{ word: string; reading: string; meaning: string }>;
      for (const v of vocabulary) {
        if (!seen.has(v.word)) {
          seen.add(v.word);
          result.push({ word: v.word, reading: v.reading, meaning: v.meaning, source: diary.title });
        }
      }
    } catch (e) {
      console.error(`Error parsing vocabulary for diary ${diary.title}:`, e);
    }
  }

  return result;
}
