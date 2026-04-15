"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

interface Scholarship {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  category: string;
}

const staticScholarships = [
  { name: "Mastercard Foundation Scholars", org: "Mastercard Foundation", target: { fr: "Jeunes Africains talentueux", en: "Talented young Africans", ar: "الشباب الأفارقة الموهوبون" }, covers: { fr: "Scolarité, logement, livres, transport", en: "Tuition, housing, books, transport", ar: "الرسوم، السكن، الكتب، النقل" }, level: { fr: "Licence & Master", en: "Bachelor & Master", ar: "بكالوريوس وماجستير" }, link: "https://mastercardfdn.org/all/scholars/" },
  { name: "DAAD Scholarships", org: { fr: "Gouvernement Allemand", en: "German Government", ar: "الحكومة الألمانية" }, target: { fr: "Étudiants et professionnels africains", en: "African students and professionals", ar: "الطلاب والمهنيون الأفارقة" }, covers: { fr: "Scolarité, allocation mensuelle, assurance", en: "Tuition, monthly allowance, insurance", ar: "الرسوم، بدل شهري، تأمين" }, level: { fr: "Master & Doctorat", en: "Master & PhD", ar: "ماجستير ودكتوراه" }, link: "https://www.daad.de/en/" },
  { name: "Chevening Scholarships", org: { fr: "Gouvernement Britannique", en: "UK Government", ar: "الحكومة البريطانية" }, target: { fr: "Futurs leaders", en: "Future leaders", ar: "قادة المستقبل" }, covers: { fr: "Scolarité complète, allocation, voyages", en: "Full tuition, allowance, travel", ar: "رسوم كاملة، بدل، سفر" }, level: { fr: "Master", en: "Master", ar: "ماجستير" }, link: "https://www.chevening.org/" },
  { name: "Fulbright Program", org: { fr: "Gouvernement Américain", en: "US Government", ar: "الحكومة الأمريكية" }, target: { fr: "Étudiants et chercheurs", en: "Students and researchers", ar: "الطلاب والباحثون" }, covers: { fr: "Scolarité, allocation, voyages, assurance", en: "Tuition, stipend, travel, insurance", ar: "الرسوم، راتب، سفر، تأمين" }, level: { fr: "Master & Recherche", en: "Master & Research", ar: "ماجستير وبحث" }, link: "https://foreign.fulbrightonline.org/" },
  { name: "AU Mwalimu Nyerere", org: { fr: "Union Africaine", en: "African Union", ar: "الاتحاد الأفريقي" }, target: { fr: "Étudiants africains pour études en Afrique", en: "African students to study in Africa", ar: "طلاب أفارقة للدراسة في أفريقيا" }, covers: { fr: "Scolarité, allocation, recherche", en: "Tuition, stipend, research", ar: "الرسوم، راتب، بحث" }, level: { fr: "Master & Doctorat", en: "Master & PhD", ar: "ماجستير ودكتوراه" }, link: "https://au.int/" },
  { name: "Bourses de la Francophonie", org: { fr: "Organisation Internationale de la Francophonie", en: "International Organization of La Francophonie", ar: "المنظمة الدولية للفرنكوفونية" }, target: { fr: "Étudiants des pays francophones", en: "Students from francophone countries", ar: "طلاب من الدول الفرنكوفونية" }, covers: { fr: "Scolarité, allocation de vie", en: "Tuition, living allowance", ar: "الرسوم، بدل معيشة" }, level: { fr: "Master & Doctorat", en: "Master & PhD", ar: "ماجستير ودكتوراه" }, link: "https://www.francophonie.org/" },
];

const moocs = [
  { name: "Coursera", icon: "📘", link: "https://www.coursera.org/", descFr: "Cours gratuits des meilleures universités. Aide financière disponible.", descEn: "Free courses from top universities. Financial aid available.", descAr: "دورات مجانية من أفضل الجامعات. مساعدة مالية متاحة." },
  { name: "edX", icon: "📗", link: "https://www.edx.org/", descFr: "Programmes de Harvard, MIT. Audit gratuit.", descEn: "Harvard, MIT programs. Free audit.", descAr: "برامج هارفارد، MIT. تدقيق مجاني." },
  { name: "Khan Academy", icon: "📒", link: "https://www.khanacademy.org/", descFr: "Entièrement gratuit. Maths, sciences, informatique.", descEn: "Completely free. Math, science, computing.", descAr: "مجاني بالكامل. رياضيات، علوم، حوسبة." },
  { name: "Cisco NetAcad", icon: "📓", link: "https://www.netacad.com/", descFr: "Formations gratuites en réseaux et cybersécurité.", descEn: "Free networking and cybersecurity training.", descAr: "تدريب مجاني في الشبكات والأمن السيبراني." },
  { name: "FutureLearn", icon: "📙", link: "https://www.futurelearn.com/", descFr: "Cours internationaux. Développement et santé.", descEn: "International courses. Development and health.", descAr: "دورات دولية. تنمية وصحة." },
  { name: "Udemy", icon: "📕", link: "https://www.udemy.com/", descFr: "Large catalogue technique. Promotions fréquentes.", descEn: "Large technical catalog. Frequent promotions.", descAr: "كتالوج تقني واسع. عروض متكررة." },
];

function getVal(obj: string | { fr: string; en: string; ar: string }, lang: string): string {
  if (typeof obj === "string") return obj;
  if (lang === "ar") return obj.ar;
  if (lang === "en") return obj.en;
  return obj.fr;
}

