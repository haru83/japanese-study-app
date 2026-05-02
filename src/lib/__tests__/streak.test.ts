import { describe, it, expect } from "vitest";
import { shouldIncrementStreak } from "@/lib/streak";

describe("shouldIncrementStreak", () => {
  it("returns true when lastStudyAt is null", () => {
    expect(shouldIncrementStreak(null)).toBe(true);
  });

  it("returns false when lastStudyAt is today", () => {
    const today = new Date();
    expect(shouldIncrementStreak(today)).toBe(false);
  });

  it("returns true when lastStudyAt is yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(shouldIncrementStreak(yesterday)).toBe(true);
  });

  it("returns true when lastStudyAt is 3 days ago", () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    expect(shouldIncrementStreak(threeDaysAgo)).toBe(true);
  });
});
