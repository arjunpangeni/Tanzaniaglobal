import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-guard";
import { dbConnect } from "@/lib/db";
import { UniversityForm } from "@/components/admin/university-form";

export default async function EditUniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const conn = await dbConnect();
  if (!conn) notFound();
  const { University } = await import("@/models/university");
  const d = await University.findById(id).lean();
  if (!d) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Edit university</h1>
      <UniversityForm
        university={{
          _id: String(d._id),
          slug: d.slug,
          name: d.name,
          country: d.country,
          countrySlug: d.countrySlug,
          city: d.city,
          ranking: d.ranking ?? 0,
          rankingTier: d.rankingTier ?? "college",
          logoUrl: d.logoUrl,
          coverUrl: d.coverUrl,
          overview: d.overview ?? "",
          tuitionMin: d.tuitionMin ?? 0,
          tuitionMax: d.tuitionMax ?? 0,
          programs: d.programs ?? [],
          fields: d.fields ?? [],
          requirements: d.requirements ?? "",
          scholarships: d.scholarships ?? [],
          published: d.published,
        }}
      />
    </div>
  );
}
