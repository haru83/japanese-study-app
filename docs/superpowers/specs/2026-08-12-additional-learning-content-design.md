# Design Specification: Expand Learning Content (+100 Keigo Lessons, +100 Learning Diaries)

**Date:** 2026-08-12  
**Status:** Approved  
**Target Total:** 200 Keigo Lessons (currently 100) & 200 Learning Diaries (currently 100)

---

## 1. Objectives & Scope

Expand the learning content for the Japanese Study App by creating:
- **100 New Keigo (Honorifics) Lessons** (bringing the total from 100 to 200)
- **100 New Learning Diary Entries** (bringing the total from 100 to 200)

All new content must follow strict TypeScript schema types (`Lesson` and `LearningDiary`), maintain high pedagogical quality, provide full Korean translations, detailed grammar explanations, vocabulary with furigana/readings, and 3 quiz questions per item.

---

## 2. File Organization & Modular Architecture

### A. Keigo Lessons Expansion
- **Current state**: `src/data/lessons.ts` contains `lessons` array (`keigo-1` ~ `keigo-100` / descriptive IDs).
- **New structure**:
  - `src/data/keigo/kl_p2.ts`: Keigo lessons 101–120 (20 items)
  - `src/data/keigo/kl_p3.ts`: Keigo lessons 121–140 (20 items)
  - `src/data/keigo/kl_p4.ts`: Keigo lessons 141–160 (20 items)
  - `src/data/keigo/kl_p5.ts`: Keigo lessons 161–180 (20 items)
  - `src/data/keigo/kl_p6.ts`: Keigo lessons 181–200 (20 items)
  - `src/data/lessons.ts`: Updated to combine `part1` (original 100 lessons) and `kl_p2` through `kl_p6`, exporting all 200 `lessons`.

### B. Learning Diaries Expansion
- **Current state**: `src/data/ld_p1.ts` to `ld_p10.ts` contain 100 entries (`ld-001` ~ `ld-100`), aggregated in `src/data/learningDiaries.ts`.
- **New structure**:
  - `src/data/ld_p11.ts`: Entries `ld-101` ~ `ld-110` (Category: 일상, level breakdown)
  - `src/data/ld_p12.ts`: Entries `ld-111` ~ `ld-120` (Category: 음식)
  - `src/data/ld_p13.ts`: Entries `ld-121` ~ `ld-130` (Category: 여행)
  - `src/data/ld_p14.ts`: Entries `ld-131` ~ `ld-140` (Category: 계절)
  - `src/data/ld_p15.ts`: Entries `ld-131` ~ `ld-150` (Category: 감정)
  - `src/data/ld_p16.ts`: Entries `ld-151` ~ `ld-160` (Category: 학교)
  - `src/data/ld_p17.ts`: Entries `ld-161` ~ `ld-170` (Category: 직장)
  - `src/data/ld_p18.ts`: Entries `ld-171` ~ `ld-180` (Category: 취미)
  - `src/data/ld_p19.ts`: Entries `ld-181` ~ `ld-190` (Category: 쇼핑)
  - `src/data/ld_p20.ts`: Entries `ld-191` ~ `ld-200` (Category: 건강)
  - `src/data/learningDiaries.ts`: Aggregate `part1` ~ `part20`, exporting all 200 `learningDiaries`.

---

## 3. Database & Seeding Pipeline

- **Seed Script**: Update `prisma/seed-learning.ts` to log and upsert all 200 Keigo lessons and all 200 Learning Diaries.
- **Data Integrity**: Ensure unique `id` for each entry and sequential `sortOrder` (1 to 200).
- **Execution**: Run `npx tsx prisma/seed-learning.ts` to seed SQLite database.

---

## 4. Verification & Testing Strategy

1. **TypeScript Build Verification**: Run `npm run build` to verify no type errors across all 200 lessons and 200 diaries.
2. **Unit Tests**: Run `npx vitest run` to ensure all existing test suites pass.
3. **Database Count Verification**: Script check to ensure `prisma.keigoLesson.count()` === 200 and `prisma.learningDiaryEntry.count()` === 200.
