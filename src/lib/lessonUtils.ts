import type { Lesson } from "@/types/lesson";
import type { LearningDiary } from "@/types/learningDiary";
import type { KeigoLesson, LearningDiaryEntry } from "@prisma/client";

export function parseKeigoLesson(row: KeigoLesson): Lesson {
  return {
    id: row.id,
    title: row.title,
    category: row.category as Lesson["category"],
    thumbnail: row.thumbnail,
    dialogue: JSON.parse(row.dialogue),
    grammarPoints: JSON.parse(row.grammarPoints),
    vocab: JSON.parse(row.vocab),
    quiz: JSON.parse(row.quiz),
  };
}

export function parseLearningDiaryEntry(row: LearningDiaryEntry): LearningDiary {
  return {
    id: row.id,
    title: row.title,
    titleKo: row.titleKo,
    category: row.category as LearningDiary["category"],
    level: row.level as LearningDiary["level"],
    thumbnail: row.thumbnail,
    contentJp: JSON.parse(row.contentJp),
    contentKo: row.contentKo,
    vocabulary: JSON.parse(row.vocabulary),
    grammarPoints: JSON.parse(row.grammarPoints),
    quiz: JSON.parse(row.quiz),
  };
}
