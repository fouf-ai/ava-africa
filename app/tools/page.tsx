"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

const aiTools = [
  { icon: "🌐", titleFr: "Créer un site web", titleEn: "Build a Website", titleAr: "إنشاء موقع إلكتروني", descFr: "Décrivez votre entreprise et l'IA génère la structure et le contenu.", descEn: "Describe your business and AI generates the structure and content.", descAr: "صف عملك وسيقوم الذكاء الاصطناعي بإنشاء الهيكل والمحتوى.", prompt: "Help me build a website for my business." },
  { icon: "📄", titleFr: "Rédiger un business plan", titleEn: "Write a Business Plan", titleAr: "كتابة خطة عمل", descFr: "Business plan professionnel adapté au marché africain.", descEn: "Professional business plan tailored to the African market.", descAr: "خطة عمل مهنية مصممة للسوق الأفريقي.", prompt: "Help me write a business plan for my startup in Africa." },
  { icon: "🛡️", titleFr: "Audit de cybersécurité", titleEn: "Cybersecurity Audit", titleAr: "تدقيق الأمن السيبراني", descFr: "Recommandations de sécurité pour votre infrastructure numérique.", descEn: "Security recommendations for your digital infrastructure.", descAr: "توصيات أمنية للبنية التحتية الرقمية.", prompt: "I want a basic cybersecurity check for my business." },
  { icon: "🎓", titleFr: "Trouver des bourses", titleEn: "Find Scholarships", titleAr: "البحث عن منح", descFr: "Recommandations personnalisées de bourses selon votre profil.", descEn: "Personalized scholarship recommendations based on your profile.", descAr: "توصيات منح مخصصة بناءً على ملفك الشخصي.", prompt: "Help me find scholarships based on my profile." },
  { icon: "📊", titleFr: "Analyser mes données", titleEn: "Analyze My Data", titleAr: "تحليل بياناتي", descFr: "Insights et recommandations à partir de vos données.", descEn: "Insights and recommendations from your data.", descAr: "رؤى وتوصيات من بياناتك.", prompt: "Help me analyze my data and give me insights." },
  { icon: "💡", titleFr: "Valider une idée de startup", titleEn: "Validate a Startup Idea", titleAr: "التحقق من فكرة شركة ناشئة", descFr: "Feedback IA sur la viabilité et le marché africain.", descEn: "AI feedback on viability and the African market.", descAr: "ملاحظات الذكاء الاصطناعي حول الجدوى والسوق الأفريقي.", prompt: "I have a startup idea I want to validate." },
];

const packs = [
  { name: "Starter", priceFr: "Gratuit", priceEn: "Free", priceAr: "مجاني", color: "border-green-300 bg-green-50", badge: "🌱", features: [
    { fr: "Page de présentation sur la plateforme AVA", en: "Presentation page on AVA platform", ar: "صفحة تقديم على منصة التحالف" },
    { fr: "Profil sur l'annuaire AVA des entrepreneurs", en: "Profile on AVA entrepreneurs directory", ar: "ملف شخصي في دليل رواد الأعمال" },
    { fr: "Accès aux formations de base", en: "Access to basic training", ar: "الوصول إلى التدريب الأساسي" },
    { fr: "1 session de mentorat / mois", en: "1 mentoring session / month", ar: "جلسة إرشاد واحدة / شهر" },
  ]},
  { name: "Vitrine", priceFr: "300 USD", priceEn: "$300 USD", priceAr: "300 دولار", color: "border-blue-300 bg-blue-50", badge: "🚀", features: [
    { fr: "Site web professionnel one-page", en: "Professional one-page website", ar: "موقع إلكتروني مهني من صفحة واحدة" },
    { fr: "Logo et identité visuelle de base", en: "Basic logo and visual identity", ar: "شعار وهوية بصرية أساسية" },
    { fr: "Configuration Google My Business", en: "Google My Business setup", ar: "إعداد Google My Business" },
    { fr: "Formation de 2h en gestion en ligne", en: "2h online management training", ar: "تدريب لمدة ساعتين في الإدارة عبر الإنترنت" },
  ]},
  { name: "Croissance", priceFr: "800 USD", priceEn: "$800 USD", priceAr: "800 دولار", color: "border-yellow-300 bg-yellow-50", badge: "📈", features: [
    { fr: "Site web multi-pages (jusqu'à 5)", en: "Multi-page website (up to 5)", ar: "موقع متعدد الصفحات (حتى 5)" },
    { fr: "Stratégie réseaux sociaux (3 mois)", en: "Social media strategy (3 months)", ar: "استراتيجية وسائل التواصل الاجتماعي (3 أشهر)" },
    { fr: "Création de contenu (10 posts/mois)", en: "Content creation (10 posts/month)", ar: "إنشاء محتوى (10 منشورات/شهر)" },
    { fr: "Référencement SEO de base", en: "Basic SEO", ar: "تحسين محركات البحث الأساسي" },
    { fr: "Rapport mensuel de performance", en: "Monthly performance report", ar: "تقرير أداء شهري" },
  ]},
  { name: "Souveraineté", priceFr: "2 500 USD+", priceEn: "$2,500+ USD", priceAr: "+2,500 دولار", color: "border-purple-300 bg-purple-50", badge: "👑", features: [
    { fr: "Audit complet de cybersécurité", en: "Full cybersecurity audit", ar: "تدقيق شامل للأمن السيبراني" },
    { fr: "Site web + application mobile", en: "Website + mobile app", ar: "موقع إلكتروني + تطبيق جوال" },
    { fr: "Stratégie digitale complète (6 mois)", en: "Complete digital strategy (6 months)", ar: "استراتيجية رقمية كاملة (6 أشهر)" },
    { fr: "Formation de l'équipe du client", en: "Client team training", ar: "تدريب فريق العميل" },
    { fr: "Support technique continu", en: "Ongoing technical support", ar: "دعم تقني مستمر" },
  ]},
];

