# 사쿠라 시바 🌸

일기 쓰기와 경어(敬語) 레슨을 하나로 합친 통합 일본어 학습 앱입니다. 
**Sakura Shiba (Sticker Bomb Edition)** 디자인 시스템 적용.

---

## 주요 기능

### 🐕 시바견 마스코트 시스템
- AI로 생성한 **Whimsical Sticker Bomb** 스타일 시바견 캐릭터를 앱 전체 마스코트로 사용
- **오버레이 레이어 시스템**: 기본 시바견 이미지 위에 투명 PNG 아이템 오버레이를 겹쳐서 착용 효과 구현
 - 레벨에 관계없이 아이템 미착용 시 항상 기본 시바견 표시
 - 착용 아이템 조합에 따라 다양한 코디 가능
- **20개 아이템** (스탬프로 상점 구매 → 옷장에서 착용/해제):

 | 카테고리 | 아이템 | 비용 | 레벨 | 희귀 |
 |----------|--------|------|------|------|
 | 🐕 기본 | 기본 (아이템 없음) | 0 | 1 | - |
 | 🧢 머리 | 야구 모자 | 5 | 1 | - |
 | 💃 머리 | 밴다나 | 4 | 1 | - |
 | 🎌 머리 | 하치마키 | 7 | 2 | - |
 | 🎅 머리 | 산타 모자 | 8 | 2 | - |
 | 😈 머리 | 악마 뿔 | 12 | 3 | - |
 | 😇 머리 | 천사 후광 | 15 | 4 | - |
 | 🌸 머리 | 꽃관 | 16 | 3 | ★ |
 | 👑 머리 | 왕관 | 20 | 5 | ★ |
 | 🦊 얼굴 | 여우 가면 | 18 | 4 | ★ |
 | 👹 얼굴 | 오니 가면 | 18 | 4 | ★ |
 | 😎 얼굴 | 선글라스 | 10 | 3 | - |
 | ✨ 귀 | 금 귀걸이 | 10 | 2 | - |
 | 💎 귀 | 다이아 귀걸이 | 22 | 5 | ★ |
 | 🎀 목 | 나비 넥타이 | 5 | 1 | - |
 | 🧣 목 | 목도리 | 6 | 2 | - |
 | 🧶 목 | 체스 머플러 | 8 | 2 | - |
 | 📿 목 | 진주 목걸이 | 14 | 3 | - |
 | 🦸 몸 | 영웅 망토 | 15 | 4 | - |
 | 👘 몸 | 하카마 | 20 | 5 | ★ |
 | ⚔️ 몸 | 사무라이 갑옷 | 25 | 6 | ★ |

- **`ShibaAvatar` 컴포넌트**: `level`, `equippedItemIds`, `size`, `sticker`, `wobble`, `circular`, `triggerLevelUp` prop 제어
- **z-index 레이어 순서**: 머리 위(30) → 얼굴(22) → 귀(18) → 목(14~16) → 몸통(6~10)
- **레벨업 애니메이션** (Framer Motion):
 - 16개 컬러 파티클 360° 폭발 이펙트
 - 바운스 + 황금빛 글로우 스케일 애니메이션
 - `Lv.N!` 배지 팝업
 - 원형 모드 시 확장 링 이펙트
- **착용 변경 애니메이션**: 아이템 착용/해제 시 바운스 + 밝기 이펙트
- **LessonCompleteBanner 연동**: 레벨업 시 이모지 대신 아바타 변신 연출

### 📔 개인 일기
- 매일 주제를 선택해 일본어 일기 작성
- **일본어 전용 입력**: 히라가나·가타카나·한자·일본어 구두점만 입력 가능 (한글·영문·숫자 등 자동 차단)
- **AI 튜터 리뷰**: 작성한 일기를 Gemini AI가 문법·어휘·표현 자연성 검토 → 문장별 수정 포인트 + 개선안 제시
  - 종합 점수(0~100점) + 레벨 뱃지
  - 문장별 원문 ↔ 개선안 비교, 「개선안 적용」 원클릭 반영
  - Gemini API 키 없으면 규칙 기반 검사(시제·경어체·조사)로 자동 폴백
