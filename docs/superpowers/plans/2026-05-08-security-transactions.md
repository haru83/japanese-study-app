# Security & Transactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize admin auth, add rate limiting to /api/register, and wrap multi-query operations in DB transactions.

**Architecture:** Extract `requireAdmin` to `src/lib/admin-auth.ts` (already exists). Add simple in-memory rate limiter in `src/lib/rate-limit.ts`. Wrap diary/keigo/learningDiary XP-award sequences and `/api/register` in `prisma.$transaction()`. All `revalidatePath` calls happen outside transactions.

**Tech Stack:** Next.js 15 App Router, Prisma (SQLite), NextAuth v4, Vitest

---

## File Structure

- **Modify:** `src/lib/admin-auth.ts` — add `requireAdmin()` export
- **Modify:** `src/actions/admin-content.ts` — import `requireAdmin` from lib instead of local
- **Create:** `src/lib/rate-limit.ts` — in-memory Map-based rate limiter
- **Modify:** `src/app/api/register/route.ts` — add rate limit check
- **Modify:** `src/actions/diary.ts` — wrap saveDiary in $transaction
- **Modify:** `src/actions/keigo.ts` — wrap completeKeigoLesson in $transaction
- **Modify:** `src/actions/learningDiary.ts` — wrap completeLearningDiary in $transaction
- **Create:** `src/lib/__tests__/rate-limit.test.ts` — unit tests for rate limiter

---

### Task 1: Centralize requireAdmin

**Files:**
- Modify: `src/lib/admin-auth.ts`
- Modify: `src/actions/admin-content.ts`

- [ ] **Step 1: Add requireAdmin export to admin-auth.ts**

Read the current file first. The file currently only exports `isAdminPath`. Add `requireAdmin` below:

```typescript
// src/lib/admin-auth.ts  — full file after change:
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Checks if a pathname requires admin access.
 * Only paths starting with "/admin" followed by "/" or end-of-string
 * are protected. This prevents false positives like "/adminSettings".
 */
export function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/admin?");
}

export async function requireAdmin(): Promise<void> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") throw new Error("권한이 없습니다.");
}
```

- [ ] **Step 2: Update admin-content.ts to import from lib**

Replace the local `requireAdmin` function and add the import:

```typescript
// src/actions/admin-content.ts — change top section:
"use server";

import { getServerSession } from "next-auth";  // REMOVE this line — no longer needed here
import { authOptions } from "@/lib/auth";       // REMOVE this line
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth"; // ADD this line

// REMOVE the local requireAdmin function:
// async function requireAdmin() { ... }
```

The final top of `src/actions/admin-content.ts` should be:
```typescript
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
```

All 6 calls to `requireAdmin()` within the file remain unchanged.

- [ ] **Step 3: Verify TypeScript builds**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors related to admin-auth or admin-content.

