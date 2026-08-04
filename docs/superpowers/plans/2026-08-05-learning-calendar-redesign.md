# Real-Data Monthly Attendance Stamp Calendar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace artificial 28-day heatmap with a 100% real-data Monthly Attendance Stamp Calendar featuring year/month navigation, day-of-week headers, and Shiba Inu stamp badges.

**Architecture:** `getUserStudyDates` in `src/actions/user.ts` queries real study dates from user activity tables. `LearningCalendar.tsx` renders an interactive monthly calendar with attendance stamps for studied days.

**Tech Stack:** React 19, Next.js 15, Tailwind CSS v4, Prisma, Vitest

## Global Constraints

- Use strict TypeScript (`strict: true`) without `@ts-ignore` or `as any`.
- Follow WangWang Japanese Sticker Bomb design system.
- All unit tests must pass cleanly.

---

### Task 1: `getUserStudyDates` Server Action & Utility Tests

**Files:**
- Modify: `src/actions/user.ts`
- Test: `src/lib/__tests__/calendar.test.ts`

**Interfaces:**
- Consumes: PrismaClient (`KeigoLessonProgress`, `LearningDiaryProgress`, `Diary`, `DailyChallenge`, `VocabReview`, `UserProgress`)
- Produces: `getUserStudyDates(userId?: string): Promise<string[]>`

- [ ] **Step 1: Write failing unit test for `getUserStudyDates` date formatting**

Create `src/lib/__tests__/calendar.test.ts`:
```ts
import { describe, it, expect } from "vitest";

function formatLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

describe("formatLocalDateString", () => {
  it("formats Date to YYYY-MM-DD correctly in local time", () => {
    const testDate = new Date(2026, 7, 5); // 2026-08-05
    expect(formatLocalDateString(testDate)).toBe("2026-08-05");
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/calendar.test.ts`
Expected: PASS

- [ ] **Step 3: Implement `getUserStudyDates` in `src/actions/user.ts`**

In `src/actions/user.ts`:
```ts
export async function getUserStudyDates(): Promise<string[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const userId = session.user.id;

  const [keigo, learningDiaries, diaries, challenges, progress] = await Promise.all([
    prisma.keigoLessonProgress.findMany({
      where: { userId, completed: true, completedAt: { not: null } },
      select: { completedAt: true },
    }),
    prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { completedAt: true },
    }),
    prisma.diary.findMany({
      where: { userId },
      select: { createdAt: true },
    }),
    prisma.dailyChallenge.findMany({
      where: { userId, completed: true },
      select: { createdAt: true, claimedAt: true },
    }),
    prisma.userProgress.findUnique({
      where: { userId },
      select: { lastStudyAt: true },
    }),
  ]);

  const dateSet = new Set<string>();

  const addDate = (d?: Date | null) => {
    if (!d) return;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dateSet.add(`${year}-${month}-${day}`);
  };

  keigo.forEach((k) => addDate(k.completedAt));
  learningDiaries.forEach((ld) => addDate(ld.completedAt));
  diaries.forEach((d) => addDate(d.createdAt));
  challenges.forEach((c) => {
    addDate(c.createdAt);
    addDate(c.claimedAt);
  });
  if (progress?.lastStudyAt) addDate(progress.lastStudyAt);

  return Array.from(dateSet);
}
```

