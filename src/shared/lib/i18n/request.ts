import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { routing } from "./routing";

const namespaces = [
  "Header",
  "HomePage",
  "TemplatesPage",
  "OffersPage",
  "ProfilePage",
  "Footer",
  "Common",
  "Breadcrumbs",
] as const;

const namespaceToFile: Record<(typeof namespaces)[number], string> = {
  Header: "header.json",
  HomePage: "home-page.json",
  TemplatesPage: "templates-page.json",
  OffersPage: "offers-page.json",
  ProfilePage: "profile-page.json",
  Footer: "footer.json",
  Common: "common.json",
  Breadcrumbs: "breadcrumbs.json",
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messagesEntries = await Promise.all(
    namespaces.map(async (namespace) => {
      const filePath = path.join(
        process.cwd(),
        "public",
        "locales",
        locale,
        namespaceToFile[namespace]
      );
      const fileContent = await readFile(filePath, "utf8");
      return [namespace, JSON.parse(fileContent)] as const;
    })
  );

  return {
    locale,
    messages: Object.fromEntries(messagesEntries),
  };
});
