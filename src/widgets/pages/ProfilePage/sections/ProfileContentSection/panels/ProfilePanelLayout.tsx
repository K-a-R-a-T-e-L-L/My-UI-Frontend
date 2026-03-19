import { Paper, Stack, Title } from "@mantine/core";
import { ReactNode } from "react";
import styles from "../ProfileContentSection.module.css";

interface ProfilePanelLayoutProps {
  children: ReactNode;
  title: string;
}

const ProfilePanelLayout: React.FC<ProfilePanelLayoutProps> = ({ children, title }) => {
  return (
    <Paper p="lg" radius="xl" className={styles.content_paper}>
      <Stack gap="md">
        <Title fz={{ base: 36, md: 64 }}>{title}</Title>
        {children}
      </Stack>
    </Paper>
  );
};

export default ProfilePanelLayout;
