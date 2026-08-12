import { describe, it, expect } from "vitest";
import {
  requiredLevelForContent,
  isContentUnlocked,
  CONTENT_PER_LEVEL,
} from "@/lib/contentGate";

describe("requiredLevelForContent", () => {
  it("sortOrder 1은 레벨 1", () => {
    expect(requiredLevelForContent(1)).toBe(1);
  });
  it("sortOrder 30은 레벨 1", () => {
    expect(requiredLevelForContent(30)).toBe(1);
  });
  it("sortOrder 31은 레벨 2", () => {
    expect(requiredLevelForContent(31)).toBe(2);
  });
  it("sortOrder 60은 레벨 2", () => {
    expect(requiredLevelForContent(60)).toBe(2);
  });
  it("sortOrder 271은 레벨 10", () => {
    expect(requiredLevelForContent(271)).toBe(10);
  });
  it("sortOrder 300은 레벨 10", () => {
    expect(requiredLevelForContent(300)).toBe(10);
  });
  it("CONTENT_PER_LEVEL은 30", () => {
    expect(CONTENT_PER_LEVEL).toBe(30);
  });
});

describe("isContentUnlocked", () => {
  it("sortOrder 1, 레벨 1 → true", () => {
    expect(isContentUnlocked(1, 1)).toBe(true);
  });
  it("sortOrder 31, 레벨 1 → false", () => {
    expect(isContentUnlocked(31, 1)).toBe(false);
  });
  it("sortOrder 31, 레벨 2 → true", () => {
    expect(isContentUnlocked(31, 2)).toBe(true);
  });
  it("sortOrder 300, 레벨 10 → true", () => {
    expect(isContentUnlocked(300, 10)).toBe(true);
  });
  it("sortOrder 300, 레벨 9 → false", () => {
    expect(isContentUnlocked(300, 9)).toBe(false);
  });
});
