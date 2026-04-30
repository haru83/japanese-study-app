import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeXpResult, XP_REWARDS } from "@/lib/xp";

// GET: fetch user's keigo progress
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await prisma.keigoLessonProgress.findMany({
    where: { userId: session.user.id, completed: true },
    select: { lessonId: true },
  });

  return NextResponse.json({
    completedLessons: progress.map((p) => p.lessonId),
  });
}

// POST: sync localStorage completed lessons to DB (called on login)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { completedLessons } = await req.json() as { completedLessons: string[] };
    if (!Array.isArray(completedLessons) || completedLessons.length === 0) {
      return NextResponse.json({ synced: 0 });
    }

    const userId = session.user.id;

    // Get already-completed lessons to avoid double-awarding XP
    const existing = await prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    });
    const existingIds = new Set(existing.map((e) => e.lessonId));
    const newLessons = completedLessons.filter((id) => !existingIds.has(id));

    if (newLessons.length === 0) {
      return NextResponse.json({ synced: 0 });
    }

    // Upsert each new lesson
    await Promise.all(
      newLessons.map((lessonId) =>
        prisma.keigoLessonProgress.upsert({
          where: { userId_lessonId: { userId, lessonId } },
          update: { completed: true, completedAt: new Date() },
          create: {
            userId,
            lessonId,
            completed: true,
            completedAt: new Date(),
            xpAwarded: XP_REWARDS.KEIGO_LESSON_COMPLETE,
          },
        })
      )
    );

    // Update UserProgress
    const userProgress = await prisma.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const xpToAdd = newLessons.length * XP_REWARDS.KEIGO_LESSON_COMPLETE;
    const stampsToAdd = newLessons.length * XP_REWARDS.STAMP_PER_LESSON;
    const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);

    await prisma.userProgress.update({
      where: { userId },
      data: {
        xp: result.newXp,
        level: result.newLevel,
        totalStamps: { increment: stampsToAdd },
      },
    });

    return NextResponse.json({ synced: newLessons.length });
  } catch (error) {
    console.error("Keigo sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
