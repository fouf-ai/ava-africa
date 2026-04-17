"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

interface Scholarship {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  category: string;
}

interface University {
  name: string;
  country: string;
  flag: string;
  region: string;
  link: string;
  type: string;
  languages: string[];
}

// ═══════════════════════════════════════
// DATA — PERMANENT SCHOLARSHIPS
// ═══════════════════════════════════════

const permanentScholarships = [
  { name: "Mastercard Foundation Scholars", flag: "🌍", level: "Bachelor & Master", link: "https://mastercardfdn.org/all/scholars/" },
  { name: "DAAD Scholarships", flag: "🇩🇪", level: "Master & PhD", link: "https://www.daad.de/en/" },
  { name: "Chevening Scholarships", flag: "🇬🇧", level: "Master", link: "https://www.chevening.org/" },
  { name: "Fulbright Program", flag: "🇺🇸", level: "Master & Research", link: "https://foreign.fulbrightonline.org/" },
  { name: "AU Mwalimu Nyerere", flag: "🌍", level: "Master & PhD", link: "https://au.int/" },
  { name: "Bourses de la Francophonie", flag: "🇫🇷", level: "Master & PhD", link: "https://www.francophonie.org/" },
];

// ═══════════════════════════════════════
// DATA — 120+ UNIVERSITIES
// ═══════════════════════════════════════

