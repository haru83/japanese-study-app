import { describe, it, expect } from "vitest";
import {
  CONFUSING_GRAMMAR_DATA,
  CONFUSING_GRAMMAR_CATEGORIES,
} from "@/data/confusingGrammar";
import { parseMonoRubySegments } from "@/lib/rubyParser";

describe("헷갈리는 문법(Confusing Grammar) 데이터 검증", () => {
  it("헷갈리는 문법 데이터가 정확히 50개여야 함", () => {
    expect(CONFUSING_GRAMMAR_DATA.length).toBe(50);
  });

  it("모든 항목의 ID가 고유해야 함", () => {
    const ids = new Set(CONFUSING_GRAMMAR_DATA.map((item) => item.id));
    expect(ids.size).toBe(50);
  });

  it("모든 항목이 유효한 필수 필드를 가지고 있어야 함", () => {
    for (const item of CONFUSING_GRAMMAR_DATA) {
      expect(item.id).toMatch(/^cg-\d{2}$/);
      expect(item.title).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.categoryLabel).toBeTruthy();
      expect(item.level).toBeTruthy();
      expect(item.summary).toBeTruthy();
      expect(item.coreDifference).toBeTruthy();
      expect(item.tip).toBeTruthy();
      expect(item.icon).toBeTruthy();

      // 비교 포인트 검증 (최소 2개 이상의 문형 비교)
      expect(item.comparisonPoints.length).toBeGreaterThanOrEqual(2);
      for (const point of item.comparisonPoints) {
        expect(point.pattern).toBeTruthy();
        expect(point.meaning).toBeTruthy();
        expect(point.connection).toBeTruthy();
        expect(point.keyNuance).toBeTruthy();
        expect(point.exampleJa).toBeTruthy();
        expect(point.exampleKo).toBeTruthy();

        // MonoRuby 후리가나 파싱 검증
        const segments = parseMonoRubySegments(point.exampleJa);
        expect(segments.length).toBeGreaterThan(0);
        for (const seg of segments) {
          if (seg.text && /[一-龯]/.test(seg.text)) {
            expect(seg.ruby).toBeTruthy();
          }
        }
      }

      // 퀴즈 검증
      expect(item.quiz.question).toBeTruthy();
      expect(item.quiz.options.length).toBe(4);
      expect(item.quiz.answerIndex).toBeGreaterThanOrEqual(0);
      expect(item.quiz.answerIndex).toBeLessThan(4);
      expect(item.quiz.explanation).toBeTruthy();
    }
  });

  it("모든 카테고리 ID가 정의된 카테고리에 속해야 함", () => {
    const validCategoryIds = CONFUSING_GRAMMAR_CATEGORIES.map((c) => c.id).filter(
      (id) => id !== "all"
    );

    for (const item of CONFUSING_GRAMMAR_DATA) {
      expect(validCategoryIds).toContain(item.category);
    }
  });
});
