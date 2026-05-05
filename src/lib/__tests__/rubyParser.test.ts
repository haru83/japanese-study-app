import { describe, it, expect } from "vitest";
import { buildRubySegments } from "@/lib/rubyParser";

// ─── 기본 한자-후리가나 매칭 ─────────────────────────────

describe("buildRubySegments", () => {
  it("간단한 한자+히라가나: 日本語 → にほんご", () => {
    const result = buildRubySegments("日本語", "にほんご");
    expect(result).toEqual([
      { text: "日本語", ruby: "にほんご" },
    ]);
  });

  it("한자 + 히라가나 혼합: 食べる → たべる", () => {
    const result = buildRubySegments("食べる", "たべる");
    expect(result).toEqual([
      { text: "食", ruby: "た" },
      { text: "べる" },
    ]);
  });

  it("여러 한자 블록: 山登り → やまのぼり", () => {
    const result = buildRubySegments("山登り", "やまのぼり");
    expect(result).toEqual([
      { text: "山登", ruby: "やまのぼ" },
      { text: "り" },
    ]);
  });

  it("히라가나만 있는 텍스트: こんにちは → ruby 없음", () => {
    const result = buildRubySegments("こんにちは", "こんにちは");
    expect(result).toEqual([
      { text: "こんにちは" },
    ]);
  });

  it("빈 문자열 → 빈 배열", () => {
    expect(buildRubySegments("", "")).toEqual([]);
  });

  // ─── 엣지 케이스 ─────────────────────────────────────

  it("한자만 있는 텍스트: 東京 → とうきょう", () => {
    const result = buildRubySegments("東京", "とうきょう");
    expect(result).toEqual([
      { text: "東京", ruby: "とうきょう" },
    ]);
  });

  it("한자 블록 사이에 히라가나: 走って行く → はしっていく", () => {
    const result = buildRubySegments("走って行く", "はしっていく");
    expect(result).toEqual([
      { text: "走", ruby: "はし" },
      { text: "って" },
      { text: "行", ruby: "い" },
      { text: "く" },
    ]);
  });

  it("인접 비-ruby 세그먼트 병합: 今日は → きょうは", () => {
    const result = buildRubySegments("今日は", "きょうは");
    // "今日" is one kanji block with ruby "きょう", then "は" matches
    expect(result).toEqual([
      { text: "今日", ruby: "きょう" },
      { text: "は" },
    ]);
  });

  it("발음이 짧아 누락된 한자는 ruby 없이 처리", () => {
    // 강제로 불일치 상황: 발음이 텍스트보다 짧음
    const result = buildRubySegments("東京都", "とうきょう");
    // "東京都" → "とうきょう" 매칭. 끝에 '都'에 대응하는 발음이 없음
    expect(result.length).toBeGreaterThan(0);
    // 마지막 세그먼트에 '都'가 포함되어야 함
    const lastSeg = result[result.length - 1];
    expect(lastSeg.text).toContain("都");
  });

  it("후리가나가 빈 문자열이면 ruby 필드 생략", () => {
    // 발음이 빈 문자열이면 ruby 없이 텍스트만
    const result = buildRubySegments("漢字", "");
    expect(result).toEqual([
      { text: "漢字" },
    ]);
  });

  it("반복되는 한자+히라가나 패턴", () => {
    const result = buildRubySegments("見返す見返す", "みかえすみかえす");
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("숫자가 포함된 텍스트 처리", () => {
    // 아라비아 숫자는 발음과 불일치 가능 → pi 진행하지 않음
    const result = buildRubySegments("1日", "いちにち");
    expect(result.length).toBeGreaterThan(0);
  });

  it("구두점이 포함된 텍스트: 行きます。→ いきます。", () => {
    const result = buildRubySegments("行きます。", "いきます。");
    expect(result).toEqual([
      { text: "行", ruby: "い" },
      { text: "きます。" },
    ]);
  });
});
