"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

interface University {
  name: string;
  country: string;
  region: string;
  link: string;
  type: string;
  languages: string[];
}

const universities: University[] = [
  // === MOOC PLATFORMS (Global) ===
  { name: "Coursera", country: "USA", region: "global", link: "https://www.coursera.org", type: "mooc", languages: ["en", "fr", "ar", "es"] },
  { name: "edX", country: "USA", region: "global", link: "https://www.edx.org", type: "mooc", languages: ["en", "fr", "es"] },
  { name: "Khan Academy", country: "USA", region: "global", link: "https://www.khanacademy.org", type: "mooc", languages: ["en", "fr", "ar", "es"] },
  { name: "FutureLearn", country: "UK", region: "global", link: "https://www.futurelearn.com", type: "mooc", languages: ["en"] },
  { name: "Udacity", country: "USA", region: "global", link: "https://www.udacity.com", type: "mooc", languages: ["en"] },
  { name: "Alison", country: "Ireland", region: "global", link: "https://alison.com", type: "mooc", languages: ["en", "fr", "ar"] },
  { name: "Swayam", country: "India", region: "global", link: "https://swayam.gov.in", type: "mooc", languages: ["en", "hi"] },
  { name: "FUN MOOC", country: "France", region: "global", link: "https://www.fun-mooc.fr", type: "mooc", languages: ["fr"] },
  { name: "Class Central", country: "USA", region: "global", link: "https://www.classcentral.com", type: "mooc", languages: ["en"] },
  { name: "OpenLearn (Open University)", country: "UK", region: "global", link: "https://www.open.edu/openlearn", type: "mooc", languages: ["en"] },
  { name: "Saylor Academy", country: "USA", region: "global", link: "https://www.saylor.org", type: "mooc", languages: ["en"] },
  { name: "NPTEL", country: "India", region: "global", link: "https://nptel.ac.in", type: "mooc", languages: ["en"] },
  { name: "Rwaq", country: "Saudi Arabia", region: "global", link: "https://www.rwaq.org", type: "mooc", languages: ["ar"] },
  { name: "Edraak", country: "Jordan", region: "global", link: "https://www.edraak.org", type: "mooc", languages: ["ar"] },
  { name: "Skillshare", country: "USA", region: "global", link: "https://www.skillshare.com", type: "mooc", languages: ["en"] },

  // === USA — OCW & Free Programs ===
  { name: "MIT OpenCourseWare", country: "USA", region: "north-america", link: "https://ocw.mit.edu", type: "ocw", languages: ["en"] },
  { name: "Harvard Online Learning", country: "USA", region: "north-america", link: "https://online-learning.harvard.edu/catalog/free", type: "ocw", languages: ["en"] },
  { name: "Stanford Online", country: "USA", region: "north-america", link: "https://online.stanford.edu/free-courses", type: "ocw", languages: ["en"] },
  { name: "Yale Open Courses", country: "USA", region: "north-america", link: "https://oyc.yale.edu", type: "ocw", languages: ["en"] },
  { name: "Carnegie Mellon Open Learning", country: "USA", region: "north-america", link: "https://www.cmu.edu/open-learning", type: "ocw", languages: ["en"] },
  { name: "UC Berkeley Webcasts", country: "USA", region: "north-america", link: "https://webcast.berkeley.edu", type: "ocw", languages: ["en"] },
  { name: "Rice University (OpenStax)", country: "USA", region: "north-america", link: "https://openstax.org", type: "ocw", languages: ["en"] },
  { name: "University of Michigan Open", country: "USA", region: "north-america", link: "https://open.umich.edu", type: "ocw", languages: ["en"] },
  { name: "Johns Hopkins (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/jhu", type: "ocw", languages: ["en"] },
  { name: "Columbia University (edX)", country: "USA", region: "north-america", link: "https://www.edx.org/school/columbiax", type: "ocw", languages: ["en"] },
  { name: "Duke University (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/duke", type: "ocw", languages: ["en"] },
  { name: "Georgia Tech Online", country: "USA", region: "north-america", link: "https://pe.gatech.edu/massive-open-online-courses", type: "ocw", languages: ["en"] },
  { name: "Purdue University (edX)", country: "USA", region: "north-america", link: "https://www.edx.org/school/purduex", type: "ocw", languages: ["en"] },
  { name: "Caltech Online", country: "USA", region: "north-america", link: "https://online.caltech.edu", type: "ocw", languages: ["en"] },
  { name: "Cornell University (edX)", country: "USA", region: "north-america", link: "https://www.edx.org/school/cornellx", type: "ocw", languages: ["en"] },
  { name: "Northwestern (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/northwestern", type: "ocw", languages: ["en"] },
  { name: "University of Pennsylvania (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/penn", type: "ocw", languages: ["en"] },
  { name: "Princeton (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/princeton", type: "ocw", languages: ["en"] },
  { name: "Brown University (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/brown", type: "ocw", languages: ["en"] },
  { name: "University of Virginia (Coursera)", country: "USA", region: "north-america", link: "https://www.coursera.org/uva", type: "ocw", languages: ["en"] },

  // === EUROPE ===
  { name: "University of Oxford (Podcasts)", country: "UK", region: "europe", link: "https://podcasts.ox.ac.uk", type: "ocw", languages: ["en"] },
  { name: "University of Cambridge (OER)", country: "UK", region: "europe", link: "https://www.cam.ac.uk/open-learning", type: "ocw", languages: ["en"] },
  { name: "University of Edinburgh (Coursera)", country: "UK", region: "europe", link: "https://www.coursera.org/edinburgh", type: "ocw", languages: ["en"] },
  { name: "University of London (Coursera)", country: "UK", region: "europe", link: "https://www.coursera.org/london", type: "ocw", languages: ["en"] },
  { name: "Imperial College London (Coursera)", country: "UK", region: "europe", link: "https://www.coursera.org/imperial", type: "ocw", languages: ["en"] },
  { name: "King's College London (FutureLearn)", country: "UK", region: "europe", link: "https://www.futurelearn.com/partners/kings-college-london", type: "ocw", languages: ["en"] },
  { name: "École Polytechnique (Coursera)", country: "France", region: "europe", link: "https://www.coursera.org/ecole-polytechnique", type: "ocw", languages: ["fr", "en"] },
  { name: "HEC Paris (Coursera)", country: "France", region: "europe", link: "https://www.coursera.org/hec-paris", type: "ocw", languages: ["fr", "en"] },
  { name: "Sciences Po (Coursera)", country: "France", region: "europe", link: "https://www.coursera.org/sciencespo", type: "ocw", languages: ["fr", "en"] },
  { name: "Sorbonne Université (FUN)", country: "France", region: "europe", link: "https://www.fun-mooc.fr", type: "ocw", languages: ["fr"] },
  { name: "ESSEC Business School (Coursera)", country: "France", region: "europe", link: "https://www.coursera.org/essec", type: "ocw", languages: ["fr", "en"] },
  { name: "TU Delft (edX)", country: "Netherlands", region: "europe", link: "https://www.edx.org/school/delftx", type: "ocw", languages: ["en"] },
  { name: "ETH Zurich (edX)", country: "Switzerland", region: "europe", link: "https://www.edx.org/school/ethx", type: "ocw", languages: ["en"] },
  { name: "EPFL (edX)", country: "Switzerland", region: "europe", link: "https://www.edx.org/school/epflx", type: "ocw", languages: ["en", "fr"] },
  { name: "Technical University of Munich (edX)", country: "Germany", region: "europe", link: "https://www.edx.org/school/tumx", type: "ocw", languages: ["en"] },
  { name: "University of Helsinki", country: "Finland", region: "europe", link: "https://www.mooc.fi/en", type: "ocw", languages: ["en"] },
  { name: "Lund University (Coursera)", country: "Sweden", region: "europe", link: "https://www.coursera.org/lund", type: "ocw", languages: ["en"] },
  { name: "University of Copenhagen (Coursera)", country: "Denmark", region: "europe", link: "https://www.coursera.org/ucph", type: "ocw", languages: ["en"] },
  { name: "IE Business School (Coursera)", country: "Spain", region: "europe", link: "https://www.coursera.org/ie", type: "ocw", languages: ["en", "es"] },
  { name: "Politecnico di Milano (Coursera)", country: "Italy", region: "europe", link: "https://www.coursera.org/polimi", type: "ocw", languages: ["en"] },
  { name: "Universitat Autònoma de Barcelona (Coursera)", country: "Spain", region: "europe", link: "https://www.coursera.org/uab", type: "ocw", languages: ["en", "es"] },
  { name: "KU Leuven (edX)", country: "Belgium", region: "europe", link: "https://www.edx.org/school/kuleuvenx", type: "ocw", languages: ["en"] },
  { name: "University of Amsterdam (Coursera)", country: "Netherlands", region: "europe", link: "https://www.coursera.org/amsterdam", type: "ocw", languages: ["en"] },
  { name: "Ludwig-Maximilians-Universität München (Coursera)", country: "Germany", region: "europe", link: "https://www.coursera.org/lmu", type: "ocw", languages: ["en"] },

  // === AFRICA ===
  { name: "African Virtual University (AVU)", country: "Kenya", region: "africa", link: "https://avu.org", type: "university", languages: ["en", "fr"] },
  { name: "University of Cape Town (Coursera)", country: "South Africa", region: "africa", link: "https://www.coursera.org/uct", type: "ocw", languages: ["en"] },
  { name: "University of the Witwatersrand (Coursera)", country: "South Africa", region: "africa", link: "https://www.coursera.org/wits", type: "ocw", languages: ["en"] },
  { name: "Stellenbosch University (edX)", country: "South Africa", region: "africa", link: "https://www.edx.org/school/stellenboschx", type: "ocw", languages: ["en"] },
  { name: "University of the People", country: "USA/Africa", region: "africa", link: "https://www.uopeople.edu", type: "university", languages: ["en"] },
  { name: "AIMS (African Institute for Mathematical Sciences)", country: "Pan-African", region: "africa", link: "https://nexteinstein.org", type: "university", languages: ["en", "fr"] },
  { name: "African Leadership University", country: "Rwanda/Mauritius", region: "africa", link: "https://www.alueducation.com", type: "university", languages: ["en"] },
  { name: "Cisco Networking Academy Africa", country: "Pan-African", region: "africa", link: "https://www.netacad.com", type: "certification", languages: ["en", "fr"] },
  { name: "Google Africa Developer Scholarship", country: "Pan-African", region: "africa", link: "https://developers.google.com/community/gdsc", type: "certification", languages: ["en"] },
  { name: "Microsoft Learn Africa", country: "Pan-African", region: "africa", link: "https://learn.microsoft.com", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "ALX Africa", country: "Pan-African", region: "africa", link: "https://www.alxafrica.com", type: "university", languages: ["en"] },
  { name: "Moringa School", country: "Kenya", region: "africa", link: "https://moringaschool.com", type: "university", languages: ["en"] },
  { name: "Andela Learning Community", country: "Pan-African", region: "africa", link: "https://andela.com", type: "certification", languages: ["en"] },

  // === ASIA ===
  { name: "Peking University (Coursera)", country: "China", region: "asia", link: "https://www.coursera.org/pku", type: "ocw", languages: ["en", "zh"] },
  { name: "Tsinghua University (edX)", country: "China", region: "asia", link: "https://www.edx.org/school/tsinghuax", type: "ocw", languages: ["en", "zh"] },
  { name: "University of Tokyo (Coursera)", country: "Japan", region: "asia", link: "https://www.coursera.org/utokyo", type: "ocw", languages: ["en", "ja"] },
  { name: "KAIST (Coursera)", country: "South Korea", region: "asia", link: "https://www.coursera.org/kaist", type: "ocw", languages: ["en", "ko"] },
  { name: "IIT Bombay (NPTEL)", country: "India", region: "asia", link: "https://nptel.ac.in", type: "ocw", languages: ["en"] },
  { name: "IIT Madras (NPTEL)", country: "India", region: "asia", link: "https://nptel.ac.in", type: "ocw", languages: ["en"] },
  { name: "National University of Singapore (Coursera)", country: "Singapore", region: "asia", link: "https://www.coursera.org/nus", type: "ocw", languages: ["en"] },
  { name: "Hong Kong University (edX)", country: "Hong Kong", region: "asia", link: "https://www.edx.org/school/hkux", type: "ocw", languages: ["en"] },
  { name: "Yonsei University (Coursera)", country: "South Korea", region: "asia", link: "https://www.coursera.org/yonsei", type: "ocw", languages: ["en"] },
  { name: "HKUST (Coursera)", country: "Hong Kong", region: "asia", link: "https://www.coursera.org/hkust", type: "ocw", languages: ["en"] },

  // === MIDDLE EAST & NORTH AFRICA ===
  { name: "King Abdullah University (edX)", country: "Saudi Arabia", region: "mena", link: "https://www.edx.org/school/kaustx", type: "ocw", languages: ["en", "ar"] },
  { name: "Hamad Bin Khalifa University", country: "Qatar", region: "mena", link: "https://www.hbku.edu.qa", type: "university", languages: ["en", "ar"] },
  { name: "AUC (American University in Cairo)", country: "Egypt", region: "mena", link: "https://www.aucegypt.edu", type: "university", languages: ["en", "ar"] },
  { name: "Beirut Arab University (Coursera)", country: "Lebanon", region: "mena", link: "https://www.coursera.org", type: "ocw", languages: ["en", "ar"] },
  { name: "Mohammed V University (Morocco)", country: "Morocco", region: "mena", link: "https://www.um5.ac.ma", type: "university", languages: ["fr", "ar"] },

  // === TECH CERTIFICATIONS (Free) ===
  { name: "Google Digital Garage", country: "Global", region: "global", link: "https://learndigital.withgoogle.com/digitalgarage", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "Google Cloud Skills Boost", country: "Global", region: "global", link: "https://www.cloudskillsboost.google", type: "certification", languages: ["en"] },
  { name: "AWS Skill Builder", country: "Global", region: "global", link: "https://explore.skillbuilder.aws", type: "certification", languages: ["en"] },
  { name: "Microsoft Learn", country: "Global", region: "global", link: "https://learn.microsoft.com", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "IBM SkillsBuild", country: "Global", region: "global", link: "https://skillsbuild.org", type: "certification", languages: ["en", "fr"] },
  { name: "Cisco Networking Academy", country: "Global", region: "global", link: "https://www.netacad.com", type: "certification", languages: ["en", "fr"] },
  { name: "Oracle University Free Courses", country: "Global", region: "global", link: "https://education.oracle.com/learning-explorer", type: "certification", languages: ["en"] },
  { name: "Salesforce Trailhead", country: "Global", region: "global", link: "https://trailhead.salesforce.com", type: "certification", languages: ["en"] },
  { name: "HubSpot Academy", country: "Global", region: "global", link: "https://academy.hubspot.com", type: "certification", languages: ["en"] },
  { name: "Meta Blueprint", country: "Global", region: "global", link: "https://www.facebookblueprint.com", type: "certification", languages: ["en", "fr", "ar"] },
  { name: "GitHub Learning Lab", country: "Global", region: "global", link: "https://skills.github.com", type: "certification", languages: ["en"] },
  { name: "freeCodeCamp", country: "Global", region: "global", link: "https://www.freecodecamp.org", type: "certification", languages: ["en"] },
  { name: "The Odin Project", country: "Global", region: "global", link: "https://www.theodinproject.com", type: "certification", languages: ["en"] },
  { name: "Codecademy (Free tier)", country: "Global", region: "global", link: "https://www.codecademy.com", type: "certification", languages: ["en"] },
  { name: "W3Schools", country: "Global", region: "global", link: "https://www.w3schools.com", type: "certification", languages: ["en"] },
  { name: "Kaggle Learn", country: "Global", region: "global", link: "https://www.kaggle.com/learn", type: "certification", languages: ["en"] },
  { name: "DataCamp (Free courses)", country: "Global", region: "global", link: "https://www.datacamp.com", type: "certification", languages: ["en"] },
  { name: "Cybrary", country: "Global", region: "global", link: "https://www.cybrary.it", type: "certification", languages: ["en"] },
  { name: "TryHackMe", country: "Global", region: "global", link: "https://tryhackme.com", type: "certification", languages: ["en"] },
  { name: "Hack The Box Academy", country: "Global", region: "global", link: "https://academy.hackthebox.com", type: "certification", languages: ["en"] },

  // === LATIN AMERICA ===
  { name: "Tecnológico de Monterrey (Coursera)", country: "Mexico", region: "latam", link: "https://www.coursera.org/tec", type: "ocw", languages: ["es", "en"] },
  { name: "Universidad de los Andes (Coursera)", country: "Colombia", region: "latam", link: "https://www.coursera.org/uniandes", type: "ocw", languages: ["es", "en"] },
  { name: "USP (Universidade de São Paulo) (Coursera)", country: "Brazil", region: "latam", link: "https://www.coursera.org/usp", type: "ocw", languages: ["pt", "en"] },

  // === AUSTRALIA ===
  { name: "University of Melbourne (Coursera)", country: "Australia", region: "oceania", link: "https://www.coursera.org/unimelb", type: "ocw", languages: ["en"] },
  { name: "University of Queensland (edX)", country: "Australia", region: "oceania", link: "https://www.edx.org/school/uqx", type: "ocw", languages: ["en"] },
  { name: "University of Sydney (Coursera)", country: "Australia", region: "oceania", link: "https://www.coursera.org/usyd", type: "ocw", languages: ["en"] },
  { name: "Monash University (FutureLearn)", country: "Australia", region: "oceania", link: "https://www.futurelearn.com/partners/monash-university", type: "ocw", languages: ["en"] },

  // === CANADA ===
  { name: "University of Toronto (Coursera)", country: "Canada", region: "north-america", link: "https://www.coursera.org/utoronto", type: "ocw", languages: ["en"] },
  { name: "McGill University (edX)", country: "Canada", region: "north-america", link: "https://www.edx.org/school/mcgillx", type: "ocw", languages: ["en", "fr"] },
  { name: "University of British Columbia (edX)", country: "Canada", region: "north-america", link: "https://www.edx.org/school/ubcx", type: "ocw", languages: ["en"] },
  { name: "University of Alberta (Coursera)", country: "Canada", region: "north-america", link: "https://www.coursera.org/ualberta", type: "ocw", languages: ["en"] },
];

