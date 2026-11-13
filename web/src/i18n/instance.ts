import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";
import { resources } from "./messages";

export function createAppI18n() {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LOCALE,
    // zh-CN holds the source strings, so a key missing from zh-TW still renders.
    fallbackLng: "zh-CN",
    supportedLngs: [...SUPPORTED_LOCALES],
    load: "currentOnly",
    initAsync: false,
    keySeparator: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}
