"use client";

import { useEffect, useState } from "react";
import { useTelegramGuestAuth } from "./useTelegramGuestAuth";
import { useUsernameGuestAuth } from "./useUsernameGuestAuth";

export type AuthMode = "username" | "telegram";

export const useProfileGuestAuth = () => {
  const [mode, setMode] = useState<AuthMode>("username");
  const [onlyLoginMode, setOnlyLoginMode] = useState(false);
  const telegramAuth = useTelegramGuestAuth();
  const usernameAuth = useUsernameGuestAuth();

  useEffect(() => {
    if (!telegramAuth.forceUsernameMode) {
      return;
    }

    setOnlyLoginMode(true);
    setMode("username");
  }, [telegramAuth.forceUsernameMode]);

  return {
    mode,
    setMode,
    onlyLoginMode,
    isRefreshing: false,
    ...telegramAuth,
    ...usernameAuth,
  };
};
