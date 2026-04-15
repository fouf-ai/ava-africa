"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

interface NewsItem {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  domains: string[];
  category: string;
}

interface Opportunity {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  type: string;
}

const domainFilters = [
  { id: "all", fr: "Tout", en: "All", ar: "الكل", icon: "🌍" },
  { id: "cybersecurity", fr: "Cybersécurité", en: "Cybersecurity", ar: "الأمن السيبراني", icon: "🛡️" },
  { id: "ai", fr: "Intelligence Artificielle", en: "Artificial Intelligence", ar: "الذكاء الاصطناعي", icon: "🤖" },
  { id: "emergencies", fr: "Urgences", en: "Emergencies", ar: "الطوارئ", icon: "🚨" },
  { id: "education", fr: "Éducation", en: "Education", ar: "التعليم", icon: "🎓" },
  { id: "youth", fr: "Jeunesse & Startups", en: "Youth & Startups", ar: "الشباب والشركات الناشئة", icon: "🚀" },
  { id: "africa", fr: "Afrique", en: "Africa", ar: "أفريقيا", icon: "🌍" },
];

const oppTypeLabels: Record<string, { fr: string; en: string; ar: string; color: string }> = {
  conference: { fr: "Conférence", en: "Conference", ar: "مؤتمر", color: "bg-purple-100 text-purple-700" },
  training: { fr: "Formation", en: "Training", ar: "تدريب", color: "bg-green-100 text-green-700" },
  seminar: { fr: "Séminaire", en: "Seminar", ar: "ندوة", color: "bg-blue-100 text-blue-700" },
  competition: { fr: "Compétition", en: "Competition", ar: "مسابقة", color: "bg-orange-100 text-orange-700" },
  fellowship: { fr: "Fellowship", en: "Fellowship", ar: "زمالة", color: "bg-yellow-100 text-yellow-700" },
  incubator: { fr: "Incubateur", en: "Incubator", ar: "حاضنة أعمال", color: "bg-red-100 text-red-700" },
  opportunity: { fr: "Opportunité", en: "Opportunity", ar: "فرصة", color: "bg-gray-100 text-gray-700" },
};

const staticArticles = [
  { id: 1, date: "2026-04-10", catFr: "Annonce", catEn: "Announcement", catAr: "إعلان", titleFr: "Lancement officiel de l'African Visionaries Alliance", titleEn: "Official Launch of the African Visionaries Alliance", titleAr: "الإطلاق الرسمي لتحالف الرؤية الأفريقية", summaryFr: "L'AVA est officiellement lancée avec pour mission de bâtir la résilience africaine par la technologie et l'action sociale.", summaryEn: "AVA is officially launched with a mission to build African resilience through technology and social action.", summaryAr: "تم إطلاق التحالف رسمياً بمهمة بناء المرونة الأفريقية من خلال التكنولوجيا والعمل الاجتماعي.", icon: "🚀", color: "bg-green-100 text-green-800" },
  { id: 2, date: "2026-04-08", catFr: "Recrutement", catEn: "Recruitment", catAr: "توظيف", titleFr: "Recrutement de 55 représentants nationaux", titleEn: "Recruiting 55 national representatives", titleAr: "توظيف 55 ممثلاً وطنياً", summaryFr: "L'AVA recrute un représentant par pays africain. Postulez maintenant sur ava-africa.me/recruit.", summaryEn: "AVA is recruiting one representative per African country. Apply now at ava-africa.me/recruit.", summaryAr: "التحالف يوظف ممثلاً واحداً لكل دولة أفريقية. قدم الآن.", icon: "🌍", color: "bg-yellow-100 text-yellow-800" },
];