- **공개 설정**: 일기마다 커뮤니티 공개 여부 선택 (기본 비공개) + AI 튜터 리뷰 별도 공개 토글
- 완료 시 XP와 스탬프 획득

### 🌸 커뮤니티
- 공개된 일기를 피드 형태로 열람 — 다른 학습자의 시바 아바타 + 레벨 + 일기 내용 카드
- **공감(🌸)**: 즉각 반응하는 optimistic update 적용 — 서버 응답 전에 UI 즉시 반영
- **댓글**: 자유 댓글 작성 (500자 이하), 본인 댓글 삭제 가능
- **AI 튜터 리뷰 공개**: 작성자가 허용한 경우 상세 페이지에서 AI 첨삭 결과 함께 열람
- **받은 반응 탭**: 내 공개 일기에 달린 공감·댓글 타임라인
- **하단 네비 배지**: 최근 7일 이내 새 반응이 있을 때 커뮤니티 탭에 빨간 점 표시
- **신고 & 차단**: 부적절한 일기·댓글 신고 / 사용자 차단 (양방향 피드 필터링)
- 게스트도 피드·상세 읽기 가능, 공감·댓글 시도 시 로그인 유도

### 📚 학습 일기
- 100개의 카테고리별 학습 일기 (10개 카테고리 × 10개 엔트리)
- **카테고리**: 일상, 음식, 여행, 계절, 감정, 학교, 직장, 취미, 쇼핑, 건강
- **구성**: 일본어 본문 → 어휘 → 문법 → 퀴즈
- **본문**: 8~10문장의 실제 일기 형식 — 날씨·시간대·감정·마무리 감상 포함
- **어휘**: 항목당 4~5개 / **문법 포인트**: 2~3개 (레벨별 복잡도 차등)
- **요미가나·한국어 해석 토글** (기본 OFF) — 본문 탭 내 인라인 토글로 온디맨드 확인
- 완료 시 XP 획득 (+10 XP / 만점 퀴즈 +5 XP 보너스)

### 🎤 경어 레슨
- 비즈니스·접객·사회 상황별 경어 레슨
- **카테고리**: 비즈니스 · 서비스/접객 · 사교
- 대화 → 문법 → 어휘 → 퀴즈 순서로 구성
- **대화 탭**: 요미가나·한국어 해석 토글 (기본 OFF) — 화자 이름 기반으로 🐰/🐻 아이콘 정확 매칭
- **어휘 탭**: 한자 포함 단어에 루비 문자 기본 표시 (`src/data/vocabReadings.ts` 매핑 기반)

### 🗂️ 문법·어휘 단어장
- 홈 메뉴에서 접근 가능한 `/learning/grammar` · `/learning/vocabulary` 페이지
- **연계 학습**: 유저가 퀴즈까지 완료한 경어 레슨 + 학습 일기에서 문법 포인트·어휘를 자동 수집
- rule/word 기준 **중복 제거** — 같은 항목이 여러 레슨에 등장해도 한 번만 표시
- 각 항목에 **출처 레슨/일기 제목** 표시
- 경어 레슨 어휘는 `vocabReadings.ts` 매핑으로 reading 자동 보완
- 완료한 레슨이 없으면 빈 상태 안내 + 경어·학습 일기 바로가기 링크

### ⭐ 게임화 시스템
- **XP**: 일기 +10 XP / 경어 레슨 최초 완료 +15 XP / 퀴즈 만점 +5 XP
- **레벨**: 6단계 (0 → 50 → 120 → 210 → 320 → 450 XP)
- **스탬프 보드**: 활동 완료마다 스탬프 수집
- **옷장**: 스탬프로 아이템 구매, 레벨 조건 충족 시 착용 가능

### 🛡️ 어드민 패널
- 사용자 관리, 콘텐츠(토픽) 관리, 레벨·보상 설정
- **신고 관리** (`/admin/reports`): 미처리 신고 목록 → 무시 또는 콘텐츠 삭제 처리
- Next.js middleware + layout 이중 권한 검증 (role === "admin")

---

## 디자인 시스템 — Sakura Shiba Sticker Bomb Edition

