"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function band(n: number) {
  const r = Math.round(n * 2) / 2;
  return Math.min(9, Math.max(0, r));
}

export function IeltsCalculator() {
  const t = useTranslations("resources");
  const [scores, setScores] = useState({ l: 6, r: 6, w: 6, s: 6 });
  const overall = useMemo(
    () => band((scores.l + scores.r + scores.w + scores.s) / 4),
    [scores]
  );

  function field(key: keyof typeof scores, label: string) {
    return (
      <div className="grid gap-2">
        <Label>{label}</Label>
        <Input
          type="number"
          min={0}
          max={9}
          step={0.5}
          value={scores[key]}
          className="h-10"
          onChange={(e) => setScores((s) => ({ ...s, [key]: Number(e.target.value) }))}
        />
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-5">
        {field("l", t("listening"))}
        {field("r", t("reading"))}
        {field("w", t("writing"))}
        {field("s", t("speaking"))}
      </div>
      <div className="mt-8 rounded-3xl bg-linear-to-r from-tz-pink via-card to-tz-blue p-6 text-center text-foreground">
        <p className="text-sm text-muted-foreground">{t("overall")}</p>
        <p className="font-heading text-6xl text-foreground">{overall.toFixed(1)}</p>
      </div>
    </>
  );
}
