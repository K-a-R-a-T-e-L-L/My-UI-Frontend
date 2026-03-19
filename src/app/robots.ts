import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ru/profile", "/en/profile"],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
