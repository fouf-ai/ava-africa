"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const navItems = [
  { href: "/", fr: "Accueil", en: "Home", ar: "الرئيسية" },
  {
    fr: "À propos",
    en: "About",
    ar: "من نحن",
    children: [
      { href: "/about", fr: "Qui sommes-nous", en: "Who we are", ar: "من نحن" },
      { href: "/team", fr: "Notre équipe", en: "Our team", ar: "فريقنا" },
      { href: "/emergencies", fr: "🚨 Urgences Sociales", en: "🚨 Social Emergencies", ar: "🚨 الطوارئ الاجتماعية" },
      { href: "/digital", fr: "🛡️ Souveraineté Numérique", en: "🛡️ Digital Sovereignty", ar: "🛡️ السيادة الرقمية" },
    ],
  },
  { href: "/learn", fr: "Apprendre", en: "Learn", ar: "تعلّم" },
  { href: "/news", fr: "Actualités", en: "News", ar: "الأخبار" },
  { href: "/tools", fr: "Outils IA", en: "AI Tools", ar: "أدوات الذكاء الاصطناعي" },
];

type NavChild = { href: string; fr: string; en: string; ar: string };
type NavItem = { href?: string; fr: string; en: string; ar: string; children?: NavChild[] };

function getLabel(item: { fr: string; en: string; ar: string }, lang: string) {
  if (lang === "ar") return item.ar;
  if (lang === "en") return item.en;
  return item.fr;
}

function Dropdown({ item, lang, current }: { item: NavItem; lang: string; current?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!item.children) return null;
  const isActive = item.children.some((c) => c.href === current);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 text-sm font-medium transition ${isActive ? "text-green-700 font-bold" : "text-gray-600 hover:text-green-700"}`}>
        {getLabel(item, lang)}
        <svg className={`w-3 h-3 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className={`absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[240px] z-50 ${lang === "ar" ? "right-0" : "left-0"}`}>
          {item.children.map((child) => (
            <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className={`block px-4 py-2.5 text-sm transition ${current === child.href ? "text-green-700 font-bold bg-green-50" : "text-gray-700 hover:bg-gray-50 hover:text-green-700"}`}>
              {getLabel(child, lang)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const { lang, setLang, t } = useLanguage();
  const languages: Array<"fr" | "en" | "ar"> = ["fr", "en", "ar"];
  const langFlags = { fr: "🇫🇷", en: "🇬🇧", ar: "🇸🇦" };
  const langLabels = { fr: "FR", en: "EN", ar: "AR" };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="AVA" className="h-10 w-auto" />
          <span className="text-xl font-bold hidden sm:block"><span className="text-green-700">African Visionaries</span>{" "}<span className="text-yellow-600">Alliance</span></span>
        </Link>

        <nav className="hidden lg:flex gap-6 items-center">
          {navItems.map((item) => {
            if ("href" in item && item.href) {
              return <Link key={item.href} href={item.href} className={`text-sm font-medium transition ${current === item.href ? "text-green-700 font-bold" : "text-gray-600 hover:text-green-700"}`}>{getLabel(item, lang)}</Link>;
            }
            return <Dropdown key={item.fr} item={item} lang={lang} current={current} />;
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            {languages.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1.5 text-xs font-semibold transition ${lang === l ? "bg-green-700 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                {langFlags[l]} {langLabels[l]}
              </button>
            ))}
          </div>
          <Link href="/join" className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
            {t("Rejoindre", "Join Us", "انضم إلينا")}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5" aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            if ("href" in item && item.href) {
              return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`block py-3 text-lg ${current === item.href ? "text-green-700 font-bold" : "text-gray-700"}`}>{getLabel(item, lang)}</Link>;
            }
            const label = getLabel(item, lang);
            const isExpanded = mobileSubmenu === item.fr;
            return (
              <div key={item.fr}>
                <button onClick={() => setMobileSubmenu(isExpanded ? null : item.fr)} className="flex items-center justify-between w-full py-3 text-lg text-gray-700">
                  {label}
                  <svg className={`w-4 h-4 transition ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isExpanded && item.children && (
                  <div className={`${lang === "ar" ? "pr-4" : "pl-4"} pb-2 space-y-1`}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => { setOpen(false); setMobileSubmenu(null); }} className={`block py-2 text-base ${current === child.href ? "text-green-700 font-bold" : "text-gray-600"}`}>{getLabel(child, lang)}</Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2 pt-3">
            {languages.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${lang === l ? "bg-green-700 text-white" : "border border-gray-300 text-gray-600"}`}>{langFlags[l]} {langLabels[l]}</button>
            ))}
          </div>
          <Link href="/join" onClick={() => setOpen(false)} className="block bg-green-700 text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-green-800 transition mt-3">
            {t("Rejoindre l'AVA", "Join AVA", "انضم إلى التحالف")}
          </Link>
        </div>
      )}
    </header>
  );
}