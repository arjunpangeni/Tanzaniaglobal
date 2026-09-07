import Link from "next/link";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/universities", label: "Universities" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/appointments", label: "Appointments" },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 flex-col border-r border-border bg-card/80 p-5 md:flex">
          <p className="font-heading text-xl">TGL Admin</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{email}</p>
          <nav className="mt-8 grid gap-1 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 hover:bg-muted">
                {l.label}
              </Link>
            ))}
          </nav>
          <form
            className="mt-auto"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              Sign out
            </Button>
          </form>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-border bg-card/70 px-4 py-3 md:hidden">
            <p className="font-heading">TGL Admin</p>
            <Link href="/admin/enquiries" className="text-sm underline">
              Inbox
            </Link>
          </header>
          <div className="p-5 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
