// src/actions/communityPost.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { triggerAiReactionForPost } from "@/lib/aiActivityEngine";
import { hasKorean } from "@/lib/japaneseInput";
import { groupReactions, organizeCommentsWithReplies } from "@/lib/community";

const PostInputSchema = z.object({
  title: z.string().min(2, "제목은 최소 2글자 이상이어야 합니다.").max(100, "제목은 최대 100자까지 작성할 수 있습니다."),
  content: z.string().min(5, "내용은 최소 5글자 이상이어야 합니다.").max(3000, "내용은 최대 3000자까지 작성할 수 있습니다."),
  category: z.enum(["chat", "question", "tip", "japan", "review"]).default("chat"),
});

const USER_SELECT = {
  id: true,
  name: true,
  isBot: true,
  progress: { select: { level: true, activeCharacter: true } },
  wardrobeItems: {
    where: { equippedAt: { not: null } },
    select: { wardrobeItemId: true },
  },
} as const;

export async function getCommunityPosts(category?: string) {
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

  const whereClause: Record<string, unknown> = {
    ...(excludedUserIds.length > 0 ? { userId: { notIn: excludedUserIds } } : {}),
  };

  if (category && category !== "all") {
    whereClause.category = category;
  }

  const posts = await prisma.communityPost.findMany({
    where: whereClause,
    include: {
      user: { select: USER_SELECT },
      likes: { select: { emoji: true, userId: true } },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return posts.map((post) => ({
    ...post,
    reactionGroups: groupReactions(post.likes, session?.user?.id),
  }));
}

export async function getCommunityPost(postId: string) {
  const session = await getServerSession(authOptions);

  const post = await prisma.communityPost.findUnique({
    where: { id: postId },
    include: {
      user: { select: USER_SELECT },
      likes: { select: { userId: true, emoji: true } },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              isBot: true,
              progress: { select: { level: true, activeCharacter: true } },
              wardrobeItems: {
                where: { equippedAt: { not: null } },
                select: { wardrobeItemId: true },
              },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) return null;

  if (session?.user?.id) {
    const block = await prisma.userBlock.findFirst({
      where: {
        OR: [
          { blockerId: session.user.id, blockedId: post.userId },
          { blockerId: post.userId, blockedId: session.user.id },
        ],
      },
    });
    if (block) return null;
  }

  const reactions = groupReactions(post.likes, session?.user?.id);
  const organizedComments = organizeCommentsWithReplies(post.comments);

  return {
    ...post,
    reactions,
    organizedComments,
  };
}

export async function createCommunityPost(input: {
  title: string;
  content: string;
  category: "chat" | "question" | "tip" | "japan" | "review";
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const validated = PostInputSchema.parse(input);

  const post = await prisma.communityPost.create({
    data: {
      userId: session.user.id,
      title: validated.title,
      content: validated.content,
      category: validated.category,
    },
  });

  revalidatePath("/community");

  // 실제 유저 게시글에 AI 자동 응원/답변 반응 트리거 (비동기)
  triggerAiReactionForPost(post.id, session.user.id).catch((err) =>
    console.error("AI post reaction error:", err)
  );

  return post;
}

export async function deleteCommunityPost(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const post = await prisma.communityPost.findUnique({
    where: { id: postId },
    select: { userId: true },
  });

  if (!post) throw new Error("게시글을 찾을 수 없습니다.");

  // 본인 또는 관리자만 삭제 가능
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (post.userId !== session.user.id && user?.role !== "admin") {
    throw new Error("삭제 권한이 없습니다.");
  }

  await prisma.communityPost.delete({ where: { id: postId } });
  revalidatePath("/community");
}

export async function toggleCommunityPostLike(postId: string, emoji = "❤️") {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const existing = await prisma.communityPostLike.findUnique({
    where: {
      userId_postId_emoji: {
        userId: session.user.id,
        postId,
        emoji,
      },
    },
  });

  if (existing) {
    await prisma.communityPostLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.communityPostLike.create({
      data: { userId: session.user.id, postId, emoji },
    });
  }

  revalidatePath(`/community/posts/${postId}`);
  revalidatePath("/community");
}

export async function addCommunityPostComment(
  postId: string,
  content: string,
  parentId?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 500) {
    throw new Error("댓글은 1~500자 이내로 입력해주세요.");
  }

  if (hasKorean(trimmed)) {
    throw new Error("댓글은 일본어 또는 영어로만 입력할 수 있습니다.");
  }

  if (parentId) {
    const parent = await prisma.communityPostComment.findUnique({
      where: { id: parentId },
      select: { postId: true },
    });
    if (!parent || parent.postId !== postId) {
      throw new Error("답글을 달 대상 댓글이 존재하지 않습니다.");
    }
  }

  await prisma.communityPostComment.create({
    data: {
      userId: session.user.id,
      postId,
      content: trimmed,
      parentId: parentId || null,
    },
  });

  revalidatePath(`/community/posts/${postId}`);
  revalidatePath("/community");
}

export async function deleteCommunityPostComment(commentId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const comment = await prisma.communityPostComment.findUnique({
    where: { id: commentId },
    select: { userId: true, postId: true },
  });

  if (!comment) throw new Error("댓글을 찾을 수 없습니다.");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (comment.userId !== session.user.id && user?.role !== "admin") {
    throw new Error("삭제 권한이 없습니다.");
  }

  await prisma.communityPostComment.delete({ where: { id: commentId } });
  revalidatePath(`/community/posts/${comment.postId}`);
}

