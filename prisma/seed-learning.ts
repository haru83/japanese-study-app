import { PrismaClient } from "@prisma/client";
import { lessons } from "../src/data/lessons";
import { learningDiaries } from "../src/data/learningDiaries";
import { VOCAB_READINGS } from "../src/data/vocabReadings";

const prisma = new PrismaClient();

async function main() {
  console.log("🌸 Seeding learning content...");

  // ── Keigo Lessons ──────────────────────────────────────────────────────────
  console.log(`  Upserting ${lessons.length} keigo lessons...`);
  for (const [i, lesson] of lessons.entries()) {
    const enrichedVocab = lesson.vocab.map((v) => ({
      word: v.word,
      reading: VOCAB_READINGS[v.word] ?? "",
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
        sortOrder: i,
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
        sortOrder: i,
      },
    });
  }
  console.log("  ✓ Keigo lessons done");

  // ── Learning Diaries ───────────────────────────────────────────────────────
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
        sortOrder: i,
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
        sortOrder: i,
      },
    });
  }
  console.log("  ✓ Learning diaries done");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
