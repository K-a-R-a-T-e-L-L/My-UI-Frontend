"use client";

import { Button, Group, Loader, Stack, Text } from "@mantine/core";
import { IconBrandTelegram, IconCheck, IconRefresh } from "@tabler/icons-react";

type ChallengeStatus = "idle" | "pending" | "confirmed" | "expired" | "consumed" | "rejected";

interface TelegramRegistrationModeProps {
  botUrl: string | null;
  challengeId: string | null;
  status: ChallengeStatus;
  error: string | null;
  isRefreshing: boolean;
  isStarting: boolean;
  isCompleting: boolean;
  onStart: () => void;
}

const TelegramRegistrationMode = ({
  botUrl,
  challengeId,
  status,
  error,
  isRefreshing,
  isStarting,
  isCompleting,
  onStart,
}: TelegramRegistrationModeProps) => {
  return (
    <Stack gap="sm" w="100%">
      <Group w="100%" wrap="wrap" gap="xs">
        <Button
          onClick={onStart}
          leftSection={<IconBrandTelegram size={18} />}
          variant="gradient"
          gradient={{
            from: "var(--mantine-color-brandSecondaryB-4)",
            to: "var(--mantine-color-brandSecondaryA-4)",
          }}
          size="md"
          radius="xl"
          loading={isStarting}
          disabled={isRefreshing}
          fullWidth
          style={{ height: "auto", minHeight: 42 }}
          styles={{ label: { whiteSpace: "normal", textAlign: "center", lineHeight: 1.2 } }}
        >
          Зарегистрироваться через Telegram
        </Button>

        {botUrl && (
          <Button
            component="a"
            href={botUrl}
            target="_blank"
            rel="noreferrer"
            variant="light"
            leftSection={<IconRefresh size={16} />}
            fullWidth
          >
            Открыть бота снова
          </Button>
        )}
      </Group>

      {challengeId && (
        <Stack gap={6}>
          {status === "pending" && (
            <Text size="sm" c="dimmed">
              Ожидаем подтверждения в Telegram. Нажмите <Text span fw={700}>/start</Text> в боте.
            </Text>
          )}

          {status === "expired" && (
            <Text size="sm" c="red">
              Время подтверждения истекло. Запустите вход снова.
            </Text>
          )}

          {status === "rejected" && (
            <Text size="sm" c="red">
              Регистрация отклонена. Используйте вход по username и коду.
            </Text>
          )}

          {isCompleting && (
            <Group gap={6}>
              <Loader size="xs" />
              <Text size="sm">Завершаем вход...</Text>
            </Group>
          )}

          {status === "confirmed" && !isCompleting && (
            <Group gap={6}>
              <IconCheck size={16} />
              <Text size="sm">Подтверждено. Обновляем профиль...</Text>
            </Group>
          )}
        </Stack>
      )}

      {error && (
        <Text c="red" size="sm">
          {error}
        </Text>
      )}
    </Stack>
  );
};

export default TelegramRegistrationMode;
