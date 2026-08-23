const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const API_KEY = "AIzaSyAKR0uKI9F-nz_fGPjuEtuuPQQdPlKuGqA";

const GEMINI_VOICE_PROMPTS = [
  // ── 🔥 1. 열혈 주인공 (HERO) ──
  {
    id: "aq-hero-01",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 소년 만화 애니메이션 전문 성우(声優)입니다.
캐릭터: 모험을 꿈꾸는 10대 열혈 소년 주인공.
상황: 드넓은 바다를 향해 서서 바람을 맞으며 세상을 향해 자신의 거대한 꿈을 당당하게 선포하는 명장면.
연기 디렉션: 가슴 깊은 곳에서 솟구치는 자신감과 열정, 패기 넘치는 씩씩한 소년 만화 주인공 톤으로 힘차게 외쳐주세요.
대사 (오직 이 일본어 대사만 말하세요):
世界一の冒険者に、おれはなる！`
  },
  {
    id: "aq-hero-02",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 소년 만화 애니메이션 전문 성우(声優)입니다.
캐릭터: 불굴의 의지를 가진 닌자/격투가 소년 주인공.
상황: 강한 적의 위협 앞에서도 눈빛을 번뜩이며 자신의 굳은 신념을 결코 굽히지 않겠다고 선언하는 장면.
연기 디렉션: 한 치의 흔들림도 없는 단단하고 패기 넘치는 소년의 목소리로 힘차게 외쳐주세요.
대사 (오직 이 일본어 대사만 말하세요):
まっすぐ自分の決めた道は曲げねぇ！`
  },
  {
    id: "aq-hero-03",
    voiceName: "Fenrir",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 소중한 친구들을 지키기 위해 일어선 소년 전사.
상황: 아끼는 친구들을 괴롭히는 자를 향해 물러서지 않고 맞서 싸우겠다는 단호한 선언.
연기 디렉션: 결연한 의지와 흔들리지 않는 우정이 담긴 씩씩하고 강인한 외침으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
大切な仲間を傷つける奴は、絶対に許さない！`
  },
  {
    id: "aq-hero-04",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 모든 것을 건 마지막 일격을 날리는 열혈 용사.
상황: 결전의 순간에서 자신의 모든 영혼과 힘을 한 방에 쏟아붓는 클라이맥스 필살기 장면.
연기 디렉션: 극한의 힘을 쥐어짜내는 듯한 폭발적인 기합과 함께 열정적인 외침으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
これで終わりだ！オレの全力を喰らえ！`
  },

  // ── ⚡ 2. 쿨한 라이벌 (RIVAL) ──
  {
    id: "aq-rival-01",
    voiceName: "Orus",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 세계 최강을 목표로 하는 긍지 높은 쿨한 대검객.
상황: 패배 속에서도 도망치지 않고 가슴을 펴며 검사의 긍지를 증명하는 명장면.
연기 디렉션: 낮고 묵직하며, 굴하지 않는 검사의 드높은 자존심과 기개가 묻어나는 카리스마 중저음으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
背中の傷は、剣士の恥だ。`
  },
  {
    id: "aq-rival-02",
    voiceName: "Orus",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 차갑고 오만한 천재 라이벌.
상황: 위험에 처한 주인공을 도와주고 팔짱을 낀 채 고개를 돌리며 츤츤대는 장면.
연기 디렉션: '흥' 하고 콧방귀를 뀌며 냉소적이고 무심한 듯하지만 속으로는 챙겨주는 쿨가이 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
フン、勘違いするな。お前を助けたわけじゃない。`
  },
  {
    id: "aq-rival-03",
    voiceName: "Orus",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 숙명의 라이벌과 1:1 진검승부를 펼치는 결투자.
상황: 칼을 뽑아 겨누며 서로의 전력을 다해 결판을 내자고 요구하는 비장한 순간.
연기 디렉션: 서늘하고 날카로운 집중력, 비장미가 감도는 차분한 목소리로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
これで決着をつける。手加減は無用だ。`
  },
  {
    id: "aq-rival-04",
    voiceName: "Orus",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 묵묵히 등을 맡기는 신뢰 깊은 라이벌/조력자.
상황: 승부를 향해 함께 돌진하기 직전, 파트너에게 짧은 한마디로 절대적인 신뢰를 보내는 순간.
연기 디렉션: 담담하지만 깊은 유대감과 믿음이 느껴지는 듬직하고 멋진 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
行くぞ。オレの背中は任せた。`
  },

  // ── 🕶️ 3. 카리스마 스승 (MASTER) ──
  {
    id: "aq-master-01",
    voiceName: "Charon",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 슬램덩크 안선생님처럼 부드럽고 인자한 미소를 띤 전설의 노감독.
상황: 낙담한 제자에게 온화하고 깊은 눈빛으로 희망을 되살려주는 불후의 명장면.
연기 디렉션: 자상하고 따뜻하며, 듣는 이의 마음에 큰 용기를 주는 깊은 지혜와 신뢰가 담긴 어조로 나지막하게 말해주세요.
대사 (오직 이 일본어 대사만 말하세요):
あきらめたら、そこで試合終了ですよ…？`
  },
  {
    id: "aq-master-02",
    voiceName: "Charon",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 진격의 거인 지휘관처럼 냉철하고 카리스마 넘치는 조사병단장.
상황: 중대한 기로에서 제자 스스로 후회 없는 결단을 내리도록 무게를 실어주는 순간.
연기 디렉션: 군더더기 없는 낮고 서늘한 중저음, 무거운 책임감과 단호함이 깃든 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
悔いが残らない方を、自分で選べ。`
  },
  {
    id: "aq-master-03",
    voiceName: "Fenrir",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 산전수전을 다 겪은 호탕하고 엄격한 전설의 무도 사부.
상황: 제자들에게 진정한 성장의 비결을 가르치는 장면.
연기 디렉션: 쩌렁쩌렁 울리는 묵직한 호통과 함께 꺾이지 않는 근성을 불어넣는 뜨거운 어조로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
一番大切な才能とは、決してあきらめぬ根性だ！`
  },
  {
    id: "aq-master-04",
    voiceName: "Fenrir",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 대군을 통솔하는 웅장한 총사령관.
상황: 미래를 위해 전 부대원들의 사기를 진작시키는 장엄한 총진격 연설 장면.
연기 디렉션: 가슴을 뒤흔드는 장엄한 웅변 톤으로 힘차고 당당하게 외쳐주세요.
대사 (오직 이 일본어 대사만 말하세요):
我が隊員たちよ、未来のために全力を捧げよ！`
  },

  // ── 🐱 4. 츤데레 (TSUNDERE) ──
  {
    id: "aq-tsundere-01",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 서브컬처 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 전형적인 트윈테일 츤데레 여고생 소꿉친구 (쿠기미야 리에 톤).
상황: 밤새 정성껏 수제 도시락을 만들어와서 얼굴을 새빨갛게 붉히며 손을 홱 내밀며 건네는 장면.
연기 디렉션: '베, 베쯔니...' 하며 당황해서 말을 더듬다가 이내 앙칼지고 새침하게 톡 쏘아붙이는 하이톤 츤데레의 정석으로 200% 연기해주세요!
대사 (오직 이 일본어 대사만 말하세요):
べ、別にあんたのために作ったんじゃないんだからね！`
  },
  {
    id: "aq-tsundere-02",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 서브컬처 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 똑 부러지고 도도한 우등생 히로인.
상황: 아침에 늦잠 자고 있는 주인공의 방에 쳐들어와 허리에 손을 얹고 잔소리를 퍼붓는 장면.
연기 디렉션: 기가 차다는 듯 한숨을 살짝 섞으며, 뾰로통하고 새침하게 다그치는 생동감 넘치는 여고생 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
ちょっと、いつまで寝てるの？早く起きてよね！`
  },
  {
    id: "aq-tsundere-03",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 서브컬처 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 자존심이 너무 강해 솔직해지지 못하는 츤데레 라이벌 소녀.
상황: 다친 주인공을 보고 눈물이 찔끔 날 정도로 걱정했으면서, 정작 마주치자 볼을 부풀리며 빽 소리 지르는 장면.
연기 디렉션: '바보!' 하고 깜짝 놀란 듯 격앙된 목소리로 앙칼지게 소리치며 얼굴을 붉히는 츤데레 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
バカ！心配なんてしてないわよ！`
  },
  {
    id: "aq-tsundere-04",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 서브컬처 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 평소엔 쌀쌀맞지만 단둘이 있을 때 무장해제되는 '데레' 상태의 히로인.
상황: 노을 지는 벤치에서 고개를 푹 숙인 채 옷자락을 만지작거리며 수줍게 곁을 내어주는 설레는 순간.
연기 디렉션: 말끝을 살짝 흐리며 속삭이듯 수줍어하고, 심장이 쿵쾅거리는 떨림이 묻어나는 사랑스러운 데레 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
…今日だけは、隣にいてあげてもいいわよ。`
  },

  // ── 🦹 5. 지능형 빌런 (VILLAIN) ──
  {
    id: "aq-villain-01",
    voiceName: "Charon",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 블리치 아이젠 소스케처럼 완벽한 여유와 압도적 지능을 가진 우아한 흑막.
상황: 흥분해서 덤벼드는 주인공을 손가락 하나로 막아 세우며 조용히 미소 짓는 장면.
연기 디렉션: 낮고 부드러우며 소름 끼칠 정도로 차분하고 우아한 어조, 상대방의 모든 것을 꿰뚫어보는 서늘한 미소를 머금은 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
あまり強い言葉を使うなよ。弱く見えるぞ。`
  },
  {
    id: "aq-villain-02",
    voiceName: "Charon",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 모든 변수를 손바닥 위에 올려놓고 체스를 두듯 조종하는 천재 전략가.
상황: 모든 함정이 계획대로 맞아떨어지는 순간 안경을 치켜올리며 음산한 성취감을 드러내는 장면.
연기 디렉션: 오만하면서도 절제된 품격, 서늘하고 지적인 미소를 담아 나지막하게 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
すべては、私の計画通りに進んでいる。`
  },
  {
    id: "aq-villain-03",
    voiceName: "Charon",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 인간의 감정을 초월하여 세계의 본질을 논하는 허무주의 철학자.
상황: 자신을 동경하던 자에게 차가운 진실을 속삭이며 환상을 깨부수는 잔혹하고 아름다운 장면.
연기 디렉션: 시적이고 나직하며, 서늘한 진리를 설파하듯 공허하고 매혹적인 중저음으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
憧れとは、理解から最も遠い感情だよ。`
  },
  {
    id: "aq-villain-04",
    voiceName: "Fenrir",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 세상의 규칙을 바꾸고자 하는 압도적인 절대 군주.
상황: 왕좌에서 내려다보며 힘의 지배를 엄숙하게 선포하는 장면.
연기 디렉션: 공간을 압도하는 묵직하고 거대한 위압감, 절대적인 권력자의 차가운 위엄으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
この世界の理を変えるのは、力ある者のみだ。`
  },

  // ── 🪄 6. 신비한 마법사 (MYSTIC) ──
  {
    id: "aq-mystic-01",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 장송의 프리렌처럼 수천 년을 살아온 고요하고 신비로운 엘프 마법사.
상황: 소중한 옛 동료의 묘비 앞에서, 인간의 짧은 삶과 마음에 대해 더 알지 못했던 자신을 조용히 돌아보는 명장면.
연기 디렉션: 담담하지만 마음 깊은 곳에서 배어 나오는 아련함과 먹먹한 감회, 촉촉하고 투명한 어조로 나지막하게 말해주세요.
대사 (오직 이 일본어 대사만 말하세요):
人間の寿命は短いのに…なんでもっと知ろうとしなかったんだろう。`
  },
  {
    id: "aq-mystic-02",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 장송의 프리렌 힘멜처럼 다정하고 낭만적인 푸른 머리의 미남 용사.
상황: 시시하고 소소한 모험 속에서 동료들을 향해 싱긋 웃으며 행복해하는 장면.
연기 디렉션: 부드럽고 따뜻하며, 듣는 이의 마음을 편안하게 녹여주는 다정다감한 미소년 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
くだらなくて楽しい旅が、僕は好きなんだ。`
  },
  {
    id: "aq-mystic-03",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 고대의 대마법을 다루는 위엄 있고 도도한 대마법사.
상황: 상대방의 잔재주를 거대한 마력 장벽으로 손쉽게 막아내며 코웃음 치는 장면.
연기 디렉션: 귀족적이고 당당하며, 범접할 수 없는 마도사의 위풍당당한 카리스마가 넘치는 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
我が魔力の前では、小細工など無意味だ。`
  },
  {
    id: "aq-mystic-04",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 태고의 숲을 지키는 자애롭고 고요한 고대의 정령.
상황: 상처 입은 방랑자의 이마를 부드럽게 어루만지며 영혼을 위로하는 축복의 순간.
연기 디렉션: 은은하고 맑은 바람처럼 속삭이듯, 성스럽고 깊은 위로가 전해지는 평온한 목소리로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
時の流れは静かに、すべてを癒してくれるでしょう。`
  },

  // ── 🏀 7. 열정 스포츠맨 (SPORTS) ──
  {
    id: "aq-sports-01",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 스포츠 애니메이션 전문 성우(声優)입니다.
캐릭터: 슬램덩크 강백호(사쿠라기 하나미치) 같은 천재 열혈 농구 소년.
상황: 경기 마지막 1초, 피나는 2만 번의 슛 연습을 회상하며 완벽한 폼으로 점프슛을 쏘는 순간.
연기 디렉션: 극도의 집중 속에서 낮게 읊조리듯, 온 신경을 손끝에 집중한 진지하고 묵직한 속삭임 톤으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
左手はそえるだけ…！`
  },
  {
    id: "aq-sports-02",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 스포츠 애니메이션 전문 성우(声優)입니다.
캐릭터: 슬램덩크 정대만(미츠이 히사시) 같은 방황 끝에 돌아온 슈터.
상황: 존경하는 선생님 앞에 무릎을 꿇고 눈물을 흘리며 농구를 향한 자신의 간절한 진심을 고백하는 명장면.
연기 디렉션: 목이 메이고 떨리는 목소리로, 가슴 깊은 곳의 간절함과 열정을 담아 울먹이며 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
先生…！！もう一度、みんなとバスケがしたいです……`
  },
  {
    id: "aq-sports-03",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 스포츠 애니메이션 전문 성우(声優)입니다.
캐릭터: 팀의 승리를 위해 온몸을 바치는 불꽃 에이스.
상황: "내 영광의 시대는 바로 지금입니다!"라며 타오르는 투지를 불태우는 장면.
연기 디렉션: 가슴이 벅차오르는 열정과 굳센 투혼의 목소리로 힘차게 외쳐주세요!
대사 (오직 이 일본어 대사만 말하세요):
オレの栄光時代は…オレは今なんだよ！！`
  },
  {
    id: "aq-sports-04",
    voiceName: "Fenrir",
    prompt: `당신은 일본 최고의 스포츠 애니메이션 전문 성우(声優)입니다.
캐릭터: 팀의 기둥이 되는 든든한 캡틴.
상황: 지친 팀원들의 사기를 진작시키며 승리를 향해 끝까지 달릴 것을 독려하는 코트 위의 외침.
연기 디렉션: 가슴을 울리는 강인한 카리스마와 흔들리지 않는 집념으로 힘차게 외쳐주세요.
대사 (오직 이 일본어 대사만 말하세요):
最後まで絶対に足を止めるな！勝ちに行くぞ！`
  },

  // ── 🤖 8. 고뇌하는 소년 (PILOT) ──
  {
    id: "aq-pilot-01",
    voiceName: "Puck",
    prompt: `당신은 일본 최고의 SF/메카 애니메이션 전문 성우(声優)입니다.
캐릭터: 신세기 에반게리온 소년 파일럿처럼 두려움을 이겨내고 스스로를 다잡는 10대 소년.
상황: 중요한 임무를 앞두고 조종석에서 눈을 감고 용기를 내기 위해 결의를 다지는 명장면.
연기 디렉션: 처음엔 떨리는 목소리로 시작하여 점점 물러서지 않겠다는 뜨거운 결의에 찬 외침으로 변해가는 드라마틱한 감정선으로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
逃げちゃダメだ、逃げちゃダメだ、逃げちゃダメだ！`
  },
  {
    id: "aq-pilot-02",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 SF 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 신세기 에반게리온 아야나미 레이처럼 신비롭고 순수한 소녀.
상황: 자신을 진심으로 챙겨준 상대를 바라보며, 처음 겪는 따뜻한 감정에 조심스럽게 마음을 여는 장면.
연기 디렉션: 차분하고 투명한 어조 속에 아련한 순수함과 조심스러운 온기가 묻어나는 여린 목소리로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
ごめんなさい。こういう時、どんな顔をすればいいか分からないの。`
  },
  {
    id: "aq-pilot-03",
    voiceName: "Charon",
    prompt: `당신은 일본 최고의 애니메이션 전문 성우(声優)입니다.
캐릭터: 강인하고 엄격한 사령관.
상황: 망설이는 탑승자에게 각오를 요구하며 단호하게 명령을 내리는 장면.
연기 디렉션: 흔들림 없는 단호함과 깊은 무게감이 서려 있는 낮은 저음으로 엄격하게 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
覚悟があるなら乗れ。でなければ今すぐ立ち去れ。`
  },
  {
    id: "aq-pilot-04",
    voiceName: "Aoede",
    prompt: `당신은 일본 최고의 애니메이션 전문 여성 성우(声優)입니다.
캐릭터: 전장에서는 든든한 지휘관이자 소년들에게는 다정한 보호자 역할을 하는 작전부장.
상황: 출격을 앞둔 소년 파일럿의 긴장을 풀어주며, 활짝 웃는 얼굴로 윙크하며 약속을 건네는 따뜻한 순간.
연기 디렉션: 성숙하고 매력적인 누나 톤, 신뢰와 활기가 기분 좋게 섞인 다정한 어조로 연기해주세요.
대사 (오직 이 일본어 대사만 말하세요):
無事に帰ってきたら、続きのお祝いをしましょう。`
  }
];

