import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseLearningDiaryEntry } from "@/lib/lessonUtils";
import { DiaryDetail } from "@/components/learningDiary/DiaryDetail";

export default async function LearnDiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.learningDiaryEntry.findUnique({ where: { id } });
  if (!row) notFound();

  const diary = parseLearningDiaryEntry(row);
  return <DiaryDetail diary={diary} />;
}
