"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { destinations } from "@/content/destinations";
import { fieldsOfStudy, rankingTiers } from "@/content/universities-meta";

export function FilterBar() {
  const t = useTranslations("universitiesPage");
  const router = useRouter();
  const params = useSearchParams();

  const qParam = params.get("q") ?? "";
  const country = params.get("country") ?? "all";
  const ranking = params.get("ranking") ?? "all";
  const field = params.get("field") ?? "all";

  const [q, setQ] = useState(qParam);

  useEffect(() => {
    setQ(qParam);
  }, [qParam]);

  useEffect(() => {
    if (q === qParam) return;
    const current = params.toString();
    const id = window.setTimeout(() => {
      const next = new URLSearchParams(current);
      if (!q) next.delete("q");
      else next.set("q", q);
      next.delete("page");
      router.replace(`?${next.toString()}`);
    }, 400);
    return () => window.clearTimeout(id);
  }, [q, qParam, params, router]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    next.delete("page");
    router.replace(`?${next.toString()}`);
  }

  return (
    <div className="glass grid gap-3 rounded-2xl p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
      <Input
        value={q}
        placeholder={t("search")}
        className="h-10"
        onChange={(e) => setQ(e.target.value)}
      />
      <select
        value={country}
        className="field-select"
        onChange={(e) => update("country", e.target.value)}
      >
        <option value="all">{t("allCountries")}</option>
        {destinations.map((d) => (
          <option key={d.slug} value={d.slug}>
            {d.name.en}
          </option>
        ))}
      </select>
      <select
        value={ranking}
        className="field-select"
        onChange={(e) => update("ranking", e.target.value)}
      >
        {rankingTiers.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <select
        value={field}
        className="field-select"
        onChange={(e) => update("field", e.target.value)}
      >
        <option value="all">{t("allFields")}</option>
        {fieldsOfStudy.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}
