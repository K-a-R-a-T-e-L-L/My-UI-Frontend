"use client";

import { Button, Group, SegmentedControl, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconClipboardList, IconSettings, IconStar, IconTemplate } from "@tabler/icons-react";
import styles from "./ProfileContentSection.module.css";
import type { ProfileTabKey } from "./ProfileContentSwitcher";

interface ProfileContentTabsProps {
  value: ProfileTabKey;
  onChange: (value: ProfileTabKey) => void;
}

const tabs = [
  { value: "my-templates" as const, label: "Мои шаблоны", icon: IconTemplate },
  { value: "favorites" as const, label: "Избранное", icon: IconStar },
  { value: "requests" as const, label: "Заявки", icon: IconClipboardList },
  { value: "settings" as const, label: "Настройки", icon: IconSettings },
];

const ProfileContentTabs: React.FC<ProfileContentTabsProps> = ({ value, onChange }) => {
  const isCompact = useMediaQuery("(max-width: 650px)");

  if (isCompact) {
    return (
      <SimpleGrid cols={2} spacing={8} className={styles.switcher_grid}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = value === tab.value;

          return (
            <Button
              key={tab.value}
              variant={active ? "filled" : "subtle"}
              radius="md"
              className={`${styles.switcher_grid_button} ${active ? styles.switcher_grid_button_active : ""}`}
              leftSection={<Icon size={16} />}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </Button>
          );
        })}
      </SimpleGrid>
    );
  }

  return (
    <SegmentedControl
      size="md"
      radius="md"
      fullWidth
      value={value}
      onChange={(nextValue) => onChange(nextValue as ProfileTabKey)}
      data={tabs.map((tab) => {
        const Icon = tab.icon;

        return {
          value: tab.value,
          label: (
            <Group justify="center" gap={6} wrap="nowrap">
              <Icon size={16} />
              <span>{tab.label}</span>
            </Group>
          ),
        };
      })}
      className={styles.switcher}
    />
  );
};

export default ProfileContentTabs;
