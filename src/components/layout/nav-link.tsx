"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Href = ComponentProps<typeof Link>["href"];

export function NavLink({
  href,
  exact = false,
  className,
  activeClassName,
  children,
  onClick,
}: {
  href: Href;
  exact?: boolean;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  onClick?: ComponentProps<typeof Link>["onClick"];
}) {
  const pathname = usePathname();
  const path = typeof href === "string" ? href : href.pathname ?? "/";
  const active = exact ? pathname === path : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(className, active && activeClassName)}
    >
      {children}
    </Link>
  );
}
