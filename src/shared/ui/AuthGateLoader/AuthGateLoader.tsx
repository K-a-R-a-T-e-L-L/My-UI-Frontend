"use client";

import { Loader, Paper, Stack, Text } from "@mantine/core";
import styles from "./AuthGateLoader.module.css";

const AuthGateLoader = () => {
  return (
    <div className={styles.root}>
      <Paper withBorder radius="xl" p="xl" className={styles.card}>
        <Stack align="center" gap="sm">
          <Loader size="md" />
          <Text fw={600}>Проверяем авторизацию</Text>
          <Text size="sm" c="dimmed">
            Подождите пару секунд...
          </Text>
        </Stack>
      </Paper>
    </div>
  );
};

export default AuthGateLoader;
