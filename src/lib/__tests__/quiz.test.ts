import { describe, it, expect } from "vitest";
import { isQuizPassed, QUIZ_PASS_THRESHOLD } from "@/lib/quiz";

describe("isQuizPassed", () => {
  it("기준 점수 비율(60%)을 정의한다", () => {
    expect(QUIZ_PASS_THRESHOLD).toBe(0.6);
  });

  it("3문제 중 2문제(66.7%) 이상 맞추면 통과한다", () => {
    expect(isQuizPassed(2, 3)).toBe(true);
    expect(isQuizPassed(3, 3)).toBe(true);
  });

  it("3문제 중 1문제(33.3%) 이하이면 탈락한다", () => {
    expect(isQuizPassed(1, 3)).toBe(false);
    expect(isQuizPassed(0, 3)).toBe(false);
  });

  it("5문제 중 3문제(60%) 이상 맞추면 통과한다", () => {
    expect(isQuizPassed(3, 5)).toBe(true);
    expect(isQuizPassed(2, 5)).toBe(false);
  });

  it("총 문제가 0개이면 통과로 처리한다", () => {
    expect(isQuizPassed(0, 0)).toBe(true);
  });
});
