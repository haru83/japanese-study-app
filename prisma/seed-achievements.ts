import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ACHIEVEMENTS = [
  // ── 학습 (learning) ──────────────────────────────────────
  { key: "first_lesson", nameKo: "첫 걸음", nameEn: "First Step", descriptionKo: "첫 번째 경어 레슨을 완료했어요", icon: "🐣", category: "learning", tier: "bronze", threshold: 1 },
  { key: "lesson_5", nameKo: "학습자", nameEn: "Learner", descriptionKo: "경어 레슨 5개를 완료했어요", icon: "📚", category: "learning", tier: "bronze", threshold: 5 },
  { key: "lesson_15", nameKo: "성실한 학습자", nameEn: "Diligent Learner", descriptionKo: "경어 레슨 15개를 완료했어요", icon: "🎓", category: "learning", tier: "silver", threshold: 15 },
  { key: "lesson_30", nameKo: "경어 마스터", nameEn: "Keigo Master", descriptionKo: "모든 경어 레슨을 완료했어요", icon: "🏆", category: "learning", tier: "gold", threshold: 30 },
  { key: "first_diary", nameKo: "일기 초보", nameEn: "Diary Beginner", descriptionKo: "첫 번째 일기를 작성했어요", icon: "📝", category: "learning", tier: "bronze", threshold: 1 },
  { key: "diary_10", nameKo: "일기 작성자", nameEn: "Diary Writer", descriptionKo: "일기를 10개 작성했어요", icon: "✍️", category: "learning", tier: "silver", threshold: 10 },
  { key: "diary_30", nameKo: "일기 마스터", nameEn: "Diary Master", descriptionKo: "일기를 30개 작성했어요", icon: "📖", category: "learning", tier: "gold", threshold: 30 },
  { key: "perfect_quiz", nameKo: "만점 왕", nameEn: "Perfect Score", descriptionKo: "퀴즈에서 만점을 받았어요", icon: "💯", category: "learning", tier: "bronze", threshold: 1 },
  { key: "perfect_quiz_5", nameKo: "연속 만점", nameEn: "Streak Scholar", descriptionKo: "퀴즈 만점을 5번 달성했어요", icon: "🌟", category: "learning", tier: "silver", threshold: 5 },

  // ── 스트릭 (streak) ──────────────────────────────────────
  { key: "streak_3", nameKo: "꾸준함 시작", nameEn: "Consistency Begins", descriptionKo: "3일 연속 학습했어요", icon: "🔥", category: "streak", tier: "bronze", threshold: 3 },
  { key: "streak_7", nameKo: "일주일 완주", nameEn: "Weekly Warrior", descriptionKo: "7일 연속 학습했어요", icon: "⚡", category: "streak", tier: "bronze", threshold: 7 },
  { key: "streak_14", nameKo: "2주 돌파", nameEn: "Two Week Triumph", descriptionKo: "14일 연속 학습했어요", icon: "💪", category: "streak", tier: "silver", threshold: 14 },
  { key: "streak_30", nameKo: "한 달 꾸준히", nameEn: "Monthly Master", descriptionKo: "30일 연속 학습했어요", icon: "🏅", category: "streak", tier: "gold", threshold: 30 },
  { key: "streak_100", nameKo: "백일의 기적", nameEn: "Hundred Day Miracle", descriptionKo: "100일 연속 학습했어요", icon: "👑", category: "streak", tier: "gold", threshold: 100 },

  // ── 소셜 (social) ───────────────────────────────────────
  { key: "first_public_diary", nameKo: "공유 시작", nameEn: "First Share", descriptionKo: "첫 공개 일기를 작성했어요", icon: "🌐", category: "social", tier: "bronze", threshold: 1 },
  { key: "public_diary_5", nameKo: "소셜 버터플라이", nameEn: "Social Butterfly", descriptionKo: "공개 일기를 5개 작성했어요", icon: "🦋", category: "social", tier: "silver", threshold: 5 },
  { key: "first_like", nameKo: "공감 시작", nameEn: "First Like", descriptionKo: "다른 사람의 일기에 첫 좋아요를 눌렀어요", icon: "❤️", category: "social", tier: "bronze", threshold: 1 },
  { key: "likes_given_10", nameKo: "응원자", nameEn: "Cheerleader", descriptionKo: "좋아요를 10번 눌렀어요", icon: "👏", category: "social", tier: "silver", threshold: 10 },
  { key: "likes_received_5", nameKo: "인기 작가", nameEn: "Popular Writer", descriptionKo: "일기에 좋아요를 5개 받았어요", icon: "💖", category: "social", tier: "silver", threshold: 5 },

  // ── 퀘스트 (quest) ───────────────────────────────────────
  { key: "first_quest", nameKo: "첫 퀘스트", nameEn: "First Quest", descriptionKo: "첫 번째 일일 퀘스트를 완료했어요", icon: "🎯", category: "quest", tier: "bronze", threshold: 1 },
  { key: "quest_10", nameKo: "퀘스트 루틴", nameEn: "Quest Routine", descriptionKo: "일일 퀘스트를 10번 완료했어요", icon: "📋", category: "quest", tier: "silver", threshold: 10 },
  { key: "quest_30", nameKo: "퀘스트 챔피언", nameEn: "Quest Champion", descriptionKo: "일일 퀘스트를 30번 완료했어요", icon: "🏅", category: "quest", tier: "gold", threshold: 30 },
  { key: "quest_all_daily", nameKo: "하루 완주", nameEn: "Daily Completionist", descriptionKo: "하루에 모든 일일 퀘스트를 완료했어요", icon: "✨", category: "quest", tier: "silver", threshold: 1 },

  // ── 마스터리 (mastery) ───────────────────────────────────
  { key: "vocab_10", nameKo: "어휘 수집가", nameEn: "Vocab Collector", descriptionKo: "복습 단어 10개를 등록했어요", icon: "🔤", category: "mastery", tier: "bronze", threshold: 10 },
  { key: "vocab_50", nameKo: "어휘 사전", nameEn: "Vocab Dictionary", descriptionKo: "복습 단어 50개를 등록했어요", icon: "📕", category: "mastery", tier: "silver", threshold: 50 },
  { key: "vocab_200", nameKo: "어휘 백과사전", nameEn: "Vocab Encyclopedia", descriptionKo: "복습 단어 200개를 등록했어요", icon: "📚", category: "mastery", tier: "gold", threshold: 200 },
  { key: "review_50", nameKo: "복습 시작", nameEn: "Review Starter", descriptionKo: "복습을 50번 완료했어요", icon: "🔄", category: "mastery", tier: "bronze", threshold: 50 },
  { key: "review_200", nameKo: "복습 달인", nameEn: "Review Expert", descriptionKo: "복습을 200번 완료했어요", icon: "🧠", category: "mastery", tier: "silver", threshold: 200 },
  { key: "review_500", nameKo: "복습 마스터", nameEn: "Review Master", descriptionKo: "복습을 500번 완료했어요", icon: "🧙", category: "mastery", tier: "gold", threshold: 500 },
  { key: "level_3", nameKo: "중급 달성", nameEn: "Intermediate", descriptionKo: "레벨 3을 달성했어요", icon: "⬆️", category: "mastery", tier: "silver", threshold: 3 },
  { key: "level_6", nameKo: "최고 레벨", nameEn: "Max Level", descriptionKo: "최고 레벨 6을 달성했어요", icon: "👑", category: "mastery", tier: "gold", threshold: 6 },
];

async function main() {
  console.log("🏆 시딩 업적 데이터...");

  for (const achievement of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: {
        nameKo: achievement.nameKo,
        nameEn: achievement.nameEn,
        descriptionKo: achievement.descriptionKo,
        icon: achievement.icon,
        category: achievement.category,
        tier: achievement.tier,
        threshold: achievement.threshold,
      },
      create: achievement,
    });
  }

  const count = await prisma.achievement.count();
  console.log(`✓ Achievement: ${count}개 시딩 완료`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());