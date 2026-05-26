import { describe, it, expect } from "vitest";
import {
  toDateStr,
  getEndOfDay,
  selectDailyChallenges,
  CHALLENGE_TEMPLATES,
} from "@/lib/dailyChallenge";

// ─── toDateStr ─────────────────────────────────────────────

describe("toDateStr", () => {
  it("KST 기준 날짜 문자열 반환", () => {
    const date = new Date("2025-01-15T12:00:00Z");
    expect(toDateStr(date, "Asia/Seoul")).toBe("2025-01-15");
  });

  it("다른 타임존에서 다른 날짜 반환", () => {
    const date = new Date("2025-01-15T12:00:00Z");
    expect(toDateStr(date, "America/New_York")).toBe("2025-01-15");
  });
});

// ─── getEndOfDay ───────────────────────────────────────────

describe("getEndOfDay", () => {
  it("해당 날짜의 23:59:59를 반환", () => {
    const date = new Date("2025-01-15T10:00:00Z");
    const end = getEndOfDay(date, "Asia/Seoul");
    const endStr = end.toISOString();
    expect(endStr).toContain("T");
    expect(end.getTime()).toBeGreaterThan(date.getTime());
  });
});

// ─── selectDailyChallenges ─────────────────────────────────

describe("selectDailyChallenges", () => {
  it("정확히 3개의 챌린지를 반환", () => {
    const selected = selectDailyChallenges();
    expect(selected).toHaveLength(3);
  });

  it("모든 반환된 챌린지는 템플릿 풀에 존재", () => {
    const selected = selectDailyChallenges();
    for (const challenge of selected) {
      const found = CHALLENGE_TEMPLATES.find(
        (t) => t.type === challenge.type && t.requirement === challenge.requirement
      );
      expect(found).toBeDefined();
    }
  });

  it("동일한 시드로 동일한 결과 반환 (결정론적)", () => {
    const seed = 12345;
    const a = selectDailyChallenges(seed);
    const b = selectDailyChallenges(seed);
    expect(a).toEqual(b);
  });

  it("다른 시드로 다른 결과 반환 가능", () => {
    const results = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const selected = selectDailyChallenges(seed);
      const key = selected.map((c) => `${c.type}-${c.requirement}`).join(",");
      results.add(key);
    }
    expect(results.size).toBeGreaterThan(1);
  });

  it("3개의 서로 다른 챌린지 반환 (중복 없음)", () => {
    const selected = selectDailyChallenges(42);
    const keys = selected.map((c) => `${c.type}-${c.requirement}`);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(3);
  });
});

// ─── CHALLENGE_TEMPLATES ───────────────────────────────────

describe("CHALLENGE_TEMPLATES", () => {
  it("모든 요구량은 1 이상", () => {
    for (const template of CHALLENGE_TEMPLATES) {
      expect(template.requirement).toBeGreaterThanOrEqual(1);
    }
  });

  it("모든 보상 스탬프는 1 이상 10 이하", () => {
    for (const template of CHALLENGE_TEMPLATES) {
      expect(template.rewardStamps).toBeGreaterThanOrEqual(1);
      expect(template.rewardStamps).toBeLessThanOrEqual(10);
    }
  });

  it("모든 템플릿에 제목과 설명과 아이콘이 존재", () => {
    for (const template of CHALLENGE_TEMPLATES) {
      expect(template.title).toBeTruthy();
      expect(template.description).toBeTruthy();
      expect(template.icon).toBeTruthy();
    }
  });

  it("4가지 타입 모두 포함", () => {
    const types = new Set(CHALLENGE_TEMPLATES.map((t) => t.type));
    expect(types).toContain("DIARY");
    expect(types).toContain("LESSON");
    expect(types).toContain("REVIEW");
    expect(types).toContain("QUIZ");
  });
});
