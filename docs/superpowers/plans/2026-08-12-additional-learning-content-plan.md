# Additional Learning Content (+100 Keigo, +100 Diaries) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and integrate 100 new Keigo lessons and 100 new Learning Diary entries, expanding totals from 100 to 200 items each, complete with database seeding and full test validation.

**Architecture:** Split content into modular files (`ld_p11.ts` ~ `ld_p20.ts` and `kl_p2.ts` ~ `kl_p6.ts`), aggregate them in the main data export files (`learningDiaries.ts` and `lessons.ts`), update `prisma/seed-learning.ts` to seed all 400 entries into SQLite, and verify with tests and build.

**Tech Stack:** TypeScript, Next.js 15, Prisma ORM, SQLite, Vitest.

## Global Constraints

- strict: true TypeScript compliance without `any` or `@ts-ignore`.
- Path alias `@/*` maps to `./src/*`.
- Keigo lessons must conform to `Lesson` interface (`src/types/lesson.ts`).
- Learning diary entries must conform to `LearningDiary` interface (`src/types/learningDiary.ts`).

---

### Task 1: Create 100 New Learning Diary Entries (`ld_p11.ts` ~ `ld_p20.ts`) & Update Aggregator

**Files:**
- Create: `src/data/ld_p11.ts` (ld-101 ~ ld-110, Category: 일상)
- Create: `src/data/ld_p12.ts` (ld-111 ~ ld-120, Category: 음식)
- Create: `src/data/ld_p13.ts` (ld-121 ~ ld-130, Category: 여행)
- Create: `src/data/ld_p14.ts` (ld-131 ~ ld-140, Category: 계절)
- Create: `src/data/ld_p15.ts` (ld-141 ~ ld-150, Category: 감정)
- Create: `src/data/ld_p16.ts` (ld-151 ~ ld-160, Category: 학교)
- Create: `src/data/ld_p17.ts` (ld-161 ~ ld-170, Category: 직장)
- Create: `src/data/ld_p18.ts` (ld-171 ~ ld-180, Category: 취미)
- Create: `src/data/ld_p19.ts` (ld-181 ~ ld-190, Category: 쇼ピング)
- Create: `src/data/ld_p20.ts` (ld-191 ~ ld-200, Category: 건강)
- Modify: `src/data/learningDiaries.ts`

**Interfaces:**
- Consumes: `LearningDiary` type from `@/types/learningDiary`
- Produces: `part11` ~ `part20` arrays and updated `learningDiaries` array containing 200 items.

- [ ] **Step 1: Write test validating total learning diary count and schema**

```typescript
// src/data/__tests__/learningDiaries.test.ts
import { describe, it, expect } from "vitest";
import { learningDiaries } from "../learningDiaries";

describe("Learning Diaries Data", () => {
  it("should contain exactly 200 diary entries", () => {
    expect(learningDiaries.length).toBe(200);
  });

  it("should have unique IDs for all entries", () => {
    const ids = learningDiaries.map((d) => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(200);
  });

  it("should have valid fields on all entries", () => {
    for (const diary of learningDiaries) {
      expect(diary.id).toBeTruthy();
      expect(diary.title).toBeTruthy();
      expect(diary.titleKo).toBeTruthy();
      expect(diary.contentJp.length).toBeGreaterThan(0);
      expect(diary.contentKo).toBeTruthy();
      expect(diary.vocabulary.length).toBeGreaterThan(0);
      expect(diary.grammarPoints.length).toBeGreaterThan(0);
      expect(diary.quiz.length).toBe(3);
    }
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run src/data/__tests__/learningDiaries.test.ts`
Expected: FAIL (currently 100 entries)

- [ ] **Step 3: Create `ld_p11.ts` through `ld_p20.ts` files with 10 entries each**

Populate each file with high-quality `LearningDiary` entries following the established structure.

