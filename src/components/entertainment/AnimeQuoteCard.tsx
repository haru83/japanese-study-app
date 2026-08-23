"use client";

import { useState, useMemo } from "react";
import type { AnimeQuoteItem } from "@/data/animeQuotes";
import { ANIME_CATEGORIES } from "@/data/animeQuotes";
import { BookmarkButton } from "@/components/bookmark/BookmarkButton";
import { RubyText } from "@/components/learningDiary/RubyText";
import { buildRubySegments } from "@/lib/rubyParser";
import { AnimeQuoteQuiz } from "@/components/entertainment/AnimeQuoteQuiz";
import { TtsButton } from "@/components/ui/TtsButton";

interface Props {
  quote: AnimeQuoteItem;
  initialBookmarkMap: Record<string, boolean>;
}

export function AnimeQuoteCard({ quote, initialBookmarkMap }: Props) {
  const [activeTab, setActiveTab] = useState<"vocab" | "grammar" | "quiz" | null>("vocab");
  const [showRuby, setShowRuby] = useState(true);

  const animeCat = useMemo(() => {
    return ANIME_CATEGORIES.find((c) => c.id === quote.animeId) || ANIME_CATEGORIES[0];
  }, [quote.animeId]);

  const rubySegments = useMemo(() => {
    if (quote.quoteReading) {
      return buildRubySegments(quote.quoteJa, quote.quoteReading);
    }
    return [{ text: quote.quoteJa }];
  }, [quote.quoteJa, quote.quoteReading]);

  const toggleTab = (tab: "vocab" | "grammar" | "quiz") => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 space-y-4 transition-all">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className={`${animeCat.badgeBg} text-type-black text-xs font-black px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000] flex items-center gap-1`}
          >
            <span>{animeCat.icon}</span>
            <span>{quote.animeTitleKo}</span>
          </span>
          <span className="text-xs font-bold text-type-black/60">
            {quote.characterKo}
          </span>
        </div>
      </div>

      {/* Main Quote Area */}
      <div className="bg-sakura-blush/40 rounded-xl border-2 border-black/80 p-4 space-y-2.5 relative">
        {/* Top Control Bar with Tag & Icon-only Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-black bg-canvas-almond text-type-black/80 px-2 py-0.5 rounded-md border border-black/30">
            #{quote.tag}
          </span>

          {/* Action Buttons: Audio & Ruby Toggle (Icon only, matched size) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowRuby((prev) => !prev)}
              aria-label={showRuby ? "요미가나 숨기기" : "요미가나 보기"}
              title={showRuby ? "요미가나 숨기기" : "요미가나 보기"}
              className={`w-8 h-8 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center ${
                showRuby
                  ? "bg-grape-punch text-white"
                  : "bg-paper-white text-type-black/70 hover:bg-canvas-almond/60"
              }`}
            >
              <span className="material-symbols-outlined text-base leading-none block select-none">
                translate
              </span>
            </button>

            <TtsButton
              text={quote.quoteJa}
              size="sm"
              gender={quote.gender}
              className="w-8 h-8 !p-0"
            />
          </div>
        </div>

        {/* Japanese Quote Text (Full width below buttons) */}
        <div className="text-lg sm:text-xl font-black text-type-black leading-loose tracking-wide break-words pt-1">
          <RubyText segments={rubySegments} showRuby={showRuby} />
        </div>

        {/* Korean Translation */}
        <p className="text-sm font-bold text-type-black/75 pt-1.5 border-t border-black/10">
          {quote.quoteKo}
        </p>
      </div>

      {/* Scene Context */}
      <div className="text-xs text-type-black/80 font-medium bg-canvas-almond/40 rounded-lg p-3 border border-black/20 flex items-start gap-2">
        <span className="text-base shrink-0">🎬</span>
        <p className="leading-relaxed">{quote.sceneContext}</p>
      </div>

      {/* Accordion Tabs */}
      <div className="space-y-3 pt-1">
        <div className="flex rounded-xl border-2 border-black overflow-hidden bg-canvas-almond/30 p-0.5">
          <button
            type="button"
            onClick={() => toggleTab("vocab")}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "vocab"
                ? "bg-shiba-orange text-type-black border border-black shadow-[1px_1px_0px_0px_#000]"
                : "text-type-black/70 hover:text-type-black"
            }`}
          >
            <span>📖</span> 어휘 ({quote.vocabulary.length})
          </button>
          <button
            type="button"
            onClick={() => toggleTab("grammar")}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "grammar"
                ? "bg-matcha-green text-type-black border border-black shadow-[1px_1px_0px_0px_#000]"
                : "text-type-black/70 hover:text-type-black"
            }`}
          >
            <span>💡</span> 문법 ({quote.grammarPoints.length})
          </button>
          <button
            type="button"
            onClick={() => toggleTab("quiz")}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "quiz"
                ? "bg-sakura-pink text-type-black border border-black shadow-[1px_1px_0px_0px_#000]"
                : "text-type-black/70 hover:text-type-black"
            }`}
          >
            <span>🎯</span> 퀴즈
          </button>
        </div>

        {/* Tab Content: Vocab */}
        {activeTab === "vocab" && (
          <div className="bg-paper-white rounded-xl border border-black/30 p-3 space-y-2.5 animate-fadeIn">
            {quote.vocabulary.map((vocab, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-canvas-almond/20 border border-black/10 hover:border-black/30 transition-all"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-type-black">{vocab.word}</span>
                    <span className="text-xs font-bold text-type-black/60">
                      [{vocab.reading}]
                    </span>
                    {vocab.jlptLevel && (
                      <span className="text-[10px] font-black bg-shiba-orange/20 text-type-black px-1.5 py-0.2 rounded border border-black/30">
                        {vocab.jlptLevel}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-type-black/70">{vocab.meaning}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <TtsButton text={vocab.word} size="sm" />
                  <BookmarkButton
                    word={vocab.word}
                    itemType="vocab"
                    reading={vocab.reading}
                    meaning={vocab.meaning}
                    source={`애니 톤 - ${quote.animeTitleKo}`}
                    initialBookmarked={!!initialBookmarkMap[vocab.word]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Grammar */}
        {activeTab === "grammar" && (
          <div className="bg-paper-white rounded-xl border border-black/30 p-3 space-y-3 animate-fadeIn">
            {quote.grammarPoints.map((grammar, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-matcha-green/10 border border-black/20 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-type-black bg-matcha-green px-2 py-0.5 rounded border border-black text-[11px]">
                    {grammar.pattern}
                  </span>
                  <span className="text-xs font-bold text-type-black/60">
                    {grammar.meaning}
                  </span>
                </div>
                <p className="text-xs font-medium text-type-black/80 leading-relaxed pt-1">
                  {grammar.explanation}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Quiz */}
        {activeTab === "quiz" && (
          <div className="animate-fadeIn">
            <AnimeQuoteQuiz quiz={quote.quiz} />
          </div>
        )}
      </div>
    </div>
  );
}
