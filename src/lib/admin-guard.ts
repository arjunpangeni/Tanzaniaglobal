import { redirect } from "next/navigation";
import { auth, isAdminEmail } from "./auth";

export async function requireAdminSession() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) redirect("/admin/login");
  return session;
}
