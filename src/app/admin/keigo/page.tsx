import Link from "next/link";
import { prisma } from "@/lib/db";
import { toggleKeigoLessonActive } from "@/actions/admin-content";

const CATEGORY_LABELS: Record<string, string> = {
  business: "비즈니스",
  hospitality: "서비스/접객",
  social: "사교",
};

const PAGE_SIZE = 30;

export default async function AdminKeigoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const { page: pageStr, q, category } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));

  const where = {
    ...(q ? { title: { contains: q } } : {}),
    ...(category && category !== "all" ? { category } : {}),
  };

  const [lessons, total] = await Promise.all([
    prisma.keigoLesson.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      select: { id: true, title: true, category: true, thumbnail: true, isActive: true, sortOrder: true },
    }),
    prisma.keigoLesson.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-type-black">경어 레슨 관리</h1>
            <p className="text-sm text-type-black/60 font-bold">총 {total}개</p>
          </div>
          <Link
            href="/admin/keigo/new"
            className="px-4 py-2 bg-grape-punch text-white font-black text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            + 신규
          </Link>
        </div>

        {/* Search & Filter */}
        <form className="flex gap-2 mt-3">
          <input
            name="q"
            defaultValue={q}
            placeholder="제목 검색..."
            className="flex-1 px-3 py-2 text-sm border-2 border-black rounded-xl bg-paper-white font-bold"
          />
          <select
            name="category"
            defaultValue={category ?? "all"}
            className="px-3 py-2 text-sm border-2 border-black rounded-xl bg-paper-white font-bold"
          >
            <option value="all">전체</option>
            <option value="business">비즈니스</option>
            <option value="hospitality">서비스/접객</option>
            <option value="social">사교</option>
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
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-paper-white rounded-[15px] px-4 py-3 border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-3"
          >
            <span className="text-2xl shrink-0">{lesson.thumbnail}</span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-type-black text-sm truncate">{lesson.title}</p>
              <p className="text-xs text-type-black/50 font-bold">
                {CATEGORY_LABELS[lesson.category]} · #{lesson.sortOrder + 1}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form action={toggleKeigoLessonActive.bind(null, lesson.id)}>
                <button
                  type="submit"
                  className={`text-xs font-black px-2 py-0.5 rounded-full border-2 border-black ${
                    lesson.isActive
                      ? "bg-matcha-green text-black"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {lesson.isActive ? "활성" : "비활성"}
                </button>
              </form>
              <Link
                href={`/admin/keigo/${lesson.id}`}
                className="text-xs font-black px-3 py-1.5 border-2 border-black rounded-xl bg-canvas-almond shadow-[2px_2px_0px_0px_#000]"
              >
                편집
              </Link>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/keigo?page=${p}${q ? `&q=${q}` : ""}${category ? `&category=${category}` : ""}`}
                className={`w-8 h-8 flex items-center justify-center text-sm font-black border-2 border-black rounded-lg ${
                  p === page ? "bg-grape-punch text-white" : "bg-paper-white"
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
