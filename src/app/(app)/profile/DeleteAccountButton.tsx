"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { deleteAccount } from "@/actions/user";

export function DeleteAccountButton() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      await deleteAccount();
      await signOut({ callbackUrl: `${window.location.origin}/login` });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "탈퇴 처리 중 오류가 발생했습니다.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-4 px-5 py-4 w-full text-left hover:bg-red-50 transition-colors text-red-500"
      >
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <p className="text-sm font-black text-red-600">회원 탈퇴</p>
          <p className="text-xs text-red-400 font-bold">계정 및 모든 학습 데이터 삭제</p>
        </div>
        <span className="text-red-300">→</span>
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-paper-white rounded-[24px] border-3 border-black shadow-[6px_6px_0px_0px_#000] p-6 max-w-sm w-full space-y-4 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto text-2xl">
              😢
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-type-black">정말 탈퇴하시겠습니까?</h3>
              <p className="text-xs font-bold text-type-black/60 leading-relaxed">
                탈퇴 시 지금까지 모은 <strong className="text-type-black">경험치(XP), 스트릭, 스탬프, 작성한 일기 및 게시글</strong>이 모두 영구 삭제되며 복구할 수 없습니다.
              </p>
            </div>

            {error && (
              <p className="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex-1 py-3 bg-canvas-almond hover:bg-black/10 text-type-black font-black text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-black text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50"
              >
                {loading ? "처리 중..." : "탈퇴하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
