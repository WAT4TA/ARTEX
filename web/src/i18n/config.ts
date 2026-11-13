export const DEFAULT_LOCALE = "zh-TW";
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, "zh-CN", "en"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const LOCALE_STORAGE_KEY = "artex_locale";

// Traditional Chinese (Taiwan) is the default; only an explicit Simplified or
// English preference selects another locale.
export function resolveLocale(value: string | null | undefined): AppLocale {
  const tag = value ?? "";
  if (/^en(?:-|$)/i.test(tag)) return "en";
  if (/^zh-(?:CN|SG|Hans)(?:-|$)/i.test(tag)) return "zh-CN";
  return DEFAULT_LOCALE;
}
