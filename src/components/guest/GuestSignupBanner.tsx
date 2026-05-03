import Link from "next/link";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

export function GuestSignupBanner() {
  return (
    <div className="bg-grape-punch rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center gap-3">
      <ShibaAvatar level={1} size={36} sticker wobble="wobbly-2" />
      <div className="flex-1 min-w-0">
        <p className="font-black text-white text-sm leading-snug">
          가입하면 학습 기록이 쌓여요!
        </p>
        <p className="text-white/70 text-xs font-bold mt-0.5">
          XP · 스탬프 · 아바타 꾸미기
        </p>
      </div>
      <Link
        href="/login?mode=signup"
        className="shrink-0 bg-paper-white text-type-black font-black text-xs px-3 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
      >
        가입하기
      </Link>
    </div>
  );
}
