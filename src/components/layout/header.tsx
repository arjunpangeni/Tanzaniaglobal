"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { destinations } from "@/content/destinations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FlagIcon } from "./flag-icon";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { ThemeSwitcher } from "./theme-switcher";

const links = [
  { href: "/universities", key: "universities" as const },
  { href: "/services", key: "services" as const },
  { href: "/resources", key: "resources" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

const navLinkClass =
  "inline-flex h-8 items-center rounded-full px-2.5 text-[13px] font-semibold tracking-wide text-foreground/80 transition-colors hover:bg-muted hover:text-foreground lg:px-3";
const navLinkActive =
  "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as "en" | "sw";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const destinationsOpen = pathname.startsWith("/destinations");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={cn(
          "relative transition-[background-color,backdrop-filter,box-shadow] duration-300",
          "header-scrolled",
          scrolled
            ? "border-b border-border/40 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.16)]"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-[min(1180px,calc(100%-1rem))] items-center justify-between gap-2 sm:w-[min(1180px,calc(100%-1.5rem))] sm:gap-3 md:h-[4.25rem] lg:h-20">
          <Logo />

          <nav className="hidden items-center rounded-full border border-border bg-card p-1 shadow-sm lg:flex">
            <DestinationsMenu label={t("destinations")} locale={locale} active={destinationsOpen} />
            {links.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={navLinkClass}
                activeClassName={navLinkActive}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <MobileNav open={open} onOpenChange={setOpen} destinationsActive={destinationsOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}

function DestinationsMenu({
  label,
  locale,
  active,
}: {
  label: string;
  locale: "en" | "sw";
  active: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(navLinkClass, "gap-1", active && navLinkActive)}>
        {label}
        <ChevronDown className="size-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10} className="min-w-64 rounded-2xl p-2">
        {destinations.map((d) => (
          <DropdownMenuItem
            key={d.slug}
            className="rounded-xl px-2.5 py-2"
            render={<Link href={`/destinations/${d.slug}`} />}
          >
            <FlagIcon code={d.countryCode} alt="" />
            <span>{d.name[locale]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
