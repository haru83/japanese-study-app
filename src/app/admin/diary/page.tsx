import Link from "next/link";
import { prisma } from "@/lib/db";
import { toggleLearningDiaryActive } from "@/actions/admin-content";

const LEVEL_COLORS: Record<string, string> = {
  초급: "bg-matcha-green text-black",
  중급: "bg-shiba-orange text-black",
  고급: "bg-grape-punch text-white",
};

const PAGE_SIZE = 30;

export default async function AdminDiaryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; level?: string; category?: string }>;
}) {
  const { page: pageStr, q, level, category } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));

  const where = {
    ...(q ? { title: { contains: q } } : {}),
    ...(level && level !== "all" ? { level } : {}),
    ...(category && category !== "all" ? { category } : {}),
  };

  const [entries, total] = await Promise.all([
    prisma.learningDiaryEntry.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      select: { id: true, title: true, titleKo: true, category: true, level: true, thumbnail: true, isActive: true, sortOrder: true },
    }),
    prisma.learningDiaryEntry.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-type-black">학습 일기 관리</h1>
            <p className="text-sm text-type-black/60 font-bold">총 {total}개</p>
          </div>
          <Link
            href="/admin/diary/new"
            className="px-4 py-2 bg-sakura-pink text-black font-black text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            + 신규
          </Link>
        </div>

        <form className="flex gap-2 mt-3 flex-wrap">
          <input
            name="q"
            defaultValue={q}
            placeholder="제목 검색..."
            className="flex-1 min-w-0 px-3 py-2 text-sm border-2 border-black rounded-xl bg-paper-white font-bold"
          />
          <select
            name="level"
            defaultValue={level ?? "all"}
            className="px-3 py-2 text-sm border-2 border-black rounded-xl bg-paper-white font-bold"
          >
            <option value="all">전체 레벨</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>
          <select
            name="category"
            defaultValue={category ?? "all"}
            className="px-3 py-2 text-sm border-2 border-black rounded-xl bg-paper-white font-bold"
          >
            <option value="all">전체 카테고리</option>
            {["일상","음식","여행","계절","감정","학교","직장","취미","쇼핑","건강"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-paper-white border-2 border-black rounded-xl text-sm font-black shadow-[2px_2px_0px_0px_#000]"
          >
            검색
          </button>
        </form>
      </div>

      <div className="px-5 py-4 flex flex-col gap-2 pb-24">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-paper-white rounded-[15px] px-4 py-3 border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-3"
          >
            <span className="text-2xl shrink-0">{entry.thumbnail}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full border border-black ${LEVEL_COLORS[entry.level]}`}
                >
                  {entry.level}
                </span>
                <span className="text-[10px] text-type-black/50 font-bold">{entry.category}</span>
              </div>
              <p className="font-black text-type-black text-sm truncate">{entry.title}</p>
              <p className="text-xs text-type-black/50 font-bold truncate">{entry.titleKo}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form action={toggleLearningDiaryActive.bind(null, entry.id)}>
                <button
                  type="submit"
                  className={`text-xs font-black px-2 py-0.5 rounded-full border-2 border-black ${
                    entry.isActive ? "bg-matcha-green text-black" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {entry.isActive ? "활성" : "비활성"}
                </button>
              </form>
              <Link
                href={`/admin/diary/${entry.id}`}
                className="text-xs font-black px-3 py-1.5 border-2 border-black rounded-xl bg-canvas-almond shadow-[2px_2px_0px_0px_#000]"
              >
                편집
              </Link>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/diary?page=${p}${q ? `&q=${q}` : ""}${level ? `&level=${level}` : ""}${category ? `&category=${category}` : ""}`}
                className={`w-8 h-8 flex items-center justify-center text-sm font-black border-2 border-black rounded-lg ${
                  p === page ? "bg-sakura-pink text-black" : "bg-paper-white"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
