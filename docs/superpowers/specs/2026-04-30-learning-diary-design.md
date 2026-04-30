# 학습 일기 기능 설계 (Learning Diary)

**날짜:** 2026-04-30  
**상태:** 승인됨

---

## 개요

현재 `/diary`는 사용자가 직접 작성한 일기만 보여준다. 이 기능은 **학습자료용 일본어 일기 100개**를 추가하여 탭으로 구분해 제공한다. 각 일기는 원문·후리가나·한국어 해석·어휘·문법·퀴즈로 구성되며, 완료 시 XP를 지급한다.

---

## 데이터 구조

### `src/data/learningDiaries.ts`

경어 레슨(`src/data/lessons.ts`)과 동일한 정적 파일 패턴을 사용한다.

```typescript
type RubySegment = {
  text: string
  ruby?: string  // 후리가나 (없으면 plain text)
}

type LearningDiary = {
  id: string                         // "ld-001" ~ "ld-100"
  title: string                      // 일본어 제목
  titleKo: string                    // 한국어 제목
  category: DiaryCategory
  level: "초급" | "중급" | "고급"
  thumbnail: string                  // 이모지
  contentJp: RubySegment[]           // 후리가나 포함 본문
  contentKo: string                  // 전체 한국어 해석
  vocabulary: {
    word: string
    reading: string
    meaning: string
  }[]
  grammarPoints: {
    rule: string
    explanation: string
  }[]
  quiz: {
    question: string
    options: string[]
    answer: number   // 0-based index
    explanation: string
  }[]
}

type DiaryCategory =
  | "일상" | "음식" | "여행" | "계절"
  | "감정" | "학교" | "직장" | "취미"
  | "쇼핑" | "건강"
```

### 난이도 분배 (100개)

| 난이도 | 수준 | 개수 | 특징 |
|--------|------|------|------|
| 초급 | N5·N4 | 34개 | 짧은 문장, 기본 어휘, 현재·과거형 |
| 중급 | N3 | 33개 | 복합 문형, て형·〜ので 등 |
| 고급 | N2·N1 | 33개 | 경어·수동·사역, 긴 문장 |

### 카테고리별 배분 (10개 카테고리 × 10개)

| 카테고리 | 주제 예시 |
|----------|-----------|
| 일상 | 아침 루틴, 편의점, 전철 통근 |
| 음식 | 라멘 가게, 편의점 도시락, 요리 도전 |
| 여행 | 교토 여행, 오사카 맛집, 공항 |
| 계절 | 벚꽃 구경, 여름 축제, 눈 오는 날 |
| 감정 | 시험 긴장, 친구와 다툼, 감사한 하루 |
| 학교 | 수업 발표, 동아리 활동, 졸업식 |
| 직장 | 첫 출근, 회의, 야근 |
| 취미 | 독서, 게임, 요가 |
| 쇼핑 | 옷 구매, 세일, 온라인 쇼핑 |
| 건강 | 병원 방문, 운동 시작, 수면 관리 |

---

## DB 스키마

### 새 모델: `LearningDiaryProgress`

```prisma
model LearningDiaryProgress {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  diaryId     String    // learningDiaries.ts의 LearningDiary.id
  quizScore   Int?
  quizTotal   Int?
  completedAt DateTime  @default(now())
  xpAwarded   Int       @default(0)

  @@unique([userId, diaryId])
}
```

`User` 모델에 추가:
```prisma
learningDiaryProgress LearningDiaryProgress[]
```

---

## 라우트 구조

```
/diary                     기존 페이지 — 탭 UI 추가 (내 일기 / 학습 일기)
/diary/learn               학습 일기 목록 (카테고리·난이도 필터)
/diary/learn/[id]          학습 일기 상세 (5섹션 탭)
```

---

## 컴포넌트 구조

### 재사용 (경어 레슨에서)
- `QuizSection` — 동일하게 사용 가능
- `LessonCompleteBanner` — XP/스탬프 완료 배너 재사용

### 신규
- `src/components/learningDiary/RubyText.tsx` — `RubySegment[]`를 `<ruby>` HTML로 렌더링
- `src/components/learningDiary/DiaryLevelFilter.tsx` — 난이도·카테고리 필터 바
- `src/components/learningDiary/LearningDiaryCard.tsx` — 목록 카드 (완료 배지 포함)

### 페이지 변경
- `src/app/(app)/diary/page.tsx` — `"use client"` 전환, 탭 상태 추가
- `src/app/(app)/diary/learn/page.tsx` — 학습 일기 목록 (신규)
- `src/app/(app)/diary/learn/[id]/page.tsx` — 상세 페이지 (신규)

---

## 서버 액션

### `src/actions/learningDiary.ts`

```typescript
// 완료 처리 + XP 지급
completeLearningDiary(diaryId: string, quizScore: number, quizTotal: number): Promise<XpResult>

// 완료한 diaryId 목록 조회
getCompletedLearningDiaries(): Promise<string[]>
```

XP 규칙:
- 퀴즈 완료 (최초): **+10 XP, +1 스탬프**
- 퀴즈 만점 (score === total): **+5 XP 보너스**
- 이미 완료한 일기: XP 미지급, 결과만 표시

---

## 상세 페이지 UX (`/diary/learn/[id]`)

섹션 탭 순서: `원문 → 해석 → 어휘 → 문법 → 퀴즈`

| 섹션 | 내용 |
|------|------|
| 원문 | 일본어 본문 + 후리가나 토글 스위치 |
| 해석 | 전체 한국어 번역 |
| 어휘 | word / reading / meaning 카드 목록 |
| 문법 | rule + explanation 카드 목록 |
| 퀴즈 | `QuizSection` 재사용, 완료 시 `LessonCompleteBanner` |

---

## 목록 페이지 UX (`/diary/learn`)

- 상단: 난이도 필터 버튼 (전체 / 초급 / 중급 / 고급)
- 하단: 카테고리 필터 가로 스크롤 칩
- 카드: 제목(JP/KO) + 카테고리 + 난이도 + 완료 시 ✅ 배지
- 상단 진행률 표시: `완료 N / 100개`

---

## XP 흐름

```
퀴즈 완료
  └─ completeLearningDiary(diaryId, score, total)
       ├─ LearningDiaryProgress upsert (중복 완료 방지)
       ├─ 최초 완료: UserProgress.xp += 10, totalStamps += 1
       ├─ 만점: UserProgress.xp += 5 추가
       └─ XpResult 반환 → LessonCompleteBanner 표시
```

---

## 구현 우선순위

1. DB 스키마 추가 + migrate
2. `src/data/learningDiaries.ts` — 100개 데이터 작성
3. 서버 액션 (`completeLearningDiary`, `getCompletedLearningDiaries`)
4. 신규 컴포넌트 3개 (`RubyText`, `DiaryLevelFilter`, `LearningDiaryCard`)
5. 목록 페이지 `/diary/learn`
6. 상세 페이지 `/diary/learn/[id]`
7. `/diary` 탭 UI 추가

---

## 검증 방법

1. `/diary` 탭 전환 — 내 일기 ↔ 학습 일기 정상 전환
2. 필터 — 난이도·카테고리 조합 필터링 정상 동작
3. 상세 페이지 — 5섹션 탭 탐색, 후리가나 토글
4. 퀴즈 완료 — XP 증가, 완료 배너 표시, DB 기록
5. 중복 완료 — 이미 완료한 일기 재완료 시 XP 미지급 확인
6. 진행률 — 완료 후 목록 카드에 ✅ 배지, 상단 카운트 갱신
