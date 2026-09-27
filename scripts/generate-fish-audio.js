#!/usr/bin/env node
/**
 * Incremental Audio Pre-rendering Script using Fish Audio API (Free model: s2.1-pro-free)
 * 
 * Features:
 * - Scans anime quotes and keigo dialogues
 * - Skips already existing audio files (incremental resume)
 * - Automatically loads FISH_API_KEY from env or ~/.hermes/.env
 * - Respects Fair Use rate limits with safe throttling and exponential backoff
 * 
 * Usage:
 *   node scripts/generate-fish-audio.js --dry-run
 *   node scripts/generate-fish-audio.js --limit 5
 *   node scripts/generate-fish-audio.js --target keigo --lesson greeting-boss
 *   node scripts/generate-fish-audio.js --target all
 */

const fs = require('fs');
const path = require('path');

// 1. Resolve Fish Audio API Key
function getApiKey() {
  if (process.env.FISH_API_KEY) return process.env.FISH_API_KEY.trim();

  // Try local .env
  const localEnvPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(localEnvPath)) {
    const match = fs.readFileSync(localEnvPath, 'utf-8').match(/FISH_API_KEY=([^\r\n]+)/);
    if (match) return match[1].trim();
  }

  // Try ~/.hermes/.env
  const hermesEnvPath = path.join(process.env.HOME || '', '.hermes', '.env');
  if (fs.existsSync(hermesEnvPath)) {
    const match = fs.readFileSync(hermesEnvPath, 'utf-8').match(/FISH_API_KEY=([^\r\n]+)/);
    if (match) return match[1].trim();
  }

  return null;
}

// 2. Clean Japanese text (remove ruby brackets [漢字|かんじ] -> 漢字)
function cleanJapaneseText(text) {
  return text.replace(/\[([^|]+)\|[^\]]+\]/g, '$1').trim();
}

// 3. Extract Anime Quotes
function getAnimeQuotes() {
  const quotesFile = path.join(__dirname, '..', 'src', 'data', 'animeQuotes.ts');
  if (!fs.existsSync(quotesFile)) return [];

  const content = fs.readFileSync(quotesFile, 'utf-8');
  const regex = /id:\s*[\"'](aq-[^\"']+)[\"'][\s\S]*?quoteJa:\s*[\"']([^\"']+)[\"'][\s\S]*?gender:\s*[\"']([^\"']+)[\"']/g;
  const quotes = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    quotes.push({
      id: match[1],
      text: match[2],
      gender: match[3],
      targetDir: path.join(__dirname, '..', 'public', 'audio', 'anime-quotes'),
      filePath: path.join(__dirname, '..', 'public', 'audio', 'anime-quotes', `${match[1]}.mp3`),
      type: 'quote',
    });
  }
  return quotes;
}

// 4. Extract Keigo Dialogues
function getKeigoDialogues() {
  const keigoDir = path.join(__dirname, '..', 'src', 'data', 'keigo');
  if (!fs.existsSync(keigoDir)) return [];

  const files = fs.readdirSync(keigoDir).filter(f => f.endsWith('.ts'));
  const allDialogues = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(keigoDir, file), 'utf-8');
    const lessonRegex = /id:\s*[\"']([^\"']+)[\"'][\s\S]*?dialogue:\s*\[([\s\S]*?)\]/g;
    let match;
    while ((match = lessonRegex.exec(content)) !== null) {
      const lessonId = match[1];
      const dialogueBlock = match[2];
      const lineRegex = /speaker:\s*[\"']([^\"']+)[\"'][\s\S]*?text:\s*[\"']([^\"']+)[\"']/g;
      let lineMatch;
      let lineIndex = 0;
      while ((lineMatch = lineRegex.exec(dialogueBlock)) !== null) {
        const speaker = lineMatch[1];
        const text = lineMatch[2];
        const isFemale = speaker.includes("토끼") || speaker.includes("후배") || speaker.includes("여성");

        allDialogues.push({
          id: `${lessonId}_${lineIndex}`,
          lessonId,
          lineIndex,
          speaker,
          isFemale,
          text,
          targetDir: path.join(__dirname, '..', 'public', 'audio', 'keigo'),
          filePath: path.join(__dirname, '..', 'public', 'audio', 'keigo', `${lessonId}_${lineIndex}.mp3`),
          type: 'keigo',
        });
        lineIndex++;
      }
    }
  }
  return allDialogues;
}

