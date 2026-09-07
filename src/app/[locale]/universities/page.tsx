import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { FilterBar } from "@/components/universities/filter-bar";
import {
  UniversityResults,
  UniversityResultsFallback,
  type UniversitySearch,
} from "@/components/universities/university-results";

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: Promise<UniversitySearch>;
}) {
  const t = await getTranslations("universitiesPage");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] space-y-8 pb-24">
        <Suspense>
          <FilterBar />
        </Suspense>
        <Suspense fallback={<UniversityResultsFallback />}>
          <UniversityResults searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
