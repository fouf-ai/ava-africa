"use client";

import { useState } from "react";
import Link from "next/link";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";

const articles = [
  {
    id: 1,
    date: "2026-04-10",
    category: { fr: "Annonce", en: "Announcement" },
    titleFr: "Lancement officiel de l'African Visionaries Alliance",
    titleEn: "Official Launch of the African Visionaries Alliance",
    summaryFr: "L'AVA est officiellement lancée avec pour mission de bâtir la résilience africaine par la technologie, l'action sociale et l'autonomisation de la jeunesse. Découvrez notre vision et nos quatre piliers stratégiques.",
    summaryEn: "AVA is officially launched with a mission to build African resilience through technology, social action and youth empowerment. Discover our vision and four strategic pillars.",
    image: "🚀",
    color: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    date: "2026-04-08",
    category: { fr: "Cybersécurité", en: "Cybersecurity" },
    titleFr: "Pourquoi l'Afrique a besoin de souveraineté numérique",
    titleEn: "Why Africa Needs Digital Sovereignty",
    summaryFr: "Le continent africain fait face à des cybermenaces croissantes. Les données de 1,4 milliard d'Africains sont souvent stockées et traitées hors du continent. L'AVA propose une approche concrète pour changer la donne.",
    summaryEn: "The African continent faces growing cyber threats. Data from 1.4 billion Africans is often stored and processed outside the continent. AVA proposes a concrete approach to change the game.",
    image: "🛡️",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    date: "2026-04-05",
    category: { fr: "Bourses", en: "Scholarships" },
    titleFr: "Top 10 des bourses disponibles pour les étudiants africains en 2026",
    titleEn: "Top 10 Scholarships Available for African Students in 2026",
    summaryFr: "Chaque année, des milliards de dollars de bourses restent non réclamés. Voici notre sélection des 10 meilleures opportunités pour les jeunes Africains cette année.",
    summaryEn: "Every year, billions of dollars in scholarships go unclaimed. Here is our selection of the 10 best opportunities for young Africans this year.",
    image: "🎓",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 4,
    date: "2026-04-02",
    category: { fr: "Urgences", en: "Emergencies" },
    titleFr: "Comment les jeunes volontaires transforment la réponse aux crises en Afrique",
    titleEn: "How Young Volunteers Are Transforming Crisis Response in Africa",
    summaryFr: "De la RCA au Sahel, les jeunes volontaires prouvent qu'une réponse locale, rapide et coordonnée est possible. Témoignages et leçons apprises de nos premières interventions.",
    summaryEn: "From CAR to the Sahel, young volunteers are proving that a local, fast and coordinated response is possible. Testimonials and lessons learned from our first interventions.",
    image: "🚨",
    color: "bg-red-100 text-red-800",
  },
  {
    id: 5,
    date: "2026-03-28",
    category: { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
    titleFr: "L'IA au service de l'agriculture africaine : cas pratiques",
    titleEn: "AI for African Agriculture: Practical Cases",
    summaryFr: "L'intelligence artificielle peut aider les agriculteurs africains à prédire les récoltes, détecter les maladies des plantes et optimiser l'irrigation. Trois projets concrets qui font la différence.",
    summaryEn: "Artificial intelligence can help African farmers predict harvests, detect plant diseases and optimize irrigation. Three concrete projects making a difference.",
    image: "🤖",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 6,
    date: "2026-03-25",
    category: { fr: "Jeunesse", en: "Youth" },
    titleFr: "Premier hackathon panafricain AVA : appel à candidatures",
    titleEn: "First AVA Pan-African Hackathon: Call for Applications",
    summaryFr: "48 heures pour résoudre un problème réel du continent avec la technologie. Équipes de 3 à 5 personnes, toutes nationalités africaines. Prix : 5 000 USD et accompagnement par l'incubateur AVA.",
    summaryEn: "48 hours to solve a real continental problem with technology. Teams of 3 to 5 people, all African nationalities. Prize: $5,000 USD and support from the AVA incubator.",
    image: "💻",
    color: "bg-orange-100 text-orange-800",
  },
];

const categories = [
  { fr: "Tout", en: "All" },
  { fr: "Annonce", en: "Announcement" },
  { fr: "Cybersécurité", en: "Cybersecurity" },
  { fr: "Bourses", en: "Scholarships" },
  { fr: "Urgences", en: "Emergencies" },
  { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
  { fr: "Jeunesse", en: "Youth" },
];

export default function News() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("Tout");

  const filtered = filter === "Tout" || filter === "All"
    ? articles
    : articles.filter((a) => a.category.fr === filter || a.category.en === filter);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/news" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Actualités", "News")}</h1>
          <p className="text-xl text-gray-300">{t("Articles, analyses et annonces de l'AVA", "Articles, analyses and announcements from AVA")}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => {
            const label = lang === "fr" ? cat.fr : cat.en;
            const isActive = filter === cat.fr || filter === cat.en;
            return (
              <button
                key={cat.fr}
                onClick={() => setFilter(cat.fr)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <article key={article.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-gray-50 flex items-center justify-center text-6xl">
                  {article.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${article.color}`}>
                      {lang === "fr" ? article.category.fr : article.category.en}
                    </span>
                    <span className="text-xs text-gray-400">{article.date}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-3 leading-snug">
                    {lang === "fr" ? article.titleFr : article.titleEn}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {lang === "fr" ? article.summaryFr : article.summaryEn}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-green-700">{t("Lire la suite →", "Read more →")}</p>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📭</p>
              <p>{t("Aucun article dans cette catégorie pour le moment.", "No articles in this category yet.")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Restez informé", "Stay informed")}</h2>
          <p className="text-green-200 mb-8">{t("Recevez nos articles, opportunités de bourses et annonces directement dans votre boîte email.", "Receive our articles, scholarship opportunities and announcements directly in your inbox.")}</p>
          <form action="https://formspree.io/f/xbdpvpld" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input type="hidden" name="type" value="newsletter" />
            <input type="email" name="email" placeholder={t("Votre adresse email", "Your email address")} required className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <button type="submit" className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">{t("S'abonner", "Subscribe")}</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}