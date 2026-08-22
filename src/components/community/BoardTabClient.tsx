// src/components/community/BoardTabClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PostCard, POST_CATEGORIES, CommunityPostItem } from "@/components/community/PostCard";
import { SocialProfileModal } from "@/components/community/SocialProfileModal";

interface Props {
  posts: CommunityPostItem[];
  initialCategory?: string;
}

export function BoardTabClient({ posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* 글쓰기 CTA 배너 */}
      <Link
        href="/community/posts/write"
        className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-2"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-amber-200 p-2 rounded-xl border-2 border-black shrink-0">
            💬
          </div>
          <div>
            <h3 className="font-black text-type-black text-sm">자유게시판에 글쓰기</h3>
            <p className="text-xs text-type-black/60 font-bold mt-0.5">
              공부 질문, 팁, 일본 일상을 자유롭게 이야기해요
            </p>
          </div>
        </div>
        <span className="bg-sakura-pink text-type-black text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shrink-0">
          글쓰기
        </span>
      </Link>

      {/* 카테고리 필터 칩 */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none mb-1">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-black border-2 border-black transition-all shrink-0 ${
            selectedCategory === "all"
              ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]"
              : "bg-paper-white text-type-black hover:bg-canvas-almond"
          }`}
        >
          ✨ 전체
        </button>
        {Object.entries(POST_CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-black border-2 border-black transition-all shrink-0 ${
              selectedCategory === key
                ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]"
                : "bg-paper-white text-type-black hover:bg-canvas-almond"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-paper-white rounded-[20px] border-2 border-black p-6 mt-2">
          <p className="text-4xl mb-3">💬</p>
          <p className="font-black text-type-black">아직 등록된 게시글이 없어요</p>
          <p className="text-xs text-type-black/60 font-bold mt-1">
            첫 번째 이야기를 남겨보세요!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onAvatarClick={(userId) => setSelectedUserId(userId)}
            />
          ))}
        </div>
      )}

      {/* 프로필 모달 */}
      <SocialProfileModal
        targetUserId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </>
  );
}
