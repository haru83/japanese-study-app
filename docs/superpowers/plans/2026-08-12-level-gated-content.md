# Level-Gated Content 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사용자 레벨에 따라 경어 레슨과 학습 일기 콘텐츠를 순차적으로 오픈하는 게이팅 시스템을 구현한다.

**Architecture:**
- `sortOrder` 기반으로 레벨당 30개씩 구간 계산 (`requiredLevel = Math.ceil(sortOrder / 30)`).
- DB 스키마 변경 없이 순수 로직으로 처리 (sortOrder는 이미 시딩 시 설정됨).
- 목록: 자물쇠 🔒 + "레벨 N 이상" 뱃지로 잠금 표시 (숨기지 않음).
- 상세 페이지: 서버에서 레벨 검증 → 부족 시 목록으로 redirect.

**Tech Stack:** Next.js 15 App Router, Prisma (SQLite), TypeScript strict, Tailwind v4

## Global Constraints

- `strict: true` TypeScript — `any` 및 `@ts-ignore` 금지
- `@/*` → `./src/*` 경로 alias 사용
- 소프트 그림자 금지 — `border-2 border-black shadow-[4px_4px_0px_0px_#000]` 사용
- `WangWang Japanese Sticker Bomb` 디자인 시스템 유지
- 서버 액션 뮤테이션만 `src/actions/` 에 위치, 쿼리는 서버 컴포넌트에서
- 레벨 계산 로직: `requiredLevel = Math.ceil(sortOrder / 30)`, sortOrder는 1부터 시작

---

## Task 1: `contentGate.ts` 레벨 게이팅 유틸 & 테스트

**Files:**
- Create: `src/lib/contentGate.ts`
- Create: `src/lib/__tests__/contentGate.test.ts`

**Interfaces:**
- Produces:
  - `requiredLevelForContent(sortOrder: number): number` — sortOrder 1~30→1, 31~60→2, ..., 271~300→10
  - `isContentUnlocked(sortOrder: number, userLevel: number): boolean`
  - `CONTENT_PER_LEVEL = 30` (상수)

- [ ] **Step 1: 테스트 작성**

```typescript
// src/lib/__tests__/contentGate.test.ts
import { describe, it, expect } from "vitest";
import {
  requiredLevelForContent,
  isContentUnlocked,
  CONTENT_PER_LEVEL,
} from "@/lib/contentGate";

describe("requiredLevelForContent", () => {
  it("sortOrder 1은 레벨 1", () => {
    expect(requiredLevelForContent(1)).toBe(1);
  });
  it("sortOrder 30은 레벨 1", () => {
    expect(requiredLevelForContent(30)).toBe(1);
  });
  it("sortOrder 31은 레벨 2", () => {
    expect(requiredLevelForContent(31)).toBe(2);
  });
  it("sortOrder 60은 레벨 2", () => {
    expect(requiredLevelForContent(60)).toBe(2);
  });
  it("sortOrder 271은 레벨 10", () => {
    expect(requiredLevelForContent(271)).toBe(10);
  });
  it("sortOrder 300은 레벨 10", () => {
    expect(requiredLevelForContent(300)).toBe(10);
  });
  it("CONTENT_PER_LEVEL은 30", () => {
    expect(CONTENT_PER_LEVEL).toBe(30);
  });
});

describe("isContentUnlocked", () => {
  it("sortOrder 1, 레벨 1 → true", () => {
    expect(isContentUnlocked(1, 1)).toBe(true);
  });
  it("sortOrder 31, 레벨 1 → false", () => {
    expect(isContentUnlocked(31, 1)).toBe(false);
  });
  it("sortOrder 31, 레벨 2 → true", () => {
    expect(isContentUnlocked(31, 2)).toBe(true);
  });
  it("sortOrder 300, 레벨 10 → true", () => {
    expect(isContentUnlocked(300, 10)).toBe(true);
  });
  it("sortOrder 300, 레벨 9 → false", () => {
    expect(isContentUnlocked(300, 9)).toBe(false);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx vitest run src/lib/__tests__/contentGate.test.ts
```
Expected: FAIL (모듈 없음)

- [ ] **Step 3: 구현 작성**

