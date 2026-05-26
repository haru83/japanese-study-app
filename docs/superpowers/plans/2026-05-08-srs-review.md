# SRS Vocab Review System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a spaced-repetition vocabulary review system — vocab from completed lessons is automatically queued, and a review page quizzes users on due words.

**Architecture:** New `VocabReview` Prisma model tracks each user's words with a tier (0–4) and `nextReviewAt`. When a user completes a keigo lesson or learning diary entry, all vocab items are upserted into their queue. `/learning/review` is a server-rendered page that fetches due items, and `ReviewSession` is a client component that runs the interactive quiz and calls server actions to submit results.

**Tech Stack:** Next.js 15 App Router, Prisma (SQLite), Vitest

---

## File Structure

- **Modify:** `prisma/schema.prisma` — add `VocabReview` model + `User.vocabReviews` relation
- **Create:** `src/actions/review.ts` — `addVocabToReview`, `getReviewItems`, `getDistractors`, `submitReview`
- **Modify:** `src/actions/keigo.ts` — call `addVocabToReview` after completeKeigoLesson
- **Modify:** `src/actions/learningDiary.ts` — call `addVocabToReview` after completeLearningDiary
- **Create:** `src/app/(app)/learning/review/page.tsx` — server component, fetches due items
- **Create:** `src/app/(app)/learning/review/ReviewSession.tsx` — client component, quiz UI
- **Create:** `src/lib/__tests__/review.test.ts` — unit tests for tier/interval logic

---

### Task 1: Add VocabReview to Prisma schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add VocabReview model**

In `prisma/schema.prisma`, add after the `User` model's relations block (add `vocabReviews` to User), and add the new model at the end of the file:

Add to the `User` model relations (after the last relation line, before the closing `}`):
```prisma
  vocabReviews          VocabReview[]
```

Add the new model at the end of the file:
```prisma
// ── Vocab Review (SRS) ───────────────────────────────────────────────────────

model VocabReview {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  word         String
  reading      String   @default("")
  meaning      String
  source       String   // lesson or diary title
  tier         Int      @default(0) // 0=new, 1=1day, 2=3days, 3=7days, 4=mastered(30days)
  nextReviewAt DateTime @default(now())
  reviewCount  Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@unique([userId, word])
  @@index([userId, nextReviewAt])
}
```

- [ ] **Step 2: Run migration**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx prisma migrate dev --name add_vocab_review
```

Expected: Migration created and applied. Prisma Client regenerated.

- [ ] **Step 3: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: VocabReview 모델 추가 (SRS 복습 시스템)"
```

---

### Task 2: Create review server actions

**Files:**
- Create: `src/actions/review.ts`
- Create: `src/lib/__tests__/review.test.ts`

The tier-to-interval mapping:
- Tier 0 → 1 day (24h)
- Tier 1 → 3 days
- Tier 2 → 7 days
- Tier 3 → 14 days
- Tier 4 → 30 days (mastered)

- [ ] **Step 1: Write unit tests for tier logic**

```typescript
// src/lib/__tests__/review.test.ts
import { describe, it, expect } from "vitest";
import { getNextReviewMs, computeNewTier } from "../review-logic";

describe("computeNewTier", () => {
  it("increments tier on correct answer, max 4", () => {
    expect(computeNewTier(0, true)).toBe(1);
    expect(computeNewTier(3, true)).toBe(4);
    expect(computeNewTier(4, true)).toBe(4); // capped
  });

  it("decrements tier on wrong answer, min 0", () => {
    expect(computeNewTier(2, false)).toBe(1);
    expect(computeNewTier(0, false)).toBe(0); // capped
  });
});

describe("getNextReviewMs", () => {
  it("returns correct intervals per tier", () => {
    const day = 24 * 60 * 60 * 1000;
    expect(getNextReviewMs(0)).toBe(day);
    expect(getNextReviewMs(1)).toBe(3 * day);
    expect(getNextReviewMs(2)).toBe(7 * day);
    expect(getNextReviewMs(3)).toBe(14 * day);
    expect(getNextReviewMs(4)).toBe(30 * day);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run src/lib/__tests__/review.test.ts 2>&1 | tail -10
```

