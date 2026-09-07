import { getTranslations } from "next-intl/server";
import { BorderBeam } from "@/components/magicui/border-beam";
import { HeroCtas } from "@/components/home/hero-ctas";

export async function CtaBand() {
  const t = await getTranslations("home");

  return (
    <section className="px-5 pb-20">
      <div className="relative mx-auto w-[min(1120px,100%)] overflow-hidden rounded-3xl bg-linear-to-br from-[#1a4d62] via-[#2a7a68] to-[#8a4568] px-5 py-10 text-white sm:px-8 sm:py-14 md:px-14 md:py-16">
        <BorderBeam />
        <h2 className="heading-on-media max-w-xl font-heading text-[1.7rem] leading-snug sm:text-3xl md:text-[2.35rem]">{t("ctaTitle")}</h2>
        <p className="mt-4 max-w-xl leading-[1.75] text-white/80 sm:mt-5">{t("ctaBody")}</p>
        <HeroCtas className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4" />
      </div>
    </section>
  );
}