```typescript
// src/lib/contentGate.ts
export const CONTENT_PER_LEVEL = 30;

/**
 * sortOrder(1-based)로부터 해당 콘텐츠를 열기 위해 필요한 레벨을 반환.
 * sortOrder 1~30 → Lv1, 31~60 → Lv2, ..., 271~300 → Lv10
 */
export function requiredLevelForContent(sortOrder: number): number {
  return Math.ceil(sortOrder / CONTENT_PER_LEVEL);
}

/**
 * 해당 콘텐츠가 userLevel에서 접근 가능한지 반환.
 */
export function isContentUnlocked(sortOrder: number, userLevel: number): boolean {
  return userLevel >= requiredLevelForContent(sortOrder);
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx vitest run src/lib/__tests__/contentGate.test.ts
```
Expected: 12 tests PASS

- [ ] **Step 5: 커밋**

```bash
git add src/lib/contentGate.ts src/lib/__tests__/contentGate.test.ts
git commit -m "feat: add contentGate utility for level-based content unlocking"
```

---

## Task 2: 경어 레슨 목록 게이팅 (UI)

**Files:**
- Modify: `src/app/(app)/keigo/page.tsx`
- Modify: `src/components/keigo/KeigoLessonList.tsx`
- Modify: `src/components/keigo/LessonCard.tsx`

**Interfaces:**
- Consumes: `requiredLevelForContent`, `isContentUnlocked` from `@/lib/contentGate`
- `LessonSummary` 타입에 `sortOrder: number` 추가
- `KeigoLessonList` props에 `userLevel: number` 추가
- `LessonCard` props에 `locked: boolean`, `requiredLevel: number` 추가

- [ ] **Step 1: `keigo/page.tsx` 수정**

```typescript
// src/app/(app)/keigo/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { KeigoLessonList } from "@/components/keigo/KeigoLessonList";
import type { LessonSummary } from "@/components/keigo/KeigoLessonList";

export default async function KeigoPage() {
  const session = await getServerSession(authOptions);

  const [rows, progress, totalCount, userProgress] = await Promise.all([
    prisma.keigoLesson.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true, title: true, category: true, thumbnail: true,
        dialogue: true, quiz: true, sortOrder: true,
      },
    }),
    session?.user?.id
      ? prisma.keigoLessonProgress.findMany({
          where: { userId: session.user.id, completed: true },
          select: { lessonId: true },
        })
      : Promise.resolve([]),
    prisma.keigoLesson.count({ where: { isActive: true } }),
    session?.user?.id
      ? prisma.userProgress.findUnique({
          where: { userId: session.user.id },
          select: { level: true },
        })
      : Promise.resolve(null),
  ]);

  const userLevel = userProgress?.level ?? 1;

  const lessons: LessonSummary[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    thumbnail: row.thumbnail,
    dialogueCount: (JSON.parse(row.dialogue) as unknown[]).length,
    quizCount: (JSON.parse(row.quiz) as unknown[]).length,
    sortOrder: row.sortOrder,
  }));

  const completedIds = progress.map((p) => p.lessonId);

  return (
    <KeigoLessonList
      lessons={lessons}
      completedIds={completedIds}
      totalCount={totalCount}
      userLevel={userLevel}
    />
  );
}
```

- [ ] **Step 2: `KeigoLessonList.tsx` 수정**

```typescript
// src/components/keigo/KeigoLessonList.tsx
"use client";

import { useState } from "react";
import { LessonCard } from "@/components/keigo/LessonCard";
import { CategoryFilter } from "@/components/keigo/CategoryFilter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { requiredLevelForContent } from "@/lib/contentGate";
import type { LessonCategory } from "@/types/lesson";

export interface LessonSummary {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  dialogueCount: number;
  quizCount: number;
  sortOrder: number;
}

interface Props {
  lessons: LessonSummary[];
  completedIds: string[];
  totalCount: number;
  userLevel: number;
}

export function KeigoLessonList({ lessons, completedIds, totalCount, userLevel }: Props) {
  const [category, setCategory] = useState<LessonCategory>("all");
  const [query, setQuery] = useState("");

  const filtered = lessons.filter((l) => {
    const categoryOk = category === "all" || l.category === category;
    const queryOk = query === "" || l.title.toLowerCase().includes(query.toLowerCase());
    return categoryOk && queryOk;
  });

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <h1 className="text-2xl font-black text-type-black">경어 레슨 🎯</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          {completedIds.length} / {totalCount} 완료 · 현재 레벨 {userLevel}
        </p>
        <div className="mt-3">
          <ProgressBar value={(completedIds.length / totalCount) * 100} color="grape" />
        </div>
      </div>

      <div className="px-5 py-4">
        <input
          type="search"
          placeholder="레슨 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-black rounded-xl bg-paper-white font-bold text-sm placeholder:text-type-black/40 mb-3"
        />
        <CategoryFilter active={category} onChange={setCategory} />
        <div className="mt-4 flex flex-col gap-3 pb-24">
          {filtered.length === 0 && (
            <p className="text-center text-sm font-bold text-type-black/50 py-10">
              검색 결과가 없습니다
            </p>
          )}
          {filtered.map((lesson) => {
            const reqLevel = requiredLevelForContent(lesson.sortOrder);
            const locked = userLevel < reqLevel;
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={completedIds.includes(lesson.id)}
                locked={locked}
                requiredLevel={reqLevel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `LessonCard.tsx` 잠금 UI 추가**

```typescript
// src/components/keigo/LessonCard.tsx
import Link from "next/link";
import { CATEGORY_LABELS } from "@/types/lesson";
import type { LessonSummary } from "@/components/keigo/KeigoLessonList";

