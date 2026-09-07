"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FlagIcon({
  code,
  alt,
  className,
}: {
  code: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const iso = code.toLowerCase();

  if (failed) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex h-3.5 min-w-5 items-center justify-center rounded-[3px] bg-muted px-1 text-[9px] font-bold tracking-wide text-foreground",
          className
        )}
      >
        {iso.toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${iso}.png`}
      srcSet={`https://flagcdn.com/w40/${iso}.png 1x, https://flagcdn.com/w80/${iso}.png 2x, https://flagcdn.com/w160/${iso}.png 3x`}
      alt={alt}
      width={28}
      height={20}
      className={cn("h-3.5 w-5 rounded-[3px] object-cover shadow-sm ring-1 ring-black/10", className)}
      onError={() => setFailed(true)}
    />
  );
}
