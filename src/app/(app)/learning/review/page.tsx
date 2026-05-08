// src/app/(app)/learning/review/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getReviewItems, getDistractors } from "@/actions/review";
import { ReviewSession } from "./ReviewSession";

export default async function ReviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const items = await getReviewItems();

  const [totalCount, masteredCount] = await Promise.all([
    prisma.vocabReview.count({ where: { userId } }),
    prisma.vocabReview.count({ where: { userId, tier: 4 } }),
  ]);

  const distractorPool: Record<string, string[]> = {};
  await Promise.all(
    items.map(async (item) => {
      distractorPool[item.id] = await getDistractors(userId, item.word, 3);
    })
  );

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-4">
        <h1 className="text-xl font-black text-type-black">단어 복습 📚</h1>
        <div className="flex gap-6 mt-2">
          <div className="text-center">
            <p className="text-lg font-black text-type-black">{items.length}</p>
            <p className="text-[10px] font-bold text-type-black/60">오늘 복습</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-type-black">{totalCount}</p>
            <p className="text-[10px] font-bold text-type-black/60">전체 단어</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-type-black">{masteredCount}</p>
            <p className="text-[10px] font-bold text-type-black/60">마스터</p>
          </div>
        </div>
      </div>

      <ReviewSession items={items} distractorPool={distractorPool} />
    </div>
  );
}
