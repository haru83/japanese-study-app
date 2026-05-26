"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { QuestClaimSchema } from "@/lib/validation";
import { computeXpResult } from "@/lib/xp";
import {
  QUEST_TEMPLATES,
  toDateStr,
  getEndOfDay,
  selectDailyQuests,
  dateToSeed,
  QUEST_TIMEZONE,
} from "@/lib/quest-logic";

export interface DailyQuest {
  id: string;
  type: string;
  requirement: number;
  rewardStamps: number;
  xpReward: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  completed: boolean;
  claimedAt: Date | null;
  progress: number;
  template?: {
    title: string;
    description: string;
    icon: string;
  };
}

export async function getDailyQuests(): Promise<DailyQuest[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const userId = session.user.id;
  const now = new Date();
  const todayStr = toDateStr(now, QUEST_TIMEZONE);

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

  let challenges = existing;

  if (existing.length === 0) {
    const seed = dateToSeed(now, QUEST_TIMEZONE);
    const selected = selectDailyQuests(seed);
    const expiresAt = getEndOfDay(now, QUEST_TIMEZONE);

    challenges = await Promise.all(
      selected.map((template) =>
        prisma.dailyChallenge.create({
          data: {
            userId,
            type: template.type,
            difficulty: template.difficulty,
            requirement: template.requirement,
            rewardStamps: template.rewardStamps,
            xpReward: template.xpReward,
            completed: false,
            progress: 0,
            expiresAt,
          },
        })
      )
    );
  }

  return challenges.map((c) => {
    const template =
      QUEST_TEMPLATES.find(
        (t) =>
          t.type === c.type &&
          t.difficulty === (c.difficulty as "EASY" | "MEDIUM" | "HARD")
      ) ?? QUEST_TEMPLATES[0];

    return {
      id: c.id,
      type: c.type,
      requirement: c.requirement,
      rewardStamps: c.rewardStamps,
      xpReward: c.xpReward,
      difficulty: (c.difficulty as "EASY" | "MEDIUM" | "HARD") ?? "EASY",
      completed: c.completed,
      claimedAt: c.claimedAt,
      progress: c.progress,
      template: {
        title: template.title,
        description: template.description,
        icon: template.icon,
      },
    };
  });
}

export async function claimQuestReward(
  questId: string
): Promise<{ success: boolean; xpGained: number; stampsGained: number }> {
  const validated = QuestClaimSchema.parse({ questId });

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, xpGained: 0, stampsGained: 0 };
  }

  const userId = session.user.id;

  const quest = await prisma.dailyChallenge.findUnique({
    where: { id: validated.questId },
  });

  if (!quest || quest.userId !== userId) {
    return { success: false, xpGained: 0, stampsGained: 0 };
  }

  if (!quest.completed || quest.claimedAt) {
    return { success: false, xpGained: 0, stampsGained: 0 };
  }

  const xpToAdd = quest.xpReward;
  const stampsToAdd = quest.rewardStamps;

  await prisma.$transaction(async (tx) => {
    const userProgress = await tx.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);

    await tx.userProgress.update({
      where: { userId },
      data: {
        xp: result.newXp,
        level: result.newLevel,
        totalStamps: { increment: stampsToAdd },
      },
    });

    await tx.dailyChallenge.update({
      where: { id: validated.questId },
      data: { claimedAt: new Date() },
    });
  });

  return { success: true, xpGained: xpToAdd, stampsGained: stampsToAdd };
}
