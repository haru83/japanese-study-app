"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
        if (!agreedToTerms) {
          throw new Error("이용약관 및 개인정보 처리방침에 동의해 주세요.");
        }

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
        왕왕 일본어
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
                name="name"
                placeholder="닉네임"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClass}
              required
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={inputClass}
                required
              />
            )}

            {!isLogin && (
              <label className="flex items-start gap-2.5 px-1 py-1 cursor-pointer select-none text-left">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-2 border-black accent-sakura-pink shrink-0 cursor-pointer"
                />
                <span className="text-xs font-bold text-type-black/80 leading-snug">
                  <span className="text-red-500 font-black">[필수]</span>{" "}
                  <Link href="/terms" target="_blank" className="text-grape-punch underline hover:text-black">
                    이용약관
                  </Link>{" "}
                  및{" "}
                  <Link href="/privacy" target="_blank" className="text-grape-punch underline hover:text-black">
                    개인정보 처리방침
                  </Link>
                  에 동의합니다.
                </span>
              </label>
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

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black/10" />
            </div>
            <span className="relative bg-paper-white px-3 text-xs font-bold text-type-black/50">
              또는
            </span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full bg-paper-white hover:bg-canvas-almond active:scale-[0.98] transition-all h-[54px] rounded-2xl font-black text-type-black text-base border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google로 시작하기</span>
          </button>

          {/* Policy Notice */}
          <div className="mt-4 pt-3 border-t border-black/10 text-center">
            <p className="text-[11px] font-bold text-type-black/50 leading-relaxed">
              계속 진행하시면 왕왕 일본어의{" "}
              <Link href="/terms" className="text-grape-punch underline hover:text-black">
                이용약관
              </Link>{" "}
              및{" "}
              <Link href="/privacy" className="text-grape-punch underline hover:text-black">
                개인정보 처리방침
              </Link>
              에 동의하는 것으로 간주됩니다.
            </p>
          </div>
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
