import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/shared/lib/i18n/routing";
import { buildLocalizedManifest } from "@/shared/lib/seo/manifest";

type LocaleManifestProps = {
  params: Promise<{ locale: string }>;
};

export default async function manifest({ params }: LocaleManifestProps): Promise<MetadataRoute.Manifest> {
  const { locale } = await params;
  const normalizedLocale: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return buildLocalizedManifest(normalizedLocale);
}
