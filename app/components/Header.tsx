"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const navItems = [
  { href: "/", fr: "Accueil", en: "Home" },
  {
    fr: "À propos",
    en: "About",
    children: [
      { href: "/about", fr: "Qui sommes-nous", en: "Who we are" },
      { href: "/team", fr: "Notre équipe", en: "Our team" },
    ],
  },
  {
    fr: "Nos Piliers",
    en: "Our Pillars",
    children: [
      { href: "/emergencies", fr: "🚨 Urgences Sociales", en: "🚨 Social Emergencies" },
      { href: "/digital", fr: "🛡️ Numérique & IA", en: "🛡️ Digital & AI" },
      { href: "/scholarships", fr: "🎓 Bourses & Éducation", en: "🎓 Scholarships" },
      { href: "/youth", fr: "🚀 Innovation Jeunesse", en: "🚀 Youth Innovation" },
    ],
  },
  { href: "/news", fr: "Actualités", en: "News" },
];

function Dropdown({ item, lang, current, onClose }: { item: (typeof navItems)[number]; lang: string; current?: string; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!("children" in item)) return null;

  const label = lang === "fr" ? item.fr : item.en;
  const isActive = item.children?.some((c) => c.href === current);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition ${isActive ? "text-green-700 font-bold" : "text-gray-600 hover:text-green-700"}`}
      >
        {label}
        <svg className={`w-3 h-3 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[220px] z-50">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => { setOpen(false); onClose(); }}
              className={`block px-4 py-2.5 text-sm transition ${current === child.href ? "text-green-700 font-bold bg-green-50" : "text-gray-700 hover:bg-gray-50 hover:text-green-700"}`}
            >
              {lang === "fr" ? child.fr : child.en}
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

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="AVA" className="h-10 w-auto" />
          <span className="text-2xl font-bold hidden sm:block">
            <span className="text-green-700">African Visionaries</span>{" "}
            <span className="text-yellow-600">Alliance</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            if ("href" in item) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${current === item.href ? "text-green-700 font-bold" : "text-gray-600 hover:text-green-700"}`}
                >
                  {lang === "fr" ? item.fr : item.en}
                </Link>
              );
            }
            return <Dropdown key={item.fr} item={item} lang={lang} current={current} onClose={() => {}} />;
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
          >
            <span className={lang === "fr" ? "text-green-700" : "text-gray-400"}>FR</span>
            <span className="text-gray-300">|</span>
            <span className={lang === "en" ? "text-green-700" : "text-gray-400"}>EN</span>
          </button>
          <Link href="/youth#join" className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
            {t("Rejoindre", "Join Us")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {navItems.map((item) => {
            if ("href" in item) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-lg ${current === item.href ? "text-green-700 font-bold" : "text-gray-700"}`}
                >
                  {lang === "fr" ? item.fr : item.en}
                </Link>
              );
            }

            const label = lang === "fr" ? item.fr : item.en;
            const isExpanded = mobileSubmenu === item.fr;

            return (
              <div key={item.fr}>
                <button
                  onClick={() => setMobileSubmenu(isExpanded ? null : item.fr)}
                  className="flex items-center justify-between w-full py-3 text-lg text-gray-700"
                >
                  {label}
                  <svg className={`w-4 h-4 transition ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="pl-4 pb-2 space-y-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => { setOpen(false); setMobileSubmenu(null); }}
                        className={`block py-2 text-base ${current === child.href ? "text-green-700 font-bold" : "text-gray-600"}`}
                      >
                        {lang === "fr" ? child.fr : child.en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="block w-full text-center text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition mt-3"
          >
            {lang === "fr" ? "🇬🇧 Switch to English" : "🇫🇷 Passer en Français"}
          </button>

          <Link
            href="/youth#join"
            onClick={() => setOpen(false)}
            className="block bg-green-700 text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-green-800 transition mt-3"
          >
            {t("Rejoindre l'AVA", "Join AVA")}
          </Link>
        </div>
      )}
    </header>
  );
}