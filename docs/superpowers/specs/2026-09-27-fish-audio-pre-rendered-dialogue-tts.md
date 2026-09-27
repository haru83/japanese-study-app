# Fish Audio Pre-rendered Keigo Dialogue & Anime Quotes TTS Specification

## Overview
본 문서는 **왕왕 일본어** 학습 앱의 경어(敬語) 300개 레슨 대화문(총 1,308개 라인) 및 애니메이션 명대사(32개)를 **Fish Audio S2.1 Pro** AI 음성 엔진으로 사전 렌더링(Pre-rendering)하여 고음질 정적 오디오로 제공하고, 스마트 증분 생성 파이프라인을 구축한 기술 명세입니다.

---

## 1. 배경 및 문제점 (Problem Statement)
1. **브라우저 Web Speech API의 기계음 및 기기별 불균일성:**
   - 기존 경어 대화는 클라이언트 브라우저의 `window.speechSynthesis`에 의존하여, 모바일 사파리·안드로이드 크롬·데스크톱 등 OS와 브라우저 환경에 따라 기계음이 나거나 일본어 음성 보이스팩이 설치되지 않은 환경에서는 정상적인 발음 청취가 불가능했습니다.
2. **런타임 API 호출의 비용 및 지연 시간:**
   - 사용자가 대화를 들을 때마다 실시간으로 클라우드 TTS API를 호출하면 지연 시간(TTFB 1~3초) 및 트래픽 요금이 발생합니다.
3. **사전 생성 범위의 불완전성:**
   - 기존 애니메이션 명대사 32개만 Gemini TTS로 사전 생성되어 있었고, 핵심 학습 콘텐츠인 300개 경어 레슨(1,308줄)은 사전 생성된 오디오가 전무했습니다.

---

## 2. 해결 방안 (Solution Architecture)

### 2.1 하이브리드 오디오 재생 파이프라인
* **정적 오디오 우선 재생 (Pre-rendered Static First):**
  * `public/audio/keigo/${lessonId}_${lineIndex}.mp3` 및 `public/audio/anime-quotes/${quoteId}.mp3` 경로의 오디오를 0ms 지연으로 즉시 재생.
* **무중단 자동 폴백 (Graceful Web Speech Fallback):**
  * 네트워크 오류 또는 오디오 파일 부재 시 기존 `speakJapanese()`(Web Speech API)로 자동 전환되어 사용자 학습 흐름 중단 방지.

### 2.2 화자 페르소나 맞춤형 음성 튜닝
Fish Audio의 최신 **S2.1 Pro (`s2.1-pro-free`)** 인라인 감정/스타일 태그 활용:
* **토끼 / 후배 / 여성 화자:** `[polite]` 태그 적용 → 부드럽고 맑은 비즈니스 정중체
* **곰 부장님 / 선배 / 남성 화자:** `[calm]` 태그 적용 → 차분하고 신뢰감 있는 비즈니스 중저음
* **루비 문자 자동 정제:** `[漢字|かんじ]` 형태의 후리가나 표기를 정규식으로 제거하여 순수 일본어 텍스트만 자연스럽게 발화

### 2.3 스마트 증분 렌더러 (`scripts/generate-fish-audio.js`)
* **Incremental Resume (이어받기):**
  * 디스크에 이미 존재하는 오디오 파일은 100% 자동 스킵(`SKIP`).
  * 프로세스가 중단되어도 재실행 시 미생성된 대사만 찾아서 즉시 이어서 생성.
* **Fair Use Rate Limiting & Auto Retry:**
  * 요청 간 1초 안전 인터벌 적용.
  * 429(Rate Limit) 또는 일시적 네트워크 에러 시 지수 백오프(Exponential Backoff, 5초~15초) 기반 자동 재시도 로직 내장.
* **NPM Script 표준화:**
  * `npm run generate:audio` 명령어 한 줄로 전체 또는 증분 일괄 처리.

---

## 3. 구현 세부 사항 (Implementation Details)

### 3.1 파일 및 디렉토리 구조
```text
japanese-study-app/
├── public/
│   └── audio/
│       ├── anime-quotes/          # 32개 애니메이션 명대사 오디오
│       └── keigo/                 # 1,308개 경어 대화문 오디오 (${lessonId}_${i}.mp3)
├── scripts/
│   └── generate-fish-audio.js    # 증분 Fish Audio TTS 배치 렌더러
├── src/
│   └── components/
│       ├── keigo/
│       │   ├── DialoguePlayer.tsx # lessonId 연동, 정적 오디오 우선 + Web Speech 폴백
│       │   └── LessonDetail.tsx   # DialoguePlayer에 lessonId={lesson.id} 주입
│       └── ui/
│           └── TtsButton.tsx      # audioSrc 지원 공통 버튼
└── package.json                   # generate:audio 스크립트 등록
```

### 3.2 컴포넌트 인터페이스 변경
* **`DialoguePlayerProps`**:
  ```typescript
  interface DialoguePlayerProps {
    dialogue: DialogueLine[];
    lessonId?: string; // 오디오 파일 경로 매핑용
  }
  ```
* **대화문 순차 재생 (`playSequentially`)**:
  * `audioRef`를 통해 정적 오디오를 한 문장씩 순차 재생(`onended` → 다음 문장 트리거).
  * 에러 발생 시 `speakJapanese`로 자동 폴백하여 연속 재생 흐름 유지.

---

## 4. 검증 결과 (Verification)
* **총 오디오 생성 현황:**
  * 애니메이션 명대사: 32개 파일 (100%)
  * 경어 대화 오디오: 1,308개 파일 (100%)
  * 총 디스크 용량: 약 108MB (Cloud Run 서빙에 최적화된 경량 MP3 포맷)
* **동작 검증:**
  * `npm run generate:audio -- --dry-run` 수행 시 `이미 존재하는 파일: 1,340개 (건너뜀), 새로 생성할 파일: 0개` 확인 완료.
  * `npx tsc --noEmit` 타입 체크 통과 (0 errors).
