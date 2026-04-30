"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

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
        if (!res.ok) throw new Error(data.message || "회원가입에 실패했습니다.");

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
    "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main dark:text-text-main-dark placeholder:text-text-sub dark:placeholder:text-text-sub-dark";

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Logo */}
      <div className="flex items-center justify-center pt-10 pb-2 z-10 w-full">
        <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            edit_note
          </span>
          <span className="text-text-main dark:text-text-main-dark font-bold text-base tracking-tight">
            다이어리 일본어
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center w-full px-8 pb-6">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-text-main dark:text-text-main-dark tracking-tight text-[28px] font-extrabold leading-tight">
            {isLogin ? "다시 오셨군요!" : "환영합니다!"}
          </h1>
          <p className="text-text-sub dark:text-text-sub-dark text-base font-medium">
            {isLogin
              ? "오늘도 일본어 일기를 써보아요"
              : "함께 일본어 일기를 시작해보아요"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
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
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all h-[56px] rounded-full font-bold text-text-main text-[17px] shadow-[0_4px_0_0_#d97706] hover:shadow-[0_2px_0_0_#d97706] hover:translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[15px] font-medium text-text-sub dark:text-text-sub-dark"
          >
            {isLogin ? (
              <>
                계정이 없으신가요?{" "}
                <span className="text-primary font-bold">회원가입</span>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{" "}
                <span className="text-primary font-bold">로그인</span>
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
