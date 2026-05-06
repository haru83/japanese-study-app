// src/app/(app)/community/[diaryId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPublicDiary } from "@/actions/community";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { LikeButton } from "@/components/community/LikeButton";
import { CommentSection } from "@/components/community/CommentSection";
import { ReportButton } from "@/components/community/ReportModal";
import type { TutorReviewResult } from "@/actions/diaryTutor";

export default async function CommunityDiaryPage({
  params,
}: {
  params: Promise<{ diaryId: string }>;
}) {
  const { diaryId } = await params;
  const session = await getServerSession(authOptions);

  const diary = await getPublicDiary(diaryId);
  if (!diary) return notFound();

  const level = diary.user.progress?.level ?? 1;
  const equippedIds = diary.user.wardrobeItems.map((w) => w.wardrobeItemId);
  const tutorReviewData =
    diary.isTutorPublic && diary.tutorReview
      ? (JSON.parse(diary.tutorReview) as TutorReviewResult)
      : null;

  return (
    <main className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/community"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all -ml-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          {session?.user?.id && session.user.id !== diary.userId && (
            <ReportButton targetType="diary" targetId={diary.id} />
          )}
        </div>
        <div className="flex items-center gap-3">
          <ShibaAvatar
            level={level}
            size={48}
            sticker
            wobble="wobbly-1"
            equippedItemIds={equippedIds}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-type-black">
                {diary.user.name ?? "학습자"}
              </span>
              <span className="bg-grape-punch text-white text-xs font-black px-2 py-0.5 rounded-full border border-black">
                Lv.{level}
              </span>
            </div>
            <p className="text-xs text-type-black/50 font-bold">
              {new Date(diary.createdAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 pb-24">
        <div className="bg-paper-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
          <h1 className="font-black text-type-black text-lg mb-3">
            {diary.title}
          </h1>
          <p className="text-base font-bold text-type-black leading-relaxed whitespace-pre-wrap">
            {diary.content}
          </p>
        </div>

        {tutorReviewData && (
          <div className="bg-grape-punch/10 rounded-2xl border-2 border-grape-punch/30 p-4">
            <p className="text-xs font-black text-grape-punch mb-2">
              🎓 AI 튜터 리뷰
            </p>
            <p className="text-sm font-bold text-type-black mb-3">
              {tutorReviewData.overallComment}
            </p>
            {tutorReviewData.improvedText && (
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-[10px] font-black text-grape-punch mb-1">
                  개선 예문
                </p>
                <p className="text-sm font-bold text-type-black">
                  {tutorReviewData.improvedText}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          {session?.user?.id ? (
            <LikeButton
              diaryId={diary.id}
              initialIsLiked={diary.isLiked}
              initialCount={diary.likes.length}
            />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-black bg-paper-white font-black text-sm text-type-black/70 shadow-[3px_3px_0px_0px_#000]"
            >
              <span>🌸</span>
              <span>로그인 후 공감하기</span>
            </Link>
          )}
        </div>

        <CommentSection
          diaryId={diary.id}
          comments={diary.comments}
          currentUserId={session?.user?.id}
        />
      </div>
    </main>
  );
}
