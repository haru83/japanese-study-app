# Unified Learning Detail Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize yomigana toggle, translation toggle, and TTS audio buttons across all learning detail views (`DiaryDetail.tsx`, `DialoguePlayer.tsx`, `AnimeQuoteCard.tsx`, `TtsButton.tsx`).

**Architecture:** Establish a standard visual contract for learning action buttons with consistent icons (`translate`, `subtitles`, `volume_up`), button height, border-2 border-black, and shadow-[2px_2px_0px_0px_#000].

**Tech Stack:** Next.js 15, Tailwind CSS v4, Material Symbols Outlined, React 19, Vitest

## Global Constraints
- Strict WangWang Sticker Bomb styling: `border-2 border-black`, `shadow-[2px_2px_0px_0px_#000]`, `rounded-xl`.
- Responsive layout supporting `max-w-md` mobile width without overflowing.
- Strict TypeScript (`strict: true`), no `@ts-ignore` or `as any`.
- All automated unit tests must pass.

---

### Task 1: Standardize `TtsButton` Shared Component
**Files:**
- Modify: `src/components/ui/TtsButton.tsx`

- [ ] **Step 1: Update borders and shadows to 2px black stroke and 2px offset shadow**
- [ ] **Step 2: Align size presets (`sm`, `md`, `lg`) and icon sizing**
- [ ] **Step 3: Ensure label support renders seamlessly alongside icon**

---

### Task 2: Refactor Learning Diary Detail (`DiaryDetail.tsx`)
**Files:**
- Modify: `src/components/learningDiary/DiaryDetail.tsx`

- [ ] **Step 1: Add icons (`translate`, `subtitles`) to Yomigana and Translation toggle buttons**
- [ ] **Step 2: Match height, border-2, and shadow with `TtsButton`**
- [ ] **Step 3: Test toggle state changes and responsive alignment**

---

### Task 3: Refactor Keigo Dialogue Player (`DialoguePlayer.tsx`)
**Files:**
- Modify: `src/components/keigo/DialoguePlayer.tsx`

- [ ] **Step 1: Add icons (`translate`, `subtitles`) to Yomigana and Translation toggle buttons**
- [ ] **Step 2: Match height, border-2, and shadow with the dialogue sequential player button**
- [ ] **Step 3: Verify sequential TTS playback and toggle state changes**

---

### Task 4: Refactor Anime Quotes Cards (`AnimeQuoteCard.tsx`)
**Files:**
- Modify: `src/components/entertainment/AnimeQuoteCard.tsx`

- [ ] **Step 1: Replace tiny `あ` button with standardized Yomigana toggle pill with icon**
- [ ] **Step 2: Update TTS button to match the Yomigana button height and styling**
- [ ] **Step 3: Ensure layout doesn't wrap awkwardly on small screen widths**

---

### Task 5: Verification & Quality Assurance
- [ ] **Step 1: Run Vitest unit tests**
- [ ] **Step 2: Run Next.js production build (`npm run build`)**
- [ ] **Step 3: Commit and deploy to GCP Cloud Run**
