import type { MetadataRoute } from "next";
import type { Locale } from "@/shared/lib/i18n/routing";

type ManifestContent = {
  name: string;
  shortName: string;
  description: string;
};

const contentByLocale: Record<Locale, ManifestContent> = {
  ru: {
    name: "My UI - Платформа UI-шаблонов",
    shortName: "My UI",
    description: "Платформа для публикации и поиска UI-шаблонов.",
  },
  en: {
    name: "My UI - UI Templates Platform",
    shortName: "My UI",
    description: "A platform for publishing and discovering UI templates.",
  },
};

export const buildLocalizedManifest = (locale: Locale): MetadataRoute.Manifest => {
  const localized = contentByLocale[locale];

  return {
    name: localized.name,
    short_name: localized.shortName,
    description: localized.description,
    start_url: `/${locale}`,
    scope: `/${locale}`,
    display: "standalone",
    background_color: "#0a0717",
    theme_color: "#6d5dfc",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
};
