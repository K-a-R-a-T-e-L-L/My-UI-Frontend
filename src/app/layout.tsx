import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { getLocale } from "next-intl/server";
import { routing } from "../shared/lib/i18n/routing";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "My UI",
    template: "%s | My UI",
  },
  description: "Платформа для публикации и поиска UI-шаблонов.",
  applicationName: "My UI",
  openGraph: {
    title: "My UI",
    description: "Платформа для публикации и поиска UI-шаблонов.",
    siteName: "My UI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My UI",
    description: "Платформа для публикации и поиска UI-шаблонов.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale().catch(() => routing.defaultLocale)) ?? routing.defaultLocale;

  return (
    <html
      lang={locale}
      {...mantineHtmlProps}
      className={`${inter.variable} ${manrope.variable}`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
