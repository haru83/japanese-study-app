// src/components/community/CommentSection.tsx
"use client";

import { useState, useTransition } from "react";
import { addComment } from "@/actions/community";
import { CommentItem } from "./CommentItem";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  diaryId: string;
  user: {
    id: string;
    name: string | null;
    progress: { level: number } | null;
  };
};

type Props = {
  diaryId: string;
  comments: Comment[];
  currentUserId?: string;
};

export function CommentSection({ diaryId, comments, currentUserId }: Props) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const value = text;
    startTransition(async () => {
      await addComment(diaryId, value);
      setText("");
    });
  }

  return (
    <div>
      <h3 className="font-black text-type-black text-sm mb-3">
        댓글 {comments.length}개
      </h3>
      <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden mb-4">
        {comments.length === 0 ? (
          <p className="px-4 py-6 text-sm text-type-black/50 font-bold text-center">
            아직 댓글이 없어요. 첫 응원을 남겨보세요! 🌸
          </p>
        ) : (
          <div className="px-4 py-2">
            {comments.map((c) => (
              <CommentItem key={c.id} comment={c} currentUserId={currentUserId} />
            ))}
          </div>
        )}
      </div>
      {currentUserId ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="응원 댓글을 남겨보세요 🌸"
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-black bg-paper-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sakura-pink"
          />
          <button
            type="submit"
            disabled={!text.trim() || isPending}
            className="bg-sakura-pink font-black text-sm px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="text-sm text-center text-type-black/50 font-bold py-3">
          댓글을 쓰려면{" "}
          <a href="/login" className="text-sakura-pink underline">
            로그인
          </a>
          이 필요해요
        </p>
      )}
    </div>
  );
}
