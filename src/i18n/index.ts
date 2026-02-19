import I18nImport from "i18n-js";
import th from "./locales/th";
import en from "./locales/en";

// Import translations from separate locale files
const translations = {
  th,
  en,
};

// Use the imported I18n if available, otherwise provide a minimal fallback
const I18n: any = (I18nImport as any) || {
  translations: {},
  defaultLocale: "th",
  locale: "th",
  t: (key: string, opts?: Record<string, any>) => {
    const parts = key.split(".");
    const loc = ((I18n as any).locale || "th") as keyof typeof translations;
    let cur: any = translations[loc];
    for (const p of parts) {
      if (!cur) break;
      cur = cur[p];
    }
    if (typeof cur === "string") {
      if (!opts) return cur;
      return cur.replace(
        /\{\{(\w+)\}\}/g,
        (_m: string, k: string) => opts[k] ?? ""
      );
    }
    return key;
  },
};

I18n.translations = translations;
I18n.defaultLocale = I18n.defaultLocale || "th";
I18n.locale = I18n.locale || "th";

export default I18n;
