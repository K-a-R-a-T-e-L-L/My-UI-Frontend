import type { Metadata } from "next";
import TermsPage from "@/widgets/pages/TermsPage/TermsPage";
import { Locale } from "@/shared/lib/i18n/routing";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type TermsRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/terms",
    title: isRu ? "Условия использования" : "Terms of use",
    description: isRu
      ? "Правила публикации, использования контента и ответственности на платформе."
      : "Rules for publishing, using content, and liability on the platform.",
  });
}

export default async function TermsRoute({ params }: TermsRouteProps) {
  const { locale } = await params;
  return <TermsPage locale={locale as Locale} />;
}
