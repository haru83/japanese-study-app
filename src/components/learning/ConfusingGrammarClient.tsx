"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  CONFUSING_GRAMMAR_CATEGORIES,
  CONFUSING_GRAMMAR_DATA,
} from "@/data/confusingGrammar";
import { BookmarkButton } from "@/components/bookmark/BookmarkButton";
import { RubyText } from "@/components/learningDiary/RubyText";
import { parseMonoRubySegments, buildRubySegments } from "@/lib/rubyParser";

interface Props {
  initialBookmarkMap: Record<string, boolean>;
}

const JLPT_LEVELS = ["all", "N5", "N4", "N3", "N2", "N1"] as const;

export function ConfusingGrammarClient({ initialBookmarkMap }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("cg-01");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const filteredItems = useMemo(() => {
    return CONFUSING_GRAMMAR_DATA.filter((item) => {
      // 1. 카테고리 필터
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // 2. JLPT 레벨 필터
      if (selectedLevel !== "all" && item.level !== selectedLevel) {
        return false;
      }
      // 3. 북마크 필터
      if (showOnlyBookmarked && !initialBookmarkMap[item.title]) {
        return false;
      }
      // 4. 검색어 필터
      if (!searchQuery.trim()) return true;
      const query = searchQuery.trim().toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.coreDifference.toLowerCase().includes(query) ||
        item.tip.toLowerCase().includes(query) ||
        item.comparisonPoints.some((p) => {
          const plainExampleJa = p.exampleJa.replace(/\[([^|]+)\|[^\]]+\]/g, "$1").toLowerCase();
          return (
            p.pattern.toLowerCase().includes(query) ||
            p.meaning.toLowerCase().includes(query) ||
            p.keyNuance.toLowerCase().includes(query) ||
            plainExampleJa.includes(query) ||
            p.exampleKo.toLowerCase().includes(query)
          );
        })
      );
    });
  }, [selectedCategory, selectedLevel, showOnlyBookmarked, searchQuery, initialBookmarkMap]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSelectQuizOption = (itemId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [itemId]: optionIndex,
    }));
  };

  const totalItemsCount = CONFUSING_GRAMMAR_DATA.length;
  const bookmarkedCount = Object.keys(initialBookmarkMap).filter((title) =>
    CONFUSING_GRAMMAR_DATA.some((item) => item.title === title)
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-5">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/learning"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
            aria-label="어휘 Hub로 돌아가기"
          >
            <span className="material-symbols-outlined text-type-black text-xl leading-none block">
              arrow_back
            </span>
          </Link>
          <div>
            <h1 className="text-xl font-black text-type-black flex items-center gap-2">
              헷갈리는 문법 🤔
            </h1>
            <p className="text-xs font-bold text-type-black/60">
              비슷해서 틀리기 쉬운 핵심 문법 50선 명쾌 비교
            </p>
          </div>
        </div>

        {/* 북마크만 보기 토글 버튼 */}
        <button
          onClick={() => setShowOnlyBookmarked((prev) => !prev)}
          className={`px-3 py-1.5 rounded-full border-2 border-black text-xs font-black shrink-0 transition-all flex items-center gap-1 shadow-[2px_2px_0px_0px_#000] ${
            showOnlyBookmarked
              ? "bg-amber-300 text-type-black"
              : "bg-paper-white text-type-black/70 hover:bg-canvas-almond"
          }`}
        >
          <span>⭐</span>
          <span>{bookmarkedCount}</span>
        </button>
      </header>

      {/* Overview Stats Card */}
      <div className="bg-canvas-almond rounded-[18px] border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-paper-white p-2 rounded-xl border border-black shrink-0">
            💡
          </span>
          <div>
            <p className="text-sm font-black text-type-black">
              뉘앙스 차이 & 실전 퀴즈 노트
            </p>
            <p className="text-xs font-bold text-type-black/60 mt-0.5">
              카드를 탭하여 예문과 접속 형태, 퀴즈를 풀어보세요!
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-black bg-shiba-orange/30 px-2.5 py-1 rounded-full border border-black text-type-black">
            {filteredItems.length} / {totalItemsCount}
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="문법, 접속, 뉘앙스, 예문 검색..."
          className="w-full bg-paper-white border-2 border-black rounded-[14px] px-4 py-2.5 pl-10 text-sm font-bold text-type-black shadow-[3px_3px_0px_0px_#000] placeholder:text-type-black/40 focus:outline-none focus:ring-2 focus:ring-shiba-orange"
        />
        <span className="material-symbols-outlined absolute left-3 top-3 text-type-black/50 text-lg">
          search
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-2.5 text-xs font-bold text-type-black/40 hover:text-type-black bg-type-black/10 rounded-full w-5 h-5 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
        {CONFUSING_GRAMMAR_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full border-2 border-black text-xs font-black shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-shiba-orange text-type-black shadow-[2px_2px_0px_0px_#000] translate-y-[-1px]"
                  : "bg-paper-white text-type-black shadow-[2px_2px_0px_0px_#000] hover:bg-canvas-almond"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* JLPT Level Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none items-center">
        <span className="text-[11px] font-black text-type-black/50 shrink-0 mr-1">
          JLPT:
        </span>
        {JLPT_LEVELS.map((lvl) => {
          const isSelected = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg border border-black text-[11px] font-black shrink-0 transition-all ${
                isSelected
                  ? "bg-matcha-green text-type-black shadow-[1px_1px_0px_0px_#000] font-black"
                  : "bg-paper-white/80 text-type-black/60 hover:bg-paper-white"
              }`}
            >
              {lvl === "all" ? "전체" : lvl}
            </button>
          );
        })}
      </div>

      {/* Confusing Grammar Cards List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-paper-white rounded-[15px] border-2 border-black p-8 text-center shadow-[4px_4px_0px_0px_#000]">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="font-black text-sm text-type-black">
              검색 결과가 없습니다
            </p>
            <p className="text-xs text-type-black/50 mt-1 font-bold">
              다른 검색어 또는 필터를 선택해 보세요.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const isBookmarked = !!initialBookmarkMap[item.title];
            const userAnswer = quizAnswers[item.id];
            const hasAnswered = userAnswer !== undefined;
            const isCorrect = hasAnswered && userAnswer === item.quiz.answerIndex;

            return (
              <div
                key={item.id}
                className="bg-paper-white rounded-[18px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden transition-all"
              >
                {/* Card Header Summary */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 cursor-pointer hover:bg-canvas-almond/20 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black bg-grape-punch text-white px-2.5 py-0.5 rounded-full border border-black shrink-0">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] font-black bg-sakura-pink text-type-black px-2 py-0.5 rounded-full border border-black shrink-0">
                        {item.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <BookmarkButton
                        word={item.title}
                        itemType="grammar"
                        meaning={item.summary}
                        source="헷갈리는 문법"
                        initialBookmarked={isBookmarked}
                      />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-black text-base text-type-black flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.title}</span>
                      </h2>
                      <p className="text-xs font-bold text-type-black/70 mt-1 leading-snug">
                        {item.summary}
                      </p>
                    </div>

                    <button
                      className="p-1 rounded-full border border-black/20 bg-paper-white shrink-0 mt-1"
                      aria-label={isExpanded ? "접기" : "상세보기"}
                    >
                      <span className="material-symbols-outlined text-lg text-type-black block">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t-2 border-black bg-canvas-almond/30 p-4 space-y-4 text-xs font-bold">
                    {/* Comparison Points List */}
                    <div className="space-y-3">
                      {item.comparisonPoints.map((point, idx) => (
                        <div
                          key={point.pattern}
                          className="bg-paper-white rounded-[14px] border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_#000] space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-sm text-shiba-orange-dark bg-shiba-orange/15 px-2.5 py-0.5 rounded-lg border border-shiba-orange/40">
                              {idx + 1}. {point.pattern}
                            </span>
                            <span className="text-[11px] font-black text-type-black/80">
                              {point.meaning}
                            </span>
                          </div>

                          {/* Connection Rule */}
                          <div className="bg-canvas-almond/60 p-2 rounded-lg border border-black/10 text-[11px] text-type-black/80">
                            <span className="font-black text-grape-punch mr-1">🔗 접속:</span>
                            <span>{point.connection}</span>
                          </div>

                          {/* Nuance */}
                          <p className="text-[11px] text-type-black/85 leading-relaxed">
                            <span className="font-black text-type-black">💡 뉘앙스: </span>
                            {point.keyNuance}
                          </p>

                          {/* Example with RubyText */}
                          <div className="bg-sakura-blush/60 p-3 rounded-lg border border-sakura-pink space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-black text-type-black/70">
                              <span>💬</span>
                              <span>예문</span>
                            </div>
                            <div className="text-sm font-bold text-type-black leading-relaxed pt-1">
                              <RubyText
                                segments={
                                  point.exampleJa.includes("[")
                                    ? parseMonoRubySegments(point.exampleJa)
                                    : point.exampleReading
                                    ? buildRubySegments(point.exampleJa, point.exampleReading)
                                    : [{ text: point.exampleJa }]
                                }
                                showRuby={true}
                              />
                            </div>
                            <p className="text-xs font-bold text-type-black/70">
                              {point.exampleKo}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Core Difference & Tip Box */}
                    <div className="bg-sakura-pink/30 rounded-[14px] border-2 border-black p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-type-black">
                        <span>🔍</span>
                        <span>결정적 구분 기준</span>
                      </div>
                      <p className="text-xs text-type-black/90 leading-relaxed">
                        {item.coreDifference}
                      </p>
                      <div className="pt-1 border-t border-black/10">
                        <p className="text-xs text-shiba-orange-dark font-black">
                          {item.tip}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Mini Quiz */}
                    <div className="bg-paper-white rounded-[14px] border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_#000] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-type-black flex items-center gap-1.5">
                          <span>✍️</span>
                          <span>실전 확인 퀴즈</span>
                        </span>
                        {hasAnswered && (
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                              isCorrect
                                ? "bg-matcha-green text-type-black border-black"
                                : "bg-red-200 text-red-800 border-red-400"
                            }`}
                          >
                            {isCorrect ? "정답입니다! 🎉" : "다시 확인해 보세요 🧐"}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-black text-type-black bg-canvas-almond/40 p-2.5 rounded-lg border border-black/10">
                        {item.quiz.question}
                      </p>

                      {/* Quiz Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.quiz.options.map((option, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          const isOptionCorrect = optIdx === item.quiz.answerIndex;

                          let btnStyle = "bg-paper-white text-type-black border-black/30 hover:border-black";
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-matcha-green text-type-black border-black font-black";
                            } else if (isSelected && !isOptionCorrect) {
                              btnStyle = "bg-red-100 text-red-700 border-red-400 line-through";
                            } else {
                              btnStyle = "bg-paper-white/50 text-type-black/40 border-black/10";
                            }
                          }

                          return (
                            <button
                              key={option}
                              onClick={() => handleSelectQuizOption(item.id, optIdx)}
                              className={`p-2 rounded-lg border-2 text-left text-xs font-bold transition-all ${btnStyle}`}
                            >
                              <span className="font-black mr-1.5">
                                {optIdx + 1}.
                              </span>
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation on Answer */}
                      {hasAnswered && (
                        <div className="bg-canvas-almond/80 p-2.5 rounded-lg border border-black/20 text-[11px] text-type-black/80 space-y-1">
                          <p className="font-black text-type-black flex items-center gap-1">
                            <span>📖</span>
                            <span>해설:</span>
                          </p>
                          <p className="leading-relaxed">
                            {item.quiz.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