Expected: FAIL — "Cannot find module '../review-logic'"

- [ ] **Step 3: Create src/lib/review-logic.ts**

```typescript
// src/lib/review-logic.ts
const TIER_INTERVALS_MS = [
  1 * 24 * 60 * 60 * 1000,   // 0 → 1 day
  3 * 24 * 60 * 60 * 1000,   // 1 → 3 days
  7 * 24 * 60 * 60 * 1000,   // 2 → 7 days
  14 * 24 * 60 * 60 * 1000,  // 3 → 14 days
  30 * 24 * 60 * 60 * 1000,  // 4 → 30 days
];

export function computeNewTier(currentTier: number, correct: boolean): number {
  if (correct) return Math.min(4, currentTier + 1);
  return Math.max(0, currentTier - 1);
}

export function getNextReviewMs(tier: number): number {
  return TIER_INTERVALS_MS[Math.min(tier, 4)];
}
```

- [ ] **Step 4: Run to confirm tests pass**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run src/lib/__tests__/review.test.ts 2>&1 | tail -10
```

Expected: 5 tests pass.

- [ ] **Step 5: Create src/actions/review.ts**

```typescript
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeNewTier, getNextReviewMs } from "@/lib/review-logic";

export interface ReviewItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  source: string;
  tier: number;
}

export async function addVocabToReview(
  userId: string,
  vocab: Array<{ word: string; reading?: string; meaning: string }>,
  source: string
): Promise<void> {
  if (vocab.length === 0) return;

  await Promise.all(
    vocab.map((v) =>
      prisma.vocabReview.upsert({
        where: { userId_word: { userId, word: v.word } },
        create: {
          userId,
          word: v.word,
          reading: v.reading ?? "",
          meaning: v.meaning,
          source,
        },
        update: {}, // don't reset progress if already in review queue
      })
    )
  );
}

export async function getReviewItems(): Promise<ReviewItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const now = new Date();
  const items = await prisma.vocabReview.findMany({
    where: {
      userId: session.user.id,
      nextReviewAt: { lte: now },
    },
    orderBy: { nextReviewAt: "asc" },
    take: 20,
    select: { id: true, word: true, reading: true, meaning: true, source: true, tier: true },
  });

  return items;
}

export async function getDistractors(
  userId: string,
  excludeWord: string,
  count: number
): Promise<string[]> {
  const pool = await prisma.vocabReview.findMany({
    where: { userId, word: { not: excludeWord } },
    select: { meaning: true },
    take: 50,
  });

  const meanings = [...new Set(pool.map((p) => p.meaning))];
  const shuffled = meanings.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function submitReview(reviewId: string, correct: boolean): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const item = await prisma.vocabReview.findUnique({
    where: { id: reviewId },
    select: { userId: true, tier: true },
  });

  if (!item || item.userId !== session.user.id) return;

  const newTier = computeNewTier(item.tier, correct);
  const nextMs = getNextReviewMs(newTier);

  await prisma.vocabReview.update({
    where: { id: reviewId },
    data: {
      tier: newTier,
      nextReviewAt: new Date(Date.now() + nextMs),
      reviewCount: { increment: 1 },
    },
  });
}

export async function getReviewStats(userId: string) {
  const [total, mastered, dueNow] = await Promise.all([
    prisma.vocabReview.count({ where: { userId } }),
    prisma.vocabReview.count({ where: { userId, tier: 4 } }),
    prisma.vocabReview.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
  ]);
  return { total, mastered, dueNow };
}
```

- [ ] **Step 6: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/lib/review-logic.ts src/lib/__tests__/review.test.ts src/actions/review.ts
git commit -m "feat: SRS 복습 로직 및 review 서버 액션 추가"
```

---

### Task 3: Hook into lesson completion

**Files:**
- Modify: `src/actions/keigo.ts`
- Modify: `src/actions/learningDiary.ts`

