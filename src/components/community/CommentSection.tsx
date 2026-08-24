// src/components/community/CommentSection.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { addComment } from "@/actions/community";
import { CommentItem, DiaryCommentType } from "./CommentItem";
import { filterCommentInput, hasKorean } from "@/lib/japaneseInput";
import { CommentWithReplies, organizeCommentsWithReplies } from "@/lib/community";

type Props = {
  diaryId: string;
  comments: DiaryCommentType[];
  organizedComments?: CommentWithReplies<DiaryCommentType>[];
  currentUserId?: string;
};

export function CommentSection({
  diaryId,
  comments,
  organizedComments,
  currentUserId,
}: Props) {
  const [text, setText] = useState("");
  const [koreanBlocked, setKoreanBlocked] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (hasKorean(raw)) {
      setKoreanBlocked(true);
      setText(filterCommentInput(raw));
    } else {
      setKoreanBlocked(false);
      setText(raw);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const value = text;
    startTransition(async () => {
      try {
        await addComment(diaryId, value);
        setText("");
        setKoreanBlocked(false);
      } catch {
        // keep text so user can retry
      }
    });
  }

  const rootComments = organizedComments ?? organizeCommentsWithReplies(comments);
  const totalCommentsCount = comments.length;

  return (
    <div>
      <h3 className="font-black text-type-black text-sm mb-3">
        댓글 {totalCommentsCount}개
      </h3>
      <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden mb-4">
        {rootComments.length === 0 ? (
          <p className="px-4 py-6 text-sm text-type-black/50 font-bold text-center">
            아직 댓글이 없어요. 첫 응원을 남겨보세요! 🌸
          </p>
        ) : (
          <div className="px-4 py-2 flex flex-col gap-1">
            {rootComments.map((c) => (
              <CommentItem key={c.id} comment={c} currentUserId={currentUserId} />
            ))}
          </div>
        )}
      </div>
      {currentUserId ? (
        <div className="flex flex-col gap-1">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={text}
              onChange={handleChange}
              placeholder="日本語または英語でコメントを入力 🌸"
              className={`flex-1 px-4 py-3 rounded-2xl border-2 bg-paper-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sakura-pink ${koreanBlocked ? "border-red-400" : "border-black"}`}
            />
            <button
              type="submit"
              disabled={!text.trim() || isPending}
              className="bg-sakura-pink font-black text-sm px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
            >
              登録
            </button>
          </form>
          {koreanBlocked && (
            <p className="text-xs font-bold text-red-500 px-1">
              ⚠️ このコメント欄では日本語・英語のみ入力できます
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-center text-type-black/50 font-bold py-3">
          댓글을 쓰려면{" "}
          <Link href="/login" className="text-sakura-pink underline">
            로그인
          </Link>
          이 필요해요
        </p>
      )}
    </div>
  );
}

