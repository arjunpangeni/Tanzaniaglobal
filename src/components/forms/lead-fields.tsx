"use client";

import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { destinations } from "@/content/destinations";
import { studyLevels } from "@/content/site";

export function LeadFields({
  defaults,
}: {
  defaults?: { destination?: string; service?: string; university?: string };
}) {
  const t = useTranslations("contact");
  const locale = useLocale() as "en" | "sw";

  return (
    <div className="grid gap-3 sm:gap-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="service" defaultValue={defaults?.service ?? ""} />
      <input type="hidden" name="university" defaultValue={defaults?.university ?? ""} />
      <div className="grid gap-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" name="name" required className="h-10" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            className="h-10"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            pattern="\+?[0-9]{8,15}"
            minLength={8}
            maxLength={15}
            placeholder="+255 7XX XXX XXX"
            className="h-10"
            onInput={(e) => {
              const raw = e.currentTarget.value;
              const plus = raw.trim().startsWith("+") ? "+" : "";
              const next = `${plus}${raw.replace(/\D/g, "").slice(0, 15)}`;
              if (e.currentTarget.value !== next) e.currentTarget.value = next;
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="grid gap-2">
          <Label htmlFor="destination">{t("destination")}</Label>
          <select
            id="destination"
            name="destination"
            defaultValue={defaults?.destination ?? ""}
            className="field-select"
          >
            <option value="">—</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name[locale]}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="studyLevel">{t("level")}</Label>
          <select
            id="studyLevel"
            name="studyLevel"
            className="field-select"
          >
            {studyLevels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" rows={3} className="sm:min-h-24" />
      </div>
    </div>
  );
}
