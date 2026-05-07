export type RubySegment = {
  text: string
  ruby?: string
}

export const DIARY_CATEGORIES = [
  "일상", "음식", "여행", "계절", "감정",
  "학교", "직장", "취미", "쇼핑", "건강",
] as const;

export type DiaryCategory = typeof DIARY_CATEGORIES[number]

export type DiaryLevel = "초급" | "중급" | "고급"

export type LearningDiary = {
  id: string
  title: string
  titleKo: string
  category: DiaryCategory
  level: DiaryLevel
  thumbnail: string
  contentJp: RubySegment[]
  contentKo: string
  vocabulary: {
    word: string
    reading: string
    meaning: string
  }[]
  grammarPoints: {
    rule: string
    explanation: string
  }[]
  quiz: {
    question: string
    options: string[]
    answer: string
    explanation: string
  }[]
}
