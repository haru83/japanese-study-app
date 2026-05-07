import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 데이터는 이미 DB에 마이그레이션 완료됨 (2025-05).
// 이후 콘텐츠 추가/수정은 어드민 UI (/admin/keigo, /admin/diary)에서 진행하세요.
async function main() {
  const [keigoCount, diaryCount] = await Promise.all([
    prisma.keigoLesson.count(),
    prisma.learningDiaryEntry.count(),
  ]);
  console.log(`✓ KeigoLesson: ${keigoCount}개, LearningDiaryEntry: ${diaryCount}개 (이미 시딩됨)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
