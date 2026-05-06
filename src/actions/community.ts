// src/actions/community.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { validateCommentContent, assertCommentOwner } from "@/lib/community";

const USER_SELECT = {
  id: true,
  name: true,
  progress: { select: { level: true } },
  wardrobeItems: {
    where: { equippedAt: { not: null } },
    select: { wardrobeItemId: true },
  },
} as const;

export async function getPublicDiaries() {
  const session = await getServerSession(authOptions);

  let blockedIds: string[] = [];
  if (session?.user?.id) {
    const blocks = await prisma.userBlock.findMany({
      where: { blockerId: session.user.id },
      select: { blockedId: true },
    });
    blockedIds = blocks.map((b) => b.blockedId);
  }

  return prisma.diary.findMany({
    where: {
      isPublic: true,
      ...(blockedIds.length > 0 ? { userId: { notIn: blockedIds } } : {}),
    },
    include: {
      user: { select: USER_SELECT },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicDiary(diaryId: string) {
  const session = await getServerSession(authOptions);

  const diary = await prisma.diary.findUnique({
    where: { id: diaryId, isPublic: true },
    include: {
      user: { select: USER_SELECT },
      likes: { select: { userId: true } },
      comments: {
        include: {
          user: {
            select: { id: true, name: true, progress: { select: { level: true } } },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!diary) return null;

  if (session?.user?.id) {
    const block = await prisma.userBlock.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: session.user.id,
          blockedId: diary.userId,
        },
      },
    });
    if (block) return null;
  }

  const isLiked = session?.user?.id
    ? diary.likes.some((l) => l.userId === session.user!.id)
    : false;

  return { ...diary, isLiked };
}

export async function toggleLike(diaryId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const existing = await prisma.like.findUnique({
    where: { userId_diaryId: { userId: session.user.id, diaryId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
  } else {
    await prisma.like.create({ data: { userId: session.user.id, diaryId } });
  }

  revalidatePath(`/community/${diaryId}`);
}

export async function addComment(diaryId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const trimmed = validateCommentContent(content);

  await prisma.comment.create({
    data: { userId: session.user.id, diaryId, content: trimmed },
  });

  revalidatePath(`/community/${diaryId}`);
}

export async function deleteComment(commentId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("댓글을 찾을 수 없어요.");

  assertCommentOwner(comment.userId, session.user.id);

  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/community/${comment.diaryId}`);
}

export async function blockUser(targetUserId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  await prisma.userBlock.upsert({
    where: {
      blockerId_blockedId: {
        blockerId: session.user.id,
        blockedId: targetUserId,
      },
    },
    create: { blockerId: session.user.id, blockedId: targetUserId },
    update: {},
  });

  revalidatePath("/community");
}

export async function reportContent(
  targetType: "diary" | "comment",
  targetId: string,
  reason?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  await prisma.report.create({
    data: { reporterId: session.user.id, targetType, targetId, reason },
  });
}

export async function getReceivedReactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { likes: [], comments: [] };

  const [likes, comments] = await Promise.all([
    prisma.like.findMany({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
      },
      include: {
        user: { select: { id: true, name: true } },
        diary: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    prisma.comment.findMany({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
      },
      include: {
        user: { select: { id: true, name: true } },
        diary: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  return { likes, comments };
}

export async function getUnreadCount() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return 0;

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [likeCount, commentCount] = await Promise.all([
    prisma.like.count({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
        createdAt: { gte: since },
      },
    }),
    prisma.comment.count({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
        createdAt: { gte: since },
      },
    }),
  ]);

  return likeCount + commentCount;
}
