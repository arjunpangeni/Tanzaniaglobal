import { getLocale, getTranslations } from "next-intl/server";
import {
  Award,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  Home,
  MessagesSquare,
  NotebookPen,
  PlaneTakeoff,
  ShieldCheck,
  University,
} from "lucide-react";
import { services } from "@/content/services";
import { iconTones } from "@/lib/icon-tones";
import { PageHero } from "@/components/layout/page-hero";
import { CtaLink } from "@/components/ui/cta-link";
import { CtaBand } from "@/components/home/cta-band";
import { ServicesNav } from "@/components/services/services-nav";

const icons = {
  MessagesSquare,
  CalendarCheck,
  BookOpen,
  University,
  ClipboardCheck,
  NotebookPen,
  Award,
  ShieldCheck,
  PlaneTakeoff,
  Home,
};

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");
  const cta = await getTranslations("cta");
  const locale = (await getLocale()) as "en" | "sw";

  const navItems = services.map((s) => ({
    slug: s.slug,
    title: s.title[locale],
  }));

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto w-[min(1120px,calc(100%-1.25rem))] pb-16 sm:w-[min(1120px,calc(100%-2rem))] sm:pb-20">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-12">
          <ServicesNav items={navItems} jumpLabel={t("jumpTo")} />
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {services.map((s, i) => {
              const Icon = icons[s.icon as keyof typeof icons];
              return (
                <article
                  key={s.slug}
                  id={s.slug}
                  className="scroll-mt-36 rounded-2xl border border-border bg-card p-4 shadow-[0_10px_28px_-16px_rgba(27,36,48,0.28)] sm:scroll-mt-28 sm:rounded-3xl sm:p-7 md:p-10"
                >
                  <div className={`grid size-11 place-items-center rounded-2xl sm:size-12 ${iconTones[i % iconTones.length]}`}>
                    <Icon className="size-5 sm:size-6" strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-4 font-heading text-xl leading-snug text-foreground sm:mt-5 sm:text-3xl">
                    {s.title[locale]}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                    {s.body[locale]}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-foreground sm:mt-7">{t("included")}</p>
                  <ul className="mt-2.5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground sm:mt-3">
                    {s.included[locale].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <CtaLink
                    href={`/contact?service=${s.slug}`}
                    variant="outline"
                    size="lg"
                    className="mt-5 h-11 w-full justify-center rounded-full px-6 text-center whitespace-normal sm:mt-6 sm:w-auto sm:min-w-[12rem]"
                  >
                    {cta("talk")}
                  </CtaLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
