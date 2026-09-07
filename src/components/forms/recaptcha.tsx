"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

export function Recaptcha({
  onChange,
  resetSignal = 0,
}: {
  onChange: (token: string) => void;
  resetSignal?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  function renderWidget() {
    if (!SITE_KEY || !host.current || !window.grecaptcha || widgetId.current !== null) return;
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    widgetId.current = window.grecaptcha.render(host.current, {
      sitekey: SITE_KEY,
      theme,
      callback: onChange,
      "expired-callback": () => onChange(""),
      "error-callback": () => onChange(""),
    });
  }

  useEffect(() => {
    window.grecaptcha?.ready(renderWidget);
  }, []);

  useEffect(() => {
    if (widgetId.current === null || !window.grecaptcha) return;
    window.grecaptcha.reset(widgetId.current);
    onChange("");
  }, [resetSignal]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => window.grecaptcha?.ready(renderWidget)}
      />
      <div className="w-full max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div ref={host} className="inline-block origin-top-left max-[360px]:scale-[0.82]" />
      </div>
    </>
  );
}