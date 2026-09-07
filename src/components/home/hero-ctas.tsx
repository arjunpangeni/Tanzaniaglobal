"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CoolMode } from "@/components/ui/cool-mode";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function HeroCtas({ className }: { className?: string }) {
  const cta = useTranslations("cta");

  return (
    <div
      className={
        className ??
        "flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
      }
    >
      <RainbowButton asChild size="lg" className="h-11 w-full rounded-full px-8 sm:w-auto">
        <Link href="/contact">{cta("getStarted")}</Link>
      </RainbowButton>
      <CoolMode className="inline-flex w-full sm:w-auto">
        <Link
          href="/appointment"
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 text-sm font-medium whitespace-nowrap text-white transition hover:bg-white/20 sm:w-auto"
        >
          {cta("book")}
        </Link>
      </CoolMode>
    </div>
  );
}
