import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { CalendarDays, GraduationCap, Languages, Wallet } from "lucide-react";
import { destinations, type DestinationSlug } from "@/content/destinations";
import { destinationGuides, type DestinationGuide as Guide } from "@/content/destination-guides";
import type { UniversityRecord } from "@/lib/data";
import { CtaLink } from "@/components/ui/cta-link";
import { CtaBand } from "@/components/home/cta-band";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { UniversityLogo } from "@/components/universities/university-logo";
import { FlagIcon } from "@/components/layout/flag-icon";
import { Link } from "@/i18n/navigation";
import { DestinationPhoto } from "./destination-photo";

type Dest = (typeof destinations)[number];

export async function DestinationGuideView({
  dest,
  guide,
  campuses,
  others,
  locale,
}: {
  dest: Dest;
  guide: Guide;
  campuses: UniversityRecord[];
  others: Dest[];
  locale: "en" | "sw";
}) {
  const t = await getTranslations("destinationPage");
  const cta = await getTranslations("cta");
  const [hero, ...gallery] = guide.photos;

  return (
    <>
      <section className="relative isolate min-h-[min(78vh,680px)] overflow-hidden bg-[#12161c]">
        <DestinationPhoto
          src={hero.src}
          alt={hero.alt[locale]}
          className="absolute inset-0"
          imgClassName="dest-kenburns"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#12161c] via-[#12161c]/70 to-[#12161c]/25" />
        <div className="relative mx-auto flex min-h-[min(78vh,680px)] w-[min(1120px,calc(100%-2rem))] flex-col justify-end pb-10 pt-24 sm:pb-12 sm:pt-28">
          <BlurFade>
            <p className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-white uppercase ring-1 ring-white/20 backdrop-blur-sm">
              <FlagIcon
                code={dest.countryCode}
                alt={dest.name[locale]}
                className="h-4 w-6 rounded-[3px] ring-1 ring-white/40"
              />
              {t("eyebrow")}
            </p>
            <h1 className="heading-on-media mt-4 max-w-3xl font-heading text-[1.85rem] leading-[1.15] text-balance text-white sm:text-4xl md:text-5xl">
              {t("studyIn", { country: dest.name[locale] })}
            </h1>
            <p className="subheading-on-media mt-4 max-w-2xl text-base leading-[1.7] text-pretty text-white sm:mt-5 sm:text-lg">
              {dest.summary[locale]}
            </p>
          </BlurFade>
        </div>
      </section>

      <article className="mx-auto w-[min(1120px,calc(100%-2rem))] space-y-16 py-16 pb-10">
        <BlurFade>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Fact
              icon={<Wallet className="size-4" />}
              label={t("tuition")}
              value={`${dest.budget.usd} · ${dest.budget.tzs}`}
              tone="blue"
            />
            <Fact
              icon={<GraduationCap className="size-4" />}
              label={t("fields")}
              value={dest.fields.join(" · ")}
              tone="pink"
            />
            <Fact
              icon={<CalendarDays className="size-4" />}
              label={t("intakes")}
              value={guide.intakes[locale]}
              tone="green"
            />
            <Fact
              icon={<Languages className="size-4" />}
              label={t("language")}
              value={guide.language[locale]}
              tone="blue"
            />
          </div>
        </BlurFade>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <BlurFade>
            <h2 className="heading-soft font-heading text-3xl text-foreground">{t("situation")}</h2>
            <div className="mt-5 space-y-4">
              {guide.situation[locale].split("\n\n").map((part) => (
                <p key={part.slice(0, 48)} className="leading-[1.8] text-foreground/80">
                  {part}
                </p>
              ))}
            </div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <figure className="group">
              <div className="overflow-hidden rounded-3xl">
                <DestinationPhoto
                  src={gallery[0]?.src ?? hero.src}
                  alt={gallery[0]?.alt[locale] ?? hero.alt[locale]}
                  className="aspect-[4/5] sm:aspect-video lg:aspect-[4/5]"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 px-0.5 text-sm leading-relaxed text-muted-foreground">
                {gallery[0]?.caption[locale] ?? hero.caption[locale]}
              </figcaption>
            </figure>
          </BlurFade>
        </section>

        <section>
          <BlurFade>
            <h2 className="heading-soft font-heading text-3xl text-foreground">{t("opportunities")}</h2>
          </BlurFade>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {guide.opportunities[locale].map((item, index) => (
              <BlurFade key={item} delay={index * 0.06}>
                <li>
                  <MagicCard className="h-full">
                    <div className="flex gap-3.5 p-5">
                      <span
                        className="mt-1.5 size-2 shrink-0 rounded-full bg-tz-blue-deep"
                        aria-hidden
                      />
                      <p className="text-sm leading-[1.75] text-foreground/80">{item}</p>
                    </div>
                  </MagicCard>
                </li>
              </BlurFade>
            ))}
          </ul>
        </section>

        {gallery.length > 1 ? (
          <section>
            <BlurFade>
              <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {t("photos", { country: dest.name[locale] })}
              </p>
            </BlurFade>
            <div className="grid gap-4 md:grid-cols-2">
              {gallery.slice(1).map((photo, index) => (
                <BlurFade key={photo.src} delay={index * 0.08}>
                  <figure className="group relative overflow-hidden rounded-3xl">
                    <DestinationPhoto
                      src={photo.src}
                      alt={photo.alt[locale]}
                      className="aspect-video"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-5 pt-10 pb-4 text-sm leading-relaxed text-white">
                      {photo.caption[locale]}
                    </figcaption>
                  </figure>
                </BlurFade>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2">
          <BlurFade>
            <div className="h-full rounded-3xl bg-tz-green p-5 ring-1 ring-tz-green-deep/10 sm:p-8">
              <h2 className="heading-soft font-heading text-2xl text-foreground">{t("life")}</h2>
              <p className="mt-4 leading-[1.8] text-foreground/80">{guide.life[locale]}</p>
            </div>
          </BlurFade>
          <BlurFade delay={0.08}>
            <div className="h-full rounded-3xl bg-tz-pink p-5 ring-1 ring-tz-pink-deep/10 sm:p-8">
              <h2 className="heading-soft font-heading text-2xl text-foreground">{t("watch")}</h2>
              <p className="mt-4 leading-[1.8] text-foreground/80">{guide.watch[locale]}</p>
            </div>
          </BlurFade>
        </section>

        {campuses.length > 0 ? (
          <section>
            <BlurFade>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="heading-soft font-heading text-3xl text-foreground">{t("campuses")}</h2>
                <Link
                  href={`/universities?country=${dest.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t("allCampuses", { country: dest.name[locale] })}
                </Link>
              </div>
            </BlurFade>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {campuses.map((u, index) => (
                <BlurFade key={u.slug} delay={index * 0.04}>
                  <Link
                    href={`/universities/${u.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <UniversityLogo
                      name={u.name}
                      src={u.logoUrl}
                      className="size-11 shrink-0 rounded-lg bg-white p-1 ring-1 ring-border"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{u.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{u.city}</p>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </section>
        ) : null}

        <BlurFade>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <CtaLink href={`/contact?destination=${dest.slug}`} className="w-full rounded-full sm:w-auto">
              {cta("getStarted")}
            </CtaLink>
            <CtaLink href="/appointment" variant="outline" className="w-full rounded-full sm:w-auto">
              {cta("book")}
            </CtaLink>
          </div>
        </BlurFade>

        <section>
          <BlurFade>
            <h2 className="heading-soft font-heading text-3xl text-foreground">{t("more")}</h2>
          </BlurFade>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((d, index) => {
              const otherGuide = destinationGuides[d.slug as DestinationSlug];
              return (
                <BlurFade key={d.slug} delay={index * 0.05}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <DestinationPhoto
                      src={otherGuide.photos[0].src}
                      alt={otherGuide.photos[0].alt[locale]}
                      className="h-40"
                      imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="p-4">
                      <p className="flex items-center gap-2 font-medium">
                        <FlagIcon
                          code={d.countryCode}
                          alt={d.name[locale]}
                          className="h-3.5 w-5"
                        />
                        {d.name[locale]}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {d.summary[locale]}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </section>
      </article>
      <CtaBand />
    </>
  );
}

function Fact({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "blue" | "pink" | "green";
}) {
  const bg = tone === "pink" ? "bg-tz-pink" : tone === "green" ? "bg-tz-green" : "bg-tz-blue";
  return (
    <div className={`rounded-2xl ${bg} p-5`}>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground/60 uppercase">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed font-medium break-words text-foreground">{value}</p>
    </div>
  );
}
