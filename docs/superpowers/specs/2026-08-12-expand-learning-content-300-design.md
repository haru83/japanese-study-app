# Design Specification: Expand Learning Content (+100 Keigo Lessons, +100 Learning Diaries -> 300 Total Each)

**Date:** 2026-08-12  
**Status:** Approved  
**Target Total:** 300 Keigo Lessons & 300 Learning Diaries

---

## 1. Objectives & Scope

Expand learning content for the Japanese Study App further by creating:
- **100 New Keigo (Honorifics) Lessons** (bringing total from 200 to 300, `keigo-201` ~ `keigo-300`)
- **100 New Learning Diary Entries** (bringing total from 200 to 300, `ld-201` ~ `ld-300`)

All new content must follow strict TypeScript schema types (`Lesson` and `LearningDiary`), maintain high pedagogical quality, provide full Korean translations, detailed grammar explanations, vocabulary with furigana/readings, and 3 quiz questions per item.

---

## 2. File Organization & Modular Architecture

### A. Keigo Lessons Expansion
- **New files**:
  - `src/data/keigo/kl_p7.ts`: Keigo lessons 201–220 (20 items)
  - `src/data/keigo/kl_p8.ts`: Keigo lessons 221–240 (20 items)
  - `src/data/keigo/kl_p9.ts`: Keigo lessons 241–260 (20 items)
  - `src/data/keigo/kl_p10.ts`: Keigo lessons 261–280 (20 items)
  - `src/data/keigo/kl_p11.ts`: Keigo lessons 281–300 (20 items)
  - `src/data/lessons.ts`: Update to combine `part1`, `kl_p2` through `kl_p11`, exporting all 300 `lessons`.

### B. Learning Diaries Expansion
- **New files**:
  - `src/data/ld_p21.ts`: Entries `ld-201` ~ `ld-210` (Category: 일상)
  - `src/data/ld_p22.ts`: Entries `ld-211` ~ `ld-220` (Category: 음식)
  - `src/data/ld_p23.ts`: Entries `ld-221` ~ `ld-230` (Category: 여행)
  - `src/data/ld_p24.ts`: Entries `ld-231` ~ `ld-240` (Category: 계절)
  - `src/data/ld_p25.ts`: Entries `ld-241` ~ `ld-250` (Category: 감정)
  - `src/data/ld_p26.ts`: Entries `ld-251` ~ `ld-260` (Category: 학교)
  - `src/data/ld_p27.ts`: Entries `ld-261` ~ `ld-270` (Category: 직장)
  - `src/data/ld_p28.ts`: Entries `ld-271` ~ `ld-280` (Category: 취미)
  - `src/data/ld_p29.ts`: Entries `ld-281` ~ `ld-290` (Category: 쇼핑)
  - `src/data/ld_p30.ts`: Entries `ld-291` ~ `ld-300` (Category: 건강)
  - `src/data/learningDiaries.ts`: Aggregate `part1` ~ `part30`, exporting all 300 `learningDiaries`.

---

## 3. Database & Seeding Pipeline

- **Seed Script**: `prisma/seed-learning.ts` dynamically seeds all 300 Keigo lessons and all 300 Learning Diaries.
- **Data Integrity**: Ensure unique `id` for each entry and sequential `sortOrder` (1 to 300).
- **Execution**: Run `npx tsx prisma/seed-learning.ts` to seed SQLite database.

---

## 4. Verification & Testing Strategy

1. **Unit Tests**: Run `npx vitest run` to ensure schema tests pass for 300 keigo lessons and 300 learning diaries.
2. **TypeScript Build Verification**: Run `npm run build` to verify no type errors across all 300 lessons and 300 diaries.
3. **Database Count Verification**: Script check to ensure `prisma.keigoLesson.count()` === 300 and `prisma.learningDiaryEntry.count()` === 300.
