import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WARDROBE_SEED = [
 // ─── 기본 ───
 { id: "default", name: "기본", icon: "🐕", stampCost: 0, requiredLevel: 1, imageUrl: "", isRare: false },
 // ─── 기존 아이템 (5개) ───
 { id: "hat-cap", name: "야구 모자", icon: "🧢", stampCost: 5, requiredLevel: 1, imageUrl: "", isRare: false },
 { id: "hat-santa", name: "산타 모자", icon: "🎅", stampCost: 8, requiredLevel: 2, imageUrl: "", isRare: false },
 { id: "scarf", name: "목도리", icon: "🧣", stampCost: 6, requiredLevel: 2, imageUrl: "", isRare: false },
 { id: "glasses", name: "선글라스", icon: "😎", stampCost: 10, requiredLevel: 3, imageUrl: "", isRare: false },
 { id: "crown", name: "왕관", icon: "👑", stampCost: 20, requiredLevel: 5, imageUrl: "", isRare: true },
 // ─── 신규 아이템 (15개) ───
 { id: "hachimaki", name: "하치마키", icon: "🎌", stampCost: 7, requiredLevel: 2, imageUrl: "", isRare: false },
 { id: "horns", name: "악마 뿔", icon: "😈", stampCost: 12, requiredLevel: 3, imageUrl: "", isRare: false },
 { id: "halo", name: "천사 후광", icon: "😇", stampCost: 15, requiredLevel: 4, imageUrl: "", isRare: false },
 { id: "bow-tie", name: "나비 넥타이", icon: "🎀", stampCost: 5, requiredLevel: 1, imageUrl: "", isRare: false },
 { id: "necklace-pearl", name: "진주 목걸이", icon: "📿", stampCost: 14, requiredLevel: 3, imageUrl: "", isRare: false },
 { id: "mask-fox", name: "여우 가면", icon: "🦊", stampCost: 18, requiredLevel: 4, imageUrl: "", isRare: true },
 { id: "mask-oni", name: "오니 가면", icon: "👹", stampCost: 18, requiredLevel: 4, imageUrl: "", isRare: true },
 { id: "earring-gold", name: "금 귀걸이", icon: "✨", stampCost: 10, requiredLevel: 2, imageUrl: "", isRare: false },
 { id: "flower-crown", name: "꽃관", icon: "🌸", stampCost: 16, requiredLevel: 3, imageUrl: "", isRare: true },
 { id: "muffler", name: "체스 머플러", icon: "🧶", stampCost: 8, requiredLevel: 2, imageUrl: "", isRare: false },
 { id: "hakama", name: "하카마", icon: "👘", stampCost: 20, requiredLevel: 5, imageUrl: "", isRare: true },
 { id: "armor-samurai", name: "사무라이 갑옷", icon: "⚔️", stampCost: 25, requiredLevel: 6, imageUrl: "", isRare: true },
 { id: "cape", name: "영웅 망토", icon: "🦸", stampCost: 15, requiredLevel: 4, imageUrl: "", isRare: false },
 { id: "bandana", name: "밴다나", icon: "💃", stampCost: 4, requiredLevel: 1, imageUrl: "", isRare: false },
 { id: "stud-ear", name: "다이아 귀걸이", icon: "💎", stampCost: 22, requiredLevel: 5, imageUrl: "", isRare: true },
 ];

async function main() {
  for (const item of WARDROBE_SEED) {
    await prisma.wardrobeItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        icon: item.icon,
        stampCost: item.stampCost,
        requiredLevel: item.requiredLevel,
        imageUrl: item.imageUrl,
        isRare: item.isRare,
      },
      create: item,
    });
  }
  console.log(`Seeded ${WARDROBE_SEED.length} wardrobe items`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
