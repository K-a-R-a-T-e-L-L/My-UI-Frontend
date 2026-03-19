"use client";

import { Button, Group, PinInput, Stack, Text, TextInput } from "@mantine/core";

interface UsernameLoginModeProps {
  username: string;
  onUsernameChange: (value: string) => void;
  loginCode: string;
  onLoginCodeChange: (value: string) => void;
  usernameChallengeId: string | null;
  usernameError: string | null;
  resendCooldownSec: number;
  isRefreshing: boolean;
  isStarting: boolean;
  isCompleting: boolean;
  onStart: () => void;
  onComplete: () => void;
}

const UsernameLoginMode = ({
  username,
  onUsernameChange,
  loginCode,
  onLoginCodeChange,
  usernameChallengeId,
  usernameError,
  resendCooldownSec,
  isRefreshing,
  isStarting,
  isCompleting,
  onStart,
  onComplete,
}: UsernameLoginModeProps) => {
  const handlePasteCode = async () => {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return;
    }

    try {
      const raw = await navigator.clipboard.readText();
      onLoginCodeChange(raw.replace(/\D/g, "").slice(0, 6));
    } catch {
      // ignore clipboard permission errors
    }
  };

  return (
    <Stack w="100%" gap="sm">
      <TextInput
        label="Username в Telegram"
        placeholder="например: club_user"
        value={username}
        onChange={(event) => onUsernameChange(event.currentTarget.value)}
        disabled={isRefreshing}
      />

      <Group w="100%">
        <Button
          variant="gradient"
          gradient={{
            from: "var(--mantine-color-brandSecondaryB-4)",
            to: "var(--mantine-color-brandSecondaryA-4)",
          }}
          fullWidth
          onClick={onStart}
          loading={isStarting}
          disabled={isRefreshing || !username.trim() || resendCooldownSec > 0}
        >
          {resendCooldownSec > 0
            ? `Повторить через ${resendCooldownSec}с`
            : "Отправить код в Telegram"}
        </Button>
      </Group>

      {usernameChallengeId && (
        <>
          <Stack gap={6}>
            <Group justify="space-between" align="center" wrap="wrap" gap={6}>
              <Text size="sm" fw={500}>
                Код из Telegram
              </Text>
              <Button
                variant="subtle"
                size="compact-sm"
                onClick={() => void handlePasteCode()}
                disabled={isCompleting}
              >
                Вставить код
              </Button>
            </Group>
            <PinInput
              length={6}
              size="xs"
              type="number"
              inputMode="numeric"
              value={loginCode}
              onChange={(value) => onLoginCodeChange(value.replace(/\D/g, "").slice(0, 6))}
              onComplete={(value) => onLoginCodeChange(value.replace(/\D/g, "").slice(0, 6))}
              disabled={isCompleting}
              ariaLabel="Код подтверждения"
              oneTimeCode
            />
          </Stack>

          <Group w="100%">
            <Button
              fullWidth
              onClick={onComplete}
              loading={isCompleting}
              disabled={loginCode.length !== 6}
            >
              Войти
            </Button>
          </Group>
        </>
      )}

      {usernameError && (
        <Text c="red" size="sm">
          {usernameError}
        </Text>
      )}
    </Stack>
  );
};

export default UsernameLoginMode;
