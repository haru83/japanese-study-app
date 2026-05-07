export interface Lesson {
  id: string;
  title: string;
  category: "business" | "hospitality" | "social";
  thumbnail: string;
  dialogue: Array<{
    speaker: string;
    text: string;
    pronunciation: string;
    translation: string;
  }>;
  grammarPoints: Array<{
    rule: string;
    explanation: string;
  }>;
  vocab: Array<{
    word: string;
    reading?: string;
    meaning: string;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    answer: string;
  }>;
}

export type LessonCategory = "all" | "business" | "hospitality" | "social";

export const CATEGORY_LABELS: Record<LessonCategory, string> = {
  all: "전체",
  business: "비즈니스",
  hospitality: "서비스",
  social: "사교",
};
