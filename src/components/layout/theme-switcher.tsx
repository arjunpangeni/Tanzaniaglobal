"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-8 w-[3.65rem] shrink-0 items-center rounded-full border border-border/70 bg-muted/50 p-0.5",
        "transition-colors hover:border-border focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 left-0.5 size-7 rounded-full bg-background shadow-sm ring-1 ring-border/60 transition-transform duration-300 ease-out",
          isDark && "translate-x-[1.65rem]"
        )}
      />
      <span className="relative z-10 grid w-[1.575rem] place-items-center">
        <Sun
          className={cn(
            "size-3.5 transition-colors duration-300",
            isDark ? "text-foreground/50" : "text-amber-500"
          )}
        />
      </span>
      <span className="relative z-10 grid w-[1.575rem] place-items-center">
        <Moon
          className={cn(
            "size-3.5 transition-colors duration-300",
            isDark ? "text-sky-300" : "text-foreground/50"
          )}
        />
      </span>
    </button>
  );
}
