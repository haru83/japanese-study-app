// src/components/community/LikeButton.tsx
"use client";

import { toggleLike } from "@/actions/community";
import { ReactionPicker } from "./ReactionPicker";
import { ReactionGroup } from "@/lib/community";

type Props = {
  diaryId: string;
  reactions?: ReactionGroup[];
  initialIsLiked?: boolean;
  initialCount?: number;
  currentUserId?: string;
};

export function LikeButton({
  diaryId,
  reactions,
  currentUserId,
}: Props) {
  const handleToggle = async (id: string, emoji: string) => {
    await toggleLike(id, emoji);
  };

  const defaultReactions: ReactionGroup[] = reactions ?? [
    { emoji: "🌸", count: 0, hasReacted: false },
    { emoji: "👍", count: 0, hasReacted: false },
    { emoji: "❤️", count: 0, hasReacted: false },
    { emoji: "😂", count: 0, hasReacted: false },
    { emoji: "😢", count: 0, hasReacted: false },
    { emoji: "🔥", count: 0, hasReacted: false },
  ];

  return (
    <ReactionPicker
      targetId={diaryId}
      reactions={defaultReactions}
      onToggle={handleToggle}
      currentUserId={currentUserId}
    />
  );
}

