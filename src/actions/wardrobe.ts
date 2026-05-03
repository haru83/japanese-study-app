"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { canPurchaseItem } from "@/lib/wardrobe";

export async function purchaseWardrobeItem(wardrobeItemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const userId = session.user.id;

  // Check already owned
  const owned = await prisma.userWardrobeItem.findUnique({
    where: { userId_wardrobeItemId: { userId, wardrobeItemId } },
  });
  if (owned) throw new Error("이미 보유한 아이템입니다.");

  // Get item and user progress
  const [item, progress] = await Promise.all([
    prisma.wardrobeItem.findUnique({ where: { id: wardrobeItemId } }),
    prisma.userProgress.findUnique({ where: { userId } }),
  ]);

  if (!item) throw new Error("아이템을 찾을 수 없습니다.");
  if (!progress) throw new Error("진행 정보를 찾을 수 없습니다.");

  if (
    !canPurchaseItem({
      userStamps: progress.totalStamps,
      userLevel: progress.level,
      stampCost: item.stampCost,
      requiredLevel: item.requiredLevel,
    })
  ) {
    if (progress.level < item.requiredLevel)
      throw new Error("레벨이 부족합니다.");
    throw new Error("스탬프가 부족합니다.");
  }

  // Deduct stamps and create ownership in transaction
  await prisma.$transaction([
    prisma.userProgress.update({
      where: { userId },
      data: { totalStamps: { decrement: item.stampCost } },
    }),
    prisma.userWardrobeItem.create({
      data: { userId, wardrobeItemId, earnedAt: new Date() },
    }),
  ]);

  revalidatePath("/wardrobe");
  revalidatePath("/shop");
  revalidatePath("/profile");

  return { success: true };
}

export async function getWardrobeItems() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { items: [], ownedIds: [], equippedIds: [] };

  const userId = session.user.id;

  const [items, ownedItems] = await Promise.all([
    prisma.wardrobeItem.findMany({ orderBy: { stampCost: "asc" } }),
    prisma.userWardrobeItem.findMany({
      where: { userId },
      select: { wardrobeItemId: true, equippedAt: true },
    }),
  ]);

  const ownedIds = ownedItems.map((oi) => oi.wardrobeItemId);
  const equippedIds = ownedItems
    .filter((oi) => oi.equippedAt !== null)
    .map((oi) => oi.wardrobeItemId);

  return {
    items,
    ownedIds,
    equippedIds,
  };
}

/** 아이템 착용 */
export async function equipItem(wardrobeItemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const userId = session.user.id;

  // 소유 확인
  const owned = await prisma.userWardrobeItem.findUnique({
    where: { userId_wardrobeItemId: { userId, wardrobeItemId } },
  });
  if (!owned) throw new Error("보유하지 않은 아이템입니다.");

  // 착용 처리 (equippedAt 설정)
  await prisma.userWardrobeItem.update({
    where: { userId_wardrobeItemId: { userId, wardrobeItemId } },
    data: { equippedAt: new Date() },
  });

  revalidatePath("/wardrobe");
  revalidatePath("/profile");
  revalidatePath("/");

  return { success: true };
}

/** 아이템 착용 해제 */
export async function unequipItem(wardrobeItemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const userId = session.user.id;

  // 소유 확인
  const owned = await prisma.userWardrobeItem.findUnique({
    where: { userId_wardrobeItemId: { userId, wardrobeItemId } },
  });
  if (!owned) throw new Error("보유하지 않은 아이템입니다.");

  // 착용 해제 (equippedAt null로 설정)
  await prisma.userWardrobeItem.update({
    where: { userId_wardrobeItemId: { userId, wardrobeItemId } },
    data: { equippedAt: null },
  });

  revalidatePath("/wardrobe");
  revalidatePath("/profile");
  revalidatePath("/");

  return { success: true };
}
