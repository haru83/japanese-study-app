"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TOPIC_CATEGORIES, TOPIC_WORDS, type TopicWord } from "@/data/topicVocab";
import { BookmarkButton } from "@/components/bookmark/BookmarkButton";
import { TtsButton } from "@/components/ui/TtsButton";
import { RubyText } from "@/components/learningDiary/RubyText";
import { buildRubySegments } from "@/lib/rubyParser";

interface Props {
  initialBookmarkMap: Record<string, boolean>;
}

export function TopicVocabClient({ initialBookmarkMap }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    return TOPIC_WORDS.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.trim().toLowerCase();
      return (
        item.word.toLowerCase().includes(query) ||
        item.reading.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-5">
      {/* Header */}
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
        <div>
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            주제별 단어 🏷️
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            실생활 5대 테마 필수 어휘 50선
          </p>
        </div>
      </header>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="단어, 읽기, 뜻 검색..."
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
        {TOPIC_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full border-2 border-black text-xs font-black shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000] translate-y-[-1px]"
                  : "bg-paper-white text-type-black shadow-[2px_2px_0px_0px_#000] hover:bg-canvas-almond"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Word Count Info */}
      <div className="flex items-center justify-between text-xs font-black text-type-black/70 px-1">
        <span>총 {filteredWords.length}개의 단어</span>
        <span className="text-[11px] font-bold text-type-black/50">
          💡 카드를 누르면 예문이 열려요
        </span>
      </div>

      {/* Word List */}
      <section className="flex flex-col gap-3">
        {filteredWords.length === 0 ? (
          <div className="bg-paper-white rounded-[15px] p-8 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-center flex flex-col items-center gap-2">
            <span className="text-4xl">🔍</span>
            <p className="font-black text-type-black">검색 결과가 없어요</p>
            <p className="text-xs font-bold text-type-black/60">
              다른 키워드로 검색하거나 카테고리를 변경해 보세요.
            </p>
          </div>
        ) : (
          filteredWords.map((item: TopicWord) => {
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-black text-type-black pt-1">
                          {item.reading ? (
                            <RubyText
                              segments={buildRubySegments(item.word, item.reading)}
                              showRuby={true}
                            />
                          ) : (
                            item.word
                          )}
                        </span>
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
                      source={item.categoryLabel}
                      initialBookmarked={initialBookmarkMap[item.word] ?? false}
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
                            ? buildRubySegments(item.exampleJa, item.exampleReading)
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
    </div>
  );
}
