export interface AnimeVocabItem {
  word: string;
  reading: string;
  meaning: string;
  jlptLevel?: string;
}

export interface AnimeGrammarItem {
  pattern: string;
  meaning: string;
  explanation: string;
}

export interface AnimeQuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type PersonaId =
  | "hero"
  | "master"
  | "rival"
  | "tsundere"
  | "villain"
  | "mystic"
  | "sports"
  | "pilot";

export interface AnimeQuoteItem {
  id: string;
  animeId: PersonaId;
  animeTitleKo: string; // 페르소나 한국어명 (예: 열혈 주인공, 카리스마 스승 등)
  animeTitleJa: string; // 페르소나 일본어명 (예: 熱血主人公, カリスマ師匠 등)
  characterKo: string;  // 캐릭터 유형 (예: 소년 만화 주인공, 인자한 사부 등)
  characterJa: string;  // 일본어 유형명
  quoteJa: string;      // 100% 창작된 안전한 애니 풍 대사
  quoteReading?: string;
  quoteKo: string;
  sceneContext: string; // 상황 및 뉘앙스 해설
  tag: string;
  gender: "female" | "male";
  vocabulary: AnimeVocabItem[];
  grammarPoints: AnimeGrammarItem[];
  quiz: AnimeQuizItem;
}

export interface AnimeCategory {
  id: "all" | PersonaId;
  label: string;
  icon: string;
  badgeBg: string;
}

export const ANIME_CATEGORIES: AnimeCategory[] = [
  { id: "all", label: "전체", icon: "🎬", badgeBg: "bg-sakura-pink" },
  { id: "hero", label: "열혈 주인공", icon: "🔥", badgeBg: "bg-amber-400" },
  { id: "rival", label: "쿨한 라이벌", icon: "⚡", badgeBg: "bg-sky-400" },
  { id: "master", label: "카리스마 스승", icon: "🕶️", badgeBg: "bg-orange-400" },
  { id: "tsundere", label: "츤데레", icon: "🐱", badgeBg: "bg-rose-400" },
  { id: "villain", label: "지능형 빌런", icon: "🦹", badgeBg: "bg-purple-400" },
  { id: "mystic", label: "신비한 마법사", icon: "🪄", badgeBg: "bg-emerald-400" },
  { id: "sports", label: "열정 스포츠맨", icon: "🏀", badgeBg: "bg-rose-300" },
  { id: "pilot", label: "고뇌하는 소년", icon: "🤖", badgeBg: "bg-indigo-400" },
];

