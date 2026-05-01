"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateUserName } from "@/actions/user";

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserName(name);
      router.push("/home");
      router.refresh();
    } catch {
      alert("이름 설정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {/* Mascot sticker */}
        <div className="text-8xl wobbly-2 sticker inline-block">🐕</div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-type-black">환영합니다! 👋</h1>
          <p className="mt-2 text-sm text-type-black/60 font-medium">
            앱에서 사용할 이름을 설정해주세요
          </p>
        </div>

        {/* Form card */}
        <div className="w-full bg-paper-white rounded-3xl p-6 border-2 border-black shadow-[6px_6px_0px_0px_#000]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-black bg-canvas-almond focus:outline-none focus:ring-2 focus:ring-sakura-pink text-type-black placeholder:text-type-black/40 text-sm font-bold"
              placeholder="닉네임을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full bg-sakura-pink h-[54px] rounded-2xl font-black text-type-black text-base border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "저장 중..." : "시작하기 🎌"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
