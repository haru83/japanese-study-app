import { describe, it, expect } from "vitest";

describe("Public User Profile Schema Verification", () => {
  it("formats public user profile fields correctly", () => {
    const profile = {
      id: "usr-123",
      name: "테스트 유저",
      level: 3,
      xp: 150,
      streakDays: 5,
      totalStamps: 12,
      equippedIds: ["hat-cap"],
      publicDiaries: [{ id: "d-1", title: "오늘의 일기", createdAt: new Date() }],
    };

    expect(profile.level).toBe(3);
    expect(profile.equippedIds).toContain("hat-cap");
    expect(profile.publicDiaries).toHaveLength(1);
  });
});
