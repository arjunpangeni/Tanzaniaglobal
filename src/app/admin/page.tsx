import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, isAdminEmail } from "@/lib/auth";
import { dbConnect } from "@/lib/db";

export default async function AdminHome() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) redirect("/admin/login");

  const conn = await dbConnect();
  let enquiries = 0;
  let appointments = 0;
  let posts = 0;
  if (conn) {
    const { Enquiry } = await import("@/models/enquiry");
    const { Appointment } = await import("@/models/appointment");
    const { Post } = await import("@/models/post");
    enquiries = await Enquiry.countDocuments({ status: "new" });
    appointments = await Appointment.countDocuments({ status: "pending" });
    posts = await Post.countDocuments({ published: true });
  }

  const cards = [
    { href: "/admin/enquiries", label: "New enquiries", value: enquiries },
    { href: "/admin/appointments", label: "Pending appointments", value: appointments },
    { href: "/admin/posts", label: "Published posts", value: posts },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl">Dashboard</h1>
      {!conn ? (
        <p className="mt-3 rounded-xl bg-tz-pink p-3 text-sm">
          MongoDB is not connected. Marketing pages still work from seed content. Add MONGODB_URI to
          enable the inbox and CMS.
        </p>
      ) : null}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border border-border bg-card p-5 text-foreground">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="font-heading text-4xl">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