`Design.md` 기반. `src/app/globals.css`의 `@theme` 블록에 정의된 디자인 토큰을 전체 앱에 일관되게 적용합니다.

### 색상 토큰

| 토큰 | Hex | 역할 |
|------|-----|------|
| `sakura-blush` | `#ffe4ec` | 메인 페이지 배경 |
| `canvas-almond` | `#ffe9ce` | 헤더·섹션 구분 배경 |
| `paper-white` | `#ffffff` | 카드 표면 |
| `type-black` | `#000000` | 모든 텍스트 |
| `sakura-pink` | `#ffb7c5` | 브랜드 액센트, 주요 버튼 |
| `shiba-orange` | `#ffa54f` | 마스코트 포인트 |
| `grape-punch` | `#8a53ff` | 경어 레슨·보조 액센트 |
| `matcha-green` | `#3ccb09` | 완료·정답 피드백 |

### 컴포넌트 패턴

| 패턴 | 설명 |
|------|------|
| **Wobbly Card** | `border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px]` + `.wobbly-1~5` 회전 |
| **Bubble Card** | `rounded-[144px] shadow-[0px_0px_0px_2px_#ffd80c]` (말풍선 형태) |
| **Sticker** | `.sticker` 클래스: 흰 테두리 + drop-shadow |
| **주요 버튼** | `bg-sakura-pink border-2 border-black shadow-[4px_4px_0px_0px_#000]` (hover 시 이동) |
| **헤더** | `bg-canvas-almond border-b-4 border-black` |

### 폰트
- **Zen Maru Gothic** (Google Fonts) — 둥글고 표현력 있는 고딕체
- **Noto Sans KR** — 한국어 보조 폰트

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-based `@theme` config) |
| DB | Prisma + SQLite |
| Auth | NextAuth.js v4 (Credentials Provider, JWT) |
| State | Zustand (경어 진행상황 persist) |
| Animation | Framer Motion |
| Testing | Vitest (144 tests) |
| AI Tutor | Gemini 3.1 Flash Lite Preview (Google AI Studio OpenAI-compat API) |
| Font | Zen Maru Gothic + Noto Sans KR |

---

## 시작하기

### 사전 요구사항
- Node.js 18+
- npm

### 설치

```bash
# 패키지 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에서 NEXTAUTH_SECRET, NEXTAUTH_URL 값을 설정하세요

# DB 초기화
npx prisma generate
npx prisma db push

# 옷장 아이템 시드 (21개 기본 아이템)
npx tsx prisma/seed-wardrobe.ts
```

### 개발 서버 실행

```bash
npm run dev
# http://localhost:3000
```

> ⚠️ **중요**: `.env`의 `NEXTAUTH_URL`을 실제 실행 포트와 동일하게 설정해야 로그인이 정상 동작합니다. 
> 개발 시: `NEXTAUTH_URL="http://localhost:3000"` 
> 프로덕션 시: `NEXTAUTH_URL="http://localhost:8000"` (또는 실제 도메인)

### 프로덕션 빌드 및 실행

```bash
npm run build
npm run start
# 또는 특정 포트 지정:
npx next start -p 8000
```

> ⚠️ `npm run build` 후에는 반드시 서버를 재시작해야 새 빌드가 반영됩니다.

### 테스트 실행

```bash
# 전체 테스트
npx vitest run

# 특정 테스트 파일
npx vitest run src/lib/__tests__/streak.test.ts
npx vitest run src/lib/__tests__/admin-auth.test.ts
npx vitest run src/lib/__tests__/wardrobe.test.ts
```

---

## 환경 변수

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000" # 실제 실행 URL과 일치해야 함

