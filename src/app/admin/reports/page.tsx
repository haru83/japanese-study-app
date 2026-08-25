import { prisma } from "@/lib/db";
import ReportCard from "./ReportCard";
import { formatDateKST } from "@/lib/dateUtils";

export default async function AdminReportsPage() {
  const pending = await prisma.report.findMany({
    where: { resolved: false },
    include: {
      reporter: { select: { id: true, name: true, email: true, _count: { select: { reports: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const enriched = await Promise.all(
    pending.map(async (r) => {
      let preview: string | null = null;
      let previewTitle: string | null = null;
      if (r.targetType === 'diary') {
        const d = await prisma.diary.findUnique({ where: { id: r.targetId }, select: { title: true, content: true } });
        previewTitle = d?.title ?? null;
        preview = d?.content?.slice(0, 200) ?? null;
      } else if (r.targetType === 'comment') {
        const c = await prisma.comment.findUnique({ where: { id: r.targetId }, select: { content: true } });
        preview = c?.content ?? null;
      } else if (r.targetType === 'post') {
        const p = await prisma.communityPost.findUnique({ where: { id: r.targetId }, select: { title: true, content: true } });
        previewTitle = p?.title ?? null;
        preview = p?.content?.slice(0, 200) ?? null;
      }
      return { ...r, preview, previewTitle };
    })
  );

  const resolved = await prisma.report.findMany({
    where: { resolved: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="min-h-screen p-4 md:p-6 bg-[#FFFDF9] max-w-md mx-auto text-black">
      <h1 className="text-2xl font-black mb-6 border-b-4 border-[#FFB6C1] inline-block pb-1">
        신고 관리
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-black mb-4">미처리 신고 ({pending.length}건)</h2>
        {enriched.length === 0 ? (
          <div className="bg-white border-2 border-black rounded-[15px] p-6 text-center font-bold shadow-[4px_4px_0px_0px_#000]">
            처리할 신고가 없습니다! ✨
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {enriched.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-black mb-4">처리 완료 (최근 20건)</h2>
        <div className="flex flex-col gap-3">
          {resolved.length === 0 ? (
            <p className="text-sm font-bold text-gray-500">완료된 신고가 없습니다.</p>
          ) : (
            resolved.map((r) => (
              <div key={r.id} className="bg-white border-2 border-black rounded-[15px] p-3 shadow-[2px_2px_0px_0px_#000]">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-black text-sm">[{r.targetType}] {r.id.slice(0,8)}...</span>
                  <span className="text-xs font-bold text-gray-500">{formatDateKST(r.createdAt)}</span>
                </div>
                <p className="text-sm font-bold mb-1">사유: {r.reason || "없음"}</p>
                {r.adminNote && (
                  <p className="text-xs bg-[#F5F5DC] border-2 border-black p-2 rounded-lg mt-2 font-bold">
                    메모: {r.adminNote}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
