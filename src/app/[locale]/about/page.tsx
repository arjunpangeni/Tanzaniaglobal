import { getLocale, getTranslations } from "next-intl/server";
import { team, accreditations } from "@/content/team";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/home/cta-band";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as "en" | "sw";

  return (
    <>
      <PageHero title={t("title")} />
      <div className="mx-auto w-[min(960px,calc(100%-2rem))] space-y-16 pb-14">
        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-tz-pink p-5 text-foreground sm:p-8">
            <h2 className="font-heading text-2xl text-foreground">{t("storyTitle")}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("story")}</p>
          </div>
          <div className="rounded-3xl bg-tz-green p-5 text-foreground sm:p-8">
            <h2 className="font-heading text-2xl text-foreground">{t("missionTitle")}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("mission")}</p>
          </div>
        </section>
        <section>
          <h2 className="font-heading text-3xl text-foreground">{t("teamTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <article key={member.name} className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.photo} alt={member.name} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="mt-1 text-sm text-tz-blue-deep">{member.role[locale]}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-heading text-3xl text-foreground">{t("accTitle")}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {accreditations.map((a) => (
              <li key={a.name}>
                <a href={a.href} className="rounded-full border px-4 py-2 text-sm hover:bg-muted" target="_blank" rel="noreferrer">
                  {a.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-heading text-3xl text-foreground">{t("officeTitle")}</h2>
          <p className="mt-4 leading-relaxed break-words text-muted-foreground">
            {site.address}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="underline">
              {site.phone}
            </a>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            <a href={`mailto:${site.email}`} className="break-all underline">
              {site.email}
            </a>
          </p>
          <iframe
            title="Office map"
            src={site.mapEmbed}
            className="mt-6 h-72 w-full rounded-2xl border-0"
          />
        </section>
      </div>
      <CtaBand />
    </>
  );
}
