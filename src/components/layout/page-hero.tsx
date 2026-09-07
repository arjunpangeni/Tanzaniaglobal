import { BlurFade } from "@/components/magicui/blur-fade";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto w-[min(960px,calc(100%-2rem))] pt-12 pb-8 text-center sm:pt-16 sm:pb-10 md:pt-24 md:pb-14">
      <BlurFade>
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-tz-blue-deep uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="heading-soft font-heading text-[1.7rem] leading-[1.28] text-balance text-foreground sm:text-[2rem] md:text-[2.6rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="heading-soft mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.75] text-muted-foreground text-pretty">
            {subtitle}
          </p>
        ) : null}
      </BlurFade>
    </section>
  );
}
