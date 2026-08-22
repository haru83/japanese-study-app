import { getBookmarkMap } from "@/actions/bookmark";
import { AnimeQuotesClient } from "@/components/entertainment/AnimeQuotesClient";

export const metadata = {
  title: "애니 명대사 일본어 | 하루83",
  description: "인기 애니메이션 명대사로 배우는 재미있는 일본어 회화 및 문법",
};

export default async function AnimeQuotesPage() {
  const bookmarkMap = await getBookmarkMap();

  return <AnimeQuotesClient initialBookmarkMap={bookmarkMap} />;
}
