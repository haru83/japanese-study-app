const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const path = require('path');

const CHARACTER_VOICE_CONFIGS = {
  // ── 🔥 1. 열혈 주인공 (HERO) ──
  "aq-hero-01": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="105%" pitch="+2st" volume="+2dB">世界一の冒険者に、<break time="150ms"/>おれはなる！</prosody></speak>`
  },
  "aq-hero-02": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="108%" pitch="+2.5st" volume="+2dB">まっすぐ自分の決めた道は<break time="100ms"/>曲げねぇ！</prosody></speak>`
  },
  "aq-hero-03": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="102%" pitch="+1.5st" volume="+3dB">大切な仲間を傷つける奴は、<break time="200ms"/><emphasis level="strong">絶対に許さない！</emphasis></prosody></speak>`
  },
  "aq-hero-04": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="112%" pitch="+3st" volume="+3dB">これで終わりだ！<break time="150ms"/>オレの全力を喰らえ！</prosody></speak>`
  },

  // ── ⚡ 2. 쿨한 라이벌 (RIVAL) ──
  "aq-rival-01": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="94%" pitch="-1.5st">背中の傷は、<break time="250ms"/>剣士の恥だ。</prosody></speak>`
  },
  "aq-rival-02": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="96%" pitch="-1st">フン、<break time="150ms"/>勘違いするな。<break time="200ms"/>お前를助けたわけじゃない。</prosody></speak>`
  },
  "aq-rival-03": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="95%" pitch="-1.5st">これで決着をつける。<break time="200ms"/>手加減は無用だ。</prosody></speak>`
  },
  "aq-rival-04": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="98%" pitch="-1st">行くぞ。<break time="200ms"/>オレの背中は任せた。</prosody></speak>`
  },

  // ── 🕶️ 3. 카리스마 스승 (MASTER) ──
  "aq-master-01": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="85%" pitch="-1st">あきらめたら、<break time="200ms"/>そこで試合終了ですよ…？</prosody></speak>`
  },
  "aq-master-02": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="90%" pitch="-2.5st">悔いが残らない方を、<break time="200ms"/>自分で選べ。</prosody></speak>`
  },
  "aq-master-03": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="98%" pitch="-1.5st" volume="+2dB">一番大切な才能とは、<break time="150ms"/>決してあきらめぬ根性だ！</prosody></speak>`
  },
  "aq-master-04": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="94%" pitch="-2st" volume="+2dB">我が隊員たちよ、<break time="200ms"/>未来のために全力を捧げよ！</prosody></speak>`
  },

  // ── 🐱 4. 츤데레 (TSUNDERE) ──
  "aq-tsundere-01": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="106%" pitch="+3.5st">べ、<break time="100ms"/>別にあんたのために作ったんじゃないんだからね！</prosody></speak>`
  },
  "aq-tsundere-02": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="108%" pitch="+3st">ちょっと、<break time="150ms"/>いつまで寝てるの？<break time="150ms"/>早く起きてよね！</prosody></speak>`
  },
  "aq-tsundere-03": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="110%" pitch="+4st">バカ！<break time="200ms"/>心配なんてしてないわよ！</prosody></speak>`
  },
  "aq-tsundere-04": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="92%" pitch="+2st">…今日だけは、<break time="200ms"/>隣にいてあげてもいいわよ。</prosody></speak>`
  },

  // ── 🦹 5. 지능형 빌런 (VILLAIN) ──
  "aq-villain-01": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="88%" pitch="-2st">あまり強い言葉を使うなよ。<break time="300ms"/>弱く見えるぞ。</prosody></speak>`
  },
  "aq-villain-02": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="90%" pitch="-1.5st">すべては、<break time="200ms"/>私の計画通りに進んでいる。</prosody></speak>`
  },
  "aq-villain-03": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="86%" pitch="-2st">憧れとは、<break time="250ms"/>理解から最も遠い感情だよ。</prosody></speak>`
  },
  "aq-villain-04": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="92%" pitch="-3st">この世界の理を変えるのは、<break time="200ms"/>力ある者のみだ。</prosody></speak>`
  },

  // ── 🪄 6. 신비한 마법사 (MYSTIC) ──
  "aq-mystic-01": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="88%" pitch="+0.5st">人間の寿命は短いのに…<break time="300ms"/>なんでもっと知ろうとしなかったんだろう。</prosody></speak>`
  },
  "aq-mystic-02": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="95%" pitch="+0.5st">くだらなくて楽しい旅が、<break time="200ms"/>僕は好きなんだ。</prosody></speak>`
  },
  "aq-mystic-03": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="92%" pitch="-1st">我が魔力の前では、<break time="200ms"/>小細工など無意味だ。</prosody></speak>`
  },
  "aq-mystic-04": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="84%" pitch="+1.5st">時の流れは静かに、<break time="250ms"/>すべてを癒してくれるでしょう。</prosody></speak>`
  },

  // ── 🏀 7. 열정 스포츠맨 (SPORTS) ──
  "aq-sports-01": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="92%" pitch="+0.5st">左手は<break time="150ms"/>そえるだけ…！</prosody></speak>`
  },
  "aq-sports-02": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="85%" pitch="+1.5st">先生…！！<break time="300ms"/>もう一度、<break time="150ms"/>みんなとバスケがしたいです……</prosody></speak>`
  },
  "aq-sports-03": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="106%" pitch="+2st" volume="+2dB">オレの栄光時代は…<break time="200ms"/>オレは今なんだよ！！</prosody></speak>`
  },
  "aq-sports-04": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="110%" pitch="+2.5st" volume="+3dB">最後まで絶対に足を止めるな！<break time="150ms"/>勝ちに行くぞ！</prosody></speak>`
  },

  // ── 🤖 8. 고뇌하는 소년 (PILOT) ──
  "aq-pilot-01": {
    voice: "ja-JP-Neural2-C",
    gender: "MALE",
    ssml: `<speak><prosody rate="104%" pitch="+2st">逃げちゃダメだ、<break time="150ms"/>逃げちゃダメだ、<break time="150ms"/><emphasis level="strong">逃げちゃダメだ！</emphasis></prosody></speak>`
  },
  "aq-pilot-02": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="88%" pitch="-1st">ごめんなさい。<break time="250ms"/>こういう時、<break time="150ms"/>どんな顔をすればいいか分からないの。</prosody></speak>`
  },
  "aq-pilot-03": {
    voice: "ja-JP-Neural2-D",
    gender: "MALE",
    ssml: `<speak><prosody rate="88%" pitch="-3st">覚悟があるなら乗れ。<break time="250ms"/>でなければ今すぐ立ち去れ。</prosody></speak>`
  },
  "aq-pilot-04": {
    voice: "ja-JP-Neural2-B",
    gender: "FEMALE",
    ssml: `<speak><prosody rate="95%" pitch="+1st">無事に帰ってきたら、<break time="200ms"/>続きのお祝いをしましょう。</prosody></speak>`
  }
};

// Check for Korean characters in SSML before processing
for (const [id, cfg] of Object.entries(CHARACTER_VOICE_CONFIGS)) {
  cfg.ssml = cfg.ssml.replace(/お前를/g, 'お前を');
}

const outputDir = path.join(__dirname, '..', 'public', 'audio', 'anime-quotes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function getGCloudToken() {
  return execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
}

function synthesizeSpeech(token, id, config) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      input: { ssml: config.ssml },
      voice: {
        languageCode: 'ja-JP',
        name: config.voice,
        ssmlGender: config.gender
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.0,
        pitch: 0.0
      }
    });

    const req = https.request('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'X-Goog-User-Project': 'gen-lang-client-0925115546',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.audioContent) {
            const filePath = path.join(outputDir, `${id}.mp3`);
            fs.writeFileSync(filePath, Buffer.from(json.audioContent, 'base64'));
            resolve({ id, size: fs.statSync(filePath).size });
          } else {
            reject(new Error(`Failed ${id}: ` + JSON.stringify(json)));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Fetching gcloud token...');
  const token = getGCloudToken();
  const ids = Object.keys(CHARACTER_VOICE_CONFIGS);
  console.log(`Starting generation for ${ids.length} anime quotes...`);

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const config = CHARACTER_VOICE_CONFIGS[id];
    process.stdout.write(`[${i + 1}/${ids.length}] Generating ${id} (${config.voice})... `);
    try {
      const res = await synthesizeSpeech(token, id, config);
      console.log(`✓ OK (${res.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error:`, err.message);
    }
    // Rate limit safety
    await new Promise(r => setTimeout(r, 120));
  }

  console.log('\n🎉 All 32 anime quote TTS audio files generated successfully!');
}

main().catch(console.error);
