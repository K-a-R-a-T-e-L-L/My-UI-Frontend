import type { Metadata } from "next";
import SitemapPage from "@/widgets/pages/SitemapPage/SitemapPage";
import { Locale } from "@/shared/lib/i18n/routing";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type SitemapRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SitemapRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/sitemap",
    title: isRu ? "Карта сайта" : "Sitemap",
    description: isRu
      ? "Навигация по основным разделам платформы."
      : "Navigation across the main sections of the platform.",
  });
}

export default async function SitemapRoute({ params }: SitemapRouteProps) {
  const { locale } = await params;
  return <SitemapPage locale={locale as Locale} />;
}

