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

export type AnimeId =
  | "onepiece"
  | "naruto"
  | "bleach"
  | "frieren"
  | "jujutsu"
  | "aot"
  | "evangelion"
  | "slamdunk";

export interface AnimeQuoteItem {
  id: string;
  animeId: AnimeId;
  animeTitleKo: string;
  animeTitleJa: string;
  characterKo: string;
  characterJa: string;
  quoteJa: string;
  quoteReading?: string;
  quoteKo: string;
  sceneContext: string;
  tag: string;
  vocabulary: AnimeVocabItem[];
  grammarPoints: AnimeGrammarItem[];
  quiz: AnimeQuizItem;
}

export interface AnimeCategory {
  id: "all" | AnimeId;
  label: string;
  icon: string;
  badgeBg: string;
}

export const ANIME_CATEGORIES: AnimeCategory[] = [
  { id: "all", label: "전체", icon: "🎬", badgeBg: "bg-sakura-pink" },
  { id: "onepiece", label: "원피스", icon: "🏴‍☠️", badgeBg: "bg-amber-400" },
  { id: "naruto", label: "나루토", icon: "🍥", badgeBg: "bg-orange-400" },
  { id: "bleach", label: "블리치", icon: "⚔️", badgeBg: "bg-sky-400" },
  { id: "frieren", label: "프리렌", icon: "🪄", badgeBg: "bg-emerald-400" },
  { id: "jujutsu", label: "주술회전", icon: "🤞", badgeBg: "bg-purple-400" },
  { id: "aot", label: "진격의 거인", icon: "🕊️", badgeBg: "bg-stone-400" },
  { id: "evangelion", label: "에반게리온", icon: "🤖", badgeBg: "bg-indigo-400" },
  { id: "slamdunk", label: "슬램덩크", icon: "🏀", badgeBg: "bg-rose-400" },
];

