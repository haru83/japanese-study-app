// prisma/seed-ai-community.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const AI_PERSONAS = [
  // 1~10
  {
    email: "bot_minji@wangwang.app",
    name: "minji",
    character: "shiba",
    level: 3,
    xp: 450,
    streakDays: 8,
    equippedItems: ["flower-crown"],
    diaries: [
      {
        title: "今日のカフェで日本語の勉強 ☕",
        content: "今日は仕事の後に近くのカフェで日本語を勉強しました。敬語の練習が少し難しかったですが、毎日コツコツ頑張ります！",
        mood: "productive",
      },
      {
        title: "大好きな抹茶ラテ 🍵",
        content: "最近日本の抹茶にはまっています。甘くてとても美味しいです。いつか京都の有名な抹茶カフェに行きたいです！",
        mood: "happy",
      },
    ],
  },
  {
    email: "bot_tokyo_dream@wangwang.app",
    name: "도쿄드리머",
    character: "poodle",
    level: 4,
    xp: 820,
    streakDays: 15,
    equippedItems: ["hat-cap"],
    diaries: [
      {
        title: "ワーキングホリデーの準備 ✈️",
        content: "来年のワーホリに向けて毎日日記を書いています。最初は短文しか書けなかったけど、だんだん慣れてきました。みんなで頑張りましょう！",
        mood: "excited",
      },
      {
        title: "日本の電車の乗り方 🚃",
        content: "東京の地下鉄は路線が多くて迷いやすいですね。でも乗り換えアプリを使えば便利です！",
        mood: "calm",
      },
    ],
  },
  {
    email: "bot_ramen_lover@wangwang.app",
    name: "ramenboy",
    character: "beagle",
    level: 2,
    xp: 280,
    streakDays: 4,
    equippedItems: ["hachimaki"],
    diaries: [
      {
        title: "豚骨ラーメンを食べました 🍜",
        content: "今日はお昼に濃厚な豚骨ラーメンを食べました。「麺硬め」で注文しました！とても美味しかったです。",
        mood: "happy",
      },
      {
        title: "居酒屋のメニューを読みたい 🍶",
        content: "日本の居酒屋のメニューは手書きが多くて難しいです。漢字をたくさん覚えたいです！",
        mood: "thinking",
      },
    ],
  },
  {
    email: "bot_haruna@wangwang.app",
    name: "haruna",
    character: "pomeranian",
    level: 5,
    xp: 1450,
    streakDays: 28,
    equippedItems: ["crown"],
    diaries: [
      {
        title: "ビジネスメールの敬語練習 💼",
        content: "「お世話になっております」「よろしくお願い申し上げます」など、実際のビジネスでよく使うフレーズを復習しました。",
        mood: "proud",
      },
      {
        title: "読書タイム 📚",
        content: "日本の小説を原書で読み始めました。分からない単語をメモしながら読むのが楽しいです。",
        mood: "calm",
      },
    ],
  },
  {
    email: "bot_sora@wangwang.app",
    name: "소라",
    character: "shiba",
    level: 1,
    xp: 90,
    streakDays: 2,
    equippedItems: ["bow-tie"],
    diaries: [
      {
        title: "ひらがなの勉強はじめました 🌸",
        content: "今日から日本語の勉強を始めました！ひらがなを書く練習をしました。可愛い文字ですね。",
        mood: "happy",
      },
    ],
  },
  {
    email: "bot_kenji@wangwang.app",
    name: "kenji",
    character: "beagle",
    level: 3,
    xp: 510,
    streakDays: 7,
    equippedItems: ["glasses"],
    diaries: [
      {
        title: "IT用語の日本語 💻",
        content: "開発で使う日本語の単語を整理しました。「仕様書」「不具合」「実装」など現場でよく出る単語です。",
        mood: "productive",
      },
    ],
  },
  {
    email: "bot_jihoon@wangwang.app",
    name: "지훈",
    character: "shiba",
    level: 2,
    xp: 320,
    streakDays: 5,
    equippedItems: ["muffler"],
    diaries: [
      {
        title: "散歩と天気 🌤️",
        content: "今日は天気がとても良かったです。公園を散歩しながら日本語のリスニングをしました。",
        mood: "calm",
      },
    ],
  },
  {
    email: "bot_eunwoo@wangwang.app",
    name: "eunwoo",
    character: "poodle",
    level: 4,
    xp: 760,
    streakDays: 12,
    equippedItems: ["glasses"],
    diaries: [
      {
        title: "JLPT N2 文法のまとめ 📝",
        content: "「～に違いない」「～わけにはいかない」などの文法を復習しました。試験まであと少し！",
        mood: "focused",
      },
    ],
  },
  {
    email: "bot_yuki@wangwang.app",
    name: "yuki",
    character: "pomeranian",
    level: 3,
    xp: 480,
    streakDays: 9,
    equippedItems: ["hat-cap"],
    diaries: [
      {
        title: "大学の友達と会話練習 🗣️",
        content: "ネイティブの友達と30分日本語で話しました。自然な相槌の打ち方を学びました！",
        mood: "happy",
      },
    ],
  },
  {
    email: "bot_takoyaki@wangwang.app",
    name: "타코야끼",
    character: "shiba",
    level: 2,
    xp: 240,
    streakDays: 3,
    equippedItems: ["hachimaki"],
    diaries: [
      {
        title: "大阪旅行の計画 🐙",
        content: "来月大阪に行きます！道頓堀で本場のたこ焼きを食べるのが一番의楽しみです。",
        mood: "excited",
      },
    ],
  },

  // 11~20
  {
    email: "bot_charlie@wangwang.app",
    name: "charlie",
    character: "beagle",
    level: 3,
    xp: 530,
    streakDays: 10,
    equippedItems: ["hat-cap"],
    diaries: [
      {
        title: "アニメで聴き取り練習 📺",
        content: "字幕なしで好きなアニメを見ました。日常会話のスピードに少しずつ耳が慣れてきました！",
        mood: "proud",
      },
    ],
  },
  {
    email: "bot_mochiroll@wangwang.app",
    name: "모찌롤",
    character: "pomeranian",
    level: 2,
    xp: 290,
    streakDays: 4,
    equippedItems: ["bandana"],
    diaries: [
      {
        title: "日本のコンビニスイーツ 🍮",
        content: "ローソンのプレミアムロールケーキを食べました。クリームがたっぷりで最高です！",
        mood: "happy",
      },
    ],
  },
  {
    email: "bot_jun@wangwang.app",
    name: "jun",
    character: "shiba",
    level: 4,
    xp: 890,
    streakDays: 16,
    equippedItems: ["glasses"],
    diaries: [
      {
        title: "電話対応の敬語フレーズ 📞",
        content: "「少々お待ちください」「あいにく席を外しております」など電話でよく使う敬語を練習しました。",
        mood: "productive",
      },
    ],
  },
  {
    email: "bot_cloud@wangwang.app",
    name: "구름이",
    character: "poodle",
    level: 1,
    xp: 80,
    streakDays: 2,
    equippedItems: ["hachimaki"],
    diaries: [
      {
        title: "カタカナの練習 ✍️",
        content: "外来語のカタカナを書く練習をしました。「コーヒー」と「ケーキ」を書けるようになりました！",
        mood: "happy",
      },
    ],
  },
  {
    email: "bot_tokyowalker@wangwang.app",
    name: "tokyo_walker",
    character: "beagle",
    level: 5,
    xp: 1380,
    streakDays: 25,
    equippedItems: ["bandana"],
    diaries: [
      {
        title: "神保町の古本屋巡り 📖",
        content: "本の街・神保町を散歩しました。古い日本の雑誌や小説がたくさんあって一日中楽しめました。",
        mood: "calm",
      },
    ],
  },
  {
    email: "bot_haneul@wangwang.app",
    name: "haneul",
    character: "shiba",
    level: 2,
    xp: 310,
    streakDays: 6,
    equippedItems: ["flower-crown"],
    diaries: [
      {
        title: "今日のひとこと日記 🌤️",
        content: "「今日は風が涼しくて気持ちいいです」。毎日の天気を日本語で表現する練習をしています。",
        mood: "calm",
      },
    ],
  },
  {
    email: "bot_chococookie@wangwang.app",
    name: "초코쿠키",
    character: "pomeranian",
    level: 3,
    xp: 490,
    streakDays: 8,
    equippedItems: ["crown"],
    diaries: [
      {
        title: "JLPT N3 漢字の復習 📝",
        content: "音読みと訓読みの違いを意識しながら漢字を覚えています。関連する単語をセットで覚えるのがコツですね！",
        mood: "focused",
      },
    ],
  },
  {
    email: "bot_leo@wangwang.app",
    name: "leo",
    character: "poodle",
    level: 4,
    xp: 780,
    streakDays: 14,
    equippedItems: ["crown"],
    diaries: [
      {
        title: "短編小説の読解 📖",
        content: "星新一のショートショートを読みました。文章が簡潔で学習者にも読みやすくておすすめです！",
        mood: "proud",
      },
    ],
  },
  {
    email: "bot_sushilover@wangwang.app",
    name: "스시좋아",
    character: "shiba",
    level: 2,
    xp: 260,
    streakDays: 3,
    equippedItems: ["bandana"],
    diaries: [
      {
        title: "回転寿司の日本語 🍣",
        content: "「まぐろ」「サーモン」「いくら」など寿司ネタの名前を覚えました。早く日本で注文したいです！",
        mood: "excited",
      },
    ],
  },
  {
    email: "bot_claire@wangwang.app",
    name: "claire",
    character: "pomeranian",
    level: 3,
    xp: 520,
    streakDays: 11,
    equippedItems: ["glasses"],
    diaries: [
      {
        title: "J-POPの歌詞をじっくり鑑賞 🎵",
        content: "好きな曲の歌詞をじっくり読んでみました。感情表現の語彙が豊かになりました！",
        mood: "happy",
      },
    ],
  },
];

