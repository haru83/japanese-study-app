import { describe, it, expect } from "vitest";
import { TOPIC_WORDS } from "@/data/topicVocab";
import { IDIOMS_DATA } from "@/data/idioms";

describe("주제별 단어 및 재미있는 숙어 데이터 검증", () => {
  it("주제별 단어가 정확히 50개여야 함", () => {
    expect(TOPIC_WORDS.length).toBe(50);
  });

  it("주제별 단어의 모든 항목이 필수 필드를 가지고 있어야 함", () => {
    for (const item of TOPIC_WORDS) {
      expect(item.id).toBeTruthy();
      expect(item.word).toBeTruthy();
      expect(item.reading).toBeTruthy();
      expect(item.meaning).toBeTruthy();
      expect(item.exampleJa).toBeTruthy();
      expect(item.exampleKo).toBeTruthy();
      expect(item.category).toBeTruthy();
    }
  });

  it("주제별 단어 각 5개 카테고리가 각각 10개씩 구성되어야 함", () => {
    const counts: Record<string, number> = {};
    for (const item of TOPIC_WORDS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    expect(counts["travel"]).toBe(10);
    expect(counts["food"]).toBe(10);
    expect(counts["business"]).toBe(10);
    expect(counts["hospital"]).toBe(10);
    expect(counts["shopping"]).toBe(10);
  });

  it("재미있는 숙어가 정확히 50개여야 함", () => {
    expect(IDIOMS_DATA.length).toBe(50);
  });

  it("재미있는 숙어의 모든 항목이 필수 필드를 가지고 있어야 함", () => {
    for (const item of IDIOMS_DATA) {
      expect(item.id).toBeTruthy();
      expect(item.idiom).toBeTruthy();
      expect(item.reading).toBeTruthy();
      expect(item.literalMeaning).toBeTruthy();
      expect(item.actualMeaning).toBeTruthy();
      expect(item.exampleJa).toBeTruthy();
      expect(item.exampleKo).toBeTruthy();
    }
  });
});
