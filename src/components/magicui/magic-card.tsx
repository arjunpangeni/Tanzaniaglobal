"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export function MagicCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
        className
      )}
      style={
        {
          "--mx": `${pos.x}px`,
          "--my": `${pos.y}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--mx) var(--my), color-mix(in oklch, var(--tz-blue-deep) 18%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