function AIChatWrapper({ tool, onClose, t }: { tool: (typeof aiTools)[0]; onClose: () => void; t: (fr: string, en: string, ar?: string) => string }) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: `👋 ${t("Bienvenue ! Vous avez sélectionné", "Welcome! You selected", "مرحباً! لقد اخترت")} "${t(tool.titleFr, tool.titleEn, tool.titleAr)}".\n\n${t("Décrivez ce dont vous avez besoin.", "Describe what you need.", "صف ما تحتاجه.")}` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })), { role: "user", content: userMsg }],
          system: `You are AVA's AI Assistant — African Visionaries Alliance. You help young Africans with: building websites, writing business plans, cybersecurity audits, finding scholarships, data analysis, and startup validation. Be practical, concise, and adapted to the African context. Respond in the same language the user writes in. The current tool is: ${tool.titleEn}.`,
        }),
      });
      const data = await response.json();
      const aiText = data.content?.map((item: { type: string; text?: string }) => (item.type === "text" ? item.text : "")).filter(Boolean).join("\n") || t("Je n'ai pas pu traiter cette demande.", "I couldn't process that request.", "لم أتمكن من معالجة هذا الطلب.");
      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: `⚠️ ${t("Service IA non connecté. Contactez-nous à contact@ava-africa.me", "AI service not connected. Contact us at contact@ava-africa.me", "خدمة الذكاء الاصطناعي غير متصلة. اتصل بنا على contact@ava-africa.me")}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-gray-700">
        <div className="bg-green-800 px-6 py-4 flex items-center justify-between">
          <div><h3 className="font-bold text-white">🤖 AVA AI Assistant</h3><p className="text-sm text-green-200">{t(tool.titleFr, tool.titleEn, tool.titleAr)}</p></div>
          <button onClick={onClose} className="text-sm bg-white/20 text-white px-3 py-1 rounded-lg hover:bg-white/30 transition">✕</button>
        </div>
        <div className="h-80 overflow-y-auto p-6 space-y-4 bg-gray-800">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-green-700 text-white rounded-br-md" : "bg-gray-700 text-gray-100 rounded-bl-md"}`}>{m.text}</div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-400">● ● ●</div></div>}
        </div>
        <div className="border-t border-gray-700 p-4 flex gap-3 bg-gray-800">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder={t("Tapez votre message...", "Type your message...", "اكتب رسالتك...")} className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-yellow-400 transition disabled:opacity-50">{t("Envoyer", "Send", "إرسال")}</button>
        </div>
      </div>
    </div>
  );
}

