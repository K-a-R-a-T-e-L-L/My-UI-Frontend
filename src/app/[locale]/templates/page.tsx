import type { Metadata } from "next";
import TemplatesPage from "@/widgets/pages/TemplatesPage/TemplatesPage";
import { Locale } from "@/shared/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type TemplatesPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    templatesPage?: string;
    search?: string;
    categoryId?: string;
    sort?: "newest" | "oldest" | "likes";
    tags?: string;
    onlyFavorites?: string;
  }>;
};

export async function generateMetadata({ params }: TemplatesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/templates",
    title: isRu ? "Шаблоны интерфейсов" : "UI templates",
    description: isRu
      ? "Каталог UI-шаблонов с фильтрами, тегами и сортировкой."
      : "UI templates catalog with filters, tags and sorting.",
  });
}

export default async function LocaleTemplatesPage({
  params,
  searchParams,
}: TemplatesPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPageRaw = Number(resolvedSearchParams.templatesPage ?? 1);
  const currentPage = Number.isFinite(currentPageRaw) && currentPageRaw > 0 ? currentPageRaw : 1;

  const filters = {
    search: resolvedSearchParams.search?.trim() || undefined,
    categoryId: resolvedSearchParams.categoryId || undefined,
    sort: resolvedSearchParams.sort || undefined,
    tags: resolvedSearchParams.tags
      ? resolvedSearchParams.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : undefined,
    onlyFavorites: resolvedSearchParams.onlyFavorites === "true",
  } as const;

  const t = await getTranslations({ locale, namespace: "TemplatesPage" });

  return (
    <TemplatesPage
      locale={locale as Locale}
      t={t}
      currentPage={currentPage}
      filters={filters}
    />
  );
}

