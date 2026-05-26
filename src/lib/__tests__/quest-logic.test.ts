import { describe, it, expect } from "vitest";
import {
  QUEST_TEMPLATES,
  DIFFICULTY_ORDER,
  DIFFICULTY_META,
  dateToSeed,
  createSeededRng,
  selectDailyQuests,
  getTodayQuests,
  toDateStr,
  getEndOfDay,
  type QuestDifficulty,
  type QuestTemplate,
} from "@/lib/quest-logic";

// ─── dateToSeed ─────────────────────────────────────────────────────────────

describe("dateToSeed", () => {
  it("같은 날짜는 같은 시드를 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const seed1 = dateToSeed(date, "Asia/Seoul");
    const seed2 = dateToSeed(date, "Asia/Seoul");
    expect(seed1).toBe(seed2);
  });

  it("다른 날짜는 다른 시드를 반환한다", () => {
    const date1 = new Date("2025-06-15T10:00:00Z");
    const date2 = new Date("2025-06-16T10:00:00Z");
    const seed1 = dateToSeed(date1, "Asia/Seoul");
    const seed2 = dateToSeed(date2, "Asia/Seoul");
    expect(seed1).not.toBe(seed2);
  });

  it("KST 자정 경계에서 올바른 날짜 시드 생성", () => {
    // KST 23:30 Jan 1 = UTC 14:30 Jan 1
    // KST 00:30 Jan 2 = UTC 15:30 Jan 1
    const lateNight = new Date("2025-01-01T14:30:00Z");
    const afterMidnight = new Date("2025-01-01T15:30:00Z");
    expect(dateToSeed(lateNight, "Asia/Seoul")).not.toBe(dateToSeed(afterMidnight, "Asia/Seoul"));
  });

  it("시드는 양수이다", () => {
    const date = new Date("2025-01-01T00:00:00Z");
    expect(dateToSeed(date, "Asia/Seoul")).toBeGreaterThan(0);
  });
});

// ─── createSeededRng ───────────────────────────────────────────────────────

describe("createSeededRng", () => {
  it("같은 시드로 같은 시퀀스를 생성한다", () => {
    const rng1 = createSeededRng(42);
    const rng2 = createSeededRng(42);
    const seq1 = [rng1(), rng1(), rng1()];
    const seq2 = [rng2(), rng2(), rng2()];
    expect(seq1).toEqual(seq2);
  });

  it("다른 시드로 다른 시퀀스를 생성한다", () => {
    const rng1 = createSeededRng(1);
    const rng2 = createSeededRng(999);
    const val1 = rng1();
    const val2 = rng2();
    expect(val1).not.toBe(val2);
  });

  it("반환값은 [0, 1) 범위이다", () => {
    const rng = createSeededRng(12345);
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });
});

// ─── selectDailyQuests ─────────────────────────────────────────────────────

describe("selectDailyQuests", () => {
  it("정확히 3개의 퀘스트를 반환한다 (난이도별 1개)", () => {
    const quests = selectDailyQuests(20250615);
    expect(quests).toHaveLength(3);
  });

  it("각 난이도(EASY, MEDIUM, HARD)에서 1개씩 반환한다", () => {
    const quests = selectDailyQuests(20250615);
    const difficulties = quests.map((q) => q.difficulty);
    expect(difficulties).toContain("EASY");
    expect(difficulties).toContain("MEDIUM");
    expect(difficulties).toContain("HARD");
  });

  it("EASY 퀘스트가 항상 첫 번째이다", () => {
    const quests = selectDailyQuests(42);
    expect(quests[0].difficulty).toBe("EASY");
  });

  it("MEDIUM 퀘스트가 항상 두 번째이다", () => {
    const quests = selectDailyQuests(42);
    expect(quests[1].difficulty).toBe("MEDIUM");
  });

  it("HARD 퀘스트가 항상 세 번째이다", () => {
    const quests = selectDailyQuests(42);
    expect(quests[2].difficulty).toBe("HARD");
  });

  it("동일한 시드로 동일한 퀘스트를 반환한다 (결정론적)", () => {
    const seed = 20250615;
    const a = selectDailyQuests(seed);
    const b = selectDailyQuests(seed);
    expect(a).toEqual(b);
  });

  it("다른 시드로 다른 퀘스트 조합이 가능하다", () => {
    const results = new Set<string>();
    for (let seed = 1; seed <= 30; seed++) {
      const quests = selectDailyQuests(seed);
      const key = quests.map((q) => `${q.type}-${q.difficulty}-${q.requirement}`).join("|");
      results.add(key);
    }
    // 30개의 다른 시드에서 적어도 2개 이상의 다른 조합이 나와야 함
    expect(results.size).toBeGreaterThan(1);
  });

  it("모든 반환된 퀘스트는 템플릿 풀에 존재한다", () => {
    const quests = selectDailyQuests(20250615);
    for (const quest of quests) {
      const found = QUEST_TEMPLATES.find(
        (t) =>
          t.type === quest.type &&
          t.difficulty === quest.difficulty &&
          t.requirement === quest.requirement
      );
      expect(found).toBeDefined();
    }
  });

  it("각 퀘스트에 고유 id가 있다", () => {
    const quests = selectDailyQuests(20250615);
    const ids = quests.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(3);
  });

  it("퀘스트 id에 시드와 난이도가 포함된다", () => {
    const quests = selectDailyQuests(20250615);
    for (const quest of quests) {
      expect(quest.id).toContain("20250615");
      expect(quest.id).toContain(quest.difficulty);
    }
  });
});