- [ ] **Step 1: Update completeKeigoLesson to add vocab to review**

In `src/actions/keigo.ts`, add the import at the top and call `addVocabToReview` after the transaction:

Add to imports:
```typescript
import { addVocabToReview } from "@/actions/review";
```

After the `revalidatePath` calls in `completeKeigoLesson`, add:
```typescript
  // Fire-and-forget — vocab add should not block the response
  const lesson = await prisma.keigoLesson.findUnique({
    where: { id: lessonId },
    select: { vocab: true, title: true },
  });
  if (lesson) {
    const vocab = JSON.parse(lesson.vocab) as Array<{ word: string; reading?: string; meaning: string }>;
    await addVocabToReview(userId, vocab, lesson.title);
  }

  return result;
```

The full end of `completeKeigoLesson` should look like:

```typescript
  revalidatePath("/profile");
  revalidatePath("/home");
  revalidatePath("/keigo");

  const lesson = await prisma.keigoLesson.findUnique({
    where: { id: lessonId },
    select: { vocab: true, title: true },
  });
  if (lesson) {
    const vocab = JSON.parse(lesson.vocab) as Array<{ word: string; reading?: string; meaning: string }>;
    await addVocabToReview(userId, vocab, lesson.title);
  }

  return result;
```

- [ ] **Step 2: Update completeLearningDiary to add vocab to review**

In `src/actions/learningDiary.ts`, add the import and the same pattern after `revalidatePath`:

Add import:
```typescript
import { addVocabToReview } from "@/actions/review";
```

After the `revalidatePath` calls in `completeLearningDiary`, add:
```typescript
  const entry = await prisma.learningDiaryEntry.findUnique({
    where: { id: diaryId },
    select: { vocabulary: true, title: true },
  });
  if (entry) {
    const vocab = JSON.parse(entry.vocabulary) as Array<{ word: string; reading?: string; meaning: string }>;
    await addVocabToReview(userId, vocab, entry.title);
  }

  return result;
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/actions/keigo.ts src/actions/learningDiary.ts
git commit -m "feat: 레슨/일기 완료시 어휘 SRS 복습 큐에 자동 추가"
```

---

### Task 4: ReviewSession client component

**Files:**
- Create: `src/app/(app)/learning/review/ReviewSession.tsx`

- [ ] **Step 1: Create ReviewSession.tsx**

