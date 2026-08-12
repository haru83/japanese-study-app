import type { LearningDiary } from "@/types/learningDiary";

export const part16: LearningDiary[] = [
  {
    id: "ld-151",
    title: "定期テスト前の図書館",
    titleKo: "정기 시험 전의 도서관",
    category: "학교",
    level: "초급",
    thumbnail: "📚",
    contentJp: [
      { text: "来週", ruby: "らいしゅう" }, { text: "から" }, { text: "期末", ruby: "きまつ" }, { text: "テストが" }, { text: "始", ruby: "はじ" }, { text: "まるので、" }, { text: "図書館", ruby: "としょかん" }, { text: "で" }, { text: "勉強", ruby: "べんきょう" }, { text: "しました。" },
      { text: "自習室", ruby: "じしゅうしつ" }, { text: "は" }, { text: "真剣", ruby: "しんけん" }, { text: "な" }, { text: "表情", ruby: "ひょうじょう" }, { text: "の" }, { text: "生徒", ruby: "せいと" }, { text: "たちで" }, { text: "満席", ruby: "まんせき" }, { text: "でした。" },
      { text: "ノートを" }, { text: "まとめたり" }, { text: "過去問", ruby: "かこもん" }, { text: "を" }, { text: "解", ruby: "と" }, { text: "いたりして、" }, { text: "集中", ruby: "しゅうちゅう" }, { text: "して" }, { text: "取", ruby: "と" }, { text: "り" }, { text: "組", ruby: "く" }, { text: "みました。" },
      { text: "いい" }, { text: "点数", ruby: "てんすう" }, { text: "が" }, { text: "取", ruby: "と" }, { text: "れるように" }, { text: "最後", ruby: "さいご" }, { text: "まで" }, { text: "頑張", ruby: "がんば" }, { text: "ります。" }
    ],
    contentKo: "다음 주부터 기말고사가 시작되어 도서관에서 공부했습니다. 자습실은 진지한 표정의 학생들로 만석이었습니다. 노트를 정리하거나 기출문제를 풀면서 집중해서 매달렸습니다. 좋은 점수를 받을 수 있도록 끝까지 열심히 하겠습니다.",
    vocabulary: [
      { word: "期末テスト", reading: "きまつテスト", meaning: "기말고사" },
      { word: "自習室", reading: "じしゅうしつ", meaning: "자습실" },
      { word: "過去問", reading: "かこもん", meaning: "기출문제" },
      { word: "解く", reading: "とく", meaning: "풀다 (문제를 풀다)" },
      { word: "点数", reading: "てんすう", meaning: "점수" }
    ],
    grammarPoints: [
      { rule: "〜たり〜たりして", explanation: "동작 나열 '~하거나 ~하거나 하면서'" },
      { rule: "〜ように", explanation: "'~하도록' (목적 표현)" }
    ],
    quiz: [
      { question: "「過去問」의 읽는 법은?", options: ["かこもん", "かこともん", "きこもん", "かことう"], answer: "かこもん", explanation: "過去問(かこもん)은 과거 시험 출제 문제입니다." },
      { question: "「解く」의 뜻은?", options: ["풀다", "묶다", "외우다", "잊다"], answer: "풀다", explanation: "解(と)く는 시험 문제 등을 해독하여 푸는 동작입니다." },
      { question: "「点数が取れるように」의 의미는?", options: ["점수를 얻을 수 있도록", "점수가 깎이지 않도록", "점수를 보기 위해", "점수가 발표될 때"], answer: "점수를 얻을 수 있도록", explanation: "取れる(가능형) + ように(목적) = 얻을 수 있도록." }
    ]
  },
  {
    id: "ld-152",
    title: "文化祭の準備",
    titleKo: "축제 준비",
    category: "학교",
    level: "중급",
    thumbnail: "🎨",
    contentJp: [
      { text: "クラスで" }, { text: "文化祭", ruby: "ぶんかさい" }, { text: "の" }, { text: "出し物", ruby: "だしもの" }, { text: "として" }, { text: "お化け屋敷", ruby: "おばけやしき" }, { text: "を" }, { text: "作", ruby: "つく" }, { text: "ることになりました。" },
      { text: "放課後", ruby: "ほうかご" }, { text: "、" }, { text: "みんなで" }, { text: "ダンボールを" }, { text: "集", ruby: "あつ" }, { text: "めて" }, { text: "迷路", ruby: "めいろ" }, { text: "を" }, { text: "組み立てました。" },
      { text: "小道具", ruby: "こどうぐ" }, { text: "や" }, { text: "衣装", ruby: "いしょう" }, { text: "も" }, { text: "手作", ruby: "てづく" }, { text: "りし、" }, { text: "恐", ruby: "おそろ" }, { text: "しい" }, { text: "雰囲気", ruby: "ふんいき" }, { text: "を" }, { text: "演出", ruby: "えんしゅつ" }, { text: "しました。" },
      { text: "意見", ruby: "いけん" }, { text: "が" }, { text: "ぶつかることもありましたが、" }, { text: "完成", ruby: "かんせい" }, { text: "した" }, { text: "時", ruby: "とき" }, { text: "の" }, { text: "達成感", ruby: "たっせいかん" }, { text: "は" }, { text: "一倍", ruby: "いちばい" }, { text: "でした。" }
    ],
    contentKo: "반에서 문화제 볼거리로 귀신의 집을 만들게 되었습니다. 방과 후 다 함께 골판지를 모아 미로를 조립했습니다. 소품과 의상도 직접 만들고 무서운 분위기를 연출했습니다. 의견이 충돌할 때도 있었지만 완공했을 때의 성취감은 배가 되었습니다.",
    vocabulary: [
      { word: "文化祭", reading: "ぶんかさい", meaning: "문화제, 학교 축제" },
      { word: "出し物", reading: "だしもの", meaning: "(축제 등의) 공연, 부스 볼거리" },
      { word: "お化け屋敷", reading: "おばけやしき", meaning: "귀신의 집" },
      { word: "小道具", reading: "こどうぐ", meaning: "소품" },
      { word: "ぶつかる", reading: "ぶつかる", meaning: "부딪치다, 충돌하다" }
    ],
    grammarPoints: [
      { rule: "〜として", explanation: "'~로서' 자격이나 자리를 나타냄" },
      { rule: "〜ことになりました", explanation: "'~하게 되었습니다' 결정의 결과" }
    ],
    quiz: [
      { question: "「お化け屋敷」의 읽는 법은?", options: ["おばけやしき", "おばけおく", "おばけいえ", "おばけかん"], answer: "おばけやしき", explanation: "お化け屋敷(おばけやしき)는 귀신의 집입니다." },
      { question: "「放課後」의 뜻은?", options: ["방과 후", "수업 시작 전", "점심시간", "방학"], answer: "방과 후", explanation: "放課後(ほうかご)는 모든 수업이 끝난 뒤의 시간입니다." },
      { question: "「意見がぶつかる」의 의미는?", options: ["의견이 충돌하다", "의견이 일치하다", "의견을 참다", "의견을 묻다"], answer: "의견이 충돌하다", explanation: "ぶつかる는 서로의 견해나 생각이 부딪치는 것을 뜻합니다." }
    ]
  },
  {
    id: "ld-153",
    title: "体育祭のリレー",
    titleKo: "체육대회의 계주",
    category: "학교",
    level: "중급",
    thumbnail: "🏃",
    contentJp: [
      { text: "晴天", ruby: "せいてん" }, { text: "の" }, { text: "下", ruby: "もと" }, { text: "、" }, { text: "学校", ruby: "がっこう" }, { text: "の" }, { text: "体育祭", ruby: "たいいくさい" }, { text: "が" }, { text: "開催", ruby: "かいさい" }, { text: "されました。" },
      { text: "私", ruby: "わたし" }, { text: "は" }, { text: "クラス" }, { text: "対抗", ruby: "たいこう" }, { text: "リレーの" }, { text: "走者", ruby: "そうしゃ" }, { text: "として" }, { text: "出場", ruby: "しゅつじょう" }, { text: "しました。" },
      { text: "バトンを" }, { text: "受", ruby: "う" }, { text: "け" }, { text: "取", ruby: "と" }, { text: "り、" }, { text: "歓声", ruby: "かんせい" }, { text: "を" }, { text: "背", ruby: "せ" }, { text: "に" }, { text: "必死", ruby: "ひっし" }, { text: "で" }, { text: "トラックを" }, { text: "駆け抜けました。" },
      { text: "惜", ruby: "お" }, { text: "しくも" }, { text: "2位", ruby: "にい" }, { text: "でしたが、" }, { text: "仲間", ruby: "なかま" }, { text: "と" }, { text: "絆", ruby: "きずな" }, { text: "が" }, { text: "深", ruby: "ふか" }, { text: "まった" }, { text: "最高", ruby: "さいこう" }, { text: "の" }, { text: "一日", ruby: "いちにち" }, { text: "でした。" }
    ],
    contentKo: "화창한 날씨 아래, 학교 체육대회가 개최되었습니다. 저는 반 대항 계주 주자로 출전했습니다. 바통을 받아 들고 함성을 등에 업은 채 필사적으로 트랙을 달려 나갔습니다. 아쉽게도 2위였지만 동료들과 유대감이 깊어진 최고의 하루였습니다.",
    vocabulary: [
      { word: "体育祭", reading: "たいいくさい", meaning: "체육대회" },
      { word: "走者", reading: "そうしゃ", meaning: "주자, 런너" },
      { word: "駆け抜ける", reading: "かけぬける", meaning: "달려 나가다, 누비다" },
      { word: "惜しくも", reading: "おしくも", meaning: "아깝게도, 아쉽게도" },
      { word: "深まる", reading: "ふかまる", meaning: "깊어지다" }
    ],
    grammarPoints: [
      { rule: "〜のもと", explanation: "'~ 아래에서' (조건이나 분위기)" },
      { rule: "〜を背に", explanation: "'~를 등에 업고, ~를 뒤로하고'" }
    ],
    quiz: [
      { question: "「体育祭」의 읽는 법은?", options: ["たいいくさい", "たいいくまつり", "たいいくせん", "たいいくかい"], answer: "たいいくさい", explanation: "体育祭(たいいくさい)는 학교 체육대회입니다." },
      { question: "「駆け抜ける」의 뜻은?", options: ["달려 나가다", "천천히 걷다", "멈춰 서다", "넘어지다"], answer: "달려 나가다", explanation: "駆け抜ける는 빠른 속도로 지나쳐 달리는 것입니다." },
      { question: "「惜しくも」의 의미는?", options: ["아쉽게도/아깝게도", "다행히도", "기쁘게도", "갑자기"], answer: "아쉽게도/아깝게도", explanation: "惜(お)しくも는 안타깝거나 아쉬운 마음을 나타냅니다." }
    ]
  },
  {
    id: "ld-154",
    title: "ゼミの発表とディスカッション",
    titleKo: "세미나 발표와 토론",
    category: "학교",
    level: "고급",
    thumbnail: "🎓",
    contentJp: [
      { text: "大学", ruby: "だいがく" }, { text: "の" }, { text: "ゼミで" }, { text: "研究", ruby: "けんきゅう" }, { text: "テーマについて" }, { text: "発表", ruby: "はっぴょう" }, { text: "を行いました。" },
      { text: "レジュメを" }, { text: "配布", ruby: "はいふ" }, { text: "し、" }, { text: "スライドを" }, { text: "使", ruby: "つか" }, { text: "って" }, { text: "論理的", ruby: "ろんりてき" }, { text: "に" }, { text: "説明", ruby: "せつめい" }, { text: "するよう" }, { text: "心", ruby: "こころ" }, { text: "がけました。" },
      { text: "発表後", ruby: "はっぴょうご" }, { text: "の" }, { text: "質疑応答", ruby: "しつぎおうとう" }, { text: "では" }, { text: "教授", ruby: "きょうじゅ" }, { text: "や" }, { text: "ゼミ生", ruby: "ぜみせい" }, { text: "から" }, { text: "鋭", ruby: "わる" }, { text: "い" }, { text: "質問", ruby: "しつもん" }, { text: "が" }, { text: "飛", ruby: "と" }, { text: "び" }, { text: "交", ruby: "か" }, { text: "いました。" },
      { text: "多角的", ruby: "たかくてき" }, { text: "な" }, { text: "視点", ruby: "してん" }, { text: "から" }, { text: "議論", ruby: "ぎろん" }, { text: "を" }, { text: "深", ruby: "ふか" }, { text: "めることができ、" }, { text: "有意義", ruby: "ゆういぎ" }, { text: "な" }, { text: "時間", ruby: "じかん" }, { text: "となりました。" }
    ],
    contentKo: "대학 세미나에서 연구 주제에 대해 발표를 진행했습니다. 요약본을 배포하고 슬라이드를 사용하여 논리적으로 설명하도록 노력했습니다. 발표 후 질의응답에서는 교수님과 세미나 학생들로부터 날카로운 질문이 오갔습니다. 다각적인 시점에서 논의를 심화할 수 있어 유의미한 시간이 되었습니다.",
    vocabulary: [
      { word: "配布", reading: "はいふ", meaning: "배포" },
      { word: "心がける", reading: "こころがける", meaning: "유념하다, 마음먹다" },
      { word: "質疑応答", reading: "しつぎおうとう", meaning: "질의응답" },
      { word: "飛び交う", reading: "とびかう", meaning: "어지럽게 오가다" },
      { word: "有意義", reading: "ゆういぎ", meaning: "유의미함, 뜻깊음" }
    ],
    grammarPoints: [
      { rule: "〜ように心がける", explanation: "'~하도록 유념하다/노력하다'" },
      { rule: "〜となりました", explanation: "'~가 되었습니다' (경과나 결과 강조)" }
    ],
    quiz: [
      { question: "「質疑応答」의 읽는 법은?", options: ["しつぎおうとう", "しつぎとうとう", "しつもんおうとう", "しつぎこたえ"], answer: "しつぎおうとう", explanation: "質疑応答(しつぎおうとう)는 질문과 답변입니다." },
      { question: "「心がける」의 뜻은?", options: ["유념하다/노력하다", "포기하다", "잊어버리다", "비난하다"], answer: "유념하다/노력하다", explanation: "心がける(こころがける)는 어떤 태도나 행동을 항시 염두에 두고 실행하는 것입니다." },
      { question: "「飛び交う」의 의미는?", options: ["복잡하게 오가다", "한곳에 모이다", "조용히 떨어지다", "도망치다"], answer: "복잡하게 오가다", explanation: "질문이나 의견 등이 이리저리 서로 왕래하는 모양입니다." }
    ]
  },
  {
    id: "ld-155",
    title: "給食の思い出",
    titleKo: "급식의 추억",
    category: "학교",
    level: "초급",
    thumbnail: "🍱",
    contentJp: [
      { text: "小学校", ruby: "しょうがっこう" }, { text: "の" }, { text: "時", ruby: "とき" }, { text: "、" }, { text: "昼休み", ruby: "ひるやす" }, { text: "前", ruby: "まえ" }, { text: "の" }, { text: "給食", ruby: "きゅうしょく" }, { text: "の" }, { text: "時間", ruby: "じかん" }, { text: "が" }, { text: "楽", ruby: "たの" }, { text: "しみでした。" },
      { text: "当番", ruby: "とうばん" }, { text: "が" }, { text: "白", ruby: "しろ" }, { text: "い" }, { text: "割烹着", ruby: "かっぽうぎ" }, { text: "を" }, { text: "着", ruby: "き" }, { text: "て" }, { text: "配膳", ruby: "はいぜん" }, { text: "をしました。" },
      { text: "一番", ruby: "いちばん" }, { text: "好", ruby: "す" }, { text: "きだった" }, { text: "メニューは" }, { text: "揚げパンと" }, { text: "ソフト麺です。" },
      { text: "余", ruby: "あま" }, { text: "った" }, { text: "プリンを" }, { text: "かけて" }, { text: "ジャンケンをしたのも" }, { text: "懐", ruby: "なつ" }, { text: "かしいです。" }
    ],
    contentKo: "초등학교 때 점심시간 전의 급식 시간이 기다려졌습니다. 당번이 흰 위생복을 입고 배식을 했습니다. 가장 좋아했던 메뉴는 튀김빵과 소프트 멘이었습니다. 남은 푸딩을 두고 가위바위보를 했던 것도 그립습니다.",
    vocabulary: [
      { word: "給食", reading: "きゅうしょく", meaning: "급식" },
      { word: "当番", reading: "とうばん", meaning: "당번" },
      { word: "配膳", reading: "はいぜん", meaning: "배식, 차림" },
      { word: "余る", reading: "あまる", meaning: "남다" },
      { word: "懐かしい", reading: "なつかしい", meaning: "그립다" }
    ],
    grammarPoints: [
      { rule: "〜をかけて", explanation: "'~를 내걸고, ~를 두고'" },
      { rule: "〜のも〜です", explanation: "동사 문장을 명사화하여 '~한 것도 ~입니다'" }
    ],
    quiz: [
      { question: "「給食」의 읽는 법은?", options: ["きゅうしょく", "きゅうじき", "きょしょく", "きゅうたべ"], answer: "きゅうしょく", explanation: "給食(きゅうしょく)는 학교 급식을 의미합니다." },
      { question: "「余る」의 뜻은?", options: ["남다", "모자라다", "버리다", "사다"], answer: "남다", explanation: "余(あ)まる는 필요한 양보다 많아 남는 것입니다." },
      { question: "「懐かしい」의 의미는?", options: ["그립다", "슬프다", "새롭다", "부끄럽다"], answer: "그립다", explanation: "懐(なつ)かしい는 과거의 추억이 생각나 정겨운 느낌입니다." }
    ]
  },
  {
    id: "ld-156",
    title: "部活動の夏合宿",
    titleKo: "동아리 활동의 여름 합숙",
    category: "학교",
    level: "중급",
    thumbnail: "⚽",
    contentJp: [
      { text: "サッカー部", ruby: "ぶ" }, { text: "の" }, { text: "夏合宿", ruby: "なつがっしゅく" }, { text: "で" }, { text: "長野県", ruby: "ながのけん" }, { text: "の" }, { text: "高原", ruby: "こうげん" }, { text: "へ" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "朝", ruby: "あさ" }, { text: "から" }, { text: "夕方", ruby: "ゆうがた" }, { text: "まで" }, { text: "厳しい" }, { text: "練習", ruby: "れんしゅう" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "き、" }, { text: "体力", ruby: "たいりょく" }, { text: "の" }, { text: "限界", ruby: "げんかい" }, { text: "に" }, { text: "挑", ruby: "いど" }, { text: "みました。" },
      { text: "夜", ruby: "よる" }, { text: "は" }, { text: "宿", ruby: "やど" }, { text: "で" }, { text: "仲間", ruby: "なかま" }, { text: "と" }, { text: "大部屋", ruby: "おおべや" }, { text: "で" }, { text: "布団", ruby: "ふとん" }, { text: "を" }, { text: "並", ruby: "なら" }, { text: "べて" }, { text: "語", ruby: "かた" }, { text: "り" }, { text: "合", ruby: "あ" }, { text: "いました。" },
      { text: "辛", ruby: "つら" }, { text: "い" }, { text: "練習", ruby: "れんしゅう" }, { text: "を" }, { text: "共", ruby: "とも" }, { text: "に" }, { text: "乗り越えたことで" }, { text: "チームワークが" }, { text: "深", ruby: "ふか" }, { text: "まりました。" }
    ],
    contentKo: "축구부 여름 합숙으로 나가노현 고원에 갔습니다. 아침부터 저녁까지 엄격한 훈련이 계속되어 체력의 한계에 도전했습니다. 밤에는 숙소에서 동료들과 큰 방에 이불을 깔고 이야기를 나누었습니다. 힘든 훈련을 함께 극복해 냄으로써 팀워크가 깊어졌습니다.",
    vocabulary: [
      { word: "夏合宿", reading: "なつがっしゅく", meaning: "여름 합숙" },
      { word: "高原", reading: "こうげん", meaning: "고원" },
      { word: "限界", reading: "げんかい", meaning: "한계" },
      { word: "挑む", reading: "いどむ", meaning: "도전하다, 맞서다" },
      { word: "大部屋", reading: "おおべや", meaning: "큰 방" }
    ],
    grammarPoints: [
      { rule: "〜に挑む", explanation: "'~에 도전하다'" },
      { rule: "〜乗り越えたことで", explanation: "'~극복해 냄으로써'" }
    ],
    quiz: [
      { question: "「夏合宿」의 읽는 법은?", options: ["なつがっしゅく", "なつあいじゅく", "かごうしゅく", "なつごうしゅく"], answer: "なつがっしゅく", explanation: "夏合宿(なつがっしゅく)는 여름에 함께 묵으며 훈련하는 합숙입니다." },
      { question: "「挑む」의 뜻은?", options: ["도전하다", "도망치다", "쉬다", "관망하다"], answer: "도전하다", explanation: "挑(いど)む는 어려운 목표나 시험에 덤벼들어 도전하는 것입니다." },
      { question: "「限界」의 한자 읽기는?", options: ["げんかい", "かんかい", "けんかい", "げんけい"], answer: "げんかい", explanation: "限界(げんかい)는 능력이나 수량의 한계입니다." }
    ]
  },
  {
    id: "ld-157",
    title: "卒業式の涙",
    titleKo: "졸업식의 눈물",
    category: "학교",
    level: "중급",
    thumbnail: "🎓",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "3年間", ruby: "さんねんかん" }, { text: "通", ruby: "かよ" }, { text: "った" }, { text: "学校", ruby: "がっこう" }, { text: "の" }, { text: "卒業式", ruby: "そつぎょうしき" }, { text: "でした。" },
      { text: "校長", ruby: "こうちょう" }, { text: "先生", ruby: "せんせい" }, { text: "から" }, { text: "卒業証書", ruby: "そつぎょうしょうしょ" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "け" }, { text: "取", ruby: "と" }, { text: "り、" }, { text: "感無量", ruby: "かんむりょう" }, { text: "でした。" },
      { text: "式", ruby: "しき" }, { text: "の" }, { text: "最後", ruby: "さいご" }, { text: "に" }, { text: "全員で" }, { text: "合唱", ruby: "がっしょう" }, { text: "した" }, { text: "時", ruby: "とき" }, { text: "、" }, { text: "こらえていた" }, { text: "涙", ruby: "なみだ" }, { text: "が" }, { text: "溢", ruby: "あふ" }, { text: "れ" }, { text: "出", ruby: "だ" }, { text: "しました。" },
      { text: "別", ruby: "わか" }, { text: "れは" }, { text: "寂", ruby: "さび" }, { text: "しいですが、" }, { text: "それぞれの" }, { text: "未来", ruby: "みらい" }, { text: "へ" }, { text: "一歩", ruby: "いっぽ" }, { text: "を踏", ruby: "ふ" }, { text: "み" }, { text: "出", ruby: "だ" }, { text: "します。" }
    ],
    contentKo: "오늘은 3년 동안 다닌 학교의 졸업식이었습니다. 교장 선생님으로부터 졸업장을 받고 감회가 깊었습니다. 식이 끝날 무렵 전원이 합창했을 때 참았던 눈물이 흘러나왔습니다. 이별은 섭섭하지만 각자의 미래로 한 걸음을 내딛습니다.",
    vocabulary: [
      { word: "卒業証書", reading: "そつぎょうしょうしょ", meaning: "졸업장" },
      { word: "感無量", reading: "かんむりょう", meaning: "감회가 무량함" },
      { word: "合唱", reading: "がっしょう", meaning: "합창" },
      { word: "こらえる", reading: "こらえる", meaning: "참다, 견디다" },
      { word: "踏み出す", reading: "ふみだす", meaning: "내딛다" }
    ],
    grammarPoints: [
      { rule: "〜通った学校", explanation: "동사 과거형 연체식 '~ 다녔던 학교'" },
      { rule: "〜あふれ出す", explanation: "복합동사 '~가 쏟아져 나오다/흘러나오다'" }
    ],
    quiz: [
      { question: "「感無量」의 읽는 법은?", options: ["かんむりょう", "かんむりょう", "かんむりょう", "かんむりょう"], answer: "かんむりょう", explanation: "感無量(かんむりょう)는 감개가 무량하고 가슴이 벅찬 감정입니다." },
      { question: "「こらえる」의 뜻은?", options: ["참다", "흘리다", "웃다", "소리치다"], answer: "참다", explanation: "こらえる는 슬픔이나 아픔 등의 감정을 억누르고 견디는 것입니다." },
      { question: "「踏み出す」의 의미는?", options: ["내딛다", "뒤로 물러서다", "멈추다", "앉다"], answer: "내딛다", explanation: "踏み出す(ふみだす)는 앞으로 발을 내딛거나 새 출발을 하는 것입니다." }
    ]
  },
  {
    id: "ld-158",
    title: "キャンパスのオープンキャンパス",
    titleKo: "캠퍼스 오픈 캠퍼스 행사",
    category: "학교",
    level: "초급",
    thumbnail: "🏫",
    contentJp: [
      { text: "志望", ruby: "しぼう" }, { text: "する" }, { text: "大学", ruby: "だいがく" }, { text: "の" }, { text: "オープンキャンパスに" }, { text: "参加", ruby: "さんか" }, { text: "しました。" },
      { text: "模擬", ruby: "もぎ" }, { text: "授業", ruby: "じゅぎょう" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "けて" }, { text: "専門的", ruby: "せんもんてき" }, { text: "な" }, { text: "学", ruby: "まな" }, { text: "びの" }, { text: "面白", ruby: "おもしろ" }, { text: "さを" }, { text: "知", ruby: "し" }, { text: "りました。" },
      { text: "先輩", ruby: "せんぱい" }, { text: "学生", ruby: "がくせい" }, { text: "が" }, { text: "キャンパスを" }, { text: "案内", ruby: "あんない" }, { text: "してくれて、" }, { text: "学生", ruby: "がくせい" }, { text: "生活", ruby: "せいかつ" }, { text: "の" }, { text: "話", ruby: "はなし" }, { text: "を" }, { text: "聞", ruby: "き" }, { text: "かせてくれました。" },
      { text: "「絶対", ruby: "ぜったい" }, { text: "にこの" }, { text: "大学", ruby: "だいがく" }, { text: "に" }, { text: "合格", ruby: "ごうかく" }, { text: "したい」という" }, { text: "モチベーションが" }, { text: "高", ruby: "たか" }, { text: "まりました。" }
    ],
    contentKo: "지망하는 대학의 오픈 캠퍼스에 참가했습니다. 모의 수업을 듣고 전문적인 배움의 재미를 알았습니다. 선배 학생들이 캠퍼스를 안내해 주어 학생 생활 이야기를 들려주었습니다. '반드시 이 대학에 합격하고 싶다'는 동기부여가 높아졌습니다.",
    vocabulary: [
      { word: "志望", reading: "しぼう", meaning: "지망" },
      { word: "模擬授業", reading: "もぎじゅぎょう", meaning: "모의 수업" },
      { word: "案内", reading: "あんない", meaning: "안내" },
      { word: "モチベーション", reading: "モチベーション", meaning: "동기부여, 의욕" },
      { word: "高まる", reading: "たかまる", meaning: "고조되다, 높아지다" }
    ],
    grammarPoints: [
      { rule: "〜てくれる", explanation: "'~해 주다' 남이 호의를 베풂" },
      { rule: "〜聞かせてくれる", explanation: "사역 수수 표현 ('듣게 해 주다 / 들려주다')" }
    ],
    quiz: [
      { question: "「模擬授業」의 읽는 법은?", options: ["もぎじゅぎょう", "もぎじゅぎょ", "ぎもじゅぎょう", "もぎじゅよう"], answer: "もぎじゅぎょう", explanation: "模擬(もぎ) + 授業(じゅぎょう) = 모의 수업." },
      { question: "「聞かせてくれた」의 뜻은?", options: ["들려주었다", "물어보았다", "말하게 하였다", "경청시켰다"], answer: "들려주었다", explanation: "聞かせる(듣게 하다) + てくれた(해 주었다) = 들려주었다." },
      { question: "「高まる」의 의미는?", options: ["높아지다/고조되다", "낮아지다", "사라지다", "변하지 않다"], answer: "높아지다/고조되다", explanation: "高まる(たかまる)는 기세나 의욕 등이 높아지는 것입니다." }
    ]
  },
  {
    id: "ld-159",
    title: "交換留学の面接",
    titleKo: "교환 유학 면접",
    category: "학교",
    level: "고급",
    thumbnail: "🌏",
    contentJp: [
      { text: "交換", ruby: "こうかん" }, { text: "留学", ruby: "りゅうがく" }, { text: "の" }, { text: "選考", ruby: "せんこう" }, { text: "面接", ruby: "めんせつ" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "けました。" },
      { text: "志望", ruby: "しぼう" }, { text: "動機", ruby: "どうき" }, { text: "や" }, { text: "現地", ruby: "げんち" }, { text: "での" }, { text: "研究", ruby: "けんきゅう" }, { text: "計画", ruby: "けいかく" }, { text: "について" }, { text: "英語", ruby: "えいご" }, { text: "と" }, { text: "日本語", ruby: "にほんご" }, { text: "で" }, { text: "質問", ruby: "しつもん" }, { text: "されました。" },
      { text: "緊張", ruby: "きんちょう" }, { text: "で" }, { text: "声", ruby: "こえ" }, { text: "が" }, { text: "震", ruby: "ふる" }, { text: "えそうになりましたが、" }, { text: "自分", ruby: "じぶん" }, { text: "の" }, { text: "情熱", ruby: "じょうねつ" }, { text: "を" }, { text: "精一杯", ruby: "せいいっぱい" }, { text: "伝", ruby: "つた" }, { text: "えました。" },
      { text: "結果", ruby: "けっか" }, { text: "を" }, { text: "待", ruby: "ま" }, { text: "つ" }, { text: "間", ruby: "あいだ" }, { text: "は" }, { text: "ドキドキしますが、" }, { text: "全力を尽くした" }, { text: "ので" }, { text: "悔", ruby: "くや" }, { text: "いはありません。" }
    ],
    contentKo: "교환 유학 선발 면접을 보았습니다. 지망 동기와 현지에서의 연구 계획에 대해 영어와 일본어로 질문을 받았습니다. 긴장으로 목소리가 떨릴 뻔했지만, 내 열정을 온 힘을 다해 전했습니다. 결과를 기다리는 동안은 두근거리지만, 전력을 다했으므로 후회는 없습니다.",
    vocabulary: [
      { word: "選考", reading: "せんこう", meaning: "선발, 선고" },
      { word: "志望動機", reading: "しぼうどうき", meaning: "지망 동기" },
      { word: "情熱", reading: "じょうねつ", meaning: "열정" },
      { word: "精一杯", reading: "せいいっぱい", meaning: "온 힘을 다해, 최선껏" },
      { word: "全力を尽くす", reading: "ぜんりょくをつくす", meaning: "전력을 다하다" }
    ],
    grammarPoints: [
      { rule: "〜について質問される", explanation: "수동태 '~에 대해 질문을 받다'" },
      { rule: "〜そうになる", explanation: "'~할 뻔하다'" }
    ],
    quiz: [
      { question: "「志望動機」의 읽는 법은?", options: ["しぼうどうき", "しぼうとうき", "しぼうどうぎ", "しぼうどうこ"], answer: "しぼうどうき", explanation: "志望動機(しぼうどうき)는 지망하는 이유나 동기입니다." },
      { question: "「精一杯」의 뜻은?", options: ["온 힘을 다해", "조금만", "건성으로", "어쩔 수 없이"], answer: "온 힘을 다해", explanation: "精一杯(せいいっぱい)는 자신이 낼 수 있는 힘을 다하는 모양입니다." },
      { question: "「全力を尽くした」의 의미는?", options: ["전력을 다했다", "힘을 아꼈다", "포기했다", "도움을 청했다"], answer: "전력을 다했다", explanation: "全力を尽くす는 가진 힘을 모조리 쏟아붓는 것입니다." }
    ]
  },
  {
    id: "ld-160",
    title: "グループワークの協力",
    titleKo: "그룹 워크의 협력",
    category: "학교",
    level: "초급",
    thumbnail: "🤝",
    contentJp: [
      { text: "授業", ruby: "じゅぎょう" }, { text: "で" }, { text: "4人", ruby: "よにん" }, { text: "の" }, { text: "グループワークを" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "課題", ruby: "かだい" }, { text: "の" }, { text: "テーマについて" }, { text: "それぞれ" }, { text: "役割", ruby: "やくわり" }, { text: "を" }, { text: "分担", ruby: "ぶんたん" }, { text: "して" }, { text: "調べました。" },
      { text: "情報", ruby: "じょうほう" }, { text: "を" }, { text: "持ち寄って" }, { text: "スライドを" }, { text: "作成", ruby: "さくせい" }, { text: "し、" }, { text: "発表", ruby: "はっぴょう" }, { text: "の" }, { text: "練習", ruby: "れんしゅう" }, { text: "を重ねました。" },
      { text: "一人では" }, { text: "出", ruby: "で" }, { text: "ない" }, { text: "アイデアが" }, { text: "たくさん" }, { text: "生", ruby: "うま" }, { text: "まれ、" }, { text: "協力", ruby: "きょうりょく" }, { text: "することの" }, { text: "大切", ruby: "たいせつ" }, { text: "さを" }, { text: "学", ruby: "まな" }, { text: "びました。" }
    ],
    contentKo: "수업에서 4명 그룹 워크를 진행했습니다. 과제 주제에 대해 각각 역할을 분담해 조사했습니다. 정보를 가져와 슬라이드를 작성하고 발표 연습을 거듭했습니다. 혼자서는 나오지 않는 아이디어가 많이 태어나 협력하는 것의 중요성을 배웠습니다.",
    vocabulary: [
      { word: "課題", reading: "かだい", meaning: "과제" },
      { word: "役割", reading: "やくわり", meaning: "역할" },
      { word: "分担", reading: "ぶんたん", meaning: "분담" },
      { word: "持ち寄る", reading: "もちよる", meaning: "각자 가지고 모이다" },
      { word: "協力", reading: "きょうりょく", meaning: "협력" }
    ],
    grammarPoints: [
      { rule: "〜について", explanation: "'~에 대해서'" },
      { rule: "〜することの大切さ", explanation: "동사의 명사화 + 의 중요성" }
    ],
    quiz: [
      { question: "「役割」의 읽는 법은?", options: ["やくわり", "やくかつ", "えきわり", "やくわ割り"], answer: "やくわり", explanation: "役割(やくわり)는 자신이 맡은 책무나 역할입니다." },
      { question: "「持ち寄る」의 뜻은?", options: ["각자 가져오다", "다 버리다", "숨기다", "훔치다"], answer: "각자 가져오다", explanation: "持ち寄る(もちよる)는 각자 모은 것을 한자리에 가지고 오는 것입니다." },
      { question: "「協力」의 의미는?", options: ["협력", "경쟁", "대립", "방관"], answer: "협력", explanation: "協力(きょうりょく)는 마음과 힘을 합쳐 도우는 것입니다." }
    ]
  }
];
