"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { getItemSlot } from "@/lib/wardrobe";

/**
 * 캐릭터별 기본 이미지 매핑
 */
export const CHARACTER_BASES: Record<string, string> = {
  shiba: "/mascot/shiba-base.webp",
  poodle: "/mascot/poodle-base.png",
  beagle: "/mascot/beagle-base.png",
  pomeranian: "/mascot/pomeranian-base.png",
};

/**
 * 캐릭터 품종별 + 착용 아이템별 1:1 맞춤 일체형 전용 마스코트 이미지 매핑 (옵션 2)
 */
export const CHARACTER_ITEM_MASCOTS: Record<string, Record<string, string>> = {
  shiba: {
    "hachimaki": "/mascot/shiba-lv2-hachimaki.webp",
    "item-headband": "/mascot/shiba-lv2-hachimaki.webp",
    "bandana": "/mascot/shiba-lv2-hachimaki.webp",
    "scarf": "/mascot/shiba-lv3-scarf.webp",
    "item-scarf": "/mascot/shiba-lv3-scarf.webp",
    "hakama": "/mascot/shiba-lv4-kimono.webp",
    "item-kimono": "/mascot/shiba-lv4-kimono.webp",
    "glasses": "/mascot/shiba-lv5-glasses.webp",
    "item-glasses": "/mascot/shiba-lv5-glasses.webp",
    "crown": "/mascot/shiba-lv6-master.webp",
    "item-crown": "/mascot/shiba-lv6-master.webp",
  },
  poodle: {
    "hachimaki": "/mascot/poodle-hachimaki.png",
    "item-headband": "/mascot/poodle-hachimaki.png",
    "bandana": "/mascot/poodle-bandana.png",
  },
  beagle: {
    "hachimaki": "/mascot/beagle-hachimaki.png",
    "item-headband": "/mascot/beagle-hachimaki.png",
    "bandana": "/mascot/beagle-bandana.png",
  },
  pomeranian: {
    "hachimaki": "/mascot/pomeranian-hachimaki.png",
    "item-headband": "/mascot/pomeranian-hachimaki.png",
    "bandana": "/mascot/pomeranian-bandana.png",
  },
};

const BASE_IMAGE = CHARACTER_BASES.shiba;

/**
 * 아이템별 오버레이 이미지 매핑
 * 기본 시바견 위에 투명 PNG 레이어로 겹쳐서 착용 효과를 냅니다.
 * 오버레이 이미지가 없는 아이템은 레벨 이미지로 폴백합니다.
 */
const ITEM_OVERLAYS: Record<string, string> = {
  // ─── 기존 아이템 (5개) ───
  "hat-cap": "/mascot/overlay-hat-cap.webp",
  "scarf": "/mascot/overlay-scarf.webp",
  "hat-santa": "/mascot/overlay-hat-santa.webp",
  "glasses": "/mascot/overlay-glasses.webp",
  "crown": "/mascot/overlay-crown.webp",
  // ─── 신규 아이템 (15개) ───
  "hachimaki": "/mascot/overlay-hachimaki.webp",
  "horns": "/mascot/overlay-horns.webp",
  "halo": "/mascot/overlay-halo.webp",
  "bow-tie": "/mascot/overlay-bow-tie.webp",
  "necklace-pearl": "/mascot/overlay-necklace-pearl.webp",
  "mask-fox": "/mascot/overlay-mask-fox.webp",
  "mask-oni": "/mascot/overlay-mask-oni.webp",
  "earring-gold": "/mascot/overlay-earring-gold.webp",
  "flower-crown": "/mascot/overlay-flower-crown.webp",
  "muffler": "/mascot/overlay-muffler.webp",
  "hakama": "/mascot/overlay-hakama.webp",
  "armor-samurai": "/mascot/overlay-armor-samurai.webp",
  "cape": "/mascot/overlay-cape.webp",
  "bandana": "/mascot/overlay-bandana.webp",
  "stud-ear": "/mascot/overlay-stud-ear.webp",
  // ─── 추가 신규 아이템 (6개) ───
  "ninja": "/mascot/overlay-ninja.webp",
  "wizard-hat": "/mascot/overlay-wizard-hat.webp",
  "hawaiian-shirt": "/mascot/overlay-hawaiian-shirt.webp",
  "headphones": "/mascot/overlay-headphones.webp",
  "pink-ribbon": "/mascot/overlay-pink-ribbon.webp",
  "randoseru": "/mascot/overlay-randoseru.webp",
};

