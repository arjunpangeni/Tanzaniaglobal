import { getTranslations } from "next-intl/server";
import { ChevronDown, ChevronRight, FileText, ListChecks, MessagesSquare, PlaneTakeoff } from "lucide-react";
import { HomeMagicCard } from "@/components/home/home-magic-card";

const stepsMeta = [
  {
    icon: MessagesSquare,
    well: "bg-[#fadce7] text-[#9a3d64] dark:bg-[#c45d84] dark:text-white",
  },
  {
    icon: ListChecks,
    well: "bg-[#d4ecf8] text-[#155e8c] dark:bg-[#1f7ab3] dark:text-white",
  },
  {
    icon: FileText,
    well: "bg-[#d8f3e5] text-[#18764e] dark:bg-[#2a8a5f] dark:text-white",
  },
  {
    icon: PlaneTakeoff,
    well: "bg-[#d4ecf8] text-[#155e8c] dark:bg-[#1f7ab3] dark:text-white",
  },
] as const;

function PathArrow({ down }: { down?: boolean }) {
  const Icon = down ? ChevronDown : ChevronRight;
  return (
    <span className="grid size-8 place-items-center rounded-full border border-[#c45d84]/35 bg-background text-[#c45d84] shadow-sm dark:border-[#f4b6cd]/35 dark:bg-card dark:text-[#f4b6cd]">
      <Icon className="size-4" strokeWidth={2.25} />
    </span>
  );
}

export async function HowItWorks() {
  const t = await getTranslations("home");
  const steps = [
    { title: t("how1t"), body: t("how1d") },
    { title: t("how2t"), body: t("how2d") },
    { title: t("how3t"), body: t("how3d") },
    { title: t("how4t"), body: t("how4d") },
  ];

  return (
    <section className="section-pad mx-auto w-[min(1120px,calc(100%-2rem))]">
      <h2 className="heading-soft font-heading text-3xl text-foreground md:text-[2.35rem]">{t("howTitle")}</h2>
      <ol className="mt-12 flex flex-col lg:grid lg:grid-cols-4 lg:items-stretch lg:gap-x-10">
        {steps.map((step, i) => {
          const meta = stepsMeta[i];
          const Icon = meta.icon;
          const last = i === steps.length - 1;

          return (
            <li key={step.title} className="relative flex flex-col">
              <HomeMagicCard className="h-full transition duration-300 hover:-translate-y-1">
                <div className="flex h-full min-h-[16.5rem] flex-col p-7 text-foreground">
                  <span className={`grid size-12 place-items-center rounded-2xl ${meta.well}`}>
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 min-h-[3.25rem] font-medium text-foreground">{step.title}</h3>
                  <p className="mt-2.5 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </HomeMagicCard>

              {!last ? (
                <>
                  <div className="flex flex-col items-center py-3 lg:hidden" aria-hidden>
                    <span className="h-4 w-0.5 rounded-full bg-linear-to-b from-[#1f7ab3]/50 to-[#c45d84]/50" />
                    <PathArrow down />
                  </div>
                  <div
                    className="pointer-events-none absolute top-1/2 -right-8 hidden w-8 -translate-y-1/2 items-center justify-center lg:flex"
                    aria-hidden
                  >
                    <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-linear-to-r from-[#1f7ab3]/50 to-[#c45d84]/50" />
                    <PathArrow />
                  </div>
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
