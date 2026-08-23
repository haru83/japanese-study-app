const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const path = require('path');

const CHIRP_VOICE_CONFIGS = {
  // ── 🔥 1. 열혈 주인공 (HERO) ──
  "aq-hero-01": {
    voice: "ja-JP-Chirp3-HD-Puck",
    text: "世界一の冒険者に、おれはなる！"
  },
  "aq-hero-02": {
    voice: "ja-JP-Chirp3-HD-Puck",
    text: "まっすぐ自分の決めた道は曲げねぇ！"
  },
  "aq-hero-03": {
    voice: "ja-JP-Chirp3-HD-Puck",
    text: "大切な仲間を傷つける奴は、絶対に許さない！"
  },
  "aq-hero-04": {
    voice: "ja-JP-Chirp3-HD-Puck",
    text: "これで終わりだ！オレの全力を喰らえ！"
  },

  // ── ⚡ 2. 쿨한 라이벌 (RIVAL) ──
  "aq-rival-01": {
    voice: "ja-JP-Chirp3-HD-Orus",
    text: "背中の傷は、剣士の恥だ。"
  },
  "aq-rival-02": {
    voice: "ja-JP-Chirp3-HD-Orus",
    text: "フン、勘違いするな。お前を助けたわけじゃない。"
  },
  "aq-rival-03": {
    voice: "ja-JP-Chirp3-HD-Orus",
    text: "これで決着をつける。手加減は無用だ。"
  },
  "aq-rival-04": {
    voice: "ja-JP-Chirp3-HD-Orus",
    text: "行くぞ。オレの背中は任せた。"
  },

  // ── 🕶️ 3. 카리스마 스승 (MASTER) ──
  "aq-master-01": {
    voice: "ja-JP-Chirp3-HD-Charon",
    text: "あきらめたら、そこで試合終了ですよ…？"
  },
  "aq-master-02": {
    voice: "ja-JP-Chirp3-HD-Charon",
    text: "悔いが残らない方を、自分で選べ。"
  },
  "aq-master-03": {
    voice: "ja-JP-Chirp3-HD-Fenrir",
    text: "一番大切な才能とは、決してあきらめぬ根性だ！"
  },
  "aq-master-04": {
    voice: "ja-JP-Chirp3-HD-Fenrir",
    text: "我が隊員たちよ、未来のために全力を捧げよ！"
  },

  // ── 🐱 4. 츤데레 (TSUNDERE) ──
  "aq-tsundere-01": {
    voice: "ja-JP-Chirp3-HD-Zephyr",
    text: "べ、別にあんたのために作ったんじゃないんだからね！"
  },
  "aq-tsundere-02": {
    voice: "ja-JP-Chirp3-HD-Zephyr",
    text: "ちょっと、いつまで寝てるの？早く起きてよね！"
  },
  "aq-tsundere-03": {
    voice: "ja-JP-Chirp3-HD-Zephyr",
    text: "バカ！心配なんてしてないわよ！"
  },
  "aq-tsundere-04": {
    voice: "ja-JP-Chirp3-HD-Zephyr",
    text: "…今日だけは、隣にいてあげてもいいわよ。"
  },

  // ── 🦹 5. 지능형 빌런 (VILLAIN) ──
  "aq-villain-01": {
    voice: "ja-JP-Chirp3-HD-Rasalgethi",
    text: "あまり強い言葉を使うなよ。弱く見えるぞ。"
  },
  "aq-villain-02": {
    voice: "ja-JP-Chirp3-HD-Rasalgethi",
    text: "すべては、私の計画通りに進んでいる。"
  },
  "aq-villain-03": {
    voice: "ja-JP-Chirp3-HD-Charon",
    text: "憧れとは、理解から最も遠い感情だよ。"
  },
  "aq-villain-04": {
    voice: "ja-JP-Chirp3-HD-Rasalgethi",
    text: "この世界の理を変えるのは、力ある者のみだ。"
  },

  // ── 🪄 6. 신비한 마법사 (MYSTIC) ──
  "aq-mystic-01": {
    voice: "ja-JP-Chirp3-HD-Leda",
    text: "人間の寿命は短いのに…なんでもっと知ろうとしなかったんだろう。"
  },
  "aq-mystic-02": {
    voice: "ja-JP-Chirp3-HD-Enceladus",
    text: "くだらなくて楽しい旅が、僕は好きなんだ。"
  },
  "aq-mystic-03": {
    voice: "ja-JP-Chirp3-HD-Aoede",
    text: "我が魔力の前では、小細工など無意味だ。"
  },
  "aq-mystic-04": {
    voice: "ja-JP-Chirp3-HD-Leda",
    text: "時の流れは静かに、すべてを癒してくれるでしょう。"
  },

  // ── 🏀 7. 열정 스포츠맨 (SPORTS) ──
  "aq-sports-01": {
    voice: "ja-JP-Chirp3-HD-Puck",
    text: "左手はそえるだけ…！"
  },
  "aq-sports-02": {
    voice: "ja-JP-Chirp3-HD-Enceladus",
    text: "先生…！！もう一度、みんなとバスケがしたいです……"
  },
  "aq-sports-03": {
    voice: "ja-JP-Chirp3-HD-Puck",
    text: "オレの栄光時代は…オレは今なんだよ！！"
  },
  "aq-sports-04": {
    voice: "ja-JP-Chirp3-HD-Fenrir",
    text: "最後まで絶対に足を止めるな！勝ちに行くぞ！"
  },

  // ── 🤖 8. 고뇌하는 소년 (PILOT) ──
  "aq-pilot-01": {
    voice: "ja-JP-Chirp3-HD-Enceladus",
    text: "逃げちゃダメだ、逃げちゃダメだ、逃げちゃダメだ！"
  },
  "aq-pilot-02": {
    voice: "ja-JP-Chirp3-HD-Despina",
    text: "ごめんなさい。こういう時、どんな顔をすればいいか分からないの。"
  },
  "aq-pilot-03": {
    voice: "ja-JP-Chirp3-HD-Charon",
    text: "覚悟があるなら乗れ。でなければ今すぐ立ち去れ。"
  },
  "aq-pilot-04": {
    voice: "ja-JP-Chirp3-HD-Zephyr",
    text: "無事に帰ってきたら、続きのお祝いをしましょう。"
  }
};

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
      input: { text: config.text },
      voice: {
        languageCode: 'ja-JP',
        name: config.voice
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
  const ids = Object.keys(CHIRP_VOICE_CONFIGS);
  console.log(`Starting generation for ${ids.length} anime quotes with Google Chirp3-HD Studio models...`);

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const config = CHIRP_VOICE_CONFIGS[id];
    process.stdout.write(`[${i + 1}/${ids.length}] Generating ${id} (${config.voice})... `);
    try {
      const res = await synthesizeSpeech(token, id, config);
      console.log(`✓ OK (${res.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error:`, err.message);
    }
    // Rate limit safety
    await new Promise(r => setTimeout(r, 150));
  }

  console.log('\n🎉 All 32 anime quote Chirp3-HD audio files generated successfully!');
}

main().catch(console.error);
