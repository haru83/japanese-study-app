# 커뮤니티 — 공개 일기 & 소통 기능 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사용자가 일기를 선택적으로 공개하고, 다른 학습자의 일기에 공감/댓글로 응원할 수 있는 커뮤니티 기능을 추가한다.

**Architecture:** Prisma 스키마에 Like/Comment/UserBlock/Report 모델을 추가하고, Server Actions로 모든 데이터 조작을 처리한다. 커뮤니티 탭은 하단 네비에 신설하며 `/community` 라우트를 통해 접근한다. 순수 함수는 `src/lib/community.ts`에 분리해 Vitest로 단위 테스트한다.

**Tech Stack:** Next.js 15 App Router (Server Components + Server Actions), Prisma (SQLite), NextAuth, React 19 `useOptimistic`, Vitest, Tailwind CSS v4

---

## 파일 맵

### 새로 생성
| 파일 | 역할 |
|---|---|
| `src/lib/community.ts` | 순수 함수 (필터링, 검증) — 테스트 대상 |
| `src/lib/__tests__/community.test.ts` | filterPublicDiaries, filterBlockedUsers 테스트 |
| `src/lib/__tests__/comment.test.ts` | validateCommentContent, assertCommentOwner 테스트 |
| `src/actions/community.ts` | 7개 Server Actions |
| `src/components/community/PublicDiaryCard.tsx` | 피드 카드 UI |
| `src/components/community/LikeButton.tsx` | 공감 버튼 (optimistic update) |
| `src/components/community/CommentSection.tsx` | 댓글 목록 + 작성 폼 |
| `src/components/community/CommentItem.tsx` | 댓글 1개 (삭제/신고) |
| `src/components/community/ReportModal.tsx` | 신고 모달 |
| `src/app/(app)/community/page.tsx` | 커뮤니티 피드 + 받은 반응 탭 |
| `src/app/(app)/community/[diaryId]/page.tsx` | 공개 일기 상세 |
| `src/app/admin/reports/page.tsx` | 관리자 신고 목록 |

### 수정
| 파일 | 변경 내용 |
|---|---|
| `prisma/schema.prisma` | Diary 필드 추가 + 4개 신규 모델 + User 관계 |
| `src/actions/diary.ts` | `saveDiary`에 isPublic/isTutorPublic/tutorReview 파라미터 추가 |
| `src/components/layout/bottom-nav.tsx` | 커뮤니티 탭 추가 (4→5칸), unreadCount prop 수신 |
| `src/app/(app)/layout.tsx` | `getUnreadCount()` 호출, BottomNav에 prop 전달 |
| `src/app/(app)/diary/write/page.tsx` | 공개 토글 2개 추가, saveDiary 호출 수정 |
| `src/app/(app)/diary/[id]/page.tsx` | "공개 중" 배지 + 커뮤니티 링크 추가 |

---

## Task 1: Prisma 스키마 업데이트

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: schema.prisma 수정 — Diary 모델에 필드 추가**

`prisma/schema.prisma`의 `model Diary` 블록 끝(마지막 필드 아래, 닫는 `}` 전)에 추가:

```prisma
  isPublic       Boolean   @default(false)
  isTutorPublic  Boolean   @default(false)
  tutorReview    String?
  likes          Like[]
  comments       Comment[]
```

- [ ] **Step 2: schema.prisma에 4개 신규 모델 추가**

`prisma/schema.prisma` 파일 끝에 추가:

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
  targetType String
  targetId   String
  reason     String?
  resolved   Boolean  @default(false)
  createdAt  DateTime @default(now())
  reporter   User     @relation(fields: [reporterId], references: [id], onDelete: Cascade)
}
```

- [ ] **Step 3: schema.prisma의 User 모델에 관계 필드 추가**

`model User` 블록 끝에 추가:

```prisma
  likes         Like[]
  comments      Comment[]
  blocking      UserBlock[] @relation("BlockerRelation")
  blockedBy     UserBlock[] @relation("BlockedRelation")
  reports       Report[]
```

- [ ] **Step 4: 마이그레이션 실행**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npx prisma migrate dev --name community_feature
```

Expected: `✔ Generated Prisma Client` 출력 + `prisma/migrations/` 하위에 migration 폴더 생성

- [ ] **Step 5: 커밋**

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "feat: Prisma 스키마에 커뮤니티 모델 추가 (Like/Comment/UserBlock/Report)"
```

---

## Task 2: 순수 함수 + 테스트 (TDD)

**Files:**
- Create: `src/lib/community.ts`
- Create: `src/lib/__tests__/community.test.ts`
- Create: `src/lib/__tests__/comment.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성 — community.test.ts**

