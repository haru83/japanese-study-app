// src/components/community/ReportModal.tsx
"use client";

import { useState, useTransition } from "react";
import { reportContent } from "@/actions/community";

type ModalProps = {
  targetType: "diary" | "comment";
  targetId: string;
  onClose: () => void;
};

const REASONS = ["욕설/비하", "스팸", "부적절한 내용", "기타"];

export function ReportModal({ targetType, targetId, onClose }: ModalProps) {
  const [reason, setReason] = useState(REASONS[0]);
  const [done, setDone] = useState(false);
  const [, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      await reportContent(targetType, targetId, reason);
      setDone(true);
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-paper-white rounded-t-[20px] border-t-4 border-black w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="text-center py-4">
            <p className="font-black text-type-black text-base mb-2">
              신고가 접수됐어요
            </p>
            <p className="text-sm text-type-black/60 font-bold mb-4">
              검토 후 조치하겠습니다.
            </p>
            <button
              onClick={onClose}
              className="bg-sakura-pink font-black text-sm px-6 py-2.5 rounded-2xl border-2 border-black"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-black text-type-black text-base mb-4">
              신고하기
            </h3>
            <div className="flex flex-col gap-2 mb-5">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`text-left px-4 py-3 rounded-xl border-2 border-black font-bold text-sm transition-all ${
                    reason === r ? "bg-sakura-pink" : "bg-canvas-almond"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-black font-black text-sm bg-canvas-almond"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl border-2 border-black font-black text-sm bg-sakura-pink"
              >
                신고
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "diary" | "comment";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-xs font-bold text-type-black/60"
      >
        신고
      </button>
      {open && (
        <ReportModal
          targetType={targetType}
          targetId={targetId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
