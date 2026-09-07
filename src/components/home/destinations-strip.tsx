"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/content/destinations";
import { Marquee } from "@/components/magicui/marquee";

export function DestinationsStrip() {
  const t = useTranslations("home");
  const locale = useLocale() as "en" | "sw";

  return (
    <section className="py-14">
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        {t("destinationsTitle")}
      </p>
      <Marquee pauseOnHover className="[--duration:48s]">
        {destinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm whitespace-nowrap"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/24x18/${d.countryCode}.png`}
              alt=""
              width={24}
              height={18}
              className="rounded-sm"
            />
            {d.name[locale]}
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
