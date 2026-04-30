import Link from "next/link";
import Image from "next/image";
import { getDiaries } from "@/actions/diary";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const MOOD_EMOJI: Record<string, string> = {
  happy: "😊",
  excited: "🤩",
  neutral: "😐",
  sad: "😢",
  tired: "😴",
};

export default async function DiaryListPage() {
  const diaries = await getDiaries();

  return (
    <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
      {/* Mascot header */}
      <header className="flex flex-col items-center justify-center text-center gap-4 mb-6">
        <div className="relative size-28">
          <div className="absolute inset-0 bg-white dark:bg-white/10 rounded-full blur-xl transform scale-110" />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1crqd23tILcqu1qNCa4Id6qKea9e6l5TiceHM9STG_xlrbPbzKjfLsC35sGqROjUqsvLOaC5zJcvF-YMmKpi3bj1L3NadWSjG1F190_eHG0mVMp2dAge08uuQrS604aohx8JoCG7afokS_CG7oiGGArNoIk4XEB5oxMCi6a1MoFYqtFsvyzE_KedImJngqWQjmHz8RzqAfq8pXrwNinSZsrs1Z--TenSdrKLGOjmff-VNWmArcUO-BXW7LcGvJgE0VSTLOJB3sB2y"
            alt="Shiba mascot"
            fill
            className="object-contain relative z-10"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-main dark:text-text-main-dark tracking-tight leading-tight">
            내가 공부한 일기들
          </h1>
          <p className="text-sm text-text-sub dark:text-text-sub-dark mt-1 font-medium">
            오늘도 참 잘했어요! 🐕
          </p>
        </div>
      </header>

      {/* Write button */}
      <Link
        href="/diary/topic"
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-text-main font-bold h-[52px] rounded-full transition-all active:scale-[0.98] shadow-[0_4px_0_0_#d97706] hover:shadow-[0_2px_0_0_#d97706] hover:translate-y-[2px]"
      >
        <span className="material-symbols-outlined">add</span>
        새 일기 쓰기
      </Link>

      {diaries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="text-6xl">✏️</span>
          <p className="text-text-sub dark:text-text-sub-dark text-center text-sm">
            아직 작성한 일기가 없어요.
            <br />
            오늘의 일기를 써볼까요?
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {diaries.map((diary) => (
            <div
              key={diary.id}
              className="group relative flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-text-main dark:text-text-main-dark truncate">
                    {diary.title}
                  </h3>
                  {diary.mood && (
                    <span className="text-lg shrink-0">
                      {MOOD_EMOJI[diary.mood] ?? "😊"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-sub dark:text-text-sub-dark line-clamp-1 mb-1">
                  {diary.content}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-primary">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>{formatDate(diary.createdAt)} 학습 완료</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-1">
                <div className="relative flex items-center justify-center size-10 bg-primary/10 dark:bg-primary/20 rounded-full text-primary rotate-12">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary/80">완료!</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
