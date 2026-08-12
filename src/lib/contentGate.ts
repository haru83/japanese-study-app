export const CONTENT_PER_LEVEL = 30;

/**
 * sortOrder(1-based)로부터 해당 콘텐츠를 열기 위해 필요한 레벨을 반환.
 * sortOrder 1~30 → Lv1, 31~60 → Lv2, ..., 271~300 → Lv10
 */
export function requiredLevelForContent(sortOrder: number): number {
  return Math.ceil(sortOrder / CONTENT_PER_LEVEL);
}

/**
 * 해당 콘텐츠가 userLevel에서 접근 가능한지 반환.
 */
export function isContentUnlocked(sortOrder: number, userLevel: number): boolean {
  return userLevel >= requiredLevelForContent(sortOrder);
}
