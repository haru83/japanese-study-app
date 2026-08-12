import type { LearningDiary } from "@/types/learningDiary";

export const part14: LearningDiary[] = [
  {
    id: "ld-131",
    title: "春のお花見",
    titleKo: "봄의 벚꽃 구경",
    category: "계절",
    level: "초급",
    thumbnail: "🌸",
    contentJp: [
      { text: "公園", ruby: "こうえん" }, { text: "の" }, { text: "桜", ruby: "さくら" }, { text: "が" }, { text: "満開", ruby: "まんかい" }, { text: "になりました。" },
      { text: "友達", ruby: "ともだち" }, { text: "と" }, { text: "一緒", ruby: "いっしょ" }, { text: "に" }, { text: "レジャーシートを" }, { text: "広", ruby: "ひろ" }, { text: "げて" }, { text: "お" }, { text: "花見", ruby: "はなみ" }, { text: "をしました。" },
      { text: "手作", ruby: "てづく" }, { text: "りの" }, { text: "お" }, { text: "弁当", ruby: "べんとう" }, { text: "と" }, { text: "団子", ruby: "だんご" }, { text: "を" }, { text: "食", ruby: "た" }, { text: "べました。" },
      { text: "風", ruby: "かぜ" }, { text: "が" }, { text: "吹", ruby: "ふ" }, { text: "くと" }, { text: "桜吹雪", ruby: "さくらふぶき" }, { text: "が" }, { text: "舞", ruby: "ま" }, { text: "い" }, { text: "散", ruby: "ち" }, { text: "り、" }, { text: "夢", ruby: "ゆめ" }, { text: "のように" }, { text: "綺麗", ruby: "きれい" }, { text: "でした。" }
    ],
    contentKo: "공원의 벚꽃이 만개했습니다. 친구와 함께 레저 시트를 펼쳐 꽃구경을 했습니다. 직접 만든 도시락과 경단을 먹었습니다. 바람이 불면 벚꽃 눈보라가 흩날려 꿈처럼 예뻤습니다.",
    vocabulary: [
      { word: "満開", reading: "まんかい", meaning: "만개, 흩드러지게 핌" },
      { word: "花見", reading: "はなみ", meaning: "꽃구경" },
      { word: "団子", reading: "だんご", meaning: "경단" },
      { word: "桜吹雪", reading: "さくらふぶき", meaning: "벚꽃 눈보라 (바람에 흩날리는 벚꽃)" },
      { word: "舞い散る", reading: "まいちる", meaning: "흩날리다" }
    ],
    grammarPoints: [
      { rule: "〜になる", explanation: "상태의 변화 '~가 되다'" },
      { rule: "〜のように", explanation: "비유 표현 '~처럼, ~같이'" }
    ],
    quiz: [
      { question: "「満開」의 읽는 법은?", options: ["まんかい", "まんかん", "ばんかい", "みちひらき"], answer: "まんかい", explanation: "満開(まんかい)는 꽃이 흐드러지게 피어난 상태입니다." },
      { question: "「桜吹雪」의 의미는?", options: ["바람에 흩날리는 벚꽃", "눈보라", "벚꽃 봉오리", "단풍"], answer: "바람에 흩날리는 벚꽃", explanation: "桜(벚꽃) + 吹雪(눈보라) = 바람에 눈처럼 흩날리는 벚꽃잎" },
      { question: "「夢のように」의 뜻은?", options: ["꿈처럼", "꿈속에서", "꿈이 아닌", "꿈을 위해"], answer: "꿈처럼", explanation: "N + のように = ~처럼, ~와 같이" }
    ]
  },
  {
    id: "ld-132",
    title: "夏の蝉しぐれ",
    titleKo: "여름의 매미 소리",
    category: "계절",
    level: "중급",
    thumbnail: "🌻",
    contentJp: [
      { text: "本格的", ruby: "ほんかくてき" }, { text: "な" }, { text: "夏", ruby: "なつ" }, { text: "が" }, { text: "訪", ruby: "おとず" }, { text: "れ、" }, { text: "木々", ruby: "きぎ" }, { text: "から" }, { text: "蝉", ruby: "せみ" }, { text: "の" }, { text: "鳴", ruby: "な" }, { text: "き" }, { text: "声", ruby: "こえ" }, { text: "が" }, { text: "響", ruby: "ひび" }, { text: "き" }, { text: "渡", ruby: "わた" }, { text: "っています。" },
      { text: "大空", ruby: "おおぞら" }, { text: "には" }, { text: "入乱", ruby: "いりみだ" }, { text: "れる" }, { text: "入道雲", ruby: "にゅうどうぐも" }, { text: "が" }, { text: "湧", ruby: "わ" }, { text: "き" }, { text: "上", ruby: "あ" }, { text: "がっています。" },
      { text: "冷", ruby: "つめ" }, { text: "たい" }, { text: "麦茶", ruby: "むぎちゃ" }, { text: "を" }, { text: "飲", ruby: "の" }, { text: "みながら" }, { text: "風鈴", ruby: "ふうりん" }, { text: "の" }, { text: "音", ruby: "ね" }, { text: "に" }, { text: "耳", ruby: "みみ" }, { text: "を" }, { text: "澄", ruby: "す" }, { text: "ませます。" },
      { text: "暑", ruby: "あつ" }, { text: "いけれど" }, { text: "夏", ruby: "なつ" }, { text: "らしさを" }, { text: "満喫", ruby: "まんきつ" }, { text: "しています。" }
    ],
    contentKo: "본격적인 여름이 찾아와 나무들로부터 매미 울음소리가 널리 울려 퍼지고 있습니다. 푸른 하늘에는 뭉게구름(적란운)이 솟아오르고 있습니다. 시원한 보리차를 마시며 풍경 소리에 귀를 기울입니다. 덥지만 여름다운 매력을 만끽하고 있습니다.",
    vocabulary: [
      { word: "蝉", reading: "せみ", meaning: "매미" },
      { word: "響き渡る", reading: "ひびきわたる", meaning: "널리 울려 퍼지다" },
      { word: "入道雲", reading: "にゅうどうぐも", meaning: "뭉게구름, 적란운" },
      { word: "風鈴", reading: "ふうりん", meaning: "풍경 (처마에 다는 종)" },
      { word: "耳を澄ます", reading: "みみをすます", meaning: "귀를 기울이다" }
    ],
    grammarPoints: [
      { rule: "〜から〜が響き渡る", explanation: "'~로부터 ~가 널리 울려 퍼지다'" },
      { rule: "〜らしさ", explanation: "명사 + らしさ = '~다운 특징/매력'" }
    ],
    quiz: [
      { question: "「蝉」의 한자 읽기는?", options: ["せみ", "すずめ", "とんぼ", "ちょう"], answer: "せみ", explanation: "蝉(せみ)는 여름 곤충 매미입니다." },
      { question: "「風鈴」의 뜻은?", options: ["풍경 (종)", "바람개비", "부채", "모기향"], answer: "풍경 (종)", explanation: "風鈴(ふうりん)은 바람이 불면 소리가 나는 유리나 금속 종입니다." },
      { question: "「耳を澄ます」의 의미는?", options: ["귀를 기울이다", "귀를 막다", "귀를 씻다", "귀가 아프다"], answer: "귀를 기울이다", explanation: "耳を澄(す)ます는 소리를 세심히 듣기 위해 귀를 기울이는 것입니다." }
    ]
  },
  {
    id: "ld-133",
    title: "秋の紅葉狩り",
    titleKo: "가을의 단풍 구경",
    category: "계절",
    level: "중급",
    thumbnail: "🍁",
    contentJp: [
      { text: "山", ruby: "やま" }, { text: "へ" }, { text: "紅葉狩", ruby: "もみじが" }, { text: "りに行きました。" },
      { text: "モミジや" }, { text: "イチョウが" }, { text: "赤", ruby: "あか" }, { text: "や" }, { text: "黄色", ruby: "きいろ" }, { text: "に" }, { text: "色", ruby: "いろ" }, { text: "づいていました。" },
      { text: "落", ruby: "お" }, { text: "ち" }, { text: "葉", ruby: "ば" }, { text: "の" }, { text: "絨毯", ruby: "じゅうたん" }, { text: "の" }, { text: "上", ruby: "うえ" }, { text: "を" }, { text: "踏", ruby: "ふ" }, { text: "み" }, { text: "しめて" }, { text: "歩", ruby: "ある" }, { text: "きました。" },
      { text: "秋", ruby: "あき" }, { text: "の" }, { text: "澄", ruby: "す" }, { text: "んだ" }, { text: "空気", ruby: "くうき" }, { text: "が" }, { text: "とても" }, { text: "清々", ruby: "すがすが" }, { text: "しいです。" }
    ],
    contentKo: "산으로 단풍 구경을 다녀왔습니다. 단풍나무와 은행나무가 빨갛고 노랗게 물들어 있었습니다. 낙엽 카펫 위를 꾹꾹 밟으며 걸었습니다. 가을의 투명한 공기가 매우 상쾌합니다.",
    vocabulary: [
      { word: "紅葉狩り", reading: "もみじがり", meaning: "단풍 구경" },
      { word: "イチョウ", reading: "イチョウ", meaning: "은행나무" },
      { word: "色づく", reading: "いろづく", meaning: "물들다" },
      { word: "落ち葉", reading: "おちば", meaning: "낙엽" },
      { word: "清々しい", reading: "すがすがしい", meaning: "상쾌하다, 시원하다" }
    ],
    grammarPoints: [
      { rule: "〜に行きました", explanation: "동사 ます형 어간 + に行く = '~하러 갔다'" },
      { rule: "〜の上を踏みしめて", explanation: "'~ 위를 지그시 밟으며'" }
    ],
    quiz: [
      { question: "「紅葉狩り」의 읽는 법은?", options: ["もみじがり", "こうようがり", "あかばがり", "もみじとり"], answer: "もみじがり", explanation: "紅葉狩り(もみじがり)는 가을 단풍 구경을 말합니다." },
      { question: "「色づく」의 뜻은?", options: ["물들다", "시들다", "떨어지다", "자라다"], answer: "물들다", explanation: "色づく는 잎이 빨갛거나 노랗게 색이 변하는 것입니다." },
      { question: "「清々しい」의 의미는?", options: ["상쾌하다", "탁하다", "답답하다", "어둡다"], answer: "상쾌하다", explanation: "清々しい(すがすがしい)는 맑고 맑아 상쾌한 기분을 뜻합니다." }
    ]
  },
  {
    id: "ld-134",
    title: "冬の初雪とこたつ",
    titleKo: "겨울의 첫눈과 코타츠",
    category: "계절",
    level: "초급",
    thumbnail: "❄️",
    contentJp: [
      { text: "今朝", ruby: "けさ" }, { text: "、" }, { text: "今年", ruby: "ことし" }, { text: "初", ruby: "はじ" }, { text: "めての" }, { text: "雪", ruby: "ゆき" }, { text: "が" }, { text: "降", ruby: "ふ" }, { text: "りました。" },
      { text: "外", ruby: "そと" }, { text: "は" }, { text: "とても" }, { text: "寒", ruby: "さむ" }, { text: "いので" }, { text: "こたつを" }, { text: "出", ruby: "だ" }, { text: "しました。" },
      { text: "こたつに" }, { text: "入", ruby: "はい" }, { text: "って" }, { text: "みかんを" }, { text: "食", ruby: "た" }, { text: "べるのは" }, { text: "冬", ruby: "ふゆ" }, { text: "の" }, { text: "醍醐味", ruby: "だいごみ" }, { text: "です。" },
      { text: "温", ruby: "あたた" }, { text: "かくて" }, { text: "出", ruby: "で" }, { text: "られなくなってしまいます。" }
    ],
    contentKo: "오늘 아침, 올해 첫눈이 내렸습니다. 밖은 매우 춥기 때문에 코타츠를 꺼냈습니다. 코타츠에 들어가 귤을 먹는 것은 겨울의 묘미입니다. 따뜻해서 나올 수 없게 되어 버립니다.",
    vocabulary: [
      { word: "初雪", reading: "はつゆき", meaning: "첫눈" },
      { word: "こたつ", reading: "こたつ", meaning: "코타츠 (일본식 난방 테이블)" },
      { word: "みかん", reading: "みかん", meaning: "귤" },
      { word: "醍醐味", reading: "だいごみ", meaning: "참맛, 묘미" },
      { word: "出られない", reading: "でられない", meaning: "나올 수 없다 (가능부정)" }
    ],
    grammarPoints: [
      { rule: "〜のは〜です", explanation: "동사 문장을 명사화하여 '~하는 것은 ~입니다'" },
      { rule: "〜なくなってしまう", explanation: "'~할 수 없게 되어버리다'" }
    ],
    quiz: [
      { question: "「初雪」의 읽는 법은?", options: ["はつゆき", "しょゆき", "ういゆき", "はじめゆき"], answer: "はつゆき", explanation: "初雪(はつゆき)는 그해 겨울의 첫눈입니다." },
      { question: "「醍醐味」의 뜻은?", options: ["참맛/묘미", "괴로움", "추위", "귀찮음"], answer: "참맛/묘미", explanation: "醍醐味(だいごみ)는 어떤 것의 깊은 재미나 참맛입니다." },
      { question: "「出られなくなる」의 의미는?", options: ["나올 수 없게 되다", "나갈 수 있게 되다", "들어갈 수 없다", "자러 가다"], answer: "나올 수 없게 되다", explanation: "出る(나오다)의 가능부정 出られない + なる(되다)" }
    ]
  },
  {
    id: "ld-135",
    title: "梅雨の紫陽花",
    titleKo: "장마철의 수국",
    category: "계절",
    level: "중급",
    thumbnail: "☔",
    contentJp: [
      { text: "梅雨", ruby: "つゆ" }, { text: "の" }, { text: "季節", ruby: "きせつ" }, { text: "になり、" }, { text: "連日", ruby: "れんじつ" }, { text: "雨", ruby: "あめ" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "いています。" },
      { text: "しとしと" }, { text: "降", ruby: "ふ" }, { text: "る" }, { text: "雨", ruby: "あめ" }, { text: "の中", ruby: "のなか" }, { text: "、" }, { text: "庭", ruby: "にわ" }, { text: "の" }, { text: "紫陽花", ruby: "あじさい" }, { text: "が" }, { text: "鮮", ruby: "あざ" }, { text: "やかに" }, { text: "咲", ruby: "さ" }, { text: "いています。" },
      { text: "青", ruby: "あお" }, { text: "や" }, { text: "紫", ruby: "むらさき" }, { text: "の" }, { text: "花弁", ruby: "かべん" }, { text: "に" }, { text: "水滴", ruby: "すいてき" }, { text: "が" }, { text: "光", ruby: "ひか" }, { text: "って" }, { text: "とても" }, { text: "風情", ruby: "ふじょう" }, { text: "があります。" },
      { text: "憂鬱", ruby: "ゆううつ" }, { text: "な" }, { text: "雨", ruby: "あめ" }, { text: "の日も" }, { text: "心", ruby: "こころ" }, { text: "が" }, { text: "和", ruby: "なご" }, { text: "みます。" }
    ],
    contentKo: "장마철이 되어 연일 비가 계속되고 있습니다. 보슬보슬 내리는 비 속에서 정원의 수국이 선명하게 피어 있습니다. 파란색과 보라색 꽃잎에 물방울이 빛나서 매우 운치가 있습니다. 우울한 비 오는 날도 마음이 느긋해집니다.",
    vocabulary: [
      { word: "梅雨", reading: "つゆ", meaning: "장마" },
      { word: "紫陽花", reading: "あじさい", meaning: "수국" },
      { word: "水滴", reading: "すいてき", meaning: "물방울" },
      { word: "風情", reading: "ふじょう", meaning: "운치, 정취" },
      { word: "和む", reading: "なごむ", meaning: "마음이 풀리다, 온화해지다" }
    ],
    grammarPoints: [
      { rule: "〜の中", explanation: "'~ 속에서, ~ 도중에'" },
      { rule: "〜風情がある", explanation: "'~운치가 있다'" }
    ],
    quiz: [
      { question: "「梅雨」의 읽는 법은?", options: ["つゆ", "ばいう", "うゆ", "あめふり"], answer: "つゆ", explanation: "梅雨는 つゆ 또는 ばいう 로 읽으며 장마를 뜻합니다." },
      { question: "「紫陽花」의 한자 읽기는?", options: ["あじさい", "ひまわり", "たんぽぽ", "すみれ"], answer: "あじさい", explanation: "紫陽花(あじさい)는 장마철에 피는 수국입니다." },
      { question: "「風情」의 의미는?", options: ["운치/정취", "바람의 방향", "소음", "습기"], answer: "운치/정취", explanation: "風情(ふじょう)는 아취 있고 그윽한 멋, 운치입니다." }
    ]
  },
  {
    id: "ld-136",
    title: "夏の夜の花火大会",
    titleKo: "여름 밤의 불꽃놀이 대회",
    category: "계절",
    level: "초급",
    thumbnail: "🎆",
    contentJp: [
      { text: "川沿", ruby: "かわぞ" }, { text: "いで" }, { text: "開", ruby: "ひら" }, { text: "かれた" }, { text: "花火", ruby: "はなび" }, { text: "大会", ruby: "たいかい" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "浴衣", ruby: "ゆかた" }, { text: "を" }, { text: "着", ruby: "き" }, { text: "た" }, { text: "人", ruby: "ひと" }, { text: "たちで" }, { text: "賑", ruby: "にぎ" }, { text: "わっていました。" },
      { text: "夜空", ruby: "よぞら" }, { text: "に" }, { text: "大", ruby: "おお" }, { text: "きな" }, { text: "大輪", ruby: "たいりん" }, { text: "の" }, { text: "花火", ruby: "はなび" }, { text: "が" }, { text: "打", ruby: "う" }, { text: "ち" }, { text: "上", ruby: "あ" }, { text: "がりました。" },
      { text: "ドーンという" }, { text: "音", ruby: "おと" }, { text: "と" }, { text: "光", ruby: "ひかり" }, { text: "の" }, { text: "競演", ruby: "きょうえん" }, { text: "に" }, { text: "歓声", ruby: "かんせい" }, { text: "が" }, { text: "上", ruby: "あ" }, { text: "がりました。" }
    ],
    contentKo: "강변에서 열린 불꽃놀이 대회에 갔습니다. 유카타를 입은 사람들로 북적이고 있었습니다. 밤하늘에 커다란 한 송이 불꽃이 쏘아 올려졌습니다. 콰앙 하는 소리와 빛의 경연에 함성이 터져 나왔습니다.",
    vocabulary: [
      { word: "花火大会", reading: "はなびたいかい", meaning: "불꽃놀이 대회" },
      { word: "賑わう", reading: "にぎわう", meaning: "북적이다, 붐비다" },
      { word: "打ち上がる", reading: "うちあがる", meaning: "(불꽃 등이) 쏘아 올려지다" },
      { word: "歓声", reading: "かんせい", meaning: "함성" },
      { word: "大輪", reading: "たいりん", meaning: "큰 바퀴, 큰 꽃송이" }
    ],
    grammarPoints: [
      { rule: "〜で開かれた", explanation: "수동태 표현 (~에서 열린)" },
      { rule: "〜という〜", explanation: "'~라는 ~' (소리나 이름을 인용)" }
    ],
    quiz: [
      { question: "「花火」의 읽는 법은?", options: ["はなび", "か火", "はなひ", "はなか"], answer: "はなび", explanation: "花(はな) + 火(ひ -> び) = 불꽃" },
      { question: "「賑わう」의 뜻은?", options: ["북적이다", "조용하다", "어둡다", "텅 비다"], answer: "북적이다", explanation: "賑(にぎ)わう는 사람들로 붐비고 활기찬 모양입니다." },
      { question: "「歓声が上がる」의 의미는?", options: ["함성이 터져 나오다", "울음소리가 들리다", "침묵하다", "노래하다"], answer: "함성이 터져 나오다", explanation: "歓声(かんせい)는 환호성, 함성입니다." }
    ]
  },
  {
    id: "ld-137",
    title: "秋の夜長の月見",
    titleKo: "긴 가을밤의 달 구경",
    category: "계절",
    level: "고급",
    thumbnail: "🌕",
    contentJp: [
      { text: "十五夜", ruby: "じゅうごや" }, { text: "の" }, { text: "夜", ruby: "よる" }, { text: "、" }, { text: "ベランダに" }, { text: "ススキを" }, { text: "飾", ruby: "かざ" }, { text: "り" }, { text: "月見団子", ruby: "つきくだんご" }, { text: "を" }, { text: "備", ruby: "そな" }, { text: "えました。" },
      { text: "雲", ruby: "くも" }, { text: "ひとつない" }, { text: "夜空", ruby: "よぞら" }, { text: "に" }, { text: "丸", ruby: "まる" }, { text: "い" }, { text: "満月", ruby: "まんげつ" }, { text: "が" }, { text: "輝", ruby: "かがや" }, { text: "いています。" },
      { text: "静寂", ruby: "せいじゃく" }, { text: "の" }, { text: "中", ruby: "なか" }, { text: "で" }, { text: "月", ruby: "つき" }, { text: "を" }, { text: "眺", ruby: "なが" }, { text: "めていると、" }, { text: "時間", ruby: "じかん" }, { text: "が" }, { text: "ゆっくり" }, { text: "流", ruby: "なが" }, { text: "れていくように" }, { text: "感", ruby: "かん" }, { text: "じられます。" },
      { text: "古", ruby: "ふる" }, { text: "くからの" }, { text: "風習", ruby: "ふうしゅう" }, { text: "を" }, { text: "大切", ruby: "たいせつ" }, { text: "にしたいものです。" }
    ],
    contentKo: "보름날 밤, 베란다에 억새를 장식하고 달맞이 경단을 차렸습니다. 구름 한 점 없는 밤하늘에 동그란 둥근달이 빛나고 있습니다. 적막 속에서 달을 바라보고 있으면 시간이 천천히 흘러가는 것처럼 느껴집니다. 예부터 내려오는 풍습을 정성껏 가꾸고 싶은 법입니다.",
    vocabulary: [
      { word: "十五夜", reading: "じゅうごや", meaning: "음력 8월 15일 보름날" },
      { word: "満月", reading: "まんげつ", meaning: "보름달, 満月" },
      { word: "静寂", reading: "せいじゃく", meaning: "정적, 적막" },
      { word: "眺める", reading: "ながめる", meaning: "바라보다, 전망하다" },
      { word: "風習", reading: "ふうしゅう", meaning: "풍습" }
    ],
    grammarPoints: [
      { rule: "〜ように感じられる", explanation: "'~처럼 느껴지다'" },
      { rule: "〜たいものだ", explanation: "강한 감정이나 바램 '~하고 싶은 법이다/하고 싶다'" }
    ],
    quiz: [
      { question: "「満月」의 읽는 법은?", options: ["まんげつ", "まんがつ", "みちづき", "ばんげつ"], answer: "まんげつ", explanation: "満月(まんげつ)는 동그랗게 차오른 보름달입니다." },
      { question: "「眺める」의 뜻은?", options: ["바라보다", "만지다", "듣다", "숨기다"], answer: "바라보다", explanation: "眺(なが)める는 풍경 등을 가만히 바라보는 것입니다." },
      { question: "「静寂」의 의미는?", options: ["적막/정적", "소란스러움", "추위", "밝음"], answer: "적막/정적", explanation: "静寂(せいじゃく)는 매우 조용하고 고요함입니다." }
    ]
  },
  {
    id: "ld-138",
    title: "冬の雪かき作業",
    titleKo: "겨울의 제설 작업",
    category: "계절",
    level: "중급",
    thumbnail: "⛄",
    contentJp: [
      { text: "一晩", ruby: "ひとばん" }, { text: "で" }, { text: "一面", ruby: "いちめん" }, { text: "が" }, { text: "銀世界", ruby: "ぎんせかい" }, { text: "に" }, { text: "変", ruby: "か" }, { text: "わっていました。" },
      { text: "玄関", ruby: "げんかん" }, { text: "前", ruby: "まえ" }, { text: "と" }, { text: "車道", ruby: "しゃどう" }, { text: "の" }, { text: "雪かきを" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "スコップで" }, { text: "重", ruby: "おも" }, { text: "い" }, { text: "雪", ruby: "ゆき" }, { text: "を" }, { text: "退", ruby: "の" }, { text: "けるのは" }, { text: "重労働", ruby: "じゅうろうどう" }, { text: "です。" },
      { text: "汗", ruby: "あせ" }, { text: "を" }, { text: "かきながら" }, { text: "作業", ruby: "さぎょう" }, { text: "を" }, { text: "終", ruby: "お" }, { text: "えると、" }, { text: "近所", ruby: "きんじょ" }, { text: "の" }, { text: "子供", ruby: "こども" }, { text: "が" }, { text: "雪だるまを" }, { text: "作", ruby: "つく" }, { text: "っていました。" }
    ],
    contentKo: "하룻밤 사이에 온 세상이 은세계로 변해 있었습니다. 현관 앞과 차도의 제설 작업을 실시했습니다. 삽으로 무거운 눈을 치우는 것은 중노동입니다. 땀을 흘리며 작업을 마치니 이웃 아이가 눈사람을 만들고 있었습니다.",
    vocabulary: [
      { word: "銀世界", reading: "ぎんせかい", meaning: "은세계 (눈으로 덮인 세상)" },
      { word: "雪かき", reading: "ゆきかき", meaning: "제설, 눈 치우기" },
      { word: "退ける", reading: "のける", meaning: "치우다, 물러나게 하다" },
      { word: "重労働", reading: "じゅうろうどう", meaning: "중노동" },
      { word: "雪だるま", reading: "ゆきだるま", meaning: "눈사람" }
    ],
    grammarPoints: [
      { rule: "〜に変わる", explanation: "'~로 변하다'" },
      { rule: "〜をしながら", explanation: "동사 ます형 어간 + ながら = '~하면서'" }
    ],
    quiz: [
      { question: "「銀世界」의 뜻은?", options: ["눈으로 덮인 세상", "은으로 만든 세계", "빙상장", "얼음 동굴"], answer: "눈으로 덮인 세상", explanation: "銀世界(ぎんせかい)는 하얀 눈이 천지를 덮은 풍경을 뜻합니다." },
      { question: "「雪かき」의 의미는?", options: ["눈 치우기(제설)", "눈싸움", "스케이팅", "눈사람 만들기"], answer: "눈 치우기(제설)", explanation: "雪かき는 쌓인 눈을 긁어내 치우는 일입니다." },
      { question: "「汗をかく」의 뜻은?", options: ["땀을 흘리다", "눈물을 흘리다", "피를 흘리다", "침을 흘리다"], answer: "땀을 흘리다", explanation: "汗(あせ)をかく는 몸에서 땀을 내다, 흘리다입니다." }
    ]
  },
  {
    id: "ld-139",
    title: "春の新緑と新 생활",
    titleKo: "봄의 신록과 새 생활",
    category: "계절",
    level: "초급",
    thumbnail: "🌱",
    contentJp: [
      { text: "4月", ruby: "しがつ" }, { text: "になり、" }, { text: "木々", ruby: "きぎ" }, { text: "に" }, { text: "若葉", ruby: "わかば" }, { text: "が" }, { text: "芽生", ruby: "めば" }, { text: "えました。" },
      { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "年度", ruby: "ねんど" }, { text: "が" }, { text: "始", ruby: "はじ" }, { text: "まり、" }, { text: "街", ruby: "まち" }, { text: "には" }, { text: "スーツ" }, { text: "姿", ruby: "すがた" }, { text: "の" }, { text: "新社会人", ruby: "しんしゃかいじん" }, { text: "が" }, { text: "増", ruby: "ふ" }, { text: "えました。" },
      { text: "私", ruby: "わたし" }, { text: "も" }, { text: "心", ruby: "こころ" }, { text: "を" }, { text: "新", ruby: "あたら" }, { text: "しくして" }, { text: "目標", ruby: "もくひょう" }, { text: "を" }, { text: "設定", ruby: "せってい" }, { text: "しました。" },
      { text: "新緑", ruby: "しんりょく" }, { text: "の" }, { text: "ように" }, { text: "みずみずしい" }, { text: "気持", ruby: "きも" }, { text: "ちで" }, { text: "頑張", ruby: "がんば" }, { text: "ります。" }
    ],
    contentKo: "4월이 되어 나무들에 어린 잎이 싹텄습니다. 새 학년도가 시작되어 거리에는 정장 차림의 신사회인이 늘었습니다. 저도 마음을 새로이 하여 목표를 설정했습니다. 신록처럼 신선한 마음으로 노력하겠습니다.",
    vocabulary: [
      { word: "若葉", reading: "わかば", meaning: "어린 잎, 새싹" },
      { word: "芽生える", reading: "めばえる", meaning: "싹트다" },
      { word: "新社会人", reading: "しんしゃかいじん", meaning: "사회 새내기" },
      { word: "新緑", reading: "しんりょく", meaning: "신록 (갓 돋아난 파른 잎)" },
      { word: "みずみずしい", reading: "みずみずしい", meaning: "싱그럽다, 신선하다" }
    ],
    grammarPoints: [
      { rule: "〜になり", explanation: "연용형 연결 '~가 되고, ~가 되어'" },
      { rule: "〜を新しくして", explanation: "'~를 새롭게 하여'" }
    ],
    quiz: [
      { question: "「芽生える」의 뜻은?", options: ["싹트다", "시들다", "열리다", "떨어지다"], answer: "싹트다", explanation: "芽生(めば)える는 싹이 나오거나 감정이 생겨나는 것입니다." },
      { question: "「新緑」의 읽는 법은?", options: ["しんりょく", "しんりょく", "あたまみどり", "あたどり"], answer: "しんりょく", explanation: "新緑(しんりょく)는 푸르른 새잎, 신록입니다." },
      { question: "「みずみずしい」의 의미는?", options: ["싱그럽다/신선하다", "건조하다", "메마르다", "탁하다"], answer: "싱그럽다/신선하다", explanation: "みずみずしい는 수분이 촉촉하고 싱싱함을 뜻합니다." }
    ]
  },
  {
    id: "ld-140",
    title: "冬至とゆず湯",
    titleKo: "동지와 유자탕",
    category: "계절",
    level: "중급",
    thumbnail: "🍊",
    contentJp: [
      { text: "一年で" }, { text: "一番", ruby: "いちばん" }, { text: "昼", ruby: "ひる" }, { text: "が" }, { text: "短", ruby: "みじか" }, { text: "い" }, { text: "冬至", ruby: "とうじ" }, { text: "の" }, { text: "日", ruby: "ひ" }, { text: "です。" },
      { text: "お風呂に" }, { text: "柚子", ruby: "ゆず" }, { text: "を" }, { text: "浮かべて" }, { text: "ゆず湯に" }, { text: "入", ruby: "はい" }, { text: "りました。" },
      { text: "爽", ruby: "さわ" }, { text: "やかな" }, { text: "柑橘類", ruby: "かんきつるい" }, { text: "の" }, { text: "香", ruby: "かお" }, { text: "りが" }, { text: "浴室", ruby: "よくしつ" }, { text: "に" }, { text: "満", ruby: "み" }, { text: "ちていました。" },
      { text: "かぼちゃを食べ、" }, { text: "風邪", ruby: "かぜ" }, { text: "を" }, { text: "引", ruby: "ひ" }, { text: "かないように" }, { text: "祈", ruby: "いの" }, { text: "りました。" }
    ],
    contentKo: "일년 중 낮이 가장 짧은 동짓날입니다. 욕조에 유자를 띄워 유자탕에 들어갔습니다. 상쾌한 감귤류 향기가 욕실에 가득했습니다. 단호박을 먹고 감기에 걸리지 않기를 기도했습니다.",
    vocabulary: [
      { word: "冬至", reading: "とうじ", meaning: "동지" },
      { word: "柚子", reading: "ゆず", meaning: "유자" },
      { word: "柑橘類", reading: "かんきつるい", meaning: "감귤류" },
      { word: "満ちる", reading: "みちる", meaning: "차다, 가득하다" },
      { word: "風邪を引く", reading: "かぜをひく", meaning: "감기에 걸리다" }
    ],
    grammarPoints: [
      { rule: "〜を浮かべて", explanation: "'~를 띄워서'" },
      { rule: "〜引かないように", explanation: "'~걸리지 않도록' (목적)" }
    ],
    quiz: [
      { question: "「冬至」의 읽는 법은?", options: ["とうじ", "ふゆじ", "とうち", "ふゆいたる"], answer: "とうじ", explanation: "冬至(とうじ)는 일년 중 밤이 가장 긴 동짓날입니다." },
      { question: "「満ちる」의 뜻은?", options: ["가득 차다", "부족하다", "흘러넘치다", "새어나가다"], answer: "가득 차다", explanation: "満(み)ちる는 공간이나 용기에 가득 차는 것입니다." },
      { question: "「風邪を引かないように」의 뜻은?", options: ["감기에 걸리지 않도록", "감기에 걸린 것 같아서", "감기를 고치기 위해", "감기가 심해져서"], answer: "감기에 걸리지 않도록", explanation: "風邪を引く(감기에 걸리다) 부정형 + ように = 걸리지 않도록" }
    ]
  }
];
