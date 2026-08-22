import { getBookmarkMap } from "@/actions/bookmark";
import { ConfusingGrammarClient } from "@/components/learning/ConfusingGrammarClient";

export default async function ConfusingGrammarPage() {
  const bookmarkMap = await getBookmarkMap();

  return <ConfusingGrammarClient initialBookmarkMap={bookmarkMap} />;
}
