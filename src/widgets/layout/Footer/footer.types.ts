export type FooterLocale = "ru" | "en";

export type FooterLinkItem = {
  href: string;
  label: string;
  external?: boolean;
  exact?: boolean;
};