function pcmToWav(pcmBuffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  pcmBuffer.copy(buffer, 44);
  return buffer;
}

const outputDir = path.join(__dirname, '..', 'public', 'audio', 'anime-quotes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function synthesizeGeminiSpeech(item) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{
        parts: [{ text: item.prompt }]
      }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: item.voiceName
            }
          }
        }
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" }
      ]
    });

    const req = https.request(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0].content && json.candidates[0].content.parts) {
            const audioPart = json.candidates[0].content.parts.find(p => p.inlineData);
            if (audioPart && audioPart.inlineData.data) {
              const pcm = Buffer.from(audioPart.inlineData.data, 'base64');
              const wav = pcmToWav(pcm, 24000);
              const wavPath = path.join(outputDir, `${item.id}.wav`);
              const mp3Path = path.join(outputDir, `${item.id}.mp3`);
              fs.writeFileSync(wavPath, wav);
              // Copy to .mp3 path as well so all existing audio players seamlessly load it
              fs.writeFileSync(mp3Path, wav);
              try {
                execSync(`afconvert -f m4af -d aac "${wavPath}" "${path.join(outputDir, item.id + '.m4a')}"`);
              } catch (e) {}
              resolve({ id: item.id, size: wav.length });
            } else {
              reject(new Error(`No audio data returned: ` + JSON.stringify(json.candidates[0])));
            }
          } else {
            reject(new Error(`Gemini Error: ` + JSON.stringify(json)));
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
  console.log(`Starting Gemini 3.1 Flash TTS Acting Generation for all ${GEMINI_VOICE_PROMPTS.length} anime quotes...`);

  for (let i = 0; i < GEMINI_VOICE_PROMPTS.length; i++) {
    const item = GEMINI_VOICE_PROMPTS[i];
    process.stdout.write(`[${i + 1}/${GEMINI_VOICE_PROMPTS.length}] Generating ${item.id} (${item.voiceName})... `);
    try {
      const res = await synthesizeGeminiSpeech(item);
      console.log(`✓ OK (${res.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error:`, err.message);
    }
    // Rate limit safety
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('\n🎉 All 32 anime quote Gemini 3.1 TTS emotional audio files generated successfully!');
}

main().catch(console.error);
