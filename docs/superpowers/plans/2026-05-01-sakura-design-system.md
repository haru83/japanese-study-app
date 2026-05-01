# Sakura Shiba Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Sakura Shiba (Sticker Bomb Edition) design system from Design.md across every screen of the Japanese study app.

**Architecture:** Replace the current amber/beige neutral theme with the Sakura Blush color palette, Zen Maru Gothic typography, and sticker-bomb layout style (wobbly cards, white sticker borders, yellow solid shadows). Dark mode is removed entirely — Design.md defines only a light theme.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS v4 (`@theme` syntax), Google Fonts (Zen Maru Gothic), TypeScript/TSX

---

## File Map

| File | Change |
|---|---|
| `src/app/globals.css` | Replace all CSS tokens with Design.md palette; add sticker-bomb utility classes |
| `src/app/layout.tsx` | Replace Plus Jakarta Sans with Zen Maru Gothic; remove dark class |
| `src/components/layout/bottom-nav.tsx` | Sakura Blush bg, Sakura Pink active, sticker border-top |
| `src/components/ui/Button.tsx` | Sakura Pink primary, black border sticker-style, no dark variants |
| `src/components/ui/Card.tsx` | Add `variant` prop: `"bubble"` (144px radius, yellow shadow) \| `"wobbly"` (15px radius, rotation) |
| `src/components/ui/ProgressBar.tsx` | Sakura Pink fill, Canvas Almond track |
| `src/components/keigo/LessonCard.tsx` | Wobbly card style, Sakura Pink / Grape Punch accent |
| `src/components/keigo/CategoryFilter.tsx` | Sticker-style pill buttons |
| `src/app/(auth)/login/page.tsx` | Sakura Blush bg, speech bubble card form |
| `src/app/(auth)/onboarding/page.tsx` | Sakura Blush bg, sticker mascot, speech bubble form |
| `src/app/(app)/home/page.tsx` | Sticker bomb layout, wobbly stat cards, mascot overlap |
| `src/app/(app)/diary/page.tsx` | Sakura tabs, wobbly diary cards |
| `src/app/(app)/diary/topic/page.tsx` | Wobbly topic cards with rotation |
| `src/app/(app)/diary/write/page.tsx` | Sakura write form, Canvas Almond bg inputs |
| `src/app/(app)/keigo/page.tsx` | Sakura header, Grape Punch progress bar |
| `src/app/(app)/profile/page.tsx` | Sticker avatar, wobbly stats |
| `src/app/(app)/sticker-board/page.tsx` | Sakura grid, sticker-style slots |

---

## Task 1: globals.css — Design Tokens + Utility Classes

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace entire globals.css with Design.md tokens**

```css
@import "tailwindcss";

@theme {
  /* Design.md palette */
  --color-sakura-blush: #ffe4ec;
  --color-canvas-almond: #ffe9ce;
  --color-paper-white: #ffffff;
  --color-type-black: #000000;
  --color-sakura-pink: #ffb7c5;
  --color-shiba-orange: #ffa54f;
  --color-grape-punch: #8a53ff;
  --color-matcha-green: #3ccb09;

  /* Mapped tokens used by existing components */
  --color-primary: #ffb7c5;
  --color-primary-hover: #ff9ab5;
  --color-primary-dark: #e0869a;
  --color-bg-light: #ffe4ec;
  --color-background-light: #ffe4ec;
  --color-text-main: #000000;
  --color-text-sub: #5a4a4a;

  /* Fonts */
  --font-display: "Zen Maru Gothic", "Noto Sans KR", sans-serif;
  --font-body: "Zen Maru Gothic", "Noto Sans KR", sans-serif;
  --font-japanese: "Noto Sans JP", "Zen Maru Gothic", sans-serif;
}

:root {
  --background: #ffe4ec;
  --foreground: #000000;

  /* Design.md component tokens */
  --radius-bubble: 144px;
  --radius-sticker: 15px;
  --shadow-sticker: 0px 0px 0px 2px #ffd80c;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: "Zen Maru Gothic", "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Sticker-bomb utility classes */
.sticker {
  border: 5px solid white;
  filter: drop-shadow(0 4px 0 rgba(0, 0, 0, 0.12));
}

.bubble-card {
  background: #ffffff;
  border-radius: 144px;
  box-shadow: 0px 0px 0px 2px #ffd80c;
}

.wobbly-1 { transform: rotate(-1.5deg); }
.wobbly-2 { transform: rotate(1deg); }
.wobbly-3 { transform: rotate(-0.8deg); }
.wobbly-4 { transform: rotate(1.8deg); }
.wobbly-5 { transform: rotate(-2deg); }

.shadow-sticker {
  box-shadow: 0px 0px 0px 2px #ffd80c;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #ffb7c5; border-radius: 3px; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 2: Verify build compiles**

```bash
cd /home/wetter1117/workspace/japanese-study-app && npx next build 2>&1 | tail -20
```

Expected: No CSS compilation errors (TypeScript errors in pages are expected until later tasks).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "design: replace CSS tokens with Sakura Shiba design system"
```

