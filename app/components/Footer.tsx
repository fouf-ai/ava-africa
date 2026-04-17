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
            <span className="text-xl font-bold block">
              <span className="text-green-400">African Visionaries</span>{" "}
              <span className="text-yellow-400">Alliance</span>
            </span>
          </div>
          <p className="text-sm mb-4">{t(
            "Voir plus loin. Agir plus vite. Bâtir l'Afrique.",
            "See further. Act faster. Build Africa.",
            "انظر أبعد. تحرك أسرع. ابنِ أفريقيا."
          )}</p>
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/AfricanVisionariesAlliance" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/avu-for-responses-to-social-emergencies-in-africa/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/fouf4africa" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@becomepolyglotte" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-black flex items-center justify-center transition" aria-label="TikTok">
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.76a8.26 8.26 0 004.76 1.51v-3.4a4.85 4.85 0 01-1-.18z"/></svg>
            </a>
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
          <h4 className="text-white font-semibold mb-3">{t("Organisation", "Organization", "المنظمة")}</h4>
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
          <p className="text-sm mt-4 text-gray-500">{t("Suivez-nous", "Follow us", "تابعنا")}</p>
          <div className="flex gap-2 mt-2 text-sm">
            <a href="https://www.facebook.com/AfricanVisionariesAlliance" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            <span>·</span>
            <a href="https://www.linkedin.com/company/avu-for-responses-to-social-emergencies-in-africa/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
            <span>·</span>
            <a href="https://www.instagram.com/fouf4africa" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <span>·</span>
            <a href="https://www.tiktok.com/@becomepolyglotte" target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs">
        © 2026 African Visionaries Alliance (AVA). {t("Tous droits réservés.", "All rights reserved.", "جميع الحقوق محفوظة.")}
      </div>
    </footer>
  );
}