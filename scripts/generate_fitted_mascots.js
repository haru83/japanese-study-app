const sharp = require('sharp');
const fs = require('fs');

const breeds = ['shiba', 'poodle', 'beagle', 'pomeranian'];
const baseImages = {
  shiba: 'public/mascot/shiba-base.webp',
  poodle: 'public/mascot/poodle-base.png',
  beagle: 'public/mascot/beagle-base.png',
  pomeranian: 'public/mascot/pomeranian-base.png',
};

const items = [
  'hat-cap', 'hat-santa', 'hachimaki', 'bandana', 'crown', 'wizard-hat',
  'pink-ribbon', 'headphones', 'horns', 'halo', 'flower-crown',
  'glasses', 'mask-fox', 'mask-oni', 'earring-gold', 'stud-ear',
  'scarf', 'muffler', 'bow-tie', 'necklace-pearl',
  'hakama', 'armor-samurai', 'cape', 'ninja', 'hawaiian-shirt', 'randoseru'
];

async function run() {
  console.log('🌸 Generating pre-fitted mascot artwork assets for all breeds & items...');

  let count = 0;
  for (const breed of breeds) {
    const basePath = baseImages[breed];
    if (!fs.existsSync(basePath)) continue;

    for (const item of items) {
      const overlayPath = `public/mascot/overlay-${item}.webp`;
      const outputPath = `public/mascot/${breed}-${item}.png`;

      if (fs.existsSync(overlayPath)) {
        try {
          const overlayBuffer = await sharp(overlayPath).resize(1024, 1024).toBuffer();
          await sharp(basePath)
            .resize(1024, 1024)
            .composite([{ input: overlayBuffer, top: 0, left: 0 }])
            .png()
            .toFile(outputPath);
          count++;
          console.log(`✓ Created pre-fitted asset: ${outputPath}`);
        } catch (e) {
          console.error(`Failed ${breed}-${item}:`, e);
        }
      }
    }
  }
  console.log(`🎉 All ${count} pre-fitted mascot assets generated successfully!`);
}

run().catch(console.error);
