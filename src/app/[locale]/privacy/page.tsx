import type { Metadata } from "next";
import PrivacyPage from "@/widgets/pages/PrivacyPage/PrivacyPage";
import { Locale } from "@/shared/lib/i18n/routing";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type PrivacyRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/privacy",
    title: isRu ? "Политика конфиденциальности" : "Privacy policy",
    description: isRu
      ? "Как сервис обрабатывает, хранит и защищает пользовательские данные."
      : "How the service processes, stores, and protects user data.",
  });
}

export default async function PrivacyRoute({ params }: PrivacyRouteProps) {
  const { locale } = await params;
  return <PrivacyPage locale={locale as Locale} />;
}
