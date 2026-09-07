"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import { destinations } from "@/content/destinations";
import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/utils";
import { FlagIcon } from "./flag-icon";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";

const links = [
  { href: "/", key: "home" as const, exact: true },
  { href: "/universities", key: "universities" as const },
  { href: "/services", key: "services" as const },
  { href: "/resources", key: "resources" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

const CLOSE_MS = 380;

export function MobileNav({
  open,
  onOpenChange,
  destinationsActive,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinationsActive: boolean;
}) {
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const locale = useLocale() as "en" | "sw";
  const [countriesOpen, setCountriesOpen] = useState(destinationsActive);
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(open);

  function close() {
    onOpenChange(false);
  }

  useEffect(() => {
    if (open) {
      setRendered(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setVisible(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setRendered(false), CLOSE_MS);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setCountriesOpen(destinationsActive);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, destinationsActive]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => onOpenChange(true)}
        className="grid size-9 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform duration-200 ease-out active:scale-95"
      >
        <Menu className="size-4" />
      </button>

      {rendered ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className={cn(
              "absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ease-out",
              visible ? "opacity-100" : "opacity-0"
            )}
            onClick={close}
          />
          <aside
            className={cn(
              "absolute inset-y-0 right-0 flex h-dvh w-[min(20.5rem,calc(100vw-0.75rem))] flex-col bg-background text-foreground shadow-[-12px_0_40px_-20px_rgba(15,23,42,0.45)]",
              "transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
              visible ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Logo onClick={close} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="grid size-8 place-items-center rounded-full border border-border bg-card transition-transform duration-200 ease-out active:scale-95"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
              <div className="flex flex-col gap-1">
                {links.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    exact={item.exact}
                    onClick={close}
                    className="rounded-xl px-3 py-3 text-[1.05rem] font-semibold text-foreground/85 hover:bg-muted hover:text-foreground"
                    activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    {t(item.key)}
                  </NavLink>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-muted/50 p-1.5">
                <button
                  type="button"
                  aria-expanded={countriesOpen}
                  onClick={() => setCountriesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[1.05rem] font-semibold text-foreground"
                >
                  {t("destinations")}
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-300",
                      countriesOpen && "rotate-180"
                    )}
                  />
                </button>
                {countriesOpen ? (
                  <div className="flex flex-col gap-0.5 pb-1">
                    {destinations.map((d) => (
                      <NavLink
                        key={d.slug}
                        href={`/destinations/${d.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/85 hover:bg-background hover:text-foreground"
                        activeClassName="bg-background text-foreground shadow-sm"
                      >
                        <FlagIcon code={d.countryCode} alt="" />
                        <span className="min-w-0 flex-1 text-left leading-snug">{d.name[locale]}</span>
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            </nav>

            <div className="border-t border-border p-4">
              <CtaLink href="/appointment" onClick={close} className="h-11 w-full rounded-full">
                {cta("book")}
              </CtaLink>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
