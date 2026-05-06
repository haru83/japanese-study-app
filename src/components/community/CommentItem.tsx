// src/components/community/CommentItem.tsx
"use client";

import { useState } from "react";
import { deleteComment } from "@/actions/community";
import { ReportModal } from "./ReportModal";

type Props = {
  comment: {
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
  currentUserId?: string;
};

export function CommentItem({ comment, currentUserId }: Props) {
  const [showReport, setShowReport] = useState(false);
  const isOwn = comment.userId === currentUserId;
  const level = comment.user.progress?.level ?? 1;

  return (
    <div className="flex gap-3 py-3 border-b border-black/10 last:border-0">
      <div className="w-8 h-8 rounded-full bg-sakura-pink border-2 border-black flex items-center justify-center text-xs font-black shrink-0">
        {level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-black text-type-black">
            {comment.user.name ?? "학습자"}
          </span>
          <span className="text-[10px] text-type-black/40 font-bold">
            {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <p className="text-sm text-type-black font-bold">{comment.content}</p>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        {isOwn && (
          <form action={deleteComment.bind(null, comment.id)}>
            <button
              type="submit"
              className="text-[10px] text-red-400 font-bold"
            >
              삭제
            </button>
          </form>
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
