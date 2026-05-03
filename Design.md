# 🌸 Design.md: Sakura Shiba (Sticker Bomb Edition)

이 문서는 'Fictional — Whimsical Sticker Bomb' 스타일 가이드를 기반으로 발전시킨 사쿠라 시바(Sakura Shiba) 일본어 학습 앱의 디자인 시스템입니다. 장난기 가득한 그림책의 에너지를 담아, 정형화된 UI보다는 화면 위에 스티커를 무심하게 툭툭 던져 놓은 듯한 생동감을 지향합니다.

## 1. 디자인 철학 (Visual Philosophy)

* Whimsical & Playful: 마치 어린 시절 스티커 북을 꾸미는 듯한 즐거움을 줍니다.
* Organic & Imperfect: 완벽한 대칭보다는 약간의 기울어짐과 겹침(Overlap)을 통해 생동감을 표현합니다.
* Typography First: 서체 자체가 하나의 강력한 그래픽 요소로 작동합니다.

## 2. 디자인 토큰: 색상 (Tokens — Colors)

| 이름 | Hex 코드 | 역할 | 비고 |
|---|---|---|---|
| Sakura Blush | #ffe4ec | 메인 페이지 배경 | 봄벚꽃이 흩날리는 듯한 연분홍 캔버스 |
| Canvas Almond | #ffe9ce | 보조 배경, 섹션 구분 | 따뜻하고 부드러운 도화지 느낌 |
| Paper White | #ffffff | 카드 표면, 말풍선 | 시각적 대비를 제공하는 깨끗한 표면 |
| Type Black | #000000 | 메인 텍스트, 굵은 외곽선 | 가독성이 높은 묵직한 다크 텍스트 |
| Sakura Pink | #ffb7c5 | 브랜드 액센트 | 핵심 정체성, 진행률, 강조 요소 |
| Shiba Orange | #ffa54f | 마스코트 포인트 | 시바군의 에너지를 담은 오렌지 컬러 |
| Grape Punch | #8a53ff | 보조 액센트 | 에너제틱한 카드 배경, 섹션 구분 |
| Matcha Green | #3ccb09 | 상태 표시 | 정답 확인, 학습 완료 등 긍정적 피드백 |

## 3. 디자인 토큰: 타이포그래피 (Typography)

* Main Font: 'Fictional' (대체: Comic Sans MS, Zen Maru Gothic)
* 특징: 기발하고 표현력이 풍부한 서체. 정형화된 계층 구조보다는 시각적 충격에 집중합니다.

| 역할 | 크기 | 행간 (Line Height) | 토큰 |
|---|---|---|---|
| Display | 115px | 0.9 | --text-display |
| Heading | 48px | 1.2 | --text-heading |
| Subheading | 29px | 1.3 | --text-subheading |
| Body | 22px | 1.4 | --text-body |
| Body SM | 16px | 1.71 | --text-body-sm |

## 4. 컴포넌트 시스템 (Components — Sticker Pack)

### 🐕 시바 스티커 (Shiba Mascot Sticker)

* 디자인: 10px의 굵은 화이트 테두리(Sticker Outline)가 있는 시바군 일러스트.
* 레이아웃: 카드의 모서리에 살짝 겹치게 배치(Sticker Bombing).
* 효과: 호버 시 미세하게 커지며 각도가 변함.

### 💬 말풍선 카드 (Speech Bubble Card)

* 디자인: Paper White 배경, 144px의 과장된 모서리 곡률.
* 그림자: rgb(251, 215, 12) 0px 0px 0px 2px (노란색의 굵은 고정 섀도우).

### 🃏 와블 카드 (Wobbly Cards)

* 디자인: Grape Punch, Sakura Pink 등의 고채도 배경. 15px 모서리 곡률.
* 규칙: 각 카드는 -2도 ~ 2도 사이의 랜덤한 기울기를 가짐.

## 5. 레이아웃 가이드 (Layout — Sticker Bombing)

1. Section Gap: 30px (요소 간 충분한 여백 확보).
2. Overlap Rule: 요소들이 서로 10-15px 정도 겹치는 것을 권장합니다. 특히 캐릭터나 아이콘은 카드 위에 걸치듯 배치합니다.
3. Full-Bleed: 배경 블록은 화면 끝까지 채워 확장된 느낌을 줍니다.
4. Imagery: 전통적인 사진 대신 채워진 형태의 아이콘(Solid Icon)과 화려한 텍스트를 그래픽 요소로 사용합니다.

## 6. 권장 사항 (Do's & Don'ts)

### ✅ Do

* 항상 Fictional 서체(또는 둥근 고딕체)를 사용하여 브랜드 개성을 유지하세요.
* Sakura Blush를 기본 배경으로 사용하여 봄벚꽃의 분위기를 형성하세요. 섹션 구분에는 Canvas Almond를 활용하세요.
* 카드 주변에는 화이트 테두리를 둘러 스티커 느낌을 강조하세요.
* 요소들을 약간 비스듬하게 배치하여 장난스러운 분위기를 조성하세요.

### ❌ Don't

* 전통적인 부드러운 그림자(Box-shadow)를 사용하지 마세요. 대신 굵은 단색 라인을 활용하세요.
* 엄격한 그리드 레이아웃에 갇히지 마세요. 요소들이 자유롭게 배치된 느낌을 주어야 합니다.
* 무채색 위주의 차가운 디자인을 피하세요. 고채도의 생동감 있는 컬러를 적극적으로 사용하세요.

## 7. CSS 변수 설정 (Quick Start)

```css
 :root {
 --color-sakura-blush: #ffe4ec;
 --color-canvas-almond: #ffe9ce;
 --color-paper-white: #ffffff;
 --color-sakura-pink: #ffb7c5;
 --color-shiba-orange: #ffa54f;
 --color-type-black: #000000;
  --spacing-base: 6px;
  --radius-sticker: 15px;
  --radius-bubble: 144px;
  --shadow-fictional: 0px 0px 0px 2px #ffd80c; /* Sunshine Yellow Shadow */
}

.sticker {
  border: 5px solid white;
  filter: drop-shadow(0 4px 0 rgba(0,0,0,0.1));
  transform: rotate(-1.5deg);
}
```
