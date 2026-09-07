import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { AppointmentForm } from "@/components/forms/appointment-form";

export default async function AppointmentPage() {
  const t = await getTranslations("appointment");
  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto w-[min(1040px,calc(100%-2rem))] pb-24">
        <AppointmentForm />
      </div>
    </>
  );
}
