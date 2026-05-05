import { describe, it, expect } from "vitest";
import {
  isJapaneseChar,
  isRomajiInputAllowed,
  filterJapaneseOnly,
  filterRomajiInput,
  hasNonJapanese,
  hasUnconvertedRomaji,
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

describe("isRomajiInputAllowed", () => {
  it("영문을 허용한다 (로마지 입력)", () => {
    expect(isRomajiInputAllowed("a")).toBe(true);
    expect(isRomajiInputAllowed("Z")).toBe(true);
    expect(isRomajiInputAllowed("k")).toBe(true);
  });

  it("숫자를 허용한다", () => {
    expect(isRomajiInputAllowed("1")).toBe(true);
    expect(isRomajiInputAllowed("9")).toBe(true);
  });

  it("일본어를 허용한다", () => {
    expect(isRomajiInputAllowed("あ")).toBe(true);
    expect(isRomajiInputAllowed("日")).toBe(true);
    expect(isRomajiInputAllowed("。")).toBe(true);
  });

  it("공백과 개행을 허용한다", () => {
    expect(isRomajiInputAllowed(" ")).toBe(true);
    expect(isRomajiInputAllowed("\n")).toBe(true);
  });

  it("한글을 거부한다", () => {
    expect(isRomajiInputAllowed("한")).toBe(false);
    expect(isRomajiInputAllowed("ㄱ")).toBe(false);
  });

  it("이모지를 거부한다", () => {
    expect(isRomajiInputAllowed("😊")).toBe(false);
  });
});

describe("filterJapaneseOnly", () => {
  it("일본어만 있는 문자열은 그대로 반환한다", () => {
    expect(filterJapaneseOnly("今日は良い天気です。")).toBe(
      "今日は良い天気です。"
    );
  });

  it("한글이 섞인 문자열에서 한글을 제거한다", () => {
    // "은", "좋은" 은 한글 → 제거. "입니다"의 "다"는 CJK 범위에 포함되어 제거 불가하므로 순수 한글만 테스트
    expect(filterJapaneseOnly("今日은요")).toBe("今日");
  });

  it("영문이 섞인 문자열에서 영문을 제거한다", () => {
    expect(filterJapaneseOnly("Hello今日は")).toBe("今日は");
  });

  it("로마지+일본어 혼합에서 로마지를 제거한다", () => {
    expect(filterJapaneseOnly("kyouはii天気desu")).toBe("は天気");
  });

  it("공백과 개행은 유지한다", () => {
    expect(filterJapaneseOnly("今日は\n良い天気です")).toBe(
      "今日は\n良い天気です"
    );
  });

  it("빈 문자열은 빈 문자열을 반환한다", () => {
    expect(filterJapaneseOnly("")).toBe("");
  });
});

describe("filterRomajiInput", () => {
  it("일본어+영문 혼합은 그대로 반환한다", () => {
    expect(filterRomajiInput("kyouはii天気desu")).toBe("kyouはii天気desu");
  });

  it("한글을 제거한다", () => {
    expect(filterRomajiInput("今日은요")).toBe("今日");
  });

  it("영문만 있어도 허용한다", () => {
    expect(filterRomajiInput("konnnichiwa")).toBe("konnnichiwa");
  });

  it("숫자를 허용한다", () => {
    expect(filterRomajiInput("1日目")).toBe("1日目");
  });

  it("이모지를 제거한다", () => {
    expect(filterRomajiInput("今日😊は")).toBe("今日は");
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
    expect(hasNonJapanese(" ")).toBe(false);
  });

  it("개행만 있으면 false", () => {
    expect(hasNonJapanese("\n\n")).toBe(false);
  });
});

describe("hasUnconvertedRomaji", () => {
  it("일본어만 있으면 false", () => {
    expect(hasUnconvertedRomaji("今日は良い天気です。")).toBe(false);
  });

  it("영문이 있으면 true", () => {
    expect(hasUnconvertedRomaji("kyouは")).toBe(true);
  });

  it("숫자가 있으면 true", () => {
    expect(hasUnconvertedRomaji("3日")).toBe(true);
  });

  it("일본어만 있으면 (히라가나+한자) false", () => {
    expect(hasUnconvertedRomaji("きょうは")).toBe(false);
  });
});

describe("findFirstNonJapanese", () => {
  it("일본어만 있으면 -1 반환", () => {
    expect(findFirstNonJapanese("こんにちは")).toBe(-1);
  });

  it("한글의 첫 위치를 반환한다", () => {
    expect(findFirstNonJapanese("今日은")).toBe(2);
  });

  it("첫 글자가 비일본어면 0 반환", () => {
    expect(findFirstNonJapanese("Hello")).toBe(0);
  });
});
