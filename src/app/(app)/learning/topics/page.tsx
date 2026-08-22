import { getBookmarkMap } from "@/actions/bookmark";
import { TopicVocabClient } from "@/components/learning/TopicVocabClient";

export default async function TopicsPage() {
  const bookmarkMap = await getBookmarkMap();

  return <TopicVocabClient initialBookmarkMap={bookmarkMap} />;
}
