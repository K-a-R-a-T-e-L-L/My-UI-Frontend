"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { CurrentUser } from "@/shared/lib/auth/current-user.types";
import { CurrentUserProvider } from "@/shared/lib/auth/current-user.context";
import AuthSessionBootstrap from "@/shared/lib/auth/AuthSessionBootstrap";
import AuthGateLoader from "@/shared/ui/AuthGateLoader/AuthGateLoader";

const AppClientProviders = ({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: CurrentUser;
}) => {
  const [isAuthGatePending, setIsAuthGatePending] = useState(() => !currentUser);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    if (currentUser) {
      setIsAuthGatePending(false);
    }
  }, [currentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentUserProvider value={currentUser}>
        {isAuthGatePending ? <AuthGateLoader /> : children}
      </CurrentUserProvider>
      <AuthSessionBootstrap
        currentUser={currentUser}
        onInitialCheckResolved={() => setIsAuthGatePending(false)}
      />
    </QueryClientProvider>
  );
};

export default AppClientProviders;
