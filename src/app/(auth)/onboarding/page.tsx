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
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-bg-dark px-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Mascot */}
        <div className="text-7xl mb-6">🐕</div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-main dark:text-text-main-dark">
            환영합니다! 👋
          </h1>
          <p className="mt-2 text-sm text-text-sub dark:text-text-sub-dark">
            앱에서 사용할 이름을 설정해주세요
          </p>
        </div>

        {/* Form card */}
        <div className="w-full bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-sm border border-orange-50 dark:border-border-dark">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-border-dark bg-background-light dark:bg-bg-dark focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main dark:text-text-main-dark placeholder:text-text-sub dark:placeholder:text-text-sub-dark text-sm"
              placeholder="닉네임을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full bg-primary hover:bg-primary-hover h-[54px] rounded-full font-bold text-text-main text-base shadow-[0_4px_0_0_#d97706] hover:shadow-[0_2px_0_0_#d97706] hover:translate-y-[2px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "저장 중..." : "시작하기 🎌"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