const universities: University[] = [
  // MOOC Platforms
  { name: "Coursera", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.coursera.org", type: "mooc", languages: ["en", "fr", "ar"] },
  { name: "edX", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.edx.org", type: "mooc", languages: ["en", "fr"] },
  { name: "Khan Academy", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.khanacademy.org", type: "mooc", languages: ["en", "fr", "ar"] },
  { name: "FutureLearn", country: "UK", flag: "🇬🇧", region: "global", link: "https://www.futurelearn.com", type: "mooc", languages: ["en"] },
  { name: "Udacity", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.udacity.com", type: "mooc", languages: ["en"] },
  { name: "Alison", country: "Ireland", flag: "🇮🇪", region: "global", link: "https://alison.com", type: "mooc", languages: ["en", "fr", "ar"] },
  { name: "FUN MOOC", country: "France", flag: "🇫🇷", region: "global", link: "https://www.fun-mooc.fr", type: "mooc", languages: ["fr"] },
  { name: "Saylor Academy", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.saylor.org", type: "mooc", languages: ["en"] },
  { name: "OpenLearn", country: "UK", flag: "🇬🇧", region: "global", link: "https://www.open.edu/openlearn", type: "mooc", languages: ["en"] },
  { name: "Rwaq", country: "Saudi Arabia", flag: "🇸🇦", region: "global", link: "https://www.rwaq.org", type: "mooc", languages: ["ar"] },
  { name: "Edraak", country: "Jordan", flag: "🇯🇴", region: "global", link: "https://www.edraak.org", type: "mooc", languages: ["ar"] },
  { name: "Swayam", country: "India", flag: "🇮🇳", region: "global", link: "https://swayam.gov.in", type: "mooc", languages: ["en"] },
  // USA Universities
  { name: "MIT OpenCourseWare", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://ocw.mit.edu", type: "university", languages: ["en"] },
  { name: "Harvard Online", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://online-learning.harvard.edu/catalog/free", type: "university", languages: ["en"] },
  { name: "Stanford Online", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://online.stanford.edu/free-courses", type: "university", languages: ["en"] },
  { name: "Yale Open Courses", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://oyc.yale.edu", type: "university", languages: ["en"] },
  { name: "Princeton (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/princeton", type: "university", languages: ["en"] },
  { name: "Columbia University (edX)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.edx.org/school/columbiax", type: "university", languages: ["en"] },
  { name: "Duke University (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/duke", type: "university", languages: ["en"] },
  { name: "UC Berkeley Webcasts", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://webcast.berkeley.edu", type: "university", languages: ["en"] },
  { name: "Johns Hopkins (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/jhu", type: "university", languages: ["en"] },
  { name: "Georgia Tech Online", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://pe.gatech.edu/massive-open-online-courses", type: "university", languages: ["en"] },
  { name: "University of Pennsylvania (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/penn", type: "university", languages: ["en"] },
  { name: "Cornell University (edX)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.edx.org/school/cornellx", type: "university", languages: ["en"] },
  { name: "Rice University (OpenStax)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://openstax.org", type: "university", languages: ["en"] },
  // Canada
  { name: "University of Toronto (Coursera)", country: "Canada", flag: "🇨🇦", region: "north-america", link: "https://www.coursera.org/utoronto", type: "university", languages: ["en"] },
  { name: "McGill University (edX)", country: "Canada", flag: "🇨🇦", region: "north-america", link: "https://www.edx.org/school/mcgillx", type: "university", languages: ["en", "fr"] },
  // Europe
  { name: "University of Oxford (Podcasts)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://podcasts.ox.ac.uk", type: "university", languages: ["en"] },
  { name: "University of Cambridge (OER)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.cam.ac.uk/open-learning", type: "university", languages: ["en"] },
  { name: "University of Edinburgh (Coursera)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.coursera.org/edinburgh", type: "university", languages: ["en"] },
  { name: "Imperial College London (Coursera)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.coursera.org/imperial", type: "university", languages: ["en"] },
  { name: "École Polytechnique (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/ecole-polytechnique", type: "university", languages: ["fr", "en"] },
  { name: "HEC Paris (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/hec-paris", type: "university", languages: ["fr", "en"] },
  { name: "Sciences Po (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/sciencespo", type: "university", languages: ["fr", "en"] },
  { name: "Sorbonne Université (FUN)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.fun-mooc.fr", type: "university", languages: ["fr"] },
  { name: "ETH Zurich (edX)", country: "Switzerland", flag: "🇨🇭", region: "europe", link: "https://www.edx.org/school/ethx", type: "university", languages: ["en"] },
  { name: "EPFL (edX)", country: "Switzerland", flag: "🇨🇭", region: "europe", link: "https://www.edx.org/school/epflx", type: "university", languages: ["en", "fr"] },
  { name: "TU Delft (edX)", country: "Netherlands", flag: "🇳🇱", region: "europe", link: "https://www.edx.org/school/delftx", type: "university", languages: ["en"] },
  { name: "University of Helsinki", country: "Finland", flag: "🇫🇮", region: "europe", link: "https://www.mooc.fi/en", type: "university", languages: ["en"] },
  { name: "Lund University (Coursera)", country: "Sweden", flag: "🇸🇪", region: "europe", link: "https://www.coursera.org/lund", type: "university", languages: ["en"] },
  { name: "TU Munich (edX)", country: "Germany", flag: "🇩🇪", region: "europe", link: "https://www.edx.org/school/tumx", type: "university", languages: ["en"] },
  { name: "KU Leuven (edX)", country: "Belgium", flag: "🇧🇪", region: "europe", link: "https://www.edx.org/school/kuleuvenx", type: "university", languages: ["en"] },
  { name: "IE Business School (Coursera)", country: "Spain", flag: "🇪🇸", region: "europe", link: "https://www.coursera.org/ie", type: "university", languages: ["en", "es"] },
  { name: "Politecnico di Milano (Coursera)", country: "Italy", flag: "🇮🇹", region: "europe", link: "https://www.coursera.org/polimi", type: "university", languages: ["en"] },
  // Africa
  { name: "African Virtual University (AVU)", country: "Kenya", flag: "🇰🇪", region: "africa", link: "https://avu.org", type: "university", languages: ["en", "fr"] },
  { name: "University of Cape Town (Coursera)", country: "South Africa", flag: "🇿🇦", region: "africa", link: "https://www.coursera.org/uct", type: "university", languages: ["en"] },
  { name: "Stellenbosch University (edX)", country: "South Africa", flag: "🇿🇦", region: "africa", link: "https://www.edx.org/school/stellenboschx", type: "university", languages: ["en"] },
  { name: "University of the People", country: "Pan-African", flag: "🌍", region: "africa", link: "https://www.uopeople.edu", type: "university", languages: ["en"] },
  { name: "ALX Africa", country: "Pan-African", flag: "🌍", region: "africa", link: "https://www.alxafrica.com", type: "university", languages: ["en"] },
  { name: "African Leadership University", country: "Rwanda", flag: "🇷🇼", region: "africa", link: "https://www.alueducation.com", type: "university", languages: ["en"] },
  { name: "Moringa School", country: "Kenya", flag: "🇰🇪", region: "africa", link: "https://moringaschool.com", type: "university", languages: ["en"] },
  { name: "AIMS", country: "Pan-African", flag: "🌍", region: "africa", link: "https://nexteinstein.org", type: "university", languages: ["en", "fr"] },
  // Asia
  { name: "Peking University (Coursera)", country: "China", flag: "🇨🇳", region: "asia", link: "https://www.coursera.org/pku", type: "university", languages: ["en"] },
  { name: "Tsinghua University (edX)", country: "China", flag: "🇨🇳", region: "asia", link: "https://www.edx.org/school/tsinghuax", type: "university", languages: ["en"] },
  { name: "University of Tokyo (Coursera)", country: "Japan", flag: "🇯🇵", region: "asia", link: "https://www.coursera.org/utokyo", type: "university", languages: ["en"] },
  { name: "NUS (Coursera)", country: "Singapore", flag: "🇸🇬", region: "asia", link: "https://www.coursera.org/nus", type: "university", languages: ["en"] },
  { name: "KAIST (Coursera)", country: "South Korea", flag: "🇰🇷", region: "asia", link: "https://www.coursera.org/kaist", type: "university", languages: ["en"] },
  // MENA
  { name: "King Abdullah University (edX)", country: "Saudi Arabia", flag: "🇸🇦", region: "mena", link: "https://www.edx.org/school/kaustx", type: "university", languages: ["en", "ar"] },
  { name: "AUC Cairo", country: "Egypt", flag: "🇪🇬", region: "mena", link: "https://www.aucegypt.edu", type: "university", languages: ["en", "ar"] },
  { name: "Mohammed V University", country: "Morocco", flag: "🇲🇦", region: "mena", link: "https://www.um5.ac.ma", type: "university", languages: ["fr", "ar"] },
  // Australia
  { name: "University of Melbourne (Coursera)", country: "Australia", flag: "🇦🇺", region: "oceania", link: "https://www.coursera.org/unimelb", type: "university", languages: ["en"] },
  { name: "University of Sydney (Coursera)", country: "Australia", flag: "🇦🇺", region: "oceania", link: "https://www.coursera.org/usyd", type: "university", languages: ["en"] },
  // Latin America
  { name: "Tecnológico de Monterrey (Coursera)", country: "Mexico", flag: "🇲🇽", region: "latam", link: "https://www.coursera.org/tec", type: "university", languages: ["es", "en"] },
];

// ═══════════════════════════════════════
// DATA — CERTIFICATIONS
// ═══════════════════════════════════════

const certifications = [
  { name: "Google Digital Garage", org: "Google", flag: "🌐", link: "https://learndigital.withgoogle.com/digitalgarage", langs: ["en", "fr", "ar"], focus: "Marketing digital" },
  { name: "Google Cloud Skills Boost", org: "Google", flag: "🌐", link: "https://www.cloudskillsboost.google", langs: ["en"], focus: "Cloud" },
  { name: "AWS Skill Builder", org: "Amazon", flag: "🌐", link: "https://explore.skillbuilder.aws", langs: ["en"], focus: "Cloud AWS" },
  { name: "Microsoft Learn", org: "Microsoft", flag: "🌐", link: "https://learn.microsoft.com", langs: ["en", "fr", "ar"], focus: "Azure, AI, Dev" },
  { name: "IBM SkillsBuild", org: "IBM", flag: "🌐", link: "https://skillsbuild.org", langs: ["en", "fr"], focus: "AI, Cyber, Data" },
  { name: "Cisco Networking Academy", org: "Cisco", flag: "🌐", link: "https://www.netacad.com", langs: ["en", "fr"], focus: "Réseaux, Cybersécurité" },
  { name: "Meta Blueprint", org: "Meta", flag: "🌐", link: "https://www.facebookblueprint.com", langs: ["en", "fr", "ar"], focus: "Publicité digitale" },
  { name: "Salesforce Trailhead", org: "Salesforce", flag: "🌐", link: "https://trailhead.salesforce.com", langs: ["en"], focus: "CRM, Business" },
  { name: "HubSpot Academy", org: "HubSpot", flag: "🌐", link: "https://academy.hubspot.com", langs: ["en"], focus: "Marketing, Vente" },
  { name: "freeCodeCamp", org: "Open Source", flag: "🌐", link: "https://www.freecodecamp.org", langs: ["en"], focus: "Dev Web" },
  { name: "The Odin Project", org: "Open Source", flag: "🌐", link: "https://www.theodinproject.com", langs: ["en"], focus: "Full-Stack Dev" },
  { name: "Kaggle Learn", org: "Google", flag: "🌐", link: "https://www.kaggle.com/learn", langs: ["en"], focus: "Data Science, ML" },
  { name: "TryHackMe", org: "TryHackMe", flag: "🌐", link: "https://tryhackme.com", langs: ["en"], focus: "Cybersécurité" },
  { name: "Hack The Box Academy", org: "HTB", flag: "🌐", link: "https://academy.hackthebox.com", langs: ["en"], focus: "Hacking éthique" },
  { name: "Cybrary", org: "Cybrary", flag: "🌐", link: "https://www.cybrary.it", langs: ["en"], focus: "Cybersécurité" },
  { name: "GitHub Skills", org: "GitHub", flag: "🌐", link: "https://skills.github.com", langs: ["en"], focus: "Git, DevOps" },
  { name: "W3Schools", org: "W3Schools", flag: "🌐", link: "https://www.w3schools.com", langs: ["en"], focus: "HTML, CSS, JS" },
];

// ═══════════════════════════════════════
// DATA — AVA TRAINING PROGRAMS
// ═══════════════════════════════════════

const avaPrograms = [
  { icon: "🛡️", titleFr: "Cybersécurité Fondamentale", titleEn: "Cybersecurity Fundamentals", titleAr: "أساسيات الأمن السيبراني", durationFr: "12 semaines", durationEn: "12 weeks", durationAr: "12 أسبوعاً", descFr: "CompTIA Security+, réseaux, cryptographie, audits, réponse aux incidents.", descEn: "CompTIA Security+, networking, cryptography, audits, incident response.", descAr: "CompTIA Security+، الشبكات، التشفير، التدقيق، الاستجابة للحوادث." },
  { icon: "🤖", titleFr: "Intelligence Artificielle Appliquée", titleEn: "Applied Artificial Intelligence", titleAr: "الذكاء الاصطناعي التطبيقي", durationFr: "10 semaines", durationEn: "10 weeks", durationAr: "10 أسابيع", descFr: "Python, Machine Learning, NLP, Computer Vision, projets réels africains.", descEn: "Python, Machine Learning, NLP, Computer Vision, real African projects.", descAr: "بايثون، تعلم الآلة، معالجة اللغة، رؤية الحاسوب." },
  { icon: "💻", titleFr: "Développement Web Full-Stack", titleEn: "Full-Stack Web Development", titleAr: "تطوير الويب الشامل", durationFr: "16 semaines", durationEn: "16 weeks", durationAr: "16 أسبوعاً", descFr: "HTML/CSS, JavaScript, React, Node.js, bases de données, déploiement.", descEn: "HTML/CSS, JavaScript, React, Node.js, databases, deployment.", descAr: "HTML/CSS، جافاسكريبت، React، Node.js، قواعد البيانات." },
  { icon: "☁️", titleFr: "Cloud Computing & DevOps", titleEn: "Cloud Computing & DevOps", titleAr: "الحوسبة السحابية وDevOps", durationFr: "8 semaines", durationEn: "8 weeks", durationAr: "8 أسابيع", descFr: "AWS, Azure, Docker, Kubernetes, CI/CD, infrastructure as code.", descEn: "AWS, Azure, Docker, Kubernetes, CI/CD, infrastructure as code.", descAr: "AWS، Azure، Docker، Kubernetes، CI/CD." },
  { icon: "📊", titleFr: "Data Science & Analyse", titleEn: "Data Science & Analytics", titleAr: "علم البيانات والتحليل", durationFr: "10 semaines", durationEn: "10 weeks", durationAr: "10 أسابيع", descFr: "Python, Pandas, visualisation, statistiques, projets concrets.", descEn: "Python, Pandas, visualization, statistics, real projects.", descAr: "بايثون، Pandas، التصور، الإحصاء." },
  { icon: "🔐", titleFr: "Hacking Éthique Avancé", titleEn: "Advanced Ethical Hacking", titleAr: "القرصنة الأخلاقية المتقدمة", durationFr: "12 semaines", durationEn: "12 weeks", durationAr: "12 أسبوعاً", descFr: "CEH, tests d'intrusion, OSINT, forensics, Cyber Range AVA.", descEn: "CEH, penetration testing, OSINT, forensics, AVA Cyber Range.", descAr: "CEH، اختبار الاختراق، OSINT، الطب الشرعي الرقمي." },
];

// ═══════════════════════════════════════
// FILTERS
// ═══════════════════════════════════════

const regionFilters = [
  { id: "all", fr: "Tout", en: "All", ar: "الكل" },
  { id: "global", fr: "🌐 Global", en: "🌐 Global", ar: "🌐 عالمي" },
  { id: "africa", fr: "🌍 Afrique", en: "🌍 Africa", ar: "🌍 أفريقيا" },
  { id: "north-america", fr: "🇺🇸 Amér. Nord", en: "🇺🇸 N. America", ar: "🇺🇸 أمريكا الشمالية" },
  { id: "europe", fr: "🇪🇺 Europe", en: "🇪🇺 Europe", ar: "🇪🇺 أوروبا" },
  { id: "asia", fr: "🌏 Asie", en: "🌏 Asia", ar: "🌏 آسيا" },
  { id: "mena", fr: "🌙 MENA", en: "🌙 MENA", ar: "🌙 الشرق الأوسط" },
];

// ═══════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════

export default function Learn() {
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState<"scholarships" | "universities" | "certifications" | "ava">("scholarships");
  const [liveScholarships, setLiveScholarships] = useState<Scholarship[]>([]);
  const [loadingScholarships, setLoadingScholarships] = useState(true);
  const [regionFilter, setRegionFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/scholarships")
      .then((r) => r.json())
      .then((d) => { setLiveScholarships(d.scholarships || []); setLoadingScholarships(false); })
      .catch(() => setLoadingScholarships(false));
  }, []);

  const filteredUnis = universities.filter((u) => {
    const matchRegion = regionFilter === "all" || u.region === regionFilter;
    const matchSearch = search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  const filteredCerts = certifications.filter((c) => {
    return search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.focus.toLowerCase().includes(search.toLowerCase());
  });

  const langLabel = (item: { fr: string; en: string; ar: string }) => lang === "ar" ? item.ar : lang === "en" ? item.en : item.fr;

  const tabs = [
    { id: "scholarships" as const, icon: "🎓", fr: "Bourses", en: "Scholarships", ar: "المنح" },
    { id: "universities" as const, icon: "🌐", fr: `Universités (${universities.length})`, en: `Universities (${universities.length})`, ar: `جامعات (${universities.length})` },
    { id: "certifications" as const, icon: "📜", fr: `Certifications (${certifications.length})`, en: `Certifications (${certifications.length})`, ar: `شهادات (${certifications.length})` },
    { id: "ava" as const, icon: "🚀", fr: "Formations AVA", en: "AVA Training", ar: "تدريبات التحالف" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/learn" />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 bg-gradient-to-br from-indigo-800 via-blue-700 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Apprendre", "Learn", "تعلّم")}</h1>
          <p className="text-xl text-blue-200 mb-6">{t(
            "Bourses, universités gratuites, certifications et formations — tout en un seul endroit",
            "Scholarships, free universities, certifications and training — all in one place",
            "المنح والجامعات المجانية والشهادات والتدريبات — كل شيء في مكان واحد"
          )}</p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("🔍 Rechercher une bourse, université, certification...", "🔍 Search a scholarship, university, certification...", "🔍 ابحث عن منحة، جامعة، شهادة...")}
            className="w-full max-w-2xl mx-auto border-0 rounded-xl px-6 py-4 text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 sticky top-[73px] z-40 bg-white">
        <div className="max-w-6xl mx-auto flex overflow-x-auto">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${tab === tb.id ? "border-green-700 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {tb.icon} {langLabel(tb)}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ TAB 1: SCHOLARSHIPS ═══ */}
      {tab === "scholarships" && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Live scholarships */}
            <h2 className="text-2xl font-bold mb-6">{t("🔴 Bourses en direct", "🔴 Live Scholarships", "🔴 المنح المباشرة")}</h2>
            {loadingScholarships ? (
              <div className="text-center py-12"><div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
            ) : liveScholarships.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4 mb-16">
                {liveScholarships.slice(0, 20).map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-200 transition">
                    <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{s.description.slice(0, 120)}...</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{s.source}</span>
                      {s.date && <span className="text-xs text-gray-400">{s.date}</span>}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8 mb-16">{t("Chargement en cours...", "Loading...", "جاري التحميل...")}</p>
            )}

            {/* Permanent scholarships */}
            <h2 className="text-2xl font-bold mb-6">{t("📌 Bourses permanentes", "📌 Permanent Scholarships", "📌 المنح الدائمة")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permanentScholarships.map((s) => (
                <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer" className="block bg-green-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{s.flag}</span>
                    <h3 className="font-bold text-sm">{s.name}</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{s.level}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ TAB 2: UNIVERSITIES ═══ */}
      {tab === "universities" && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-8">
              {regionFilters.map((f) => (
                <button key={f.id} onClick={() => setRegionFilter(f.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${regionFilter === f.id ? "bg-indigo-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {langLabel(f)}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-6">{t(`${filteredUnis.length} résultats`, `${filteredUnis.length} results`, `${filteredUnis.length} نتيجة`)}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUnis.map((u, i) => (
                <a key={i} href={u.link} target="_blank" rel="noopener noreferrer" className={`block rounded-xl p-5 border hover:shadow-md transition ${u.type === "mooc" ? "bg-blue-50 border-blue-200" : "bg-green-50 border-green-200"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{u.type === "mooc" ? "📘" : "🏛️"}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm mb-1 truncate">{u.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{u.flag} {u.country}</p>
                      <div className="flex flex-wrap gap-1">
                        {u.languages.map((l) => <span key={l} className="text-xs px-1.5 py-0.5 rounded bg-white/60 text-gray-600 font-medium">{l.toUpperCase()}</span>)}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ TAB 3: CERTIFICATIONS ═══ */}
      {tab === "certifications" && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{t("Certifications gratuites", "Free Certifications", "شهادات مجانية")}</h2>
            <p className="text-gray-500 text-sm mb-8">{t("Certifications professionnelles de Google, AWS, Microsoft, Cisco et plus", "Professional certifications from Google, AWS, Microsoft, Cisco and more", "شهادات مهنية من Google وAWS وMicrosoft وCisco والمزيد")}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCerts.map((c, i) => (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="block bg-yellow-50 rounded-xl p-5 border border-yellow-200 hover:shadow-md transition">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📜</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">{c.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{c.org} — {c.focus}</p>
                      <div className="flex flex-wrap gap-1">
                        {c.langs.map((l) => <span key={l} className="text-xs px-1.5 py-0.5 rounded bg-white/60 text-gray-600 font-medium">{l.toUpperCase()}</span>)}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ TAB 4: AVA TRAINING ═══ */}
      {tab === "ava" && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{t("Programmes de formation AVA", "AVA Training Programs", "برامج تدريب التحالف")}</h2>
            <p className="text-gray-500 text-sm mb-8">{t("Formations spécialisées conçues pour le contexte africain", "Specialized training designed for the African context", "تدريبات متخصصة مصممة للسياق الأفريقي")}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avaPrograms.map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="text-4xl mb-3">{p.icon}</div>
                  <h3 className="text-lg font-bold mb-1">{lang === "ar" ? p.titleAr : lang === "en" ? p.titleEn : p.titleFr}</h3>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium mb-3">{lang === "ar" ? p.durationAr : lang === "en" ? p.durationEn : p.durationFr}</span>
                  <p className="text-sm text-gray-600">{lang === "ar" ? p.descAr : lang === "en" ? p.descEn : p.descFr}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/join" className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-800 transition">
                {t("S'inscrire aux formations", "Enroll in training", "التسجيل في التدريبات")}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* AI Recommendation */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Pas sûr de ce que vous cherchez ?", "Not sure what you're looking for?", "غير متأكد مما تبحث عنه؟")}</h2>
          <p className="text-gray-400 mb-8">{t(
            "Notre IA analyse votre profil et vous recommande les meilleures opportunités.",
            "Our AI analyzes your profile and recommends the best opportunities.",
            "يحلل ذكاؤنا الاصطناعي ملفك الشخصي ويوصي بأفضل الفرص."
          )}</p>
          <Link href="/tools" className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition">
            🤖 {t("Utiliser l'IA", "Use AI", "استخدم الذكاء الاصطناعي")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}