export const ANIME_QUOTES_DATA: AnimeQuoteItem[] = [
  // ── 🏴‍☠️ 1. 원피스 (ONE PIECE) ──
  {
    id: "aq-op-01",
    animeId: "onepiece",
    animeTitleKo: "원피스",
    animeTitleJa: "ONE PIECE",
    characterKo: "몽키 D. 루피",
    characterJa: "モンキー・D・ルフィ",
    quoteJa: "海賊王に、おれはなる！",
    quoteReading: "かいぞくおうに、おれはなる！",
    quoteKo: "해적왕이, 나는 될 거다!",
    sceneContext: "루피가 모험을 떠날 때마다 자신의 확고한 꿈과 결의를 다지며 외치는 원피스 최고의 상징적인 대사입니다.",
    tag: "꿈 & 각오",
    vocabulary: [
      { word: "海賊王", reading: "かいぞくおう", meaning: "해적왕", jlptLevel: "N3" },
      { word: "おれ", reading: "おれ", meaning: "나 (남성 구어 1인칭)", jlptLevel: "N5" },
      { word: "なる", reading: "なる", meaning: "되다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + になる",
        meaning: "~이/가 되다",
        explanation: "상태나 신분의 변화를 나타낼 때 조사 'に'와 동사 'なる'를 함께 씁니다.",
      },
      {
        pattern: "도치법 (おれはなる)",
        meaning: "어순을 바꾸어 강조",
        explanation: "원래 문장인 'おれは海賊王になる'에서 목적어(海賊王に)를 문두로 빼서 목표를 강력하게 강조했습니다.",
      },
    ],
    quiz: {
      question: "다음 빈칸에 들어갈 알맞은 조사는? [ 海賊王(  )、おれはなる！ ]",
      options: ["を", "に", "で", "と"],
      correctIndex: 1,
      explanation: "'~이 되다'라는 변화의 결과를 나타낼 때는 조사 'に'를 사용합니다.",
    },
  },
  {
    id: "aq-op-02",
    animeId: "onepiece",
    animeTitleKo: "원피스",
    animeTitleJa: "ONE PIECE",
    characterKo: "롤로노아 조로",
    characterJa: "ロロノア・ゾロ",
    quoteJa: "背中の傷は剣士の恥だ。",
    quoteReading: "せなかのきずはけんしのはじだ。",
    quoteKo: "등 뒤의 상처는 검사의 수치다.",
    sceneContext: "세계 최강의 검사 미호크와의 결투에서 패배를 직감하고도 도망치지 않고 정면으로 칼을 맞이하며 남긴 명대사입니다.",
    tag: "긍지 & 신념",
    vocabulary: [
      { word: "背中", reading: "せなか", meaning: "등", jlptLevel: "N3" },
      { word: "傷", reading: "きず", meaning: "상처, 흠집", jlptLevel: "N3" },
      { word: "剣士", reading: "けんし", meaning: "검사, 검객", jlptLevel: "N2" },
      { word: "恥", reading: "はじ", meaning: "수치, 부끄러움", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + だ",
        meaning: "~이다 (단정의 조동사)",
        explanation: "반말 평서문에서 명사 뒤에 'だ'를 붙여 단호하고 확고한 어조를 나타냅니다.",
      },
    ],
    quiz: {
      question: "'등 뒤의 상처'를 일본어로 올바르게 쓴 것은?",
      options: ["背中の傷", "腹の傷", "手の傷", "足の傷"],
      correctIndex: 0,
      explanation: "등은 '背中(せなか)', 상처는 '傷(きず)'입니다.",
    },
  },
  {
    id: "aq-op-03",
    animeId: "onepiece",
    animeTitleKo: "원피스",
    animeTitleJa: "ONE PIECE",
    characterKo: "Dr. 히루루크",
    characterJa: "Dr.ヒルルク",
    quoteJa: "人はいつ死ぬと思う？…人に忘れられた時さ！",
    quoteReading: "ひとはいつしぬとおもう？…ひとにわすれられたときさ！",
    quoteKo: "사람은 언제 죽는다고 생각하나? …사람들에게 잊혀졌을 때다!",
    sceneContext: "쵸파의 스승 히루루크가 처형대 앞에서 사람들에게 진정한 죽음의 의미와 영혼의 불멸을 전하는 눈물겨운 명장면입니다.",
    tag: "인생 & 철학",
    vocabulary: [
      { word: "死ぬ", reading: "しぬ", meaning: "죽다", jlptLevel: "N5" },
      { word: "思う", reading: "おもう", meaning: "생각하다", jlptLevel: "N5" },
      { word: "忘れる", reading: "わすれる", meaning: "잊다", jlptLevel: "N5" },
      { word: "時", reading: "とき", meaning: "때, 순간", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 수동형 (忘れられる)",
        meaning: "~에게 잊혀지다",
        explanation: "하1단 동사 忘れる의 어간에 られ를 붙인 수동형으로, 다른 사람에 의해 잊힘을 당하는 상태를 의미합니다.",
      },
      {
        pattern: "종조사 さ",
        meaning: "~말이야, ~인 거지",
        explanation: "문말에 붙어 자신의 생각이나 주장을 가볍지만 확신에 차서 전하는 남성 구어체 종조사입니다.",
      },
    ],
    quiz: {
      question: "'잊혀졌을 때'에 해당하는 일본어 수동형 표현은?",
      options: ["忘れた時", "忘れられた時", "忘れる時", "忘れさせる時"],
      correctIndex: 1,
      explanation: "忘れる(잊다)의 수동 과거형은 忘れられた(잊혀진)입니다.",
    },
  },
  {
    id: "aq-op-04",
    animeId: "onepiece",
    animeTitleKo: "원피스",
    animeTitleJa: "ONE PIECE",
    characterKo: "샹크스",
    characterJa: "シャンクス",
    quoteJa: "どんな理由があろうと、おれは友達を傷つける奴は許さない！",
    quoteReading: "どんなりゆうがあろうと、おれはともだちをきずつけるやつはゆるさない！",
    quoteKo: "어떤 이유가 있든 간에, 난 친구를 상처 입히는 녀석은 용서 안 해!",
    sceneContext: "자신에게 술을 붓는 모욕은 웃어넘기지만, 친구인 어린 루피를 해치려는 산적들에게 분노하며 날린 대사입니다.",
    tag: "동료애",
    vocabulary: [
      { word: "理由", reading: "りゆう", meaning: "이유, 까닭", jlptLevel: "N4" },
      { word: "友達", reading: "ともだち", meaning: "친구", jlptLevel: "N5" },
      { word: "傷つける", reading: "きずつける", meaning: "상처 입히다, 다치게 하다", jlptLevel: "N2" },
      { word: "奴", reading: "やつ", meaning: "녀석, 놈", jlptLevel: "N3" },
      { word: "許す", reading: "ゆるす", meaning: "용서하다, 허락하다", jlptLevel: "N3" },
    ],
    grammarPoints: [
      {
        pattern: "동사 의지형 + と (があろうと)",
        meaning: "~하든 간에, ~라 할지라도",
        explanation: "ある의 고풍스러운 의지형 あろう 뒤에 と를 붙여 양보 조건('어떤 이유가 있든지')을 나타냅니다.",
      },
      {
        pattern: "동사 부정형 (許さない)",
        meaning: "용서하지 않는다",
        explanation: "5단 동사 許す(ゆるす)의 어미를 あ단(さ)으로 바꾸고 ない를 결합한 부정형입니다.",
      },
    ],
    quiz: {
      question: "'용서하지 않는다'를 뜻하는 許す의 부정형은?",
      options: ["許しない", "許さない", "許せたい", "許すまい"],
      correctIndex: 1,
      explanation: "5단 동사 許す의 부정형은 許さない(ゆるさない)입니다.",
    },
  },

  // ── 🍥 2. 나루토 (NARUTO) ──
  {
    id: "aq-naruto-01",
    animeId: "naruto",
    animeTitleKo: "나루토",
    animeTitleJa: "NARUTO -ナルト-",
    characterKo: "우즈마키 나루토",
    characterJa: "うずまきナルト",
    quoteJa: "まっすぐ自分の言葉は曲げねぇ。それがオレ의 忍道だ！",
    quoteReading: "まっすぐじぶんのことばはまげねぇ。それがオレのにんどうだ！",
    quoteKo: "똑바로 내 말은 굽히지 않아. 그것이 내 닌자의 길이다!",
    sceneContext: "어떤 역경과 고난 앞에서도 절대 포기하거나 말을 번복하지 않는 나루토의 닌자 철학을 대변하는 대사입니다.",
    tag: "신념 & 닌자의 길",
    vocabulary: [
      { word: "まっすぐ", reading: "まっすぐ", meaning: "똑바로, 곧장", jlptLevel: "N4" },
      { word: "自分", reading: "じぶん", meaning: "자신, 자기", jlptLevel: "N5" },
      { word: "言葉", reading: "ことば", meaning: "말, 단어", jlptLevel: "N5" },
      { word: "曲げる", reading: "まげる", meaning: "굽히다, 왜곡하다", jlptLevel: "N2" },
      { word: "忍道", reading: "にんどう", meaning: "닌자의 길(신념)", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "~ねぇ (구어체 축약 부정)",
        meaning: "~지 않아 (~ない의 소년 만화 구어체)",
        explanation: "曲げない(まげない)가 거친 소년 구어체에서 '曲げねぇ(まげねぇ)'로 변형된 표현입니다.",
      },
    ],
    quiz: {
      question: "'曲げねぇ'의 표준어 표현은 무엇일까요?",
      options: ["曲げない", "曲げた", "曲げよう", "曲げろ"],
      correctIndex: 0,
      explanation: "소년 만화 구어체에서 '~ねぇ'는 부정형 '~ない'의 변형입니다.",
    },
  },
  {
    id: "aq-naruto-02",
    animeId: "naruto",
    animeTitleKo: "나루토",
    animeTitleJa: "NARUTO -ナルト-",
    characterKo: "우치하 이타치",
    characterJa: "うちはイタチ",
    quoteJa: "許せ、サスケ。これで最後だ。",
    quoteReading: "ゆるせ、サスケ。これでさいごだ。",
    quoteKo: "용서해라, 사스케. 이걸로 마지막이다.",
    sceneContext: "사스케와의 치열한 사투 끝에, 사스케의 이마를 두 손가락으로 톡 치며 진실과 애정을 숨긴 채 숨을 거두는 명장면입니다.",
    tag: "형제애 & 감동",
    vocabulary: [
      { word: "許す", reading: "ゆるす", meaning: "용서하다", jlptLevel: "N3" },
      { word: "これ", reading: "これ", meaning: "이것", jlptLevel: "N5" },
      { word: "最後", reading: "さいご", meaning: "마지막, 최후", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "동사 명령형 (許せ)",
        meaning: "용서해라",
        explanation: "5단 동사 許す(ゆるす)의 어미를 え단(せ)으로 바꾸어 만든 강한 명령형 표현입니다.",
      },
      {
        pattern: "수단/한정의 조사 で (これで)",
        meaning: "이것으로, 이번으로",
        explanation: "한계나 수단의 기준점을 제시하는 조사 'で'입니다.",
      },
    ],
    quiz: {
      question: "'마지막'을 뜻하는 일본어 한자어는?",
      options: ["最初", "最後", "最後尾", "最高"],
      correctIndex: 1,
      explanation: "마지막은 '最後(さいご)'입니다.",
    },
  },
  {
    id: "aq-naruto-03",
    animeId: "naruto",
    animeTitleKo: "나루토",
    animeTitleJa: "NARUTO -ナルト-",
    characterKo: "하타케 카카시",
    characterJa: "はたけカカシ",
    quoteJa: "仲間を大切にしない奴は、それ以上のクズだ。",
    quoteReading: "なかまをたいせつにしないやつは、それいじょうのクズだ。",
    quoteKo: "동료를 소중히 하지 않는 녀석은, 그 이상의 쓰레기다.",
    sceneContext: "닌자의 규칙을 어기는 자는 쓰레기 취급을 받지만, 동료를 버리는 자는 그보다 더한 쓰레기라며 7반 제자들을 일깨우는 명대사입니다.",
    tag: "동료애 & 가르침",
    vocabulary: [
      { word: "仲間", reading: "なかま", meaning: "동료, 친구", jlptLevel: "N3" },
      { word: "大切", reading: "たいせつ", meaning: "소중함, 중요함", jlptLevel: "N5" },
      { word: "以上", reading: "いじょう", meaning: "이상, 그 위", jlptLevel: "N4" },
      { word: "クズ", reading: "くず", meaning: "쓰레기, 찌꺼기", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "나형용사 어간 + にする (大切にする)",
        meaning: "~하게 대하다, 소중히 여기다",
        explanation: "나형용사 大切だ를 부사형(大切に)으로 바꾸고 する를 붙여 '소중히 다루다'라는 타동사적 표현을 만듭니다.",
      },
    ],
    quiz: {
      question: "'소중히 하다'를 뜻하는 올바른 표현은?",
      options: ["大切にする", "大切になる", "大切がある", "大切でいる"],
      correctIndex: 0,
      explanation: "'소중히 하다/여기다'는 '大切にする'입니다.",
    },
  },
  {
    id: "aq-naruto-04",
    animeId: "naruto",
    animeTitleKo: "나루토",
    animeTitleJa: "NARUTO -ナルト-",
    characterKo: "지라이야",
    characterJa: "自来也",
    quoteJa: "忍の才能で一番大切なのは、諦めねぇど根性だ！",
    quoteReading: "しのびのさいのうでいちばんたいせつなのは、あきらめねぇどこんじょうだ！",
    quoteKo: "닌자의 재능에서 가장 중요한 것은, 포기하지 않는 근성이다!",
    sceneContext: "닌자의 재능이란 수많은 인술을 익히는 것이 아니라 결코 포기하지 않는 끈기에 있음을 나루토에게 전수하는 스승 지라이야의 명언입니다.",
    tag: "스승의 가르침",
    vocabulary: [
      { word: "才能", reading: "さいのう", meaning: "재능", jlptLevel: "N3" },
      { word: "一番", reading: "いちばん", meaning: "가장, 1번", jlptLevel: "N5" },
      { word: "諦める", reading: "あきらめる", meaning: "포기하다, 단념하다", jlptLevel: "N3" },
      { word: "ど根性", reading: "どこんじょう", meaning: "대단한 근성, 악바리 근성", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "접두어 ど + 명사 (ど根性)",
        meaning: "강조 접두어 (완전, 엄청난)",
        explanation: "명사 앞에 'ど'를 붙여 성질이나 상태를 매우 강조하는 속어적 표현입니다 (예: ど真ん中, ど派手).",
      },
    ],
    quiz: {
      question: "'諦める(포기하다)'의 의미는?",
      options: ["도전하다", "포기하다", "성공하다", "이해하다"],
      correctIndex: 1,
      explanation: "諦める(あきらめる)는 '단념하다, 포기하다'라는 뜻입니다.",
    },
  },

  // ── ⚔️ 3. 블리치 (BLEACH) ──
  {
    id: "aq-bleach-01",
    animeId: "bleach",
    animeTitleKo: "블리치",
    animeTitleJa: "BLEACH",
    characterKo: "쿠로사키 이치고",
    characterJa: "黒崎一護",
    quoteJa: "卍解、天鎖斬月。",
    quoteReading: "ばんかい、てんさざんげつ。",
    quoteKo: "만해, 천쇄참월.",
    sceneContext: "바쿠야와의 결전에서 사신 궁극의 오의인 '만해'를 처음으로 해방하며 검은 사패장과 칠흑의 도를 드러내는 전설적인 명장면입니다.",
    tag: "각성 & 오의",
    vocabulary: [
      { word: "卍解", reading: "ばんかい", meaning: "만해 (블리치 고유 사신 궁극 해방)", jlptLevel: "N1" },
      { word: "天鎖斬月", reading: "てんさざんげつ", meaning: "천쇄참월 (이치고의 참백도 이름)", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "고유명사 및 한자 음독",
        meaning: "사신 참백도 해방 구호",
        explanation: "불교식 만자(卍)와 풀 해(解)를 결합한 조어로, 'ばんかい'로 음독합니다.",
      },
    ],
    quiz: {
      question: "'卍解'의 올바른 일본어 발음은?",
      options: ["まんかい", "ばんかい", "ぜんかい", "しんかい"],
      correctIndex: 1,
      explanation: "블리치 설정상 '卍解'는 'ばんかい(반카이)'로 읽습니다.",
    },
  },
  {
    id: "aq-bleach-02",
    animeId: "bleach",
    animeTitleKo: "블리치",
    animeTitleJa: "BLEACH",
    characterKo: "아이젠 소스케",
    characterJa: "藍染惣右介",
    quoteJa: "あまり強い言葉を使うなよ。弱く見えるぞ。",
    quoteReading: "あまりつよいことばをつかうなよ。よわくみえるぞ。",
    quoteKo: "너무 강한 말을 쓰지 마라. 약해 보인다구.",
    sceneContext: "소울 소사이어티를 배신하며 자신의 압도적인 실력과 여유를 차갑고 지적인 카리스마로 드러내는 블리치 최고의 악역 명대사입니다.",
    tag: "카리스마 & 심리",
    vocabulary: [
      { word: "強い", reading: "つよい", meaning: "강하다, 세다", jlptLevel: "N5" },
      { word: "使う", reading: "つかう", meaning: "사용하다, 쓰다", jlptLevel: "N5" },
      { word: "弱い", reading: "よわい", meaning: "약하다", jlptLevel: "N5" },
      { word: "見える", reading: "みえる", meaning: "보이다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + な (금지의 종조사)",
        meaning: "~하지 마라",
        explanation: "동사 사전형 뒤에 'な'를 붙이면 강한 금지(~하지 마)의 의미가 됩니다 (使うな = 쓰지 마).",
      },
      {
        pattern: "이형용사 어간 + く + 見える (弱く見える)",
        meaning: "~하게 보이다",
        explanation: "이형용사의 어미 'い'를 'く'로 바꾸고 見える를 결합하여 외관상의 인상을 나타냅니다.",
      },
    ],
    quiz: {
      question: "동사 기본형 뒤에 붙어 강한 금지(~하지 마라)를 나타내는 종조사는?",
      options: ["よ", "ね", "な", "ぞ"],
      correctIndex: 2,
      explanation: "동사 기본형 + な는 강한 금지(예: 行くな 가지 마, 使うな 쓰지 마)를 뜻합니다.",
    },
  },
  {
    id: "aq-bleach-03",
    animeId: "bleach",
    animeTitleKo: "블리치",
    animeTitleJa: "BLEACH",
    characterKo: "쿠치키 바쿠야",
    characterJa: "朽木白哉",
    quoteJa: "散れ、千本桜。",
    quoteReading: "ちれ、せんぼんざくら。",
    quoteKo: "흩날려라, 천본앵.",
    sceneContext: "참백도를 손에서 놓아 땅에 떨어뜨리며 수천억 개의 벚꽃 칼날로 흩어지게 하는 바쿠야의 우아하고 치명적인 시해 영창입니다.",
    tag: "시해 영창",
    vocabulary: [
      { word: "散る", reading: "ちる", meaning: "흩어지다, (꽃이) 지다", jlptLevel: "N3" },
      { word: "千本", reading: "せんぼん", meaning: "천 자루, 천 개", jlptLevel: "N4" },
      { word: "桜", reading: "さくら", meaning: "벚꽃", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "5단 동사 명령형 (散れ)",
        meaning: "흩어져라, 흩날려라",
        explanation: "5단 동사 散る(ちる)의 어미 'る'를 え단 'れ'로 바꾼 명령형입니다.",
      },
    ],
    quiz: {
      question: "동사 '散る(꽃이 지다/흩어지다)'의 명령형은?",
      options: ["散りなさい", "散れ", "散ろう", "散るな"],
      correctIndex: 1,
      explanation: "5단 동사 散る의 간결한 명령형은 散れ(ちれ)입니다.",
    },
  },
  {
    id: "aq-bleach-04",
    animeId: "bleach",
    animeTitleKo: "블리치",
    animeTitleJa: "BLEACH",
    characterKo: "아이젠 소스케",
    characterJa: "藍染惣右介",
    quoteJa: "憧れは理解から最も遠い感情だよ。",
    quoteReading: "あこがれはりかいからもつともとおいかんじょうだよ。",
    quoteKo: "동경은 이해로부터 가장 먼 감정이야.",
    sceneContext: "자신을 맹목적으로 추종하는 부하 히나모리에게, 대상을 동경하면 결코 그 본질을 객관적으로 이해할 수 없음을 냉정하게 설파하는 명대사입니다.",
    tag: "통찰 & 명언",
    vocabulary: [
      { word: "憧れ", reading: "あこがれ", meaning: "동경, 갈망", jlptLevel: "N2" },
      { word: "理解", reading: "りかい", meaning: "이해", jlptLevel: "N3" },
      { word: "最も", reading: "もっとも", meaning: "가장, 제일", jlptLevel: "N3" },
      { word: "遠い", reading: "とおい", meaning: "멀다", jlptLevel: "N5" },
      { word: "感情", reading: "かんじょう", meaning: "감정", jlptLevel: "N3" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + から (이해로부터)",
        meaning: "기점, 출발점 (~로부터)",
        explanation: "거리나 추상적 기준점의 출발을 나타내는 조사 'から'입니다.",
      },
      {
        pattern: "부사 最も + 형용사 (最も遠い)",
        meaning: "가장 ~한 (최상급)",
        explanation: "문어적이고 격식 있는 최상급 표현으로 '가장 먼'을 뜻합니다.",
      },
    ],
    quiz: {
      question: "'가장 먼'을 뜻하는 표현으로 알맞은 것은?",
      options: ["最も近い", "最も遠い", "一番早い", "一番遅い"],
      correctIndex: 1,
      explanation: "가장(最も) + 멀다(遠い) = 最も遠い(가장 먼)입니다.",
    },
  },

  // ── 🪄 4. 장송의 프리렌 (Frieren) ──
  {
    id: "aq-frieren-01",
    animeId: "frieren",
    animeTitleKo: "장송의 프리렌",
    animeTitleJa: "葬送のフリーレン",
    characterKo: "프리렌",
    characterJa: "フリーレン",
    quoteJa: "人間の寿命は短いって、わかっていたのに…なんでもっと知ろうとしなかったんだろう。",
    quoteReading: "にんげんのじゅみょうはみじかいて、わかっていたのに…なんでもっとしろうとしなかったんだろう。",
    quoteKo: "인간의 수명은 짧다는 걸 알고 있었는데… 왜 좀 더 알려고 하지 않았던 걸까.",
    sceneContext: "용사 힘멜의 장례식에서, 그와 함께했던 10년의 시간이 얼마나 소중했는지를 뒤늦게 깨닫고 눈물을 흘리며 인간을 알아가기로 결심하는 계기의 대사입니다.",
    tag: "후회 & 시작",
    vocabulary: [
      { word: "人間", reading: "にんげん", meaning: "인간, 사람", jlptLevel: "N3" },
      { word: "寿命", reading: "じゅみょう", meaning: "수명", jlptLevel: "N2" },
      { word: "短い", reading: "みじかい", meaning: "짧다", jlptLevel: "N5" },
      { word: "知る", reading: "しる", meaning: "알다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 의지형 + と + する (知ろうとする)",
        meaning: "~하려고 하다 (시도/의지)",
        explanation: "1그룹 동사 知る의 의지형 知ろう 뒤에 とする를 결합하여 '알아보려고 시도하다'라는 뜻을 나타냅니다.",
      },
      {
        pattern: "문장 + のに (역접/아쉬움)",
        meaning: "~했는데도",
        explanation: "예상과 다른 결과나 진한 아쉬움과 후회를 표현할 때 문말이나 접속사로 사용합니다.",
      },
    ],
    quiz: {
      question: "'알려고 하다'를 일본어로 표현할 때 알맞은 문법은?",
      options: ["知るにする", "知ろうとする", "知りたいにする", "知るようになる"],
      correctIndex: 1,
      explanation: "동사 의지형 + とする는 '~하려고 애쓰다, 시도하다'를 뜻합니다.",
    },
  },
  {
    id: "aq-frieren-02",
    animeId: "frieren",
    animeTitleKo: "장송의 프리렌",
    animeTitleJa: "葬送のフリーレン",
    characterKo: "힘멜",
    characterJa: "ヒンメル",
    quoteJa: "くだらなくて楽しい旅が、僕は好きなんだ。",
    quoteReading: "くだらなくてたのしいたびが、ぼくはすきなんだ。",
    quoteKo: "하찮고도 즐거운 여행이, 나는 좋은 거야.",
    sceneContext: "마왕 토벌이라는 거창한 목표뿐만 아니라, 도중에 사람들을 돕고 사소한 추억을 쌓는 과정 자체가 소중함을 프리렌에게 전하는 힘멜의 따뜻한 인생관입니다.",
    tag: "인생 & 추억",
    vocabulary: [
      { word: "くだらない", reading: "くだらない", meaning: "시시하다, 하찮다", jlptLevel: "N3" },
      { word: "楽しい", reading: "たのしい", meaning: "즐겁다", jlptLevel: "N5" },
      { word: "旅", reading: "たび", meaning: "여행", jlptLevel: "N4" },
      { word: "好き", reading: "すき", meaning: "좋아함", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "이형용사 연결형 ~くて (くだらなくて)",
        meaning: "~하고, ~해서",
        explanation: "くだらない의 어미 い를 くて로 바꾸어 형용사를 나열(하찮으면서도 즐거운)했습니다.",
      },
      {
        pattern: "설명/강조의 なんだ (好きなんだ)",
        meaning: "~인 거야",
        explanation: "나형용사 好きだ 뒤에 이유나 감정을 부드럽게 강조하는 のだ(んだ)를 붙인 형태입니다.",
      },
    ],
    quiz: {
      question: "이형용사 くだらない(시시하다)의 연결형(~하고)은?",
      options: ["くだらなくて", "くだらないで", "くだらなくては", "くだらなそう"],
      correctIndex: 0,
      explanation: "이형용사의 연결형은 어미 'い'를 'くて'로 바꿉니다.",
    },
  },
  {
    id: "aq-frieren-03",
    animeId: "frieren",
    animeTitleKo: "장송의 프리렌",
    animeTitleJa: "葬送のフリーレン",
    characterKo: "프리렌",
    characterJa: "フリーレン",
    quoteJa: "アウラ、自害しろ。",
    quoteReading: "アウラ、じがいしろ。",
    quoteKo: "아우라, 자해(자살)해라.",
    sceneContext: "자신의 마력을 평생 숨겨온 대마법사 프리렌이, 복종의 마법으로 자신을 지배하려던 마족 아우라를 압도하며 내린 서늘하고 단호한 최후의 명령입니다.",
    tag: "카리스마 & 처단",
    vocabulary: [
      { word: "自害", reading: "じがい", meaning: "자해, 스스로 목숨을 끊음", jlptLevel: "N1" },
      { word: "する", reading: "する", meaning: "하다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "3그룹 동사 する의 명령형 (しろ)",
        meaning: "해라",
        explanation: "동사 する의 강한 단도직입적 명령형은 'しろ' 또는 'せよ'입니다.",
      },
    ],
    quiz: {
      question: "동사 'する(하다)'의 일상적 명령형은?",
      options: ["しなさい", "しろ", "すれ", "しよう"],
      correctIndex: 1,
      explanation: "3그룹 불규칙 동사 する의 명령형은 'しろ'입니다.",
    },
  },
  {
    id: "aq-frieren-04",
    animeId: "frieren",
    animeTitleKo: "장송의 프리렌",
    animeTitleJa: "葬送のフリーレン",
    characterKo: "페른",
    characterJa: "フェルン",
    quoteJa: "フリーレン様、早く起きてください。朝ですよ。",
    quoteReading: "フリーレンさま、はやくおきてください。あさですよ。",
    quoteKo: "프리렌 님, 어서 일어나세요. 아침이에요.",
    sceneContext: "아침잠이 많은 프리렌을 엄마처럼 챙겨 깨우는 페른의 일상적인 다정함과 잔소리가 묻어나는 대표 일상 대사입니다.",
    tag: "일상 & 케미",
    vocabulary: [
      { word: "早い", reading: "はやい", meaning: "빠르다, 이르다", jlptLevel: "N5" },
      { word: "起きる", reading: "おきる", meaning: "일어나다", jlptLevel: "N5" },
      { word: "朝", reading: "あさ", meaning: "아침", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 て형 + ください (起きてください)",
        meaning: "~해 주세요 (정중한 요청)",
        explanation: "상대방에게 정중하게 행동을 부탁하거나 권유할 때 쓰는 대표적인 존댓말 패턴입니다.",
      },
      {
        pattern: "이형용사 부사형 (早く)",
        meaning: "빨리, 일찍",
        explanation: "이형용사 早い의 어미 い를 く로 바꾸어 동사(起きて)를 수식하는 부사로 만듭니다.",
      },
    ],
    quiz: {
      question: "'일어나 주세요'에 해당하는 올바른 일본어 표현은?",
      options: ["起きてください", "起きています", "起きてみます", "起きてしまいます"],
      correctIndex: 0,
      explanation: "정중한 요청은 동사 て형 + ください입니다.",
    },
  },

  // ── 🤞 5. 주술회전 (JUJUTSU KAISEN) ──
  {
    id: "aq-jujutsu-01",
    animeId: "jujutsu",
    animeTitleKo: "주술회전",
    animeTitleJa: "呪術廻戦",
    characterKo: "고죠 사토루",
    characterJa: "五条悟",
    quoteJa: "大丈夫、僕最強だから。",
    quoteReading: "だいじょうぶ、ぼくさいきょうだから。",
    quoteKo: "괜찮아, 나 최강이니까.",
    sceneContext: "스쿠나의 손가락을 먹은 이타도리 앞에서, 주술계 최강자로서의 절대적인 자신감과 여유를 드러내는 고죠 사토루의 명대사입니다.",
    tag: "자신감 & 최강",
    vocabulary: [
      { word: "大丈夫", reading: "だいじょうぶ", meaning: "괜찮음", jlptLevel: "N5" },
      { word: "僕", reading: "ぼく", meaning: "나 (남성 1인칭)", jlptLevel: "N5" },
      { word: "最強", reading: "さいきょう", meaning: "최강", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + だから (이유)",
        meaning: "~이니까, ~라서",
        explanation: "명사나 나형용사 어간 뒤에 だから를 붙여 인과관계의 이유를 설명합니다.",
      },
    ],
    quiz: {
      question: "'최강이니까'를 나타낼 때 '最強(최강)' 뒤에 붙는 표현은?",
      options: ["だから", "なのに", "だけど", "だからこそ"],
      correctIndex: 0,
      explanation: "명사 뒤에 이유를 나타낼 때는 'だから'를 사용합니다.",
    },
  },
  {
    id: "aq-jujutsu-02",
    animeId: "jujutsu",
    animeTitleKo: "주술회전",
    animeTitleJa: "呪術廻戦",
    characterKo: "고죠 사토루",
    characterJa: "五条悟",
    quoteJa: "領域展開、「無量空処」。",
    quoteReading: "りょういきてんかい、「むりょうくうしょ」。",
    quoteKo: "영역전개, 「무량공처」.",
    sceneContext: "안대를 벗고 육안을 드러내며 주술의 극의인 영역전개를 펼쳐 적의 뇌에 끝없는 무한의 정보를 주입하는 압도적인 명장면입니다.",
    tag: "영역전개 & 오의",
    vocabulary: [
      { word: "領域", reading: "りょういき", meaning: "영역", jlptLevel: "N1" },
      { word: "展開", reading: "てんかい", meaning: "전개, 펼침", jlptLevel: "N2" },
      { word: "無量", reading: "むりょう", meaning: "헤아릴 수 없음, 무량", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "한자어 명사 결합",
        meaning: "주술 오의 선언",
        explanation: "영역(領域)과 전개(展開)를 조합하여 특정한 결계를 펼치는 주술 기술명입니다.",
      },
    ],
    quiz: {
      question: "'領域展開'의 올바른 히라가나 읽기는?",
      options: ["りょういきてんかい", "りょういきでんかい", "りょういきかいほう", "りょういきはつどう"],
      correctIndex: 0,
      explanation: "領域(りょういき) + 展開(てんかい) = りょういきてんかい입니다.",
    },
  },
  {
    id: "aq-jujutsu-03",
    animeId: "jujutsu",
    animeTitleKo: "주술회전",
    animeTitleJa: "呪術廻戦",
    characterKo: "이타도리 유지",
    characterJa: "虎杖悠仁",
    quoteJa: "自分が死ぬ時のことは分からんけど、生き様で後悔はしたくない。",
    quoteReading: "じぶんがしぬときのことはわからんけど、いきざまでこうかいはしたくない。",
    quoteKo: "내가 죽을 때 일은 모르겠지만, 살아가는 방식으로 후회는 하고 싶지 않아.",
    sceneContext: "주술고전 입학 면접에서 교장 야가지의 질문에 자신이 왜 사람들을 구하고 주술사로서 싸우려 하는지 신념을 밝히는 명대사입니다.",
    tag: "삶의 자세",
    vocabulary: [
      { word: "生き様", reading: "いきざま", meaning: "사는 모습, 살아가는 태도", jlptLevel: "N1" },
      { word: "後悔", reading: "こうかい", meaning: "후회", jlptLevel: "N3" },
      { word: "分かる", reading: "わかる", meaning: "알다, 이해하다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 부정 축약 ~ん (分からん)",
        meaning: "모르다 (分からない의 구어체)",
        explanation: "관서 지방 및 남성 구어체에서 부정의 'ない'가 'ん'으로 축약된 형태입니다.",
      },
      {
        pattern: "동사 ます형 어간 + たくない (したくない)",
        meaning: "~하고 싶지 않다",
        explanation: "희망을 나타내는 ~たい의 부정형으로, 강한 거부나 소망의 부정을 나타냅니다.",
      },
    ],
    quiz: {
      question: "'후회하고 싶지 않다'를 올바르게 작문한 것은?",
      options: ["後悔したくない", "後悔したくないです", "後悔しないたい", "後悔させたくない"],
      correctIndex: 0,
      explanation: "する의 희망 부정형은 したくない(하고 싶지 않다)입니다.",
    },
  },
  {
    id: "aq-jujutsu-04",
    animeId: "jujutsu",
    animeTitleKo: "주술회전",
    animeTitleJa: "呪術廻戦",
    characterKo: "나나미 켄토",
    characterJa: "七海建人",
    quoteJa: "労働はクソということです。",
    quoteReading: "ろうどうはクソということです。",
    quoteKo: "노동은 쓰레기라는 것입니다.",
    sceneContext: "회사원 생활을 그만두고 주술사로 복귀한 어른 주술사 나나미가 주술사도 회사원도 모두 불합리하지만 조금이라도 적성에 맞는 길을 택했다며 남긴 현실적인 명대사입니다.",
    tag: "현실 & 직장인 공감",
    vocabulary: [
      { word: "労働", reading: "ろうどう", meaning: "노동, 근로", jlptLevel: "N3" },
      { word: "クソ", reading: "くそ", meaning: "똥, 쓰레기, 젠장", jlptLevel: "N1" },
      { word: "こと", reading: "こと", meaning: "일, 것", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "문장 + ということです",
        meaning: "~라는 것입니다 (결론/요약)",
        explanation: "어떤 사실이나 자신의 주장을 정리하여 정중하고 객관적으로 전달할 때 씁니다.",
      },
    ],
    quiz: {
      question: "'~라는 것입니다'라는 정중한 요약 표현은?",
      options: ["ということです", "ということでした", "というわけがない", "ということになる"],
      correctIndex: 0,
      explanation: "사실이나 의견의 결론을 정중히 요약할 때는 'ということです'를 씁니다.",
    },
  },

  // ── 🕊️ 6. 진격의 거인 (Attack on Titan) ──
  {
    id: "aq-aot-01",
    animeId: "aot",
    animeTitleKo: "진격의 거인",
    animeTitleJa: "進撃の巨人",
    characterKo: "에렌 예거",
    characterJa: "エレン・イェーガー",
    quoteJa: "戦わなければ勝てない。戦え、戦え！",
    quoteReading: "たたかわなければかてない。たたかえ、たたかえ！",
    quoteKo: "싸우지 않으면 이길 수 없다. 싸워라, 싸워라!",
    sceneContext: "어린 시절 납치당한 미카사를 구하며, 이 잔혹한 세계에서 살아남고 자유를 쟁취하기 위해 일어서라고 외치는 에렌의 핵심 신념입니다.",
    tag: "자유 & 투쟁",
    vocabulary: [
      { word: "戦う", reading: "たたかう", meaning: "싸우다, 투쟁하다", jlptLevel: "N3" },
      { word: "勝つ", reading: "かつ", meaning: "이기다, 승리하다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "동사 부정 가정형 (戦わなければ)",
        meaning: "싸우지 않으면",
        explanation: "1그룹 동사 戦う의 부정형 戦わない에서 い를 ければ로 바꾼 가정 표현입니다.",
      },
      {
        pattern: "동사 가능동사의 부정 (勝てない)",
        meaning: "이길 수 없다",
        explanation: "勝つ의 가능형 勝てる(이길 수 있다)의 부정형입니다.",
      },
      {
        pattern: "동사 명령형 (戦え)",
        meaning: "싸워라",
        explanation: "5단 동사 戦う의 어미 う를 え단으로 바꾼 직접 명령형입니다.",
      },
    ],
    quiz: {
      question: "동사 '勝つ(이기다)'의 가능 부정형('이길 수 없다')은?",
      options: ["勝たない", "勝てない", "勝たれない", "勝ちたくない"],
      correctIndex: 1,
      explanation: "가능형 勝てる의 부정은 勝てない(이길 수 없다)입니다.",
    },
  },
  {
    id: "aq-aot-02",
    animeId: "aot",
    animeTitleKo: "진격의 거인",
    animeTitleJa: "進撃の巨人",
    characterKo: "리바이 아커만",
    characterJa: "リヴァイ・アッカーマン",
    quoteJa: "悔いが残らない方を自分で選べ。",
    quoteReading: "くいがのこらないほうをじぶんでえらべ。",
    quoteKo: "후회가 남지 않는 쪽을 스스로 선택해라.",
    sceneContext: "거인과의 전투에서 동료를 믿을지 자신의 힘을 믿을지 고민하는 에렌에게, 미래의 결과는 아무도 모르니 자신이 납득할 수 있는 길을 택하라고 조언하는 리바이의 명언입니다.",
    tag: "선택 & 결단",
    vocabulary: [
      { word: "悔い", reading: "くい", meaning: "후회, 미련", jlptLevel: "N1" },
      { word: "残る", reading: "のこる", meaning: "남다", jlptLevel: "N4" },
      { word: "方", reading: "ほう", meaning: "쪽, 편", jlptLevel: "N5" },
      { word: "選ぶ", reading: "えらぶ", meaning: "고르다, 선택하다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "수식어 + 方 (残らない方)",
        meaning: "~하는 쪽",
        explanation: "여러 대안 중 하나의 방향이나 선택지를 가리킬 때 명사 '方(ほう)'를 씁니다.",
      },
      {
        pattern: "동사 명령형 (選べ)",
        meaning: "선택해라, 골라라",
        explanation: "5단 동사 選ぶ(えらぶ)의 어미 ぶ를 え단 べ로 바꾼 명령형입니다.",
      },
    ],
    quiz: {
      question: "'선택해라'를 뜻하는 동사 選ぶ(えらぶ)의 명령형은?",
      options: ["選べ", "選びろ", "選ばれ", "選ぼう"],
      correctIndex: 0,
      explanation: "5단 동사 選ぶ의 명령형은 '選べ(えらべ)'입니다.",
    },
  },
  {
    id: "aq-aot-03",
    animeId: "aot",
    animeTitleKo: "진격의 거인",
    animeTitleJa: "進撃の巨人",
    characterKo: "엘빈 스미스",
    characterJa: "エルヴィン・スミス",
    quoteJa: "心臓を捧げよ！",
    quoteReading: "しんぞうをささげよ！",
    quoteKo: "심장을 바쳐라!",
    sceneContext: "인류의 자유와 미래를 위해 목숨을 걸고 거인에게 돌격하는 조사병단 전원에게 엘빈 단장이 가슴을 치며 외치는 불멸의 슬로건입니다.",
    tag: "희생 & 결의",
    vocabulary: [
      { word: "心臓", reading: "しんぞう", meaning: "심장", jlptLevel: "N2" },
      { word: "捧げる", reading: "ささげる", meaning: "바치다, 헌신하다", jlptLevel: "N1" },
    ],
    grammarPoints: [
      {
        pattern: "하1단 동사 고풍 명령형 ~よ (捧げよ)",
        meaning: "~하라 (장엄한 명령)",
        explanation: "하1단 동사 捧げる의 어간에 'よ'를 붙인 문어적/격식적 명령형으로, 장엄하고 비장한 선언에 쓰입니다.",
      },
    ],
    quiz: {
      question: "'바치다/헌신하다'를 뜻하는 동사는?",
      options: ["捧げる", "投げる", "助ける", "受ける"],
      correctIndex: 0,
      explanation: "심장을 바치다의 '바치다'는 捧げる(ささげる)입니다.",
    },
  },
  {
    id: "aq-aot-04",
    animeId: "aot",
    animeTitleKo: "진격의 거인",
    animeTitleJa: "進撃の巨人",
    characterKo: "아르민 알레르토",
    characterJa: "アルミン・アルレルト",
    quoteJa: "何かを変えることができる人間がいるとすれば、それはきっと…大事なものを捨てることができる人だ。",
    quoteReading: "なにかをかえることができるにんげんがいるとすれば、それはきっと…だいじなものをすてることができるひとだ。",
    quoteKo: "무언가를 바꿀 수 있는 인간이 있다면, 그것은 분명… 소중한 것을 버릴 수 있는 사람이다.",
    sceneContext: "거인과의 절망적인 싸움 속에서, 괴물을 넘어서기 위해선 인간성이나 안락함 같은 중요한 것을 기꺼이 희생할 각오가 필요함을 역설하는 명대사입니다.",
    tag: "희생 & 각오",
    vocabulary: [
      { word: "変える", reading: "かえる", meaning: "바꾸다, 변화시키다", jlptLevel: "N4" },
      { word: "大事", reading: "だいじ", meaning: "소중함, 중요함", jlptLevel: "N4" },
      { word: "捨てる", reading: "すてる", meaning: "버리다", jlptLevel: "N4" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + ことができる",
        meaning: "~할 수 있다 (능력/가능)",
        explanation: "동사 사전형에 ことができる를 결합하여 행동의 가능 여부를 객관적으로 서술합니다.",
      },
      {
        pattern: "문장 + とすれば",
        meaning: "~라고 한다면 (가정)",
        explanation: "가상의 조건이나 전제를 세울 때 사용하는 표현입니다.",
      },
    ],
    quiz: {
      question: "'소중한 것을 버리다'에 쓰인 동사 '捨てる(すてる)'의 뜻은?",
      options: ["버리다", "줍다", "지키다", "기억하다"],
      correctIndex: 0,
      explanation: "捨てる(すてる)는 '버리다'를 뜻합니다.",
    },
  },

  // ── 🤖 7. 신세기 에반게리온 (EVANGELION) ──
  {
    id: "aq-eva-01",
    animeId: "evangelion",
    animeTitleKo: "신세기 에반게리온",
    animeTitleJa: "新世紀エヴァンゲリオン",
    characterKo: "이카리 신지",
    characterJa: "碇シンジ",
    quoteJa: "逃げちゃダメだ、逃げちゃダメだ、逃げちゃダメだ！",
    quoteReading: "にげちゃダメだ、にげちゃダメだ、にげちゃダメだ！",
    quoteKo: "도망치면 안 돼, 도망치면 안 돼, 도망치면 안 돼!",
    sceneContext: "사도와의 공포스러운 싸움을 앞두고 극심한 두려움 속에서도 스스로를 다잡으며 에바 초호기에 탑승하는 신지의 처절한 자기암시 대사입니다.",
    tag: "용기 & 자기극복",
    vocabulary: [
      { word: "逃げる", reading: "にげる", meaning: "도망치다, 달아나다", jlptLevel: "N4" },
      { word: "ダメ", reading: "だめ", meaning: "안 됨, 글렀음", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "~ちゃダメだ (구어 금지)",
        meaning: "~해서는 안 돼 (~てはだめだ의 축약)",
        explanation: "동사 て형 + は(ては)가 회화체에서 'ちゃ'로 축약되어 '逃げちゃダメだ'가 됩니다.",
      },
    ],
    quiz: {
      question: "'逃げちゃダメだ'의 표준 문어체 표현은?",
      options: ["逃げてはだめだ", "逃げないで", "逃げてはいけない", "逃げたらだめ"],
      correctIndex: 0,
      explanation: "'~ちゃダメだ'는 회화체 축약으로 원래 표현은 '~てはだめだ'입니다.",
    },
  },
  {
    id: "aq-eva-02",
    animeId: "evangelion",
    animeTitleKo: "신세기 에반게리온",
    animeTitleJa: "新世紀エヴァンゲリオン",
    characterKo: "아야나미 레이",
    characterJa: "綾波レイ",
    quoteJa: "ごめんなさい、こういう時どんな顔をすればいいか分からないの。",
    quoteReading: "ごめんなさい、こういうときどんなかおをすればいいかわからないの。",
    quoteKo: "미안해, 이럴 때 어떤 표정을 지어야 좋을지 모르겠어.",
    sceneContext: "사투 끝에 자신을 구해내고 눈물 흘리는 신지에게 감정 표현이 서툴렀던 레이가 건네고, 신지가 '웃으면 된다고 생각해'라고 답하는 명장면입니다.",
    tag: "감정 & 명장면",
    vocabulary: [
      { word: "顔", reading: "かお", meaning: "얼굴, 표정", jlptLevel: "N5" },
      { word: "時", reading: "とき", meaning: "때, 경우", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 가정형 + ばいい (すればいい)",
        meaning: "~하면 좋다 (어떻게 해야 할지)",
        explanation: "행동의 적절한 방법을 묻거나 조언을 구할 때 쓰는 대표적인 표현입니다.",
      },
      {
        pattern: "종조사 の (わからないの)",
        meaning: "~모르겠어 (부드러운 단정/설명)",
        explanation: "여성어 및 부드러운 구어체에서 자신의 심정이나 상황을 설명할 때 문말에 붙입니다.",
      },
    ],
    quiz: {
      question: "'어떻게 하면 좋을까?'를 일본어로 표현할 때 알맞은 것은?",
      options: ["どうすればいい？", "どうするといい？", "どうしたほうがいい？", "どうしようか？"],
      correctIndex: 0,
      explanation: "가정형 + ばいい는 '~하면 좋을까?'라는 방법 모색의 전형적인 표현입니다.",
    },
  },
  {
    id: "aq-eva-03",
    animeId: "evangelion",
    animeTitleKo: "신세기 에반게리온",
    animeTitleJa: "新世紀エヴァンゲリオン",
    characterKo: "이카리 겐도",
    characterJa: "碇ゲンドウ",
    quoteJa: "乗るなら早くしろ。でなければ帰れ。",
    quoteReading: "のるならはやくしろ。でなければかえれ。",
    quoteKo: "탈 거라면 빨리 해라. 그렇지 않다면 돌아가라.",
    sceneContext: "에바 탑승을 주저하는 아들 신지에게 한 치의 망설임도 용납하지 않고 냉엄하게 몰아붙이는 사령관 겐도의 압도적 명대사입니다.",
    tag: "냉혹 & 결단",
    vocabulary: [
      { word: "乗る", reading: "のる", meaning: "타다, 탑승하다", jlptLevel: "N5" },
      { word: "帰る", reading: "かえる", meaning: "돌아가다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + なら (가정/조건)",
        meaning: "~할 거라면",
        explanation: "상대방의 의도나 결정을 전제로 조건을 세울 때 쓰는 조사 'なら'입니다.",
      },
      {
        pattern: "접속사 でなければ",
        meaning: "그렇지 않다면, 그게 아니라면",
        explanation: "앞선 조건이 성립하지 않을 경우의 대안을 제시하는 조건 접속사입니다.",
      },
    ],
    quiz: {
      question: "동사 帰る(돌아가다)의 명령형은?",
      options: ["帰れ", "帰りろ", "帰れよ", "帰ろう"],
      correctIndex: 0,
      explanation: "5단 동사 帰る의 명령형은 어미를 え단으로 바꾼 '帰れ(かえれ)'입니다.",
    },
  },
  {
    id: "aq-eva-04",
    animeId: "evangelion",
    animeTitleKo: "신세기 에반게리온",
    animeTitleJa: "新世紀エヴァンゲリオン",
    characterKo: "카츠라기 미사토",
    characterJa: "葛城ミサト",
    quoteJa: "大人のキスよ。帰ってきたら、続きをしましょう。",
    quoteReading: "おとなのキスよ。かえってきたら、つづきをしましょう。",
    quoteKo: "어른의 키스야. 돌아오면, 다음을 계속하자.",
    sceneContext: "절체절명의 위기 속에서 신지에게 용기를 북돋아주며 마지막 격려와 함께 전장으로 떠나보내는 미사토의 비장하고 성숙한 명장면 대사입니다.",
    tag: "격려 & 약속",
    vocabulary: [
      { word: "大人", reading: "おとな", meaning: "어른, 성인", jlptLevel: "N4" },
      { word: "続き", reading: "つづき", meaning: "계속, 이어짐", jlptLevel: "N3" },
    ],
    grammarPoints: [
      {
        pattern: "동사 과거형 + ら (帰ってきたら)",
        meaning: "~하고 나면, ~하면 (완료 후 가정)",
        explanation: "동사의 과거형(た형) 뒤에 ら를 붙여 앞 동작이 완료된 후의 상황을 가정합니다.",
      },
      {
        pattern: "동사 권유/청유형 ~ましょう (しましょう)",
        meaning: "~합시다, ~해요",
        explanation: "정중한 태도로 상대방에게 함께 할 행동을 권유하거나 약속할 때 씁니다.",
      },
    ],
    quiz: {
      question: "'돌아오면'을 뜻하는 완료 후 가정 표현은?",
      options: ["帰ってきたら", "帰ってきたなら", "帰ってくれば", "帰ってくると"],
      correctIndex: 0,
      explanation: "앞 동작이 실현된 후를 나타내는 가장 자연스러운 일상 표현은 'たら(帰ってきたら)'입니다.",
    },
  },

  // ── 🏀 8. 슬램덩크 (SLAM DUNK) ──
  {
    id: "aq-slamdunk-01",
    animeId: "slamdunk",
    animeTitleKo: "슬램덩크",
    animeTitleJa: "SLAM DUNK",
    characterKo: "안 선생님 (안자이 감독)",
    characterJa: "安西先生",
    quoteJa: "あきらめたらそこで試合終了ですよ…？",
    quoteReading: "あきらめたらそこでしあいしゅうりょうですよ…？",
    quoteKo: "포기하면 그 순간 시합 종료예요…?",
    sceneContext: "중학 시절 절망하던 정대만에게 다가가 공을 건네며 다시 일어설 용기를 준, 스포츠 만화 역사상 최고의 인생 명언입니다.",
    tag: "인생명언 & 희망",
    vocabulary: [
      { word: "あきらめる", reading: "あきらめる", meaning: "포기하다, 단념하다", jlptLevel: "N3" },
      { word: "試合", reading: "しあい", meaning: "시합, 경기", jlptLevel: "N4" },
      { word: "終了", reading: "しゅうりょう", meaning: "종료, 끝남", jlptLevel: "N2" },
    ],
    grammarPoints: [
      {
        pattern: "동사 과거형 + たら (あきらめたら)",
        meaning: "~하면 (가정)",
        explanation: "포기하는 순간 모든 가능성이 사라진다는 결과를 나타내는 대표적인 가정형입니다.",
      },
      {
        pattern: "정중 종조사 ~ですよ",
        meaning: "~예요, ~인 것입니다",
        explanation: "부드럽고 인자한 어조로 듣는 사람에게 중요한 사실을 일깨워주는 존댓말 종조사입니다.",
      },
    ],
    quiz: {
      question: "'포기하면'을 일본어로 올바르게 바꾼 것은?",
      options: ["あきらめたら", "あきらめると", "あきらめれば", "あきらめるなら"],
      correctIndex: 0,
      explanation: "슬램덩크 명대사의 원문은 'あきらめたら'입니다.",
    },
  },
  {
    id: "aq-slamdunk-02",
    animeId: "slamdunk",
    animeTitleKo: "슬램덩크",
    animeTitleJa: "SLAM DUNK",
    characterKo: "정대만 (미츠이 히사시)",
    characterJa: "三井寿",
    quoteJa: "安西先生…!! バスケがしたいです……",
    quoteReading: "あんざいせんせい…!! バスケがしたいです……",
    quoteKo: "안 선생님…!! 농구가 하고 싶어요……",
    sceneContext: "방황하던 불량배 시절을 끝내고 체육관에 들어와 안 선생님을 마주하자 무릎 꿇고 눈물을 흘리며 농구에 대한 진심을 고백하는 명장면입니다.",
    tag: "회한 & 열정",
    vocabulary: [
      { word: "バスケ", reading: "バスケ", meaning: "농구 (バスケットボール의 약칭)", jlptLevel: "N5" },
      { word: "したい", reading: "したい", meaning: "하고 싶다", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "대상 + が + したい (バスケがしたい)",
        meaning: "~을/를 하고 싶다",
        explanation: "희망 표현 ~たい의 목적격 대상에는 조사 'を' 대신 'が'를 쓰는 것이 매우 자연스럽습니다.",
      },
    ],
    quiz: {
      question: "'농구가 하고 싶어요'에서 희망의 대상 뒤에 오는 자연스러운 조사는?",
      options: ["が", "를", "에", "로"],
      correctIndex: 0,
      explanation: "~たい 앞의 대상에는 조사 'が'를 주로 사용합니다.",
    },
  },
  {
    id: "aq-slamdunk-03",
    animeId: "slamdunk",
    animeTitleKo: "슬램덩크",
    animeTitleJa: "SLAM DUNK",
    characterKo: "강백호 (사쿠라기 하나미치)",
    characterJa: "桜木花道",
    quoteJa: "左手はそえるだけ…",
    quoteReading: "ひだりてはそえるだけ…",
    quoteKo: "왼손은 거들 뿐…",
    sceneContext: "산왕공고와의 혈전 마지막 순간, 수만 번 연습했던 점프슛의 기본 폼을 머릿속으로 되뇌이며 역전 버저비터를 넣기 직전 읊조린 명대사입니다.",
    tag: "기본기 & 승리",
    vocabulary: [
      { word: "左手", reading: "ひだりて", meaning: "왼손", jlptLevel: "N4" },
      { word: "そえる", reading: "そえる", meaning: "곁들이다, 덧붙이다, 거들다", jlptLevel: "N2" },
      { word: "だけ", reading: "だけ", meaning: "오직, ~뿐", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "동사 기본형 + だけ (そえるだけ)",
        meaning: "단지 ~할 뿐",
        explanation: "어떤 행위나 조건을 한정하여 다른 불필요한 힘을 주지 않는 상태를 표현합니다.",
      },
    ],
    quiz: {
      question: "'왼손은 거들 뿐'에서 '왼손'의 올바른 한자 및 발음은?",
      options: ["左手(ひだりて)", "右手(みぎて)", "両手(りょうて)", "片手(かたて)"],
      correctIndex: 0,
      explanation: "왼손은 左手(ひだりて)입니다.",
    },
  },
  {
    id: "aq-slamdunk-04",
    animeId: "slamdunk",
    animeTitleKo: "슬램덩크",
    animeTitleJa: "SLAM DUNK",
    characterKo: "강백호 (사쿠라기 하나미치)",
    characterJa: "桜木花道",
    quoteJa: "オヤジの栄光時代はいつだよ…全日本のときか？ オレは……オレは今なんだよ!!",
    quoteReading: "オヤジのえいこうじだいはいつだよ…ぜんにほんのときか？ オレは……オレはいまなんだよ!!",
    quoteKo: "영감님의 영광의 시대는 언제였죠… 국가대표 때였나요? 난…… 난 지금이라고요!!",
    sceneContext: "등 부상으로 선수 생명이 끝날 위기 속에서도 지금 이 순간 팀과 승리를 위해 모든 것을 불태우겠다는 강백호의 뜨거운 투혼을 보여주는 최고의 명대사입니다.",
    tag: "투혼 & 청춘",
    vocabulary: [
      { word: "栄光", reading: "えいこう", meaning: "영광", jlptLevel: "N2" },
      { word: "時代", reading: "じだい", meaning: "시대, 시절", jlptLevel: "N4" },
      { word: "今", reading: "いま", meaning: "지금, 현재", jlptLevel: "N5" },
    ],
    grammarPoints: [
      {
        pattern: "명사 + なんだよ (オレは今なんだよ)",
        meaning: "~인 거야! (강한 확신/감정 토로)",
        explanation: "명사 뒤에 なんだよ를 붙여 현재 자신의 심정과 결의를 격렬하게 호소하는 남성 구어체 표현입니다.",
      },
    ],
    quiz: {
      question: "'영광의 시대'를 뜻하는 일본어 표현은?",
      options: ["栄光時代", "全盛期", "青春時代", "黄金時代"],
      correctIndex: 0,
      explanation: "대사 원문은 '栄光時代(えいこうじだい)'입니다.",
    },
  },
];
