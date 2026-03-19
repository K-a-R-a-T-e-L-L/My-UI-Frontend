"use client";

import { useSyncExternalStore } from "react";
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  lightLabel: string;
  darkLabel: string;
};

const emptySubscribe = () => () => {};

const ThemeToggle = ({ lightLabel, darkLabel }: ThemeToggleProps) => {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
  const isDark = colorScheme === "dark";

  if (!mounted) {
    return (
      <ActionIcon
        className={styles.root}
        variant="subtle"
        color="brandPrimary"
        aria-label={darkLabel}
        disabled
      >
        <IconMoonStars size={18} />
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      className={`${styles.root} ${isDark ? styles.dark : styles.light}`}
      variant="gradient"
      gradient={isDark ? { from: "brandSecondaryB.6", to: "brandPrimary.6", deg: 120 } : { from: "brandSecondaryA.5", to: "brandPrimary.5", deg: 120 }}
      aria-label={isDark ? lightLabel : darkLabel}
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <IconSunHigh size={18} className={styles.icon} />
      ) : (
        <IconMoonStars size={18} className={styles.icon} />
      )}
    </ActionIcon>
  );
};

export default ThemeToggle;