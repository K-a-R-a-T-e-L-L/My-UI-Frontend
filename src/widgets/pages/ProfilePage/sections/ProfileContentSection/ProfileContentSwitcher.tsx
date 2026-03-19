"use client";

import { Paper, Stack } from "@mantine/core";
import { ReactNode, useState } from "react";
import styles from "./ProfileContentSection.module.css";
import ProfileContentTabs from "./ProfileContentTabs";

export type ProfileTabKey = "my-templates" | "favorites" | "requests" | "settings";

interface ProfileContentSwitcherProps {
  templatesPanel: ReactNode;
  favoritesPanel: ReactNode;
  requestsPanel: ReactNode;
  settingsPanel: ReactNode;
}

const ProfileContentSwitcher: React.FC<ProfileContentSwitcherProps> = ({
  favoritesPanel,
  requestsPanel,
  settingsPanel,
  templatesPanel,
}) => {
  const [view, setView] = useState<ProfileTabKey>("my-templates");

  return (
    <Stack w="100%">
      <Paper p="sm" radius="lg" className={styles.switcher_paper}>
        <div className={styles.switcher_scroll}>
          <ProfileContentTabs value={view} onChange={setView} />
        </div>
      </Paper>

      {view === "my-templates" && templatesPanel}
      {view === "favorites" && favoritesPanel}
      {view === "requests" && requestsPanel}
      {view === "settings" && settingsPanel}
    </Stack>
  );
};

export default ProfileContentSwitcher;
