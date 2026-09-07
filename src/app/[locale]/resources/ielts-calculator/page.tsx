import { getTranslations } from "next-intl/server";
import { IeltsCalculator } from "@/components/resources/ielts-calculator";

export default async function IeltsCalculatorPage() {
  const t = await getTranslations("resources");

  return (
    <div className="mx-auto w-[min(560px,calc(100%-2rem))] py-12 sm:py-20">
      <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{t("ieltsTitle")}</h1>
      <IeltsCalculator />
    </div>
  );
}
