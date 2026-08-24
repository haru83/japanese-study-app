import { describe, it, expect } from "vitest";
import { TOPIC_LIST, TOPIC_WORDS } from "@/data/topicVocab";
import { IDIOMS_DATA } from "@/data/idioms";

describe("주제별 단어 및 재미있는 숙어 데이터 검증", () => {
  it("세부 주제가 정확히 100개여야 함", () => {
    expect(TOPIC_LIST.length).toBe(100);
  });

  it("100개 세부 주제의 모든 항목이 필수 필드를 가지고 있어야 함", () => {
    for (const topic of TOPIC_LIST) {
      expect(topic.id).toBeTruthy();
      expect(topic.nameKo).toBeTruthy();
      expect(topic.nameJa).toBeTruthy();
      expect(topic.categoryId).toBeTruthy();
      expect(topic.categoryLabel).toBeTruthy();
      expect(topic.icon).toBeTruthy();
      expect(topic.description).toBeTruthy();
    }
  });

  it("주제별 단어가 800개 이상으로 대폭 확장되어야 함", () => {
    expect(TOPIC_WORDS.length).toBeGreaterThanOrEqual(800);
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
      expect(item.topicId).toBeTruthy();
      expect(item.topicLabel).toBeTruthy();
    }
  });

  it("10대 카테고리 각각 최소 80개 이상의 풍부한 단어가 구성되어야 함", () => {
    const counts: Record<string, number> = {};
    for (const item of TOPIC_WORDS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    const categories = [
      "travel",
      "food",
      "daily",
      "shopping",
      "health",
      "business",
      "entertainment",
      "relationship",
      "study",
      "society",
    ];
    for (const cat of categories) {
      expect(counts[cat]).toBeGreaterThanOrEqual(80);
    }
  });

  it("100개 세부 주제 전부에 풍부한 단어(주제당 최소 7개 이상)가 포함되어야 함", () => {
    const topicWordMap: Record<string, number> = {};
    for (const item of TOPIC_WORDS) {
      topicWordMap[item.topicId] = (topicWordMap[item.topicId] || 0) + 1;
    }
    for (const topic of TOPIC_LIST) {
      const count = topicWordMap[topic.id] || 0;
      expect(count).toBeGreaterThanOrEqual(7);
    }
  });

  it("신체 부위(health-body) 주제에 머리, 얼굴, 팔, 다리, 손, 발 등 주요 부위가 모두 포함되어야 함", () => {
    const bodyWords = TOPIC_WORDS.filter((item) => item.topicId === "health-body");
    const wordList = bodyWords.map((w) => w.word);

    // 주요 신체 부위 어휘 확인
    expect(wordList).toContain("頭"); // 머리
    expect(wordList).toContain("顔"); // 얼굴
    expect(wordList).toContain("目"); // 눈
    expect(wordList).toContain("鼻"); // 코
    expect(wordList).toContain("口"); // 입
    expect(wordList).toContain("耳"); // 귀
    expect(wordList).toContain("首"); // 목
    expect(wordList).toContain("肩"); // 어깨
    expect(wordList).toContain("腕"); // 팔
    expect(wordList).toContain("手"); // 손
    expect(wordList).toContain("指"); // 손가락
    expect(wordList).toContain("胸"); // 가슴
    expect(wordList).toContain("お腹"); // 배
    expect(wordList).toContain("背中"); // 등
    expect(wordList).toContain("腰"); // 허리
    expect(wordList).toContain("足"); // 다리/발
    expect(wordList).toContain("膝"); // 무릎
    expect(wordList).toContain("足の指"); // 발가락
    expect(wordList).toContain("胴体"); // 몸통
    expect(bodyWords.length).toBeGreaterThanOrEqual(15);
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
