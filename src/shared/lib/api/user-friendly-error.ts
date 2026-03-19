type ErrorOverrides = Partial<Record<number, string>>;

type UserFriendlyErrorOptions = {
  fallback?: string;
  overrides?: ErrorOverrides;
};

const DEFAULT_MESSAGES: Record<number, string> = {
  400: "Проверьте корректность введенных данных и попробуйте снова.",
  401: "Требуется авторизация. Войдите в аккаунт и повторите действие.",
  403: "Недостаточно прав для этого действия.",
  404: "Запрашиваемый ресурс не найден.",
  409: "Конфликт данных. Обновите страницу и повторите попытку.",
  413: "Файл слишком большой. Уменьшите размер и повторите загрузку.",
  415: "Неподдерживаемый формат файла.",
  422: "Некорректные данные. Проверьте поля формы.",
  429: "Слишком много запросов. Подождите немного и повторите попытку.",
  500: "Ошибка сервера. Попробуйте позже.",
  502: "Сервис временно недоступен. Попробуйте позже.",
  503: "Сервис временно недоступен. Попробуйте позже.",
  504: "Превышено время ожидания ответа сервера. Попробуйте позже.",
};

const extractStatus = (error: unknown): number | null => {
  if (typeof error === "object" && error !== null && "status" in error) {
    const value = (error as { status?: unknown }).status;
    if (typeof value === "number") {
      return value;
    }
  }

  return null;
};

export const getUserFriendlyErrorMessage = (
  error: unknown,
  options?: UserFriendlyErrorOptions
) => {
  const fallback =
    options?.fallback ?? "Что-то пошло не так. Попробуйте снова позже.";

  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Ошибка сети. Проверьте подключение и повторите попытку.";
  }

  const status = extractStatus(error);
  if (!status) {
    return fallback;
  }

  const messageFromOverrides = options?.overrides?.[status];
  if (messageFromOverrides) {
    return messageFromOverrides;
  }

  return DEFAULT_MESSAGES[status] ?? fallback;
};
