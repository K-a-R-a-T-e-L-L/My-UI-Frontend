const resolveApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000";

export const resolveMediaUrl = (url: string | null | undefined) => {
  if (!url) {
    return null;
  }

  if (url.startsWith("/")) {
    return `${resolveApiUrl()}${url}`;
  }

  return url;
};
