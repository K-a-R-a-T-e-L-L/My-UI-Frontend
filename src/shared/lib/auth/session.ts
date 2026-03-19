export const ACCESS_TOKEN_KEY = "access_token";

export const setAccessSession = (_accessToken: string) => {
  // access_token хранится только в httpOnly cookie, выставляемой бэкендом
};

export const clearAccessSession = () => {
  // очистка сессии выполняется через /auth/logout + очистку cookie на бэкенде
};
