// src/app/admin/reports/page.tsx
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function resolveReport(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.report.update({ where: { id }, data: { resolved: true } });
  revalidatePath("/admin/reports");
}

async function deleteTarget(formData: FormData) {
  "use server";
  const targetType = formData.get("targetType") as string;
  const targetId = formData.get("targetId") as string;
  const id = formData.get("id") as string;

  if (targetType === "diary") {
    await prisma.diary.delete({ where: { id: targetId } });
  } else if (targetType === "comment") {
    await prisma.comment.delete({ where: { id: targetId } });
  }

  await prisma.report.update({ where: { id }, data: { resolved: true } });
  revalidatePath("/admin/reports");
}

export default async function AdminReportsPage() {
  const pending = await prisma.report.findMany({
    where: { resolved: false },
    include: { reporter: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const resolved = await prisma.report.findMany({
    where: { resolved: true },
    include: { reporter: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="p-6 max-w-4xl">
      <h1 className="text-2xl font-black mb-6">신고 관리</h1>

      <section className="mb-10">
        <h2 className="text-lg font-black mb-3">
          미처리 신고 ({pending.length}건)
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-gray-500">처리할 신고가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((r) => (
              <div
                key={r.id}
                className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_#000]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black">
                      [{r.targetType}] {r.targetId}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      신고자: {r.reporter.name ?? r.reporter.email} ·{" "}
                      {new Date(r.createdAt).toLocaleString("ko-KR")}
                    </p>
                    {r.reason && (
                      <p className="text-sm mt-1 font-bold">사유: {r.reason}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <form action={resolveReport}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        className="text-xs font-black px-3 py-1.5 rounded-lg border-2 border-black bg-gray-100"
                      >
                        무시
                      </button>
                    </form>
                    <form action={deleteTarget}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="targetType" value={r.targetType} />
                      <input type="hidden" name="targetId" value={r.targetId} />
                      <button
                        type="submit"
                        className="text-xs font-black px-3 py-1.5 rounded-lg border-2 border-black bg-red-100 text-red-700"
                      >
                        삭제 처리
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-black mb-3">
          처리 완료 (최근 {resolved.length}건)
        </h2>
        <div className="flex flex-col gap-2">
          {resolved.map((r) => (
            <div
              key={r.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-3"
            >
              <p className="text-xs text-gray-500">
                [{r.targetType}] {r.targetId} · 사유: {r.reason ?? "없음"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
