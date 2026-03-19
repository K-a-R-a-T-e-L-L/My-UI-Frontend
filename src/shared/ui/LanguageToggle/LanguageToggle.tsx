"use client";

import { SegmentedControl } from "@mantine/core";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../../shared/lib/i18n/navigation";
import { Locale, routing } from "../../../shared/lib/i18n/routing";

type LanguageToggleProps = {
  ruLabel: string;
  enLabel: string;
};

const LanguageToggle = ({ ruLabel, enLabel }: LanguageToggleProps) => {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SegmentedControl
      disabled
      size="xs"
      radius="xl"
      value={locale}
      data={[
        { value: "ru", label: ruLabel },
        { value: "en", label: enLabel },
      ]}
      onChange={(nextLocale) => {
        if (
          nextLocale !== locale &&
          routing.locales.includes(nextLocale as Locale)
        ) {
          router.replace(pathname, { locale: nextLocale as Locale });
        }
      }}
    />
  );
};

export default LanguageToggle;
