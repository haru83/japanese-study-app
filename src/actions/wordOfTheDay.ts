"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getWordOfTheDay() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return {
    id: "wotd-1",
    word: "頑張る",
    reading: "がんばる",
    meaning: "힘내다, 노력하다",
  };
}
