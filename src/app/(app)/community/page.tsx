// src/app/(app)/community/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPublicDiaries, getReceivedReactions, markReactionsRead } from "@/actions/community";
import { getCommunityPosts } from "@/actions/communityPost";
import { FeedTabClient } from "@/components/community/FeedTabClient";
import { BoardTabClient } from "@/components/community/BoardTabClient";
import { formatDateKST } from "@/lib/dateUtils";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab === "reactions" ? "reactions" : tab === "board" ? "board" : "feed";
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-sakura-blush">
      <header className="bg-canvas-almond px-5 pt-10 pb-0 border-b-4 border-black">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-type-black tracking-tight flex items-center gap-2">
              <span>커뮤니티</span>
              <span className="text-xl">🌸</span>
            </h1>
            <p className="text-xs font-bold text-type-black/60 mt-1">
              학습자들과 일본어 일기를 공유하고 소통해보세요
            </p>
          </div>
          <div className="w-12 h-12 rounded-[14px] bg-paper-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-2xl shrink-0 wobbly-2">
            💬
          </div>
        </div>
        <div className="flex">
          <Link
            href="/community"
            className={`flex-1 py-2.5 text-center text-xs font-black border-b-4 transition-colors ${
              activeTab === "feed"
                ? "border-sakura-pink text-type-black"
                : "border-transparent text-type-black/40 hover:text-type-black/70"
            }`}
          >
            모두의 일기
          </Link>
          <Link
            href="/community?tab=board"
            className={`flex-1 py-2.5 text-center text-xs font-black border-b-4 transition-colors ${
              activeTab === "board"
                ? "border-sakura-pink text-type-black"
                : "border-transparent text-type-black/40 hover:text-type-black/70"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/community?tab=reactions"
            className={`flex-1 py-2.5 text-center text-xs font-black border-b-4 transition-colors ${
              activeTab === "reactions"
                ? "border-sakura-pink text-type-black"
                : "border-transparent text-type-black/40 hover:text-type-black/70"
            }`}
          >
            받은 반응
          </Link>
        </div>
      </header>

      <div className="px-5 py-5 flex flex-col gap-3 pb-24">
        {activeTab === "feed" ? (
          <FeedTab />
        ) : activeTab === "board" ? (
          <BoardTab />
        ) : (
          <ReactionsTab userId={session?.user?.id} />
        )}
      </div>
    </div>
  );
}

async function FeedTab() {
  const diaries = await getPublicDiaries();

  if (diaries.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">📖</p>
        <p className="font-black text-type-black">아직 공개된 일기가 없어요</p>
        <p className="text-sm text-type-black/60 font-bold mt-1">
          첫 번째로 일기를 공개해보세요!
        </p>
      </div>
    );
  }

  return <FeedTabClient diaries={diaries} />;
}

async function BoardTab() {
  const posts = await getCommunityPosts();
  return <BoardTabClient posts={posts} />;
}

async function ReactionsTab({ userId }: { userId?: string }) {
  if (!userId) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🔒</p>
        <p className="font-black text-type-black">로그인이 필요해요</p>
        <Link
          href="/login"
          className="mt-3 inline-block bg-sakura-pink font-black text-sm px-5 py-2.5 rounded-2xl border-2 border-black"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  // 탭 진입 시 읽음 처리
  await markReactionsRead();

  const { likes, comments } = await getReceivedReactions();

  const items = [
    ...likes.map((l) => ({
      type: "like" as const,
      id: l.id,
      emoji: l.emoji ?? "🌸",
      createdAt: l.createdAt,
      userName: l.user.name,
      diaryId: l.diary.id,
      diaryTitle: l.diary.title,
      commentContent: null as string | null,
    })),
    ...comments.map((c) => ({
      type: "comment" as const,
      id: c.id,
      emoji: "💬",
      createdAt: c.createdAt,
      userName: c.user.name,
      diaryId: c.diary.id,
      diaryTitle: c.diary.title,
      commentContent: c.content,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🌸</p>
        <p className="font-black text-type-black">아직 받은 반응이 없어요</p>
        <p className="text-sm text-type-black/60 font-bold mt-1">
          일기를 공개하면 응원을 받을 수 있어요!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
      {items.map((item, i) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={`/community/${item.diaryId}`}
          className={`flex items-start gap-3 px-4 py-3.5 hover:bg-sakura-blush transition-colors ${
            i < items.length - 1 ? "border-b border-black/10" : ""
          }`}
        >
          <span className="text-xl shrink-0">
            {item.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-type-black">
              {item.userName ?? "학습자"}님이{" "}
              {item.type === "like" ? `${item.emoji} 반응을 남겼어요` : "댓글을 남겼어요"}
            </p>
            <p className="text-xs text-type-black/60 font-bold truncate">
              {item.type === "comment" && item.commentContent
                ? `"${item.commentContent}"`
                : item.diaryTitle}
            </p>
          </div>
          <span className="text-[10px] text-type-black/40 font-bold shrink-0">
            {formatDateKST(item.createdAt)}
          </span>
        </Link>
      ))}
    </div>
  );
}
