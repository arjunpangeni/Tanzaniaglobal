import { redirect } from "next/navigation";
import { auth, isAdminEmail, signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export default async function AdminLoginPage() {
  const session = await auth();
  if (isAdminEmail(session?.user?.email)) redirect("/admin");

  const configured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.ADMIN_EMAILS);

  return (
    <div className="mx-auto flex min-h-screen w-[min(420px,calc(100%-2rem))] flex-col justify-center">
      <div className="rounded-3xl border border-border bg-card p-8 text-foreground shadow-sm">
        <Logo />
        <h1 className="mt-6 font-heading text-3xl">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Google accounts on the allow-list only. Set AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET,
          and ADMIN_EMAILS.
        </p>
        {configured ? (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <Button type="submit" className="mt-6 w-full rounded-full">
              Continue with Google
            </Button>
          </form>
        ) : (
          <p className="mt-6 rounded-xl bg-tz-pink p-3 text-sm">
            Auth env vars are not set yet. Copy `.env.example` and add your Google OAuth client.
          </p>
        )}
      </div>
    </div>
  );
}