export default function Tools() {
  const { t, lang } = useLanguage();
  const [showChat, setShowChat] = useState(false);
  const [chatTool, setChatTool] = useState<(typeof aiTools)[0] | null>(null);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/tools" />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-bold text-yellow-400 tracking-widest uppercase mb-4">Powered by AI</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Outils IA & Services", "AI Tools & Services", "أدوات الذكاء الاصطناعي والخدمات")}</h1>
          <p className="text-xl text-gray-300">{t(
            "Des outils gratuits pour les entrepreneurs et des services professionnels pour les entreprises",
            "Free tools for entrepreneurs and professional services for businesses",
            "أدوات مجانية لرواد الأعمال وخدمات مهنية للشركات"
          )}</p>
        </div>
      </section>

      {/* AI Tools */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("🤖 Outils IA gratuits", "🤖 Free AI Tools", "🤖 أدوات ذكاء اصطناعي مجانية")}</h2>
          <p className="text-center text-gray-400 mb-12">{t("Cliquez sur un outil pour démarrer une conversation avec l'IA", "Click a tool to start a conversation with AI", "انقر على أداة لبدء محادثة مع الذكاء الاصطناعي")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <button key={tool.titleEn} onClick={() => { setChatTool(tool); setShowChat(true); }} className="bg-gray-800 rounded-xl p-6 text-left border border-gray-700 hover:border-yellow-500 transition group cursor-pointer">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition">{lang === "ar" ? tool.titleAr : lang === "en" ? tool.titleEn : tool.titleFr}</h3>
                <p className="text-sm text-gray-400">{lang === "ar" ? tool.descAr : lang === "en" ? tool.descEn : tool.descFr}</p>
                <div className="mt-4 text-xs font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition">{t("Cliquer pour commencer →", "Click to start →", "انقر للبدء →")}</div>
              </button>
            ))}
          </div>
          {showChat && chatTool && <AIChatWrapper tool={chatTool} onClose={() => setShowChat(false)} t={t} />}
        </div>
      </section>

      {/* B2B Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("💼 Services pour entreprises", "💼 Services for businesses", "💼 خدمات للشركات")}</h2>
          <p className="text-center text-gray-500 mb-12">{t(
            "Solutions digitales professionnelles pour faire croître votre entreprise",
            "Professional digital solutions to grow your business",
            "حلول رقمية مهنية لتنمية أعمالك"
          )}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack) => (
              <div key={pack.name} className={`rounded-xl p-6 border-2 ${pack.color} flex flex-col`}>
                <div className="text-3xl mb-2">{pack.badge}</div>
                <h3 className="text-xl font-bold mb-1">Pack {pack.name}</h3>
                <div className="text-2xl font-bold text-green-800 mb-4">{lang === "ar" ? pack.priceAr : lang === "en" ? pack.priceEn : pack.priceFr}</div>
                <div className="space-y-2 flex-1">
                  {pack.features.map((f, i) => (
                    <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold shrink-0">✓</span>
                      {lang === "ar" ? f.ar : lang === "en" ? f.en : f.fr}
                    </p>
                  ))}
                </div>
                <a href="mailto:contact@ava-africa.me?subject=Demande Pack ${pack.name}" className="mt-4 block text-center bg-green-700 text-white py-3 rounded-lg font-bold text-sm hover:bg-green-800 transition">
                  {t("Demander un devis", "Request a quote", "طلب عرض أسعار")}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">{t(
            "Les représentants nationaux AVA touchent 15% de commission sur chaque contrat généré.",
            "AVA national representatives earn 15% commission on every contract generated.",
            "يحصل ممثلو التحالف الوطنيون على عمولة 15% على كل عقد."
          )}</p>
        </div>
      </section>

      {/* Cyber Range */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">🔐 Cyber Range AVA</h2>
              <p className="text-gray-300 mb-6">{t(
                "Laboratoire virtuel de cybersécurité où vos équipes s'entraînent sur des scénarios réels : tests d'intrusion, réponse aux incidents, forensics, défense de réseaux.",
                "Virtual cybersecurity lab where your teams train on real scenarios: penetration testing, incident response, forensics, network defense.",
                "مختبر افتراضي للأمن السيبراني حيث تتدرب فرقك على سيناريوهات حقيقية: اختبار الاختراق، الاستجابة للحوادث، الطب الشرعي الرقمي."
              )}</p>
              <div className="space-y-3">
                {[
                  { fr: "Environnement isolé et sécurisé", en: "Isolated and secure environment", ar: "بيئة معزولة وآمنة" },
                  { fr: "Scénarios adaptés au contexte africain", en: "Scenarios adapted to the African context", ar: "سيناريوهات مكيفة للسياق الأفريقي" },
                  { fr: "Évaluation et certification", en: "Assessment and certification", ar: "تقييم وشهادة" },
                  { fr: "Support d'experts AVA", en: "AVA expert support", ar: "دعم خبراء التحالف" },
                ].map((f, i) => (
                  <p key={i} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-green-400">✓</span> {t(f.fr, f.en, f.ar)}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <div className="text-6xl mb-4">🖥️</div>
              <h3 className="text-xl font-bold mb-2">{t("Demander un accès", "Request access", "طلب الوصول")}</h3>
              <p className="text-sm text-gray-400 mb-6">{t("Pour entreprises et institutions", "For businesses and institutions", "للشركات والمؤسسات")}</p>
              <a href="mailto:contact@ava-africa.me?subject=Accès Cyber Range" className="inline-block bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
                {t("Nous contacter", "Contact us", "اتصل بنا")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Vous êtes un jeune entrepreneur ?", "Are you a young entrepreneur?", "هل أنت رائد أعمال شاب؟")}</h2>
          <p className="text-gray-500 mb-8">{t(
            "Le Pack Starter est gratuit. Commencez maintenant et faites grandir votre activité avec l'AVA.",
            "The Starter Pack is free. Start now and grow your business with AVA.",
            "حزمة البداية مجانية. ابدأ الآن وطوّر عملك مع التحالف."
          )}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-800 transition">
              {t("Rejoindre l'AVA", "Join AVA", "انضم إلى التحالف")}
            </Link>
            <Link href="/learn" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition">
              🎓 {t("Explorer les formations", "Explore training", "استكشف التدريبات")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}