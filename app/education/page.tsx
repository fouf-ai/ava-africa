"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

interface University {
  name: string;
  country: string;
  flag: string;
  region: string;
  link: string;
  type: string;
  languages: string[];
}

const typeIcons: Record<string, { icon: string; label: { fr: string; en: string; ar: string }; color: string }> = {
  mooc: { icon: "📘", label: { fr: "MOOC", en: "MOOC", ar: "دورات مفتوحة" }, color: "bg-blue-100 text-blue-700 border-blue-200" },
  ocw: { icon: "🏛️", label: { fr: "Université", en: "University", ar: "جامعة" }, color: "bg-green-100 text-green-700 border-green-200" },
  certification: { icon: "📜", label: { fr: "Certification", en: "Certification", ar: "شهادة" }, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  university: { icon: "🎓", label: { fr: "Diplôme gratuit", en: "Free Degree", ar: "شهادة مجانية" }, color: "bg-purple-100 text-purple-700 border-purple-200" },
};

const universities: University[] = [
  // === MOOC PLATFORMS (Global) ===
  { name: "Coursera", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.coursera.org", type: "mooc", languages: ["en", "fr", "ar", "es"] },
  { name: "edX", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.edx.org", type: "mooc", languages: ["en", "fr", "es"] },
  { name: "Khan Academy", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.khanacademy.org", type: "mooc", languages: ["en", "fr", "ar", "es"] },
  { name: "FutureLearn", country: "UK", flag: "🇬🇧", region: "global", link: "https://www.futurelearn.com", type: "mooc", languages: ["en"] },
  { name: "Udacity", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.udacity.com", type: "mooc", languages: ["en"] },
  { name: "Alison", country: "Ireland", flag: "🇮🇪", region: "global", link: "https://alison.com", type: "mooc", languages: ["en", "fr", "ar"] },
  { name: "Swayam", country: "India", flag: "🇮🇳", region: "global", link: "https://swayam.gov.in", type: "mooc", languages: ["en", "hi"] },
  { name: "FUN MOOC", country: "France", flag: "🇫🇷", region: "global", link: "https://www.fun-mooc.fr", type: "mooc", languages: ["fr"] },
  { name: "Class Central", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.classcentral.com", type: "mooc", languages: ["en"] },
  { name: "OpenLearn (Open University)", country: "UK", flag: "🇬🇧", region: "global", link: "https://www.open.edu/openlearn", type: "mooc", languages: ["en"] },
  { name: "Saylor Academy", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.saylor.org", type: "mooc", languages: ["en"] },
  { name: "NPTEL", country: "India", flag: "🇮🇳", region: "global", link: "https://nptel.ac.in", type: "mooc", languages: ["en"] },
  { name: "Rwaq", country: "Saudi Arabia", flag: "🇸🇦", region: "global", link: "https://www.rwaq.org", type: "mooc", languages: ["ar"] },
  { name: "Edraak", country: "Jordan", flag: "🇯🇴", region: "global", link: "https://www.edraak.org", type: "mooc", languages: ["ar"] },
  { name: "Skillshare", country: "USA", flag: "🇺🇸", region: "global", link: "https://www.skillshare.com", type: "mooc", languages: ["en"] },

  // === USA ===
  { name: "MIT OpenCourseWare", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://ocw.mit.edu", type: "ocw", languages: ["en"] },
  { name: "Harvard Online Learning", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://online-learning.harvard.edu/catalog/free", type: "ocw", languages: ["en"] },
  { name: "Stanford Online", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://online.stanford.edu/free-courses", type: "ocw", languages: ["en"] },
  { name: "Yale Open Courses", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://oyc.yale.edu", type: "ocw", languages: ["en"] },
  { name: "Carnegie Mellon Open Learning", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.cmu.edu/open-learning", type: "ocw", languages: ["en"] },
  { name: "UC Berkeley Webcasts", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://webcast.berkeley.edu", type: "ocw", languages: ["en"] },
  { name: "Rice University (OpenStax)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://openstax.org", type: "ocw", languages: ["en"] },
  { name: "University of Michigan Open", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://open.umich.edu", type: "ocw", languages: ["en"] },
  { name: "Johns Hopkins (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/jhu", type: "ocw", languages: ["en"] },
  { name: "Columbia University (edX)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.edx.org/school/columbiax", type: "ocw", languages: ["en"] },
  { name: "Duke University (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/duke", type: "ocw", languages: ["en"] },
  { name: "Georgia Tech Online", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://pe.gatech.edu/massive-open-online-courses", type: "ocw", languages: ["en"] },
  { name: "Princeton (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/princeton", type: "ocw", languages: ["en"] },
  { name: "University of Pennsylvania (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/penn", type: "ocw", languages: ["en"] },
  { name: "Cornell University (edX)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.edx.org/school/cornellx", type: "ocw", languages: ["en"] },
  { name: "Northwestern (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/northwestern", type: "ocw", languages: ["en"] },
  { name: "Brown University (Coursera)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.coursera.org/brown", type: "ocw", languages: ["en"] },
  { name: "Caltech Online", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://online.caltech.edu", type: "ocw", languages: ["en"] },
  { name: "Purdue University (edX)", country: "USA", flag: "🇺🇸", region: "north-america", link: "https://www.edx.org/school/purduex", type: "ocw", languages: ["en"] },

  // === EUROPE ===
  { name: "University of Oxford (Podcasts)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://podcasts.ox.ac.uk", type: "ocw", languages: ["en"] },
  { name: "University of Cambridge (OER)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.cam.ac.uk/open-learning", type: "ocw", languages: ["en"] },
  { name: "University of Edinburgh (Coursera)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.coursera.org/edinburgh", type: "ocw", languages: ["en"] },
  { name: "Imperial College London (Coursera)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.coursera.org/imperial", type: "ocw", languages: ["en"] },
  { name: "University of London (Coursera)", country: "UK", flag: "🇬🇧", region: "europe", link: "https://www.coursera.org/london", type: "ocw", languages: ["en"] },
  { name: "École Polytechnique (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/ecole-polytechnique", type: "ocw", languages: ["fr", "en"] },
  { name: "HEC Paris (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/hec-paris", type: "ocw", languages: ["fr", "en"] },
  { name: "Sciences Po (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/sciencespo", type: "ocw", languages: ["fr", "en"] },
  { name: "Sorbonne Université (FUN)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.fun-mooc.fr", type: "ocw", languages: ["fr"] },
  { name: "ESSEC Business School (Coursera)", country: "France", flag: "🇫🇷", region: "europe", link: "https://www.coursera.org/essec", type: "ocw", languages: ["fr", "en"] },
  { name: "TU Delft (edX)", country: "Netherlands", flag: "🇳🇱", region: "europe", link: "https://www.edx.org/school/delftx", type: "ocw", languages: ["en"] },
  { name: "ETH Zurich (edX)", country: "Switzerland", flag: "🇨🇭", region: "europe", link: "https://www.edx.org/school/ethx", type: "ocw", languages: ["en"] },
  { name: "EPFL (edX)", country: "Switzerland", flag: "🇨🇭", region: "europe", link: "https://www.edx.org/school/epflx", type: "ocw", languages: ["en", "fr"] },
  { name: "TU Munich (edX)", country: "Germany", flag: "🇩🇪", region: "europe", link: "https://www.edx.org/school/tumx", type: "ocw", languages: ["en"] },
  { name: "University of Helsinki", country: "Finland", flag: "🇫🇮", region: "europe", link: "https://www.mooc.fi/en", type: "ocw", languages: ["en"] },
  { name: "Lund University (Coursera)", country: "Sweden", flag: "🇸🇪", region: "europe", link: "https://www.coursera.org/lund", type: "ocw", languages: ["en"] },
  { name: "University of Copenhagen (Coursera)", country: "Denmark", flag: "🇩🇰", region: "europe", link: "https://www.coursera.org/ucph", type: "ocw", languages: ["en"] },
  { name: "IE Business School (Coursera)", country: "Spain", flag: "🇪🇸", region: "europe", link: "https://www.coursera.org/ie", type: "ocw", languages: ["en", "es"] },
  { name: "Politecnico di Milano (Coursera)", country: "Italy", flag: "🇮🇹", region: "europe", link: "https://www.coursera.org/polimi", type: "ocw", languages: ["en"] },
  { name: "KU Leuven (edX)", country: "Belgium", flag: "🇧🇪", region: "europe", link: "https://www.edx.org/school/kuleuvenx", type: "ocw", languages: ["en"] },
  { name: "University of Amsterdam (Coursera)", country: "Netherlands", flag: "🇳🇱", region: "europe", link: "https://www.coursera.org/amsterdam", type: "ocw", languages: ["en"] },

  // === AFRICA ===
  { name: "African Virtual University (AVU)", country: "Kenya", flag: "🇰🇪", region: "africa", link: "https://avu.org", type: "university", languages: ["en", "fr"] },
  { name: "University of Cape Town (Coursera)", country: "South Africa", flag: "🇿🇦", region: "africa", link: "https://www.coursera.org/uct", type: "ocw", languages: ["en"] },
  { name: "University of the Witwatersrand (Coursera)", country: "South Africa", flag: "🇿🇦", region: "africa", link: "https://www.coursera.org/wits", type: "ocw", languages: ["en"] },
  { name: "Stellenbosch University (edX)", country: "South Africa", flag: "🇿🇦", region: "africa", link: "https://www.edx.org/school/stellenboschx", type: "ocw", languages: ["en"] },
  { name: "University of the People", country: "USA/Africa", flag: "🌍", region: "africa", link: "https://www.uopeople.edu", type: "university", languages: ["en"] },
  { name: "AIMS (African Institute for Mathematical Sciences)", country: "Pan-African", flag: "🌍", region: "africa", link: "https://nexteinstein.org", type: "university", languages: ["en", "fr"] },
  { name: "African Leadership University", country: "Rwanda", flag: "🇷🇼", region: "africa", link: "https://www.alueducation.com", type: "university", languages: ["en"] },
  { name: "ALX Africa", country: "Pan-African", flag: "🌍", region: "africa", link: "https://www.alxafrica.com", type: "university", languages: ["en"] },
  { name: "Moringa School", country: "Kenya", flag: "🇰🇪", region: "africa", link: "https://moringaschool.com", type: "university", languages: ["en"] },
  { name: "Cisco Networking Academy Africa", country: "Pan-African", flag: "🌍", region: "africa", link: "https://www.netacad.com", type: "certification", languages: ["en", "fr"] },
  { name: "Google Africa Developer Scholarship", country: "Pan-African", flag: "🌍", region: "africa", link: "https://developers.google.com/community/gdsc", type: "certification", languages: ["en"] },
  { name: "Microsoft Learn Africa", country: "Pan-African", flag: "🌍", region: "africa", link: "https://learn.microsoft.com", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "Andela Learning Community", country: "Pan-African", flag: "🌍", region: "africa", link: "https://andela.com", type: "certification", languages: ["en"] },

  // === ASIA ===
  { name: "Peking University (Coursera)", country: "China", flag: "🇨🇳", region: "asia", link: "https://www.coursera.org/pku", type: "ocw", languages: ["en", "zh"] },
  { name: "Tsinghua University (edX)", country: "China", flag: "🇨🇳", region: "asia", link: "https://www.edx.org/school/tsinghuax", type: "ocw", languages: ["en", "zh"] },
  { name: "University of Tokyo (Coursera)", country: "Japan", flag: "🇯🇵", region: "asia", link: "https://www.coursera.org/utokyo", type: "ocw", languages: ["en", "ja"] },
  { name: "KAIST (Coursera)", country: "South Korea", flag: "🇰🇷", region: "asia", link: "https://www.coursera.org/kaist", type: "ocw", languages: ["en", "ko"] },
  { name: "IIT Bombay (NPTEL)", country: "India", flag: "🇮🇳", region: "asia", link: "https://nptel.ac.in", type: "ocw", languages: ["en"] },
  { name: "National University of Singapore (Coursera)", country: "Singapore", flag: "🇸🇬", region: "asia", link: "https://www.coursera.org/nus", type: "ocw", languages: ["en"] },
  { name: "Hong Kong University (edX)", country: "Hong Kong", flag: "🇭🇰", region: "asia", link: "https://www.edx.org/school/hkux", type: "ocw", languages: ["en"] },
  { name: "Yonsei University (Coursera)", country: "South Korea", flag: "🇰🇷", region: "asia", link: "https://www.coursera.org/yonsei", type: "ocw", languages: ["en"] },

  // === MIDDLE EAST ===
  { name: "King Abdullah University (edX)", country: "Saudi Arabia", flag: "🇸🇦", region: "mena", link: "https://www.edx.org/school/kaustx", type: "ocw", languages: ["en", "ar"] },
  { name: "AUC (American University in Cairo)", country: "Egypt", flag: "🇪🇬", region: "mena", link: "https://www.aucegypt.edu", type: "university", languages: ["en", "ar"] },
  { name: "Mohammed V University", country: "Morocco", flag: "🇲🇦", region: "mena", link: "https://www.um5.ac.ma", type: "university", languages: ["fr", "ar"] },

  // === TECH CERTIFICATIONS ===
  { name: "Google Digital Garage", country: "Global", flag: "🌐", region: "global", link: "https://learndigital.withgoogle.com/digitalgarage", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "Google Cloud Skills Boost", country: "Global", flag: "🌐", region: "global", link: "https://www.cloudskillsboost.google", type: "certification", languages: ["en"] },
  { name: "AWS Skill Builder", country: "Global", flag: "🌐", region: "global", link: "https://explore.skillbuilder.aws", type: "certification", languages: ["en"] },
  { name: "Microsoft Learn", country: "Global", flag: "🌐", region: "global", link: "https://learn.microsoft.com", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "IBM SkillsBuild", country: "Global", flag: "🌐", region: "global", link: "https://skillsbuild.org", type: "certification", languages: ["en", "fr"] },
  { name: "Cisco Networking Academy", country: "Global", flag: "🌐", region: "global", link: "https://www.netacad.com", type: "certification", languages: ["en", "fr"] },
  { name: "Salesforce Trailhead", country: "Global", flag: "🌐", region: "global", link: "https://trailhead.salesforce.com", type: "certification", languages: ["en"] },
  { name: "HubSpot Academy", country: "Global", flag: "🌐", region: "global", link: "https://academy.hubspot.com", type: "certification", languages: ["en"] },
  { name: "Meta Blueprint", country: "Global", flag: "🌐", region: "global", link: "https://www.facebookblueprint.com", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "freeCodeCamp", country: "Global", flag: "🌐", region: "global", link: "https://www.freecodecamp.org", type: "certification", languages: ["en"] },
  { name: "The Odin Project", country: "Global", flag: "🌐", region: "global", link: "https://www.theodinproject.com", type: "certification", languages: ["en"] },
  { name: "Kaggle Learn", country: "Global", flag: "🌐", region: "global", link: "https://www.kaggle.com/learn", type: "certification", languages: ["en"] },
  { name: "Cybrary", country: "Global", flag: "🌐", region: "global", link: "https://www.cybrary.it", type: "certification", languages: ["en"] },
  { name: "TryHackMe", country: "Global", flag: "🌐", region: "global", link: "https://tryhackme.com", type: "certification", languages: ["en"] },
  { name: "Hack The Box Academy", country: "Global", flag: "🌐", region: "global", link: "https://academy.hackthebox.com", type: "certification", languages: ["en"] },
  { name: "GitHub Skills", country: "Global", flag: "🌐", region: "global", link: "https://skills.github.com", type: "certification", languages: ["en"] },
  { name: "W3Schools", country: "Global", flag: "🌐", region: "global", link: "https://www.w3schools.com", type: "certification", languages: ["en"] },

  // === CANADA ===
  { name: "University of Toronto (Coursera)", country: "Canada", flag: "🇨🇦", region: "north-america", link: "https://www.coursera.org/utoronto", type: "ocw", languages: ["en"] },
  { name: "McGill University (edX)", country: "Canada", flag: "🇨🇦", region: "north-america", link: "https://www.edx.org/school/mcgillx", type: "ocw", languages: ["en", "fr"] },
  { name: "University of British Columbia (edX)", country: "Canada", flag: "🇨🇦", region: "north-america", link: "https://www.edx.org/school/ubcx", type: "ocw", languages: ["en"] },

  // === AUSTRALIA ===
  { name: "University of Melbourne (Coursera)", country: "Australia", flag: "🇦🇺", region: "oceania", link: "https://www.coursera.org/unimelb", type: "ocw", languages: ["en"] },
  { name: "University of Queensland (edX)", country: "Australia", flag: "🇦🇺", region: "oceania", link: "https://www.edx.org/school/uqx", type: "ocw", languages: ["en"] },
  { name: "University of Sydney (Coursera)", country: "Australia", flag: "🇦🇺", region: "oceania", link: "https://www.coursera.org/usyd", type: "ocw", languages: ["en"] },

  // === LATIN AMERICA ===
  { name: "Tecnológico de Monterrey (Coursera)", country: "Mexico", flag: "🇲🇽", region: "latam", link: "https://www.coursera.org/tec", type: "ocw", languages: ["es", "en"] },
  { name: "Universidad de los Andes (Coursera)", country: "Colombia", flag: "🇨🇴", region: "latam", link: "https://www.coursera.org/uniandes", type: "ocw", languages: ["es", "en"] },
];

const regionFilters = [
  { id: "all", fr: "Tout", en: "All", ar: "الكل" },
  { id: "global", fr: "🌐 Plateformes mondiales", en: "🌐 Global Platforms", ar: "🌐 منصات عالمية" },
  { id: "africa", fr: "🌍 Afrique", en: "🌍 Africa", ar: "🌍 أفريقيا" },
  { id: "north-america", fr: "🇺🇸 Amérique du Nord", en: "🇺🇸 North America", ar: "🇺🇸 أمريكا الشمالية" },
  { id: "europe", fr: "🇪🇺 Europe", en: "🇪🇺 Europe", ar: "🇪🇺 أوروبا" },
  { id: "asia", fr: "🌏 Asie", en: "🌏 Asia", ar: "🌏 آسيا" },
  { id: "mena", fr: "🌙 Moyen-Orient", en: "🌙 Middle East", ar: "🌙 الشرق الأوسط" },
  { id: "oceania", fr: "🇦🇺 Océanie", en: "🇦🇺 Oceania", ar: "🇦🇺 أوقيانوسيا" },
  { id: "latam", fr: "🌎 Amérique Latine", en: "🌎 Latin America", ar: "🌎 أمريكا اللاتينية" },
];

const typeFilters = [
  { id: "all", fr: "Tout", en: "All", ar: "الكل" },
  { id: "mooc", fr: "📘 MOOC", en: "📘 MOOC", ar: "📘 دورات مفتوحة" },
  { id: "ocw", fr: "🏛️ Universités", en: "🏛️ Universities", ar: "🏛️ جامعات" },
  { id: "certification", fr: "📜 Certifications", en: "📜 Certifications", ar: "📜 شهادات" },
  { id: "university", fr: "🎓 Diplômes gratuits", en: "🎓 Free Degrees", ar: "🎓 شهادات مجانية" },
];

export default function Education() {
  const { t, lang } = useLanguage();
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = universities.filter((u) => {
    const matchRegion = regionFilter === "all" || u.region === regionFilter;
    const matchType = typeFilter === "all" || u.type === typeFilter;
    const matchSearch = search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchType && matchSearch;
  });

  const langLabel = (item: { fr: string; en: string; ar: string }) => lang === "ar" ? item.ar : lang === "en" ? item.en : item.fr;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/education" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-indigo-800 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Éducation Gratuite", "Free Education", "التعليم المجاني")}</h1>
          <p className="text-xl text-indigo-200">{t(
            `${universities.length}+ universités et plateformes en ligne gratuites dans le monde`,
            `${universities.length}+ free online universities and platforms worldwide`,
            `${universities.length}+ جامعة ومنصة مجانية عبر الإنترنت في العالم`
          )}</p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-8 px-6 bg-gray-50 border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-6xl mx-auto space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("🔍 Rechercher une université ou un pays...", "🔍 Search a university or country...", "🔍 ابحث عن جامعة أو دولة...")}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap gap-2">
            {regionFilters.map((f) => (
              <button key={f.id} onClick={() => setRegionFilter(f.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${regionFilter === f.id ? "bg-indigo-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
                {langLabel(f)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f) => (
              <button key={f.id} onClick={() => setTypeFilter(f.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${typeFilter === f.id ? "bg-purple-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
                {langLabel(f)}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">{t(`${filtered.length} résultats`, `${filtered.length} results`, `${filtered.length} نتيجة`)}</p>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((u, i) => {
              const ti = typeIcons[u.type] || typeIcons.mooc;
              return (
                <a key={i} href={u.link} target="_blank" rel="noopener noreferrer" className={`block rounded-xl p-5 border hover:shadow-md transition ${ti.color}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{ti.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm mb-1 truncate">{u.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{u.flag} {u.country}</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/60 font-medium">
                          {langLabel(ti.label)}
                        </span>
                        {u.languages.map((l) => (
                          <span key={l} className="text-xs px-1.5 py-0.5 rounded bg-white/40 text-gray-600 font-medium">
                            {l.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-400 shrink-0">→</span>
                  </div>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">🔍</p>
              <p>{t("Aucun résultat trouvé.", "No results found.", "لم يتم العثور على نتائج.")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-indigo-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Besoin d'aide pour choisir ?", "Need help choosing?", "تحتاج مساعدة في الاختيار؟")}</h2>
          <p className="text-indigo-200 mb-8">{t(
            "Notre IA peut vous recommander les meilleures opportunités selon votre profil.",
            "Our AI can recommend the best opportunities based on your profile.",
            "يمكن للذكاء الاصطناعي لدينا أن يوصي بأفضل الفرص بناءً على ملفك الشخصي."
          )}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#ai-tools" className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition">
              🤖 {t("Utiliser l'IA", "Use AI Tools", "استخدم الذكاء الاصطناعي")}
            </Link>
            <Link href="/scholarships" className="border-2 border-white/40 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
              🎓 {t("Voir les bourses", "View scholarships", "عرض المنح")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}