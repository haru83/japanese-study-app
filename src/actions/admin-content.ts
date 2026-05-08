"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

// ── KeigoLesson ───────────────────────────────────────────────────────────────

export async function upsertKeigoLesson(data: {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  dialogue: string;
  grammarPoints: string;
  vocab: string;
  quiz: string;
  sortOrder: number;
  isActive: boolean;
}) {
  await requireAdmin();

  // Validate JSON fields
  for (const field of ["dialogue", "grammarPoints", "vocab", "quiz"] as const) {
    try {
      JSON.parse(data[field]);
    } catch {
      throw new Error(`${field} 필드의 JSON 형식이 올바르지 않습니다.`);
    }
  }

  await prisma.keigoLesson.upsert({
    where: { id: data.id },
    update: {
      title: data.title,
      category: data.category,
      thumbnail: data.thumbnail,
      dialogue: data.dialogue,
      grammarPoints: data.grammarPoints,
      vocab: data.vocab,
      quiz: data.quiz,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
    create: {
      id: data.id,
      title: data.title,
      category: data.category,
      thumbnail: data.thumbnail,
      dialogue: data.dialogue,
      grammarPoints: data.grammarPoints,
      vocab: data.vocab,
      quiz: data.quiz,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin/keigo");
  revalidatePath("/keigo");
}

export async function toggleKeigoLessonActive(id: string) {
  await requireAdmin();
  const lesson = await prisma.keigoLesson.findUnique({ where: { id }, select: { isActive: true } });
  if (!lesson) throw new Error("레슨을 찾을 수 없습니다.");
  await prisma.keigoLesson.update({ where: { id }, data: { isActive: !lesson.isActive } });
  revalidatePath("/admin/keigo");
  revalidatePath("/keigo");
}

export async function deleteKeigoLesson(id: string) {
  await requireAdmin();
  await prisma.keigoLesson.delete({ where: { id } });
  revalidatePath("/admin/keigo");
  revalidatePath("/keigo");
}

// ── LearningDiaryEntry ────────────────────────────────────────────────────────

export async function upsertLearningDiaryEntry(data: {
  id: string;
  title: string;
  titleKo: string;
  category: string;
  level: string;
  thumbnail: string;
  contentJp: string;
  contentKo: string;
  vocabulary: string;
  grammarPoints: string;
  quiz: string;
  sortOrder: number;
  isActive: boolean;
}) {
  await requireAdmin();

  for (const field of ["contentJp", "vocabulary", "grammarPoints", "quiz"] as const) {
    try {
      JSON.parse(data[field]);
    } catch {
      throw new Error(`${field} 필드의 JSON 형식이 올바르지 않습니다.`);
    }
  }

  await prisma.learningDiaryEntry.upsert({
    where: { id: data.id },
    update: {
      title: data.title,
      titleKo: data.titleKo,
      category: data.category,
      level: data.level,
      thumbnail: data.thumbnail,
      contentJp: data.contentJp,
      contentKo: data.contentKo,
      vocabulary: data.vocabulary,
      grammarPoints: data.grammarPoints,
      quiz: data.quiz,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
    create: {
      id: data.id,
      title: data.title,
      titleKo: data.titleKo,
      category: data.category,
      level: data.level,
      thumbnail: data.thumbnail,
      contentJp: data.contentJp,
      contentKo: data.contentKo,
      vocabulary: data.vocabulary,
      grammarPoints: data.grammarPoints,
      quiz: data.quiz,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin/diary");
  revalidatePath("/diary/learn");
  revalidatePath("/diary");
}

export async function toggleLearningDiaryActive(id: string) {
  await requireAdmin();
  const entry = await prisma.learningDiaryEntry.findUnique({ where: { id }, select: { isActive: true } });
  if (!entry) throw new Error("일기를 찾을 수 없습니다.");
  await prisma.learningDiaryEntry.update({ where: { id }, data: { isActive: !entry.isActive } });
  revalidatePath("/admin/diary");
  revalidatePath("/diary/learn");
  revalidatePath("/diary");
}

export async function deleteLearningDiaryEntry(id: string) {
  await requireAdmin();
  await prisma.learningDiaryEntry.delete({ where: { id } });
  revalidatePath("/admin/diary");
  revalidatePath("/diary/learn");
  revalidatePath("/diary");
}
