import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getUniversity, formatTuition } from "@/lib/data";
import { seedUniversities } from "@/content/universities";
import { CtaLink } from "@/components/ui/cta-link";
import { Badge } from "@/components/ui/badge";
import { UniversityLogo } from "@/components/universities/university-logo";

export function generateStaticParams() {
  return seedUniversities.map((u) => ({ slug: u.slug }));
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uni = await getUniversity(slug);
  if (!uni) notFound();
  const t = await getTranslations("universitiesPage");
  const cta = await getTranslations("cta");

  return (
    <article className="mx-auto w-[min(900px,calc(100%-2rem))] py-12 sm:py-20">
      <UniversityLogo
        name={uni.name}
        src={uni.logoUrl}
        className="mb-6 size-20 rounded-2xl bg-white p-2 ring-1 ring-border"
      />
      <p className="text-sm leading-relaxed text-muted-foreground">
        {uni.city}, {uni.country}
        {uni.website ? (
          <>
            {" · "}
            <a href={uni.website} className="underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              Website
            </a>
          </>
        ) : null}
      </p>
      <h1 className="mt-3 font-heading text-3xl text-balance break-words text-foreground sm:text-4xl md:text-5xl">{uni.name}</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        {uni.ranking > 0 ? <Badge>QS ~ {uni.ranking}</Badge> : <Badge variant="outline">College</Badge>}
        {uni.fields.map((f) => (
          <Badge key={f} variant="secondary" className="max-w-full truncate">
            {f}
          </Badge>
        ))}
      </div>
      <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{uni.overview}</p>
      <section className="mt-10 rounded-2xl bg-tz-green p-7 text-foreground">
        <h2 className="font-medium text-foreground">{t("tuition")}</h2>
        <p className="mt-2">{formatTuition(uni.tuitionMin, uni.tuitionMax)}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-heading text-2xl">{t("programs")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {uni.programs.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-heading text-2xl">{t("requirements")}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{uni.requirements}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-heading text-2xl">{t("scholarships")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {uni.scholarships.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <CtaLink
        href={`/contact?university=${uni.slug}`}
        className="mt-10 w-full whitespace-normal text-center sm:w-auto"
        size="lg"
      >
        {cta("counselUniversity")}
      </CtaLink>
    </article>
  );
}
