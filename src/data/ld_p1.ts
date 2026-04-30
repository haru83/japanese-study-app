import type { LearningDiary } from "@/types/learningDiary";

export const part1: LearningDiary[] = [
  {
    id: "ld-001", title: "朝のルーティン", titleKo: "아침 루틴", category: "일상", level: "초급", thumbnail: "🌅",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "は朝6" }, { text: "時", ruby: "じ" }, { text: "に" }, { text: "起", ruby: "お" },
      { text: "きました。シャワーを" }, { text: "浴", ruby: "あ" }, { text: "びて朝ごはんを" }, { text: "食", ruby: "た" },
      { text: "べました。それから" }, { text: "学校", ruby: "がっこう" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
    ],
    contentKo: "오늘은 아침 6시에 일어났습니다. 샤워를 하고 아침밥을 먹었습니다. 그리고 나서 학교에 갔습니다.",
    vocabulary: [
      { word: "起きる", reading: "おきる", meaning: "일어나다" },
      { word: "朝ごはん", reading: "あさごはん", meaning: "아침밥" },
      { word: "行く", reading: "いく", meaning: "가다" },
    ],
    grammarPoints: [
      { rule: "〜ました", explanation: "과거 정중형. 동사 ます형의 과거형으로 '〜했습니다'를 의미합니다." },
      { rule: "それから", explanation: "그리고 나서. 시간적 순서를 나타내는 접속사입니다." },
    ],
    quiz: [
      { question: "「起きました」의 뜻은?", options: ["일어났습니다", "자러 갔습니다", "먹었습니다", "씻었습니다"], answer: "일어났습니다", explanation: "「起きる」는 '일어나다'이고 「起きました」는 과거형입니다." },
      { question: "「朝ごはん」의 뜻은?", options: ["점심밥", "저녁밥", "아침밥", "간식"], answer: "아침밥", explanation: "「朝(あさ)」는 아침, 「ごはん」은 밥이므로 아침밥입니다." },
      { question: "「それから」와 같은 의미는?", options: ["하지만", "그리고 나서", "왜냐하면", "그래서"], answer: "그리고 나서", explanation: "「それから」는 시간 순서를 나타내며 '그리고 나서'라는 뜻입니다." },
    ],
  },
  {
    id: "ld-002", title: "コンビニで", titleKo: "편의점에서", category: "일상", level: "초급", thumbnail: "🏪",
    contentJp: [
      { text: "近", ruby: "ちか" }, { text: "くのコンビニで" }, { text: "おにぎりを" }, { text: "買", ruby: "か" },
      { text: "いました。150" }, { text: "円", ruby: "えん" }, { text: "でした。とても" }, { text: "美", ruby: "おい" },
      { text: "しかったです。また" }, { text: "来", ruby: "き" }, { text: "たいです。" },
    ],
    contentKo: "근처 편의점에서 주먹밥을 샀습니다. 150엔이었습니다. 매우 맛있었습니다. 또 오고 싶습니다.",
    vocabulary: [
      { word: "コンビニ", reading: "コンビニ", meaning: "편의점" },
      { word: "おにぎり", reading: "おにぎり", meaning: "주먹밥" },
      { word: "買う", reading: "かう", meaning: "사다" },
    ],
    grammarPoints: [
      { rule: "〜でした", explanation: "'〜이었습니다'라는 과거형. 명사·な형용사의 정중 과거형입니다." },
      { rule: "また〜たい", explanation: "'또 〜하고 싶다'라는 바람을 나타냅니다." },
    ],
    quiz: [
      { question: "「買いました」의 뜻은?", options: ["먹었습니다", "샀습니다", "봤습니다", "갔습니다"], answer: "샀습니다", explanation: "「買う(かう)」는 '사다'이므로 「買いました」는 '샀습니다'입니다." },
      { question: "「コンビニ」는 무엇인가요?", options: ["학교", "편의점", "병원", "식당"], answer: "편의점", explanation: "「コンビニ」는 'convenience store'의 줄임말로 편의점입니다." },
      { question: "「また来たいです」의 뜻은?", options: ["다시 가고 싶습니다", "또 오고 싶습니다", "또 먹고 싶습니다", "다시 사고 싶습니다"], answer: "또 오고 싶습니다", explanation: "「また」는 '또', 「来たい」는 '오고 싶다'입니다." },
    ],
  },
  {
    id: "ld-003", title: "休日の午後", titleKo: "쉬는 날 오후", category: "일상", level: "초급", thumbnail: "☀️",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "休", ruby: "やす" }, { text: "みです。" },
      { text: "家", ruby: "いえ" }, { text: "でテレビを" }, { text: "見", ruby: "み" }, { text: "ました。" },
      { text: "ケーキも" }, { text: "食", ruby: "た" }, { text: "べました。" },
      { text: "とても" }, { text: "楽", ruby: "たの" }, { text: "しかったです。" },
    ],
    contentKo: "오늘은 쉬는 날입니다. 집에서 텔레비전을 봤습니다. 케이크도 먹었습니다. 매우 즐거웠습니다.",
    vocabulary: [
      { word: "休み", reading: "やすみ", meaning: "쉬는 날, 휴일" },
      { word: "テレビ", reading: "テレビ", meaning: "텔레비전" },
      { word: "楽しい", reading: "たのしい", meaning: "즐겁다" },
    ],
    grammarPoints: [
      { rule: "〜も", explanation: "'〜도'라는 뜻. 추가를 나타내는 조사입니다." },
      { rule: "とても〜", explanation: "'매우〜'라는 뜻. 형용사를 강조하는 부사입니다." },
    ],
    quiz: [
      { question: "「休み」의 뜻은?", options: ["학교", "쉬는 날", "병원", "회사"], answer: "쉬는 날", explanation: "「休(やす)み」는 '쉬는 날, 휴일'을 의미합니다." },
      { question: "「楽しかったです」의 뜻은?", options: ["슬펐습니다", "즐거웠습니다", "피곤했습니다", "어려웠습니다"], answer: "즐거웠습니다", explanation: "「楽しい(たのしい)」의 과거형. '즐거웠습니다'입니다." },
      { question: "「テレビを見ました」의 뜻은?", options: ["책을 읽었습니다", "음악을 들었습니다", "텔레비전을 봤습니다", "게임을 했습니다"], answer: "텔레비전을 봤습니다", explanation: "「テレビを見る」는 '텔레비전을 보다'입니다." },
    ],
  },
  {
    id: "ld-004", title: "電車通勤", titleKo: "전철 통근", category: "일상", level: "초급", thumbnail: "🚃",
    contentJp: [
      { text: "毎朝", ruby: "まいあさ" }, { text: "電車", ruby: "でんしゃ" }, { text: "で" },
      { text: "会社", ruby: "かいしゃ" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きます。" },
      { text: "7" }, { text: "時", ruby: "じ" }, { text: "に" }, { text: "乗", ruby: "の" }, { text: "ります。" },
      { text: "30" }, { text: "分", ruby: "ぷん" }, { text: "かかります。" },
      { text: "席", ruby: "せき" }, { text: "がありません。" },
    ],
    contentKo: "매일 아침 전철로 회사에 갑니다. 7시에 탑니다. 30분 걸립니다. 자리가 없습니다.",
    vocabulary: [
      { word: "毎朝", reading: "まいあさ", meaning: "매일 아침" },
      { word: "電車", reading: "でんしゃ", meaning: "전철" },
      { word: "席", reading: "せき", meaning: "자리, 좌석" },
    ],
    grammarPoints: [
      { rule: "〜に乗る", explanation: "'〜를 타다'라는 뜻. 교통수단 앞에 に를 사용합니다." },
      { rule: "〜かかります", explanation: "'(시간이) 걸립니다'라는 뜻. 시간 소요를 나타냅니다." },
    ],
    quiz: [
      { question: "「毎朝」의 뜻은?", options: ["매일 밤", "매일 아침", "매주", "매달"], answer: "매일 아침", explanation: "「毎(まい)」는 '매', 「朝(あさ)」는 '아침'이므로 '매일 아침'입니다." },
      { question: "「乗ります」의 뜻은?", options: ["내립니다", "탑니다", "갑니다", "옵니다"], answer: "탑니다", explanation: "「乗る(のる)」는 '타다'입니다." },
      { question: "「30分かかります」의 뜻은?", options: ["30분입니다", "30분 남았습니다", "30분 걸립니다", "30분 빠릅니다"], answer: "30분 걸립니다", explanation: "「かかる」는 '(시간이) 걸리다'입니다." },
    ],
  },
  {
    id: "ld-005", title: "夕食の準備", titleKo: "저녁 준비", category: "일상", level: "중급", thumbnail: "🍳",
    contentJp: [
      { text: "仕事", ruby: "しごと" }, { text: "から" }, { text: "帰", ruby: "かえ" }, { text: "ってから、" },
      { text: "夕食", ruby: "ゆうしょく" }, { text: "を" }, { text: "作", ruby: "つく" }, { text: "りました。" },
      { text: "冷蔵庫", ruby: "れいぞうこ" }, { text: "に" }, { text: "野菜", ruby: "やさい" }, { text: "があったので、" },
      { text: "野菜炒", ruby: "やさいいた" }, { text: "めを" }, { text: "作", ruby: "つく" }, { text: "ることにしました。" },
      { text: "思", ruby: "おも" }, { text: "ったより" }, { text: "上手", ruby: "じょうず" }, { text: "にできました。" },
    ],
    contentKo: "일에서 돌아온 후 저녁을 만들었습니다. 냉장고에 야채가 있었기 때문에 야채 볶음을 만들기로 했습니다. 생각보다 잘 됐습니다.",
    vocabulary: [
      { word: "帰る", reading: "かえる", meaning: "돌아오다" },
      { word: "冷蔵庫", reading: "れいぞうこ", meaning: "냉장고" },
      { word: "野菜炒め", reading: "やさいいため", meaning: "야채 볶음" },
    ],
    grammarPoints: [
      { rule: "〜てから", explanation: "'〜하고 나서'라는 뜻. 동작의 순서를 나타냅니다." },
      { rule: "〜ので", explanation: "'〜이기 때문에'라는 뜻. 이유·원인을 나타냅니다." },
    ],
    quiz: [
      { question: "「帰ってから」의 뜻은?", options: ["돌아오기 전에", "돌아오고 나서", "돌아오면서", "돌아오려고"], answer: "돌아오고 나서", explanation: "「〜てから」는 '〜하고 나서'라는 순서를 나타냅니다." },
      { question: "「野菜があったので」의 뜻은?", options: ["야채가 없었기 때문에", "야채가 있었기 때문에", "야채를 샀기 때문에", "야채가 비쌌기 때문에"], answer: "야채가 있었기 때문에", explanation: "「あった」는 '있었다', 「ので」는 '때문에'입니다." },
      { question: "「上手にできました」의 뜻은?", options: ["잘 안 됐습니다", "잘 됐습니다", "빨리 됐습니다", "늦게 됐습니다"], answer: "잘 됐습니다", explanation: "「上手(じょうず)に」는 '능숙하게, 잘'을 의미합니다." },
    ],
  },
  {
    id: "ld-006", title: "掃除の日", titleKo: "청소하는 날", category: "일상", level: "중급", thumbnail: "🧹",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "部屋", ruby: "へや" }, { text: "の" },
      { text: "掃除", ruby: "そうじ" }, { text: "をしました。" },
      { text: "掃除", ruby: "そうじ" }, { text: "をしていると、" },
      { text: "昔", ruby: "むかし" }, { text: "の" }, { text: "写真", ruby: "しゃしん" }, { text: "を" },
      { text: "見", ruby: "み" }, { text: "つけました。" },
      { text: "部屋", ruby: "へや" }, { text: "がきれいになったので、" },
      { text: "気持", ruby: "きも" }, { text: "ちがいいです。" },
    ],
    contentKo: "오늘은 방 청소를 했습니다. 청소를 하고 있으니 옛날 사진을 발견했습니다. 방이 깨끗해졌기 때문에 기분이 좋습니다.",
    vocabulary: [
      { word: "掃除", reading: "そうじ", meaning: "청소" },
      { word: "見つける", reading: "みつける", meaning: "발견하다" },
      { word: "気持ち", reading: "きもち", meaning: "기분" },
    ],
    grammarPoints: [
      { rule: "〜ていると", explanation: "'〜하고 있으면'이라는 뜻. 동작 중에 일어나는 상황을 나타냅니다." },
      { rule: "〜になった", explanation: "'〜가 되었다'라는 뜻. 상태의 변화를 나타냅니다." },
    ],
    quiz: [
      { question: "「掃除をしました」의 뜻은?", options: ["빨래를 했습니다", "청소를 했습니다", "요리를 했습니다", "공부를 했습니다"], answer: "청소를 했습니다", explanation: "「掃除(そうじ)」는 '청소'입니다." },
      { question: "「見つけました」의 뜻은?", options: ["잃어버렸습니다", "버렸습니다", "발견했습니다", "샀습니다"], answer: "발견했습니다", explanation: "「見つける(みつける)」는 '발견하다'입니다." },
      { question: "「気持ちがいい」의 뜻은?", options: ["기분이 나쁘다", "기분이 좋다", "피곤하다", "바쁘다"], answer: "기분이 좋다", explanation: "「気持ちがいい」는 '기분이 좋다'는 뜻입니다." },
    ],
  },
  {
    id: "ld-007", title: "近所の挨拶", titleKo: "이웃과 인사", category: "일상", level: "중급", thumbnail: "👋",
    contentJp: [
      { text: "朝", ruby: "あさ" }, { text: "、" }, { text: "近所", ruby: "きんじょ" }, { text: "の" },
      { text: "山田", ruby: "やまだ" }, { text: "さんに" }, { text: "会", ruby: "あ" }, { text: "いました。" },
      { text: "「おはようございます」と" }, { text: "言", ruby: "い" }, { text: "ったら、" },
      { text: "「いいお" }, { text: "天気", ruby: "てんき" }, { text: "ですね」と" }, { text: "言", ruby: "い" },
      { text: "ってくれました。" }, { text: "近所", ruby: "きんじょ" }, { text: "の" },
      { text: "人", ruby: "ひと" }, { text: "と" }, { text: "仲良", ruby: "なかよ" }, { text: "くすることは" },
      { text: "大切", ruby: "たいせつ" }, { text: "だと" }, { text: "思", ruby: "おも" }, { text: "います。" },
    ],
    contentKo: "아침에 이웃 야마다 씨를 만났습니다. '안녕하세요'라고 하니까 '날씨가 좋네요'라고 말해줬습니다. 이웃과 사이좋게 지내는 것은 중요하다고 생각합니다.",
    vocabulary: [
      { word: "近所", reading: "きんじょ", meaning: "근처, 이웃" },
      { word: "仲良くする", reading: "なかよくする", meaning: "사이좋게 지내다" },
      { word: "大切", reading: "たいせつ", meaning: "중요한" },
    ],
    grammarPoints: [
      { rule: "〜と言ったら", explanation: "'〜라고 했더니'라는 뜻. 말한 후의 반응을 나타냅니다." },
      { rule: "〜と思います", explanation: "'〜라고 생각합니다'라는 뜻. 의견을 나타냅니다." },
    ],
    quiz: [
      { question: "「近所」의 뜻은?", options: ["먼 곳", "이웃", "학교", "회사"], answer: "이웃", explanation: "「近所(きんじょ)」는 '근처, 이웃'을 의미합니다." },
      { question: "「仲良くする」의 뜻은?", options: ["싸우다", "사이좋게 지내다", "무시하다", "피하다"], answer: "사이좋게 지내다", explanation: "「仲良く(なかよく)」는 '사이좋게', 「する」는 '하다'입니다." },
      { question: "「大切だと思います」의 뜻은?", options: ["중요하지 않다고 생각합니다", "중요하다고 생각합니다", "어렵다고 생각합니다", "쉽다고 생각합니다"], answer: "중요하다고 생각합니다", explanation: "「大切(たいせつ)」는 '중요한', 「〜と思う」는 '〜라고 생각하다'입니다." },
    ],
  },
  {
    id: "ld-008", title: "節約生活", titleKo: "절약 생활", category: "일상", level: "고급", thumbnail: "💰",
    contentJp: [
      { text: "最近", ruby: "さいきん" }, { text: "、" }, { text: "生活費", ruby: "せいかつひ" }, { text: "を" },
      { text: "節約", ruby: "せつやく" }, { text: "するために" }, { text: "様々", ruby: "さまざま" }, { text: "な" },
      { text: "工夫", ruby: "くふう" }, { text: "をしています。" }, { text: "外食", ruby: "がいしょく" },
      { text: "をやめて" }, { text: "自炊", ruby: "じすい" }, { text: "するようになったことで、" },
      { text: "食費", ruby: "しょくひ" }, { text: "が" }, { text: "大幅", ruby: "おおはば" }, { text: "に" },
      { text: "減", ruby: "へ" }, { text: "りました。" }, { text: "節約", ruby: "せつやく" }, { text: "は" },
      { text: "慣", ruby: "な" }, { text: "れると" }, { text: "楽", ruby: "たの" }, { text: "しくなります。" },
    ],
    contentKo: "최근 생활비를 절약하기 위해 다양한 노력을 하고 있습니다. 외식을 그만두고 직접 요리하게 된 것으로 식비가 크게 줄었습니다. 절약은 익숙해지면 즐거워집니다.",
    vocabulary: [
      { word: "節約", reading: "せつやく", meaning: "절약" },
      { word: "自炊", reading: "じすい", meaning: "직접 요리하기" },
      { word: "工夫", reading: "くふう", meaning: "궁리, 노력" },
    ],
    grammarPoints: [
      { rule: "〜するために", explanation: "'〜하기 위해'라는 목적을 나타냅니다." },
      { rule: "〜ようになる", explanation: "'〜하게 되다'라는 변화를 나타냅니다." },
    ],
    quiz: [
      { question: "「節約するために」의 뜻은?", options: ["절약했기 때문에", "절약하기 위해", "절약하면서", "절약하더라도"], answer: "절약하기 위해", explanation: "「〜するために」는 '〜하기 위해'라는 목적을 나타냅니다." },
      { question: "「自炊するようになった」의 뜻은?", options: ["직접 요리하지 않게 됐다", "직접 요리하게 됐다", "외식하게 됐다", "배달하게 됐다"], answer: "직접 요리하게 됐다", explanation: "「〜ようになる」는 '〜하게 되다'라는 변화입니다." },
      { question: "「大幅に減りました」의 뜻은?", options: ["크게 줄었습니다", "크게 늘었습니다", "조금 줄었습니다", "조금 늘었습니다"], answer: "크게 줄었습니다", explanation: "「大幅(おおはば)に」는 '크게', 「減る(へる)」는 '줄다'입니다." },
    ],
  },
  {
    id: "ld-009", title: "日常への感謝", titleKo: "일상에 대한 감사", category: "일상", level: "고급", thumbnail: "🙏",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "も" }, { text: "無事", ruby: "ぶじ" }, { text: "に" },
      { text: "一日", ruby: "いちにち" }, { text: "を" }, { text: "終", ruby: "お" }, { text: "えることができました。" },
      { text: "健康", ruby: "けんこう" }, { text: "でいられること、" },
      { text: "仕事", ruby: "しごと" }, { text: "があること、" },
      { text: "家族", ruby: "かぞく" }, { text: "がいることなど、" },
      { text: "感謝", ruby: "かんしゃ" }, { text: "すべきことが" }, { text: "たくさんあります。" },
      { text: "日常", ruby: "にちじょう" }, { text: "の" }, { text: "小", ruby: "ちい" }, { text: "さな" },
      { text: "幸", ruby: "しあわ" }, { text: "せに" }, { text: "気", ruby: "き" }, { text: "づくことが大切です。" },
    ],
    contentKo: "오늘도 무사히 하루를 마칠 수 있었습니다. 건강하게 지낼 수 있는 것, 일이 있는 것, 가족이 있는 것 등 감사해야 할 것들이 많이 있습니다. 일상의 작은 행복을 알아차리는 것이 중요합니다.",
    vocabulary: [
      { word: "無事", reading: "ぶじ", meaning: "무사히" },
      { word: "感謝", reading: "かんしゃ", meaning: "감사" },
      { word: "気づく", reading: "きづく", meaning: "알아차리다" },
    ],
    grammarPoints: [
      { rule: "〜ことができる", explanation: "'〜할 수 있다'라는 가능성을 나타냅니다." },
      { rule: "〜すべき", explanation: "'〜해야 할'이라는 의무·당연함을 나타냅니다." },
    ],
    quiz: [
      { question: "「無事に」의 뜻은?", options: ["위험하게", "무사히", "어렵게", "빠르게"], answer: "무사히", explanation: "「無事(ぶじ)に」는 '무사히, 아무 문제 없이'를 의미합니다." },
      { question: "「感謝すべき」의 뜻은?", options: ["감사해서는 안 되는", "감사해야 할", "감사했던", "감사할 수 있는"], answer: "감사해야 할", explanation: "「〜すべき」는 '〜해야 할'이라는 의무를 나타냅니다." },
      { question: "「気づく」의 뜻은?", options: ["잊어버리다", "알아차리다", "포기하다", "기다리다"], answer: "알아차리다", explanation: "「気づく(きづく)」는 '알아차리다, 깨닫다'를 의미합니다." },
    ],
  },
  {
    id: "ld-010", title: "夜の散歩", titleKo: "야간 산책", category: "일상", level: "고급", thumbnail: "🌙",
    contentJp: [
      { text: "夜", ruby: "よる" }, { text: "、" }, { text: "近所", ruby: "きんじょ" }, { text: "を" },
      { text: "散歩", ruby: "さんぽ" }, { text: "するのが" }, { text: "最近", ruby: "さいきん" }, { text: "の" },
      { text: "習慣", ruby: "しゅうかん" }, { text: "になっています。" },
      { text: "昼間", ruby: "ひるま" }, { text: "とは" }, { text: "違", ruby: "ちが" }, { text: "い、" },
      { text: "静", ruby: "しず" }, { text: "かな" }, { text: "夜", ruby: "よる" }, { text: "の" },
      { text: "街", ruby: "まち" }, { text: "を" }, { text: "歩", ruby: "ある" }, { text: "きながら、" },
      { text: "その" }, { text: "日", ruby: "ひ" }, { text: "のことを" },
      { text: "振", ruby: "ふ" }, { text: "り" }, { text: "返", ruby: "かえ" }, { text: "っています。" },
      { text: "散歩", ruby: "さんぽ" }, { text: "で" }, { text: "気持", ruby: "きも" }, { text: "ちがリフレッシュされます。" },
    ],
    contentKo: "밤에 이웃을 산책하는 것이 최근의 습관이 됐습니다. 낮과 달리 조용한 밤 거리를 걸으면서 그날의 일을 되돌아봅니다. 산책으로 기분이 리프레시됩니다.",
    vocabulary: [
      { word: "習慣", reading: "しゅうかん", meaning: "습관" },
      { word: "振り返る", reading: "ふりかえる", meaning: "되돌아보다" },
      { word: "リフレッシュ", reading: "リフレッシュ", meaning: "리프레시, 기분 전환" },
    ],
    grammarPoints: [
      { rule: "〜になっている", explanation: "'〜가 되어 있다'라는 상태를 나타냅니다. 변화의 결과가 지속됨을 표현합니다." },
      { rule: "〜ながら", explanation: "'〜하면서'라는 동시 동작을 나타냅니다." },
    ],
    quiz: [
      { question: "「習慣になっています」의 뜻은?", options: ["습관이 없습니다", "습관이 됐습니다", "습관을 시작합니다", "습관을 끝냅니다"], answer: "습관이 됐습니다", explanation: "「習慣(しゅうかん)になる」는 '습관이 되다'입니다." },
      { question: "「振り返る」의 뜻은?", options: ["앞을 보다", "되돌아보다", "옆을 보다", "위를 보다"], answer: "되돌아보다", explanation: "「振り返る(ふりかえる)」는 '되돌아보다'입니다." },
      { question: "「歩きながら」의 뜻은?", options: ["걷기 위해", "걷고 나서", "걸으면서", "걷지 않고"], answer: "걸으면서", explanation: "「〜ながら」는 '〜하면서'라는 동시 동작을 나타냅니다." },
    ],
  },
];
