"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";

export function HomeMagicCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "h-full rounded-2xl shadow-[0_12px_32px_-10px_rgba(27,36,48,0.28)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <MagicCard
        className="h-full rounded-2xl caret-transparent select-none [&>div:last-child]:h-full"
        gradientSize={220}
        gradientColor={dark ? "#1b3d52" : "#d4ecf8"}
        gradientFrom="#1f7ab3"
        gradientTo="#c45d84"
        gradientOpacity={0.55}
      >
        {children}
      </MagicCard>
    </div>
  );
}
