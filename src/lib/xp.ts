export const LEVEL_THRESHOLDS = [0, 50, 120, 210, 320, 450];
export const MAX_LEVEL = LEVEL_THRESHOLDS.length;

export const XP_REWARDS = {
  DIARY_COMPLETE: 10,
  KEIGO_LESSON_COMPLETE: 15,
  KEIGO_QUIZ_PERFECT: 5,
  LEARNING_DIARY_COMPLETE: 10,
  LEARNING_DIARY_QUIZ_PERFECT: 5,
  STAMP_PER_DIARY: 1,
  STAMP_PER_LESSON: 1,
} as const;

export function calculateLevel(xp: number): number {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(level, MAX_LEVEL);
}

export function xpForNextLevel(currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return LEVEL_THRESHOLDS[MAX_LEVEL - 1];
  return LEVEL_THRESHOLDS[currentLevel];
}

export function xpProgress(xp: number, level: number): number {
  const currentLevelXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextLevelXp = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[MAX_LEVEL - 1];
  if (nextLevelXp === currentLevelXp) return 100;
  return Math.round(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100);
}

export interface XpResult {
  xpGained: number;
  stampsGained: number;
  newXp: number;
  newLevel: number;
  leveledUp: boolean;
}

export function computeXpResult(
  currentXp: number,
  xpToAdd: number,
  stampsToAdd: number
): XpResult {
  const newXp = currentXp + xpToAdd;
  const oldLevel = calculateLevel(currentXp);
  const newLevel = calculateLevel(newXp);
  return {
    xpGained: xpToAdd,
    stampsGained: stampsToAdd,
    newXp,
    newLevel,
    leveledUp: newLevel > oldLevel,
  };
}
