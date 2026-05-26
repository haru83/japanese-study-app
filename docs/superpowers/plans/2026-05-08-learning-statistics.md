# Learning Statistics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a statistics section to the profile page showing completed lessons, quiz accuracy, words in review, and mastered words.

**Architecture:** New `src/actions/stats.ts` server action aggregates data from `KeigoLessonProgress`, `LearningDiaryProgress`, and `VocabReview` (added in SRS plan). Profile page calls `getUserStats()` and renders a stats grid below the XP section. No new DB models needed — this is pure query aggregation.

**Prerequisite:** The SRS plan must be executed first so `VocabReview` model exists.

**Tech Stack:** Next.js 15 App Router, Prisma (SQLite)

---

## File Structure

- **Create:** `src/actions/stats.ts` — `getUserStats()` server action
- **Modify:** `src/app/(app)/profile/page.tsx` — add stats section below XP bar

---

### Task 1: Create getUserStats server action

**Files:**
- Create: `src/actions/stats.ts`

- [ ] **Step 1: Create stats.ts**

```typescript
// src/actions/stats.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export interface UserStats {
  completedKeigo: number;
  completedDiary: number;
  totalCompleted: number;
  keigoAccuracy: number | null;  // null if no quiz data
  diaryAccuracy: number | null;
  vocabTotal: number;
  vocabMastered: number;
  vocabDueToday: number;
}

export async function getUserStats(): Promise<UserStats | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const [keigoProgress, diaryProgress, vocabStats] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true },
      select: { quizScore: true, quizTotal: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { quizScore: true, quizTotal: true },
    }),
    prisma.vocabReview.aggregate({
      where: { userId },
      _count: { _all: true },
    }),
  ]);

  const [masteredCount, dueCount] = await Promise.all([
    prisma.vocabReview.count({ where: { userId, tier: 4 } }),
    prisma.vocabReview.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
  ]);

  function calcAccuracy(
    rows: Array<{ quizScore: number | null; quizTotal: number | null }>
  ): number | null {
    const valid = rows.filter((r) => r.quizTotal && r.quizTotal > 0);
    if (valid.length === 0) return null;
    const total = valid.reduce((sum, r) => sum + (r.quizScore ?? 0), 0);
    const max = valid.reduce((sum, r) => sum + (r.quizTotal ?? 0), 0);
    return max === 0 ? null : Math.round((total / max) * 100);
  }

  return {
    completedKeigo: keigoProgress.length,
    completedDiary: diaryProgress.length,
    totalCompleted: keigoProgress.length + diaryProgress.length,
    keigoAccuracy: calcAccuracy(keigoProgress),
    diaryAccuracy: calcAccuracy(diaryProgress),
    vocabTotal: vocabStats._count._all,
    vocabMastered: masteredCount,
    vocabDueToday: dueCount,
  };
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/actions/stats.ts
git commit -m "feat: getUserStats 서버 액션 추가 (학습 통계 집계)"
```

---

### Task 2: Add stats section to profile page

**Files:**
- Modify: `src/app/(app)/profile/page.tsx`

The profile page has a section for XP/level after the avatar. Add a stats grid below the XP section.

- [ ] **Step 1: Read the current profile page to find the insertion point**

Read `src/app/(app)/profile/page.tsx` fully — it's ~230 lines. Find the section that renders XP bar and level, which ends around the `ProgressBar` component.

- [ ] **Step 2: Add getUserStats import and call**

In the `ProfilePage` (async server component) function, add the stats call alongside existing data fetches:

Find the existing parallel fetch in ProfilePage (it fetches session, user profile, wardrobe items). Add `getUserStats()` to the same `Promise.all` or as a separate parallel call:

```typescript
// Add import at top of file:
import { getUserStats } from "@/actions/stats";
import type { UserStats } from "@/actions/stats";

// Inside ProfilePage() async function, add to the data fetching:
const [profile, wardrobeData, stats] = await Promise.all([
  getUserProfile(),
  getWardrobeItems(),
  getUserStats(),
]);
```

(If the current code doesn't use Promise.all, refactor it to use one, keeping the same variables.)

- [ ] **Step 3: Add the stats section JSX**

After the XP/level section (after the `<ProgressBar>` component in the JSX), add the stats grid. Find the exact location by looking for the `<ProgressBar` component usage in the member profile view, then add after its containing section:

```tsx
{/* ── 학습 통계 ─────────────────────────────────── */}
{stats && (
  <section className="px-5">
    <h2 className="text-xs font-black text-type-black/50 mb-3 tracking-widest uppercase">
      학습 통계
    </h2>
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        emoji="📚"
        label="완료한 레슨"
        value={`${stats.totalCompleted}개`}
        sub={`경어 ${stats.completedKeigo} · 일기 ${stats.completedDiary}`}
      />
      <StatCard
        emoji="🎯"
        label="퀴즈 정답률"
        value={
          stats.keigoAccuracy !== null
            ? `${stats.keigoAccuracy}%`
            : "—"
        }
        sub={
          stats.diaryAccuracy !== null
            ? `일기 ${stats.diaryAccuracy}%`
            : "퀴즈 미완료"
        }
      />
      <StatCard
        emoji="🔤"
        label="복습 단어"
        value={`${stats.vocabTotal}개`}
        sub={`마스터 ${stats.vocabMastered}개`}
      />
      <StatCard
        emoji="📅"
        label="오늘 복습"
        value={`${stats.vocabDueToday}개`}
        sub={stats.vocabDueToday > 0 ? "복습하러 가기 →" : "다 완료했어요!"}
        href={stats.vocabDueToday > 0 ? "/learning/review" : undefined}
      />
    </div>
  </section>
)}
```

- [ ] **Step 4: Add the StatCard helper component**

Add this helper at the bottom of the file (outside the default export), alongside existing helper components like `Field`:

```tsx
function StatCard({
  emoji,
  label,
  value,
  sub,
  href,
}: {
  emoji: string;
  label: string;
  value: string;
  sub: string;
  href?: string;
}) {
  const content = (
    <div className="bg-paper-white border-2 border-black rounded-[15px] shadow-[3px_3px_0px_0px_#000] p-4 flex flex-col gap-1">
      <span className="text-xl">{emoji}</span>
      <p className="text-xs font-black text-type-black/50">{label}</p>
      <p className="text-lg font-black text-type-black">{value}</p>
      <p className="text-[10px] font-bold text-type-black/50">{sub}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
```

Make sure `Link` is imported at the top (it likely already is since the profile page has navigation links).

- [ ] **Step 5: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 6: Run all tests**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run 2>&1 | tail -20
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/app/\(app\)/profile/page.tsx src/actions/stats.ts
git commit -m "feat: 프로필 페이지에 학습 통계 섹션 추가"
```
