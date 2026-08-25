// src/components/community/CommentItem.tsx
"use client";

import { useState, useTransition } from "react";
import { deleteComment, addComment } from "@/actions/community";
import { ReportModal } from "./ReportModal";
import { filterCommentInput, hasKorean } from "@/lib/japaneseInput";
import { CommentWithReplies } from "@/lib/community";
import { formatDateKST } from "@/lib/dateUtils";

export type DiaryCommentType = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  diaryId: string;
  parentId?: string | null;
  user: {
    id: string;
    name: string | null;
    progress: { level: number } | null;
  };
};

type Props = {
  comment: CommentWithReplies<DiaryCommentType>;
  currentUserId?: string;
};

export function CommentItem({ comment, currentUserId }: Props) {
  const [showReport, setShowReport] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyKoreanBlocked, setReplyKoreanBlocked] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const isOwn = comment.userId === currentUserId;

  function handleDelete(commentId: string) {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    startTransition(async () => {
      try {
        await deleteComment(commentId);
      } catch {
        // server logs
      }
    });
  }

  function handleReplyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (hasKorean(raw)) {
      setReplyKoreanBlocked(true);
      setReplyText(filterCommentInput(raw));
    } else {
      setReplyKoreanBlocked(false);
      setReplyText(raw);
    }
  }

  async function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUserId || !replyText.trim()) return;

    setIsSubmittingReply(true);
    try {
      await addComment(comment.diaryId, replyText.trim(), comment.id);
      setReplyText("");
      setIsReplying(false);
      setReplyKoreanBlocked(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "답글 등록 실패");
    } finally {
      setIsSubmittingReply(false);
    }
  }

  const level = comment.user.progress?.level ?? 1;

  return (
    <div className="py-3 border-b border-black/10 last:border-0 flex flex-col gap-2">
      {/* 부모 댓글 본문 */}
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-sakura-pink border-2 border-black flex items-center justify-center text-xs font-black shrink-0">
          {level}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-type-black">
              {comment.user.name ?? "학습자"}
            </span>
            <span className="text-[10px] text-type-black/40 font-bold">
              {formatDateKST(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-type-black font-bold mb-2">{comment.content}</p>

          {/* 답글달기 버튼 & 삭제/신고 */}
          <div className="flex items-center gap-3">
            {currentUserId && (
              <button
                type="button"
                onClick={() => setIsReplying(!isReplying)}
                className="text-[11px] font-black text-type-black/70 hover:text-sakura-pink flex items-center gap-1 transition-colors"
              >
                <span>💬</span>
                <span>{isReplying ? "답글 취소" : "답글달기"}</span>
              </button>
            )}

            {isOwn && (
              <button
                onClick={() => handleDelete(comment.id)}
                disabled={isPending}
                className="text-[10px] text-red-400 hover:text-red-600 font-bold disabled:opacity-50"
              >
                삭제
              </button>
            )}
            {!isOwn && currentUserId && (
              <button
                onClick={() => setShowReport(true)}
                className="text-[10px] text-type-black/40 font-bold"
              >
                신고
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 인라인 대댓글 작성 폼 */}
      {isReplying && currentUserId && (
        <div className="ml-8 pl-3 border-l-2 border-sakura-pink/50">
          <form
            onSubmit={handleReplySubmit}
            className="bg-paper-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex flex-col gap-1.5"
          >
            <div className="text-[10px] font-black text-type-black/60 flex items-center gap-1">
              <span>↳</span>
              <span>@{comment.user.name ?? "학습자"}님에게 답글 작성</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={handleReplyChange}
                placeholder="日本語または英語で返信を入力 🌸"
                maxLength={500}
                autoFocus
                className={`flex-1 px-3 py-1.5 bg-canvas-almond/20 border-2 rounded-xl text-xs font-bold text-type-black focus:outline-none focus:bg-white ${replyKoreanBlocked ? "border-red-400" : "border-black"}`}
              />
              <button
                type="submit"
                disabled={isSubmittingReply || !replyText.trim()}
                className="px-3 py-1.5 bg-sakura-pink text-type-black font-black text-xs rounded-xl border-2 border-black shadow-[1px_1px_0px_0px_#000] disabled:opacity-50 shrink-0"
              >
                返信
              </button>
            </div>
            {replyKoreanBlocked && (
              <p className="text-[10px] font-bold text-red-500 px-1">
                ⚠️ 日本語または英語のみ入力できます
              </p>
            )}
          </form>
        </div>
      )}

      {/* 대댓글(답글) 목록 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 pl-3 border-l-2 border-black/15 flex flex-col gap-2 mt-1">
          {comment.replies.map((reply) => {
            const rLevel = reply.user.progress?.level ?? 1;
            const isReplyOwn = reply.userId === currentUserId;

            return (
              <div
                key={reply.id}
                className="bg-canvas-almond/10 rounded-xl p-2.5 border border-black/10 flex items-start gap-2"
              >
                <span className="text-type-black/40 font-bold text-xs mt-0.5">↳</span>
                <div className="w-6 h-6 rounded-full bg-sakura-pink/70 border border-black flex items-center justify-center text-[10px] font-black shrink-0">
                  {rLevel}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-black text-xs text-type-black">
                      {reply.user.name ?? "학습자"}
                    </span>
                    <span className="text-[9px] text-type-black/40 font-bold">
                      {formatDateKST(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-type-black">{reply.content}</p>
                </div>
                {isReplyOwn && (
                  <button
                    onClick={() => handleDelete(reply.id)}
                    disabled={isPending}
                    className="text-[10px] text-red-400 hover:text-red-600 font-bold disabled:opacity-50"
                  >
                    삭제
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showReport && (
        <ReportModal
          targetType="comment"
          targetId={comment.id}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}

