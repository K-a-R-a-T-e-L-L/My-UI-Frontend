import { RequestCredentials } from "@kubb/plugin-client/clients/fetch";
import { API_BASE_URL } from "@/shared/lib/api/base-url";

export type RequestConfig<TData = unknown> = {
  baseURL?: string;
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE" | "OPTIONS";
  params?: unknown;
  data?: TData | FormData;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  signal?: AbortSignal;
  headers?: [string, string][] | Record<string, string>;
  credentials?: RequestCredentials;
  config?: { headers?: Record<string, string> };
  [key: string]: unknown;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
};

export type ResponseErrorConfig<TError = unknown> = {
  data: TError;
  status: number;
  statusText: string;
  headers: Headers;
};

export type Client = <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
) => Promise<ResponseConfig<TData>>;

export const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const headers = new Headers(config.headers || {});

  if (config.config?.headers) {
    Object.entries(config.config.headers).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  if (
    config.data &&
    !(config.data instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const baseURL =
    config.baseURL?.trim() || process.env.NEXT_PUBLIC_API_URL || API_BASE_URL;

  const qs = new URLSearchParams();
  if (config.params && typeof config.params === "object") {
    Object.entries(config.params as Record<string, unknown>).forEach(
      ([key, value]) => {
        if (value !== undefined && value !== null) {
          qs.append(key, String(value));
        }
      }
    );
  }

  const reservedConfigKeys = new Set([
    "baseURL",
    "url",
    "method",
    "params",
    "data",
    "responseType",
    "signal",
    "headers",
    "credentials",
    "config",
  ]);
  Object.entries(config as Record<string, unknown>).forEach(([key, value]) => {
    if (reservedConfigKeys.has(key)) {
      return;
    }

    if (value !== undefined && value !== null) {
      qs.append(key, String(value));
    }
  });

  const path = (config.url || "").replace(/^\/+/, "/");
  const normalizedBaseUrl = baseURL.replace(/\/+$/, "");
  let targetUrl = `${normalizedBaseUrl}${path}`;
  const query = qs.toString();
  if (query) {
    targetUrl += `?${query}`;
  }

  const body =
    config.data instanceof FormData
      ? config.data
      : config.data
        ? JSON.stringify(config.data)
        : undefined;

  const init: RequestInit = {
    method: config.method.toUpperCase(),
    body,
    signal: config.signal,
    headers,
  };

  init.credentials = config.credentials ?? "include";

  let response: Response;
  try {
    response = await fetch(targetUrl, init);
  } catch (error) {
    const isAbortError =
      (config.signal && config.signal.aborted) ||
      (typeof DOMException !== "undefined" &&
        error instanceof DOMException &&
        error.name === "AbortError");

    if (isAbortError) {
      throw error;
    }

    throw new TypeError("Failed to fetch");
  }

  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const error: ResponseErrorConfig<TError> = {
      data: data as TError,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };

    throw error;
  }

  return {
    data: data as TData,
    status: response.status,
    statusText: response.statusText,
  };
};

export default client;