export default function News() {
  const { t, lang } = useLanguage();
  const [domain, setDomain] = useState("all");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingOpps, setLoadingOpps] = useState(true);
  const [tab, setTab] = useState<"news" | "opportunities">("news");

  useEffect(() => {
    fetch(`/api/news?domain=${domain}`)
      .then((r) => r.json())
      .then((d) => { setNews(d.news || []); setLoadingNews(false); })
      .catch(() => setLoadingNews(false));
  }, [domain]);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((r) => r.json())
      .then((d) => { setOpportunities(d.opportunities || []); setLoadingOpps(false); })
      .catch(() => setLoadingOpps(false));
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/news" />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Actualités & Opportunités", "News & Opportunities", "الأخبار والفرص")}</h1>
          <p className="text-xl text-gray-300">{t(
            "Flux automatique — Cybersécurité, IA, Urgences, Éducation, Afrique",
            "Automated feed — Cybersecurity, AI, Emergencies, Education, Africa",
            "تغذية آلية — الأمن السيبراني، الذكاء الاصطناعي، الطوارئ، التعليم، أفريقيا"
          )}</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex">
          <button onClick={() => setTab("news")} className={`px-8 py-4 text-sm font-bold transition ${tab === "news" ? "border-b-2 border-green-700 text-green-700" : "text-gray-500"}`}>
            📰 {t("Actualités", "News", "الأخبار")} {!loadingNews && `(${news.length})`}
          </button>
          <button onClick={() => setTab("opportunities")} className={`px-8 py-4 text-sm font-bold transition ${tab === "opportunities" ? "border-b-2 border-blue-700 text-blue-700" : "text-gray-500"}`}>
            🎯 {t("Formations & Conférences", "Training & Conferences", "التدريب والمؤتمرات")} {!loadingOpps && `(${opportunities.length})`}
          </button>
        </div>
      </section>

      {tab === "news" && (
        <>
          {/* Domain Filters */}
          <section className="py-6 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
              {domainFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setDomain(f.id); setLoadingNews(true); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${domain === f.id ? "bg-green-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}
                >
                  {f.icon} {lang === "ar" ? f.ar : lang === "en" ? f.en : f.fr}
                </button>
              ))}
            </div>
          </section>

          {/* AVA Articles */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t("📌 Publications AVA", "📌 AVA Publications", "📌 منشورات التحالف")}</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {staticArticles.map((a) => (
                  <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{a.icon}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${a.color}`}>
                        {lang === "ar" ? a.catAr : lang === "en" ? a.catEn : a.catFr}
                      </span>
                      <span className="text-xs text-gray-400">{a.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{lang === "ar" ? a.titleAr : lang === "en" ? a.titleEn : a.titleFr}</h3>
                    <p className="text-sm text-gray-600">{lang === "ar" ? a.summaryAr : lang === "en" ? a.summaryEn : a.summaryFr}</p>
                  </div>
                ))}
              </div>

              {/* Live News */}
              <h2 className="text-2xl font-bold mb-6">{t("🔴 Actualités en direct", "🔴 Live News", "🔴 أخبار مباشرة")}</h2>
              {loadingNews ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-500 mt-4">{t("Chargement...", "Loading...", "جاري التحميل...")}</p>
                </div>
              ) : news.length > 0 ? (
                <div className="space-y-3">
                  {news.map((n, i) => (
                    <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-green-200 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm mb-1">{n.title}</h3>
                          <p className="text-xs text-gray-500 mb-2">{n.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{n.source}</span>
                            {n.domains.slice(0, 3).map((d) => (
                              <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">{d}</span>
                            ))}
                            {n.date && <span className="text-xs text-gray-400">{new Date(n.date).toLocaleDateString()}</span>}
                          </div>
                        </div>
                        <span className="text-green-600 font-bold shrink-0">→</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-8">{t("Aucune actualité trouvée.", "No news found.", "لم يتم العثور على أخبار.")}</p>
              )}
            </div>
          </section>
        </>
      )}

      {tab === "opportunities" && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{t("Formations, Séminaires & Conférences gratuites", "Free Training, Seminars & Conferences", "تدريبات وندوات ومؤتمرات مجانية")}</h2>
            <p className="text-gray-500 text-sm mb-8">{t("Mis à jour automatiquement toutes les 12h", "Updated automatically every 12h", "يتم التحديث تلقائياً كل 12 ساعة")}</p>

            {loadingOpps ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : opportunities.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {opportunities.map((o, i) => {
                  const typeInfo = oppTypeLabels[o.type] || oppTypeLabels.opportunity;
                  return (
                    <a key={i} href={o.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeInfo.color}`}>
                          {lang === "ar" ? typeInfo.ar : lang === "en" ? typeInfo.en : typeInfo.fr}
                        </span>
                        <span className="text-xs text-gray-400">{o.source}</span>
                      </div>
                      <h3 className="font-bold text-sm mb-1">{o.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{o.description.slice(0, 150)}...</p>
                      {o.date && <span className="text-xs text-gray-400">{new Date(o.date).toLocaleDateString()}</span>}
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">{t("Aucune opportunité trouvée.", "No opportunities found.", "لم يتم العثور على فرص.")}</p>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 px-6 bg-green-800 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Restez informé", "Stay informed", "ابق على اطلاع")}</h2>
          <p className="text-green-200 mb-8">{t("Recevez les meilleures opportunités directement par email.", "Receive the best opportunities directly by email.", "احصل على أفضل الفرص مباشرة عبر البريد الإلكتروني.")}</p>
          <form action="https://formspree.io/f/xbdpvpld" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input type="hidden" name="type" value="newsletter" />
            <input type="email" name="email" placeholder="Email" required className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm" />
            <button type="submit" className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">{t("S'abonner", "Subscribe", "اشترك")}</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}