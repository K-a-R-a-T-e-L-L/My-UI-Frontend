"use client";

import { Group, Loader, Paper, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import styles from "./ProfileGuestSection.module.css";
import UsernameLoginMode from "./UsernameLoginMode";
import TelegramRegistrationMode from "./TelegramRegistrationMode";
import { AuthMode, useProfileGuestAuth } from "./useProfileGuestAuth";

const ProfileGuestSection = () => {
  const {
    mode,
    setMode,
    onlyLoginMode,
    isRefreshing,
    username,
    setUsername,
    loginCode,
    setLoginCode,
    usernameChallengeId,
    usernameError,
    resendCooldownSec,
    tgBotUrl,
    tgChallengeId,
    tgStatus,
    tgError,
    startUsernameLoginMutation,
    completeUsernameLoginMutation,
    startTelegramLoginMutation,
    completeTelegramLoginMutation,
    handleStartUsernameLogin,
    handleCompleteUsernameLogin,
    handleStartTelegram,
  } = useProfileGuestAuth();

  return (
    <Section ariaLabelledby="profile-guest-title">
      <NumberSection tilt="left" number="01" />
      <Paper p="xl" radius="xl" className={styles.card}>
        <Stack gap="md" align="flex-start" w="100%">
          <Title id="profile-guest-title" order={2} fz={{ base: 30, md: 64 }} lh={1.05}>
            Профиль
          </Title>

          <Text c="dimmed" fz={{ base: 14, md: 20 }}>
            Войдите в профиль: если аккаунт уже есть, используйте username и код из Telegram. Если
            нет, зарегистрируйтесь через Telegram.
          </Text>

          {onlyLoginMode ? (
            <Text size="sm" c="dimmed">
              Для этого устройства доступен только вход в существующий аккаунт.
            </Text>
          ) : (
            <SegmentedControl
              fullWidth
              size="sm"
              value={mode}
              onChange={(value) => setMode(value as AuthMode)}
              data={[
                { value: "telegram", label: "Регистрация" },
                { value: "username", label: "Вход" },
              ]}
            />
          )}

          {isRefreshing && (
            <Group gap={6}>
              <Loader size="xs" />
              <Text size="sm">Проверяем существующую сессию...</Text>
            </Group>
          )}

          {mode === "username" || onlyLoginMode ? (
            <UsernameLoginMode
              username={username}
              onUsernameChange={setUsername}
              loginCode={loginCode}
              onLoginCodeChange={setLoginCode}
              usernameChallengeId={usernameChallengeId}
              usernameError={usernameError}
              resendCooldownSec={resendCooldownSec}
              isRefreshing={isRefreshing}
              isStarting={startUsernameLoginMutation.isPending}
              isCompleting={completeUsernameLoginMutation.isPending}
              onStart={() => void handleStartUsernameLogin()}
              onComplete={() => void handleCompleteUsernameLogin()}
            />
          ) : (
            <TelegramRegistrationMode
              botUrl={tgBotUrl}
              challengeId={tgChallengeId}
              status={tgStatus}
              error={tgError}
              isRefreshing={isRefreshing}
              isStarting={startTelegramLoginMutation.isPending}
              isCompleting={completeTelegramLoginMutation.isPending}
              onStart={() => void handleStartTelegram()}
            />
          )}
        </Stack>
      </Paper>
    </Section>
  );
};

export default ProfileGuestSection;

