import { NextIntlClientProvider } from "next-intl";
import { auth, isAdminEmail } from "@/lib/auth";
import { AdminShell } from "@/components/admin/shell";
import messages from "../../../messages/en.json";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const ok = isAdminEmail(session?.user?.email);
  const inner = ok ? (
    <AdminShell email={session?.user?.email}>{children}</AdminShell>
  ) : (
    <div className="min-h-screen bg-background text-foreground">{children}</div>
  );

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {inner}
    </NextIntlClientProvider>
  );
}
