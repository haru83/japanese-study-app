# Unified Platform Header System Design Specification

## Overview
Standardize the top header layout across all 7 main navigation views (`/home`, `/diary`, `/keigo`, `/learning`, `/entertainment`, `/community`, `/profile`) to provide a unified, consistent, and polished user experience under the WangWang Japanese Sticker Bomb design system.

## Problem Statement
Currently, different main pages use conflicting top styles:
- `/diary`: Floating centered avatar without a standard header box.
- `/learning` & `/entertainment`: Floating `rounded-[20px]` almond cards inside page body.
- `/keigo` & `/community`: Full-width `bg-canvas-almond border-b-4 border-black` headers, but with disparate tab/progress alignments and no consistent badge/avatar pattern.

## Design Specification

### 1. Unified Page Header Layout Spec (`PageHeader` or standardized markup)
- **Container**: `bg-canvas-almond px-5 pt-10 pb-4 border-b-4 border-black`
- **Flex Layout**:
  - **Left Section (Title & Subtitle)**:
    - Primary Title: `text-2xl font-black text-type-black tracking-tight`
    - Subtitle/Description: `text-xs font-bold text-type-black/60 mt-1`
    - Optional inline badge/pill
  - **Right Section (Visual Badge / Mascot Sticker)**:
    - Fixed 48px~56px sticker container (`border-2 border-black rounded-[14px] bg-paper-white shadow-[2px_2px_0px_0px_#000]`) or mini `ShibaAvatar` with sticker effect.
  - **Bottom Section (Tabs / Progress)**:
    - Consistent tab navigation pills or progress bar seamlessly anchored to the header bottom.

### 2. Page-by-Page Header Configurations
1. **`/diary` (일기)**:
   - Full-width almond header with `일기 📔` title + subtitle.
   - Right: Mini `ShibaAvatar` (size 52, sticker, wobbly-2).
   - Bottom: Segmented pill tabs (`내 일기` / `학습 일기`).
2. **`/keigo` (경어)**:
   - Full-width almond header with `경어 레슨 🎯` title + completion count/level subtitle.
   - Right: 🎯 / 💼 Sticker badge (`wobbly-3`).
   - Bottom: `<ProgressBar color="grape" />`.
3. **`/learning` (어휘)**:
   - Full-width almond header with `어휘 📚` title + description subtitle.
   - Right: ⚡ SRS Sticker badge (`wobbly-2`).
4. **`/entertainment` (엔터)**:
   - Full-width almond header with `엔터 일본어 🍿` title + description subtitle.
   - Right: 🎬 / 🍿 Sticker badge (`wobbly-1`).
5. **`/community` (커뮤니티)**:
   - Full-width almond header with `커뮤니티 🌸` title + description subtitle.
   - Right: 🌸 Sticker badge (`wobbly-2`).
   - Bottom: Unified tab bar (`모두의 일기` / `자유게시판` / `받은 반응`).
6. **`/profile` (프로필)**:
   - Full-width almond header with `내 프로필 ⚙️` title + user status.
   - Right: Equipped `ShibaAvatar`.

### 3. Verification & Non-Regression
- Maintain mobile-first layout (`max-w-md` centered).
- Ensure existing functionality (tab switches, filters, search, progress bars) works without disruption.
- Run all Vitest unit tests and ensure clean production build.
