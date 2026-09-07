import { requireAdminSession } from "@/lib/admin-guard";
import { dbConnect } from "@/lib/db";
import { updateEnquiryStatus } from "@/actions/admin";

export default async function EnquiriesPage() {
  await requireAdminSession();
  const conn = await dbConnect();
  if (!conn) {
    return <p>Connect MongoDB to see incoming enquiries.</p>;
  }
  const { Enquiry } = await import("@/models/enquiry");
  const rows = await Enquiry.find().sort({ createdAt: -1 }).limit(100).lean();

  return (
    <div>
      <h1 className="font-heading text-3xl">Enquiries</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card text-foreground">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r._id)} className="border-t align-top">
                <td className="p-3">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.service || r.university}</p>
                </td>
                <td className="p-3">
                  {r.email}
                  <br />
                  {r.phone}
                </td>
                <td className="p-3">{r.destination}</td>
                <td className="p-3">
                  <form
                    action={async (fd) => {
                      "use server";
                      await updateEnquiryStatus(String(r._id), String(fd.get("status")));
                    }}
                  >
                    <select name="status" defaultValue={r.status} className="field-select h-8 w-auto">
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                    <button className="ml-2 underline" type="submit">
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
