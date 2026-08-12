import type { LearningDiary } from "@/types/learningDiary";

export const part17: LearningDiary[] = [
  {
    id: "ld-161",
    title: "朝の定例ミーティング",
    titleKo: "아침 정례 미팅",
    category: "직장",
    level: "초급",
    thumbnail: "☕",
    contentJp: [
      { text: "毎朝", ruby: "まいあさ" }, { text: "9時", ruby: "くじ" }, { text: "から" }, { text: "チームの" }, { text: "朝礼", ruby: "ちょうれい" }, { text: "が" }, { text: "行", ruby: "おこな" }, { text: "われます。" },
      { text: "今日", ruby: "きょう" }, { text: "の" }, { text: "業務", ruby: "ぎょうむ" }, { text: "予定", ruby: "よてい" }, { text: "と" }, { text: "進捗", ruby: "しんちょく" }, { text: "状況", ruby: "じょうきょう" }, { text: "を" }, { text: "共有", ruby: "きょうゆう" }, { text: "しました。" },
      { text: "問題点", ruby: "もんだいてん" }, { text: "が" }, { text: "あれば" }, { text: "チームメンバーで" }, { text: "フォローし合", ruby: "あ" }, { text: "います。" },
      { text: "短時間", ruby: "たんじかん" }, { text: "で" }, { text: "情報", ruby: "じょうほう" }, { text: "を" }, { text: "整理", ruby: "せいり" }, { text: "し、" }, { text: "気合", ruby: "きあい" }, { text: "を" }, { text: "入", ruby: "い" }, { text: "れて" }, { text: "仕事", ruby: "しごと" }, { text: "に" }, { text: "取", ruby: "と" }, { text: "り" }, { text: "かかります。" }
    ],
    contentKo: "매일 아침 9시부터 팀 아침 조회(조례)가 열립니다. 오늘 업무 예정과 진척 상황을 공유했습니다. 문제점이 있으면 팀원들과 서로 도웁니다. 짧은 시간에 정보를 정리하고 기합을 넣고 업무에 착수합니다.",
    vocabulary: [
      { word: "朝礼", reading: "ちょうれい", meaning: "아침 조회" },
      { word: "進捗", reading: "しんちょく", meaning: "진척, 진행 경과" },
      { word: "共有", reading: "きょうゆう", meaning: "공유" },
      { word: "フォローし合う", reading: "フォローしあう", meaning: "서로 돕다, 커버해 주다" },
      { word: "取りかかる", reading: "とりかかる", meaning: "착수하다, 시작하다" }
    ],
    grammarPoints: [
      { rule: "〜が行われる", explanation: "수동태 표현 '~가 개최되다/실시되다'" },
      { rule: "〜合います (フォローし合う)", explanation: "동사 ます형 어간 + 合う = '서로 ~하다'" }
    ],
    quiz: [
      { question: "「進捗」의 읽는 법은?", options: ["しんちょく", "しんこう", "しんしん", "ちょくしん"], answer: "しんちょく", explanation: "進捗(しんちょく)는 일이 진행되는 상황입니다." },
      { question: "「朝礼」의 뜻은?", options: ["아침 조회", "종례", "점심 회의", "야근"], answer: "아침 조회", explanation: "朝礼(ちょうれい)는 아침에 전 직원이 모여 인사 및 공유를 하는 회의입니다." },
      { question: "「取りかかる」의 의미는?", options: ["착수하다/시작하다", "끝내다", "미루다", "거절하다"], answer: "착수하다/시작하다", explanation: "取りかかる는 어떤 작업에 착수하여 시작하는 것입니다." }
    ]
  },
  {
    id: "ld-162",
    title: "取引先への訪問と敬語",
    titleKo: "거래처 방문과 경어",
    category: "직장",
    level: "중급",
    thumbnail: "💼",
    contentJp: [
      { text: "先輩", ruby: "せんぱい" }, { text: "と" }, { text: "一緒", ruby: "いっしょ" }, { text: "に" }, { text: "重要", ruby: "じゅうよう" }, { text: "な" }, { text: "取引先", ruby: "とりひきさき" }, { text: "を" }, { text: "訪問", ruby: "ほうもん" }, { text: "しました。" },
      { text: "名刺", ruby: "めいし" }, { text: "交換", ruby: "こうかん" }, { text: "の" }, { text: "マナーや" }, { text: "適切", ruby: "てきせつ" }, { text: "な" }, { text: "敬語", ruby: "けいご" }, { text: "の" }, { text: "使", ruby: "つか" }, { text: "い" }, { text: "方", ruby: "かた" }, { text: "に" }, { text: "気", ruby: "き" }, { text: "を" }, { text: "遣", ruby: "つか" }, { text: "いました。" },
      { text: "「お世話になっております」と" }, { text: "丁寧", ruby: "ていねい" }, { text: "に" }, { text: "挨拶", ruby: "あいさつ" }, { text: "し、" }, { text: "商談", ruby: "しょうだん" }, { text: "を" }, { text: "スムーズに" }, { text: "進", ruby: "すす" }, { text: "めることができました。" },
      { text: "ビジネスパーソンとしての" }, { text: "自覚", ruby: "じかく" }, { text: "が" }, { text: "高", ruby: "たか" }, { text: "まりました。" }
    ],
    contentKo: "선배와 함께 중요한 거래처를 방문했습니다. 명함 교환 예절과 적절한 경어 사용법에 신경을 썼습니다. '신세를 지고 있습니다'라고 정중하게 인사하고 상담을 원활하게 진행할 수 있었습니다. 비즈니스맨으로서의 자각이 높아졌습니다.",
    vocabulary: [
      { word: "取引先", reading: "とりひきさき", meaning: "거래처" },
      { word: "名刺交換", reading: "めいしこうかん", meaning: "명함 교환" },
      { word: "敬語", reading: "けいご", meaning: "경어, 높임말" },
      { word: "商談", reading: "しょうだん", meaning: "상담, 비즈니스 협상" },
      { word: "自覚", reading: "じかく", meaning: "자각" }
    ],
    grammarPoints: [
      { rule: "〜の使い方", explanation: "동사 ます형 어간 + 方 = '~하는 방법'" },
      { rule: "〜としての", explanation: "'~로서의' 자격 연체" }
    ],
    quiz: [
      { question: "「取引先」의 읽는 법은?", options: ["とりひきさき", "とりひきまえ", "しごとさき", "とりひきこう"], answer: "とりひきさき", explanation: "取引先(とりひきさき)는 비즈니스 거래처입니다." },
      { question: "「名刺」의 한자 읽기는?", options: ["めいし", "みょうじ", "めいじ", "なふだ"], answer: "めいし", explanation: "名刺(めいし)는 신분을 밝히는 명함입니다." },
      { question: "「〜の使い方」의 뜻은?", options: ["~의 사용법", "~의 사용 이유", "~의 사용자", "~의 사용 시기"], answer: "~의 사용법", explanation: "使う의 어간 使い + 方(방법) = 사용 방법." }
    ]
  },
  {
    id: "ld-163",
    title: "残業とデリバリーの夜食",
    titleKo: "야근과 배달 야식",
    category: "직장",
    level: "초급",
    thumbnail: "🌙",
    contentJp: [
      { text: "締め切り", ruby: "しめきり" }, { text: "が" }, { text: "近", ruby: "ちか" }, { text: "く、" }, { text: "遅", ruby: "おそ" }, { text: "くまで" }, { text: "残業", ruby: "ざんぎょう" }, { text: "をしました。" },
      { text: "同僚", ruby: "どうりょう" }, { text: "と" }, { text: "一緒", ruby: "いっしょ" }, { text: "に" }, { text: "ピザの" }, { text: "デリバリーを" }, { text: "頼", ruby: "たの" }, { text: "みました。" },
      { text: "静", ruby: "しず" }, { text: "まり" }, { text: "返", ruby: "かえ" }, { text: "った" }, { text: "オフィスで" }, { text: "熱々", ruby: "あつあつ" }, { text: "の" }, { text: "ピザを" }, { text: "食", ruby: "た" }, { text: "べると、" }, { text: "元気", ruby: "げんき" }, { text: "が" }, { text: "復活", ruby: "ふっかつ" }, { text: "しました。" },
      { text: "無事", ruby: "ぶじ" }, { text: "に" }, { text: "資料", ruby: "しりょう" }, { text: "を" }, { text: "完成", ruby: "かんせい" }, { text: "させて" }, { text: "帰宅", ruby: "きたく" }, { text: "しました。" }
    ],
    contentKo: "마감이 가까워 늦게까지 야근을 했습니다. 동료와 함께 피자 배달을 시켰습니다. 침묵에 싸인 오피스에서 뜨끈뜨끈한 피자를 먹으니 기운이 회복되었습니다. 무사히 자료를 완성시키고 귀가했습니다.",
    vocabulary: [
      { word: "締め切り", reading: "しめきり", meaning: "마감, 기한" },
      { word: "残業", reading: "ざんぎょう", meaning: "야근, 잔업" },
      { word: "静まり返る", reading: "しずまりかえる", meaning: "쥐죽은 듯 조용해지다" },
      { word: "熱々", reading: "あつあつ", meaning: "뜨끈뜨끈함" },
      { word: "完成させる", reading: "かんせいさせる", meaning: "완성시키다 (사역)" }
    ],
    grammarPoints: [
      { rule: "〜を頼む", explanation: "'~를 부탁하다/주문하다'" },
      { rule: "〜させます (完成させる)", explanation: "사역형 '~하게 하다/시키다'" }
    ],
    quiz: [
      { question: "「残業」의 읽는 법은?", options: ["ざんぎょう", "のこりぎょう", "ざんぎょう", "ざんごう"], answer: "ざんぎょう", explanation: "残業(ざんぎょう)는 정해진 시간 외에 더 일하는 야근입니다." },
      { question: "「締め切り」의 뜻은?", options: ["마감", "출근", "휴가", "계약"], answer: "마감", explanation: "締め切り(しめきり)는 제출이나 접수의 기한, 마감입니다." },
      { question: "「完成させて」의 문법 형태는?", options: ["사역형 (완성시키다)", "수동형 (완성되다)", "가능형 (완성할 수 있다)", "부정형 (완성하지 않다)"], answer: "사역형 (완성시키다)", explanation: "完成する의 사역형 完成させる의 て형입니다." }
    ]
  },
  {
    id: "ld-164",
    title: "リモートワークとオンライン会議",
    titleKo: "재택근무와 온라인 회의",
    category: "직장",
    level: "중급",
    thumbnail: "💻",
    contentJp: [
      { text: "周", ruby: "しゅう" }, { text: "に" }, { text: "2回", ruby: "にかい" }, { text: "、" }, { text: "在宅", ruby: "ざいたく" }, { text: "勤務", ruby: "きんむ" }, { text: "をしています。" },
      { text: "通勤", ruby: "つうきん" }, { text: "時間", ruby: "じかん" }, { text: "が" }, { text: "かからない分", ruby: "ぶん" }, { text: "、" }, { text: "朝", ruby: "あさ" }, { text: "ゆったりと" }, { text: "過", ruby: "すご" }, { text: "せます。" },
      { text: "午後は" }, { text: "Zoomを" }, { text: "使", ruby: "つか" }, { text: "った" }, { text: "オンライン" }, { text: "会議", ruby: "かいぎ" }, { text: "が" }, { text: "ありました。" },
      { text: "画面", ruby: "がめん" }, { text: "越しでも" }, { text: "円滑", ruby: "えんかつ" }, { text: "に" }, { text: "コミュニケーションが" }, { text: "取", ruby: "と" }, { text: "れるよう" }, { text: "工夫", ruby: "くふう" }, { text: "しています。" }
    ],
    contentKo: "일주일에 2회, 재택근무를 하고 있습니다. 출퇴근 시간이 걸리지 않는 만큼 아침을 여유롭게 보낼 수 있습니다. 오후에는 Zoom을 사용한 온라인 회의가 있었습니다. 화면 너머로도 원활하게 소통할 수 있도록 공을 들이고 있습니다.",
    vocabulary: [
      { word: "在宅勤務", reading: "ざいたくきんむ", meaning: "재택근무" },
      { word: "〜分", reading: "〜ぶん", meaning: "~인 분량, ~한 만큼" },
      { word: "画面越し", reading: "がめんごし", meaning: "화면 너머" },
      { word: "円滑", reading: "えんかつ", meaning: "원활함" },
      { word: "工夫", reading: "くふう", meaning: "궁리, 공을 들임" }
    ],
    grammarPoints: [
      { rule: "〜がかからない分", explanation: "'~가 들지 않는 만큼/대신에'" },
      { rule: "〜ように工夫する", explanation: "'~하도록 궁리하다/공들이다'" }
    ],
    quiz: [
      { question: "「在宅勤務」의 읽는 법은?", options: ["ざいたくきんむ", "ありたくきんむ", "ざいしょきんむ", "ざいたくつうきん"], answer: "ざいたくきんむ", explanation: "在宅(집에 있음) + 勤務(근무) = 재택근무." },
      { question: "「円滑な」의 뜻은?", options: ["원활한", "복잡한", "느린", "거친"], answer: "원활한", explanation: "円滑(えんかつ)는 일이 막힘없이 매끄럽고 원활함을 뜻합니다." },
      { question: "「工夫する」의 의미는?", options: ["궁리하다/아이디어를 내다", "포기하다", "망가뜨리다", "지켜보다"], answer: "궁리하다/아이디어를 내다", explanation: "工夫(くふう)는 좋은 결과를 위해 여러 가지로 생각하고 공을 들이는 것입니다." }
    ]
  },
  {
    id: "ld-165",
    title: "新入社員の研修指導",
    titleKo: "신입사원 연수 지도",
    category: "직장",
    level: "고급",
    thumbnail: "🧑‍💼",
    contentJp: [
      { text: "今月", ruby: "こんげつ" }, { text: "から" }, { text: "新入", ruby: "しんにゅう" }, { text: "社員", ruby: "しゃいん" }, { text: "の" }, { text: "メンターを" }, { text: "任", ruby: "まか" }, { text: "されました。" },
      { text: "業務", ruby: "ぎょうむ" }, { text: "の" }, { text: "手順", ruby: "てじゅん" }, { text: "や" }, { text: "社内", ruby: "しゃない" }, { text: "システムを" }, { text: "分", ruby: "わ" }, { text: "かりやすく" }, { text: "レクチャーしました。" },
      { text: "教", ruby: "おし" }, { text: "えることで" }, { text: "自分", ruby: "じぶん" }, { text: "の" }, { text: "知識", ruby: "ちしき" }, { text: "の" }, { text: "曖昧", ruby: "あいまい" }, { text: "さに" }, { text: "気づかされ、" }, { text: "復習", ruby: "ふくしゅう" }, { text: "の" }, { text: "好機", ruby: "こうき" }, { text: "となりました。" },
      { text: "後輩", ruby: "こうはい" }, { text: "の" }, { text: "成長", ruby: "せいちょう" }, { text: "を" }, { text: "見守", ruby: "みまも" }, { text: "る喜びを" }, { text: "噛", ruby: "か" }, { text: "み" }, { text: "締", ruby: "し" }, { text: "めています。" }
    ],
    contentKo: "이번 달부터 신입사원의 멘토를 맡게 되었습니다. 업무 절차와 사내 시스템을 알기 쉽게 레슨했습니다. 가르침으로써 내 지식의 애매함을 깨닫게 되어 복습의 좋은 기회가 되었습니다. 후배의 성장을 지켜보는 기쁨을 깊이 되새기고 있습니다.",
    vocabulary: [
      { word: "手順", reading: "てじゅん", meaning: "순서, 절차" },
      { word: "曖昧", reading: "あいまい", meaning: "애매함, 모호함" },
      { word: "好機", reading: "こうき", meaning: "좋은 기회" },
      { word: "噛み締める", reading: "かみしめる", meaning: "씹어 가다듬다, 깊이 음미하다" },
      { word: "任される", reading: "まかされる", meaning: "맡겨지다 (수동)" }
    ],
    grammarPoints: [
      { rule: "〜を任される", explanation: "수동태 '~를 맡겨지다/맡다'" },
      { rule: "〜ことに気づかされる", explanation: "사역수동태 '~하는 것을 깨닫게 되다'" }
    ],
    quiz: [
      { question: "「手順」의 읽는 법은?", options: ["てじゅん", "てじゅの", "しゅじゅん", "てばん"], answer: "てじゅん", explanation: "手順(てじゅん)은 일을 진행하는 순서나 절차입니다." },
      { question: "「噛み締める」의 비유적 의미는?", options: ["깊이 음미하다/되새기다", "이빨을 깨물다", "음식을 뱉다", "잊어버리다"], answer: "깊이 음미하다/되새기다", explanation: "감정이나 기쁨의 가치를 가슴속 깊이 곱씹어 느끼는 것입니다." },
      { question: "「任される」의 문법적 의미는?", options: ["맡겨지다 (수동)", "맡기다 (능동)", "거절하다", "도망치다"], answer: "맡겨지다 (수동)", explanation: "任せる(맡기다)의 수동형 任される = (책임 등을) 맡게 되다." }
    ]
  },
  {
    id: "ld-166",
    title: "昇進祝いの飲み会",
    titleKo: "승진 축하 회식",
    category: "직장",
    level: "중급",
    thumbnail: "🍻",
    contentJp: [
      { text: "先輩", ruby: "せんぱい" }, { text: "の" }, { text: "昇進", ruby: "しょうしん" }, { text: "お祝いの" }, { text: "飲", ruby: "の" }, { text: "み" }, { text: "会", ruby: "かい" }, { text: "が" }, { text: "催", ruby: "もよお" }, { text: "されました。" },
      { text: "居酒屋", ruby: "いざかや" }, { text: "で" }, { text: "花束", ruby: "はなたば" }, { text: "と" }, { text: "記念品", ruby: "きねんひん" }, { text: "を" }, { text: "贈呈", ruby: "ぞうてい" }, { text: "しました。" },
      { text: "先輩", ruby: "せんぱい" }, { text: "の" }, { text: "挨拶", ruby: "あいさつ" }, { text: "に" }, { text: "感銘", ruby: "かんめい" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "け、" }, { text: "「自分", ruby: "じぶん" }, { text: "も" }, { text: "もっと" }, { text: "成長", ruby: "せいちょう" }, { text: "したい」と" }, { text: "思", ruby: "おも" }, { text: "いました。" },
      { text: "和気藹藹", ruby: "わきあいあい" }, { text: "とした" }, { text: "雰囲気", ruby: "ふんいき" }, { text: "で" }, { text: "素敵", ruby: "すてき" }, { text: "な" }, { text: "夜", ruby: "よる" }, { text: "になりました。" }
    ],
    contentKo: "선배의 승진 축하 회식이 개최되었습니다. 이자카야에서 꽃다발과 기념품을 증정했습니다. 선배의 인사말에 감명을 받고 '나도 더 성장하고 싶다'고 생각했습니다. 화기애애한 분위기에서 멋진 밤이 되었습니다.",
    vocabulary: [
      { word: "昇進", reading: "しょうしん", meaning: "승진" },
      { word: "催す", reading: "もよおす", meaning: "개최하다, 주최하다" },
      { word: "贈呈", reading: "ぞうてい", meaning: "증정" },
      { word: "感銘を受ける", reading: "かんめいをうける", meaning: "감명을 받다" },
      { word: "和気藹藹", reading: "わきあいあい", meaning: "화기애애함" }
    ],
    grammarPoints: [
      { rule: "〜が催される", explanation: "수동태 '~가 열리다/개최되다'" },
      { rule: "〜に感銘を受ける", explanation: "'~에 감명을 받다'" }
    ],
    quiz: [
      { question: "「昇進」의 읽는 법은?", options: ["しょうしん", "のぼりしん", "しょうじん", "じょうしん"], answer: "しょうしん", explanation: "昇進(しょうしん)은 직위가 오르는 승진입니다." },
      { question: "「和気藹藹」의 의미는?", options: ["화기애애함", "어색하고 차가움", "시끄럽고 소란스러움", "엄격함"], answer: "화기애애함", explanation: "和気藹藹(わきあいあい)는 서로 화목하고 마음이 터져 따뜻한 모양입니다." },
      { question: "「贈呈」의 한자 읽기는?", options: ["ぞうてい", "そうてい", "おくにてい", "ぞうちょう"], answer: "ぞうてい", explanation: "贈呈(ぞうてい)는 선물이나 물품을 증정하는 것입니다." }
    ]
  },
  {
    id: "ld-167",
    title: "有給休暇の取得",
    titleKo: "유급 휴가 사용",
    category: "직장",
    level: "초급",
    thumbnail: "🌴",
    contentJp: [
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "有給", ruby: "ゆうきゅう" }, { text: "休暇", ruby: "きゅうか" }, { text: "を" }, { text: "取", ruby: "と" }, { text: "って" }, { text: "平日の" }, { text: "休日", ruby: "きゅうじつ" }, { text: "を" }, { text: "楽", ruby: "たの" }, { text: "しみました。" },
      { text: "混", ruby: "こ" }, { text: "んでいない" }, { text: "カフェで" }, { text: "読書", ruby: "どくしょ" }, { text: "をしたり、" }, { text: "美容院", ruby: "びよういん" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "ったりしました。" },
      { text: "仕事", ruby: "しごと" }, { text: "から" }, { text: "離", ruby: "はな" }, { text: "れて" }, { text: "リフレッシュすることで、" }, { text: "心身", ruby: "しんしん" }, { text: "ともに" }, { text: "回復", ruby: "かいふく" }, { text: "しました。" },
      { text: "しっかり" }, { text: "休", ruby: "やす" }, { text: "むことも" }, { text: "仕事", ruby: "しごと" }, { text: "の" }, { text: "一部", ruby: "いちぶ" }, { text: "だと" }, { text: "実感", ruby: "じっかん" }, { text: "しました。" }
    ],
    contentKo: "오늘은 유급 휴가를 내어 평일의 휴일을 즐겼습니다. 붐비지 않는 카페에서 독서를 하거나 미용실에 다녀왔습니다. 일에서 벗어나 리프레시함으로써 심신 모두 회복되었습니다. 잘 쉬는 것도 일의 일부라고 실감했습니다.",
    vocabulary: [
      { word: "有給休暇", reading: "ゆうきゅうきゅうか", meaning: "유급 휴가" },
      { word: "美容院", reading: "びよういん", meaning: "미용실" },
      { word: "離れる", reading: "はなれる", meaning: "떨어지다, 벗어나다" },
      { word: "心身とも", reading: "しんしんとも", meaning: "심신 모두" },
      { word: "回復", reading: "かいふく", meaning: "회복" }
    ],
    grammarPoints: [
      { rule: "〜を離れて", explanation: "'~를 떠나, ~에서 벗어나'" },
      { rule: "〜することも〜だ", explanation: "동사의 명사화 '~하는 것도 ~이다'" }
    ],
    quiz: [
      { question: "「有給休暇」의 읽는 법은?", options: ["ゆうきゅうきゅうか", "ありきゅうきゅうか", "ゆうきゅうやすみ", "ゆうきゅうきゅうけい"], answer: "ゆうきゅうきゅうか", explanation: "有給(ゆうきゅう) + 休暇(きゅうか) = 유급 휴가." },
      { question: "「美容院」의 뜻은?", options: ["미용실", "병원", "우체국", "약국"], answer: "미용실", explanation: "美容院(びよういん)은 머리를 만지는 미용실입니다." },
      { question: "「リフレッシュする」의 의미는?", options: ["피로를 풀고 기분을 새로이 하다", "공부를 더 하다", "운동을 그만두다", "돈을 지출하다"], answer: "피로를 풀고 기분을 새로이 하다", explanation: "영어 refresh로 휴식하여 새로워지는 것을 뜻합니다." }
    ]
  },
  {
    id: "ld-168",
    title: "トラブル対応とチームの絆",
    titleKo: "트러블 대응과 팀의 유대",
    category: "직장",
    level: "고급",
    thumbnail: "🚨",
    contentJp: [
      { text: "システム障害", ruby: "しょうがい" }, { text: "が" }, { text: "発生", ruby: "はっせい" }, { text: "し、" }, { text: "緊急", ruby: "きんきゅう" }, { text: "対応", ruby: "たいおう" }, { text: "に" }, { text: "追", ruby: "お" }, { text: "われました。" },
      { text: "原因", ruby: "げんいん" }, { text: "究明", ruby: "きゅうめい" }, { text: "と" }, { text: "復旧", ruby: "ふっきゅう" }, { text: "作業", ruby: "さぎょう" }, { text: "を" }, { text: "部署", ruby: "ぶしょ" }, { text: "全体", ruby: "ぜんたい" }, { text: "で" }, { text: "連携", ruby: "れんけい" }, { text: "して" }, { text: "進", ruby: "すす" }, { text: "めました。" },
      { text: "一人ひとりが" }, { text: "冷静", ruby: "れいせい" }, { text: "に" }, { text: "役割", ruby: "やくわり" }, { text: "を" }, { text: "果", ruby: "はた" }, { text: "した結果、" }, { text: "数時間で" }, { text: "問題", ruby: "もんだい" }, { text: "を" }, { text: "解決", ruby: "かいけつ" }, { text: "できました。" },
      { text: "危機的", ruby: "ききてき" }, { text: "状況", ruby: "じょうきょう" }, { text: "を" }, { text: "共", ruby: "とも" }, { text: "に" }, { text: "乗り越えたことで、" }, { text: "チームの" }, { text: "結束力", ruby: "けっそくりょく" }, { text: "が" }, { text: "一層", ruby: "いっそう" }, { text: "強", ruby: "つよ" }, { text: "まりました。" }
    ],
    contentKo: "시스템 장애가 발생하여 긴급 대응에 쫓겼습니다. 원인 규명과 복구 작업을 부서 전체가 연계하여 진행했습니다. 한 사람 한 사람이 냉정하게 역할을 다한 결과, 몇 시간 만에 문제를 해결할 수 있었습니다. 위기 상황을 함께 극복해 냄으로써 팀의 결속력이 한층 강화되었습니다.",
    vocabulary: [
      { word: "障害", reading: "しょうがい", meaning: "장애, 고장" },
      { word: "追われる", reading: "おわれる", meaning: "쫓기다" },
      { word: "究明", reading: "きゅうめい", meaning: "규명" },
      { word: "復旧", reading: "ふっきゅう", meaning: "복구" },
      { word: "結束力", reading: "けっそくりょく", meaning: "결속력" }
    ],
    grammarPoints: [
      { rule: "〜に追われる", explanation: "수동태 '~에 쫓기다' (업무나 시간)" },
      { rule: "〜一層強まる", explanation: "'한층 더 강해지다'" }
    ],
    quiz: [
      { question: "「復旧」의 읽는 법은?", options: ["ふっきゅう", "ふくきゅう", "ふくきゅう", "ふっきゅう"], answer: "ふっきゅう", explanation: "復旧(ふっきゅう)는 원래 상태로 복원하는 복구입니다." },
      { question: "「追われる」의 뜻은?", options: ["쫓기다", "쫓아가다", "도망치다", "포기하다"], answer: "쫓기다", explanation: "追(お)う(쫓다)의 수동형 追われる = 업무 등에 내몰려 쫓기다." },
      { question: "「結束力」의 의미는?", options: ["결속력/단결력", "분열", "경쟁심", "무관심"], answer: "결속력/단결력", explanation: "結束力(けっそくりょく)는 하나로 뭉치는 힘입니다." }
    ]
  },
  {
    id: "ld-169",
    title: "オフィスの環境改善",
    titleKo: "오피스 환경 개선",
    category: "직장",
    level: "중급",
    thumbnail: "🖥️",
    contentJp: [
      { text: "デスク" }, { text: "周", ruby: "まわ" }, { text: "りの" }, { text: "整理", ruby: "せいり" }, { text: "整頓", ruby: "せいとん" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "不要", ruby: "ふよう" }, { text: "な" }, { text: "書類", ruby: "しょるい" }, { text: "を" }, { text: "シュレッダーに" }, { text: "かけ、" }, { text: "配線", ruby: "はいせん" }, { text: "を" }, { text: "スッキリと" }, { text: "まとめました。" },
      { text: "モニターの" }, { text: "位置", ruby: "いち" }, { text: "や" }, { text: "椅子", ruby: "いす" }, { text: "の" }, { text: "高", ruby: "たか" }, { text: "さを" }, { text: "調整", ruby: "ちょうせい" }, { text: "して" }, { text: "姿勢", ruby: "しせい" }, { text: "を" }, { text: "良", ruby: "よ" }, { text: "くしました。" },
      { text: "作業", ruby: "さぎょう" }, { text: "環境", ruby: "かんきょう" }, { text: "が" }, { text: "整", ruby: "ととの" }, { text: "うと" }, { text: "集中力", ruby: "しゅうちゅうりょく" }, { text: "が" }, { text: "向上", ruby: "こうじょう" }, { text: "し、" }, { text: "効率", ruby: "こうりつ" }, { text: "よく" }, { text: "仕事", ruby: "しごと" }, { text: "が" }, { text: "進", ruby: "すす" }, { text: "みます。" }
    ],
    contentKo: "책상 주변의 정리 정돈을 실시했습니다. 불필요한 서류를 분쇄기에 넣고 배선을 깔끔하게 정리했습니다. 모니터 위치와 의자 높이를 조정하여 자세를 곧게 만들었습니다. 작업 환경이 갖춰지자 집중력이 향상되어 효율적으로 업무가 진행됩니다.",
    vocabulary: [
      { word: "整理整頓", reading: "せいりせいとん", meaning: "정리 정돈" },
      { word: "シュレッダー", reading: "シュレッダー", meaning: "문서 세쇄기/분쇄기" },
      { word: "配線", reading: "はいせん", meaning: "배선, 전선 정리" },
      { word: "調整", reading: "ちょうせい", meaning: "조정" },
      { word: "向上", reading: "こうじょう", meaning: "향상" }
    ],
    grammarPoints: [
      { rule: "〜を〜にかける (シュレッダーにかける)", explanation: "'~를 기계 등에 넣고 돌리다'" },
      { rule: "〜が整うと", explanation: "조건절 '~가 조화를 이루고 갖춰지면'" }
    ],
    quiz: [
      { question: "「整理整頓」의 읽는 법은?", options: ["せいりせいとん", "せいりせいどう", "しょうりせいとん", "せいりちょうせい"], answer: "せいりせいとん", explanation: "整理整頓(せいりせいとん)은 수납하고 바르게 정돈함입니다." },
      { question: "「調整」의 뜻은?", options: ["조정", "파괴", "확대", "삭제"], answer: "조정", explanation: "調整(ちょうせい)는 균형이나 상태를 맞추는 것입니다." },
      { question: "「向上する」의 의미는?", options: ["향상되다/높아지다", "저하되다", "멈추다", "흩어지다"], answer: "향상되다/높아지다", explanation: "向上(こうじょう)는 능력이 더 좋은 수준으로 올라가는 것입니다." }
    ]
  },
  {
    id: "ld-170",
    title: "新規事業の企画提案",
    titleKo: "신규 사업 기획 제안",
    category: "직장",
    level: "고급",
    thumbnail: "💡",
    contentJp: [
      { text: "温", ruby: "あたた" }, { text: "めてきた" }, { text: "新規", ruby: "しんき" }, { text: "事業", ruby: "じぎょう" }, { text: "の" }, { text: "企画案", ruby: "きかくあん" }, { text: "を" }, { text: "役員", ruby: "やくいん" }, { text: "会議", ruby: "かいぎ" }, { text: "で" }, { text: "提案", ruby: "ていあん" }, { text: "しました。" },
      { text: "市場", ruby: "しじょう" }, { text: "分析", ruby: "ぶんせき" }, { text: "や" }, { text: "競合", ruby: "きょうごう" }, { text: "調査", ruby: "ちょうさ" }, { text: "の" }, { text: "データに" }, { text: "基", ruby: "もと" }, { text: "づき、" }, { text: "事業", ruby: "じぎょう" }, { text: "の" }, { text: "優位性", ruby: "ゆういせい" }, { text: "を" }, { text: "主張", ruby: "しゅちょう" }, { text: "しました。" },
      { text: "鋭", ruby: "わる" }, { text: "い" }, { text: "指摘", ruby: "してき" }, { text: "も" }, { text: "受けましたが、" }, { text: "概ね", ruby: "おおむね" }, { text: "高", ruby: "たか" }, { text: "い" }, { text: "評価", ruby: "ひょうか" }, { text: "を" }, { text: "得", ruby: "え" }, { text: "て" }, { text: "予算", ruby: "よさん" }, { text: "が" }, { text: "承認", ruby: "しょうにん" }, { text: "されました。" },
      { text: "自分", ruby: "じぶん" }, { text: "の" }, { text: "構想", ruby: "こうそう" }, { text: "が" }, { text: "形", ruby: "かたち" }, { text: "になる" }, { text: "第一歩", ruby: "だいいっぽ" }, { text: "を" }, { text: "踏", ruby: "ふ" }, { text: "み" }, { text: "出", ruby: "だ" }, { text: "せました。" }
    ],
    contentKo: "품어 온 신규 사업 기획안을 임원 회의에서 제안했습니다. 시장 분석과 경쟁사 조사의 데이터에 기반해 사업의 우위성을 주장했습니다. 날카로운 지적도 받았습니다만 대체로 높은 평가를 얻어 예산이 승인되었습니다. 나의 구상이 형태가 되는 첫발을 내디뎠습니다.",
    vocabulary: [
      { word: "温める", reading: "あたためる", meaning: "따뜻하게 하다, (구상 등을) 품어 오다" },
      { word: "競合", reading: "きょうごう", meaning: "경쟁, 경쟁사" },
      { word: "概ね", reading: "おおむね", meaning: "대체로, 대략" },
      { word: "承認", reading: "しょうにん", meaning: "승인" },
      { word: "構想", reading: "こうそう", meaning: "구상" }
    ],
    grammarPoints: [
      { rule: "〜に基づき", explanation: "'~에 기반하여, ~에 바탕을 두고'" },
      { rule: "〜踏み出せる", explanation: "가능형 '~내딛을 수 있다'" }
    ],
    quiz: [
      { question: "「概ね」의 읽는 법은?", options: ["おおむね", "おおよね", "たいむね", "がいね"], answer: "おおむね", explanation: "概ね(おおむね)는 대개, 대체로라는 뜻의 부사입니다." },
      { question: "「〜に基づき」의 뜻은?", options: ["~에 기반하여", "~에 반하여", "~와 무관하게", "~를 피하여"], answer: "~에 기반하여", explanation: "基(もと)づく는 데이터나 원칙에 바탕을 둔다는 뜻입니다." },
      { question: "「承認」의 한자 읽기는?", options: ["しょうにん", "しょうじん", "じょうにん", "しょうねん"], answer: "しょうにん", explanation: "承認(しょうにん)은 인정하고 승인하는 것입니다." }
    ]
  }
];
