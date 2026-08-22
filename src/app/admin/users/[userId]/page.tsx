import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { toggleUserDisabled, updateUserName, updateUserRole } from "@/actions/admin";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const resolvedParams = await params;
  const userId = resolvedParams.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      progress: true,
      diaries: {
        where: { isPublic: true },
        select: { id: true, title: true, createdAt: true, _count: { select: { likes: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      communityPosts: {
        select: { id: true, title: true, category: true, createdAt: true, _count: { select: { likes: true, comments: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      reports: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      comments: {
        include: { diary: { select: { id: true, title: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!user) {
    notFound();
  }

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
    <div className="min-h-screen bg-canvas-almond py-8 px-4 font-sans text-type-black">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/users"
            className="px-4 py-2 bg-paper-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            ← 뒤로
          </Link>
          <h1 className="text-2xl font-black">유저 상세</h1>
        </div>

        {/* 1. 유저 기본 정보 카드 */}
        <div className={`bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5 space-y-4 ${user.disabled ? 'opacity-50' : ''}`}>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xl font-bold">{user.name ?? "이름 없음"}</span>
              {user.isBot && (
                <span className="text-xs bg-purple-100 text-purple-900 font-black px-2 py-0.5 rounded-full border border-black">
                  🤖 AI 가상 유저
                </span>
              )}
              {user.disabled && (
                <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-1 rounded-full border border-black">
                  [정지됨]
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full border border-black font-bold ${user.role === 'admin' ? 'bg-amber-200' : 'bg-blue-200'}`}>
                {user.role}
              </span>
            </div>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm font-bold mt-1">가입일: {user.createdAt.toLocaleDateString()}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm font-bold bg-sakura-pink p-3 border-2 border-black rounded-xl">
            <span>Lv.{user.progress?.level ?? 1}</span>
            <span>XP {user.progress?.xp ?? 0}</span>
            <span>스트릭 {user.progress?.streakDays ?? 0}일</span>
            <span>일기 {user.diaries.length}개</span>
            <span>게시글 {user.communityPosts.length}개</span>
          </div>

          <div className="space-y-3 pt-3 border-t-2 border-black border-dashed">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">상태 관리</span>
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

            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">이름 변경</span>
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

            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">권한 변경</span>
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
          </div>
        </div>

        {/* 2. 공개 일기 목록 */}
        <div className="bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5">
          <h2 className="text-lg font-black mb-3">공개 일기 (최근 10개)</h2>
          {user.diaries.length === 0 ? (
            <p className="text-sm text-gray-500 font-bold">공개된 일기가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {user.diaries.map(diary => (
                <Link
                  href={`/community/${diary.id}`}
                  key={diary.id}
                  className="block p-3 bg-gray-50 border-2 border-black rounded-xl hover:bg-sakura-pink transition-colors"
                >
                  <p className="font-bold text-sm truncate">{diary.title}</p>
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-600 font-bold">
                    <span>{diary.createdAt.toLocaleDateString()}</span>
                    <span>❤️ {diary._count.likes}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 2-1. 자유게시판 작성 글 목록 */}
        <div className="bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5">
          <h2 className="text-lg font-black mb-3">자유게시판 작성 글 (최근 10개)</h2>
          {user.communityPosts.length === 0 ? (
            <p className="text-sm text-gray-500 font-bold">작성한 게시글이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {user.communityPosts.map(post => (
                <Link
                  href={`/community/posts/${post.id}`}
                  key={post.id}
                  className="block p-3 bg-gray-50 border-2 border-black rounded-xl hover:bg-sakura-pink transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm truncate">{post.title}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-canvas-almond border border-black rounded-full shrink-0">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600 font-bold">
                    <span>{post.createdAt.toLocaleDateString()}</span>
                    <span>❤️ {post._count.likes} · 💬 {post._count.comments}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 3. 신고 내역 */}
        <div className="bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5">
          <h2 className="text-lg font-black mb-3">받은 신고 내역 (최근 10개)</h2>
          {user.reports.length === 0 ? (
            <p className="text-sm text-gray-500 font-bold">신고 내역이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {user.reports.map(report => (
                <div key={report.id} className="p-3 bg-gray-50 border-2 border-black rounded-xl text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold px-2 py-0.5 bg-red-100 border border-black rounded-md text-xs">
                      {report.targetType}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      {report.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-bold mb-1">{report.reason}</p>
                  <p className={`text-xs font-bold ${report.resolved ? 'text-green-600' : 'text-red-500'}`}>
                    {report.resolved ? '처리 완료' : '미처리'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. 작성 댓글 목록 */}
        <div className="bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] p-5">
          <h2 className="text-lg font-black mb-3">작성한 댓글 (최근 10개)</h2>
          {user.comments.length === 0 ? (
            <p className="text-sm text-gray-500 font-bold">작성한 댓글이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {user.comments.map(comment => (
                <div key={comment.id} className="p-3 bg-gray-50 border-2 border-black rounded-xl text-sm">
                  <p className="font-bold mb-2 break-words">{comment.content}</p>
                  <div className="text-xs font-bold text-gray-600 bg-white p-2 border border-black rounded-lg">
                    <span>원문: </span>
                    <Link href={`/community/${comment.diary.id}`} className="text-blue-600 hover:underline">
                      {comment.diary.title}
                    </Link>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    {comment.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
