import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    userCount,
    botUserCount,
    todayNewUsers,
    todayDiaries,
    publicDiaries,
    communityPostCount,
    keigoCount,
    totalComments,
    pendingReports,
    disabledUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isBot: true } }),
    prisma.user.count({ where: { createdAt: { gte: today }, isBot: false } }),
    prisma.diary.count({ where: { createdAt: { gte: today } } }),
    prisma.diary.count({ where: { isPublic: true } }),
    prisma.communityPost.count(),
    prisma.keigoLessonProgress.count({ where: { completed: true } }),
    prisma.comment.count(),
    prisma.report.count({ where: { resolved: false } }),
    prisma.user.count({ where: { disabled: true } }),
  ]);

  return (
    <div className="min-h-screen bg-canvas-almond">
      <div className="bg-paper-white px-5 pt-12 pb-5 border-b-2 border-black shadow-[0_4px_0_0_#000]">
        <h1 className="text-xl font-black text-black">
          관리자 대시보드
        </h1>
      </div>

      <div className="px-5 py-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "총 유저", value: `${userCount}명`, sub: `(AI ${botUserCount})`, icon: "👥", color: "bg-paper-white" },
            { label: "오늘 신규", value: `${todayNewUsers}명`, icon: "✨", color: "bg-paper-white" },
            { label: "정지 유저", value: `${disabledUsers}명`, icon: "🚫", color: "bg-paper-white" },
            { label: "공개 일기", value: `${publicDiaries}개`, icon: "📖", color: "bg-paper-white" },
            { label: "자유게시판", value: `${communityPostCount}개`, icon: "💬", color: "bg-paper-white" },
            { label: "오늘 일기", value: `${todayDiaries}개`, icon: "📝", color: "bg-paper-white" },
            { label: "경어 완료", value: `${keigoCount}개`, icon: "🎯", color: "bg-paper-white" },
            { label: "총 댓글", value: `${totalComments}개`, icon: "💭", color: "bg-paper-white" },
            { 
              label: "미확인 신고", 
              value: `${pendingReports}건`, 
              icon: pendingReports > 0 ? "⚠️" : "✅", 
              color: pendingReports > 0 ? "bg-red-400 text-white" : "bg-paper-white" 
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-4 flex flex-col items-center justify-center text-center gap-1 ${stat.color}`}
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className={`text-xl font-black leading-none my-1 ${stat.color.includes('bg-red-400') ? 'text-white' : 'text-black'}`}>{stat.value}</p>
              <p className={`text-[11px] font-bold break-keep ${stat.color.includes('bg-red-400') ? 'text-white' : 'text-black'}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* AI 자동 소통 테스트 버튼 */}
        <div className="mt-6 bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5">
          <h3 className="font-black text-sm text-type-black mb-1">🤖 AI 커뮤니티 활동 관리</h3>
          <p className="text-xs font-bold text-type-black/60 mb-3">
            클라우드 스케줄러(Cron) 외에 관리자가 직접 1회 즉시 실행해 테스트할 수 있습니다.
          </p>
          <form
            action={async () => {
              "use server";
              const { triggerManualAiActivity } = await import("@/actions/admin");
              await triggerManualAiActivity();
            }}
          >
            <button
              type="submit"
              className="w-full py-3 bg-purple-100 hover:bg-purple-200 text-purple-900 font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              ✨ AI 활동 1회 즉시 실행 (새 글 or 일기 + 댓글/좋아요)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