/**
 * 오버레이가 없는 아이템의 레벨 이미지 폴백 매핑
 * 오버레이 PNG가 아직 없을 때, 기존 레벨별 합성 이미지를 대신 사용
 */
const ITEM_ID_TO_LEVEL: Record<string, number> = {
  "hat-cap": 2,    // shiba-lv2-hachimaki.png
  "scarf": 3,      // shiba-lv3-scarf.png
  "glasses": 5,    // shiba-lv5-glasses.png
  "crown": 6,      // shiba-lv6-master.png
  "hat-santa": 2,  // closest visual: hachimaki
};
const ITEM_LEVEL_FALLBACKS = ITEM_ID_TO_LEVEL;

/**
 * 레벨별 합성 이미지 (오버레이 PNG가 없을 때의 폴백용)
 * 옷장 시스템에서는 아이템 착용 시에만 사용됨
 */
const LEVEL_IMAGES: Record<number, string> = {
  1: "/mascot/shiba-base.webp",
  2: "/mascot/shiba-lv2-hachimaki.webp",
  3: "/mascot/shiba-lv3-scarf.webp",
  4: "/mascot/shiba-lv4-kimono.webp",
  5: "/mascot/shiba-lv5-glasses.webp",
  6: "/mascot/shiba-lv6-master.webp",
};

/**
 * 아이템별 z-index (위→아래: 머리 > 목 > 몸)
 * 높을수록 위에 렌더링됨
 */
const ITEM_Z_INDEX: Record<string, number> = {
  // ─── 머리 위 (최상위) ───
  "crown": 30,
  "wizard-hat": 30,
  "flower-crown": 30,
  "halo": 28,
  "pink-ribbon": 28,
  "horns": 27,
  "headphones": 26,
  "hat-cap": 25,
  "hat-santa": 25,
  "hachimaki": 25,
  "bandana": 24,
  // ─── 얼굴 ───
  "mask-fox": 22,
  "mask-oni": 22,
  "glasses": 20,
  // ─── 귀 ───
  "earring-gold": 18,
  "stud-ear": 18,
  // ─── 목 ───
  "bow-tie": 16,
  "necklace-pearl": 15,
  "scarf": 14,
  "muffler": 14,
  // ─── 몸통 ───
  "cape": 10,
  "hawaiian-shirt": 8,
  "hakama": 8,
  "ninja": 7,
  "armor-samurai": 6,
  "randoseru": 5,
};

/**
 * 어떤 오버레이 PNG가 실제로 존재하는지 런타임에 체크
 * (존재하지 않으면 레벨 폴백 사용)
 */
const checkedOverlays = new Set<string>();
const missingOverlays = new Set<string>();

// ─── 레벨업 파티클 데이터 ──────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  angle: number;
  distance: number;
}

const LEVELUP_COLORS = [
  "#ffa54f", // shiba-orange
  "#ffb7c5", // sakura-pink
  "#9333ea", // grape-punch
  "#facc15", // yellow-400
  "#34d399", // emerald-400
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 20,
    y: 50 + (Math.random() - 0.5) * 20,
    color: LEVELUP_COLORS[i % LEVELUP_COLORS.length],
    size: 4 + Math.random() * 6,
    delay: i * 0.04,
    angle: (360 / count) * i + Math.random() * 30,
    distance: 40 + Math.random() * 50,
  }));
}

// ─── 레벨업 파티클 오버레이 ──────────────────────────────────────
function LevelUpParticles({ particles }: { particles: Particle[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            left: `${p.x + Math.cos((p.angle * Math.PI) / 180) * p.distance}%`,
            top: `${p.y + Math.sin((p.angle * Math.PI) / 180) * p.distance}%`,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: p.delay,
            ease: "easeOut",
          }}
          className="absolute block rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ─── 레벨업 반짝이 링 ────────────────────────────────────────
function LevelUpRing({ size }: { size: number }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 1 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute inset-0 rounded-full border-4 border-shiba-orange pointer-events-none z-10"
      style={{ width: size, height: size }}
    />
  );
}

