"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

const categories = [
  {
    id: "climate",
    icon: "🌍",
    color: "from-green-700 to-emerald-600",
    cardColor: "bg-green-50 border-green-200",
    tagColor: "bg-green-100 text-green-800",
    titleFr: "Urgences Environnementales et Climatiques",
    titleEn: "Environmental and Climate Emergencies",
    titleAr: "الطوارئ البيئية والمناخية",
    oddFr: "ODD 13 (Action climatique), ODD 11 (Villes durables), ODD 15 (Vie terrestre)",
    oddEn: "SDG 13 (Climate Action), SDG 11 (Sustainable Cities), SDG 15 (Life on Land)",
    oddAr: "هدف التنمية 13 (العمل المناخي)، هدف 11 (مدن مستدامة)، هدف 15 (الحياة البرية)",
    emergencies: [
      { fr: "Catastrophes naturelles", en: "Natural disasters", ar: "الكوارث الطبيعية", descFr: "Inondations, sécheresses, tremblements de terre, cyclones", descEn: "Floods, droughts, earthquakes, cyclones", descAr: "فيضانات، جفاف، زلازل، أعاصير", responseFr: "Déploiement volontaires 96h, coordination secours, cartographie IA des zones touchées", responseEn: "96h volunteer deployment, relief coordination, AI mapping of affected areas", responseAr: "نشر متطوعين خلال 96 ساعة، تنسيق الإغاثة، رسم خرائط بالذكاء الاصطناعي" },
      { fr: "Changement climatique", en: "Climate change", ar: "تغير المناخ", descFr: "Désertification, montée des eaux, perte de biodiversité", descEn: "Desertification, rising waters, biodiversity loss", descAr: "تصحر، ارتفاع المياه، فقدان التنوع البيولوجي", responseFr: "Sensibilisation, solutions IA pour l'agriculture résiliente, alerte précoce", responseEn: "Awareness, AI solutions for resilient agriculture, early warning", responseAr: "توعية، حلول ذكاء اصطناعي للزراعة المرنة، إنذار مبكر" },
      { fr: "Déchets électroniques", en: "E-waste", ar: "النفايات الإلكترونية", descFr: "Pollution technologique, gestion des e-déchets", descEn: "Tech pollution, e-waste management", descAr: "التلوث التكنولوجي، إدارة النفايات الإلكترونية", responseFr: "Formation au recyclage technologique, économie circulaire numérique", responseEn: "Tech recycling training, digital circular economy", responseAr: "تدريب على إعادة التدوير التكنولوجي، الاقتصاد الرقمي الدائري" },
    ],
  },
  {
    id: "humanitarian",
    icon: "🏥",
    color: "from-red-700 to-orange-600",
    cardColor: "bg-red-50 border-red-200",
    tagColor: "bg-red-100 text-red-800",
    titleFr: "Urgences Humanitaires et Sécuritaires",
    titleEn: "Humanitarian and Security Emergencies",
    titleAr: "الطوارئ الإنسانية والأمنية",
    oddFr: "ODD 16 (Paix et justice), ODD 1 (Pas de pauvreté), ODD 2 (Faim zéro)",
    oddEn: "SDG 16 (Peace & Justice), SDG 1 (No Poverty), SDG 2 (Zero Hunger)",
    oddAr: "هدف 16 (السلام والعدالة)، هدف 1 (القضاء على الفقر)، هدف 2 (القضاء على الجوع)",
    emergencies: [
      { fr: "Conflits armés et déplacements", en: "Armed conflicts and displacement", ar: "النزاعات المسلحة والنزوح", descFr: "Réfugiés, déplacés internes, crises post-conflit", descEn: "Refugees, internally displaced, post-conflict crises", descAr: "لاجئون، نازحون داخلياً، أزمات ما بعد النزاع", responseFr: "Coordination avec UNHCR/OIM, support numérique aux camps, formation des déplacés", responseEn: "Coordination with UNHCR/IOM, digital camp support, displaced persons training", responseAr: "التنسيق مع المفوضية/المنظمة الدولية للهجرة، دعم رقمي للمخيمات" },
      { fr: "Crises alimentaires", en: "Food crises", ar: "الأزمات الغذائية", descFr: "Famines, malnutrition, insécurité alimentaire", descEn: "Famine, malnutrition, food insecurity", descAr: "مجاعات، سوء تغذية، انعدام الأمن الغذائي", responseFr: "IA pour logistique alimentaire, cartographie des besoins", responseEn: "AI for food logistics, needs mapping", responseAr: "ذكاء اصطناعي للخدمات اللوجستية الغذائية، رسم خرائط الاحتياجات" },
      { fr: "Violence basée sur le genre", en: "Gender-based violence", ar: "العنف القائم على النوع الاجتماعي", descFr: "Violences sexuelles, mariages forcés, mutilations", descEn: "Sexual violence, forced marriages, mutilation", descAr: "عنف جنسي، زواج قسري", responseFr: "Plateforme de signalement numérique, sensibilisation, support juridique", responseEn: "Digital reporting platform, awareness, legal support", responseAr: "منصة إبلاغ رقمية، توعية، دعم قانوني" },
    ],
  },
  {
    id: "health",
    icon: "💊",
    color: "from-blue-700 to-cyan-600",
    cardColor: "bg-blue-50 border-blue-200",
    tagColor: "bg-blue-100 text-blue-800",
    titleFr: "Urgences Sanitaires",
    titleEn: "Health Emergencies",
    titleAr: "الطوارئ الصحية",
    oddFr: "ODD 3 (Bonne santé), ODD 6 (Eau propre)",
    oddEn: "SDG 3 (Good Health), SDG 6 (Clean Water)",
    oddAr: "هدف 3 (الصحة الجيدة)، هدف 6 (المياه النظيفة)",
    emergencies: [
      { fr: "Épidémies", en: "Epidemics", ar: "الأوبئة", descFr: "COVID, Ebola, choléra, paludisme", descEn: "COVID, Ebola, cholera, malaria", descAr: "كوفيد، إيبولا، كوليرا، ملاريا", responseFr: "Systèmes d'alerte IA, coordination volontaires santé, sensibilisation numérique", responseEn: "AI alert systems, health volunteer coordination, digital awareness", responseAr: "أنظمة إنذار بالذكاء الاصطناعي، تنسيق المتطوعين الصحيين" },
      { fr: "Accès aux soins", en: "Access to healthcare", ar: "الوصول إلى الرعاية الصحية", descFr: "Manque d'infrastructures sanitaires, déserts médicaux", descEn: "Lack of health infrastructure, medical deserts", descAr: "نقص البنية التحتية الصحية", responseFr: "Télémédecine, formation agents de santé communautaires", responseEn: "Telemedicine, community health worker training", responseAr: "الطب عن بعد، تدريب العاملين الصحيين المجتمعيين" },
      { fr: "Eau et assainissement", en: "Water and sanitation", ar: "المياه والصرف الصحي", descFr: "Eau non potable, maladies hydriques", descEn: "Unsafe water, waterborne diseases", descAr: "مياه غير صالحة للشرب، أمراض منقولة بالمياه", responseFr: "Cartographie des points d'eau, solutions IoT pour qualité de l'eau", responseEn: "Water point mapping, IoT solutions for water quality", responseAr: "رسم خرائط نقاط المياه، حلول إنترنت الأشياء لجودة المياه" },
    ],
  },
  {
    id: "education",
    icon: "📚",
    color: "from-purple-700 to-violet-600",
    cardColor: "bg-purple-50 border-purple-200",
    tagColor: "bg-purple-100 text-purple-800",
    titleFr: "Urgences Éducatives et Économiques",
    titleEn: "Education and Economic Emergencies",
    titleAr: "الطوارئ التعليمية والاقتصادية",
    oddFr: "ODD 4 (Éducation), ODD 8 (Travail décent), ODD 10 (Réduction des inégalités)",
    oddEn: "SDG 4 (Education), SDG 8 (Decent Work), SDG 10 (Reduced Inequalities)",
    oddAr: "هدف 4 (التعليم)، هدف 8 (العمل اللائق)، هدف 10 (الحد من عدم المساواة)",
    emergencies: [
      { fr: "Déscolarisation", en: "School dropout", ar: "التسرب المدرسي", descFr: "258 millions de jeunes non scolarisés en Afrique", descEn: "258 million young people out of school in Africa", descAr: "258 مليون شاب خارج المدرسة في أفريقيا", responseFr: "MOOC gratuits, formations en ligne, partenariats universitaires", responseEn: "Free MOOCs, online training, university partnerships", responseAr: "دورات مفتوحة مجانية، تدريب عبر الإنترنت، شراكات جامعية" },
      { fr: "Chômage des jeunes", en: "Youth unemployment", ar: "بطالة الشباب", descFr: "60% des chômeurs africains ont moins de 25 ans", descEn: "60% of African unemployed are under 25", descAr: "60% من العاطلين عن العمل في أفريقيا تحت 25 عاماً", responseFr: "Formations professionnelles, incubation startups, mentorat", responseEn: "Professional training, startup incubation, mentoring", responseAr: "تدريب مهني، حاضنة أعمال، إرشاد" },
      { fr: "Pauvreté extrême", en: "Extreme poverty", ar: "الفقر المدقع", descFr: "Communautés sans moyens de subsistance durables", descEn: "Communities without sustainable livelihoods", descAr: "مجتمعات بدون سبل عيش مستدامة", responseFr: "Entrepreneuriat numérique, microentreprises, compétences génératrices de revenus", responseEn: "Digital entrepreneurship, micro-enterprises, income-generating skills", responseAr: "ريادة الأعمال الرقمية، المشاريع الصغيرة، مهارات توليد الدخل" },
    ],
  },
  {
    id: "digital",
    icon: "💻",
    color: "from-gray-800 to-gray-700",
    cardColor: "bg-gray-50 border-gray-200",
    tagColor: "bg-gray-100 text-gray-800",
    titleFr: "Urgences Numériques et Technologiques",
    titleEn: "Digital and Technological Emergencies",
    titleAr: "الطوارئ الرقمية والتكنولوجية",
    oddFr: "ODD 9 (Innovation), ODD 16 (Institutions solides), ODD 17 (Partenariats)",
    oddEn: "SDG 9 (Innovation), SDG 16 (Strong Institutions), SDG 17 (Partnerships)",
    oddAr: "هدف 9 (الابتكار)، هدف 16 (مؤسسات قوية)، هدف 17 (الشراكات)",
    emergencies: [
      { fr: "Cyberattaques", en: "Cyberattacks", ar: "الهجمات السيبرانية", descFr: "Piratage d'institutions, ransomware, vol de données — 4 milliards USD/an de pertes", descEn: "Institutional hacking, ransomware, data theft — $4 billion/year in losses", descAr: "قرصنة المؤسسات، برامج الفدية، سرقة البيانات — 4 مليارات دولار خسائر سنوية", responseFr: "Audits cyber, réponse aux incidents, formation, Cyber Range", responseEn: "Cyber audits, incident response, training, Cyber Range", responseAr: "تدقيق سيبراني، استجابة للحوادث، تدريب" },
      { fr: "Désinformation", en: "Disinformation", ar: "التضليل الإعلامي", descFr: "Fake news, manipulation électorale, propagande", descEn: "Fake news, electoral manipulation, propaganda", descAr: "أخبار مزيفة، تلاعب انتخابي، دعاية", responseFr: "Éducation aux médias numériques, outils de vérification", responseEn: "Digital media literacy, fact-checking tools", responseAr: "محو الأمية الإعلامية الرقمية، أدوات التحقق" },
      { fr: "Perte de souveraineté des données", en: "Data sovereignty loss", ar: "فقدان سيادة البيانات", descFr: "Données de 1,4 milliard d'Africains stockées hors continent", descEn: "Data of 1.4 billion Africans stored off-continent", descAr: "بيانات 1.4 مليار أفريقي مخزنة خارج القارة", responseFr: "Plaidoyer, formation en protection des données, solutions cloud locales", responseEn: "Advocacy, data protection training, local cloud solutions", responseAr: "مناصرة، تدريب على حماية البيانات، حلول سحابية محلية" },
    ],
  },
];

