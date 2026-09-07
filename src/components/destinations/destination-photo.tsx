"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function DestinationPhoto({
  src,
  alt,
  fallback,
  className,
  imgClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <span className={cn("relative block overflow-hidden bg-[#1b2430]", className)}>
      {!failed ? (
        <Image
          src={current}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          onError={() => {
            if (fallback && current !== fallback) setCurrent(fallback);
            else setFailed(true);
          }}
        />
      ) : (
        <span className="absolute inset-0 bg-linear-to-br from-[#1a4d62] via-[#2a7a68] to-[#8a4568]" />
      )}
    </span>
  );
}