```typescript
// src/lib/__tests__/community.test.ts
import { describe, it, expect } from "vitest";
import { filterPublicDiaries, filterBlockedUsers } from "@/lib/community";

describe("filterPublicDiaries", () => {
  it("isPublic=false 일기를 제거한다", () => {
    const input = [{ isPublic: false }, { isPublic: true }];
    expect(filterPublicDiaries(input)).toEqual([{ isPublic: true }]);
  });

  it("모두 비공개이면 빈 배열을 반환한다", () => {
    expect(filterPublicDiaries([{ isPublic: false }])).toEqual([]);
  });

  it("빈 배열 입력 시 빈 배열 반환", () => {
    expect(filterPublicDiaries([])).toEqual([]);
  });

  it("모두 공개이면 모두 반환한다", () => {
    const input = [{ isPublic: true }, { isPublic: true }];
    expect(filterPublicDiaries(input)).toHaveLength(2);
  });
});

describe("filterBlockedUsers", () => {
  it("차단된 userId의 아이템을 제거한다", () => {
    const items = [{ userId: "a" }, { userId: "b" }, { userId: "c" }];
    expect(filterBlockedUsers(items, ["b"])).toEqual([{ userId: "a" }, { userId: "c" }]);
  });

  it("차단 목록이 비어 있으면 모두 반환한다", () => {
    const items = [{ userId: "a" }, { userId: "b" }];
    expect(filterBlockedUsers(items, [])).toEqual(items);
  });

  it("모두 차단된 경우 빈 배열 반환", () => {
    expect(filterBlockedUsers([{ userId: "a" }], ["a"])).toEqual([]);
  });

  it("여러 userId를 동시에 차단할 수 있다", () => {
    const items = [{ userId: "a" }, { userId: "b" }, { userId: "c" }];
    expect(filterBlockedUsers(items, ["a", "c"])).toEqual([{ userId: "b" }]);
  });
});
```

- [ ] **Step 2: 실패하는 테스트 작성 — comment.test.ts**

```typescript
// src/lib/__tests__/comment.test.ts
import { describe, it, expect } from "vitest";
import { validateCommentContent, assertCommentOwner } from "@/lib/community";

describe("validateCommentContent", () => {
  it("빈 문자열은 에러를 던진다", () => {
    expect(() => validateCommentContent("")).toThrow("댓글 내용을 입력해주세요");
  });

  it("공백만 있는 경우 에러를 던진다", () => {
    expect(() => validateCommentContent("   ")).toThrow("댓글 내용을 입력해주세요");
  });

  it("정상 내용은 trim된 문자열을 반환한다", () => {
    expect(validateCommentContent("  응원해요  ")).toBe("응원해요");
  });

  it("일본어 댓글도 통과한다", () => {
    expect(validateCommentContent("いいですね！")).toBe("いいですね！");
  });
});

describe("assertCommentOwner", () => {
  it("같은 userId이면 에러 없음", () => {
    expect(() => assertCommentOwner("user1", "user1")).not.toThrow();
  });

  it("다른 userId이면 에러를 던진다", () => {
    expect(() => assertCommentOwner("user1", "user2")).toThrow(
      "본인 댓글만 삭제할 수 있어요"
    );
  });
});
```

- [ ] **Step 3: 테스트 실행하여 실패 확인**

```bash
npx vitest run src/lib/__tests__/community.test.ts src/lib/__tests__/comment.test.ts
```

Expected: 두 파일 모두 FAIL (함수 미정의)

- [ ] **Step 4: community.ts 구현**

```typescript
// src/lib/community.ts

export function filterPublicDiaries<T extends { isPublic: boolean }>(
  diaries: T[]
): T[] {
  return diaries.filter((d) => d.isPublic);
}

export function filterBlockedUsers<T extends { userId: string }>(
  items: T[],
  blockedIds: string[]
): T[] {
  if (blockedIds.length === 0) return items;
  return items.filter((item) => !blockedIds.includes(item.userId));
}

export function validateCommentContent(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("댓글 내용을 입력해주세요");
  return trimmed;
}

export function assertCommentOwner(
  commentUserId: string,
  currentUserId: string
): void {
  if (commentUserId !== currentUserId)
    throw new Error("본인 댓글만 삭제할 수 있어요");
}
```

- [ ] **Step 5: 테스트 재실행하여 통과 확인**

```bash
npx vitest run src/lib/__tests__/community.test.ts src/lib/__tests__/comment.test.ts
```

Expected: 두 파일 모두 PASS

- [ ] **Step 6: 커밋**

```bash
git add src/lib/community.ts src/lib/__tests__/community.test.ts src/lib/__tests__/comment.test.ts
git commit -m "feat: 커뮤니티 유틸 함수 추가 + 단위 테스트"
```

---

## Task 3: community.ts Server Actions

**Files:**
- Create: `src/actions/community.ts`

- [ ] **Step 1: community.ts 생성**

