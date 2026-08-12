import type { LearningDiary } from "@/types/learningDiary";

export const part11: LearningDiary[] = [
  {
    id: "ld-101",
    title: "部屋の掃除",
    titleKo: "방 청소",
    category: "일상",
    level: "초급",
    thumbnail: "🧹",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "休", ruby: "やす" }, { text: "みの日", ruby: "のひ" }, { text: "だったので、" },
      { text: "午前中", ruby: "ごぜんちゅう" }, { text: "に" }, { text: "部屋", ruby: "へや" }, { text: "の" }, { text: "掃除", ruby: "そうじ" }, { text: "をしました。" },
      { text: "まず" }, { text: "窓", ruby: "まど" }, { text: "を" }, { text: "開", ruby: "あ" }, { text: "けて" }, { text: "空気", ruby: "くうき" }, { text: "を" }, { text: "入", ruby: "い" }, { text: "れ" }, { text: "替", ruby: "か" }, { text: "えました。" },
      { text: "掃除機", ruby: "そうじき" }, { text: "を" }, { text: "かけ" }, { text: "た" }, { text: "後", ruby: "あと" }, { text: "、" }, { text: "机", ruby: "つくえ" }, { text: "の上", ruby: "のうえ" }, { text: "を" }, { text: "拭", ruby: "ふ" }, { text: "きました。" },
      { text: "部屋", ruby: "へや" }, { text: "が" }, { text: "綺麗", ruby: "きれい" }, { text: "になって" }, { text: "気分", ruby: "きぶん" }, { text: "が" }, { text: "爽", ruby: "さわ" }, { text: "やかです。" }
    ],
    contentKo: "오늘은 쉬는 날이어서 오전에 방 청소를 했습니다. 먼저 창문을 열고 환기를 시켰습니다. 청소기를 돌린 후 책상 위를 닦았습니다. 방이 깨끗해져서 기분이 상쾌합니다.",
    vocabulary: [
      { word: "掃除", reading: "そうじ", meaning: "청소" },
      { word: "窓", reading: "まど", meaning: "창문" },
      { word: "空気", reading: "くうき", meaning: "공기, 분위기" },
      { word: "掃除機", reading: "そうじき", meaning: "청소기" },
      { word: "綺麗", reading: "きれい", meaning: "깨끗함, 예쁨" }
    ],
    grammarPoints: [
      { rule: "〜ので", explanation: "원인·이유를 나타내는 표현. '~이므로, ~해서'" },
      { rule: "〜た後で", explanation: "동사 과거형(た형) 뒤에 붙어 '~한 후에'를 의미함" },
      { rule: "〜になる", explanation: "상태의 변화를 나타냄. 형용동사/명사 뒤에 にて/になって 형태로 쓰임" }
    ],
    quiz: [
      { question: "「掃除」의 읽는 법은?", options: ["そうじ", "しょうじ", "そじ", "そうち"], answer: "そうじ", explanation: "掃除(そうじ)는 '청소'를 의미합니다." },
      { question: "「窓を開ける」의 뜻은?", options: ["창문을 열다", "창문을 닫다", "문을 열다", "불을 켜다"], answer: "창문을 열다", explanation: "窓(まど)는 창문, 開ける(あける)는 열다입니다." },
      { question: "「綺麗になって」의 문법적 의미는?", options: ["깨끗해져서", "더러워져서", "넓어져서", "어두워져서"], answer: "깨끗해져서", explanation: "綺麗(きれい) + になる(되다) 의 て형입니다." }
    ]
  },
  {
    id: "ld-102",
    title: "洗濯物と太陽",
    titleKo: "빨래와 햇살",
    category: "일상",
    level: "초급",
    thumbnail: "🧺",
    contentJp: [
      { text: "朝", ruby: "あさ" }, { text: "から" }, { text: "洗濯", ruby: "せんたく" }, { text: "をしました。" },
      { text: "天", ruby: "てん" }, { text: "気", ruby: "き" }, { text: "が" }, { text: "とても" }, { text: "良", ruby: "よ" }, { text: "かったので" }, { text: "ベランダに" }, { text: "干", ruby: "ほ" }, { text: "しました。" },
      { text: "太陽", ruby: "たいよう" }, { text: "の" }, { text: "光", ruby: "ひかり" }, { text: "で" }, { text: "服", ruby: "ふく" }, { text: "が" }, { text: "すぐ" }, { text: "乾", ruby: "かわ" }, { text: "きました。" },
      { text: "畳", ruby: "たた" }, { text: "んだ" }, { text: "服", ruby: "ふく" }, { text: "から" }, { text: "お" }, { text: "日", ruby: "ひ" }, { text: "さまの" }, { text: "匂", ruby: "にお" }, { text: "いがします。" }
    ],
    contentKo: "아침부터 빨래를 했습니다. 날씨가 아주 좋아서 베란다에 널었습니다. 햇빛 덕분에 옷이 금방 말랐습니다. 갠 옷에서 햇살 냄새가 납니다.",
    vocabulary: [
      { word: "洗濯", reading: "せんたく", meaning: "빨래, 세탁" },
      { word: "干す", reading: "ほす", meaning: "널다, 말리다" },
      { word: "太陽", reading: "たいよう", meaning: "태양, 해" },
      { word: "乾く", reading: "かわく", meaning: "마르다" },
      { word: "畳む", reading: "たたむ", meaning: "접다, 개다" }
    ],
    grammarPoints: [
      { rule: "〜から", explanation: "시간/장소의 출발점 '~부터' 또는 이유 '~때문에'" },
      { rule: "〜匂いがする", explanation: "감각 표현으로 '~냄새가 나다'를 나타냄" }
    ],
    quiz: [
      { question: "「洗濯」의 의미는?", options: ["빨래", "요리", "청소", "산책"], answer: "빨래", explanation: "洗濯(せんたく)는 세탁, 빨래를 뜻합니다." },
      { question: "「干す」의 한자 읽기는?", options: ["ほす", "かす", "おす", "とす"], answer: "ほす", explanation: "干(ほ)す는 빨래 등을 말리기 위해 널다는 뜻입니다." },
      { question: "「匂いがする」의 뜻은?", options: ["냄새가 나다", "소리가 나다", "맛이 나다", "빛이 나다"], answer: "냄새가 나다", explanation: "匂い(におい)는 냄새, 〜がする는 감각이 느껴짐을 뜻합니다." }
    ]
  },
  {
    id: "ld-103",
    title: "散歩と野良猫",
    titleKo: "산책과 길고양이",
    category: "일상",
    level: "중급",
    thumbnail: "🐈",
    contentJp: [
      { text: "夕方", ruby: "ゆうがた" }, { text: "、" }, { text: "近", ruby: "ちか" }, { text: "くの" }, { text: "公園", ruby: "こうえん" }, { text: "まで" }, { text: "散歩", ruby: "さんぽ" }, { text: "に" }, { text: "出", ruby: "で" }, { text: "かけました。" },
      { text: "ベンチの" }, { text: "下", ruby: "した" }, { text: "に" }, { text: "黒", ruby: "くろ" }, { text: "い" }, { text: "野良猫", ruby: "のらねこ" }, { text: "が" }, { text: "一匹", ruby: "いっぴき" }, { text: "いました。" },
      { text: "じっと" }, { text: "見", ruby: "み" }, { text: "つめていると、" }, { text: "ゆっくり" }, { text: "近", ruby: "ちか" }, { text: "づいてきました。" },
      { text: "頭", ruby: "あたま" }, { text: "を" }, { text: "撫", ruby: "なで" }, { text: "てあげるのを楽しみにまた来ようと思います。" }
    ],
    contentKo: "해질녘 근처 공원까지 산책을 나갔습니다. 벤치 밑에 검은 길고양이가 한 마리 있었습니다. 가만히 바라보고 있으니 천천히 가까이 다가왔습니다. 머리를 문질러 주며 힐링하는 시간을 가졌습니다.",
    vocabulary: [
      { word: "夕方", reading: "ゆうがた", meaning: "해질녘, 저녁" },
      { word: "散歩", reading: "さんぽ", meaning: "산책" },
      { word: "野良猫", reading: "のらねこ", meaning: "길고양이" },
      { word: "一匹", reading: "いっぴき", meaning: "한 마리(작은 동물 세는 단위)" },
      { word: "撫でる", reading: "なでる", meaning: "어루만지다, 쓰다듬다" }
    ],
    grammarPoints: [
      { rule: "〜に出かける", explanation: "'~하러 나아가다/외출하다' 목적을 가지고 나감을 표현" },
      { rule: "〜てあげる", explanation: "'~해 주다' 남에게 어떤 행동을 선의로 해줄 때 사용" }
    ],
    quiz: [
      { question: "「野良猫」의 뜻은?", options: ["길고양이", "집고양이", "강아지", "새"], answer: "길고양이", explanation: "野良猫(のらねこ)는 도둑고양이, 길고양이를 뜻합니다." },
      { question: "동물 한 마리를 세는 단위 「一匹」의 발음은?", options: ["いっぴき", "いちひき", "いっひき", "ひとぴき"], answer: "いっぴき", explanation: "1匹는 촉음화 및 반탁음화로 'いっぴき'가 됩니다." },
      { question: "「撫でる」의 뜻은?", options: ["쓰다듬다", "때리다", "안다", "밀다"], answer: "쓰다듬다", explanation: "撫でる(なでる)는 손으로 어루만지거나 쓰다듬다입니다." }
    ]
  },
  {
    id: "ld-104",
    title: "夜の読書タイム",
    titleKo: "밤의 독서 시간",
    category: "일상",
    level: "중급",
    thumbnail: "📖",
    contentJp: [
      { text: "寝", ruby: "ね" }, { text: "る" }, { text: "前", ruby: "まえ" }, { text: "の" }, { text: "30分", ruby: "さんじゅっぷん" }, { text: "、" },
      { text: "静", ruby: "しず" }, { text: "かな" }, { text: "部屋", ruby: "へや" }, { text: "で" }, { text: "本", ruby: "ほん" }, { text: "を" }, { text: "読", ruby: "よ" }, { text: "むのが" }, { text: "日課", ruby: "にっか" }, { text: "です。" },
      { text: "温", ruby: "あたた" }, { text: "かいハーブティーを" }, { text: "飲", ruby: "の" }, { text: "みながら、" }, { text: "小説", ruby: "しょうせつ" }, { text: "の世界", ruby: "のせかい" }, { text: "に" }, { text: "浸", ruby: "ひた" }, { text: "ります。" },
      { text: "スマートフォンの" }, { text: "画面", ruby: "がめん" }, { text: "から" }, { text: "離", ruby: "はな" }, { text: "れると、" }, { text: "心", ruby: "こころ" }, { text: "が" }, { text: "落ち着", ruby: "おちつく" }, { text: "きます。" }
    ],
    contentKo: "자기 전 30분, 조용한 방에서 책을 읽는 것이 일과입니다. 따뜻한 허브티를 마시면서 소설의 세계에 젖어듭니다. 스마트폰 화면에서 멀어지면 마음이 차분해집니다.",
    vocabulary: [
      { word: "日課", reading: "にっか", meaning: "일과, 매일 하는 일" },
      { word: "小説", reading: "しょうせつ", meaning: "소설" },
      { word: "浸る", reading: "ひたる", meaning: "잠기다, 젖다" },
      { word: "画面", reading: "がめん", meaning: "화면" },
      { word: "落ち着く", reading: "おちつく", meaning: "진정되다, 차분해지다" }
    ],
    grammarPoints: [
      { rule: "〜ながら", explanation: "동사 ます형 어간에 붙어 두 동작이 동시에 일어남을 나타냄 ('~하면서')" },
      { rule: "〜と", explanation: "조건절 '~하면' (자연적 결과나 조건에 따른 즉각적 상황)" }
    ],
    quiz: [
      { question: "「日課」의 읽는 법은?", options: ["にっか", "にちにち", "ひか", "にちか"], answer: "にっか", explanation: "日課(にっか)는 매일 정해진 일과를 말합니다." },
      { question: "「浸る」의 뜻은?", options: ["젖어들다/잠기다", "뛰어들다", "벗어나다", "씻어내다"], answer: "젖어들다/잠기다", explanation: "浸(ひた)る는 분위기나 감상에 푹 빠지다, 젖어들다입니다." },
      { question: "「飲みながら」의 문법 요소는?", options: ["~하면서", "~한 후에", "~하기 전에", "~할 수 없다"], answer: "~하면서", explanation: "동사 ます형 어간 + ながら = 동시 동작 (~하면서)" }
    ]
  },
  {
    id: "ld-105",
    title: "ゴミの分別ルール",
    titleKo: "쓰레기 분리수거 규칙",
    category: "일상",
    level: "초급",
    thumbnail: "♻️",
    contentJp: [
      { text: "日本", ruby: "にほん" }, { text: "の" }, { text: "ゴミ" }, { text: "分別", ruby: "ぶんべつ" }, { text: "は" }, { text: "細", ruby: "こま" }, { text: "かいです。" },
      { text: "火曜", ruby: "かよう" }, { text: "日", ruby: "び" }, { text: "は" }, { text: "燃", ruby: "も" }, { text: "えるゴミ、" }, { text: "木曜", ruby: "もくよう" }, { text: "日", ruby: "び" }, { text: "は" }, { text: "プラスチックです。" },
      { text: "缶", ruby: "かん" }, { text: "や" }, { text: "ペットボトルは" }, { text: "水", ruby: "みず" }, { text: "で" }, { text: "洗", ruby: "あら" }, { text: "ってから" }, { text: "出", ruby: "だ" }, { text: "します。" },
      { text: "始", ruby: "はじめ" }, { text: "は" }, { text: "難", ruby: "むずか" }, { text: "しかったですが、" }, { text: "今", ruby: "いま" }, { text: "は" }, { text: "慣", ruby: "な" }, { text: "れました。" }
    ],
    contentKo: "일본의 쓰레기 분리수거는 세세합니다. 화요일은 타는 쓰레기, 목요일은 플라스틱입니다. 캔이나 페트병은 물로 씻은 뒤 배출합니다. 처음에는 어려웠지만 지금은 익숙해졌습니다.",
    vocabulary: [
      { word: "分別", reading: "ぶんべつ", meaning: "분리수거, 구별" },
      { word: "燃えるゴミ", reading: "もえるゴミ", meaning: "타는 쓰레기 (가연성)" },
      { word: "缶", reading: "かん", meaning: "캔" },
      { word: "洗う", reading: "あらう", meaning: "씻다" },
      { word: "慣れる", reading: "なれる", meaning: "익숙해지다" }
    ],
    grammarPoints: [
      { rule: "〜てから", explanation: "동사 て형 + から = '~하고 나서'" },
      { rule: "〜が、〜", explanation: "역접 접속사 '~이지만, ~하나'" }
    ],
    quiz: [
      { question: "「燃えるゴミ」의 뜻은?", options: ["타는 쓰레기", "안 타는 쓰레기", "대형 쓰레기", "음식물 쓰레기"], answer: "타는 쓰레기", explanation: "燃(も)える는 타다, 쓰레기는 ゴミ입니다." },
      { question: "「慣れました」의 원형 「慣れる」의 뜻은?", options: ["익숙해지다", "잊어버리다", "서툴다", "버리다"], answer: "익숙해지다", explanation: "慣(な)れる는 어떤 일에 적응하고 익숙해지는 것을 뜻합니다." },
      { question: "「洗ってから」의 해석으로 올바른 것은?", options: ["씻고 나서", "씻기 전에", "씻지 않고", "씻을 때까지"], answer: "씻고 나서", explanation: "洗う(て형: 洗って) + から = 씻고 나서" }
    ]
  },
  {
    id: "ld-106",
    title: "雨の日のバス通勤",
    titleKo: "비 오는 날의 버스 출근",
    category: "일상",
    level: "중급",
    thumbnail: "🚌",
    contentJp: [
      { text: "今朝", ruby: "けさ" }, { text: "は" }, { text: "大雨", ruby: "おおあめ" }, { text: "が" }, { text: "降", ruby: "ふ" }, { text: "っていたので、" }, { text: "自転車", ruby: "じてんしゃ" }, { text: "ではなくバスを" }, { text: "利用", ruby: "りよう" }, { text: "しました。" },
      { text: "バス" }, { text: "停", ruby: "てい" }, { text: "には" }, { text: "長", ruby: "なが" }, { text: "い" }, { text: "列", ruby: "れつ" }, { text: "が" }, { text: "できていました。" },
      { text: "車内", ruby: "しゃない" }, { text: "は" }, { text: "混雑", ruby: "こんざつ" }, { text: "していましたが、" }, { text: "運", ruby: "うん" }, { text: "よく" }, { text: "席", ruby: "せき" }, { text: "に" }, { text: "座", ruby: "すわ" }, { text: "ることができました。" },
      { text: "濡", ruby: "ぬ" }, { text: "れた" }, { text: "傘", ruby: "かさ" }, { text: "の" }, { text: "始末", ruby: "しまつ" }, { text: "に" }, { text: "気", ruby: "き" }, { text: "を" }, { text: "遣", ruby: "つか" }, { text: "いました。" }
    ],
    contentKo: "오늘 아침은 폭우가 쏟아져서 자전거 대신 버스를 이용했습니다. 버스 정류장에는 긴 줄이 서 있었습니다. 차 안은 혼잡했지만 운 좋게 자리에 앉을 수 있었습니다. 젖은 우산을 처리하는 데 신경을 썼습니다.",
    vocabulary: [
      { word: "大雨", reading: "おおあめ", meaning: "폭우, 큰비" },
      { word: "バス停", reading: "バスてい", meaning: "버스 정류장" },
      { word: "混雑", reading: "こんざつ", meaning: "혼잡" },
      { word: "濡れる", reading: "ぬれる", meaning: "젖다" },
      { word: "気を遣う", reading: "きをつかう", meaning: "신경을 쓰다, 배려하다" }
    ],
    grammarPoints: [
      { rule: "〜ではなく", explanation: "'~가 아니라' 대상을 부정하고 다른 것을 선택함" },
      { rule: "〜ことができる", explanation: "가능 표현. '~할 수 있다'" }
    ],
    quiz: [
      { question: "「バス停」의 읽는 법은?", options: ["バスてい", "バスじょう", "バスえき", "バスまち"], answer: "バスてい", explanation: "バス停(てい)는 버스 정류장입니다." },
      { question: "「混雑」의 뜻은?", options: ["혼잡", "청결", "조용함", "여유"], answer: "혼잡", explanation: "混雑(こんざつ)는 붐비고 혼잡함입니다." },
      { question: "「座ることができました」의 뜻은?", options: ["앉을 수 있었습니다", "앉지 못했습니다", "서 있었습니다", "내렸습니다"], answer: "앉을 수 있었습니다", explanation: "座る + ことができる 의 과거형입니다." }
    ]
  },
  {
    id: "ld-107",
    title: "観葉植物の手入れ",
    titleKo: "관엽식물 가꾸기",
    category: "일상",
    level: "중급",
    thumbnail: "🪴",
    contentJp: [
      { text: "ベランダで" }, { text: "育", ruby: "そだ" }, { text: "てている" }, { text: "観葉植物", ruby: "かんようしょくぶつ" }, { text: "に" }, { text: "水", ruby: "みず" }, { text: "を" }, { text: "あげました。" },
      { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "芽", ruby: "め" }, { text: "が" }, { text: "出", ruby: "で" }, { text: "てきていて、" }, { text: "生命力", ruby: "せいめいりょく" }, { text: "を" }, { text: "感", ruby: "かん" }, { text: "じます。" },
      { text: "枯", ruby: "かれ" }, { text: "た" }, { text: "葉", ruby: "は" }, { text: "を" }, { text: "摘", ruby: "つ" }, { text: "み" }, { text: "取", ruby: "と" }, { text: "り、" }, { text: "葉", ruby: "は" }, { text: "の" }, { text: "表面", ruby: "ひょうめん" }, { text: "を" }, { text: "拭", ruby: "ふ" }, { text: "いてあげました。" },
      { text: "植物", ruby: "しょくぶつ" }, { text: "を" }, { text: "世話", ruby: "せわ" }, { text: "する" }, { text: "時間", ruby: "じかん" }, { text: "は" }, { text: "心", ruby: "こころ" }, { text: "が" }, { text: "癒", ruby: "いや" }, { text: "されます。" }
    ],
    contentKo: "베란다에서 키우고 있는 관엽식물에 물을 주었습니다. 새싹이 나와 있어서 생명력을 느낍니다. 시든 잎을 솎아내고 잎 표면을 닦아 주었습니다. 식물을 돌보는 시간은 마음이 치유됩니다.",
    vocabulary: [
      { word: "観葉植物", reading: "かんようしょくぶつ", meaning: "관엽식물" },
      { word: "芽", reading: "め", meaning: "싹" },
      { word: "枯れる", reading: "かれる", meaning: "시들다, 마르다" },
      { word: "世話", reading: "せわ", meaning: "돌봄, 보살핌" },
      { word: "癒される", reading: "いやされる", meaning: "치유되다, 힐링되다" }
    ],
    grammarPoints: [
      { rule: "〜てくる", explanation: "변화나 동작이 현재를 향해 지향되거나 시작됨 ('~해 오다/나오다')" },
      { rule: "〜される", explanation: "수동태 표현. '~을 당하다, ~되다'" }
    ],
    quiz: [
      { question: "「観葉植物」의 읽는 법은?", options: ["かんようしょくぶつ", "かんしょうしょくぶつ", "かんようしょくひん", "かんそしょくぶつ"], answer: "かんようしょくぶつ", explanation: "観葉植物(かんようしょくぶつ)는 관엽식물입니다." },
      { question: "「芽が出る」의 뜻은?", options: ["싹이 나다", "꽃이 피다", "열매가 맺히다", "뿌리가 내리다"], answer: "싹이 나다", explanation: "芽(め)는 싹, 出る(でる)는 나오다입니다." },
      { question: "「癒される」의 의미는?", options: ["치유되다", "피곤해지다", "슬퍼지다", "화가 나다"], answer: "치유되다", explanation: "癒す(치유하다)의 수동형 癒される는 힐링되다, 치유되다입니다." }
    ]
  },
  {
    id: "ld-108",
    title: "夜のお風呂タイム",
    titleKo: "밤의 목욕 시간",
    category: "일상",
    level: "초급",
    thumbnail: "🛁",
    contentJp: [
      { text: "一日の" }, { text: "終", ruby: "お" }, { text: "わりに" }, { text: "ゆっくり" }, { text: "湯", ruby: "ゆ" }, { text: "船", ruby: "ぶね" }, { text: "に" }, { text: "浸", ruby: "つ" }, { text: "かりました。" },
      { text: "好", ruby: "す" }, { text: "きな" }, { text: "入浴剤", ruby: "にゅうよくざい" }, { text: "を" }, { text: "入", ruby: "い" }, { text: "れたので、" }, { text: "良", ruby: "よ" }, { text: "い" }, { text: "香", ruby: "かお" }, { text: "りが" }, { text: "広", ruby: "ひろ" }, { text: "がりました。" },
      { text: "体", ruby: "からだ" }, { text: "の" }, { text: "芯", ruby: "しん" }, { text: "まで" }, { text: "温", ruby: "あたた" }, { text: "まり、" }, { text: "疲", ruby: "つか" }, { text: "れが" }, { text: "取", ruby: "と" }, { text: "れました。" },
      { text: "今夜", ruby: "こんや" }, { text: "は" }, { text: "ぐっすり" }, { text: "眠", ruby: "ねむ" }, { text: "れそうです。" }
    ],
    contentKo: "하루의 마무리에 천천히 욕조에 몸을 담갔습니다. 좋아하는 입욕제를 넣었더니 좋은 향기가 퍼졌습니다. 몸 깊은 곳까지 따뜻해져 피로가 풀렸습니다. 오늘 밤은 푹 잘 수 있을 것 같습니다.",
    vocabulary: [
      { word: "湯船", reading: "ゆぶね", meaning: "욕조" },
      { word: "入浴剤", reading: "にゅうよくざい", meaning: "입욕제" },
      { word: "香り", reading: "かおり", meaning: "향기" },
      { word: "芯", reading: "しん", meaning: "심, 중심" },
      { word: "疲れが取れる", reading: "つかれがとれる", meaning: "피로가 풀리다" }
    ],
    grammarPoints: [
      { rule: "〜そうだ", explanation: "양태 표현. '~할 것 같다' (모양/상태 보고 예측)" },
      { rule: "〜まで", explanation: "한계·범위 '~까지'" }
    ],
    quiz: [
      { question: "「湯船」의 뜻은?", options: ["욕조", "온천", "샤워기", "수건"], answer: "욕조", explanation: "湯船(ゆぶね)는 목욕탕의 욕조를 의미합니다." },
      { question: "「疲れが取れる」의 뜻은?", options: ["피로가 풀리다", "피로가 쌓이다", "잠이 오다", "몸이 무거워지다"], answer: "피로가 풀리다", explanation: "疲れ(피로) + 取れる(풀리다/빠지다) 입니다." },
      { question: "「眠れそうです」의 의미는?", options: ["잘 수 있을 것 같습니다", "자고 싶지 않습니다", "이미 잤습니다", "잠에서 깼습니다"], answer: "잘 수 있을 것 같습니다", explanation: "眠れる(가능형) + そうです(양태) = 잘 수 있을 것 같다." }
    ]
  },
  {
    id: "ld-109",
    title: "DIYで棚作り",
    titleKo: "DIY로 선반 만들기",
    category: "일상",
    level: "고급",
    thumbnail: "🔨",
    contentJp: [
      { text: "週末", ruby: "しゅうまつ" }, { text: "、" }, { text: "ホームセンターで" }, { text: "木材", ruby: "もくざい" }, { text: "を" }, { text: "調達", ruby: "ちょうたつ" }, { text: "して" }, { text: "本棚", ruby: "ほんだな" }, { text: "を" }, { text: "自作", ruby: "じさく" }, { text: "しました。" },
      { text: "寸法", ruby: "すんぽう" }, { text: "を" }, { text: "測", ruby: "はか" }, { text: "って" }, { text: "ノコギリで" }, { text: "裁断", ruby: "さいだん" }, { text: "し、" }, { text: "ネジで" }, { text: "組", ruby: "く" }, { text: "み" }, { text: "立", ruby: "た" }, { text: "てました。" },
      { text: "多少", ruby: "たしょう" }, { text: "の" }, { text: "歪", ruby: "ゆが" }, { text: "みは" }, { text: "生", ruby: "しょう" }, { text: "じましたが、" }, { text: "手作", ruby: "てづく" }, { text: "りならではの" }, { text: "温", ruby: "あたた" }, { text: "かみがあります。" },
      { text: "自分", ruby: "じぶん" }, { text: "で" }, { text: "作", ruby: "つく" }, { text: "った" }, { text: "家具", ruby: "かぐ" }, { text: "は" }, { text: "愛着", ruby: "あいちゃく" }, { text: "が" }, { text: "湧", ruby: "わ" }, { text: "きます。" }
    ],
    contentKo: "주말에 홈센터에서 목재를 조달해 책장을 직접 만들었습니다. 치수를 재고 톱으로 재단한 뒤 나사로 조립했습니다. 약간의 비틀림은 생겼지만 수공예만의 따스함이 있습니다. 직접 만든 가구는 애정이 솟구칩니다.",
    vocabulary: [
      { word: "調達", reading: "ちょうたつ", meaning: "조달, 마련" },
      { word: "寸法", reading: "すんぽう", meaning: "치수" },
      { word: "組み立てる", reading: "くみたてる", meaning: "조립하다" },
      { word: "歪み", reading: "ゆがみ", meaning: "비틀림, 일그러짐" },
      { word: "愛着が湧く", reading: "あいちゃくがわく", meaning: "애정이 솟다/생기다" }
    ],
    grammarPoints: [
      { rule: "〜ならではの", explanation: "'~특유의, ~이기에 가능한' 특성을 강조" },
      { rule: "〜が生じる", explanation: "'~가 생기다/발생하다'" }
    ],
    quiz: [
      { question: "「寸法」의 읽는 법은?", options: ["すんぽう", "じんほう", "すんほう", "ちすう"], answer: "すんぽう", explanation: "寸法(すんぽう)는 치수, 크기를 의미합니다." },
      { question: "「組み立てる」의 뜻은?", options: ["조립하다", "해체하다", "칠하다", "구입하다"], answer: "조립하다", explanation: "組み立てる(くみたてる)는 부품을 조립하는 것입니다." },
      { question: "「手作りならではの」의 의미는?", options: ["수제 특유의", "수제와 상관없는", "기계로 만든", "조잡한"], answer: "수제 특유의", explanation: "N + ならではの = N 만의, N 특유의" }
    ]
  },
  {
    id: "ld-110",
    title: "日記の継続",
    titleKo: "일기 쓰기의 지속",
    category: "일상",
    level: "고급",
    thumbnail: "📝",
    contentJp: [
      { text: "日本語で" }, { text: "日記", ruby: "にっき" }, { text: "を" }, { text: "書", ruby: "か" }, { text: "き" }, { text: "始", ruby: "はじ" }, { text: "めてから" }, { text: "半年", ruby: "はんとし" }, { text: "が" }, { text: "経", ruby: "た" }, { text: "ちました。" },
      { text: "最初", ruby: "さいしょ" }, { text: "は" }, { text: "短", ruby: "みじか" }, { text: "い" }, { text: "文章", ruby: "ぶんしょう" }, { text: "しか" }, { text: "書", ruby: "か" }, { text: "けませんでしたが、" }, { text: "徐々", ruby: "じょじょ" }, { text: "に" }, { text: "表現", ruby: "ひょうげん" }, { text: "の" }, { text: "幅", ruby: "はば" }, { text: "が" }, { text: "広", ruby: "ひろ" }, { text: "がりました。" },
      { text: "日観", ruby: "にっかん" }, { text: "の" }, { text: "小", ruby: "ちい" }, { text: "さな" }, { text: "変化", ruby: "へんか" }, { text: "を" }, { text: "記録", ruby: "きろく" }, { text: "する" }, { text: "習慣", ruby: "しゅうかん" }, { text: "は" }, { text: "思考", ruby: "しこう" }, { text: "の" }, { text: "整理", ruby: "せいり" }, { text: "にも" }, { text: "役立", ruby: "やくた" }, { text: "っています。" },
      { text: "これからも" }, { text: "無理", ruby: "むり" }, { text: "なく" }, { text: "続", ruby: "つづ" }, { text: "けていきたいです。" }
    ],
    contentKo: "일본어로 일기를 쓰기 시작한 지 반년이 지났습니다. 처음에는 짧은 문장밖에 쓰지 못했지만, 점차 표현의 폭이 넓어졌습니다. 매일의 작은 변화를 기록하는 습관은 사고 정리에도 도움이 되고 있습니다. 앞으로도 무리 없이 계속해 나가고 싶습니다.",
    vocabulary: [
      { word: "経つ", reading: "たつ", meaning: "(시간이) 지나다" },
      { word: "徐々に", reading: "じょじょに", meaning: "서서히, 점차" },
      { word: "幅", reading: "はば", meaning: "폭, 범위" },
      { word: "思考", reading: "しこう", meaning: "사고, 생각" },
      { word: "役立つ", reading: "やくだつ", meaning: "도움이 되다" }
    ],
    grammarPoints: [
      { rule: "〜てから", explanation: "'~하고 나서, ~한 지'" },
      { rule: "〜しか＋부정", explanation: "'~밖에 (없다/하지 못하다)'" },
      { rule: "〜ていく", explanation: "동작/상태가 미래를 향해 계속 진행되어 감을 나타냄 ('~해 가다')" }
    ],
    quiz: [
      { question: "「徐々に」의 의미는?", options: ["서서히/점차", "갑자기", "반드시", "전혀"], answer: "서서히/점차", explanation: "徐々に(じょじょに)는 천천히 조금씩 변화하는 모양입니다." },
      { question: "「役立っている」의 원형 「役立つ」의 뜻은?", options: ["도움이 되다", "해롭다", "어렵다", "시작하다"], answer: "도움이 되다", explanation: "役立つ(やくだつ)는 유용하다, 도움이 되다입니다." },
      { question: "「書き始めてから」의 구조는?", options: ["쓰기 시작한 지", "쓰기 전부터", "쓰지 않고", "다 쓰고"], answer: "쓰기 시작한 지", explanation: "書き始める(쓰기 시작하다) + てから(~한 이래/지)" }
    ]
  }
];
