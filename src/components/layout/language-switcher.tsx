"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlagIcon } from "./flag-icon";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(next: "en" | "sw") {
    router.replace(
      // @ts-expect-error next-intl accepts the current pathname
      { pathname, params },
      { locale: next }
    );
  }

  return (
    <div className="flex items-center rounded-full border border-border/70 bg-background/60 p-0.5 text-xs">
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => switchTo("en")}
        className={cn(
          "gap-1 rounded-full px-1.5 sm:gap-1.5 sm:px-2.5",
          locale === "en" && "bg-secondary text-secondary-foreground"
        )}
      >
        <FlagIcon code="gb" alt="" />
        <span className="hidden sm:inline">EN</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => switchTo("sw")}
        className={cn(
          "gap-1 rounded-full px-1.5 sm:gap-1.5 sm:px-2.5",
          locale === "sw" && "bg-accent text-accent-foreground"
        )}
      >
        <FlagIcon code="tz" alt="" />
        <span className="hidden sm:inline">SW</span>
      </Button>
    </div>
  );
}
