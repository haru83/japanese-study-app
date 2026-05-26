// ── Constants ──────────────────────────────────────────────────────────────────

export const QUEST_TIMEZONE = "Asia/Seoul";

// ── Types ──────────────────────────────────────────────────────────────────────

export type QuestDifficulty = "EASY" | "MEDIUM" | "HARD";
export type ChallengeType = "DIARY" | "LESSON" | "REVIEW" | "QUIZ";

export interface QuestTemplate {
  type: ChallengeType;
  difficulty: QuestDifficulty;
  requirement: number;
  rewardStamps: number;
  xpReward: number;
  title: string;
  description: string;
  icon: string;
}

export interface DailyQuest extends QuestTemplate {
  id: string;
  seed: number;
}

// ── Quest Templates ───────────────────────────────────────────────────────────

export const QUEST_TEMPLATES: QuestTemplate[] = [
  { type: "DIARY", requirement: 1, rewardStamps: 1, xpReward: 5, difficulty: "EASY", title: "오늘의 일기", description: "일본어 일기를 1편 작성하세요", icon: "📖" },
  { type: "DIARY", requirement: 2, rewardStamps: 2, xpReward: 10, difficulty: "MEDIUM", title: "열정 작가", description: "일본어 일기를 2편 작성하세요", icon: "✍️" },
  { type: "DIARY", requirement: 3, rewardStamps: 3, xpReward: 20, difficulty: "HARD", title: "일기 마스터", description: "일본어 일기를 3편 작성하세요", icon: "🔥" },
  { type: "LESSON", requirement: 1, rewardStamps: 1, xpReward: 5, difficulty: "EASY", title: "경어 학습", description: "경어 레슨을 1개 완료하세요", icon: "🎯" },
  { type: "LESSON", requirement: 2, rewardStamps: 2, xpReward: 10, difficulty: "MEDIUM", title: "학습 마라톤", description: "경어 레슨을 2개 완료하세요", icon: "🏃" },
  { type: "LESSON", requirement: 3, rewardStamps: 3, xpReward: 20, difficulty: "HARD", title: "집중 학습", description: "경어 레슨을 3개 완료하세요", icon: "🧠" },
  { type: "REVIEW", requirement: 5, rewardStamps: 1, xpReward: 5, difficulty: "EASY", title: "복습의 달인", description: "단어 복습을 5개 완료하세요", icon: "🔤" },
  { type: "REVIEW", requirement: 10, rewardStamps: 2, xpReward: 10, difficulty: "MEDIUM", title: "단어 수집가", description: "단어 복습을 10개 완료하세요", icon: "📚" },
  { type: "REVIEW", requirement: 20, rewardStamps: 3, xpReward: 20, difficulty: "HARD", title: "기억력 천재", description: "단어 복습을 20개 완료하세요", icon: "🧠" },
  { type: "QUIZ", requirement: 1, rewardStamps: 1, xpReward: 5, difficulty: "EASY", title: "만점 도전", description: "퀴즈에서 만점을 1번 받으세요", icon: "💯" },
  { type: "QUIZ", requirement: 2, rewardStamps: 2, xpReward: 10, difficulty: "MEDIUM", title: "퀴즈 고수", description: "퀴즈에서 만점을 2번 받으세요", icon: "⭐" },
  { type: "QUIZ", requirement: 3, rewardStamps: 3, xpReward: 20, difficulty: "HARD", title: "퀴즈왕", description: "퀴즈에서 만점을 3번 받으세요", icon: "👑" },
];

// ── Difficulty config ──────────────────────────────────────────────────────────

export const DIFFICULTY_ORDER: QuestDifficulty[] = ["EASY", "MEDIUM", "HARD"];

export const DIFFICULTY_META: Record<QuestDifficulty, { label: string; color: string }> = {
  EASY: { label: "쉬움", color: "text-green-600" },
  MEDIUM: { label: "보통", color: "text-yellow-600" },
  HARD: { label: "어려움", color: "text-red-600" },
};

// ── Deterministic seed from date ───────────────────────────────────────────────

export function dateToSeed(date: Date, tz: string = QUEST_TIMEZONE): number {
  const dateStr = toDateStr(date, tz);
  const digits = dateStr.replace(/-/g, "");
  return parseInt(digits, 10);
}

export function createSeededRng(seed: number): () => number {
  let state = seed;
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;
  return () => {
    state = (a * state + c) % m;
    return state / m;
  };
}

// ── Date utilities ─────────────────────────────────────────────────────────────

export function toDateStr(date: Date, tz: string): string {
  return date.toLocaleDateString("en-CA", { timeZone: tz });
}

export function getEndOfDay(date: Date, tz: string): Date {
  const dateStr = toDateStr(date, tz);
  const endOfDay = new Date(dateStr + "T23:59:59");
  const offset = new Date().getTimezoneOffset() * 60000;
  return new Date(endOfDay.getTime() + offset);
}

// ── Quest selection ────────────────────────────────────────────────────────────

export function selectDailyQuests(seed: number): DailyQuest[] {
  const rng = createSeededRng(seed);
  const result: DailyQuest[] = [];

  for (const difficulty of DIFFICULTY_ORDER) {
    const pool = QUEST_TEMPLATES.filter((t) => t.difficulty === difficulty);
    const idx = Math.floor(rng() * pool.length);
    const template = pool[idx];
    result.push({
      ...template,
      id: `quest-${seed}-${difficulty}-${template.type}`,
      seed,
    });
  }

  return result;
}

export function getTodayQuests(tz: string = QUEST_TIMEZONE): DailyQuest[] {
  const seed = dateToSeed(new Date(), tz);
  return selectDailyQuests(seed);
}