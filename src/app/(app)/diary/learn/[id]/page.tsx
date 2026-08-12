import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseLearningDiaryEntry } from "@/lib/lessonUtils";
import { DiaryDetail } from "@/components/learningDiary/DiaryDetail";
import { isContentUnlocked } from "@/lib/contentGate";

export default async function LearnDiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [row, session] = await Promise.all([
    prisma.learningDiaryEntry.findUnique({ where: { id } }),
    getServerSession(authOptions),
  ]);

  if (!row) notFound();

  const userProgress = session?.user?.id
    ? await prisma.userProgress.findUnique({
        where: { userId: session.user.id },
        select: { level: true },
      })
    : null;
  const userLevel = userProgress?.level ?? 1;

  if (!isContentUnlocked(row.sortOrder, userLevel)) {
    redirect("/diary/learn");
  }

  const diary = parseLearningDiaryEntry(row);
  return <DiaryDetail diary={diary} />;
}
