import type { Lesson } from "@/types/lesson";

export const lessons: Lesson[] = [
  {
    id: "greeting-boss",
    title: "상사에게 아침 인사하기",
    category: "business",
    thumbnail: "🏢",
    comicFrames: ["🐰", "🐻", "🏢"],
    dialogue: [
      {
        speaker: "토끼",
        text: "おはようございます。今日もよろしくお願いいたします。",
        pronunciation: "おはようございます。きょうもよろしくおねがいいたします。",
        translation: "안녕하세요. 오늘도 잘 부탁드립니다.",
      },
      {
        speaker: "곰 부장님",
        text: "おはよう。今日も頑張ろう。",
        pronunciation: "おはよう。きょうもがんばろう。",
        translation: "좋은 아침. 오늘도 열심히 합시다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜ていただく",
        explanation: "상대방에게 무언가를 받거나 해달라고 부탁할 때 쓰는 겸양 표현입니다.",
      },
      {
        rule: "〜いたします",
        explanation: "「します」의 겸양어로, 격식 있는 상황에서 사용합니다.",
      },
    ],
    vocab: [
      { word: "おはようございます", meaning: "안녕하세요 (아침 인사)" },
      { word: "よろしくお願いいたします", meaning: "잘 부탁드립니다 (경어)" },
      { word: "頑張る", meaning: "열심히 하다" },
    ],
    quiz: [
      {
        question: "상사에게 아침 인사할 때 올바른 표현은?",
        options: ["おはよう", "おはようございます", "こんにちは", "こんばんは"],
        answer: "おはようございます",
      },
    ],
  },
  {
    id: "restaurant-order",
    title: "레스토랑에서 주문하기",
    category: "hospitality",
    thumbnail: "🍽️",
    comicFrames: ["🐰", "🍽️", "🐻"],
    dialogue: [
      {
        speaker: "점원 곰",
        text: "ご注文はお決まりでしょうか？",
        pronunciation: "ごちゅうもんはおきまりでしょうか？",
        translation: "주문은 결정하셨나요?",
      },
      {
        speaker: "토끼",
        text: "すみません、このランチセットをいただけますか？",
        pronunciation: "すみません、このランチセットをいただけますか？",
        translation: "저기요, 이 런치세트로 주세요.",
      },
      {
        speaker: "점원 곰",
        text: "かしこまりました。少々お待ちください。",
        pronunciation: "かしこまりました。しょうしょうおまちください。",
        translation: "알겠습니다. 잠시만 기다려 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜でしょうか",
        explanation: "정중한 질문 표현. 「ですか」보다 더 격식 있는 표현입니다.",
      },
      {
        rule: "かしこまりました",
        explanation: "「わかりました」의 최고 격식 표현. 서비스업에서 자주 사용합니다.",
      },
    ],
    vocab: [
      { word: "ご注文", meaning: "주문 (경어)" },
      { word: "いただく", meaning: "받다, 먹다 (겸양어)" },
      { word: "かしこまりました", meaning: "알겠습니다 (최고 격식)" },
      { word: "少々お待ちください", meaning: "잠시만 기다려 주세요" },
    ],
    quiz: [
      {
        question: "식당에서 점원이 「わかりました」보다 더 격식 있게 말할 때?",
        options: ["そうです", "かしこまりました", "なるほど", "ありがとう"],
        answer: "かしこまりました",
      },
    ],
  },
  {
    id: "dept-store",
    title: "백화점에서 안내 받기",
    category: "hospitality",
    thumbnail: "🏬",
    comicFrames: ["🏬", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "すみません、婦人服売り場はどちらでしょうか？",
        pronunciation: "すみません、ふじんふくうりばはどちらでしょうか？",
        translation: "저기요, 여성복 매장이 어디에 있나요?",
      },
      {
        speaker: "직원 곰",
        text: "3階でございます。エレベーターはあちらにございます。",
        pronunciation: "さんがいでございます。エレベーターはあちらにございます。",
        translation: "3층에 있습니다. 엘리베이터는 저쪽에 있습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜でございます",
        explanation: "「です」의 최고 격식 표현. 서비스업이나 공식 발표에 사용합니다.",
      },
    ],
    vocab: [
      { word: "どちら", meaning: "어디 (경어)" },
      { word: "ございます", meaning: "있습니다 (최고 격식)" },
      { word: "売り場", meaning: "매장, 판매 코너" },
    ],
    quiz: [
      {
        question: "「あります」의 최고 격식 표현은?",
        options: ["あります", "おります", "ございます", "います"],
        answer: "ございます",
      },
    ],
  },
  {
    id: "phone-call",
    title: "회사 전화 받기",
    category: "business",
    thumbnail: "📞",
    comicFrames: ["📞", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "はい、山田商事でございます。",
        pronunciation: "はい、やまだしょうじでございます。",
        translation: "네, 야마다 상사입니다.",
      },
      {
        speaker: "곰",
        text: "田中部長はいらっしゃいますか？",
        pronunciation: "たなかぶちょうはいらっしゃいますか？",
        translation: "다나카 부장님 계신가요?",
      },
      {
        speaker: "토끼",
        text: "少々お待ちいただけますでしょうか。",
        pronunciation: "しょうしょうおまちいただけますでしょうか。",
        translation: "잠시만 기다려 주시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "いらっしゃいます",
        explanation: "「います」의 존경어. 상대방이나 제3자의 존재를 높여 말할 때 사용합니다.",
      },
    ],
    vocab: [
      { word: "いらっしゃいます", meaning: "계십니다 (존경어)" },
      { word: "〜でございます", meaning: "〜입니다 (최고 격식)" },
      { word: "お待ちいただく", meaning: "기다려 주시다 (경어)" },
    ],
    quiz: [
      {
        question: "전화에서 상대방을 기다리게 할 때 정중한 표현은?",
        options: [
          "ちょっと待って",
          "少々お待ちいただけますでしょうか",
          "待ってください",
          "待て",
        ],
        answer: "少々お待ちいただけますでしょうか",
      },
    ],
  },
  {
    id: "business-card",
    title: "명함 교환하기",
    category: "business",
    thumbnail: "💼",
    comicFrames: ["💼", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "はじめまして。鈴木と申します。どうぞよろしくお願いいたします。",
        pronunciation: "はじめまして。すずきともうします。どうぞよろしくおねがいいたします。",
        translation: "처음 뵙겠습니다. 스즈키라고 합니다. 잘 부탁드립니다.",
      },
      {
        speaker: "곰",
        text: "こちらこそ、よろしくお願いいたします。名刺を頂戴できますか？",
        pronunciation: "こちらこそ、よろしくおねがいいたします。めいしをちょうだいできますか？",
        translation: "저야말로, 잘 부탁드립니다. 명함을 받아도 될까요?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜と申します",
        explanation: "자신의 이름을 소개할 때 쓰는 겸양 표현. 「〜といいます」보다 격식 있습니다.",
      },
      {
        rule: "頂戴する",
        explanation: "「もらう」의 겸양어. 상대방에게 무언가를 받을 때 사용합니다.",
      },
    ],
    vocab: [
      { word: "はじめまして", meaning: "처음 뵙겠습니다" },
      { word: "〜と申します", meaning: "〜라고 합니다 (겸양)" },
      { word: "頂戴する", meaning: "받다 (겸양어)" },
    ],
    quiz: [
      {
        question: "자신의 이름을 격식 있게 소개할 때?",
        options: ["私はスズキです", "スズキといいます", "スズキと申します", "スズキだよ"],
        answer: "スズキと申します",
      },
    ],
  },
  {
    id: "meeting-room",
    title: "회의실 예약 요청",
    category: "business",
    thumbnail: "📋",
    comicFrames: ["📋", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "恐れ入りますが、会議室を使わせていただいてもよろしいでしょうか？",
        pronunciation: "おそれいりますが、かいぎしつをつかわせていただいてもよろしいでしょうか？",
        translation: "죄송합니다만, 회의실을 사용해도 괜찮을까요?",
      },
      {
        speaker: "곰",
        text: "はい、ご自由にどうぞ。",
        pronunciation: "はい、ごじゆうにどうぞ。",
        translation: "네, 자유롭게 사용하세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "恐れ入りますが",
        explanation: "정중하게 부탁이나 질문을 할 때 사용하는 전치 표현. 「すみませんが」의 격식 버전.",
      },
    ],
    vocab: [
      { word: "恐れ入りますが", meaning: "죄송합니다만 (격식)" },
      { word: "〜させていただく", meaning: "〜하겠습니다 (겸양)" },
      { word: "よろしいでしょうか", meaning: "괜찮겠습니까?" },
    ],
    quiz: [
      {
        question: "정중하게 허락을 구할 때 사용하는 표현은?",
        options: ["いいですか", "よろしいでしょうか", "大丈夫？", "できる？"],
        answer: "よろしいでしょうか",
      },
    ],
  },
  {
    id: "signature",
    title: "서류에 서명 받기",
    category: "business",
    thumbnail: "✍️",
    comicFrames: ["✍️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "こちらの書類にご署名いただけますでしょうか？",
        pronunciation: "こちらのしょるいにごしょめいいただけますでしょうか？",
        translation: "이 서류에 서명해 주시겠습니까?",
      },
      {
        speaker: "곰",
        text: "承知いたしました。こちらでよろしいですか？",
        pronunciation: "しょうちいたしました。こちらでよろしいですか？",
        translation: "알겠습니다. 여기에 하면 될까요?",
      },
    ],
    grammarPoints: [
      {
        rule: "承知いたしました",
        explanation: "「わかりました」의 격식 있는 겸양 표현. 비즈니스 상황에서 자주 사용합니다.",
      },
    ],
    vocab: [
      { word: "ご署名", meaning: "서명 (경어)" },
      { word: "承知いたしました", meaning: "알겠습니다 (격식 겸양)" },
      { word: "こちら", meaning: "이쪽, 이것 (경어)" },
    ],
    quiz: [
      {
        question: "비즈니스에서 「わかりました」의 가장 격식 있는 표현은?",
        options: ["わかった", "了解です", "承知いたしました", "はいはい"],
        answer: "承知いたしました",
      },
    ],
  },
  {
    id: "complaint",
    title: "클레임 접수 처리",
    category: "business",
    thumbnail: "😤",
    comicFrames: ["😤", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 (고객)",
        text: "商品に不具合があるのですが…",
        pronunciation: "しょうひんにふぐあいがあるのですが…",
        translation: "상품에 불량이 있는데요...",
      },
      {
        speaker: "토끼 (직원)",
        text: "大変申し訳ございません。すぐに確認させていただきます。",
        pronunciation: "たいへんもうしわけございません。すぐにかくにんさせていただきます。",
        translation: "대단히 죄송합니다. 바로 확인해 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "大変申し訳ございません",
        explanation: "매우 격식 있는 사과 표현. 「ごめんなさい」보다 훨씬 정중합니다.",
      },
    ],
    vocab: [
      { word: "不具合", meaning: "불량, 결함" },
      { word: "大変申し訳ございません", meaning: "대단히 죄송합니다" },
      { word: "確認させていただく", meaning: "확인해 드리다 (겸양)" },
    ],
    quiz: [
      {
        question: "고객에게 사과할 때 가장 격식 있는 표현은?",
        options: ["ごめん", "すみません", "大変申し訳ございません", "失礼しました"],
        answer: "大変申し訳ございません",
      },
    ],
  },
  {
    id: "apology-delay",
    title: "납기 지연 사과하기",
    category: "business",
    thumbnail: "⏰",
    comicFrames: ["⏰", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "このたびは納品が遅れてしまい、誠に申し訳ございません。",
        pronunciation: "このたびはのうひんがおくれてしまい、まことにもうしわけございません。",
        translation: "이번에 납품이 늦어져서 진심으로 죄송합니다.",
      },
      {
        speaker: "곰",
        text: "今後はそのようなことのないよう、よろしくお願いします。",
        pronunciation: "こんごはそのようなことのないよう、よろしくおねがいします。",
        translation: "앞으로는 그런 일이 없도록 잘 부탁합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "誠に〜",
        explanation: "「本当に」의 격식 표현. 사과나 감사 표현 앞에 붙여 진심을 강조합니다.",
      },
    ],
    vocab: [
      { word: "納品", meaning: "납품" },
      { word: "誠に申し訳ございません", meaning: "진심으로 죄송합니다" },
      { word: "今後", meaning: "앞으로, 금후" },
    ],
    quiz: [
      {
        question: "「本当に」의 격식 있는 표현은?",
        options: ["本当に", "誠に", "マジで", "すごく"],
        answer: "誠に",
      },
    ],
  },
  {
    id: "resignation",
    title: "퇴직 인사하기",
    category: "business",
    thumbnail: "👋",
    comicFrames: ["👋", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "長い間お世話になりました。皆様のご活躍をお祈り申し上げます。",
        pronunciation: "ながいあいだおせわになりました。みなさまのごかつやくをおいのりもうしあげます。",
        translation: "오랫동안 신세를 졌습니다. 여러분의 활약을 기원합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お〜申し上げます",
        explanation: "겸양의 최고 격식 표현. 「お世話になりました」와 함께 이별 인사에 자주 쓰입니다.",
      },
    ],
    vocab: [
      { word: "お世話になりました", meaning: "신세를 졌습니다" },
      { word: "ご活躍", meaning: "활약 (경어)" },
      { word: "お祈り申し上げます", meaning: "기원합니다 (겸양)" },
    ],
    quiz: [
      {
        question: "퇴직 인사에서 '신세 많이 졌습니다'의 경어 표현은?",
        options: ["ありがとう", "お世話になりました", "さようなら", "またね"],
        answer: "お世話になりました",
      },
    ],
  },
  {
    id: "business-report",
    title: "업무 보고하기",
    category: "business",
    thumbnail: "📊",
    comicFrames: ["📊", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ご報告いたします。今月の売上は前月比10%増となっております。",
        pronunciation: "ごほうこくいたします。こんげつのうりあげはぜんげつひじゅっぱーせんとぞうとなっております。",
        translation: "보고 드립니다. 이번 달 매출은 전월 대비 10% 증가했습니다.",
      },
      {
        speaker: "곰 부장",
        text: "ご苦労様でした。引き続きよろしくお願いします。",
        pronunciation: "ごくろうさまでした。ひきつづきよろしくおねがいします。",
        translation: "수고했어요. 앞으로도 잘 부탁해요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご〜いたします",
        explanation: "「ご+동사어간+いたします」 형태의 겸양 표현. 격식 있는 보고에 적합합니다.",
      },
    ],
    vocab: [
      { word: "ご報告", meaning: "보고 (경어)" },
      { word: "前月比", meaning: "전월 대비" },
      { word: "ご苦労様", meaning: "수고했어요 (상급자→하급자)" },
    ],
    quiz: [
      {
        question: "상사에게 보고를 시작할 때 격식 있는 표현은?",
        options: ["報告するよ", "ご報告いたします", "話があります", "聞いてください"],
        answer: "ご報告いたします",
      },
    ],
  },
  {
    id: "deadline-negotiation",
    title: "납기 협상하기",
    category: "business",
    thumbnail: "📅",
    comicFrames: ["📅", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "誠に恐れ入りますが、納期を1週間延ばしていただけないでしょうか？",
        pronunciation: "まことにおそれいりますが、のうきをいっしゅうかんのばしていただけないでしょうか？",
        translation: "대단히 죄송합니다만, 납기를 1주일 연장해 주시겠습니까?",
      },
      {
        speaker: "곰",
        text: "今回だけ、特別に対応いたします。",
        pronunciation: "こんかいだけ、とくべつにたいおういたします。",
        translation: "이번 한 번만, 특별히 대응해 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜いただけないでしょうか",
        explanation: "매우 정중한 부탁 표현. 상대방에게 무리한 부탁을 할 때 사용합니다.",
      },
    ],
    vocab: [
      { word: "納期", meaning: "납기" },
      { word: "〜いただけないでしょうか", meaning: "〜해주시겠습니까? (최고 격식)" },
      { word: "特別に", meaning: "특별히" },
    ],
    quiz: [
      {
        question: "가장 정중한 부탁 표현은?",
        options: [
          "〜してください",
          "〜してもらえますか",
          "〜していただけないでしょうか",
          "〜してよ",
        ],
        answer: "〜していただけないでしょうか",
      },
    ],
  },
  {
    id: "hotel-checkin",
    title: "호텔 체크인하기",
    category: "hospitality",
    thumbnail: "🏨",
    comicFrames: ["🏨", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "チェックインをお願いしたいのですが。",
        pronunciation: "チェックインをおねがいしたいのですが。",
        translation: "체크인을 하고 싶은데요.",
      },
      {
        speaker: "직원 곰",
        text: "ご予約のお名前をお聞かせいただけますか？",
        pronunciation: "ごよやくのおなまえをおきかせいただけますか？",
        translation: "예약하신 성함을 알려 주시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "お聞かせいただく",
        explanation: "「教えてもらう」의 최고 격식 겸양 표현. 상대방에게 정보를 요청할 때 사용합니다.",
      },
    ],
    vocab: [
      { word: "ご予約", meaning: "예약 (경어)" },
      { word: "お名前", meaning: "성함 (경어)" },
      { word: "お聞かせいただく", meaning: "알려 주시다 (겸양)" },
    ],
    quiz: [
      {
        question: "호텔에서 '예약하신 성함'을 경어로 말하면?",
        options: ["名前を教えて", "ご予約のお名前を", "名前は何？", "名前を言って"],
        answer: "ご予約のお名前を",
      },
    ],
  },
  {
    id: "ryokan-etiquette",
    title: "료칸 예절",
    category: "hospitality",
    thumbnail: "🏯",
    comicFrames: ["🏯", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "료칸 직원 곰",
        text: "ようこそいらっしゃいませ。お部屋にご案内いたします。",
        pronunciation: "ようこそいらっしゃいませ。おへやにごあんないいたします。",
        translation: "어서 오세요. 방으로 안내해 드리겠습니다.",
      },
      {
        speaker: "토끼",
        text: "ありがとうございます。よろしくお願いいたします。",
        pronunciation: "ありがとうございます。よろしくおねがいいたします。",
        translation: "감사합니다. 잘 부탁드립니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ようこそいらっしゃいませ",
        explanation: "환영 인사의 최고 격식 표현. 료칸이나 고급 식당에서 사용합니다.",
      },
    ],
    vocab: [
      { word: "ようこそ", meaning: "어서 오세요, 환영합니다" },
      { word: "お部屋", meaning: "방 (경어)" },
      { word: "ご案内いたします", meaning: "안내해 드리겠습니다" },
    ],
    quiz: [
      {
        question: "료칸에서 손님을 환영할 때 최고 격식 표현은?",
        options: ["いらっしゃい", "ようこそいらっしゃいませ", "こんにちは", "どうぞ"],
        answer: "ようこそいらっしゃいませ",
      },
    ],
  },
  {
    id: "hair-salon",
    title: "미용실에서 요청하기",
    category: "hospitality",
    thumbnail: "💇",
    comicFrames: ["💇", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "少し短くしていただけますか？",
        pronunciation: "すこしみじかくしていただけますか？",
        translation: "조금 짧게 해 주시겠습니까?",
      },
      {
        speaker: "미용사 곰",
        text: "かしこまりました。どのくらい短くなさいますか？",
        pronunciation: "かしこまりました。どのくらいみじかくなさいますか？",
        translation: "알겠습니다. 얼마나 짧게 하시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜なさいますか",
        explanation: "「します」의 존경어 「なさる」의 정중형. 상대방의 의사를 물어볼 때 사용합니다.",
      },
    ],
    vocab: [
      { word: "〜していただく", meaning: "〜해 주시다 (겸양)" },
      { word: "なさる", meaning: "하시다 (존경어)" },
      { word: "かしこまりました", meaning: "알겠습니다" },
    ],
    quiz: [
      {
        question: "「しますか？」의 존경어 표현은?",
        options: ["しますか？", "なさいますか？", "するか？", "やりますか？"],
        answer: "なさいますか？",
      },
    ],
  },
  {
    id: "clinic-visit",
    title: "병원에서 증상 설명하기",
    category: "hospitality",
    thumbnail: "🏥",
    comicFrames: ["🏥", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "접수 곰",
        text: "本日はどのようなご症状でいらっしゃいますか？",
        pronunciation: "ほんじつはどのようなごしょうじょうでいらっしゃいますか？",
        translation: "오늘은 어떤 증상으로 오셨습니까?",
      },
      {
        speaker: "토끼",
        text: "昨日から頭痛がひどくて、熱もあるようです。",
        pronunciation: "きのうからずつうがひどくて、ねつもあるようです。",
        translation: "어제부터 두통이 심하고, 열도 있는 것 같습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご〜でいらっしゃいますか",
        explanation: "환자나 손님에게 정중하게 상황을 물어보는 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご症状", meaning: "증상 (경어)" },
      { word: "頭痛", meaning: "두통" },
      { word: "本日", meaning: "오늘 (격식)" },
    ],
    quiz: [
      {
        question: "병원에서 '오늘'을 격식 있게 말하면?",
        options: ["今日", "本日", "きょう", "今"],
        answer: "本日",
      },
    ],
  },
  {
    id: "bank-transaction",
    title: "은행에서 업무 보기",
    category: "hospitality",
    thumbnail: "🏦",
    comicFrames: ["🏦", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "振り込みをお願いしたいのですが、手続きを教えていただけますか？",
        pronunciation: "ふりこみをおねがいしたいのですが、てつづきをおしえていただけますか？",
        translation: "송금을 하고 싶은데요, 절차를 알려 주시겠습니까?",
      },
      {
        speaker: "직원 곰",
        text: "こちらの用紙にご記入いただけますでしょうか。",
        pronunciation: "こちらのようしにごきにゅういただけますでしょうか。",
        translation: "이 용지에 기재해 주시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "ご記入いただく",
        explanation: "「書いてもらう」의 경어 표현. 상대방에게 기재를 부탁할 때 사용합니다.",
      },
    ],
    vocab: [
      { word: "振り込み", meaning: "송금, 계좌 이체" },
      { word: "手続き", meaning: "절차, 수속" },
      { word: "ご記入", meaning: "기재, 기입 (경어)" },
    ],
    quiz: [
      {
        question: "은행에서 '서류에 써주세요'를 경어로 말하면?",
        options: [
          "書いてください",
          "ご記入いただけますでしょうか",
          "書いて",
          "記入してください",
        ],
        answer: "ご記入いただけますでしょうか",
      },
    ],
  },
  {
    id: "taxi-direction",
    title: "택시에서 목적지 안내",
    category: "hospitality",
    thumbnail: "🚕",
    comicFrames: ["🚕", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "東京駅までお願いします。",
        pronunciation: "とうきょうえきまでおねがいします。",
        translation: "도쿄역까지 부탁드립니다.",
      },
      {
        speaker: "기사 곰",
        text: "かしこまりました。高速道路を使ってもよろしいでしょうか？",
        pronunciation: "かしこまりました。こうそくどうろをつかってもよろしいでしょうか？",
        translation: "알겠습니다. 고속도로를 이용해도 괜찮겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜までお願いします",
        explanation: "목적지를 말할 때 격식 있게 부탁하는 표현입니다.",
      },
    ],
    vocab: [
      { word: "〜までお願いします", meaning: "〜까지 부탁드립니다" },
      { word: "高速道路", meaning: "고속도로" },
      { word: "よろしいでしょうか", meaning: "괜찮겠습니까?" },
    ],
    quiz: [
      {
        question: "택시에서 목적지를 정중하게 말할 때?",
        options: [
          "〜まで行って",
          "〜までお願いします",
          "〜に行きたい",
          "〜に行って",
        ],
        answer: "〜までお願いします",
      },
    ],
  },
  {
    id: "item-return",
    title: "상품 반품하기",
    category: "hospitality",
    thumbnail: "↩️",
    comicFrames: ["↩️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先日購入した商品を返品したいのですが、よろしいでしょうか？",
        pronunciation: "せんじつこうにゅうしたしょうひんをへんぴんしたいのですが、よろしいでしょうか？",
        translation: "지난번에 구입한 상품을 반품하고 싶은데요, 괜찮을까요?",
      },
      {
        speaker: "직원 곰",
        text: "はい、レシートをお持ちでしょうか？",
        pronunciation: "はい、レシートをおもちでしょうか？",
        translation: "네, 영수증은 가지고 계신가요?",
      },
    ],
    grammarPoints: [
      {
        rule: "お持ちでしょうか",
        explanation: "「持っていますか」의 정중한 경어 표현.",
      },
    ],
    vocab: [
      { word: "先日", meaning: "지난번, 요전날" },
      { word: "返品", meaning: "반품" },
      { word: "お持ちでしょうか", meaning: "가지고 계신가요?" },
    ],
    quiz: [
      {
        question: "「持っていますか？」의 정중한 경어 표현은?",
        options: ["持つ？", "お持ちでしょうか？", "ある？", "持ってる？"],
        answer: "お持ちでしょうか？",
      },
    ],
  },
  {
    id: "teacher-greeting",
    title: "선생님께 인사하기",
    category: "social",
    thumbnail: "👨‍🏫",
    comicFrames: ["👨‍🏫", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先生、いつもご指導いただきありがとうございます。",
        pronunciation: "せんせい、いつもごしどういただきありがとうございます。",
        translation: "선생님, 항상 지도해 주셔서 감사합니다.",
      },
      {
        speaker: "선생님 곰",
        text: "こちらこそ、よく頑張っていますね。",
        pronunciation: "こちらこそ、よくがんばっていますね。",
        translation: "저야말로, 정말 열심히 하고 있군요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご〜いただく",
        explanation: "상대방이 나에게 무언가를 해준 것에 대해 감사할 때 쓰는 겸양 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご指導", meaning: "지도, 가르침 (경어)" },
      { word: "いただく", meaning: "받다 (겸양어)" },
      { word: "こちらこそ", meaning: "저야말로" },
    ],
    quiz: [
      {
        question: "선생님께 '지도해 주셔서'를 경어로 말하면?",
        options: ["教えてくれて", "ご指導いただき", "教えてもらって", "指導して"],
        answer: "ご指導いただき",
      },
    ],
  },
  {
    id: "invitation-refusal",
    title: "초대 정중히 거절하기",
    category: "social",
    thumbnail: "🙏",
    comicFrames: ["🙏", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "곰",
        text: "今週末、パーティーにいらっしゃいませんか？",
        pronunciation: "こんしゅうまつ、パーティーにいらっしゃいませんか？",
        translation: "이번 주말에 파티에 오시겠어요?",
      },
      {
        speaker: "토끼",
        text: "せっかくのお誘いですが、その日は先約がございまして…",
        pronunciation: "せっかくのおさそいですが、そのひはさきやくがございまして…",
        translation: "귀한 초대인데요, 그날은 선약이 있어서요...",
      },
    ],
    grammarPoints: [
      {
        rule: "せっかくですが",
        explanation: "거절할 때 상대방의 호의에 감사를 표하면서 사용하는 완곡 표현입니다.",
      },
    ],
    vocab: [
      { word: "お誘い", meaning: "초대, 권유 (경어)" },
      { word: "せっかく", meaning: "모처럼, 귀하게" },
      { word: "先約", meaning: "선약" },
    ],
    quiz: [
      {
        question: "초대를 정중히 거절할 때 사용하는 표현은?",
        options: ["嫌です", "せっかくですが", "無理", "行きたくない"],
        answer: "せっかくですが",
      },
    ],
  },
  {
    id: "giving-gift",
    title: "선물 드리기",
    category: "social",
    thumbnail: "🎁",
    comicFrames: ["🎁", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "つまらないものですが、どうぞお受け取りください。",
        pronunciation: "つまらないものですが、どうぞおうけとりください。",
        translation: "변변치 않은 것이지만, 받아 주세요.",
      },
      {
        speaker: "곰",
        text: "ありがとうございます。お気遣いいただいて恐れ入ります。",
        pronunciation: "ありがとうございます。おきづかいいただいておそれいります。",
        translation: "감사합니다. 신경 써 주셔서 황송합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "つまらないものですが",
        explanation: "선물을 줄 때 겸손하게 표현하는 전형적인 일본식 표현입니다.",
      },
    ],
    vocab: [
      { word: "つまらないものですが", meaning: "변변치 않은 것이지만 (겸손 표현)" },
      { word: "お受け取りください", meaning: "받아 주세요" },
      { word: "お気遣い", meaning: "신경 써 주심 (경어)" },
    ],
    quiz: [
      {
        question: "선물을 줄 때 겸손하게 표현하는 전통적인 말은?",
        options: ["いいものです", "つまらないものですが", "高かったです", "素晴らしいです"],
        answer: "つまらないものですが",
      },
    ],
  },
  {
    id: "permission-request",
    title: "허락 구하기",
    category: "social",
    thumbnail: "🤲",
    comicFrames: ["🤲", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先生、少々お時間をいただけますでしょうか？",
        pronunciation: "せんせい、しょうしょうおじかんをいただけますでしょうか？",
        translation: "선생님, 잠시 시간을 내 주시겠습니까?",
      },
      {
        speaker: "선생님 곰",
        text: "はい、どうぞ。何かございますか？",
        pronunciation: "はい、どうぞ。なにかございますか？",
        translation: "네, 말씀하세요. 무슨 일이 있나요?",
      },
    ],
    grammarPoints: [
      {
        rule: "お時間をいただく",
        explanation: "상대방의 시간을 달라고 정중하게 요청하는 표현입니다.",
      },
    ],
    vocab: [
      { word: "お時間", meaning: "시간 (경어)" },
      { word: "少々", meaning: "조금, 잠시 (격식)" },
      { word: "ございますか", meaning: "있습니까? (격식)" },
    ],
    quiz: [
      {
        question: "선생님께 '시간 내 주시겠습니까?'를 가장 정중하게 말하면?",
        options: [
          "時間ある？",
          "ちょっといい？",
          "お時間をいただけますでしょうか",
          "時間をください",
        ],
        answer: "お時間をいただけますでしょうか",
      },
    ],
  },
  {
    id: "wedding-greeting",
    title: "결혼식 축하 인사",
    category: "social",
    thumbnail: "💒",
    comicFrames: ["💒", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ご結婚おめでとうございます。お二人の末永いご多幸をお祈りいたします。",
        pronunciation: "ごけっこんおめでとうございます。おふたりのすえながいごたこうをおいのりいたします。",
        translation: "결혼을 축하드립니다. 두 분의 영원한 행복을 기원합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご〜おめでとうございます",
        explanation: "축하 인사의 경어 표현. 「おめでとう」보다 훨씬 격식 있습니다.",
      },
    ],
    vocab: [
      { word: "ご結婚", meaning: "결혼 (경어)" },
      { word: "末永い", meaning: "영원한, 오래도록 이어지는" },
      { word: "ご多幸", meaning: "행복 (경어)" },
    ],
    quiz: [
      {
        question: "결혼식에서 격식 있는 축하 인사는?",
        options: [
          "おめでとう",
          "ご結婚おめでとうございます",
          "よかったね",
          "すごいね",
        ],
        answer: "ご結婚おめでとうございます",
      },
    ],
  },
  {
    id: "new-year-greeting",
    title: "새해 인사하기",
    category: "social",
    thumbnail: "🎍",
    comicFrames: ["🎍", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "明けましておめでとうございます。今年もどうぞよろしくお願いいたします。",
        pronunciation: "あけましておめでとうございます。ことしもどうぞよろしくおねがいいたします。",
        translation: "새해 복 많이 받으세요. 올해도 잘 부탁드립니다.",
      },
      {
        speaker: "곰",
        text: "こちらこそ、今年もよろしくお願いします。",
        pronunciation: "こちらこそ、ことしもよろしくおねがいします。",
        translation: "저야말로, 올해도 잘 부탁합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "明けましておめでとうございます",
        explanation: "새해 인사의 격식 표현. 1월에만 사용하는 특별한 인사말입니다.",
      },
    ],
    vocab: [
      { word: "明けましておめでとうございます", meaning: "새해 복 많이 받으세요" },
      { word: "今年もよろしく", meaning: "올해도 잘 부탁합니다" },
    ],
    quiz: [
      {
        question: "일본의 새해 인사는?",
        options: [
          "おめでとう",
          "明けましておめでとうございます",
          "ハッピーニューイヤー",
          "よいお年を",
        ],
        answer: "明けましておめでとうございます",
      },
    ],
  },
  {
    id: "senior-favor",
    title: "어른께 부탁드리기",
    category: "social",
    thumbnail: "🧓",
    comicFrames: ["🧓", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "おじいさん、重そうですね。お荷物をお持ちしましょうか？",
        pronunciation: "おじいさん、おもそうですね。おにもつをおもちしましょうか？",
        translation: "할아버지, 무거워 보이시네요. 짐을 들어 드릴까요?",
      },
      {
        speaker: "할아버지 곰",
        text: "ありがとう、助かります。",
        pronunciation: "ありがとう、たすかります。",
        translation: "고마워요, 도움이 되네요.",
      },
    ],
    grammarPoints: [
      {
        rule: "お〜しましょうか",
        explanation: "상대방을 위해 무언가를 해드리겠다고 제안하는 공손한 표현입니다.",
      },
    ],
    vocab: [
      { word: "お荷物", meaning: "짐 (경어)" },
      { word: "お持ちする", meaning: "들어 드리다 (겸양)" },
      { word: "助かります", meaning: "도움이 됩니다" },
    ],
    quiz: [
      {
        question: "어른에게 '짐을 들어 드릴까요?'를 경어로 말하면?",
        options: [
          "荷物持つ？",
          "お荷物をお持ちしましょうか？",
          "荷物持ってあげる",
          "持ちましょうか？",
        ],
        answer: "お荷物をお持ちしましょうか？",
      },
    ],
  },
  {
    id: "direction-polite",
    title: "길 안내 요청하기",
    category: "social",
    thumbnail: "🗺️",
    comicFrames: ["🗺️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "恐れ入りますが、駅はどちらの方向でしょうか？",
        pronunciation: "おそれいりますが、えきはどちらのほうこうでしょうか？",
        translation: "죄송합니다만, 역은 어느 방향인가요?",
      },
      {
        speaker: "곰",
        text: "あちらの角を曲がるとすぐです。",
        pronunciation: "あちらのかどをまがるとすぐです。",
        translation: "저쪽 모퉁이를 돌면 바로입니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "どちらの方向でしょうか",
        explanation: "길을 물을 때 「どこ」 대신 「どちら」를 사용하면 더 정중한 표현이 됩니다.",
      },
    ],
    vocab: [
      { word: "恐れ入りますが", meaning: "죄송합니다만 (격식)" },
      { word: "どちら", meaning: "어디 (경어)" },
      { word: "方向", meaning: "방향" },
    ],
    quiz: [
      {
        question: "길을 물을 때 「どこ」 대신 정중하게 말하면?",
        options: ["どこ", "どちら", "なに", "なん"],
        answer: "どちら",
      },
    ],
  },
  {
    id: "lost-property",
    title: "분실물 신고하기",
    category: "social",
    thumbnail: "🔍",
    comicFrames: ["🔍", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "すみません、財布を落としてしまったのですが、お落とし物センターはどちらでしょうか？",
        pronunciation: "すみません、さいふをおとしてしまったのですが、おおとしものセンターはどちらでしょうか？",
        translation: "저기요, 지갑을 잃어버렸는데요, 분실물 센터가 어디인가요?",
      },
      {
        speaker: "직원 곰",
        text: "ご案内いたします。こちらへどうぞ。",
        pronunciation: "ごあんないいたします。こちらへどうぞ。",
        translation: "안내해 드리겠습니다. 이쪽으로 오세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜てしまいました",
        explanation: "실수나 유감스러운 일이 완료됐을 때 쓰는 표현입니다.",
      },
    ],
    vocab: [
      { word: "落とす", meaning: "떨어뜨리다, 잃어버리다" },
      { word: "お落とし物", meaning: "분실물 (경어)" },
      { word: "ご案内いたします", meaning: "안내해 드리겠습니다" },
    ],
    quiz: [
      {
        question: "분실물 센터를 경어로 말하면?",
        options: ["落とし物センター", "お落とし物センター", "なくしたものセンター", "紛失センター"],
        answer: "お落とし物センター",
      },
    ],
  },
  {
    id: "excuse-me-pass",
    title: "지나가도록 양해 구하기",
    category: "social",
    thumbnail: "🚶",
    comicFrames: ["🚶", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "恐れ入りますが、少し通していただけますか？",
        pronunciation: "おそれいりますが、すこしとおしていただけますか？",
        translation: "죄송합니다만, 좀 지나가도 될까요?",
      },
      {
        speaker: "곰",
        text: "あ、すみません。どうぞ。",
        pronunciation: "あ、すみません。どうぞ。",
        translation: "아, 죄송해요. 지나가세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜していただけますか",
        explanation: "상대방에게 무언가를 해달라고 부탁할 때 쓰는 정중한 표현입니다.",
      },
    ],
    vocab: [
      { word: "恐れ入りますが", meaning: "죄송합니다만 (격식)" },
      { word: "通す", meaning: "지나가게 하다" },
      { word: "どうぞ", meaning: "자, 어서 (권유)" },
    ],
    quiz: [
      {
        question: "붐비는 곳에서 지나가게 해달라고 정중히 말할 때?",
        options: [
          "どいて！",
          "恐れ入りますが、少し通していただけますか？",
          "通れますか？",
          "すみません！",
        ],
        answer: "恐れ入りますが、少し通していただけますか？",
      },
    ],
  },
  // ── BUSINESS (25 new) ────────────────────────────────────────
  {
    id: "email-writing",
    title: "비즈니스 이메일 작성",
    category: "business",
    thumbnail: "✉️",
    comicFrames: ["✉️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "いつもお世話になっております。先日のご提案について、ご確認いただけますでしょうか。",
        pronunciation: "いつもおせわになっております。せんじつのごていあんについて、ごかくにんいただけますでしょうか。",
        translation: "항상 신세를 지고 있습니다. 지난번 제안에 대해 확인해 주시겠습니까?",
      },
      {
        speaker: "곰",
        text: "承知いたしました。確認次第、ご連絡申し上げます。",
        pronunciation: "しょうちいたしました。かくにんしだい、ごれんらくもうしあげます。",
        translation: "알겠습니다. 확인하는 대로 연락 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "いつもお世話になっております",
        explanation: "비즈니스 이메일·전화의 첫 인사. 「お世話になります」는 처음, 「なっております」는 계속 거래 중일 때 씁니다.",
      },
    ],
    vocab: [
      { word: "いつもお世話になっております", meaning: "항상 신세를 지고 있습니다" },
      { word: "ご提案", meaning: "제안 (경어)" },
      { word: "確認次第", meaning: "확인하는 대로" },
    ],
    quiz: [
      {
        question: "비즈니스 이메일을 시작할 때 쓰는 첫 인사는?",
        options: ["こんにちは", "いつもお世話になっております", "はじめまして", "おはようございます"],
        answer: "いつもお世話になっております",
      },
    ],
  },
  {
    id: "job-interview",
    title: "취업 면접",
    category: "business",
    thumbnail: "👔",
    comicFrames: ["👔", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "면접관 곰",
        text: "本日はお越しいただき、ありがとうございます。自己紹介をお願いできますか？",
        pronunciation: "ほんじつはおこしいただき、ありがとうございます。じこしょうかいをおねがいできますか？",
        translation: "오늘 와 주셔서 감사합니다. 자기소개를 부탁드려도 될까요?",
      },
      {
        speaker: "토끼",
        text: "はい、鈴木と申します。これまでの経験を活かして貢献できればと存じます。",
        pronunciation: "はい、すずきともうします。これまでのけいけんをいかしてこうけんできればとぞんじます。",
        translation: "네, 스즈키라고 합니다. 지금까지의 경험을 살려 공헌할 수 있으면 합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜と存じます",
        explanation: "「思います」의 겸양어. 면접 등 격식 있는 자리에서 자신의 의견을 말할 때 씁니다.",
      },
    ],
    vocab: [
      { word: "お越しいただく", meaning: "와 주시다 (겸양)" },
      { word: "〜と申します", meaning: "〜라고 합니다 (겸양)" },
      { word: "存じます", meaning: "생각합니다 (겸양)" },
    ],
    quiz: [
      {
        question: "면접에서 '생각합니다'를 겸양으로 말하면?",
        options: ["思います", "存じます", "考えます", "わかります"],
        answer: "存じます",
      },
    ],
  },
  {
    id: "client-visit",
    title: "거래처 방문 인사",
    category: "business",
    thumbnail: "🤝",
    comicFrames: ["🤝", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "本日はお時間をいただきまして、誠にありがとうございます。",
        pronunciation: "ほんじつはおじかんをいただきまして、まことにありがとうございます。",
        translation: "오늘 시간을 내어 주셔서 진심으로 감사합니다.",
      },
      {
        speaker: "곰 부장",
        text: "いえいえ、こちらこそよろしくお願いします。どうぞおかけください。",
        pronunciation: "いえいえ、こちらこそよろしくおねがいします。どうぞおかけください。",
        translation: "아닙니다, 저야말로 잘 부탁드립니다. 앉으세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "お時間をいただく",
        explanation: "방문·미팅 시 상대방의 시간에 감사를 표하는 정중한 표현입니다.",
      },
    ],
    vocab: [
      { word: "本日", meaning: "오늘 (격식)" },
      { word: "誠にありがとうございます", meaning: "진심으로 감사합니다" },
      { word: "おかけください", meaning: "앉으세요 (경어)" },
    ],
    quiz: [
      {
        question: "거래처 방문 시 첫 인사로 적절한 표현은?",
        options: ["来ました", "お時間をいただきまして誠にありがとうございます", "よろしく", "どうも"],
        answer: "お時間をいただきまして誠にありがとうございます",
      },
    ],
  },
  {
    id: "contract-signing",
    title: "계약서 서명 요청",
    category: "business",
    thumbnail: "📝",
    comicFrames: ["📝", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ご確認が終わりましたら、こちらにご捺印いただけますでしょうか。",
        pronunciation: "ごかくにんがおわりましたら、こちらにごなついんいただけますでしょうか。",
        translation: "확인이 끝나시면, 여기에 날인해 주시겠습니까?",
      },
      {
        speaker: "곰",
        text: "はい、内容を確認してから押印いたします。",
        pronunciation: "はい、ないようをかくにんしてからおういんいたします。",
        translation: "네, 내용을 확인하고 날인하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご捺印いただく",
        explanation: "도장을 찍어달라고 부탁하는 경어 표현. 「捺印」 앞에 「ご」를 붙여 격식을 높입니다.",
      },
    ],
    vocab: [
      { word: "ご捺印", meaning: "날인 (경어)" },
      { word: "押印いたします", meaning: "날인하겠습니다 (겸양)" },
      { word: "内容", meaning: "내용" },
    ],
    quiz: [
      {
        question: "계약서에 도장을 찍어달라고 경어로 말하면?",
        options: ["ハンコを押して", "ご捺印いただけますでしょうか", "サインして", "押せますか"],
        answer: "ご捺印いただけますでしょうか",
      },
    ],
  },
  {
    id: "business-trip-report",
    title: "출장 보고",
    category: "business",
    thumbnail: "✈️",
    comicFrames: ["✈️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ただいま出張より戻りました。ご報告申し上げます。",
        pronunciation: "ただいましゅっちょうよりもどりました。ごほうこくもうしあげます。",
        translation: "방금 출장에서 돌아왔습니다. 보고 드리겠습니다.",
      },
      {
        speaker: "곰 부장",
        text: "お疲れ様でした。詳しく聞かせてもらいましょう。",
        pronunciation: "おつかれさまでした。くわしくきかせてもらいましょう。",
        translation: "수고하셨습니다. 자세히 들어봅시다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ただいま〜より戻りました",
        explanation: "출장·외출 후 복귀 인사. 「ただいま」를 업무 맥락에서 쓰면 격식 있는 복귀 보고가 됩니다.",
      },
    ],
    vocab: [
      { word: "出張", meaning: "출장" },
      { word: "ただいま戻りました", meaning: "방금 돌아왔습니다" },
      { word: "お疲れ様でした", meaning: "수고하셨습니다" },
    ],
    quiz: [
      {
        question: "출장에서 돌아와 상사에게 복귀를 알릴 때?",
        options: ["帰りました", "ただいま出張より戻りました", "戻った", "来ました"],
        answer: "ただいま出張より戻りました",
      },
    ],
  },
  {
    id: "budget-approval",
    title: "예산 승인 요청",
    category: "business",
    thumbnail: "💰",
    comicFrames: ["💰", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "新プロジェクトの予算についてご承認いただきたく、ご検討をお願い申し上げます。",
        pronunciation: "しんプロジェクトのよさんについてごしょうにんいただきたく、ごけんとうをおねがいもうしあげます。",
        translation: "새 프로젝트 예산에 대해 승인해 주시기를 원하여, 검토를 부탁 드립니다.",
      },
      {
        speaker: "곰 부장",
        text: "資料を見てから判断いたします。",
        pronunciation: "しりょうをみてからはんだんいたします。",
        translation: "자료를 보고 나서 판단하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜いただきたく、〜をお願い申し上げます",
        explanation: "매우 격식 있는 요청 표현. 상급자나 중요 거래처에 공식적으로 부탁할 때 씁니다.",
      },
    ],
    vocab: [
      { word: "ご承認", meaning: "승인 (경어)" },
      { word: "ご検討", meaning: "검토 (경어)" },
      { word: "お願い申し上げます", meaning: "부탁드립니다 (최고 격식)" },
    ],
    quiz: [
      {
        question: "상사에게 매우 격식 있게 부탁할 때 문장 끝에 쓰는 표현은?",
        options: ["お願いします", "お願い申し上げます", "頼みます", "ください"],
        answer: "お願い申し上げます",
      },
    ],
  },
  {
    id: "annual-review",
    title: "연간 업무 평가",
    category: "business",
    thumbnail: "📈",
    comicFrames: ["📈", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "곰 부장",
        text: "今期もよく頑張ってくれました。来期の目標についてお聞かせいただけますか？",
        pronunciation: "こんきもよくがんばってくれました。らいきのもくひょうについておきかせいただけますか？",
        translation: "이번 분기도 잘 해줬어요. 다음 분기 목표에 대해 들려주시겠어요?",
      },
      {
        speaker: "토끼",
        text: "はい、来期は売上を前期比20%向上させたいと存じます。",
        pronunciation: "はい、らいきはうりあげをぜんきひにじゅっぱーせんとこうじょうさせたいとぞんじます。",
        translation: "네, 다음 분기에는 매출을 전기 대비 20% 향상시키고 싶습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜させたいと存じます",
        explanation: "자신의 목표·희망을 상사에게 격식 있게 전달하는 표현입니다.",
      },
    ],
    vocab: [
      { word: "今期", meaning: "이번 분기" },
      { word: "来期", meaning: "다음 분기" },
      { word: "前期比", meaning: "전기 대비" },
    ],
    quiz: [
      {
        question: "평가 자리에서 '향상시키고 싶습니다'를 겸양으로 말하면?",
        options: ["向上させたい", "向上させたいと存じます", "上げたいです", "良くしたい"],
        answer: "向上させたいと存じます",
      },
    ],
  },
  {
    id: "new-employee-welcome",
    title: "신입사원 환영 인사",
    category: "business",
    thumbnail: "🌱",
    comicFrames: ["🌱", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 부장",
        text: "ようこそ、わが社へ。皆さんのご活躍を期待しております。",
        pronunciation: "ようこそ、わがしゃへ。みなさんのごかつやくをきたいしております。",
        translation: "환영합니다, 우리 회사에 오신 것을 환영합니다. 여러분의 활약을 기대하고 있습니다.",
      },
      {
        speaker: "토끼 (신입)",
        text: "ありがとうございます。精一杯努力してまいります。",
        pronunciation: "ありがとうございます。せいいっぱいどりょくしてまいります。",
        translation: "감사합니다. 최선을 다해 노력하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜してまいります",
        explanation: "「〜していきます」의 겸양어. 앞으로의 행동 의지를 격식 있게 표현합니다.",
      },
    ],
    vocab: [
      { word: "わが社", meaning: "우리 회사" },
      { word: "ご活躍", meaning: "활약 (경어)" },
      { word: "〜してまいります", meaning: "〜해 나가겠습니다 (겸양)" },
    ],
    quiz: [
      {
        question: "신입사원이 '노력해 나가겠습니다'를 겸양으로 말하면?",
        options: ["努力します", "努力していきます", "努力してまいります", "頑張る"],
        answer: "努力してまいります",
      },
    ],
  },
  {
    id: "farewell-party",
    title: "송별회 인사",
    category: "business",
    thumbnail: "🥂",
    comicFrames: ["🥂", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "皆様には大変お世話になりました。今後ともどうぞよろしくお願い申し上げます。",
        pronunciation: "みなさまにはたいへんおせわになりました。こんごともどうぞよろしくおねがいもうしあげます。",
        translation: "여러분께 많은 신세를 졌습니다. 앞으로도 잘 부탁드립니다.",
      },
      {
        speaker: "곰 동료",
        text: "お元気で。また機会があればぜひご一緒しましょう。",
        pronunciation: "おげんきで。またきかいがあればぜひごいっしょしましょう。",
        translation: "건강하세요. 기회가 있으면 꼭 함께합시다.",
      },
    ],
    grammarPoints: [
      {
        rule: "今後ともよろしくお願い申し上げます",
        explanation: "이별 인사에서 앞으로의 관계를 부탁하는 최고 격식 표현입니다.",
      },
    ],
    vocab: [
      { word: "大変お世話になりました", meaning: "많은 신세를 졌습니다" },
      { word: "今後とも", meaning: "앞으로도" },
      { word: "ご一緒する", meaning: "함께하다 (경어)" },
    ],
    quiz: [
      {
        question: "송별회에서 앞으로의 관계를 부탁하는 격식 표현은?",
        options: ["またね", "今後ともよろしくお願い申し上げます", "さようなら", "またいつか"],
        answer: "今後ともよろしくお願い申し上げます",
      },
    ],
  },
  {
    id: "meeting-scheduling",
    title: "회의 일정 조율",
    category: "business",
    thumbnail: "🗓️",
    comicFrames: ["🗓️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "来週、ご都合のよろしい日時をお知らせいただけますでしょうか。",
        pronunciation: "らいしゅう、ごつごうのよろしいにちじをおしらせいただけますでしょうか。",
        translation: "다음 주, 편하신 일시를 알려 주시겠습니까?",
      },
      {
        speaker: "곰",
        text: "火曜日の午後2時はいかがでしょうか。",
        pronunciation: "かようびのごごにじはいかがでしょうか。",
        translation: "화요일 오후 2시는 어떠신가요?",
      },
    ],
    grammarPoints: [
      {
        rule: "ご都合のよろしい日時",
        explanation: "상대방의 일정을 묻는 격식 표현. 「都合のいい日」보다 훨씬 정중합니다.",
      },
    ],
    vocab: [
      { word: "ご都合", meaning: "형편, 사정 (경어)" },
      { word: "日時", meaning: "일시" },
      { word: "いかがでしょうか", meaning: "어떠십니까?" },
    ],
    quiz: [
      {
        question: "상대방 일정을 정중하게 물을 때?",
        options: ["いつがいい？", "ご都合のよろしい日時をお知らせください", "都合は？", "いつ来れる？"],
        answer: "ご都合のよろしい日時をお知らせください",
      },
    ],
  },
  {
    id: "expense-claim",
    title: "경비 정산 신청",
    category: "business",
    thumbnail: "🧾",
    comicFrames: ["🧾", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先日の出張経費の精算をお願いしたいのですが、ご確認いただけますでしょうか。",
        pronunciation: "せんじつのしゅっちょうけいひのせいさんをおねがいしたいのですが、ごかくにんいただけますでしょうか。",
        translation: "지난번 출장 경비 정산을 부탁드리고 싶은데요, 확인해 주시겠습니까?",
      },
      {
        speaker: "경리 곰",
        text: "レシートを添付の上、こちらの用紙にご記入ください。",
        pronunciation: "レシートをてんぷのうえ、こちらのようしにごきにゅうください。",
        translation: "영수증을 첨부하신 후, 이 용지에 기재해 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜の上、〜ください",
        explanation: "순서를 나타내는 격식 표현. 「〜してから〜してください」의 격식 버전입니다.",
      },
    ],
    vocab: [
      { word: "経費精算", meaning: "경비 정산" },
      { word: "添付の上", meaning: "첨부한 후 (격식)" },
      { word: "ご記入", meaning: "기재 (경어)" },
    ],
    quiz: [
      {
        question: "순서를 격식 있게 나타낼 때 「〜してから」 대신?",
        options: ["〜して", "〜の上", "〜してから", "〜たら"],
        answer: "〜の上",
      },
    ],
  },
  {
    id: "overtime-request",
    title: "야근 요청하기",
    category: "business",
    thumbnail: "🌙",
    comicFrames: ["🌙", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 부장",
        text: "誠に恐れ入りますが、本日残業をお願いできますでしょうか。",
        pronunciation: "まことにおそれいりますが、ほんじつざんぎょうをおねがいできますでしょうか。",
        translation: "대단히 죄송합니다만, 오늘 야근을 부탁드릴 수 있겠습니까?",
      },
      {
        speaker: "토끼",
        text: "はい、承知いたしました。何時頃まで必要でしょうか。",
        pronunciation: "はい、しょうちいたしました。なんじごろまでひつようでしょうか。",
        translation: "네, 알겠습니다. 몇 시쯤까지 필요하신가요?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜をお願いできますでしょうか",
        explanation: "「〜をお願いできますか」보다 한층 더 격식 있는 부탁 표현입니다.",
      },
    ],
    vocab: [
      { word: "残業", meaning: "야근, 잔업" },
      { word: "承知いたしました", meaning: "알겠습니다 (겸양)" },
      { word: "何時頃", meaning: "몇 시쯤" },
    ],
    quiz: [
      {
        question: "부하직원에게 야근을 정중히 부탁할 때 끝 표현은?",
        options: ["残業して", "残業お願い", "残業をお願いできますでしょうか", "残業だよ"],
        answer: "残業をお願いできますでしょうか",
      },
    ],
  },
  {
    id: "promotion-congratulation",
    title: "승진 축하하기",
    category: "business",
    thumbnail: "🎖️",
    comicFrames: ["🎖️", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "토끼",
        text: "このたびはご昇進、誠におめでとうございます。今後のご活躍をお祈り申し上げます。",
        pronunciation: "このたびはごしょうしん、まことにおめでとうございます。こんごのごかつやくをおいのりもうしあげます。",
        translation: "이번에 승진을 진심으로 축하드립니다. 앞으로의 활약을 기원합니다.",
      },
      {
        speaker: "곰",
        text: "ありがとうございます。引き続きよろしくお願いいたします。",
        pronunciation: "ありがとうございます。ひきつづきよろしくおねがいいたします。",
        translation: "감사합니다. 앞으로도 잘 부탁드립니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご昇進おめでとうございます",
        explanation: "승진 축하의 격식 표현. 「昇進」 앞에 「ご」를 붙여 상대방을 높입니다.",
      },
    ],
    vocab: [
      { word: "ご昇進", meaning: "승진 (경어)" },
      { word: "誠におめでとうございます", meaning: "진심으로 축하드립니다" },
      { word: "引き続き", meaning: "계속, 앞으로도" },
    ],
    quiz: [
      {
        question: "동료 승진을 축하할 때 격식 있는 표현은?",
        options: ["昇進おめでとう", "ご昇進おめでとうございます", "やったね", "すごいね"],
        answer: "ご昇進おめでとうございます",
      },
    ],
  },
  {
    id: "transfer-announcement",
    title: "부서 이동 인사",
    category: "business",
    thumbnail: "🔄",
    comicFrames: ["🔄", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "このたびの人事異動に伴い、〇〇部へ異動することとなりました。大変お世話になりました。",
        pronunciation: "このたびのじんじいどうにともない、〇〇ぶへいどうすることとなりました。たいへんおせわになりました。",
        translation: "이번 인사 이동으로 〇〇부로 이동하게 되었습니다. 정말 신세를 많이 졌습니다.",
      },
      {
        speaker: "곰 동료",
        text: "新しい部署でもご活躍ください。",
        pronunciation: "あたらしいぶしょでもごかつやくください。",
        translation: "새 부서에서도 활약해 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜に伴い",
        explanation: "「〜에 따라」라는 뜻의 격식 표현. 공식 발표나 비즈니스 문서에서 자주 씁니다.",
      },
    ],
    vocab: [
      { word: "人事異動", meaning: "인사 이동" },
      { word: "〜に伴い", meaning: "〜에 따라, 〜로 인해 (격식)" },
      { word: "異動する", meaning: "이동하다, 전보되다" },
    ],
    quiz: [
      {
        question: "공식 발표에서 '〜에 따라'의 격식 표현은?",
        options: ["〜で", "〜に伴い", "〜について", "〜のために"],
        answer: "〜に伴い",
      },
    ],
  },
  {
    id: "feedback-request",
    title: "업무 피드백 요청",
    category: "business",
    thumbnail: "💬",
    comicFrames: ["💬", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先ほどの資料についてご意見をいただけますでしょうか。",
        pronunciation: "さきほどのしりょうについてごいけんをいただけますでしょうか。",
        translation: "방금 전 자료에 대해 의견을 주시겠습니까?",
      },
      {
        speaker: "곰 선배",
        text: "全体的に良いですが、3ページ目の図をもう少し整理してはいかがでしょう。",
        pronunciation: "ぜんたいてきによいですが、さんぺーじめのずをもうすこしせいりしてはいかがでしょう。",
        translation: "전반적으로 좋은데, 3페이지 도표를 좀 더 정리해 보는 건 어떨까요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご意見をいただく",
        explanation: "상대방의 의견을 요청하는 격식 있는 표현입니다.",
      },
    ],
    vocab: [
      { word: "先ほど", meaning: "방금 전 (격식)" },
      { word: "ご意見", meaning: "의견 (경어)" },
      { word: "全体的に", meaning: "전반적으로" },
    ],
    quiz: [
      {
        question: "'방금 전'을 격식 있게 말하면?",
        options: ["さっき", "先ほど", "前", "ちょっと前"],
        answer: "先ほど",
      },
    ],
  },
  {
    id: "seminar-application",
    title: "세미나 참가 신청",
    category: "business",
    thumbnail: "🎓",
    comicFrames: ["🎓", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "来月のセミナーに参加させていただきたいのですが、申し込み方法をお教えいただけますか？",
        pronunciation: "らいげつのセミナーにさんかさせていただきたいのですが、もうしこみほうほうをおしえいただけますか？",
        translation: "다음 달 세미나에 참가하고 싶은데요, 신청 방법을 알려 주시겠습니까?",
      },
      {
        speaker: "담당 곰",
        text: "こちらのフォームにご記入の上、メールにてお送りください。",
        pronunciation: "こちらのフォームにごきにゅうのうえ、メールにておくりください。",
        translation: "이 양식에 기재하신 후, 이메일로 보내 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜にて",
        explanation: "「〜で」의 격식 표현. 공문서나 격식 있는 안내에서 방법·수단을 나타낼 때 씁니다.",
      },
    ],
    vocab: [
      { word: "参加させていただく", meaning: "참가하다 (겸양)" },
      { word: "申し込み方法", meaning: "신청 방법" },
      { word: "〜にて", meaning: "〜로, 〜에서 (격식)" },
    ],
    quiz: [
      {
        question: "격식 있는 문서에서 '이메일로'를 표현하면?",
        options: ["メールで", "メールにて", "メールから", "メールを"],
        answer: "メールにて",
      },
    ],
  },
  {
    id: "urgent-request",
    title: "긴급 업무 요청",
    category: "business",
    thumbnail: "⚡",
    comicFrames: ["⚡", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 부장",
        text: "急なお願いで大変恐縮ですが、本日中にご対応いただくことは可能でしょうか。",
        pronunciation: "きゅうなおねがいでたいへんきょうしゅくですが、ほんじつちゅうにごたいおういただくことはかのうでしょうか。",
        translation: "갑작스러운 부탁으로 대단히 죄송합니다만, 오늘 중으로 대응해 주시는 게 가능할까요?",
      },
      {
        speaker: "토끼",
        text: "はい、最優先で対応いたします。",
        pronunciation: "はい、さいゆうせんでたいおういたします。",
        translation: "네, 최우선으로 대응하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "大変恐縮ですが",
        explanation: "상대방에게 폐를 끼칠 때 쓰는 격식 있는 사죄 표현. 「すみませんが」보다 훨씬 정중합니다.",
      },
    ],
    vocab: [
      { word: "大変恐縮ですが", meaning: "대단히 죄송합니다만" },
      { word: "本日中に", meaning: "오늘 중으로" },
      { word: "最優先で", meaning: "최우선으로" },
    ],
    quiz: [
      {
        question: "폐를 끼치는 부탁 앞에 쓰는 격식 표현은?",
        options: ["すみませんが", "大変恐縮ですが", "ごめんなさい", "失礼ですが"],
        answer: "大変恐縮ですが",
      },
    ],
  },
  {
    id: "project-proposal",
    title: "기획안 제출",
    category: "business",
    thumbnail: "💡",
    comicFrames: ["💡", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "新企画のご提案資料をお持ちしました。ご一読いただけますでしょうか。",
        pronunciation: "しんきかくのごていあんしりょうをおもちしました。ごいちどくいただけますでしょうか。",
        translation: "새 기획 제안 자료를 가져왔습니다. 한 번 읽어봐 주시겠습니까?",
      },
      {
        speaker: "곰 임원",
        text: "ありがとう。後ほど目を通しておきます。",
        pronunciation: "ありがとう。のちほどめをとおしておきます。",
        translation: "고마워요. 나중에 훑어볼게요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご一読いただく",
        explanation: "읽어달라는 정중한 요청 표현. 「読んでください」보다 훨씬 격식 있습니다.",
      },
    ],
    vocab: [
      { word: "ご提案", meaning: "제안 (경어)" },
      { word: "ご一読", meaning: "일독, 한 번 읽기 (경어)" },
      { word: "後ほど", meaning: "나중에 (격식)" },
    ],
    quiz: [
      {
        question: "'나중에'를 격식 있게 말하면?",
        options: ["あとで", "後ほど", "そのうち", "いつか"],
        answer: "後ほど",
      },
    ],
  },
  {
    id: "apology-mistake",
    title: "업무 실수 사과",
    category: "business",
    thumbnail: "😓",
    comicFrames: ["😓", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先ほどのメールに誤りがございました。ご迷惑をおかけし、深くお詫び申し上げます。",
        pronunciation: "さきほどのメールにあやまりがございました。ごめいわくをおかけし、ふかくおわびもうしあげます。",
        translation: "방금 전 이메일에 오류가 있었습니다. 폐를 끼쳐서 깊이 사과드립니다.",
      },
      {
        speaker: "곰",
        text: "確認しました。次回からお気をつけください。",
        pronunciation: "かくにんしました。じかいからおきをつけください。",
        translation: "확인했습니다. 다음부터 조심해 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "深くお詫び申し上げます",
        explanation: "「ごめんなさい」의 최고 격식 사과 표현. 비즈니스 실수나 공식 사과에서 씁니다.",
      },
    ],
    vocab: [
      { word: "誤り", meaning: "오류, 실수" },
      { word: "ご迷惑をおかけする", meaning: "폐를 끼치다" },
      { word: "深くお詫び申し上げます", meaning: "깊이 사과드립니다" },
    ],
    quiz: [
      {
        question: "비즈니스에서 가장 격식 있는 사과 표현은?",
        options: ["ごめんなさい", "すみません", "深くお詫び申し上げます", "失礼しました"],
        answer: "深くお詫び申し上げます",
      },
    ],
  },
  {
    id: "recommendation-letter",
    title: "추천서 의뢰",
    category: "business",
    thumbnail: "📜",
    comicFrames: ["📜", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "誠に恐れ入りますが、推薦状をお書きいただけないでしょうか。",
        pronunciation: "まことにおそれいりますが、すいせんじょうをおかきいただけないでしょうか。",
        translation: "대단히 죄송합니다만, 추천서를 써 주시겠습니까?",
      },
      {
        speaker: "선생님 곰",
        text: "もちろんです。必要な情報をメールでお送りください。",
        pronunciation: "もちろんです。ひつようなじょうほうをメールでおくりください。",
        translation: "물론이죠. 필요한 정보를 이메일로 보내 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜をお書きいただけないでしょうか",
        explanation: "매우 어려운 부탁을 할 때 쓰는 최고 격식 표현입니다.",
      },
    ],
    vocab: [
      { word: "推薦状", meaning: "추천서" },
      { word: "誠に恐れ入りますが", meaning: "대단히 죄송합니다만 (최고 격식)" },
      { word: "必要な情報", meaning: "필요한 정보" },
    ],
    quiz: [
      {
        question: "매우 어려운 부탁의 최고 격식 형태는?",
        options: ["〜してください", "〜してもらえますか", "〜をお書きいただけないでしょうか", "〜してよ"],
        answer: "〜をお書きいただけないでしょうか",
      },
    ],
  },
  {
    id: "client-feedback",
    title: "거래처 피드백 응대",
    category: "business",
    thumbnail: "📣",
    comicFrames: ["📣", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 (고객)",
        text: "先日のプレゼンについてフィードバックをさせていただきたいのですが。",
        pronunciation: "せんじつのプレゼンについてフィードバックをさせていただきたいのですが。",
        translation: "지난번 발표에 대해 피드백을 드리고 싶은데요.",
      },
      {
        speaker: "토끼",
        text: "貴重なご意見をいただき、誠にありがとうございます。",
        pronunciation: "きちょうなごいけんをいただき、まことにありがとうございます。",
        translation: "귀중한 의견을 주셔서 진심으로 감사합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "貴重なご意見をいただく",
        explanation: "상대방의 피드백에 감사를 표하는 격식 표현. 비판적인 내용도 감사히 받을 때 씁니다.",
      },
    ],
    vocab: [
      { word: "フィードバック", meaning: "피드백" },
      { word: "貴重な", meaning: "귀중한" },
      { word: "ご意見", meaning: "의견 (경어)" },
    ],
    quiz: [
      {
        question: "피드백에 감사할 때 '귀중한 의견'의 경어 표현은?",
        options: ["意見をありがとう", "貴重なご意見をいただき", "フィードバックありがとう", "意見くれた"],
        answer: "貴重なご意見をいただき",
      },
    ],
  },
  {
    id: "team-dinner",
    title: "팀 회식 제안",
    category: "business",
    thumbnail: "🍻",
    comicFrames: ["🍻", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 부장",
        text: "今週の金曜日、皆さんで食事でもいかがでしょうか。",
        pronunciation: "こんしゅうのきんようび、みなさんでしょくじでもいかがでしょうか。",
        translation: "이번 주 금요일, 모두 함께 식사라도 어떻겠습니까?",
      },
      {
        speaker: "토끼",
        text: "ぜひ、よろこんで参ります。",
        pronunciation: "ぜひ、よろこんでまいります。",
        translation: "꼭, 기꺼이 가겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "よろこんで参ります",
        explanation: "초대나 제안을 기쁘게 수락할 때 쓰는 겸양 표현. 「行きます」의 격식 버전입니다.",
      },
    ],
    vocab: [
      { word: "いかがでしょうか", meaning: "어떠십니까?" },
      { word: "よろこんで", meaning: "기꺼이" },
      { word: "参ります", meaning: "가겠습니다 (겸양)" },
    ],
    quiz: [
      {
        question: "초대를 기쁘게 수락하는 겸양 표현은?",
        options: ["行きます", "行ける", "よろこんで参ります", "いいよ"],
        answer: "よろこんで参ります",
      },
    ],
  },
  {
    id: "contract-renewal",
    title: "계약 갱신 협의",
    category: "business",
    thumbnail: "🔁",
    comicFrames: ["🔁", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "契約期間が来月で満了となりますが、ご継続いただけますでしょうか。",
        pronunciation: "けいやくきかんがらいげつでまんりょうとなりますが、ごけいぞくいただけますでしょうか。",
        translation: "계약 기간이 다음 달로 만료됩니다만, 갱신해 주시겠습니까?",
      },
      {
        speaker: "곰 담당자",
        text: "条件を確認の上、ご返答いたします。",
        pronunciation: "じょうけんをかくにんのうえ、ごへんとうします。",
        translation: "조건을 확인한 후, 답변 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜となりますが",
        explanation: "상황을 정중하게 설명하는 격식 표현. 직접적인 「〜です」보다 부드럽게 사실을 전달합니다.",
      },
    ],
    vocab: [
      { word: "契約期間", meaning: "계약 기간" },
      { word: "満了", meaning: "만료" },
      { word: "ご継続", meaning: "갱신, 계속 (경어)" },
    ],
    quiz: [
      {
        question: "계약 갱신을 경어로 말하면?",
        options: ["続けてください", "ご継続いただけますでしょうか", "更新して", "延長する？"],
        answer: "ご継続いただけますでしょうか",
      },
    ],
  },
  {
    id: "internal-announcement",
    title: "사내 공지 전달",
    category: "business",
    thumbnail: "📢",
    comicFrames: ["📢", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "곰 부장",
        text: "社内の皆様にご連絡申し上げます。来週より新しいシステムを導入いたします。",
        pronunciation: "しゃないのみなさまにごれんらくもうしあげます。らいしゅうよりあたらしいシステムをどうにゅういたします。",
        translation: "사내 여러분께 공지 드립니다. 다음 주부터 새 시스템을 도입하겠습니다.",
      },
      {
        speaker: "토끼",
        text: "ご連絡ありがとうございます。準備いたします。",
        pronunciation: "ごれんらくありがとうございます。じゅんびいたします。",
        translation: "공지 감사합니다. 준비하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご連絡申し上げます",
        explanation: "공식 공지나 통보의 시작 표현. 사내·공문서에서 많이 씁니다.",
      },
    ],
    vocab: [
      { word: "社内の皆様", meaning: "사내 여러분" },
      { word: "ご連絡申し上げます", meaning: "공지 드립니다 (최고 격식)" },
      { word: "導入いたします", meaning: "도입하겠습니다" },
    ],
    quiz: [
      {
        question: "사내 공지를 시작할 때 쓰는 격식 표현은?",
        options: ["知らせます", "ご連絡申し上げます", "お知らせします", "言います"],
        answer: "ご連絡申し上げます",
      },
    ],
  },
  // ── HOSPITALITY (22 new) ─────────────────────────────────────
  {
    id: "post-office",
    title: "우체국에서 소포 보내기",
    category: "hospitality",
    thumbnail: "📮",
    comicFrames: ["📮", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "この荷物を速達でお送りしたいのですが、料金はおいくらでしょうか？",
        pronunciation: "このにもつをそくたつでおくりしたいのですが、りょうきんはおいくらでしょうか？",
        translation: "이 짐을 속달로 보내고 싶은데요, 요금은 얼마인가요?",
      },
      {
        speaker: "직원 곰",
        text: "重さを量ってからご案内いたします。こちらにお置きください。",
        pronunciation: "おもさをはかってからごあんないいたします。こちらにおおきください。",
        translation: "무게를 재고 나서 안내해 드리겠습니다. 여기에 올려 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "おいくらでしょうか",
        explanation: "「いくらですか」의 경어 표현. 가격을 물을 때 더 정중하게 표현합니다.",
      },
    ],
    vocab: [
      { word: "速達", meaning: "속달" },
      { word: "おいくら", meaning: "얼마 (경어)" },
      { word: "ご案内いたします", meaning: "안내해 드리겠습니다" },
    ],
    quiz: [
      {
        question: "가격을 정중하게 물을 때?",
        options: ["いくら？", "おいくらでしょうか", "何円？", "値段は？"],
        answer: "おいくらでしょうか",
      },
    ],
  },
  {
    id: "airport-checkin",
    title: "공항 체크인",
    category: "hospitality",
    thumbnail: "✈️",
    comicFrames: ["✈️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "직원 곰",
        text: "パスポートとご予約番号をお見せいただけますでしょうか。",
        pronunciation: "パスポートとごよやくばんごうをおみせいただけますでしょうか。",
        translation: "여권과 예약 번호를 보여 주시겠습니까?",
      },
      {
        speaker: "토끼",
        text: "はい、こちらでございます。窓側の席をご用意いただけますか？",
        pronunciation: "はい、こちらでございます。まどがわのせきをごようういただけますか？",
        translation: "네, 여기 있습니다. 창가 자리를 준비해 주시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "ご用意いただく",
        explanation: "준비해달라고 요청하는 정중한 표현. 「準備してください」보다 격식 있습니다.",
      },
    ],
    vocab: [
      { word: "ご予約番号", meaning: "예약 번호 (경어)" },
      { word: "窓側", meaning: "창가 쪽" },
      { word: "ご用意いただく", meaning: "준비해 주시다 (겸양)" },
    ],
    quiz: [
      {
        question: "공항에서 '창가 자리를 준비해 주세요'의 경어 표현은?",
        options: ["窓側の席を準備して", "窓側の席をご用意いただけますか", "窓側にして", "窓席くれる？"],
        answer: "窓側の席をご用意いただけますか",
      },
    ],
  },
  {
    id: "pharmacy",
    title: "약국에서 약 받기",
    category: "hospitality",
    thumbnail: "💊",
    comicFrames: ["💊", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "약사 곰",
        text: "こちらが処方されたお薬でございます。1日3回、食後にお飲みください。",
        pronunciation: "こちらがしょほうされたおくすりでございます。いちにちさんかい、しょくごにおのみください。",
        translation: "이것이 처방된 약입니다. 하루 3번, 식후에 드세요.",
      },
      {
        speaker: "토끼",
        text: "ありがとうございます。副作用はございますか？",
        pronunciation: "ありがとうございます。ふくさようはございますか？",
        translation: "감사합니다. 부작용은 있습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜でございます",
        explanation: "서비스업에서 정보를 안내할 때 쓰는 격식 표현입니다.",
      },
    ],
    vocab: [
      { word: "処方された", meaning: "처방된" },
      { word: "お薬", meaning: "약 (경어)" },
      { word: "副作用", meaning: "부작용" },
    ],
    quiz: [
      {
        question: "약국에서 '약'을 경어로 말하면?",
        options: ["薬", "お薬", "くすり", "医薬品"],
        answer: "お薬",
      },
    ],
  },
  {
    id: "travel-agency",
    title: "여행사에서 상담",
    category: "hospitality",
    thumbnail: "🗺️",
    comicFrames: ["🗺️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "직원 곰",
        text: "ご旅行のご希望をお聞かせいただけますか？",
        pronunciation: "ごりょこうのごきぼうをおきかせいただけますか？",
        translation: "여행 희망 사항을 말씀해 주시겠습니까?",
      },
      {
        speaker: "토끼",
        text: "来月、北海道へ3泊4日で行きたいと思っております。",
        pronunciation: "らいげつ、ほっかいどうへさんぱくよっかでいきたいとおもっております。",
        translation: "다음 달, 홋카이도로 3박 4일 여행을 가고 싶습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜と思っております",
        explanation: "「思っています」의 겸양 표현. 자신의 희망이나 계획을 정중하게 전달합니다.",
      },
    ],
    vocab: [
      { word: "ご希望", meaning: "희망, 요구 (경어)" },
      { word: "お聞かせいただく", meaning: "말씀해 주시다 (겸양)" },
      { word: "〜と思っております", meaning: "〜라고 생각합니다 (겸양)" },
    ],
    quiz: [
      {
        question: "자신의 희망을 정중하게 말하면?",
        options: ["〜したい", "〜と思います", "〜と思っております", "〜したいです"],
        answer: "〜と思っております",
      },
    ],
  },
  {
    id: "car-rental",
    title: "렌터카 예약",
    category: "hospitality",
    thumbnail: "🚗",
    comicFrames: ["🚗", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "来週の土曜日から2日間、普通車を1台ご予約したいのですが。",
        pronunciation: "らいしゅうのどようびからふつかかん、ふつうしゃをいちだいごよやくしたいのですが。",
        translation: "다음 주 토요일부터 2일간 일반 승용차 1대를 예약하고 싶은데요.",
      },
      {
        speaker: "직원 곰",
        text: "かしこまりました。免許証をご提示いただけますでしょうか。",
        pronunciation: "かしこまりました。めんきょしょうをごていじいただけますでしょうか。",
        translation: "알겠습니다. 운전면허증을 제시해 주시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "ご提示いただく",
        explanation: "서류나 증명서를 보여달라고 요청하는 격식 표현입니다.",
      },
    ],
    vocab: [
      { word: "普通車", meaning: "일반 승용차" },
      { word: "免許証", meaning: "운전면허증" },
      { word: "ご提示いただく", meaning: "제시해 주시다 (겸양)" },
    ],
    quiz: [
      {
        question: "면허증을 보여달라고 경어로 말하면?",
        options: ["見せて", "免許証を出して", "免許証をご提示いただけますでしょうか", "免許ある？"],
        answer: "免許証をご提示いただけますでしょうか",
      },
    ],
  },
  {
    id: "train-seat",
    title: "기차 좌석 변경 요청",
    category: "hospitality",
    thumbnail: "🚄",
    comicFrames: ["🚄", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "恐れ入りますが、こちらの席は私の予約席でございまして…",
        pronunciation: "おそれいりますが、こちらのせきはわたしのよやくせきでございまして…",
        translation: "죄송합니다만, 이 자리가 제 예약 좌석인데요...",
      },
      {
        speaker: "곰",
        text: "申し訳ございません。すぐに移動いたします。",
        pronunciation: "もうしわけございません。すぐにいどういたします。",
        translation: "죄송합니다. 바로 이동하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜でございまして",
        explanation: "「〜で」의 격식 표현에 설명을 이어갈 때 쓰는 형태. 부드럽게 상황을 설명합니다.",
      },
    ],
    vocab: [
      { word: "予約席", meaning: "예약 좌석" },
      { word: "移動いたします", meaning: "이동하겠습니다 (겸양)" },
      { word: "申し訳ございません", meaning: "죄송합니다 (최고 격식)" },
    ],
    quiz: [
      {
        question: "기차에서 예약 좌석임을 정중하게 알릴 때?",
        options: ["私の席です", "こちらは私の予約席でございます", "どいて", "席を間違えた"],
        answer: "こちらは私の予約席でございます",
      },
    ],
  },
  {
    id: "spa-reservation",
    title: "스파·온천 예약",
    category: "hospitality",
    thumbnail: "♨️",
    comicFrames: ["♨️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "직원 곰",
        text: "ご利用のコースをお選びいただけますでしょうか。",
        pronunciation: "ごりようのコースをおえらびいただけますでしょうか。",
        translation: "이용하실 코스를 선택해 주시겠습니까?",
      },
      {
        speaker: "토끼",
        text: "アロマオイルマッサージの60分コースをお願いいたします。",
        pronunciation: "アロマオイルマッサージのろくじゅっぷんコースをおねがいいたします。",
        translation: "아로마 오일 마사지 60분 코스로 부탁드립니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お選びいただく",
        explanation: "고객에게 선택을 요청하는 격식 있는 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご利用", meaning: "이용 (경어)" },
      { word: "お選びいただく", meaning: "선택해 주시다 (겸양)" },
      { word: "〜コース", meaning: "〜코스" },
    ],
    quiz: [
      {
        question: "서비스업에서 '선택해 주세요'를 경어로 말하면?",
        options: ["選んで", "お選びいただけますでしょうか", "選択して", "どれにする？"],
        answer: "お選びいただけますでしょうか",
      },
    ],
  },
  {
    id: "gym-registration",
    title: "헬스장 등록",
    category: "hospitality",
    thumbnail: "🏋️",
    comicFrames: ["🏋️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "직원 곰",
        text: "入会をご希望でしょうか。ご入会の流れをご説明いたします。",
        pronunciation: "にゅうかいをごきぼうでしょうか。ごにゅうかいのながれをごせつめいいたします。",
        translation: "가입을 원하시나요? 가입 절차를 설명해 드리겠습니다.",
      },
      {
        speaker: "토끼",
        text: "はい、月額プランについてお聞きしたいのですが。",
        pronunciation: "はい、げつがくプランについておききしたいのですが。",
        translation: "네, 월정액 플랜에 대해 여쭤보고 싶은데요.",
      },
    ],
    grammarPoints: [
      {
        rule: "お聞きしたい",
        explanation: "「聞きたい」의 겸양 표현. 직원에게 질문할 때 쓰는 정중한 형태입니다.",
      },
    ],
    vocab: [
      { word: "入会", meaning: "가입, 입회" },
      { word: "ご説明いたします", meaning: "설명해 드리겠습니다" },
      { word: "月額プラン", meaning: "월정액 플랜" },
    ],
    quiz: [
      {
        question: "직원에게 '여쭤보고 싶은데요'를 겸양으로 말하면?",
        options: ["聞きたい", "お聞きしたいのですが", "質問があります", "教えて"],
        answer: "お聞きしたいのですが",
      },
    ],
  },
  {
    id: "gift-shop",
    title: "선물 포장 요청",
    category: "hospitality",
    thumbnail: "🎀",
    comicFrames: ["🎀", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "こちらをギフト用に包んでいただけますでしょうか。のし紙もお願いします。",
        pronunciation: "こちらをギフトようにつつんでいただけますでしょうか。のしがみもおねがいします。",
        translation: "이것을 선물용으로 포장해 주시겠습니까? 노시 종이도 부탁드립니다.",
      },
      {
        speaker: "직원 곰",
        text: "かしこまりました。お名前はどのようにお書きいたしましょうか。",
        pronunciation: "かしこまりました。おなまえはどのようにおかきいたしましょうか。",
        translation: "알겠습니다. 성함은 어떻게 써 드릴까요?",
      },
    ],
    grammarPoints: [
      {
        rule: "のし紙",
        explanation: "일본 선물에 붙이는 공식 포장지. 경조사에 따라 다른 종류를 사용합니다.",
      },
    ],
    vocab: [
      { word: "ギフト用", meaning: "선물용" },
      { word: "のし紙", meaning: "노시 종이 (선물 포장지)" },
      { word: "包んでいただく", meaning: "포장해 주시다 (겸양)" },
    ],
    quiz: [
      {
        question: "일본 선물에 붙이는 공식 포장지는?",
        options: ["リボン", "のし紙", "包装紙", "シール"],
        answer: "のし紙",
      },
    ],
  },
  {
    id: "clothing-alteration",
    title: "옷 수선 의뢰",
    category: "hospitality",
    thumbnail: "✂️",
    comicFrames: ["✂️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "このスカートのウエストを少し詰めていただくことはできますか？",
        pronunciation: "このスカートのウエストをすこしつめていただくことはできますか？",
        translation: "이 스커트 허리를 조금 줄여 주실 수 있나요?",
      },
      {
        speaker: "재단사 곰",
        text: "かしこまりました。1週間ほどお時間をいただきます。",
        pronunciation: "かしこまりました。いっしゅうかんほどおじかんをいただきます。",
        translation: "알겠습니다. 약 1주일의 시간이 필요합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お時間をいただきます",
        explanation: "작업에 시간이 걸린다는 것을 정중하게 알리는 표현입니다.",
      },
    ],
    vocab: [
      { word: "詰める", meaning: "줄이다, 좁히다" },
      { word: "〜ほど", meaning: "약 〜, 〜정도" },
      { word: "お時間をいただく", meaning: "시간이 필요하다 (겸양)" },
    ],
    quiz: [
      {
        question: "작업 시간이 필요하다고 정중하게 말하면?",
        options: ["時間がかかる", "お時間をいただきます", "待ってください", "1週間かかる"],
        answer: "お時間をいただきます",
      },
    ],
  },
  {
    id: "library-inquiry",
    title: "도서관 문의",
    category: "hospitality",
    thumbnail: "📚",
    comicFrames: ["📚", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "恐れ入りますが、この本を延長できますでしょうか。",
        pronunciation: "おそれいりますが、このほんをえんちょうできますでしょうか。",
        translation: "죄송합니다만, 이 책을 연장할 수 있을까요?",
      },
      {
        speaker: "사서 곰",
        text: "はい、貸出カードをお見せいただけますか。2週間の延長が可能でございます。",
        pronunciation: "はい、かしだしカードをおみせいただけますか。にしゅうかんのえんちょうがかのうでございます。",
        translation: "네, 대출 카드를 보여 주시겠습니까? 2주 연장이 가능합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜が可能でございます",
        explanation: "가능 여부를 안내하는 격식 표현. 「できます」보다 더 공식적인 응대에 씁니다.",
      },
    ],
    vocab: [
      { word: "延長する", meaning: "연장하다" },
      { word: "貸出カード", meaning: "대출 카드" },
      { word: "〜が可能でございます", meaning: "〜이 가능합니다 (격식)" },
    ],
    quiz: [
      {
        question: "가능 여부를 격식 있게 안내할 때?",
        options: ["できます", "可能です", "〜が可能でございます", "いいです"],
        answer: "〜が可能でございます",
      },
    ],
  },
  {
    id: "art-gallery",
    title: "미술관에서 안내",
    category: "hospitality",
    thumbnail: "🎨",
    comicFrames: ["🎨", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "안내원 곰",
        text: "館内では写真撮影はご遠慮いただいております。",
        pronunciation: "かんないではしゃしんさつえいはごえんりょいただいております。",
        translation: "관내에서는 사진 촬영을 삼가 주시기 바랍니다.",
      },
      {
        speaker: "토끼",
        text: "承知いたしました。フラッシュなしならよろしいでしょうか？",
        pronunciation: "しょうちいたしました。フラッシュなしならよろしいでしょうか？",
        translation: "알겠습니다. 플래시 없이는 괜찮을까요?",
      },
    ],
    grammarPoints: [
      {
        rule: "ご遠慮いただいております",
        explanation: "금지를 직접적으로 말하지 않고 정중하게 삼가 달라는 표현입니다.",
      },
    ],
    vocab: [
      { word: "館内", meaning: "관내" },
      { word: "ご遠慮いただく", meaning: "삼가 주시다 (정중한 금지)" },
      { word: "フラッシュ", meaning: "플래시" },
    ],
    quiz: [
      {
        question: "금지를 정중하게 표현할 때?",
        options: ["禁止です", "ダメです", "ご遠慮いただいております", "しないでください"],
        answer: "ご遠慮いただいております",
      },
    ],
  },
  {
    id: "cinema-ticket",
    title: "영화 티켓 예약",
    category: "hospitality",
    thumbnail: "🎬",
    comicFrames: ["🎬", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "本日の18時の回を大人2枚お願いできますか。",
        pronunciation: "ほんじつのじゅうはちじのかいをおとなにまいおねがいできますか。",
        translation: "오늘 18시 회차 성인 2장 부탁드릴 수 있을까요?",
      },
      {
        speaker: "매표원 곰",
        text: "かしこまりました。お席はお選びいただけます。",
        pronunciation: "かしこまりました。おせきはおえらびいただけます。",
        translation: "알겠습니다. 좌석을 선택하실 수 있습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜の回",
        explanation: "상영 회차를 나타내는 표현. 「〜時の回」로 특정 시간대를 지정합니다.",
      },
    ],
    vocab: [
      { word: "〜の回", meaning: "〜의 회차" },
      { word: "大人", meaning: "성인" },
      { word: "お席をお選びいただける", meaning: "좌석을 선택하실 수 있다 (경어)" },
    ],
    quiz: [
      {
        question: "18시 영화를 예약할 때?",
        options: ["18時の映画を2枚", "本日の18時の回を大人2枚お願いできますか", "18時に2人", "夕方の映画"],
        answer: "本日の18時の回を大人2枚お願いできますか",
      },
    ],
  },
  {
    id: "flower-shop",
    title: "꽃집에서 주문",
    category: "hospitality",
    thumbnail: "💐",
    comicFrames: ["💐", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "お見舞い用のお花を見繕っていただけますか？予算は3000円ほどで。",
        pronunciation: "おみまいようのおはなをみつくろっていただけますか？よさんはさんぜんえんほどで。",
        translation: "병문안용 꽃을 골라 주시겠습니까? 예산은 3000엔 정도로요.",
      },
      {
        speaker: "점원 곰",
        text: "かしこまりました。白い菊はいかがでしょうか。",
        pronunciation: "かしこまりました。しろいきくはいかがでしょうか。",
        translation: "알겠습니다. 흰 국화는 어떠십니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "見繕っていただく",
        explanation: "적당한 것을 골라달라고 부탁하는 표현. 전문가에게 선택을 맡길 때 씁니다.",
      },
    ],
    vocab: [
      { word: "お見舞い", meaning: "병문안" },
      { word: "見繕う", meaning: "적당히 골라주다" },
      { word: "予算", meaning: "예산" },
    ],
    quiz: [
      {
        question: "전문가에게 적당한 것을 골라달라고 할 때?",
        options: ["選んで", "見繕っていただけますか", "決めて", "おすすめは？"],
        answer: "見繕っていただけますか",
      },
    ],
  },
  {
    id: "food-allergy",
    title: "음식 알레르기 문의",
    category: "hospitality",
    thumbnail: "🥜",
    comicFrames: ["🥜", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "恐れ入りますが、このメニューにナッツ類は含まれておりますでしょうか。",
        pronunciation: "おそれいりますが、このメニューにナッツるいはふくまれておりますでしょうか。",
        translation: "죄송합니다만, 이 메뉴에 견과류가 포함되어 있나요?",
      },
      {
        speaker: "점원 곰",
        text: "少々お待ちください。ただいまシェフに確認いたします。",
        pronunciation: "しょうしょうおまちください。ただいまシェフにかくにんいたします。",
        translation: "잠시만 기다려 주세요. 지금 셰프에게 확인해 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜に含まれておりますでしょうか",
        explanation: "성분 포함 여부를 정중하게 문의하는 표현입니다.",
      },
    ],
    vocab: [
      { word: "ナッツ類", meaning: "견과류" },
      { word: "含まれる", meaning: "포함되다" },
      { word: "ただいま", meaning: "지금 바로 (격식)" },
    ],
    quiz: [
      {
        question: "'지금 바로'를 격식 있게 말하면?",
        options: ["今すぐ", "ただいま", "すぐに", "もうすぐ"],
        answer: "ただいま",
      },
    ],
  },
  {
    id: "hotel-complaint",
    title: "호텔 불편 사항 접수",
    category: "hospitality",
    thumbnail: "🏨",
    comicFrames: ["🏨", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "大変恐縮ですが、隣の部屋の騒音が気になっております。",
        pronunciation: "たいへんきょうしゅくですが、となりのへやのそうおんがきになっております。",
        translation: "대단히 죄송합니다만, 옆 방 소음이 신경 쓰입니다.",
      },
      {
        speaker: "직원 곰",
        text: "ご不便をおかけして誠に申し訳ございません。すぐに対応いたします。",
        pronunciation: "ごふべんをおかけしてまことにもうしわけございません。すぐにたいおういたします。",
        translation: "불편을 드려서 진심으로 죄송합니다. 바로 대응하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご不便をおかけして",
        explanation: "고객에게 불편을 끼쳤을 때 쓰는 격식 있는 사죄 표현입니다.",
      },
    ],
    vocab: [
      { word: "騒音", meaning: "소음" },
      { word: "気になる", meaning: "신경 쓰이다" },
      { word: "ご不便をおかけする", meaning: "불편을 끼치다 (경어)" },
    ],
    quiz: [
      {
        question: "호텔에서 불편에 사과할 때 격식 표현은?",
        options: ["ごめんなさい", "ご不便をおかけして誠に申し訳ございません", "すみません", "失礼しました"],
        answer: "ご不便をおかけして誠に申し訳ございません",
      },
    ],
  },
  {
    id: "tour-guide",
    title: "관광 안내 받기",
    category: "hospitality",
    thumbnail: "🗼",
    comicFrames: ["🗼", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "가이드 곰",
        text: "本日は東京の名所をご案内いたします。ご不明な点はお気軽にお申し付けください。",
        pronunciation: "ほんじつはとうきょうのめいしょをごあんないいたします。ごふめいなてんはおきがるにおもうしつけください。",
        translation: "오늘은 도쿄 명소를 안내해 드리겠습니다. 궁금한 점은 편하게 말씀해 주세요.",
      },
      {
        speaker: "토끼",
        text: "よろしくお願いいたします。写真を撮っていただけますか？",
        pronunciation: "よろしくおねがいいたします。しゃしんをとっていただけますか？",
        translation: "잘 부탁드립니다. 사진을 찍어 주시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "お気軽にお申し付けください",
        explanation: "편하게 요청해달라는 의미의 서비스 표현. 「なんでも言ってください」보다 격식 있습니다.",
      },
    ],
    vocab: [
      { word: "名所", meaning: "명소" },
      { word: "ご不明な点", meaning: "궁금한 점 (경어)" },
      { word: "お申し付けください", meaning: "말씀해 주세요 (경어)" },
    ],
    quiz: [
      {
        question: "편하게 요청해달라는 격식 있는 표현은?",
        options: ["言ってください", "お申し付けください", "頼んで", "聞いてください"],
        answer: "お申し付けください",
      },
    ],
  },
  {
    id: "ferry-ticket",
    title: "페리 티켓 구매",
    category: "hospitality",
    thumbnail: "⛴️",
    comicFrames: ["⛴️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "大阪行きのフェリー、本日の出発便を1等客室で1枚お願いいたします。",
        pronunciation: "おおさかゆきのフェリー、ほんじつのしゅっぱつびんをいっとうきゃくしつでいちまいおねがいいたします。",
        translation: "오사카행 페리, 오늘 출발편 1등 객실로 1장 부탁드립니다.",
      },
      {
        speaker: "직원 곰",
        text: "かしこまりました。お支払い方法はいかがなさいますか。",
        pronunciation: "かしこまりました。おしはらいほうほうはいかがなさいますか。",
        translation: "알겠습니다. 결제 방법은 어떻게 하시겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "いかがなさいますか",
        explanation: "「どうしますか」의 최고 격식 존경 표현. 고객의 의사를 물을 때 씁니다.",
      },
    ],
    vocab: [
      { word: "出発便", meaning: "출발편" },
      { word: "1等客室", meaning: "1등 객실" },
      { word: "いかがなさいますか", meaning: "어떻게 하시겠습니까? (존경)" },
    ],
    quiz: [
      {
        question: "고객의 의사를 묻는 최고 격식 표현은?",
        options: ["どうする？", "いかがですか", "いかがなさいますか", "どうしますか"],
        answer: "いかがなさいますか",
      },
    ],
  },
  {
    id: "electronics-repair",
    title: "전자제품 수리 문의",
    category: "hospitality",
    thumbnail: "🔧",
    comicFrames: ["🔧", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "このパソコンの修理をお願いしたいのですが、まず診断していただけますか？",
        pronunciation: "このパソコンのしゅうりをおねがいしたいのですが、まずしんだんしていただけますか？",
        translation: "이 컴퓨터 수리를 부탁드리고 싶은데요, 먼저 진단해 주시겠습니까?",
      },
      {
        speaker: "직원 곰",
        text: "かしこまりました。診断に1時間ほどいただきます。",
        pronunciation: "かしこまりました。しんだんにいちじかんほどいただきます。",
        translation: "알겠습니다. 진단에 약 1시간이 필요합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜に〜ほどいただきます",
        explanation: "작업에 걸리는 시간을 정중하게 전달하는 표현입니다.",
      },
    ],
    vocab: [
      { word: "修理", meaning: "수리" },
      { word: "診断する", meaning: "진단하다" },
      { word: "〜ほど", meaning: "약 〜, 〜정도" },
    ],
    quiz: [
      {
        question: "수리점에서 시간이 걸린다고 정중하게 말하면?",
        options: ["1時間かかる", "1時間ほどいただきます", "待ってください", "後で来て"],
        answer: "1時間ほどいただきます",
      },
    ],
  },
  {
    id: "sports-venue",
    title: "스포츠 시설 예약",
    category: "hospitality",
    thumbnail: "🎾",
    comicFrames: ["🎾", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "来週の土曜日、テニスコートを2時間ご予約したいのですが。",
        pronunciation: "らいしゅうのどようび、テニスコートをにじかんごよやくしたいのですが。",
        translation: "다음 주 토요일, 테니스 코트를 2시간 예약하고 싶은데요.",
      },
      {
        speaker: "직원 곰",
        text: "ご利用の時間帯をお聞かせください。",
        pronunciation: "ごりようのじかんたいをおきかせください。",
        translation: "이용하실 시간대를 말씀해 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご利用の時間帯",
        explanation: "이용 시간대를 묻는 서비스 표현. 「利用時間」보다 「ご利用の時間帯」가 격식 있습니다.",
      },
    ],
    vocab: [
      { word: "テニスコート", meaning: "테니스 코트" },
      { word: "ご利用", meaning: "이용 (경어)" },
      { word: "時間帯", meaning: "시간대" },
    ],
    quiz: [
      {
        question: "이용 시간대를 경어로 묻는 표현은?",
        options: ["何時？", "いつ使う？", "ご利用の時間帯をお聞かせください", "利用時間は？"],
        answer: "ご利用の時間帯をお聞かせください",
      },
    ],
  },
  // ── SOCIAL (23 new) ──────────────────────────────────────────
  {
    id: "graduation-congratulation",
    title: "졸업 축하하기",
    category: "social",
    thumbnail: "🎓",
    comicFrames: ["🎓", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ご卒業おめでとうございます。これからのご活躍を心よりお祈り申し上げます。",
        pronunciation: "ごそつぎょうおめでとうございます。これからのごかつやくをこころよりおいのりもうしあげます。",
        translation: "졸업을 축하드립니다. 앞으로의 활약을 진심으로 기원합니다.",
      },
      {
        speaker: "곰",
        text: "ありがとうございます。これからも精進してまいります。",
        pronunciation: "ありがとうございます。これからもしょうじんしてまいります。",
        translation: "감사합니다. 앞으로도 정진해 나가겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご卒業おめでとうございます",
        explanation: "졸업 축하의 격식 표현. 「卒業」 앞에 「ご」를 붙여 상대방을 높입니다.",
      },
    ],
    vocab: [
      { word: "ご卒業", meaning: "졸업 (경어)" },
      { word: "心より", meaning: "진심으로 (격식)" },
      { word: "精進する", meaning: "정진하다, 노력하다" },
    ],
    quiz: [
      {
        question: "졸업을 축하할 때 격식 있는 표현은?",
        options: ["卒業おめでとう", "ご卒業おめでとうございます", "よかったね", "すごい"],
        answer: "ご卒業おめでとうございます",
      },
    ],
  },
  {
    id: "birthday-greeting",
    title: "생일 축하 인사",
    category: "social",
    thumbnail: "🎂",
    comicFrames: ["🎂", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "お誕生日おめでとうございます。素晴らしい1年となりますようお祈りいたします。",
        pronunciation: "おたんじょうびおめでとうございます。すばらしいいちねんとなりますようおいのりいたします。",
        translation: "생일 축하드립니다. 멋진 한 해가 되시길 기원합니다.",
      },
      {
        speaker: "곰",
        text: "ありがとうございます。お心遣いに感謝いたします。",
        pronunciation: "ありがとうございます。おこころづかいにかんしゃいたします。",
        translation: "감사합니다. 마음 써 주셔서 감사합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お心遣いに感謝いたします",
        explanation: "상대방의 배려에 격식 있게 감사를 표하는 표현입니다.",
      },
    ],
    vocab: [
      { word: "お誕生日", meaning: "생일 (경어)" },
      { word: "素晴らしい", meaning: "훌륭한, 멋진" },
      { word: "お心遣い", meaning: "마음 씀씀이 (경어)" },
    ],
    quiz: [
      {
        question: "생일을 격식 있게 축하할 때?",
        options: ["誕生日おめでとう", "お誕生日おめでとうございます", "ハッピーバースデー", "誕生日だね"],
        answer: "お誕生日おめでとうございます",
      },
    ],
  },
  {
    id: "condolence",
    title: "조문 인사",
    category: "social",
    thumbnail: "🕯️",
    comicFrames: ["🕯️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "このたびはご愁傷様でございます。心よりお悔やみ申し上げます。",
        pronunciation: "このたびはごしゅうしょうさまでございます。こころよりおくやみもうしあげます。",
        translation: "이번에 삼가 조의를 표합니다. 진심으로 애도의 말씀을 드립니다.",
      },
      {
        speaker: "곰",
        text: "ありがとうございます。お越しいただきまして、ありがとうございます。",
        pronunciation: "ありがとうございます。おこしいただきまして、ありがとうございます。",
        translation: "감사합니다. 와 주셔서 감사합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お悔やみ申し上げます",
        explanation: "조문의 최고 격식 표현. 장례식·부고에서만 쓰는 특별한 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご愁傷様でございます", meaning: "삼가 조의를 표합니다" },
      { word: "お悔やみ申し上げます", meaning: "애도의 말씀을 드립니다 (최고 격식)" },
      { word: "心より", meaning: "진심으로" },
    ],
    quiz: [
      {
        question: "조문에서 쓰는 최고 격식 표현은?",
        options: ["かわいそう", "お悔やみ申し上げます", "大変でしたね", "残念です"],
        answer: "お悔やみ申し上げます",
      },
    ],
  },
  {
    id: "hospital-visit",
    title: "문병 인사",
    category: "social",
    thumbnail: "🌸",
    comicFrames: ["🌸", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ご回復をお祈りしております。お体の具合はいかがでしょうか。",
        pronunciation: "ごかいふくをおいのりしております。おからだのぐあいはいかがでしょうか。",
        translation: "쾌유를 기원하고 있습니다. 몸 상태는 어떠십니까?",
      },
      {
        speaker: "곰",
        text: "お気遣いありがとうございます。おかげさまで少しずつよくなっております。",
        pronunciation: "おきづかいありがとうございます。おかげさまですこしずつよくなっております。",
        translation: "마음 써 주셔서 감사합니다. 덕분에 조금씩 좋아지고 있습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "おかげさまで",
        explanation: "상대방의 덕분에 잘 되고 있다는 감사를 담은 격식 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご回復", meaning: "쾌유, 회복 (경어)" },
      { word: "お体の具合", meaning: "몸 상태 (경어)" },
      { word: "おかげさまで", meaning: "덕분에" },
    ],
    quiz: [
      {
        question: "'덕분에'를 격식 있게 말하면?",
        options: ["あなたのおかげで", "おかげさまで", "ありがとうで", "助けてもらって"],
        answer: "おかげさまで",
      },
    ],
  },
  {
    id: "club-application",
    title: "동호회 가입 신청",
    category: "social",
    thumbnail: "🎭",
    comicFrames: ["🎭", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "こちらの書道サークルに入会させていただきたいのですが、よろしいでしょうか。",
        pronunciation: "こちらのしょどうサークルにゅうかいさせていただきたいのですが、よろしいでしょうか。",
        translation: "이 서예 동아리에 입회하고 싶은데요, 괜찮을까요?",
      },
      {
        speaker: "회장 곰",
        text: "ようこそ。まずは見学からいかがでしょうか。",
        pronunciation: "ようこそ。まずはけんがくからいかがでしょうか。",
        translation: "환영합니다. 우선 견학부터 어떻겠습니까?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜させていただきたい",
        explanation: "자신의 희망을 매우 정중하게 전달하는 겸양 표현입니다.",
      },
    ],
    vocab: [
      { word: "書道サークル", meaning: "서예 동아리" },
      { word: "入会する", meaning: "입회하다, 가입하다" },
      { word: "見学", meaning: "견학" },
    ],
    quiz: [
      {
        question: "입회 희망을 겸손하게 전달할 때?",
        options: ["入りたい", "入会したい", "入会させていただきたい", "入れてください"],
        answer: "入会させていただきたい",
      },
    ],
  },
  {
    id: "mentor-request",
    title: "멘토링 요청",
    category: "social",
    thumbnail: "🌟",
    comicFrames: ["🌟", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ご多忙のところ恐れ入りますが、ご指導いただけないでしょうか。",
        pronunciation: "ごたぼうのところおそれいりますが、ごしどういただけないでしょうか。",
        translation: "바쁘신 중에 죄송합니다만, 지도해 주시겠습니까?",
      },
      {
        speaker: "선배 곰",
        text: "もちろんです。何でもお聞きください。",
        pronunciation: "もちろんです。なんでもおききください。",
        translation: "물론이죠. 무엇이든 여쭤보세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご多忙のところ恐れ入りますが",
        explanation: "상대방이 바쁜 상황임을 배려하며 부탁할 때 쓰는 격식 전치 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご多忙", meaning: "바쁘심 (경어)" },
      { word: "ご指導いただく", meaning: "지도해 주시다 (겸양)" },
      { word: "お聞きください", meaning: "여쭤보세요 (경어)" },
    ],
    quiz: [
      {
        question: "바쁜 사람에게 부탁할 때 쓰는 격식 전치 표현은?",
        options: ["忙しいのにすみません", "ご多忙のところ恐れ入りますが", "時間ありますか", "ちょっといい？"],
        answer: "ご多忙のところ恐れ入りますが",
      },
    ],
  },
  {
    id: "tea-ceremony",
    title: "다도 예절",
    category: "social",
    thumbnail: "🍵",
    comicFrames: ["🍵", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "다도 선생님 곰",
        text: "お茶をどうぞ。甘いものとご一緒にお召し上がりください。",
        pronunciation: "おちゃをどうぞ。あまいものとごいっしょにおめしあがりください。",
        translation: "차를 드세요. 단것과 함께 드세요.",
      },
      {
        speaker: "토끼",
        text: "ありがとうございます。お点前頂戴いたします。",
        pronunciation: "ありがとうございます。おてまえちょうだいいたします。",
        translation: "감사합니다. 소중히 받겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お召し上がりください",
        explanation: "「食べてください / 飲んでください」의 존경 표현. 다도나 고급 식당에서 씁니다.",
      },
    ],
    vocab: [
      { word: "お茶", meaning: "차 (경어)" },
      { word: "お召し上がりください", meaning: "드세요 (존경)" },
      { word: "お点前頂戴いたします", meaning: "소중히 받겠습니다 (다도 표현)" },
    ],
    quiz: [
      {
        question: "손님에게 '드세요'를 존경어로 말하면?",
        options: ["食べてください", "飲んでください", "お召し上がりください", "どうぞ"],
        answer: "お召し上がりください",
      },
    ],
  },
  {
    id: "shrine-visit",
    title: "신사 참배 예절",
    category: "social",
    thumbnail: "⛩️",
    comicFrames: ["⛩️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "初詣でお参りに来ました。今年もよい年になりますようにお祈りいたします。",
        pronunciation: "はつもうでにおまいりにきました。ことしもよいとしになりますようにおいのりいたします。",
        translation: "새해 첫 참배를 왔습니다. 올해도 좋은 한 해가 되길 기원합니다.",
      },
      {
        speaker: "신사 직원 곰",
        text: "ようこそいらっしゃいました。お参りの作法をご説明いたします。",
        pronunciation: "ようこそいらっしゃいました。おまいりのさほうをごせつめいいたします。",
        translation: "어서 오셨습니다. 참배 예절을 설명해 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "初詣",
        explanation: "새해 첫 신사·절 참배. 1월 1~3일 사이에 하는 일본의 전통 풍습입니다.",
      },
    ],
    vocab: [
      { word: "初詣", meaning: "새해 첫 참배" },
      { word: "お参り", meaning: "참배" },
      { word: "作法", meaning: "예절, 방식" },
    ],
    quiz: [
      {
        question: "일본의 새해 첫 신사 참배를 뭐라고 하나요?",
        options: ["お参り", "初詣", "神社参拝", "新年祈願"],
        answer: "初詣",
      },
    ],
  },
  {
    id: "seasonal-summer",
    title: "여름 계절 인사",
    category: "social",
    thumbnail: "☀️",
    comicFrames: ["☀️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "暑い日が続いておりますが、お体の具合はいかがでしょうか。",
        pronunciation: "あついひがつづいておりますが、おからだのぐあいはいかがでしょうか。",
        translation: "더운 날이 계속되고 있는데, 건강은 어떠십니까?",
      },
      {
        speaker: "곰",
        text: "おかげさまで元気にしております。どうぞご自愛ください。",
        pronunciation: "おかげさまでげんきにしております。どうぞごじあいください。",
        translation: "덕분에 건강하게 지내고 있습니다. 부디 건강 조심하세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご自愛ください",
        explanation: "상대방이 건강을 챙기길 바라는 마음을 담은 격식 표현. 편지나 계절 인사에 자주 씁니다.",
      },
    ],
    vocab: [
      { word: "暑い日が続く", meaning: "더운 날이 계속되다" },
      { word: "お体の具合", meaning: "건강 상태 (경어)" },
      { word: "ご自愛ください", meaning: "건강 조심하세요 (격식)" },
    ],
    quiz: [
      {
        question: "편지 끝에 상대방 건강을 배려하는 격식 표현은?",
        options: ["元気でいてね", "ご自愛ください", "気をつけて", "健康でね"],
        answer: "ご自愛ください",
      },
    ],
  },
  {
    id: "reunion-greeting",
    title: "동창회 인사",
    category: "social",
    thumbnail: "🎉",
    comicFrames: ["🎉", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "お久しぶりです。変わらずお元気そうで何よりです。",
        pronunciation: "おひさしぶりです。かわらずおげんきそうでなによりです。",
        translation: "오랜만입니다. 변함없이 건강해 보이셔서 다행입니다.",
      },
      {
        speaker: "곰",
        text: "本当に久しぶりですね。こちらこそ、お会いできて嬉しいです。",
        pronunciation: "ほんとうにひさしぶりですね。こちらこそ、おあいできてうれしいです。",
        translation: "정말 오랜만이네요. 저야말로, 만날 수 있어서 기쁩니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お久しぶりです",
        explanation: "오랫동안 만나지 못한 사람에게 쓰는 격식 인사. 「久しぶり」보다 정중합니다.",
      },
    ],
    vocab: [
      { word: "お久しぶりです", meaning: "오랜만입니다 (경어)" },
      { word: "変わらず", meaning: "변함없이" },
      { word: "何よりです", meaning: "다행입니다" },
    ],
    quiz: [
      {
        question: "오랜만에 만난 사람에게 경어로 인사하면?",
        options: ["久しぶり！", "お久しぶりです", "久しぶりだね", "ひさびさ"],
        answer: "お久しぶりです",
      },
    ],
  },
  {
    id: "age-senior",
    title: "연장자에게 말하기",
    category: "social",
    thumbnail: "🧓",
    comicFrames: ["🧓", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "先輩、ご経験からお知恵を拝借できますでしょうか。",
        pronunciation: "せんぱい、ごけいけんからおちえをはいしゃくできますでしょうか。",
        translation: "선배님, 경험에서 우러난 지혜를 빌릴 수 있을까요?",
      },
      {
        speaker: "선배 곰",
        text: "もちろん。私の経験が役に立てれば嬉しいですよ。",
        pronunciation: "もちろん。わたしのけいけんがやくにたてればうれしいですよ。",
        translation: "물론이죠. 제 경험이 도움이 된다면 기쁘겠어요.",
      },
    ],
    grammarPoints: [
      {
        rule: "お知恵を拝借する",
        explanation: "상대방의 지혜나 조언을 빌린다는 최고 격식 겸양 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご経験", meaning: "경험 (경어)" },
      { word: "お知恵", meaning: "지혜 (경어)" },
      { word: "拝借する", meaning: "빌리다 (겸양)" },
    ],
    quiz: [
      {
        question: "연장자에게 '지혜를 빌리다'의 겸양 표현은?",
        options: ["知恵を借りる", "お知恵を拝借する", "教えてもらう", "聞かせてほしい"],
        answer: "お知恵を拝借する",
      },
    ],
  },
  {
    id: "public-speech",
    title: "공개 발표 인사",
    category: "social",
    thumbnail: "🎤",
    comicFrames: ["🎤", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "本日はご来場いただきまして、誠にありがとうございます。只今よりご挨拶申し上げます。",
        pronunciation: "ほんじつはごらいじょういただきまして、まことにありがとうございます。ただいまよりごあいさつもうしあげます。",
        translation: "오늘 오시어 주셔서 진심으로 감사합니다. 지금부터 인사 말씀 드리겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご来場いただく",
        explanation: "행사나 발표회에 와 주신 것에 감사하는 격식 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご来場", meaning: "오심, 참석 (경어)" },
      { word: "只今より", meaning: "지금부터 (격식)" },
      { word: "ご挨拶申し上げます", meaning: "인사 말씀 드리겠습니다 (최고 격식)" },
    ],
    quiz: [
      {
        question: "행사에서 참석에 감사할 때?",
        options: ["来てくれてありがとう", "ご来場いただきまして誠にありがとうございます", "ありがとう", "どうも"],
        answer: "ご来場いただきまして誠にありがとうございます",
      },
    ],
  },
  {
    id: "study-group",
    title: "스터디 그룹 요청",
    category: "social",
    thumbnail: "📖",
    comicFrames: ["📖", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "一緒に勉強会を開いていただけないでしょうか。月に一度でも構いません。",
        pronunciation: "いっしょにべんきょうかいをひらいていただけないでしょうか。つきにいちどでもかまいません。",
        translation: "함께 스터디 모임을 열어 주시겠습니까? 한 달에 한 번이라도 괜찮습니다.",
      },
      {
        speaker: "곰",
        text: "いいですよ。日程はご都合のよい日でお願いします。",
        pronunciation: "いいですよ。にっていはごつごうのよいひでおねがいします。",
        translation: "좋아요. 일정은 편하신 날로 부탁드립니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜でも構いません",
        explanation: "최소 조건을 제시하면서 유연하게 부탁하는 표현. 부담을 줄여주는 효과가 있습니다.",
      },
    ],
    vocab: [
      { word: "勉強会", meaning: "스터디 모임" },
      { word: "〜でも構いません", meaning: "〜이라도 괜찮습니다" },
      { word: "日程", meaning: "일정" },
    ],
    quiz: [
      {
        question: "부담 없이 최소 조건을 제시할 때?",
        options: ["〜でいい", "〜でも構いません", "〜がいい", "〜でお願いします"],
        answer: "〜でも構いません",
      },
    ],
  },
  {
    id: "hobby-intro",
    title: "취미 소개하기",
    category: "social",
    thumbnail: "🎸",
    comicFrames: ["🎸", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "곰",
        text: "お休みの日はどのようにお過ごしでしょうか。",
        pronunciation: "おやすみのひはどのようにおすごしでしょうか。",
        translation: "쉬는 날에는 어떻게 보내시나요?",
      },
      {
        speaker: "토끼",
        text: "ギターを弾いております。最近は演奏会にも参加させていただいております。",
        pronunciation: "ギターをひいております。さいきんはえんそうかいにもさんかさせていただいております。",
        translation: "기타를 치고 있습니다. 최근에는 연주회에도 참가하고 있습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜ております",
        explanation: "「〜ています」의 겸양 표현. 자신의 행동이나 상태를 격식 있게 설명할 때 씁니다.",
      },
    ],
    vocab: [
      { word: "お休みの日", meaning: "쉬는 날 (경어)" },
      { word: "お過ごしでしょうか", meaning: "보내시나요? (존경)" },
      { word: "〜ております", meaning: "〜하고 있습니다 (겸양)" },
    ],
    quiz: [
      {
        question: "자신의 행동을 겸양으로 말하면?",
        options: ["〜ています", "〜ております", "〜します", "〜いたします"],
        answer: "〜ております",
      },
    ],
  },
  {
    id: "volunteer",
    title: "봉사 활동 참가",
    category: "social",
    thumbnail: "🤝",
    comicFrames: ["🤝", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "ボランティア活動に参加させていただきたいのですが、どのようにお申し込みすればよいでしょうか。",
        pronunciation: "ボランティアかつどうにさんかさせていただきたいのですが、どのようにおもうしこみすればよいでしょうか。",
        translation: "봉사 활동에 참가하고 싶은데요, 어떻게 신청하면 될까요?",
      },
      {
        speaker: "담당 곰",
        text: "ご参加いただけるとありがたいです。こちらの用紙にご記入ください。",
        pronunciation: "ごさんかいただけるとありがたいです。こちらのようしにごきにゅうください。",
        translation: "참가해 주시면 감사하겠습니다. 이 용지에 기재해 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜いただけるとありがたいです",
        explanation: "상대방이 해준다면 감사하다는 정중한 표현. 부드럽게 부탁하거나 감사할 때 씁니다.",
      },
    ],
    vocab: [
      { word: "ボランティア活動", meaning: "봉사 활동" },
      { word: "お申し込み", meaning: "신청 (경어)" },
      { word: "〜とありがたいです", meaning: "〜면 감사하겠습니다" },
    ],
    quiz: [
      {
        question: "부드럽게 감사하며 부탁할 때?",
        options: ["してください", "〜いただけるとありがたいです", "お願いします", "してほしい"],
        answer: "〜いただけるとありがたいです",
      },
    ],
  },
  {
    id: "farewell-friend",
    title: "친구 이별 인사",
    category: "social",
    thumbnail: "✈️",
    comicFrames: ["✈️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "遠くへお引越しされると聞きました。どうかお元気で、またお会いできる日を楽しみにしております。",
        pronunciation: "とおくへおひっこしされるときました。どうかおげんきで、またおあいできるひをたのしみにしております。",
        translation: "멀리 이사하신다고 들었습니다. 부디 건강하시고, 다시 만날 날을 기대하고 있겠습니다.",
      },
      {
        speaker: "곰",
        text: "ありがとうございます。またいつかお会いしましょう。",
        pronunciation: "ありがとうございます。またいつかおあいしましょう。",
        translation: "감사합니다. 언젠가 다시 만납시다.",
      },
    ],
    grammarPoints: [
      {
        rule: "楽しみにしております",
        explanation: "「楽しみにしています」의 겸양 표현. 기대감을 격식 있게 표현합니다.",
      },
    ],
    vocab: [
      { word: "お引越し", meaning: "이사 (경어)" },
      { word: "どうかお元気で", meaning: "부디 건강하세요" },
      { word: "楽しみにしております", meaning: "기대하고 있습니다 (겸양)" },
    ],
    quiz: [
      {
        question: "'기대하고 있습니다'의 겸양 표현은?",
        options: ["楽しみにしています", "楽しみにしております", "楽しみだ", "待っています"],
        answer: "楽しみにしております",
      },
    ],
  },
  {
    id: "neighborhood-event",
    title: "지역 행사 안내",
    category: "social",
    thumbnail: "🏮",
    comicFrames: ["🏮", "🐻", "🐰"],
    dialogue: [
      {
        speaker: "주민회 곰",
        text: "来月、地域の夏祭りが開催されます。ご参加いただけますでしょうか。",
        pronunciation: "らいげつ、ちいきのなつまつりがかいさいされます。ごさんかいただけますでしょうか。",
        translation: "다음 달, 지역 여름 축제가 열립니다. 참가해 주시겠습니까?",
      },
      {
        speaker: "토끼",
        text: "ぜひ参加させていただきます。何かお手伝いはございますか？",
        pronunciation: "ぜひさんかさせていただきます。なにかおてつだいはございますか？",
        translation: "꼭 참가하겠습니다. 무언가 도울 일은 있나요?",
      },
    ],
    grammarPoints: [
      {
        rule: "お手伝いはございますか",
        explanation: "자신이 도움이 될 수 있는지 정중하게 물어보는 표현입니다.",
      },
    ],
    vocab: [
      { word: "夏祭り", meaning: "여름 축제" },
      { word: "開催される", meaning: "개최되다" },
      { word: "お手伝い", meaning: "도움 (경어)" },
    ],
    quiz: [
      {
        question: "도울 것이 있는지 정중하게 물으면?",
        options: ["手伝う？", "お手伝いはございますか", "何かある？", "助ける？"],
        answer: "お手伝いはございますか",
      },
    ],
  },
  {
    id: "condolences-message",
    title: "메시지로 위로 전하기",
    category: "social",
    thumbnail: "💌",
    comicFrames: ["💌", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "大変つらい思いをされていることと存じます。どうかお力落としのないよう、お体をご自愛ください。",
        pronunciation: "たいへんつらいおもいをされていることとぞんじます。どうかおちからおとしのないよう、おからだをごじあいください。",
        translation: "많이 힘드시리라 생각합니다. 부디 낙담하지 마시고, 몸을 챙기세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜ことと存じます",
        explanation: "상대방의 상황을 공감하며 추측할 때 쓰는 겸양 표현입니다.",
      },
    ],
    vocab: [
      { word: "お力落とし", meaning: "낙담, 기운 빠짐 (경어)" },
      { word: "〜ことと存じます", meaning: "〜이리라 생각합니다 (겸양)" },
      { word: "ご自愛ください", meaning: "몸 챙기세요 (격식)" },
    ],
    quiz: [
      {
        question: "상대방 상황을 공감하며 추측할 때 격식 표현은?",
        options: ["〜と思います", "〜ことと存じます", "〜でしょう", "〜かな"],
        answer: "〜ことと存じます",
      },
    ],
  },
  {
    id: "parent-teacher",
    title: "학부모 면담",
    category: "social",
    thumbnail: "👨‍👩‍👧",
    comicFrames: ["👨‍👩‍👧", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "선생님 곰",
        text: "お子様は最近、授業にも積極的に参加されています。",
        pronunciation: "おこさまはさいきん、じゅぎょうにもせっきょくてきにさんかされています。",
        translation: "자녀분이 최근에는 수업에도 적극적으로 참가하고 있습니다.",
      },
      {
        speaker: "토끼 (학부모)",
        text: "ありがとうございます。ご指導いただいてのことと存じます。",
        pronunciation: "ありがとうございます。ごしどういただいてのこととぞんじます。",
        translation: "감사합니다. 지도해 주신 덕분이라고 생각합니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "お子様",
        explanation: "상대방의 자녀를 높여 말하는 경어 표현. 자신의 자녀는 「子ども」또는「息子/娘」라고 합니다.",
      },
    ],
    vocab: [
      { word: "お子様", meaning: "자녀분 (존경)" },
      { word: "積極的に", meaning: "적극적으로" },
      { word: "ご指導いただく", meaning: "지도해 주시다 (겸양)" },
    ],
    quiz: [
      {
        question: "상대방의 자녀를 경어로 말하면?",
        options: ["子ども", "息子さん", "お子様", "娘さん"],
        answer: "お子様",
      },
    ],
  },
  {
    id: "formal-introduction",
    title: "공식 소개 받기",
    category: "social",
    thumbnail: "👥",
    comicFrames: ["👥", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "소개자 곰",
        text: "こちらは山田先生でいらっしゃいます。ご専門は日本文化でございます。",
        pronunciation: "こちらはやまだせんせいでいらっしゃいます。ごせんもんはにほんぶんかでございます。",
        translation: "이분은 야마다 선생님이십니다. 전문 분야는 일본 문화입니다.",
      },
      {
        speaker: "토끼",
        text: "はじめまして。いつもお噂はかねがね伺っております。",
        pronunciation: "はじめまして。いつもおうわさはかねがねうかがっております。",
        translation: "처음 뵙겠습니다. 항상 소문은 많이 들었습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "かねがね伺っております",
        explanation: "예전부터 소문을 들었다는 것을 정중하게 전하는 공식 인사말입니다.",
      },
    ],
    vocab: [
      { word: "でいらっしゃいます", meaning: "〜이십니다 (존경)" },
      { word: "ご専門", meaning: "전문 분야 (경어)" },
      { word: "かねがね伺っております", meaning: "항상 많이 들었습니다 (겸양)" },
    ],
    quiz: [
      {
        question: "처음 만난 분께 '소문은 들었습니다'를 겸양으로 말하면?",
        options: ["うわさを聞いた", "かねがね伺っております", "知っています", "有名ですね"],
        answer: "かねがね伺っております",
      },
    ],
  },
  {
    id: "training-request",
    title: "연수 참가 신청",
    category: "business",
    thumbnail: "📋",
    comicFrames: ["📋", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "来月の社外研修に参加させていただきたく、ご許可いただけますでしょうか。",
        pronunciation: "らいげつのしゃがいけんしゅうにさんかさせていただきたく、ごきょかいただけますでしょうか。",
        translation: "다음 달 사외 연수에 참가하고 싶어, 허가해 주시겠습니까?",
      },
      {
        speaker: "곰 부장",
        text: "業務に支障がなければ構いません。日程を確認してください。",
        pronunciation: "ぎょうむにししょうがなければかまいません。にっていをかくにんしてください。",
        translation: "업무에 지장이 없다면 괜찮습니다. 일정을 확인해 보세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "ご許可いただく",
        explanation: "허가를 받다의 경어 표현. 상사에게 허락을 구할 때 씁니다.",
      },
    ],
    vocab: [
      { word: "社外研修", meaning: "사외 연수" },
      { word: "ご許可いただく", meaning: "허가 받다 (겸양)" },
      { word: "業務に支障がない", meaning: "업무에 지장이 없다" },
    ],
    quiz: [
      {
        question: "상사에게 허락을 구할 때 경어 표현은?",
        options: ["許可して", "ご許可いただけますでしょうか", "いいですか", "許可くれますか"],
        answer: "ご許可いただけますでしょうか",
      },
    ],
  },
  {
    id: "photography-studio",
    title: "사진관에서 예약",
    category: "hospitality",
    thumbnail: "📷",
    comicFrames: ["📷", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "七五三の記念写真をお願いしたいのですが、来月の予約はできますでしょうか。",
        pronunciation: "しちごさんのきねんしゃしんをおねがいしたいのですが、らいげつのよやくはできますでしょうか。",
        translation: "시치고산 기념 사진을 부탁드리고 싶은데요, 다음 달 예약이 가능한가요?",
      },
      {
        speaker: "사진사 곰",
        text: "かしこまりました。ご希望の日時をお聞かせください。",
        pronunciation: "かしこまりました。ごきぼうのにちじをおきかせください。",
        translation: "알겠습니다. 희망하시는 일시를 알려 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "七五三",
        explanation: "3세·5세·7세 아이의 성장을 축하하는 일본 전통 행사. 11월 15일에 열립니다.",
      },
    ],
    vocab: [
      { word: "七五三", meaning: "시치고산 (아이 성장 축하 행사)" },
      { word: "記念写真", meaning: "기념 사진" },
      { word: "ご希望の日時", meaning: "희망하시는 일시 (경어)" },
    ],
    quiz: [
      {
        question: "일본에서 3·5·7세 아이 성장을 축하하는 행사는?",
        options: ["お宮参り", "七五三", "成人式", "初節句"],
        answer: "七五三",
      },
    ],
  },
  {
    id: "airport-lounge",
    title: "공항 라운지 이용",
    category: "hospitality",
    thumbnail: "🛋️",
    comicFrames: ["🛋️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "직원 곰",
        text: "ご搭乗のお時間まで、ラウンジにてお待ちいただけますでしょうか。",
        pronunciation: "ごとうじょうのおじかんまで、ラウンジにておまちいただけますでしょうか。",
        translation: "탑승 시간까지 라운지에서 기다려 주시겠습니까?",
      },
      {
        speaker: "토끼",
        text: "ありがとうございます。ラウンジはどちらにございますか。",
        pronunciation: "ありがとうございます。ラウンジはどちらにございますか。",
        translation: "감사합니다. 라운지는 어디에 있나요?",
      },
    ],
    grammarPoints: [
      {
        rule: "〜にてお待ちいただく",
        explanation: "장소를 지정하여 기다려달라고 정중하게 안내하는 서비스 표현입니다.",
      },
    ],
    vocab: [
      { word: "ご搭乗", meaning: "탑승 (경어)" },
      { word: "〜にて", meaning: "〜에서 (격식)" },
      { word: "どちらにございますか", meaning: "어디에 있나요? (격식)" },
    ],
    quiz: [
      {
        question: "장소를 지정해 기다려달라고 격식 있게 말하면?",
        options: ["ここで待って", "〜にてお待ちください", "〜にてお待ちいただけますでしょうか", "待ってください"],
        answer: "〜にてお待ちいただけますでしょうか",
      },
    ],
  },
  {
    id: "cultural-exchange",
    title: "문화 교류 인사",
    category: "social",
    thumbnail: "🌏",
    comicFrames: ["🌏", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "日本の文化について、もっと学ばせていただきたいと思っております。",
        pronunciation: "にほんのぶんかについて、もっとまなばせていただきたいとおもっております。",
        translation: "일본 문화에 대해 더 배우고 싶다고 생각하고 있습니다.",
      },
      {
        speaker: "곰",
        text: "ぜひ。こちらからも韓国の文化をお教えいただければ幸いです。",
        pronunciation: "ぜひ。こちらからもかんこくのぶんかをおしえいただければさいわいです。",
        translation: "꼭 그렇게 하죠. 저희도 한국 문화를 가르쳐 주시면 감사하겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜いただければ幸いです",
        explanation: "「〜してくれたら嬉しい」의 격식 표현. 정중하고 겸손하게 부탁할 때 씁니다.",
      },
    ],
    vocab: [
      { word: "学ばせていただく", meaning: "배우다 (겸양)" },
      { word: "〜いただければ幸いです", meaning: "〜해 주시면 감사하겠습니다" },
      { word: "幸い", meaning: "다행, 감사함" },
    ],
    quiz: [
      {
        question: "정중하게 부탁할 때 '해주시면 감사하겠습니다'의 격식 표현은?",
        options: ["〜してくれると嬉しい", "〜いただければ幸いです", "〜してください", "〜お願いします"],
        answer: "〜いただければ幸いです",
      },
    ],
  },
  {
    id: "winter-greeting",
    title: "겨울 계절 인사",
    category: "social",
    thumbnail: "❄️",
    comicFrames: ["❄️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "寒さも本番となりましたが、いかがお過ごしでしょうか。",
        pronunciation: "さむさもほんばんとなりましたが、いかがおすごしでしょうか。",
        translation: "추위도 본격적으로 찾아왔는데, 어떻게 지내시나요?",
      },
      {
        speaker: "곰",
        text: "おかげさまで元気に過ごしております。風邪などお召しにならぬようご注意ください。",
        pronunciation: "おかげさまでげんきにすごしております。かぜなどおめしにならぬようごちゅういください。",
        translation: "덕분에 건강하게 지내고 있습니다. 감기 등 걸리지 않도록 조심하세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜も本番となりました",
        explanation: "계절 변화를 알리는 격식 표현. 편지나 인사말의 도입부로 자주 씁니다.",
      },
    ],
    vocab: [
      { word: "本番", meaning: "본격적인 시작" },
      { word: "お召しになる", meaning: "걸리시다 (존경, 병에 대해)" },
      { word: "ご注意ください", meaning: "조심하세요 (경어)" },
    ],
    quiz: [
      {
        question: "계절 인사에서 '본격적으로 되었습니다'의 격식 표현은?",
        options: ["寒くなった", "寒さも本番となりました", "冬だ", "寒い季節です"],
        answer: "寒さも本番となりました",
      },
    ],
  },
  {
    id: "charity-donation",
    title: "자선 기부 요청",
    category: "social",
    thumbnail: "❤️",
    comicFrames: ["❤️", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "よろしければ、こちらの募金活動にご協力いただけますでしょうか。",
        pronunciation: "よろしければ、こちらのぼきんかつどうにごきょうりょくいただけますでしょうか。",
        translation: "괜찮으시다면, 이 모금 활동에 협조해 주시겠습니까?",
      },
      {
        speaker: "곰",
        text: "もちろんです。微力ながらお役に立てれば幸いです。",
        pronunciation: "もちろんです。びりょくながらおやくにたてればさいわいです。",
        translation: "물론이죠. 보잘것없지만 도움이 된다면 기쁘겠습니다.",
      },
    ],
    grammarPoints: [
      {
        rule: "微力ながら",
        explanation: "자신의 도움이 작다는 것을 겸손하게 표현하는 말. 기부·봉사 자리에서 자주 씁니다.",
      },
    ],
    vocab: [
      { word: "募金活動", meaning: "모금 활동" },
      { word: "ご協力いただく", meaning: "협조해 주시다 (겸양)" },
      { word: "微力ながら", meaning: "보잘것없지만 (겸손)" },
    ],
    quiz: [
      {
        question: "자신의 도움이 작다고 겸손하게 말할 때?",
        options: ["少しだけ", "微力ながら", "あまり役に立てない", "小さいけど"],
        answer: "微力ながら",
      },
    ],
  },
  {
    id: "neighbor-intro",
    title: "이웃에게 인사하기",
    category: "social",
    thumbnail: "🏠",
    comicFrames: ["🏠", "🐰", "🐻"],
    dialogue: [
      {
        speaker: "토끼",
        text: "はじめまして、先日引っ越してきた山田と申します。これからよろしくお願いいたします。",
        pronunciation: "はじめまして、せんじつひっこしてきたやまだともうします。これからよろしくおねがいいたします。",
        translation: "처음 뵙겠습니다. 지난번에 이사 온 야마다라고 합니다. 앞으로 잘 부탁드립니다.",
      },
      {
        speaker: "이웃 곰",
        text: "ようこそ。こちらこそよろしくお願いします。何かあれば声をかけてください。",
        pronunciation: "ようこそ。こちらこそよろしくおねがいします。なにかあればこえをかけてください。",
        translation: "환영해요. 저야말로 잘 부탁해요. 무슨 일 있으면 말씀해 주세요.",
      },
    ],
    grammarPoints: [
      {
        rule: "〜と申します / これからよろしく",
        explanation: "새로운 환경에서 자기소개를 할 때 쓰는 격식 표현 세트입니다.",
      },
    ],
    vocab: [
      { word: "引っ越す", meaning: "이사하다" },
      { word: "〜と申します", meaning: "〜라고 합니다 (겸양)" },
      { word: "これから", meaning: "앞으로, 이제부터" },
    ],
    quiz: [
      {
        question: "이웃에게 처음 인사할 때 자신의 이름을 겸손하게 말하면?",
        options: [
          "私は山田です",
          "山田と申します",
          "山田だよ",
          "山田って言います",
        ],
        answer: "山田と申します",
      },
    ],
  },
];
