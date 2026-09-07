import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";

export default async function TermsPage() {
  const t = await getTranslations("legal");
  return (
    <article className="mx-auto w-[min(760px,calc(100%-2rem))] space-y-6 py-12 leading-relaxed text-muted-foreground sm:py-20">
      <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{t("termsTitle")}</h1>
      <p>
        Counselling does not guarantee admission, a visa, or a scholarship. University fees and
        embassy rules change; we confirm the current checklist before you pay an application
        package.
      </p>
      <p>
        Placeholder statistics and partner names on this site will be replaced with contracted
        figures. Booking a slot holds a conversation; it is not a contract until we send a written
        scope.
      </p>
      <p>{site.address}</p>
    </article>
  );
}
