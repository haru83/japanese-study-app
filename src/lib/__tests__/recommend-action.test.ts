import { describe, it, expect } from "vitest";
import { getRecommendedAction } from "../recommendAction";

describe("Smart Recommendation Engine", () => {
  it("prioritizes FSRS review when items are due today", () => {
    const action = getRecommendedAction({
      vocabDueCount: 5,
      keigoNextId: "keigo-1",
      keigoNextTitle: "비즈니스 인사",
    });

    expect(action.href).toBe("/learning/review");
    expect(action.title).toContain("FSRS 단어 복습하기");
  });

  it("recommends Next Keigo Lesson when no vocab is due", () => {
    const action = getRecommendedAction({
      vocabDueCount: 0,
      keigoNextId: "keigo-2",
      keigoNextTitle: "식당 주문 경어",
    });

    expect(action.href).toBe("/keigo/keigo-2");
    expect(action.title).toContain("식당 주문 경어");
  });

  it("recommends Write Diary when all lessons are complete", () => {
    const action = getRecommendedAction({
      vocabDueCount: 0,
      keigoNextId: null,
      learningDiaryNextId: null,
    });

    expect(action.href).toBe("/diary/topic");
    expect(action.title).toContain("오늘의 일본어 일기 쓰기");
  });
});
