"use client";

import { Breadcrumbs, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "../../../shared/lib/i18n/navigation";
import { Locale } from "../../../shared/lib/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useGetTemplateById } from "@/shared/api/generated";

const segmentToKey: Record<
  string,
  "templates" | "offers" | "profile" | "faq" | "privacy" | "terms" | "sitemap"
> = {
  templates: "templates",
  offers: "offers",
  profile: "profile",
  faq: "faq",
  privacy: "privacy",
  terms: "terms",
  sitemap: "sitemap",
};

const AppBreadcrumbs = () => {
  const t = useTranslations("Breadcrumbs");
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);
  const isTemplateDetails = segments[0] === "templates" && Boolean(segments[1]);
  const templateId = isTemplateDetails ? segments[1] : "";
  const templateTitleFromUrl = searchParams.get("title")?.trim() ?? "";

  const { data: templateData } = useGetTemplateById(templateId, {
    query: {
      enabled: isTemplateDetails && !templateTitleFromUrl,
      staleTime: 60_000,
    },
  });

  const resolvedTemplateTitle = templateTitleFromUrl || templateData?.name || "";

  const items = [
    {
      href: "/",
      label: t("home"),
      current: segments.length === 0,
    },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      const labelKey = segmentToKey[segment];
      const isTemplateIdSegment = segments[0] === "templates" && index === 1;

      return {
        href,
        label: isTemplateIdSegment && resolvedTemplateTitle
          ? resolvedTemplateTitle
          : labelKey
            ? t(`segments.${labelKey}`)
            : segment,
        current: isLast,
      };
    }),
  ];

  return (
    <Breadcrumbs mt='lg' separator=">" separatorMargin="sm">
      {items.map((item) =>
        item.current ? (
          <Text key={item.href} c="dimmed" pt="4" size="sm" fw={500}>
            {item.label}
          </Text>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            locale={locale}
            style={{ fontSize: "0.875rem" }}
          >
            {item.label}
          </Link>
        ),
      )}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
