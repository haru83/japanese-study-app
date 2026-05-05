"use client";

import { type TutorReviewResult } from "@/actions/diaryTutor";
import { Button } from "@/components/ui/Button";

interface TutorReviewProps {
  result: TutorReviewResult | null;
  loading: boolean;
  onApplySuggestion: (improvedText: string) => void;
  onClose: () => void;
}

/** 점수 → 색상/레벨 매핑 */
function scoreToStyle(score: number) {
  if (score >= 80) return { color: "text-matcha-green", bg: "bg-matcha-green/10", label: "優秀 🌟" };
  if (score >= 60) return { color: "text-grape-punch", bg: "bg-grape-punch/10", label: "良い 👍" };
  if (score >= 40) return { color: "text-amber-500", bg: "bg-amber-500/10", label: "もう少し 💪" };
  return { color: "text-red-500", bg: "bg-red-500/10", label: "頑張ろう 📚" };
}

export function TutorReview({
  result,
  loading,
  onApplySuggestion,
  onClose,
}: TutorReviewProps) {
  // 로딩 중
  if (loading) {
    return (
      <div className="bg-paper-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-bounce">🧑‍🏫</div>
          <div>
            <p className="font-black text-type-black">AI 선생님이 검토 중...</p>
            <p className="text-xs text-type-black/60 font-bold">문법과 어휘를 꼼꼼히 확인하고 있어요</p>
          </div>
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-type-black/5 rounded animate-pulse"
              style={{ width: `${80 - i * 20}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // 결과 없음
  if (!result) return null;

  const scoreStyle = scoreToStyle(result.overallScore);
  const hasReviews = result.reviews.length > 0;
  const hasImprovement = result.improvedText !== "" && result.reviews.length > 0;

  return (
    <div className="bg-paper-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden">
      {/* 헤더: 점수 + 종합 코멘트 */}
      <div className={`${scoreStyle.bg} px-5 py-4 border-b-2 border-black`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧑‍🏫</span>
            <span className="font-black text-type-black text-base">AI 튜터 리뷰</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-black text-lg ${scoreStyle.color}`}>
              {result.overallScore}점
            </span>
            <span className={`text-xs font-black px-2 py-0.5 rounded-full border border-current ${scoreStyle.color}`}>
              {scoreStyle.label}
            </span>
          </div>
        </div>
        <p className="text-sm text-type-black/80 font-bold leading-relaxed">
          {result.overallComment}
        </p>
      </div>

      {/* 문장별 리뷰 */}
      {hasReviews && (
        <div className="px-5 py-4 space-y-4">
          <h3 className="font-black text-type-black text-sm">
            📝 수정 포인트 ({result.reviews.length}개)
          </h3>
          {result.reviews.map((review, i) => (
            <div
              key={i}
              className="bg-canvas-almond rounded-xl p-3 border-2 border-black/10 space-y-2"
            >
              {/* 원문 */}
              <div>
                <span className="text-[10px] font-black text-type-black/40 uppercase">
                  원문
                </span>
                <p className="text-sm font-bold text-type-black/70 line-through">
                  {review.original}
                </p>
              </div>

              {/* 이슈 */}
              {review.issues.map((issue, j) => (
                <div key={j} className="flex items-start gap-1.5">
                  <span className="text-xs mt-0.5 shrink-0">⚠️</span>
                  <p className="text-xs font-bold text-amber-600 leading-relaxed">
                    {issue}
                  </p>
                </div>
              ))}

              {/* 개선 문장 */}
              <div>
                <span className="text-[10px] font-black text-type-black/40 uppercase">
                  개선
                </span>
                <p className="text-sm font-black text-matcha-green">
                  → {review.improved}
                </p>
                {review.improvedKo && (
                  <p className="text-xs text-type-black/50 font-bold mt-0.5">
                    ({review.improvedKo})
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 개선 제안 없음 (잘 쓴 경우) */}
      {!hasReviews && (
        <div className="px-5 py-6 text-center">
          <span className="text-4xl inline-block mb-2">🎉</span>
          <p className="font-black text-type-black">문법 오류를 찾지 못했어요!</p>
          <p className="text-xs text-type-black/60 font-bold mt-1">
            이대로 제출하셔도 좋습니다
          </p>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="px-5 py-4 border-t-2 border-black/10 flex gap-2">
        {hasImprovement && (
          <Button
            type="button"
            variant="grape"
            size="md"
            onClick={() => onApplySuggestion(result.improvedText)}
            className="flex-1"
          >
            개선안 적용 ✨
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onClose}
          className={hasImprovement ? "" : "flex-1"}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}
