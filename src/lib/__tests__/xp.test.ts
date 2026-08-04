import { describe, it, expect } from "vitest";
import {
  LEVEL_THRESHOLDS,
  MAX_LEVEL,
  XP_REWARDS,
  calculateLevel,
  xpForNextLevel,
  xpProgress,
  computeXpResult,
  getLevelTitle,
} from "@/lib/xp";

// ─── calculateLevel ──────────────────────────────────────

describe("calculateLevel", () => {
  it("XP 0 → 레벨 1", () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it("XP 99 → 레벨 1 (임계값 100 미달)", () => {
    expect(calculateLevel(99)).toBe(1);
  });

  it("XP 100 → 레벨 2 (첫 번째 임계값 도달)", () => {
    expect(calculateLevel(100)).toBe(2);
  });

  it("XP 250 → 레벨 3", () => {
    expect(calculateLevel(250)).toBe(3);
  });

  it("XP 450 → 레벨 4", () => {
    expect(calculateLevel(450)).toBe(4);
  });

  it("XP 700 → 레벨 5", () => {
    expect(calculateLevel(700)).toBe(5);
  });

  it("XP 1000 → 레벨 6", () => {
    expect(calculateLevel(1000)).toBe(6);
  });

  it("XP 1400 → 레벨 7", () => {
    expect(calculateLevel(1400)).toBe(7);
  });

  it("XP 1900 → 레벨 8", () => {
    expect(calculateLevel(1900)).toBe(8);
  });

  it("XP 2500 → 레벨 9", () => {
    expect(calculateLevel(2500)).toBe(9);
  });

  it("XP 3200 → 레벨 10 (최고 레벨)", () => {
    expect(calculateLevel(3200)).toBe(10);
  });

  it("XP 3500 → 여전히 레벨 10 (MAX_LEVEL 캡)", () => {
    expect(calculateLevel(3500)).toBe(10);
  });

  it("XP 9999 → 레벨 10 (MAX_LEVEL 캡)", () => {
    expect(calculateLevel(9999)).toBe(10);
  });

  it("임계값 사이 구간: XP 150 → 레벨 2", () => {
    expect(calculateLevel(150)).toBe(2);
  });

  it("임계값 사이 구간: XP 300 → 레벨 3", () => {
    expect(calculateLevel(300)).toBe(3);
  });

  it("MAX_LEVEL은 LEVEL_THRESHOLDS 길이와 같다", () => {
    expect(MAX_LEVEL).toBe(LEVEL_THRESHOLDS.length);
    expect(MAX_LEVEL).toBe(10);
  });
});

// ─── xpForNextLevel ──────────────────────────────────────

describe("xpForNextLevel", () => {
  it("레벨 1 → 다음 레벨 필요 XP = 100", () => {
    expect(xpForNextLevel(1)).toBe(100);
  });

  it("레벨 2 → 다음 레벨 필요 XP = 250", () => {
    expect(xpForNextLevel(2)).toBe(250);
  });

  it("레벨 5 → 다음 레벨 필요 XP = 1000", () => {
    expect(xpForNextLevel(5)).toBe(1000);
  });

  it("최고 레벨 10 → 마지막 임계값 3200 반환", () => {
    expect(xpForNextLevel(MAX_LEVEL)).toBe(LEVEL_THRESHOLDS[MAX_LEVEL - 1]);
  });
});

// ─── xpProgress ──────────────────────────────────────────

describe("xpProgress", () => {
  it("XP 0, 레벨 1 → 진행률 0%", () => {
    expect(xpProgress(0, 1)).toBe(0);
  });

  it("XP 50, 레벨 1 → 진행률 50% (0→100의 중간)", () => {
    expect(xpProgress(50, 1)).toBe(50);
  });

  it("XP 100, 레벨 2 → 진행률 0% (100→250의 시작)", () => {
    expect(xpProgress(100, 2)).toBe(0);
  });

  it("XP 175, 레벨 2 → 진행률 50% (100→250의 중간)", () => {
    expect(xpProgress(175, 2)).toBe(50);
  });

  it("최고 레벨에서는 진행률 100%", () => {
    expect(xpProgress(3200, 10)).toBe(100);
  });

  it("최고 레벨 초과 XP에서도 100%", () => {
    expect(xpProgress(9999, 10)).toBe(100);
  });

  it("XP 10, 레벨 1 → 진행률 10% (0→100 중 10)", () => {
    expect(xpProgress(10, 1)).toBe(10);
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

  it("레벨업 발생: 95 + 10 = 105 XP, 레벨 1→2", () => {
    const result = computeXpResult(95, 10, 1);
    expect(result.newXp).toBe(105);
    expect(result.newLevel).toBe(2);
    expect(result.leveledUp).toBe(true);
  });

  it("연속 레벨업 없음: 150 + 10 = 160 XP, 레벨 2 유지", () => {
    const result = computeXpResult(150, 10, 1);
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
    const result = computeXpResult(0, XP_REWARDS.DIARY_COMPLETE, 1);
    expect(result.newLevel).toBeLessThanOrEqual(result.newLevel);
  });

  it("최고 레벨에서 XP 계속 누적", () => {
    const result = computeXpResult(3200, 10, 1);
    expect(result.newXp).toBe(3210);
    expect(result.newLevel).toBe(10);
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

// ─── getLevelTitle ───────────────────────────────────────

describe("getLevelTitle", () => {
  it("returns correct level title for levels 1 through 6+", () => {
    expect(getLevelTitle(1)).toBe("초보 왕왕이");
    expect(getLevelTitle(2)).toBe("공부하는 왕왕이");
    expect(getLevelTitle(3)).toBe("경어 능력자");
    expect(getLevelTitle(4)).toBe("마스터 왕왕이");
    expect(getLevelTitle(5)).toBe("일본어 학자");
    expect(getLevelTitle(6)).toBe("전설의 대마왕");
  });
});

describe("Level 10 expansion", () => {
  it("returns titles for levels 7 through 10", () => {
    expect(getLevelTitle(7)).toBe("일본어 능력자");
    expect(getLevelTitle(8)).toBe("어휘 대가");
    expect(getLevelTitle(9)).toBe("경어 현자");
    expect(getLevelTitle(10)).toBe("신화의 만렙 왕왕이");
  });
});