// ─── 이전 값 추적 훅 ────────────────────────────────────────
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// ─── Props ───────────────────────────────────────────────────
interface ShibaAvatarProps {
  /** 캐릭터 ID (shiba, poodle, beagle, pomeranian) */
  characterId?: string;
  /** 사용자 레벨 (1~10) */
  level?: number;
  /** 장착한 아이템 ID 목록 */
  equippedItemIds?: string[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 이미지 크기 (px) — width와 height 모두에 적용 */
  size?: number;
  /** 스티커 스타일 적용 여부 (흰 테두리 + 그림자) */
  sticker?: boolean;
  /** wobble 클래스 */
  wobble?: string;
  /** 원형 아바타 모드 (프로필용) */
  circular?: boolean;
  /** 레벨업 애니메이션 강제 트리거 (외부에서 제어할 때) */
  triggerLevelUp?: boolean;
}

/**
 * 아이템 ID 별칭 매핑 (데이터베이스 ID와 오버레이 파일 키 간의 매핑)
 */
const ITEM_ID_ALIASES: Record<string, string> = {
  "item-headband": "hachimaki",
  "item-scarf": "scarf",
  "item-kimono": "hakama",
  "item-glasses": "glasses",
  "item-crown": "crown",
  "item-ninja": "ninja",
  "item-wizard-hat": "wizard-hat",
  "item-hawaiian-shirt": "hawaiian-shirt",
  "item-headphones": "headphones",
  "item-pink-ribbon": "pink-ribbon",
  "item-randoseru": "randoseru",
};

export function normalizeItemId(id: string): string {
  return ITEM_ID_ALIASES[id] ?? id;
}

/**
 * 착용 아이템이 있는지, 오버레이 PNG가 존재하는지 판단
 * → 오버레이 모드: 기본 시바견 + 아이템 오버레이 레이어
 * → 폴백 모드: 기존 레벨 합성 이미지 (오버레이 PNG가 없을 때)
 */
function shouldUseOverlayMode(equippedItemIds?: string[]): boolean {
  if (!equippedItemIds || equippedItemIds.length === 0) return false;
  // 하나라도 오버레이가 있으면 오버레이 모드
  return equippedItemIds.some((id) => {
    const normalized = normalizeItemId(id);
    return ITEM_OVERLAYS[normalized] && !missingOverlays.has(normalized);
  });
}

/**
 * 아이템 착용 상태에 따른 이미지 결정
 * - 아이템 착용 + 오버레이 PNG 있음 → 기본 시바견 + 오버레이 레이어 (shouldUseOverlayMode에서 처리)
 * - 아이템 착용 + 오버레이 PNG 없음 → 레벨 폴백 합성 이미지
 * - 아이템 미착용 → 캐릭터 기본 이미지 (CHARACTER_BASES[characterId] 또는 shiba-base.webp)
 *   ※ 옷장 시스템 도입 후, 착용 아이템이 없으면 레벨과 무관하게 기본 이미지만 표시
 */
export function getFallbackLevelImage(_level: number, equippedItemIds?: string[], characterId?: string): string {
  // 시바견이 아닌 캐릭터(푸들, 비글, 포메)는 시바견 전용 합성 이미지(LEVEL_IMAGES)를 절대 사용하지 않음
  if (characterId && characterId !== "shiba" && CHARACTER_BASES[characterId]) {
    return CHARACTER_BASES[characterId];
  }

  if (equippedItemIds && equippedItemIds.length > 0) {
    let maxLevel = 0;
    for (const rawId of equippedItemIds) {
      const itemId = normalizeItemId(rawId);
      const itemLevel = ITEM_ID_TO_LEVEL[itemId];
      if (itemLevel && itemLevel > maxLevel) {
        maxLevel = itemLevel;
      }
    }
    if (maxLevel > 0) {
      return LEVEL_IMAGES[maxLevel] ?? LEVEL_IMAGES[1];
    }
  }
  // Remove automatic clothing escalation: return base image for selected character
  return (characterId && CHARACTER_BASES[characterId]) || BASE_IMAGE;
}

/**
 * 캐릭터 품종별, 2개 슬롯(head / body) 아이템 착용 시 적용할 피팅 스타일 반환
 * 기본 시바견은 클리핑 없이 전체 오버레이 적용, 타 품종(푸들, 비글, 포메 등)은 슬롯별 피팅 처리
 */
export function getBreedFittedStyle(characterId?: string, slot?: string): React.CSSProperties {
  if (!characterId || characterId === "shiba") return {};
  if (slot === "head") {
    return { clipPath: "inset(0 0 35% 0)" };
  }
  if (slot === "body") {
    return { clipPath: "inset(30% 0 0 0)" };
  }
  return {};
}

// ─── 백그라운드 아우라 ──────────────────────────────────────────
function ShibaAura({ level }: { level: number }) {
  if (level <= 1) return null;

  const auraClasses: Record<number, string> = {
    2: "bg-sakura-pink/60 animate-pulse ring-4 ring-sakura-pink/70 shadow-[0_0_12px_rgba(255,183,197,0.8)]",
    3: "bg-grape-punch/50 animate-pulse ring-4 ring-grape-punch/60 shadow-[0_0_14px_rgba(147,51,234,0.6)]",
    4: "bg-sky-400/50 animate-pulse ring-4 ring-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.7)]",
    5: "bg-amber-400/60 animate-pulse ring-4 ring-amber-400/70 shadow-[0_0_18px_rgba(251,191,36,0.8)]",
    6: "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse ring-4 ring-yellow-400/80 shadow-[0_0_22px_rgba(250,204,21,0.9)]",
    7: "bg-purple-500/60 animate-pulse ring-4 ring-purple-400/80 shadow-[0_0_24px_rgba(168,85,247,0.8)]",
    8: "bg-cyan-400/60 animate-pulse ring-4 ring-cyan-300/80 shadow-[0_0_26px_rgba(34,211,238,0.9)]",
    9: "bg-indigo-500/60 animate-pulse ring-4 ring-indigo-400/80 shadow-[0_0_28px_rgba(99,102,241,0.9)]",
    10: "bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 animate-pulse ring-4 ring-amber-300/90 shadow-[0_0_32px_rgba(251,191,36,1)]",
  };

  const currentAura = auraClasses[Math.min(level, 10)] ?? auraClasses[2];

  return (
    <div
      className={`absolute -inset-3 rounded-full blur-md pointer-events-none z-0 ${currentAura}`}
    />
  );
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────
export function ShibaAvatar({
  characterId = "shiba",
  level = 1,
  equippedItemIds,
  className,
  size = 64,
  sticker = false,
  wobble,
  circular = false,
  triggerLevelUp,
}: ShibaAvatarProps) {
  const equippedItemId = equippedItemIds && equippedItemIds.length > 0 ? normalizeItemId(equippedItemIds[0]) : null;
  const fittedMascotSrc = equippedItemId
    ? (CHARACTER_ITEM_MASCOTS[characterId]?.[equippedItemId] || CHARACTER_ITEM_MASCOTS[characterId]?.[equippedItemIds![0]])
    : null;

  const baseImage = (characterId && CHARACTER_BASES[characterId]) || CHARACTER_BASES.shiba;
  const useOverlay = fittedMascotSrc ? false : shouldUseOverlayMode(equippedItemIds);
  const src = fittedMascotSrc || (useOverlay ? baseImage : getFallbackLevelImage(level, equippedItemIds, characterId));
  const prevLevel = usePrevious(level);
  const prevTrigger = usePrevious(triggerLevelUp);
  const prevEquipped = usePrevious(equippedItemIds);

  // 레벨업 감지
  const isLevelUp = (prevLevel != null && level > prevLevel) ||
    (triggerLevelUp && !prevTrigger);

  // 착용 아이템 변경 감지
  const isEquipChanged = prevEquipped !== undefined &&
    equippedItemIds !== undefined &&
    JSON.stringify(prevEquipped) !== JSON.stringify(equippedItemIds);

  const [showLevelUpEffect, setShowLevelUpEffect] = useState(false);
  const [showEquipEffect, setShowEquipEffect] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [imageKey, setImageKey] = useState(`${characterId}-${src}-${JSON.stringify(equippedItemIds)}`);

  // 레벨업 이펙트 트리거
  useEffect(() => {
    if (isLevelUp) {
      setParticles(generateParticles(16));
      setShowLevelUpEffect(true);
      setImageKey(`${characterId}-${src}-${JSON.stringify(equippedItemIds)}`);

      const timer = setTimeout(() => {
        setShowLevelUpEffect(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLevelUp, characterId, src, equippedItemIds]);

  // 착용 변경 이펙트 (작은 바운스)
  useEffect(() => {
    if (isEquipChanged) {
      setShowEquipEffect(true);
      setImageKey(`${characterId}-${src}-${JSON.stringify(equippedItemIds)}`);
      const timer = setTimeout(() => {
        setShowEquipEffect(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isEquipChanged, characterId, src, equippedItemIds]);

  // src나 equippedItemIds, characterId가 바뀌면 imageKey 갱신
  useEffect(() => {
    setImageKey(`${characterId}-${src}-${JSON.stringify(equippedItemIds)}`);
  }, [characterId, src, equippedItemIds]);

  // 오버레이할 아이템 정렬 (z-index 낮→높은 순으로 렌더링)
  const overlayItems = (equippedItemIds ?? [])
    .map((id) => ({ rawId: id, normalizedId: normalizeItemId(id) }))
    .filter(({ normalizedId }) => ITEM_OVERLAYS[normalizedId] && !missingOverlays.has(normalizedId))
    .sort((a, b) => (ITEM_Z_INDEX[a.normalizedId] ?? 10) - (ITEM_Z_INDEX[b.normalizedId] ?? 10));

  // 오버레이 이미지 로드 실패 처리
  const handleOverlayError = useCallback((itemId: string) => {
    missingOverlays.add(itemId);
  }, []);

  // 착용 효과 애니메이션 설정
  const equipAnimate = showEquipEffect
    ? { scale: [1, 1.15, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }
    : { scale: 1, filter: "brightness(1)" };

  return (
    <div
      className={clsx(
        "relative shrink-0",
        sticker && "border-[5px] border-white drop-shadow-[0_4px_0_rgba(0,0,0,0.15)]",
        wobble,
        circular && "rounded-full",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* 백그라운드 아우라 */}
      <ShibaAura level={level} />

      {/* 레벨업 파티클 */}
      <AnimatePresence>
        {showLevelUpEffect && (
          <LevelUpParticles particles={particles} />
        )}
      </AnimatePresence>

      {/* 레벨업 확장 링 */}
      {showLevelUpEffect && circular && (
        <LevelUpRing size={size} />
      )}

      {/* 아바타 이미지 — 레벨업 시 스케일 바운스 + 글로우 */}
      <motion.div
        className={clsx(
          "relative w-full h-full overflow-hidden",
          circular && "rounded-full",
        )}
        animate={
          showLevelUpEffect
            ? {
                scale: [1, 1.3, 0.95, 1.05, 1],
                filter: [
                  "brightness(1)",
                  "brightness(1.4) drop-shadow(0 0 8px #ffa54f)",
                  "brightness(1.2) drop-shadow(0 0 4px #ffb7c5)",
                  "brightness(1.05) drop-shadow(0 0 2px #ffa54f)",
                  "brightness(1)",
                ],
              }
            : equipAnimate
        }
        transition={
          showLevelUpEffect
            ? { duration: 0.8, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={imageKey}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* 기본 시바견 이미지 */}
            <Image
              src={src}
              alt={`왕왕이 마스코트 Lv.${level}`}
              width={size}
              height={size}
              className={clsx("object-contain", circular && "object-cover rounded-full")}
              priority={size >= 96}
              unoptimized
            />

            {/* 아이템 오버레이 레이어들 */}
            {useOverlay && overlayItems.map(({ rawId, normalizedId }) => {
              const slot = getItemSlot(normalizedId);
              const fittedStyle = getBreedFittedStyle(characterId, slot);

              return (
                <Image
                  key={rawId}
                  src={ITEM_OVERLAYS[normalizedId]}
                  alt={normalizedId}
                  width={size}
                  height={size}
                  className={clsx(
                    "absolute inset-0 object-contain pointer-events-none",
                    circular && "object-cover rounded-full"
                  )}
                  style={{ zIndex: ITEM_Z_INDEX[normalizedId] ?? 10, ...fittedStyle }}
                  onError={() => handleOverlayError(normalizedId)}
                  unoptimized
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 레벨업 배너 배지 */}
      <AnimatePresence>
        {showLevelUpEffect && (
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 bg-grape-punch text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] whitespace-nowrap"
          >
            Lv.{level}!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 기본 시바견 및 캐릭터 이미지 경로를 반환하는 유틸리티
 * 서버 컴포넌트에서 <img> 태그로 직접 사용할 때 활용
 * ※ 옷장 시스템 도입 후, 아이템 미착용 시 항상 기본 이미지만 표시
 */
export function getShibaMascotSrc(_level?: number, characterId?: string): string {
  if (characterId && CHARACTER_BASES[characterId]) {
    return CHARACTER_BASES[characterId];
  }
  return CHARACTER_BASES.shiba;
}
