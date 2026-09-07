import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-guard";
import { getUniversities } from "@/lib/data";
import { dbConnect } from "@/lib/db";
import { deleteUniversity } from "@/actions/admin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminUniversitiesPage() {
  await requireAdminSession();
  const conn = await dbConnect();
  const unis = await getUniversities();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl">Universities</h1>
        <Link href="/admin/universities/new" className={cn(buttonVariants())}>
          New campus
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card text-foreground">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Country</th>
              <th className="p-3">Tier</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {unis.map((u) => (
              <tr key={u.slug} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.country}</td>
                <td className="p-3">{u.rankingTier}</td>
                <td className="p-3 text-right">
                  {u._id && conn ? (
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/universities/${u._id}`} className="underline">
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteUniversity(u._id!);
                        }}
                      >
                        <button className="text-destructive underline" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Seed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
