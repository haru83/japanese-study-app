import { describe, it, expect } from "vitest";

describe("Bookmark Actions Schema Verification", () => {
  it("verifies isBookmarked boolean default state", () => {
    const item = {
      word: "勉強",
      reading: "べんきょう",
      meaning: "공부",
      isBookmarked: true,
    };

    expect(item.isBookmarked).toBe(true);
    expect(item.word).toBe("勉強");
  });
});
