# Additional Learning Content (+100 Keigo, +100 Diaries -> 300 Total Each) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and integrate 100 more Keigo lessons and 100 more Learning Diary entries, expanding totals from 200 to 300 items each, complete with database seeding and full test validation.

**Architecture:** Split content into modular files (`ld_p21.ts` ~ `ld_p30.ts` and `kl_p7.ts` ~ `kl_p11.ts`), aggregate them in the main data export files (`learningDiaries.ts` and `lessons.ts`), run `prisma/seed-learning.ts` to seed all 600 entries into SQLite, and verify with tests and build.

**Tech Stack:** TypeScript, Next.js 15, Prisma ORM, SQLite, Vitest.

## Global Constraints

- strict: true TypeScript compliance without `any` or `@ts-ignore`.
- Path alias `@/*` maps to `./src/*`.
- Keigo lessons must conform to `Lesson` interface (`src/types/lesson.ts`).
- Learning diary entries must conform to `LearningDiary` interface (`src/types/learningDiary.ts`).

---

### Task 1: Create 100 New Learning Diary Entries (`ld_p21.ts` ~ `ld_p30.ts`) & Update Aggregator

**Files:**
- Create: `src/data/ld_p21.ts` (ld-201 ~ ld-210, Category: 일상)
- Create: `src/data/ld_p22.ts` (ld-211 ~ ld-220, Category: 음식)
- Create: `src/data/ld_p23.ts` (ld-221 ~ ld-230, Category: 여행)
- Create: `src/data/ld_p24.ts` (ld-231 ~ ld-240, Category: 계절)
- Create: `src/data/ld_p25.ts` (ld-241 ~ ld-250, Category: 감정)
- Create: `src/data/ld_p26.ts` (ld-251 ~ ld-260, Category: 학교)
- Create: `src/data/ld_p27.ts` (ld-261 ~ ld-270, Category: 직장)
- Create: `src/data/ld_p28.ts` (ld-271 ~ ld-280, Category: 취미)
- Create: `src/data/ld_p29.ts` (ld-281 ~ ld-290, Category: 쇼핑)
- Create: `src/data/ld_p30.ts` (ld-291 ~ ld-300, Category: 건강)
- Modify: `src/data/learningDiaries.ts`
- Modify: `src/data/__tests__/learningDiaries.test.ts`

- [ ] **Step 1: Update test `src/data/__tests__/learningDiaries.test.ts` to expect 300 entries and verify failure**
- [ ] **Step 2: Create `ld_p21.ts` through `ld_p30.ts` files with 10 entries each**
- [ ] **Step 3: Update `src/data/learningDiaries.ts` to export all 300 entries**
- [ ] **Step 4: Run test to verify it passes cleanly**
- [ ] **Step 5: Commit Task 1**

```bash
git add src/data/ld_p*.ts src/data/learningDiaries.ts src/data/__tests__/learningDiaries.test.ts
git commit -m "feat: add 100 new learning diary entries (ld-201 to ld-300)"
```

---

### Task 2: Create 100 New Keigo Lessons (`kl_p7.ts` ~ `kl_p11.ts`) & Update Aggregator

**Files:**
- Create: `src/data/keigo/kl_p7.ts` (keigo-201 ~ keigo-220)
- Create: `src/data/keigo/kl_p8.ts` (keigo-221 ~ keigo-240)
- Create: `src/data/keigo/kl_p9.ts` (keigo-241 ~ keigo-260)
- Create: `src/data/keigo/kl_p10.ts` (keigo-261 ~ keigo-280)
- Create: `src/data/keigo/kl_p11.ts` (keigo-281 ~ keigo-300)
- Modify: `src/data/lessons.ts`
- Modify: `src/data/__tests__/lessons.test.ts`

- [ ] **Step 1: Update test `src/data/__tests__/lessons.test.ts` to expect 300 lessons and verify failure**
- [ ] **Step 2: Create `kl_p7.ts` through `kl_p11.ts` files with 20 lessons each**
- [ ] **Step 3: Update `src/data/lessons.ts` to export all 300 lessons**
- [ ] **Step 4: Run test to verify it passes cleanly**
- [ ] **Step 5: Commit Task 2**

```bash
git add src/data/keigo/ src/data/lessons.ts src/data/__tests__/lessons.test.ts
git commit -m "feat: add 100 new keigo lessons (keigo-201 to keigo-300)"
```

---

### Task 3: Seed Database & Verify Counts

- [ ] **Step 1: Execute `npx tsx prisma/seed-learning.ts`**
- [ ] **Step 2: Verify SQLite row counts (300 keigo, 300 diaries)**

```bash
npx tsx -e '
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const keigoCount = await prisma.keigoLesson.count();
  const diaryCount = await prisma.learningDiaryEntry.count();
  console.log(`Keigo lessons count: ${keigoCount}`);
  console.log(`Learning diary count: ${diaryCount}`);
  if (keigoCount !== 300 || diaryCount !== 300) {
    process.exit(1);
  }
}
main().finally(() => prisma.$disconnect());
'
```

- [ ] **Step 3: Commit Task 3**

```bash
git add prisma/seed-learning.ts
git commit -m "feat: seed database with 300 keigo lessons and 300 learning diaries"
```

---

### Task 4: Full System Verification

- [ ] **Step 1: Run full Vitest suite (`npx vitest run`)**
- [ ] **Step 2: Run production Next.js build (`npm run build`)**
