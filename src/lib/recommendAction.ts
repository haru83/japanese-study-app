export interface RecommendedAction {
  title: string;
  subtitle: string;
  badgeText: string;
  href: string;
  icon: string;
  accentColor: string;
}

export interface UserProgressInput {
  vocabDueCount: number;
  keigoNextId?: string | null;
  keigoNextTitle?: string | null;
  learningDiaryNextId?: string | null;
  learningDiaryNextTitle?: string | null;
}

/**
 * Calculates the single highest priority action recommendation for the user.
 * Priority order (Hick's Law):
 * 1. FSRS Review (if items are due today)
 * 2. Next Keigo Lesson (if uncompleted lesson exists)
 * 3. Next Learning Diary (if uncompleted diary exists)
 * 4. Write Japanese Diary (default)
 */
export function getRecommendedAction(input: UserProgressInput): RecommendedAction {
  if (input.vocabDueCount > 0) {
    return {
      title: "FSRS 단어 복습하기 ⚡",
      subtitle: `오늘 복습할 어휘 ${input.vocabDueCount}개가 기다리고 있어요`,
      badgeText: `복습 대기어휘 ${input.vocabDueCount}개!`,
      href: "/learning/review",
      icon: "⚡",
      accentColor: "bg-matcha-green text-type-black",
    };
  }

  if (input.keigoNextId && input.keigoNextTitle) {
    return {
      title: `경어 레슨: ${input.keigoNextTitle} 🎯`,
      subtitle: "다음 경어 레슨을 완료하고 스탬프를 받으세요",
      badgeText: "+15 XP / +1 스탬프",
      href: `/keigo/lessons/${input.keigoNextId}`,
      icon: "🎯",
      accentColor: "bg-grape-punch text-white",
    };
  }

  if (input.learningDiaryNextId && input.learningDiaryNextTitle) {
    return {
      title: `학습 일기: ${input.learningDiaryNextTitle} 📖`,
      subtitle: "실생활 일본어 표현을 일기로 익혀보세요",
      badgeText: "+10 XP / +1 스탬프",
      href: `/diary/learn/${input.learningDiaryNextId}`,
      icon: "📖",
      accentColor: "bg-sakura-pink text-type-black",
    };
  }

  return {
    title: "오늘의 일본어 일기 쓰기 ✍️",
    subtitle: "오늘 하루를 일본어로 기록하고 AI 튜터 피드백을 받으세요",
    badgeText: "+10 XP / +1 스탬프",
    href: "/diary/topic",
    icon: "✍️",
    accentColor: "bg-shiba-orange text-type-black",
  };
}
