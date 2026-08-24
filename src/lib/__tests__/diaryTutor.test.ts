import { describe, it, expect } from "vitest";
import { ruleBasedReview, splitSentences } from "@/lib/diaryTutorLogic";

describe("diaryTutorLogic - 문장 분리", () => {
  it("일본어 문장 마침표, 물음표, 느낌표, 줄바꿈 기준으로 문장을 분리한다", () => {
    const text = "今日はいい天気でした。友達と映画を見ました！楽しかったですか？はい。";
    const sentences = splitSentences(text);
    expect(sentences).toHaveLength(4);
    expect(sentences[0]).toBe("今日はいい天気でした。");
    expect(sentences[1]).toBe("友達と映画を見ました！");
    expect(sentences[2]).toBe("楽しかったですか？");
    expect(sentences[3]).toBe("はい。");
  });
});

describe("diaryTutorLogic - 규칙 기반 첨삭 (ruleBasedReview)", () => {
  it("과거 시제 불일치 오류를 감지하고 교정한다 (ます → ました)", () => {
    const result = ruleBasedReview("昨日の日記", "昨日、友達と映画を見ます。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].original).toBe("昨日、友達と映画を見ます。");
    expect(result.reviews[0].improved).toBe("昨日、友達と映画を見ました。");
    expect(result.improvedText).toBe("昨日、友達と映画を見ました。");
    expect(result.reviews[0].issues[0]).toContain("과거형");
  });

  it("い형용사 + でした 오류를 감지하고 교정한다 (美味しいでした → 美味しかったです)", () => {
    const result = ruleBasedReview("ラーメン", "ラーメンは美味しいでした。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].improved).toBe("ラーメンは美味しかったです。");
    expect(result.improvedText).toBe("ラーメンは美味しかったです。");
    expect(result.reviews[0].issues[0]).toContain("い형용사");
  });

  it("い형용사 부정형 오류를 감지하고 교정한다 (美味しいくない → 美味しくない)", () => {
    const result = ruleBasedReview("感想", "この料理は美味しいくないです。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].improved).toBe("この料理は美味しくないです。");
    expect(result.improvedText).toBe("この料理は美味しくないです。");
  });

  it("기호/능력 대상 조사 오류를 감지하고 교정한다 (〜を好き → 〜が好き)", () => {
    const result = ruleBasedReview("自己紹介", "私は日本語を好きです。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].improved).toBe("私は日本語が好きです。");
    expect(result.reviews[0].issues[0]).toContain("好き");
  });

  it("만나는 대상 조사 오류를 감지하고 교정한다 (〜を会いました → 〜に会いました)", () => {
    const result = ruleBasedReview("週末", "昨日、友達を会いました。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].improved).toBe("昨日、友達に会いました。");
  });

  it("교통수단 탑승 조사 오류를 감지하고 교정한다 (〜を乗りました → 〜に乗りました)", () => {
    const result = ruleBasedReview("旅行", "電車を乗りました。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].improved).toBe("電車に乗りました。");
  });

  it("중복 조사 및 부자연스러운 조사 결합을 교정한다 (がは → は, にに → に)", () => {
    const result = ruleBasedReview("日記", "今日がは公園にに行きました。");
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].improved).toBe("今日は公園に行きました。");
  });

  it("문법 오류가 없는 올바른 일기에는 높은 점수와 칭찬 코멘트를 반환한다", () => {
    const result = ruleBasedReview(
      "今日の出来事",
      "今日はとてもいい天気でした。朝ごはんを食べてから、図書館へ行きました。日本語の勉強を一生懸命しました。とても充実した一日でした。"
    );
    expect(result.reviews.length).toBe(0);
    expect(result.overallScore).toBeGreaterThanOrEqual(80);
    expect(result.overallComment).toContain("훌륭합니다");
  });
});
