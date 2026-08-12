import { describe, it, expect } from "vitest";
import { lessons } from "../lessons";

describe("Keigo Lessons Data", () => {
  it("should contain exactly 200 keigo lessons", () => {
    expect(lessons.length).toBe(200);
  });

  it("should have unique IDs for all lessons", () => {
    const ids = lessons.map((l) => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(200);
  });

  it("should have valid fields on all lessons", () => {
    for (const lesson of lessons) {
      expect(lesson.id).toBeTruthy();
      expect(lesson.title).toBeTruthy();
      expect(["business", "hospitality", "social"]).toContain(lesson.category);
      expect(lesson.thumbnail).toBeTruthy();
      expect(lesson.dialogue.length).toBeGreaterThan(0);
      expect(lesson.grammarPoints.length).toBeGreaterThan(0);
      expect(lesson.vocab.length).toBeGreaterThan(0);
      expect(lesson.quiz.length).toBeGreaterThan(0);

      for (const q of lesson.quiz) {
        expect(q.question).toBeTruthy();
        expect(q.options.length).toBeGreaterThanOrEqual(4);
        expect(q.options).toContain(q.answer);
      }
    }
  });

  it("should have exactly 3 quiz questions with 4 options for new lessons (keigo-101 to keigo-200)", () => {
    const newLessons = lessons.filter((l) => {
      const match = l.id.match(/^keigo-(\d+)$/);
      if (!match) return false;
      const num = parseInt(match[1], 10);
      return num >= 101 && num <= 200;
    });

    expect(newLessons.length).toBe(100);

    for (const lesson of newLessons) {
      expect(lesson.dialogue.length).toBeGreaterThanOrEqual(4);
      expect(lesson.dialogue.length).toBeLessThanOrEqual(6);
      expect(lesson.grammarPoints.length).toBeGreaterThanOrEqual(2);
      expect(lesson.grammarPoints.length).toBeLessThanOrEqual(3);
      expect(lesson.vocab.length).toBeGreaterThanOrEqual(3);
      expect(lesson.vocab.length).toBeLessThanOrEqual(5);
      expect(lesson.quiz.length).toBe(3);

      for (const q of lesson.quiz) {
        expect(q.options.length).toBe(4);
        expect(q.options).toContain(q.answer);
      }
    }
  });
});
