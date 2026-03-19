import { Stack, Text } from "@mantine/core";
import LocaleNavLink from "@/shared/ui/LocaleNavLink/LocaleNavLink";
import { FooterLinkItem, FooterLocale } from "./footer.types";
import styles from "./Footer.module.css";

type FooterLinksGroupProps = {
  title: string;
  locale: FooterLocale;
  items: FooterLinkItem[];
};

const FooterLinksGroup = ({ title, locale, items }: FooterLinksGroupProps) => (
  <Stack gap={8}>
    <Text className={styles.groupTitle}>{title}</Text>
    {items.map((item) =>
      item.external ? (
        <a
          key={`${title}-${item.label}`}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          {item.label}
        </a>
      ) : (
        <LocaleNavLink
          key={`${title}-${item.href}`}
          href={item.href}
          locale={locale}
          className={styles.link}
          activeClassName={styles.linkActive}
          exact={item.exact}
        >
          {item.label}
        </LocaleNavLink>
      ),
    )}
  </Stack>
);

export default FooterLinksGroup;
