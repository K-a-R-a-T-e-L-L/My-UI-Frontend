import { Box, Button, Container, Group, Stack, Text } from "@mantine/core";
import { getLocale, getTranslations } from "next-intl/server";
import { IconLogin2, IconMail, IconUser } from "@tabler/icons-react";
import styles from "./Footer.module.css";
import { routing } from "@/shared/lib/i18n/routing";
import LogoTitle from "@/shared/ui/LogoTitle/LogoTitle";
import { getCurrentUserServer } from "@/shared/lib/auth/get-current-user.server";
import { Link } from "@/shared/lib/i18n/navigation";
import FooterLinksGroup from "./FooterLinksGroup";
import FooterBottomRow from "./FooterBottomRow";
import { FooterLinkItem, FooterLocale } from "./footer.types";

const buildSupportBotUrl = () => {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME?.trim();
  if (username) {
    const clean = username.replace(/^@+/, "");
    return `https://t.me/${clean}?start=support`;
  }

  return "https://t.me";
};

const buildNavigationLinks = (
  t: Awaited<ReturnType<typeof getTranslations>>,
): FooterLinkItem[] => [
  { href: "/", label: t("navigation.home"), exact: true },
  { href: "/templates", label: t("navigation.templates") },
  { href: "/offers", label: t("navigation.offers") },
  { href: "/profile", label: t("navigation.profile") },
];

const buildResourcesLinks = (
  t: Awaited<ReturnType<typeof getTranslations>>,
  telegramSupportUrl: string,
): FooterLinkItem[] => [
  { href: "/faq", label: t("resources.faq") },
  { href: "/sitemap", label: t("resources.sitemap") },
  { href: telegramSupportUrl, label: "Обратная связь", external: true },
];

const Footer = async () => {
  const locale = ((await getLocale().catch(() => routing.defaultLocale)) ??
    routing.defaultLocale) as FooterLocale;
  const t = await getTranslations({ locale, namespace: "Footer" });
  const currentUser = await getCurrentUserServer();
  const year = new Date().getFullYear();
  const telegramSupportUrl = buildSupportBotUrl();
  const navigationLinks = buildNavigationLinks(t);
  const resourcesLinks = buildResourcesLinks(t, telegramSupportUrl);

  const profileCtaLabel = currentUser
    ? locale === "ru"
      ? "Перейти в профиль"
      : "Open profile"
    : locale === "ru"
      ? "Авторизоваться"
      : "Sign in";

  return (
    <Box component="footer" className={styles.footer} px={16}>
      <Container size="xl" className={styles.container}>
        <div className={styles.grid}>
          <Stack gap={10}>
            <Link href="/" locale={locale} style={{ textDecoration: "none" }}>
              <LogoTitle t={t} />
            </Link>
            <Text className={styles.description}>{t("description")}</Text>
            <Link
              href="/profile"
              locale={locale}
              style={{ textDecoration: "none" }}
            >
              <Button
                leftSection={
                  currentUser ? (
                    <IconUser size={16} />
                  ) : (
                    <IconLogin2 size={16} />
                  )
                }
                variant="gradient"
                gradient={{
                  from: "brandSecondaryB.5",
                  to: "brandPrimary.5",
                  deg: 120,
                }}
                radius="md"
                className={styles.cta}
              >
                {profileCtaLabel}
              </Button>
            </Link>
          </Stack>

          <FooterLinksGroup
            title={t("navigation.title")}
            locale={locale}
            items={navigationLinks}
          />

          <Stack gap={8}>
            <FooterLinksGroup
              title={t("resources.title")}
              locale={locale}
              items={resourcesLinks}
            />
            <a href="mailto:support@my-ui.dev" className={styles.link}>
              <Group gap={6} wrap="nowrap">
                <IconMail size={14} />
                <span>support@my-ui.dev</span>
              </Group>
            </a>
          </Stack>
        </div>

        <FooterBottomRow
          locale={locale}
          year={year}
          brand={t("brand")}
          rights={t("rights")}
          privacyLabel={t("legal.privacy")}
          termsLabel={t("legal.terms")}
        />
      </Container>
    </Box>
  );
};

export default Footer;
