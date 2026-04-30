import type { LearningDiary } from "@/types/learningDiary";

// Placeholder — will be replaced with 100 full entries
export const learningDiaries: LearningDiary[] = [
  {
    id: "ld-001",
    title: "朝のルーティン",
    titleKo: "아침 루틴",
    category: "일상",
    level: "초급",
    thumbnail: "🌅",
    contentJp: [
      { text: "今日", ruby: "きょう" },
      { text: "は朝" },
      { text: "６", },
      { text: "時", ruby: "じ" },
      { text: "に" },
      { text: "起", ruby: "お" },
      { text: "きました。シャワーを" },
      { text: "浴", ruby: "あ" },
      { text: "びて、朝ごはんを" },
      { text: "食", ruby: "た" },
      { text: "べました。それから" },
      { text: "学校", ruby: "がっこう" },
      { text: "に" },
      { text: "行", ruby: "い" },
      { text: "きました。" },
    ],
    contentKo: "오늘은 아침 6시에 일어났습니다. 샤워를 하고 아침밥을 먹었습니다. 그리고 나서 학교에 갔습니다.",
    vocabulary: [
      { word: "起きる", reading: "おきる", meaning: "일어나다" },
      { word: "シャワーを浴びる", reading: "シャワーをあびる", meaning: "샤워하다" },
      { word: "朝ごはん", reading: "あさごはん", meaning: "아침밥" },
    ],
    grammarPoints: [
      { rule: "〜ました", explanation: "과거 정중형. 동사 ます형의 과거형으로 '〜했습니다'라는 뜻." },
      { rule: "それから", explanation: "그리고 나서. 시간적 순서를 나타내는 접속사." },
    ],
    quiz: [
      {
        question: "「起きました」의 뜻은 무엇인가요?",
        options: ["일어났습니다", "자러 갔습니다", "먹었습니다", "씻었습니다"],
        answer: "일어났습니다",
        explanation: "「起きる」는 '일어나다'라는 뜻이고, 「起きました」는 과거형입니다.",
      },
      {
        question: "「シャワーを浴びる」의 뜻은?",
        options: ["밥을 먹다", "샤워를 하다", "학교에 가다", "공부하다"],
        answer: "샤워를 하다",
        explanation: "「シャワーを浴びる」는 '샤워를 하다'라는 뜻입니다.",
      },
      {
        question: "「それから」와 같은 의미는?",
        options: ["하지만", "그리고 나서", "왜냐하면", "그래서"],
        answer: "그리고 나서",
        explanation: "「それから」는 '그리고 나서'를 뜻하는 접속사입니다.",
      },
    ],
  },
];