```typescript
// src/actions/community.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { validateCommentContent, assertCommentOwner } from "@/lib/community";

const USER_SELECT = {
  id: true,
  name: true,
  progress: { select: { level: true } },
  wardrobeItems: {
    where: { equippedAt: { not: null } },
    select: { wardrobeItemId: true },
  },
} as const;

export async function getPublicDiaries() {
  const session = await getServerSession(authOptions);

  let blockedIds: string[] = [];
  if (session?.user?.id) {
    const blocks = await prisma.userBlock.findMany({
      where: { blockerId: session.user.id },
      select: { blockedId: true },
    });
    blockedIds = blocks.map((b) => b.blockedId);
  }

  return prisma.diary.findMany({
    where: {
      isPublic: true,
      ...(blockedIds.length > 0 ? { userId: { notIn: blockedIds } } : {}),
    },
    include: {
      user: { select: USER_SELECT },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicDiary(diaryId: string) {
  const session = await getServerSession(authOptions);

  const diary = await prisma.diary.findUnique({
    where: { id: diaryId, isPublic: true },
    include: {
      user: { select: USER_SELECT },
      likes: { select: { userId: true } },
      comments: {
        include: {
          user: {
            select: { id: true, name: true, progress: { select: { level: true } } },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!diary) return null;

  if (session?.user?.id) {
    const block = await prisma.userBlock.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: session.user.id,
          blockedId: diary.userId,
        },
      },
    });
    if (block) return null;
  }

  const isLiked = session?.user?.id
    ? diary.likes.some((l) => l.userId === session.user!.id)
    : false;

  return { ...diary, isLiked };
}

export async function toggleLike(diaryId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const existing = await prisma.like.findUnique({
    where: { userId_diaryId: { userId: session.user.id, diaryId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
  } else {
    await prisma.like.create({ data: { userId: session.user.id, diaryId } });
  }

  revalidatePath(`/community/${diaryId}`);
}

export async function addComment(diaryId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const trimmed = validateCommentContent(content);

  await prisma.comment.create({
    data: { userId: session.user.id, diaryId, content: trimmed },
  });

  revalidatePath(`/community/${diaryId}`);
}

export async function deleteComment(commentId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("댓글을 찾을 수 없어요.");

  assertCommentOwner(comment.userId, session.user.id);

  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/community/${comment.diaryId}`);
}

export async function blockUser(targetUserId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  await prisma.userBlock.upsert({
    where: {
      blockerId_blockedId: {
        blockerId: session.user.id,
        blockedId: targetUserId,
      },
    },
    create: { blockerId: session.user.id, blockedId: targetUserId },
    update: {},
  });

  revalidatePath("/community");
}

export async function reportContent(
  targetType: "diary" | "comment",
  targetId: string,
  reason?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  await prisma.report.create({
    data: { reporterId: session.user.id, targetType, targetId, reason },
  });
}

