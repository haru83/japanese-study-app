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

export function validateCommentContent(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("댓글 내용을 입력해주세요");
  return trimmed;
}

export function assertCommentOwner(
  commentUserId: string,
  currentUserId: string
): void {
  if (commentUserId !== currentUserId)
    throw new Error("본인 댓글만 삭제할 수 있어요");
}
