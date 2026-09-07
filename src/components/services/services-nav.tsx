"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = {
  slug: string;
  title: string;
};

export function ServicesNav({
  items,
  jumpLabel,
}: {
  items: NavItem[];
  jumpLabel: string;
}) {
  const [active, setActive] = useState(items[0]?.slug ?? "");
  const mobileBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!items.length) return;

    const nodes = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!nodes.length) return;

    const visible = new Map<string, number>();
    const lastSlug = items[items.length - 1]?.slug ?? "";

    const pickActive = () => {
      if (visible.size > 0) {
        let bestId = "";
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
        return;
      }

      // Past the last section (CTA / footer): keep the last topic selected
      const last = nodes[nodes.length - 1];
      if (last && last.getBoundingClientRect().top < window.innerHeight * 0.35) {
        setActive(lastSlug);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        pickActive();
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const onScroll = () => {
      if (visible.size === 0) pickActive();
    };

    for (const node of nodes) observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  useEffect(() => {
    mobileBtnRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  function goTo(slug: string) {
    setActive(slug);
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Spacer so fixed mobile strip does not cover the first card */}
      <div className="h-[4.75rem] lg:hidden" aria-hidden />

      {/* Mobile / tablet: fixed under site header — stays visible to page end */}
      <div className="fixed inset-x-0 top-16 z-30 border-b border-border/70 bg-background/95 px-3 py-2.5 shadow-sm backdrop-blur-md md:top-[4.25rem] lg:hidden">
        <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          {jumpLabel}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = active === item.slug;
            return (
              <button
                key={item.slug}
                ref={(node) => {
                  mobileBtnRefs.current[item.slug] = node;
                }}
                type="button"
                onClick={() => goTo(item.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-center text-xs font-medium transition",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/25 hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: sticky side nav */}
      <aside className="hidden lg:block">
        <nav className="sticky top-28 space-y-1 text-sm" aria-label={jumpLabel}>
          {items.map((item) => {
            const isActive = active === item.slug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => goTo(item.slug)}
                className={cn(
                  "block w-full rounded-lg border-l-2 px-3 py-2.5 text-left leading-relaxed transition",
                  isActive
                    ? "border-l-primary bg-primary/10 font-medium text-foreground"
                    : "border-l-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
