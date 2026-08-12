import type { LearningDiary } from "@/types/learningDiary";

export const part13: LearningDiary[] = [
  {
    id: "ld-121",
    title: "京都の古寺巡り",
    titleKo: "교토의 오래된 사찰 둘러보기",
    category: "여행",
    level: "중급",
    thumbnail: "⛩️",
    contentJp: [
      { text: "日帰", ruby: "ひがえ" }, { text: "りで" }, { text: "京都", ruby: "きょうと" }, { text: "へ" }, { text: "旅行", ruby: "りょこう" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "清水寺", ruby: "きよみずでら" }, { text: "の" }, { text: "舞台", ruby: "ぶたい" }, { text: "から" }, { text: "見", ruby: "み" }, { text: "下", ruby: "おろ" }, { text: "す" }, { text: "景色", ruby: "けしき" }, { text: "は" }, { text: "圧巻", ruby: "あっかん" }, { text: "でした。" },
      { text: "石段", ruby: "いしだん" }, { text: "を" }, { text: "上", ruby: "のぼ" }, { text: "ったり" }, { text: "参道", ruby: "さんどう" }, { text: "を" }, { text: "歩", ruby: "ある" }, { text: "いたりして、" }, { text: "歴史", ruby: "れきし" }, { text: "を" }, { text: "肌", ruby: "はだ" }, { text: "で" }, { text: "感", ruby: "かん" }, { text: "じました。" },
      { text: "お土産", ruby: "みやげ" }, { text: "に" }, { text: "八ツ橋", ruby: "やつはし" }, { text: "を" }, { text: "買", ruby: "か" }, { text: "って" }, { text: "帰", ruby: "かえ" }, { text: "りました。" }
    ],
    contentKo: "당일치기로 교토 여행을 다녀왔습니다. 기요미즈데라 무대에서 내려다보는 풍경은 압권이었습니다. 돌계단을 오르거나 참배도를 걸으며 역사를 피부로 느꼈습니다. 기념품으로 야츠하시를 사 가지고 돌아왔습니다.",
    vocabulary: [
      { word: "日帰り", reading: "ひがえり", meaning: "당일치기" },
      { word: "舞台", reading: "ぶたい", meaning: "무대" },
      { word: "見下ろす", reading: "みおろす", meaning: "내려다보다" },
      { word: "参道", reading: "さんどう", meaning: "참배도 (사찰/신사 들어가는 길)" },
      { word: "八ツ橋", reading: "やつはし", meaning: "야츠하시 (교토 명물 과자)" }
    ],
    grammarPoints: [
      { rule: "〜たり〜たりする", explanation: "동작의 나열 '~하거나 ~하거나 하다'" },
      { rule: "〜て帰る", explanation: "동사 て형 + 帰る = '~해서/가지고 돌아오다'" }
    ],
    quiz: [
      { question: "「日帰り」의 뜻은?", options: ["당일치기", "1박 2일", "장기 여행", "해외 여행"], answer: "당일치기", explanation: "日帰り(ひがえり)는 당일에 다녀오는 여행입니다." },
      { question: "「見下ろす」의 의미는?", options: ["내려다보다", "올려다보다", "둘러보다", "마주보다"], answer: "내려다보다", explanation: "見下ろす(みおろす)는 높은 곳에서 아래를 바라보는 것입니다." },
      { question: "「歩いたり」의 문법적 역할은?", options: ["동작 나열 (~하거나)", "원인 제시", "가정 조건", "목적 표현"], answer: "동작 나열 (~하거나)", explanation: "〜たり 〜たりする 는 여러 동작을 예로 들어 나열하는 표현입니다." }
    ]
  },
  {
    id: "ld-122",
    title: "温泉旅館での癒やし",
    titleKo: "온천 료칸에서의 힐링",
    category: "여행",
    level: "중급",
    thumbnail: "♨️",
    contentJp: [
      { text: "箱根", ruby: "はこね" }, { text: "の" }, { text: "温泉", ruby: "おんせん" }, { text: "旅館", ruby: "りょかん" }, { text: "に" }, { text: "一泊", ruby: "いっぱく" }, { text: "しました。" },
      { text: "露天風呂", ruby: "ろてんぶろ" }, { text: "から" }, { text: "広", ruby: "ひろ" }, { text: "がる" }, { text: "山々", ruby: "やまやま" }, { text: "の" }, { text: "緑", ruby: "みどり" }, { text: "が" }, { text: "とても" }, { text: "美", ruby: "うつく" }, { text: "しかったです。" },
      { text: "夕食", ruby: "ゆうしょく" }, { text: "には" }, { text: "旬", ruby: "しゅん" }, { text: "の" }, { text: "食材", ruby: "しょくざい" }, { text: "を" }, { text: "使", ruby: "つか" }, { text: "った" }, { text: "会席", ruby: "かいせき" }, { text: "料理", ruby: "りょうり" }, { text: "を" }, { text: "堪能", ruby: "たんのう" }, { text: "しました。" },
      { text: "浴衣", ruby: "ゆかた" }, { text: "を" }, { text: "着", ruby: "き" }, { text: "て" }, { text: "畳", ruby: "たたみ" }, { text: "の上", ruby: "のうえ" }, { text: "で" }, { text: "くつろぐ" }, { text: "時間", ruby: "じかん" }, { text: "は" }, { text: "至福", ruby: "しふく" }, { text: "でした。" }
    ],
    contentKo: "하코네의 온천 료칸에 1박을 했습니다. 노천탕에서 펼쳐지는 산들의 녹음이 매우 아름다웠습니다. 저녁 식사로는 제철 식재료를 사용한 가이세키 요리를 만끽했습니다. 유카타를 입고 다다미 위에서 쉬는 시간은 지복이었습니다.",
    vocabulary: [
      { word: "一泊", reading: "いっぱく", meaning: "1박" },
      { word: "露天風呂", reading: "ろてんぶろ", meaning: "노천탕" },
      { word: "旬", reading: "しゅん", meaning: "제철" },
      { word: "会席料理", reading: "かいせきりょうり", meaning: "가이세키 요리 (코스 요리)" },
      { word: "堪能", reading: "たんのう", meaning: "만끽함" }
    ],
    grammarPoints: [
      { rule: "〜から広がる", explanation: "'~로부터 펼쳐지는'" },
      { rule: "〜を使った", explanation: "동사 과거형 연체식 '~를 사용한'" }
    ],
    quiz: [
      { question: "「露天風呂」의 읽는 법은?", options: ["ろてんぶろ", "ろてんふろ", "とうてんぶろ", "ろてんゆ"], answer: "ろてんぶろ", explanation: "露天風呂(ろてんぶろ)는 야외 노천탕입니다." },
      { question: "「旬」의 뜻은?", options: ["제철", "봄", "외식", "신선함"], answer: "제철", explanation: "旬(しゅん)은 음식이 가장 맛있는 제철을 뜻합니다." },
      { question: "「一泊」의 발음은?", options: ["いっぱく", "いちはく", "ひとっぱく", "いちはく"], answer: "いっぱく", explanation: "1박은 촉음화되어 'いっぱく'가 됩니다." }
    ]
  },
  {
    id: "ld-123",
    title: "新幹線の旅",
    titleKo: "신칸센 여행",
    category: "여행",
    level: "초급",
    thumbnail: "🚅",
    contentJp: [
      { text: "東京", ruby: "とうきょう" }, { text: "から" }, { text: "大阪", ruby: "おおさか" }, { text: "まで" }, { text: "新幹線", ruby: "しんかんせん" }, { text: "で" }, { text: "移動", ruby: "いどう" }, { text: "しました。" },
      { text: "駅弁", ruby: "えきべん" }, { text: "と" }, { text: "お" }, { text: "茶", ruby: "ちゃ" }, { text: "を" }, { text: "買", ruby: "か" }, { text: "って" }, { text: "車内", ruby: "しゃない" }, { text: "で" }, { text: "食", ruby: "た" }, { text: "べました。" },
      { text: "車窓", ruby: "しゃそう" }, { text: "から" }, { text: "富士山", ruby: "ふじさん" }, { text: "が" }, { text: "綺麗", ruby: "きれい" }, { text: "に" }, { text: "見", ruby: "み" }, { text: "えました。" },
      { text: "スピードが" }, { text: "速", ruby: "はや" }, { text: "くて" }, { text: "あっという間", ruby: "あっというま" }, { text: "に" }, { text: "到着", ruby: "とうちゃく" }, { text: "しました。" }
    ],
    contentKo: "도쿄에서 오사카까지 신칸센으로 이동했습니다. 에키벤(역 도시락)과 차를 사서 차 안에서 먹었습니다. 차창 밖으로 후지산이 예쁘게 보였습니다. 속도가 빨라 눈 깜짝할 사이에 도착했습니다.",
    vocabulary: [
      { word: "新幹線", reading: "しんかんせん", meaning: "신칸센(고속열차)" },
      { word: "駅弁", reading: "えきべん", meaning: "에키벤 (역 도시락)" },
      { word: "車窓", reading: "しゃそう", meaning: "차창" },
      { word: "あっという間に", reading: "あっというまに", meaning: "눈 깜짝할 사이에" },
      { word: "到着", reading: "とうちゃく", meaning: "도착" }
    ],
    grammarPoints: [
      { rule: "〜から〜まで", explanation: "시작점과 끝점 '~부터 ~까지'" },
      { rule: "〜が見える", explanation: "자연스럽게 시야에 보임 (자연적 가능/상태)" }
    ],
    quiz: [
      { question: "「駅弁」의 뜻은?", options: ["역 도시락", "열차 표", "역 승강장", "편의점 도시락"], answer: "역 도시락", explanation: "駅(역) + 弁当(도시락)의 합성어입니다." },
      { question: "「あっという間に」의 뜻은?", options: ["눈 깜짝할 사이에", "오랜 시간에 걸쳐", "도중에", "천천히"], answer: "눈 깜짝할 사이에", explanation: "あっという間(아 하는 순간) + に = 순식간에." },
      { question: "「富士山が見えました」의 해석은?", options: ["후지산이 보였습니다", "후지산을 보았습니다", "후지산이 보이지 않았습니다", "후지산에 갔습니다"], answer: "후지산이 보였습니다", explanation: "見える는 시야에 들어와 보이다는 자동사입니다." }
    ]
  },
  {
    id: "ld-124",
    title: "沖縄の海とシュノーケリング",
    titleKo: "오키나와의 바다와 스노클링",
    category: "여행",
    level: "중급",
    thumbnail: "🏖️",
    contentJp: [
      { text: "夏休", ruby: "なつやす" }, { text: "みに" }, { text: "沖縄", ruby: "おきなわ" }, { text: "へ" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "透明度", ruby: "とうめいど" }, { text: "の" }, { text: "高", ruby: "たか" }, { text: "い" }, { text: "エメラルドグリーンに" }, { text: "輝", ruby: "かがや" }, { text: "く" }, { text: "海", ruby: "うみ" }, { text: "に" }, { text: "感動", ruby: "かんどう" }, { text: "しました。" },
      { text: "シュノーケリングで" }, { text: "カラフルな" }, { text: "熱帯魚", ruby: "ねったいぎょ" }, { text: "や" }, { text: "サンゴ礁", ruby: "さんごしょう" }, { text: "を" }, { text: "間近", ruby: "まぢか" }, { text: "で" }, { text: "観察", ruby: "かんさつ" }, { text: "しました。" },
      { text: "波", ruby: "なみ" }, { text: "の" }, { text: "音", ruby: "おと" }, { text: "を" }, { text: "聞", ruby: "き" }, { text: "きながら" }, { text: "砂浜", ruby: "すなはま" }, { text: "を" }, { text: "歩", ruby: "ある" }, { text: "くのも" }, { text: "心地良", ruby: "ここちよ" }, { text: "かったです。" }
    ],
    contentKo: "여름휴가에 오키나와에 갔습니다. 투명도가 높은 에메랄드빛으로 빛나는 바다에 감동했습니다. 스노클링으로 알록달록한 열대어와 산호초를 가까이서 관찰했습니다. 파도 소리를 들으며 백사장을 걷는 것도 기분 좋았습니다.",
    vocabulary: [
      { word: "透明度", reading: "とうめいど", meaning: "투명도" },
      { word: "熱帯魚", reading: "ねったいぎょ", meaning: "열대어" },
      { word: "サンゴ礁", reading: "さんごしょう", meaning: "산호초" },
      { word: "間近で", reading: "まぢかで", meaning: "가까이서, 바로 앞에서" },
      { word: "心地良い", reading: "ここちよい", meaning: "기분 좋다, 상쾌하다" }
    ],
    grammarPoints: [
      { rule: "〜に感動する", explanation: "'~에 감동하다'" },
      { rule: "〜を聞きながら", explanation: "동사 ます형 어간 + ながら = '~를 들으면서'" }
    ],
    quiz: [
      { question: "「熱帯魚」의 읽는 법은?", options: ["ねったいぎょ", "ねったいうお", "ねったいさかな", "ねつおびぎょ"], answer: "ねったいぎょ", explanation: "熱帯魚(ねったいぎょ)는 열대어입니다." },
      { question: "「間近で」의 뜻은?", options: ["가까이서", "멀리서", "위에서", "혼자서"], answer: "가까이서", explanation: "間近(まぢか)는 아주 가까운 거리를 의미합니다." },
      { question: "「心地良い」의 의미는?", options: ["기분 좋다/상쾌하다", "불쾌하다", "시끄럽다", "어둡다"], answer: "기분 좋다/상쾌하다", explanation: "心地(기분) + 良い(좋다) = 기분이 상쾌하고 쾌적함." }
    ]
  },
  {
    id: "ld-125",
    title: "北海道のドライブ旅",
    titleKo: "홋카이도 드라이브 여행",
    category: "여행",
    level: "고급",
    thumbnail: "🚗",
    contentJp: [
      { text: "レンタカーを" }, { text: "借", ruby: "か" }, { text: "りて" }, { text: "北海道", ruby: "ほっかいどう" }, { text: "の" }, { text: "広大", ruby: "こうだい" }, { text: "な" }, { text: "大地", ruby: "だいち" }, { text: "を" }, { text: "ドライブしました。" },
      { text: "富良野", ruby: "ふらの" }, { text: "の" }, { text: "ラベンダー畑", ruby: "はたけ" }, { text: "一面", ruby: "いちめん" }, { text: "に" }, { text: "紫", ruby: "むらさき" }, { text: "の" }, { text: "絨毯", ruby: "じゅうたん" }, { text: "が" }, { text: "広", ruby: "ひろ" }, { text: "がっていました。" },
      { text: "まっすぐに" }, { text: "伸", ruby: "の" }, { text: "びる" }, { text: "地平線", ruby: "ちへいせん" }, { text: "に" }, { text: "向", ruby: "む" }, { text: "かって" }, { text: "車", ruby: "くるま" }, { text: "を" }, { text: "走", ruby: "はし" }, { text: "らせるのは" }, { text: "爽快", ruby: "そうかい" }, { text: "でした。" },
      { text: "途中で", ruby: "とちゅうで" }, { text: "食", ruby: "た" }, { text: "べた" }, { text: "濃厚", ruby: "のうこう" }, { text: "な" }, { text: "ソフトクリームの" }, { text: "味", ruby: "あじ" }, { text: "も" }, { text: "格別", ruby: "かくべつ" }, { text: "でした。" }
    ],
    contentKo: "렌터카를 빌려 홋카이도의 광대한 대지를 드라이브했습니다. 후라노의 라벤더 밭 온 면에 보라색 카펫이 펼쳐져 있었습니다. 똑바로 뻗은 지평선을 향해 차를 달리는 것은 상쾌했습니다. 도중에 먹은 진한 소프트아이스크림 맛도 격별이었습니다.",
    vocabulary: [
      { word: "広大", reading: "こうだい", meaning: "광대함, 넓고 큼" },
      { word: "絨毯", reading: "じゅうたん", meaning: "융단, 카펫" },
      { word: "地平線", reading: "ちへいせん", meaning: "지평선" },
      { word: "爽快", reading: "そうかい", meaning: "상쾌함" },
      { word: "格別", reading: "かくべつ", meaning: "격별함, 유달리 특별함" }
    ],
    grammarPoints: [
      { rule: "〜に向かって", explanation: "'~를 향해서'" },
      { rule: "〜を走らせる", explanation: "사역형. '~를 달리게 하다/달리다'" }
    ],
    quiz: [
      { question: "「広大」의 읽는 법은?", options: ["こうだい", "ひろひろ", "きょうだい", "こうたい"], answer: "こうだい", explanation: "広大(こうだい)는 끝없이 넓음을 나타냅니다." },
      { question: "「地平線」의 뜻은?", options: ["지평선", "수평선", "산맥", "고속도로"], answer: "지평선", explanation: "地平線(ちへいせん)은 땅과 하늘이 만나는 지평선입니다." },
      { question: "「格別」의 의미는?", options: ["유달리 특별함", "보통 수준임", "별로임", "유사함"], answer: "유달리 특별함", explanation: "格別(かくべつ)는 별도로 훌륭하거나 특별함을 말합니다." }
    ]
  },
  {
    id: "ld-126",
    title: "空港での手続きと搭乗",
    titleKo: "공항에서의 수속과 탑승",
    category: "여행",
    level: "초급",
    thumbnail: "✈️",
    contentJp: [
      { text: "成田", ruby: "なりた" }, { text: "空港", ruby: "くうこう" }, { text: "に" }, { text: "出発", ruby: "しゅっぱつ" }, { text: "の" }, { text: "2時間前", ruby: "にじかんまえ" }, { text: "に" }, { text: "到着", ruby: "とうちゃく" }, { text: "しました。" },
      { text: "チェックインを" }, { text: "済", ruby: "す" }, { text: "ませて" }, { text: "手荷物", ruby: "てにもつ" }, { text: "を" }, { text: "預", ruby: "あず" }, { text: "けました。" },
      { text: "保安", ruby: "ほあん" }, { text: "検査", ruby: "けんさ" }, { text: "と" }, { text: "出国", ruby: "しゅっこく" }, { text: "審査", ruby: "しんさ" }, { text: "も" }, { text: "スムーズに" }, { text: "通", ruby: "とお" }, { text: "りました。" },
      { text: "搭乗", ruby: "とうじょう" }, { text: "ゲートの" }, { text: "前", ruby: "まえ" }, { text: "で" }, { text: "飛行機", ruby: "ひこうき" }, { text: "を" }, { text: "見", ruby: "み" }, { text: "ながら" }, { text: "ワクワクして" }, { text: "待", ruby: "ま" }, { text: "ちました。" }
    ],
    contentKo: "나리타 공항에 출발 2시간 전에 도착했습니다. 체크인을 마치고 수하물을 맡겼습니다. 보안 검사와 출국 심사도 원활하게 통과했습니다. 탑승 게이트 앞에서 비행기를 보며 두근거리며 기다렸습니다.",
    vocabulary: [
      { word: "空港", reading: "くうこう", meaning: "공항" },
      { word: "手荷物", reading: "てにもつ", meaning: "수하물, 손가방" },
      { word: "預ける", reading: "あずける", meaning: "맡기다" },
      { word: "搭乗", reading: "とうじょう", meaning: "탑승" },
      { word: "ワクワクする", reading: "ワクワクする", meaning: "설레다, 두근거리다" }
    ],
    grammarPoints: [
      { rule: "〜を済ませる", explanation: "'~를 마치다/끝내다'" },
      { rule: "〜ながら待ちました", explanation: "'~하면서 기다렸습니다'" }
    ],
    quiz: [
      { question: "「空港」의 읽는 법은?", options: ["くうこう", "くうかん", "ひこうじょう", "そらこう"], answer: "くうこう", explanation: "空港(くうこう)는 공항입니다." },
      { question: "「預ける」의 뜻은?", options: ["맡기다", "찾다", "잃어버리다", "사다"], answer: "맡기다", explanation: "預ける(あずける)는 짐이나 돈 등을 맡기는 동작입니다." },
      { question: "「搭乗」의 의미는?", options: ["탑승", "하차", "착륙", "환승"], answer: "탑승", explanation: "搭乗(とうじょう)는 비행기나 배에 타는 것입니다." }
    ]
  },
  {
    id: "ld-127",
    title: "旅先での道迷い",
    titleKo: "여행지에서 길 잃기",
    category: "여행",
    level: "중급",
    thumbnail: "🗺️",
    contentJp: [
      { text: "見知", ruby: "みし" }, { text: "らぬ" }, { text: "街", ruby: "まち" }, { text: "を" }, { text: "歩", ruby: "ある" }, { text: "いていて、" }, { text: "道", ruby: "みち" }, { text: "に" }, { text: "迷", ruby: "まよ" }, { text: "ってしまいました。" },
      { text: "地図", ruby: "ちず" }, { text: "アプリを" }, { text: "見", ruby: "み" }, { text: "ても" }, { text: "位置", ruby: "いち" }, { text: "が" }, { text: "よく" }, { text: "分", ruby: "わ" }, { text: "かりませんでした。" },
      { text: "近", ruby: "ちか" }, { text: "くの" }, { text: "交番", ruby: "こうばん" }, { text: "で" }, { text: "警察官", ruby: "けいさつかん" }, { text: "に" }, { text: "尋", ruby: "たず" }, { text: "ねると、" }, { text: "親切", ruby: "しんせつ" }, { text: "に" }, { text: "道", ruby: "みち" }, { text: "を" }, { text: "教", ruby: "おし" }, { text: "えてくれました。" },
      { text: "迷", ruby: "まよ" }, { text: "った" }, { text: "おかげで" }, { text: "素敵", ruby: "すてき" }, { text: "な" }, { text: "路地裏", ruby: "ろじうら" }, { text: "の" }, { text: "カフェを" }, { text: "発見", ruby: "はっけん" }, { text: "できました。" }
    ],
    contentKo: "낯선 거리를 걷다가 길을 잃고 말았습니다. 지도 앱을 봐도 위치를 잘 몰랐습니다. 근처 파출소에서 경찰관에게 물어보니 친절하게 길을 가르쳐 주었습니다. 길을 잃은 덕분에 근사한 골목길 카페를 발견할 수 있었습니다.",
    vocabulary: [
      { word: "見知らぬ", reading: "みしらぬ", meaning: "낯선, 모르는" },
      { word: "迷う", reading: "まよう", meaning: "헤매다, 길을 잃다" },
      { word: "交番", reading: "こうばん", meaning: "파출소" },
      { word: "尋ねる", reading: "たずねる", meaning: "묻다, 구하다" },
      { word: "路地裏", reading: "ろじうら", meaning: "골목 안쪽" }
    ],
    grammarPoints: [
      { rule: "〜ても", explanation: "양보 조건 '~하더라도, ~해도'" },
      { rule: "〜てくれる", explanation: "'~해 주다' 남이 나에게 호의로 행동해 줌" },
      { rule: "〜おかげで", explanation: "'~덕분에' 원인에 대한 긍정적 결과" }
    ],
    quiz: [
      { question: "「交番」의 읽는 법은?", options: ["こうばん", "こうはん", "きょうばん", "こばん"], answer: "こうばん", explanation: "交番(こうばん)은 일본의 파출소입니다." },
      { question: "「尋ねる」의 뜻은?", options: ["묻다/질문하다", "찾아가다", "달려가다", "잊어버리다"], answer: "묻다/질문하다", explanation: "尋(たず)ねる는 길이나 정보를 물어보는 동사입니다." },
      { question: "「迷ったおかげで」의 해석은?", options: ["길을 잃은 덕분에", "길을 잃은 탓에", "길을 찾기 위해", "길을 잃기 전에"], answer: "길을 잃은 덕분에", explanation: "おかげで는 긍정적인 덕분에라는 의미를 갖습니다." }
    ]
  },
  {
    id: "ld-128",
    title: "旅先の一期一会",
    titleKo: "여행지에서의 일기일회 (인연)",
    category: "여행",
    level: "고급",
    thumbnail: "🤝",
    contentJp: [
      { text: "一人旅", ruby: "ひとりたび" }, { text: "の" }, { text: "途中で", ruby: "とちゅうで" }, { text: "訪", ruby: "おとず" }, { text: "れた" }, { text: "ゲストハウスで、" }, { text: "海外", ruby: "かいがい" }, { text: "からの" }, { text: "旅行者", ruby: "りょこうしゃ" }, { text: "と" }, { text: "出", ruby: "で" }, { text: "会", ruby: "あ" }, { text: "いました。" },
      { text: "片言", ruby: "かたこと" }, { text: "の" }, { text: "英語", ruby: "えいご" }, { text: "と" }, { text: "身振", ruby: "みぶ" }, { text: "手振", ruby: "てぶ" }, { text: "りを" }, { text: "交", ruby: "まじ" }, { text: "えて" }, { text: "旅", ruby: "たび" }, { text: "の" }, { text: "思い出", ruby: "おもいで" }, { text: "を" }, { text: "語", ruby: "かた" }, { text: "り" }, { text: "合", ruby: "あ" }, { text: "いました。" },
      { text: "国籍", ruby: "こくせき" }, { text: "や" }, { text: "文化", ruby: "ぶんか" }, { text: "は" }, { text: "違", ruby: "ちが" }, { text: "っても、" }, { text: "心", ruby: "こころ" }, { text: "を通", ruby: "をつう" }, { text: "わせることができると" }, { text: "実感", ruby: "じっかん" }, { text: "しました。" },
      { text: "まさに「" }, { text: "一期一会", ruby: "いちごいちえ" }, { text: "」の" }, { text: "尊", ruby: "とうと" }, { text: "い" }, { text: "出会", ruby: "であ" }, { text: "いでした。" }
    ],
    contentKo: "나홀로 여행 도중 방문한 게스트하우스에서 해외에서 온 여행자와 만났습니다. 서툰 영어와 손짓 발짓을 섞어가며 여행 추억을 함께 나누었습니다. 국적과 문화는 달라도 마음을 통하게 할 수 있다고 실감했습니다. 그야말로 '일기일회(평생 단 한 번뿐인 인연)'의 귀한 만남이었습니다.",
    vocabulary: [
      { word: "一人旅", reading: "ひとりたび", meaning: "나홀로 여행" },
      { word: "片言", reading: "かたこと", meaning: "서툰 말씨" },
      { word: "身振り手振り", reading: "みぶりてぶり", meaning: "몸짓 손짓" },
      { word: "語り合う", reading: "かたりあう", meaning: "서로 이야기 나누다" },
      { word: "一期一会", reading: "いちごいちえ", meaning: "일기일회 (평생 단 한 번의 인연)" }
    ],
    grammarPoints: [
      { rule: "〜を交えて", explanation: "'~를 곁들여서, ~를 섞어서'" },
      { rule: "〜あう (語り合う)", explanation: "동사 ます형 어간 + 合う = '서로 ~하다'" }
    ],
    quiz: [
      { question: "「一期一会」의 읽는 법은?", options: ["いちごいちえ", "いっきいちえ", "いちごひとえ", "ひとごひとえ"], answer: "いちごいちえ", explanation: "一期一会(いちごいちえ)는 평생 단 한 번뿐인 만남이라는 사자성어입니다." },
      { question: "「語り合う」의 뜻은?", options: ["서로 이야기하다", "혼자 말하다", "비밀로 하다", "경청하다"], answer: "서로 이야기하다", explanation: "語る(말하다) + 合う(서로 하다) = 서로 이야기를 주고받다." },
      { question: "「片言」의 의미는?", options: ["서툰 말씨", "완벽한 언어", "묵언", "거짓말"], answer: "서툰 말씨", explanation: "片言(かたこと)는 외국어 등을 서툴게 몇 마디 하는 모양입니다." }
    ]
  },
  {
    id: "ld-129",
    title: "旅のパッキング",
    titleKo: "여행 짐 싸기",
    category: "여행",
    level: "초급",
    thumbnail: "🧳",
    contentJp: [
      { text: "明日", ruby: "あした" }, { text: "からの" }, { text: "旅行", ruby: "りょこう" }, { text: "に" }, { text: "向", ruby: "む" }, { text: "けて" }, { text: "荷物", ruby: "にもつ" }, { text: "を" }, { text: "準備", ruby: "じゅんび" }, { text: "しました。" },
      { text: "スーツケースに" }, { text: "着替", ruby: "きが" }, { text: "えや" }, { text: "洗面", ruby: "せんめん" }, { text: "用具", ruby: "ようぐ" }, { text: "を" }, { text: "詰", ruby: "つ" }, { text: "めました。" },
      { text: "パスポートと" }, { text: "航空券", ruby: "こうくうけん" }, { text: "を" }, { text: "忘", ruby: "わす" }, { text: "れないように" }, { text: "何回", ruby: "なんかい" }, { text: "も" }, { text: "確認", ruby: "かくにん" }, { text: "しました。" },
      { text: "準備", ruby: "じゅんび" }, { text: "が" }, { text: "終", ruby: "お" }, { text: "わると、" }, { text: "いよいよ" }, { text: "出発", ruby: "しゅっぱつ" }, { text: "だと" }, { text: "実感", ruby: "じっかん" }, { text: "します。" }
    ],
    contentKo: "내일부터 시작되는 여행을 향해 짐을 준비했습니다. 캐리어에 갈아입을 옷과 세면도구를 채워 넣었습니다. 여권과 항공권을 잊지 않도록 몇 번이고 확인했습니다. 준비가 끝나자 드디어 출발이구나 실감 납니다.",
    vocabulary: [
      { word: "荷物", reading: "にもつ", meaning: "짐, 화물" },
      { word: "詰める", reading: "つめる", meaning: "채우다, 詰め込む" },
      { word: "航空券", reading: "こうくうけん", meaning: "항공권" },
      { word: "確認", reading: "かくにん", meaning: "확인" },
      { word: "いよいよ", reading: "いよいよ", meaning: "드디어, 마침내" }
    ],
    grammarPoints: [
      { rule: "〜に向けて", explanation: "'~를 향해, ~를 목표로'" },
      { rule: "〜ないように", explanation: "'~하지 않도록' (목적 표현)" }
    ],
    quiz: [
      { question: "「航空券」의 읽는 법은?", options: ["こうくうけん", "こうくうチケット", "ひこうけん", "くうこうけん"], answer: "こうくうけん", explanation: "航空券(こうくうけん)은 비행기 표, 항공권입니다." },
      { question: "「忘れないように」의 뜻은?", options: ["잊지 않도록", "잊어버려서", "잊었을 때", "잊은 덕분에"], answer: "잊지 않도록", explanation: "動詞 ない形 + ように = ~하지 않도록" },
      { question: "「詰める」의 의미는?", options: ["채워 넣다", "꺼내다", "버리다", "씻다"], answer: "채워 넣다", explanation: "詰(つ)める는 가방 등에 물건을 가득 채우다입니다." }
    ]
  },
  {
    id: "ld-130",
    title: "旅先での記念写真",
    titleKo: "여행지에서의 기념사진",
    category: "여행",
    level: "초급",
    thumbnail: "📸",
    contentJp: [
      { text: "絶景", ruby: "ぜっけい" }, { text: "スポットで" }, { text: "たくさん" }, { text: "写真", ruby: "しゃしん" }, { text: "を" }, { text: "撮", ruby: "と" }, { text: "りました。" },
      { text: "通", ruby: "とお" }, { text: "り" }, { text: "すがりの" }, { text: "人", ruby: "ひと" }, { text: "に" }, { text: "「写真", ruby: "しゃしん" }, { text: "を" }, { text: "撮", ruby: "と" }, { text: "っていただけますか」と" }, { text: "頼", ruby: "たの" }, { text: "みました。" },
      { text: "笑顔", ruby: "えがお" }, { text: "で" }, { text: "快", ruby: "こころよ" }, { text: "く" }, { text: "引き受けてくれました。" },
      { text: "写真", ruby: "しゃしん" }, { text: "を" }, { text: "見返", ruby: "みかえ" }, { text: "すと、" }, { text: "その" }, { text: "時", ruby: "とき" }, { text: "の" }, { text: "感動", ruby: "かんどう" }, { text: "が" }, { text: "蘇", ruby: "よみがえ" }, { text: "ります。" }
    ],
    contentKo: "절경 스팟에서 사진을 많이 찍었습니다. 지나가는 사람에게 '사진 좀 찍어주시겠어요?' 하고 부탁했습니다. 미소 지으며 흔쾌히 응해 주었습니다. 사진을 다시 돌아보면 그 때의 감동이 되살아납니다.",
    vocabulary: [
      { word: "絶景", reading: "ぜっけい", meaning: "절경" },
      { word: "通りすがり", reading: "とおりすがり", meaning: "지나가는 길, 지나가는 사람" },
      { word: "快く", reading: "こころよく", meaning: "흔쾌히, 기꺼이" },
      { word: "見返す", reading: "みかえす", meaning: "다시 보다, 되돌아보다" },
      { word: "蘇る", reading: "よみがえる", meaning: "되살아나다" }
    ],
    grammarPoints: [
      { rule: "〜ていただけますか", explanation: "정중한 부탁 표현 ('~해 주시겠습니까?')" },
      { rule: "〜と頼む", explanation: "'~라고 부탁하다'" }
    ],
    quiz: [
      { question: "「絶景」의 읽는 법은?", options: ["ぜっけい", "ぜつけい", "ぜっきょう", "ぜんけい"], answer: "ぜっけい", explanation: "絶景(ぜっけい)는 아주 뛰어난 풍경을 말합니다." },
      { question: "「快く」의 뜻은?", options: ["흔쾌히", "마지못해", "화내며", "슬프게"], answer: "흔쾌히", explanation: "快(こころよ)く는 선선히, 기분 좋게 응하는 모양입니다." },
      { question: "「撮っていただけますか」의 표현 종류는?", options: ["정중한 부탁", "명령", "거절", "감사"], answer: "정중한 부탁", explanation: "〜ていただけますか는 남에게 부탁할 때 쓰는 정중한 표현입니다." }
    ]
  }
];
