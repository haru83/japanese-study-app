// src/app/(app)/community/posts/[postId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCommunityPost } from "@/actions/communityPost";
import { PostDetailClient } from "@/components/community/PostDetailClient";

export default async function CommunityPostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const session = await getServerSession(authOptions);

  const post = await getCommunityPost(postId);
  if (!post) return notFound();

  const isAdmin = session?.user?.role === "admin";

  return (
    <main className="min-h-screen bg-sakura-blush">
      {/* 헤더 */}
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black mb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/community?tab=board"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all -ml-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="text-base font-black text-type-black">자유게시판 이야기 💬</span>
        </div>
      </div>

      <div className="px-5">
        <PostDetailClient
          post={post}
          currentUserId={session?.user?.id}
          isAdmin={isAdmin}
        />
      </div>
    </main>
  );
}
