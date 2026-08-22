// src/lib/aiActivityEngine.ts
import { prisma } from "@/lib/db";

// ── 다채로운 AI 일기 풀 ────────────────────────────────────────────────────────
const AI_DIARY_TEMPLATES = [
  {
    title: "朝のルーティンと日本語 ☀️",
    content: "毎朝起きてすぐに日本語の単語を5つ覚える習慣を始めました。小さな積み重ねが大事ですね！",
    mood: "productive",
  },
  {
    title: "日本の緑茶でリラックス 🍵",
    content: "温かい緑茶を飲みながら敬語の復習をしました。心が落ち着いて勉強が捗ります。",
    mood: "calm",
  },
  {
    title: "アニメのセリフを書き留める ✍️",
    content: "アニメで耳にした素敵な日本語の表現をノートにまとめました。生きた表現を学ぶのは楽しいです！",
    mood: "happy",
  },
  {
    title: "道案内で使う日本語 🗺️",
    content: "「まっすぐ行って、右に曲がってください」などの道案内のフレーズを練習しました。旅行で役立ちそうです！",
    mood: "excited",
  },
  {
    title: "週末の日本語復習 📚",
    content: "今週習った文法と単語を総復習しました。忘れていた部分を再確認できて良かったです。",
    mood: "focused",
  },
];

// ── 다채로운 AI 자유게시판 글 풀 ────────────────────────────────────────────────
const AI_POST_TEMPLATES = [
  {
    category: "tip" as const,
    title: "💡 日本語の会話力を早く伸ばすおすすめの習慣",
    content: "独り言で一日の出来事を日本語でつぶやく練習がとてもおすすめです！\n\n例：「そろそろご飯食べよう」「今日の天気、めっちゃいいな」\n\n頭の中で母国語を介さずに日本語で直接考えるトレーニングになり、会話の反応速度がぐっと上がります！",
  },
  {
    category: "question" as const,
    title: "皆さんは日本語の漢字をどのように覚えていますか？",
    content: "漢字単体だけを覚えているとすぐに忘れてしまうのですが、皆さんは文脈や例文の中で覚えますか？それとも部首から順に勉強されていますか？おすすめのコツがあれば教えてください！",
  },
  {
    category: "japan" as const,
    title: "東京旅行でおすすめのお土産お菓子3選 🍪",
    content: "1. 白い恋人（定番ですがやっぱり美味しい）\n2. 東京ばな奈 キャラメル味（限定でおすすめ）\n3. ラングドシャ チーズクッキー\n\n空港の免税店で見かけたらぜひチェックしてみてください！",
  },
  {
    category: "review" as const,
    title: "日記を10日連続で書いた感想 ✨",
    content: "最初は短い文を1つ書くのも大変でしたが、10日間毎日少しずつ書いていたら使える表現が増えて日本語が身近に感じられるようになりました。継続が一番の力ですね！",
  },
  {
    category: "chat" as const,
    title: "今日一日、皆さんお疲れ様でした 🌸",
    content: "忙しい中でも毎日少しずつ勉強を続けている皆さん、本当に素晴らしいです！お疲れ様でした〜",
  },
];

// ── 자연스러운 댓글 풀 ─────────────────────────────────────────────────────────
const ENCOURAGING_COMMENTS = [
  "素晴らしいです！私もこの表現をメモしておきます 👍",
  "とても共感します！毎日コツコツ続ける姿が素敵ですね！",
  "文章がとても自然ですね ✨",
  "素敵な投稿ありがとうございます！今日も一日頑張りましょう 🌸",
  "私も同じことで悩んでいたので参考になりました！",
  "今日もお疲れ様でした！お互い頑張りましょう〜",
  "表現がとても分かりやすくて勉強になります！ 🚀",
  "継続する力がすごいです！一緒に頑張りましょう 🔥",
];

/**
 * 1. 정기 스케줄러 작업 (Cloud Scheduler 등에서 호출)
 * - AI 유저 1명이 새로운 일기 또는 자유게시판 글을 1개 발행
 * - 최근 글에 다른 AI 유저들이 좋아요 & 댓글을 남김
 */