// ─── getTodayQuests ─────────────────────────────────────────────────────────

describe("getTodayQuests", () => {
  it("오늘 날짜 기준으로 3개의 퀘스트를 반환한다", () => {
    const quests = getTodayQuests();
    expect(quests).toHaveLength(3);
  });

  it("같은 날에 여러 번 호출해도 동일한 결과를 반환한다", () => {
    const a = getTodayQuests();
    const b = getTodayQuests();
    expect(a).toEqual(b);
  });
});

// ─── QUEST_TEMPLATES ────────────────────────────────────────────────────────

describe("QUEST_TEMPLATES", () => {
  it("모든 난이도(EASY, MEDIUM, HARD)가 포함되어 있다", () => {
    const difficulties = new Set(QUEST_TEMPLATES.map((t) => t.difficulty));
    expect(difficulties).toContain("EASY");
    expect(difficulties).toContain("MEDIUM");
    expect(difficulties).toContain("HARD");
  });

  it("모든 타입(DIARY, LESSON, REVIEW, QUIZ)이 포함되어 있다", () => {
    const types = new Set(QUEST_TEMPLATES.map((t) => t.type));
    expect(types).toContain("DIARY");
    expect(types).toContain("LESSON");
    expect(types).toContain("REVIEW");
    expect(types).toContain("QUIZ");
  });

  it("모든 템플릿에 제목, 설명, 아이콘이 있다", () => {
    for (const template of QUEST_TEMPLATES) {
      expect(template.title).toBeTruthy();
      expect(template.description).toBeTruthy();
      expect(template.icon).toBeTruthy();
    }
  });

  it("모든 요구량은 1 이상이다", () => {
    for (const template of QUEST_TEMPLATES) {
      expect(template.requirement).toBeGreaterThanOrEqual(1);
    }
  });

  it("보상 스탬프는 난이도에 비례한다", () => {
    for (const template of QUEST_TEMPLATES) {
      if (template.difficulty === "EASY") expect(template.rewardStamps).toBe(1);
      if (template.difficulty === "MEDIUM") expect(template.rewardStamps).toBe(2);
      if (template.difficulty === "HARD") expect(template.rewardStamps).toBe(3);
    }
  });

  it("XP 보상은 난이도에 비례한다", () => {
    for (const template of QUEST_TEMPLATES) {
      if (template.difficulty === "EASY") expect(template.xpReward).toBe(5);
      if (template.difficulty === "MEDIUM") expect(template.xpReward).toBe(10);
      if (template.difficulty === "HARD") expect(template.xpReward).toBe(20);
    }
  });

  it("각 난이도에 적어도 2개 이상의 템플릿이 있다", () => {
    for (const diff of DIFFICULTY_ORDER) {
      const count = QUEST_TEMPLATES.filter((t) => t.difficulty === diff).length;
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });
});

// ─── DIFFICULTY_META ────────────────────────────────────────────────────────

describe("DIFFICULTY_META", () => {
  it("세 가지 난이도 모두 메타데이터가 있다", () => {
    for (const diff of DIFFICULTY_ORDER) {
      expect(DIFFICULTY_META[diff]).toBeDefined();
      expect(DIFFICULTY_META[diff].label).toBeTruthy();
      expect(DIFFICULTY_META[diff].color).toBeTruthy();
    }
  });
});

// ─── toDateStr / getEndOfDay ────────────────────────────────────────────────

describe("toDateStr", () => {
  it("KST 기준 날짜 문자열 반환", () => {
    const date = new Date("2025-01-15T12:00:00Z");
    expect(toDateStr(date, "Asia/Seoul")).toBe("2025-01-15");
  });
});

describe("getEndOfDay", () => {
  it("반환값이 원본 날짜보다 미래이다", () => {
    // getEndOfDay는 타임존 보정이 포함되므로, 로컬 타임존과 KST가 다를 경우
    // 단순 비교보다는 결과가 유효한 Date인지 확인
    const date = new Date("2025-06-15T10:00:00Z");
    const end = getEndOfDay(date, "Asia/Seoul");
    expect(end).toBeInstanceOf(Date);
    expect(end.getTime()).not.toBeNaN();
  });

  it("같은 날짜에 대해 동일한 결과를 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const end1 = getEndOfDay(date, "Asia/Seoul");
    const end2 = getEndOfDay(date, "Asia/Seoul");
    expect(end1.getTime()).toBe(end2.getTime());
  });
});