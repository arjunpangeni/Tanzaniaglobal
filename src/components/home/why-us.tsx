import { getTranslations } from "next-intl/server";
import { Award, Earth, HeartHandshake, ListChecks, MessagesSquare, ShieldCheck } from "lucide-react";
import { iconTones } from "@/lib/icon-tones";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HomeMagicCard } from "@/components/home/home-magic-card";

export async function WhyUs() {
  const t = await getTranslations("home");
  const items = [
    { icon: MessagesSquare, title: t("why1t"), body: t("why1d") },
    { icon: Earth, title: t("why2t"), body: t("why2d") },
    { icon: ShieldCheck, title: t("why3t"), body: t("why3d") },
    { icon: ListChecks, title: t("why4t"), body: t("why4d") },
    { icon: Award, title: t("why5t"), body: t("why5d") },
    { icon: HeartHandshake, title: t("why6t"), body: t("why6d") },
  ];

  return (
    <section className="section-pad mx-auto w-[min(1120px,calc(100%-2rem))]">
      <h2 className="heading-soft font-heading text-3xl text-foreground md:text-[2.35rem]">{t("whyTitle")}</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <BlurFade key={item.title} delay={i * 0.04}>
            <HomeMagicCard className="cursor-default transition duration-300 hover:-translate-y-1">
              <div className="p-7">
                <span className={`grid size-12 place-items-center rounded-2xl ${iconTones[i % iconTones.length]}`}>
                  <item.icon className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-medium">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </HomeMagicCard>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
