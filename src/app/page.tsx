import { redirect } from "next/navigation";
import { routing } from "../shared/lib/i18n/routing";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}