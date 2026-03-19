import { AppShellHeader, Avatar, Container, Group } from "@mantine/core";
import styles from "./Header.module.css";
import ThemeToggle from "@/shared/ui/ThemeToggle/ThemeToggle";
import LanguageToggle from "@/shared/ui/LanguageToggle/LanguageToggle";
import { Locale } from "../../../shared/lib/i18n/routing";
import { Link } from "../../../shared/lib/i18n/navigation";
import { getTranslations } from "next-intl/server";
import MobileMenu from "./MobileMenu";
import { getCurrentUserServer } from "@/shared/lib/auth/get-current-user.server";
import { resolveMediaUrl } from "@/shared/lib/api/resolve-media-url";
import LocaleNavLink from "@/shared/ui/LocaleNavLink/LocaleNavLink";
import LogoTitle from "@/shared/ui/LogoTitle/LogoTitle";

const Header = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations({ locale, namespace: "Header" });
  const currentUser = await getCurrentUserServer();

  const avatarUrl = resolveMediaUrl(currentUser?.avatarUrl);
  const displayName =
    currentUser?.firstname?.trim() || currentUser?.username || "Профиль";
  const profileLabel = currentUser ? displayName : "Войти через Telegram";

  return (
    <AppShellHeader component="header">
      <Container size="xl" h="100%">
        <Group h="100%" justify="space-between" align="center">
          <Link href="/" locale={locale} style={{ textDecoration: "none" }}>
            <LogoTitle t={t} />
          </Link>

          <div className={styles.desktop_nav}>
            <nav aria-label="Main navigation">
              <Group
                component="ul"
                gap="xl"
                m={0}
                p={0}
                style={{ listStyle: "none" }}
              >
                <li>
                  <LocaleNavLink
                    href="/"
                    locale={locale}
                    className={styles.list_item}
                    activeClassName={styles.list_item_active}
                    exact
                  >
                    {t("nav.home")}
                  </LocaleNavLink>
                </li>
                <li>
                  <LocaleNavLink
                    href="/templates"
                    locale={locale}
                    className={styles.list_item}
                    activeClassName={styles.list_item_active}
                  >
                    {t("nav.templates")}
                  </LocaleNavLink>
                </li>
                <li>
                  <LocaleNavLink
                    href="/offers"
                    locale={locale}
                    className={styles.list_item}
                    activeClassName={styles.list_item_active}
                  >
                    {t("nav.offers")}
                  </LocaleNavLink>
                </li>
                <li>
                  <LocaleNavLink
                    href="/profile"
                    locale={locale}
                    className={`${styles.list_item} ${styles.profile_link}`}
                    activeClassName={styles.list_item_active}
                  >
                    {currentUser ? (
                      <span className={styles.profile_inline}>
                        <Avatar
                          src={avatarUrl ?? undefined}
                          radius="xl"
                          size={24}
                          name={displayName}
                        />
                        <span className={styles.profile_text}>
                          {profileLabel}
                        </span>
                      </span>
                    ) : (
                      profileLabel
                    )}
                  </LocaleNavLink>
                </li>
                <li>
                  <LanguageToggle
                    ruLabel={t("actions.localeRu")}
                    enLabel={t("actions.localeEn")}
                  />
                </li>
                <li>
                  <ThemeToggle
                    lightLabel={t("actions.switchToLight")}
                    darkLabel={t("actions.switchToDark")}
                  />
                </li>
              </Group>
            </nav>
          </div>

          <div className={styles.mobile_nav}>
            <MobileMenu
              locale={locale}
              nav={{
                home: t("nav.home"),
                templates: t("nav.templates"),
                offers: t("nav.offers"),
                profile: profileLabel,
                profileAvatarUrl: currentUser ? (avatarUrl ?? null) : null,
                profileAvatarName: displayName,
              }}
              actions={{
                localeRu: t("actions.localeRu"),
                localeEn: t("actions.localeEn"),
                switchToLight: t("actions.switchToLight"),
                switchToDark: t("actions.switchToDark"),
                menuOpen: t("actions.menuOpen"),
                menuClose: t("actions.menuClose"),
                menuTitle: t("actions.menuTitle"),
              }}
            />
          </div>
        </Group>
      </Container>
    </AppShellHeader>
  );
};

export default Header;
