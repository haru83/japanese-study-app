import type { LearningDiary } from "@/types/learningDiary";
import { part1 } from "./ld_p1";
import { part2 } from "./ld_p2";
import { part3 } from "./ld_p3";
import { part4 } from "./ld_p4";
import { part5 } from "./ld_p5";
import { part6 } from "./ld_p6";
import { part7 } from "./ld_p7";
import { part8 } from "./ld_p8";
import { part9 } from "./ld_p9";
import { part10 } from "./ld_p10";

// Combine all 100 learning diary entries from 10 category parts
export const learningDiaries: LearningDiary[] = [
  ...part1,
  ...part2,
  ...part3,
  ...part4,
  ...part5,
  ...part6,
  ...part7,
  ...part8,
  ...part9,
  ...part10,
];
