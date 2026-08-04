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
      { speaker: "受付", text: "少々お待ちくださいませ。確認いたします。", pronunciation: "しょうしょうおまちくださいませ。かくにんいたします。", translation: "잠시만 기다려 주십시오. 확인하겠습니다." },
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
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "天気", ruby: "てんき" }, { text: "が" }, { text: "良", ruby: "よ" }, { text: "かったので、" }, { text: "公園", ruby: "こうえん" }, { text: "を" }, { text: "散歩", ruby: "さんぽ" }, { text: "しました。" },
      { text: "朝", ruby: "あさ" }, { text: "早", ruby: "はや" }, { text: "く" }, { text: "起", ruby: "お" }, { text: "きて、" }, { text: "温", ruby: "あたた" }, { text: "かいお" }, { text: "茶", ruby: "ちゃ" }, { text: "を" }, { text: "飲", ruby: "の" }, { text: "みました。" },
      { text: "公園", ruby: "こうえん" }, { text: "に" }, { text: "到着", ruby: "とうちゃく" }, { text: "すると、" }, { text: "綺麗", ruby: "きれい" }, { text: "な" }, { text: "桜", ruby: "さくら" }, { text: "が" }, { text: "満開", ruby: "まんかい" }, { text: "でした。" },
      { text: "多", ruby: "おお" }, { text: "くの" }, { text: "人", ruby: "ひと" }, { text: "が" }, { text: "写真", ruby: "しゃしん" }, { text: "を" }, { text: "撮", ruby: "と" }, { text: "ったり、ベンチで" }, { text: "休", ruby: "やす" }, { text: "んだりしていました。" },
      { text: "風", ruby: "かぜ" }, { text: "が" }, { text: "吹", ruby: "ふ" }, { text: "くと、ピンク" }, { text: "色", ruby: "いろ" }, { text: "の" }, { text: "花", ruby: "はな" }, { text: "びらが" }, { text: "舞", ruby: "ま" }, { text: "い" }, { text: "散", ruby: "ち" }, { text: "りました。" },
      { text: "近", ruby: "ちか" }, { text: "くのカフェで" }, { text: "美", ruby: "うつく" }, { text: "しい" }, { text: "味", ruby: "あじ" }, { text: "わいのコーヒーを" }, { text: "買", ruby: "か" }, { text: "いました。" },
      { text: "ベンチに" }, { text: "座", ruby: "すわ" }, { text: "って、" }, { text: "静", ruby: "しず" }, { text: "かに" }, { text: "本", ruby: "ほん" }, { text: "を" }, { text: "読", ruby: "よ" }, { text: "みました。" },
      { text: "鳥", ruby: "とり" }, { text: "の声が" }, { text: "聞", ruby: "き" }, { text: "こえて、とても" }, { text: "気", ruby: "き" }, { text: "持", ruby: "も" }, { text: "ちが" }, { text: "落", ruby: "お" }, { text: "ち" }, { text: "着", ruby: "つ" }, { text: "きました。" },
      { text: "散歩", ruby: "さんぽ" }, { text: "をしながら、" }, { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "春", ruby: "はる" }, { text: "の" }, { text: "訪", ruby: "おとず" }, { text: "れを" }, { text: "感", ruby: "かん" }, { text: "じました。" },
      { text: "明日", ruby: "あした" }, { text: "もまた" }, { text: "素晴", ruby: "すば" }, { text: "しい" }, { text: "一日", ruby: "いちにち" }, { text: "になると" }, { text: "嬉", ruby: "うれ" }, { text: "しいです。" }
    ]),
    contentKo: "오늘은 날씨가 좋아서 공원을 산책했습니다. 아침 일찍 일어나서 따뜻한 차를 마셨습니다. 공원에 도착하자 예쁜 벚꽃이 만발해 있었습니다. 많은 사람들이 사진을 찍거나 벤치에서 쉬고 있었습니다. 바람이 불자 분홍색 꽃잎이 날려 떨어졌습니다. 근처 카페에서 풍미 있는 커피를 샀습니다. 벤치에 앉아서 조용히 책을 읽었습니다. 새 소리가 들려와 마음이 매우 편안해졌습니다. 산책을 하면서 새로운 봄의 찾아옴을 느꼈습니다. 내일도 또 멋진 하루가 되면 좋겠습니다.",
    vocabulary: JSON.stringify([
      { word: "天気", reading: "てんき", meaning: "날씨" },
      { word: "公園", reading: "こうえん", meaning: "공원" },
      { word: "散歩", reading: "さんぽ", meaning: "산책" },
      { word: "桜", reading: "さくら", meaning: "벚꽃" },
      { word: "満開", reading: "まんかい", meaning: "만발" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜ので", explanation: "원인이나 이유를 정중하게 나타내는 조사 (~이므로, ~라서)" },
      { rule: "〜をしながら", explanation: "두 가지 동작을 동시에 수행할 때 나타내는 표현 (~하면서)" },
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
      { text: "友達", ruby: "ともだち" }, { text: "と" }, { text: "有名", ruby: "ゆうめい" }, { text: "なラーメン" }, { text: "屋", ruby: "や" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "昼", ruby: "ひる" }, { text: "時", ruby: "どき" }, { text: "だったので、" }, { text: "店", ruby: "みせ" }, { text: "の" }, { text: "前", ruby: "まえ" }, { text: "には" }, { text: "長", ruby: "なが" }, { text: "い" }, { text: "行列", ruby: "ぎょうれつ" }, { text: "ができていました。" },
      { text: "三十分", ruby: "さんじゅっぷん" }, { text: "ほど" }, { text: "待", ruby: "ま" }, { text: "って、ようやく" }, { text: "店内", ruby: "てんない" }, { text: "に" }, { text: "入", ruby: "はい" }, { text: "ることができました。" },
      { text: "私", ruby: "わたし" }, { text: "たちは" }, { text: "濃厚", ruby: "のうこう" }, { text: "な" }, { text: "豚骨", ruby: "とんこつ" }, { text: "ラーメンと" }, { text: "餃子", ruby: "ぎょうざ" }, { text: "を" }, { text: "注文", ruby: "ちゅうもん" }, { text: "しました。" },
      { text: "スープの" }, { text: "一口目", ruby: "ひとくちめ" }, { text: "を" }, { text: "飲", ruby: "の" }, { text: "んだ" }, { text: "瞬間", ruby: "しゅんかん" }, { text: "、とても" }, { text: "感動", ruby: "かんどう" }, { text: "しました。" },
      { text: "麺", ruby: "めん" }, { text: "の" }, { text: "硬", ruby: "かた" }, { text: "さも" }, { text: "丁度", ruby: "ちょうど" }, { text: "良", ruby: "よ" }, { text: "く、スープによく" }, { text: "絡", ruby: "から" }, { text: "んでいました。" },
      { text: "焼", ruby: "や" }, { text: "きたての" }, { text: "餃子", ruby: "ぎょうざ" }, { text: "は" }, { text: "外", ruby: "そと" }, { text: "はパリッとしていて、" }, { text: "中", ruby: "なか" }, { text: "はジューシーでした。" },
      { text: "店員", ruby: "てんいん" }, { text: "さんの" }, { text: "笑顔", ruby: "えがお" }, { text: "や" }, { text: "気", ruby: "き" }, { text: "持", ruby: "も" }, { text: "ちの" }, { text: "良", ruby: "よ" }, { text: "い" }, { text: "接客", ruby: "せっきゃく" }, { text: "も" }, { text: "印象的", ruby: "いんしょうてき" }, { text: "でした。" },
      { text: "腹", ruby: "はら" }, { text: "がいっぱいになって、" }, { text: "大満足", ruby: "だいまんぞく" }, { text: "で" }, { text: "店", ruby: "みせ" }, { text: "を" }, { text: "出", ruby: "で" }, { text: "ました。" },
      { text: "今度", ruby: "こんど" }, { text: "は" }, { text: "家族", ruby: "かぞく" }, { text: "を" }, { text: "連", ruby: "つ" }, { text: "れて、もう" }, { text: "一度", ruby: "いちど" }, { text: "来", ruby: "き" }, { text: "たいと" }, { text: "思", ruby: "おも" }, { text: "います。" }
    ]),
    contentKo: "친구와 유명한 라멘집에 갔습니다. 점심시간이라 가게 앞에는 긴 줄이 늘어서 있었습니다. 30분 정도 기다려 겨우 가게 안으로 들어갈 수 있었습니다. 우리는 진한 돈코츠 라멘과 교자를 주문했습니다. 국물 첫 한 입을 마신 순간, 너무 감동했습니다. 면의 찰기도 딱 좋았고, 국물에 잘 어우러졌습니다. 갓 구운 교자는 겉은 바삭하고 속은 즙이 가득했습니다. 점원분의 웃는 얼굴과 기분 좋은 응대도 인상적이었습니다. 배가 가득 차서 대만족하며 가게를 나왔습니다. 다음에는 가족을 데리고 다시 오고 싶습니다.",
    vocabulary: JSON.stringify([
      { word: "友達", reading: "ともだち", meaning: "친구" },
      { word: "有名", reading: "ゆうめい", meaning: "유명" },
      { word: "行列", reading: "ぎょうれつ", meaning: "줄, 행렬" },
      { word: "注文", reading: "ちゅうもん", meaning: "주문" },
      { word: "感動", reading: "かんどう", meaning: "감동" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜に行きました", explanation: "장소 뒤에 붙어 '~에 갔습니다'를 나타냄" },
      { rule: "〜ことができる", explanation: "동사 원형 뒤에 붙어 '~할 수 있다' 능력/가능을 나타냄" },
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
      { text: "週末", ruby: "しゅうまつ" }, { text: "に" }, { text: "本屋", ruby: "ほんや" }, { text: "で" }, { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "小説", ruby: "しょうせつ" }, { text: "を" }, { text: "買", ruby: "か" }, { text: "いました。" },
      { text: "この" }, { text: "本", ruby: "ほん" }, { text: "は" }, { text: "以前", ruby: "いぜん" }, { text: "からずっと" }, { text: "読", ruby: "よ" }, { text: "みたかった" }, { text: "作品", ruby: "さくひん" }, { text: "です。" },
      { text: "家", ruby: "いえ" }, { text: "の" }, { text: "近", ruby: "ちか" }, { text: "くの" }, { text: "静", ruby: "しず" }, { text: "かなカフェで" }, { text: "本", ruby: "ほん" }, { text: "を" }, { text: "開", ruby: "ひら" }, { text: "きました。" },
      { text: "窓際", ruby: "まどぎわ" }, { text: "の" }, { text: "席", ruby: "せき" }, { text: "に" }, { text: "座", ruby: "すわ" }, { text: "って、あたたかい" }, { text: "紅茶", ruby: "こうちゃ" }, { text: "を" }, { text: "注文", ruby: "ちゅうもん" }, { text: "しました。" },
      { text: "最初", ruby: "さいしょ" }, { text: "のページをめくると、すぐに" }, { text: "物語", ruby: "ものがたり" }, { text: "の" }, { text: "世界", ruby: "せかい" }, { text: "に" }, { text: "引", ruby: "ひ" }, { text: "き" }, { text: "込", ruby: "こ" }, { text: "まれました。" },
      { text: "登場", ruby: "とうじょう" }, { text: "人物", ruby: "じんぶつ" }, { text: "たちの" }, { text: "会話", ruby: "かいわ" }, { text: "がとても" }, { text: "魅力", ruby: "みりょく" }, { text: "的", ruby: "てき" }, { text: "で" }, { text: "面白", ruby: "おもしろ" }, { text: "かったです。" },
      { text: "時間", ruby: "じかん" }, { text: "が" }, { text: "経", ruby: "た" }, { text: "つのを" }, { text: "忘", ruby: "わす" }, { text: "れて、" }, { text: "夢中", ruby: "むちゅう" }, { text: "で" }, { text: "読", ruby: "よ" }, { text: "み" }, { text: "進", ruby: "すす" }, { text: "めました。" },
      { text: "外", ruby: "そと" }, { text: "が" }, { text: "暗", ruby: "くら" }, { text: "くなる" }, { text: "頃", ruby: "ころ" }, { text: "には、" }, { text: "物語", ruby: "ものがたり" }, { text: "の" }, { text: "半分", ruby: "はんぶん" }, { text: "以上", ruby: "いじょう" }, { text: "を" }, { text: "読", ruby: "よ" }, { text: "み" }, { text: "終", ruby: "お" }, { text: "えていました。" },
      { text: "読書", ruby: "どくしょ" }, { text: "をしながら" }, { text: "過", ruby: "す" }, { text: "ごす" }, { text: "週末", ruby: "しゅうまつ" }, { text: "は、" }, { text: "私", ruby: "わたし" }, { text: "にとって" }, { text: "最高", ruby: "さいこう" }, { text: "の" }, { text: "癒", ruby: "いや" }, { text: "しです。" },
      { text: "残", ruby: "のこ" }, { text: "りのページを" }, { text: "読", ruby: "よ" }, { text: "むのが、" }, { text: "今", ruby: "いま" }, { text: "からとても" }, { text: "楽", ruby: "たの" }, { text: "しみです。" }
    ]),
    contentKo: "주말에 서점에서 새 소설책을 샀습니다. 이 책은 전부터 계속 읽고 싶었던 작품입니다. 집 근처의 조용한 카페에서 책을 펼쳤습니다. 창가 자리에 앉아 따뜻한 홍차를 주문했습니다. 첫 페이지를 넘기자 곧바로 이야기의 세계에 빠져들었습니다. 등장인물들의 대화가 매우 매력적이고 재미있었습니다. 시간이 가는 줄도 모르고 푹 빠져 읽어 내려갔습니다. 밖이 어두워질 즈음에는 이야기의 반 이상을 다 읽었습니다. 독서를 하며 보내는 주말은 저에게 최고의 힐링입니다. 남은 페이지를 읽는 것이 지금부터 매우 기대됩니다.",
    vocabulary: JSON.stringify([
      { word: "週末", reading: "しゅうまつ", meaning: "주말" },
      { word: "小説", reading: "しょうせつ", meaning: "소설" },
      { word: "物語", reading: "ものがたり", meaning: "이야기" },
      { word: "読書", reading: "どくしょ", meaning: "독서" },
      { word: "最高", reading: "さいこう", meaning: "최고" },
    ]),
    grammarPoints: JSON.stringify([
      { rule: "〜で (장소)", explanation: "동작이 일어나는 장소를 나타내는 조사 (~에서)" },
      { rule: "〜にとつて", explanation: "지칭하는 대상의 입장에서 볼 때 (~에게 있어서)" },
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
