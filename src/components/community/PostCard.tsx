// src/components/community/PostCard.tsx
"use client";

import Link from "next/link";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

export const POST_CATEGORIES: Record<string, { label: string; bg: string; text: string }> = {
  chat: { label: "💬 잡담", bg: "bg-canvas-almond", text: "text-type-black" },
  question: { label: "❓ 질문", bg: "bg-sky-100", text: "text-sky-900" },
  tip: { label: "💡 공부팁", bg: "bg-amber-100", text: "text-amber-900" },
  japan: { label: "🗼 일본생활", bg: "bg-rose-100", text: "text-rose-900" },
  review: { label: "📝 후기", bg: "bg-emerald-100", text: "text-emerald-900" },
};

import { ReactionGroup } from "@/lib/community";

export type CommunityPostItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    progress: { level: number; activeCharacter: string } | null;
    wardrobeItems: { wardrobeItemId: string }[];
  };
  reactionGroups?: ReactionGroup[];
  _count: { likes: number; comments: number };
};

type Props = {
  post: CommunityPostItem;
  onAvatarClick?: (userId: string) => void;
};

export function PostCard({ post, onAvatarClick }: Props) {
  const level = post.user.progress?.level ?? 1;
  const equippedIds = post.user.wardrobeItems.map((w) => w.wardrobeItemId);
  const characterId = post.user.progress?.activeCharacter ?? "shiba";
  const categoryInfo = POST_CATEGORIES[post.category] ?? POST_CATEGORIES.chat;

  function handleUserClick(e: React.MouseEvent) {
    if (onAvatarClick) {
      e.preventDefault();
      e.stopPropagation();
      onAvatarClick(post.user.id);
    }
  }

  const activeReactions = (post.reactionGroups ?? [])
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <Link
      href={`/community/posts/${post.id}`}
      className="block bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all p-4"
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5 cursor-pointer min-w-0" onClick={handleUserClick}>
          <ShibaAvatar
            characterId={characterId}
            level={level}
            size={36}
            sticker
            equippedItemIds={equippedIds}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs text-type-black truncate hover:underline">
                {post.user.name ?? "학습자"}
              </span>
              <span className="bg-grape-punch text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-black shrink-0">
                Lv.{level}
              </span>
            </div>
            <span className="text-[10px] text-type-black/50 font-bold block">
              {new Date(post.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>

        <span
          className={`text-[11px] font-black px-2.5 py-0.8 rounded-full border-2 border-black shrink-0 ${categoryInfo.bg} ${categoryInfo.text}`}
        >
          {categoryInfo.label}
        </span>
      </div>

      <h3 className="font-black text-type-black text-sm mb-1 line-clamp-1">
        {post.title}
      </h3>
      <p className="text-xs text-type-black/70 font-bold line-clamp-2 leading-relaxed">
        {post.content}
      </p>

      <div className="flex items-center justify-between gap-3.5 mt-3 text-xs font-bold text-type-black/60">
        <div className="flex items-center gap-2 flex-wrap">
          {activeReactions.length > 0 ? (
            activeReactions.slice(0, 3).map((r) => (
              <span
                key={r.emoji}
                className="inline-flex items-center gap-1 bg-canvas-almond/30 px-2 py-0.5 rounded-lg border border-black/10 text-[11px]"
              >
                <span>{r.emoji}</span>
                <span>{r.count}</span>
              </span>
            ))
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-type-black/40">
              <span>❤️</span>
              <span>{post._count.likes}</span>
            </span>
          )}
        </div>
        <span>💬 {post._count.comments}</span>
      </div>
    </Link>
  );
}
