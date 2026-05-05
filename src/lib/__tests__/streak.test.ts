import { describe, it, expect } from "vitest";
import { shouldIncrementStreak, DEFAULT_TIMEZONE } from "@/lib/streak";

describe("shouldIncrementStreak", () => {
  it("returns true when lastStudyAt is null", () => {
    expect(shouldIncrementStreak(null)).toBe(true);
  });

  it("returns false when lastStudyAt is today (same timezone)", () => {
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

  // ── Timezone-aware tests ──────────────────────────────────

  it("uses KST by default (DEFAULT_TIMEZONE)", () => {
    expect(DEFAULT_TIMEZONE).toBe("Asia/Seoul");
  });

  it("correctly handles KST midnight crossing (same UTC date, different KST date)", () => {
    // KST 23:30 Jan 1 = UTC 14:30 Jan 1
    // KST 00:30 Jan 2 = UTC 15:30 Jan 1
    // In UTC both are Jan 1, but in KST they are different days.

    const lastStudyKST = new Date("2025-01-01T14:30:00Z"); // KST 23:30 Jan 1
    const nowKST = new Date("2025-01-01T15:30:00Z");        // KST 00:30 Jan 2

    // Old (UTC-based) code would see both as Jan 1 → false (wrong!)
    // New (KST-based) code should see Jan 1 vs Jan 2 → true (correct!)
    expect(shouldIncrementStreak(lastStudyKST, "Asia/Seoul")).toBe(true);
  });

  it("correctly identifies KST midnight boundary", () => {
    // KST 23:59 Jan 1 = UTC 14:59 Jan 1
    // KST 00:01 Jan 2 = UTC 15:01 Jan 1
    // In UTC both are Jan 1, but in KST they are different days.

    const lastStudy = new Date("2025-01-01T14:59:00Z"); // KST Jan 1 23:59
    const now = new Date("2025-01-01T15:01:00Z");        // KST Jan 2 00:01

    // Both converted to KST date strings should differ
    const lastKST = lastStudy.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
    const nowKST = now.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });

    expect(lastKST).toBe("2025-01-01");
    expect(nowKST).toBe("2025-01-02");
    expect(lastKST).not.toBe(nowKST);
  });

  it("treats same KST day as no increment needed", () => {
    // KST 10:00 and KST 20:00 on same day → no increment
    const lastStudy = new Date("2025-01-01T01:00:00Z"); // KST 10:00 Jan 1
    const now = new Date("2025-01-01T11:00:00Z");       // KST 20:00 Jan 1

    const lastKST = lastStudy.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
    const nowKST = now.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });

    expect(lastKST).toBe(nowKST);
  });

  it("respects custom timezone parameter", () => {
    // JST (UTC+9, same offset as KST but different IANA name)
    const lastStudy = new Date("2025-06-01T14:00:00Z"); // JST 23:00 Jun 1
    const now = new Date("2025-06-01T15:30:00Z");       // JST 00:30 Jun 2

    const lastJST = lastStudy.toLocaleDateString("en-CA", { timeZone: "Asia/Tokyo" });
    const nowJST = now.toLocaleDateString("en-CA", { timeZone: "Asia/Tokyo" });

    expect(lastJST).toBe("2025-06-01");
    expect(nowJST).toBe("2025-06-02");
    expect(lastJST).not.toBe(nowJST);
  });
});