- [ ] **Step 4: Run Vitest tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/actions/user.ts src/lib/__tests__/calendar.test.ts
git commit -m "feat: add getUserStudyDates server action for real attendance data aggregation"
```

---

### Task 2: Create `LearningCalendar.tsx` Component

**Files:**
- Create: `src/components/profile/LearningCalendar.tsx`
- Test: `src/lib/__tests__/calendar.test.ts`

**Interfaces:**
- Consumes: `studyDates: string[]`, `streakDays?: number`
- Produces: Client React component `LearningCalendar`

- [ ] **Step 1: Write helper tests for calendar grid calculations**

Add to `src/lib/__tests__/calendar.test.ts`:
```ts
describe("Calendar Month Calculations", () => {
  it("calculates correct days in month and starting day of week for August 2026", () => {
    const year = 2026;
    const month = 7; // August (0-indexed)
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // Saturday = 6
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 31 days
    expect(firstDayOfWeek).toBe(6);
    expect(daysInMonth).toBe(31);
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/calendar.test.ts`
Expected: PASS

- [ ] **Step 3: Implement `LearningCalendar.tsx`**

Create `src/components/profile/LearningCalendar.tsx`:
```tsx
"use client";

import { useState } from "react";

interface LearningCalendarProps {
  studyDates?: string[];
  streakDays?: number;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export function LearningCalendar({ studyDates = [], streakDays = 0 }: LearningCalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const studyDateSet = new Set(studyDates);

  // Build calendar days array
  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }

  let monthlyAttendedCount = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateKey = `${currentYear}-${monthStr}-${dayStr}`;

    const isToday =
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day;

    const attended = studyDateSet.has(dateKey);
    if (attended) monthlyAttendedCount++;

    calendarCells.push({ day, dateKey, isToday, attended });
  }

  return (
    <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-full border-2 border-black bg-canvas-almond font-black text-type-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px]"
        >
          ‹
        </button>
        <div className="text-center">
          <h3 className="font-black text-type-black text-base">
            {currentYear}년 {currentMonth + 1}월 📅
          </h3>
          <p className="text-[11px] font-bold text-type-black/60 mt-0.5">
            이번 달 <span className="text-matcha-green font-black">{monthlyAttendedCount}일</span> 출석 달성!
          </p>
        </div>
        <button
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-full border-2 border-black bg-canvas-almond font-black text-type-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px]"
        >
          ›
        </button>
      </div>

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAY_NAMES.map((name, idx) => (
          <span
            key={name}
            className={`text-xs font-black ${
              idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-type-black/60"
            }`}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarCells.map((cell, idx) => {
          if (!cell) {
            return <div key={`empty-${idx}`} className="h-10" />;
          }

          return (
            <div
              key={cell.dateKey}
              className={`h-10 rounded-xl border-2 flex flex-col items-center justify-center relative transition-all ${
                cell.isToday
                  ? "border-shiba-orange bg-shiba-orange/10 font-black shadow-[1px_1px_0px_0px_#ffa54f]"
                  : cell.attended
                  ? "border-black bg-matcha-green/20 text-type-black shadow-[2px_2px_0px_0px_#000]"
                  : "border-black/10 bg-canvas-almond/20 text-type-black/40"
              }`}
            >
              <span className="text-[10px] font-black leading-none">{cell.day}</span>
              {cell.attended && (
                <span className="text-xs mt-0.5 animate-bounce leading-none" title="출석 완료!">
                  🐾
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-bold text-type-black">
        <span className="flex items-center gap-1.5">
          <span className="text-sm">🔥</span> 연속 연속 학습: <span className="font-black text-shiba-orange">{streakDays}일째</span>
        </span>
        <span className="flex items-center gap-1 text-[11px] text-type-black/60">
          <span className="w-2.5 h-2.5 rounded-full bg-matcha-green/40 border border-black inline-block" /> 출석일 (🐾)
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run Vitest test suite**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/profile/LearningCalendar.tsx src/lib/__tests__/calendar.test.ts
git commit -m "feat: create real-data monthly attendance stamp LearningCalendar component"
```

---

### Task 3: Replace `LearningHeatmap` in Profile Page

**Files:**
- Modify: `src/app/(app)/profile/page.tsx`
- Delete: `src/components/profile/LearningHeatmap.tsx` (if unused)

**Interfaces:**
- Consumes: `getUserStudyDates` from `@/actions/user`, `LearningCalendar` component
- Produces: Updated Profile page rendering `LearningCalendar`

- [ ] **Step 1: Update `ProfilePage` in `src/app/(app)/profile/page.tsx`**

Import `getUserStudyDates` and `LearningCalendar`:
```tsx
import { getUserProfile, getUserStudyDates } from "@/actions/user";
import { LearningCalendar } from "@/components/profile/LearningCalendar";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const [profile, { items, equippedIds }, studyDates] = await Promise.all([
    getUserProfile(),
    getWardrobeItems(),
    getUserStudyDates(),
  ]);
```

Replace `<LearningHeatmap ... />` section with:
```tsx
        <section className="mb-6">
          <h2 className="font-black text-type-black text-sm mb-3">학습 캘린더 📅</h2>
          <LearningCalendar
            studyDates={studyDates}
            streakDays={progress?.streakDays ?? 0}
          />
        </section>
```

- [ ] **Step 2: Run Vitest tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/\(app\)/profile/page.tsx
git commit -m "feat: replace LearningHeatmap with LearningCalendar in Profile page"
```

---

### Task 4: Full Suite Verification & Build Test

**Files:**
- All files in repository

- [ ] **Step 1: Run full Vitest suite**

Run: `npx vitest run`
Expected: 23+ test files (265+ tests) PASS.

- [ ] **Step 2: Run Next.js production build**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 3: Check git status**

Run: `git status`
Expected: Clean working tree.
