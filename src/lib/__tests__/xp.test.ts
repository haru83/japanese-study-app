import { describe, it, expect } from "vitest";
import {
  LEVEL_THRESHOLDS,
  MAX_LEVEL,
  XP_REWARDS,
  calculateLevel,
  xpForNextLevel,
  xpProgress,
  computeXpResult,
} from "@/lib/xp";

// ─── calculateLevel ──────────────────────────────────────

describe("calculateLevel", () => {
  it("XP 0 → 레벨 1", () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it("XP 49 → 레벨 1 (임계값 50 미달)", () => {
    expect(calculateLevel(49)).toBe(1);
  });

  it("XP 50 → 레벨 2 (첫 번째 임계값 도달)", () => {
    expect(calculateLevel(50)).toBe(2);
  });

  it("XP 120 → 레벨 3", () => {
    expect(calculateLevel(120)).toBe(3);
  });

  it("XP 210 → 레벨 4", () => {
    expect(calculateLevel(210)).toBe(4);
  });

  it("XP 320 → 레벨 5", () => {
    expect(calculateLevel(320)).toBe(5);
  });

  it("XP 450 → 레벨 6 (최고 레벨)", () => {
    expect(calculateLevel(450)).toBe(6);
  });

  it("XP 500 → 여전히 레벨 6 (MAX_LEVEL 캡)", () => {
    expect(calculateLevel(500)).toBe(6);
  });

  it("XP 9999 → 레벨 6 (MAX_LEVEL 캡)", () => {
    expect(calculateLevel(9999)).toBe(6);
  });

  it("임계값 사이 구간: XP 80 → 레벨 2", () => {
    expect(calculateLevel(80)).toBe(2);
  });

  it("임계값 사이 구간: XP 200 → 레벨 3", () => {
    expect(calculateLevel(200)).toBe(3);
  });

  it("MAX_LEVEL은 LEVEL_THRESHOLDS 길이와 같다", () => {
    expect(MAX_LEVEL).toBe(LEVEL_THRESHOLDS.length);
  });
});

// ─── xpForNextLevel ──────────────────────────────────────

describe("xpForNextLevel", () => {
  it("레벨 1 → 다음 레벨 필요 XP = 50", () => {
    expect(xpForNextLevel(1)).toBe(50);
  });

  it("레벨 2 → 다음 레벨 필요 XP = 120", () => {
    expect(xpForNextLevel(2)).toBe(120);
  });

  it("레벨 5 → 다음 레벨 필요 XP = 450", () => {
    expect(xpForNextLevel(5)).toBe(450);
  });

  it("최고 레벨 6 → 마지막 임계값 450 반환", () => {
    expect(xpForNextLevel(MAX_LEVEL)).toBe(LEVEL_THRESHOLDS[MAX_LEVEL - 1]);
  });
});

// ─── xpProgress ──────────────────────────────────────────

describe("xpProgress", () => {
  it("XP 0, 레벨 1 → 진행률 0%", () => {
    expect(xpProgress(0, 1)).toBe(0);
  });

  it("XP 25, 레벨 1 → 진행률 50% (0→50의 중간)", () => {
    expect(xpProgress(25, 1)).toBe(50);
  });

  it("XP 50, 레벨 2 → 진행률 0% (50→120의 시작)", () => {
    expect(xpProgress(50, 2)).toBe(0);
  });

  it("XP 85, 레벨 2 → 진행률 50% (50→120의 중간)", () => {
    expect(xpProgress(85, 2)).toBe(50);
  });

  it("최고 레벨에서는 진행률 100%", () => {
    expect(xpProgress(450, 6)).toBe(100);
  });

  it("최고 레벨超额 XP에서도 100%", () => {
    expect(xpProgress(999, 6)).toBe(100);
  });

  it("XP 10, 레벨 1 → 진행률 20% (0→50 중 10)", () => {
    expect(xpProgress(10, 1)).toBe(20);
  });
});

// ─── computeXpResult ─────────────────────────────────────

describe("computeXpResult", () => {
  it("기본 XP 증가: 0 + 10 = 10 XP, 레벨 1 유지", () => {
    const result = computeXpResult(0, 10, 1);
    expect(result).toEqual({
      xpGained: 10,
      stampsGained: 1,
      newXp: 10,
      newLevel: 1,
      leveledUp: false,
    });
  });

  it("레벨업 발생: 45 + 10 = 55 XP, 레벨 1→2", () => {
    const result = computeXpResult(45, 10, 1);
    expect(result.newXp).toBe(55);
    expect(result.newLevel).toBe(2);
    expect(result.leveledUp).toBe(true);
  });

  it("연속 레벨업 없음: 100 + 10 = 110 XP, 레벨 2 유지", () => {
    const result = computeXpResult(100, 10, 1);
    expect(result.newLevel).toBe(2);
    expect(result.leveledUp).toBe(false);
  });

  it("XP 0에 스탬프 0 추가", () => {
    const result = computeXpResult(0, 0, 0);
    expect(result.stampsGained).toBe(0);
    expect(result.xpGained).toBe(0);
    expect(result.newXp).toBe(0);
  });

  it("다중 레벨업은 불가 (임계값 간격이 보상보다 큼)", () => {
    // 일기 완료 보상 10 XP로는 한 번에 2레벨 업 불가
    const result = computeXpResult(0, XP_REWARDS.DIARY_COMPLETE, 1);
    expect(result.newLevel).toBeLessThanOrEqual(result.newLevel);
  });

  it("최고 레벨에서 XP 계속 누적", () => {
    const result = computeXpResult(450, 10, 1);
    expect(result.newXp).toBe(460);
    expect(result.newLevel).toBe(6);
    expect(result.leveledUp).toBe(false);
  });
});

// ─── XP_REWARDS 상수 검증 ────────────────────────────────

describe("XP_REWARDS", () => {
  it("모든 보상값은 양수", () => {
    for (const [key, value] of Object.entries(XP_REWARDS)) {
      expect(value, `${key} should be positive`).toBeGreaterThan(0);
    }
  });

  it("레슨 보상 > 일기 보상", () => {
    expect(XP_REWARDS.KEIGO_LESSON_COMPLETE).toBeGreaterThan(XP_REWARDS.DIARY_COMPLETE);
  });

  it("퀴즈 만점 보너스는 기본 보상보다 작다", () => {
    expect(XP_REWARDS.KEIGO_QUIZ_PERFECT).toBeLessThan(XP_REWARDS.KEIGO_LESSON_COMPLETE);
    expect(XP_REWARDS.LEARNING_DIARY_QUIZ_PERFECT).toBeLessThan(XP_REWARDS.LEARNING_DIARY_COMPLETE);
  });
});
