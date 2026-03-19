import { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import RootProvider from "../../processes/providers/RootProvider";
import { routing } from "../../shared/lib/i18n/routing";
import { getCurrentUserServer } from "@/shared/lib/auth/get-current-user.server";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {
      manifest: "/manifest.webmanifest",
    };
  }

  return {
    manifest: `/${locale}/manifest.webmanifest`,
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const currentUser = await getCurrentUserServer();

  return (
    <NextIntlClientProvider>
      <RootProvider locale={locale} currentUser={currentUser}>
        {children}
      </RootProvider>
    </NextIntlClientProvider>
  );
}