export async function getReceivedReactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { likes: [], comments: [] };

  const [likes, comments] = await Promise.all([
    prisma.like.findMany({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
      },
      include: {
        user: { select: { id: true, name: true } },
        diary: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    prisma.comment.findMany({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
      },
      include: {
        user: { select: { id: true, name: true } },
        diary: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  return { likes, comments };
}

export async function getUnreadCount() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return 0;

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [likeCount, commentCount] = await Promise.all([
    prisma.like.count({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
        createdAt: { gte: since },
      },
    }),
    prisma.comment.count({
      where: {
        diary: { userId: session.user.id },
        userId: { not: session.user.id },
        createdAt: { gte: since },
      },
    }),
  ]);

  return likeCount + commentCount;
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/actions/community.ts
git commit -m "feat: 커뮤니티 Server Actions 추가 (공감/댓글/차단/신고)"
```

---

## Task 4: saveDiary 수정

**Files:**
- Modify: `src/actions/diary.ts`

- [ ] **Step 1: saveDiary 시그니처와 본문 수정**

`src/actions/diary.ts`의 `saveDiary` 함수에서 파라미터 타입에 3개 필드 추가:

```typescript
export async function saveDiary(data: {
  title: string;
  content: string;
  mood?: string;
  topicId?: string;
  isPublic?: boolean;
  isTutorPublic?: boolean;
  tutorReview?: string;
}) {
```

`prisma.diary.create` 호출을 아래로 교체 (data spread가 새 필드를 자동 포함):

```typescript
  const diary = await prisma.diary.create({
    data: {
      title: data.title,
      content: data.content,
      mood: data.mood,
      topicId: data.topicId,
      isPublic: data.isPublic ?? false,
      isTutorPublic: data.isTutorPublic ?? false,
      tutorReview: data.tutorReview,
      userId,
    },
  });
```

`revalidatePath` 블록 끝에 추가:

```typescript
  if (data.isPublic) {
    revalidatePath("/community");
  }
```

- [ ] **Step 2: 커밋**

```bash
git add src/actions/diary.ts
git commit -m "feat: saveDiary에 isPublic/isTutorPublic/tutorReview 파라미터 추가"
```

---

## Task 5: PublicDiaryCard 컴포넌트

**Files:**
- Create: `src/components/community/PublicDiaryCard.tsx`

- [ ] **Step 1: 컴포넌트 생성**

```tsx
// src/components/community/PublicDiaryCard.tsx
import Link from "next/link";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

type Props = {
  diary: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: {
      id: string;
      name: string | null;
      progress: { level: number } | null;
      wardrobeItems: { wardrobeItemId: string }[];
    };
    _count: { likes: number; comments: number };
  };
};

export function PublicDiaryCard({ diary }: Props) {
  const level = diary.user.progress?.level ?? 1;
  const equippedIds = diary.user.wardrobeItems.map((w) => w.wardrobeItemId);

  return (
    <Link
      href={`/community/${diary.id}`}
      className="block bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <ShibaAvatar
          level={level}
          size={40}
          sticker
          equippedItemIds={equippedIds}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm text-type-black truncate">
              {diary.user.name ?? "학습자"}
            </span>
            <span className="bg-grape-punch text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-black shrink-0">
              Lv.{level}
            </span>
          </div>
          <span className="text-xs text-type-black/50 font-bold">
            {new Date(diary.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
      <h3 className="font-black text-type-black text-sm mb-1 truncate">
        {diary.title}
      </h3>
      <p className="text-xs text-type-black/70 font-bold line-clamp-2">
        {diary.content}
      </p>
      <div className="flex items-center gap-4 mt-3 text-xs font-bold text-type-black/50">
        <span>🌸 {diary._count.likes}</span>
        <span>💬 {diary._count.comments}</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/community/PublicDiaryCard.tsx
git commit -m "feat: PublicDiaryCard 컴포넌트 추가"
```

---

## Task 6: LikeButton 컴포넌트

**Files:**
- Create: `src/components/community/LikeButton.tsx`

- [ ] **Step 1: 컴포넌트 생성**

```tsx
// src/components/community/LikeButton.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/actions/community";

type Props = {
  diaryId: string;
  initialIsLiked: boolean;
  initialCount: number;
};

export function LikeButton({ diaryId, initialIsLiked, initialCount }: Props) {
  const [, startTransition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic(
    { isLiked: initialIsLiked, count: initialCount },
    (state) => ({
      isLiked: !state.isLiked,
      count: state.isLiked ? state.count - 1 : state.count + 1,
    })
  );

  function handleClick() {
    startTransition(async () => {
      addOptimistic(undefined);
      await toggleLike(diaryId);
    });
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-black font-black text-sm transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:scale-[0.98] ${
        optimistic.isLiked
          ? "bg-sakura-pink text-type-black"
          : "bg-paper-white text-type-black/70"
      }`}
    >
      <span>🌸</span>
      <span>{optimistic.isLiked ? "공감했어요" : "공감하기"}</span>
      <span className="text-xs opacity-60">{optimistic.count}</span>
    </button>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/community/LikeButton.tsx
git commit -m "feat: LikeButton 컴포넌트 추가 (optimistic update)"
```

---

## Task 7: ReportModal + CommentItem + CommentSection

**Files:**
- Create: `src/components/community/ReportModal.tsx`
- Create: `src/components/community/CommentItem.tsx`
- Create: `src/components/community/CommentSection.tsx`

- [ ] **Step 1: ReportModal + ReportButton 생성 (같은 파일)**

```tsx
// src/components/community/ReportModal.tsx
"use client";

import { useState, useTransition } from "react";
import { reportContent } from "@/actions/community";

type ModalProps = {
  targetType: "diary" | "comment";
  targetId: string;
  onClose: () => void;
};

const REASONS = ["욕설/비하", "스팸", "부적절한 내용", "기타"];

export function ReportModal({ targetType, targetId, onClose }: ModalProps) {
  const [reason, setReason] = useState(REASONS[0]);
  const [done, setDone] = useState(false);
  const [, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      await reportContent(targetType, targetId, reason);
      setDone(true);
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-paper-white rounded-t-[20px] border-t-4 border-black w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="text-center py-4">
            <p className="font-black text-type-black text-base mb-2">
              신고가 접수됐어요
            </p>
            <p className="text-sm text-type-black/60 font-bold mb-4">
              검토 후 조치하겠습니다.
            </p>
            <button
              onClick={onClose}
              className="bg-sakura-pink font-black text-sm px-6 py-2.5 rounded-2xl border-2 border-black"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-black text-type-black text-base mb-4">
              신고하기
            </h3>
            <div className="flex flex-col gap-2 mb-5">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`text-left px-4 py-3 rounded-xl border-2 border-black font-bold text-sm transition-all ${
                    reason === r ? "bg-sakura-pink" : "bg-canvas-almond"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-black font-black text-sm bg-canvas-almond"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl border-2 border-black font-black text-sm bg-sakura-pink"
              >
                신고
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 상세 페이지용 — 클릭 시 ReportModal 열기
export function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "diary" | "comment";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-xs font-bold text-type-black/60"
      >
        신고
      </button>
      {open && (
        <ReportModal
          targetType={targetType}
          targetId={targetId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
```

- [ ] **Step 2: CommentItem 생성**

```tsx
// src/components/community/CommentItem.tsx
"use client";

import { useState } from "react";
import { deleteComment } from "@/actions/community";
import { ReportModal } from "./ReportModal";

type Props = {
  comment: {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    diaryId: string;
    user: {
      id: string;
      name: string | null;
      progress: { level: number } | null;
    };
  };
  currentUserId?: string;
};

export function CommentItem({ comment, currentUserId }: Props) {
  const [showReport, setShowReport] = useState(false);
  const isOwn = comment.userId === currentUserId;
  const level = comment.user.progress?.level ?? 1;

  return (
    <div className="flex gap-3 py-3 border-b border-black/10 last:border-0">
      <div className="w-8 h-8 rounded-full bg-sakura-pink border-2 border-black flex items-center justify-center text-xs font-black shrink-0">
        {level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-black text-type-black">
            {comment.user.name ?? "학습자"}
          </span>
          <span className="text-[10px] text-type-black/40 font-bold">
            {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <p className="text-sm text-type-black font-bold">{comment.content}</p>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        {isOwn && (
          <form action={deleteComment.bind(null, comment.id)}>
            <button
              type="submit"
              className="text-[10px] text-red-400 font-bold"
            >
              삭제
            </button>
          </form>
        )}
        {!isOwn && currentUserId && (
          <button
            onClick={() => setShowReport(true)}
            className="text-[10px] text-type-black/40 font-bold"
          >
            신고
          </button>
        )}
      </div>
      {showReport && (
        <ReportModal
          targetType="comment"
          targetId={comment.id}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: CommentSection 생성**

```tsx
// src/components/community/CommentSection.tsx
"use client";

import { useState, useTransition } from "react";
import { addComment } from "@/actions/community";
import { CommentItem } from "./CommentItem";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  diaryId: string;
  user: {
    id: string;
    name: string | null;
    progress: { level: number } | null;
  };
};

type Props = {
  diaryId: string;
  comments: Comment[];
  currentUserId?: string;
};

export function CommentSection({ diaryId, comments, currentUserId }: Props) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const value = text;
    startTransition(async () => {
      await addComment(diaryId, value);
      setText("");
    });
  }

  return (
    <div>
      <h3 className="font-black text-type-black text-sm mb-3">
        댓글 {comments.length}개
      </h3>
      <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden mb-4">
        {comments.length === 0 ? (
          <p className="px-4 py-6 text-sm text-type-black/50 font-bold text-center">
            아직 댓글이 없어요. 첫 응원을 남겨보세요! 🌸
          </p>
        ) : (
          <div className="px-4 py-2">
            {comments.map((c) => (
              <CommentItem key={c.id} comment={c} currentUserId={currentUserId} />
            ))}
          </div>
        )}
      </div>
      {currentUserId ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="응원 댓글을 남겨보세요 🌸"
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-black bg-paper-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sakura-pink"
          />
          <button
            type="submit"
            disabled={!text.trim() || isPending}
            className="bg-sakura-pink font-black text-sm px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="text-sm text-center text-type-black/50 font-bold py-3">
          댓글을 쓰려면{" "}
          <a href="/login" className="text-sakura-pink underline">
            로그인
          </a>
          이 필요해요
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 커밋**

```bash
git add src/components/community/ReportModal.tsx src/components/community/CommentItem.tsx src/components/community/CommentSection.tsx
git commit -m "feat: ReportModal/CommentItem/CommentSection 컴포넌트 추가"
```

---

## Task 8: 커뮤니티 피드 페이지

**Files:**
- Create: `src/app/(app)/community/page.tsx`

- [ ] **Step 1: 페이지 생성**

```tsx
// src/app/(app)/community/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPublicDiaries, getReceivedReactions } from "@/actions/community";
import { PublicDiaryCard } from "@/components/community/PublicDiaryCard";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab === "reactions" ? "reactions" : "feed";
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-10 pb-0 border-b-4 border-black">
        <h1 className="text-xl font-black text-type-black mb-4">커뮤니티 🌸</h1>
        <div className="flex">
          <Link
            href="/community"
            className={`flex-1 py-2.5 text-center text-sm font-black border-b-4 transition-colors ${
              activeTab === "feed"
                ? "border-sakura-pink text-type-black"
                : "border-transparent text-type-black/40"
            }`}
          >
            모두의 일기
          </Link>
          <Link
            href="/community?tab=reactions"
            className={`flex-1 py-2.5 text-center text-sm font-black border-b-4 transition-colors ${
              activeTab === "reactions"
                ? "border-sakura-pink text-type-black"
                : "border-transparent text-type-black/40"
            }`}
          >
            받은 반응
          </Link>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3">
        {activeTab === "feed" ? (
          <FeedTab />
        ) : (
          <ReactionsTab userId={session?.user?.id} />
        )}
      </div>
    </div>
  );
}

async function FeedTab() {
  const diaries = await getPublicDiaries();

  if (diaries.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">📖</p>
        <p className="font-black text-type-black">아직 공개된 일기가 없어요</p>
        <p className="text-sm text-type-black/60 font-bold mt-1">
          첫 번째로 일기를 공개해보세요!
        </p>
      </div>
    );
  }

  return (
    <>
      {diaries.map((diary) => (
        <PublicDiaryCard key={diary.id} diary={diary} />
      ))}
    </>
  );
}

async function ReactionsTab({ userId }: { userId?: string }) {
  if (!userId) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🔒</p>
        <p className="font-black text-type-black">로그인이 필요해요</p>
        <Link
          href="/login"
          className="mt-3 inline-block bg-sakura-pink font-black text-sm px-5 py-2.5 rounded-2xl border-2 border-black"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  const { likes, comments } = await getReceivedReactions();

  const items = [
    ...likes.map((l) => ({
      type: "like" as const,
      id: l.id,
      createdAt: l.createdAt,
      userName: l.user.name,
      diaryId: l.diary.id,
      diaryTitle: l.diary.title,
      commentContent: null as string | null,
    })),
    ...comments.map((c) => ({
      type: "comment" as const,
      id: c.id,
      createdAt: c.createdAt,
      userName: c.user.name,
      diaryId: c.diary.id,
      diaryTitle: c.diary.title,
      commentContent: c.content,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🌸</p>
        <p className="font-black text-type-black">아직 받은 반응이 없어요</p>
        <p className="text-sm text-type-black/60 font-bold mt-1">
          일기를 공개하면 응원을 받을 수 있어요!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
      {items.map((item, i) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={`/community/${item.diaryId}`}
          className={`flex items-start gap-3 px-4 py-3.5 hover:bg-sakura-blush transition-colors ${
            i < items.length - 1 ? "border-b border-black/10" : ""
          }`}
        >
          <span className="text-xl shrink-0">
            {item.type === "like" ? "🌸" : "💬"}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-type-black">
              {item.userName ?? "학습자"}님이{" "}
              {item.type === "like" ? "공감했어요" : "댓글을 남겼어요"}
            </p>
            <p className="text-xs text-type-black/60 font-bold truncate">
              {item.type === "comment" && item.commentContent
                ? `"${item.commentContent}"`
                : item.diaryTitle}
            </p>
          </div>
          <span className="text-[10px] text-type-black/40 font-bold shrink-0">
            {new Date(item.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add "src/app/(app)/community/page.tsx"
git commit -m "feat: 커뮤니티 피드 페이지 추가 (모두의 일기 + 받은 반응 탭)"
```

---

## Task 9: 커뮤니티 상세 페이지

**Files:**
- Create: `src/app/(app)/community/[diaryId]/page.tsx`

- [ ] **Step 1: 페이지 생성**

```tsx
// src/app/(app)/community/[diaryId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPublicDiary } from "@/actions/community";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { LikeButton } from "@/components/community/LikeButton";
import { CommentSection } from "@/components/community/CommentSection";
import { ReportButton } from "@/components/community/ReportModal";
import type { TutorReviewResult } from "@/actions/diaryTutor";

export default async function CommunityDiaryPage({
  params,
}: {
  params: Promise<{ diaryId: string }>;
}) {
  const { diaryId } = await params;
  const session = await getServerSession(authOptions);

  const diary = await getPublicDiary(diaryId);
  if (!diary) return notFound();

  const level = diary.user.progress?.level ?? 1;
  const equippedIds = diary.user.wardrobeItems.map((w) => w.wardrobeItemId);
  const tutorReviewData =
    diary.isTutorPublic && diary.tutorReview
      ? (JSON.parse(diary.tutorReview) as TutorReviewResult)
      : null;

  return (
    <main className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/community"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all -ml-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          {session?.user?.id && session.user.id !== diary.userId && (
            <ReportButton targetType="diary" targetId={diary.id} />
          )}
        </div>
        <div className="flex items-center gap-3">
          <ShibaAvatar
            level={level}
            size={48}
            sticker
            wobble="wobbly-1"
            equippedItemIds={equippedIds}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-type-black">
                {diary.user.name ?? "학습자"}
              </span>
              <span className="bg-grape-punch text-white text-xs font-black px-2 py-0.5 rounded-full border border-black">
                Lv.{level}
              </span>
            </div>
            <p className="text-xs text-type-black/50 font-bold">
              {new Date(diary.createdAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">
        <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
          <h1 className="font-black text-type-black text-lg mb-3">
            {diary.title}
          </h1>
          <p className="text-base font-bold text-type-black leading-relaxed whitespace-pre-wrap">
            {diary.content}
          </p>
        </div>

        {tutorReviewData && (
          <div className="bg-grape-punch/10 rounded-2xl border-2 border-grape-punch/30 p-4">
            <p className="text-xs font-black text-grape-punch mb-2">
              🎓 AI 튜터 리뷰
            </p>
            <p className="text-sm font-bold text-type-black mb-3">
              {tutorReviewData.overallComment}
            </p>
            {tutorReviewData.improvedText && (
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-[10px] font-black text-grape-punch mb-1">
                  개선 예문
                </p>
                <p className="text-sm font-bold text-type-black">
                  {tutorReviewData.improvedText}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          {session?.user?.id ? (
            <LikeButton
              diaryId={diary.id}
              initialIsLiked={diary.isLiked}
              initialCount={diary.likes.length}
            />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-black bg-paper-white font-black text-sm text-type-black/70 shadow-[3px_3px_0px_0px_#000]"
            >
              <span>🌸</span>
              <span>로그인 후 공감하기</span>
            </Link>
          )}
        </div>

        <CommentSection
          diaryId={diary.id}
          comments={diary.comments}
          currentUserId={session?.user?.id}
        />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add "src/app/(app)/community/[diaryId]/page.tsx" src/components/community/ReportModal.tsx
git commit -m "feat: 커뮤니티 상세 페이지 추가 (공감/댓글/AI리뷰/신고)"
```

---

## Task 10: 하단 네비 + 레이아웃 업데이트

**Files:**
- Modify: `src/components/layout/bottom-nav.tsx`
- Modify: `src/app/(app)/layout.tsx`

- [ ] **Step 1: bottom-nav.tsx 수정**

`NAV_ITEMS` 배열을 교체하고 `BottomNav`에 `unreadCount` prop 추가:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/home", icon: "home", label: "홈" },
  { href: "/diary", icon: "book_2", label: "일기" },
  { href: "/keigo", icon: "record_voice_over", label: "경어" },
  { href: "/community", icon: "people", label: "커뮤니티" },
  { href: "/profile", icon: "face", label: "프로필" },
];

export function BottomNav({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-paper-white border-t-4 border-black flex justify-around items-end pb-[env(safe-area-inset-bottom)] pt-3 h-[85px] z-50">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/home" && pathname.startsWith(item.href));
        const showBadge = item.href === "/community" && unreadCount > 0;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 w-1/5 pb-2 transition-transform ${
              isActive ? "scale-110" : "scale-100 opacity-50"
            }`}
          >
            <div className="relative">
              <span
                className="material-symbols-outlined text-2xl text-black"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {showBadge && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
              )}
            </div>
            <span
              className={`text-xs font-bold text-black ${isActive ? "" : "opacity-60"}`}
            >
              {item.label}
            </span>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-sakura-pink border border-black" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: layout.tsx 수정 — 서버에서 unreadCount 가져와 전달**

```tsx
// src/app/(app)/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUnreadCount } from "@/actions/community";
import { BottomNav } from "@/components/layout/bottom-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const unreadCount = session?.user?.id ? await getUnreadCount() : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-[85px]">{children}</main>
      <BottomNav unreadCount={unreadCount} />
    </div>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/layout/bottom-nav.tsx "src/app/(app)/layout.tsx"
git commit -m "feat: 하단 네비에 커뮤니티 탭 추가 + 미읽은 반응 배지"
```

---

## Task 11: 일기 작성 페이지 — 공개 토글 추가

**Files:**
- Modify: `src/app/(app)/diary/write/page.tsx`

- [ ] **Step 1: state 추가**

`DiaryWriteForm` 함수 내 기존 state 선언 블록 끝에 추가:

```tsx
const [isPublic, setIsPublic] = useState(false);
const [isTutorPublic, setIsTutorPublic] = useState(false);
```

- [ ] **Step 2: handleSubmit 수정**

`saveDiary` 호출 부분을 교체:

```tsx
const result = await saveDiary({
  title: filterJapaneseOnly(title) || `${topicKo} 일기`,
  content: jpContent,
  mood,
  isPublic,
  isTutorPublic,
  tutorReview:
    isTutorPublic && reviewResult
      ? JSON.stringify(reviewResult)
      : undefined,
});
```

- [ ] **Step 3: 공개 토글 UI 추가**

`{/* AI 튜터 리뷰 버튼 */}` 블록 바로 위에 삽입:

```tsx
{/* 공개 설정 */}
<div className="bg-paper-white rounded-2xl border-2 border-black p-4 flex flex-col gap-3">
  <div className="flex items-center justify-between gap-3">
    <div className="flex-1">
      <p className="font-black text-sm text-type-black">🌸 이 일기 공개하기</p>
      <p className="text-xs text-type-black/50 font-bold">
        커뮤니티에서 다른 학습자가 볼 수 있어요
      </p>
    </div>
    <button
      type="button"
      onClick={() => {
        const next = !isPublic;
        setIsPublic(next);
        if (!next) setIsTutorPublic(false);
      }}
      className={`relative w-12 h-6 rounded-full border-2 border-black transition-colors shrink-0 ${
        isPublic ? "bg-sakura-pink" : "bg-canvas-almond"
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white border border-black rounded-full transition-transform ${
          isPublic ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  </div>

  {isPublic && reviewResult && (
    <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-3">
      <div className="flex-1">
        <p className="font-black text-sm text-type-black">📝 AI 튜터 리뷰도 공개</p>
        <p className="text-xs text-type-black/50 font-bold">
          다른 학습자가 리뷰 내용도 볼 수 있어요
        </p>
      </div>
      <button
        type="button"
        onClick={() => setIsTutorPublic(!isTutorPublic)}
        className={`relative w-12 h-6 rounded-full border-2 border-black transition-colors shrink-0 ${
          isTutorPublic ? "bg-grape-punch" : "bg-canvas-almond"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white border border-black rounded-full transition-transform ${
            isTutorPublic ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  )}
</div>
```

- [ ] **Step 4: 커밋**

```bash
git add "src/app/(app)/diary/write/page.tsx"
git commit -m "feat: 일기 작성 페이지에 공개/AI리뷰 공개 토글 추가"
```

---

## Task 12: 일기 상세 페이지 — 공개 상태 표시

**Files:**
- Modify: `src/app/(app)/diary/[id]/page.tsx`

- [ ] **Step 1: "공개 중" 배지 추가**

`diary/[id]/page.tsx`에서 제목(`{diary.title}`) 아래에 추가:

```tsx
{diary.isPublic && (
  <div className="flex items-center gap-2 mt-1">
    <span className="bg-sakura-pink text-type-black text-[10px] font-black px-2 py-0.5 rounded-full border border-black">
      🌸 공개 중
    </span>
    <Link
      href={`/community/${diary.id}`}
      className="text-xs text-type-black/50 font-bold underline"
    >
      커뮤니티에서 보기
    </Link>
  </div>
)}
```

- [ ] **Step 2: 커밋**

```bash
git add "src/app/(app)/diary/[id]/page.tsx"
git commit -m "feat: 일기 상세에 공개 중 배지 + 커뮤니티 링크 추가"
```

---

## Task 13: 관리자 신고 목록 페이지

**Files:**
- Create: `src/app/admin/reports/page.tsx`

- [ ] **Step 1: 페이지 생성**

```tsx
// src/app/admin/reports/page.tsx
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function resolveReport(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.report.update({ where: { id }, data: { resolved: true } });
  revalidatePath("/admin/reports");
}

async function deleteTarget(formData: FormData) {
  "use server";
  const targetType = formData.get("targetType") as string;
  const targetId = formData.get("targetId") as string;
  const id = formData.get("id") as string;

  if (targetType === "diary") {
    await prisma.diary.delete({ where: { id: targetId } });
  } else if (targetType === "comment") {
    await prisma.comment.delete({ where: { id: targetId } });
  }

  await prisma.report.update({ where: { id }, data: { resolved: true } });
  revalidatePath("/admin/reports");
}

export default async function AdminReportsPage() {
  const pending = await prisma.report.findMany({
    where: { resolved: false },
    include: { reporter: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const resolved = await prisma.report.findMany({
    where: { resolved: true },
    include: { reporter: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="p-6 max-w-4xl">
      <h1 className="text-2xl font-black mb-6">신고 관리</h1>

      <section className="mb-10">
        <h2 className="text-lg font-black mb-3">
          미처리 신고 ({pending.length}건)
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-gray-500">처리할 신고가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((r) => (
              <div
                key={r.id}
                className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_#000]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black">
                      [{r.targetType}] {r.targetId}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      신고자: {r.reporter.name ?? r.reporter.email} ·{" "}
                      {new Date(r.createdAt).toLocaleString("ko-KR")}
                    </p>
                    {r.reason && (
                      <p className="text-sm mt-1 font-bold">사유: {r.reason}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <form action={resolveReport}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        className="text-xs font-black px-3 py-1.5 rounded-lg border-2 border-black bg-gray-100"
                      >
                        무시
                      </button>
                    </form>
                    <form action={deleteTarget}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="targetType" value={r.targetType} />
                      <input type="hidden" name="targetId" value={r.targetId} />
                      <button
                        type="submit"
                        className="text-xs font-black px-3 py-1.5 rounded-lg border-2 border-black bg-red-100 text-red-700"
                      >
                        삭제 처리
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-black mb-3">
          처리 완료 (최근 {resolved.length}건)
        </h2>
        <div className="flex flex-col gap-2">
          {resolved.map((r) => (
            <div
              key={r.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-3"
            >
              <p className="text-xs text-gray-500">
                [{r.targetType}] {r.targetId} · 사유: {r.reason ?? "없음"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: 관리자 네비에 신고 메뉴 추가**

`src/components/layout/admin-bottom-nav.tsx`의 `ADMIN_NAV_ITEMS` 배열에 신고 항목 추가:

```typescript
const ADMIN_NAV_ITEMS = [
  { href: "/admin/dashboard", icon: "dashboard", label: "대시보드" },
  { href: "/admin/users", icon: "group", label: "사용자" },
  { href: "/admin/topics", icon: "edit_note", label: "콘텐츠" },
  { href: "/admin/reports", icon: "flag", label: "신고" },
  { href: "/admin/settings", icon: "settings", label: "설정" },
];
```

`w-1/4` 클래스를 `w-1/5`로 교체 (5칸으로 확장).

- [ ] **Step 3: 커밋**

```bash
git add src/app/admin/reports/page.tsx
git commit -m "feat: 관리자 신고 목록 페이지 추가"
```

---

## Task 14: 최종 검증

- [ ] **Step 1: 전체 테스트 실행**

```bash
npx vitest run
```

Expected: 모든 테스트 PASS

- [ ] **Step 2: TypeScript 컴파일 확인**

```bash
npx tsc --noEmit
```

Expected: 에러 없음

- [ ] **Step 3: 개발 서버 실행 후 골든 패스 검증**

```bash
npm run dev
```

아래 항목을 순서대로 확인:
1. 일기 작성 → 공개 토글 ON → 저장 → `/community` 에서 카드 노출 확인
2. 공개 일기 카드 클릭 → 상세 페이지 → 공감 버튼 클릭 (optimistic update 확인)
3. 댓글 작성 → 목록에 즉시 반영 확인
4. 커뮤니티 탭 "받은 반응" → 공감/댓글 노출 확인
5. 하단 네비 커뮤니티 탭 배지 확인
6. `/diary/{id}` 에서 "공개 중" 배지 확인
7. `/admin/reports` 신고 목록 확인

- [ ] **Step 4: 최종 커밋**

```bash
git add .
git commit -m "feat: 커뮤니티 공개 일기 기능 완성 — 공감/댓글/신고/차단/관리자 검토"
```
