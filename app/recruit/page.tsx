"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";

const benefits = [
  {
    icon: "🎓",
    fr: "Formation gratuite en cybersécurité, IA ou développement web (valeur : 500 USD)",
    en: "Free training in cybersecurity, AI or web development (value: $500 USD)",
    ar: "تدريب مجاني في الأمن السيبراني أو الذكاء الاصطناعي أو تطوير الويب (بقيمة 500 دولار)",
  },
  {
    icon: "💰",
    fr: "Commission de 15% sur chaque contrat B2B généré dans votre pays",
    en: "15% commission on every B2B contract generated in your country",
    ar: "عمولة 15% على كل عقد تجاري في بلدك",
  },
  {
    icon: "📜",
    fr: "Certification officielle de Représentant(e) AVA",
    en: "Official AVA Representative certification",
    ar: "شهادة رسمية كممثل لتحالف الرؤية الأفريقية",
  },
  {
    icon: "🎯",
    fr: "Accès prioritaire à toutes les bourses et opportunités",
    en: "Priority access to all scholarships and opportunities",
    ar: "أولوية الوصول إلى جميع المنح والفرص",
  },
  {
    icon: "📝",
    fr: "Lettre de recommandation officielle pour vos candidatures",
    en: "Official letter of recommendation for your applications",
    ar: "خطاب توصية رسمي لطلباتك",
  },
  {
    icon: "🌍",
    fr: "Réseau professionnel panafricain de 55 représentants",
    en: "Pan-African professional network of 55 representatives",
    ar: "شبكة مهنية أفريقية من 55 ممثلاً",
  },
  {
    icon: "📋",
    fr: "Certificat d'expérience professionnelle après 12 mois",
    en: "Certificate of professional experience after 12 months",
    ar: "شهادة خبرة مهنية بعد 12 شهراً",
  },
];

const missions = [
  {
    icon: "👥",
    fr: "Accompagner les jeunes dans l'accès aux bourses, formations, emplois et certifications",
    en: "Support young people in accessing scholarships, training, jobs and certifications",
    ar: "مرافقة الشباب في الحصول على المنح والتدريب والتوظيف والشهادات",
  },
  {
    icon: "🚨",
    fr: "Identifier les urgences sociales locales et activer les protocoles de réponse",
    en: "Identify local social emergencies and activate response protocols",
    ar: "تحديد الطوارئ الاجتماعية المحلية وتفعيل بروتوكولات الاستجابة",
  },
  {
    icon: "💼",
    fr: "Repérer les entrepreneurs et entreprises pouvant bénéficier de nos services numériques",
    en: "Spot entrepreneurs and businesses that could benefit from our digital services",
    ar: "اكتشاف رواد الأعمال والشركات التي يمكنها الاستفادة من خدماتنا الرقمية",
  },
  {
    icon: "📢",
    fr: "Organiser des événements locaux : ateliers, formations, hackathons",
    en: "Organize local events: workshops, training sessions, hackathons",
    ar: "تنظيم فعاليات محلية: ورش عمل، دورات تدريبية، هاكاثون",
  },
  {
    icon: "🏛️",
    fr: "Représenter l'AVA auprès des autorités, universités et organisations locales",
    en: "Represent AVA to authorities, universities and local organizations",
    ar: "تمثيل التحالف أمام السلطات والجامعات والمنظمات المحلية",
  },
];

const criteria = [
  { fr: "Être un(e) jeune Africain(e) de 18 à 35 ans résidant dans le pays concerné", en: "Be a young African aged 18-35 residing in the relevant country", ar: "أن تكون شاباً أفريقياً بين 18 و35 عاماً مقيماً في البلد المعني" },
  { fr: "Avoir un accès régulier à Internet", en: "Have regular Internet access", ar: "الوصول المنتظم إلى الإنترنت" },
  { fr: "Maîtriser au moins le français, l'anglais ou l'arabe", en: "Be fluent in at least French, English or Arabic", ar: "إتقان اللغة الفرنسية أو الإنجليزية أو العربية على الأقل" },
  { fr: "Avoir une expérience en engagement communautaire ou entrepreneurial", en: "Have experience in community engagement or entrepreneurship", ar: "خبرة في العمل المجتمعي أو ريادة الأعمال" },
  { fr: "Être motivé(e), autonome et intègre", en: "Be motivated, autonomous and ethical", ar: "أن تكون متحمساً ومستقلاً ونزيهاً" },
];

