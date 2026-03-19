import type { Metadata } from "next";

const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = () =>
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

const withLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

export const buildLocalizedMetadata = (params: {
  locale: "ru" | "en";
  path: string;
  title: string;
  description: string;
}): Metadata => {
  const { locale, path, title, description } = params;
  const siteUrl = getSiteUrl();
  const normalizedPath = withLeadingSlash(path);

  const ruPath = `/ru${normalizedPath === "/" ? "" : normalizedPath}`;
  const enPath = `/en${normalizedPath === "/" ? "" : normalizedPath}`;
  const canonicalPath = locale === "ru" ? ruPath : enPath;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages: {
        ru: `${siteUrl}${ruPath}`,
        en: `${siteUrl}${enPath}`,
        "x-default": `${siteUrl}${ruPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "My UI",
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

