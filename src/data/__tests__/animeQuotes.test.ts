import { describe, it, expect } from "vitest";
import { ANIME_QUOTES_DATA, ANIME_CATEGORIES } from "@/data/animeQuotes";

describe("애니 톤 일본어 데이터 무결성 검증", () => {
  it("총 32개의 캐릭터 대사 패턴이 등록되어 있어야 함", () => {
    expect(ANIME_QUOTES_DATA.length).toBe(32);
  });

  it("모든 항목 ID가 고유해야 함", () => {
    const ids = ANIME_QUOTES_DATA.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ANIME_QUOTES_DATA.length);
  });

  it("8개 캐릭터 페르소나별로 각 4개씩 균등하게 구성되어야 함", () => {
    const counts: Record<string, number> = {};
    for (const item of ANIME_QUOTES_DATA) {
      counts[item.animeId] = (counts[item.animeId] || 0) + 1;
    }

    const expectedPersonas = [
      "hero",
      "rival",
      "master",
      "tsundere",
      "villain",
      "mystic",
      "sports",
      "pilot",
    ];

    for (const personaId of expectedPersonas) {
      expect(counts[personaId]).toBe(4);
    }
  });

  it("모든 대사의 필수 필드가 온전해야 함", () => {
    for (const item of ANIME_QUOTES_DATA) {
      expect(item.id).toBeTruthy();
      expect(item.animeId).toBeTruthy();
      expect(item.animeTitleKo).toBeTruthy();
      expect(item.characterKo).toBeTruthy();
      expect(item.quoteJa).toBeTruthy();
      expect(item.quoteKo).toBeTruthy();
      expect(item.sceneContext).toBeTruthy();
      expect(item.gender).toBeTruthy();
      expect(item.vocabulary.length).toBeGreaterThan(0);
      expect(item.grammarPoints.length).toBeGreaterThan(0);
      expect(item.quiz).toBeTruthy();
      expect(item.quiz.question).toBeTruthy();
      expect(item.quiz.options.length).toBeGreaterThanOrEqual(2);
      expect(item.quiz.correctIndex).toBeGreaterThanOrEqual(0);
      expect(item.quiz.correctIndex).toBeLessThan(item.quiz.options.length);
    }
  });

  it("카테고리 목록이 9개(전체 + 8페르소나)여야 함", () => {
    expect(ANIME_CATEGORIES.length).toBe(9);
    expect(ANIME_CATEGORIES[0].id).toBe("all");
  });
});
