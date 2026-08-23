# Unified Learning Detail Controls Specification

## Overview
Standardize the look, feel, icons, typography, and sizing of Japanese reading aids and audio controls (요미가나 토글, 한국어 해석 토글, 음성 TTS 듣기) across all learning detail pages (학습일기, 경어 대화, 애니 톤 일본어 등).

## Problem Statement
- **학습일기 (`DiaryDetail.tsx`)**: 요미가나 및 한국어 해석 버튼에 아이콘이 없고 텍스트만 있으며, 일기 듣기 TTS 버튼과 높이/외곽선 두께/여백이 미세하게 불일치함.
- **경어 예문 (`DialoguePlayer.tsx`)**: 요미가나/해석 버튼은 아이콘이 없는 반면, 전체 듣기 버튼은 아이콘(`record_voice_over`)이 있어 시각적 불균형 발생.
- **애니 톤 일본어 (`AnimeQuoteCard.tsx`)**: 요미가나 버튼이 `あ` 텍스트의 11px 초소형 버튼인 반면, 듣기 버튼은 아이콘 형태의 md 크기 버튼으로 서로 다른 스타일과 크기를 가짐.
- **`TtsButton`**: 기본 테두리가 `border border-black shadow-[1.5px_1.5px_...#000]`로 되어 있어 프로젝트 표준인 `border-2 border-black shadow-[2px_2px_...#000]`와 규격 불일치.

## Design Specification

### 1. Standardized Action Control Bar (3-Button Layout)
Applied to: `DiaryDetail.tsx` (학습일기), `DialoguePlayer.tsx` (경어 대화).

- **Container**: `flex items-center gap-2 mb-4`
- **Button Tokens**:
  - `border-2 border-black rounded-xl py-2 px-2.5 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]`
- **Button 1: 요미가나 (Furigana Toggle)**
  - Icon: `<span className="material-symbols-outlined text-sm">translate</span>`
  - Active: `bg-grape-punch text-white`
  - Inactive: `bg-paper-white text-type-black/70 hover:bg-canvas-almond/60`
  - Label: `요미가나` (또는 `요미가나 ON/OFF`)
- **Button 2: 한국어 해석 (Translation Toggle)**
  - Icon: `<span className="material-symbols-outlined text-sm">subtitles</span>`
  - Active: `bg-sakura-pink text-type-black`
  - Inactive: `bg-paper-white text-type-black/70 hover:bg-canvas-almond/60`
  - Label: `한국어 해석`
- **Button 3: 음성 듣기 (TTS / Audio Player)**
  - Icon: `<span className="material-symbols-outlined text-sm">volume_up</span>` (대화의 경우 `record_voice_over` or `volume_up`)
  - Active: `bg-sakura-pink text-type-black animate-pulse`
  - Inactive: `bg-paper-white text-type-black hover:bg-shiba-orange/20`
  - Label: `일기 듣기` / `대화 듣기`

### 2. Standardized Card Quote Controls (Card-Level Layout)
Applied to: `AnimeQuoteCard.tsx` (애니 톤 일본어).

- **Buttons**:
  - **요미가나 토글 버튼**:
    - Style: `px-2.5 py-1.5 rounded-xl text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 transition-all active:scale-95`
    - Icon: `<span className="material-symbols-outlined text-sm">translate</span>`
    - Label: `요미가나`
    - Active: `bg-matcha-green text-type-black` / Inactive: `bg-paper-white text-type-black/70`
  - **TTS 듣기 버튼**:
    - Style: `px-2.5 py-1.5 rounded-xl text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1`
    - Icon: `volume_up`
    - Label: `듣기` (or icon-only with matched 32px height)

### 3. `TtsButton` Component Token Standardization
- Standardize borders to `border-2 border-black` and shadows to `shadow-[2px_2px_0px_0px_#000]` across all size presets (`sm`, `md`, `lg`).