export const ANIME_QUOTES_DATA: AnimeQuoteItem[] = [
  // ── 🔥 1. 열혈 주인공 (HERO) ──
  {
    id: "aq-hero-01",
    animeId: "hero",
    animeTitleKo: "열혈 주인공",
    animeTitleJa: "熱血主人公",
    characterKo: "모험을 꿈꾸는 소년",
    characterJa: "冒険を夢見る少年",
    quoteJa: "世界一の冒険者に、おれはなる！",
    quoteReading: "せかいいちのぼうけんしゃに、おれはなる！",
    quoteKo: "세계 최고의 모험가가, 나는 될 거다!",
    sceneContext: "소년 만화 특유의 강렬한 도치법과 결의를 담아, 자신의 꿈을 세상에 당당히 선언하는 열혈 소년 캐릭터의 대표적인 대사 톤입니다.",
    tag: "꿈 & 결의",
    gender: "male",
    vocabulary: [
      { word: "世界一", reading: "せかいいち", meaning: "세계 제일, 최고", jlptLevel: "N4" },
      { word: "冒険者", reading: "ぼうけんしゃ", meaning: "모험가", jlptLevel: "N3" },
      { word: "おれ", reading: "おれ", meaning: "나 (남성 구어 1인칭)", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + になる",
        meaning: "~이/가 되다",
        explanation: "변화의 목표와 결과를 나타낼 때 조사 'に'와 동사 'なる'를 결합합니다.",
      },
      {
        pattern: "도치 강조법 (おれはなる)",
        meaning: "어순을 바꾸어 목표를 강조",
        explanation: "목적어인 '世界一の冒険者に'를 맨 앞으로 끌어내어 당찬 포부를 극적으로 강조합니다.",
      },
    ],
    quiz: {
      question: "다음 빈칸에 들어갈 알맞은 조사는? [ 世界一の冒険者(  )、おれはなる！ ]",
      options: ["を", "に", "で", "と"],
      correctIndex: 1,
      explanation: "'~이 되다'라는 변화의 결과를 나타낼 때는 조사 'に'를 사용합니다.",
    },
  },
  {
    id: "aq-hero-02",
    animeId: "hero",
    animeTitleKo: "열혈 주인공",
    animeTitleJa: "熱血主人公",
    characterKo: "불굴의 도전자",
    characterJa: "不屈の挑戦者",
    quoteJa: "まっすぐ自分の決めた道は曲げねぇ！",
    quoteReading: "まっすぐじぶんのきめたみちはまげねぇ！",
    quoteKo: "똑바로 내가 정한 길은 굽히지 않아!",
    sceneContext: "어떤 방해와 시련 앞에서도 자신이 선택한 신념을 굽히지 않겠다는 의지를 거친 소년 만화 구어체로 표출하는 대사입니다.",
    tag: "신념 & 끈기",
    gender: "male",
    vocabulary: [
      { word: "まっすぐ", reading: "まっすぐ", meaning: "똑바로, 곧장", jlptLevel: "N4" },
      { word: "決める", reading: "きめる", meaning: "정하다, 결정하다", jlptLevel: "N4" },
      { word: "道", reading: "みち", meaning: "길, 신념", jlptLevel: "N5" },
      { word: "曲げる", reading: "まげる", meaning: "굽히다, 왜곡하다", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "~ねぇ (소년 구어체 축약 부정)",
        meaning: "~지 않아 (~ない의 회화체 변형)",
        explanation: "曲げない(まげない)가 소년 만화 속 거칠고 패기 있는 어조에서 '曲げねぇ(まげねぇ)'로 발음됩니다.",
      },
    ],
    quiz: {
      question: "'曲げねぇ'의 표준적인 문법 표현은?",
      options: ["曲げない", "曲げた", "曲げよう", "曲げろ"],
      correctIndex: 0,
      explanation: "구어체 접미 '~ねぇ'는 부정형 '~ない'의 변형입니다.",
    },
  },
  {
    id: "aq-hero-03",
    animeId: "hero",
    animeTitleKo: "열혈 주인공",
    animeTitleJa: "熱血主人公",
    characterKo: "동료를 지키는 전사",
    characterJa: "仲間を守る戦士",
    quoteJa: "大切な仲間を傷つける奴は、絶対に許さない！",
    quoteReading: "たいせつななかまをきずつけるやつは、ぜったいにゆるさない！",
    quoteKo: "소중한 동료를 상처 입히는 녀석은, 절대로 용서 못 해!",
    sceneContext: "적들이 자신의 동료를 위협할 때 분노하며 내뱉는, 전형적인 열혈 만화 주인공의 동료애 명대사입니다.",
    tag: "동료애 & 분노",
    gender: "male",
    vocabulary: [
      { word: "大切", reading: "たいせつ", meaning: "소중함, 중요함", jlptLevel: "N5" },
      { word: "仲間", reading: "なかま", meaning: "동료, 친구", jlptLevel: "N3" },
      { word: "傷つける", reading: "きずつける", meaning: "상처 입히다", jlptLevel: "N2" },
      { word: "許す", reading: "ゆるす", meaning: "용서하다", jlptLevel: "N3" },
    ],
    grammarPoints: [
      {
        pattern: "동사 사전형 + 奴 (傷つける奴)",
        meaning: "~하는 놈/녀석",
        explanation: "상대방을 낮잡아 부르거나 적대감을 드러낼 때 명사 '奴(やつ)'를 사용합니다.",
      },
    ],
    quiz: {
      question: "'용서하지 않는다'를 뜻하는 許す(ゆるす)의 부정형은?",
      options: ["許しない", "許さない", "許せたい", "許すまい"],
      correctIndex: 1,
      explanation: "5단 동사 許す의 부정형은 許さない(ゆるさない)입니다.",
    },
  },
  {
    id: "aq-hero-04",
    animeId: "hero",
    animeTitleKo: "열혈 주인공",
    animeTitleJa: "熱血主人公",
    characterKo: "마지막 일격을 가하는 용사",
    characterJa: "必殺技を放つ勇者",
    quoteJa: "これで終わりだ！オレの全力を喰らえ！",
    quoteReading: "これでおわりだ！オレのぜんりょくをくらえ！",
    quoteKo: "이걸로 끝이다! 내 전력을 받아라(먹어라)!",
    sceneContext: "치열한 결전의 클라이맥스에서 필살기를 날리며 승부를 결정짓는 순간의 박력 넘치는 대사입니다.",
    tag: "필살기 & 승부",
    gender: "male",
    vocabulary: [
      { word: "終わり", reading: "おわり", meaning: "끝, 종결", jlptLevel: "N5" },
      { word: "全力", reading: "ぜんりょく", meaning: "전력, 온 힘", jlptLevel: "N3" },
      { word: "喰らう", reading: "くらう", meaning: "먹다, (공격을) 받다", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "5단 동사 명령형 (喰らえ)",
        meaning: "받아라, 먹어라!",
        explanation: "5단 동사 喰らう(くらう)의 어미를 え단(え)으로 바꾸어 거칠고 강한 일격을 명령형으로 표현했습니다.",
      },
    ],
    quiz: {
      question: "동사 喰らう(받다/먹다)의 명령형은?",
      options: ["喰らえ", "喰らいろ", "喰らおう", "喰らうな"],
      correctIndex: 0,
      explanation: "5단 동사의 명령형은 어미를 え단으로 바꾼 '喰らえ'입니다.",
    },
  },

  // ── ⚡ 2. 쿨한 라이벌 (RIVAL) ──
  {
    id: "aq-rival-01",
    animeId: "rival",
    animeTitleKo: "쿨한 라이벌",
    animeTitleJa: "孤高のライバル",
    characterKo: "긍지 높은 검객",
    characterJa: "誇り高き剣客",
    quoteJa: "背中の傷は、剣士の恥だ。",
    quoteReading: "せ나かのきずは、けんしのはじだ。",
    quoteKo: "등 뒤의 상처는, 검사의 수치다.",
    sceneContext: "강적과의 결투에서 결코 등을 보이지 않고 정면 승부를 고수하는 고결한 무사의 자존심을 나타내는 대사입니다.",
    tag: "긍지 & 무도",
    gender: "male",
    vocabulary: [
      { word: "背中", reading: "せなか", meaning: "등", jlptLevel: "N3" },
      { word: "傷", reading: "きず", meaning: "상처, 흠집", jlptLevel: "N3" },
      { word: "剣士", reading: "けんし", meaning: "검사, 검객", jlptLevel: "N2" },
      { word: "恥", reading: "はじ", meaning: "수치, 부끄러움", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + だ (단정)",
        meaning: "~이다",
        explanation: "군더더기 없는 단정형 조동사 'だ'로 결연하고 차분한 어조를 완성합니다.",
      },
    ],
    quiz: {
      question: "'등'을 뜻하는 일본어 단어는?",
      options: ["背中", "お腹", "頭", "腕"],
      correctIndex: 0,
      explanation: "등은 '背中(せなか)'입니다.",
    },
  },
  {
    id: "aq-rival-02",
    animeId: "rival",
    animeTitleKo: "쿨한 라이벌",
    animeTitleJa: "孤高のライバル",
    characterKo: "냉철한 천재",
    characterJa: "冷徹な天才",
    quoteJa: "フン、勘違いするな。お前を助けたわけじゃない。",
    quoteReading: "フン、かんちがいするな。おまえをたすけたわけじゃない。",
    quoteKo: "흥, 착각하지 마라. 널 구해준 게 아니야.",
    sceneContext: "주인공을 위기에서 구해놓고도 자신의 자존심 때문에 퉁명스럽게 둘러대는 쿨한 라이벌의 전형적인 대사입니다.",
    tag: "자존심 & 츤데레 톤",
    gender: "male",
    vocabulary: [
      { word: "勘違い", reading: "かんちがい", meaning: "착각, 오해", jlptLevel: "N3" },
      { word: "お前", reading: "おまえ", meaning: "너 (손아랫사람/동료)", jlptLevel: "N5" },
      { word: "助ける", reading: "たすける", meaning: "돕다, 구하다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + な (금지)",
        meaning: "~하지 마라",
        explanation: "동사 사전형 뒤에 'な'를 결합하여 짧고 강한 금지를 나타냅니다 (勘違いするな = 착각 마).",
      },
      {
        pattern: "동사 과거형 + わけじゃない",
        meaning: "~한 것은 아니다 (부분 부정)",
        explanation: "상대방의 오해나 짐작을 차갑게 일축할 때 사용하는 회화 표현입니다.",
      },
    ],
    quiz: {
      question: "'~한 것은 아니다'를 뜻하는 일본어 표현은?",
      options: ["わけじゃない", "はずがない", "わけにはいかない", "どころではない"],
      correctIndex: 0,
      explanation: "'~한 것은 아니다'는 부분 부정 표현인 'わけじゃない'입니다.",
    },
  },
  {
    id: "aq-rival-03",
    animeId: "rival",
    animeTitleKo: "쿨한 라이벌",
    animeTitleJa: "孤高のライバル",
    characterKo: "비장한 결투자",
    characterJa: "決意の宿敵",
    quoteJa: "これで決着をつける。手加減は無用だ。",
    quoteReading: "これでけっちゃくをつける。てかげんはむようだ。",
    quoteKo: "이걸로 결판을 짓는다. 봐주는 건 필요 없다.",
    sceneContext: "오랜 라이벌과의 마지막 대결을 앞두고 전력을 다해 싸우자고 다짐하는 차분하지만 비장한 대사입니다.",
    tag: "승부 & 결판",
    gender: "male",
    vocabulary: [
      { word: "決着", reading: "けっちゃく", meaning: "결착, 결판", jlptLevel: "N2" },
      { word: "手加減", reading: "てかげん", meaning: "봐줌, 사정 봐주기", jlptLevel: "N1" },
      { word: "無用", reading: "むよう", meaning: "소용없음, 필요 없음", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "決着をつける (관용구)",
        meaning: "결판을 내다, 매듭짓다",
        explanation: "승패나 문제를 끝까지 가려 명확하게 마무리지을 때 쓰는 대표 관용구입니다.",
      },
    ],
    quiz: {
      question: "'결판을 짓다'에 쓰인 올바른 동사는? [ 決着を(  ) ]",
      options: ["つける", "かける", "とる", "だす"],
      correctIndex: 0,
      explanation: "결판을 짓다는 관용 표현으로 '決着をつける'입니다.",
    },
  },
  {
    id: "aq-rival-04",
    animeId: "rival",
    animeTitleKo: "쿨한 라이벌",
    animeTitleJa: "孤高のライバル",
    characterKo: "그림자 속의 조력자",
    characterJa: "影の実力者",
    quoteJa: "行くぞ。オレの背中は任せた。",
    quoteReading: "いくぞ。オレのせなかはまかせた。",
    quoteKo: "간다. 내 등 뒤는 맡겼다.",
    sceneContext: "주인공을 진정한 전우로 인정하고, 보이지 않는 등 뒤를 온전히 신뢰하며 전장으로 뛰어드는 명장면 대사입니다.",
    tag: "신뢰 & 파트너십",
    gender: "male",
    vocabulary: [
      { word: "行く", reading: "いく", meaning: "가다", jlptLevel: "N5" },
      { word: "任せる", reading: "まかせる", meaning: "맡기다", jlptLevel: "N3" },
    ],
    grammarPoints: [
      {
        pattern: "동사 과거형을 통한 즉시 완료 (任せた)",
        meaning: "맡겼다 / 맡길게!",
        explanation: "미래의 행동이지만 이미 전적으로 신뢰하여 맡겼음을 기정사실화하듯 강조하는 구어체 표현입니다.",
      },
    ],
    quiz: {
      question: "동사 '任せる(맡기다)'의 과거형은?",
      options: ["任せた", "任した", "任せった", "任せられた"],
      correctIndex: 0,
      explanation: "2그룹(하1단) 동사 任せる의 과거형은 任せた(まかせた)입니다.",
    },
  },

  // ── 🕶️ 3. 카리스마 스승 (MASTER) ──
  {
    id: "aq-master-01",
    animeId: "master",
    animeTitleKo: "카리스마 스승",
    animeTitleJa: "導きの指導者",
    characterKo: "인자한 노감독",
    characterJa: "温厚な老監督",
    quoteJa: "あきらめたら、そこで試合終了ですよ…？",
    quoteReading: "あきらめたら、そこでしあいしゅうりょうですよ…？",
    quoteKo: "포기하면, 그 순간 시합 종료예요…?",
    sceneContext: "절망에 빠진 제자에게 부드럽지만 묵직한 어조로 끝까지 희망을 잃지 말 것을 일깨워주는 명언입니다.",
    tag: "인생명언 & 격려",
    gender: "male",
    vocabulary: [
      { word: "あきらめる", reading: "あきらめる", meaning: "포기하다", jlptLevel: "N3" },
      { word: "試合", reading: "しあい", meaning: "시합, 경기", jlptLevel: "N4" },
      { word: "終了", reading: "しゅうりょう", meaning: "종료, 끝남", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "동사 과거형 + たら (가정)",
        meaning: "~하면, ~했을 때",
        explanation: "포기라는 조건이 발생하는 순간 모든 가능성이 끝난다는 인과관계를 차분하게 제시합니다.",
      },
      {
        pattern: "정중 종조사 ~ですよ",
        meaning: "~예요, ~인 것이지요",
        explanation: "듣는 사람을 부드럽게 설득하고 일깨워줄 때 쓰는 인자한 존댓말입니다.",
      },
    ],
    quiz: {
      question: "'포기하면'을 일본어로 나타낼 때 가장 자연스러운 표현은?",
      options: ["あきらめたら", "あきらめると", "あきらめれば", "あきらめるなら"],
      correctIndex: 0,
      explanation: "가정 조건으로 가장 널리 쓰이는 형태는 'あきらめたら'입니다.",
    },
  },
  {
    id: "aq-master-02",
    animeId: "master",
    animeTitleKo: "카리스마 스승",
    animeTitleJa: "導きの指導者",
    characterKo: "냉철한 병단장",
    characterJa: "歴戦の隊長",
    quoteJa: "悔いが残らない方を、自分で選べ。",
    quoteReading: "くいがのこらないほうを、じぶんでえらべ。",
    quoteKo: "후회가 남지 않는 쪽을, 스스로 선택해라.",
    sceneContext: "정답이 없는 극한의 선택 앞에서, 미래의 결과에 연연하기보다 스스로 납득할 수 있는 결단을 내리라고 가르치는 대사입니다.",
    tag: "선택 & 책임",
    gender: "male",
    vocabulary: [
      { word: "悔い", reading: "くい", meaning: "후회, 미련", jlptLevel: "N1" },
      { word: "残る", reading: "のこる", meaning: "남다", jlptLevel: "N4" },
      { word: "方", reading: "ほう", meaning: "쪽, 방향", jlptLevel: "N5" },
      { word: "選ぶ", reading: "えらぶ", meaning: "고르다, 선택하다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "부정 수식 + 方 (残らない方)",
        meaning: "~하지 않는 쪽",
        explanation: "여러 선택지 중 후회가 남지 않는 방향을 한정하여 가리킵니다.",
      },
      {
        pattern: "동사 명령형 (選べ)",
        meaning: "선택해라",
        explanation: "5단 동사 選ぶ의 어미를 え단(べ)으로 바꾼 결단력 있는 명령형입니다.",
      },
    ],
    quiz: {
      question: "동사 選ぶ(고르다)의 명령형은?",
      options: ["選べ", "選びろ", "選ばれ", "選ぼう"],
      correctIndex: 0,
      explanation: "5단 동사 選ぶ의 명령형은 '選べ(えらべ)'입니다.",
    },
  },
  {
    id: "aq-master-03",
    animeId: "master",
    animeTitleKo: "카리스마 스승",
    animeTitleJa: "導きの指導者",
    characterKo: "전설의 은둔 고수",
    characterJa: "伝説の達人",
    quoteJa: "一番大切な才能とは、決してあきらめぬ根性だ！",
    quoteReading: "いちばんたいせつなさいのうとは、けっしてあきらめぬこんじょうだ！",
    quoteKo: "가장 중요한 재능이란, 결코 포기하지 않는 근성이다!",
    sceneContext: "화려한 기술보다 꺾이지 않는 끈기야말로 진정한 강자의 조건임을 제자에게 전수하는 스승의 가르침입니다.",
    tag: "근성 & 가르침",
    gender: "male",
    vocabulary: [
      { word: "才能", reading: "さいのう", meaning: "재능", jlptLevel: "N3" },
      { word: "決して", reading: "けっして", meaning: "결코, 절대로", jlptLevel: "N4" },
      { word: "根性", reading: "こんじょう", meaning: "근성, 뚝심", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "고풍 부정형 ~ぬ (あきらめぬ)",
        meaning: "~하지 않는 (~ない의 문어적 표현)",
        explanation: "전통적이고 위엄 있는 어조에서 ない 대신 ぬ를 사용하여 장중한 분위기를 만듭니다.",
      },
    ],
    quiz: {
      question: "고풍스러운 문어체 부정 표현 'あきらめぬ'와 같은 뜻의 현대어는?",
      options: ["あきらめない", "あきらめる", "あきらめた", "あきらめよう"],
      correctIndex: 0,
      explanation: "~ぬ는 ~ない와 같은 부정의 뜻을 지닌 고풍스러운 표현입니다.",
    },
  },
  {
    id: "aq-master-04",
    animeId: "master",
    animeTitleKo: "카리스마 스승",
    animeTitleJa: "導きの指導者",
    characterKo: "총사령관",
    characterJa: "総司令官",
    quoteJa: "我が隊員たちよ、未来のために全力を捧げよ！",
    quoteReading: "わがたいいんたちよ、みらいのためにぜんりょくをささげよ！",
    quoteKo: "우리 대원들이여, 미래를 위해 온 힘을 바쳐라!",
    sceneContext: "인류와 평화를 위해 결전에 나서는 부하들에게 가슴을 치며 사기를 북돋우는 사령관의 웅장한 연설 대사입니다.",
    tag: "선언 & 지휘",
    gender: "male",
    vocabulary: [
      { word: "我が", reading: "わが", meaning: "우리, 나의", jlptLevel: "N2" },
      { word: "隊員", reading: "たいいん", meaning: "대원", jlptLevel: "N3" },
      { word: "捧げる", reading: "ささげる", meaning: "바치다, 헌신하다", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + のために",
        meaning: "~을 위하여 (목적/위함)",
        explanation: "숭고한 목표나 대의를 위해 행동할 때 쓰는 표현입니다.",
      },
      {
        pattern: "하1단 동사 고풍 명령형 ~よ (捧げよ)",
        meaning: "~하라 (장엄한 명령)",
        explanation: "하1단 동사 捧げる의 어간에 'よ'를 붙여 격식 있고 장엄한 선언을 나타냅니다.",
      },
    ],
    quiz: {
      question: "'~을 위하여'를 뜻하는 올바른 표현은?",
      options: ["のために", "のように", "のせいで", "のわりに"],
      correctIndex: 0,
      explanation: "목적이나 대의를 나타낼 때는 'のために'를 씁니다.",
    },
  },

  // ── 🐱 4. 츤데레 (TSUNDERE) ──
  {
    id: "aq-tsundere-01",
    animeId: "tsundere",
    animeTitleKo: "츤데레",
    animeTitleJa: "ツンデレ少女",
    characterKo: "새침한 소꿉친구",
    characterJa: "素直になれない幼馴染",
    quoteJa: "べ、別にあんたのために作ったんじゃないんだからね！",
    quoteReading: "べ、べつにあんたのためにつくったんじゃないんだからね！",
    quoteKo: "벼, 별로 널 위해서 만든 건 아니니까 말야!",
    sceneContext: "정성껏 만든 도시락이나 간식을 건네면서도 쑥스러워서 부끄러움을 감추려고 버럭 소리 지르는 전형적인 츤데레 대사입니다.",
    tag: "츤데레 & 부끄러움",
    gender: "female",
    vocabulary: [
      { word: "別に", reading: "べつに", meaning: "별로, 딱히 (부정 수반)", jlptLevel: "N4" },
      { word: "あんた", reading: "あんた", meaning: "너 (당신/구어체)", jlptLevel: "N5" },
      { word: "作る", reading: "つくる", meaning: "만들다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 과거형 + んじゃない (강한 부정 변명)",
        meaning: "~한 게 아니야!",
        explanation: "자신의 진짜 속마음을 숨기고 강하게 변명할 때 쓰는 대표적인 츤데레 어투입니다.",
      },
      {
        pattern: "종조사 ~んだからね",
        meaning: "~인 거니까 말야!",
        explanation: "부끄러움과 새침함을 섞어 상대방에게 쐐기를 박듯 감정을 전하는 종조사 결합입니다.",
      },
    ],
    quiz: {
      question: "부정문 앞에 쓰여 '별로, 딱히'를 뜻하는 부사는?",
      options: ["別に", "特に", "実に", "常に"],
      correctIndex: 0,
      explanation: "부정 표현과 호응하여 '별로 ~않다'를 나타낼 때는 '別に(べつに)'를 씁니다.",
    },
  },
  {
    id: "aq-tsundere-02",
    animeId: "tsundere",
    animeTitleKo: "츤데레",
    animeTitleJa: "ツンデレ少女",
    characterKo: "똑 부러진 우등생",
    characterJa: "しっかり者の委員長",
    quoteJa: "ちょっと、いつまで寝てるの？早く起きてよね！",
    quoteReading: "ちょっと、いつまでねてるの？はやくおきてよね！",
    quoteKo: "잠깐, 언제까지 자고 있을 거야? 어서 일어나라구!",
    sceneContext: "아침에 늦잠 자는 주인공을 깨우러 와서 잔소리하면서도 은근히 살뜰하게 챙겨주는 일상 케미 대사입니다.",
    tag: "일상 잔소리 & 케미",
    gender: "female",
    vocabulary: [
      { word: "寝る", reading: "ねる", meaning: "자다, 잠자리에 들다", jlptLevel: "N5" },
      { word: "早い", reading: "はやい", meaning: "빠르다, 이르다", jlptLevel: "N5" },
      { word: "起きる", reading: "おきる", meaning: "일어나다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 て형 + いる (寝ている -> 寝てる)",
        meaning: "자고 있다 (진행/상태의 축약)",
        explanation: "회화체에서 い가 탈락하여 '寝てる'로 짧고 빠르게 말합니다.",
      },
      {
        pattern: "동사 て형 + よね (起きてよね)",
        meaning: "~해 줘, ~하란 말야 (친근한 재촉)",
        explanation: "가까운 사이에서 애교 섞인 핀잔이나 재촉을 할 때 씁니다.",
      },
    ],
    quiz: {
      question: "'빨리'를 뜻하는 早い의 부사형은?",
      options: ["早く", "早いで", "早くて", "早さに"],
      correctIndex: 0,
      explanation: "이형용사의 부사형은 어미 'い'를 'く'로 바꾼 '早く'입니다.",
    },
  },
  {
    id: "aq-tsundere-03",
    animeId: "tsundere",
    animeTitleKo: "츤데레",
    animeTitleJa: "ツンデレ少女",
    characterKo: "속마음이 서툰 라이벌",
    characterJa: "不器用なライバル少女",
    quoteJa: "バカ！心配なんてしてないわよ！",
    quoteReading: "バカ！しんぱいなんてしてないわよ！",
    quoteKo: "바보! 걱정 따위 안 했거든!",
    sceneContext: "다치거나 늦게 돌아온 주인공을 보고 안도하면서도, 걱정한 티를 내지 않으려고 붉어진 얼굴로 쏘아붙이는 대사입니다.",
    tag: "츤데레 & 안도",
    gender: "female",
    vocabulary: [
      { word: "バカ", reading: "ばか", meaning: "바보 (친근한 투정)", jlptLevel: "N5" },
      { word: "心配", reading: "しんぱい", meaning: "걱정, 염려", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + なんて (경시/부정 강조)",
        meaning: "~따위, ~같은 건",
        explanation: "자신이 한 행동이나 감정을 짐짓 대수롭지 않은 척 부인할 때 씁니다.",
      },
      {
        pattern: "여성어 종조사 ~わよ",
        meaning: "~인걸, ~거든 (자신감/새침함)",
        explanation: "문말에 붙어 여성스러운 단호함을 표현하는 전형적인 애니메이션 어투입니다.",
      },
    ],
    quiz: {
      question: "'걱정 따위'를 나타낼 때 '心配(걱정)' 뒤에 붙는 표현은?",
      options: ["なんて", "だから", "なのに", "として"],
      correctIndex: 0,
      explanation: "'~따위, ~같은 건'을 나타낼 때는 'なんて'를 씁니다.",
    },
  },
  {
    id: "aq-tsundere-04",
    animeId: "tsundere",
    animeTitleKo: "츤데레",
    animeTitleJa: "ツンデレ少女",
    characterKo: "솔직해진 순간",
    characterJa: "一瞬だけ素直な瞬間",
    quoteJa: "…今日だけは、隣にいてあげてもいいわよ。",
    quoteReading: "…きょうだけは、となりにいてあげてもいいわよ。",
    quoteKo: "…오늘만큼은, 곁에 있어줘도 괜찮아.",
    sceneContext: "평소에는 쌀쌀맞다가 축제나 특별한 밤에 은근슬쩍 주인공 곁에 머물며 호감을 내비치는 설레는 명장면 대사입니다.",
    tag: "츤데레 & 심쿵",
    gender: "female",
    vocabulary: [
      { word: "今日", reading: "きょう", meaning: "오늘", jlptLevel: "N5" },
      { word: "隣", reading: "となり", meaning: "옆, 곁", jlptLevel: "N5" },
      { word: "居る", reading: "いる", meaning: "있다 (사람/동물)", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 て형 + あげる (いてあげる)",
        meaning: "~해 주다 (호의를 베풀다)",
        explanation: "자신이 선심 쓰듯 상대방에게 행동해 주는 뉘앙스를 담아 호감을 우회적으로 표현합니다.",
      },
      {
        pattern: "동사 て형 + もいい (いてもいい)",
        meaning: "~해도 괜찮다 (허가/수락)",
        explanation: "조건부로 은근한 호의를 허락하는 부드러운 말투입니다.",
      },
    ],
    quiz: {
      question: "'곁에 있어 주다'에 해당하는 올바른 표현은?",
      options: ["隣にいてあげる", "隣にいらっしゃる", "隣にいたす", "隣にいていただく"],
      correctIndex: 0,
      explanation: "내가 상대방에게 호의를 베풀 때는 '동사 て형 + あげる'를 씁니다.",
    },
  },

  // ── 🦹 5. 지능형 빌런 (VILLAIN) ──
  {
    id: "aq-villain-01",
    animeId: "villain",
    animeTitleKo: "지능형 빌런",
    animeTitleJa: "知性派黒幕",
    characterKo: "우아한 흑막",
    characterJa: "冷徹なる支配者",
    quoteJa: "あまり強い言葉を使うなよ。弱く見えるぞ。",
    quoteReading: "あまりつよいことばをつかうなよ。よわくみえるぞ。",
    quoteKo: "너무 강한 말을 쓰지 마라. 약해 보인다구.",
    sceneContext: "격앙된 상대를 여유롭게 내려다보며 한마디로 심리적 우위를 점하는 지능형 악역의 서늘하고 지적인 카리스마 명대사입니다.",
    tag: "카리스마 & 심리전",
    gender: "male",
    vocabulary: [
      { word: "強い", reading: "つよい", meaning: "강하다, 세다", jlptLevel: "N5" },
      { word: "使う", reading: "つかう", meaning: "사용하다, 쓰다", jlptLevel: "N5" },
      { word: "弱い", reading: "よわい", meaning: "약하다", jlptLevel: "N5" },
      { word: "見える", reading: "みえる", meaning: "보이다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "이형용사 어간 + く + 見える (弱く見える)",
        meaning: "~하게 보이다",
        explanation: "이형용사의 어미 'い'를 'く'로 바꾸고 見える를 결합해 외관이나 인상을 묘사합니다.",
      },
      {
        pattern: "종조사 ぞ (남성 경고/선언)",
        meaning: "~한다구, ~할 걸",
        explanation: "상대방에게 주의를 주거나 강한 확신을 전하는 남성 권위적 어투입니다.",
      },
    ],
    quiz: {
      question: "'약해 보이다'를 뜻하는 올바른 일본어 표현은?",
      options: ["弱く見える", "弱いに見える", "弱くて見える", "弱いそうに見える"],
      correctIndex: 0,
      explanation: "이형용사 + 見える는 어미를 'く'로 바꾼 '弱く見える'입니다.",
    },
  },
  {
    id: "aq-villain-02",
    animeId: "villain",
    animeTitleKo: "지능형 빌런",
    animeTitleJa: "知性派黒幕",
    characterKo: "완벽주의 전략가",
    characterJa: "完璧主義の策略家",
    quoteJa: "すべては、私の計画通りに進んでいる。",
    quoteReading: "すべては、わたしのけいかくどおりにすすんでいる。",
    quoteKo: "모든 것은, 내 계획대로 진행되고 있다.",
    sceneContext: "주인공 일행의 고군분투조차 이미 자신의 손바닥 안이었음을 비웃으며 홀로 미소 짓는 흑막의 명대사입니다.",
    tag: "계략 & 흑막",
    gender: "male",
    vocabulary: [
      { word: "すべて", reading: "すべて", meaning: "모든 것, 전부", jlptLevel: "N3" },
      { word: "計画", reading: "けいかく", meaning: "계획", jlptLevel: "N4" },
      { word: "進む", reading: "すすむ", meaning: "나아가다, 진행되다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + 通り (計画通り)",
        meaning: "~대로, ~한 바와 같이",
        explanation: "명사 뒤에 通り(どおり)를 붙여 예상이나 기준과 일치함을 나타냅니다.",
      },
    ],
    quiz: {
      question: "'계획대로'를 뜻하는 올바른 결합 표현은?",
      options: ["計画通り", "計画のように", "計画に沿って", "計画の通りに"],
      correctIndex: 0,
      explanation: "명사 + 通り(どおり)는 '計画通り(계획대로)'입니다.",
    },
  },
  {
    id: "aq-villain-03",
    animeId: "villain",
    animeTitleKo: "지능형 빌런",
    animeTitleJa: "知性派黒幕",
    characterKo: "허무주의 철학자",
    characterJa: "虚無を語る哲学者",
    quoteJa: "憧れとは、理解から最も遠い感情だよ。",
    quoteReading: "あこがれとは、りかいからもつともとおいかんじょうだよ。",
    quoteKo: "동경이란, 이해로부터 가장 먼 감정이야.",
    sceneContext: "자신을 맹목적으로 따르는 부하에게 대상을 숭배하고 동경하는 한 결코 그 본질을 객관적으로 꿰뚫어 볼 수 없음을 냉정하게 설파하는 대사입니다.",
    tag: "통찰 & 냉철",
    gender: "male",
    vocabulary: [
      { word: "憧れ", reading: "あこがれ", meaning: "동경, 갈망", jlptLevel: "N2" },
      { word: "理解", reading: "りかい", meaning: "이해", jlptLevel: "N3" },
      { word: "最も", reading: "もっとも", meaning: "가장, 제일", jlptLevel: "N3" },
      { word: "遠い", reading: "とおい", meaning: "멀다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + とは (정의/설명)",
        meaning: "~(이)란 것은",
        explanation: "특정 개념이나 가치관에 대해 정의를 내릴 때 문어적으로 쓰는 표현입니다.",
      },
      {
        pattern: "최상급 부사 最も + 형용사 (最も遠い)",
        meaning: "가장 먼",
        explanation: "격식 있고 논리적인 말투에서 최상급을 나타낼 때 사용합니다.",
      },
    ],
    quiz: {
      question: "'가장'을 뜻하는 격식 있는 부사는?",
      options: ["最も", "一番", "とても", "かなり"],
      correctIndex: 0,
      explanation: "격식 있는 문어적 최상급 표현은 '最も(もっとも)'입니다.",
    },
  },
  {
    id: "aq-villain-04",
    animeId: "villain",
    animeTitleKo: "지능형 빌런",
    animeTitleJa: "知性派黒幕",
    characterKo: "압도적 절대자",
    characterJa: "絶対的強者",
    quoteJa: "この世界の理を変えるのは、力ある者のみだ。",
    quoteReading: "このせかいのことわりをかえるのは、ちからあるもののみだ。",
    quoteKo: "이 세계의 이치를 바꾸는 것은, 힘 있는 자뿐이다.",
    sceneContext: "약육강식의 냉혹한 세계관을 정당화하며 주인공의 순진한 이상론을 힘으로 찍어누르는 절대 악역의 대사입니다.",
    tag: "세계관 & 절대권력",
    gender: "male",
    vocabulary: [
      { word: "理", reading: "ことわり", meaning: "이치, 도리", jlptLevel: "N1" },
      { word: "変える", reading: "かえる", meaning: "바꾸다", jlptLevel: "N4" },
      { word: "者", reading: "もの", meaning: "자, 사람", jlptLevel: "N3" },
      { word: "のみ", reading: "のみ", meaning: "오직 ~뿐 (격식)", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + のみ (한정)",
        meaning: "오직 ~만, ~뿐",
        explanation: "だけ보다 격조 높고 단호한 한정의 조사로, 고위 악역이나 격언에 자주 쓰입니다.",
      },
    ],
    quiz: {
      question: "'오직 ~뿐'을 뜻하는 격식 있는 조사는?",
      options: ["のみ", "ほど", "ばかり", "くらい"],
      correctIndex: 0,
      explanation: "격식 있는 한정 조사는 'のみ'입니다.",
    },
  },

  // ── 🪄 6. 신비한 마법사 (MYSTIC) ──
  {
    id: "aq-mystic-01",
    animeId: "mystic",
    animeTitleKo: "신비한 마법사",
    animeTitleJa: "悠久の魔法使い",
    characterKo: "천년을 사는 엘프",
    characterJa: "千年生きたエルフ",
    quoteJa: "人間の寿命は短いのに…なんでもっと知ろうとしなかったんだろう。",
    quoteReading: "にんげんのじゅみょうはみじかいのに…なんでもっとしろうとしなかったんだろう。",
    quoteKo: "인간의 수명은 짧은데도… 왜 좀 더 알려고 하지 않았던 걸까.",
    sceneContext: "수명이 짧은 소중한 인간 동료를 떠나보낸 뒤, 뒤늦게 그와 함께했던 시간의 가치를 깨닫고 쓸쓸히 읊조리는 판타지 명대사입니다.",
    tag: "수명 & 아련함",
    gender: "female",
    vocabulary: [
      { word: "人間", reading: "にんげん", meaning: "인간, 사람", jlptLevel: "N3" },
      { word: "寿命", reading: "じゅみょう", meaning: "수명", jlptLevel: "N2" },
      { word: "知る", reading: "しる", meaning: "알다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 의지형 + と + する (知ろうとする)",
        meaning: "~하려고 시도하다, 애쓰다",
        explanation: "1그룹 동사 知る의 의지형 知ろう 뒤에 とする를 결합해 '노력하여 알고자 하다'를 나타냅니다.",
      },
      {
        pattern: "의문 + だろう (しなかったんだろう)",
        meaning: "~했던 것일까 (독백적 회한)",
        explanation: "자신을 향해 아쉬움과 후회를 조용히 되묻는 감성적인 문말 표현입니다.",
      },
    ],
    quiz: {
      question: "'알려고 하다'를 뜻하는 올바른 의지 시도 문법은?",
      options: ["知ろうとする", "知るにする", "知りたいとする", "知るようになる"],
      correctIndex: 0,
      explanation: "동사 의지형 + とする는 '~하려고 시도하다'입니다.",
    },
  },
  {
    id: "aq-mystic-02",
    animeId: "mystic",
    animeTitleKo: "신비한 마법사",
    animeTitleJa: "悠久の魔法使い",
    characterKo: "따뜻한 용사",
    characterJa: "心優しい勇者",
    quoteJa: "くだらなくて楽しい旅が、僕は好きなんだ。",
    quoteReading: "くだらなくてたのしいたびが、ぼくはすきなんだ。",
    quoteKo: "하찮고도 즐거운 여행이, 나는 좋은 거야.",
    sceneContext: "거창한 마왕 퇴치보다도 길을 걸으며 사람들을 돕고 작은 추억을 쌓는 과정 자체가 행복임을 전하는 따뜻한 대사입니다.",
    tag: "인생관 & 추억",
    gender: "male",
    vocabulary: [
      { word: "くだらない", reading: "くだらない", meaning: "하찮다, 시시하다", jlptLevel: "N3" },
      { word: "楽しい", reading: "たのしい", meaning: "즐겁다", jlptLevel: "N5" },
      { word: "旅", reading: "たび", meaning: "여행", jlptLevel: "N4" },
      { word: "好き", reading: "すき", meaning: "좋아함", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "이형용사 연결형 ~くて (くだらなくて)",
        meaning: "~하고, ~해서",
        explanation: "형용사 くだらない의 어미 い를 くて로 바꾸어 여러 감정을 자연스럽게 나열합니다.",
      },
    ],
    quiz: {
      question: "이형용사 くだらない(시시하다)의 연결형(~하고)은?",
      options: ["くだらなくて", "くだらないで", "くだらなそう", "くだらなくては"],
      correctIndex: 0,
      explanation: "이형용사의 연결형은 'くて'입니다.",
    },
  },
  {
    id: "aq-mystic-03",
    animeId: "mystic",
    animeTitleKo: "신비한 마법사",
    animeTitleJa: "悠久の魔法使い",
    characterKo: "대마법사",
    characterJa: "圧倒的大魔導士",
    quoteJa: "我が魔力の前では、小細工など無意味だ。",
    quoteReading: "わがまりょくのまえでは、こざいくなどむいみだ。",
    quoteKo: "내 마력 앞에서는, 잔재주 따위 무의미하다.",
    sceneContext: "평생 숨겨온 엄청난 마력을 일순간에 방출하며 비열한 적을 한순간에 굴복시키는 단호하고 냉엄한 대사입니다.",
    tag: "카리스마 & 압도",
    gender: "female",
    vocabulary: [
      { word: "魔力", reading: "まりょく", meaning: "마력", jlptLevel: "N2" },
      { word: "小細工", reading: "こざいく", meaning: "잔재주, 얕은수", jlptLevel: "N1" },
      { word: "無意味", reading: "むいみ", meaning: "무의미함", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + など (경시)",
        meaning: "~따위, ~등",
        explanation: "적의 얕은 속임수를 대수롭지 않게 일축할 때 씁니다.",
      },
    ],
    quiz: {
      question: "'잔재주'를 뜻하는 일본어 한자어는?",
      options: ["小細工", "大細工", "小手先", "手工芸"],
      correctIndex: 0,
      explanation: "얕은 꾀나 잔재주는 '小細工(こざいく)'입니다.",
    },
  },
  {
    id: "aq-mystic-04",
    animeId: "mystic",
    animeTitleKo: "신비한 마법사",
    animeTitleJa: "悠久の魔法使い",
    characterKo: "고대의 정령",
    characterJa: "森の守호자",
    quoteJa: "時の流れは静かに、すべてを癒してくれるでしょう。",
    quoteReading: "ときのながれはしずかに、すべてをいやしてくれるでしょう。",
    quoteKo: "시간의 흐름은 고요하게, 모든 것을 치유해 주겠지요.",
    sceneContext: "상처 입은 모험가들에게 자연과 시간의 위대한 치유력을 이야기하며 위로를 건네는 신비롭고 서정적인 대사입니다.",
    tag: "힐링 & 위로",
    gender: "female",
    vocabulary: [
      { word: "流れ", reading: "ながれ", meaning: "흐름", jlptLevel: "N3" },
      { word: "静か", reading: "しずか", meaning: "조용함, 고요함", jlptLevel: "N5" },
      { word: "癒す", reading: "いやす", meaning: "치유하다, 달래다", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "동사 て형 + くれる (癒してくれる)",
        meaning: "~해 주다 (나를 위해 베풀다)",
        explanation: "시간의 흐름이 나에게 치유라는 은혜를 베풀어 줌을 표현합니다.",
      },
      {
        pattern: "추측의 でしょう",
        meaning: "~하겠지요, ~일 것입니다",
        explanation: "상냥하고 부드러운 어조로 미래의 희망을 예견합니다.",
      },
    ],
    quiz: {
      question: "'치유하다/달래다'를 뜻하는 동사는?",
      options: ["癒す", "流す", "静まる", "隠す"],
      correctIndex: 0,
      explanation: "상처나 피로를 치유하다는 '癒す(いやす)'입니다.",
    },
  },

  // ── 🏀 7. 열정 스포츠맨 (SPORTS) ──
  {
    id: "aq-sports-01",
    animeId: "sports",
    animeTitleKo: "열정 스포츠맨",
    animeTitleJa: "青春アスリート",
    characterKo: "천재 바보 에이스",
    characterJa: "赤い髪のルーキー",
    quoteJa: "左手はそえるだけ…！",
    quoteReading: "ひだりてはそえるだけ…！",
    quoteKo: "왼손은 거들 뿐…!",
    sceneContext: "역전 버저비터를 넣기 직전, 수없이 반복 연습했던 슛의 기본기를 되뇌며 마음을 비우는 스포츠 만화 최고의 명장면 클리셰 대사입니다.",
    tag: "기본기 & 승리",
    gender: "male",
    vocabulary: [
      { word: "左手", reading: "ひだりて", meaning: "왼손", jlptLevel: "N4" },
      { word: "そえる", reading: "そえる", meaning: "곁들이다, 거들다", jlptLevel: "N2" },
      { word: "だけ", reading: "だけ", meaning: "오직, ~뿐", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + だけ (そえるだけ)",
        meaning: "단지 ~할 뿐",
        explanation: "불필요한 힘을 주지 않고 오직 정해진 동작만 수행함을 나타내는 절제된 표현입니다.",
      },
    ],
    quiz: {
      question: "'왼손'을 뜻하는 올바른 발음은?",
      options: ["ひだりて", "みぎて", "りょうて", "かたて"],
      correctIndex: 0,
      explanation: "왼손은 '左手(ひだりて)'입니다.",
    },
  },
  {
    id: "aq-sports-02",
    animeId: "sports",
    animeTitleKo: "열정 스포츠맨",
    animeTitleJa: "青春アスリート",
    characterKo: "코트로 돌아온 슈터",
    characterJa: "復活のシューター",
    quoteJa: "先生…!! もう一度、みんなとバスケがしたいです……",
    quoteReading: "せんせい…!! もういちど、みんなとバスケがしたいです……",
    quoteKo: "선생님…!! 다시 한 번, 다 함께 농구가 하고 싶어요……",
    sceneContext: "방황을 끝내고 코트로 돌아와 지도자 앞에서 눈물을 흘리며 진심을 털어놓는 감동적인 회한과 열정의 대사입니다.",
    tag: "회한 & 열정",
    gender: "male",
    vocabulary: [
      { word: "もう一度", reading: "もういちど", meaning: "다시 한 번", jlptLevel: "N5" },
      { word: "みんな", reading: "みんな", meaning: "모두, 다 함께", jlptLevel: "N5" },
      { word: "したい", reading: "したい", meaning: "하고 싶다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "대상 + が + したい (バスケがしたい)",
        meaning: "~을/를 하고 싶다",
        explanation: "희망 조동사 ~たい 앞에는 목적어 조사 'を' 대신 'が'를 쓰는 것이 매우 자연스럽습니다.",
      },
    ],
    quiz: {
      question: "'농구가 하고 싶어요'에서 희망 대상 뒤에 붙는 가장 자연스러운 조사는?",
      options: ["が", "を", "に", "で"],
      correctIndex: 0,
      explanation: "~たい 앞의 대상에는 조사 'が'를 사용하는 것이 자연스럽습니다.",
    },
  },
  {
    id: "aq-sports-03",
    animeId: "sports",
    animeTitleKo: "열정 스포츠맨",
    animeTitleJa: "青春アスリート",
    characterKo: "불타는 승부사",
    characterJa: "熱血キャプテン",
    quoteJa: "オレの栄光時代は…オレは今なんだよ!!",
    quoteReading: "オレのえいこうじだいは…オレはいまなんだよ!!",
    quoteKo: "내 영광의 시대는… 난 지금이라고요!!",
    sceneContext: "부상의 위험 속에서도 과거의 영광이나 미래의 안위보다 지금 이 순간 팀의 승리를 위해 모든 것을 쏟아붓겠다는 뜨거운 청춘 투혼의 명대사입니다.",
    tag: "투혼 & 청춘",
    gender: "male",
    vocabulary: [
      { word: "栄光", reading: "えいこう", meaning: "영광", jlptLevel: "N2" },
      { word: "時代", reading: "じだい", meaning: "시대, 시절", jlptLevel: "N4" },
      { word: "今", reading: "いま", meaning: "지금, 현재", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + なんだよ (オレは今なんだよ)",
        meaning: "~인 거야! (강한 감정 토로)",
        explanation: "명사 뒤에 なんだよ를 붙여 현재 자신의 결의와 벅찬 감정을 온몸으로 표출합니다.",
      },
    ],
    quiz: {
      question: "'영광'을 뜻하는 일본어 한자어는?",
      options: ["栄光", "勝利", "青春", "名誉"],
      correctIndex: 0,
      explanation: "영광은 '栄光(えいこう)'입니다.",
    },
  },
  {
    id: "aq-sports-04",
    animeId: "sports",
    animeTitleKo: "열정 스포츠맨",
    animeTitleJa: "青春アスリート",
    characterKo: "단합을 외치는 주장",
    characterJa: "チームの柱",
    quoteJa: "最後まで絶対に足を止めるな！勝ちに行くぞ！",
    quoteReading: "さいごまでぜったいにあしをとめるな！かちにいくぞ！",
    quoteKo: "마지막까지 절대로 발을 멈추지 마! 이기러 간다!",
    sceneContext: "체력이 바닥난 경기 종료 직전, 동료들의 이름을 부르며 끝까지 뛰라고 소리치는 주장의 든든한 리더십 대사입니다.",
    tag: "리더십 & 투지",
    gender: "male",
    vocabulary: [
      { word: "最後", reading: "さいご", meaning: "마지막", jlptLevel: "N4" },
      { word: "止める", reading: "とめる", meaning: "멈추다, 세우다", jlptLevel: "N4" },
      { word: "勝つ", reading: "かつ", meaning: "이기다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "동사 ます형 어간 + に行く (勝ちに行く)",
        meaning: "~하러 가다 (목적 이동)",
        explanation: "동사의 목적을 나타낼 때 ます형 어간 뒤에 に行く를 붙입니다.",
      },
    ],
    quiz: {
      question: "'이기러 가다'를 뜻하는 올바른 표현은?",
      options: ["勝ちに行く", "勝つに行く", "勝って行く", "勝とうに行く"],
      correctIndex: 0,
      explanation: "목적 이동 표현은 동사 ます형 어간 + に行く입니다.",
    },
  },

  // ── 🤖 8. 고뇌하는 소년 (PILOT) ──
  {
    id: "aq-pilot-01",
    animeId: "pilot",
    animeTitleKo: "고뇌하는 소년",
    animeTitleJa: "苦悩する少年",
    characterKo: "자기 극복의 소년",
    characterJa: "運命を背負う少年",
    quoteJa: "逃げちゃダメだ、逃げちゃダメだ、逃げちゃダメだ！",
    quoteReading: "にげちゃダメだ、にげちゃダメだ、にげちゃダメだ！",
    quoteKo: "도망치면 안 돼, 도망치면 안 돼, 도망치면 안 돼!",
    sceneContext: "극심한 두려움과 압박감 속에서도 도망치지 않고 탑승석에 올라타며 자신을 채찍질하는 유명한 자기암시 대사입니다.",
    tag: "용기 & 자기극복",
    gender: "male",
    vocabulary: [
      { word: "逃げる", reading: "にげる", meaning: "도망치다", jlptLevel: "N4" },
      { word: "ダメ", reading: "だめ", meaning: "안 됨, 글렀음", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "~ちゃダメだ (구어체 금지)",
        meaning: "~해서는 안 돼 (~てはだめだ의 축약)",
        explanation: "동사 て형 + は가 구어체에서 'ちゃ'로 축약되어 내면의 다급한 금지를 표현합니다.",
      },
    ],
    quiz: {
      question: "'逃げちゃダメだ'의 표준 문어체 형태는?",
      options: ["逃げてはだめだ", "逃げないで", "逃げたらだめ", "逃げてはいけない"],
      correctIndex: 0,
      explanation: "~ちゃダメだ는 회화체 축약으로 원형은 ~てはだめだ입니다.",
    },
  },
  {
    id: "aq-pilot-02",
    animeId: "pilot",
    animeTitleKo: "고뇌하는 소년",
    animeTitleJa: "苦悩する少年",
    characterKo: "무감정한 소녀",
    characterJa: "感情を隠す少女",
    quoteJa: "ごめんなさい。こういう時、どんな顔をすればいいか分からないの。",
    quoteReading: "ごめんなさい。こういうとき、どんなかおをすればいいかわからないの。",
    quoteKo: "미안해. 이럴 때, 어떤 표정을 지어야 좋을지 모르겠어.",
    sceneContext: "자신을 구해준 친구에게 고마움과 감정 표현이 서툴러 조심스럽게 건네는 아련하고 애틋한 명대사입니다.",
    tag: "서투른 감정",
    gender: "female",
    vocabulary: [
      { word: "顔", reading: "かお", meaning: "얼굴, 표정", jlptLevel: "N5" },
      { word: "時", reading: "とき", meaning: "때, 경우", jlptLevel: "N5" },
      { word: "分かる", reading: "わかる", meaning: "알다, 이해하다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 가정형 + ばいい (すればいい)",
        meaning: "~하면 좋다 (방법 질문)",
        explanation: "적절한 행동이나 대처법을 조언 구할 때 사용하는 전형적인 표현입니다.",
      },
    ],
    quiz: {
      question: "'어떻게 하면 좋을까?'에 해당하는 올바른 표현은?",
      options: ["どうすればいい？", "どうするといい？", "どうしたほうがいい？", "どうしようか？"],
      correctIndex: 0,
      explanation: "방법을 묻거나 고민할 때는 '가정형 + ばいい'를 씁니다.",
    },
  },
  {
    id: "aq-pilot-03",
    animeId: "pilot",
    animeTitleKo: "고뇌하는 소년",
    animeTitleJa: "苦悩하는少年",
    characterKo: "엄격한 사령관",
    characterJa: "非情な司令官",
    quoteJa: "覚悟があるなら乗れ。でなければ今すぐ立ち去れ。",
    quoteReading: "かくごがあるならのれ。でなければいますぐたちされ。",
    quoteKo: "각오가 있다면 타라. 그렇지 않다면 지금 당장 떠나라.",
    sceneContext: "망설이는 조종사에게 한 치의 핑계도 허용하지 않고 냉엄한 결단을 요구하는 사령관의 냉혹한 명령 대사입니다.",
    tag: "결단 & 명령",
    gender: "male",
    vocabulary: [
      { word: "覚悟", reading: "かくご", meaning: "각오", jlptLevel: "N2" },
      { word: "乗る", reading: "のる", meaning: "타다, 탑승하다", jlptLevel: "N5" },
      { word: "立ち去る", reading: "たちさる", meaning: "떠나가다, 물러나다", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + なら (조건)",
        meaning: "~할 거라면, ~하다면",
        explanation: "상대의 의지와 각오를 전제로 단호하게 조건을 제시합니다.",
      },
      {
        pattern: "접속사 でなければ",
        meaning: "그렇지 않다면",
        explanation: "조건이 충족되지 않을 때의 냉정한 대안을 제시합니다.",
      },
    ],
    quiz: {
      question: "동사 乗る(타다)의 명령형은?",
      options: ["乗れ", "乗りろ", "乗ろう", "乗るな"],
      correctIndex: 0,
      explanation: "5단 동사 乗る의 명령형은 '乗れ(のれ)'입니다.",
    },
  },
  {
    id: "aq-pilot-04",
    animeId: "pilot",
    animeTitleKo: "고뇌하는 소년",
    animeTitleJa: "苦悩する少年",
    characterKo: "성숙한 작전부장",
    characterJa: "頼れる年上の女性",
    quoteJa: "無事に帰ってきたら、続きのお祝いをしましょう。",
    quoteReading: "ぶじにかえってきたら、つづきのおいわいをしましょう。",
    quoteKo: "무사히 돌아오면, 다음 축하를 마저 해요.",
    sceneContext: "목숨을 걸고 출격하는 소년에게 살아서 꼭 돌아오라는 격려와 약속을 건네는 따뜻하고 어른스러운 명장면 대사입니다.",
    tag: "약속 & 격려",
    gender: "female",
    vocabulary: [
      { word: "無事", reading: "ぶじ", meaning: "무사함, 탈 없음", jlptLevel: "N4" },
      { word: "続き", reading: "つづき", meaning: "이어짐, 계속", jlptLevel: "N3" },
      { word: "お祝い", reading: "おいわい", meaning: "축하", jlptLevel: "N3" },
    ],
    grammarPoints: [
      {
        pattern: "동사 과거형 + たら (帰ってきたら)",
        meaning: "~하고 나면, ~하면 (완료 조건)",
        explanation: "무사 귀환을 반드시 완수할 것을 전제로 미래의 약속을 정중하게 제안합니다.",
      },
    ],
    quiz: {
      question: "'돌아오면'을 뜻하는 완료 후 가정 표현은?",
      options: ["帰ってきたら", "帰ってきたなら", "帰ってくれば", "帰ってくると"],
      correctIndex: 0,
      explanation: "동작 완료 후 가정을 나타내는 가장 자연스러운 일상 표현은 'たら'입니다.",
    },
  },
];
