import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function allowedEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;
      const allow = allowedEmails();
      if (!allow.length) return false;
      return allow.includes(email);
    },
    async jwt({ token }) {
      token.role = "admin";
      return token;
    },
    async session({ session }) {
      if (session.user) session.user.email = session.user.email?.toLowerCase() ?? "";
      return session;
    },
  },
});

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return allowedEmails().includes(email.toLowerCase());
}
