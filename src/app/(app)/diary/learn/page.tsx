import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DiaryList } from "@/components/learningDiary/DiaryList";
import type { DiarySummary } from "@/components/learningDiary/DiaryList";

export default async function LearnDiaryListPage() {
  const session = await getServerSession(authOptions);

  const [rows, progress, totalCount] = await Promise.all([
    prisma.learningDiaryEntry.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, title: true, titleKo: true, category: true, level: true, thumbnail: true },
    }),
    session?.user?.id
      ? prisma.learningDiaryProgress.findMany({
          where: { userId: session.user.id },
          select: { diaryId: true },
        })
      : Promise.resolve([]),
    prisma.learningDiaryEntry.count({ where: { isActive: true } }),
  ]);

  const diaries: DiarySummary[] = rows;
  const completedIds = progress.map((p) => p.diaryId);

  return (
    <DiaryList
      diaries={diaries}
      completedIds={completedIds}
      totalCount={totalCount}
    />
  );
}
