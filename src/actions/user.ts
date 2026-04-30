"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function getUserProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: true,
      keigoProgress: { where: { completed: true } },
    },
  });
}

export async function updateUserName(name: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  return prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });
}

export async function getTopics() {
  return prisma.topic.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
}