export async function runPeriodicAiActivity() {
  const bots = await prisma.user.findMany({
    where: { isBot: true },
    select: { id: true, name: true },
  });

  if (bots.length === 0) {
    return { success: false, message: "AI 유저가 존재하지 않습니다." };
  }

  // 1. 랜덤 봇 1명 선택
  const randomBot = bots[Math.floor(Math.random() * bots.length)];
  const isPost = Math.random() > 0.5;

  let createdItemType = "";

  if (isPost) {
    // 자유게시판 글 생성
    const template = AI_POST_TEMPLATES[Math.floor(Math.random() * AI_POST_TEMPLATES.length)];
    const post = await prisma.communityPost.create({
      data: {
        userId: randomBot.id,
        category: template.category,
        title: template.title,
        content: template.content,
      },
    });
    createdItemType = `자유게시판 글 (${post.title})`;

    // 다른 봇 2~3명이 좋아요 및 댓글
    const otherBots = bots.filter((b) => b.id !== randomBot.id);
    const commentingBots = otherBots.slice(0, Math.floor(Math.random() * 2) + 2);

    for (const b of commentingBots) {
      await prisma.communityPostLike.upsert({
        where: { userId_postId: { userId: b.id, postId: post.id } },
        update: {},
        create: { userId: b.id, postId: post.id },
      });

      const randomComment = ENCOURAGING_COMMENTS[Math.floor(Math.random() * ENCOURAGING_COMMENTS.length)];
      await prisma.communityPostComment.create({
        data: {
          userId: b.id,
          postId: post.id,
          content: randomComment,
        },
      });
    }
  } else {
    // 공개 일기 생성
    const template = AI_DIARY_TEMPLATES[Math.floor(Math.random() * AI_DIARY_TEMPLATES.length)];
    const diary = await prisma.diary.create({
      data: {
        userId: randomBot.id,
        title: template.title,
        content: template.content,
        mood: template.mood,
        isPublic: true,
      },
    });
    createdItemType = `공개 일기 (${diary.title})`;

    // 다른 봇 2명이 좋아요 및 댓글
    const otherBots = bots.filter((b) => b.id !== randomBot.id);
    const commentingBots = otherBots.slice(0, 2);

    for (const b of commentingBots) {
      await prisma.like.upsert({
        where: { userId_diaryId: { userId: b.id, diaryId: diary.id } },
        update: {},
        create: { userId: b.id, diaryId: diary.id },
      });

      const randomComment = ENCOURAGING_COMMENTS[Math.floor(Math.random() * ENCOURAGING_COMMENTS.length)];
      await prisma.comment.create({
        data: {
          userId: b.id,
          diaryId: diary.id,
          content: randomComment,
        },
      });
    }
  }

  return {
    success: true,
    author: randomBot.name,
    created: createdItemType,
  };
}

/**
 * 2. 실제 유저의 새 공개 일기에 AI가 자동 반응
 */
export async function triggerAiReactionForDiary(diaryId: string, authorId: string) {
  try {
    const bots = await prisma.user.findMany({
      where: { isBot: true, id: { not: authorId } },
      select: { id: true, name: true },
    });

    if (bots.length === 0) return;

    // 1~2명의 AI 유저가 반응
    const selectedBots = bots.sort(() => 0.5 - Math.random()).slice(0, 2);

    for (const bot of selectedBots) {
      // 좋아요
      await prisma.like.upsert({
        where: { userId_diaryId: { userId: bot.id, diaryId } },
        update: {},
        create: { userId: bot.id, diaryId },
      });

      // 응원 댓글
      const comment = ENCOURAGING_COMMENTS[Math.floor(Math.random() * ENCOURAGING_COMMENTS.length)];
      await prisma.comment.create({
        data: {
          userId: bot.id,
          diaryId,
          content: comment,
        },
      });
    }
  } catch (error) {
    console.error("AI reaction for diary failed:", error);
  }
}

/**
 * 3. 실제 유저의 새 자유게시판 글에 AI가 자동 반응
 */
export async function triggerAiReactionForPost(postId: string, authorId: string) {
  try {
    const bots = await prisma.user.findMany({
      where: { isBot: true, id: { not: authorId } },
      select: { id: true, name: true },
    });

    if (bots.length === 0) return;

    // 1~2명의 AI 유저가 반응
    const selectedBots = bots.sort(() => 0.5 - Math.random()).slice(0, 2);

    for (const bot of selectedBots) {
      // 좋아요
      await prisma.communityPostLike.upsert({
        where: { userId_postId: { userId: bot.id, postId } },
        update: {},
        create: { userId: bot.id, postId },
      });

      // 댓글
      const comment = ENCOURAGING_COMMENTS[Math.floor(Math.random() * ENCOURAGING_COMMENTS.length)];
      await prisma.communityPostComment.create({
        data: {
          userId: bot.id,
          postId,
          content: comment,
        },
      });
    }
  } catch (error) {
    console.error("AI reaction for post failed:", error);
  }
}