- [ ] **Step 4: Update `src/data/learningDiaries.ts` to export all 200 entries**

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/data/__tests__/learningDiaries.test.ts`
Expected: PASS

- [ ] **Step 6: Commit Task 1**

```bash
git add src/data/ld_p*.ts src/data/learningDiaries.ts src/data/__tests__/learningDiaries.test.ts
git commit -m "feat: add 100 new learning diary entries (ld-101 to ld-200)"
```

---

### Task 2: Create 100 New Keigo Lessons (`kl_p2.ts` ~ `kl_p6.ts`) & Update Aggregator

**Files:**
- Create: `src/data/keigo/kl_p2.ts` (keigo-101 ~ keigo-120)
- Create: `src/data/keigo/kl_p3.ts` (keigo-121 ~ keigo-140)
- Create: `src/data/keigo/kl_p4.ts` (keigo-141 ~ keigo-160)
- Create: `src/data/keigo/kl_p5.ts` (keigo-161 ~ keigo-180)
- Create: `src/data/keigo/kl_p6.ts` (keigo-181 ~ keigo-200)
- Modify: `src/data/lessons.ts`

**Interfaces:**
- Consumes: `Lesson` type from `@/types/lesson`
- Produces: `kl_p2` ~ `kl_p6` arrays and updated `lessons` array containing 200 items.

- [ ] **Step 1: Write test validating total keigo lesson count and schema**

```typescript
// src/data/__tests__/lessons.test.ts
import { describe, it, expect } from "vitest";
import { lessons } from "../lessons";

describe("Keigo Lessons Data", () => {
  it("should contain exactly 200 keigo lessons", () => {
    expect(lessons.length).toBe(200);
  });

  it("should have unique IDs for all lessons", () => {
    const ids = lessons.map((l) => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(200);
  });

  it("should have valid fields on all lessons", () => {
    for (const lesson of lessons) {
      expect(lesson.id).toBeTruthy();
      expect(lesson.title).toBeTruthy();
      expect(lesson.category).toBeTruthy();
      expect(lesson.dialogue.length).toBeGreaterThan(0);
      expect(lesson.grammarPoints.length).toBeGreaterThan(0);
      expect(lesson.vocab.length).toBeGreaterThan(0);
      expect(lesson.quiz.length).toBe(3);
    }
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run src/data/__tests__/lessons.test.ts`
Expected: FAIL (currently 100 entries)

- [ ] **Step 3: Create `kl_p2.ts` through `kl_p6.ts` files with 20 lessons each**

Populate each file with high-quality `Lesson` entries covering Business, Hospitality, and Social keigo scenarios.

- [ ] **Step 4: Update `src/data/lessons.ts` to export all 200 lessons**

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/data/__tests__/lessons.test.ts`
Expected: PASS

- [ ] **Step 6: Commit Task 2**

```bash
git add src/data/keigo/ src/data/lessons.ts src/data/__tests__/lessons.test.ts
git commit -m "feat: add 100 new keigo lessons (keigo-101 to keigo-200)"
```

---

### Task 3: Update Seed Script & Seed Database

**Files:**
- Modify: `prisma/seed-learning.ts`

- [ ] **Step 1: Update `prisma/seed-learning.ts` console messages and upsert loop logging**
- [ ] **Step 2: Execute `npx tsx prisma/seed-learning.ts`**
- [ ] **Step 3: Verify SQLite row counts with Node script**

```bash
npx tsx -e '
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const keigoCount = await prisma.keigoLesson.count();
  const diaryCount = await prisma.learningDiaryEntry.count();
  console.log(`Keigo lessons count: ${keigoCount}`);
  console.log(`Learning diary count: ${diaryCount}`);
  if (keigoCount !== 200 || diaryCount !== 200) {
    process.exit(1);
  }
}
main().finally(() => prisma.$disconnect());
'
```

Expected output: `Keigo lessons count: 200`, `Learning diary count: 200`

- [ ] **Step 4: Commit Task 3**

```bash
git add prisma/seed-learning.ts
git commit -m "feat: seed database with 200 keigo lessons and 200 learning diaries"
```

---

### Task 4: Full System Verification

- [ ] **Step 1: Run full Vitest suite**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 2: Run production Next.js build**

Run: `npm run build`
Expected: Successful build without TypeScript or Lint errors
