import type { LearningDiary } from "@/types/learningDiary";

export const part12: LearningDiary[] = [
  {
    id: "ld-111",
    title: "手作りカレー",
    titleKo: "수제 카레",
    category: "음식",
    level: "초급",
    thumbnail: "🍛",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "の" }, { text: "夕飯", ruby: "ゆうはん" }, { text: "は" }, { text: "カレーを" }, { text: "作", ruby: "つく" }, { text: "りました。" },
      { text: "玉", ruby: "たま" }, { text: "ねぎと" }, { text: "人参", ruby: "にんじん" }, { text: "、" }, { text: "ジャガイモを" }, { text: "細", ruby: "こま" }, { text: "かく" }, { text: "切", ruby: "き" }, { text: "きました。" },
      { text: "豚肉", ruby: "ぶたにく" }, { text: "を" }, { text: "炒", ruby: "いた" }, { text: "めてから" }, { text: "野菜", ruby: "やさい" }, { text: "を" }, { text: "加", ruby: "くわ" }, { text: "えました。" },
      { text: "じっくり" }, { text: "煮", ruby: "に" }, { text: "込", ruby: "こ" }, { text: "んだので" }, { text: "コクがあって" }, { text: "美", ruby: "おい" }, { text: "しかったです。" },
      { text: "明日の" }, { text: "朝", ruby: "あさ" }, { text: "も" }, { text: "食", ruby: "た" }, { text: "べます。" }
    ],
    contentKo: "오늘 저녁은 카레를 만들었습니다. 양파와 당근, 감자를 가늘게 썰었습니다. 돼지고기를 볶은 후 야채를 더했습니다. 푹 끓여서 깊은 맛이 나고 맛있었습니다. 내일 아침에도 먹을 것입니다.",
    vocabulary: [
      { word: "夕飯", reading: "ゆうはん", meaning: "저녁 식사" },
      { word: "玉ねぎ", reading: "たまねぎ", meaning: "양파" },
      { word: "人参", reading: "にんじん", meaning: "당근" },
      { word: "炒める", reading: "いためる", meaning: "볶다" },
      { word: "煮込む", reading: "にこむ", meaning: "푹 끓이다" }
    ],
    grammarPoints: [
      { rule: "〜てから", explanation: "동사 て형 + から = '~한 후에'" },
      { rule: "〜ので", explanation: "원인/이유 '~하여, ~해서'" }
    ],
    quiz: [
      { question: "「玉ねぎ」의 한자 읽기는?", options: ["たまねぎ", "ながねぎ", "だいこん", "にんにく"], answer: "たまねぎ", explanation: "玉ねぎ(たまねぎ)는 양파입니다." },
      { question: "「炒める」의 의미는?", options: ["볶다", "삶다", "튀기다", "굽다"], answer: "볶다", explanation: "炒める(いためる)는 팬에 볶는 요리법입니다." },
      { question: "「煮込む」의 뜻은?", options: ["푹 끓이다", "썰다", "섞다", "식히다"], answer: "푹 끓이다", explanation: "煮込む(にこむ)는 재료 맛이 우러나도록 푹 고거나 끓이는 것입니다." }
    ]
  },
  {
    id: "ld-112",
    title: "回転寿司の魅力",
    titleKo: "회전초밥의 매력",
    category: "음식",
    level: "초급",
    thumbnail: "🍣",
    contentJp: [
      { text: "友達", ruby: "ともだち" }, { text: "と" }, { text: "回転寿司", ruby: "かいてんずし" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "サーモンや" }, { text: "マグロ、" }, { text: "エビなどを" }, { text: "食", ruby: "た" }, { text: "べました。" },
      { text: "タッチパネルで" }, { text: "注文", ruby: "ちゅうもん" }, { text: "すると" }, { text: "新幹線", ruby: "しんかんせん" }, { text: "レーンで" }, { text: "運", ruby: "はこ" }, { text: "ばれてきます。" },
      { text: "安", ruby: "やす" }, { text: "くて" }, { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "ネタが" }, { text: "多", ruby: "おお" }, { text: "くて" }, { text: "大満足", ruby: "だいまんぞく" }, { text: "でした。" }
    ],
    contentKo: "친구와 회전초밥집에 갔습니다. 연어와 참치, 새우 등을 먹었습니다. 터치패널로 주문하면 신칸센 레일로 배달되어 옵니다. 저렴하고 신선한 재료가 많아 대만족이었습니다.",
    vocabulary: [
      { word: "回転寿司", reading: "かいてんずし", meaning: "회전초밥" },
      { word: "注文", reading: "ちゅうもん", meaning: "주문" },
      { word: "運ぶ", reading: "はこぶ", meaning: "운반하다, 나르다" },
      { word: "ネタ", reading: "ネタ", meaning: "초밥 위에 올리는 재료" },
      { word: "大満足", reading: "だいまんぞく", meaning: "대만족" }
    ],
    grammarPoints: [
      { rule: "〜や〜など", explanation: "'~와 ~등' 대표 예시를 열거함" },
      { rule: "〜てくる", explanation: "동작이 진행되어 이쪽으로 다가옴 ('~해 오다')" }
    ],
    quiz: [
      { question: "「回転寿司」의 읽는 법은?", options: ["かいてんずし", "かいせんずし", "かんてんずし", "かいてんすし"], answer: "かいてんずし", explanation: "回転寿司는 かいてんずし 로 읽습니다." },
      { question: "「注文」의 의미는?", options: ["주문", "계산", "배달", "예약"], answer: "주문", explanation: "注文(ちゅうもん)은 음식 등을 주문하는 것입니다." },
      { question: "「運ばれてくる」의 직역은?", options: ["운반되어 오다", "가지고 가다", "만들어지다", "버려지다"], answer: "운반되어 오다", explanation: "運ぶ의 수동형 運ばれる + てくる(오다) = 배달/운반되어 오다." }
    ]
  },
  {
    id: "ld-113",
    title: "抹茶パフェのカフェ",
    titleKo: "말차 파페 카페",
    category: "음식",
    level: "중급",
    thumbnail: "🍵",
    contentJp: [
      { text: "和風", ruby: "わふう" }, { text: "カフェで" }, { text: "特製", ruby: "とくせい" }, { text: "の" }, { text: "抹茶", ruby: "まっちゃ" }, { text: "パフェを" }, { text: "注文", ruby: "ちゅうもん" }, { text: "しました。" },
      { text: "濃", ruby: "こ" }, { text: "い" }, { text: "抹茶", ruby: "まっちゃ" }, { text: "アイスと" }, { text: "白玉", ruby: "しらたま" }, { text: "、" }, { text: "あんこが" }, { text: "絶妙", ruby: "ぜつみょう" }, { text: "な" }, { text: "バランスです。" },
      { text: "甘", ruby: "あま" }, { text: "さと" }, { text: "苦", ruby: "にが" }, { text: "みの" }, { text: "調和", ruby: "ちょうわ" }, { text: "が" }, { text: "素晴", ruby: "すば" }, { text: "らしく、" }, { text: "最後", ruby: "さいご" }, { text: "の一口", ruby: "のひとくち" }, { text: "まで" }, { text: "美味", ruby: "おい" }, { text: "しく" }, { text: "頂", ruby: "いただ" }, { text: "きました。" },
      { text: "静", ruby: "しず" }, { text: "かな" }, { text: "空間", ruby: "くうかん" }, { text: "で" }, { text: "贅沢", ruby: "ぜいたく" }, { text: "な" }, { text: "時間", ruby: "じかん" }, { text: "を" }, { text: "過", ruby: "すご" }, { text: "しました。" }
    ],
    contentKo: "일식 카페에서 특제 말차 파페를 주문했습니다. 짙은 말차 아이스크림과 경단, 팥앙금이 절묘한 조화를 이룹니다. 단맛과 쓴맛의 조화가 훌륭해서 마지막 한 입까지 맛있게 먹었습니다. 조용한 공간에서 사치스러운 시간을 보냈습니다.",
    vocabulary: [
      { word: "和風", reading: "わふう", meaning: "일본식, 일본풍" },
      { word: "抹茶", reading: "まっちゃ", meaning: "말차(가루녹차)" },
      { word: "白玉", reading: "しらたま", meaning: "새알심 경단" },
      { word: "調和", reading: "ちょうわ", meaning: "조화, 균형" },
      { word: "頂く", reading: "いただく", meaning: "먹다/마시다의 겸양어" }
    ],
    grammarPoints: [
      { rule: "〜まで", explanation: "한계·범위 '~까지'" },
      { rule: "〜を過ごす", explanation: "시간이나 생활을 '보내다'" }
    ],
    quiz: [
      { question: "「抹茶」의 한자 읽기는?", options: ["まっちゃ", "めっちゃ", "ほっちゃ", "まちゃ"], answer: "まっちゃ", explanation: "抹茶(まっちゃ)는 일본의 가루녹차입니다." },
      { question: "「頂く」의 높임 표현 종류는?", options: ["겸양어 (자신을 낮춤)", "존경어 (상대를 높임)", "정중어", "반말"], answer: "겸양어 (자신을 낮춤)", explanation: "食べる・飲む의 겸양 표현이 頂く(いただく)입니다." },
      { question: "「贅沢な」의 뜻은?", options: ["사치스러운/풍족한", "소박한", "초라한", "지루한"], answer: "사치스러운/풍족한", explanation: "贅沢(ぜいたく)는 호화롭고 사치스러움을 의미합니다." }
    ]
  },
  {
    id: "ld-114",
    title: "ラーメン屋の行列",
    titleKo: "라멘집의 줄",
    category: "음식",
    level: "초급",
    thumbnail: "🍜",
    contentJp: [
      { text: "有名", ruby: "ゆうめい" }, { text: "な" }, { text: "ラーメン" }, { text: "店", ruby: "てん" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "30分", ruby: "さんじゅっぷん" }, { text: "ほど" }, { text: "並", ruby: "なら" }, { text: "んで" }, { text: "店内", ruby: "てんない" }, { text: "に" }, { text: "入", ruby: "はい" }, { text: "りました。" },
      { text: "豚骨", ruby: "とんこつ" }, { text: "スープの" }, { text: "濃厚", ruby: "のうこう" }, { text: "な" }, { text: "味", ruby: "あじ" }, { text: "が" }, { text: "麺", ruby: "めん" }, { text: "によく" }, { text: "絡", ruby: "から" }, { text: "みます。" },
      { text: "チャーシューも" }, { text: "柔", ruby: "やわ" }, { text: "らかくて" }, { text: "絶品", ruby: "ぜっぴん" }, { text: "でした。" },
      { text: "スープまで" }, { text: "飲", ruby: "の" }, { text: "み" }, { text: "干", ruby: "ほ" }, { text: "してしまいました。" }
    ],
    contentKo: "유명한 라멘 집에 갔습니다. 30분 정도 줄을 서서 가게 안에 들어갔습니다. 돈코츠 국물의 진한 맛이 면에 잘 엉겨 붙습니다. 차슈도 부드럽고 절품이었습니다. 국물까지 싹 비워버렸습니다.",
    vocabulary: [
      { word: "行列", reading: "ぎょうれつ", meaning: "줄, 행렬" },
      { word: "豚骨", reading: "とんこつ", meaning: "돼지뼈 (돈코츠)" },
      { word: "濃厚", reading: "のうこう", meaning: "진함, 농후함" },
      { word: "絶品", reading: "ぜっぴん", meaning: "절품, 뛰어난 요리" },
      { word: "飲み干す", reading: "のみほす", meaning: "싹 비워 마시다" }
    ],
    grammarPoints: [
      { rule: "〜ほど", explanation: "'~정도' 분량이나 시간의 대략을 나타냄" },
      { rule: "〜てしまう", explanation: "완료 또는 아쉬움/유감 표현 ('~해 버리다')" }
    ],
    quiz: [
      { question: "「並ぶ」의 뜻은?", options: ["줄을 서다", "달리다", "먹다", "기다리게 하다"], answer: "줄을 서다", explanation: "並(なら)ぶ는 차례대로 줄을 서다입니다." },
      { question: "「濃厚な」의 의미는?", options: ["진한", "싱거운", "매운", "달콤한"], answer: "진한", explanation: "濃厚(のうこう)는 맛이나 향이 진하고 밀도가 높음을 뜻합니다." },
      { question: "「飲み干してしまいました」의 문법적 의미는?", options: ["마셔버렸습니다", "마시지 않았습니다", "마실 예정입니다", "마시기 어렵습니다"], answer: "마셔버렸습니다", explanation: "飲み干す + てしまう (완료/버리다) 의 과거형입니다." }
    ]
  },
  {
    id: "ld-115",
    title: "焼肉パーティー",
    titleKo: "야키니쿠 파티",
    category: "음식",
    level: "중급",
    thumbnail: "🥩",
    contentJp: [
      { text: "同僚", ruby: "どうりょう" }, { text: "と" }, { text: "一緒", ruby: "いっしょ" }, { text: "に" }, { text: "焼肉", ruby: "やきにく" }, { text: "を" }, { text: "食", ruby: "た" }, { text: "べに" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "カルビや" }, { text: "ロース、" }, { text: "タンを" }, { text: "網", ruby: "あみ" }, { text: "の上", ruby: "のうえ" }, { text: "で" }, { text: "香", ruby: "こう" }, { text: "ばしく" }, { text: "焼", ruby: "や" }, { text: "きました。" },
      { text: "サンチュに" }, { text: "包", ruby: "つつ" }, { text: "んで" }, { text: "特製", ruby: "とくせい" }, { text: "タレで" }, { text: "頂", ruby: "いただ" }, { text: "くと" }, { text: "最高", ruby: "さいこう" }, { text: "です。" },
      { text: "冷", ruby: "つめ" }, { text: "たいビールとの" }, { text: "相性", ruby: "あいしょう" }, { text: "も" }, { text: "抜群", ruby: "ばつぐん" }, { text: "でした。" }
    ],
    contentKo: "동료와 함께 야키니쿠를 먹으러 갔습니다. 갈비와 등심, 혀를 석쇠 위에 고소하게 구웠습니다. 상추에 싸서 특제 양념장에 먹으니 최고입니다. 시원한 맥주와의 궁합도 배가 되었습니다.",
    vocabulary: [
      { word: "焼肉", reading: "やきにく", meaning: "불고기, 야키니쿠" },
      { word: "網", reading: "あみ", meaning: "석쇠, 그물" },
      { word: "香ばしい", reading: "こうばしい", meaning: "구수하다, 고소하다" },
      { word: "包む", reading: "つつむ", meaning: "싸다, 감싸다" },
      { word: "相性", reading: "あいしょう", meaning: "궁합" }
    ],
    grammarPoints: [
      { rule: "〜に行きます", explanation: "동사 ます형 어간 + に行く = '~하러 가다'" },
      { rule: "〜と最高です", explanation: "'~와/과 함께하면 최고다'" }
    ],
    quiz: [
      { question: "「網」의 한자 읽기는?", options: ["あみ", "いと", "なわ", "かご"], answer: "あみ", explanation: "網(あみ)는 그물이나 석쇠망을 의미합니다." },
      { question: "「包む」의 뜻은?", options: ["싸다", "자르다", "굽다", "씻다"], answer: "싸다", explanation: "包(つつ)む는 포장하거나 싸는 동작입니다." },
      { question: "「相性抜群」의 의미는?", options: ["궁합이 매우 좋음", "성격이 안 맞음", "양품", "맛이 없음"], answer: "궁합이 매우 좋음", explanation: "相性(궁합) + 抜群(군계일학/뛰어남) = 궁합 최고" }
    ]
  },
  {
    id: "ld-116",
    title: "朝食のお味噌汁",
    titleKo: "아침 식사의 미소시루",
    category: "음식",
    level: "초급",
    thumbnail: "🥣",
    contentJp: [
      { text: "毎朝", ruby: "まいあさ" }, { text: "、" }, { text: "温", ruby: "あたた" }, { text: "かいお" }, { text: "味噌汁", ruby: "みそしる" }, { text: "を" }, { text: "作", ruby: "つく" }, { text: "ります。" },
      { text: "今日", ruby: "きょう" }, { text: "の" }, { text: "具材", ruby: "ぐざい" }, { text: "は" }, { text: "豆腐", ruby: "とうふ" }, { text: "と" }, { text: "わかめ、" }, { text: "長", ruby: "なが" }, { text: "ねぎです。" },
      { text: "出汁", ruby: "だし" }, { text: "をしっかり" }, { text: "取", ruby: "と" }, { text: "るのが" }, { text: "美味", ruby: "おい" }, { text: "しさの" }, { text: "秘密", ruby: "ひみつ" }, { text: "です。" },
      { text: "一口", ruby: "ひとくち" }, { text: "飲", ruby: "の" }, { text: "むと" }, { text: "体", ruby: "からだ" }, { text: "が" }, { text: "温", ruby: "あたた" }, { text: "まり、" }, { text: "元気", ruby: "げんき" }, { text: "が" }, { text: "出", ruby: "で" }, { text: "ます。" }
    ],
    contentKo: "매일 아침 따뜻한 미소시루를 만듭니다. 오늘 재료는 두부와 미역, 대파입니다. 육수를 제대로 내는 것이 맛의 비밀입니다. 한 입 마시면 몸이 따뜻해지고 기운이 납니다.",
    vocabulary: [
      { word: "味噌汁", reading: "みそしる", meaning: "미소시루(된장국)" },
      { word: "具材", reading: "ぐざい", meaning: "(국 등의) 건더기 재료" },
      { word: "豆腐", reading: "とうふ", meaning: "두부" },
      { word: "出汁", reading: "だし", meaning: "육수, 장국" },
      { word: "元気が出る", reading: "げんきがでる", meaning: "기운이 나다" }
    ],
    grammarPoints: [
      { rule: "〜のが〜です", explanation: "동사를 명사화하여 '~하는 것이 ~입니다'로 나타냄" },
      { rule: "〜と", explanation: "조건절 '~하면 (자연스러운 결과가 이어짐)'" }
    ],
    quiz: [
      { question: "「味噌汁」의 읽는 법은?", options: ["みそしる", "みそじる", "しょうゆしる", "すましじる"], answer: "みそしる", explanation: "味噌汁(みそしる)는 일본식 된장국입니다." },
      { question: "「出汁」의 한자 읽기는?", options: ["だし", "でじる", "しゅっし", "でだし"], answer: "だし", explanation: "出汁(だし)는 멸치나 다시마 등으로 낸 육수입니다." },
      { question: "「元気が出る」의 뜻은?", options: ["기운이 나다", "피곤해지다", "배가 부르다", "슬퍼지다"], answer: "기운이 나다", explanation: "元気(기운) + 出る(나오다) 입니다." }
    ]
  },
  {
    id: "ld-117",
    title: "手作りパン挑戦",
    titleKo: "수제 빵 도전",
    category: "음식",
    level: "고급",
    thumbnail: "🍞",
    contentJp: [
      { text: "家", ruby: "いえ" }, { text: "で" }, { text: "本格的", ruby: "ほんかくてき" }, { text: "な" }, { text: "食パン", ruby: "しょくぱん" }, { text: "作", ruby: "づく" }, { text: "りに" }, { text: "挑戦", ruby: "ちょうせん" }, { text: "しました。" },
      { text: "強力粉", ruby: "きょうりきこ" }, { text: "と" }, { text: "イースト、" }, { text: "バターを" }, { text: "こねて" }, { text: "発酵", ruby: "はっこう" }, { text: "させます。" },
      { text: "生地", ruby: "きじ" }, { text: "が" }, { text: "ふっくらと" }, { text: "膨", ruby: "ふく" }, { text: "らむ" }, { text: "過程", ruby: "かてい" }, { text: "を" }, { text: "見", ruby: "み" }, { text: "守", ruby: "まも" }, { text: "るのが" }, { text: "楽", ruby: "たの" }, { text: "しいです。" },
      { text: "オーブンから" }, { text: "焼", ruby: "や" }, { text: "きたての" }, { text: "良", ruby: "よ" }, { text: "い" }, { text: "香", ruby: "かお" }, { text: "りが" }, { text: "漂", ruby: "ただよ" }, { text: "いました。" }
    ],
    contentKo: "집에서 본격적인 식빵 만들기에 도전했습니다. 강력분과 이스트, 버터를 치대어 발효시킵니다. 반죽이 폭신하게 부풀어 오르는 과정을 지켜보는 것이 즐겁습니다. 오븐에서 갓 구운 좋은 향기가 감돌았습니다.",
    vocabulary: [
      { word: "強力粉", reading: "きょうりきこ", meaning: "강력분(밀가루)" },
      { word: "発酵", reading: "はっこう", meaning: "발효" },
      { word: "生地", reading: "きじ", meaning: "(빵·과자) 반죽, 원단" },
      { word: "膨らむ", reading: "ふくらむ", meaning: "부풀다" },
      { word: "漂う", reading: "ただよう", meaning: "표류하다, (향기가) 감돌다" }
    ],
    grammarPoints: [
      { rule: "〜させる", explanation: "사역형. '~하게 하다, 시키다'" },
      { rule: "〜きたて", explanation: "동사 ます형 어간 + たて = '갓 ~함' (焼きたて: 갓 구움)" }
    ],
    quiz: [
      { question: "「生地」의 읽는 법은?", options: ["きじ", "なまじ", "せいち", "しょうじ"], answer: "きじ", explanation: "生地(きじ)는 빵이나 부침개 등의 반죽을 의미합니다." },
      { question: "「焼きたて」의 의미는?", options: ["갓 구운 것", "탄 것", "안 익은 것", "어제 구운 것"], answer: "갓 구운 것", explanation: "焼く + たて = 갓 구워낸 상태" },
      { question: "「膨らむ」의 뜻은?", options: ["부풀다", "줄어들다", "굳다", "녹다"], answer: "부풀다", explanation: "膨(ふく)らむ는 부피가 부풀어 오르는 것입니다." }
    ]
  },
  {
    id: "ld-118",
    title: "デパ地下のお惣菜",
    titleKo: "백화점 지하의 반찬들",
    category: "음식",
    level: "중급",
    thumbnail: "🍱",
    contentJp: [
      { text: "仕事", ruby: "しごと" }, { text: "帰", ruby: "かえ" }, { text: "りに" }, { text: "デパ地下", ruby: "デパちか" }, { text: "に" }, { text: "立", ruby: "た" }, { text: "ち" }, { text: "寄", ruby: "よ" }, { text: "りました。" },
      { text: "色鮮", ruby: "いろあざ" }, { text: "やかな" }, { text: "サラダや" }, { text: "コロッケ、" }, { text: "刺身", ruby: "さしみ" }, { text: "が" }, { text: "並", ruby: "なら" }, { text: "んでいます。" },
      { text: "タイムサービスで" }, { text: "割引", ruby: "わりびき" }, { text: "になっていたので、" }, { text: "欲", ruby: "よく" }, { text: "張", ruby: "ば" }, { text: "って" }, { text: "色々", ruby: "いろいろ" }, { text: "買", ruby: "か" }, { text: "ってしまいました。" },
      { text: "家", ruby: "いえ" }, { text: "で" }, { text: "豪華", ruby: "ごうか" }, { text: "な" }, { text: "夕食", ruby: "ゆうしょく" }, { text: "を" }, { text: "楽", ruby: "たの" }, { text: "しみました。" }
    ],
    contentKo: "퇴근길에 백화점 식품관(데파치카)에 들렀습니다. 색발색이 고운 샐러드나 고로케, 회가 늘어서 있습니다. 마감 할인 시간이라 할인을 하고 있어서 탐이 나서 이것저것 많이 사고 말았습니다. 집에서 호화로운 저녁 식사를 즐겼습니다.",
    vocabulary: [
      { word: "デパ地下", reading: "デパちか", meaning: "백화점 지하 식품 매장" },
      { word: "惣菜", reading: "そうざい", meaning: "반찬" },
      { word: "色鮮やか", reading: "いろあざやか", meaning: "색상이 가득하고 선명함" },
      { word: "割引", reading: "わりびき", meaning: "할인" },
      { word: "欲張る", reading: "よくばる", meaning: "욕심을 부리다" }
    ],
    grammarPoints: [
      { rule: "〜に立ち寄る", explanation: "'~에 들르다, 잠시 들르다'" },
      { rule: "〜てしまう", explanation: "완료 및 감정적 아쉬움 ('~해 버리다')" }
    ],
    quiz: [
      { question: "「デパ地下」의 뜻은?", options: ["백화점 지하 식품관", "지하철역", "대형 마트", "지하 주차장"], answer: "백화점 지하 식품관", explanation: "デパートの地下(백화점 지하)의 약어입니다." },
      { question: "「割引」의 한자 읽기는?", options: ["わりびき", "わりさき", "かつびき", "わりひき"], answer: "わりびき", explanation: "割引(わりびき)는 가격 할인입니다." },
      { question: "「立ち寄る」의 의미는?", options: ["들르다", "떠나다", "서 있다", "돌아오다"], answer: "들르다", explanation: "立ち寄る(たちよる)는 도중에 어디를 잠시 방문하는 것입니다." }
    ]
  },
  {
    id: "ld-119",
    title: "夏のアイスクリーム",
    titleKo: "여름의 아이스크림",
    category: "음식",
    level: "초급",
    thumbnail: "🍦",
    contentJp: [
      { text: "暑", ruby: "あつ" }, { text: "い" }, { text: "日", ruby: "ひ" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "いているので、" }, { text: "アイスクリームを" }, { text: "買", ruby: "か" }, { text: "いました。" },
      { text: "バニラと" }, { text: "チョコの" }, { text: "ミックスソフトクリームです。" },
      { text: "一口", ruby: "ひとくち" }, { text: "食", ruby: "た" }, { text: "べると" }, { text: "冷", ruby: "つめ" }, { text: "たくて" }, { text: "甘", ruby: "あま" }, { text: "い" }, { text: "味", ruby: "あじ" }, { text: "が" }, { text: "口", ruby: "くち" }, { text: "の中", ruby: "のなか" }, { text: "に" }, { text: "広", ruby: "ひろ" }, { text: "がります。" },
      { text: "溶", ruby: "と" }, { text: "ける前に" }, { text: "急", ruby: "いそ" }, { text: "いで" }, { text: "食", ruby: "た" }, { text: "べました。" }
    ],
    contentKo: "더운 날이 계속되고 있어서 아이스크림을 샀습니다. 바닐라와 초코 믹스 소프트아이스크림입니다. 한 입 먹으니 차갑고 달콤한 맛이 입안에 퍼집니다. 녹기 전에 서둘러 먹었습니다.",
    vocabulary: [
      { word: "暑い", reading: "あつい", meaning: "덥다" },
      { word: "一口", reading: "ひとくち", meaning: "한 입" },
      { word: "広がる", reading: "ひろがる", meaning: "퍼지다, 넓어지다" },
      { word: "溶ける", reading: "とける", meaning: "녹다" },
      { word: "急ぐ", reading: "いそぐ", meaning: "서두르다" }
    ],
    grammarPoints: [
      { rule: "〜前に", explanation: "동사 사전형 + 前に = '~하기 전에'" },
      { rule: "〜くて", explanation: "い형용사 연결형 (~하고, ~해서)" }
    ],
    quiz: [
      { question: "「溶ける」의 한자 읽기는?", options: ["とける", "わける", "のける", "つける"], answer: "とける", explanation: "溶(と)ける는 얼음이나 아이스크림이 녹는 것을 말합니다." },
      { question: "「溶ける前に」의 뜻은?", options: ["녹기 전에", "녹은 후에", "녹지 않아서", "녹을 때까지"], answer: "녹기 전에", explanation: "溶ける + 前に = 녹기 전에" },
      { question: "「急ぐ」의 뜻은?", options: ["서두르다", "천천히 하다", "그만두다", "기다리다"], answer: "서두르다", explanation: "急(いそ)ぐ는 서두르다, 바삐 움직이다입니다." }
    ]
  },
  {
    id: "ld-120",
    title: "居酒屋の焼き鳥",
    titleKo: "이자카야의 야키토리",
    category: "음식",
    level: "중급",
    thumbnail: "🍢",
    contentJp: [
      { text: "金曜日", ruby: "きんようび" }, { text: "の" }, { text: "夜", ruby: "よる" }, { text: "、" }, { text: "同僚", ruby: "どうりょう" }, { text: "と" }, { text: "活気", ruby: "かっき" }, { text: "のある" }, { text: "居酒屋", ruby: "いざかや" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "ねぎまや" }, { text: "つくねを" }, { text: "塩", ruby: "しお" }, { text: "と" }, { text: "タレで" }, { text: "それぞれ" }, { text: "注文", ruby: "ちゅうもん" }, { text: "しました。" },
      { text: "炭火", ruby: "すみび" }, { text: "で" }, { text: "香", ruby: "こう" }, { text: "ばしく" }, { text: "焼", ruby: "や" }, { text: "かれた" }, { text: "鶏肉", ruby: "とりにく" }, { text: "は" }, { text: "ジューシーで" }, { text: "最高", ruby: "さいこう" }, { text: "でした。" },
      { text: "仕事", ruby: "しごと" }, { text: "の" }, { text: "話", ruby: "はなし" }, { text: "で" }, { text: "盛", ruby: "もり" }, { text: "り" }, { text: "上", ruby: "あ" }, { text: "がり、" }, { text: "楽", ruby: "たの" }, { text: "しい" }, { text: "時間", ruby: "じかん" }, { text: "を" }, { text: "過", ruby: "すご" }, { text: "しました。" }
    ],
    contentKo: "금요일 밤, 동료와 활기찬 이자카야에 갔습니다. 네기마와 쓰쿠네를 소금과 양념으로 각각 주문했습니다. 숯불로 고소하게 구워진 닭고기는 즙이 가득하고 최고였습니다. 일 이야기로 분위기가 달아올라 즐거운 시간을 보냈습니다.",
    vocabulary: [
      { word: "居酒屋", reading: "いざかや", meaning: "선술집, 이자카야" },
      { word: "炭火", reading: "すみび", meaning: "숯불" },
      { word: "鶏肉", reading: "とりにく", meaning: "닭고기" },
      { word: "盛り上がる", reading: "もりあがる", meaning: "분위기가 고조되다, 흥겹다" },
      { word: "活気", reading: "かっき", meaning: "활기" }
    ],
    grammarPoints: [
      { rule: "〜で焼かれた", explanation: "수동태 표현 (~로 구워진)" },
      { rule: "〜で盛り上がる", explanation: "'~로 분위기가 달아오르다'" }
    ],
    quiz: [
      { question: "「居酒屋」의 읽는 법은?", options: ["いざかや", "いしゃかや", "きょしゅや", "いざけや"], answer: "いざかや", explanation: "居酒屋(いざかや)는 일본식 술집입니다." },
      { question: "「炭火」의 뜻은?", options: ["숯불", "장작불", "가스불", "연탄불"], answer: "숯불", explanation: "炭火(すみび)는 숯을 태우는 불입니다." },
      { question: "「盛り上がる」의 의미는?", options: ["분위기가 고조되다", "침울해지다", "싸우다", "끝나다"], answer: "분위기가 고조되다", explanation: "盛り上がる(もりあがる)는 분위기가 신나고 고조되는 것입니다." }
    ]
  }
];
