"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveDiary } from "@/actions/diary";
import { reviewDiary, type TutorReviewResult } from "@/actions/diaryTutor";
import {
  filterRomajiInput,
  filterJapaneseOnly,
  hasUnconvertedRomaji,
} from "@/lib/japaneseInput";
import { Button } from "@/components/ui/Button";
import { TutorReview } from "@/components/diary/TutorReview";

const MOODS = [
  { id: "happy", emoji: "😊", label: "행복" },
  { id: "excited", emoji: "🤩", label: "신남" },
  { id: "neutral", emoji: "😐", label: "보통" },
  { id: "sad", emoji: "😢", label: "슬픔" },
  { id: "tired", emoji: "😴", label: "피곤" },
];

function DiaryWriteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicJp = searchParams.get("topic") ?? "";
  const topicKo = searchParams.get("topicKo") ?? "자유 주제";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  // 한글 입력 차단 경고
  const [titleBlocked, setTitleBlocked] = useState(false);
  const [contentBlocked, setContentBlocked] = useState(false);
  // 튜터 리뷰 상태
  const [reviewResult, setReviewResult] = useState<TutorReviewResult | null>(
    null
  );
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isTutorPublic, setIsTutorPublic] = useState(false);

  /** 입력 핸들러: 영문(로마지) + 일본어 허용, 한글 등은 차단 */
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const filtered = filterRomajiInput(raw);
      setTitle(filtered);
      setTitleBlocked(raw !== filtered);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const raw = e.target.value;
      const filtered = filterRomajiInput(raw);
      setContent(filtered);
      setContentBlocked(raw !== filtered);
    },
    []
  );

  /** AI 튜터 리뷰 요청 */
  async function handleReview() {
    if (!content.trim()) return;
    setReviewLoading(true);
    setShowReview(true);
    setReviewResult(null);
    try {
      // 리뷰 시에는 일본어만 전달
      const jpContent = filterJapaneseOnly(content);
      const jpTitle = filterJapaneseOnly(title);
      const result = await reviewDiary({ title: jpTitle, content: jpContent });
      setReviewResult(result);
    } catch {
      setReviewResult({
        overallScore: 0,
        overallComment: "리뷰를 불러오지 못했습니다. 다시 시도해주세요.",
        reviews: [],
        improvedText: filterJapaneseOnly(content),
      });
    } finally {
      setReviewLoading(false);
    }
  }

  /** 일기 저장 — 저장 시 영문/숫자는 제거 */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const jpContent = filterJapaneseOnly(content);
    if (!jpContent.trim()) return;
    setLoading(true);

    try {
      const result = await saveDiary({
        title: filterJapaneseOnly(title) || `${topicKo} 일기`,
        content: jpContent,
        mood,
        isPublic,
        isTutorPublic,
        tutorReview:
          isTutorPublic && reviewResult
            ? JSON.stringify(reviewResult)
            : undefined,
      });
      setXpGained(result.xpResult.xpGained);
      setDone(true);
    } catch {
      alert("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const hasRomajiInTitle = hasUnconvertedRomaji(title);
  const hasRomajiInContent = hasUnconvertedRomaji(content);

  // ─── 완료 화면 ───────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-sakura-blush flex flex-col items-center justify-center px-6 gap-6">
        <div className="text-8xl animate-bounce wobbly-2 sticker inline-block">
          ⭐
        </div>
        <h2 className="text-3xl font-black text-type-black">일기 완성!</h2>
        <div className="bg-paper-white border-2 border-black rounded-2xl px-6 py-4 text-center shadow-[4px_4px_0px_0px_#000]">
          <p className="text-grape-punch font-black text-2xl">
            +{xpGained} XP
          </p>
          <p className="text-type-black/60 font-bold text-sm mt-1">
            +1 스탬프 획득!
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => router.push("/home")}
          className="w-full max-w-xs"
        >
          홈으로
        </Button>
      </div>
    );
  }

  // ─── 작성 화면 ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black -ml-2 mb-1"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-type-black">{topicKo}</h1>
        {topicJp && (
          <p className="text-sm text-type-black/60 font-bold mt-0.5">
            {topicJp}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-black text-type-black mb-1.5">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="kyou no dekigoto (今日の出来事)"
            className={`w-full px-4 py-3 rounded-2xl border-2 border-black bg-paper-white text-type-black focus:outline-none focus:ring-2 focus:ring-sakura-pink font-bold ${
              titleBlocked ? "ring-2 ring-red-400" : ""
            }`}
          />
          {titleBlocked && (
            <p className="text-xs text-red-500 font-bold mt-1">
              🚫 한글 등 일본어·로마지 외 문자는 입력할 수 없습니다
            </p>
          )}
          {hasRomajiInTitle && !titleBlocked && (
            <p className="text-xs text-amber-500 font-bold mt-1">
              ✏️ 로마지가 포함되어 있습니다 — 저장 시 자동 제거됩니다
            </p>
          )}
        </div>

        {/* 기분 */}
        <div>
          <label className="block text-sm font-black text-type-black mb-2">
            오늘의 기분
          </label>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl border-2 border-black transition-all font-bold ${
                  mood === m.id
                    ? "bg-sakura-pink shadow-[3px_3px_0px_0px_#000]"
                    : "bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px]">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 일기 내용 */}
        <div>
          <label className="block text-sm font-black text-type-black mb-1.5">
            일기 내용 (일본어로 써보세요 🇯🇵)
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="kyou wa ii tenki deshita. asagohan o tabete, kouen e ikimashita...&#10;今日はいい天気でした。朝ごはんを食べて、公園へ行きました..."
            rows={8}
            required
            className={`w-full px-4 py-3 rounded-2xl border-2 border-black bg-paper-white text-type-black focus:outline-none focus:ring-2 focus:ring-sakura-pink resize-none font-bold ${
              contentBlocked ? "ring-2 ring-red-400" : ""
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-type-black/60 font-bold">
              🇯🇵 일본어 + 로마지 입력 가능 · 한글은 차단
            </p>
            <p className="text-xs text-type-black/60 font-bold">
              {content.length}자
            </p>
          </div>
          {contentBlocked && (
            <p className="text-xs text-red-500 font-bold mt-0.5">
              🚫 한글 등 일본어·로마지 외 문자는 입력할 수 없습니다
            </p>
          )}
          {hasRomajiInContent && !contentBlocked && (
            <p className="text-xs text-amber-500 font-bold mt-0.5">
              ✏️ 로마지가 포함되어 있습니다 — 저장 시 영문은 자동 제거되니
              미리 히라가나/한자로 변환해주세요
            </p>
          )}
        </div>

        {/* 공개 설정 */}
        <div className="bg-paper-white rounded-2xl border-2 border-black p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="font-black text-sm text-type-black">🌸 이 일기 공개하기</p>
              <p className="text-xs text-type-black/50 font-bold">
                커뮤니티에서 다른 학습자가 볼 수 있어요
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !isPublic;
                setIsPublic(next);
                if (!next) setIsTutorPublic(false);
              }}
              className={`relative w-12 h-6 rounded-full border-2 border-black transition-colors shrink-0 ${
                isPublic ? "bg-sakura-pink" : "bg-canvas-almond"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white border border-black rounded-full transition-transform ${
                  isPublic ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {isPublic && reviewResult && (
            <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-3">
              <div className="flex-1">
                <p className="font-black text-sm text-type-black">📝 AI 튜터 리뷰도 공개</p>
                <p className="text-xs text-type-black/50 font-bold">
                  다른 학습자가 리뷰 내용도 볼 수 있어요
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTutorPublic(!isTutorPublic)}
                className={`relative w-12 h-6 rounded-full border-2 border-black transition-colors shrink-0 ${
                  isTutorPublic ? "bg-grape-punch" : "bg-canvas-almond"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white border border-black rounded-full transition-transform ${
                    isTutorPublic ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* AI 튜터 리뷰 버튼 */}
        <Button
          type="button"
          variant="grape"
          size="lg"
          disabled={reviewLoading || !content.trim()}
          onClick={handleReview}
        >
          {reviewLoading
            ? "AI 선생님이 검토 중... 🤔"
            : "AI 선생님에게 검토받기 🎓"}
        </Button>

        {/* AI 튜터 리뷰 결과 */}
        {showReview && (
          <TutorReview
            result={reviewResult}
            loading={reviewLoading}
            onApplySuggestion={(improved) => {
              setContent(improved);
              setShowReview(false);
              setReviewResult(null);
            }}
            onClose={() => {
              setShowReview(false);
              setReviewResult(null);
            }}
          />
        )}

        {/* 저장 버튼 */}
        <Button
          type="submit"
          size="lg"
          disabled={
            loading || !filterJapaneseOnly(content).trim()
          }
        >
          {loading
            ? "저장 중..."
            : hasRomajiInContent
            ? "일기 완성! (영문 자동 제거) (+10 XP)"
            : "일기 완성! (+10 XP)"}
        </Button>
      </form>
    </div>
  );
}

export default function DiaryWritePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sakura-blush flex items-center justify-center">
          <span className="text-type-black font-bold">로딩 중...</span>
        </div>
      }
    >
      <DiaryWriteForm />
    </Suspense>
  );
}
