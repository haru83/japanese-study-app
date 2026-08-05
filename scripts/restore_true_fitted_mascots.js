const sharp = require('sharp');
const fs = require('fs');

const mappings = [
  // ── Hachimaki (열정 머리띠) ──
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/poodle_fitted_hachimaki_1785909318059.jpg', output: 'public/mascot/poodle-hachimaki.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/beagle_fitted_hachimaki_1785909332341.jpg', output: 'public/mascot/beagle-hachimaki.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/pomeranian_fitted_hachimaki_1785909345095.jpg', output: 'public/mascot/pomeranian-hachimaki.png' },

  // ── Bandana (밴다나) ──
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/shiba_fitted_bandana_1785912378599.jpg', output: 'public/mascot/shiba-bandana.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/poodle_fitted_bandana_1785909923201.jpg', output: 'public/mascot/poodle-bandana.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/beagle_fitted_bandana_1785909936750.jpg', output: 'public/mascot/beagle-bandana.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/pomeranian_fitted_bandana_1785909952407.jpg', output: 'public/mascot/pomeranian-bandana.png' },

  // ── Baseball Cap (야구 모자 / 캡 모자) ──
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/shiba_fitted_hat_cap_1785933084705.jpg', output: 'public/mascot/shiba-hat-cap.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/poodle_fitted_hat_cap_1785933100642.jpg', output: 'public/mascot/poodle-hat-cap.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/beagle_fitted_hat_cap_1785933116890.jpg', output: 'public/mascot/beagle-hat-cap.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/pomeranian_fitted_hat_cap_1785933132770.jpg', output: 'public/mascot/pomeranian-hat-cap.png' },

  // ── Glasses (스마트 안경) ──
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/shiba_fitted_glasses_1785933157957.jpg', output: 'public/mascot/shiba-glasses.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/poodle_fitted_glasses_1785933173376.jpg', output: 'public/mascot/poodle-glasses.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/beagle_fitted_glasses_1785933193862.jpg', output: 'public/mascot/beagle-glasses.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/pomeranian_fitted_glasses_1785933212511.jpg', output: 'public/mascot/pomeranian-glasses.png' },

  // ── Crown (왕관) ──
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/shiba_fitted_crown_1785933241037.jpg', output: 'public/mascot/shiba-crown.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/poodle_fitted_crown_1785933257634.jpg', output: 'public/mascot/poodle-crown.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/beagle_fitted_crown_1785933275185.jpg', output: 'public/mascot/beagle-crown.png' },
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/pomeranian_fitted_crown_1785933294590.jpg', output: 'public/mascot/pomeranian-crown.png' },

  // ── Scarf (스카프) ──
  { input: '/Users/ai_tap_tap/.gemini/antigravity-cli/brain/8b6e3a73-6e4d-454b-84b7-4c9fdd1ec4f8/shiba_fitted_scarf_1785933327990.jpg', output: 'public/mascot/shiba-scarf.png' },
];

async function processChroma(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (g > 80 && g > r + 20 && g > b + 20) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toFile(outputPath);
  console.log('✓ Saved authentic AI-generated fitted mascot artwork to:', outputPath);
}

async function run() {
  console.log('🌸 Restoring authentic AI-generated pre-fitted mascot artwork PNGs...');
  for (const m of mappings) {
    if (fs.existsSync(m.input)) {
      await processChroma(m.input, m.output);
    }
  }
  console.log('🎉 Authentic AI mascot artwork restoration complete!');
}

run().catch(console.error);