const regionFilters = [
  { id: "all", fr: "Tout", en: "All", ar: "الكل" },
  { id: "global", fr: "🌐 Plateformes mondiales", en: "🌐 Global Platforms", ar: "🌐 منصات عالمية" },
  { id: "africa", fr: "🌍 Afrique", en: "🌍 Africa", ar: "🌍 أفريقيا" },
  { id: "north-america", fr: "🇺🇸 Amérique du Nord", en: "🇺🇸 North America", ar: "🇺🇸 أمريكا الشمالية" },
  { id: "europe", fr: "🇪🇺 Europe", en: "🇪🇺 Europe", ar: "🇪🇺 أوروبا" },
  { id: "asia", fr: "🌏 Asie", en: "🌏 Asia", ar: "🌏 آسيا" },
  { id: "mena", fr: "🌙 Moyen-Orient", en: "🌙 Middle East", ar: "🌙 الشرق الأوسط" },
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
      <section className="py-8 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("🔍 Rechercher une université ou un pays...", "🔍 Search a university or country...", "🔍 ابحث عن جامعة أو دولة...")}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap gap-2">
            {regionFilters.map((f) => (
              <button key={f.id} onClick={() => setRegionFilter(f.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${regionFilter === f.id ? "bg-indigo-700 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
                {langLabel(f)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f) => (
              <button key={f.id} onClick={() => setTypeFilter(f.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${typeFilter === f.id ? "bg-purple-700 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
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
            {filtered.map((u, i) => (
              <a key={i} href={u.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-indigo-200 transition">
                <h3 className="font-bold text-sm mb-1">{u.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{u.country}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    u.type === "mooc" ? "bg-blue-100 text-blue-700" :
                    u.type === "ocw" ? "bg-green-100 text-green-700" :
                    u.type === "certification" ? "bg-yellow-100 text-yellow-700" :
                    "bg-purple-100 text-purple-700"
                  }`}>
                    {u.type === "mooc" ? "MOOC" : u.type === "ocw" ? t("Université", "University", "جامعة") : u.type === "certification" ? t("Certification", "Certification", "شهادة") : t("Diplôme", "Degree", "شهادة")}
                  </span>
                  {u.languages.map((l) => (
                    <span key={l} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                      {l === "en" ? "EN" : l === "fr" ? "FR" : l === "ar" ? "AR" : l === "es" ? "ES" : l === "zh" ? "中" : l === "pt" ? "PT" : l.toUpperCase()}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
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