---

## Task 2: Root layout.tsx — Zen Maru Gothic Font

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace font imports**

```tsx
import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-maru",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "다이어리 일본어",
  description: "일기 쓰기와 경어 학습을 한 번에",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${zenMaruGothic.variable} ${notoSansKR.variable} font-body bg-sakura-blush min-h-screen flex justify-center`}
      >
        <div className="w-full max-w-md min-h-screen bg-sakura-blush shadow-2xl overflow-hidden relative">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "design: switch to Zen Maru Gothic font"
```

---

## Task 3: Shared UI Components

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/components/ui/ProgressBar.tsx`

- [ ] **Step 1: Rewrite Button.tsx**

```tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "grape" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black",
          {
            "bg-sakura-pink text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]":
              variant === "primary",
            "bg-canvas-almond text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]":
              variant === "secondary",
            "bg-grape-punch text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]":
              variant === "grape",
            "bg-transparent border-transparent text-type-black hover:bg-sakura-pink/20":
              variant === "ghost",
            "bg-red-400 text-white shadow-[4px_4px_0px_0px_#000]":
              variant === "danger",
            "px-3 py-1.5 text-sm rounded-xl": size === "sm",
            "px-5 py-2.5 text-base rounded-2xl": size === "md",
            "px-6 py-3.5 text-lg w-full rounded-2xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

- [ ] **Step 2: Rewrite Card.tsx**

```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "bubble" | "wobbly" | "flat";
  wobble?: 1 | 2 | 3 | 4 | 5;
}

const WOBBLE_CLASS = {
  1: "wobbly-1",
  2: "wobbly-2",
  3: "wobbly-3",
  4: "wobbly-4",
  5: "wobbly-5",
};

