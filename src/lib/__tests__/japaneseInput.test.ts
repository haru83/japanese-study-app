import { describe, it, expect } from "vitest";
import {
  isJapaneseChar,
  filterJapaneseOnly,
  hasNonJapanese,
  findFirstNonJapanese,
} from "../japaneseInput";

describe("isJapaneseChar", () => {
  it("히라가나를 허용한다", () => {
    expect(isJapaneseChar("あ")).toBe(true);
    expect(isJapaneseChar("ん")).toBe(true);
  });

  it("가타카나를 허용한다", () => {
    expect(isJapaneseChar("ア")).toBe(true);
    expect(isJapaneseChar("ン")).toBe(true);
  });

  it("한자를 허용한다", () => {
    expect(isJapaneseChar("日")).toBe(true);
    expect(isJapaneseChar("本")).toBe(true);
    expect(isJapaneseChar("語")).toBe(true);
  });

  it("일본어 구두점을 허용한다", () => {
    expect(isJapaneseChar("。")).toBe(true);
    expect(isJapaneseChar("、")).toBe(true);
    expect(isJapaneseChar("「")).toBe(true);
    expect(isJapaneseChar("」")).toBe(true);
  });

  it("공백을 허용한다", () => {
    expect(isJapaneseChar(" ")).toBe(true);
    expect(isJapaneseChar("　")).toBe(true); // 전각 공백
  });

  it("개행을 허용한다", () => {
    expect(isJapaneseChar("\n")).toBe(true);
  });

  it("한글을 거부한다", () => {
    expect(isJapaneseChar("한")).toBe(false);
    expect(isJapaneseChar("ㄱ")).toBe(false);
  });

  it("영문을 거부한다", () => {
    expect(isJapaneseChar("A")).toBe(false);
    expect(isJapaneseChar("z")).toBe(false);
  });

  it("반각 숫자를 거부한다", () => {
    expect(isJapaneseChar("1")).toBe(false);
  });

  it("전각 숫자를 허용한다", () => {
    expect(isJapaneseChar("１")).toBe(true);
    expect(isJapaneseChar("９")).toBe(true);
  });

  it("이모지를 거부한다", () => {
    expect(isJapaneseChar("😊")).toBe(false);
  });
});

describe("filterJapaneseOnly", () => {
  it("일본어만 있는 문자열은 그대로 반환한다", () => {
    expect(filterJapaneseOnly("今日は良い天気です。")).toBe("今日は良い天気です。");
  });

  it("한글이 섞인 문자열에서 한글을 제거한다", () => {
    // "은", "좋은", "날씨" 모두 한글 → 제거됨
    expect(filterJapaneseOnly("今日은 좋은 날씨です。")).toBe("今日  です。");
  });

  it("영문이 섞인 문자열에서 영문을 제거한다", () => {
    expect(filterJapaneseOnly("Hello今日は")).toBe("今日は");
  });

  it("공백과 개행은 유지한다", () => {
    expect(filterJapaneseOnly("今日は\n良い天気です")).toBe("今日は\n良い天気です");
  });

  it("빈 문자열은 빈 문자열을 반환한다", () => {
    expect(filterJapaneseOnly("")).toBe("");
  });
});

describe("hasNonJapanese", () => {
  it("일본어만 있으면 false", () => {
    expect(hasNonJapanese("今日は良い天気です。")).toBe(false);
  });

  it("한글이 섞여 있으면 true", () => {
    expect(hasNonJapanese("今日은 좋은 날씨")).toBe(true);
  });

  it("영문이 섞여 있으면 true", () => {
    expect(hasNonJapanese("OKです")).toBe(true);
  });

  it("공백만 있으면 false (공백은 허용)", () => {
    expect(hasNonJapanese("   ")).toBe(false);
  });

  it("개행만 있으면 false", () => {
    expect(hasNonJapanese("\n\n")).toBe(false);
  });
});

describe("findFirstNonJapanese", () => {
  it("일본어만 있으면 -1 반환", () => {
    expect(findFirstNonJapanese("こんにちは")).toBe(-1);
  });

  it("한글의 첫 위치를 반환한다", () => {
    // "今日은" → "은"이 index 2
    expect(findFirstNonJapanese("今日은")).toBe(2);
  });

  it("첫 글자가 비일본어면 0 반환", () => {
    expect(findFirstNonJapanese("Hello")).toBe(0);
  });
});
