import { PrismaClient } from "@prisma/client";
import { lessons } from "../src/data/lessons";
import { learningDiaries } from "../src/data/learningDiaries";
import { VOCAB_READINGS } from "../src/data/vocabReadings";

const prisma = new PrismaClient();

async function main() {
  console.log("🌸 100개 경어 레슨 & 100개 학습 일기 시딩 시작...");

  // ── Keigo Lessons (100개) ───────────────────────────────────────────────────
  console.log(`  Upserting ${lessons.length} keigo lessons...`);
  for (const [i, lesson] of lessons.entries()) {
    const enrichedVocab = lesson.vocab.map((v) => ({
      word: v.word,
      reading: (v as Record<string, unknown>).reading || VOCAB_READINGS[v.word] || "",
      meaning: v.meaning,
    }));

    await prisma.keigoLesson.upsert({
      where: { id: lesson.id },
      update: {
        title: lesson.title,
        category: lesson.category,
        thumbnail: lesson.thumbnail,
        dialogue: JSON.stringify(lesson.dialogue),
        grammarPoints: JSON.stringify(lesson.grammarPoints),
        vocab: JSON.stringify(enrichedVocab),
        quiz: JSON.stringify(lesson.quiz),
        sortOrder: i + 1,
      },
      create: {
        id: lesson.id,
        title: lesson.title,
        category: lesson.category,
        thumbnail: lesson.thumbnail,
        dialogue: JSON.stringify(lesson.dialogue),
        grammarPoints: JSON.stringify(lesson.grammarPoints),
        vocab: JSON.stringify(enrichedVocab),
        quiz: JSON.stringify(lesson.quiz),
        sortOrder: i + 1,
      },
    });
  }
  console.log("  ✓ Keigo lessons 100개 완료");

  // ── Learning Diaries (100개) ───────────────────────────────────────────────
  console.log(`  Upserting ${learningDiaries.length} learning diaries...`);
  for (const [i, diary] of learningDiaries.entries()) {
    await prisma.learningDiaryEntry.upsert({
      where: { id: diary.id },
      update: {
        title: diary.title,
        titleKo: diary.titleKo,
        category: diary.category,
        level: diary.level,
        thumbnail: diary.thumbnail,
        contentJp: JSON.stringify(diary.contentJp),
        contentKo: diary.contentKo,
        vocabulary: JSON.stringify(diary.vocabulary),
        grammarPoints: JSON.stringify(diary.grammarPoints),
        quiz: JSON.stringify(diary.quiz),
        sortOrder: i + 1,
      },
      create: {
        id: diary.id,
        title: diary.title,
        titleKo: diary.titleKo,
        category: diary.category,
        level: diary.level,
        thumbnail: diary.thumbnail,
        contentJp: JSON.stringify(diary.contentJp),
        contentKo: diary.contentKo,
        vocabulary: JSON.stringify(diary.vocabulary),
        grammarPoints: JSON.stringify(diary.grammarPoints),
        quiz: JSON.stringify(diary.quiz),
        sortOrder: i + 1,
      },
    });
  }
  console.log("  ✓ Learning diaries 100개 완료");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
