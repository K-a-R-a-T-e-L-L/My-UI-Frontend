import type { Metadata } from "next";
import OffersPage from "@/widgets/pages/OffersPage/OffersPage";
import { Locale } from "@/shared/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getMyOfferHistoryPageServer } from "@/widgets/pages/OffersPage/model/offers.server";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type LocaleOffersPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ requestsPage?: string }>;
};

export async function generateMetadata({ params }: LocaleOffersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/offers",
    title: isRu ? "Предложения шаблонов" : "Template offers",
    description: isRu
      ? "Отправляйте свои UI-шаблоны и отслеживайте статус заявок."
      : "Submit your UI templates and track review requests.",
  });
}

export default async function LocaleOffersPage({
  params,
  searchParams,
}: LocaleOffersPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPageRaw = Number(resolvedSearchParams.requestsPage ?? 1);
  const currentPage = Number.isFinite(currentPageRaw) && currentPageRaw > 0 ? currentPageRaw : 1;
  const t = await getTranslations({ locale, namespace: "OffersPage" });
  const historyData = await getMyOfferHistoryPageServer(currentPage, 12);

  return (
    <OffersPage
      locale={locale as Locale}
      t={t}
      historyTemplates={historyData.items}
      historyCurrentPage={historyData.page}
      historyTotalPages={historyData.totalPages}
    />
  );
}

