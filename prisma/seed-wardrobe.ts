import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WARDROBE_SEED = [
  { id: "default", name: "기본", icon: "🐕", stampCost: 0, requiredLevel: 1, imageUrl: "", isRare: false },
  { id: "hat-cap", name: "야구 모자", icon: "🧢", stampCost: 5, requiredLevel: 1, imageUrl: "", isRare: false },
  { id: "hat-santa", name: "산타 모자", icon: "🎅", stampCost: 8, requiredLevel: 2, imageUrl: "", isRare: false },
  { id: "scarf", name: "목도리", icon: "🧣", stampCost: 6, requiredLevel: 2, imageUrl: "", isRare: false },
  { id: "glasses", name: "선글라스", icon: "😎", stampCost: 10, requiredLevel: 3, imageUrl: "", isRare: false },
  { id: "crown", name: "왕관", icon: "👑", stampCost: 20, requiredLevel: 5, imageUrl: "", isRare: true },
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
