import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
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
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { iconTones } from "@/lib/icon-tones";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HomeMagicCard } from "@/components/home/home-magic-card";

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

export async function ServicesPreview() {
  const t = await getTranslations("home");
  const cta = await getTranslations("cta");
  const locale = (await getLocale()) as "en" | "sw";

  return (
    <section className="section-pad mx-auto w-[min(1120px,calc(100%-2rem))]">
      <BlurFade>
        <h2 className="heading-soft font-heading text-3xl text-foreground md:text-[2.35rem]">{t("servicesTitle")}</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("servicesBody")}</p>
      </BlurFade>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 6).map((service, i) => {
          const Icon = icons[service.icon as keyof typeof icons];
          return (
            <BlurFade key={service.slug} delay={i * 0.05}>
              <HomeMagicCard className="transition duration-300 hover:-translate-y-1">
                <Link href={`/services#${service.slug}`} className="block h-full p-7">
                  <span className={`grid size-12 place-items-center rounded-2xl ${iconTones[i % iconTones.length]}`}>
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-heading text-xl">{service.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.short[locale]}</p>
                </Link>
              </HomeMagicCard>
            </BlurFade>
          );
        })}
      </div>
      <Link
        href="/services"
        className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-5 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/35 hover:bg-primary/8"
      >
        {cta("exploreServices")}
        <ArrowRight className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
