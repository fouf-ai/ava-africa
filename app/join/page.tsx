"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";

const paths = [
  { id: "member", icon: "👤", fr: "Devenir membre", en: "Become a member", ar: "أصبح عضواً", descFr: "Accédez aux formations, au mentorat et à l'incubateur de startups.", descEn: "Access training, mentoring and the startup incubator.", descAr: "الوصول إلى التدريب والإرشاد وحاضنة الأعمال." },
  { id: "representative", icon: "🌍", fr: "Devenir représentant pays", en: "Become a country representative", ar: "أصبح ممثلاً وطنياً", descFr: "Rejoignez notre réseau de 55 représentants nationaux. Commission 15%.", descEn: "Join our network of 55 national representatives. 15% commission.", descAr: "انضم إلى شبكتنا من 55 ممثلاً وطنياً. عمولة 15%." },
  { id: "volunteer", icon: "🚨", fr: "Devenir volontaire d'urgence", en: "Become an emergency volunteer", ar: "أصبح متطوعاً للطوارئ", descFr: "Formation gratuite + déploiement terrain pour les crises humanitaires.", descEn: "Free training + field deployment for humanitarian crises.", descAr: "تدريب مجاني + نشر ميداني للأزمات الإنسانية." },
];

const programs = [
  { icon: "🏗️", fr: "Incubateur de Startups", en: "Startup Incubator", ar: "حاضنة الأعمال", dFr: "6 mois pour transformer votre idée en entreprise.", dEn: "6 months to transform your idea into a business.", dAr: "6 أشهر لتحويل فكرتك إلى شركة." },
  { icon: "💻", fr: "Hackathons Panafricains", en: "Pan-African Hackathons", ar: "هاكاثون أفريقي", dFr: "48h pour résoudre un problème réel avec la technologie.", dEn: "48h to solve a real problem with technology.", dAr: "48 ساعة لحل مشكلة حقيقية بالتكنولوجيا." },
  { icon: "🤝", fr: "Programme de Mentorat", en: "Mentoring Program", ar: "برنامج الإرشاد", dFr: "Connexion avec des professionnels de la tech et de l'entrepreneuriat.", dEn: "Connection with tech and entrepreneurship professionals.", dAr: "التواصل مع محترفي التكنولوجيا وريادة الأعمال." },
  { icon: "👩‍💻", fr: "Women in Tech Africa", en: "Women in Tech Africa", ar: "المرأة في التكنولوجيا أفريقيا", dFr: "Programme dédié aux femmes et filles dans la technologie.", dEn: "Program dedicated to women and girls in technology.", dAr: "برنامج مخصص للنساء والفتيات في التكنولوجيا." },
  { icon: "📱", fr: "Digital Leaders Fellowship", en: "Digital Leaders Fellowship", ar: "زمالة القادة الرقميين", dFr: "12 mois de leadership pour transformer votre communauté.", dEn: "12 months of leadership to transform your community.", dAr: "12 شهراً من القيادة لتحويل مجتمعك." },
];

const repBenefits = [
  { icon: "🎓", fr: "Formation gratuite (valeur 500 USD)", en: "Free training (value $500)", ar: "تدريب مجاني (بقيمة 500 دولار)" },
  { icon: "💰", fr: "Commission 15% sur chaque contrat B2B", en: "15% commission on every B2B contract", ar: "عمولة 15% على كل عقد تجاري" },
  { icon: "📜", fr: "Certification officielle AVA", en: "Official AVA certification", ar: "شهادة رسمية من التحالف" },
  { icon: "📝", fr: "Lettre de recommandation", en: "Letter of recommendation", ar: "خطاب توصية" },
  { icon: "🌍", fr: "Réseau de 55 représentants", en: "Network of 55 representatives", ar: "شبكة من 55 ممثلاً" },
  { icon: "📋", fr: "Certificat après 12 mois", en: "Certificate after 12 months", ar: "شهادة بعد 12 شهراً" },
];

const cotisations = [
  { fr: "Étudiant", en: "Student", ar: "طالب", price: "6 000 FCFA", usd: "~10 USD", color: "border-green-200 bg-green-50" },
  { fr: "Jeune Professionnel", en: "Young Professional", ar: "مهني شاب", price: "15 000 FCFA", usd: "~25 USD", color: "border-yellow-200 bg-yellow-50" },
  { fr: "Professionnel Confirmé", en: "Confirmed Professional", ar: "مهني مؤكد", price: "30 000 FCFA", usd: "~50 USD", color: "border-blue-200 bg-blue-50" },
];

