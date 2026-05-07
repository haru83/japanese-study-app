import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { KeigoLessonList } from "@/components/keigo/KeigoLessonList";
import type { LessonSummary } from "@/components/keigo/KeigoLessonList";

export default async function KeigoPage() {
  const session = await getServerSession(authOptions);

  const [rows, progress, totalCount] = await Promise.all([
    prisma.keigoLesson.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, title: true, category: true, thumbnail: true, dialogue: true, quiz: true },
    }),
    session?.user?.id
      ? prisma.keigoLessonProgress.findMany({
          where: { userId: session.user.id, completed: true },
          select: { lessonId: true },
        })
      : Promise.resolve([]),
    prisma.keigoLesson.count({ where: { isActive: true } }),
  ]);

  const lessons: LessonSummary[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    thumbnail: row.thumbnail,
    dialogueCount: (JSON.parse(row.dialogue) as unknown[]).length,
    quizCount: (JSON.parse(row.quiz) as unknown[]).length,
  }));

  const completedIds = progress.map((p) => p.lessonId);

  return (
    <KeigoLessonList
      lessons={lessons}
      completedIds={completedIds}
      totalCount={totalCount}
    />
  );
}