const expectations = [
  { fr: "Engagement minimum de 12 mois, 10 heures par semaine", en: "Minimum 12-month commitment, 10 hours per week", ar: "التزام لمدة 12 شهراً على الأقل، 10 ساعات أسبوعياً" },
  { fr: "Rapport mensuel d'activité", en: "Monthly activity report", ar: "تقرير نشاط شهري" },
  { fr: "Participation aux réunions régionales trimestrielles (en ligne)", en: "Participation in quarterly regional meetings (online)", ar: "المشاركة في الاجتماعات الإقليمية ربع السنوية (عبر الإنترنت)" },
  { fr: "Respect du code de conduite et de la charte AVA", en: "Compliance with AVA's code of conduct and charter", ar: "الالتزام بمدونة السلوك وميثاق التحالف" },
];

export default function Recruit() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/recruit" />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-yellow-500 text-gray-900 text-sm font-bold px-4 py-1 rounded-full mb-6">
            {t("🌍 55 POSTES OUVERTS", "🌍 55 POSITIONS OPEN", "🌍 55 منصباً مفتوحاً")}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t(
              "Devenez Représentant(e) National(e) AVA",
              "Become an AVA National Representative",
              "كن ممثلاً وطنياً لتحالف الرؤية الأفريقية"
            )}
          </h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            {t(
              "Un(e) représentant(e) par pays africain. Vous êtes les yeux, les oreilles et les mains de l'AVA dans votre pays.",
              "One representative per African country. You are AVA's eyes, ears and hands in your country.",
              "ممثل واحد لكل دولة أفريقية. أنت عيون وآذان وأيدي التحالف في بلدك."
            )}
          </p>
        </div>
      </section>

      {/* Qui sommes-nous - court */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t("Qui sommes-nous ?", "Who are we?", "من نحن؟")}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t(
              "L'African Visionaries Alliance est une alliance panafricaine de jeunes qui identifie les urgences sociales du continent — climatiques, humanitaires, sanitaires, éducatives et numériques — et y répond par des solutions technologiques concrètes. 21 professionnels, 13 nationalités, 54 pays ciblés.",
              "The African Visionaries Alliance is a pan-African youth alliance that identifies the continent's social emergencies — climate, humanitarian, health, education and digital — and responds with concrete technological solutions. 21 professionals, 13 nationalities, 54 target countries.",
              "تحالف الرؤية الأفريقية هو تحالف شبابي أفريقي يحدد الطوارئ الاجتماعية في القارة — المناخية والإنسانية والصحية والتعليمية والرقمية — ويستجيب لها بحلول تكنولوجية ملموسة. 21 محترفاً، 13 جنسية، 54 دولة مستهدفة."
            )}
          </p>
        </div>
      </section>

      {/* Vos missions */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Vos missions", "Your missions", "مهامك")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{m.icon}</div>
                <p className="text-gray-700">{t(m.fr, m.en, m.ar)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que vous recevez */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("Ce que vous recevez", "What you receive", "ما تحصل عليه")}</h2>
          <p className="text-center text-gray-500 mb-12">{t("Le poste est bénévole, mais les avantages sont réels", "The position is voluntary, but the benefits are real", "المنصب تطوعي، لكن المزايا حقيقية")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="text-2xl">{b.icon}</div>
                <p className="text-gray-700 text-sm">{t(b.fr, b.en, b.ar)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que nous attendons */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">{t("Ce que nous attendons", "What we expect", "ما نتوقعه")}</h2>
              <div className="space-y-4">
                {expectations.map((e, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold">→</span>
                    <p className="text-gray-300">{t(e.fr, e.en, e.ar)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-400">{t("Critères de sélection", "Selection criteria", "معايير الاختيار")}</h2>
              <div className="space-y-4">
                {criteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <p className="text-gray-300">{t(c.fr, c.en, c.ar)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Processus de sélection", "Selection process", "عملية الاختيار")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", fr: "Candidature", en: "Apply", ar: "التقديم", dFr: "Remplissez le formulaire ci-dessous", dEn: "Fill out the form below", dAr: "املأ النموذج أدناه" },
              { n: "02", fr: "Évaluation", en: "Review", ar: "التقييم", dFr: "Notre équipe examine votre profil sous 30 jours", dEn: "Our team reviews your profile within 30 days", dAr: "يقيّم فريقنا ملفك خلال 30 يوماً" },
              { n: "03", fr: "Entretien", en: "Interview", ar: "المقابلة", dFr: "Entretien en visioconférence de 20 minutes", dEn: "20-minute video call interview", dAr: "مقابلة فيديو مدتها 20 دقيقة" },
              { n: "04", fr: "Intégration", en: "Onboarding", ar: "التأهيل", dFr: "Formation d'orientation et démarrage des missions", dEn: "Orientation training and mission start", dAr: "تدريب توجيهي وبدء المهام" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-4xl font-bold text-green-700 mb-3">{s.n}</div>
                <h3 className="text-lg font-bold mb-2">{t(s.fr, s.en, s.ar)}</h3>
                <p className="text-sm text-gray-500">{t(s.dFr, s.dEn, s.dAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section id="apply" className="py-16 px-6 bg-green-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("Postulez maintenant", "Apply now", "قدّم الآن")}</h2>
          <p className="text-center text-gray-500 mb-8">{t(
            "Candidatures acceptées en continu. Sélection au fil de l'eau.",
            "Applications accepted on a rolling basis.",
            "يتم قبول الطلبات بشكل مستمر."
          )}</p>
          <form action="https://formspree.io/f/xbdpvpld" method="POST" className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <input type="hidden" name="type" value="country-representative" />
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Prénom", "First name", "الاسم الأول")}</label>
                  <input type="text" name="prenom" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Nom", "Last name", "اللقب")}</label>
                  <input type="text" name="nom" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Pays de résidence", "Country of residence", "بلد الإقامة")}</label>
                  <input type="text" name="pays" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Nationalité", "Nationality", "الجنسية")}</label>
                  <input type="text" name="nationalite" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Âge", "Age", "العمر")}</label>
                  <input type="number" name="age" min="18" max="35" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Langues parlées", "Languages spoken", "اللغات المتحدثة")}</label>
                  <input type="text" name="langues" placeholder={t("Ex: Français, Anglais, Arabe", "Ex: French, English, Arabic", "مثال: العربية، الفرنسية، الإنجليزية")} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Lien LinkedIn ou profil en ligne", "LinkedIn or online profile link", "رابط لينكد إن أو الملف الشخصي")}</label>
                <input type="url" name="linkedin" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Expérience en engagement communautaire", "Community engagement experience", "خبرة في العمل المجتمعي")}</label>
                <textarea name="experience" rows={3} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Pourquoi voulez-vous représenter l'AVA ?", "Why do you want to represent AVA?", "لماذا تريد تمثيل التحالف؟")}</label>
                <textarea name="motivation" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition">
                {t("Envoyer ma candidature", "Submit my application", "إرسال طلبي")}
              </button>
              <p className="text-xs text-gray-400 text-center">{t(
                "En postulant, vous acceptez le code de conduite et la charte de l'AVA.",
                "By applying, you agree to AVA's code of conduct and charter.",
                "بتقديم طلبك، فإنك توافق على مدونة السلوك وميثاق التحالف."
              )}</p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}