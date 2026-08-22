"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicDiaryCard } from "@/components/community/PublicDiaryCard";
import { SocialProfileModal } from "@/components/community/SocialProfileModal";

interface Props {
  diaries: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: {
      id: string;
      name: string | null;
      progress: { level: number; activeCharacter: string } | null;
      wardrobeItems: { wardrobeItemId: string }[];
    };
    _count: { likes: number; comments: number };
  }>;
}

export function FeedTabClient({ diaries }: Props) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <>
      <Link
        href="/diary/topic"
        className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-2"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-sakura-pink p-2 rounded-xl border-2 border-black shrink-0">
            ✏️
          </div>
          <div>
            <h3 className="font-black text-type-black text-sm">나도 일기 작성하기</h3>
            <p className="text-xs text-type-black/60 font-bold mt-0.5">
              오늘 하루 이야기를 일본어로 적어보세요 (+10 XP)
            </p>
          </div>
        </div>
        <span className="bg-sakura-pink text-type-black text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shrink-0">
          작성하기
        </span>
      </Link>

      {diaries.map((diary) => (
        <PublicDiaryCard
          key={diary.id}
          diary={diary}
          onAvatarClick={(userId) => setSelectedUserId(userId)}
        />
      ))}

      <SocialProfileModal
        targetUserId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </>
  );
}
