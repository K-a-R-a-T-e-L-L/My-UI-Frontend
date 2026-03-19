"use client";

import { Avatar, Burger, Drawer, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Locale } from "../../../shared/lib/i18n/routing";
import LanguageToggle from "@/shared/ui/LanguageToggle/LanguageToggle";
import ThemeToggle from "@/shared/ui/ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";
import LocaleNavLink from "@/shared/ui/LocaleNavLink/LocaleNavLink";

type MobileMenuProps = {
  locale: Locale;
  nav: {
    home: string;
    templates: string;
    offers: string;
    profile: string;
    profileAvatarUrl: string | null;
    profileAvatarName: string;
  };
  actions: {
    localeRu: string;
    localeEn: string;
    switchToLight: string;
    switchToDark: string;
    menuOpen: string;
    menuClose: string;
    menuTitle: string;
  };
};

const MobileMenu = ({ locale, nav, actions }: MobileMenuProps) => {
  const [opened, setOpened] = useState(false);

  const closeMenu = () => setOpened(false);

  return (
    <>
      <Burger
        opened={opened}
        onClick={() => setOpened((prev) => !prev)}
        aria-label={opened ? actions.menuClose : actions.menuOpen}
      />

      <Drawer
        opened={opened}
        onClose={closeMenu}
        position="right"
        padding="md"
        size="100%"
        title={actions.menuTitle}
      >
        <Stack gap="xl" py="sm">
          <nav aria-label={actions.menuTitle}>
            <Stack gap="md">
              <LocaleNavLink
                className={styles.mobile_link}
                activeClassName={styles.mobile_link_active}
                href="/"
                locale={locale}
                onClick={closeMenu}
                exact
              >
                {nav.home}
              </LocaleNavLink>
              <LocaleNavLink
                className={styles.mobile_link}
                activeClassName={styles.mobile_link_active}
                href="/templates"
                locale={locale}
                onClick={closeMenu}
              >
                {nav.templates}
              </LocaleNavLink>
              <LocaleNavLink
                className={styles.mobile_link}
                activeClassName={styles.mobile_link_active}
                href="/offers"
                locale={locale}
                onClick={closeMenu}
              >
                {nav.offers}
              </LocaleNavLink>
              <LocaleNavLink
                className={styles.mobile_link}
                activeClassName={styles.mobile_link_active}
                href="/profile"
                locale={locale}
                onClick={closeMenu}
              >
                {nav.profileAvatarUrl ? (
                  <Group gap={8} wrap="nowrap">
                    <Avatar src={nav.profileAvatarUrl} radius="xl" size={22} name={nav.profileAvatarName} />
                    <span>{nav.profile}</span>
                  </Group>
                ) : (
                  nav.profile
                )}
              </LocaleNavLink>
            </Stack>
          </nav>

          <Stack gap="md">
            <Text size="sm" c="dimmed">
              {actions.menuTitle}
            </Text>
            <LanguageToggle ruLabel={actions.localeRu} enLabel={actions.localeEn} />
            <ThemeToggle lightLabel={actions.switchToLight} darkLabel={actions.switchToDark} />
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default MobileMenu;
