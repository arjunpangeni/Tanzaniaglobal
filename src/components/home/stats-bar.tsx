"use client";

import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";

export function StatsBar() {
  const t = useTranslations("home");
  const items = [
    { value: site.stats.years, label: t("years"), suffix: "+" },
    { value: site.stats.students, label: t("students"), suffix: "+" },
    { value: site.stats.partners, label: t("partners"), suffix: "+" },
    { value: site.stats.destinations, label: t("destinations"), suffix: "" },
  ];

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))]">
      <BlurFade>
        <div className="glass relative overflow-hidden rounded-3xl p-5 text-foreground sm:p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-tz-pink/55 via-tz-blue/45 to-tz-green/55"
          />
          <div className="relative">
            <h2 className="heading-soft max-w-xl font-heading text-2xl leading-snug sm:text-3xl">{t("statsTitle")}</h2>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-4">
              {items.map((item) => (
                <div key={item.label}>
                  <p className="font-heading text-3xl sm:text-4xl">
                    <NumberTicker value={item.value} />
                    {item.suffix}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