export default function Join() {
  const { t, lang } = useLanguage();
  const [activeSection, setActiveSection] = useState("member");

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/join" />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Rejoindre le mouvement", "Join the movement", "انضم إلى الحركة")}</h1>
          <p className="text-xl text-green-200">{t(
            "Trois façons de contribuer à la résilience africaine",
            "Three ways to contribute to African resilience",
            "ثلاث طرق للمساهمة في المرونة الأفريقية"
          )}</p>
        </div>
      </section>

      {/* 3 Parcours */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {paths.map((p) => (
            <button key={p.id} onClick={() => { setActiveSection(p.id); document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth" }); }} className={`text-left rounded-xl p-6 border-2 transition ${activeSection === p.id ? "border-green-700 bg-green-50 shadow-md" : "border-gray-200 hover:border-green-300"}`}>
              <div className="text-4xl mb-3">{p.icon}</div>
              <h3 className="text-lg font-bold mb-2">{lang === "ar" ? p.ar : lang === "en" ? p.en : p.fr}</h3>
              <p className="text-sm text-gray-600">{lang === "ar" ? p.descAr : lang === "en" ? p.descEn : p.descFr}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ SECTION MEMBRE ═══ */}
      <section id="member" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">👤 {t("Devenir membre AVA", "Become an AVA member", "أصبح عضواً في التحالف")}</h2>

          <h3 className="text-2xl font-bold mb-6">{t("Nos programmes", "Our programs", "برامجنا")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {programs.map((p) => (
              <div key={p.fr} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h4 className="text-lg font-bold mb-2">{lang === "ar" ? p.ar : lang === "en" ? p.en : p.fr}</h4>
                <p className="text-sm text-gray-600">{lang === "ar" ? p.dAr : lang === "en" ? p.dEn : p.dFr}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-6">{t("Cotisations annuelles", "Annual fees", "الرسوم السنوية")}</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cotisations.map((c) => (
              <div key={c.fr} className={`rounded-xl p-8 border-2 ${c.color} text-center`}>
                <h4 className="text-lg font-bold mb-2">{lang === "ar" ? c.ar : lang === "en" ? c.en : c.fr}</h4>
                <div className="text-3xl font-bold text-green-800 mb-1">{c.price}</div>
                <p className="text-sm text-gray-500">{c.usd} / {t("an", "year", "سنة")}</p>
              </div>
            ))}
          </div>

          {/* Formulaire adhésion */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">{t("Formulaire d'adhésion", "Membership form", "نموذج العضوية")}</h3>
            <form action="https://formspree.io/f/xbdpvpld" method="POST" className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <input type="hidden" name="type" value="member-application" />
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Prénom", "First name", "الاسم الأول")}</label><input type="text" name="prenom" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Nom", "Last name", "اللقب")}</label><input type="text" name="nom" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email</label><input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Pays", "Country", "البلد")}</label><input type="text" name="pays" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Âge", "Age", "العمر")}</label><input type="number" name="age" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Motivation", "Motivation", "الدافع")}</label><textarea name="motivation" rows={3} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition">{t("Envoyer ma candidature", "Submit application", "إرسال طلبي")}</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ SECTION REPRÉSENTANT ═══ */}
      <section id="representative" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">🌍 {t("Devenir représentant national", "Become a national representative", "أصبح ممثلاً وطنياً")}</h2>
          <p className="text-center text-gray-500 mb-12">{t("55 postes ouverts — un par pays africain", "55 positions open — one per African country", "55 منصباً مفتوحاً — واحد لكل دولة أفريقية")}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {repBenefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-2xl">{b.icon}</span>
                <p className="text-sm text-gray-700">{lang === "ar" ? b.ar : lang === "en" ? b.en : b.fr}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">{t("Postuler comme représentant", "Apply as representative", "التقديم كممثل")}</h3>
            <form action="https://formspree.io/f/xbdpvpld" method="POST" className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <input type="hidden" name="type" value="country-representative" />
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Prénom", "First name", "الاسم الأول")}</label><input type="text" name="prenom" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Nom", "Last name", "اللقب")}</label><input type="text" name="nom" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email</label><input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Pays de résidence", "Country", "بلد الإقامة")}</label><input type="text" name="pays" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Âge", "Age", "العمر")}</label><input type="number" name="age" min="18" max="35" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn</label><input type="url" name="linkedin" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Expérience communautaire", "Community experience", "الخبرة المجتمعية")}</label><textarea name="experience" rows={3} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t("Motivation", "Motivation", "الدافع")}</label><textarea name="motivation" rows={3} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition">{t("Postuler maintenant", "Apply now", "تقدم الآن")}</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ SECTION VOLONTAIRE ═══ */}
      <section id="volunteer" className="py-16 px-6 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🚨 {t("Devenir volontaire d'urgence", "Become an emergency volunteer", "أصبح متطوعاً للطوارئ")}</h2>
          <p className="text-gray-600 text-lg mb-8">{t(
            "Recevez une formation gratuite en réponse aux crises et soyez déployé sur le terrain quand votre communauté en a besoin.",
            "Receive free crisis response training and be deployed in the field when your community needs you.",
            "احصل على تدريب مجاني في الاستجابة للأزمات وانتشر ميدانياً عندما يحتاجك مجتمعك."
          )}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: "🎓", fr: "Formation gratuite", en: "Free training", ar: "تدريب مجاني" },
              { icon: "🏥", fr: "Premiers secours", en: "First aid", ar: "إسعافات أولية" },
              { icon: "📱", fr: "Coordination numérique", en: "Digital coordination", ar: "تنسيق رقمي" },
            ].map((v) => (
              <div key={v.fr} className="bg-white rounded-xl p-6 border border-red-100">
                <div className="text-3xl mb-3">{v.icon}</div>
                <p className="font-bold">{lang === "ar" ? v.ar : lang === "en" ? v.en : v.fr}</p>
              </div>
            ))}
          </div>
          <a href="/emergencies" className="inline-block bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-800 transition">
            {t("En savoir plus sur nos urgences", "Learn more about our emergencies", "اعرف المزيد عن طوارئنا")}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}git commit -m "restructuration UX learn join header"