"use client";

import { ReactNode } from "react";
import { Link, usePathname } from "@/shared/lib/i18n/navigation";
import { Locale } from "@/shared/lib/i18n/routing";

type LocaleNavLinkProps = {
  href: string;
  locale: Locale;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
};

const isPathActive = (pathname: string, href: string, exact: boolean) => {
  if (exact) {
    return pathname === href;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

const LocaleNavLink = ({
  href,
  locale,
  children,
  className,
  activeClassName,
  exact = false,
  onClick,
}: LocaleNavLinkProps) => {
  const pathname = usePathname();
  const active = isPathActive(pathname, href, exact);
  const classes = [className, active ? activeClassName : null]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      locale={locale}
      className={classes || undefined}
      onClick={onClick}
      style={{ position: "relative" }}
    >
      {children}
    </Link>
  );
};

export default LocaleNavLink;
