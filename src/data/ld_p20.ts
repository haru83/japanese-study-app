import type { LearningDiary } from "@/types/learningDiary";

export const part20: LearningDiary[] = [
  {
    id: "ld-191",
    title: "健康診断と生活習慣",
    titleKo: "건강검진과 생활 습관",
    category: "건강",
    level: "초급",
    thumbnail: "🏥",
    contentJp: [
      { text: "年", ruby: "とし" }, { text: "に" }, { text: "一度", ruby: "いちど" }, { text: "の" }, { text: "健康診断", ruby: "けんこうしんだん" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "けました。" },
      { text: "血液", ruby: "けつえき" }, { text: "検査", ruby: "けんさ" }, { text: "や" }, { text: "レントゲン" }, { text: "撮影", ruby: "さつえい" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "医師", ruby: "いし" }, { text: "から" }, { text: "「適度", ruby: "てきど" }, { text: "な" }, { text: "運動", ruby: "うんどう" }, { text: "と" }, { text: "バランスの" }, { text: "取", ruby: "と" }, { text: "れた" }, { text: "食事", ruby: "しょくじ" }, { text: "を" }, { text: "心", ruby: "こころ" }, { text: "がけてください」と" }, { text: "助言", ruby: "じょげん" }, { text: "を受けました。" },
      { text: "自分", ruby: "じぶん" }, { text: "の" }, { text: "体", ruby: "からだ" }, { text: "と" }, { text: "向き合う" }, { text: "良", ruby: "よ" }, { text: "い" }, { text: "機会", ruby: "きかい" }, { text: "になりました。" }
    ],
    contentKo: "일 년에 한 번 있는 건강검진을 받았습니다. 혈액 검사와 엑스레이 촬영을 진행했습니다. 의사 선생님으로부터 '적당한 운동과 균형 잡힌 식사를 하도록 신경 쓰세요'라고 조언을 받았습니다. 제 몸과 마주하는 좋은 기회가 되었습니다.",
    vocabulary: [
      { word: "健康診断", reading: "けんこうしんだん", meaning: "건강검진" },
      { word: "血液検査", reading: "けつえきけんさ", meaning: "혈액 검사" },
      { word: "適度な", reading: "てきどな", meaning: "적당한" },
      { word: "助言", reading: "じょげん", meaning: "조언, 충고" },
      { word: "向き合う", reading: "むきあう", meaning: "마주 보다, 마주 대하다" }
    ],
    grammarPoints: [
      { rule: "〜を心がけてください", explanation: "'~하도록 신경 쓰세요/마음먹으세요'" },
      { rule: "〜向き合う機会", explanation: "'~와 마주하는 기회'" }
    ],
    quiz: [
      { question: "「健康診断」의 읽는 법은?", options: ["けんこうしんだん", "けんこうしんしん", "けんこうてんけん", "けんこうしんさ"], answer: "けんこうしんだん", explanation: "健康診断(けんこうしんだん)은 정기 건강 검진입니다." },
      { question: "「助言」의 뜻은?", options: ["조언", "경고", "칭찬", "명령"], answer: "조언", explanation: "助言(じょげん)은 도움을 주는 말이나 충고입니다." },
      { question: "「向き合う」의 의미는?", options: ["마주 보다/대하다", "등을 돌리다", "도망치다", "무시하다"], answer: "마주 보다/대하다", explanation: "자신의 상태나 문제를 가만히 응시하고 마주하는 것입니다." }
    ]
  },
  {
    id: "ld-192",
    title: "風邪の予防と手洗い・うがい",
    titleKo: "감기 예방과 손 씻기·가글",
    category: "건강",
    level: "초급",
    thumbnail: "🧼",
    contentJp: [
      { text: "寒", ruby: "さむ" }, { text: "くなり" }, { text: "空気", ruby: "くうき" }, { text: "が" }, { text: "乾燥", ruby: "かんそう" }, { text: "してきたので、" }, { text: "風邪", ruby: "かぜ" }, { text: "予防", ruby: "よぼう" }, { text: "を" }, { text: "徹底", ruby: "てってい" }, { text: "しています。" },
      { text: "帰宅", ruby: "きたく" }, { text: "したら" }, { text: "まず" }, { text: "石鹸", ruby: "せっけん" }, { text: "で" }, { text: "丁寧", ruby: "ていねい" }, { text: "に" }, { text: "手", ruby: "て" }, { text: "を" }, { text: "洗", ruby: "あら" }, { text: "い、" }, { text: "うがい薬で" }, { text: "うがいをします。" },
      { text: "部屋", ruby: "へや" }, { text: "には" }, { text: "加湿器", ruby: "かしつき" }, { text: "を" }, { text: "置", ruby: "お" }, { text: "いて" }, { text: "湿度", ruby: "しつど" }, { text: "を" }, { text: "保", ruby: "たも" }, { text: "っています。" },
      { text: "日頃", ruby: "ひごろ" }, { text: "の" }, { text: "小", ruby: "ちい" }, { text: "さな" }, { text: "ケアが" }, { text: "健康", ruby: "けんこう" }, { text: "を" }, { text: "守", ruby: "まも" }, { text: "ります。" }
    ],
    contentKo: "추워지고 공기가 건조해져서 감기 예방을 철저히 하고 있습니다. 귀가하면 우선 비누로 정성껏 손을 씻고, 가글약으로 가글을 합니다. 방에는 가습기를 놓아 습도를 유지하고 있습니다. 평소의 작은 케어가 건강을 지킵니다.",
    vocabulary: [
      { word: "乾燥", reading: "かんそう", meaning: "건조" },
      { word: "徹底", reading: "てってい", meaning: "철저" },
      { word: "加湿器", reading: "かしつき", meaning: "가습기" },
      { word: "湿度", reading: "しつど", meaning: "습도" },
      { word: "保つ", reading: "たもつ", meaning: "유지하다, 지키다" }
    ],
    grammarPoints: [
      { rule: "〜徹底している", explanation: "'~철저히 하고 있다'" },
      { rule: "〜たらまず", explanation: "'~하면 먼저/우선'" }
    ],
    quiz: [
      { question: "「乾燥」의 읽는 법은?", options: ["かんそう", "かんぞう", "かわそう", "けんそう"], answer: "かんそう", explanation: "乾燥(かんそう)는 수분이 마르고 건조한 상태입니다." },
      { question: "「加湿器」의 뜻은?", options: ["가습기", "제습기", "공기청정기", "난로"], answer: "가습기", explanation: "加湿器(かしつき)는 습도를 높여주는 장치입니다." },
      { question: "「保つ」의 한자 읽기는?", options: ["たもつ", "ほつ", "もつ", "かこつ"], answer: "たもつ", explanation: "保(たも)つ는 상태나 수준을 일정하게 지키는 것입니다." }
    ]
  },
  {
    id: "ld-193",
    title: "睡眠の質を高める工夫",
    titleKo: "수면의 질을 높이는 궁리",
    category: "건강",
    level: "중급",
    thumbnail: "🛌",
    contentJp: [
      { text: "最近", ruby: "さいきん" }, { text: "、" }, { text: "朝", ruby: "あさ" }, { text: "起", ruby: "お" }, { text: "きた" }, { text: "時", ruby: "とき" }, { text: "の" }, { text: "疲労感", ruby: "ひろうかん" }, { text: "が" }, { text: "気", ruby: "き" }, { text: "になったので、" }, { text: "睡眠", ruby: "すいみん" }, { text: "環境", ruby: "かんきょう" }, { text: "を" }, { text: "見直", ruby: "みなお" }, { text: "しました。" },
      { text: "就寝", ruby: "しゅうしん" }, { text: "1時間前", ruby: "いちじかんまえ" }, { text: "には" }, { text: "スマートフォンを" }, { text: "見", ruby: "み" }, { text: "ないようにし、" }, { text: "間接", ruby: "かんせつ" }, { text: "照明", ruby: "しょうめい" }, { text: "で" }, { text: "リラックスしました。" },
      { text: "自分", ruby: "じぶん" }, { text: "の" }, { text: "首", ruby: "くび" }, { text: "の" }, { text: "高", ruby: "たか" }, { text: "さに" }, { text: "合", ruby: "あ" }, { text: "う" }, { text: "オーダーメイド枕", ruby: "まくら" }, { text: "を" }, { text: "使", ruby: "つか" }, { text: "い" }, { text: "始", ruby: "はじ" }, { text: "めました。" },
      { text: "夜中", ruby: "よなか" }, { text: "に" }, { text: "目", ruby: "め" }, { text: "が" }, { text: "覚", ruby: "さ" }, { text: "めることもなくなり、" }, { text: "熟睡", ruby: "じゅくすい" }, { text: "できるようになりました。" }
    ],
    contentKo: "최근 아침에 일어났을 때의 피로감이 신경 쓰여 수면 환경을 재검토했습니다. 취침 1시간 전에는 스마트폰을 보지 않도록 하고 간접 조명으로 리랙스했습니다. 내 목 높이에 맞는 맞춤 베개를 사용하기 시작했습니다. 한밤중에 눈이 깨는 일도 없어지고 푹 잘 수 있게 되었습니다.",
    vocabulary: [
      { word: "疲労感", reading: "ひろうかん", meaning: "피로감" },
      { word: "就寝", reading: "しゅうしん", meaning: "취침" },
      { word: "枕", reading: "まくら", meaning: "베개" },
      { word: "目が覚める", reading: "めがさめる", meaning: "눈이 깨다, 잠에서 깨다" },
      { word: "熟睡", reading: "じゅくすい", meaning: "숙면" }
    ],
    grammarPoints: [
      { rule: "〜ないようにし", explanation: "'~하지 않도록 하고'" },
      { rule: "〜できるようになりました", explanation: "'~할 수 있게 되었습니다' (가능의 변화)" }
    ],
    quiz: [
      { question: "「熟睡」의 읽는 법은?", options: ["じゅくすい", "じゅくねむ", "じゅくすい", "じゅくすい"], answer: "じゅくすい", explanation: "熟睡(じゅくすい)는 깊고 푹 자는 숙면입니다." },
      { question: "「枕」의 한자 읽기는?", options: ["まくら", "ふとん", "シーツ", "ベッド"], answer: "まくら", explanation: "枕(まくら)는 머리를 괴는 베개입니다." },
      { question: "「目が覚める」의 뜻은?", options: ["잠에서 깨다", "눈이 아프다", "눈을 감다", "안경을 쓰다"], answer: "잠에서 깨다", explanation: "目(눈) + 覚める(깨어나다) = 잠에서 깨다." }
    ]
  },
  {
    id: "ld-194",
    title: "バランスの取れた食生活",
    titleKo: "균형 잡힌 식생활",
    category: "건강",
    level: "중급",
    thumbnail: "🥗",
    contentJp: [
      { text: "外食", ruby: "がいしょく" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "いていたので、" }, { text: "自炊", ruby: "じすい" }, { text: "を" }, { text: "増", ruby: "ふ" }, { text: "やして" }, { text: "栄養", ruby: "えいよう" }, { text: "バランスを" }, { text: "意識", ruby: "いしき" }, { text: "しています。" },
      { text: "主食", ruby: "しゅしょく" }, { text: "、" }, { text: "主菜", ruby: "しゅさい" }, { text: "、" }, { text: "副菜", ruby: "ふくさい" }, { text: "を" }, { text: "組", ruby: "く" }, { text: "み" }, { text: "合", ruby: "あ" }, { text: "わせ、" }, { text: "野菜", ruby: "やさい" }, { text: "を" }, { text: "たっぷり" }, { text: "摂", ruby: "と" }, { text: "るようにしています。" },
      { text: "塩分", ruby: "えんぶん" }, { text: "や" }, { text: "糖質", ruby: "とうしつ" }, { text: "の" }, { text: "摂", ruby: "と" }, { text: "り" }, { text: "過", ruby: "す" }, { text: "ぎにも" }, { text: "気", ruby: "き" }, { text: "をつけています。" },
      { text: "体調", ruby: "たいちょう" }, { text: "が" }, { text: "整", ruby: "ととの" }, { text: "い、" }, { text: "肌", ruby: "はだ" }, { text: "の" }, { text: "調子", ruby: "ちょうし" }, { text: "も" }, { text: "良", ruby: "よ" }, { text: "くなりました。" }
    ],
    contentKo: "외식이 계속되었기 때문에 자취를 늘려 영양 균형을 의식하고 있습니다. 주식, 주채, 부채를 조합하고 야채를 듬뿍 섭취하도록 하고 있습니다. 염분이나 당질의 과다 섭취에도 주의하고 있습니다. 컨디션이 가다듬어지고 피부 상태도 좋아졌습니다.",
    vocabulary: [
      { word: "自炊", reading: "じすい", meaning: "자취 (직접 밥해 먹음)" },
      { word: "副菜", reading: "ふくさい", meaning: "반찬, 부채" },
      { word: "摂る", reading: "とる", meaning: "섭취하다" },
      { word: "塩分", reading: "えんぶん", meaning: "염분, 소금기" },
      { word: "体調", reading: "たいちょう", meaning: "몸 상태, 컨디션" }
    ],
    grammarPoints: [
      { rule: "〜を増やす", explanation: "'~를 늘리다' (타동사)" },
      { rule: "〜摂るようにしている", explanation: "'~섭취하도록 노력하고 있다' (의도적 습관)" }
    ],
    quiz: [
      { question: "「自炊」의 읽는 법은?", options: ["じすい", "じさく", "じりょう", "じしょく"], answer: "じすい", explanation: "自炊(じすい)는 스스로 음식을 밥 지어 먹는 것입니다." },
      { question: "「摂る」의 뜻은?", options: ["섭취하다", "버리다", "만들다", "사다"], answer: "섭취하다", explanation: "栄養や水分などを 摂(と)る는 몸 안으로 섭취함입니다." },
      { question: "「体調」의 한자 읽기는?", options: ["たいちょう", "からだちょう", "たいじょう", "たいしらべ"], answer: "たいちょう", explanation: "体調(たいちょう)는 몸의 건강 상태, 컨디션입니다." }
    ]
  },
  {
    id: "ld-195",
    title: "メンタルヘルスと息抜き",
    titleKo: "멘탈 헬스와 숨돌리기",
    category: "건강",
    level: "고급",
    thumbnail: "🧠",
    contentJp: [
      { text: "ストレスが" }, { text: "溜", ruby: "た" }, { text: "まると" }, { text: "心身", ruby: "しんしん" }, { text: "に" }, { text: "不調", ruby: "ふちょう" }, { text: "が" }, { text: "現", ruby: "あらわ" }, { text: "れるため、" }, { text: "こまめな" }, { text: "息抜", ruby: "いきぬ" }, { text: "きを" }, { text: "意識", ruby: "いしき" }, { text: "しています。" },
      { text: "週末", ruby: "しゅうまつ" }, { text: "は" }, { text: "仕事", ruby: "しごと" }, { text: "の" }, { text: "連絡", ruby: "れんらく" }, { text: "を" }, { text: "断", ruby: "た" }, { text: "ち" }, { text: "切", ruby: "き" }, { text: "り、" }, { text: "自然", ruby: "しぜん" }, { text: "の" }, { text: "中", ruby: "なか" }, { text: "で" }, { text: "デジタルデトックスを" }, { text: "行", ruby: "おこな" }, { text: "います。" },
      { text: "好", ruby: "す" }, { text: "きな" }, { text: "音楽", ruby: "おんがく" }, { text: "を" }, { text: "聴", ruby: "き" }, { text: "いたり" }, { text: "アロマの" }, { text: "香", ruby: "かお" }, { text: "りを" }, { text: "楽", ruby: "たの" }, { text: "しんだりして" }, { text: "自分", ruby: "じぶん" }, { text: "を" }, { text: "労", ruby: "いたわ" }, { text: "っています。" },
      { text: "心", ruby: "こころ" }, { text: "の" }, { text: "健康", ruby: "けんこう" }, { text: "を" }, { text: "保", ruby: "たも" }, { text: "つことが" }, { text: "何より", ruby: "なにより" }, { text: "大切", ruby: "たいせつ" }, { text: "です。" }
    ],
    contentKo: "스트레스가 쌓이면 심신에 부조가 나타나므로 잦은 숨돌리기를 의식하고 있습니다. 주말에는 일의 연락을 끊고 자연 속에서 디지털 디톡스를 실시합니다. 좋아하는 음악을 듣거나 아로마 향을 즐기며 자신을 어루만지고 있습니다. 마음의 건강을 유지하는 것이 무엇보다 중요합니다.",
    vocabulary: [
      { word: "溜まる", reading: "たまる", meaning: "쌓이다, 고이다" },
      { word: "不調", reading: "ふちょう", meaning: "부조, 컨디션 불량" },
      { word: "息抜き", reading: "いきぬき", meaning: "숨돌리기, 쉬어가기" },
      { word: "断ち切る", reading: "たちきる", meaning: "끊다, 차단하다" },
      { word: "労わる", reading: "いたわる", meaning: "어루만지다, 위로하다" }
    ],
    grammarPoints: [
      { rule: "〜が現れるため", explanation: "'~가 나타나기 때문에'" },
      { rule: "〜何より大切だ", explanation: "'무엇보다 중요하다'" }
    ],
    quiz: [
      { question: "「息抜き」의 읽는 법은?", options: ["いきぬき", "いきぬけ", "そくぬき", "いきばぬき"], answer: "いきぬき", explanation: "息抜き(いきぬき)는 긴장을 풀고 잠시 쉬는 숨돌리기입니다." },
      { question: "「労わる」의 뜻은?", options: ["어루만지다/위로하다", "혹사하다", "비난하다", "잊다"], answer: "어루만지다/위로하다", explanation: "労(いたわ)る는 수고한 몸이나 마음을 정성껏 돌보고 아끼는 것입니다." },
      { question: "「不調」의 의미는?", options: ["컨디션 불량/부조", "호조", "완쾌", "정상"], answer: "컨디션 불량/부조", explanation: "不調(ふちょう)는 몸이나 마음의 상태가 좋지 않음을 말합니다." }
    ]
  },
  {
    id: "ld-196",
    title: "歯の定期検診とホワイトニング",
    titleKo: "치아 정기검진과 화이트닝",
    category: "건강",
    level: "초급",
    thumbnail: "🦷",
    contentJp: [
      { text: "3ヶ月", ruby: "さんかげつ" }, { text: "に" }, { text: "一度", ruby: "いちど" }, { text: "の" }, { text: "歯科", ruby: "しか" }, { text: "検診", ruby: "けんしん" }, { text: "に" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "虫歯", ruby: "むしば" }, { text: "の" }, { text: "チェックと" }, { text: "歯石", ruby: "しせき" }, { text: "の" }, { text: "除去", ruby: "じょきょ" }, { text: "を" }, { text: "してもらいました。" },
      { text: "歯磨", ruby: "はみが" }, { text: "きの" }, { text: "指導", ruby: "しどう" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "け、" }, { text: "フロスの" }, { text: "重要性", ruby: "じゅうようせい" }, { text: "を" }, { text: "再確認", ruby: "さいかくにん" }, { text: "しました。" },
      { text: "一生", ruby: "いっしょう" }, { text: "自分", ruby: "じぶん" }, { text: "の" }, { text: "歯", ruby: "は" }, { text: "で" }, { text: "美味", ruby: "おい" }, { text: "しく" }, { text: "食", ruby: "た" }, { text: "べるために" }, { text: "ケアを" }, { text: "続", ruby: "つづ" }, { text: "けます。" }
    ],
    contentKo: "3개월에 한 번 치과 검진에 갔습니다. 충치 체크와 치석 제거를 받았습니다. 칫솔질 지도를 받고 치실의 중요성을 재확인했습니다. 평생 제 치아로 맛있게 먹기 위해 케어를 계속하겠습니다.",
    vocabulary: [
      { word: "歯科", reading: "しか", meaning: "치과" },
      { word: "虫歯", reading: "むしば", meaning: "충치" },
      { word: "歯石", reading: "しせき", meaning: "치석" },
      { word: "除去", reading: "じょきょ", meaning: "제거" },
      { word: "一生", reading: "いっしょう", meaning: "평생" }
    ],
    grammarPoints: [
      { rule: "〜に一度", explanation: "'~에 한 번' (빈도)" },
      { rule: "〜をしてもらう", explanation: "'~를 받아 혜택을 얻다'" }
    ],
    quiz: [
      { question: "「虫歯」의 읽는 법은?", options: ["むしば", "ちゅうし", "むしは", "ちゅうば"], answer: "むしば", explanation: "虫歯(むしば)는 썩은 치아, 충치입니다." },
      { question: "「除去」의 뜻은?", options: ["제거", "추가", "방치", "생성"], answer: "제거", explanation: "除去(じょきょ)는 불필요한 것을 줄여서 없애는 것입니다." },
      { question: "「一生」의 한자 읽기는?", options: ["いっしょう", "いちせい", "ひとせい", "いっせい"], answer: "いっしょう", explanation: "一生(いっしょう)는 태어나서 죽을 때까지의 평생입니다." }
    ]
  },
  {
    id: "ld-197",
    title: "熱中症対策と水分補給",
    titleKo: "열중증 대책과 수분 보충",
    category: "건강",
    level: "중급",
    thumbnail: "🥤",
    contentJp: [
      { text: "猛暑日", ruby: "もうしょび" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "くため、" }, { text: "熱中症", ruby: "ねっちゅうしょう" }, { text: "対策", ruby: "たいさく" }, { text: "に" }, { text: "万全", ruby: "ばんぜん" }, { text: "を" }, { text: "期", ruby: "き" }, { text: "しています。" },
      { text: "喉", ruby: "のど" }, { text: "が" }, { text: "渇", ruby: "かわ" }, { text: "く前に" }, { text: "こまめに" }, { text: "水", ruby: "みず" }, { text: "や" }, { text: "スポーツドリンクを" }, { text: "飲", ruby: "の" }, { text: "んでいます。" },
      { text: "塩分", ruby: "えんぶん" }, { text: "タブレットも" }, { text: "携帯", ruby: "けいたい" }, { text: "し、" }, { text: "外出時", ruby: "がいしゅつじ" }, { text: "は" }, { text: "日傘", ruby: "ひがさ" }, { text: "を" }, { text: "使用", ruby: "しよう" }, { text: "しています。" },
      { text: "無理", ruby: "むり" }, { text: "をせず" }, { text: "エアコンを" }, { text: "適切", ruby: "てきせつ" }, { text: "に" }, { text: "使", ruby: "つか" }, { text: "って" }, { text: "夏", ruby: "なつ" }, { text: "を" }, { text: "乗り切りたいです。" }
    ],
    contentKo: "폭염 날씨가 지속되기 때문에 열중증(온열질환) 대책에 만전을 기하고 있습니다. 목이 마르기 전에 자주는 물이나 스포츠 음료를 마시고 있습니다. 염분 알약도 휴대하고 외출 시에는 양산을 사용하고 있습니다. 무리하지 않고 에어컨을 적절히 사용하여 여름을 이겨내고 싶습니다.",
    vocabulary: [
      { word: "猛暑日", reading: "もうしょび", meaning: "폭염일 (기온 35도 이상인 날)" },
      { word: "熱中症", reading: "ねっちゅうしょう", meaning: "열중증, 온열질환" },
      { word: "万全を期す", reading: "ばんぜんをきす", meaning: "만전을 기하다" },
      { word: "渇く", reading: "かわく", meaning: "(목이) 마르다" },
      { word: "乗り切る", reading: "のりきる", meaning: "극복하다, 난국을 이겨내다" }
    ],
    grammarPoints: [
      { rule: "〜渇く前に", explanation: "'~마르기 전에'" },
      { rule: "〜無理をせず", explanation: "'~무리하지 않고'" }
    ],
    quiz: [
      { question: "「熱中症」의 읽는 법은?", options: ["ねっちゅうしょう", "ねつちゅうしょう", "ねっちゅうちょう", "ねつちゅうちょう"], answer: "ねっちゅうしょう", explanation: "熱中症(ねっちゅうしょう)는 더위로 일어나는 장애입니다." },
      { question: "「渇く」의 뜻은?", options: ["(목이) 마르다", "젖다", "아프다", "막히다"], answer: "(목이) 마르다", explanation: "喉が渇く(のどがかわく)는 목이 말라 수분이 필요한 상태입니다." },
      { question: "「乗り切る」의 의미는?", options: ["이겨내다/극복하다", "포기하고 쓰러지다", "도망치다", "미루다"], answer: "이겨내다/극복하다", explanation: "어려운 시기나 환경을 잘 견뎌 넘기는 것입니다." }
    ]
  },
  {
    id: "ld-198",
    title: "ストレッチと柔軟性",
    titleKo: "스트레칭과 유연성",
    category: "건강",
    level: "초급",
    thumbnail: "🤸‍♂️",
    contentJp: [
      { text: "風呂上", ruby: "ふろあ" }, { text: "がりは" }, { text: "体", ruby: "からだ" }, { text: "が" }, { text: "温", ruby: "あたた" }, { text: "まっているので" }, { text: "ストレッチの" }, { text: "絶好", ruby: "ぜっこう" }, { text: "の" }, { text: "タイミングです。" },
      { text: "開脚", ruby: "かいきゃく" }, { text: "や" }, { text: "前屈", ruby: "ぜんくつ" }, { text: "を" }, { text: "無理", ruby: "むり" }, { text: "のない" }, { text: "範囲", ruby: "はんい" }, { text: "で" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "息", ruby: "いき" }, { text: "を" }, { text: "吐", ruby: "は" }, { text: "きながら" }, { text: "筋肉", ruby: "きんにく" }, { text: "を" }, { text: "伸ばすと" }, { text: "徐々", ruby: "じょじょ" }, { text: "に" }, { text: "可動域", ruby: "かどういき" }, { text: "が" }, { text: "広", ruby: "ひろ" }, { text: "がります。" },
      { text: "柔軟性", ruby: "じゅうなんせい" }, { text: "を" }, { text: "高", ruby: "たか" }, { text: "めて" }, { text: "怪我", ruby: "けが" }, { text: "の" }, { text: "予防", ruby: "よぼう" }, { text: "に" }, { text: "繋", ruby: "つなが" }, { text: "げたいです。" }
    ],
    contentKo: "목욕 직후는 몸이 따뜻해져 있어서 스트레칭의 절호의 타이밍입니다. 다리 벌리기나 전굴을 무리가 없는 범위에서 진행했습니다. 숨을 내쉬며 근육을 늘리면 서서히 가동 범위가 넓어집니다. 유연성을 높여 부상 예방으로 연결하고 싶습니다.",
    vocabulary: [
      { word: "絶好", reading: "ぜっこう", meaning: "절호, 안성맞춤" },
      { word: "前屈", reading: "ぜんくつ", meaning: "전굴 (몸 앞으로 굽히기)" },
      { word: "可動域", reading: "かどういき", meaning: "가동 범위" },
      { word: "柔軟性", reading: "じゅうなんせい", meaning: "유연성" },
      { word: "怪我", reading: "けが", meaning: "부상, 상처" }
    ],
    grammarPoints: [
      { rule: "〜無理のない範囲で", explanation: "'~무리가 없는 범위에서'" },
      { rule: "〜繋げたい", explanation: "'~연결하고 싶다/이어지게 하고 싶다'" }
    ],
    quiz: [
      { question: "「怪我」의 읽는 법은?", options: ["けが", "かいが", "きが", "けいが"], answer: "けが", explanation: "怪我(けが)는 다치거나 부상을 입는 것입니다." },
      { question: "「絶好」의 뜻은?", options: ["절호/안성맞춤", "최악", "불가능", "어려움"], answer: "절호/안성맞춤", explanation: "絶好(ぜっこう)는 더할 나위 없이 좋은 상태입니다." },
      { question: "「柔軟性」의 한자 읽기는?", options: ["じゅうなんせい", "じゅうなんしょう", "じゅうれんせい", "しゅうなんせい"], answer: "じゅうなんせい", explanation: "柔軟性(じゅうなんせい)는 몸이나 사고의 유연함입니다." }
    ]
  },
  {
    id: "ld-199",
    title: "漢方薬と体質改善",
    titleKo: "한방약과 체질 개선",
    category: "건강",
    level: "고급",
    thumbnail: "🌿",
    contentJp: [
      { text: "冷", ruby: "ひえ" }, { text: "え" }, { text: "性", ruby: "しょう" }, { text: "を" }, { text: "改善", ruby: "かいぜん" }, { text: "するため、" }, { text: "漢方", ruby: "かんぽう" }, { text: "専門", ruby: "せんもん" }, { text: "の" }, { text: "薬局", ruby: "やっきょく" }, { text: "で" }, { text: "相談", ruby: "そうだん" }, { text: "しました。" },
      { text: "問診", ruby: "もんしん" }, { text: "と" }, { text: "脈診", ruby: "みゃくしん" }, { text: "を" }, { text: "経", ruby: "へ" }, { text: "て、" }, { text: "私", ruby: "わたし" }, { text: "の" }, { text: "証", ruby: "しょう" }, { text: "に" }, { text: "合", ruby: "あ" }, { text: "う" }, { text: "生薬", ruby: "しょうやく" }, { text: "を" }, { text: "処方", ruby: "しょほう" }, { text: "してもらいました。" },
      { text: "煎", ruby: "せん" }, { text: "じ" }, { text: "薬", ruby: "ぐすり" }, { text: "の" }, { text: "独特", ruby: "どくとく" }, { text: "な" }, { text: "苦", ruby: "にが" }, { text: "みにも" }, { text: "慣", ruby: "な" }, { text: "れ、" }, { text: "じわじわと" }, { text: "体", ruby: "からだ" }, { text: "が" }, { text: "温", ruby: "あたた" }, { text: "まるのを" }, { text: "実感", ruby: "じっかん" }, { text: "しています。" },
      { text: "西洋", ruby: "せいよう" }, { text: "医学", ruby: "いがく" }, { text: "とは" }, { text: "異", ruby: "こと" }, { text: "なる" }, { text: "アプローチで" }, { text: "根本", ruby: "こんぽん" }, { text: "からの" }, { text: "治癒", ruby: "ちゆ" }, { text: "を" }, { text: "目指", ruby: "めざ" }, { text: "します。" }
    ],
    contentKo: "수족냉증을 개선하기 위해 한방 전문 약국에서 상담했습니다. 문진과 맥진을 거쳐 내 체질(증)에 맞는 생약을 처방받았습니다. 달인 한약의 독특한 쓴맛에도 익숙해져, 서서히 몸이 따뜻해지는 것을 실감하고 있습니다. 서양의학과 다른 접근법으로 근본적인 치유를 목표로 합니다.",
    vocabulary: [
      { word: "冷え性", reading: "ひえしょう", meaning: "수족냉증" },
      { word: "生薬", reading: "しょうやく", meaning: "생약, 약재" },
      { word: "処方", reading: "しょほう", meaning: "처방" },
      { word: "煎じ薬", reading: "せんじぐすり", meaning: "달인 한약" },
      { word: "根本", reading: "こんぽん", meaning: "근본" }
    ],
    grammarPoints: [
      { rule: "〜を経て", explanation: "'~를 거쳐서/경유하여'" },
      { rule: "〜とは異なる", explanation: "'~와는 다른'" }
    ],
    quiz: [
      { question: "「冷え性」의 읽는 법은?", options: ["ひえしょう", "ひえせい", "つめえしょう", "ひえさ"], answer: "ひえしょう", explanation: "冷え性(ひえしょう)는 손발이나 몸이 차가운 수족냉증 체질입니다." },
      { question: "「処方」의 뜻은?", options: ["처방", "치료", "수술", "진단"], answer: "처방", explanation: "処方(しょほう)는 환자에게 약을 조제하여 주는 것입니다." },
      { question: "「〜を経て」의 의미는?", options: ["~를 거쳐서", "~를 무시하고", "~를 피해서", "~를 시작으로"], answer: "~를 거쳐서", explanation: "経る(거치다)의 て형 + て = 과정을 경유함을 뜻함." }
    ]
  },
  {
    id: "ld-200",
    title: "デジタルデトックスの休日",
    titleKo: "디지털 디톡스의 휴일",
    category: "건강",
    level: "중급",
    thumbnail: "📵",
    contentJp: [
      { text: "一日", ruby: "いちにち" }, { text: "スマートフォンや" }, { text: "パソコンの" }, { text: "電源", ruby: "でんげん" }, { text: "を" }, { text: "切", ruby: "き" }, { text: "って" }, { text: "過ごしました。" },
      { text: "情報", ruby: "じょうほう" }, { text: "の" }, { text: "過多", ruby: "かた" }, { text: "から" }, { text: "解放", ruby: "かいほう" }, { text: "され、" }, { text: "脳", ruby: "のう" }, { text: "の" }, { text: "疲労", ruby: "ひろう" }, { text: "が" }, { text: "軽減", ruby: "けいげん" }, { text: "したように" }, { text: "感", ruby: "かん" }, { text: "じます。" },
      { text: "五感", ruby: "ごかん" }, { text: "を" }, { text: "研", ruby: "と" }, { text: "ぎ" }, { text: "澄", ruby: "す" }, { text: "まし、" }, { text: "風", ruby: "かぜ" }, { text: "の" }, { text: "音", ruby: "おと" }, { text: "や" }, { text: "鳥", ruby: "とり" }, { text: "の" }, { text: "さえずりに" }, { text: "耳", ruby: "みみ" }, { text: "を" }, { text: "傾", ruby: "かたむ" }, { text: "けました。" },
      { text: "現代人", ruby: "げんだいじん" }, { text: "に" }, { text: "とって" }, { text: "脳", ruby: "のう" }, { text: "を" }, { text: "休", ruby: "やす" }, { text: "ませる" }, { text: "デジタルデトックスは" }, { text: "不可欠", ruby: "ふかけつ" }, { text: "だと" }, { text: "確信", ruby: "かくしん" }, { text: "しました。" }
    ],
    contentKo: "하루 종일 스마트폰이나 컴퓨터 전원을 끄고 보냈습니다. 정보 과다로부터 해방되어 뇌의 피로가 경감된 것처럼 느껴집니다. 오감을 곤두세우고 바람 소리와 새지저귐에 귀를 기울였습니다. 현대인에게 있어서 뇌를 쉬게 하는 디지털 디톡스는 불가결하다고 확신했습니다.",
    vocabulary: [
      { word: "電源を切る", reading: "でんげんをきる", meaning: "전원을 끄다" },
      { word: "解放", reading: "かいほう", meaning: "해방" },
      { word: "軽減", reading: "けいげん", meaning: "경감, 줄임" },
      { word: "研ぎ澄ます", reading: "とぎすます", meaning: "날을 바짝 세우다, 오감을 날카롭게 하다" },
      { word: "不可欠", reading: "ふかけつ", meaning: "불가결함, 없어서는 안 됨" }
    ],
    grammarPoints: [
      { rule: "〜から解放され", explanation: "수동태 '~로부터 해방되어'" },
      { rule: "〜にとって", explanation: "'~에게 있어서' (관점/기준)" }
    ],
    quiz: [
      { question: "「軽減」의 읽는 법은?", options: ["けいげん", "けいかん", "きょうげん", "かるげん"], answer: "けいげん", explanation: "軽減(けいげん)은 부담이나 피로를 줄여 가볍게 하는 것입니다." },
      { question: "「研ぎ澄ます」의 비유적 뜻은?", options: ["오감을 날카롭게 세우다", "칼을 갈다", "잠을 자다", "무뎌지다"], answer: "오감을 날카롭게 세우다", explanation: "감각을 매우 예민하고 맑게 집중시키는 상태를 뜻합니다." },
      { question: "「不可欠」의 의미는?", options: ["불가결함/필수적임", "불필요함", "위험함", "불가능함"], answer: "불가결함/필수적임", explanation: "不可欠(ふかけつ)는 결코 빠뜨릴 수 없음을 말합니다." }
    ]
  }
];
