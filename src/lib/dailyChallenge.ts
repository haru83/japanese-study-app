import { DEFAULT_TIMEZONE } from "@/lib/streak";

export type ChallengeType = "DIARY" | "LESSON" | "REVIEW" | "QUIZ";

export interface ChallengeTemplate {
  type: ChallengeType;
  requirement: number;
  rewardStamps: number;
  title: string;
  description: string;
  icon: string;
}

export const CHALLENGE_TEMPLATES: ChallengeTemplate[] = [
  { type: "DIARY", requirement: 1, rewardStamps: 1, title: "오늘의 일기", description: "일본어 일기를 1편 작성하세요", icon: "📖" },
  { type: "DIARY", requirement: 2, rewardStamps: 2, title: "열정 작가", description: "일본어 일기를 2편 작성하세요", icon: "✍️" },
  { type: "LESSON", requirement: 1, rewardStamps: 1, title: "경어 학습", description: "경어 레슨을 1개 완료하세요", icon: "🎯" },
  { type: "LESSON", requirement: 2, rewardStamps: 2, title: "학습 마라톤", description: "경어 레슨을 2개 완료하세요", icon: "🏃" },
  { type: "LESSON", requirement: 3, rewardStamps: 3, title: "집중 학습", description: "경어 레슨을 3개 완료하세요", icon: "🔥" },
  { type: "REVIEW", requirement: 5, rewardStamps: 1, title: "복습의 달인", description: "단어 복습을 5개 완료하세요", icon: "🔤" },
  { type: "REVIEW", requirement: 10, rewardStamps: 2, title: "단어 수집가", description: "단어 복습을 10개 완료하세요", icon: "📚" },
  { type: "REVIEW", requirement: 20, rewardStamps: 3, title: "기억력 천재", description: "단어 복습을 20개 완료하세요", icon: "🧠" },
  { type: "QUIZ", requirement: 1, rewardStamps: 1, title: "만점 도전", description: "퀴즈에서 만점을 1번 받으세요", icon: "💯" },
  { type: "QUIZ", requirement: 3, rewardStamps: 2, title: "퀴즈왕", description: "퀴즈에서 만점을 3번 받으세요", icon: "👑" },
];

export function toDateStr(date: Date, tz: string): string {
  return date.toLocaleDateString("en-CA", { timeZone: tz });
}

export function getEndOfDay(date: Date, tz: string): Date {
  const dateStr = toDateStr(date, tz);
  return new Date(dateStr + "T23:59:59.999");
}

export function selectDailyChallenges(seed: number = Date.now()): ChallengeTemplate[] {
  let s = seed;
  const rng = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };

  const shuffled = [...CHALLENGE_TEMPLATES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 3);
}
