import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { XP_REWARDS } from "@/lib/xp";

export default async function AdminRewardsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const items = await prisma.wardrobeItem.findMany({
    orderBy: { requiredLevel: "asc" },
  });

  return (
    <div className="min-h-screen bg-sakura-blush px-5 pt-8 pb-12 flex flex-col gap-6">
      {/* Header */}
      <header className="bg-canvas-almond rounded-[20px] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
        <h1 className="text-xl font-black text-type-black flex items-center gap-2">
          <span className="text-2xl">🎁</span> 보상 & 파라미터 관리
        </h1>
        <p className="text-xs font-bold text-type-black/60 mt-1">
          학습 보상(XP/스탬프) 파라미터와 마스코트 상점 가격표를 관리해요
        </p>
      </header>

      {/* XP Reward Table */}
      <section className="bg-paper-white rounded-[20px] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
        <h2 className="text-base font-black text-type-black mb-3 flex items-center gap-2">
          <span>⚡</span> 기본 학습 XP 보상 기준표
        </h2>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-almond/50 border border-black text-sm">
            <span className="font-bold text-type-black">경어 레슨 완료</span>
            <span className="font-black text-grape-punch">+{XP_REWARDS.KEIGO_LESSON_COMPLETE} XP / +1 ⭐</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-almond/50 border border-black text-sm">
            <span className="font-bold text-type-black">일본어 일기 작성</span>
            <span className="font-black text-grape-punch">+{XP_REWARDS.DIARY_COMPLETE} XP / +1 ⭐</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-almond/50 border border-black text-sm">
            <span className="font-bold text-type-black">퀴즈 만점(100%) 보너스</span>
            <span className="font-black text-matcha-green">+{XP_REWARDS.KEIGO_QUIZ_PERFECT} XP</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-almond/50 border border-black text-sm">
            <span className="font-bold text-type-black">데일리 퀘스트 달성</span>
            <span className="font-black text-shiba-orange">+10 ~ 25 XP</span>
          </div>
        </div>
      </section>

      {/* Wardrobe Items Price Catalog Table */}
      <section className="bg-paper-white rounded-[20px] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>👗</span> 아바타 상점 아이템 가격표 ({items.length}개)
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-canvas-almond/30 shadow-[2px_2px_0px_0px_#000]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-type-black text-sm">{item.name}</p>
                    {item.isRare && (
                      <span className="bg-grape-punch text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-black">
                        RARE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-type-black/60 font-bold">{item.description}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="bg-shiba-orange text-type-black text-xs font-black px-3 py-1 rounded-full border border-black block mb-1">
                  ⭐ {item.stampCost} 스탬프
                </span>
                <span className="text-[10px] font-bold text-type-black/60">
                  Lv.{item.requiredLevel} 해금
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