```tsx
// src/app/(app)/learning/review/ReviewSession.tsx
"use client";

import { useState } from "react";
import { submitReview } from "@/actions/review";

interface ReviewItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  source: string;
  tier: number;
}

interface Props {
  items: ReviewItem[];
  distractorPool: Record<string, string[]>; // reviewId → 3 wrong meanings
}

type AnswerState = "unanswered" | "correct" | "wrong";

export function ReviewSession({ items, distractorPool }: Props) {
  const [index, setIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-xl font-black text-type-black">오늘 복습 완료!</h2>
        <p className="text-sm text-type-black/60 font-bold mt-2">
          다음 복습 단어가 준비되면 알려드릴게요
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-xl font-black text-type-black">복습 완료!</h2>
        <p className="text-sm text-type-black/60 font-bold mt-2">
          {items.length}개 중 {correctCount}개 정답
        </p>
      </div>
    );
  }

  const current = items[index];
  const distractors = distractorPool[current.id] ?? [];
  const choices = shuffle([current.meaning, ...distractors.slice(0, 3)]);

  async function handleAnswer(chosen: string) {
    if (answerState !== "unanswered") return;
    const correct = chosen === current.meaning;
    setSelectedMeaning(chosen);
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) setCorrectCount((c) => c + 1);
    await submitReview(current.id, correct);
  }

  function handleNext() {
    setAnswerState("unanswered");
    setSelectedMeaning(null);
    if (index + 1 >= items.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  const tierLabel = ["신규", "1일", "3일", "7일", "14일"][current.tier] ?? "마스터";

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-type-black">복습 퀴즈</h1>
          <span className="text-xs font-bold text-type-black/60">
            {index + 1} / {items.length}
          </span>
        </div>
        <div className="h-2 bg-black/10 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-grape-punch rounded-full transition-all"
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-5">
        {/* Word card */}
        <div className="bg-paper-white border-2 border-black rounded-[20px] shadow-[4px_4px_0px_0px_#000] p-6 text-center">
          <p className="text-3xl font-black text-type-black">{current.word}</p>
          {current.reading && (
            <p className="text-sm text-type-black/60 font-bold mt-1">{current.reading}</p>
          )}
          <p className="text-xs text-type-black/40 mt-3">출처: {current.source}</p>
          <span className="inline-block mt-2 text-[10px] font-black bg-canvas-almond border border-black rounded-full px-2 py-0.5">
            {tierLabel}
          </span>
        </div>

        {/* Choices */}
        <div className="flex flex-col gap-2">
          {choices.map((choice) => {
            let bg = "bg-paper-white";
            if (answerState !== "unanswered") {
              if (choice === current.meaning) bg = "bg-green-200";
              else if (choice === selectedMeaning) bg = "bg-red-200";
            }
            return (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                className={`${bg} border-2 border-black rounded-xl px-4 py-3 text-sm font-bold text-left shadow-[3px_3px_0px_0px_#000] transition-colors`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {answerState !== "unanswered" && (
          <button
            onClick={handleNext}
            className="mt-auto py-3 bg-grape-punch text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]"
          >
            {index + 1 >= items.length ? "완료" : "다음 →"}
          </button>
        )}
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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
git add src/app/\(app\)/learning/review/ReviewSession.tsx
git commit -m "feat: ReviewSession 퀴즈 클라이언트 컴포넌트 추가"
```

---

### Task 5: Review page (server component)

**Files:**
- Create: `src/app/(app)/learning/review/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// src/app/(app)/learning/review/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getReviewItems, getDistractors } from "@/actions/review";
import { ReviewSession } from "./ReviewSession";

export default async function ReviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [items, stats] = await Promise.all([
    getReviewItems(),
    prisma.vocabReview.aggregate({
      where: { userId },
      _count: { _all: true },
    }),
  ]);

  const masteredCount = await prisma.vocabReview.count({ where: { userId, tier: 4 } });

  // Pre-fetch distractors for each item to avoid client-side async
  const distractorPool: Record<string, string[]> = {};
  await Promise.all(
    items.map(async (item) => {
      distractorPool[item.id] = await getDistractors(userId, item.word, 3);
    })
  );

  const totalInQueue = stats._count._all;

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Stats header */}
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-4">
        <h1 className="text-xl font-black text-type-black">단어 복습 📚</h1>
        <div className="flex gap-4 mt-2">
          <div className="text-center">
            <p className="text-lg font-black text-type-black">{items.length}</p>
            <p className="text-[10px] font-bold text-type-black/60">오늘 복습</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-type-black">{totalInQueue}</p>
            <p className="text-[10px] font-bold text-type-black/60">전체 단어</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-type-black">{masteredCount}</p>
            <p className="text-[10px] font-bold text-type-black/60">마스터</p>
          </div>
        </div>
      </div>

      <ReviewSession items={items} distractorPool={distractorPool} />
    </div>
  );
}
```

- [ ] **Step 2: Add review link in learning section navigation**

Find `src/app/(app)/learning/` and check if there's a page or layout that should link to review. Look at `src/app/(app)/learning/page.tsx` or similar:

```bash
ls /home/wetter1117/workspace/japanese-study-app/src/app/\(app\)/learning/
```

If a learning index page exists, add a link to `/learning/review` with a card showing the due count. If no index page exists, the review page is accessible directly at `/learning/review` — that's fine.

- [ ] **Step 3: Verify TypeScript**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Run all tests**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx vitest run 2>&1 | tail -20
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
cd /home/wetter1117/workspace/japanese-study-app
git add src/app/\(app\)/learning/review/
git commit -m "feat: 단어 복습 페이지 (/learning/review) 추가 — SRS 퀴즈 완성"
```
