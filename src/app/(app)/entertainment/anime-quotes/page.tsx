import { getBookmarkMap } from "@/actions/bookmark";
import { AnimeQuotesClient } from "@/components/entertainment/AnimeQuotesClient";

export const metadata = {
  title: "애니 톤 일본어 | 하루83",
  description: "만화·애니 캐릭터 페르소나별 실전 말투와 핵심 문법 학습",
};

export default async function AnimeQuotesPage() {
  const bookmarkMap = await getBookmarkMap();

  return <AnimeQuotesClient initialBookmarkMap={bookmarkMap} />;
}
