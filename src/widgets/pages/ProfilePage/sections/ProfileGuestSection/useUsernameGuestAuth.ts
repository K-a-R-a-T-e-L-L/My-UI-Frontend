"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessSession } from "@/shared/lib/auth/session";
import { useStartUsernameLogin } from "@/shared/api/generated/hooks/authController/useStartUsernameLogin";
import { useCompleteUsernameLogin } from "@/shared/api/generated/hooks/authController/useCompleteUsernameLogin";
import { getUserFriendlyErrorMessage } from "@/shared/lib/api/user-friendly-error";

export const useUsernameGuestAuth = () => {
  const [username, setUsername] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [usernameChallengeId, setUsernameChallengeId] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [resendCooldownSec, setResendCooldownSec] = useState(0);

  const router = useRouter();
  const startUsernameLoginMutation = useStartUsernameLogin();
  const completeUsernameLoginMutation = useCompleteUsernameLogin();

  useEffect(() => {
    if (resendCooldownSec <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setResendCooldownSec((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [resendCooldownSec]);

  const handleStartUsernameLogin = async () => {
    setUsernameError(null);

    try {
      const data = await startUsernameLoginMutation.mutateAsync({ data: { username } });
      setUsernameChallengeId(data.challengeId);
      setResendCooldownSec(60);
    } catch (error: unknown) {
      setUsernameError(
        getUserFriendlyErrorMessage(error, {
          fallback: "Не удалось отправить код. Попробуйте позже.",
          overrides: {
            404: "Пользователь не найден. Используйте вход через Telegram.",
            429: "Код уже отправлен. Повторите запрос через минуту.",
          },
        })
      );
    }
  };

  const handleCompleteUsernameLogin = async () => {
    if (!usernameChallengeId) {
      return;
    }

    setUsernameError(null);

    try {
      const data = await completeUsernameLoginMutation.mutateAsync({
        data: { challengeId: usernameChallengeId, code: loginCode },
      });
      setAccessSession(data.accessToken);
      router.refresh();
    } catch (error: unknown) {
      setUsernameError(
        getUserFriendlyErrorMessage(error, {
          fallback: "Неверный код или срок его действия истек.",
          overrides: {
            400: "Неверный код или срок его действия истек.",
            401: "Неверный код или срок его действия истек.",
          },
        })
      );
    }
  };

  return {
    username,
    setUsername,
    loginCode,
    setLoginCode,
    usernameChallengeId,
    usernameError,
    resendCooldownSec,
    startUsernameLoginMutation,
    completeUsernameLoginMutation,
    handleStartUsernameLogin,
    handleCompleteUsernameLogin,
  };
};
