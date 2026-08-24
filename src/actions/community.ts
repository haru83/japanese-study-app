// src/actions/community.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertCommentOwner, groupReactions, organizeCommentsWithReplies } from "@/lib/community";
import { CommentInputSchema, ReportInputSchema } from "@/lib/validation";
import { hasKorean } from "@/lib/japaneseInput";

const USER_SELECT = {
  id: true,
  name: true,
  progress: { select: { level: true, activeCharacter: true } },
  wardrobeItems: {
    where: { equippedAt: { not: null } },
    select: { wardrobeItemId: true },
  },
} as const;

export async function getPublicDiaries() {
  const session = await getServerSession(authOptions);

  let excludedUserIds: string[] = [];
  if (session?.user?.id) {
    const [iBlocked, blockedMe] = await Promise.all([
      prisma.userBlock.findMany({
        where: { blockerId: session.user.id },
        select: { blockedId: true },
      }),
      prisma.userBlock.findMany({
        where: { blockedId: session.user.id },
        select: { blockerId: true },
      }),
    ]);
    excludedUserIds = [
      ...iBlocked.map((b) => b.blockedId),
      ...blockedMe.map((b) => b.blockerId),
    ];
  }

  const diaries = await prisma.diary.findMany({
    where: {
      isPublic: true,
      ...(excludedUserIds.length > 0 ? { userId: { notIn: excludedUserIds } } : {}),
    },
    include: {
      user: { select: USER_SELECT },
      likes: { select: { emoji: true, userId: true } },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return diaries.map((diary) => ({
    ...diary,
    reactionGroups: groupReactions(diary.likes, session?.user?.id),
  }));
}

export async function getPublicDiary(diaryId: string) {
  const session = await getServerSession(authOptions);

  const diary = await prisma.diary.findUnique({
    where: { id: diaryId, isPublic: true },
    include: {
      user: { select: USER_SELECT },
      likes: { select: { userId: true, emoji: true } },
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
    const block = await prisma.userBlock.findFirst({
      where: {
        OR: [
          { blockerId: session.user.id, blockedId: diary.userId },
          { blockerId: diary.userId, blockedId: session.user.id },
        ],
      },
    });
    if (block) return null;
  }

  const reactions = groupReactions(diary.likes, session?.user?.id);
  const organizedComments = organizeCommentsWithReplies(diary.comments);

  return {
    ...diary,
    reactions,
    organizedComments,
  };
}

export async function toggleLike(diaryId: string, emoji = "🌸") {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const existing = await prisma.like.findUnique({
    where: {
      userId_diaryId_emoji: {
        userId: session.user.id,
        diaryId,
        emoji,
      },
    },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
  } else {
    await prisma.like.create({
      data: { userId: session.user.id, diaryId, emoji },
    });
  }

  revalidatePath(`/community/${diaryId}`);
  revalidatePath("/community");
}

export async function addComment(
  diaryId: string,
  content: string,
  parentId?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const validated = CommentInputSchema.parse({ content });

  if (hasKorean(validated.content)) {
    throw new Error("댓글은 일본어 또는 영어로만 입력할 수 있습니다.");
  }

  if (parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: parentId },
      select: { diaryId: true },
    });
    if (!parent || parent.diaryId !== diaryId) {
      throw new Error("답글을 달 대상 댓글이 존재하지 않습니다.");
    }
  }

  await prisma.comment.create({
    data: {
      userId: session.user.id,
      diaryId,
      content: validated.content,
      parentId: parentId || null,
    },
  });

  revalidatePath(`/community/${diaryId}`);
  revalidatePath("/community");
}

export async function deleteComment(commentId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("댓글을 찾을 수 없어요.");

  assertCommentOwner(comment.userId, session.user.id);

  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/community/${comment.diaryId}`);
  revalidatePath("/community");
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
  targetType: "diary" | "comment" | "post",
  targetId: string,
  reason?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const validated = ReportInputSchema.parse({ targetType, targetId, reason });

  await prisma.report.create({
    data: { reporterId: session.user.id, targetType: validated.targetType, targetId: validated.targetId, reason: validated.reason },
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

  // 마지막으로 반응 탭을 확인한 시각 (없으면 30일 전 기준)
  const progress = await prisma.userProgress.findUnique({
    where: { userId: session.user.id },
    select: { reactionsReadAt: true },
  });
  const since = progress?.reactionsReadAt
    ? progress.reactionsReadAt
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [likeCount, commentCount] = await Promise.all([
    prisma.like.count({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
        createdAt: { gt: since },
      },
    }),
    prisma.comment.count({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
        createdAt: { gt: since },
      },
    }),
  ]);

  return likeCount + commentCount;
}

export async function markReactionsRead() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  await prisma.userProgress.upsert({
    where: { userId: session.user.id },
    update: { reactionsReadAt: new Date() },
    create: { userId: session.user.id, reactionsReadAt: new Date() },
  });
}

