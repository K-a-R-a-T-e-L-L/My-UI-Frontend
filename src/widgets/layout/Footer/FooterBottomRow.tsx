import { Group, Text } from "@mantine/core";
import LocaleNavLink from "@/shared/ui/LocaleNavLink/LocaleNavLink";
import { FooterLocale } from "./footer.types";
import styles from "./Footer.module.css";

type FooterBottomRowProps = {
  locale: FooterLocale;
  year: number;
  brand: string;
  rights: string;
  privacyLabel: string;
  termsLabel: string;
};

const FooterBottomRow = ({
  locale,
  year,
  brand,
  rights,
  privacyLabel,
  termsLabel,
}: FooterBottomRowProps) => (
  <div className={styles.bottomRow}>
    <Text className={styles.copyright}>
      © {year} {brand}. {rights}
    </Text>
    <Group gap={14} wrap="wrap">
      <LocaleNavLink
        href="/privacy"
        locale={locale}
        className={styles.legalLink}
        activeClassName={styles.linkActive}
      >
        {privacyLabel}
      </LocaleNavLink>
      <LocaleNavLink
        href="/terms"
        locale={locale}
        className={styles.legalLink}
        activeClassName={styles.linkActive}
      >
        {termsLabel}
      </LocaleNavLink>
    </Group>
  </div>
);

export default FooterBottomRow;
