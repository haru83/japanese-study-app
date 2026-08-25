"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  TOPIC_CATEGORIES,
  TOPIC_LIST,
  TOPIC_WORDS,
  type TopicInfo,
  type TopicWord,
} from "@/data/topicVocab";
import { BookmarkButton } from "@/components/bookmark/BookmarkButton";
import { TtsButton } from "@/components/ui/TtsButton";
import { RubyText } from "@/components/learningDiary/RubyText";
import { buildRubySegments } from "@/lib/rubyParser";

interface Props {
  initialBookmarkMap: Record<string, boolean>;
}

export function TopicVocabClient({ initialBookmarkMap }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(50);

  // 100개 주제 탐색기 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>("all");
  const [modalSearch, setModalSearch] = useState("");

  // 모달 열릴 때 현재 선택된 카테고리로 초기화
  useEffect(() => {
    if (isModalOpen) {
      setModalCategory(selectedCategory);
      setModalSearch("");
    }
  }, [isModalOpen, selectedCategory]);

  // 현재 선택된 대분류에 속한 세부 주제 목록
  const availableTopics = useMemo(() => {
    if (selectedCategory === "all") {
      return TOPIC_LIST;
    }
    return TOPIC_LIST.filter((t) => t.categoryId === selectedCategory);
  }, [selectedCategory]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    // 현재 선택된 세부 주제가 새 카테고리에 속하지 않으면 'all'로 초기화
    if (catId !== "all" && selectedTopicId !== "all") {
      const topic = TOPIC_LIST.find((t) => t.id === selectedTopicId);
      if (topic && topic.categoryId !== catId) {
        setSelectedTopicId("all");
      }
    }
    setVisibleCount(50);
  };

  // 세부 주제 변경 핸들러 (선택 시 카테고리도 동기화)
  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
    if (topicId !== "all") {
      const topic = TOPIC_LIST.find((t) => t.id === topicId);
      if (topic && selectedCategory !== topic.categoryId) {
        setSelectedCategory(topic.categoryId);
      }
    }
    setVisibleCount(50);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(50);
  };

  // 전체 필터 초기화
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTopicId("all");
    setSearchQuery("");
    setVisibleCount(50);
  };

  // 모달에서 주제 선택
  const handleSelectTopicFromModal = (topic: TopicInfo) => {
    setSelectedCategory(topic.categoryId);
    setSelectedTopicId(topic.id);
    setIsModalOpen(false);
    setVisibleCount(50);
  };

  // 모달 내 필터링된 주제 목록
  const filteredModalTopics = useMemo(() => {
    return TOPIC_LIST.filter((t) => {
      const matchCat =
        modalCategory === "all" || t.categoryId === modalCategory;
      if (!matchCat) return false;

      if (!modalSearch.trim()) return true;
      const q = modalSearch.trim().toLowerCase();
      return (
        t.nameKo.toLowerCase().includes(q) ||
        t.nameJa.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });
  }, [modalCategory, modalSearch]);

  // 단어 목록 필터링
  const filteredWords = useMemo(() => {
    return TOPIC_WORDS.filter((item) => {
      // 1. 카테고리 매칭
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCategory) return false;

      // 2. 세부 주제 매칭
      const matchTopic =
        selectedTopicId === "all" || item.topicId === selectedTopicId;
      if (!matchTopic) return false;

      // 3. 검색어 매칭
      if (!searchQuery.trim()) return true;
      const query = searchQuery.trim().toLowerCase();
      return (
        item.word.toLowerCase().includes(query) ||
        item.reading.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        (item.topicLabel && item.topicLabel.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, selectedTopicId, searchQuery]);

  const activeTopicInfo = useMemo(() => {
    if (selectedTopicId === "all") return null;
    return TOPIC_LIST.find((t) => t.id === selectedTopicId) || null;
  }, [selectedTopicId]);

  const activeCategoryInfo = useMemo(() => {
    if (selectedCategory === "all") return null;
    return TOPIC_CATEGORIES.find((c) => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTopicId !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-4">
      {/* ── Header ── */}
      <header className="flex items-center gap-3">
        <Link
          href="/learning"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
          aria-label="어휘 Hub로 돌아가기"
        >
          <span className="material-symbols-outlined text-type-black text-xl leading-none block">
            arrow_back
          </span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            <span>주제별 단어</span>
            <span className="text-xl">🏷️</span>
          </h1>
          <p className="text-xs font-bold text-type-black/60 truncate">
            10대 테마 · 100개 주제별 필수 어휘 800선
          </p>
        </div>
      </header>

      {/* ── 검색창 ── */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="단어, 읽기, 뜻, 주제 검색..."
          className="w-full bg-paper-white border-2 border-black rounded-[14px] px-4 py-2.5 pl-10 text-sm font-bold text-type-black shadow-[3px_3px_0px_0px_#000] placeholder:text-type-black/40 focus:outline-none focus:ring-2 focus:ring-shiba-orange"
        />
        <span className="material-symbols-outlined absolute left-3 top-3 text-type-black/50 text-lg">
          search
        </span>
        {searchQuery && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute right-3 top-2.5 text-xs font-bold text-type-black/40 hover:text-type-black bg-type-black/10 rounded-full w-5 h-5 flex items-center justify-center"
            title="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── 주제 선택 컨트롤 영역 (드롭다운 & 모달 탐색기) ── */}
      <section className="bg-paper-white rounded-[16px] border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_#000] space-y-3">
        {/* 상단 레이블 & 탐색기 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-type-black">
            <span>🎯</span>
            <span>주제 필터링</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-grape-punch/10 hover:bg-grape-punch/20 text-grape-punch border border-grape-punch/40 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer"
          >
            <span>🧭</span>
            <span>100개 주제 모아보기</span>
          </button>
        </div>

        {/* 2단 드롭다운 (대분류 / 세부 주제) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* 1. 대분류 드롭다운 */}
          <div className="relative">
            <label className="block text-[10px] font-black text-type-black/50 mb-1 ml-1">
              1. 대분류 카테고리 (10개)
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full appearance-none bg-canvas-almond/40 border-2 border-black rounded-[12px] px-3 py-2 pr-8 text-xs font-black text-type-black focus:outline-none focus:bg-canvas-almond cursor-pointer"
              >
                {TOPIC_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label} {cat.id === "all" ? "(전체 10개 테마)" : ""}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-type-black/60 pointer-events-none text-base">
                arrow_drop_down
              </span>
            </div>
          </div>

          {/* 2. 세부 주제 드롭다운 */}
          <div className="relative">
            <label className="block text-[10px] font-black text-type-black/50 mb-1 ml-1">
              2. 세부 주제 ({availableTopics.length}개)
            </label>
            <div className="relative">
              <select
                value={selectedTopicId}
                onChange={(e) => handleTopicChange(e.target.value)}
                className="w-full appearance-none bg-canvas-almond/40 border-2 border-black rounded-[12px] px-3 py-2 pr-8 text-xs font-black text-type-black focus:outline-none focus:bg-canvas-almond cursor-pointer"
              >
                <option value="all">
                  🌟 {selectedCategory === "all" ? "세부 주제 전체 (100개)" : `${activeCategoryInfo?.label ?? ""} 전체`}
                </option>
                {selectedCategory === "all" ? (
                  // 전체 선택 시 대분류별 optgroup으로 그룹화
                  TOPIC_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <optgroup key={cat.id} label={`${cat.icon} ${cat.label}`}>
                      {TOPIC_LIST.filter((t) => t.categoryId === cat.id).map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.icon} {topic.nameKo} ({topic.nameJa})
                        </option>
                      ))}
                    </optgroup>
                  ))
                ) : (
                  // 특정 대분류 선택 시 해당 세부 주제 목록
                  availableTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.icon} {topic.nameKo} ({topic.nameJa})
                    </option>
                  ))
                )}
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-type-black/60 pointer-events-none text-base">
                arrow_drop_down
              </span>
            </div>
          </div>
        </div>

        {/* 활성 필터 태그 & 리셋 버튼 */}
        {hasActiveFilters && (
          <div className="pt-1 flex items-center gap-1.5 flex-wrap border-t border-black/10">
            <span className="text-[10px] font-black text-type-black/50">적용 필터:</span>
            {selectedCategory !== "all" && activeCategoryInfo && (
              <button
                onClick={() => handleCategoryChange("all")}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-grape-punch/15 text-grape-punch text-[11px] font-black rounded-full border border-grape-punch/30 hover:bg-grape-punch/25 transition-all cursor-pointer"
                title="카테고리 필터 해제"
              >
                <span>{activeCategoryInfo.icon} {activeCategoryInfo.label}</span>
                <span className="text-[10px]">✕</span>
              </button>
            )}
            {selectedTopicId !== "all" && activeTopicInfo && (
              <button
                onClick={() => handleTopicChange("all")}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-shiba-orange/20 text-type-black text-[11px] font-black rounded-full border border-shiba-orange/40 hover:bg-shiba-orange/30 transition-all cursor-pointer"
                title="세부 주제 필터 해제"
              >
                <span>{activeTopicInfo.icon} {activeTopicInfo.nameKo}</span>
                <span className="text-[10px]">✕</span>
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-type-black/10 text-type-black text-[11px] font-black rounded-full border border-black/20 hover:bg-type-black/15 transition-all cursor-pointer"
                title="검색 필터 해제"
              >
                <span>🔍 &quot;{searchQuery}&quot;</span>
                <span className="text-[10px]">✕</span>
              </button>
            )}
            <button
              onClick={handleResetFilters}
              className="ml-auto text-[10px] font-black text-type-black/50 hover:text-type-black underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>↺</span>
              <span>전체 초기화</span>
            </button>
          </div>
        )}
      </section>

      {/* ── 선택된 세부 주제 배너 ── */}
      {activeTopicInfo && (
        <div className="bg-canvas-almond/90 rounded-[15px] border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_#000] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl p-1.5 bg-paper-white rounded-xl border border-black/20 shrink-0">
              {activeTopicInfo.icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-type-black">
                  {activeTopicInfo.nameKo}
                </span>
                <span className="text-[10px] font-bold text-type-black/60">
                  ({activeTopicInfo.nameJa})
                </span>
              </div>
              <p className="text-[11px] font-bold text-type-black/70 truncate">
                {activeTopicInfo.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleTopicChange("all")}
            className="text-xs font-black text-type-black/60 hover:text-type-black shrink-0 px-2 py-1 bg-paper-white border border-black/20 rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer"
          >
            해제 ✕
          </button>
        </div>
      )}

      {/* ── 단어 수 카운트 & 안내 ── */}
      <div className="flex items-center justify-between text-xs font-black text-type-black/70 px-1 pt-1">
        <span>
          총 {filteredWords.length}개 중 {Math.min(visibleCount, filteredWords.length)}개 표시
        </span>
        <span className="text-[11px] font-bold text-type-black/50">
          💡 카드를 누르면 예문이 열려요
        </span>
      </div>

      {/* ── 단어 목록 ── */}
      <section className="flex flex-col gap-3">
        {filteredWords.length === 0 ? (
          <div className="bg-paper-white rounded-[15px] p-8 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-center flex flex-col items-center gap-2">
            <span className="text-4xl">🔍</span>
            <p className="font-black text-type-black">검색 결과가 없어요</p>
            <p className="text-xs font-bold text-type-black/60">
              다른 키워드로 검색하거나 카테고리/주제를 변경해 보세요.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-sakura-pink border-2 border-black rounded-xl text-xs font-black text-type-black shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              필터 전체 초기화
            </button>
          </div>
        ) : (
          filteredWords.slice(0, visibleCount).map((item: TopicWord) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className="bg-paper-white rounded-[16px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 transition-all hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl bg-sakura-pink/30 p-2 rounded-xl border border-black/20 shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-lg font-black text-type-black pt-1">
                          {item.reading ? (
                            <RubyText
                              segments={buildRubySegments(
                                item.word,
                                item.reading
                              )}
                              showRuby={true}
                            />
                          ) : (
                            item.word
                          )}
                        </span>
                        {item.topicLabel && (
                          <span className="text-[10px] font-black bg-shiba-orange/15 text-shiba-orange px-2 py-0.5 rounded-full border border-shiba-orange/30">
                            {item.topicLabel}
                          </span>
                        )}
                        <span className="text-[10px] font-black bg-type-black/10 text-type-black/70 px-2 py-0.5 rounded-full">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <p className="text-sm font-black text-grape-punch mt-1">
                        {item.meaning}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <TtsButton text={item.word} size="sm" />
                    <BookmarkButton
                      word={item.word}
                      itemType="vocab"
                      reading={item.reading}
                      meaning={item.meaning}
                      source={item.topicLabel || item.categoryLabel}
                      initialBookmarked={
                        initialBookmarkMap[item.word] ?? false
                      }
                    />
                    <span
                      className={`material-symbols-outlined text-type-black/40 text-lg transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Expanded Example Sentence */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t-2 border-dashed border-black/20 bg-canvas-almond/60 rounded-[12px] p-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-shiba-orange">
                      <span>💬</span>
                      <span>실전 예문</span>
                    </div>
                    <div className="text-sm font-bold text-type-black leading-relaxed pt-1.5">
                      <RubyText
                        segments={
                          item.exampleReading
                            ? buildRubySegments(
                                item.exampleJa,
                                item.exampleReading
                              )
                            : [{ text: item.exampleJa }]
                        }
                        showRuby={true}
                      />
                    </div>
                    <p className="text-xs font-bold text-type-black/70 mt-1">
                      {item.exampleKo}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* ── 단어 더 보기 버튼 ── */}
      {filteredWords.length > visibleCount && (
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 50)}
            className="w-full py-3 bg-paper-white hover:bg-canvas-almond border-2 border-black rounded-[15px] font-black text-sm text-type-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
          >
            단어 더 보기 (+50개, 잔여 {filteredWords.length - visibleCount}개)
          </button>
        </div>
      )}

      {/* ── 100개 주제 탐색기 모달 ── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-[100] p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-canvas-almond border-t-4 sm:border-4 border-black rounded-t-[28px] sm:rounded-[24px] shadow-[0px_-4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] max-h-[88vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="bg-paper-white px-5 py-4 border-b-2 border-black flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧭</span>
                <h2 className="text-lg font-black text-type-black">
                  100개 주제 탐색기
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border-2 border-black bg-canvas-almond flex items-center justify-center font-black text-sm text-type-black hover:bg-sakura-pink transition-colors cursor-pointer"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* 모달 검색창 */}
            <div className="px-5 pt-3.5 pb-2 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  placeholder="주제명 또는 설명 검색... (예: 라멘, 공항, 호텔)"
                  className="w-full bg-paper-white border-2 border-black rounded-[12px] px-3.5 py-2 pl-9 text-xs font-bold text-type-black placeholder:text-type-black/40 focus:outline-none focus:ring-2 focus:ring-grape-punch"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-type-black/50 text-base">
                  search
                </span>
                {modalSearch && (
                  <button
                    onClick={() => setModalSearch("")}
                    className="absolute right-2.5 top-2 text-xs font-bold text-type-black/40 hover:text-type-black cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 모달 대분류 카테고리 탭 */}
            <div className="px-5 py-1.5 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0 border-b border-black/10">
              {TOPIC_CATEGORIES.map((cat) => {
                const isSelected = modalCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setModalCategory(cat.id)}
                    className={`px-3 py-1 rounded-full border border-black text-xs font-black shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-grape-punch text-white shadow-[1px_1px_0px_0px_#000]"
                        : "bg-paper-white text-type-black/70 hover:bg-canvas-almond"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 모달 주제 카드 그리드 */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              <div className="flex items-center justify-between text-xs font-bold text-type-black/60 px-1 mb-1">
                <span>검색 결과: {filteredModalTopics.length}개 주제</span>
                <button
                  onClick={() => {
                    handleTopicChange("all");
                    setIsModalOpen(false);
                  }}
                  className="text-shiba-orange hover:underline font-black cursor-pointer"
                >
                  전체 주제 보기
                </button>
              </div>

              {filteredModalTopics.length === 0 ? (
                <div className="py-12 text-center text-type-black/60 font-bold text-xs">
                  일치하는 주제가 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredModalTopics.map((topic) => {
                    const isSelected = selectedTopicId === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectTopicFromModal(topic)}
                        className={`p-3 rounded-[14px] border-2 border-black text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          isSelected
                            ? "bg-sakura-pink shadow-[3px_3px_0px_0px_#000] translate-y-[-1px]"
                            : "bg-paper-white hover:bg-canvas-almond/80 shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px]"
                        }`}
                      >
                        <span className="text-2xl p-1 bg-white/70 rounded-xl border border-black/20 shrink-0">
                          {topic.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-type-black">
                              {topic.nameKo}
                            </span>
                            <span className="text-[10px] font-bold text-type-black/50">
                              {topic.nameJa}
                            </span>
                          </div>
                          <p className="text-[10px] font-bold text-type-black/70 mt-0.5 line-clamp-1">
                            {topic.description}
                          </p>
                          <span className="inline-block mt-1 text-[9px] font-black bg-black/5 px-1.5 py-0.5 rounded text-type-black/60">
                            {topic.categoryLabel}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="bg-paper-white p-3 border-t-2 border-black flex justify-between items-center shrink-0">
              <span className="text-xs font-bold text-type-black/50">
                원하는 카드를 누르면 즉시 필터링됩니다
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-canvas-almond border-2 border-black rounded-xl text-xs font-black text-type-black shadow-[2px_2px_0px_0px_#000] hover:bg-sakura-pink transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