export function Card({ children, className, onClick, variant = "flat", wobble }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-paper-white border-2 border-black",
        variant === "bubble" && "rounded-[144px] shadow-[0px_0px_0px_2px_#ffd80c]",
        variant === "wobbly" && "rounded-[15px] shadow-[4px_4px_0px_0px_#000]",
        variant === "flat" && "rounded-2xl shadow-[4px_4px_0px_0px_#000]",
        wobble && WOBBLE_CLASS[wobble],
        onClick && "cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite ProgressBar.tsx**

```tsx
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: "primary" | "grape" | "matcha";
}

export function ProgressBar({ value, className, color = "primary" }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-canvas-almond rounded-full h-3 border-2 border-black overflow-hidden", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          color === "primary" && "bg-sakura-pink",
          color === "grape" && "bg-grape-punch",
          color === "matcha" && "bg-matcha-green",
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Card.tsx src/components/ui/ProgressBar.tsx
git commit -m "design: redesign shared UI components with sticker-bomb style"
```

---

## Task 4: Bottom Navigation

**Files:**
- Modify: `src/components/layout/bottom-nav.tsx`

- [ ] **Step 1: Rewrite BottomNav**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/home", icon: "home", label: "홈" },
  { href: "/diary", icon: "book_2", label: "일기" },
  { href: "/keigo", icon: "record_voice_over", label: "경어" },
  { href: "/profile", icon: "face", label: "프로필" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-paper-white border-t-4 border-black flex justify-around items-end pb-[env(safe-area-inset-bottom)] pt-3 h-[85px] z-50">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/home" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 w-1/4 pb-2 transition-transform ${
              isActive ? "scale-110" : "scale-100 opacity-50"
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${isActive ? "text-black" : "text-black"}`}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={`text-xs font-bold text-black ${isActive ? "" : "opacity-60"}`}>
              {item.label}
            </span>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-sakura-pink border border-black" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/bottom-nav.tsx
git commit -m "design: redesign bottom nav with sticker-bomb style"
```

---

## Task 5: Keigo Components

**Files:**
- Modify: `src/components/keigo/LessonCard.tsx`
- Modify: `src/components/keigo/CategoryFilter.tsx`

- [ ] **Step 1: Rewrite LessonCard.tsx**

```tsx
import Link from "next/link";
import type { Lesson } from "@/types/lesson";
import { CATEGORY_LABELS } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  completed?: boolean;
}

const CATEGORY_BG = {
  business: "bg-grape-punch text-white",
  hospitality: "bg-sakura-pink text-black",
  social: "bg-matcha-green text-black",
};

const WOBBLE = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

export function LessonCard({ lesson, completed }: LessonCardProps) {
  const wobble = WOBBLE[lesson.id % WOBBLE.length];
  return (
    <Link
      href={`/keigo/lessons/${lesson.id}`}
      className={`relative bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-95 flex gap-3 ${wobble}`}
    >
      {/* Thumbnail sticker */}
      <div className="w-14 h-14 rounded-xl bg-canvas-almond border-2 border-black flex items-center justify-center text-3xl flex-shrink-0">
        {lesson.thumbnail}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black ${CATEGORY_BG[lesson.category]}`}
          >
            {CATEGORY_LABELS[lesson.category]}
          </span>
          {completed && (
            <span className="text-xs bg-matcha-green text-black px-2 py-0.5 rounded-full font-bold border-2 border-black">
              완료 ✓
            </span>
          )}
        </div>
        <p className="font-bold text-type-black text-sm leading-snug">
          {lesson.title}
        </p>
        <p className="text-xs text-type-black/60 mt-1">
          대화 {lesson.dialogue.length}줄 · 퀴즈 {lesson.quiz.length}문제
        </p>
      </div>

      <div className="self-center text-type-black">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Rewrite CategoryFilter.tsx**

```bash
cat /home/wetter1117/workspace/japanese-study-app/src/components/keigo/CategoryFilter.tsx
```

Read the current file, then replace with sticker-pill style:

```tsx
"use client";

import type { LessonCategory } from "@/types/lesson";

interface CategoryFilterProps {
  active: LessonCategory;
  onChange: (c: LessonCategory) => void;
}

const CATEGORIES: { value: LessonCategory; label: string; bg: string }[] = [
  { value: "all", label: "전체", bg: "bg-type-black text-white" },
  { value: "business", label: "비즈니스", bg: "bg-grape-punch text-white" },
  { value: "hospitality", label: "서비스업", bg: "bg-sakura-pink text-black" },
  { value: "social", label: "일상", bg: "bg-shiba-orange text-black" },
];

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 border-black transition-all ${
            active === cat.value
              ? `${cat.bg} shadow-[3px_3px_0px_0px_#000]`
              : "bg-paper-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/keigo/LessonCard.tsx src/components/keigo/CategoryFilter.tsx
git commit -m "design: redesign keigo components with sticker-bomb style"
```

---

## Task 6: Login Page

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`

- [ ] **Step 1: Rewrite LoginForm JSX (keep all logic intact, only change className/structure)**

Replace the return value of `LoginForm` with:

```tsx
  const inputClass =
    "w-full px-4 py-3.5 rounded-2xl border-2 border-black bg-canvas-almond focus:outline-none focus:ring-2 focus:ring-sakura-pink text-type-black placeholder:text-type-black/40 text-sm font-bold";

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush">
      {/* Logo header */}
      <header className="flex items-center justify-center pt-12 pb-2 px-6">
        <div className="flex items-center gap-2 border-2 border-black bg-paper-white px-4 py-2 rounded-full shadow-[3px_3px_0px_0px_#000]">
          <span className="text-xl">🐕</span>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(auth)/login/page.tsx
git commit -m "design: sakura-bomb redesign for login page"
```

---

## Task 7: Onboarding Page

**Files:**
- Modify: `src/app/(auth)/onboarding/page.tsx`

- [ ] **Step 1: Rewrite onboarding JSX (keep all logic)**

Replace the return value with:

```tsx
  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {/* Mascot sticker */}
        <div className="text-8xl wobbly-2 sticker inline-block">🐕</div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-type-black">
            환영합니다! 👋
          </h1>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(auth)/onboarding/page.tsx
git commit -m "design: sakura-bomb redesign for onboarding page"
```

---

## Task 8: Home Page

**Files:**
- Modify: `src/app/(app)/home/page.tsx`

- [ ] **Step 1: Rewrite Home page JSX (keep all data fetching logic)**

Replace the return value with:

```tsx
  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Header */}
      <div className="bg-canvas-almond px-5 pt-12 pb-6 border-b-4 border-black">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-type-black/60 text-sm font-bold">안녕하세요!</p>
            <h1 className="text-2xl font-black text-type-black">
              {profile?.name ?? session?.user?.name ?? "학습자"} 님 👋
            </h1>
          </div>
          <div className="text-6xl wobbly-2 sticker">🐕</div>
        </div>

        {/* Level & XP */}
        <div className="bg-paper-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-grape-punch text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black">
                Lv.{level}
              </span>
              <span className="text-sm font-bold text-type-black">
                {LEVEL_TITLES[level - 1]}
              </span>
            </div>
            <span className="text-xs font-bold text-type-black/60">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]} XP
            </span>
          </div>
          <ProgressBar value={xpPercent} />
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-[30px]">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "일기", value: diaries.length, icon: "📖", href: "/diary", bg: "bg-sakura-pink", wobble: "wobbly-1" },
            { label: "스탬프", value: progress?.totalStamps ?? 0, icon: "⭐", href: "/sticker-board", bg: "bg-shiba-orange", wobble: "wobbly-3" },
            { label: "경어 레슨", value: keigoCount, icon: "🎯", href: "/keigo", bg: "bg-grape-punch text-white", wobble: "wobbly-5" },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`${stat.bg} ${stat.wobble} rounded-[15px] p-3 text-center border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-black text-type-black">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-type-black/70">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Main action cards */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/diary/topic"
            className="bg-sakura-pink wobbly-2 rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <div className="text-4xl mb-3">📖</div>
            <h3 className="font-black text-type-black">일기 쓰기</h3>
            <p className="text-xs text-type-black/60 font-bold mt-1">+10 XP / +1 스탬프</p>
            <div className="mt-3 bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl inline-block border-2 border-black">
              시작하기
            </div>
          </Link>

          <Link
            href="/keigo"
            className="bg-grape-punch wobbly-4 rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-black text-white">경어 레슨</h3>
            <p className="text-xs text-white/70 font-bold mt-1">+15 XP / +1 스탬프</p>
            <div className="mt-3 bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl inline-block border-2 border-black">
              학습하기
            </div>
          </Link>
        </div>

        {/* Learning shortcuts */}
        <div className="bg-paper-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="px-5 py-3 border-b-2 border-black bg-canvas-almond">
            <h2 className="font-black text-type-black text-sm">학습 자료 📚</h2>
          </div>
          {[
            { href: "/learning/grammar", icon: "menu_book", label: "문법 정리", desc: "경어 문법 모음" },
            { href: "/learning/vocabulary", icon: "translate", label: "어휘 목록", desc: "경어 필수 어휘" },
            { href: "/study", icon: "history", label: "학습 현황", desc: `일기 ${diaries.length}개 작성` },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-sakura-blush transition-colors ${
                i < arr.length - 1 ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="material-symbols-outlined text-sakura-pink text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-type-black">{item.label}</p>
                <p className="text-xs text-type-black/60">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-type-black/40 text-sm">chevron_right</span>
            </Link>
          ))}
        </div>

        {/* Recent diary */}
        {diaries.length > 0 && (
          <div>
            <h2 className="font-black text-type-black mb-3 text-sm">최근 일기</h2>
            <div className="bg-paper-white wobbly-1 rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
              <p className="font-black text-type-black text-sm">{diaries[0].title}</p>
              <p className="text-xs text-type-black/60 mt-1 line-clamp-2">{diaries[0].content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(app)/home/page.tsx
git commit -m "design: sakura-bomb redesign for home page"
```

---

## Task 9: Diary Page

**Files:**
- Modify: `src/app/(app)/diary/page.tsx`

- [ ] **Step 1: Update MyDiaries component JSX**

Replace the `MyDiaries` return value with:

```tsx
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/diary/topic"
        className="w-full flex items-center justify-center gap-2 bg-sakura-pink font-black text-type-black h-[52px] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-[0.98]"
      >
        <span className="material-symbols-outlined">add</span>
        새 일기 쓰기
      </Link>

      {diaries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <span className="text-6xl wobbly-3 sticker inline-block">✏️</span>
          <p className="text-type-black/60 text-center text-sm font-bold">
            아직 작성한 일기가 없어요.
            <br />
            오늘의 일기를 써볼까요?
          </p>
        </div>
      ) : (
        diaries.map((diary, i) => {
          const wobbles = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];
          const w = wobbles[i % wobbles.length];
          return (
            <div
              key={diary.id}
              className={`relative flex items-center gap-4 bg-paper-white p-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] ${w}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-black text-type-black truncate">{diary.title}</h3>
                  {diary.mood && (
                    <span className="text-lg shrink-0">{MOOD_EMOJI[diary.mood] ?? "😊"}</span>
                  )}
                </div>
                <p className="text-sm text-type-black/60 line-clamp-1 mb-1">{diary.content}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-sakura-pink">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>{formatDate(diary.createdAt)} 학습 완료</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-1">
                <div className="relative flex items-center justify-center size-10 bg-matcha-green border-2 border-black rounded-full text-white rotate-12">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
                <span className="text-[10px] font-black text-type-black">완료!</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
```

- [ ] **Step 2: Update LearnDiariesPreview component JSX**

Replace the `LearnDiariesPreview` return value with:

```tsx
  return (
    <div className="flex flex-col gap-3">
      {/* Progress summary */}
      <div className="bg-paper-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-black text-type-black">전체 진행률</span>
          <span className="text-sm font-black text-grape-punch">
            {completedIds.length} / {learningDiaries.length}
          </span>
        </div>
        <ProgressBar value={(completedIds.length / learningDiaries.length) * 100} color="grape" />
      </div>

      <Link
        href="/diary/learn"
        className="w-full flex items-center justify-center gap-2 bg-grape-punch font-black text-white h-[52px] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-[0.98]"
      >
        <span className="text-lg">📖</span>
        전체 목록 보기
      </Link>

      {recent.map((diary, i) => {
        const wobbles = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];
        const w = wobbles[i % wobbles.length];
        return (
          <Link
            key={diary.id}
            href={`/diary/learn/${diary.id}`}
            className={`flex items-center gap-3 bg-paper-white p-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${w}`}
          >
            <span className="text-2xl">{diary.thumbnail}</span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm text-type-black truncate">{diary.title}</p>
              <p className="text-xs text-type-black/60 font-bold">{diary.titleKo}</p>
            </div>
            {completedIds.includes(diary.id) ? (
              <span className="text-lg">✅</span>
            ) : (
              <span className="material-symbols-outlined text-type-black/40 text-sm">chevron_right</span>
            )}
          </Link>
        );
      })}
    </div>
  );
```

- [ ] **Step 3: Update DiaryPage main return**

Replace the `DiaryPage` return value with:

```tsx
  return (
    <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4 bg-sakura-blush">
      {/* Mascot header */}
      <header className="flex flex-col items-center justify-center text-center gap-3 mb-2">
        <div className="text-7xl wobbly-2 sticker inline-block">🐕</div>
        <div>
          <h1 className="text-2xl font-black text-type-black tracking-tight leading-tight">일기</h1>
          <p className="text-sm text-type-black/60 font-bold mt-1">오늘도 참 잘했어요! 🐕</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 bg-canvas-almond p-1 rounded-full border-2 border-black">
        <Link
          href="/diary"
          className={`flex-1 text-center text-sm font-black py-2 rounded-full transition-all ${
            !isLearn
              ? "bg-paper-white text-type-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              : "text-type-black/60"
          }`}
        >
          내 일기
        </Link>
        <Link
          href="/diary?tab=learn"
          className={`flex-1 text-center text-sm font-black py-2 rounded-full transition-all ${
            isLearn
              ? "bg-paper-white text-type-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              : "text-type-black/60"
          }`}
        >
          학습 일기
        </Link>
      </div>

      {isLearn ? <LearnDiariesPreview /> : <MyDiaries />}
    </main>
  );
```

- [ ] **Step 4: Commit**

```bash
git add src/app/(app)/diary/page.tsx
git commit -m "design: sakura-bomb redesign for diary page"
```

---

## Task 10: Diary Topic & Write Pages

**Files:**
- Modify: `src/app/(app)/diary/topic/page.tsx`
- Modify: `src/app/(app)/diary/write/page.tsx`

- [ ] **Step 1: Rewrite topic/page.tsx return value**

```tsx
  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black flex items-center gap-3">
        <Link
          href="/diary"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black -ml-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black">오늘의 주제 선택</h1>
          <p className="text-sm text-type-black/60 font-bold">어떤 주제로 일기를 쓸까요?</p>
        </div>
      </div>

      <div className="px-5 py-4 grid grid-cols-1 gap-3">
        {allTopics.map((topic, i) => {
          const wobbles = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];
          const bgs = ["bg-paper-white", "bg-sakura-pink", "bg-canvas-almond", "bg-paper-white", "bg-sakura-pink"];
          const w = wobbles[i % wobbles.length];
          const bg = bgs[i % bgs.length];
          return (
            <Link
              key={topic.id}
              href={`/diary/write?topic=${encodeURIComponent(topic.titleJp)}&topicKo=${encodeURIComponent(topic.title)}`}
              className={`${bg} ${w} rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-4 transition-all active:scale-95`}
            >
              <div className="flex-1">
                <p className="font-black text-type-black">{topic.title}</p>
                <p className="text-sm text-type-black/60 font-bold mt-0.5">{topic.titleJp}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs bg-grape-punch text-white px-2 py-0.5 rounded-full font-black border-2 border-black">
                  {topic.category}
                </span>
                <span className="text-xs">{DIFFICULTY_STARS(topic.difficulty)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
```

- [ ] **Step 2: Rewrite diary/write/page.tsx — completion screen**

Replace the `if (done)` return:

```tsx
    return (
      <div className="min-h-screen bg-sakura-blush flex flex-col items-center justify-center px-6 gap-6">
        <div className="text-8xl animate-bounce wobbly-2 sticker inline-block">⭐</div>
        <h2 className="text-3xl font-black text-type-black">일기 완성!</h2>
        <div className="bg-paper-white border-2 border-black rounded-2xl px-6 py-4 text-center shadow-[4px_4px_0px_0px_#000]">
          <p className="text-grape-punch font-black text-2xl">+{xpGained} XP</p>
          <p className="text-type-black/60 font-bold text-sm mt-1">+1 스탬프 획득!</p>
        </div>
        <Button size="lg" onClick={() => router.push("/home")} className="w-full max-w-xs">
          홈으로
        </Button>
      </div>
    );
```

- [ ] **Step 3: Rewrite diary/write/page.tsx — main write form**

Replace the main write form return:

```tsx
  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black -ml-2 mb-1"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-type-black">{topicKo}</h1>
        {topicJp && <p className="text-sm text-type-black/60 font-bold mt-0.5">{topicJp}</p>}
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-black text-type-black mb-1.5">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`${topicKo} 일기`}
            className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-paper-white text-type-black focus:outline-none focus:ring-2 focus:ring-sakura-pink font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-black text-type-black mb-2">오늘의 기분</label>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl border-2 border-black transition-all font-bold ${
                  mood === m.id
                    ? "bg-sakura-pink shadow-[3px_3px_0px_0px_#000]"
                    : "bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px]">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-type-black mb-1.5">
            일기 내용 (일본어로 써보세요 🇯🇵)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日は..."
            rows={8}
            required
            className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-paper-white text-type-black focus:outline-none focus:ring-2 focus:ring-sakura-pink resize-none font-bold"
          />
          <p className="text-xs text-type-black/60 font-bold mt-1 text-right">{content.length}자</p>
        </div>

        <Button type="submit" size="lg" disabled={loading || !content.trim()}>
          {loading ? "저장 중..." : "일기 완성! (+10 XP)"}
        </Button>
      </form>
    </div>
  );
```

- [ ] **Step 4: Commit**

```bash
git add src/app/(app)/diary/topic/page.tsx src/app/(app)/diary/write/page.tsx
git commit -m "design: sakura-bomb redesign for diary topic and write pages"
```

---

## Task 11: Keigo Page

**Files:**
- Modify: `src/app/(app)/keigo/page.tsx`

- [ ] **Step 1: Rewrite keigo/page.tsx return value**

```tsx
  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <h1 className="text-2xl font-black text-type-black">경어 레슨 🎯</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          {completedCount} / {lessons.length} 완료
        </p>
        <div className="mt-3">
          <ProgressBar value={(completedCount / lessons.length) * 100} color="grape" />
        </div>
      </div>

      <div className="px-5 py-4">
        <CategoryFilter active={category} onChange={setCategory} />
        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={completedLessons.includes(lesson.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(app)/keigo/page.tsx
git commit -m "design: sakura-bomb redesign for keigo page"
```

---

## Task 12: Profile Page

**Files:**
- Modify: `src/app/(app)/profile/page.tsx`

- [ ] **Step 1: Rewrite profile/page.tsx return value (keep all data fetching)**

```tsx
  return (
    <main className="flex flex-col gap-5 w-full overflow-hidden pt-4 pb-6 bg-sakura-blush min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4">
        <div className="w-10" />
        <h1 className="text-lg font-black text-type-black">프로필</h1>
        <div className="flex gap-2">
          {session.user.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors text-white text-xs font-black flex items-center gap-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              관리자
            </Link>
          )}
          <Link
            href="/settings"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black"
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
          </Link>
        </div>
      </header>

      {/* Avatar sticker */}
      <section className="flex flex-col items-center px-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-canvas-almond overflow-hidden relative z-10">
            <Image src={displayImage} alt="Avatar" fill className="object-cover" />
          </div>
        </div>
        <div className="mt-3 text-center">
          <h2 className="text-xl font-black text-type-black flex items-center justify-center gap-1">
            {displayName}
            <span className="material-symbols-outlined text-shiba-orange text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </h2>
          <p className="text-grape-punch text-sm font-black mt-1">
            {LEVEL_TITLES[level - 1]} · Lv.{level}
          </p>
        </div>
      </section>

      {/* XP Bar */}
      <section className="px-5">
        <div className="bg-paper-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-black text-type-black">레벨 {level}</span>
            <span className="text-type-black/60 font-bold">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]} XP
            </span>
          </div>
          <ProgressBar value={xpPercent} />
          {level < MAX_LEVEL && (
            <p className="text-xs text-type-black/60 font-bold mt-1.5 text-right">
              다음 레벨까지 {nextXp - xp} XP
            </p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="px-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "총 XP", value: xp, icon: "⚡", bg: "bg-shiba-orange", wobble: "wobbly-1" },
            { label: "스탬프", value: stamps, icon: "⭐", bg: "bg-sakura-pink", wobble: "wobbly-3" },
            { label: "경어 레슨", value: keigoCount, icon: "🎯", bg: "bg-grape-punch", wobble: "wobbly-5" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.wobble} p-3 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col items-center gap-1.5`}
            >
              <div className="text-2xl">{stat.icon}</div>
              <p className="text-xs text-type-black font-black">{stat.label}</p>
              <p className="text-lg font-black text-type-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="px-5">
        <div className="bg-paper-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          {[
            { href: "/wardrobe", icon: "checkroom", label: "옷장", desc: "시바견 코디하기" },
            { href: "/sticker-board", icon: "stars", label: "스티커 보드", desc: `${stamps}개 보유` },
            { href: "/learning/grammar", icon: "menu_book", label: "문법 정리", desc: "경어 문법 모음" },
            { href: "/learning/vocabulary", icon: "translate", label: "어휘 목록", desc: "경어 필수 어휘" },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-sakura-blush transition-colors ${
                i < arr.length - 1 ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="material-symbols-outlined text-sakura-pink">{item.icon}</span>
              <div className="flex-1">
                <p className="font-black text-type-black text-sm">{item.label}</p>
                <p className="text-xs text-type-black/60 font-bold">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-type-black/40 text-sm">chevron_right</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(app)/profile/page.tsx
git commit -m "design: sakura-bomb redesign for profile page"
```

---

## Task 13: Sticker Board Page

**Files:**
- Modify: `src/app/(app)/sticker-board/page.tsx`

- [ ] **Step 1: Rewrite sticker-board/page.tsx**

```tsx
import { getUserProfile } from "@/actions/user";
import { ProgressBar } from "@/components/ui/ProgressBar";

function StickerSlot({ filled, index }: { filled: boolean; index: number }) {
  const wobbles = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];
  const w = wobbles[index % wobbles.length];
  return (
    <div
      className={`aspect-square rounded-[15px] flex items-center justify-center text-2xl border-2 border-black ${
        filled
          ? `bg-sakura-pink shadow-[3px_3px_0px_0px_#000] ${w}`
          : "bg-paper-white"
      }`}
    >
      {filled ? (index % 5 === 0 ? "🌟" : index % 3 === 0 ? "⭐" : "✨") : ""}
    </div>
  );
}

export default async function StickerBoardPage() {
  const profile = await getUserProfile();
  const stamps = profile?.progress?.totalStamps ?? 0;
  const TOTAL_SLOTS = 30;

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <h1 className="text-2xl font-black text-type-black">스티커 보드 🌟</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          {stamps} / {TOTAL_SLOTS} 개 수집
        </p>
      </div>

      <div className="px-5 py-4">
        <div className="bg-paper-white rounded-2xl p-4 mb-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-type-black font-black">진행도</span>
            <span className="text-grape-punch font-black">
              {Math.round((stamps / TOTAL_SLOTS) * 100)}%
            </span>
          </div>
          <ProgressBar value={Math.min(100, (stamps / TOTAL_SLOTS) * 100)} color="grape" />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: TOTAL_SLOTS }, (_, i) => (
            <StickerSlot key={i} index={i} filled={i < stamps} />
          ))}
        </div>

        <p className="text-center text-sm text-type-black/60 font-bold mt-4">
          일기 또는 경어 레슨 완료 시 스탬프를 획득해요 ⭐
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(app)/sticker-board/page.tsx
git commit -m "design: sakura-bomb redesign for sticker board page"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Run TypeScript check**

```bash
cd /home/wetter1117/workspace/japanese-study-app && npx tsc --noEmit 2>&1 | head -40
```

Fix any type errors.

- [ ] **Step 2: Start dev server and visually verify**

```bash
cd /home/wetter1117/workspace/japanese-study-app && npx next dev -p 3000
```

Visit these routes and confirm Design.md is applied:
- `/login` — Sakura Blush bg, speech bubble card, black border buttons
- `/home` — Wobbly stats, sticker-bomb layout
- `/diary` — Wobbly cards, Sakura tabs
- `/keigo` — Grape Punch progress, wobbly lesson cards
- `/profile` — Sticker-style avatar, wobbly stats

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "design: complete Sakura Shiba sticker-bomb design system rollout"
```
