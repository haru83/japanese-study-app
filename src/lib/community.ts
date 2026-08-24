// src/lib/community.ts

export function filterPublicDiaries<T extends { isPublic: boolean }>(
  diaries: T[]
): T[] {
  return diaries.filter((d) => d.isPublic);
}

export function filterBlockedUsers<T extends { userId: string }>(
  items: T[],
  blockedIds: string[]
): T[] {
  if (blockedIds.length === 0) return items;
  return items.filter((item) => !blockedIds.includes(item.userId));
}

const MAX_COMMENT_LENGTH = 500;

export function validateCommentContent(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("댓글 내용을 입력해주세요");
  if (trimmed.length > MAX_COMMENT_LENGTH)
    throw new Error(`댓글은 ${MAX_COMMENT_LENGTH}자 이하로 써주세요`);
  return trimmed;
}

export function assertCommentOwner(
  commentUserId: string,
  currentUserId: string
): void {
  if (commentUserId !== currentUserId)
    throw new Error("본인 댓글만 삭제할 수 있어요");
}

export const AVAILABLE_REACTIONS = ["👍", "❤️", "😂", "😢", "🌸", "🔥"] as const;
export type ReactionEmoji = (typeof AVAILABLE_REACTIONS)[number];

export type ReactionGroup = {
  emoji: string;
  count: number;
  hasReacted: boolean;
};

export function groupReactions(
  likes: { emoji: string; userId: string }[],
  currentUserId?: string
): ReactionGroup[] {
  const counts: Record<string, { count: number; hasReacted: boolean }> = {};

  for (const emoji of AVAILABLE_REACTIONS) {
    counts[emoji] = { count: 0, hasReacted: false };
  }

  for (const like of likes) {
    if (!counts[like.emoji]) {
      counts[like.emoji] = { count: 0, hasReacted: false };
    }
    counts[like.emoji].count += 1;
    if (currentUserId && like.userId === currentUserId) {
      counts[like.emoji].hasReacted = true;
    }
  }

  return AVAILABLE_REACTIONS.map((emoji) => ({
    emoji,
    count: counts[emoji]?.count ?? 0,
    hasReacted: counts[emoji]?.hasReacted ?? false,
  }));
}

export type CommentWithReplies<T> = T & {
  replies: T[];
};

export function organizeCommentsWithReplies<
  T extends { id: string; parentId?: string | null; createdAt: Date }
>(comments: T[]): CommentWithReplies<T>[] {
  const rootComments: CommentWithReplies<T>[] = [];
  const replyMap = new Map<string, T[]>();

  for (const comment of comments) {
    if (comment.parentId) {
      const existing = replyMap.get(comment.parentId) ?? [];
      existing.push(comment);
      replyMap.set(comment.parentId, existing);
    }
  }

  for (const comment of comments) {
    if (!comment.parentId) {
      const replies = replyMap.get(comment.id) ?? [];
      replies.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      rootComments.push({
        ...comment,
        replies,
      });
    }
  }

  rootComments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return rootComments;
}