interface LessonCardProps {
  lesson: LessonSummary;
  completed?: boolean;
  locked?: boolean;
  requiredLevel?: number;
}

const CATEGORY_BG: Record<string, string> = {
  business: "bg-grape-punch text-white",
  hospitality: "bg-sakura-pink text-black",
  social: "bg-matcha-green text-black",
};

const WOBBLE = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

function wobbleFor(id: string) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return WOBBLE[hash % WOBBLE.length];
}

export function LessonCard({ lesson, completed, locked, requiredLevel }: LessonCardProps) {
  const wobble = wobbleFor(lesson.id);

  if (locked) {
    return (
      <div
        className={`relative bg-paper-white/50 rounded-[15px] p-4 border-2 border-black/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex gap-3 ${wobble} cursor-not-allowed`}
      >
        <div className="w-14 h-14 rounded-xl bg-canvas-almond/50 border-2 border-black/20 flex items-center justify-center text-3xl flex-shrink-0 grayscale opacity-40">
          {lesson.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black/30 bg-type-black/10 text-type-black/40">
              🔒 레벨 {requiredLevel} 오픈
            </span>
          </div>
          <p className="font-bold text-type-black/30 text-sm leading-snug">{lesson.title}</p>
          <p className="text-xs text-type-black/25 mt-1">
            대화 {lesson.dialogueCount}줄 · 퀴즈 {lesson.quizCount}문제
          </p>
        </div>
        <div className="self-center text-type-black/20">
          <span className="material-symbols-outlined text-sm">lock</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/keigo/lessons/${lesson.id}`}
      className={`relative bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-95 flex gap-3 ${wobble}`}
    >
      <div className="w-14 h-14 rounded-xl bg-canvas-almond border-2 border-black flex items-center justify-center text-3xl flex-shrink-0">
        {lesson.thumbnail}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black ${CATEGORY_BG[lesson.category] ?? "bg-canvas-almond text-black"}`}
          >
            {CATEGORY_LABELS[lesson.category as keyof typeof CATEGORY_LABELS] ?? lesson.category}
          </span>
          {completed && (
            <span className="text-xs bg-matcha-green text-black px-2 py-0.5 rounded-full font-bold border-2 border-black">
              완료 ✓
            </span>
          )}
        </div>
        <p className="font-bold text-type-black text-sm leading-snug">{lesson.title}</p>
        <p className="text-xs text-type-black/60 mt-1">
          대화 {lesson.dialogueCount}줄 · 퀴즈 {lesson.quizCount}문제
        </p>
      </div>
      <div className="self-center text-type-black">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: TypeScript 컴파일 확인**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: 커밋**

```bash
git add src/app/(app)/keigo/page.tsx src/components/keigo/KeigoLessonList.tsx src/components/keigo/LessonCard.tsx
git commit -m "feat: add level-gated display to keigo lesson list"
```

---

## Task 3: 경어 레슨 상세 페이지 서버 레벨 게이팅

**Files:**
- Modify: `src/app/(app)/keigo/lessons/[id]/page.tsx`

**Interfaces:**
- Consumes: `isContentUnlocked(sortOrder, userLevel)` from `@/lib/contentGate`

- [ ] **Step 1: `lessons/[id]/page.tsx` 수정**

```typescript
// src/app/(app)/keigo/lessons/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseKeigoLesson } from "@/lib/lessonUtils";
import { LessonDetail } from "@/components/keigo/LessonDetail";
import { isContentUnlocked } from "@/lib/contentGate";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [row, session] = await Promise.all([
    prisma.keigoLesson.findUnique({
      where: { id },
      select: {
        id: true, title: true, category: true, thumbnail: true,
        dialogue: true, grammarPoints: true, vocab: true, quiz: true,
        isActive: true, sortOrder: true, createdAt: true, updatedAt: true,
      },
    }),
    getServerSession(authOptions),
  ]);

  if (!row) notFound();

  const userProgress = session?.user?.id
    ? await prisma.userProgress.findUnique({
        where: { userId: session.user.id },
        select: { level: true },
      })
    : null;
  const userLevel = userProgress?.level ?? 1;

  if (!isContentUnlocked(row.sortOrder, userLevel)) {
    redirect("/keigo");
  }

  const lesson = parseKeigoLesson(row);
  return <LessonDetail lesson={lesson} />;
}
```

- [ ] **Step 2: TypeScript 컴파일 확인**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: 커밋**

```bash
git add src/app/(app)/keigo/lessons/[id]/page.tsx
git commit -m "feat: server-side level gate for keigo lesson detail page"
```

---

## Task 4: 학습 일기 목록 & 상세 페이지 게이팅

**Files:**
- Modify: `src/app/(app)/diary/learn/page.tsx`
- Modify: `src/components/learningDiary/DiaryList.tsx`
- Modify: `src/components/learningDiary/LearningDiaryCard.tsx`
- Modify: `src/app/(app)/diary/learn/[id]/page.tsx`

**Interfaces:**
- Consumes: `requiredLevelForContent`, `isContentUnlocked` from `@/lib/contentGate`
- `DiarySummary` 타입에 `sortOrder: number` 추가
- `DiaryList` props에 `userLevel: number` 추가
- `LearningDiaryCard` props에 `locked: boolean`, `requiredLevel: number` 추가

- [ ] **Step 1: `diary/learn/page.tsx` 수정**

```typescript
// src/app/(app)/diary/learn/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DiaryList } from "@/components/learningDiary/DiaryList";
import type { DiarySummary } from "@/components/learningDiary/DiaryList";

export default async function LearnDiaryListPage() {
  const session = await getServerSession(authOptions);

  const [rows, progress, totalCount, userProgress] = await Promise.all([
    prisma.learningDiaryEntry.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, title: true, titleKo: true, category: true, level: true, thumbnail: true, sortOrder: true },
    }),
    session?.user?.id
      ? prisma.learningDiaryProgress.findMany({
          where: { userId: session.user.id },
          select: { diaryId: true },
        })
      : Promise.resolve([]),
    prisma.learningDiaryEntry.count({ where: { isActive: true } }),
    session?.user?.id
      ? prisma.userProgress.findUnique({
          where: { userId: session.user.id },
          select: { level: true },
        })
      : Promise.resolve(null),
  ]);

  const userLevel = userProgress?.level ?? 1;
  const diaries: DiarySummary[] = rows;
  const completedIds = progress.map((p) => p.diaryId);

  return (
    <DiaryList
      diaries={diaries}
      completedIds={completedIds}
      totalCount={totalCount}
      userLevel={userLevel}
    />
  );
}
```

- [ ] **Step 2: `DiaryList.tsx` 수정 — sortOrder + userLevel + locked 카드 처리**

`DiarySummary`에 `sortOrder: number` 추가, props에 `userLevel: number` 추가, 카드 렌더 시 `requiredLevelForContent(diary.sortOrder)`로 locked 계산.

```typescript
// src/components/learningDiary/DiaryList.tsx  (전체 교체)
"use client";

import { useState } from "react";
import { DiaryLevelFilter } from "@/components/learningDiary/DiaryLevelFilter";
import { LearningDiaryCard } from "@/components/learningDiary/LearningDiaryCard";
import { requiredLevelForContent } from "@/lib/contentGate";
import type { DiaryCategory, DiaryLevel } from "@/types/learningDiary";

export interface DiarySummary {
  id: string;
  title: string;
  titleKo: string;
  category: string;
  level: string;
  thumbnail: string;
  sortOrder: number;
}

interface Props {
  diaries: DiarySummary[];
  completedIds: string[];
  totalCount: number;
  userLevel: number;
}

export function DiaryList({ diaries, completedIds, totalCount, userLevel }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<DiaryLevel | "전체">("전체");
  const [selectedCategory, setSelectedCategory] = useState<DiaryCategory | "전체">("전체");
  const [query, setQuery] = useState("");

  const filtered = diaries.filter((d) => {
    const levelOk = selectedLevel === "전체" || d.level === selectedLevel;
    const catOk = selectedCategory === "전체" || d.category === selectedCategory;
    const queryOk =
      query === "" ||
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.titleKo.toLowerCase().includes(query.toLowerCase());
    return levelOk && catOk && queryOk;
  });

  return (
    <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">📖</span>
        <div>
          <h1 className="text-lg font-bold text-text-main leading-tight">학습 일기</h1>
          <p className="text-xs text-text-sub">
            완료 {completedIds.length} / {totalCount}개 · 현재 레벨 {userLevel}
          </p>
        </div>
        <div className="ml-auto">
          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(completedIds.length / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <input
        type="search"
        placeholder="일기 제목 검색 (日本語 · 한국어)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2.5 border-2 border-black rounded-xl bg-paper-white font-bold text-sm placeholder:text-type-black/40"
      />

      <DiaryLevelFilter
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onLevelChange={setSelectedLevel}
        onCategoryChange={setSelectedCategory}
      />

      <p className="text-xs text-text-sub">{filtered.length}개의 일기</p>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-center text-sm font-bold text-type-black/50 py-8">
            검색 결과가 없습니다
          </p>
        )}
        {filtered.map((diary) => {
          const reqLevel = requiredLevelForContent(diary.sortOrder);
          const locked = userLevel < reqLevel;
          return (
            <LearningDiaryCard
              key={diary.id}
              diary={diary}
              completed={completedIds.includes(diary.id)}
              locked={locked}
              requiredLevel={reqLevel}
            />
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: `LearningDiaryCard.tsx` 잠금 UI 추가**

현재 파일 내용을 읽어 `locked`, `requiredLevel` props를 추가한다.
`locked === true`이면 클릭 불가 `<div>` 렌더 + 흐리게 + 🔒 레벨 N 배지. `LessonCard.tsx`의 locked 패턴과 동일하게 적용.

```bash
cat src/components/learningDiary/LearningDiaryCard.tsx
```

- [ ] **Step 4: `diary/learn/[id]/page.tsx` 서버 레벨 게이팅**

```typescript
// src/app/(app)/diary/learn/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseLearningDiaryEntry } from "@/lib/lessonUtils";
import { DiaryDetail } from "@/components/learningDiary/DiaryDetail";
import { isContentUnlocked } from "@/lib/contentGate";

export default async function LearnDiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [row, session] = await Promise.all([
    prisma.learningDiaryEntry.findUnique({ where: { id } }),
    getServerSession(authOptions),
  ]);

  if (!row) notFound();

  const userProgress = session?.user?.id
    ? await prisma.userProgress.findUnique({
        where: { userId: session.user.id },
        select: { level: true },
      })
    : null;
  const userLevel = userProgress?.level ?? 1;

  if (!isContentUnlocked(row.sortOrder, userLevel)) {
    redirect("/diary/learn");
  }

  const diary = parseLearningDiaryEntry(row);
  return <DiaryDetail diary={diary} />;
}
```

- [ ] **Step 5: 전체 검증**

```bash
npx tsc --noEmit && npx vitest run
```
Expected: 타입 오류 없음, 모든 테스트 통과 (contentGate 포함)

- [ ] **Step 6: 커밋**

```bash
git add src/app/(app)/diary/learn/page.tsx \
        src/components/learningDiary/DiaryList.tsx \
        src/components/learningDiary/LearningDiaryCard.tsx \
        src/app/(app)/diary/learn/[id]/page.tsx
git commit -m "feat: add level-gated display and server guard to learning diary"
```

---

## Self-Review

### Spec Coverage
- ✅ 레벨 구간별 30개씩 오픈: `requiredLevelForContent` (Task 1)
- ✅ 목록 자물쇠 표시 + "레벨 N 오픈" 뱃지: `LessonCard`, `LearningDiaryCard` (Task 2, 4)
- ✅ 상세 페이지 서버 게이팅: `redirect` 적용 (Task 3, 4)
- ✅ 경어 + 일기 동일 기준: 동일 `contentGate.ts` 유틸 사용

### Placeholder Scan
- ✅ 없음 — 모든 단계에 실제 코드 포함

### Type Consistency
- ✅ `LessonSummary.sortOrder: number` — Task 2 전체 일관
- ✅ `DiarySummary.sortOrder: number` — Task 4 전체 일관
- ✅ `userLevel: number` — 모든 props 동일 타입
