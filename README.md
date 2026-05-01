# 다이어리 일본어 📖🎌

일기 쓰기와 경어(敬語) 레슨을 하나로 합친 통합 일본어 학습 앱입니다.

---

## 주요 기능

### 📔 개인 일기
- 매일 주제를 선택해 일본어 일기 작성
- 완료 시 XP와 스탬프 획득

### 📚 학습 일기
- 100개의 카테고리별 학습 일기 (10개 카테고리 × 10개 엔트리)
- **카테고리**: 일상, 음식, 여행, 계절, 감정, 학교, 직장, 취미, 쇼핑, 건강
- **구성**: 일본어 본문 → 한국어 해석 → 어휘 → 문법 → 퀴즈
- **난이도**: 초급, 중급, 고급 혼합
- 원문/해석/어휘/문법/퀴즈 탭 인터페이스
- 루비 문자(furigana) 표시 토글
- 완료 시 XP 획득 (+10 XP / 만점 퀴즈 +5 XP 보너스)

### 🎤 경어 레슨
- 비즈니스·접객·사회 상황별 **100가지** 경어 레슨
- **카테고리**: 비즈니스(37개) · 서비스/접객(29개) · 사교(34개)
- 만화 → 대화 → 문법 → 어휘 → 퀴즈 순서로 구성
- 퀴즈 만점 시 추가 XP 보너스

### ⭐ 게임화 시스템
- **XP**: 일기 +10 XP / 경어 레슨 최초 완료 +15 XP / 퀴즈 만점 +5 XP
- **레벨**: 6단계 (0 → 50 → 120 → 210 → 320 → 450 XP)
- **스탬프 보드**: 활동 완료마다 스탬프 수집
- **옷장**: 레벨업 보상 아이템

### 🛡️ 어드민 패널
- 사용자 관리, 콘텐츠(토픽) 관리, 레벨·보상 설정

---

## 디자인 시스템

`src/app/globals.css`의 `@theme` 블록에 정의된 디자인 토큰을 전체 앱에 일관되게 적용합니다.

### 색상 토큰
| 토큰 | 값 | 용도 |
|------|-----|------|
| `primary` | `#f4af25` | 일기·XP·일반 인터랙션 |
| `keigo` / `keigo-hover` | `#f9a8c9` / `#f472b0` | 경어 레슨 전용 |
| `bg-light` / `bg-dark` | `#f8f7f5` / `#221c10` | 페이지 배경 |
| `surface-dark` | `#2d2416` | 다크모드 카드 배경 |
| `border-dark` | `#3a2e1e` | 다크모드 테두리 |
| `text-main` / `text-sub` | `#1c170d` / `#6b6255` | 본문·보조 텍스트 |

### 공통 컴포넌트 패턴
- **카드**: `bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-orange-50 dark:border-border-dark`
- **페이지 헤더**: `bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm`
- **뒤로가기 버튼**: `p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors`
- **주요 버튼**: `bg-primary rounded-full shadow-[0_4px_0_0_#d97706]` (3D 효과)
- **섹션 탭**: underline 스타일 (`border-b-2 border-[color]`) — 경어·학습일기 상세 공통
- **진행바**: `h-2 rounded-full bg-primary` (또는 `bg-keigo`)
- **레벨 뱃지**: 초급=green / 중급=blue / 고급=purple (다크모드 변형 포함)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-based `@theme` config) |
| DB | Prisma + SQLite |
| Auth | NextAuth.js v4 (Credentials Provider) |
| State | Zustand (경어 진행상황 persist) |
| Animation | Framer Motion 12 |
| Font | Noto Sans KR + Plus Jakarta Sans |

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
# .env 파일에서 NEXTAUTH_SECRET 값을 설정하세요

# DB 초기화
npx prisma generate
npx prisma db push
```

### 개발 서버 실행

```bash
npm run dev
# http://localhost:3000
```

### 빌드

```bash
npm run build
npm run start
```

---

## 환경 변수

`.env` 파일을 생성하고 아래 값을 설정하세요:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
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
│   └── layout/            # BottomNav, AdminBottomNav
├── actions/               # 서버 액션 (diary, keigo, learningDiary, user)
├── data/
│   ├── lessons.ts         # 30개 경어 레슨 데이터
│   ├── learningDiaries.ts # 100개 학습 일기 (part1~part10 병합)
│   ├── ld_p1.ts~ld_p10.ts # 카테고리별 학습 일기 배치 파일 (각 10개 엔트리)
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
