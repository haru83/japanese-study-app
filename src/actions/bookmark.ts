"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export interface BookmarkedItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  source: string;
  itemType: string;
  context?: string | null;
  isBookmarked: boolean;
  createdAt: Date;
}

export async function toggleBookmark(params: {
  word: string;
  itemType?: "vocab" | "grammar";
  reading?: string;
  meaning?: string;
  source?: string;
}): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return false;

  const userId = session.user.id;
  const word = params.word;
  const itemType = params.itemType ?? "vocab";

  const existing = await prisma.vocabReview.findUnique({
    where: {
      userId_word_itemType: { userId, word, itemType },
    },
  });

  if (existing) {
    const updated = await prisma.vocabReview.update({
      where: { id: existing.id },
      data: { isBookmarked: !existing.isBookmarked },
    });
    return updated.isBookmarked;
  }

  // Create new item if not in VocabReview yet
  const created = await prisma.vocabReview.create({
    data: {
      userId,
      word,
      reading: params.reading ?? "",
      meaning: params.meaning ?? "",
      source: params.source ?? "북마크",
      itemType,
      isBookmarked: true,
    },
  });

  return created.isBookmarked;
}

export async function getBookmarkedItems(itemType?: string): Promise<BookmarkedItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const items = await prisma.vocabReview.findMany({
    where: {
      userId: session.user.id,
      isBookmarked: true,
      ...(itemType ? { itemType } : {}),
    },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      word: true,
      reading: true,
      meaning: true,
      source: true,
      itemType: true,
      context: true,
      isBookmarked: true,
      createdAt: true,
    },
  });

  return items;
}

export async function getBookmarkMap(): Promise<Record<string, boolean>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return {};

  const items = await prisma.vocabReview.findMany({
    where: {
      userId: session.user.id,
      isBookmarked: true,
    },
    select: { word: true },
  });

  const map: Record<string, boolean> = {};
  for (const item of items) {
    map[item.word] = true;
  }

  return map;
}
