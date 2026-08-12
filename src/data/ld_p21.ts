import type { LearningDiary } from "@/types/learningDiary";

export const part21: LearningDiary[] = [
  {
    id: "ld-201",
    title: "朝の散歩とラジオ体操",
    titleKo: "아침 산책과 라디오 체조",
    category: "일상",
    level: "초급",
    thumbnail: "🌅",
    contentJp: [
      { text: "毎朝", ruby: "まいあさ" }, { text: "6時", ruby: "ろくじ" }, { text: "に" }, { text: "起", ruby: "お" }, { text: "きて" }, { text: "近所", ruby: "きんじょ" }, { text: "の" }, { text: "公園", ruby: "こうえん" }, { text: "を" }, { text: "散歩", ruby: "さんぽ" }, { text: "します。" },
      { text: "公園", ruby: "こうえん" }, { text: "では" }, { text: "地域", ruby: "ちいき" }, { text: "の" }, { text: "人々", ruby: "ひとびと" }, { text: "が" }, { text: "集", ruby: "あつ" }, { text: "まって" }, { text: "ラジオ体操", ruby: "たいそう" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "っています。" },
      { text: "朝日", ruby: "あさひ" }, { text: "を" }, { text: "浴", ruby: "あび" }, { text: "ながら" }, { text: "身体", ruby: "からだ" }, { text: "を" }, { text: "動", ruby: "うご" }, { text: "かすと、" }, { text: "一日", ruby: "いちにち" }, { text: "を" }, { text: "爽", ruby: "さわ" }, { text: "やかに" }, { text: "始", ruby: "はじ" }, { text: "められます。" },
      { text: "健康的", ruby: "けんこうてき" }, { text: "な" }, { text: "習慣", ruby: "しゅうかん" }, { text: "を" }, { text: "今後", ruby: "こんご" }, { text: "も" }, { text: "続", ruby: "つづ" }, { text: "けたいです。" }
    ],
    contentKo: "매일 아침 6시에 일어나 동네 공원을 산책합니다. 공원에서는 지역 사람들이 모여 라디오 체조를 하고 있습니다. 아침 햇살을 받으며 몸을 움직이면 하루를 상쾌하게 시작할 수 있습니다. 건강한 습관을 앞으로도 계속하고 싶습니다.",
    vocabulary: [
      { word: "近所", reading: "きんじょ", meaning: "이웃, 동네" },
      { word: "ラジオ体操", reading: "ラジオたいそう", meaning: "라디오 체조" },
      { word: "朝日", reading: "あさひ", meaning: "아침 햇살, 아침 해" },
      { word: "爽やか", reading: "さわやか", meaning: "상쾌함, 시원함" },
      { word: "習慣", reading: "しゅうかん", meaning: "습관" }
    ],
    grammarPoints: [
      { rule: "〜ながら", explanation: "'~하면서' (동시 동작)" },
      { rule: "〜続けたい", explanation: "'~계속하고 싶다' (희망)" }
    ],
    quiz: [
      { question: "「近所」의 읽는 법은?", options: ["きんじょ", "きんしょ", "ちかしょ", "ちかじょ"], answer: "きんじょ", explanation: "近所(きんじょ)는 자기가 사는 곳에서 가까운 근처나 이웃입니다." },
      { question: "「爽やか」의 뜻은?", options: ["상쾌함", "답답함", "피곤함", "어두움"], answer: "상쾌함", explanation: "爽やか(さわやか)는 기분이 맑고 상쾌한 느낌입니다." },
      { question: "「〜ながら」의 문법적 의미는?", options: ["동시 동작 (~하면서)", "이유 (~ 때문에)", "조건 (~ 하면)", "반대 (~ 하지만)"], answer: "동시 동작 (~하면서)", explanation: "동사 마스형 + ながら는 두 동작을 동시에 함을 뜻합니다." }
    ]
  },
  {
    id: "ld-202",
    title: "ゴミの分別とリサイクル",
    titleKo: "쓰레기 분리배출과 리사이클",
    category: "일상",
    level: "초급",
    thumbnail: "♻️",
    contentJp: [
      { text: "日本", ruby: "にほん" }, { text: "の" }, { text: "生活", ruby: "せいかつ" }, { text: "では" }, { text: "ゴミの" }, { text: "分別", ruby: "ぶんべつ" }, { text: "が" }, { text: "とても" }, { text: "細", ruby: "こま" }, { text: "かく" }, { text: "決", ruby: "き" }, { text: "められています。" },
      { text: "可燃", ruby: "かねん" }, { text: "ゴミ、" }, { text: "不燃", ruby: "ふねん" }, { text: "ゴミ、" }, { text: "ペットボトルや" }, { text: "缶", ruby: "かん" }, { text: "などを" }, { text: "曜日", ruby: "ようび" }, { text: "ごとに" }, { text: "分", ruby: "わ" }, { text: "けて" }, { text: "出", ruby: "だ" }, { text: "します。" },
      { text: "慣", ruby: "な" }, { text: "れるまでは" }, { text: "大変", ruby: "たいへん" }, { text: "でしたが、" }, { text: "環境", ruby: "かんきょう" }, { text: "を" }, { text: "守", ruby: "まも" }, { text: "るために" }, { text: "大切", ruby: "たいせつ" }, { text: "なことです。" },
      { text: "リサイクルへの" }, { text: "意識", ruby: "いしき" }, { text: "が" }, { text: "高", ruby: "たか" }, { text: "まりました。" }
    ],
    contentKo: "일본 생활에서는 쓰레기 분리배출이 매우 세세하게 정해져 있습니다. 가연성 쓰레기, 불연성 쓰레기, 페트병이나 캔 등을 요일별로 나누어 배출합니다. 익숙해질 때까지는 힘들었지만 환경을 지키기 위해 중요한 일입니다. 리사이클에 대한 의식이 높아졌습니다.",
    vocabulary: [
      { word: "分別", reading: "ぶんべつ", meaning: "분리배출, 분별" },
      { word: "可燃", reading: "かねん", meaning: "가연성 (타는 쓰레기)" },
      { word: "不燃", reading: "ふねん", meaning: "불연성 (안 타는 쓰레기)" },
      { word: "慣れる", reading: "なれる", meaning: "익숙해지다" },
      { word: "環境", reading: "かんきょう", meaning: "환경" }
    ],
    grammarPoints: [
      { rule: "〜ごとに", explanation: "'~마다/별로' (단위 반복)" },
      { rule: "〜慣れるまで", explanation: "'~익숙해질 때까지'" }
    ],
    quiz: [
      { question: "「分別」의 읽는 법은?", options: ["ぶんべつ", "ぶんわけ", "ふんべつ", "ふんわけ"], answer: "ぶんべつ", explanation: "ゴミの分別(ぶんべつ)는 종류별 분리수거를 뜻합니다." },
      { question: "「可燃」의 뜻은?", options: ["타는 쓰레기(가연성)", "안 타는 쓰레기", "대형 쓰레기", "음식물 쓰레기"], answer: "타는 쓰레기(가연성)", explanation: "可燃(かねん)은 불에 타는 성질입니다." },
      { question: "「慣れる」의 한자 읽기는?", options: ["なれる", "慣れる", "なれる", "慣れる"], answer: "なれる", explanation: "慣(な)れる는 익숙해지다, 적응하다의 뜻입니다." }
    ]
  },
  {
    id: "ld-203",
    title: "宅配便の受け取りと再配達",
    titleKo: "택배 수령과 재배달",
    category: "일상",
    level: "중급",
    thumbnail: "📦",
    contentJp: [
      { text: "ネットで" }, { text: "注文", ruby: "ちゅうもん" }, { text: "した" }, { text: "商品", ruby: "しょうひん" }, { text: "が" }, { text: "届", ruby: "とど" }, { text: "く" }, { text: "予定", ruby: "よてい" }, { text: "でしたが、" }, { text: "不在", ruby: "ふざい" }, { text: "にしてしまいました。" },
      { text: "郵便受けに" }, { text: "不在票", ruby: "ふざいひょう" }, { text: "が入っていたので、" }, { text: "スマホで" }, { text: "再配達", ruby: "さいはいたつ" }, { text: "の" }, { text: "依頼", ruby: "いらい" }, { text: "をしました。" },
      { text: "時間帯", ruby: "じかんたい" }, { text: "を" }, { text: "指定", ruby: "してい" }, { text: "できるので、" }, { text: "無事", ruby: "ぶじ" }, { text: "に" }, { text: "荷物", ruby: "にもつ" }, { text: "を" }, { text: "受", ruby: "う" }, { text: "け" }, { text: "取", ruby: "と" }, { text: "ることができました。" },
      { text: "日本", ruby: "にほん" }, { text: "の" }, { text: "宅配", ruby: "たくはい" }, { text: "サービスは" }, { text: "正確", ruby: "せいかく" }, { text: "で" }, { text: "便利", ruby: "べんり" }, { text: "です。" }
    ],
    contentKo: "인터넷으로 주문한 상품이 도착할 예정이었지만 부재중이었습니다. 우편함에 부재표가 들어있어서 스마트폰으로 재배달 신청을 했습니다. 시간대를 지정할 수 있어서 무사히 짐을 수령할 수 있었습니다. 일본의 택배 서비스는 정확하고 편리합니다.",
    vocabulary: [
      { word: "不在票", reading: "ふざいひょう", meaning: "부재표 (부재중 방문 안내문)" },
      { word: "再配達", reading: "さいはいたつ", meaning: "재배달" },
      { word: "依頼", reading: "いらい", meaning: "의뢰, 신청" },
      { word: "時間帯", reading: "じかんたい", meaning: "시간대" },
      { word: "無事に", reading: "ぶじに", meaning: "무사히" }
    ],
    grammarPoints: [
      { rule: "〜にしてしまった", explanation: "'~해 버렸다' (유감/실수)" },
      { rule: "〜ことができる", explanation: "'~할 수 있다' (가능)" }
    ],
    quiz: [
      { question: "「不在票」의 읽는 법은?", options: ["ふざいひょう", "ふざいしょう", "ふざいけん", "ふざいかみ"], answer: "ふざいひょう", explanation: "不在票(ふざいひょう)는 부재 시 택배기사가 남기는 메모입니다." },
      { question: "「再配達」의 뜻은?", options: ["재배달", "반품", "취소", "방문 접수"], answer: "재배달", explanation: "再配達(さいはいたつ)는 다시 배달하는 것입니다." },
      { question: "「無事に」의 한자 읽기는?", options: ["ぶじに", "むじに", "ぶしに", "むしに"], answer: "ぶじに", explanation: "無事(ぶじ)に는 탈 없이 무사히를 뜻합니다." }
    ]
  },
  {
    id: "ld-204",
    title: "コインランドリーの利用",
    titleKo: "코인 세탁소 이용",
    category: "일상",
    level: "초급",
    thumbnail: "🧺",
    contentJp: [
      { text: "雨", ruby: "あめ" }, { text: "が" }, { text: "続", ruby: "つづ" }, { text: "いて" }, { text: "洗濯物", ruby: "せんたくもの" }, { text: "が" }, { text: "乾", ruby: "かわ" }, { text: "かないので、" }, { text: "コインランドリーへ" }, { text: "行", ruby: "い" }, { text: "きました。" },
      { text: "大容量", ruby: "だいようりょう" }, { text: "の" }, { text: "乾燥機", ruby: "かんそうき" }, { text: "を" }, { text: "使", ruby: "つか" }, { text: "うと、" }, { text: "短時間", ruby: "たんじかん" }, { text: "で" }, { text: "ふわふわに" }, { text: "仕上", ruby: "あ" }, { text: "がります。" },
      { text: "待", ruby: "ま" }, { text: "っている" }, { text: "間", ruby: "あいだ" }, { text: "は" }, { text: "読書", ruby: "どくしょ" }, { text: "をして" }, { text: "有意義", ruby: "ゆういぎ" }, { text: "に" }, { text: "過", ruby: "す" }, { text: "ごしました。" },
      { text: "雨", ruby: "あめ" }, { text: "の" }, { text: "日", ruby: "ひ" }, { text: "の" }, { text: "頼", ruby: "たよ" }, { text: "れる" }, { text: "味方", ruby: "みかた" }, { text: "です。" }
    ],
    contentKo: "비가 계속되어 빨랫감이 마르지 않아 코인 세탁소에 갔습니다. 대용량 건조기를 사용하니 짧은 시간에 푹신푹신하게 완성됩니다. 기다리는 동안은 독서를 하며 유의미하게 보냈습니다. 비 오는 날의 든든한 아군입니다.",
    vocabulary: [
      { word: "洗濯物", reading: "せんたくもの", meaning: "빨랫감" },
      { word: "乾く", reading: "かわく", meaning: "마르다" },
      { word: "乾燥機", reading: "かんそうき", meaning: "건조기" },
      { word: "ふわふわ", reading: "ふわふわ", meaning: "폭신폭신, 푹신푹신" },
      { word: "味方", reading: "みかた", meaning: "아군, 편" }
    ],
    grammarPoints: [
      { rule: "〜と、〜上がる", explanation: "'~하면 ~되다/완성되다'" },
      { rule: "〜ている間は", explanation: "'~하는 동안은'" }
    ],
    quiz: [
      { question: "「洗濯物」의 읽는 법은?", options: ["せんたくもの", "せんたくぶつ", "せんたくひん", "せんたくぶつ"], answer: "せんたくもの", explanation: "洗濯物(せんたくもの)는 빨래할 거리나 빤 옷가지입니다." },
      { question: "「乾燥機」의 뜻은?", options: ["건조기", "세탁기", "제습기", "청소기"], answer: "건조기", explanation: "乾燥機(かんそうき)는 옷 등을 말리는 기계입니다." },
      { question: "「味方」의 한자 읽기는?", options: ["みかた", "あじかた", "みほう", "あじほう"], answer: "みかた", explanation: "味方(みかた)는 자신의 편이나 의지가 되는 대상입니다." }
    ]
  },
  {
    id: "ld-205",
    title: "図書館での読書タイム",
    titleKo: "도서관에서의 독서 타임",
    category: "일상",
    level: "중급",
    thumbnail: "📚",
    contentJp: [
      { text: "休", ruby: "やす" }, { text: "みの" }, { text: "日", ruby: "ひ" }, { text: "に" }, { text: "市立", ruby: "しりつ" }, { text: "図書館", ruby: "としょかん" }, { text: "へ" }, { text: "出", ruby: "で" }, { text: "かけました。" },
      { text: "静", ruby: "しず" }, { text: "かな" }, { text: "閲覧室", ruby: "えつらんしつ" }, { text: "で" }, { text: "気", ruby: "き" }, { text: "になっていた" }, { text: "小説", ruby: "しょうせつ" }, { text: "を" }, { text: "読", ruby: "よ" }, { text: "みました。" },
      { text: "図書", ruby: "としょ" }, { text: "カードを" }, { text: "使", ruby: "つか" }, { text: "って" }, { text: "3冊", ruby: "さんさつ" }, { text: "本", ruby: "ほん" }, { text: "を" }, { text: "借", ruby: "か" }, { text: "りました。" },
      { text: "静寂", ruby: "せいじゃく" }, { text: "の" }, { text: "中", ruby: "なか" }, { text: "で" }, { text: "集中", ruby: "しゅうちょう" }, { text: "して" }, { text: "本", ruby: "ほん" }, { text: "と" }, { text: "向", ruby: "む" }, { text: "き" }, { text: "合", ruby: "あ" }, { text: "う" }, { text: "時間", ruby: "じかん" }, { text: "は" }, { text: "贅沢", ruby: "ぜいたく" }, { text: "です。" }
    ],
    contentKo: "쉬는 날에 시립 도서관으로 나갔습니다. 조용한 열람실에서 관심 있던 소설을 읽었습니다. 도서 카드를 사용해 책 3권을 빌렸습니다. 정적 속에서 집중하여 책과 마주하는 시간은 사치입니다.",
    vocabulary: [
      { word: "閲覧室", reading: "えつらんしつ", meaning: "열람실" },
      { word: "小説", reading: "しょうせつ", meaning: "소설" },
      { word: "貸し出す", reading: "かしだす", meaning: "대출하다" },
      { word: "静寂", reading: "せいじゃく", meaning: "정적, 조용함" },
      { word: "贅沢", reading: "ぜいたく", meaning: "사치, 호사" }
    ],
    grammarPoints: [
      { rule: "〜気になっていた", explanation: "'~마음에 두고 있던/궁금했던'" },
      { rule: "〜本と向き合う", explanation: "'~책과 마주하다'" }
    ],
    quiz: [
      { question: "「閲覧室」의 읽는 법은?", options: ["えつらんしつ", "かんらんしつ", "えつらんへや", "かんらんへや"], answer: "えつらんしつ", explanation: "閲覧室(えつらんしつ)는 도서관에서 책을 읽는 방입니다." },
      { question: "「贅沢」의 뜻은?", options: ["사치/호사", "절약", "가난", "낭비"], answer: "사치/호사", explanation: "贅沢(ぜいたく)는 값지거나 분수에 넘치게 누리는 훌륭함입니다." },
      { question: "「小説」의 한자 읽기는?", options: ["しょうせつ", "こせつ", "しょうたん", "しょうなし"], answer: "しょうせつ", explanation: "小説(しょうせつ)는 이야기 소설을 의미합니다." }
    ]
  },
  {
    id: "ld-206",
    title: "公共交通機関のマナー",
    titleKo: "대중교통 매너",
    category: "일상",
    level: "중급",
    thumbnail: "電車",
    contentJp: [
      { text: "電車", ruby: "でんしゃ" }, { text: "や" }, { text: "バスを" }, { text: "利用", ruby: "りよう" }, { text: "する" }, { text: "際", ruby: "さい" }, { text: "は、" }, { text: "マナーを" }, { text: "守", ruby: "まも" }, { text: "ることが" }, { text: "求", ruby: "もと" }, { text: "められます。" },
      { text: "車内", ruby: "しゃない" }, { text: "では" }, { text: "携帯", ruby: "けいたい" }, { text: "電話", ruby: "でんわ" }, { text: "を" }, { text: "マナーモードに" }, { text: "設定", ruby: "せってい" }, { text: "し、" }, { text: "通話", ruby: "つうわ" }, { text: "は" }, { text: "控", ruby: "ひか" }, { text: "えます。" },
      { text: "優先席", ruby: "ゆうせんせき" }, { text: "は" }, { text: "必要", ruby: "ひつよう" }, { text: "な" }, { text: "方", ruby: "かた" }, { text: "に" }, { text: "譲", ruby: "ゆず" }, { text: "り、" }, { text: "静", ruby: "しず" }, { text: "かな" }, { text: "環境", ruby: "かんきょう" }, { text: "を" }, { text: "保", ruby: "たも" }, { text: "ちます。" },
      { text: "お互い", ruby: "おたがい" }, { text: "の" }, { text: "配慮", ruby: "はいりょ" }, { text: "で" }, { text: "快適", ruby: "かいてき" }, { text: "な" }, { text: "移動", ruby: "いどう" }, { text: "が" }, { text: "実現", ruby: "じつげん" }, { text: "します。" }
    ],
    contentKo: "전철이나 버스를 이용할 때는 매너를 지키는 것이 요구됩니다. 차내에서는 휴대폰을 매너 모드로 설정하고 통화는 삼갑니다. 노약자석은 필요한 분께 양보하고 조용한 환경을 유지합니다. 서로의 배려로 쾌적한 이동이 실현됩니다.",
    vocabulary: [
      { word: "車内", reading: "しゃない", meaning: "차내, 전철/버스 안" },
      { word: "控える", reading: "ひかえる", meaning: "삼가다, 자제하다" },
      { word: "優先席", reading: "ゆうせんせき", meaning: "노약자석, 우선석" },
      { word: "譲る", reading: "ゆずる", meaning: "양보하다" },
      { word: "配慮", reading: "はいりょ", meaning: "배려" }
    ],
    grammarPoints: [
      { rule: "〜する際は", explanation: "'~할 때에는/격식있는 표현'" },
      { rule: "〜が求められる", explanation: "수동형 '~가 요구되다'" }
    ],
    quiz: [
      { question: "「控える」의 읽는 법은?", options: ["ひかえる", "こかえる", "おさえる", "つかえる"], answer: "ひかえる", explanation: "控(ひか)える는 어떤 행동을 삼가고 자제하는 것입니다." },
      { question: "「優先席」의 뜻은?", options: ["노약자석/우선석", "지정석", "자유석", "운전석"], answer: "노약자석/우선석", explanation: "優先席(ゆうせんせき)는 교통약자를 위한 자리입니다." },
      { question: "「譲る」의 한자 읽기는?", options: ["ゆずる", "ゆずる", "ゆずる", "ゆずる"], answer: "ゆずる", explanation: "譲(ゆず)る는 남에게 양보하다라는 뜻입니다." }
    ]
  },
  {
    id: "ld-207",
    title: "近所のスーパーのお得情報",
    titleKo: "동네 슈퍼의 알뜰 정보",
    category: "일상",
    level: "초급",
    thumbnail: "🛒",
    contentJp: [
      { text: "近所", ruby: "きんじょ" }, { text: "の" }, { text: "スーパーマーケットでは" }, { text: "毎週", ruby: "まいしゅう" }, { text: "火曜日", ruby: "かようび" }, { text: "に" }, { text: "特売", ruby: "とくばい" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "っています。" },
      { text: "野菜", ruby: "やさい" }, { text: "や" }, { text: "肉", ruby: "にく" }, { text: "が" }, { text: "通常", ruby: "つうじょう" }, { text: "より" }, { text: "安", ruby: "やす" }, { text: "く" }, { text: "買", ruby: "か" }, { text: "えるので、" }, { text: "まとめ買", ruby: "が" }, { text: "いをします。" },
      { text: "ポイントカードの" }, { text: "ポイントも" }, { text: "2倍", ruby: "にばい" }, { text: "になるので" }, { text: "非常", ruby: "ひじょう" }, { text: "に" }, { text: "お得", ruby: "とく" }, { text: "です。" },
      { text: "賢", ruby: "かしこ" }, { text: "く" }, { text: "買い物", ruby: "かいもの" }, { text: "をして" }, { text: "家計", ruby: "かけい" }, { text: "を" }, { text: "節約", ruby: "せつやく" }, { text: "しています。" }
    ],
    contentKo: "동네 슈퍼마켓에서는 매주 화요일에 특가를 진행합니다. 야채나 고기를 평소보다 저렴하게 살 수 있어 대량 구매를 합니다. 포인트 카드의 포인트도 2배가 되므로 매우 이득입니다. 현명하게 쇼핑하여 가계를 절약하고 있습니다.",
    vocabulary: [
      { word: "特売", reading: "とくばい", meaning: "특가 판매" },
      { word: "まとめ買い", reading: "まとめがい", meaning: "대량 구매, 묶음 구매" },
      { word: "お得", reading: "おとく", meaning: "이득, 이로움" },
      { word: "賢い", reading: "かしこい", meaning: "현명하다, 영리하다" },
      { word: "節約", reading: "せつやく", meaning: "절약" }
    ],
    grammarPoints: [
      { rule: "〜通常より安く", explanation: "'~평소보다 저렴하게'" },
      { rule: "〜非常に〜です", explanation: "'매우 ~입니다'" }
    ],
    quiz: [
      { question: "「特売」의 읽는 법은?", options: ["とくばい", "とくうり", "とくばい", "とくうり"], answer: "とくばい", explanation: "特売(とくばい)는 특별 할인가 판매입니다." },
      { question: "「お得」의 뜻은?", options: ["이득/알뜰함", "손해", "비쌈", "무료"], answer: "이득/알뜰함", explanation: "お得(おとく)는 조건이 좋아 경제적으로 이로움입니다." },
      { question: "「節約」의 한자 읽기는?", options: ["せつやく", "せちやく", "せつじょう", "せちじょう"], answer: "せつやく", explanation: "節約(せつやく)는 아껴서 절약하는 것입니다." }
    ]
  },
  {
    id: "ld-208",
    title: "大掃除と断捨離",
    titleKo: "대청소와 단샤리(비우기)",
    category: "일상",
    level: "중급",
    thumbnail: "🧹",
    contentJp: [
      { text: "週末", ruby: "しゅうまつ" }, { text: "に" }, { text: "部屋", ruby: "へや" }, { text: "の" }, { text: "大掃除", ruby: "おおそうじ" }, { text: "と" }, { text: "断捨離", ruby: "だんしゃり" }, { text: "を" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "使", ruby: "つか" }, { text: "わなくなった" }, { text: "服", ruby: "ふく" }, { text: "や" }, { text: "本", ruby: "ほん" }, { text: "を" }, { text: "整理", ruby: "せいり" }, { text: "し、" }, { text: "思い切って" }, { text: "処分", ruby: "しょぶん" }, { text: "しました。" },
      { text: "不要", ruby: "ふよう" }, { text: "なものを" }, { text: "手放", ruby: "てばな" }, { text: "すと、" }, { text: "部屋", ruby: "へや" }, { text: "が" }, { text: "広", ruby: "ひろ" }, { text: "くなり" }, { text: "心", ruby: "こころ" }, { text: "も" }, { text: "スッキリします。" },
      { text: "必要", ruby: "ひつよう" }, { text: "なものだけに" }, { text: "囲", ruby: "かこ" }, { text: "まれた" }, { text: "シンプルライフを" }, { text: "目指", ruby: "めざ" }, { text: "します。" }
    ],
    contentKo: "주말에 방 대청소와 단샤리(물건 비우기)를 실시했습니다. 사용하지 않게 된 옷이나 책을 정리하고 과감히 처분했습니다. 불필요한 것을 손에서 놓으니 방이 넓어지고 마음도 개운해집니다. 필요한 것만 둘러싸인 심플 라이프를 목표로 합니다.",
    vocabulary: [
      { word: "断捨離", reading: "だんしゃり", meaning: "단샤리 (필요 없는 물건 버리기)" },
      { word: "思い切って", reading: "おもいきって", meaning: "과감하게, 마음 굳게 먹고" },
      { word: "処分", reading: "しょぶん", meaning: "처분" },
      { word: "手放す", reading: "てばなす", meaning: "손에서 놓다, 처분하다" },
      { word: "スッキリ", reading: "スッキリ", meaning: "개운함, 산뜻함" }
    ],
    grammarPoints: [
      { rule: "〜使わなくなった", explanation: "'~사용하지 않게 된' (상태 변화)" },
      { rule: "〜手放すと、〜くなる", explanation: "'~놓으면 ~해지다'" }
    ],
    quiz: [
      { question: "「断捨離」의 읽는 법은?", options: ["だんしゃり", "たんしゃり", "だんしゃり", "たんしゃり"], answer: "だんしゃり", explanation: "断捨離(だんしゃり)는 필요 없는 물건을 버리고 마음을 비우는 행위입니다." },
      { question: "「思い切って」의 뜻은?", options: ["과감하게", "망설이며", "천천히", "마지못해"], answer: "과감하게", explanation: "思い切(おもいき)って는 결단력 있게 과감히 실행하는 모양입니다." },
      { question: "「手放す」의 한자 읽기는?", options: ["てばなす", "てはなす", "しゅほうす", "しゅはなす"], answer: "てばなす", explanation: "手(て)放(ばな)す는 소유했던 것을 놓아주거나 버리는 것입니다." }
    ]
  },
  {
    id: "ld-209",
    title: "市役所での手続き",
    titleKo: "시청에서의 행정 절차",
    category: "일상",
    level: "고급",
    thumbnail: "🏛️",
    contentJp: [
      { text: "引っ越しに伴い、" }, { text: "市役所", ruby: "しやくしょ" }, { text: "で" }, { text: "住民票", ruby: "じゅうみんひょう" }, { text: "の" }, { text: "移動", ruby: "いどう" }, { text: "手続きを" }, { text: "行", ruby: "おこな" }, { text: "いました。" },
      { text: "窓口", ruby: "まどぐち" }, { text: "の" }, { text: "職員", ruby: "しょくいん" }, { text: "が" }, { text: "丁寧", ruby: "ていねい" }, { text: "に" }, { text: "案内", ruby: "あんない" }, { text: "してくれ、" }, { text: "書類", ruby: "しょるい" }, { text: "の" }, { text: "記入", ruby: "きにゅう" }, { text: "も" }, { text: "スムーズに" }, { text: "進", ruby: "すす" }, { text: "みました。" },
      { text: "マイナンバーカードを" }, { text: "更新", ruby: "こうしん" }, { text: "し、" }, { text: "新", ruby: "あたら" }, { text: "しい" }, { text: "住所", ruby: "じゅうしょ" }, { text: "が" }, { text: "記載", ruby: "きさい" }, { text: "されました。" },
      { text: "公的", ruby: "こうてき" }, { text: "な" }, { text: "手続きが" }, { text: "終", ruby: "お" }, { text: "わり" }, { text: "一安心", ruby: "ひとあんしん" }, { text: "しました。" }
    ],
    contentKo: "이사함에 따라 시청에서 주민표 이동 절차를 진행했습니다. 창구의 직원분이 친절하게 안내해 주어 서류 작성도 원활하게 진행되었습니다. 마이넘버 카드를 갱신하고 새 주소가 기재되었습니다. 공적인 절차가 끝나 한시름 놓았습니다.",
    vocabulary: [
      { word: "住民票", reading: "じゅうみんひょう", meaning: "주민표 (주민등록등본)" },
      { word: "窓口", reading: "まどぐち", meaning: "창구" },
      { word: "記入", reading: "きにゅう", meaning: "기입, 작성" },
      { word: "記載", reading: "きさい", meaning: "기재" },
      { word: "一安心", reading: "ひとあんしん", meaning: "한시름 놓음, 안심함" }
    ],
    grammarPoints: [
      { rule: "〜に伴い", explanation: "'~에 따라/~함에 따라' (공식적 연동)" },
      { rule: "〜てくれ", explanation: "'~해 주어' (남이 나에게 베풂)" }
    ],
    quiz: [
      { question: "「住民票」의 읽는 법은?", options: ["じゅうみんひょう", "じゅうみんしょう", "じゅうみんけん", "じゅうみんかみ"], answer: "じゅうみんひょう", explanation: "住民票(じゅうみんひょう)는 주소를 증명하는 주민등록 서류입니다." },
      { question: "「一安心」의 뜻은?", options: ["한시름 놓음", "불안함", "걱정이 더해짐", "대경실색"], answer: "한시름 놓음", explanation: "一安心(ひとあんしん)는 일단 안심하는 상태입니다." },
      { question: "「〜に伴い」의 뜻은?", options: ["~에 따라", "~에 반하여", "~와 무관하게", "~를 피하여"], answer: "~에 따라", explanation: "伴い(ともない)는 변화에 수반함을 나타냅니다." }
    ]
  },
  {
    id: "ld-210",
    title: "近隣住民との挨拶",
    titleKo: "이웃 주민과의 인사",
    category: "일상",
    level: "초급",
    thumbnail: "🤝",
    contentJp: [
      { text: "マンションの" }, { text: "廊下", ruby: "ろうか" }, { text: "や" }, { text: "エレベーターで" }, { text: "住人", ruby: "じゅうにん" }, { text: "に" }, { text: "会", ruby: "あ" }, { text: "ったら「こんにちは」と" }, { text: "挨拶", ruby: "あいさつ" }, { text: "します。" },
      { text: "小", ruby: "ちい" }, { text: "さな" }, { text: "一声", ruby: "ひとこえ" }, { text: "ですが、" }, { text: "良", ruby: "よ" }, { text: "い" }, { text: "人間関係", ruby: "にんげんかんけい" }, { text: "を" }, { text: "築", ruby: "きず" }, { text: "く" }, { text: "第一歩", ruby: "だいいっぽ" }, { text: "です。" },
      { text: "笑顔", ruby: "えがお" }, { text: "で" }, { text: "挨拶", ruby: "あいさつ" }, { text: "を" }, { text: "返", ruby: "かえ" }, { text: "してもらえると" }, { text: "温", ruby: "あたた" }, { text: "かい" }, { text: "気持", ruby: "きも" }, { text: "ちになります。" },
      { text: "地域", ruby: "ちいき" }, { text: "コミュニティを" }, { text: "大切", ruby: "たいせつ" }, { text: "にしたいです。" }
    ],
    contentKo: "맨션 복도나 엘리베이터에서 주민과 만나면 '안녕하세요'라고 인사합니다. 작은 한 마디지만 좋은 인간관계를 구축하는 첫걸음입니다. 미소로 인사를 되돌려 받으면 따뜻한 기분이 됩니다. 지역 커뮤니티를 중요하게 여기고 싶습니다.",
    vocabulary: [
      { word: "廊下", reading: "ろうか", meaning: "복도" },
      { word: "一声", reading: "ひとこえ", meaning: "한 마디 (말)" },
      { word: "築く", reading: "きずく", meaning: "쌓다, 구축하다" },
      { word: "第一歩", reading: "だいいっぽ", meaning: "첫걸음" },
      { word: "返してもらう", reading: "かえしてもらう", meaning: "되돌려 받다" }
    ],
    grammarPoints: [
      { rule: "〜たら「〜」と挨拶する", explanation: "'~하면 \"~\"라고 인사하다'" },
      { rule: "〜てもらえると", explanation: "'~받을 수 있으면' (수혜)" }
    ],
    quiz: [
      { question: "「廊下」의 읽는 법은?", options: ["ろうか", "ろうげ", "かくか", "かくげ"], answer: "ろうか", explanation: "廊下(ろうか)는 건물 안의 통로, 복도입니다." },
      { question: "「築く」의 뜻은?", options: ["구축하다/쌓다", "무너뜨리다", "피하다", "빌리다"], answer: "구축하다/쌓다", explanation: "築(きず)く는 관계나 인프라를 차곡차곡 쌓아 만드는 것입니다." },
      { question: "「第一歩」의 한자 읽기는?", options: ["だいいっぽ", "だいいちふ", "だいいちほ", "だいいっほ"], answer: "だいいっぽ", explanation: "第一歩(だいいっぽ)는 일의 시작이나 첫 발걸음입니다." }
    ]
  }
];
