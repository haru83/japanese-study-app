# Unified Platform Header System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize the top header layout across all 7 main navigation views (`/home`, `/diary`, `/keigo`, `/learning`, `/entertainment`, `/community`, `/profile`) to establish platform-wide visual consistency.

**Architecture:** Create/utilize a standardized full-width Almond Header pattern (`bg-canvas-almond border-b-4 border-black`) with title, subtitle, right sticker/avatar badge, and bottom tabs/progress bar across all main menu pages.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19, Framer Motion, Vitest

## Global Constraints
- Strictly follow WangWang Japanese Sticker Bomb design tokens (`bg-canvas-almond`, `border-b-4 border-black`, `border-2 border-black shadow-[4px_4px_0px_0px_#000]`).
- Mobile-first layout constraint (`max-w-md` centered).
- Strict TypeScript (`strict: true`), no `@ts-ignore` or `as any`.
- All unit tests must pass cleanly.

---

### Task 1: Refactor `/diary` Page Header
**Files:**
- Modify: `src/app/(app)/diary/page.tsx`

- [ ] **Step 1: Replace floating centered mascot with full-width Almond Header**
- [ ] **Step 2: Embed mini ShibaAvatar badge and integrated pill tabs**
- [ ] **Step 3: Verify visual alignment and tab switching**

---

### Task 2: Refactor `/learning` (Vocab Hub) Page Header
**Files:**
- Modify: `src/app/(app)/learning/page.tsx`

- [ ] **Step 1: Replace floating card with full-width Almond Header**
- [ ] **Step 2: Add right-side sticker badge (⚡) and title/subtitle**
- [ ] **Step 3: Adjust padding and spacing for content sections below header**

---

### Task 3: Refactor `/entertainment` Page Header
**Files:**
- Modify: `src/app/(app)/entertainment/page.tsx`

- [ ] **Step 1: Replace floating card with full-width Almond Header**
- [ ] **Step 2: Add right-side sticker badge (🍿 / 🎬) and `CULTURE HUB` tag**
- [ ] **Step 3: Adjust spacing for course cards below header**

---

### Task 4: Refactor `/keigo` and `/community` Page Headers for Alignment
**Files:**
- Modify: `src/components/keigo/KeigoLessonList.tsx`
- Modify: `src/app/(app)/community/page.tsx`

- [ ] **Step 1: Standardize `/keigo` header with right-side badge and progress bar**
- [ ] **Step 2: Standardize `/community` header with subtitle and right-side badge (🌸)**
- [ ] **Step 3: Align tab padding and typography consistently**

---

### Task 5: Verification & Quality Assurance
- [ ] **Step 1: Run Vitest unit tests**
- [ ] **Step 2: Run Next.js production build (`npm run build`)**
- [ ] **Step 3: Commit and deploy to GCP Cloud Run**
