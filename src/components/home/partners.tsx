import { getTranslations } from "next-intl/server";
import { getPartnerUniversities } from "@/lib/data";
import { Marquee } from "@/components/magicui/marquee";
import { UniversityLogo } from "@/components/universities/university-logo";

export async function Partners() {
  const t = await getTranslations("home");
  const partners = getPartnerUniversities(24);
  return (
    <section className="py-14">
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        {t("partnersTitle")}
      </p>
      <Marquee pauseOnHover repeat={2} className="[--duration:42s]">
        {partners.map((u) => (
          <div
            key={u.slug}
            className="glass flex h-16 max-w-xs shrink-0 items-center gap-3 rounded-full px-5 text-sm font-medium"
          >
            <UniversityLogo name={u.name} src={u.logoUrl} className="size-8 shrink-0" />
            <span className="truncate">{u.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
