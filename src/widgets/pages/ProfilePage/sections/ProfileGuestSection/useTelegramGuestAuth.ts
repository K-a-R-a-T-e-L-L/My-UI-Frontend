"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessSession } from "@/shared/lib/auth/session";
import { useStartTelegramLogin } from "@/shared/api/generated/hooks/authController/useStartTelegramLogin";
import { useGetTelegramStatus } from "@/shared/api/generated/hooks/authController/useGetTelegramStatus";
import { useCompleteTelegramLogin } from "@/shared/api/generated/hooks/authController/useCompleteTelegramLogin";
import { getUserFriendlyErrorMessage } from "@/shared/lib/api/user-friendly-error";

export type ChallengeStatus = "idle" | "pending" | "confirmed" | "expired" | "consumed" | "rejected";

export const useTelegramGuestAuth = () => {
  const [tgChallengeId, setTgChallengeId] = useState<string | null>(null);
  const [tgBotUrl, setTgBotUrl] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<ChallengeStatus>("idle");
  const [tgError, setTgError] = useState<string | null>(null);
  const [hasStartedTelegramComplete, setHasStartedTelegramComplete] = useState(false);
  const [forceUsernameMode, setForceUsernameMode] = useState(false);

  const router = useRouter();
  const startTelegramLoginMutation = useStartTelegramLogin();
  const completeTelegramLoginMutation = useCompleteTelegramLogin();

  const isAwaitingTgConfirmation = useMemo(
    () => Boolean(tgChallengeId) && ["pending", "idle"].includes(pendingStatus),
    [tgChallengeId, pendingStatus]
  );

  const telegramStatusQuery = useGetTelegramStatus(tgChallengeId ?? "", {
    query: {
      enabled: isAwaitingTgConfirmation,
      refetchInterval: isAwaitingTgConfirmation ? 2500 : false,
      retry: false,
    },
  });

  const tgStatus = (telegramStatusQuery.data?.status as ChallengeStatus | undefined) ?? pendingStatus;
  const tgRejectReason = (telegramStatusQuery.data as { rejectReason?: string | null } | undefined)?.rejectReason ?? null;

  useEffect(() => {
    if (!telegramStatusQuery.data?.status) {
      return;
    }

    setPendingStatus(telegramStatusQuery.data.status as ChallengeStatus);
  }, [telegramStatusQuery.data?.status]);

  useEffect(() => {
    if (
      tgStatus === "confirmed" &&
      tgChallengeId &&
      !hasStartedTelegramComplete &&
      !completeTelegramLoginMutation.isPending
    ) {
      setHasStartedTelegramComplete(true);
      void completeTelegramLoginMutation
        .mutateAsync({ data: { challengeId: tgChallengeId } })
        .then((data) => {
          setAccessSession(data.accessToken);
          router.refresh();
        })
        .catch((error: unknown) => {
          setTgError(
            getUserFriendlyErrorMessage(error, {
              fallback: "Не удалось завершить вход. Попробуйте еще раз.",
            })
          );
          setHasStartedTelegramComplete(false);
        });
    }
  }, [tgStatus, tgChallengeId, hasStartedTelegramComplete, completeTelegramLoginMutation, router]);

  useEffect(() => {
    if (tgStatus !== "rejected") {
      return;
    }

    if (tgRejectReason === "account_exists") {
      setTgError("Этот Telegram уже зарегистрирован. Используйте вход по username и коду.");
      setForceUsernameMode(true);
      return;
    }

    setTgError("Регистрация отклонена. Попробуйте снова позже.");
  }, [tgStatus, tgRejectReason]);

  const handleStartTelegram = async () => {
    setTgError(null);

    try {
      const data = await startTelegramLoginMutation.mutateAsync();
      setTgChallengeId(data.challengeId);
      setTgBotUrl(data.botUrl);
      setPendingStatus("pending");
      setHasStartedTelegramComplete(false);
      window.open(data.botUrl, "_blank", "noopener,noreferrer");
    } catch (error: unknown) {
      setTgError(
        getUserFriendlyErrorMessage(error, {
          fallback: "Не удалось создать сессию входа. Попробуйте позже.",
        })
      );
    }
  };

  return {
    tgBotUrl,
    tgChallengeId,
    tgStatus,
    tgError,
    forceUsernameMode,
    startTelegramLoginMutation,
    completeTelegramLoginMutation,
    handleStartTelegram,
  };
};
