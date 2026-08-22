// src/app/(app)/community/posts/write/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCommunityPost } from "@/actions/communityPost";
import { POST_CATEGORIES } from "@/components/community/PostCard";

export default function PostWritePage() {
  const router = useRouter();
  const [category, setCategory] = useState<"chat" | "question" | "tip" | "japan" | "review">("chat");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const post = await createCommunityPost({
        category,
        title: title.trim(),
        content: content.trim(),
      });
      router.push(`/community/posts/${post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "글 작성에 실패했습니다.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* 헤더 */}
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/community?tab=board"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all -ml-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-black text-type-black">자유게시판 글쓰기 ✏️</h1>
        </div>
      </div>

      <div className="px-5 py-5 pb-24">
        <form onSubmit={handleSubmit} className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex flex-col gap-4">
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 text-xs font-bold px-3 py-2 rounded-xl">
              {error}
            </div>
          )}

          {/* 카테고리 선택 */}
          <div>
            <label className="block text-xs font-black text-type-black/70 mb-1.5">
              카테고리 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(POST_CATEGORIES).map(([key, cat]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setCategory(key as "chat" | "question" | "tip" | "japan" | "review")}
                  className={`py-2 px-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
                    category === key
                      ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]"
                      : "bg-canvas-almond/30 text-type-black hover:bg-canvas-almond"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 입력 */}
          <div>
            <label className="block text-xs font-black text-type-black/70 mb-1.5">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요 (최대 100자)"
              maxLength={100}
              required
              className="w-full px-3.5 py-2.5 bg-canvas-almond/20 border-2 border-black rounded-xl text-sm font-bold text-type-black focus:outline-none focus:bg-white"
            />
          </div>

          {/* 본문 입력 */}
          <div>
            <label className="block text-xs font-black text-type-black/70 mb-1.5">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="자유롭게 이야기를 나눠보세요 (일본어, 한국어 모두 환영!)"
              rows={8}
              maxLength={3000}
              required
              className="w-full px-3.5 py-2.5 bg-canvas-almond/20 border-2 border-black rounded-xl text-sm font-bold text-type-black focus:outline-none focus:bg-white resize-none leading-relaxed"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-sakura-pink text-type-black font-black text-base rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "게시글 등록 중..." : "게시글 등록하기 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
