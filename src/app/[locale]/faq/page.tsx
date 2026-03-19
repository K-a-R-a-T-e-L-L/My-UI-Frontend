import type { Metadata } from "next";
import FaqPage from "@/widgets/pages/FaqPage/FaqPage";
import { Locale } from "@/shared/lib/i18n/routing";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type FaqRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FaqRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/faq",
    title: isRu ? "Частые вопросы" : "FAQ",
    description: isRu
      ? "Ответы на популярные вопросы о публикации и модерации шаблонов."
      : "Answers to common questions about template publishing and moderation.",
  });
}

export default async function FaqRoute({ params }: FaqRouteProps) {
  const { locale } = await params;
  return <FaqPage locale={locale as Locale} />;
}

