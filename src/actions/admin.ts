// src/actions/admin.ts
"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

// ── 유저 관리 ──────────────────────────────────────────────────────────────

/**
 * 유저 비활성화/복구 토글
 * - 비활성화 시: 공개 일기 전체 자동 비공개 처리
 * - 복구 시: 일기 상태 원복하지 않음 (관리자 수동 처리)
 */
export async function toggleUserDisabled(userId: string) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { disabled: true },
  });

  const nowDisabled = !user?.disabled;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { disabled: nowDisabled },
    });

    if (nowDisabled) {
      // 비활성화 시 공개 일기 자동 비공개 처리
      await tx.diary.updateMany({
        where: { userId, isPublic: true },
        data: { isPublic: false },
      });
    }
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

/** 유저 이름 수정 */
export async function updateUserName(userId: string, name: string) {
  await requireAdmin();

  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 20) throw new Error("이름은 1~20자여야 합니다.");

  await prisma.user.update({
    where: { id: userId },
    data: { name: trimmed },
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

/** 유저 role 변경 */
export async function updateUserRole(userId: string, role: "user" | "admin") {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

// ── 신고 관리 ──────────────────────────────────────────────────────────────

/** 신고 무시 처리 */
export async function resolveReport(reportId: string, adminNote?: string) {
  await requireAdmin();

  await prisma.report.update({
    where: { id: reportId },
    data: { resolved: true, adminNote: adminNote?.trim() || null },
  });

  revalidatePath("/admin/reports");
}

/** 신고된 컨텐츠 삭제 처리 */
export async function deleteReportTarget(
  reportId: string,
  targetType: string,
  targetId: string,
  adminNote?: string
) {
  await requireAdmin();

  await prisma.$transaction(async (tx) => {
    if (targetType === "diary") {
      await tx.diary.delete({ where: { id: targetId } }).catch(() => null);
    } else if (targetType === "comment") {
      await tx.comment.delete({ where: { id: targetId } }).catch(() => null);
    } else if (targetType === "post") {
      await tx.communityPost.delete({ where: { id: targetId } }).catch(() => null);
    }
    await tx.report.update({
      where: { id: reportId },
      data: { resolved: true, adminNote: adminNote?.trim() || null },
    });
  });

  revalidatePath("/admin/reports");
}

/** 일기 강제 비공개 처리 (삭제 대신 가역적 조치) */
export async function setDiaryPrivate(
  reportId: string,
  targetId: string,
  adminNote?: string
) {
  await requireAdmin();

  await prisma.$transaction(async (tx) => {
    await tx.diary.update({
      where: { id: targetId },
      data: { isPublic: false },
    }).catch(() => null);
    await tx.report.update({
      where: { id: reportId },
      data: { resolved: true, adminNote: adminNote?.trim() || null },
    });
  });

  revalidatePath("/admin/reports");
  revalidatePath("/community");
}

/** 관리자 수동 AI 활동 트리거 (테스트용) */
export async function triggerManualAiActivity() {
  await requireAdmin();
  const { runPeriodicAiActivity } = await import("@/lib/aiActivityEngine");
  const result = await runPeriodicAiActivity();
  revalidatePath("/community");
  revalidatePath("/admin/dashboard");
  return result;
}
