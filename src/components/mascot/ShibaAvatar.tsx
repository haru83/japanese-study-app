"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 레벨별 시바견 마스코트 기본 이미지 (아이템 미착용)
 */
const BASE_IMAGE = "/mascot/shiba-base.png";

/**
 * 아이템별 오버레이 이미지 매핑
 * 기본 시바견 위에 투명 PNG 레이어로 겹쳐서 착용 효과를 냅니다.
 * 오버레이 이미지가 없는 아이템은 레벨 이미지로 폴백합니다.
 */
const ITEM_OVERLAYS: Record<string, string> = {
  "hat-cap": "/mascot/overlay-hat-cap.png",
  "scarf": "/mascot/overlay-scarf.png",
  "hat-santa": "/mascot/overlay-hat-santa.png",
  "glasses": "/mascot/overlay-glasses.png",
  "crown": "/mascot/overlay-crown.png",
};

/**
 * 오버레이가 없는 아이템의 레벨 이미지 폴백 매핑
 * 오버레이 PNG가 아직 없을 때, 기존 레벨별 합성 이미지를 대신 사용
 */
const ITEM_LEVEL_FALLBACKS: Record<string, number> = {
  "hat-cap": 2,    // shiba-lv2-hachimaki.png
  "scarf": 3,      // shiba-lv3-scarf.png
  "glasses": 5,    // shiba-lv5-glasses.png
  "crown": 6,      // shiba-lv6-master.png
  "hat-santa": 2,  // closest visual: hachimaki
};

/**
 * 레벨별 합성 이미지 (오버레이 폴백용)
 */
const LEVEL_IMAGES: Record<number, string> = {
  1: "/mascot/shiba-base.png",
  2: "/mascot/shiba-lv2-hachimaki.png",
  3: "/mascot/shiba-lv3-scarf.png",
  4: "/mascot/shiba-lv4-kimono.png",
  5: "/mascot/shiba-lv5-glasses.png",
  6: "/mascot/shiba-lv6-master.png",
};

/**
 * 아이템별 z-index (위→아래: 머리 > 목 > 몸)
 * 높을수록 위에 렌더링됨
 */
const ITEM_Z_INDEX: Record<string, number> = {
  "crown": 30,
  "hat-cap": 25,
  "hat-santa": 25,
  "glasses": 20,
  "scarf": 15,
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
  /** 사용자 레벨 (1~6) */
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
 * 착용 아이템이 있는지, 오버레이 PNG가 존재하는지 판단
 * → 오버레이 모드: 기본 시바견 + 아이템 오버레이 레이어
 * → 폴백 모드: 기존 레벨 합성 이미지 (오버레이 PNG가 없을 때)
 */
function shouldUseOverlayMode(equippedItemIds?: string[]): boolean {
  if (!equippedItemIds || equippedItemIds.length === 0) return false;
  // 하나라도 오버레이가 있으면 오버레이 모드
  return equippedItemIds.some((id) => ITEM_OVERLAYS[id] && !missingOverlays.has(id));
}

function getFallbackLevelImage(level: number, equippedItemIds?: string[]): string {
  if (equippedItemIds && equippedItemIds.length > 0) {
    let maxLevel = 0;
    for (const itemId of equippedItemIds) {
      const fallback = ITEM_LEVEL_FALLBACKS[itemId];
      if (fallback && fallback > maxLevel) {
        maxLevel = fallback;
      }
    }
    if (maxLevel > 0) {
      return LEVEL_IMAGES[maxLevel] ?? LEVEL_IMAGES[1];
    }
  }
  const clampedLevel = Math.max(1, Math.min(6, level));
  return LEVEL_IMAGES[clampedLevel];
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────
export function ShibaAvatar({
  level = 1,
  equippedItemIds,
  className,
  size = 64,
  sticker = false,
  wobble,
  circular = false,
  triggerLevelUp,
}: ShibaAvatarProps) {
  const useOverlay = shouldUseOverlayMode(equippedItemIds);
  const src = useOverlay ? BASE_IMAGE : getFallbackLevelImage(level, equippedItemIds);
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
  const [imageKey, setImageKey] = useState(src + JSON.stringify(equippedItemIds));

  // 레벨업 이펙트 트리거
  useEffect(() => {
    if (isLevelUp) {
      setParticles(generateParticles(16));
      setShowLevelUpEffect(true);
      setImageKey(src + JSON.stringify(equippedItemIds));

      const timer = setTimeout(() => {
        setShowLevelUpEffect(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLevelUp, src, equippedItemIds]);

  // 착용 변경 이펙트 (작은 바운스)
  useEffect(() => {
    if (isEquipChanged) {
      setShowEquipEffect(true);
      setImageKey(src + JSON.stringify(equippedItemIds));
      const timer = setTimeout(() => {
        setShowEquipEffect(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isEquipChanged, src, equippedItemIds]);

  // src나 equippedItemIds가 바뀌면 imageKey 갱신
  useEffect(() => {
    setImageKey(src + JSON.stringify(equippedItemIds));
  }, [src, equippedItemIds]);

  // 오버레이할 아이템 정렬 (z-index 낮→높은 순으로 렌더링)
  const overlayItems = (equippedItemIds ?? [])
    .filter((id) => ITEM_OVERLAYS[id] && !missingOverlays.has(id))
    .sort((a, b) => (ITEM_Z_INDEX[a] ?? 10) - (ITEM_Z_INDEX[b] ?? 10));

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
              alt={`시바견 마스코트 Lv.${level}`}
              width={size}
              height={size}
              className={clsx("object-contain", circular && "object-cover rounded-full")}
              priority={size >= 96}
              unoptimized
            />

            {/* 아이템 오버레이 레이어들 */}
            {useOverlay && overlayItems.map((itemId) => (
              <Image
                key={itemId}
                src={ITEM_OVERLAYS[itemId]}
                alt={itemId}
                width={size}
                height={size}
                className={clsx(
                  "absolute inset-0 object-contain pointer-events-none",
                  circular && "object-cover rounded-full"
                )}
                style={{ zIndex: ITEM_Z_INDEX[itemId] ?? 10 }}
                onError={() => handleOverlayError(itemId)}
                unoptimized
              />
            ))}
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
 * ShibaAvatar의 레벨에 해당하는 이미지 경로를 반환하는 유틸리티
 * 서버 컴포넌트에서 <img> 태그로 직접 사용할 때 활용
 */
export function getShibaMascotSrc(level: number): string {
  const clampedLevel = Math.max(1, Math.min(6, level));
  return LEVEL_IMAGES[clampedLevel];
}