const levels = [
  { level: "1", nameFr: "Veille", nameEn: "Watch", nameAr: "المراقبة", color: "bg-blue-100 text-blue-800 border-blue-300", descFr: "Surveillance continue. Pas de déploiement. Alerte précoce.", descEn: "Continuous monitoring. No deployment. Early warning.", descAr: "مراقبة مستمرة. لا نشر. إنذار مبكر." },
  { level: "2", nameFr: "Activation locale", nameEn: "Local activation", nameAr: "التنشيط المحلي", color: "bg-yellow-100 text-yellow-800 border-yellow-300", descFr: "Mobilisation des volontaires locaux. Support à distance.", descEn: "Local volunteer mobilization. Remote support.", descAr: "تعبئة المتطوعين المحليين. دعم عن بعد." },
  { level: "3", nameFr: "Réponse complète", nameEn: "Full response", nameAr: "استجابة كاملة", color: "bg-orange-100 text-orange-800 border-orange-300", descFr: "Déploiement d'équipes terrain. Distribution d'aide.", descEn: "Field team deployment. Aid distribution.", descAr: "نشر فرق ميدانية. توزيع المساعدات." },
  { level: "4", nameFr: "Crise complexe", nameEn: "Complex crisis", nameAr: "أزمة معقدة", color: "bg-red-100 text-red-800 border-red-300", descFr: "Réponse multi-zones. Activation du réseau continental.", descEn: "Multi-zone response. Continental network activation.", descAr: "استجابة متعددة المناطق. تفعيل الشبكة القارية." },
];

