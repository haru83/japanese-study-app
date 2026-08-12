import type { LearningDiary } from "@/types/learningDiary";

export const part26: LearningDiary[] = [
  {
    id: "ld-251",
    title: "新学期の始業式とクラス替え",
    titleKo: "새 학기의 시업식과 반 배정",
    category: "학교",
    level: "초급",
    thumbnail: "🏫",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "から" }, { text: "新学期", ruby: "しんがっき" }, { text: "が" }, { text: "始", ruby: "はじ" }, { text: "まり、" }, { text: "体育館", ruby: "たいいくかん" }, { text: "で" }, { text: "始業式", ruby: "しぎょうしき" }, { text: "が" }, { text: "行", ruby: "おこな" }, { text: "われました。" },
      { text: "掲示板", ruby: "けいじばん" }, { text: "で" }, { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "クラスを" }, { text: "確認", ruby: "かくにん" }, { text: "し、" }, { text: "仲", ruby: "なか" }, { text: "の" }, { text: "良", ruby: "よ" }, { text: "い" }, { text: "友達", ruby: "ともだち" }, { text: "と" }, { text: "同", ruby: "おな" }, { text: "じ" }, { text: "クラスになれて" }, { text: "安心", ruby: "あんしん" }, { text: "しました。" },
      { text: "担任", ruby: "たんにん" }, { text: "の" }, { text: "先生", ruby: "せんせい" }, { text: "の" }, { text: "挨拶", ruby: "あいさつ" }, { text: "を" }, { text: "聴", ruby: "き" }, { text: "き、" }, { text: "気持", ruby: "きも" }, { text: "ちが" }, { text: "引", ruby: "ひ" }, { text: "き" }, { text: "締", ruby: "しま" }, { text: "りました。" },
      { text: "充実行", ruby: "じゅうじつ" }, { text: "した" }, { text: "一年間", ruby: "いちねんかん" }, { text: "にしたいです。" }
    ],
    contentKo: "오늘부터 새 학기가 시작되어 체육관에서 시업식이 열렸습니다. 게시판에서 새 클래스를 확인하고 사이좋은 친구와 같은 반이 될 수 있어 안심했습니다. 담임 선생님의 인사를 듣고 마음이 다잡아졌습니다. 알찬 1년으로 만들고 싶습니다.",
    vocabulary: [
      { word: "始業式", reading: "しぎょうしき", meaning: "시업식, 개학식" },
      { word: "掲示板", reading: "けいじばん", meaning: "게시판" },
      { word: "クラス替え", reading: "クラスがえ", meaning: "반 배정, 반 교체" },
      { word: "担任", reading: "たんにん", meaning: "담임" },
      { word: "引き締まる", reading: "ひきしまる", meaning: "다잡아지다, 팽팽해지다" }
    ],
    grammarPoints: [
      { rule: "〜同同じクラスになれて", explanation: "'~같은 반이 될 수 있어서' (가능)" },
      { rule: "気持ちが引き締まる", explanation: "'마음이 긴장되어 다잡아지다'" }
    ],
    quiz: [
      { question: "「始業式」의 읽는 법은?", options: ["しぎょうしき", "はじめぎょうしき", "しごうしき", "はじめごうしき"], answer: "しぎょうしき", explanation: "始業式(しぎょうしき)는 학기의 시작을 알리는 행사입니다." },
      { question: "「引き締まる」의 뜻은?", options: ["(마음이) 다잡아지다", "느슨해지다", "풀어지다", "흐트러지다"], answer: "(마음이) 다잡아지다", explanation: "気持ちが引き締まる는 경각심과 적당한 긴장감이 생김입니다." },
      { question: "「掲示板」의 한자 읽기는?", options: ["けいじばん", "けいじいた", "けいしいた", "けいしばん"], answer: "けいじばん", explanation: "掲示板(けいじばん)는 공지나 안내를 붙이는 판입니다." }
    ]
  },
  {
    id: "ld-252",
    title: "定期テスト対策と図書室での勉強",
    titleKo: "정기 테스트 대책과 도서실에서의 공부",
    category: "학교",
    level: "중급",
    thumbnail: "📝",
    contentJp: [
      { text: "来週", ruby: "らいしゅう" }, { text: "から" }, { text: "期末", ruby: "きまつ" }, { text: "テストが" }, { text: "始", ruby: "はじ" }, { text: "まるため、" }, { text: "放課後", ruby: "ほうかご" }, { text: "は" }, { text: "図書室", ruby: "としょしつ" }, { text: "で" }, { text: "勉強", ruby: "べんきょう" }, { text: "しています。" },
      { text: "数学", ruby: "すうがく" }, { text: "の" }, { text: "公式", ruby: "こうしき" }, { text: "を" }, { text: "暗記", ruby: "あんき" }, { text: "し、" }, { text: "過去問", ruby: "かこもん" }, { text: "を" }, { text: "繰り返し" }, { text: "解", ruby: "と" }, { text: "きました。" },
      { text: "友達", ruby: "ともだち" }, { text: "と" }, { text: "分", ruby: "わ" }, { text: "からない" }, { text: "問題", ruby: "もんだい" }, { text: "を" }, { text: "教", ruby: "おし" }, { text: "え" }, { text: "合", ruby: "あ" }, { text: "うことで、" }, { text: "理解", ruby: "りかい" }, { text: "が" }, { text: "深", ruby: "ふか" }, { text: "まりました。" },
      { text: "目標", ruby: "もくひょう" }, { text: "点数", ruby: "てんすう" }, { text: "を" }, { text: "目指", ruby: "めざ" }, { text: "して" }, { text: "ラストスパートです。" }
    ],
    contentKo: "다음 주부터 기말고사가 시작되기 때문에 방과 후에는 도서실에서 공부하고 있습니다. 수학 공식을 암기하고 기출문제를 반복해서 풀었습니다. 친구와 모르는 문제를 서로 가르쳐 줌으로써 이해가 깊어졌습니다. 목표 점수를 향해 라스트 스퍼트입니다.",
    vocabulary: [
      { word: "放課後", reading: "ほうかご", meaning: "방과 후" },
      { word: "過去問", reading: "かこもん", meaning: "기출 문제" },
      { word: "解く", reading: "とく", meaning: "(문제를) 풀다" },
      { word: "教え合う", reading: "おしえあう", meaning: "서로 가르쳐 주다" },
      { word: "ラストスパート", reading: "ラストスパート", meaning: "라스트 스퍼트, 막판 피치" }
    ],
    grammarPoints: [
      { rule: "〜繰り返して〜する", explanation: "'~반복해서 ~하다'" },
      { rule: "〜ことで、〜が深まる", explanation: "'~함으로써 ~가 깊어지다'" }
    ],
    quiz: [
      { question: "「放課後」의 읽는 법은?", options: ["ほうかご", "ほうかあと", "はなしかご", "はなしかあと"], answer: "ほうかご", explanation: "放課後(ほうかご)는 수업이 끝난 후의 시간입니다." },
      { question: "「過去問」의 뜻은?", options: ["기출 문제", "예상 문제", "숙제", "퀴즈"], answer: "기출 문제", explanation: "過去問(かこもん)는 과거에 출제되었던 시험 문제들입니다." },
      { question: "「解く」의 한자 읽기는?", options: ["とく", "とく", "とく", "とく"], answer: "とく", explanation: "問題・謎を解(と)く는 문제나 수수께끼를 해결하는 것입니다." }
    ]
  },
  {
    id: "ld-253",
    title: "文化祭の準備と劇の練習",
    titleKo: "문화제의 준비와 연극 연습",
    category: "학교",
    level: "중급",
    thumbnail: "🎭",
    contentJp: [
      { text: "来月", ruby: "らいげつ" }, { text: "の" }, { text: "文化祭", ruby: "ぶんかさい" }, { text: "に向けて、" }, { text: "クラスで" }, { text: "劇", ruby: "げき" }, { text: "の" }, { text: "準備", ruby: "じゅんび" }, { text: "を進めています。" },
      { text: "大道具", ruby: "おおどうぐ" }, { text: "の" }, { text: "制作", ruby: "せいさく" }, { text: "や" }, { text: "衣装", ruby: "いしょう" }, { text: "の" }, { text: "縫製", ruby: "ほうせい" }, { text: "など、" }, { text: "全員", ruby: "ぜんいん" }, { text: "で" }, { text: "役割", ruby: "やくわり" }, { text: "を" }, { text: "分担", ruby: "ぶんたん" }, { text: "しています。" },
      { text: "放課後", ruby: "ほうかご" }, { text: "遅", ruby: "おそ" }, { text: "くまで" }, { text: "セリフの" }, { text: "稽古", ruby: "けいこ" }, { text: "を" }, { text: "重", ruby: "かさ" }, { text: "ね、" }, { text: "団結力", ruby: "だんけつりょく" }, { text: "が" }, { text: "強", ruby: "つよ" }, { text: "まりました。" },
      { text: "本番", ruby: "ほんばん" }, { text: "で" }, { text: "最高", ruby: "さいこう" }, { text: "の" }, { text: "舞台", ruby: "ぶたい" }, { text: "を" }, { text: "見", ruby: "み" }, { text: "せたいです。" }
    ],
    contentKo: "다음 달 문화제를 향해 클래스에서 연극 준비를 진행하고 있습니다. 무대 장치 제작이나 의상 바느질 등 전원이 역할을 분담하고 있습니다. 방과 후 늦게까지 대사 연습을 거듭해 단결력이 강화되었습니다. 본방에서 최고의 무대를 보여주고 싶습니다.",
    vocabulary: [
      { word: "文化祭", reading: "ぶんかさい", meaning: "문화제, 학교 축제" },
      { word: "大道具", reading: "おおどうぐ", meaning: "무대 장치, 대도구" },
      { word: "縫製", reading: "ほうせい", meaning: "재봉, 바느질" },
      { word: "稽古", reading: "けいこ", meaning: "연습, 수련" },
      { word: "本番", reading: "ほんばん", meaning: "본 공연, 실전" }
    ],
    grammarPoints: [
      { rule: "〜に向けて、〜を進める", explanation: "'~를 향하여 ~를 진행하다'" },
      { rule: "〜稽古を重ねる", explanation: "'~연습을 거듭하다'" }
    ],
    quiz: [
      { question: "「稽古」의 읽는 법은?", options: ["けいこ", "かんこ", "けいふる", "かんふる"], answer: "けいこ", explanation: "稽古(けいこ)는 연극이나 예능을 익히기 위해 연습하는 것입니다." },
      { question: "「本番」의 뜻은?", options: ["실전/본 공연", "리허설", "준비", "뒷풀이"], answer: "실전/본 공연", explanation: "本番(ほんばん)는 연습이 아닌 실제 공연 및 실전입니다." },
      { question: "「大道具」의 한자 의미는?", options: ["무대 설치용 대형 소품/장치", "작은 소품", "학용품", "청소 도구"], answer: "무대 설치용 대형 소품/장치", explanation: "大道具(おおどうぐ)는 무대를 꾸미는 배경이나 집기입니다." }
    ]
  },
  {
    id: "ld-254",
    title: "体育祭とリレーのバトンパス",
    titleKo: "체육대회와 계주 바통 터치",
    category: "학교",
    level: "초급",
    thumbnail: "🏃‍♂️",
    contentJp: [
      { text: "秋晴", ruby: "あきば" }, { text: "れの下、" }, { text: "学校", ruby: "がっこう" }, { text: "で" }, { text: "体育祭", ruby: "たいいくさい" }, { text: "が" }, { text: "開催", ruby: "かいさい" }, { text: "されました。" },
      { text: "私", ruby: "わたし" }, { text: "は" }, { text: "クラス対抗", ruby: "たいこう" }, { text: "リレーの" }, { text: "走者", ruby: "そうしゃ" }, { text: "として" }, { text: "出場", ruby: "しゅつじょう" }, { text: "しました。" },
      { text: "スムーズな" }, { text: "バトンパスが決まり、" }, { text: "順位", ruby: "じゅんい" }, { text: "を" }, { text: "上", ruby: "あ" }, { text: "げて" }, { text: "アンカーに" }, { text: "繋", ruby: "つな" }, { text: "ぐことができました。" },
      { text: "クラス全員", ruby: "ぜんいん" }, { text: "の" }, { text: "声援", ruby: "せいえん" }, { text: "が" }, { text: "背中", ruby: "せなか" }, { text: "を" }, { text: "押", ruby: "お" }, { text: "してくれました。" }
    ],
    contentKo: "쾌청한 가을 날씨 아래 학교에서 체육대회가 개최되었습니다. 나는 클래스 대항 계주의 주자로 출전했습니다. 원활한 바통 터치가 성사되어 순위를 올려 앵커(마지막 주자)에게 이을 수 있었습니다. 반 전체의 응원이 뒤를 밀어주었습니다.",
    vocabulary: [
      { word: "体育祭", reading: "たいいくさい", meaning: "체육대회" },
      { word: "走者", reading: "そうしゃ", meaning: "주자" },
      { word: "バトンパス", reading: "バトンパス", meaning: "바통 터치" },
      { word: "繋ぐ", reading: "つなぐ", meaning: "잇다, 연결하다" },
      { word: "背中を押す", reading: "せなかをおす", meaning: "용기를 북돋아 주다, 뒤를 밀어주다" }
    ],
    grammarPoints: [
      { rule: "〜として出場する", explanation: "'~로서 출전하다'" },
      { rule: "〜繋ぐことができた", explanation: "'~이을 수 있었다' (가능)" }
    ],
    quiz: [
      { question: "「走者」의 읽는 법은?", options: ["そうしゃ", "はしりもの", "そうもの", "はしりしゃ"], answer: "そうしゃ", explanation: "走者(そうしゃ)는 달리기 경주의 런너, 주자입니다." },
      { question: "「背中を押す」의 비유적 뜻은?", options: ["용기를 주다/지원하다", "몸을 밀쳐 넘어뜨리다", "지켜만 보다", "방해하다"], answer: "용기를 주다/지원하다", explanation: "背中(せなか)を押(お)す는 응원이나 지원으로 결단을 돕는 것입니다." },
      { question: "「体育祭」의 한자 읽기는?", options: ["たいいくさい", "たいいくまつり", "からだいくさい", "からだいくまつり"], answer: "たいいくさい", explanation: "体育祭(たいいくさい)는 학교 등에서 개최하는 체육대회입니다." }
    ]
  },
  {
    id: "ld-255",
    title: "部活動の合宿と仲間との絆",
    titleKo: "동아리 활동 합숙과 동료와의 유대",
    category: "학교",
    level: "중급",
    thumbnail: "⚽",
    contentJp: [
      { text: "夏休み", ruby: "なつやす" }, { text: "に" }, { text: "サッカー部", ruby: "ぶ" }, { text: "の" }, { text: "強化", ruby: "きょうか" }, { text: "合宿", ruby: "がっしゅく" }, { text: "に" }, { text: "参加", ruby: "さんか" }, { text: "しました。" },
      { text: "朝", ruby: "あさ" }, { text: "から" }, { text: "夕方", ruby: "ゆうがた" }, { text: "まで" }, { text: "厳しい", ruby: "きび" }, { text: "練習", ruby: "れんしゅう" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "き、" }, { text: "体力的", ruby: "たいりょくてき" }, { text: "に" }, { text: "限界", ruby: "げんかい" }, { text: "に" }, { text: "達", ruby: "たっ" }, { text: "しそうでした。" },
      { text: "夜", ruby: "よる" }, { text: "は" }, { text: "仲間", ruby: "なかま" }, { text: "と" }, { text: "大部屋", ruby: "おおべや" }, { text: "で" }, { text: "将来", ruby: "しょうらい" }, { text: "の" }, { text: "夢", ruby: "ゆめ" }, { text: "を" }, { text: "語", ruby: "かた" }, { text: "り" }, { text: "合", ruby: "あ" }, { text: "いました。" },
      { text: "辛", ruby: "つら" }, { text: "い" }, { text: "練習", ruby: "れんしゅう" }, { text: "を" }, { text: "共", ruby: "とも" }, { text: "に" }, { text: "乗り越えた", ruby: "のりこえた" }, { text: "ことで、" }, { text: "絆", ruby: "きずな" }, { text: "が" }, { text: "深", ruby: "ふか" }, { text: "まりました。" }
    ],
    contentKo: "여름 방학에 축구부의 강화 합숙에 참가했습니다. 아침부터 해질녘까지 엄한 연습이 계속되어 체력적으로 한계에 달할 것 같았습니다. 밤에는 동료와 큰방에서 미래의 꿈을 서로 이야기했습니다. 힘든 연습을 함께 극복함으로써 유대감이 깊어졌습니다.",
    vocabulary: [
      { word: "合宿", reading: "がっしゅく", meaning: "합숙" },
      { word: "限界", reading: "げんかい", meaning: "한계" },
      { word: "語り合う", reading: "かたりあう", meaning: "서로 이야기 나누다" },
      { word: "乗り越える", reading: "のりこえる", meaning: "극복하다, 넘어서다" },
      { word: "絆", reading: "きずな", meaning: "유대감" }
    ],
    grammarPoints: [
      { rule: "〜限界に達しそうだった", explanation: "'~한계에 달할 것 같았다'" },
      { rule: "〜共に乗り越えたことで", explanation: "'~함께 극복함으로써'" }
    ],
    quiz: [
      { question: "「合宿」의 읽는 법은?", options: ["がっしゅく", "ごうしゅく", "がつつく", "ごうつく"], answer: "がっしゅく", explanation: "合宿(がっしゅく)는 숙소를 함께 쓰며 훈련하는 모임입니다." },
      { question: "「語り合う」의 뜻은?", options: ["서로 이야기 나누다", "혼자 중얼거리다", "싸우다", "침묵하다"], answer: "서로 이야기 나누다", explanation: "語(かた)り合(あ)う는 대화나 생각을 깊게 서로 주고받음입니다." },
      { question: "「限界」의 한자 읽기는?", options: ["げんかい", "かんかい", "げんかい", "かんかい"], answer: "げんかい", explanation: "限界(げんかい)는 넘을 수 없는 테두리나 한도입니다." }
    ]
  },
  {
    id: "ld-256",
    title: "調理実習のカレー作り",
    titleKo: "조리 실습의 카레 만들기",
    category: "학교",
    level: "초급",
    thumbnail: "🍛",
    contentJp: [
      { text: "家庭科", ruby: "かていか" }, { text: "の" }, { text: "授業", ruby: "じゅぎょう" }, { text: "で" }, { text: "班", ruby: "はん" }, { text: "の" }, { text: "メンバーと" }, { text: "カレーライスを" }, { text: "作", ruby: "つく" }, { text: "りました。" },
      { text: "野菜", ruby: "やさい" }, { text: "の" }, { text: "皮", ruby: "かわ" }, { text: "を" }, { text: "むき、" }, { text: "肉", ruby: "にく" }, { text: "を" }, { text: "炒", ruby: "いた" }, { text: "めて" }, { text: "煮", ruby: "に" }, { text: "込", ruby: "こ" }, { text: "みました。" },
      { text: "自分たちで" }, { text: "協力", ruby: "きょうりょく" }, { text: "して" }, { text: "作", ruby: "つく" }, { text: "った" }, { text: "カレーは" }, { text: "特別", ruby: "とくべつ" }, { text: "に" }, { text: "美味", ruby: "おい" }, { text: "しく" }, { text: "感", ruby: "かん" }, { text: "じられました。" },
      { text: "片付", ruby: "かたづ" }, { text: "けまで" }, { text: "手際", ruby: "てぎわ" }, { text: "よく" }, { text: "行", ruby: "おこな" }, { text: "うことができました。" }
    ],
    contentKo: "가정과 수업에서 조원의 멤버들과 카레라이스를 만들었습니다. 야채 껍질을 깎고 고기를 볶아 푹 끓였습니다. 우리끼리 협력해서 만든 카레는 특별히 맛있게 느껴졌습니다. 정리까지 능숙하게 진행할 수 있었습니다.",
    vocabulary: [
      { word: "家庭科", reading: "かていか", meaning: "가정과 (과목)" },
      { word: "皮をむく", reading: "かわをむく", meaning: "껍질을 깎다/벗기다" },
      { word: "炒める", reading: "いためる", meaning: "볶다" },
      { word: "片付け", reading: "かたづけ", meaning: "정리정돈, 치움" },
      { word: "手際よく", reading: "てぎわよく", meaning: "능숙하게, 차질 없이" }
    ],
    grammarPoints: [
      { rule: "〜自分で協力して〜", explanation: "'~스스로 협력해서 ~'" },
      { rule: "〜片付けまで手際よく", explanation: "'~정리까지 차질 없이'" }
    ],
    quiz: [
      { question: "「炒める」의 읽는 법은?", options: ["いためる", "にる", "やく", "ゆでる"], answer: "いためる", explanation: "炒(いた)める는 기름에 음식을 볶아 내는 요리법입니다." },
      { question: "「手際よく」의 뜻은?", options: ["능숙하게/차질 없이", "서툴게", "느릿느릿", "지저분하게"], answer: "능숙하게/차질 없이", explanation: "手際(てぎわ)는 일 처리의 손놀림이나 일의 처리 방식을 뜻합니다." },
      { question: "「片付け」의 한자 의미는?", options: ["정리정돈/치움", "어지럽힘", "요리하기", "구매하기"], answer: "정리정돈/치움", explanation: "片付(かたづ)け는 사용한 물건이나 장소를 도로 깨끗이 치우는 것입니다." }
    ]
  },
  {
    id: "ld-257",
    title: "修学旅行と夜の語り合い",
    titleKo: "수학여행과 밤의 대화 나누기",
    category: "학교",
    level: "중급",
    thumbnail: "🚌",
    contentJp: [
      { text: "3泊4日", ruby: "さんぱくよっか" }, { text: "の" }, { text: "修学旅行", ruby: "しゅうがくりょこう" }, { text: "で" }, { text: "沖縄", ruby: "おきなわ" }, { text: "を" }, { text: "訪", ruby: "おとず" }, { text: "れました。" },
      { text: "歴史", ruby: "れきし" }, { text: "学習", ruby: "がくしゅう" }, { text: "や" }, { text: "マリンスポーツを" }, { text: "体験", ruby: "たいけん" }, { text: "し、" }, { text: "充実", ruby: "じゅうじつ" }, { text: "した" }, { text: "日々", ruby: "ひび" }, { text: "を" }, { text: "過", ruby: "す" }, { text: "ごしました。" },
      { text: "夜", ruby: "よる" }, { text: "は" }, { text: "ホテルで" }, { text: "部屋", ruby: "へや" }, { text: "の" }, { text: "友達", ruby: "ともだち" }, { text: "と" }, { text: "消灯", ruby: "しょうとう" }, { text: "時間", ruby: "じかん" }, { text: "ギリギリまで" }, { text: "秘密", ruby: "ひみつ" }, { text: "の" }, { text: "話", ruby: "はなし" }, { text: "をしました。" },
      { text: "学生生活", ruby: "がくせいせいかつ" }, { text: "の" }, { text: "最高", ruby: "さいこう" }, { text: "の" }, { text: "思い出", ruby: "おもいで" }, { text: "になりました。" }
    ],
    contentKo: "3박 4일의 수학여행으로 오키나와를 방문했습니다. 역사 학습이나 해양 스포츠를 체험하여 알찬 나날을 보냈습니다. 밤에는 호텔에서 같은 방 친구와 소등 시간 아슬아슬할 때까지 비밀 이야기를 나누었습니다. 학창 생활 최고의 추억이 되었습니다.",
    vocabulary: [
      { word: "修学旅行", reading: "しゅうがくりょこう", meaning: "수학여행" },
      { word: "マリンスポーツ", reading: "マリンスポーツ", meaning: "해양 스포츠" },
      { word: "消灯", reading: "しょうとう", meaning: "소등, 불 끔" },
      { word: "ギリギリまで", reading: "ギリギリまで", meaning: "아슬아슬할 때까지" },
      { word: "思い出", reading: "おもいで", meaning: "추억" }
    ],
    grammarPoints: [
      { rule: "〜ギリギリまで〜をする", explanation: "'~아슬아슬할 때까지 ~를 하다'" },
      { rule: "〜思い出になる", explanation: "'~추억이 되다'" }
    ],
    quiz: [
      { question: "「修学旅行」의 읽는 법은?", options: ["しゅうがくりょこう", "しゅうがくたび", "しゅうこうりょこう", "しゅうこうたび"], answer: "しゅうがくりょこう", explanation: "修学旅行(しゅうがくりょこう)는 학생들이 학습을 겸해 떠나는 여행입니다." },
      { question: "「消灯」의 뜻은?", options: ["소등/불 끔", "점등", "화재", "조명"], answer: "소등/불 끔", explanation: "消灯(しょうとう)는 취침을 위해 전등 불을 끄는 것입니다." },
      { question: "「ギリギリまで」의 의미는?", options: ["한계 아슬아슬할 때까지", "여유 있게 일찍", "자주 자주", "전혀 안 함"], answer: "한계 아슬아슬할 때까지", explanation: "ギリギリ는 허용 한도의 바로 아슬아슬한 상태를 뜻합니다." }
    ]
  },
  {
    id: "ld-258",
    title: "生徒会選挙と演説",
    titleKo: "학생회 선거와 연설",
    category: "학교",
    level: "고급",
    thumbnail: "🗳️",
    contentJp: [
      { text: "生徒会長", ruby: "せいとかいちょう" }, { text: "選挙", ruby: "せんきょ" }, { text: "に" }, { text: "立候補", ruby: "りっこうほ" }, { text: "し、" }, { text: "全校", ruby: "ぜんこう" }, { text: "生徒", ruby: "せいと" }, { text: "の" }, { text: "前", ruby: "まえ" }, { text: "で" }, { text: "立会演説", ruby: "たちあいえんぜつ" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "学校", ruby: "がっこう" }, { text: "を" }, { text: "より" }, { text: "良", ruby: "よ" }, { text: "くするための" }, { text: "公約", ruby: "こうやく" }, { text: "を" }, { text: "熱弁", ruby: "ねつべん" }, { text: "し、" }, { text: "支持", ruby: "しじ" }, { text: "を" }, { text: "訴", ruby: "うった" }, { text: "えました。" },
      { text: "緊張", ruby: "きんちょう" }, { text: "で" }, { text: "声", ruby: "こえ" }, { text: "が" }, { text: "震", ruby: "ふる" }, { text: "えそうになりましたが、" }, { text: "想", ruby: "おも" }, { text: "いを" }, { text: "しっかり" }, { text: "伝", ruby: "つた" }, { text: "えられました。" },
      { text: "開票", ruby: "かいひょう" }, { text: "結果", ruby: "けっか" }, { text: "を" }, { text: "祈", ruby: "いの" }, { text: "るような" }, { text: "気持", ruby: "きも" }, { text: "ちで" }, { text: "待", ruby: "ま" }, { text: "っています。" }
    ],
    contentKo: "학생회장 선거에 입후보하여 전교생 앞에서 정견 발표 연설을 진행했습니다. 학교를 보다 좋게 만들기 위한 공약을 열변하고 지지를 호소했습니다. 긴장으로 목소리가 떨릴 뻔했으나 마음을 확실히 전달할 수 있었습니다. 개표 결과를 기도하는 심정으로 기다리고 있습니다.",
    vocabulary: [
      { word: "立候補", reading: "りっこうほ", meaning: "입후보" },
      { word: "公約", reading: "こうやく", meaning: "공약" },
      { word: "熱弁", reading: "ねつべん", meaning: "열변" },
      { word: "震える", reading: "ふるえる", meaning: "떨리다" },
      { word: "開票", reading: "かいひょう", meaning: "개표" }
    ],
    grammarPoints: [
      { rule: "〜より良くするための", explanation: "'~보다 좋게 만들기 위한'" },
      { rule: "〜声が震えそうになった", explanation: "'~목소리가 떨릴 뻔했다'" }
    ],
    quiz: [
      { question: "「立候補」의 읽는 법은?", options: ["りっこうほ", "りつこうほ", "たてこうほ", "たてこうふ"], answer: "りっこうほ", explanation: "立候補(りっこうほ)는 선거 등에 지위나 후보로 나서는 것입니다." },
      { question: "「熱弁」의 뜻은?", options: ["열변/열정적인 연설", "거짓말", "변명", "작은 소리"], answer: "열변/열정적인 연설", explanation: "熱弁(ねつべん)는 열정을 담아 뜨겁게 말하는 연설입니다." },
      { question: "「震える」의 한자 읽기는?", options: ["ふるえる", "しんえる", "ふれる", "しんれる"], answer: "ふるえる", explanation: "震(ふる)える는 긴장이나 추위로 가늘게 떨리는 것입니다." }
    ]
  },
  {
    id: "ld-259",
    title: "卒業式と答辞の言葉",
    titleKo: "졸업식과 답사의 말",
    category: "학교",
    level: "고급",
    thumbnail: "🎓",
    contentJp: [
      { text: "晴", ruby: "は" }, { text: "れて" }, { text: "卒業式", ruby: "そつぎょうしき" }, { text: "の" }, { text: "日", ruby: "ひ" }, { text: "を" }, { text: "迎", ruby: "むか" }, { text: "え、" }, { text: "式典", ruby: "しくてん" }, { text: "で" }, { text: "卒業証書", ruby: "そつぎょうしょうしょ" }, { text: "を" }, { text: "授与", ruby: "じゅよ" }, { text: "されました。" },
      { text: "在校生", ruby: "ざいこうせい" }, { text: "や" }, { text: "恩師", ruby: "おんし" }, { text: "、" }, { text: "保護者", ruby: "ほごしゃ" }, { text: "への" }, { text: "感謝", ruby: "かんしゃ" }, { text: "を" }, { text: "込", ruby: "こ" }, { text: "めて" }, { text: "代表", ruby: "だいひょう" }, { text: "で" }, { text: "答辞", ruby: "とうじ" }, { text: "を" }, { text: "読", ruby: "よ" }, { text: "みました。" },
      { text: "3年間の" }, { text: "思い出", ruby: "おもいで" }, { text: "が" }, { text: "頭", ruby: "あたま" }, { text: "を" }, { text: "駆け巡り、" }, { text: "感無量", ruby: "かんむりょう" }, { text: "でした。" },
      { text: "住", ruby: "な" }, { text: "れ" }, { text: "親", ruby: "した" }, { text: "しんだ" }, { text: "校舎", ruby: "こうしゃ" }, { text: "を" }, { text: "背", ruby: "せ" }, { text: "に、" }, { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "門出", ruby: "かどで" }, { text: "へ" }, { text: "踏", ruby: "ふ" }, { text: "み" }, { text: "出", ruby: "だ" }, { text: "します。" }
    ],
    contentKo: "당당히 졸업식 날을 맞이하여 식전에서 졸업증서를 수여받았습니다. 재학생과 은사, 보호자에 대한 감사를 담아 대표로 답사를 읽었습니다. 3년간의 추억이 머릿속을 스쳐 지나가 감무량이었습니다. 친숙했던 교사를 뒤로하고 새로운 출발을 향해 발을 내딛습니다.",
    vocabulary: [
      { word: "授与", reading: "じゅよ", meaning: "수여" },
      { word: "答辞", reading: "とうじ", meaning: "답사 (졸업생 대표 연설)" },
      { word: "駆け巡る", reading: "かけめぐる", meaning: "주마등처럼 스쳐 지나가다" },
      { word: "感無量", reading: "かんむりょう", meaning: "감개가 무량함" },
      { word: "門出", reading: "かどで", meaning: "출발, 새 출발" }
    ],
    grammarPoints: [
      { rule: "〜感謝を込めて", explanation: "'~감사를 담아서'" },
      { rule: "〜を背に、〜へ踏み出す", explanation: "'~를 뒤로하고 ~로 내딛다'" }
    ],
    quiz: [
      { question: "「答辞」의 읽는 법은?", options: ["とうじ", "こたえじ", "とうし", "こたえし"], answer: "とうじ", explanation: "答辞(とうじ)는 졸업생 대표가 읽는 감사와 답례의 글입니다." },
      { question: "「門出」의 뜻은?", options: ["새 출발/여정의 시작", "집으로 귀가", "퇴학", "입학"], answer: "새 출발/여정의 시작", explanation: "門出(かどで)는 밖으로 나가 여정이나 인생의 새 출발을 함입니다." },
      { question: "「感無量」의 한자 의미는?", options: ["감개가 무량함/가슴 벅참", "아무 느낌 없음", "서운함", "지루함"], answer: "감개가 무량함/가슴 벅참", explanation: "感無量(かんむりょう)는 감정이 계량할 수 없이 가득 찬 느낌입니다." }
    ]
  },
  {
    id: "ld-260",
    title: "キャンパス 라이프와 대학 강의",
    titleKo: "캠퍼스 라이프와 대학 강의",
    category: "학교",
    level: "중급",
    thumbnail: "🏛️",
    contentJp: [
      { text: "大学", ruby: "だいがく" }, { text: "に" }, { text: "進学", ruby: "しんがく" }, { text: "し、" }, { text: "自由", ruby: "じゆう" }, { text: "で" }, { text: "広々とした" }, { text: "キャンパスライフが" }, { text: "始", ruby: "はじ" }, { text: "まりました。" },
      { text: "自分", ruby: "じぶん" }, { text: "で" }, { text: "履修", ruby: "りしゅう" }, { text: "登録", ruby: "とうろく" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "い、" }, { text: "興味", ruby: "きょうみ" }, { text: "のある" }, { text: "専門", ruby: "せんもん" }, { text: "講義", ruby: "こうぎ" }, { text: "を" }, { text: "選択", ruby: "せんたく" }, { text: "しました。" },
      { text: "大教室", ruby: "だいきょうしつ" }, { text: "での" }, { text: "講義", ruby: "こうぎ" }, { text: "や" }, { text: "ゼミでの" }, { text: "ディスカッションは" }, { text: "刺激的", ruby: "しげきてき" }, { text: "で" }, { text: "学", ruby: "まな" }, { text: "びが" }, { text: "深", ruby: "ふか" }, { text: "まります。" },
      { text: "学食", ruby: "がくしょく" }, { text: "で" }, { text: "友人", ruby: "ゆうじん" }, { text: "と" }, { text: "ランチを" }, { text: "食", ruby: "た" }, { text: "べる" }, { text: "時間", ruby: "じかん" }, { text: "も" }, { text: "楽", ruby: "たの" }, { text: "しいです。" }
    ],
    contentKo: "대학에 진학하여 자유롭고 넓은 캠퍼스 라이프가 시작되었습니다. 스스로 이수 등록을 진행하고 관심 있는 전문 강의를 선택했습니다. 대교실에서의 강의나 세미나에서의 디스커션은 자극적이어서 배움이 깊어집니다. 학식에서 친구와 점심을 먹는 시간도 즐겁습니다.",
    vocabulary: [
      { word: "履修登録", reading: "りしゅうとうろく", meaning: "이수 등록, 수강 신청" },
      { word: "講義", reading: "こうぎ", meaning: "강의" },
      { word: "ゼミ", reading: "ゼミ", meaning: "세미나 (토론식 소그룹 수업)" },
      { word: "刺激的", reading: "しげきてき", meaning: "자극적, 흥미로움" },
      { word: "学食", reading: "がくしょく", meaning: "학식 (학생 식당)" }
    ],
    grammarPoints: [
      { rule: "〜履修登録を行う", explanation: "'~수강 신청을 진행하다'" },
      { rule: "〜学びが深まる", explanation: "'~배움이 깊어지다'" }
    ],
    quiz: [
      { question: "「履修登録」의 읽는 법은?", options: ["りしゅうとうろく", "りしゅうとうろく", "りしゅうとうろく", "りしゅうとうろく"], answer: "りしゅうとうろく", explanation: "履修登録(りしゅうとうろく)는 과목 수강을 신청하는 행위입니다." },
      { question: "「学食」의 뜻은?", options: ["학생 식당(학식)", "학교 서점", "학교 도서관", "학교 운동장"], answer: "학생 식당(학식)", explanation: "学食(がくしょく)는 학생과 교직원이 이용하는 교내 식당입니다." },
      { question: "「講義」의 한자 읽기는?", options: ["こうぎ", "こうき", "かんぎ", "かんき"], answer: "こうぎ", explanation: "講義(こうぎ)는 학문이나 기술을 가르쳐 설명하는 지식 전달 수업입니다." }
    ]
  }
];
