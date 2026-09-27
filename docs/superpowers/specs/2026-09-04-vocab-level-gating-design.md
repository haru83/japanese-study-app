# 어휘 메뉴 레벨별 해금 시스템 설계 문서 (Vocab Level Gating System Spec)

**작성일자:** 2026-09-04  
**목표:** 어휘(Vocab) 허브의 3대 추가 학습 콘텐츠(주제별 단어, 재미있는 숙어, 헷갈리는 문법)에 유저 레벨(Lv.1 ~ Lv.10)에 따른 단계적 해금 시스템 구축

---

## 1. 배경 및 목적
기존 어휘 메뉴는 레벨과 무관하게 100개 주제/숙어/문법 전체가 즉시 노출되었습니다.  
사용자의 학습 몰입도와 레벨업 동기(경험치 획득 욕구)를 강화하기 위해, 사용자 레벨에 따라 볼 수 있는 어휘 및 학습 콘텐츠의 개수가 10개씩 단계적으로 확장되는 레벨 게이팅(Level Gating) 시스템을 도입합니다.

---

## 2. 레벨별 해금 공식 및 데이터 매핑 규칙
전체 콘텐츠는 100개이며, 최대 레벨은 Lv.10입니다.  
각 레벨당 **정확히 10개씩** 순차 해금되어, **Lv.10 달성 시 100개 전체**가 해금됩니다.

### 2.1 주제별 단어 (`TOPIC_LIST`: 10개 카테고리 × 10개 주제 = 100개)
- **분배 원칙**: 카테고리별 균등 분배
- 10개 카테고리(travel, food, daily, shopping, health, business, entertainment, relationship, study, society) 각각에 10개씩의 세부 주제가 존재합니다.
- 각 카테고리의 $k$번째(1~10) 주제는 `Lv.k`에 해금됩니다.
- 공식:
  ```ts
  export function getTopicRequiredLevel(topicId: string): number
  ```
  각 카테고리 내에서의 순서(1~10)를 `requiredLevel`로 부여합니다.
  - `Lv.1`: 10개 (각 카테고리의 1번 대표 주제)
  - `Lv.2`: 20개 누적 (+10개)
  - ...
  - `Lv.10`: 100개 전체 해금

### 2.2 재미있는 숙어 (`IDIOMS_DATA`: 4개 카테고리 × 25개 관용구 = 100개)
- **분배 원칙**: 4대 카테고리(신체, 동물, 감정, 일상)별 균등 분배
- 각 카테고리(25개) 내 순서에 따라 2~3개씩 배정하여, 4개 카테고리 합산 시 **각 레벨마다 정확히 10개**가 배정됩니다.
- 공식:
  ```ts
  export function getIdiomRequiredLevel(idiomId: string): number
  ```
  - Lv.1: 10개 해금
  - Lv.2: 20개 누적 (+10개)
  - ...
  - Lv.10: 100개 전체 해금

### 2.3 헷갈리는 문법 (`CONFUSING_GRAMMAR_DATA`: 100개 항목 `cg-01` ~ `cg-100`)
- **분배 원칙**: JLPT 난이도 체계 및 카테고리 균형
- 기초 N5/N4 문형(30개) ➡️ 중급 N3 문형(30개) ➡️ 중상급 N2 문형(20개) ➡️ 고급 N1 문형(20개)
- 공식:
  ```ts
  export function getConfusingGrammarRequiredLevel(grammarId: string): number
  ```
  - Lv.1~3: 기초 N5/N4 (각 10개씩, 총 30개)
  - Lv.4~6: 중급 N3 (각 10개씩, 총 30개)
  - Lv.7~8: 중상급 N2 (각 10개씩, 총 20개)
  - Lv.9~10: 고급 N1 (각 10개씩, 총 20개)

---

## 3. UI 및 인터랙션 사양 (WangWang Design System)

### 3.1 해금된 카드 (기존 상태 유지)
- 선명한 배경색 및 테두리 (`border-2 border-black shadow-[4px_4px_0px_0px_#000]`)
- 모든 상호작용(발음 재생, 단어장 북마크, 아코디언 토글, 퀴즈) 자유롭게 이용 가능

### 3.2 잠긴 카드 (`requiredLevel > userLevel`)
- 시각적 스타일:
  - 투명도 감쇄: `opacity-65 bg-paper-white/70`
  - 배지 표시: 우측 상단에 `🔒 Lv.X 해금` 노란색 배지 (`bg-amber-300 text-type-black text-[11px] font-black px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]`)
- 인터랙션 제한:
  - 세부 내용(예문, 상세 해설, 퀴즈)은 비공개
  - 카드 탭 시 친절한 토스트/안내 알림:
    > *"🔒 이 콘텐츠는 Lv.X 달성 시 열려요! (현재: Lv.Y) 일기나 경어 레슨을 완료하여 레벨을 올려보세요 🐾"*

### 3.3 목록 상단 헤더 및 필터링 편의
- **해금 진행률 인디케이터**:
  - `해금됨 X / 100개` 배지 제공
- **'해금된 것만 보기' 필터 토글**:
  - 북마크 필터와 마찬가지로, 아직 잠겨 있는 카드를 숨기고 현재 학습 가능한 카드만 집중해서 볼 수 있는 원터치 필터 토글 버튼 제공

---

## 4. 아키텍처 및 구현 모듈
1. **`src/lib/contentGate.ts`**:
   - `getTopicRequiredLevel(topicId)`
   - `getIdiomRequiredLevel(idiomId)`
   - `getConfusingGrammarRequiredLevel(grammarId)`
   - `isVocabItemUnlocked(requiredLevel, userLevel)`
2. **서버 컴포넌트 (`page.tsx`)**:
   - `src/app/(app)/learning/topics/page.tsx`: 유저 `userLevel` 조회 후 `TopicVocabClient`에 전달
   - `src/app/(app)/learning/idioms/page.tsx`: 유저 `userLevel` 조회 후 `IdiomsClient`에 전달
   - `src/app/(app)/learning/confusing-grammar/page.tsx`: 유저 `userLevel` 조회 후 `ConfusingGrammarClient`에 전달
3. **클라이언트 컴포넌트**:
   - `TopicVocabClient.tsx`: `userLevel` prop 수신, 잠긴 주제 카드 렌더링, '해금된 것만 보기' 필터
   - `IdiomsClient.tsx`: `userLevel` prop 수신, 잠긴 숙어 카드 렌더링, '해금된 것만 보기' 필터
   - `ConfusingGrammarClient.tsx`: `userLevel` prop 수신, 잠긴 문법 카드 렌더링, '해금된 것만 보기' 필터
4. **테스트 및 검증**:
   - `src/lib/__tests__/contentGate.test.ts`: 각 레벨별 해금 개수(정확히 10개씩), 1~10레벨 누적 검증 단위 테스트 작성
