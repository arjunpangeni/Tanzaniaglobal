"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { submitAppointment } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { LeadFields } from "./lead-fields";
import { Recaptcha } from "./recaptcha";

function toKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function AppointmentForm() {
  const t = useTranslations("appointment");
  const contact = useTranslations("contact");
  const [date, setDate] = useState<Date | undefined>();
  const [purpose, setPurpose] = useState<"counselling" | "inquiry">("counselling");
  const [location, setLocation] = useState<"online" | "dar" | "reading">("online");
  const [captcha, setCaptcha] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [state, setState] = useState<"idle" | "ok" | "err" | "taken" | "captcha">("idle");
  const [pending, setPending] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!date || !captcha) return;
        setPending(true);
        const fd = new FormData(e.currentTarget);
        fd.set("date", toKey(date));
        fd.set("purpose", purpose);
        fd.set("location", location);
        fd.set("mode", location === "online" ? "online" : "in-person");
        fd.set("captcha", captcha);
        const res = await submitAppointment(fd);
        setState(res.ok ? "ok" : res.error === "taken" ? "taken" : res.error === "captcha" ? "captcha" : "err");
        setCaptchaReset((n) => n + 1);
        setPending(false);
      }}
    >
      <div className="glass overflow-x-auto rounded-3xl p-4 text-foreground sm:p-5">
        <p className="mb-3 text-sm font-medium text-foreground">{t("date")}</p>
        <Calendar
          className="mx-auto"
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(d) => {
            const copy = new Date(d);
            copy.setHours(0, 0, 0, 0);
            const day = copy.getDay();
            return copy < today || day === 0 || day === 6;
          }}
        />
      </div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">{t("purpose")}</p>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["counselling", "purposeCounselling"],
                ["inquiry", "purposeInquiry"],
              ] as const
            ).map(([value, key]) => (
              <button
                key={value}
                type="button"
                onClick={() => setPurpose(value)}
                className={`rounded-full border px-3 py-2 text-xs font-medium text-foreground ${
                  purpose === value ? "border-primary bg-tz-green" : "border-border bg-background"
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">{t("location")}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(
              [
                ["online", "locationOnline"],
                ["dar", "locationDar"],
                ["reading", "locationReading"],
              ] as const
            ).map(([value, key]) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocation(value)}
                className={`rounded-full border px-3 py-2 text-xs font-medium text-foreground ${
                  location === value ? "border-primary bg-tz-green" : "border-border bg-background"
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>
        <LeadFields />
        <Recaptcha onChange={setCaptcha} resetSignal={captchaReset} />
        <Button type="submit" disabled={pending || !date || !captcha} className="h-11 w-full rounded-full">
          {pending ? "…" : t("submit")}
        </Button>
        {state === "ok" ? <p className="text-sm text-primary">{t("success")}</p> : null}
        {state === "taken" ? <p className="text-sm text-destructive">{t("taken")}</p> : null}
        {state === "captcha" ? <p className="text-sm text-destructive">{t("captcha")}</p> : null}
        {state === "err" ? <p className="text-sm text-destructive">{contact("error")}</p> : null}
      </div>
    </form>
  );
}
