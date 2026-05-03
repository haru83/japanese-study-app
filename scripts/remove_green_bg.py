#!/usr/bin/env python3
"""
크로마키 초록색 배경 제거 스크립트 v2
- RGB 거리 기반으로 #00FF00 근처 픽셀을 투명하게 만듦
- 안티앨리어싱 경계를 부드럽게 블렌딩
- 초록색 스플릿(번짐) 보정
"""

import sys
import os
import numpy as np
from PIL import Image, ImageFilter
from pathlib import Path


# 기준 초록색: 생성된 이미지의 실제 배경색
GREEN_REF = np.array([5, 247, 5], dtype=np.float32)


def remove_green_chroma_key(
    input_path: str,
    output_path: str,
    threshold: float = 120.0,       # 초록색과의 RGB 거리 임계값 (이하면 투명)
    edge_smooth: float = 30.0,      # 경계 블렌딩 폭 (부드러운 안티앨리어싱)
    blur_radius: int = 2,           # 최종 알파 블러 반경
    despill_strength: float = 0.5,  # 초록색 번짐 제거 강도
):
    """초록색 크로마키 배경 제거 → 투명 PNG"""
    
    img = Image.open(input_path).convert("RGBA")
    pixels = np.array(img, dtype=np.float32)
    h, w = pixels.shape[:2]
    rgb = pixels[:, :, :3].copy()
    
    # ── 1. 초록색과의 RGB 유클리드 거리 ──
    diff = rgb - GREEN_REF
    dist = np.sqrt((diff ** 2).sum(axis=2))
    
    # ── 2. 알파 마스크 계산 ──
    # 거리 < threshold → 완전 투명 (0)
    # 거리 > threshold + edge_smooth → 완전 불투명 (255)
    # 그 사이 → 선형 블렌딩
    alpha = np.clip(
        (dist - threshold) / edge_smooth * 255.0,
        0, 255
    )
    
    # ── 3. 초록색 스플릿 제거 ──
    # 초록성분이 R,B보다 지나치게 많은 반투명 픽셀에서 G 채널 감소
    if despill_strength > 0:
        green_excess = np.clip(rgb[:,:,1] - np.maximum(rgb[:,:,0], rgb[:,:,2]) - 10, 0, 255)
        # 스플릿 보정: 초록 과잉분의 일부를 R과 B의 평균으로 대체
        spill_mask = green_excess > 0
        target_g = np.maximum(rgb[:,:,0], rgb[:,:,2]) + 10
        rgb[spill_mask, 1] = (
            rgb[spill_mask, 1] * (1 - despill_strength) +
            target_g[spill_mask] * despill_strength
        )
    
    # ── 4. 알파 블러 (가장자리 부드럽게) ──
    if blur_radius > 0:
        alpha_img = Image.fromarray(alpha.astype(np.uint8), mode='L')
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=blur_radius))
        alpha = np.array(alpha_img, dtype=np.float32)
    
    # ── 5. 결과 조합 ──
    result = np.zeros((h, w, 4), dtype=np.uint8)
    result[:, :, :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    result[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)
    
    # 저장
    output_img = Image.fromarray(result, mode='RGBA')
    output_img.save(output_path, 'PNG')
    
    # 통계
    transparent_pct = (alpha < 128).sum() / (h * w) * 100
    print(f"✅ {os.path.basename(input_path)} → {os.path.basename(output_path)}")
    print(f"   투명 픽셀: {transparent_pct:.1f}% | 크기: {w}x{h}")
    
    return output_path


def batch_process(input_dir: str, output_dir: str, pattern: str = "*-green.png"):
    """입력 디렉토리의 모든 초록배경 이미지를 일괄 처리"""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    files = sorted(input_path.glob(pattern))
    if not files:
        print(f"❌ {input_dir}/{pattern} 에 해당하는 파일이 없습니다")
        return
    
    print(f"🎨 크로마키 배경 제거 v2 — {len(files)}개 파일 처리\n")
    
    for f in files:
        out_name = f.name.replace("-green.png", ".png")
        out_file = output_path / out_name
        remove_green_chroma_key(str(f), str(out_file))
    
    print(f"\n🎉 완료! {len(files)}개 오버레이 PNG 생성됨 → {output_dir}")


if __name__ == "__main__":
    if len(sys.argv) == 3:
        remove_green_chroma_key(sys.argv[1], sys.argv[2])
    else:
        batch_process("/tmp/shiba-overlays", "/tmp/shiba-overlays/final")
