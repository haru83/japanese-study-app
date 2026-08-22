"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { getPublicUserProfile } from "@/actions/user";
import type { PublicUserProfile } from "@/actions/user";

interface Props {
  targetUserId: string | null;
  onClose: () => void;
}

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

export function SocialProfileModal({ targetUserId, onClose }: Props) {
  const [profile, setProfile] = useState<PublicUserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!targetUserId) {
      setProfile(null);
      return;
    }

    setLoading(true);
    getPublicUserProfile(targetUserId).then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [targetUserId]);

  if (!targetUserId) return null;

  return (
    <Modal isOpen={Boolean(targetUserId)} onClose={onClose} title="유저 프로필 🐶">
      {loading || !profile ? (
        <div className="py-8 text-center font-bold text-type-black/60">
          프로필 정보를 불러오는 중...
        </div>
      ) : (
        <div className="flex flex-col items-center p-2 text-center gap-4">
          {/* Mascot avatar preview */}
          <div className="bg-canvas-almond rounded-[20px] border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000] w-full flex flex-col items-center">
            <ShibaAvatar
              characterId={profile.activeCharacter}
              level={profile.level}
              equippedItemIds={profile.equippedIds}
              size={80}
              sticker
              wobble="wobbly-2"
            />
            <h3 className="font-black text-type-black text-base mt-2">{profile.name}</h3>
            <span className="mt-1 bg-grape-punch text-white text-xs font-black px-3 py-1 rounded-full border border-black">
              Lv.{profile.level} {LEVEL_TITLES[profile.level - 1] ?? "학습자"}
            </span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="bg-paper-white rounded-xl border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_#000]">
              <span className="text-sm">✍️</span>
              <p className="text-xs font-bold text-type-black/60">일기</p>
              <p className="text-sm font-black text-type-black">{profile.publicDiaries.length}개</p>
            </div>
            <div className="bg-paper-white rounded-xl border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_#000]">
              <span className="text-sm">🔥</span>
              <p className="text-xs font-bold text-type-black/60">연속 학습</p>
              <p className="text-sm font-black text-type-black">{profile.streakDays}일</p>
            </div>
            <div className="bg-paper-white rounded-xl border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_#000]">
              <span className="text-sm">⭐</span>
              <p className="text-xs font-bold text-type-black/60">스탬프</p>
              <p className="text-sm font-black text-type-black">{profile.totalStamps}개</p>
            </div>
          </div>

          {/* Public diaries list */}
          {profile.publicDiaries.length > 0 && (
            <div className="w-full text-left">
              <p className="text-xs font-black text-type-black/60 mb-2">공개 일기 목록 📝</p>
              <div className="flex flex-col gap-1.5">
                {profile.publicDiaries.map((d) => (
                  <Link
                    key={d.id}
                    href={`/community/${d.id}`}
                    onClick={onClose}
                    className="bg-paper-white rounded-xl border border-black p-2.5 text-xs font-bold text-type-black hover:bg-sakura-blush transition-colors truncate block"
                  >
                    {d.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
