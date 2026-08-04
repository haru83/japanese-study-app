"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export interface PublicUserProfile {
  id: string;
  name: string;
  level: number;
  xp: number;
  streakDays: number;
  totalStamps: number;
  equippedIds: string[];
  publicDiaries: { id: string; title: string; createdAt: Date }[];
}

export async function getUserProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: true,
      keigoProgress: { where: { completed: true } },
      diaries: { select: { id: true } },
    },
  });
}

export async function getPublicUserProfile(targetUserId: string): Promise<PublicUserProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: {
      progress: true,
      wardrobeItems: { select: { wardrobeItemId: true } },
      diaries: {
        where: { isPublic: true },
        select: { id: true, title: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name || "학습자",
    level: user.progress?.level ?? 1,
    xp: user.progress?.xp ?? 0,
    streakDays: user.progress?.streakDays ?? 0,
    totalStamps: user.progress?.totalStamps ?? 0,
    equippedIds: user.wardrobeItems.map((w) => w.wardrobeItemId),
    publicDiaries: user.diaries,
  };
}

export async function updateUserName(name: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  return prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });
}

export async function getTopics() {
  return prisma.topic.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserStudyDates(): Promise<string[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const userId = session.user.id;

  const [keigo, learningDiaries, diaries, challenges, progress] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true, completedAt: { not: null } },
      select: { completedAt: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { completedAt: true },
    }),
    prisma.diary.findMany({
      where: { userId },
      select: { createdAt: true },
    }),
    prisma.dailyChallenge.findMany({
      where: { userId, completed: true },
      select: { createdAt: true, claimedAt: true },
    }),
    prisma.userProgress.findUnique({
      where: { userId },
      select: { lastStudyAt: true },
    }),
  ]);

  const dateSet = new Set<string>();

  const addDate = (d?: Date | null) => {
    if (!d) return;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dateSet.add(`${year}-${month}-${day}`);
  };

  keigo.forEach((k) => addDate(k.completedAt));
  learningDiaries.forEach((ld) => addDate(ld.completedAt));
  diaries.forEach((d) => addDate(d.createdAt));
  challenges.forEach((c) => {
    addDate(c.createdAt);
    addDate(c.claimedAt);
  });
  if (progress?.lastStudyAt) addDate(progress.lastStudyAt);

  return Array.from(dateSet);
}

