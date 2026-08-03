import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getBookmarkedItems } from "@/actions/bookmark";
import { BookmarkButton } from "@/components/bookmark/BookmarkButton";

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const items = await getBookmarkedItems();
  const vocabItems = items.filter((i) => i.itemType === "vocab");
  const grammarItems = items.filter((i) => i.itemType === "grammar");

  return (
    <div className="min-h-screen bg-sakura-blush pt-4 pb-12">
      {/* Header */}
      <header className="px-5 mb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/learning"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
          >
            <span className="material-symbols-outlined text-type-black text-xl">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-xl font-black text-type-black flex items-center gap-2">
              <span>📌</span> 북마크 단어장 ({items.length}개)
            </h1>
            <p className="text-xs font-bold text-type-black/60">
              중요 어휘와 문법을 한곳에서 모아 봐요
            </p>
          </div>
        </div>
      </header>

      <div className="px-5 flex flex-col gap-6">
        {items.length === 0 ? (
          <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-8 text-center">
            <div className="text-5xl mb-3">⭐</div>
            <h2 className="text-base font-black text-type-black">북마크한 항목이 없어요</h2>
            <p className="text-xs text-type-black/60 font-bold mt-1">
              경어 레슨이나 학습 일기에서 별 모양 버튼을 눌러 북마크에 추가해보세요!
            </p>
          </div>
        ) : (
          <>
            {/* Vocab section */}
            {vocabItems.length > 0 && (
              <section>
                <h2 className="text-sm font-black text-type-black mb-3 flex items-center gap-1.5">
                  <span className="text-lg">🔤</span> 북마크 어휘 ({vocabItems.length}개)
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {vocabItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-type-black text-base">{item.word}</p>
                          {item.reading && (
                            <span className="text-xs text-type-black/60 font-bold">({item.reading})</span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-type-black/80 mt-0.5">{item.meaning}</p>
                        <p className="text-[10px] font-bold text-type-black/40 mt-1">출처: {item.source}</p>
                      </div>
                      <BookmarkButton
                        word={item.word}
                        itemType="vocab"
                        initialBookmarked={item.isBookmarked}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Grammar section */}
            {grammarItems.length > 0 && (
              <section>
                <h2 className="text-sm font-black text-type-black mb-3 flex items-center gap-1.5">
                  <span className="text-lg">📝</span> 북마크 문법 ({grammarItems.length}개)
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {grammarItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-black text-type-black text-base">{item.word}</p>
                        <p className="text-sm font-bold text-type-black/80 mt-0.5">{item.meaning}</p>
                        <p className="text-[10px] font-bold text-type-black/40 mt-1">출처: {item.source}</p>
                      </div>
                      <BookmarkButton
                        word={item.word}
                        itemType="grammar"
                        initialBookmarked={item.isBookmarked}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
