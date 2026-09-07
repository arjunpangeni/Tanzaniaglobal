"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { site } from "@/content/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.91.52 3.77 1.5 5.4L2 22l4.92-1.6a10.1 10.1 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.83 13.98c-.25.7-1.22 1.28-2.01 1.45-.53.11-1.23.2-3.57-.76-3-1.23-4.93-4.24-5.08-4.44-.14-.2-1.18-1.56-1.18-2.98 0-1.42.75-2.12 1.01-2.4.25-.29.66-.41 1.05-.41.13 0 .24 0 .34.01.3.01.45.03.65.5.25.59.84 2.05.91 2.2.08.15.13.32.02.52-.1.2-.16.32-.31.5-.16.17-.33.39-.47.52-.16.15-.32.31-.14.61.18.29.8 1.31 1.71 2.12 1.18 1.05 2.14 1.38 2.47 1.53.32.14.51.12.7-.08.2-.2.8-.92 1.02-1.24.21-.32.43-.26.72-.16.3.1 1.88.89 2.2 1.05.32.16.53.24.61.37.08.14.08.79-.17 1.49z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("whatsapp");
  const cta = useTranslations("cta");
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t("greeting"))}`;

  return (
    <div className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex flex-col items-end gap-3 sm:right-4">
      {open && (
        <div className="w-[min(18rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between bg-[#128C7E] px-4 py-3 text-white">
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="size-5" />
              <p className="text-sm font-medium">{t("title")}</p>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <X className="size-4" />
            </button>
          </div>
          <div className="space-y-3 p-4">
            <p className="text-sm text-muted-foreground">{t("body")}</p>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] text-sm font-medium text-white hover:bg-[#1fb855]"
            >
              <WhatsAppIcon className="size-4" />
              {cta("startChat")}
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="size-8" />
      </button>
    </div>
  );
}
