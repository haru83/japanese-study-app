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
