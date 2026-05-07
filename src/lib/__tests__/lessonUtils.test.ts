import { describe, it, expect } from "vitest";
import { parseKeigoLesson, parseLearningDiaryEntry } from "@/lib/lessonUtils";
import type { KeigoLesson, LearningDiaryEntry } from "@prisma/client";

const now = new Date();

function makeKeigoRow(overrides: Partial<KeigoLesson> = {}): KeigoLesson {
  return {
    id: "k-001",
    title: "テスト레슨",
    category: "business",
    thumbnail: "💼",
    dialogue: JSON.stringify([
      { speaker: "토끼", text: "おはようございます", pronunciation: "おはようございます", translation: "좋은 아침입니다" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "ます形", explanation: "정중한 동사 어미" },
    ]),
    vocab: JSON.stringify([
      { word: "会社", reading: "かいしゃ", meaning: "회사" },
    ]),
    quiz: JSON.stringify([
      { question: "다음 중 올바른 경어는?", options: ["A", "B", "C"], answer: "A" },
    ]),
    isActive: true,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function makeDiaryRow(overrides: Partial<LearningDiaryEntry> = {}): LearningDiaryEntry {
  return {
    id: "ld-001",
    title: "日曜日の朝",
    titleKo: "일요일 아침",
    category: "일상",
    level: "초급",
    thumbnail: "☀️",
    contentJp: JSON.stringify([{ text: "今日", ruby: "きょう" }, { text: "は" }]),
    contentKo: "오늘은",
    vocabulary: JSON.stringify([{ word: "今日", reading: "きょう", meaning: "오늘" }]),
    grammarPoints: JSON.stringify([{ rule: "は", explanation: "주제 조사" }]),
    quiz: JSON.stringify([{ question: "今日의 읽기는?", options: ["きょう", "こんにち"], answer: "きょう", explanation: "今日는 きょう로 읽습니다" }]),
    isActive: true,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe("parseKeigoLesson", () => {
  it("모든 필드를 올바르게 파싱한다", () => {
    const row = makeKeigoRow();
    const lesson = parseKeigoLesson(row);

    expect(lesson.id).toBe("k-001");
    expect(lesson.title).toBe("テスト레슨");
    expect(lesson.category).toBe("business");
    expect(lesson.thumbnail).toBe("💼");
    expect(lesson.dialogue).toHaveLength(1);
    expect(lesson.dialogue[0].speaker).toBe("토끼");
    expect(lesson.grammarPoints).toHaveLength(1);
    expect(lesson.grammarPoints[0].rule).toBe("ます形");
    expect(lesson.vocab).toHaveLength(1);
    expect(lesson.vocab[0].word).toBe("会社");
    expect(lesson.vocab[0].reading).toBe("かいしゃ");
    expect(lesson.quiz).toHaveLength(1);
    expect(lesson.quiz[0].answer).toBe("A");
  });

  it("빈 배열 JSON도 파싱한다", () => {
    const row = makeKeigoRow({ dialogue: "[]", grammarPoints: "[]", vocab: "[]", quiz: "[]" });
    const lesson = parseKeigoLesson(row);
    expect(lesson.dialogue).toEqual([]);
    expect(lesson.grammarPoints).toEqual([]);
    expect(lesson.vocab).toEqual([]);
    expect(lesson.quiz).toEqual([]);
  });

  it("category를 LessonCategory 타입으로 캐스팅한다", () => {
    const row = makeKeigoRow({ category: "hospitality" });
    const lesson = parseKeigoLesson(row);
    expect(lesson.category).toBe("hospitality");
  });
});

describe("parseLearningDiaryEntry", () => {
  it("모든 필드를 올바르게 파싱한다", () => {
    const row = makeDiaryRow();
    const diary = parseLearningDiaryEntry(row);

    expect(diary.id).toBe("ld-001");
    expect(diary.title).toBe("日曜日の朝");
    expect(diary.titleKo).toBe("일요일 아침");
    expect(diary.category).toBe("일상");
    expect(diary.level).toBe("초급");
    expect(diary.thumbnail).toBe("☀️");
    expect(diary.contentKo).toBe("오늘은");
    expect(diary.contentJp).toHaveLength(2);
    expect(diary.contentJp[0]).toEqual({ text: "今日", ruby: "きょう" });
    expect(diary.vocabulary).toHaveLength(1);
    expect(diary.vocabulary[0].reading).toBe("きょう");
    expect(diary.grammarPoints).toHaveLength(1);
    expect(diary.quiz).toHaveLength(1);
    expect(diary.quiz[0].explanation).toBe("今日는 きょう로 읽습니다");
  });

  it("빈 배열 JSON도 파싱한다", () => {
    const row = makeDiaryRow({ contentJp: "[]", vocabulary: "[]", grammarPoints: "[]", quiz: "[]" });
    const diary = parseLearningDiaryEntry(row);
    expect(diary.contentJp).toEqual([]);
    expect(diary.vocabulary).toEqual([]);
    expect(diary.grammarPoints).toEqual([]);
    expect(diary.quiz).toEqual([]);
  });
});
