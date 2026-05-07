import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseKeigoLesson } from "@/lib/lessonUtils";
import { KeigoLessonList } from "@/components/keigo/KeigoLessonList";

export default async function KeigoPage() {
  const session = await getServerSession(authOptions);

  const [rows, progress, totalCount] = await Promise.all([
    prisma.keigoLesson.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    session?.user?.id
      ? prisma.keigoLessonProgress.findMany({
          where: { userId: session.user.id, completed: true },
          select: { lessonId: true },
        })
      : Promise.resolve([]),
    prisma.keigoLesson.count({ where: { isActive: true } }),
  ]);

  const lessons = rows.map(parseKeigoLesson);
  const completedIds = progress.map((p) => p.lessonId);

  return (
    <KeigoLessonList
      lessons={lessons}
      completedIds={completedIds}
      totalCount={totalCount}
    />
  );
}