// 5. Sleep helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 6. Synthesize audio via Fish Audio API
async function synthesizeAudio(text, apiKey, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const resp = await fetch('https://api.fish.audio/v1/tts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'model': 's2.1-pro-free',
        },
        body: JSON.stringify({
          text,
          format: 'mp3',
        }),
      });

      if (resp.status === 429) {
        console.warn(`    ⚠️ [429 Rate Limit] 요청 한도 초과 - ${attempt * 5}초 대기 후 재시도...`);
        await sleep(attempt * 5000);
        continue;
      }

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${errText}`);
      }

      const arrayBuffer = await resp.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`    ⚠️ 오류 발생 (${err.message}) - 재시도 중 (${attempt}/${retries})...`);
      await sleep(2000 * attempt);
    }
  }
  throw new Error('최대 재시도 횟수 초과');
}

// 7. Main Execution
async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isForce = args.includes('--force');

  let target = 'all';
  const targetIdx = args.indexOf('--target');
  if (targetIdx !== -1 && args[targetIdx + 1]) {
    target = args[targetIdx + 1];
  }

  let limit = Infinity;
  const limitIdx = args.indexOf('--limit');
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    limit = parseInt(args[limitIdx + 1], 10);
  }

  let lessonFilter = null;
  const lessonIdx = args.indexOf('--lesson');
  if (lessonIdx !== -1 && args[lessonIdx + 1]) {
    lessonFilter = args[lessonIdx + 1];
  }

  console.log('====================================================');
  console.log('🎙️ Fish Audio TTS 증분 오디오 렌더러');
  console.log(`   옵션: Target=${target}, Limit=${limit === Infinity ? '전체' : limit}, Force=${isForce}, DryRun=${isDryRun}`);
  if (lessonFilter) console.log(`   특정 레슨 필터: ${lessonFilter}`);
  console.log('====================================================\n');

  const apiKey = getApiKey();
  if (!apiKey && !isDryRun) {
    console.error('❌ 오류: FISH_API_KEY를 찾을 수 없습니다.');
    console.error('   ~/.hermes/.env 또는 .env 파일에 FISH_API_KEY를 설정하세요.');
    process.exit(1);
  }

  // Collect tasks
  let tasks = [];
  if (target === 'all' || target === 'quotes') {
    tasks.push(...getAnimeQuotes());
  }
  if (target === 'all' || target === 'keigo') {
    tasks.push(...getKeigoDialogues());
  }

  if (lessonFilter) {
    tasks = tasks.filter(t => t.lessonId === lessonFilter);
  }

  console.log(`📋 총 스캔된 대상: ${tasks.length}개 항목`);

  // Ensure directories
  fs.mkdirSync(path.join(__dirname, '..', 'public', 'audio', 'anime-quotes'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, '..', 'public', 'audio', 'keigo'), { recursive: true });

  let skippedCount = 0;
  let toGenerate = [];

  for (const task of tasks) {
    if (fs.existsSync(task.filePath) && !isForce) {
      skippedCount++;
    } else {
      toGenerate.push(task);
    }
  }

  console.log(`✅ 이미 존재하는 파일 (건너뜀): ${skippedCount}개`);
  console.log(`🚀 새로 생성해야 할 파일: ${toGenerate.length}개\n`);

  if (toGenerate.length === 0) {
    console.log('🎉 모든 오디오 파일이 이미 최신 상태로 생성되어 있습니다!');
    return;
  }

  if (toGenerate.length > limit) {
    console.log(`⚠️ --limit ${limit} 옵션에 따라 이번 실행에서는 ${limit}개만 생성합니다.\n`);
    toGenerate = toGenerate.slice(0, limit);
  }

  if (isDryRun) {
    console.log('🔍 [Dry-Run 모드] 생성 예정 목록 상위 5개:');
    toGenerate.slice(0, 5).forEach((t, i) => {
      console.log(`   ${i + 1}. [${t.type}] ${t.id} -> ${t.text}`);
    });
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < toGenerate.length; i++) {
    const item = toGenerate[i];
    const cleanText = cleanJapaneseText(item.text);

    // Apply natural emotion/tone tags
    let promptText = cleanText;
    if (item.type === 'keigo') {
      promptText = item.isFemale ? `[polite] ${cleanText}` : `[calm] ${cleanText}`;
    }

    process.stdout.write(`[${i + 1}/${toGenerate.length}] (${item.type}) ${item.id} 생성 중... `);

    try {
      const audioBuffer = await synthesizeAudio(promptText, apiKey);
      fs.writeFileSync(item.filePath, audioBuffer);
      console.log(`완료 (${audioBuffer.byteLength} bytes)`);
      successCount++;
    } catch (err) {
      console.log(`❌ 실패: ${err.message}`);
      failCount++;
    }

    // Gentle 1s throttle between requests
    if (i < toGenerate.length - 1) {
      await sleep(1000);
    }
  }

  console.log('\n====================================================');
  console.log('🎉 배치 생성 완료 요약:');
  console.log(`   - 이미 존재하여 건너뜀: ${skippedCount}개`);
  console.log(`   - 성공적으로 생성됨: ${successCount}개`);
  if (failCount > 0) console.log(`   - 생성 실패: ${failCount}개`);
  console.log('====================================================');
}

main().catch((err) => {
  console.error('치명적 오류:', err);
  process.exit(1);
});
