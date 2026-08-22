import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { toggleUserDisabled, updateUserName, updateUserRole } from "@/actions/admin";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const { type = "all" } = await searchParams;

  const [totalCount, botCount, realCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isBot: true } }),
    prisma.user.count({ where: { isBot: false } }),
  ]);

  const whereClause: Record<string, unknown> = {};
  if (type === "bot") whereClause.isBot = true;
  if (type === "real") whereClause.isBot = false;

  const users = await prisma.user.findMany({
    where: whereClause,
    include: { progress: true, _count: { select: { diaries: true, communityPosts: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-canvas-almond py-8 px-4 font-sans text-type-black">
      <div className="max-w-md mx-auto space-y-5">
        <div className="bg-sakura-pink border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5">
          <h1 className="text-2xl font-black mb-1">사용자 관리</h1>
          <p className="text-xs font-bold text-type-black/80">
            총 {totalCount}명 (실제: {realCount}명 / AI 가상: {botCount}명)
          </p>

          {/* 필터 탭 */}
          <div className="flex gap-1.5 mt-3">
            <Link
              href="/admin/users"
              className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-black transition-all ${
                type === "all" ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]" : "bg-white text-type-black"
              }`}
            >
              전체 ({totalCount})
            </Link>
            <Link
              href="/admin/users?type=real"
              className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-black transition-all ${
                type === "real" ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]" : "bg-white text-type-black"
              }`}
            >
              👤 일반 ({realCount})
            </Link>
            <Link
              href="/admin/users?type=bot"
              className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-black transition-all ${
                type === "bot" ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]" : "bg-white text-type-black"
              }`}
            >
              🤖 AI 가상 ({botCount})
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {users.map((user) => {
            const handleToggle = async () => {
              "use server";
              await toggleUserDisabled(user.id);
            };
            const handleNameUpdate = async (formData: FormData) => {
              "use server";
              const name = formData.get("name") as string;
              if (name) await updateUserName(user.id, name);
            };
            const handleRoleUpdate = async (formData: FormData) => {
              "use server";
              const role = formData.get("role") as "user" | "admin";
              if (role) await updateUserRole(user.id, role);
            };

            return (
              <details
                key={user.id}
                className={`group bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] overflow-hidden ${
                  user.disabled ? "opacity-50" : ""
                }`}
              >
                <summary className="p-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-base">
                        {user.name ?? "이름 없음"}
                      </span>
                      {user.isBot && (
                        <span className="text-[10px] bg-purple-100 text-purple-900 font-black px-2 py-0.5 rounded-full border border-black shrink-0">
                          🤖 AI
                        </span>
                      )}
                      {user.disabled && (
                        <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-black shrink-0">
                          [정지됨]
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border border-black font-bold shrink-0 ${
                          user.role === "admin"
                            ? "bg-amber-200"
                            : "bg-blue-100 text-blue-900"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">{user.email}</span>
                    <div className="flex gap-2 text-xs font-bold mt-1 text-type-black/70 flex-wrap">
                      <span>Lv.{user.progress?.level ?? 1}</span>
                      <span>XP {user.progress?.xp ?? 0}</span>
                      <span>일기 {user._count.diaries}개</span>
                      <span>게시글 {user._count.communityPosts}개</span>
                    </div>
                  </div>
                  <div className="font-bold text-xl group-open:rotate-180 transition-transform">
                    ▼
                  </div>
                </summary>
                
                <div className="p-4 border-t-2 border-black bg-gray-50 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">상태 관리</span>
                    <form action={handleToggle}>
                      <button
                        type="submit"
                        className={`px-3 py-1 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-lg ${
                          user.disabled ? "bg-green-400" : "bg-red-400 text-white"
                        }`}
                      >
                        {user.disabled ? "계정 복구" : "계정 비활성화"}
                      </button>
                    </form>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-bold">이름 변경</span>
                    <form action={handleNameUpdate} className="flex gap-2">
                      <input
                        type="text"
                        name="name"
                        defaultValue={user.name ?? ""}
                        className="flex-1 px-3 py-1 border-2 border-black rounded-lg text-sm"
                        required
                        minLength={1}
                        maxLength={20}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-blue-300 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-lg"
                      >
                        저장
                      </button>
                    </form>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-bold">권한 변경</span>
                    <form action={handleRoleUpdate} className="flex gap-2">
                      <select
                        name="role"
                        defaultValue={user.role}
                        className="flex-1 px-3 py-1 border-2 border-black rounded-lg text-sm bg-white"
                      >
                        <option value="user">일반 사용자 (user)</option>
                        <option value="admin">관리자 (admin)</option>
                      </select>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-amber-300 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-lg"
                      >
                        변경
                      </button>
                    </form>
                  </div>

                  <div className="mt-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="block w-full text-center py-2 bg-sakura-pink text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-lg"
                    >
                      상세 보기
                    </Link>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