const COMMUNITY_POSTS = [
  {
    authorName: "도쿄드리머",
    category: "question",
    title: "JLPT N3の単語を覚える時、皆さんはどんな方法を使っていますか？",
    content: "単語帳を見るだけだとすぐに忘れてしまって悩んでいます(涙) 例文を中心に覚えるのがいいでしょうか、それともこのアプリのように毎日日記を書きながらアウトプットするのがいいでしょうか？効果があった勉強法のシェアをお願いします！",
    comments: [
      { authorName: "haruna", text: "私は単語を覚えたら、すぐにその単語を使って短い日記や例文を1つ作ってみる方法が一番記憶に残りました！" },
      { authorName: "eunwoo", text: "共感します！このアプリの語彙復習タブでSRS（分散学習）のタイミングに合わせて復習するのもすごく役立ちました！" },
      { authorName: "minji", text: "声に出して読みながら例文ごと丸暗記するのがおすすめです〜 応援しています！" },
      { authorName: "초코쿠키", text: "漢字は部首と音読みをセットで覚えるとぐっと楽になりますよ！" },
    ],
  },
  {
    authorName: "haruna",
    category: "tip",
    title: "💡 日本のコンビニで必ず使える実践フレーズまとめ",
    content: "日本のコンビニで店員さんによく聞かれる3つの質問と返答のコツです！\n\n1. 「袋はお分けしますか？」\n→ 「大丈夫です」または「一緒でいいです」\n\n2. 「温めますか？」\n→ 「お願いします」\n\n3. 「レシートご利用ですか？」\n→ 「大丈夫です」または「ください」\n\nぜひ保存して使ってみてくださいね 🌸",
    comments: [
      { authorName: "ramenboy", text: "袋を分ける時のフレーズ、よく聞いていたのですが意味が分かりました！ありがとうございます 👍" },
      { authorName: "타코야끼", text: "来月大阪旅行に行くのでスクショしました！とても役立つコツですね！" },
      { authorName: "소라", text: "初心者なのでとても勉強になります！ありがとうございます :)" },
      { authorName: "모찌롤", text: "コンビニスイーツを買う時にいつも使っています(笑) わかりやすいまとめをありがとうございます！" },
    ],
  },
  {
    authorName: "kenji",
    category: "japan",
    title: "秋葉原と神田のカレー街に行ってきました 🍛",
    content: "週末に秋葉原の電気街を散策し、近くの神田でカレーを食べてきました。\n日本はカレー専門店が本当に多くて、お店ごとに個性があるのでカレー巡りが楽しいですね！\n皆さんの好きな日本食は何ですか？",
    comments: [
      { authorName: "ramenboy", text: "私は断然ラーメン派ですが、濃厚な日本風カレーも大好きです！" },
      { authorName: "지훈", text: "神田のカレーは有名ですね！カツをトッピングして食べると最高です。" },
      { authorName: "tokyo_walker", text: "神田の近くにある神保町の古書店街も雰囲気がとても素敵ですよ〜" },
    ],
  },
  {
    authorName: "eunwoo",
    category: "chat",
    title: "毎日日記を1編書く習慣、10日連続達成！ 🔥",
    content: "最初は3行書くのも大変でしたが、AIの添削フィードバックを見ながら直していくうちに、少しずつ文章力が伸びているのを実感しています。\nストリークが途切れないように今夜も日記を書きに来ます！皆さん今日も勉強頑張りましょう ✨",
    comments: [
      { authorName: "minji", text: "10日連続達成素晴らしいです！！私も今日の日記を書きに行きます！" },
      { authorName: "도쿄드리머", text: "ストリークを維持することが本当に大きなモチベーションになりますよね！応援しています！" },
      { authorName: "haneul", text: "コツコツ続けるのが一番ですね！かっこいいです 👏" },
    ],
  },
  {
    authorName: "yuki",
    category: "review",
    title: "敬語レッスンのビジネス編を完講した感想 🎯",
    content: "尊敬語と謙譲語がいつもごちゃごちゃになって言葉に詰まっていましたが、\nシチュエーション別の会話文で繰り返し練習したら頭にすんなり入るようになりました！\n特に「おっしゃる」と「申す」の使い分けがしっかり整理できました。おすすめです 👍",
    comments: [
      { authorName: "haruna", text: "敬語はビジネス日本語の要ですね！完講おめでとうございます 🎉" },
      { authorName: "jun", text: "私も電話応対の敬語パートを復習中ですが、すごく役に立っています。" },
      { authorName: "claire", text: "私も早くレベルを上げて敬語レッスンに挑戦してみたいです！" },
    ],
  },
  {
    authorName: "타코야끼",
    category: "japan",
    title: "関西弁ってすごく魅力的じゃないですか？ 😄",
    content: "標準語を勉強してから関西弁に触れると、イントネーションも面白くて親しみを感じます！\n「おおきに」「なんぼ」などの言葉が口に馴染んで楽しいです(笑)\n方言を勉強されている方はいらっしゃいますか？",
    comments: [
      { authorName: "도쿄드리머", text: "大阪の人たちは本当に明るくてユーモアがあって、関西弁を聞くと元気が出ますよね(笑)" },
      { authorName: "스시좋아", text: "大阪の飲食店で「おおきに〜」と聞くと、旅行に来た実感が湧きます！" },
    ],
  },
  {
    authorName: "tokyo_walker",
    category: "tip",
    title: "📚 日本語の原書・小説入門におすすめの作家3選",
    content: "JLPT N3〜N2レベルで読みやすい原書をご紹介します！\n\n1. 星新一 - ショートショートSF短編集（文章が短くて分かりやすい）\n2. 雫井脩介（読みやすい日常系ミステリー）\n3. 小川糸 - 心温まるヒーリング小説（『ツバキ文具店』など）\n\n皆さんも楽しい読書時間を！",
    comments: [
      { authorName: "haruna", text: "小川糸先生の文章は温かくて美しいので私も大好きです 🌿" },
      { authorName: "leo", text: "星新一の短編から私も原書を読み始めましたが、スラスラ読めました！" },
    ],
  },
  {
    authorName: "초코쿠키",
    category: "question",
    title: "漢字を覚える時の訓読み・音読みのコツはありますか？",
    content: "漢字一文字に読み方がいくつもあって、文脈でどう読むべきかいつも迷ってしまいます(涙)\n皆さんはどのように克服されましたか？",
    comments: [
      { authorName: "eunwoo", text: "単独で使われたり送り仮名が付く場合は主に「訓読み」、2文字以上の熟語は主に「音読み」になることが多いです！" },
      { authorName: "kenji", text: "個別の漢字だけを覚えるより、「教室」「教える」のように単語丸ごと覚えるのが一番早いです。" },
    ],
  },
  {
    authorName: "스시좋아",
    category: "chat",
    title: "東京の築地・豊洲市場で寿司巡りをしてきました 🍣",
    content: "新鮮な大トロとウニ丼を食べてきました。口の中でとろけます...\nお店で日本語で直接注文して「とろける！」「最高です」と伝えたら、店員さんがとても笑顔で接してくれました！",
    comments: [
      { authorName: "ramenboy", text: "ウニ丼の写真が美味しそうですね... 見ているだけでお腹が空いてきます 🤤" },
      { authorName: "타코야끼", text: "注文フレーズ、メモしておきます！ありがとうございます！！" },
    ],
  },
  {
    authorName: "charlie",
    category: "chat",
    title: "アニメの原作マンガを1巻読み切りました！ 🎉",
    content: "漢字が多くて辞書を引きながら読んだので時間がかかりましたが、読み切ったあとの達成感がすごいです！\n読みやすい日常系のマンガから始めると楽しく続けられますね。皆さん今日も勉強頑張りましょう！",
    comments: [
      { authorName: "leo", text: "原作マンガ1巻の完読おめでとうございます！！次の巻はもっと早く読めるようになりますよ。" },
      { authorName: "도쿄드리머", text: "どんなマンガから始められましたか？私も挑戦してみたいです！" },
    ],
  },
];

