import { redirect } from "next/navigation";

export default function LearnDiaryListPage() {
  redirect("/diary?tab=learn");
}
