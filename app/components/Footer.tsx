"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <img src="/logo.png" alt="AVA" className="h-10 w-auto mb-2" />
          <span className="text-xl font-bold block"><span className="text-green-400">African Visionaries</span>{" "}<span className="text-yellow-400">Alliance</span></span>
          <p className="text-sm mt-3">{t("Voir plus loin. Agir plus vite. Bâtir l'Afrique.", "See further. Act faster. Build Africa.", "انظر أبعد. تحرك أسرع. ابنِ أفريقيا.")}</p>
          <div className="flex gap-3 mt-4">
            <a href="https://www.facebook.com/AfricanVisionariesAlliance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition text-2xl">f</a>
            <a href="https://www.linkedin.com/company/avu-for-responses-to-social-emergencies-in-africa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition text-2xl">in</a>
            <a href="https://www.instagram.com/fouf4africa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition text-2xl">ig</a>
            <a href="https://www.tiktok.com/@becomepolyglotte" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">tk</a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Navigation", "Navigation", "التنقل")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/learn" className="hover:text-white">{t("Apprendre", "Learn", "تعلّم")}</Link></li>
            <li><Link href="/tools" className="hover:text-white">{t("Outils IA", "AI Tools", "أدوات الذكاء الاصطناعي")}</Link></li>
            <li><Link href="/news" className="hover:text-white">{t("Actualités", "News", "الأخبار")}</Link></li>
            <li><Link href="/join" className="hover:text-white">{t("Nous rejoindre", "Join Us", "انضم إلينا")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Organisation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">{t("À propos", "About", "من نحن")}</Link></li>
            <li><Link href="/team" className="hover:text-white">{t("Équipe", "Team", "الفريق")}</Link></li>
            <li><Link href="/emergencies" className="hover:text-white">{t("Urgences", "Emergencies", "الطوارئ")}</Link></li>
            <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Siège", "Headquarters", "المقر")}</h4>
          <p className="text-sm">Km 5, Bangui<br />{t("République Centrafricaine", "Central African Republic", "جمهورية أفريقيا الوسطى")}</p>
          <p className="text-sm mt-2">contact@ava-africa.me</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs">
        © 2026 African Visionaries Alliance (AVA). {t("Tous droits réservés.", "All rights reserved.", "جميع الحقوق محفوظة.")}
      </div>
    </footer>
  );
}