import { describe, it, expect } from "vitest";
import { learningDiaries } from "../learningDiaries";

describe("Learning Diaries Data", () => {
  it("should contain exactly 300 diary entries", () => {
    expect(learningDiaries.length).toBe(300);
  });

  it("should have unique IDs for all entries", () => {
    const ids = learningDiaries.map((d) => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(300);
  });

  it("should have valid fields on all entries", () => {
    for (const diary of learningDiaries) {
      expect(diary.id).toBeTruthy();
      expect(diary.title).toBeTruthy();
      expect(diary.titleKo).toBeTruthy();
      expect(diary.contentJp.length).toBeGreaterThan(0);
      expect(diary.contentKo).toBeTruthy();
      expect(diary.vocabulary.length).toBeGreaterThan(0);
      expect(diary.grammarPoints.length).toBeGreaterThan(0);
      expect(diary.quiz.length).toBe(3);
      for (const q of diary.quiz) {
        expect(q.options).toContain(q.answer);
      }
    }
  });
});
