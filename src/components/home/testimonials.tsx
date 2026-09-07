"use client";

import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/content/testimonials";
import { Marquee } from "@/components/magicui/marquee";
import { HomeMagicCard } from "@/components/home/home-magic-card";

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale() as "en" | "sw";
  const mid = Math.ceil(testimonials.length / 2);

  return (
    <section className="section-pad">
      <h2 className="heading-soft mx-auto mb-10 w-[min(1120px,calc(100%-2rem))] font-heading text-3xl text-foreground md:text-[2.35rem]">
        {t("storiesTitle")}
      </h2>
      <Marquee pauseOnHover className="[--duration:50s]">
        {testimonials.slice(0, mid).map((item) => (
          <HomeMagicCard key={item.name} className="w-80 shrink-0">
            <figure className="p-7 text-foreground">
              <blockquote className="text-sm leading-relaxed text-pretty text-foreground">{item.quote[locale]}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.avatar} alt="" className="size-10 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.role[locale]} · {item.year}
                  </p>
                </div>
              </figcaption>
            </figure>
          </HomeMagicCard>
        ))}
      </Marquee>
    </section>
  );
}
