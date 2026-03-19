import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../shared/lib/i18n/routing";
import HomePage from "../../widgets/pages/HomePage/HomePage";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/",
    title: isRu ? "My UI — Главная" : "My UI — Home",
    description: isRu
      ? "Подборка UI-шаблонов, фильтры, предложения и профиль автора."
      : "UI templates catalog with filters, offers and author profile.",
  });
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return <HomePage locale={locale as Locale} t={t} />;
}

