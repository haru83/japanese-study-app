# 사쿠라 시바 🐕🌸

일기 쓰기와 경어(敬語) 레슨을 하나로 합친 통합 일본어 학습 앱입니다.  
**Sakura Shiba (Sticker Bomb Edition)** 디자인 시스템 적용.

---

## 주요 기능

### 📔 개인 일기
- 매일 주제를 선택해 일본어 일기 작성
- 완료 시 XP와 스탬프 획득

### 📚 학습 일기
- 100개의 카테고리별 학습 일기 (10개 카테고리 × 10개 엔트리)
- **카테고리**: 일상, 음식, 여행, 계절, 감정, 학교, 직장, 취미, 쇼핑, 건강
- **구성**: 일본어 본문 → 한국어 해석 → 어휘 → 문법 → 퀴즈
- 루비 문자(furigana) 표시 토글
- 완료 시 XP 획득 (+10 XP / 만점 퀴즈 +5 XP 보너스)

### 🎤 경어 레슨
- 비즈니스·접객·사회 상황별 경어 레슨
- **카테고리**: 비즈니스 · 서비스/접객 · 사교
- 만화 → 대화 → 문법 → 어휘 → 퀴즈 순서로 구성

### ⭐ 게임화 시스템
- **XP**: 일기 +10 XP / 경어 레슨 최초 완료 +15 XP / 퀴즈 만점 +5 XP
- **레벨**: 6단계 (0 → 50 → 120 → 210 → 320 → 450 XP)
- **스탬프 보드**: 활동 완료마다 스탬프 수집
- **옷장**: 레벨업 보상 아이템

### 🛡️ 어드민 패널
- 사용자 관리, 콘텐츠(토픽) 관리, 레벨·보상 설정

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

---

## 환경 변수

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"   # 실제 실행 URL과 일치해야 함
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/            # 인증 페이지 (BottomNav 없음)
│   │   ├── login/         # 로그인 + 회원가입
│   │   └── onboarding/    # 가입 후 이름 설정
│   ├── (app)/             # 메인 앱 (BottomNav 포함)
│   │   ├── home/          # 통합 허브 대시보드
│   │   ├── diary/         # 일기 목록, 토픽 선택, 작성
│   │   ├── keigo/         # 경어 레슨 목록 + 상세
│   │   ├── profile/       # 프로필, XP, 통계
│   │   ├── wardrobe/      # 옷장
│   │   ├── sticker-board/ # 스탬프 보드
│   │   └── learning/      # 문법·어휘 정리
│   ├── admin/             # 어드민 패널
│   └── api/               # NextAuth, 회원가입, 경어 동기화
├── components/
│   ├── keigo/             # 경어 전용 컴포넌트
│   ├── learningDiary/     # 학습 일기 컴포넌트 (RubyText, Filter, Card)
│   ├── ui/                # 공유 UI (Button, Card, ProgressBar)
│   └── layout/            # BottomNav, AdminBottomNav
├── actions/               # 서버 액션 (diary, keigo, learningDiary, user)
├── data/
│   ├── lessons.ts         # 경어 레슨 데이터
│   └── learningDiaries.ts # 100개 학습 일기
├── store/                 # Zustand 스토어
├── lib/                   # auth, db, xp 유틸리티
└── types/                 # TypeScript 타입 정의
```

---

## 데이터베이스 스키마

- `User` — 사용자 계정
- `Diary` — 개인 일기 항목
- `UserProgress` — XP, 레벨, 스탬프, 연속 학습일
- `KeigoLessonProgress` — 경어 레슨 완료 기록
- `LearningDiaryProgress` — 학습 일기 완료 기록 (퀴즈 점수, XP)
- `WardrobeItem` / `UserWardrobeItem` — 옷장 아이템
- `Topic` — 일기 토픽 (어드민 관리)

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