- [ ] **Step 4: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/lib/admin-auth.ts src/actions/admin-content.ts
git commit -m "refactor: requireAdmin을 lib/admin-auth.ts로 중앙화"
```

---

### Task 2: In-memory rate limiter

**Files:**
- Create: `src/lib/rate-limit.ts`
- Create: `src/lib/__tests__/rate-limit.test.ts`
- Modify: `src/app/api/register/route.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/__tests__/rate-limit.test.ts
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { checkRateLimit } from "../rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests up to max", () => {
    const key = `test:${Date.now()}`;
    expect(checkRateLimit(key, 3, 60_000)).toBe(true);
    expect(checkRateLimit(key, 3, 60_000)).toBe(true);
    expect(checkRateLimit(key, 3, 60_000)).toBe(true);
  });

  it("blocks on max+1 request within window", () => {
    const key = `block:${Date.now()}`;
    checkRateLimit(key, 2, 60_000);
    checkRateLimit(key, 2, 60_000);
    expect(checkRateLimit(key, 2, 60_000)).toBe(false);
  });

  it("resets after window expires", () => {
    const key = `reset:${Date.now()}`;
    checkRateLimit(key, 1, 60_000);
    expect(checkRateLimit(key, 1, 60_000)).toBe(false);
    vi.advanceTimersByTime(60_001);
    expect(checkRateLimit(key, 1, 60_000)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run src/lib/__tests__/rate-limit.test.ts 2>&1 | tail -20
```

Expected: FAIL — "Cannot find module '../rate-limit'"

- [ ] **Step 3: Implement rate-limit.ts**

```typescript
// src/lib/rate-limit.ts
const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run src/lib/__tests__/rate-limit.test.ts 2>&1 | tail -20
```

Expected: 3 tests pass.

- [ ] **Step 5: Apply rate limiting to /api/register**

Replace the content of `src/app/api/register/route.ts`:

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(`register:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "잠시 후 다시 시도해주세요. (15분에 5회 제한)" },
      { status: 429 }
    );
  }

  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: name ?? email.split("@")[0],
          email,
          password: hashed,
          role: "user",
        },
      });
      await tx.userProgress.create({ data: { userId: user.id } });
      return user;
    });

    return NextResponse.json({ message: "회원가입 성공!" }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
```

Note: `userId` is also removed from the response since it's not needed by the client.

- [ ] **Step 6: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/lib/rate-limit.ts src/lib/__tests__/rate-limit.test.ts src/app/api/register/route.ts
git commit -m "feat: /api/register에 rate limiting 추가 (15분/5회) + register 트랜잭션"
```

---

### Task 3: Transaction — diary.ts saveDiary

**Files:**
- Modify: `src/actions/diary.ts`

- [ ] **Step 1: Wrap saveDiary in prisma.$transaction**

Replace the body of `saveDiary` in `src/actions/diary.ts`. The function signature stays the same. Replace from `const diary = await prisma.diary.create` to `return { diary, xpResult: result }`:

```typescript
export async function saveDiary(data: {
  title: string;
  content: string;
  mood?: string;
  topicId?: string;
  isPublic?: boolean;
  isTutorPublic?: boolean;
  tutorReview?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const userId = session.user.id;

  const { diary, xpResult } = await prisma.$transaction(async (tx) => {
    const diary = await tx.diary.create({
      data: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        topicId: data.topicId,
        isPublic: data.isPublic ?? false,
        isTutorPublic: data.isTutorPublic ?? false,
        tutorReview: data.tutorReview,
        userId,
      },
    });

    const userProgress = await tx.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const xpResult = computeXpResult(
      userProgress.xp,
      XP_REWARDS.DIARY_COMPLETE,
      XP_REWARDS.STAMP_PER_DIARY
    );

    const incrementStreak = shouldIncrementStreak(userProgress.lastStudyAt);

    await tx.userProgress.update({
      where: { userId },
      data: {
        xp: xpResult.newXp,
        level: xpResult.newLevel,
        totalStamps: { increment: xpResult.stampsGained },
        lastStudyAt: new Date(),
        ...(incrementStreak ? { streakDays: { increment: 1 } } : {}),
      },
    });

    return { diary, xpResult };
  });

  revalidatePath("/diary");
  revalidatePath("/home");
  revalidatePath("/profile");

  if (data.isPublic) {
    revalidatePath("/community");
  }

  return { diary, xpResult };
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
git add src/actions/diary.ts
git commit -m "refactor: saveDiary 트랜잭션으로 일기+XP 원자성 보장"
```

---

### Task 4: Transaction — keigo.ts completeKeigoLesson

**Files:**
- Modify: `src/actions/keigo.ts`

- [ ] **Step 1: Wrap the XP-award block in $transaction**

In `src/actions/keigo.ts`, the `completeKeigoLesson` function currently does:
1. `keigoLessonProgress.upsert` (separate)
2. `userProgress.upsert` → `computeXpResult` → `userProgress.update` (should be transactional)

Wrap steps 2-3 in a transaction. The `keigoLessonProgress.upsert` stays outside because it's a separate concern and must happen first to check `existing`.

Replace `completeKeigoLesson` with:

```typescript
export async function completeKeigoLesson(
  lessonId: string,
  quizScore: number,
  quizTotal: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const existing = await prisma.keigoLessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  const isPerfect = quizScore === quizTotal && quizTotal > 0;
  let xpToAdd = 0;
  let stampsToAdd = 0;

  if (!existing?.completed) {
    xpToAdd = XP_REWARDS.KEIGO_LESSON_COMPLETE;
    stampsToAdd = XP_REWARDS.STAMP_PER_LESSON;
  }
  if (isPerfect) {
    xpToAdd += XP_REWARDS.KEIGO_QUIZ_PERFECT;
  }

  await prisma.keigoLessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed: true, quizScore, quizTotal, completedAt: new Date(), xpAwarded: xpToAdd },
    create: { userId, lessonId, completed: true, quizScore, quizTotal, completedAt: new Date(), xpAwarded: xpToAdd },
  });

  if (xpToAdd === 0) {
    return { xpGained: 0, stampsGained: 0, newXp: 0, newLevel: 1, leveledUp: false };
  }

  const result = await prisma.$transaction(async (tx) => {
    const userProgress = await tx.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);
    const incrementStreak = shouldIncrementStreak(userProgress.lastStudyAt);

    await tx.userProgress.update({
      where: { userId },
      data: {
        xp: result.newXp,
        level: result.newLevel,
        totalStamps: { increment: stampsToAdd },
        lastStudyAt: new Date(),
        ...(incrementStreak ? { streakDays: { increment: 1 } } : {}),
      },
    });

    return result;
  });

  revalidatePath("/profile");
  revalidatePath("/home");
  revalidatePath("/keigo");

  return result;
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
git add src/actions/keigo.ts
git commit -m "refactor: completeKeigoLesson XP 업데이트 트랜잭션으로 묶기"
```

---

### Task 5: Transaction — learningDiary.ts completeLearningDiary

**Files:**
- Modify: `src/actions/learningDiary.ts`

- [ ] **Step 1: Wrap the XP-award block in $transaction**

Same pattern as Task 4. Replace `completeLearningDiary` with:

```typescript
export async function completeLearningDiary(
  diaryId: string,
  quizScore: number,
  quizTotal: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const existing = await prisma.learningDiaryProgress.findUnique({
    where: { userId_diaryId: { userId, diaryId } },
  });

  const isPerfect = quizScore === quizTotal && quizTotal > 0;
  let xpToAdd = 0;
  let stampsToAdd = 0;

  if (!existing) {
    xpToAdd = XP_REWARDS.LEARNING_DIARY_COMPLETE;
    stampsToAdd = XP_REWARDS.STAMP_PER_LESSON;
  }
  if (isPerfect) {
    xpToAdd += XP_REWARDS.LEARNING_DIARY_QUIZ_PERFECT;
  }

  await prisma.learningDiaryProgress.upsert({
    where: { userId_diaryId: { userId, diaryId } },
    update: { quizScore, quizTotal, completedAt: new Date(), xpAwarded: xpToAdd },
    create: { userId, diaryId, quizScore, quizTotal, xpAwarded: xpToAdd },
  });

  if (xpToAdd === 0) {
    return { xpGained: 0, stampsGained: 0, newXp: 0, newLevel: 1, leveledUp: false };
  }

  const result = await prisma.$transaction(async (tx) => {
    const userProgress = await tx.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);
    const incrementStreak = shouldIncrementStreak(userProgress.lastStudyAt);

    await tx.userProgress.update({
      where: { userId },
      data: {
        xp: result.newXp,
        level: result.newLevel,
        totalStamps: { increment: stampsToAdd },
        lastStudyAt: new Date(),
        ...(incrementStreak ? { streakDays: { increment: 1 } } : {}),
      },
    });

    return result;
  });

  revalidatePath("/profile");
  revalidatePath("/home");
  revalidatePath("/diary/learn");

  return result;
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Run all tests**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run 2>&1 | tail -20
```

Expected: all tests pass (including the new rate-limit tests).

- [ ] **Step 4: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/actions/learningDiary.ts
git commit -m "refactor: completeLearningDiary XP 업데이트 트랜잭션으로 묶기"
```
