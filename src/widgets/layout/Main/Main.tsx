import { ReactNode } from "react";
import { AppShellMain, Container, Stack } from "@mantine/core";
import AppBreadcrumbs from "../../navigations/AppBreadcrumbs/AppBreadcrumbs";
import styles from './Main.module.css'

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <AppShellMain pos="relative" className={styles.main}>
      <Container size="xl" py="xl">
        <Stack m={0} p={0} gap="xl" w="100%">
          <AppBreadcrumbs />
          {children}
        </Stack>
      </Container>
    </AppShellMain>
  );
};

export default Main;