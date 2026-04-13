"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="mb-4">
            <img src="/logo.png" alt="AVA" className="h-10 w-auto mb-2" />
            <span className="text-xl font-bold block">
              <span className="text-green-400">African Visionaries</span>{" "}
              <span className="text-yellow-400">Alliance</span>
            </span>
          </div>
          <p className="text-sm">{t(
            "Voir plus loin. Agir plus vite. Bâtir l'Afrique.",
            "See further. Act faster. Build Africa.",
            "انظر أبعد. تحرك أسرع. ابنِ أفريقيا."
          )}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Piliers", "Pillars", "الركائز")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/emergencies" className="hover:text-white">{t("Urgences Sociales", "Social Emergencies", "الطوارئ الاجتماعية")}</Link></li>
            <li><Link href="/digital" className="hover:text-white">{t("Souveraineté Numérique", "Digital Sovereignty", "السيادة الرقمية")}</Link></li>
            <li><Link href="/scholarships" className="hover:text-white">{t("Bourses & Éducation", "Scholarships & Education", "المنح والتعليم")}</Link></li>
            <li><Link href="/youth" className="hover:text-white">{t("Innovation Jeunesse", "Youth Innovation", "ابتكار الشباب")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Organisation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">{t("À propos", "About", "من نحن")}</Link></li>
            <li><Link href="/team" className="hover:text-white">{t("Équipe", "Team", "الفريق")}</Link></li>
            <li><Link href="/recruit" className="hover:text-white">{t("Recrutement", "Recruitment", "التوظيف")}</Link></li>
            <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Siège", "Headquarters", "المقر")}</h4>
          <p className="text-sm">Km 5, Bangui<br />{t("République Centrafricaine", "Central African Republic", "جمهورية أفريقيا الوسطى")}</p>
          <p className="text-sm mt-2">contact@ava-africa.me</p>
          <div className="flex gap-3 mt-4">
            <a href="https://linkedin.com/company/african-visionaries-alliance" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
            <a href="https://facebook.com/africanvisionariesalliance" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs">
        © 2026 African Visionaries Alliance (AVA). {t("Tous droits réservés.", "All rights reserved.", "جميع الحقوق محفوظة.")}
      </div>
    </footer>
  );
}