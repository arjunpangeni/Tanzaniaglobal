import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getUniversitiesPaged } from "@/lib/data";
import { MagicCard } from "@/components/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import { UniversityLogo } from "@/components/universities/university-logo";
import { PAGE_SIZE, UniversityPager } from "@/components/universities/university-pager";

export type UniversitySearch = {
  q?: string;
  country?: string;
  ranking?: string;
  field?: string;
  page?: string;
};

export async function UniversityResults({
  searchParams,
}: {
  searchParams: Promise<UniversitySearch>;
}) {
  const t = await getTranslations("universitiesPage");
  const cta = await getTranslations("cta");
  const query = await searchParams;
  const { items: visible, total, page } = await getUniversitiesPaged({
    q: query.q,
    country: query.country,
    ranking: query.ranking,
    field: query.field,
    page: Number(query.page) || 1,
    pageSize: PAGE_SIZE,
  });
  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE;

  if (total === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {t("showing", { from: start + 1, to: start + visible.length, total })}
      </p>
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((u) => (
          <MagicCard key={u.slug} className="h-full">
            <div className="flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <UniversityLogo
                    name={u.name}
                    src={u.logoUrl}
                    className="size-12 shrink-0 rounded-lg bg-white p-1 ring-1 ring-border"
                  />
                  <div className="min-w-0">
                    <h2 className="font-heading line-clamp-2 min-h-[3.25rem] text-xl leading-snug">
                      {u.name}
                    </h2>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {u.city}, {u.country}
                    </p>
                  </div>
                </div>
                <Badge variant={u.ranking > 0 ? "secondary" : "outline"} className="shrink-0">
                  {u.ranking > 0 ? `#${u.ranking}` : "Pathway"}
                </Badge>
              </div>
              <p className="mt-4 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-muted-foreground">
                {u.programs.slice(0, 3).join(" · ")}
              </p>
              <Link
                href={`/universities/${u.slug}`}
                className="mt-auto pt-5 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {cta("viewDetails")}
              </Link>
            </div>
          </MagicCard>
        ))}
      </div>
      <UniversityPager
        page={page}
        total={total}
        params={{
          q: query.q,
          country: query.country,
          ranking: query.ranking,
          field: query.field,
        }}
      />
    </>
  );
}

export function UniversityResultsFallback() {
  return (
    <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-52 animate-pulse rounded-2xl border border-border bg-card/70" />
      ))}
    </div>
  );
}
