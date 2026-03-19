"use client";

import { createContext, ReactNode, useContext } from "react";
import { CurrentUser } from "./current-user.types";

const CurrentUserContext = createContext<CurrentUser>(null);

export const CurrentUserProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: CurrentUser;
}) => {
  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

export const useCurrentUser = () => useContext(CurrentUserContext);
