"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRefresh } from "@/shared/api/generated/hooks/authController/useRefresh";
import { CurrentUser } from "./current-user.types";
import { clearAccessSession, setAccessSession } from "./session";

type AuthSessionBootstrapProps = {
  currentUser: CurrentUser;
  onInitialCheckResolved?: () => void;
};

const ACCESS_REFRESH_INTERVAL_MS = 4 * 60 * 1000;

const AuthSessionBootstrap = ({ currentUser, onInitialCheckResolved }: AuthSessionBootstrapProps) => {
  const router = useRouter();
  const refreshMutation = useRefresh();
  const didTryInitialRefresh = useRef(false);
  const didResolveInitialCheck = useRef(false);
  const isRefreshing = useRef(false);
  const currentUserRef = useRef(currentUser);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const resolveInitialCheck = () => {
    if (didResolveInitialCheck.current) {
      return;
    }

    didResolveInitialCheck.current = true;
    onInitialCheckResolved?.();
  };

  const runRefresh = async (isInitial: boolean) => {
    if (isRefreshing.current) {
      return;
    }

    isRefreshing.current = true;
    try {
      const data = await refreshMutation.mutateAsync();
      setAccessSession(data.accessToken);

      if (!currentUserRef.current) {
        router.refresh();
        return;
      }

      if (isInitial) {
        resolveInitialCheck();
      }
    } catch {
      clearAccessSession();

      if (currentUserRef.current) {
        router.refresh();
      }

      if (isInitial) {
        resolveInitialCheck();
      }
    } finally {
      isRefreshing.current = false;
    }
  };

  useEffect(() => {
    if (currentUser) {
      resolveInitialCheck();
      return;
    }

    if (didTryInitialRefresh.current) {
      return;
    }

    didTryInitialRefresh.current = true;
    void runRefresh(true);
  }, [currentUser, refreshMutation, router, onInitialCheckResolved]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void runRefresh(false);
    }, ACCESS_REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshMutation, router]);

  return null;
};

export default AuthSessionBootstrap;
