# 커뮤니티 — 공개 일기 & 소통 기능 디자인 스펙

**날짜:** 2026-05-06
**상태:** 승인됨

---

## 1. 개요

사용자가 자신의 일본어 일기를 선택적으로 공개하고, 다른 학습자의 공개 일기를 읽으며 공감과 댓글로 서로를 응원할 수 있는 커뮤니티 기능을 추가한다.

### 핵심 목표
- 혼자 쓰는 일기에서 "함께 배우는" 경험으로 확장
- 공개 여부는 작성자가 일기마다 의식적으로 결정 (기본 비공개)
- 악플보다 응원이 오가는 따뜻한 학습 커뮤니티

---

## 2. 결정 사항

| 항목 | 결정 |
|---|---|
| 공개 단위 | 일기마다 토글, 기본값 비공개 |
| 작성자 표시 | 프로필 이름 + 시바 아바타 (레벨/장착 아이템 반영) |
| 반응 종류 | 공감(🌸) 1종 + 자유 댓글 |
| 모더레이션 | 신고 버튼 + 본인 댓글 삭제 + 사용자 차단, 관리자 검토 |
| 커뮤니티 진입점 | 하단 네비 "커뮤니티" 탭 신설 (4칸 → 5칸) |
| 피드 정렬 | 최신순 |
| AI 튜터 리뷰 공개 | 별도 토글, 기본값 비공개, isPublic=false일 때 비활성화 |
| 알림 | 인앱만 — 커뮤니티 탭 배지 + "받은 반응" 섹션 |
| 게스트 접근 | 피드/상세 읽기 가능, 공감/댓글은 GuestUpsellModal |

---

## 3. 데이터 모델

### 3-1. 기존 `Diary` 모델 수정

```prisma
model Diary {
  // 기존 필드 유지
  isPublic       Boolean   @default(false)
  isTutorPublic  Boolean   @default(false)
  likes          Like[]
  comments       Comment[]
}
```

### 3-2. 신규 모델

```prisma
model Like {
  id        String   @id @default(cuid())
  userId    String
  diaryId   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  diary     Diary    @relation(fields: [diaryId], references: [id], onDelete: Cascade)
  @@unique([userId, diaryId])
}

model Comment {
  id        String   @id @default(cuid())
  userId    String
  diaryId   String
  content   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  diary     Diary    @relation(fields: [diaryId], references: [id], onDelete: Cascade)
}

model UserBlock {
  id        String   @id @default(cuid())
  blockerId String
  blockedId String
  createdAt DateTime @default(now())
  blocker   User     @relation("BlockerRelation", fields: [blockerId], references: [id], onDelete: Cascade)
  blocked   User     @relation("BlockedRelation", fields: [blockedId], references: [id], onDelete: Cascade)
  @@unique([blockerId, blockedId])
}

model Report {
  id         String   @id @default(cuid())
  reporterId String
  targetType String   // "diary" | "comment"
  targetId   String
  reason     String?
  resolved   Boolean  @default(false)
  createdAt  DateTime @default(now())
  reporter   User     @relation(fields: [reporterId], references: [id], onDelete: Cascade)
}
```

### 3-3. `User` 모델 관계 추가

```prisma
model User {
  // 기존 필드 유지
  likes         Like[]
  comments      Comment[]
  blocking      UserBlock[] @relation("BlockerRelation")
  blockedBy     UserBlock[] @relation("BlockedRelation")
  reports       Report[]
}
```

### 설계 포인트
- `Like`의 `@@unique([userId, diaryId])`로 중복 공감을 DB 레벨에서 차단, upsert로 처리
- 차단 사용자 필터: 피드 쿼리 시 `userId NOT IN (차단한 사용자 목록)`
- `Report`는 `targetType + targetId`로 일기/댓글 신고를 단일 테이블 처리
- 댓글 대댓글(nested) 미지원 — flat 구조만
- 별도 Notification 테이블 없음 — `Like`/`Comment`에서 `diary.userId = 나` && `createdAt > 마지막 방문`으로 쿼리

---

## 4. 라우트 & Server Actions

### 4-1. 신규 라우트

```
src/app/(app)/
├── community/
│   ├── page.tsx              # 공개 일기 피드 (최신순)
│   └── [diaryId]/
│       └── page.tsx          # 공개 일기 상세 (댓글/공감)
src/app/admin/
└── reports/
    └── page.tsx              # 신고 목록 관리
```

### 4-2. 기존 라우트 수정

- `diary/write/page.tsx` — 공개 토글 + AI 튜터 공개 토글 추가
- `diary/[id]/page.tsx` — "이 글은 공개 중" 상태 표시 추가

### 4-3. Server Actions (`src/actions/community.ts` 신설)

