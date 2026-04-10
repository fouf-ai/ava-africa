"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="mb-4">
            <img src="/logo.png" alt="AVA" className="h-10 w-auto mb-2" />
            <span className="text-xl font-bold"><span className="text-green-400">African Visionaries</span>{" "}<span className="text-yellow-400">Alliance</span></span>
          </div>
          <p className="text-sm">{t("Voir plus loin. Agir plus vite. Bâtir l'Afrique.", "See further. Act faster. Build Africa.")}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Piliers", "Pillars")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/emergencies" className="hover:text-white">{t("Urgences Sociales", "Social Emergencies")}</Link></li>
            <li><Link href="/digital" className="hover:text-white">{t("Souveraineté Numérique", "Digital Sovereignty")}</Link></li>
            <li><Link href="/scholarships" className="hover:text-white">{t("Bourses & Éducation", "Scholarships & Education")}</Link></li>
            <li><Link href="/youth" className="hover:text-white">{t("Innovation Jeunesse", "Youth Innovation")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Organisation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">{t("À propos", "About")}</Link></li>
            <li><Link href="/team" className="hover:text-white">{t("Équipe", "Team")}</Link></li>
            <li><Link href="/#partners" className="hover:text-white">{t("Partenaires", "Partners")}</Link></li>
            <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Siège", "Headquarters")}</h4>
          <p className="text-sm">Km 5, Bangui<br />{t("République Centrafricaine", "Central African Republic")}</p>
          <p className="text-sm mt-2">contact@ava-africa.org</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs">
        © 2026 African Visionaries Alliance (AVA). {t("Tous droits réservés.", "All rights reserved.")}
      </div>
    </footer>
  );
}