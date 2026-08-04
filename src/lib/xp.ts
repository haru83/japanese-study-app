export const LEVEL_THRESHOLDS: number[] = [
  0,     // Lv 1: 0 ~ 99
  100,   // Lv 2: 100 ~ 249
  250,   // Lv 3: 250 ~ 449
  450,   // Lv 4: 450 ~ 699
  700,   // Lv 5: 700 ~ 999
  1000,  // Lv 6: 1000 ~ 1399
  1400,  // Lv 7: 1400 ~ 1899
  1900,  // Lv 8: 1900 ~ 2499
  2500,  // Lv 9: 2500 ~ 3199
  3200,  // Lv 10: 3200+
];
export const MAX_LEVEL = 10;

export const XP_REWARDS = {
  DIARY_COMPLETE: 10,
  KEIGO_LESSON_COMPLETE: 15,
  KEIGO_QUIZ_PERFECT: 5,
  LEARNING_DIARY_COMPLETE: 10,
  LEARNING_DIARY_QUIZ_PERFECT: 5,
  STAMP_PER_DIARY: 1,
  STAMP_PER_LESSON: 1,
  QUEST_COMPLETE: 20,
  QUEST_CLAIMED_STAMPS: 1,
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

export const LEVEL_TITLES: Record<number, string> = {
  1: "초보 왕왕이",
  2: "공부하는 왕왕이",
  3: "경어 능력자",
  4: "마스터 왕왕이",
  5: "일본어 학자",
  6: "전설의 대마왕",
  7: "일본어 능력자",
  8: "어휘 대가",
  9: "경어 현자",
  10: "신화의 만렙 왕왕이",
};

export function getLevelTitle(level: number): string {
  const boundedLevel = Math.min(Math.max(level, 1), 10);
  return LEVEL_TITLES[boundedLevel] ?? LEVEL_TITLES[1];
}

