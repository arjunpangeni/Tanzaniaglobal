"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { submitEnquiry } from "@/actions/leads";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { LeadFields } from "./lead-fields";
import { Recaptcha } from "./recaptcha";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as "en" | "sw";
  const params = useSearchParams();
  const defaults = {
    destination: params.get("destination") ?? undefined,
    service: params.get("service") ?? undefined,
    university: params.get("university") ?? undefined,
  };
  const universityName = defaults.university
    ? defaults.university.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;
  const serviceName = defaults.service
    ? services.find((s) => s.slug === defaults.service)?.title[locale]
    : undefined;
  const [state, setState] = useState<"idle" | "ok" | "err" | "captcha">("idle");
  const [pending, setPending] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);

  return (
    <form
      className="space-y-3 sm:space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (SITE_KEY && !captcha) return;
        setPending(true);
        const form = e.currentTarget;
        const fd = new FormData(form);
        fd.set("captcha", captcha);
        const res = await submitEnquiry(fd);
        if (res.ok) {
          form.reset();
          setState("ok");
        } else {
          setState(res.error === "captcha" ? "captcha" : "err");
        }
        setCaptchaReset((n) => n + 1);
        setPending(false);
      }}
    >
      {universityName ? (
        <p className="text-sm text-muted-foreground">
          {t("aboutUniversity", { name: universityName })}
        </p>
      ) : null}
      {serviceName ? (
        <p className="text-sm text-muted-foreground">
          {t("aboutService", { name: serviceName })}
        </p>
      ) : null}
      <LeadFields defaults={defaults} />
      <Recaptcha onChange={setCaptcha} resetSignal={captchaReset} />
      <Button
        type="submit"
        disabled={pending || Boolean(SITE_KEY && !captcha)}
        className="h-11 w-full rounded-full"
      >
        {pending ? t("sending") : t("submit")}
      </Button>
      {state === "ok" ? <p className="text-sm text-primary">{t("success")}</p> : null}
      {state === "captcha" ? (
        <p className="text-sm text-destructive">{t("captcha")}</p>
      ) : null}
      {state === "err" ? <p className="text-sm text-destructive">{t("error")}</p> : null}
    </form>
  );
}
