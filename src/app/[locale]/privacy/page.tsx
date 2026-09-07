import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";

export default async function PrivacyPage() {
  const t = await getTranslations("legal");
  return (
    <article className="mx-auto w-[min(760px,calc(100%-2rem))] space-y-6 py-12 leading-relaxed text-muted-foreground sm:py-20">
      <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{t("privacyTitle")}</h1>
      <p>
        {site.name} collects the name, email, phone, and study preferences you type into contact or
        appointment forms so counsellors in Dar es Salaam can reply. We store those records in our
        database and do not sell them.
      </p>
      <p>
        Google sign-in is used only for staff on an allow-list. Analytics cookies are not loaded in
        this version. WhatsApp opens in Meta&apos;s application; their privacy policy applies once you
        leave this site.
      </p>
      <p>Questions: {site.email}.</p>
    </article>
  );
}
