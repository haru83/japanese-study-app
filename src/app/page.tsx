import Link from "next/link";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

export default function SplashPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush">

      {/* ─── Header ─── */}
      <header className="bg-canvas-almond border-b-4 border-black px-6 pt-10 pb-5 flex items-center justify-between shrink-0">
        <div className="wobbly-2 bg-paper-white rounded-[30px] border-2 border-black px-5 py-3 shadow-[0px_0px_0px_3px_#ffd80c]">
          <p className="text-[10px] font-black text-type-black/40 tracking-[0.2em] uppercase mb-0.5">
            Japanese Learning
          </p>
          <h1 className="text-[26px] font-black text-type-black leading-none tracking-tight">
            시바 일본어
          </h1>
        </div>
        <ShibaAvatar level={1} size={48} sticker wobble="wobbly-4" />
      </header>

      {/* ─── Main ─── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-5">

        {/* Mascot sticker */}
        <div className="relative">
          <div className="w-32 h-32 rounded-[30px] border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-canvas-almond flex items-center justify-center wobbly-1">
            <ShibaAvatar level={1} size={112} />
          </div>
          <div className="absolute -bottom-2 -right-2 text-2xl sticker wobbly-5">🌸</div>
        </div>

        {/* Tagline — Speech Bubble */}
        <div className="bg-paper-white rounded-[144px] border-2 border-black px-7 py-3.5 shadow-[0px_0px_0px_2px_#ffd80c] text-center wobbly-3 w-full max-w-xs">
          <p className="font-black text-type-black text-base leading-snug">
            일기로 배우는 쉬운 일본어
          </p>
          <p className="text-type-black/60 text-xs font-bold mt-1">
            경어 레슨 + 학습 일기 한 번에 ✨
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex gap-2 flex-wrap justify-center">
          {["📖 일기", "🎯 경어", "⭐ 스탬프", "👗 아바타"].map((tag, i) => (
            <span
              key={tag}
              className={`text-xs font-black px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] ${
                i % 2 === 0 ? "bg-sakura-pink" : "bg-canvas-almond"
              } text-type-black`}
            >
              {tag}
            </span>
          ))}
        </div>
      </main>

      {/* ─── Footer / CTAs ─── */}
      <footer className="px-6 pb-10 pt-2 flex flex-col items-center gap-3 shrink-0">
        <Link
          href="/login?mode=signup"
          className="w-full flex items-center justify-center gap-2 bg-sakura-pink text-type-black font-black text-base py-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 transition-all"
        >
          ✉️ 이메일로 가입하기
        </Link>

        <Link
          href="/home"
          className="w-full flex items-center justify-center gap-2 bg-canvas-almond text-type-black font-black text-base py-3.5 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 transition-all"
        >
          ▶ 로그인 없이 학습 시작
        </Link>

        <p className="text-sm font-bold text-type-black/70">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-grape-punch font-black underline underline-offset-2">
            로그인
          </Link>
        </p>
      </footer>
    </div>
  );
}
