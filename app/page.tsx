"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const pillars = [
  { icon: "🚨", title: "Urgences Sociales", desc: "Réponse rapide aux crises humanitaires, sanitaires et environnementales à travers le continent.", link: "/emergencies" },
  { icon: "🛡️", title: "Souveraineté Numérique & IA", desc: "Formation en cybersécurité, IA appliquée et protection des infrastructures numériques africaines.", link: "/digital" },
  { icon: "🎓", title: "Éducation & Opportunités", desc: "Accès aux bourses internationales, MOOC, certifications et partenariats universitaires.", link: "/scholarships" },
  { icon: "🚀", title: "Innovation Jeunesse", desc: "Incubation de startups, hackathons et accompagnement des jeunes entrepreneurs africains.", link: "/youth" },
];

const stats = [
  { value: "54", label: "Pays ciblés" },
  { value: "5", label: "Bureaux régionaux" },
  { value: "4", label: "Piliers stratégiques" },
  { value: "∞", label: "Ambition" },
];

const aiTools = [
  { icon: "🌐", title: "Build a Business Website", desc: "Describe your business and let AI generate a complete website structure, content and design for you.", prompt: "Help me build a website for my business. I will describe what I do and you create the structure." },
  { icon: "📄", title: "Write a Business Plan", desc: "Get AI to draft a professional business plan tailored to the African market and investors.", prompt: "Help me write a business plan for my startup in Africa. Ask me about my business idea." },
  { icon: "🛡️", title: "Cybersecurity Audit Check", desc: "Answer questions about your digital setup and get AI-powered security recommendations.", prompt: "I want a basic cybersecurity check for my business. Ask me questions about my digital infrastructure." },
  { icon: "🎓", title: "Find Scholarships", desc: "Tell AI your profile and get personalized scholarship recommendations from around the world.", prompt: "Help me find scholarships. I will share my profile and you recommend the best opportunities." },
  { icon: "📊", title: "Analyze My Data", desc: "Describe your data and get AI insights, visualizations ideas, and actionable recommendations.", prompt: "Help me analyze my data and give me insights. I will describe what data I have." },
  { icon: "💡", title: "Startup Idea Validator", desc: "Share your startup idea and get AI feedback on viability, market fit, and next steps for Africa.", prompt: "I have a startup idea I want to validate. Let me describe it and give me honest feedback." },
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
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [...messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })), { role: "user", content: userMsg }],
          system: `You are AVA's AI Assistant — African Visionaries Alliance. You help young Africans with: building websites, writing business plans, cybersecurity audits, finding scholarships, data analysis, and startup validation. Be practical, concise, and adapted to the African context. Respond in the same language the user writes in. The current tool is: ${tool.title}.`,
        }),
      });
      const data = await response.json();
      const aiText = data.content?.map((item: { type: string; text?: string }) => (item.type === "text" ? item.text : "")).filter(Boolean).join("\n") || "I couldn't process that request.";
      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "⚠️ AI service is not connected yet. To activate this feature, the AVA team needs to configure the API key. Contact us at contact@ava-africa.org!\n\nIn the meantime, explore our programs at /youth or our training at /digital." }]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-gray-700">
        <div className="bg-green-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white">🤖 AVA AI Assistant</h3>
            <p className="text-sm text-green-200">{tool.title}</p>
          </div>
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

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-green-800 via-green-700 to-yellow-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            African Visionaries<br /><span className="text-yellow-300">Alliance</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 text-green-100">Alliance des Visionnaires Africains pour la Résilience Numérique et les Urgences Sociales</p>
          <p className="text-lg mb-10 text-green-200 max-w-2xl mx-auto">Voir plus loin. Agir plus vite. Bâtir l&apos;Afrique.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/youth" className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition">Rejoindre l&apos;AVA</Link>
            <Link href="#ai-tools" className="border-2 border-white/40 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition">🤖 Try our AI Tools</Link>
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section id="ai-tools" className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-yellow-400 tracking-widest uppercase">Powered by AI</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">AI Tools for African Entrepreneurs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Free AI-powered tools to help you build, grow and protect your business. Select a tool to get started.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <button key={tool.title} onClick={() => { setChatTool(tool); setShowChat(true); }} className="bg-gray-800 rounded-xl p-6 text-left border border-gray-700 hover:border-yellow-500 transition group cursor-pointer">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition">{tool.title}</h3>
                <p className="text-sm text-gray-400">{tool.desc}</p>
                <div className="mt-4 text-xs font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition">Click to start →</div>
              </button>
            ))}
          </div>
          {showChat && chatTool && <AIChatWrapper tool={chatTool} onClose={() => setShowChat(false)} />}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Qui sommes-nous ?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">L&apos;African Visionaries Alliance (AVA) est une organisation panafricaine portée par la jeunesse, née de la fusion de l&apos;Académie Centrafricaine du Numérique et de la Cybersécurité (ACNC) et d&apos;AVURESA. Nous croyons que la résilience de l&apos;Afrique passe par sa jeunesse, sa souveraineté numérique et sa capacité à répondre aux urgences sociales.</p>
          <Link href="/about" className="text-green-700 font-semibold hover:text-green-800">En savoir plus →</Link>
        </div>
      </section>

      {/* 4 Piliers */}
      <section id="pillars" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nos 4 Piliers</h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">Une approche intégrée pour une Afrique résiliente, numérique et souveraine.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p) => (
              <Link href={p.link} key={p.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition block">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-green-800">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400">{s.value}</div>
              <div className="text-sm mt-2 text-green-200">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Devenez partenaire</h2>
          <p className="text-gray-500 mb-8">Gouvernements, bailleurs, entreprises, universités — ensemble, bâtissons la résilience africaine.</p>
          <Link href="/youth" className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition">Nous soutenir</Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-gray-500 mb-8">Une question, une suggestion, un partenariat ? Écrivez-nous.</p>
          <form action="https://formspree.io/f/xbdpvpld" method="POST" className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-left">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom complet</label>
                <input type="text" name="name" name="nom" placeholder="Votre nom" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" name="email" name="email" placeholder="votre@email.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea name="message" placeholder="Votre message..." rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <button className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition">Envoyer</button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}