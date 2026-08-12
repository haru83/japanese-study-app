import type { LearningDiary } from "@/types/learningDiary";

export const part18: LearningDiary[] = [
  {
    id: "ld-171",
    title: "週末のギター練習",
    titleKo: "주말의 기타 연습",
    category: "취미",
    level: "초급",
    thumbnail: "🎸",
    contentJp: [
      { text: "最近", ruby: "さいきん" }, { text: "、" }, { text: "アコースティックギターを" }, { text: "習", ruby: "なら" }, { text: "い" }, { text: "始", ruby: "はじ" }, { text: "めました。" },
      { text: "指先", ruby: "ゆびさき" }, { text: "が" }, { text: "痛", ruby: "いた" }, { text: "くなりますが、" }, { text: "コードが" }, { text: "綺麗", ruby: "きれい" }, { text: "に" }, { text: "鳴", ruby: "な" }, { text: "ると" }, { text: "嬉", ruby: "うれ" }, { text: "しいです。" },
      { text: "今日", ruby: "きょう" }, { text: "は" }, { text: "好", ruby: "す" }, { text: "きな" }, { text: "曲", ruby: "きょく" }, { text: "の" }, { text: "イントロを" }, { text: "繰り返し", ruby: "くりかえし" }, { text: "練習", ruby: "れんしゅう" }, { text: "しました。" },
      { text: "いつか" }, { text: "一曲", ruby: "いっきょく" }, { text: "通", ruby: "とお" }, { text: "して" }, { text: "弾", ruby: "ひ" }, { text: "けるように" }, { text: "頑張", ruby: "がんば" }, { text: "ります。" }
    ],
    contentKo: "최근 어쿠스틱 기타를 배우기 시작했습니다. 손끝이 아프지만 코드가 예쁘게 울리면 기쁩니다. 오늘은 좋아하는 곡의 인트로를 반복해서 연습했습니다. 언젠가 한 곡을 통째로 연주할 수 있도록 노력하겠습니다.",
    vocabulary: [
      { word: "習い始める", reading: "ならいはじめる", meaning: "배우기 시작하다" },
      { word: "指先", reading: "ゆびさき", meaning: "손끝" },
      { word: "鳴る", reading: "なる", meaning: "울리다, 소리가 나다" },
      { word: "繰り返し", reading: "くりかえし", meaning: "반복" },
      { word: "弾く", reading: "ひく", meaning: "(악기를) 치다, 켜다, 연주하다" }
    ],
    grammarPoints: [
      { rule: "〜始めました", explanation: "동사 ます형 어간 + 始める = '~하기 시작했다'" },
      { rule: "〜一曲通して", explanation: "'~한 곡을 통틀어/처음부터 끝까지'" }
    ],
    quiz: [
      { question: "「弾く」의 한자 읽기는?", options: ["ひく", "ふく", "たたく", "なる"], answer: "ひく", explanation: "弾(ひ)く는 기타나 피아노 등 악기를 연주하는 것입니다." },
      { question: "「指先」의 뜻은?", options: ["손끝", "발가락", "손목", "팔꿈치"], answer: "손끝", explanation: "指(손가락) + 先(끝) = 손가락 끝입니다." },
      { question: "「弾けるように」의 의미는?", options: ["연주할 수 있도록", "연주하기 전에", "연주하고 나서", "연주하지 않고"], answer: "연주할 수 있도록", explanation: "弾ける(가능형) + ように = 연주할 수 있도록" }
    ]
  },
  {
    id: "ld-172",
    title: "一眼レフカメラの撮影散歩",
    titleKo: "DSLR 카메라 출사 산책",
    category: "취미",
    level: "중급",
    thumbnail: "📷",
    contentJp: [
      { text: "愛用", ruby: "あいよう" }, { text: "の" }, { text: "一眼レフカメラを" }, { text: "片手", ruby: "かたて" }, { text: "に" }, { text: "街", ruby: "まち" }, { text: "に" }, { text: "繰", ruby: "く" }, { text: "り" }, { text: "出", ruby: "だ" }, { text: "しました。" },
      { text: "絞り", ruby: "しぼり" }, { text: "や" }, { text: "シャッタースピードを" }, { text: "調整", ruby: "ちょうせい" }, { text: "しながら、" }, { text: "光", ruby: "ひかり" }, { text: "と" }, { text: "影", ruby: "かげ" }, { text: "の" }, { text: "コントラストを" }, { text: "狙", ruby: "ねら" }, { text: "いました。" },
      { text: "路地裏", ruby: "ろじうら" }, { text: "の" }, { text: "レトロな" }, { text: "建物", ruby: "たてもの" }, { text: "や" }, { text: "夕日", ruby: "ゆうひ" }, { text: "に" }, { text: "染", ruby: "そ" }, { text: "まる" }, { text: "空", ruby: "そら" }, { text: "を" }, { text: "ファインダーごしに" }, { text: "切り取りました。" },
      { text: "思", ruby: "おも" }, { text: "い" }, { text: "通", ruby: "とお" }, { text: "りの" }, { text: "一枚", ruby: "いちまい" }, { text: "が" }, { text: "撮", ruby: "と" }, { text: "れた" }, { text: "時", ruby: "とき" }, { text: "は" }, { text: "最高", ruby: "さいこう" }, { text: "の" }, { text: "気分", ruby: "きぶん" }, { text: "です。" }
    ],
    contentKo: "애용하는 DSLR 카메라를 한 손에 들고 거리로 나섰습니다. 조리개와 셔터 스피드를 조절하면서 빛과 그림자의 대비를 노렸습니다. 골목 안쪽의 레트로한 건물이나 노을에 물드는 하늘을 파인더 너머로 잘라 담았습니다. 생각한 대로의 한 장을 찍었을 때는 최고의 기분입니다.",
    vocabulary: [
      { word: "繰り出す", reading: "くりだす", meaning: "나아가다, 밖으로 나가다" },
      { word: "絞り", reading: "しぼり", meaning: "조리개" },
      { word: "ファインダーごし", reading: "ファインダーごし", meaning: "뷰파인더 너머" },
      { word: "切り取る", reading: "きりとる", meaning: "잘라내다, 렌즈로 담다" },
      { word: "思い通り", reading: "おもいとおり", meaning: "생각한 대로" }
    ],
    grammarPoints: [
      { rule: "〜を片手に", explanation: "'~를 한 손에 들고/쥐고'" },
      { rule: "〜に染まる", explanation: "'~로 물들다'" }
    ],
    quiz: [
      { question: "「繰り出す」의 뜻은?", options: ["밖으로 나서다/나아가다", "집으로 돌아오다", "카메라를 부수다", "잠들다"], answer: "밖으로 나서다/나아가다", explanation: "繰り出す(くりだす)는 거리나 밖으로 활기차게 나가는 것입니다." },
      { question: "「切り取る」의 비유적 뜻은?", options: ["렌즈로 포착해 담다", "종이를 가위로 자르다", "사진을 삭제하다", "그림을 그리다"], answer: "렌즈로 포착해 담다", explanation: "풍경의 순간을 카메라 렌즈 프레임 안에 담아내는 것을 의미합니다." },
      { question: "「思い通り」의 의미는?", options: ["생각한 대로", "생각과 달리", "아무 생각 없이", "어렵게"], answer: "생각한 대로", explanation: "思い(생각) + 通り(대로) = 자신이 의도하고 마음먹은 대로." }
    ]
  },
  {
    id: "ld-173",
    title: "ヨガとマインドフルネス",
    titleKo: "요가와 마인드풀니스",
    category: "취미",
    level: "초급",
    thumbnail: "🧘",
    contentJp: [
      { text: "朝", ruby: "あさ" }, { text: "の" }, { text: "30分", ruby: "さんじゅっぷん" }, { text: "、" }, { text: "ヨガマットを" }, { text: "敷", ruby: "し" }, { text: "いて" }, { text: "ヨガを行いました。" },
      { text: "呼吸", ruby: "こきゅう" }, { text: "に" }, { text: "意識", ruby: "いしき" }, { text: "を" }, { text: "向", ruby: "む" }, { text: "け、" }, { text: "ポーズを" }, { text: "取", ruby: "と" }, { text: "りながら" }, { text: "身体", ruby: "からだ" }, { text: "を" }, { text: "伸ばします。" },
      { text: "固", ruby: "かた" }, { text: "くなった" }, { text: "筋肉", ruby: "きんにく" }, { text: "が" }, { text: "解", ruby: "ほぐ" }, { text: "れ、" }, { text: "頭", ruby: "あたま" }, { text: "の中", ruby: "のなか" }, { text: "が" }, { text: "スッキリと" }, { text: "澄", ruby: "す" }, { text: "み" }, { text: "渡", ruby: "わた" }, { text: "ります。" },
      { text: "心", ruby: "こころ" }, { text: "と" }, { text: "体", ruby: "からだ" }, { text: "の" }, { text: "バランスを" }, { text: "整", ruby: "ととの" }, { text: "える" }, { text: "大切", ruby: "たいせつ" }, { text: "な" }, { text: "習慣", ruby: "しゅうかん" }, { text: "です。" }
    ],
    contentKo: "아침 30분, 요가 매트를 깔고 요가를 실시했습니다. 호흡에 의식을 집중하고 자세를 취하며 몸을 늘려 줍니다. 굳어 있던 근육이 풀리고 머릿속이 말끔하게 맑아집니다. 마음과 몸의 균형을 가다듬는 중요한 습관입니다.",
    vocabulary: [
      { word: "敷く", reading: "しく", meaning: "깔다 (매트/이불 등)" },
      { word: "呼吸", reading: "こきゅう", meaning: "호흡" },
      { word: "筋肉", reading: "きんにく", meaning: "근육" },
      { word: "澄み渡る", reading: "すみわたる", meaning: "맑게 개다, 맑아지다" },
      { word: "習慣", reading: "しゅうかん", meaning: "습관" }
    ],
    grammarPoints: [
      { rule: "〜に意識を向ける", explanation: "'~에 의식을 집중하다/향하다'" },
      { rule: "〜を整える", explanation: "'~를 가다듬다/정돈하다'" }
    ],
    quiz: [
      { question: "「敷く」의 한자 읽기는?", options: ["しく", "おく", "ひく", "のせる"], answer: "しく", explanation: "敷(し)く는 돗자리나 이불, 매트 등을 까는 동사입니다." },
      { question: "「澄み渡る」의 뜻은?", options: ["말끔히 맑아지다", "어두워지다", "소란스러워지다", "막히다"], answer: "말끔히 맑아지다", explanation: "澄み渡る는 구름 한 점 없이 투명하게 맑아지는 것입니다." },
      { question: "「呼吸」의 읽는 법은?", options: ["こきゅう", "こうきゅう", "こきゅ", "ふきゅう"], answer: "こきゅう", explanation: "呼吸(こきゅう)는 숨을 쉬는 호흡입니다." }
    ]
  },
  {
    id: "ld-174",
    title: "プラモデルの組み立てと塗装",
    titleKo: "프라모델 조립과 도색",
    category: "취미",
    level: "중급",
    thumbnail: "✈️",
    contentJp: [
      { text: "休日", ruby: "きゅうじつ" }, { text: "、" }, { text: "飛行機", ruby: "ひこうき" }, { text: "の" }, { text: "プラモデル作", ruby: "づくり" }, { text: "に" }, { text: "没頭", ruby: "ぼっとう" }, { text: "しました。" },
      { text: "ニッパーで" }, { text: "パーツを" }, { text: "切", ruby: "き" }, { text: "り" }, { text: "離", ruby: "はな" }, { text: "し、" }, { text: "ヤスリで" }, { text: "丁寧", ruby: "ていねい" }, { text: "に" }, { text: "バリを" }, { text: "削", ruby: "けず" }, { text: "りました。" },
      { text: "エアブラシを" }, { text: "使", ruby: "つか" }, { text: "って" }, { text: "細", ruby: "こま" }, { text: "かい" }, { text: "グラデーション" }, { text: "塗装", ruby: "とそう" }, { text: "を" }, { text: "施", ruby: "ほどこ" }, { text: "しました。" },
      { text: "時間", ruby: "じかん" }, { text: "の" }, { text: "経", ruby: "た" }, { text: "つのを" }, { text: "忘", ruby: "わす" }, { text: "れるほど" }, { text: "集中", ruby: "しゅうちゅう" }, { text: "できる" }, { text: "至高", ruby: "しこう" }, { text: "の" }, { text: "趣味", ruby: "しゅみ" }, { text: "です。" }
    ],
    contentKo: "휴일, 비행기 프라모델 만들기에 몰두했습니다. 니퍼로 부품을 잘라내고 사포로 정성껏 다듬었습니다. 에어브러시를 사용하여 세밀한 그라데이션 도색을 칠했습니다. 시간이 가는 것을 잊을 정도로 집중할 수 있는 최고의 취미입니다.",
    vocabulary: [
      { word: "没頭", reading: "ぼっとう", meaning: "몰두" },
      { word: "削る", reading: "けずる", meaning: "깎다, 사포질하다" },
      { word: "塗装", reading: "とそう", meaning: "도색, 칠하기" },
      { word: "施す", reading: "ほどこす", meaning: "베풀다, (칠 등을) 가하다" },
      { word: "至高", reading: "しこう", meaning: "지고함, 최고의" }
    ],
    grammarPoints: [
      { rule: "〜に没頭する", explanation: "'~에 몰두하다'" },
      { rule: "〜つのを忘れるほど", explanation: "'시간이 지나는 것을 잊을 정도로'" }
    ],
    quiz: [
      { question: "「没頭」의 읽는 법은?", options: ["ぼっとう", "もっとう", "ぼつず", "ぼっこう"], answer: "ぼっとう", explanation: "没頭(ぼっとう)는 어떤 일에 온 정신을 쏟아 몰두함입니다." },
      { question: "「削る」의 뜻은?", options: ["깎다/다듬다", "붙이다", "칠하다", "구부리다"], answer: "깎다/다듬다", explanation: "削(けず)る는 칼이나 사포 등으로 표면을 깎는 것입니다." },
      { question: "「施す」의 의미는?", options: ["(도색 등을) 가하다/베풀다", "제거하다", "구입하다", "숨기다"], answer: "(도색 등을) 가하다/베풀다", explanation: "施(ほどこ)す는 기술이나 칠 등을 대상에 적용하여 가하는 것입니다." }
    ]
  },
  {
    id: "ld-175",
    title: "ベランダでの菜園作り",
    titleKo: "베란다에서의 텃밭 만들기",
    category: "취미",
    level: "중급",
    thumbnail: "🍅",
    contentJp: [
      { text: "ベランダの" }, { text: "プランターで" }, { text: "ミニトマトと" }, { text: "バジルを" }, { text: "育", ruby: "そだ" }, { text: "て" }, { text: "始", ruby: "はじ" }, { text: "めました。" },
      { text: "苗", ruby: "なえ" }, { text: "を" }, { text: "植", ruby: "うえ" }, { text: "えて" }, { text: "毎朝", ruby: "まいあさ" }, { text: "水", ruby: "みず" }, { text: "を" }, { text: "やり、" }, { text: "日当", ruby: "ひあ" }, { text: "たりを" }, { text: "気", ruby: "き" }, { text: "に" }, { text: "かけました。" },
      { text: "赤", ruby: "あか" }, { text: "く" }, { text: "熟", ruby: "実" }, { text: "した" }, { text: "トマトを" }, { text: "収穫", ruby: "しゅうかく" }, { text: "して" }, { text: "サラダにして" }, { text: "食", ruby: "た" }, { text: "べました。" },
      { text: "自分", ruby: "じぶん" }, { text: "で" }, { text: "育", ruby: "そだ" }, { text: "てた" }, { text: "野菜", ruby: "やさい" }, { text: "の" }, { text: "味", ruby: "あじ" }, { text: "は" }, { text: "特別", ruby: "とくべつ" }, { text: "に" }, { text: "美", ruby: "おい" }, { text: "しかったです。" }
    ],
    contentKo: "베란다 플랜터에서 방울토마토와 바질을 키우기 시작했습니다. 모종을 심고 매일 아침 물을 주며 햇빛을 신경 썼습니다. 빨갛게 익은 토마토를 수확해 샐러드로 만들어 먹었습니다. 직접 키운 야채 맛은 특별히 맛있었습니다.",
    vocabulary: [
      { word: "苗", reading: "なえ", meaning: "모종, 싹" },
      { word: "植える", reading: "うえる", meaning: "심다" },
      { word: "日当たり", reading: "ひあたり", meaning: "채광, 일조량" },
      { word: "収穫", reading: "しゅうかく", meaning: "수확" },
      { word: "特別に", reading: "とくべつに", meaning: "특별히" }
    ],
    grammarPoints: [
      { rule: "〜を気に書ける", explanation: "'~를 신경 쓰다/마음에 두다'" },
      { rule: "〜にして食べる", explanation: "'~로 만들어서 먹다'" }
    ],
    quiz: [
      { question: "「収穫」의 읽는 법은?", options: ["しゅうかく", "しゅうこう", "しゅかく", "しゅうえき"], answer: "しゅうかく", explanation: "収穫(しゅうかく)는 농작물 등을 거두어들이는 것입니다." },
      { question: "「植える」의 뜻은?", options: ["심다", "뽑다", "자르다", "사다"], answer: "심다", explanation: "植(う)える는 식물 모종이나 씨앗을 땅에 심는 것입니다." },
      { question: "「苗」의 한자 읽기는?", options: ["なえ", "くき", "はっぱ", "たね"], answer: "なえ", explanation: "苗(なえ)는 밭에 심는 벼나 식물의 어린 모종입니다." }
    ]
  },
  {
    id: "ld-176",
    title: "ソロキャンプの夜",
    titleKo: "솔로 캠핑의 밤",
    category: "취미",
    level: "고급",
    thumbnail: "🏕️",
    contentJp: [
      { text: "一人で" }, { text: "山", ruby: "やま" }, { text: "の" }, { text: "キャンプ場", ruby: "じょう" }, { text: "へ" }, { text: "行", ruby: "い" }, { text: "き、" }, { text: "テントを" }, { text: "設営", ruby: "せつえい" }, { text: "しました。" },
      { text: "日", ruby: "ひ" }, { text: "が" }, { text: "暮", ruby: "く" }, { text: "れると" }, { text: "焚き火", ruby: "たきび" }, { text: "を" }, { text: "起", ruby: "お" }, { text: "こし、" }, { text: "揺", ruby: "ゆ" }, { text: "らめく" }, { text: "炎", ruby: "ほのお" }, { text: "を" }, { text: "じっと" }, { text: "眺", ruby: "なが" }, { text: "めました。" },
      { text: "パチパチという" }, { text: "薪", ruby: "まき" }, { text: "の" }, { text: "はぜる" }, { text: "音", ruby: "おと" }, { text: "と" }, { text: "澄", ruby: "す" }, { text: "んだ" }, { text: "星空", ruby: "ほしぞら" }, { text: "に" }, { text: "包", ruby: "つつ" }, { text: "まれました。" },
      { text: "日常", ruby: "にちじょう" }, { text: "の" }, { text: "喧騒", ruby: "けんそう" }, { text: "から" }, { text: "解", ruby: "と" }, { text: "き" }, { text: "放", ruby: "はな" }, { text: "たれる" }, { text: "贅沢", ruby: "ぜいたく" }, { text: "な" }, { text: "ソロキャンプです。" }
    ],
    contentKo: "혼자서 산속 캠핑장에 가서 텐트를 쳤습니다. 해가 지자 장작불을 지피고 흔들리는 불꽃을 가만히 바라보았습니다. 탁탁 소리 내며 튀는 장작 소리와 투명한 별밤에 둘러싸였습니다. 일상의 소란스러움에서 해방되는 사치스러운 솔로 캠핑입니다.",
    vocabulary: [
      { word: "設営", reading: "せつえい", meaning: "설영, 텐트 치기" },
      { word: "焚き火", reading: "たきび", meaning: "모닥불, 장작불" },
      { word: "薪", reading: "まき", meaning: "장작" },
      { word: "はぜる", reading: "はぜる", meaning: "불꽃이 튀다, 튀어 터지다" },
      { word: "喧騒", reading: "けんそう", meaning: "소란스러움, 왁자지껄함" }
    ],
    grammarPoints: [
      { rule: "〜に包まれる", explanation: "수동태 '~에 감싸이다/둘러싸이다'" },
      { rule: "〜から解き放たれる", explanation: "수동태 '~로부터 해방되다/풀려나다'" }
    ],
    quiz: [
      { question: "「焚き火」의 읽는 법은?", options: ["たきび", "やきび", "ふんか", "たきひ"], answer: "たきび", explanation: "焚き火(たきび)는 장작을 피워 만든 모닥불입니다." },
      { question: "「喧騒」의 뜻은?", options: ["소란스러움", "고요함", "평화", "더위"], answer: "소란스러움", explanation: "喧騒(けんそう)는 시끄럽고 어지러운 도시나 인파의 소음입니다." },
      { question: "「解き放たれる」의 의미는?", options: ["해방되다", "구속되다", "붙잡히다", "잊혀지다"], answer: "해방되다", explanation: "解き放つ(풀어놓다)의 수동형 해방되다." }
    ]
  },
  {
    id: "ld-177",
    title: "ジョギングと朝の空気",
    titleKo: "조깅과 아침 공기",
    category: "취미",
    level: "초급",
    thumbnail: "🏃‍♀️",
    contentJp: [
      { text: "健康", ruby: "けんこう" }, { text: "のために" }, { text: "毎朝", ruby: "まいあさ" }, { text: "30分" }, { text: "ジョギングをしています。" },
      { text: "川沿", ruby: "かわぞ" }, { text: "いの" }, { text: "遊歩道", ruby: "ゆうほどう" }, { text: "を" }, { text: "風", ruby: "かぜ" }, { text: "を" }, { text: "切", ruby: "き" }, { text: "って" }, { text: "走", ruby: "はし" }, { text: "るのが" }, { text: "爽快", ruby: "そうかい" }, { text: "です。" },
      { text: "朝日", ruby: "あさひ" }, { text: "を" }, { text: "浴", ruby: "あ" }, { text: "びながら" }, { text: "汗", ruby: "あせ" }, { text: "を" }, { text: "流", ruby: "なが" }, { text: "すと、" }, { text: "頭", ruby: "あたま" }, { text: "が" }, { text: "スッキリします。" },
      { text: "運動", ruby: "うんどう" }, { text: "した" }, { text: "後", ruby: "あと" }, { text: "の" }, { text: "朝食", ruby: "ちょうしょく" }, { text: "は" }, { text: "格別", ruby: "かくべつ" }, { text: "に" }, { text: "美味", ruby: "おい" }, { text: "しいです。" }
    ],
    contentKo: "건강을 위해 매일 아침 30분 조깅을 하고 있습니다. 강변 산책로를 바람을 가르며 달리는 것이 상쾌합니다. 아침 햇살을 받으며 땀을 흘리면 머리가 맑아집니다. 운동한 후의 아침 식사는 유달리 맛있습니다.",
    vocabulary: [
      { word: "遊歩道", reading: "ゆうほどう", meaning: "산책로" },
      { word: "風を切る", reading: "かぜをきる", meaning: "바람을 가르다" },
      { word: "朝日", reading: "あさひ", meaning: "아침 햇살" },
      { word: "浴びる", reading: "あびる", meaning: "(햇살/물 등을) 쬐다, 뒤집어쓰다" },
      { word: "格別", reading: "かくべつ", meaning: "유달리, 특별히" }
    ],
    grammarPoints: [
      { rule: "〜のために", explanation: "'~를 위해서' 목적이나 이익" },
      { rule: "〜した後の", explanation: "'~한 후의' (과거 관형사형)" }
    ],
    quiz: [
      { question: "「朝日」의 읽는 법은?", options: ["あさひ", "ちょうにち", "あさび", "ちょうひ"], answer: "あさひ", explanation: "朝日(あさひ)는 아침에 뜨는 해, 아침 햇살입니다." },
      { question: "「風を切る」의 뜻은?", options: ["바람을 가르다", "바람을 막다", "바람이 멈추다", "바람을 차다"], answer: "바람을 가르다", explanation: "빠른 속도로 바람을 가르며 질주하는 모습을 비유합니다." },
      { question: "「浴びる」의 한자 읽기는?", options: ["あびる", "あびる", "あびる", "あびる"], answer: "あびる", explanation: "浴(あ)びる는 샤워를 하거나 햇빛 등을 몸 전체로 받음입니다." }
    ]
  },
  {
    id: "ld-178",
    title: "手芸で刺繍ハンカチ作り",
    titleKo: "수예로 자수 손수건 만들기",
    category: "취미",
    level: "중급",
    thumbnail: "🧵",
    contentJp: [
      { text: "静", ruby: "しず" }, { text: "かな" }, { text: "午後の" }, { text: "時間", ruby: "じかん" }, { text: "、" }, { text: "ハンカチに" }, { text: "花", ruby: "はな" }, { text: "の" }, { text: "刺繍", ruby: "ししゅう" }, { text: "を" }, { text: "刺", ruby: "さ" }, { text: "しました。" },
      { text: "カラフルな" }, { text: "刺繍糸", ruby: "ししゅういと" }, { text: "を" }, { text: "選", ruby: "えら" }, { text: "び、" }, { text: "針", ruby: "はり" }, { text: "を" }, { text: "一針一針", ruby: "ひとはりひとはり" }, { text: "丁寧", ruby: "ていねい" }, { text: "に" }, { text: "進", ruby: "すす" }, { text: "めました。" },
      { text: "布", ruby: "ぬの" }, { text: "の上", ruby: "のうえ" }, { text: "に" }, { text: "小", ruby: "ちい" }, { text: "さな" }, { text: "花", ruby: "はな" }, { text: "が" }, { text: "咲", ruby: "さ" }, { text: "いていくような" }, { text: "感覚", ruby: "かんかく" }, { text: "が" }, { text: "楽", ruby: "たの" }, { text: "しいです。" },
      { text: "完成", ruby: "かんせい" }, { text: "した" }, { text: "作品", ruby: "さくひん" }, { text: "は" }, { text: "大切", ruby: "たいせつ" }, { text: "に" }, { text: "使", ruby: "つか" }, { text: "いたいと思います。" }
    ],
    contentKo: "조용한 오후 시간, 손수건에 꽃 자수를 놓았습니다. 알록달록한 자수실을 고르고 바늘을 한 땀 한 땀 정성껏 나아갔습니다. 천 위에 작은 꽃이 피어나는 듯한 감각이 즐겁습니다. 완성된 작품은 소중히 사용하고 싶습니다.",
    vocabulary: [
      { word: "刺繍", reading: "ししゅう", meaning: "자수" },
      { word: "刺す", reading: "さす", meaning: "찌르다, (자수를) 놓다" },
      { word: "一針一針", reading: "ひとはりひとはり", meaning: "한 땀 한 땀" },
      { word: "感覚", reading: "かんかく", meaning: "감각, 느낌" },
      { word: "作品", reading: "さくひん", meaning: "작품" }
    ],
    grammarPoints: [
      { rule: "〜ていくような", explanation: "'~해 가는 듯한'" },
      { rule: "〜大切に使いたい", explanation: "'~소중히 사용하고 싶다'" }
    ],
    quiz: [
      { question: "「刺繍」의 읽는 법은?", options: ["ししゅう", "しすう", "しゅうしゅう", "ちくしゅう"], answer: "ししゅう", explanation: "刺繍(ししゅう)는 실로 수놓는 자수입니다." },
      { question: "「一針一針」의 뜻은?", options: ["한 땀 한 땀", "바늘 한 개", "단숨에", "바느질 없이"], answer: "한 땀 한 땀", explanation: "바느질 바늘을 한 번씩 찌르는 정성스러운 동작입니다." },
      { question: "「刺す」의 한자 읽기는?", options: ["さす", "とす", "かす", "おす"], answer: "さす", explanation: "刺(さ)す는 바늘이나 가시 등으로 찌르거나 자수를 놓다입니다." }
    ]
  },
  {
    id: "ld-179",
    title: "ボードゲームの夜",
    titleKo: "보드게임의 밤",
    category: "취미",
    level: "초급",
    thumbnail: "🎲",
    contentJp: [
      { text: "家", ruby: "いえ" }, { text: "に" }, { text: "友達", ruby: "ともだち" }, { text: "を" }, { text: "招", ruby: "まね" }, { text: "いて" }, { text: "ボードゲーム大会を" }, { text: "開", ruby: "ひら" }, { text: "きました。" },
      { text: "戦略", ruby: "せんりゃく" }, { text: "を" }, { text: "練", ruby: "ね" }, { text: "りながら" }, { text: "サイコロを" }, { text: "振", ruby: "ふ" }, { text: "り、" }, { text: "一喜一憂", ruby: "いっきいちゆう" }, { text: "しました。" },
      { text: "逆転", ruby: "ぎゃくてん" }, { text: "劇", ruby: "げき" }, { text: "が" }, { text: "起", ruby: "お" }, { text: "こるたびに" }, { text: "大笑", ruby: "おおわら" }, { text: "いし、" }, { text: "時間", ruby: "じかん" }, { text: "を" }, { text: "忘", ruby: "わす" }, { text: "れて" }, { text: "盛", ruby: "もり" }, { text: "り" }, { text: "上", ruby: "あ" }, { text: "がりました。" },
      { text: "アナログな" }, { text: "ゲームならではの" }, { text: "温", ruby: "あたた" }, { text: "かい" }, { text: "交流", ruby: "こうりゅう" }, { text: "が" }, { text: "楽", ruby: "たの" }, { text: "しめました。" }
    ],
    contentKo: "집에 친구들을 초대해 보드게임 대회를 열었습니다. 전략을 짜면서 주사위를 던지며 일희일비했습니다. 역전극이 일어날 때마다 크게 웃고, 시간을 잊고 분위기가 달아올랐습니다. 아날로그 게임 특유의 따뜻한 교류를 즐겼습니다.",
    vocabulary: [
      { word: "招く", reading: "まねく", meaning: "초대하다, 부르다" },
      { word: "一喜一憂", reading: "いっきいちゆう", meaning: "일희일비 (기뻐했다 슬퍼함)" },
      { word: "逆転劇", reading: "ぎゃくてんげき", meaning: "역전극" },
      { word: "大笑い", reading: "おおわらい", meaning: "크게 웃음" },
      { word: "交流", reading: "こうりゅう", meaning: "교류" }
    ],
    grammarPoints: [
      { rule: "〜たびに", explanation: "'~할 때마다' (반복적인 조건)" },
      { rule: "〜ならではの", explanation: "'~만의, ~특유의'" }
    ],
    quiz: [
      { question: "「一喜一憂」의 읽는 법은?", options: ["いっきいちゆう", "いちきいちゆう", "いっきいちあい", "いっきいゆう"], answer: "いっきいちゆう", explanation: "一喜一憂(いっきいちゆう)는 전개에 따라 기뻐하고 근심함입니다." },
      { question: "「招く」의 뜻은?", options: ["초대하다", "거절하다", "쫓아내다", "비난하다"], answer: "초대하다", explanation: "招(まね)く는 손님이나 친구를 자신의 장소로 불러오는 것입니다." },
      { question: "「〜たびに」의 해석은?", options: ["~할 때마다", "~하기 위해", "~한 후부터", "~와 상관없이"], answer: "~할 때마다", explanation: "動詞 た形 + たびに = 어떤 사건이 일어날 때마다." }
    ]
  },
  {
    id: "ld-180",
    title: "天体観測と満天の星",
    titleKo: "천체 관측과 밤하늘 가득한 별",
    category: "취미",
    level: "고급",
    thumbnail: "🔭",
    contentJp: [
      { text: "望遠鏡", ruby: "ぼうえんきょう" }, { text: "を" }, { text: "持", ruby: "も" }, { text: "って" }, { text: "光害", ruby: "こうがい" }, { text: "の" }, { text: "少", ruby: "すく" }, { text: "ない" }, { text: "山頂", ruby: "さんちょう" }, { text: "へ" }, { text: "向", ruby: "む" }, { text: "かいました。" },
      { text: "夜空", ruby: "よぞら" }, { text: "を" }, { text: "覗", ruby: "のぞ" }, { text: "くと、" }, { text: "土星", ruby: "どせい" }, { text: "の" }, { text: "環", ruby: "わ" }, { text: "や" }, { text: "木星", ruby: "もくせい" }, { text: "の" }, { text: "縞模様", ruby: "しまもよう" }, { text: "が" }, { text: "くっきりと" }, { text: "見", ruby: "み" }, { text: "えました。" },
      { text: "天の川", ruby: "あまのがわ" }, { text: "が" }, { text: "夜空", ruby: "よぞら" }, { text: "を" }, { text: "横切", ruby: "よこぎ" }, { text: "る" }, { text: "壮大", ruby: "そうだい" }, { text: "な" }, { text: "光景", ruby: "こうけい" }, { text: "に" }, { text: "言葉", ruby: "ことば" }, { text: "を" }, { text: "失", ruby: "うしな" }, { text: "いました。" },
      { text: "宇宙", ruby: "うちゅう" }, { text: "の" }, { text: "神秘", ruby: "しんぴ" }, { text: "に" }, { text: "触", ruby: "ふ" }, { text: "れる" }, { text: "感動的", ruby: "かんどうてき" }, { text: "な" }, { text: "夜", ruby: "よる" }, { text: "でした。" }
    ],
    contentKo: "망원경을 들고 빛 공해가 적은 산꼭대기로 향했습니다. 밤하늘을 들여다보니 토성의 고리와 목성의 줄무늬가 선명하게 보였습니다. 은하수가 밤하늘을 가로지르는 웅장한 광경에 말문이 막혔습니다. 우주의 신비에 접하는 감동적인 밤이었습니다.",
    vocabulary: [
      { word: "望遠鏡", reading: "ぼうえんきょう", meaning: "망원경" },
      { word: "光害", reading: "こうがい", meaning: "광해, 빛 공해" },
      { word: "縞模様", reading: "しまもよう", meaning: "줄무늬" },
      { word: "天の川", reading: "あまのがわ", meaning: "은하수" },
      { word: "言葉を失う", reading: "ことばをうしなう", meaning: "말문을 잃다, 넋을 잃다" }
    ],
    grammarPoints: [
      { rule: "〜を横切る", explanation: "'~를 가로지르다'" },
      { rule: "〜に触れる", explanation: "'~에 접하다/닿다'" }
    ],
    quiz: [
      { question: "「天の川」의 읽는 법은?", options: ["あまのがわ", "てんのかわ", "あまのしか", "てんのせん"], answer: "あまのがわ", explanation: "天の川(あまのがわ)는 은하수를 뜻합니다." },
      { question: "「言葉を失う」의 비유적 의미는?", options: ["너무 감동하거나 놀라 말을 잃다", "말을 못 하게 병들다", "외국어를 잊다", "거짓말을 하다"], answer: "너무 감동하거나 놀라 말을 잃다", explanation: "너무 장엄하거나 충격적이어서 말을 이어가지 못하는 상태입니다." },
      { question: "「壮大」의 한자 읽기는?", options: ["そうだい", "しょうだい", "そうたの", "そたい"], answer: "そうだい", explanation: "壮大(そうだい)는 스케일이 크고 웅장함입니다." }
    ]
  }
];
