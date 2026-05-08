// src/lib/review-logic.ts
const TIER_INTERVALS_MS = [
  1 * 24 * 60 * 60 * 1000,
  3 * 24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  14 * 24 * 60 * 60 * 1000,
  30 * 24 * 60 * 60 * 1000,
];

export function computeNewTier(currentTier: number, correct: boolean): number {
  if (correct) return Math.min(4, currentTier + 1);
  return Math.max(0, currentTier - 1);
}

export function getNextReviewMs(tier: number): number {
  return TIER_INTERVALS_MS[Math.min(tier, 4)];
}
