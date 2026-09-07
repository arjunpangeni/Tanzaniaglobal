import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/content/destinations";
import { site } from "@/content/site";
import { SocialIcons } from "./social-icons";
import { FlagIcon } from "./flag-icon";

const exploreLinks = [
  { href: "/services", key: "services" as const },
  { href: "/universities", key: "universities" as const },
  { href: "/resources", key: "resources" as const },
  { href: "/about", key: "about" as const },
];

const toolLinks = [
  { href: "/resources/ielts-calculator", label: "IELTS Calculator" },
  { href: "/appointment", key: "appointment" as const },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
      {children}
    </p>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale() as "en" | "sw";
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border/60 bg-card/80">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--tz-pink-deep),var(--tz-blue-deep),var(--tz-green-deep),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-24 size-56 rounded-full bg-tz-pink-deep/15 blur-3xl dark:bg-[#c45d84]/28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-20 size-52 rounded-full bg-tz-blue-deep/15 blur-3xl dark:bg-[#3b9ad9]/26"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[min(36rem,80%)] -translate-x-1/2 rounded-full bg-tz-green-deep/12 blur-3xl dark:bg-[#2f9e70]/24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-1/4 size-40 rounded-full bg-tz-gold/15 blur-3xl dark:bg-[#e8c36a]/18"
      />

      <div className="relative mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-12 py-14 sm:gap-14 md:py-16 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("blurb")}</p>

          <ul className="mt-6 flex flex-col items-center gap-2.5 text-sm text-muted-foreground lg:items-start">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex max-w-full items-center gap-2 break-all transition-colors hover:text-foreground"
              >
                <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {site.phone}
              </a>
            </li>
            <li className="inline-flex max-w-[18rem] items-start gap-2 leading-snug">
              <MapPin className="mt-0.5 size-3.5 shrink-0 opacity-70" aria-hidden />
              <span>{site.address}</span>
            </li>
          </ul>

          <SocialIcons className="mt-6 justify-center lg:justify-start" />
        </div>

        <nav aria-labelledby="footer-explore" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <FooterHeading>
            <span id="footer-explore">{t("explore")}</span>
          </FooterHeading>
          <ul className="flex flex-col items-center gap-3 text-sm text-muted-foreground lg:items-start">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-tools" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <FooterHeading>
            <span id="footer-tools">{t("tools")}</span>
          </FooterHeading>
          <ul className="flex flex-col items-center gap-3 text-sm text-muted-foreground lg:items-start">
            {toolLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {"key" in item ? nav(item.key) : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-countries" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <FooterHeading>
            <span id="footer-countries">{t("countries")}</span>
          </FooterHeading>
          <ul className="flex max-w-xs flex-wrap justify-center gap-2 lg:justify-start">
            {destinations.slice(0, 8).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:bg-primary/8 hover:text-foreground"
                >
                  <FlagIcon code={d.countryCode} alt="" className="h-3 w-4 rounded-[2px] object-cover" />
                  {d.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative border-t border-border/60 bg-background/40">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col items-center gap-3 py-6 text-center text-xs leading-relaxed text-muted-foreground md:flex-row md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("rights")}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              {t("terms")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">
              {nav("contact")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
