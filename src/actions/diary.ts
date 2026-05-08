"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { XP_REWARDS, computeXpResult } from "@/lib/xp";
import { shouldIncrementStreak } from "@/lib/streak";

export async function getDiaries() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return prisma.diary.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveDiary(data: {
  title: string;
  content: string;
  mood?: string;
  topicId?: string;
  isPublic?: boolean;
  isTutorPublic?: boolean;
  tutorReview?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const userId = session.user.id;

  const { diary, xpResult } = await prisma.$transaction(async (tx) => {
    const diary = await tx.diary.create({
      data: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        topicId: data.topicId,
        isPublic: data.isPublic ?? false,
        isTutorPublic: data.isTutorPublic ?? false,
        tutorReview: data.tutorReview,
        userId,
      },
    });

    const userProgress = await tx.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const xpResult = computeXpResult(
      userProgress.xp,
      XP_REWARDS.DIARY_COMPLETE,
      XP_REWARDS.STAMP_PER_DIARY
    );

    const incrementStreak = shouldIncrementStreak(userProgress.lastStudyAt);

    await tx.userProgress.update({
      where: { userId },
      data: {
        xp: xpResult.newXp,
        level: xpResult.newLevel,
        totalStamps: { increment: xpResult.stampsGained },
        lastStudyAt: new Date(),
        ...(incrementStreak ? { streakDays: { increment: 1 } } : {}),
      },
    });

    return { diary, xpResult };
  });

  revalidatePath("/diary");
  revalidatePath("/home");
  revalidatePath("/profile");

  if (data.isPublic) {
    revalidatePath("/community");
  }

  return { diary, xpResult };
}

export async function deleteDiary(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  await prisma.diary.deleteMany({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/diary");
}
