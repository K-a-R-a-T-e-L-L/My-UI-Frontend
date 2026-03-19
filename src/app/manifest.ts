import type { MetadataRoute } from "next";
import { routing } from "@/shared/lib/i18n/routing";
import { buildLocalizedManifest } from "@/shared/lib/seo/manifest";

export default function manifest(): MetadataRoute.Manifest {
  return buildLocalizedManifest(routing.defaultLocale);
}
