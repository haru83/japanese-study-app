"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  selectDailyQuests,
  dateToSeed,
  QUEST_TEMPLATES,
  toDateStr,
  getEndOfDay,
  type QuestTemplate,
  type QuestDifficulty,
  type DailyQuest,
} from "@/lib/quest-logic";
import { computeXpResult } from "@/lib/xp";
import { DEFAULT_TIMEZONE } from "@/lib/streak";

export type { QuestTemplate, QuestDifficulty, DailyQuest };

export type ChallengeType = "DIARY" | "LESSON" | "REVIEW" | "QUIZ";

export async function getTodayChallenges() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const userId = session.user.id;
  const now = new Date();
  const todayStr = toDateStr(now, DEFAULT_TIMEZONE);

  const existing = await prisma.dailyChallenge.findMany({
    where: {
      userId,
      createdAt: {
        gte: new Date(todayStr + "T00:00:00"),
        lt: new Date(todayStr + "T23:59:59"),
      },
    },
    orderBy: { createdAt: "asc" },
  });

  if (existing.length > 0) {
    return existing.map((c) => {
      const template = QUEST_TEMPLATES.find(
        (t) => t.type === c.type && t.difficulty === c.difficulty && t.requirement === c.requirement
      ) ?? QUEST_TEMPLATES[0];
      return {
        ...c,
        template,
      };
    });
  }

  const seed = dateToSeed(now, DEFAULT_TIMEZONE);
  const selected = selectDailyQuests(seed);
  const expiresAt = getEndOfDay(now, DEFAULT_TIMEZONE);

  const created = await Promise.all(
    selected.map((quest) =>
      prisma.dailyChallenge.create({
        data: {
          userId,
          type: quest.type,
          difficulty: quest.difficulty,
          requirement: quest.requirement,
          rewardStamps: quest.rewardStamps,
          xpReward: quest.xpReward,
          completed: false,
          progress: 0,
          expiresAt,
        },
      })
    )
  );

  return created.map((c) => {
    const template = QUEST_TEMPLATES.find(
      (t) => t.type === c.type && t.difficulty === c.difficulty && t.requirement === c.requirement
    ) ?? QUEST_TEMPLATES[0];
    return {
      ...c,
      template,
    };
  });
}

export async function incrementChallengeProgress(
  type: ChallengeType,
  amount: number = 1
): Promise<{ newlyCompleted: Array<{ id: string; rewardStamps: number; xpReward: number; title: string }> }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { newlyCompleted: [] };

  const userId = session.user.id;
  const now = new Date();

  const activeChallenges = await prisma.dailyChallenge.findMany({
    where: {
      userId,
      type,
      completed: false,
      expiresAt: { gt: now },
    },
  });

  if (activeChallenges.length === 0) {
    return { newlyCompleted: [] };
  }

  const newlyCompleted: Array<{ id: string; rewardStamps: number; xpReward: number; title: string }> = [];

  await Promise.all(
    activeChallenges.map(async (challenge) => {
      const newProgress = Math.min(challenge.progress + amount, challenge.requirement);
      const isNowCompleted = newProgress >= challenge.requirement && !challenge.completed;

      await prisma.dailyChallenge.update({
        where: { id: challenge.id },
        data: {
          progress: newProgress,
          completed: isNowCompleted ? true : challenge.completed,
        },
      });

      if (isNowCompleted) {
        const template = QUEST_TEMPLATES.find(
          (t) => t.type === challenge.type && t.difficulty === challenge.difficulty && t.requirement === challenge.requirement
        );
        newlyCompleted.push({
          id: challenge.id,
          rewardStamps: challenge.rewardStamps,
          xpReward: challenge.xpReward,
          title: template?.title ?? "퀘스트 완료!",
        });
      }
    })
  );

  if (newlyCompleted.length > 0) {
    const totalXp = newlyCompleted.reduce((sum, c) => sum + c.xpReward, 0);
    const totalStamps = newlyCompleted.reduce((sum, c) => sum + c.rewardStamps, 0);

    await prisma.$transaction(async (tx) => {
      const userProgress = await tx.userProgress.upsert({
        where: { userId },
        create: { userId },
        update: {},
      });

      const result = computeXpResult(userProgress.xp, totalXp, totalStamps);

      await tx.userProgress.update({
        where: { userId },
        data: {
          xp: result.newXp,
          level: result.newLevel,
          totalStamps: { increment: totalStamps },
        },
      });
    });
  }

  return { newlyCompleted };
}

export async function getChallengeSummary() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;
  const now = new Date();
  const todayStr = toDateStr(now, DEFAULT_TIMEZONE);

  const [totalToday, completedToday, totalStamps] = await Promise.all([
    prisma.dailyChallenge.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(todayStr + "T00:00:00"),
          lt: new Date(todayStr + "T23:59:59"),
        },
      },
    }),
    prisma.dailyChallenge.count({
      where: {
        userId,
        completed: true,
        createdAt: {
          gte: new Date(todayStr + "T00:00:00"),
          lt: new Date(todayStr + "T23:59:59"),
        },
      },
    }),
    prisma.dailyChallenge.aggregate({
      where: {
        userId,
        completed: true,
        createdAt: {
          gte: new Date(todayStr + "T00:00:00"),
          lt: new Date(todayStr + "T23:59:59"),
        },
      },
      _sum: { rewardStamps: true },
    }),
  ]);

  return {
    totalToday,
    completedToday,
    totalStamps: totalStamps._sum.rewardStamps ?? 0,
  };
}