# Gemini API — 일기 AI 튜터 리뷰용 (없으면 규칙 기반 검사로 동작)
GOOGLE_API_KEY=your_google_ai_studio_key
# GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai  # 기본값, 필요시 오버라이드
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/              # 인증 페이지 (BottomNav 없음)
│   │   ├── login/           # 로그인 + 회원가입
│   │   └── onboarding/      # 가입 후 이름 설정
│   ├── (app)/               # 메인 앱 (BottomNav 포함)
│   │   ├── home/            # 통합 허브 대시보드
│   │   ├── diary/           # 일기 목록, 토픽 선택, 작성 + 학습일기
│   │   ├── keigo/           # 경어 레슨 목록 + 상세
│   │   ├── community/       # 커뮤니티 피드 + 받은 반응 탭 + 일기 상세
│   │   ├── profile/         # 프로필, XP, 통계
│ │ ├── wardrobe/ # 옷장 (DB 기반, 스탬프 구매, 착용/해제)
│ │ ├── shop/ # 상점 (스탬프로 아이템 구매)
│   │   └── learning/        # 문법·어휘 정리
│   ├── admin/               # 어드민 패널 (middleware 권한 검증)
│   └── api/                 # NextAuth, 회원가입, 경어 동기화
├── components/
│ ├── keigo/ # 경어 전용 컴포넌트
│ ├── learningDiary/ # 학습 일기 컴포넌트 (RubyText, Filter, Card)
│ ├── diary/ # 일기 AI 튜터 리뷰 컴포넌트
│ ├── community/ # 커뮤니티 컴포넌트 (PublicDiaryCard, LikeButton, CommentSection, ReportModal)
│ ├── mascot/ # ShibaAvatar (오버레이 레이어 시스템 + 레벨업/착용 애니메이션)
│ ├── wardrobe/ # PurchaseButton, EquipButton (클라이언트)
│ ├── guest/ # GuestSignupBanner, GuestUpsellModal
│ ├── ui/ # 공유 UI (Button, Card, ProgressBar)
│ └── layout/ # BottomNav, AdminBottomNav
├── actions/ # 서버 액션 (diary, diaryTutor, keigo, learningDiary, user, wardrobe, community)
├── data/
│   ├── lessons.ts           # 경어 레슨 데이터 (30개)
│   ├── vocabReadings.ts     # 경어 어휘 루비 문자 읽기 매핑
│   └── learningDiaries.ts   # 100개 학습 일기 (ld_p1~p10)
├── store/                   # Zustand 스토어
├── lib/ # auth, db, xp, streak, wardrobe, admin-auth, rubyParser, japaneseInput 유틸리티
└── types/                   # TypeScript 타입 정의
```

---

## 데이터베이스 스키마

- `User` — 사용자 계정 (role: "user" | "admin")
- `Account` / `Session` — NextAuth 인증
- `Diary` — 개인 일기 (`isPublic`, `isTutorPublic`, `tutorReview` 필드 포함)
- `UserProgress` — XP, 레벨, 스탬프, 연속 학습일
- `KeigoLessonProgress` — 경어 레슨 완료 기록
- `LearningDiaryProgress` — 학습 일기 완료 기록 (퀴즈 점수, XP)
- `WardrobeItem` — 옷장 아이템 (스탬프 비용, 필요 레벨)
- `UserWardrobeItem` — 사용자 보유 아이템
- `Topic` — 일기 토픽 (어드민 관리)
- `Like` — 공개 일기 공감 (userId + diaryId 복합 유니크)
- `Comment` — 공개 일기 댓글 (500자 제한, 작성자만 삭제 가능)
- `UserBlock` — 사용자 차단 (양방향 피드 필터링)
- `Report` — 일기·댓글 신고 (어드민 검토 후 처리)

---

## 보안

- **Admin 경로 보호**: Next.js middleware에서 JWT 토큰의 role 검증 → 비관리자 접근 시 `/home` 리다이렉트
- **이미지 도메인 제한**: `next.config.ts`에서 `lh3.googleusercontent.com`만 허용 (마스코트는 `/public/mascot/` 로컬 경로 사용)
- **스트릭 무결성**: 같은 날 중복 학습 시 `streakDays`가 증가하지 않음
- **커뮤니티 접근 제어**: 비공개 일기 URL 직접 접근 → `notFound()` / 차단 관계 양방향 검사 → 피드·상세 모두 필터링
- **댓글 소유권 검증**: 서버 액션에서 `assertCommentOwner` 검사 → 타인 댓글 삭제 불가

---

## 관리자 계정 설정

회원가입 후 DB에서 직접 role을 변경합니다:

```bash
npx prisma studio
# User 테이블 → role 필드를 "admin"으로 변경
```

---

## 라이선스

Private
