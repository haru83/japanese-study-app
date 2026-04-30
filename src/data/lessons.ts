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
