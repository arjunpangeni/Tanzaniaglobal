import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { destinations } from "@/content/destinations";
import { destinationGuides } from "@/content/destination-guides";
import { getUniversities, sortUniversities } from "@/lib/data";
import { DestinationGuideView } from "@/components/destinations/destination-guide";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  const locale = (await getLocale()) as "en" | "sw";
  return {
    title: `${dest.name.en} — study destination`,
    description: dest.summary[locale],
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  const guide = destinationGuides[slug as keyof typeof destinationGuides];
  if (!dest || !guide) notFound();

  const locale = (await getLocale()) as "en" | "sw";
  const campuses = sortUniversities(await getUniversities({ country: dest.slug, limit: 48 })).slice(
    0,
    6
  );
  const others = destinations.filter((d) => d.slug !== dest.slug).slice(0, 6);

  return (
    <DestinationGuideView
      dest={dest}
      guide={guide}
      campuses={campuses}
      others={others}
      locale={locale}
    />
  );
}
