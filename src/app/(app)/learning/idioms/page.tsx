import { getBookmarkMap } from "@/actions/bookmark";
import { IdiomsClient } from "@/components/learning/IdiomsClient";

export default async function IdiomsPage() {
  const bookmarkMap = await getBookmarkMap();

  return <IdiomsClient initialBookmarkMap={bookmarkMap} />;
}
