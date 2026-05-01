import { getUserProfile } from "@/actions/user";
import { ProgressBar } from "@/components/ui/ProgressBar";

const WOBBLES = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

function StickerSlot({ filled, index }: { filled: boolean; index: number }) {
  const w = WOBBLES[index % WOBBLES.length];
  return (
    <div
      className={`aspect-square rounded-[15px] flex items-center justify-center text-2xl border-2 border-black ${
        filled
          ? `bg-sakura-pink shadow-[3px_3px_0px_0px_#000] ${w}`
          : "bg-paper-white"
      }`}
    >
      {filled ? (index % 5 === 0 ? "🌟" : index % 3 === 0 ? "⭐" : "✨") : ""}
    </div>
  );
}

export default async function StickerBoardPage() {
  const profile = await getUserProfile();
  const stamps = profile?.progress?.totalStamps ?? 0;
  const TOTAL_SLOTS = 30;

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <h1 className="text-2xl font-black text-type-black">스티커 보드 🌟</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          {stamps} / {TOTAL_SLOTS} 개 수집
        </p>
      </div>

      <div className="px-5 py-4">
        <div className="bg-paper-white rounded-2xl p-4 mb-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-type-black font-black">진행도</span>
            <span className="text-grape-punch font-black">
              {Math.round((stamps / TOTAL_SLOTS) * 100)}%
            </span>
          </div>
          <ProgressBar value={Math.min(100, (stamps / TOTAL_SLOTS) * 100)} color="grape" />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: TOTAL_SLOTS }, (_, i) => (
            <StickerSlot key={i} index={i} filled={i < stamps} />
          ))}
        </div>

        <p className="text-center text-sm text-type-black/60 font-bold mt-4">
          일기 또는 경어 레슨 완료 시 스탬프를 획득해요 ⭐
        </p>
      </div>
    </div>
  );
}
