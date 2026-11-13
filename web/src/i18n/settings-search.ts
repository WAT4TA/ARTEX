import type { i18n } from "i18next";

export function matchesSettingsQuery(instance: Pick<i18n, "t">, keywordKey: string, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  const keywords = ["zh-TW", "zh-CN", "en"].map((lng) => instance.t(keywordKey, { lng })).join(" ");
  return keywords.toLowerCase().includes(normalized);
}
