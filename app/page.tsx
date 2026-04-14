"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLanguage } from "./components/LanguageContext";

const aiTools = [
  { icon: "🌐", title: "Build a Business Website", desc: "Describe your business and let AI generate a complete website structure and content.", prompt: "Help me build a website for my business." },
  { icon: "📄", title: "Write a Business Plan", desc: "Get AI to draft a professional business plan tailored to the African market.", prompt: "Help me write a business plan for my startup in Africa." },
  { icon: "🛡️", title: "Cybersecurity Audit Check", desc: "Get AI-powered security recommendations for your digital setup.", prompt: "I want a basic cybersecurity check for my business." },
  { icon: "🎓", title: "Find Scholarships", desc: "Get personalized scholarship recommendations from around the world.", prompt: "Help me find scholarships based on my profile." },
  { icon: "📊", title: "Analyze My Data", desc: "Get AI insights and actionable recommendations from your data.", prompt: "Help me analyze my data and give me insights." },
  { icon: "💡", title: "Startup Idea Validator", desc: "Get AI feedback on viability, market fit, and next steps for Africa.", prompt: "I have a startup idea I want to validate." },
];

function AIChatWrapper({ tool, onClose }: { tool: (typeof aiTools)[0]; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: `👋 Welcome! I'm AVA's AI Assistant. You selected "${tool.title}".\n\n${tool.prompt}\n\nPlease describe what you need and I'll help you get started.` },
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
          system: `You are AVA's AI Assistant — African Visionaries Alliance. You help young Africans with: building websites, writing business plans, cybersecurity audits, finding scholarships, data analysis, and startup validation. Be practical, concise, and adapted to the African context. Respond in the same language the user writes in. The current tool is: ${tool.title}.`,
        }),
      });
      const data = await response.json();
      const aiText = data.content?.map((item: { type: string; text?: string }) => (item.type === "text" ? item.text : "")).filter(Boolean).join("\n") || "I couldn't process that request.";
      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "⚠️ AI service is not connected yet. Contact us at contact@ava-africa.org to learn more!" }]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-gray-700">
        <div className="bg-green-800 px-6 py-4 flex items-center justify-between">
          <div><h3 className="font-bold text-white">🤖 AVA AI Assistant</h3><p className="text-sm text-green-200">{tool.title}</p></div>
          <button onClick={onClose} className="text-sm bg-white/20 text-white px-3 py-1 rounded-lg hover:bg-white/30 transition">✕ Close</button>
        </div>
        <div className="h-80 overflow-y-auto p-6 space-y-4 bg-gray-800">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-green-700 text-white rounded-br-md" : "bg-gray-700 text-gray-100 rounded-bl-md"}`}>{m.text}</div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-400">● ● ● Thinking...</div></div>}
        </div>
        <div className="border-t border-gray-700 p-4 flex gap-3 bg-gray-800">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..." className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-yellow-400 transition disabled:opacity-50">Send</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [chatTool, setChatTool] = useState<(typeof aiTools)[0] | null>(null);
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/" />

      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-green-800 via-green-700 to-yellow-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">African Visionaries<br /><span className="text-yellow-300">Alliance</span></h1>
          <p className="text-xl md:text-2xl font-light mb-4 text-green-100">{t("Alliance des Visionnaires Africains pour la Résilience Numérique et les Urgences Sociales", "African Visionaries Alliance for Digital Resilience and Social Emergencies")}</p>
          <p className="text-lg mb-10 text-green-200 max-w-2xl mx-auto">{t("Voir plus loin. Agir plus vite. Bâtir l'Afrique.", "See further. Act faster. Build Africa.")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/youth" className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition">{t("Rejoindre l'AVA", "Join AVA")}</Link>
            <Link href="#ai-tools" className="border-2 border-white/40 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition">🤖 {t("Nos outils IA", "Our AI Tools")}</Link>
          </div>
        </div>
      </section>

      <section id="ai-tools" className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{t("Outils IA pour Entrepreneurs Africains", "AI Tools for African Entrepreneurs")}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t("Outils IA gratuits pour construire, développer et protéger votre activité.", "Free AI-powered tools to help you build, grow and protect your business.")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <button key={tool.title} onClick={() => { setChatTool(tool); setShowChat(true); }} className="bg-gray-800 rounded-xl p-6 text-left border border-gray-700 hover:border-yellow-500 transition group cursor-pointer">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition">{tool.title}</h3>
                <p className="text-sm text-gray-400">{tool.desc}</p>
                <div className="mt-4 text-xs font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition">{t("Cliquer pour commencer →", "Click to start →")}</div>
              </button>
            ))}
          </div>
          {showChat && chatTool && <AIChatWrapper tool={chatTool} onClose={() => setShowChat(false)} />}
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t("Qui sommes-nous ?", "Who are we?")}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{t("L'African Visionaries Alliance (AVA) est une organisation panafricaine portée par la jeunesse, fondée par des jeunes visionnaires africains. Nous croyons que la résilience de l'Afrique passe par sa jeunesse, sa souveraineté numérique et sa capacité à répondre aux urgences sociales.", "The African Visionaries Alliance (AVA) is a pan-African youth-led organization founded by young African visionaries. We believe that Africa's resilience depends on its youth, its digital sovereignty, and its ability to respond to social emergencies.")}</p>
          <Link href="/about" className="text-green-700 font-semibold hover:text-green-800">{t("En savoir plus →", "Learn more →")}</Link>
        </div>
      </section>

      <section id="pillars" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t("Nos 4 Piliers", "Our 4 Pillars")}</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">{t("Une approche intégrée pour une Afrique résiliente, numérique et souveraine.", "An integrated approach for a resilient, digital and sovereign Africa.")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🚨", fr: "Urgences Sociales", en: "Social Emergencies", descFr: "Réponse rapide aux crises humanitaires, sanitaires et environnementales.", descEn: "Rapid response to humanitarian, health and environmental crises.", link: "/emergencies" },
              { icon: "🛡️", fr: "Souveraineté Numérique & IA", en: "Digital Sovereignty & AI", descFr: "Formation en cybersécurité, IA appliquée et protection des infrastructures.", descEn: "Cybersecurity training, applied AI and infrastructure protection.", link: "/digital" },
              { icon: "🎓", fr: "Éducation & Opportunités", en: "Education & Opportunities", descFr: "Accès aux bourses internationales, MOOC et certifications.", descEn: "Access to international scholarships, MOOCs and certifications.", link: "/scholarships" },
              { icon: "🚀", fr: "Innovation Jeunesse", en: "Youth Innovation", descFr: "Incubation de startups, hackathons et accompagnement des jeunes entrepreneurs.", descEn: "Startup incubation, hackathons and support for young entrepreneurs.", link: "/youth" },
            ].map((p) => (
              <Link href={p.link} key={p.fr} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition block">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-green-800">{t(p.fr, p.en)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(p.descFr, p.descEn)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "54", fr: "Pays ciblés", en: "Target countries" },
            { value: "5", fr: "Bureaux régionaux", en: "Regional offices" },
            { value: "4", fr: "Piliers stratégiques", en: "Strategic pillars" },
            { value: "∞", fr: "Ambition", en: "Ambition" },
          ].map((s) => (
            <div key={s.fr}><div className="text-4xl md:text-5xl font-bold text-yellow-400">{s.value}</div><div className="text-sm mt-2 text-green-200">{t(s.fr, s.en)}</div></div>
          ))}
        </div>
      </section>

      <section id="partners" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Devenez partenaire", "Become a partner")}</h2>
          <p className="text-gray-500 mb-8">{t("Gouvernements, bailleurs, entreprises, universités — ensemble, bâtissons la résilience africaine.", "Governments, donors, businesses, universities — together, let's build African resilience.")}</p>
          <Link href="/youth" className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition">{t("Nous soutenir", "Support us")}</Link>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Contactez-nous", "Contact us")}</h2>
          <p className="text-gray-500 mb-8">{t("Une question, une suggestion, un partenariat ? Écrivez-nous.", "A question, suggestion, or partnership? Write to us.")}</p>
          <form action="https://formspree.io/f/xbdpvpld" method="POST" className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-left">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("Nom complet", "Full name")}</label>
                <input type="text" name="name" placeholder={t("Votre nom", "Your name")} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" name="email" placeholder={t("votre@email.com", "your@email.com")} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea name="message" placeholder={t("Votre message...", "Your message...")} rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <button type="submit" className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition">{t("Envoyer", "Send")}</button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}