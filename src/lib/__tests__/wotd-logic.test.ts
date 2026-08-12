import { describe, it, expect } from "vitest";
import {
  dateToWotdIndex,
  selectWordOfTheDay,
  type VocabItem,
} from "@/lib/wotd-logic";

// ─── 테스트용 단어장 ──────────────────────────────────────────────────────

const keigoVocab: VocabItem[] = [
  { word: "今日", reading: "きょう", meaning: "오늘" },
  { word: "明日", reading: "あした", meaning: "내일" },
  { word: "先生", reading: "せんせい", meaning: "선생님" },
  { word: "学生", reading: "がくせい", meaning: "학생" },
  { word: "電話", reading: "でんわ", meaning: "전화" },
];

const diaryVocab: VocabItem[] = [
  { word: "食べる", reading: "たべる", meaning: "먹다" },
  { word: "飲む", reading: "のむ", meaning: "마시다" },
  { word: "走る", reading: "はしる", meaning: "달리다" },
  { word: "読む", reading: "よむ", meaning: "읽다" },
];

// ─── dateToWotdIndex ──────────────────────────────────────────────────────

describe("dateToWotdIndex", () => {
  it("같은 날짜는 같은 인덱스를 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const idx1 = dateToWotdIndex(date, 100, "Asia/Seoul");
    const idx2 = dateToWotdIndex(date, 100, "Asia/Seoul");
    expect(idx1).toBe(idx2);
  });

  it("다른 날짜는 다른 인덱스를 반환할 수 있다", () => {
    const date1 = new Date("2025-06-15T10:00:00Z");
    const date2 = new Date("2025-06-16T10:00:00Z");
    const indices = new Set<number>();
    for (let d = 1; d <= 30; d++) {
      const date = new Date(`2025-06-${String(d).padStart(2, "0")}T10:00:00Z`);
      indices.add(dateToWotdIndex(date, 100, "Asia/Seoul"));
    }
    expect(indices.size).toBeGreaterThan(1);
  });

  it("반환값은 항상 0 이상 poolSize 미만이다", () => {
    for (let d = 1; d <= 30; d++) {
      const date = new Date(`2025-06-${String(d).padStart(2, "0")}T10:00:00Z`);
      const idx = dateToWotdIndex(date, 9, "Asia/Seoul");
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(9);
    }
  });

  it("poolSize가 0이면 0을 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    expect(dateToWotdIndex(date, 0, "Asia/Seoul")).toBe(0);
  });

  it("poolSize가 1이면 항상 0을 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    expect(dateToWotdIndex(date, 1, "Asia/Seoul")).toBe(0);
  });
});

// ─── selectWordOfTheDay ───────────────────────────────────────────────────

describe("selectWordOfTheDay", () => {
  it("빈 단어장이면 null을 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    expect(selectWordOfTheDay(date, [], [])).toBeNull();
  });

  it("단어장이 있으면 WotdEntry를 반환한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const result = selectWordOfTheDay(date, keigoVocab, diaryVocab);
    expect(result).not.toBeNull();
    expect(result!.word).toBeTruthy();
    expect(result!.meaning).toBeTruthy();
  });

  it("같은 날짜에 같은 단어를 반환한다 (결정론적)", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const a = selectWordOfTheDay(date, keigoVocab, diaryVocab);
    const b = selectWordOfTheDay(date, keigoVocab, diaryVocab);
    expect(a).toEqual(b);
  });

  it("다른 날짜에 다른 단어를 반환할 수 있다", () => {
    const words = new Set<string>();
    for (let d = 1; d <= 30; d++) {
      const date = new Date(`2025-06-${String(d).padStart(2, "0")}T10:00:00Z`);
      const result = selectWordOfTheDay(date, keigoVocab, diaryVocab);
      if (result) words.add(result.word);
    }
    expect(words.size).toBeGreaterThan(1);
  });

  it("keigo 단어장만 있어도 동작한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const result = selectWordOfTheDay(date, keigoVocab, []);
    expect(result).not.toBeNull();
    expect(result!.sourceType).toBe("keigo");
  });

  it("diary 단어장만 있어도 동작한다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const result = selectWordOfTheDay(date, [], diaryVocab);
    expect(result).not.toBeNull();
    expect(result!.sourceType).toBe("learning-diary");
  });

  it("reading이 없으면 빈 문자열을 반환한다", () => {
    const vocab: VocabItem[] = [{ word: "猫", meaning: "고양이" }];
    const date = new Date("2025-06-15T10:00:00Z");
    const result = selectWordOfTheDay(date, vocab, []);
    expect(result).not.toBeNull();
    expect(result!.reading).toBe("");
  });

  it("sourceType이 올바르게 설정된다", () => {
    const date = new Date("2025-06-15T10:00:00Z");
    const result = selectWordOfTheDay(date, keigoVocab, diaryVocab);
    expect(result).not.toBeNull();
    expect(["keigo", "learning-diary"]).toContain(result!.sourceType);
  });

  it("sourceId가 전달되면 해당 ID를 유지한다", () => {
    const vocab: VocabItem[] = [{ word: "七五三", meaning: "시치고산", sourceId: "photography-studio" }];
    const date = new Date("2025-06-15T10:00:00Z");
    const result = selectWordOfTheDay(date, vocab, []);
    expect(result).not.toBeNull();
    expect(result!.sourceId).toBe("photography-studio");
  });
});