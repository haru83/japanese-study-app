import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const KEIGO_LESSONS = [
  {
    id: "keigo-1",
    title: "비즈니스 인사 및 명함 교환",
    category: "business",
    thumbnail: "💼",
    sortOrder: 1,
    dialogue: JSON.stringify([
      { speaker: "山田", text: "初めまして。ABC商事の山田と申します。", pronunciation: "はじめまして。エービーシーしょうじのやまだともうします。", translation: "처음 뵙겠습니다. ABC 상사의 야마다라고 합니다." },
      { speaker: "佐藤", text: "お目にかかれて光栄です。XYZの佐藤でございます。", pronunciation: "おめにかかれてこうえいです。エックスワイジーのさとうでございます。", translation: "뵙게 되어 영광입니다. XYZ의 사토입니다." },
      { speaker: "山田", text: "本日はお時間をいただき、誠にありがとうございます。", pronunciation: "ほんじつはおじかんをいただき、まことにありがとうございます。", translation: "오늘 시간을 내주셔서 진심으로 감사드립니다." },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜と申します (겸양어)", explanation: "자신의 이름을 낮추어 바르게 소개할 때 사용하는 경어 표현" },
      { rule: "〜でございます (정중어)", explanation: "입니다(です)의 정중한 표현으로 비즈니스 상황에서 자주 쓰임" },
    ]),
    vocab: JSON.stringify([
      { word: "申す", reading: "もうす", meaning: "말하다 (겸양어)" },
      { word: "光栄", reading: "こうえい", meaning: "영광" },
      { word: "誠に", reading: "まことに", meaning: "진심으로, 참으로" },
    ]),
    quiz: JSON.stringify([
      { question: "자신의 이름을 상대방에게 낮추어 말할 때 알맞은 표현은?", options: ["〜と申します", "〜と言われます", "〜とおっしゃいます", "〜と呼びます"], answer: "〜と申します" },
      { question: "'입니다'의 정중한 비즈니스 표현은?", options: ["でございます", "であリます", "ですです", "でおられます"], answer: "でございます" },
    ]),
  },
  {
    id: "keigo-2",
    title: "전화 응대 및 담당자 연결",
    category: "business",
    thumbnail: "📞",
    sortOrder: 2,
    dialogue: JSON.stringify([
      { speaker: "受付", text: "お電話ありがとうございます。サクラ株式会社でございます。", pronunciation: "おでんわありがとうございます。サクラかぶしきがいしゃでございます。", translation: "전화 감사합니다. 사쿠라 주식회사입니다." },
      { speaker: "顧客", text: "田中様はいらっしゃいますでしょうか。", pronunciation: "たなかさまはいらっしゃいますでしょうか。", translation: "타나카 님 계십니까?" },
      { speaker: "受付", text: "少々お待ちくださいませ。 me confirmation 確認いたします。", pronunciation: "しょうしょうおまちくださいませ。かくにんいたします。", translation: "잠시만 기다려 주십시오. 확인하겠습니다." },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "いらっしゃる (존경어)", explanation: "있다/오다/가다의 존경 표현" },
      { rule: "少々お待ちくださいませ", explanation: "잠시 기다려 주십시오의 정중하고 예의 바른 요청" },
    ]),
    vocab: JSON.stringify([
      { word: "少々", reading: "しょうしょう", meaning: "잠시, 조금" },
      { word: "確認", reading: "かくにん", meaning: "확인" },
    ]),
    quiz: JSON.stringify([
      { question: "상대방이 계신지 물어볼 때 쓰는 존경어 동사는?", options: ["いらっしゃる", "参る", "申す", "おる"], answer: "いらっしゃる" },
    ]),
  },
  {
    id: "keigo-3",
    title: "손님 맞이 및 음료 안내",
    category: "hospitality",
    thumbnail: "☕️",
    sortOrder: 3,
    dialogue: JSON.stringify([
      { speaker: "店員", text: "いらっしゃいませ。何名様でしょうか。", pronunciation: "いらっしゃいませ。なんめいさまでしょうか。", translation: "어서 오세요. 몇 분이신가요?" },
      { speaker: "客", text: "2人です。", pronunciation: "ふたりです。", translation: "2명입니다." },
      { speaker: "店員", text: "こちらの席へご案内いたします。どうぞお掛けください。", pronunciation: "こちらのせきへごあんないいたします。どうぞおかけください。", translation: "이쪽 자리로 안내해 드리겠습니다. 편히 앉으세요." },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "ご案内いたします (겸양어)", explanation: "손님을 안내하는 행위를 정중히 표현" },
      { rule: "お掛けください", explanation: "앉으라는 권유의 경어 표현 (座ってください보다 정중함)" },
    ]),
    vocab: JSON.stringify([
      { word: "案内", reading: "あんない", meaning: "안내" },
      { word: "掛ける", reading: "かける", meaning: "앉다 (席に掛ける)" },
    ]),
    quiz: JSON.stringify([
      { question: "'앉으세요'의 정중한 서비스 경어 표현은?", options: ["お掛けください", "座ってください", "立ってください", "お入りください"], answer: "お掛けください" },
    ]),
  },
  {
    id: "keigo-4",
    title: "식당 및 카페 주문 접수",
    category: "hospitality",
    thumbnail: "🍰",
    sortOrder: 4,
    dialogue: JSON.stringify([
      { speaker: "店員", text: "ご注文はお決まりになりましたでしょうか。", pronunciation: "ごちゅうもんはおきまりになりましたでしょうか。", translation: "주문은 정해지셨나요?" },
      { speaker: "客", text: "ブレンドコーヒーを2つお願いします。", pronunciation: "ブレンドコーヒーをふたつおねがいします。", translation: "드립 커피 2개 부탁합니다." },
      { speaker: "店員", text: "かしこまりました。少々お待ちくださいませ。", pronunciation: "かしこまりました。しょうしょうおまちくださいませ。", translation: "잘 알겠습니다. 잠시만 기다려 주십시오." },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "かしこまりました", explanation: "알겠습니다(分かりました)의 정중한 서비스 경어 표현" },
    ]),
    vocab: JSON.stringify([
      { word: "注文", reading: "ちゅうもん", meaning: "주문" },
      { word: "かしこまる", reading: "かしこまる", meaning: "황송해하다, 삼가 승낙하다" },
    ]),
    quiz: JSON.stringify([
      { question: "손님의 주문을 확인한 후 '알겠습니다'의 가장 올바른 점원 경어 표현은?", options: ["かしこまりました", "わかりました", "了解です", "お케이입니다"], answer: "かしこまりました" },
    ]),
  },
];

