"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function UniversityLogo({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (src && !failed) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image
          src={src}
          alt={`${name} logo`}
          width={80}
          height={80}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "grid place-items-center rounded-xl bg-muted text-xs font-semibold text-muted-foreground",
        className
      )}
    >
      {initials}
    </span>
  );
}
