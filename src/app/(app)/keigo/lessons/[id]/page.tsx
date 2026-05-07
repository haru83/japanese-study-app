import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseKeigoLesson } from "@/lib/lessonUtils";
import { LessonDetail } from "@/components/keigo/LessonDetail";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.keigoLesson.findUnique({ where: { id } });
  if (!row) notFound();

  const lesson = parseKeigoLesson(row);
  return <LessonDetail lesson={lesson} />;
}
