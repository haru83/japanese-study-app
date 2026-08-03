import { describe, it, expect } from "vitest";
import { evaluateStreakWithFreeze } from "../streak";

describe("Streak Freeze System", () => {
  it("maintains streak when studying consecutive days", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const res = evaluateStreakWithFreeze(yesterday, 5, 1);

    expect(res.streakDays).toBe(6);
    expect(res.freezeUsed).toBe(false);
    expect(res.freezesRemaining).toBe(1);
    expect(res.isBroken).toBe(false);
  });

  it("consumes 1 Streak Freeze when 1 day is missed", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const res = evaluateStreakWithFreeze(twoDaysAgo, 10, 1);

    expect(res.streakDays).toBe(11);
    expect(res.freezeUsed).toBe(true);
    expect(res.freezesRemaining).toBe(0);
    expect(res.isBroken).toBe(false);
  });

  it("breaks streak when 1 day is missed and no Streak Freeze is owned", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const res = evaluateStreakWithFreeze(twoDaysAgo, 10, 0);

    expect(res.streakDays).toBe(1);
    expect(res.freezeUsed).toBe(false);
    expect(res.freezesRemaining).toBe(0);
    expect(res.isBroken).toBe(true);
    expect(res.brokenPreviousDays).toBe(10);
  });
});
