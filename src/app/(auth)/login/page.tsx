"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode");
  const [isLogin, setIsLogin] = useState(initialMode !== "signup");

  useEffect(() => {
    setIsLogin(initialMode !== "signup");
  }, [initialMode]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          router.push("/home");
          router.refresh();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || "회원가입에 실패했습니다.");

        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        router.push("/onboarding");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-2xl border-2 border-black bg-canvas-almond focus:outline-none focus:ring-2 focus:ring-sakura-pink text-type-black placeholder:text-type-black/40 text-sm font-bold";

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush">
      {/* Logo header */}
      <header className="flex items-center justify-center pt-12 pb-2 px-6">
    <div className="flex items-center gap-2 border-2 border-black bg-paper-white px-4 py-2 rounded-full shadow-[3px_3px_0px_0px_#000]">
      <ShibaAvatar level={1} size={24} />
      <span className="text-type-black font-bold text-base tracking-tight">
        사쿠라 시바
      </span>
    </div>
      </header>

      <div className="flex flex-1 flex-col px-6 pt-8 pb-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-type-black tracking-tight">
            {isLogin ? "다시 오셨군요! 👋" : "환영합니다! 🎌"}
          </h1>
          <p className="text-type-black/60 text-sm mt-2 font-medium">
            {isLogin
              ? "오늘도 일본어 일기를 써보아요"
              : "함께 일본어 일기를 시작해보아요"}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-paper-white rounded-3xl p-6 border-2 border-black shadow-[6px_6px_0px_0px_#000]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {!isLogin && (
              <input
                type="text"
                placeholder="닉네임"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                required
              />
            )}
            <input
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClass}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={inputClass}
                required
              />
            )}

            {error && (
              <div className="bg-red-100 border-2 border-red-400 rounded-2xl px-4 py-3">
                <p className="text-red-600 text-sm text-center font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sakura-pink hover:bg-primary-hover active:scale-[0.98] transition-all h-[54px] rounded-2xl font-black text-type-black text-base border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
            </button>
          </form>
        </div>

        {/* Toggle */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-type-black/70"
          >
            {isLogin ? (
              <>
                계정이 없으신가요?{" "}
                <span className="text-grape-punch underline">회원가입</span>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{" "}
                <span className="text-grape-punch underline">로그인</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
