import type { Lesson } from "@/types/lesson";
import { part1 } from "./keigo/part1";
import { kl_p2 } from "./keigo/kl_p2";
import { kl_p3 } from "./keigo/kl_p3";
import { kl_p4 } from "./keigo/kl_p4";
import { kl_p5 } from "./keigo/kl_p5";
import { kl_p6 } from "./keigo/kl_p6";
import { kl_p7 } from "./keigo/kl_p7";
import { kl_p8 } from "./keigo/kl_p8";
import { kl_p9 } from "./keigo/kl_p9";
import { kl_p10 } from "./keigo/kl_p10";
import { kl_p11 } from "./keigo/kl_p11";

export {
  part1,
  kl_p2,
  kl_p3,
  kl_p4,
  kl_p5,
  kl_p6,
  kl_p7,
  kl_p8,
  kl_p9,
  kl_p10,
  kl_p11,
};

export const lessons: Lesson[] = [
  ...part1,
  ...kl_p2,
  ...kl_p3,
  ...kl_p4,
  ...kl_p5,
  ...kl_p6,
  ...kl_p7,
  ...kl_p8,
  ...kl_p9,
  ...kl_p10,
  ...kl_p11,
];
