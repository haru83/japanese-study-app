import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { DeleteDiaryButton } from "./DeleteDiaryButton";

const MOOD_EMOJI: Record<string, string> = {
  happy: "😊",
  excited: "🤩",
  neutral: "😐",
  sad: "😢",
  tired: "😴",
};

const MOOD_LABEL: Record<string, string> = {
  happy: "행복",
  excited: "신남",
  neutral: "보통",
  sad: "슬픔",
  tired: "피곤",
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return notFound();

  const diary = await prisma.diary.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!diary) return notFound();

  const moodEmoji = diary.mood ? MOOD_EMOJI[diary.mood] ?? "😊" : null;
  const moodLabel = diary.mood ? MOOD_LABEL[diary.mood] ?? "" : null;

  // 일기 내용을 문장 단위로 분리 (마침표 기준)
  const sentences = diary.content
    .split(/(?<=[。！？])/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-sakura-blush">
      {/* 상단 헤더 */}
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/diary"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black -ml-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <DeleteDiaryButton diaryId={diary.id} />
        </div>
        <div className="flex items-center gap-3">
          <ShibaAvatar level={1} size={48} sticker wobble="wobbly-1" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-type-black truncate">
              {diary.title}
            </h1>
            {diary.isPublic && (
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-sakura-pink text-type-black text-[10px] font-black px-2 py-0.5 rounded-full border border-black">
                  🌸 공개 중
                </span>
                <Link
                  href={`/community/${diary.id}`}
                  className="text-xs text-type-black/50 font-bold underline"
                >
                  커뮤니티에서 보기
                </Link>
              </div>
            )}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-type-black/60">
                {formatDate(diary.createdAt)} {formatTime(diary.createdAt)}
              </span>
              {moodEmoji && (
                <span className="text-sm" title={moodLabel ?? ""}>
                  {moodEmoji}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 일기 본문 */}
      <div className="px-5 py-6">
        <div className="bg-paper-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          {/* 문장 카드 */}
          <div className="px-5 py-5 space-y-4">
            {sentences.length > 0 ? (
              sentences.map((sentence, i) => (
                <div
                  key={i}
                  className="bg-canvas-almond/60 rounded-xl p-3 border border-black/5"
                >
                  <span className="text-xs font-black text-type-black/30 mr-2">
                    {i + 1}
                  </span>
                  <span className="text-base font-bold text-type-black leading-relaxed">
                    {sentence}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-base font-bold text-type-black leading-relaxed whitespace-pre-wrap">
                {diary.content}
              </p>
            )}
          </div>

          {/* 푸터 정보 */}
          <div className="px-5 py-3 bg-canvas-almond/30 border-t-2 border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-type-black/50">
              <span className="material-symbols-outlined text-[14px]">
                text_snippet
              </span>
              <span>{diary.content.length}자</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-type-black/50">
              <span className="material-symbols-outlined text-[14px]">
                schedule
              </span>
              <span>
                작성 {formatDate(diary.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="px-5 pb-24 space-y-3">
        <Link
          href="/diary/topic"
          className="w-full flex items-center justify-center gap-2 bg-sakura-pink font-black text-type-black h-[52px] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">add</span>
          새 일기 쓰기
        </Link>
        <Link
          href="/diary"
          className="w-full flex items-center justify-center gap-2 bg-canvas-almond font-black text-type-black h-[48px] rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          목록으로
        </Link>
      </div>
    </main>
  );
}
