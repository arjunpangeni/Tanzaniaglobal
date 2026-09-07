import { requireAdminSession } from "@/lib/admin-guard";
import { dbConnect } from "@/lib/db";
import { updateAppointmentStatus } from "@/actions/admin";

export default async function AppointmentsPage() {
  await requireAdminSession();
  const conn = await dbConnect();
  if (!conn) {
    return <p>Connect MongoDB to see booked slots.</p>;
  }
  const { Appointment } = await import("@/models/appointment");
  const rows = await Appointment.find().sort({ date: 1 }).limit(100).lean();

  return (
    <div>
      <h1 className="font-heading text-3xl">Appointments</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card text-foreground">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="p-3">When</th>
              <th className="p-3">Visitor</th>
              <th className="p-3">Type</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r._id)} className="border-t">
                <td className="p-3">
                  {r.date}
                </td>
                <td className="p-3">
                  {r.name}
                  <br />
                  <span className="text-xs text-muted-foreground">{r.email}</span>
                </td>
                <td className="p-3">
                  {r.purpose === "inquiry" ? "Inquiry" : "Counselling"}
                  <br />
                  <span className="text-xs text-muted-foreground">
                    {r.location === "dar"
                      ? "Dar es Salaam"
                      : r.location === "reading"
                        ? "Reading"
                        : r.mode === "in-person"
                          ? "In person"
                          : "Online"}
                  </span>
                </td>
                <td className="p-3">{r.destination}</td>
                <td className="p-3">
                  <form
                    action={async (fd) => {
                      "use server";
                      await updateAppointmentStatus(String(r._id), String(fd.get("status")));
                    }}
                  >
                    <select name="status" defaultValue={r.status} className="field-select h-8 w-auto">
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
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