| 함수 | 설명 |
|---|---|
| `getPublicDiaries()` | 피드 — 최신순, 차단 사용자 제외 |
| `getPublicDiary(diaryId)` | 상세 — 공감 수, 댓글 목록, 내 공감 여부 포함 |
| `toggleLike(diaryId)` | 공감 on/off (upsert) |
| `addComment(diaryId, content)` | 댓글 추가, content.trim() 빈값 검증 |
| `deleteComment(commentId)` | 본인 댓글만 삭제 |
| `blockUser(targetUserId)` | 사용자 차단 |
| `reportContent(targetType, targetId, reason)` | 신고 접수 |

### 4-4. 기존 Actions 수정

- `src/actions/diary.ts` — `saveDiary()`에 `isPublic`, `isTutorPublic` 파라미터 추가

---

## 5. 컴포넌트

```
src/components/community/
├── PublicDiaryCard.tsx     # 피드 카드 (아바타/이름/레벨/공감 수/댓글 수)
├── LikeButton.tsx          # 공감 버튼 (optimistic update)
├── CommentSection.tsx      # 댓글 목록 + 작성 폼
├── CommentItem.tsx         # 댓글 1개 (삭제/신고 포함)
├── ReportModal.tsx         # 신고 모달
└── NotificationBadge.tsx   # 커뮤니티 탭 배지
```

---

## 6. UX 플로우

### 6-1. 일기 작성 (write 페이지)

저장 버튼 위에 토글 2개 추가:

```
┌─────────────────────────────────────┐
│  🌸 이 일기 공개하기       [OFF]    │
│  📝 AI 튜터 리뷰도 공개   [OFF]    │  ← isPublic=false면 비활성화
└─────────────────────────────────────┘
```

### 6-2. 커뮤니티 탭 구조

상단 탭 2개:
- **커뮤니티**: 공개 일기 피드 (PublicDiaryCard 목록, 최신순)
- **받은 반응**: "○○님이 공감했어요", "○○님이 댓글을 남겼어요: ..." (최신순), 새 반응 시 탭 아이콘 빨간 배지

### 6-3. 공개 일기 상세 (`/community/[diaryId]`)

- 작성자 시바 아바타 + 이름 + 레벨
- 일기 제목 + 본문 (일본어)
- AI 튜터 리뷰 (`isTutorPublic=true`일 때만 노출)
- 🌸 공감 버튼 (optimistic update)
- 댓글 목록 + 작성 폼 (로그인 필요)
- 우상단 `...` 메뉴 → 신고 / 차단

### 6-4. 게스트

- 피드/상세 읽기: 허용
- 공감/댓글/신고/차단 시도: 기존 `GuestUpsellModal` 재활용

### 6-5. 관리자 (`/admin/reports`)

- 신고 목록 테이블 (미해결 우선)
- 각 항목: `resolved` 토글 + 해당 일기/댓글 삭제 버튼

---

## 7. 에러 처리

| 상황 | 처리 |
|---|---|
| 공감 중복 | `@@unique` + upsert, 에러 노출 없음 |
| 댓글 빈 문자열 | Server Action에서 `content.trim()` 후 reject |
| 차단된 사용자의 일기 URL 직접 접근 | `notFound()` 반환 |
| 비공개 일기 URL 직접 접근 | `notFound()` 반환 |
| 본인 일기에 공감 | 허용 (자기 응원 OK), LikeButton 시각적 처리는 선택 |
| 신고 접수 후 | "신고가 접수됐어요" 토스트 표시 |

---

## 8. 테스트

```
src/lib/__tests__/
├── community.test.ts   # getPublicDiaries 차단 필터, 비공개 일기 제외 검증
└── comment.test.ts     # 빈 댓글 reject, 타인 댓글 삭제 불가 검증
```

Vitest + Prisma mock 사용 (기존 프로젝트 패턴 동일).
UI 컴포넌트 테스트는 범위 제외 (기존 프로젝트도 UI 테스트 없음).

---

## 9. 작업 범위 요약

| 카테고리 | 항목 |
|---|---|
| Prisma 모델 | `Diary` 수정 + `Like`, `Comment`, `UserBlock`, `Report` 신설 |
| 신규 라우트 | `/community`, `/community/[diaryId]`, `/admin/reports` |
| Server Actions | 7개 신설, `saveDiary` 수정 |
| 신규 컴포넌트 | 6개 |
| 기존 수정 | `diary/write`, `diary/[id]`, `bottom-nav`, `admin` 레이아웃 |
| 테스트 | 2개 파일 |

---

## 10. 범위 외 (추후 고려)

- 푸시 알림 (PWA)
- 팔로우/팔로잉
- 피드 인기순 정렬
- 댓글 대댓글 (nested)
- AI 댓글 필터 (Claude API)
- 이모지 반응 다양화