const LEARNING_DIARIES = [
  {
    id: "diary-1",
    title: "春の公園での散歩",
    titleKo: "봄 공원에서의 산책",
    category: "계절",
    level: "초급",
    thumbnail: "🌸",
    sortOrder: 1,
    contentJp: JSON.stringify([
      { text: "今日", ruby: "きょう" },
      { text: "は" },
      { text: "天気", ruby: "てんき" },
      { text: "が" },
      { text: "良かった", ruby: "よかった" },
      { text: "ので、" },
      { text: "公園", ruby: "こうえん" },
      { text: "を" },
      { text: "散歩", ruby: "さんぽ" },
      { text: "しました。" },
    ]),
    contentKo: "오늘은 날씨가 좋아서 공원을 산책했습니다. 벚꽃이 매우 예쁘게 피어 있었습니다.",
    vocabulary: JSON.stringify([
      { word: "天気", reading: "てんき", meaning: "날씨" },
      { word: "公園", reading: "こうえん", meaning: "공원" },
      { word: "散歩", reading: "さんぽ", meaning: "산책" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜ので", explanation: "원인이나 이유를 정중하게 나타내는 조사 (~이므로, ~라서)" },
    ]),
    quiz: JSON.stringify([
      { question: "'공원'을 의미하는 한자의 올바른 읽기는?", options: ["こうえん", "きょうえん", "こうおん", "しょうえん"], answer: "こうえん", explanation: "公園은 'こうえん'으로 읽습니다." },
    ]),
  },
  {
    id: "diary-2",
    title: "美味しいラーメンを食べた日",
    titleKo: "맛있는 라멘을 먹은 날",
    category: "음식",
    level: "초급",
    thumbnail: "🍜",
    sortOrder: 2,
    contentJp: JSON.stringify([
      { text: "友達", ruby: "ともだち" },
      { text: "と" },
      { text: "有名", ruby: "ゆうめい" },
      { text: "な" },
      { text: "ラーメン", ruby: "ラーメン" },
      { text: "屋", ruby: "や" },
      { text: "に" },
      { text: "行きました", ruby: "いきまし た" },
      { text: "。" },
    ]),
    contentKo: "친구와 유명한 라멘집에 갔습니다. 돈코츠 라멘이 정말 맛있었습니다.",
    vocabulary: JSON.stringify([
      { word: "友達", reading: "ともだち", meaning: "친구" },
      { word: "有名", reading: "ゆうめい", meaning: "유명" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜に行きました", explanation: "장소 뒤에 붙어 '~에 갔습니다'를 나타냄" },
    ]),
    quiz: JSON.stringify([
      { question: "'친구'를 뜻하는 단어 友達의 올바른 읽기는?", options: ["ともだち", "ゆうじん", "しんゆう", "なかま"], answer: "ともだち", explanation: "友達는 'ともだち'로 읽습니다." },
    ]),
  },
  {
    id: "diary-3",
    title: "新しい本を買った週末",
    titleKo: "새 책을 산 주말",
    category: "취미",
    level: "중급",
    thumbnail: "📚",
    sortOrder: 3,
    contentJp: JSON.stringify([
      { text: "週末", ruby: "しゅうまつ" },
      { text: "に" },
      { text: "本屋", ruby: "ほんや" },
      { text: "で" },
      { text: "小説", ruby: "しょうせつ" },
      { text: "を" },
      { text: "買いました", ruby: "かい ました" },
      { text: "。" },
    ]),
    contentKo: "주말에 서점에서 소설책을 샀습니다. 카페에서 읽는 시간이 매우 즐거웠습니다.",
    vocabulary: JSON.stringify([
      { word: "週末", reading: "しゅうまつ", meaning: "주말" },
      { word: "小説", reading: "しょうせつ", meaning: "소설" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜で (장소)", explanation: "동작이 일어나는 장소를 나타내는 조사 (~에서)" },
    ]),
    quiz: JSON.stringify([
      { question: "'소설'을 뜻하는 漢字 小説의 읽기는?", options: ["しょうせつ", "しょうそう", "こせつ", "ちいさなはなし"], answer: "しょうせつ", explanation: "小説은 'しょうせつ'로 읽습니다." },
    ]),
  },
];

async function main() {
  console.log("🌸 학습 데이터(KeigoLesson, LearningDiaryEntry) 시딩 시작...");

  for (const keigo of KEIGO_LESSONS) {
    await prisma.keigoLesson.upsert({
      where: { id: keigo.id },
      update: keigo,
      create: keigo,
    });
  }
  console.log(`✓ KeigoLesson ${KEIGO_LESSONS.length}개 시딩 완료`);

  for (const diary of LEARNING_DIARIES) {
    await prisma.learningDiaryEntry.upsert({
      where: { id: diary.id },
      update: diary,
      create: diary,
    });
  }
  console.log(`✓ LearningDiaryEntry ${LEARNING_DIARIES.length}개 시딩 완료`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
