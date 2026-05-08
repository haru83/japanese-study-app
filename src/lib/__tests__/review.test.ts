import { describe, it, expect } from "vitest";
import { getNextReviewMs, computeNewTier } from "../review-logic";

describe("computeNewTier", () => {
  it("increments tier on correct answer, max 4", () => {
    expect(computeNewTier(0, true)).toBe(1);
    expect(computeNewTier(3, true)).toBe(4);
    expect(computeNewTier(4, true)).toBe(4);
  });

  it("decrements tier on wrong answer, min 0", () => {
    expect(computeNewTier(2, false)).toBe(1);
    expect(computeNewTier(0, false)).toBe(0);
  });
});

describe("getNextReviewMs", () => {
  it("returns correct intervals per tier", () => {
    const day = 24 * 60 * 60 * 1000;
    expect(getNextReviewMs(0)).toBe(day);
    expect(getNextReviewMs(1)).toBe(3 * day);
    expect(getNextReviewMs(2)).toBe(7 * day);
    expect(getNextReviewMs(3)).toBe(14 * day);
    expect(getNextReviewMs(4)).toBe(30 * day);
  });
});