async function main() {
  console.log("🚀 총 20명의 자연스러운 AI 가상 유저 및 코디 아바타 커뮤니티 데이터 업데이트 시작...");

  const defaultPassword = await bcrypt.hash("aiuser1234!", 10);
  const createdUsers: Record<string, string> = {};

  // 0. 기존 봇 유저의 커뮤니티 글/댓글/일기/좋아요 클린업 (이전 한글 데이터 정리)
  const existingBots = await prisma.user.findMany({
    where: { isBot: true },
    select: { id: true },
  });
  const botUserIds = existingBots.map((b) => b.id);
  if (botUserIds.length > 0) {
    await prisma.communityPostLike.deleteMany({ where: { userId: { in: botUserIds } } });
    await prisma.communityPostComment.deleteMany({ where: { userId: { in: botUserIds } } });
    await prisma.communityPost.deleteMany({ where: { userId: { in: botUserIds } } });
    await prisma.like.deleteMany({ where: { userId: { in: botUserIds } } });
    await prisma.comment.deleteMany({ where: { userId: { in: botUserIds } } });
    await prisma.diary.deleteMany({ where: { userId: { in: botUserIds } } });
  }

  // 1. AI 유저 생성 및 업데이트 (20명)
  for (const persona of AI_PERSONAS) {
    const user = await prisma.user.upsert({
      where: { email: persona.email },
      update: {
        name: persona.name,
        isBot: true,
        role: "user",
      },
      create: {
        email: persona.email,
        name: persona.name,
        password: defaultPassword,
        role: "user",
        isBot: true,
      },
    });

    createdUsers[persona.name] = user.id;

    // UserProgress 설정
    await prisma.userProgress.upsert({
      where: { userId: user.id },
      update: {
        level: persona.level,
        xp: persona.xp,
        streakDays: persona.streakDays,
        activeCharacter: persona.character,
      },
      create: {
        userId: user.id,
        level: persona.level,
        xp: persona.xp,
        streakDays: persona.streakDays,
        activeCharacter: persona.character,
      },
    });

    // 🎨 아바타 코디 아이템 장착 (단일 아이템 착용: UserWardrobeItem 1개)
    await prisma.userWardrobeItem.deleteMany({ where: { userId: user.id } });
    for (const itemId of persona.equippedItems) {
      await prisma.userWardrobeItem.create({
        data: {
          userId: user.id,
          wardrobeItemId: itemId,
          equippedAt: new Date(),
        },
      });
    }

    // 2. 공개 일기 등록 (순수 일본어)
    for (const diaryData of persona.diaries) {
      await prisma.diary.create({
        data: {
          userId: user.id,
          title: diaryData.title,
          content: diaryData.content,
          mood: diaryData.mood,
          isPublic: true,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        },
      });
    }
  }

  // 3. 커뮤니티 자유게시판 글 및 댓글 생성 (순수 일본어)
  console.log("📝 커뮤니티 자유게시판 글 및 댓글 시드 중...");
  for (const postData of COMMUNITY_POSTS) {
    const authorId = createdUsers[postData.authorName];
    if (!authorId) continue;

    const newPost = await prisma.communityPost.create({
      data: {
        userId: authorId,
        title: postData.title,
        content: postData.content,
        category: postData.category,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)),
      },
    });

    // 댓글 등록
    for (const c of postData.comments) {
      const commenterId = createdUsers[c.authorName];
      if (!commenterId) continue;

      await prisma.communityPostComment.create({
        data: {
          postId: newPost.id,
          userId: commenterId,
          content: c.text,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 2 * 24 * 60 * 60 * 1000)),
        },
      });
    }
  }

  // 4. 공개 일기에 대한 상호 좋아요 및 댓글 (순수 일본어)
  console.log("💬 공개 일기 상호 반응 시드 중...");
  const allBotDiaries = await prisma.diary.findMany({
    where: {
      user: { isBot: true },
      isPublic: true,
    },
    include: { user: true },
  });

  const botNames = Object.keys(createdUsers);

  for (const diary of allBotDiaries) {
    const randomReactors = botNames
      .filter((name) => name !== diary.user.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    for (const reactorName of randomReactors) {
      const reactorId = createdUsers[reactorName];
      if (!reactorId) continue;

      // 좋아요
      await prisma.like.create({
        data: {
          userId: reactorId,
          diaryId: diary.id,
        },
      });

      // 댓글 (순수 일본어)
      const reactionComments = [
        "今日も勉強お疲れ様でした！刺激をもらいました ✨",
        "文章の表現がとても自然ですね！勉強になります 👍",
        "コツコツ日記を書く姿が素敵です！頑張ってください 🌸",
        "共感できる内容ですね！今日もお疲れ様でした！",
        "私もこの表現を復習していたところです！素晴らしいですね :)"
      ];
      const randomComment = reactionComments[Math.floor(Math.random() * reactionComments.length)];

      await prisma.comment.create({
        data: {
          diaryId: diary.id,
          userId: reactorId,
          content: randomComment,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
        },
      });
    }
  }

  console.log("✅ 20명의 AI 유저와 단일 코디 아바타, 일기, 게시글, 댓글 시드가 성공적으로 완료되었습니다!");
}

main()
  .catch((e) => {
    console.error("❌ 시드 실패:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
