import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = (await getLocale()) as "en" | "sw";
  const wa = `https://wa.me/${site.whatsapp}`;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <p className="mx-auto -mt-2 mb-6 w-[min(960px,calc(100%-2rem))] text-center sm:-mt-4 sm:mb-10">
        <Link href="/appointment" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          {t("bookHint")}
        </Link>
      </p>
      <div className="mx-auto grid w-[min(1040px,calc(100%-1.25rem))] gap-4 pb-24 sm:w-[min(1040px,calc(100%-2rem))] sm:gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
        <div className="glass rounded-2xl p-4 sm:rounded-3xl sm:p-7 md:p-10">
          <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-muted/50" />}>
            <ContactForm />
          </Suspense>
        </div>
        <aside className="grid gap-4 sm:gap-6">
          <div className="rounded-2xl bg-tz-green p-4 text-foreground sm:rounded-3xl sm:p-8">
            <h2 className="font-heading text-xl text-foreground sm:text-2xl">{t("office")}</h2>
            <ul className="mt-4 grid gap-3 sm:mt-5 sm:gap-5">
              {site.offices.map((office) => (
                <li key={office.id} className="rounded-xl bg-background/40 px-3 py-2.5 sm:bg-transparent sm:px-0 sm:py-0">
                  <p className="text-sm font-medium">{office.name[locale]}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{office.detail[locale]}</p>
                  {"phone" in office && office.phone ? (
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="mt-1 inline-flex items-center gap-2 text-sm underline"
                    >
                      <Phone className="size-3.5 shrink-0 opacity-70" aria-hidden />
                      {office.phone}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground sm:mt-5">{t("hours")}</p>
            <p className="mt-2 text-sm">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 underline">
                <Mail className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {site.email}
              </a>
            </p>
            <a
              href={wa}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#25D366] px-5 text-sm font-medium text-white hover:bg-[#1fb855] sm:mt-5 sm:w-auto"
            >
              WhatsApp
            </a>
          </div>
          <iframe
            title="Map"
            src={site.mapEmbed}
            className="h-[min(22rem,70vw)] w-full rounded-2xl border-0 sm:h-80 sm:rounded-3xl lg:h-72"
            loading="lazy"
          />
        </aside>
      </div>
    </>
  );
}
