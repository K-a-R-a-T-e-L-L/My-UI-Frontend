import type { MetadataRoute } from "next";
import { getTemplates } from "@/shared/api/generated/clients";
import { routing } from "@/shared/lib/i18n/routing";
import { getSiteUrl } from "@/shared/lib/seo/metadata";

const staticPaths = ["/", "/offers", "/templates", "/privacy", "/terms", "/faq", "/sitemap"] as const;

type TemplateLike = {
  id?: string;
  updatedAt?: string;
};

async function getPublishedTemplateEntries() {
  try {
    const payload = (await getTemplates({
      params: { page: 1, limit: 500, sort: "newest" },
    })) as { items?: TemplateLike[] };

    return (payload.items ?? [])
      .filter((item): item is Required<Pick<TemplateLike, "id">> & TemplateLike => Boolean(item?.id))
      .map((item) => ({
        id: item.id,
        updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const templates = await getPublishedTemplateEntries();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : 0.7,
    }))
  );

  const templateEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    templates.map((template) => ({
      url: `${siteUrl}/${locale}/templates/${template.id}`,
      lastModified: template.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...templateEntries];
}
