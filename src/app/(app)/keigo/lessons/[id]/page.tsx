import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseKeigoLesson } from "@/lib/lessonUtils";
import { LessonDetail } from "@/components/keigo/LessonDetail";
import { isContentUnlocked, isWotdContent } from "@/lib/contentGate";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [row, session] = await Promise.all([
    prisma.keigoLesson.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        thumbnail: true,
        dialogue: true,
        grammarPoints: true,
        vocab: true,
        quiz: true,
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
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
    const isWotd = await isWotdContent(row.id);
    if (!isWotd) {
      redirect("/keigo");
    }
  }

  const lesson = parseKeigoLesson(row);
  return <LessonDetail lesson={lesson} />;
}