export default function Scholarships() {
  const { t, lang } = useLanguage();
  const [liveScholarships, setLiveScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    fetch("/api/scholarships")
      .then((res) => res.json())
      .then((data) => {
        setLiveScholarships(data.scholarships || []);
        setLastUpdated(data.lastUpdated || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/scholarships" />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Bourses & Éducation", "Scholarships & Education", "المنح والتعليم")}</h1>
          <p className="text-xl text-blue-200">{t(
            "Accédez aux meilleures opportunités éducatives pour la jeunesse africaine",
            "Access the best educational opportunities for African youth",
            "الوصول إلى أفضل الفرص التعليمية للشباب الأفريقي"
          )}</p>
        </div>
      </section>

      {/* Live Scholarships Feed */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">{t("🔴 Bourses en direct", "🔴 Live Scholarships", "🔴 المنح المباشرة")}</h2>
              <p className="text-gray-500 text-sm mt-1">{t("Mis à jour automatiquement toutes les 24h", "Automatically updated every 24h", "يتم التحديث تلقائياً كل 24 ساعة")}</p>
            </div>
            {lastUpdated && (
              <span className="text-xs text-gray-400">{t("Dernière MAJ", "Last update", "آخر تحديث")}: {new Date(lastUpdated).toLocaleDateString()}</span>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 mt-4">{t("Chargement des bourses...", "Loading scholarships...", "جاري تحميل المنح...")}</p>
            </div>
          ) : liveScholarships.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {liveScholarships.slice(0, 20).map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-200 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1 text-gray-900 leading-snug">{s.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{s.description.slice(0, 150)}...</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{s.source}</span>
                        {s.date && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{s.date}</span>}
                      </div>
                    </div>
                    <span className="text-blue-600 text-sm font-bold shrink-0">→</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">{t("Aucune bourse trouvée pour le moment. Réessayez plus tard.", "No scholarships found at the moment. Try again later.", "لم يتم العثور على منح حالياً. حاول مرة أخرى لاحقاً.")}</p>
          )}
        </div>
      </section>

      {/* Bourses permanentes */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("Bourses permanentes", "Permanent Scholarships", "المنح الدائمة")}</h2>
          <p className="text-center text-gray-500 mb-12">{t("Programmes majeurs ouverts chaque année", "Major programs open every year", "برامج رئيسية مفتوحة كل عام")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticScholarships.map((s) => (
              <div key={s.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-lg font-bold mb-1 text-green-800">{s.name}</h3>
                <p className="text-sm text-yellow-600 font-medium mb-3">{getVal(s.org, lang)}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600"><span className="font-semibold">{t("Public", "Target", "الفئة المستهدفة")} :</span> {getVal(s.target, lang)}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">{t("Couvre", "Covers", "تغطي")} :</span> {getVal(s.covers, lang)}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">{t("Niveau", "Level", "المستوى")} :</span> {getVal(s.level, lang)}</p>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:text-green-800">{t("En savoir plus →", "Learn more →", "اعرف المزيد →")}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOOC */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("Plateformes MOOC", "MOOC Platforms", "منصات الدورات المفتوحة")}</h2>
          <p className="text-center text-gray-500 mb-12">{t("Apprenez gratuitement depuis n'importe où", "Learn for free from anywhere", "تعلم مجاناً من أي مكان")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moocs.map((m) => (
              <div key={m.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="text-lg font-bold mb-2">{m.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{t(m.descFr, m.descEn, m.descAr)}</p>
                <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:text-green-800">{t("Accéder →", "Access →", "الوصول →")}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accompagnement */}
      <section className="py-16 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Comment l'AVA vous accompagne", "How AVA supports you", "كيف يدعمك التحالف")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔍", fr: "Recherche", en: "Search", ar: "البحث", dFr: "Nous identifions les bourses adaptées à votre profil.", dEn: "We identify scholarships suited to your profile.", dAr: "نحدد المنح المناسبة لملفك الشخصي." },
              { icon: "📝", fr: "Candidature", en: "Application", ar: "التقديم", dFr: "Nous vous aidons à constituer un dossier solide.", dEn: "We help you build a strong application.", dAr: "نساعدك في بناء ملف قوي." },
              { icon: "🎯", fr: "Suivi", en: "Follow-up", ar: "المتابعة", dFr: "Nous suivons votre parcours et vous connectons à notre réseau.", dEn: "We track your progress and connect you to our network.", dAr: "نتابع تقدمك ونربطك بشبكتنا." },
            ].map((a) => (
              <div key={a.fr} className="text-center">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="text-lg font-bold mb-2">{t(a.fr, a.en, a.ar)}</h3>
                <p className="text-sm text-green-200">{t(a.dFr, a.dEn, a.dAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Prêt à saisir votre opportunité ?", "Ready to seize your opportunity?", "مستعد لاغتنام فرصتك؟")}</h2>
          <p className="text-gray-500 mb-8">{t(
            "Rejoignez l'AVA et accédez à notre accompagnement personnalisé.",
            "Join AVA and access our personalized support.",
            "انضم إلى التحالف واحصل على دعمنا المخصص."
          )}</p>
          <Link href="/youth#join" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-800 transition">
            {t("Accéder aux opportunités", "Access opportunities", "الوصول إلى الفرص")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}