export default function Emergencies() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/emergencies" />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-red-800 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Urgences Sociales", "Social Emergencies", "الطوارئ الاجتماعية")}</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">{t(
            "Identifier les crises. Répondre avec la technologie. Reconstruire avec la jeunesse.",
            "Identify crises. Respond with technology. Rebuild with youth.",
            "تحديد الأزمات. الاستجابة بالتكنولوجيا. إعادة البناء مع الشباب."
          )}</p>
        </div>
      </section>

      {/* Définition */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t("Qu'est-ce qu'une urgence sociale ?", "What is a social emergency?", "ما هي الطوارئ الاجتماعية؟")}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{t(
            "Une urgence sociale est toute situation critique menaçant la vie, la santé, la dignité ou les moyens de subsistance d'une communauté, nécessitant une intervention coordonnée. L'AVA classe les urgences africaines en 5 catégories liées aux Objectifs de Développement Durable de l'ONU.",
            "A social emergency is any critical situation threatening the life, health, dignity or livelihoods of a community, requiring coordinated intervention. AVA classifies African emergencies into 5 categories linked to the UN Sustainable Development Goals.",
            "الطوارئ الاجتماعية هي أي وضع حرج يهدد حياة المجتمع أو صحته أو كرامته أو سبل عيشه، ويتطلب تدخلاً منسقاً. يصنف التحالف الطوارئ الأفريقية إلى 5 فئات مرتبطة بأهداف التنمية المستدامة للأمم المتحدة."
          )}</p>
        </div>
      </section>

      {/* 5 Catégories */}
      {categories.map((cat) => (
        <section key={cat.id} className="py-16 px-6 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl">{cat.icon}</span>
              <h2 className="text-2xl font-bold">{t(cat.titleFr, cat.titleEn, cat.titleAr)}</h2>
            </div>
            <p className={`inline-block text-xs px-3 py-1 rounded-full font-medium mb-8 ${cat.tagColor}`}>
              {t(cat.oddFr, cat.oddEn, cat.oddAr)}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {cat.emergencies.map((e, i) => (
                <div key={i} className={`rounded-xl p-6 border ${cat.cardColor}`}>
                  <h3 className="text-lg font-bold mb-2">{t(e.fr, e.en, e.ar)}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t(e.descFr, e.descEn, e.descAr)}</p>
                  <div className={`text-xs px-3 py-2 rounded-lg ${cat.tagColor}`}>
                    <span className="font-bold">{t("Réponse AVA : ", "AVA Response: ", "استجابة التحالف: ")}</span>
                    {t(e.responseFr, e.responseEn, e.responseAr)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Niveaux de réponse */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Nos 4 niveaux de réponse", "Our 4 response levels", "مستويات الاستجابة الأربعة")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {levels.map((l) => (
              <div key={l.level} className={`rounded-xl p-6 border ${l.color}`}>
                <div className="text-3xl font-bold mb-2">{l.level}</div>
                <h3 className="text-lg font-bold mb-2">{t(l.nameFr, l.nameEn, l.nameAr)}</h3>
                <p className="text-sm">{t(l.descFr, l.descEn, l.descAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocole 96h */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Protocole de réponse rapide", "Rapid response protocol", "بروتوكول الاستجابة السريعة")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { time: "24h", fr: "Évaluation", en: "Assessment", ar: "التقييم", dFr: "Équipe d'évaluation mobilisée sur le terrain", dEn: "Assessment team mobilized on the ground", dAr: "تعبئة فريق التقييم على الأرض" },
              { time: "48h", fr: "Rapport", en: "Report", ar: "التقرير", dFr: "Rapport de situation et identification des besoins", dEn: "Situation report and needs identification", dAr: "تقرير الوضع وتحديد الاحتياجات" },
              { time: "72h", fr: "Plan", en: "Plan", ar: "الخطة", dFr: "Plan de réponse validé par la Direction", dEn: "Response plan validated by Management", dAr: "خطة استجابة معتمدة من الإدارة" },
              { time: "96h", fr: "Action", en: "Action", ar: "التنفيذ", dFr: "Début des opérations de secours", dEn: "Start of relief operations", dAr: "بدء عمليات الإغاثة" },
            ].map((p) => (
              <div key={p.time} className="text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">{p.time}</div>
                <div className="text-lg font-bold mb-2">{t(p.fr, p.en, p.ar)}</div>
                <p className="text-sm text-gray-500">{t(p.dFr, p.dEn, p.dAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-red-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Devenez volontaire d'urgence", "Become an emergency volunteer", "كن متطوعاً للطوارئ")}</h2>
          <p className="text-red-200 mb-8">{t(
            "Rejoignez notre réseau de jeunes volontaires formés à la réponse aux crises. Votre énergie peut sauver des vies.",
            "Join our network of young volunteers trained in crisis response. Your energy can save lives.",
            "انضم إلى شبكتنا من المتطوعين الشباب المدربين على الاستجابة للأزمات. طاقتك يمكن أن تنقذ أرواحاً."
          )}</p>
          <Link href="/recruit" className="inline-block bg-white text-red-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-50 transition">
            {t("S'engager maintenant", "Engage now", "انضم الآن")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}