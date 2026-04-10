"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const navLinks = [
  { href: "/", fr: "Accueil", en: "Home" },
  { href: "/about", fr: "À propos", en: "About" },
  { href: "/emergencies", fr: "Urgences", en: "Emergencies" },
  { href: "/scholarships", fr: "Bourses", en: "Scholarships" },
  { href: "/digital", fr: "Numérique", en: "Digital" },
  { href: "/youth", fr: "Jeunesse", en: "Youth" },
  { href: "/team", fr: "Équipe", en: "Team" },
  { href: "/news", fr: "Actualités", en: "News" },
];

export default function Header({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="AVA" className="h-10 w-auto" />
          <span className="text-2xl font-bold hidden sm:block"><span className="text-green-700">African Visionaries</span>{" "}<span className="text-yellow-600">Alliance</span></span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                current === link.href
                  ? "text-green-700 font-bold"
                  : "hover:text-green-700"
              }
            >
              {lang === "fr" ? link.fr : link.en}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
          >
            <span className={lang === "fr" ? "text-green-700" : "text-gray-400"}>FR</span>
            <span className="text-gray-300">|</span>
            <span className={lang === "en" ? "text-green-700" : "text-gray-400"}>EN</span>
          </button>

          <Link
            href="/youth"
            className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition"
          >
            {t("Rejoindre", "Join Us")}
          </Link>
        </div>

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

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-lg ${
                current === link.href
                  ? "text-green-700 font-bold"
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              {lang === "fr" ? link.fr : link.en}
            </Link>
          ))}

          {/* Mobile Language Toggle */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="block w-full text-center text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
          >
            {lang === "fr" ? "🇬🇧 Switch to English" : "🇫🇷 Passer en Français"}
          </button>

          <Link
            href="/youth"
            onClick={() => setOpen(false)}
            className="block bg-green-700 text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-green-800 transition mt-4"
          >
            {t("Rejoindre l'AVA", "Join AVA")}
          </Link>
        </div>
      )}
    </header>
  );
}