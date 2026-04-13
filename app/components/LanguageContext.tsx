"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en" | "ar";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (fr: string, en: string, ar?: string) => string;
  dir: "ltr" | "rtl";
}>({
  lang: "fr",
  setLang: () => {},
  t: (fr) => fr,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (fr: string, en: string, ar?: string) => {
    if (lang === "en") return en;
    if (lang === "ar") return ar || en;
    return fr;
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}