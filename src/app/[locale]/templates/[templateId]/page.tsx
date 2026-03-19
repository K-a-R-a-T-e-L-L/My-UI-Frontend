import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/shared/lib/i18n/routing";
import TemplateDetailsPage from "@/widgets/pages/TemplateDetailsPage/TemplateDetailsPage";
import { getTemplateDetailsServer } from "@/widgets/pages/TemplateDetailsPage/model/template-details.server";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type TemplateDetailsRouteProps = {
  params: Promise<{ locale: string; templateId: string }>;
};

export async function generateMetadata({
  params,
}: TemplateDetailsRouteProps): Promise<Metadata> {
  const { locale, templateId } = await params;
  const isRu = locale === "ru";
  const template = await getTemplateDetailsServer(templateId);

  if (!template) {
    return buildLocalizedMetadata({
      locale: isRu ? "ru" : "en",
      path: `/templates/${templateId}`,
      title: isRu ? "Шаблон не найден" : "Template not found",
      description: isRu
        ? "Запрашиваемый шаблон не найден."
        : "Requested template was not found.",
    });
  }

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: `/templates/${templateId}`,
    title: `${template.name} | My UI`,
    description: template.description.slice(0, 160),
  });
}

export default async function TemplateDetailsRoute({ params }: TemplateDetailsRouteProps) {
  const { locale, templateId } = await params;
  const template = await getTemplateDetailsServer(templateId);

  if (!template) {
    notFound();
  }

  return <TemplateDetailsPage template={template} locale={locale as Locale} />;
}

