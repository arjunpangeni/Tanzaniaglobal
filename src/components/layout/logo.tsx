"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
  onClick,
}: {
  className?: string;
  light?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const pathname = usePathname();

  function goToTop(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      event.preventDefault();
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    onClick?.(event);
  }

  return (
    <Link
      href="/"
      scroll
      onClick={goToTop}
      className={cn("flex min-w-0 shrink-0 items-center gap-1.5 md:gap-2", className)}
      aria-label="Tanzania Global Ltd"
    >
      <Image
        src="/logo.png"
        alt=""
        width={486}
        height={513}
        sizes="(max-width: 767px) 52px, (max-width: 1023px) 60px, 68px"
        className="h-[52px] w-auto shrink-0 object-contain md:h-[60px] lg:h-[68px]"
        style={{ width: "auto" }}
        priority
      />
      <span className="flex min-w-0 flex-col justify-center">
        <span
          className={cn(
            "font-heading text-[0.78rem] leading-none font-semibold tracking-[-0.025em] whitespace-nowrap md:text-[0.88rem] lg:text-[0.95rem]",
            light ? "text-white" : "text-foreground"
          )}
        >
          Tanzania Global
        </span>
        <span
          className={cn(
            "mt-1 text-[0.56rem] leading-none font-semibold tracking-[0.18em] uppercase md:text-[0.6rem] lg:text-[0.62rem]",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          Ltd
        </span>
      </span>
    </Link>
  );
}
