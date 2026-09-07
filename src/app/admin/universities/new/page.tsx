import { requireAdminSession } from "@/lib/admin-guard";
import { UniversityForm } from "@/components/admin/university-form";

export default async function NewUniversityPage() {
  await requireAdminSession();
  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">New university</h1>
      <UniversityForm />
    </div>
  );
}
