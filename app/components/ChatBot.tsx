"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

export default function ChatBot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([{ role: "assistant", text: t(
        "👋 Bonjour ! Je suis l\'assistant IA de l\'AVA.\n\n🎓 Trouver des bourses\n💻 Créer un site web\n📄 Business plan\n🛡️ Cybersécurité\n💡 Valider une startup\n\nComment puis-je vous aider ?",
        "👋 Hello! I\'m AVA\'s AI assistant.\n\n🎓 Find scholarships\n💻 Build a website\n📄 Business plan\n🛡️ Cybersecurity\n💡 Validate a startup\n\nHow can I help?",
        "👋 مرحباً! أنا مساعد الذكاء الاصطناعي.\n\n🎓 منح\n💻 موقع إلكتروني\n📄 خطة عمل\n🛡️ أمن سيبراني\n💡 فكرة شركة\n\nكيف يمكنني مساعدتك؟"
      )}]);
    }
  }, [isOpen]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    setMessages(p => [...p, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })), { role: "user", content: msg }],
          system: "You are AVA\'s AI Assistant. Help young Africans with scholarships, websites, business plans, cybersecurity, data analysis, startup validation. Be concise. Respond in the user\'s language.",
        }),
      });
      const d = await r.json();
      const txt = d.content?.map((i: any) => i.type === "text" ? i.text : "").filter(Boolean).join("\n") || "Error";
      setMessages(p => [...p, { role: "assistant", text: txt }]);
    } catch { setMessages(p => [...p, { role: "assistant", text: "⚠️ Service unavailable. Email: contact@ava-africa.me" }]); }
    setLoading(false);
  };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 z-50 w-14 h-14 rounded-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center shadow-lg transition hover:scale-110 ${lang === "ar" ? "left-24" : "right-24"}`} aria-label="Chat">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
    </button>
  );

  return (
    <div className={`fixed bottom-6 z-50 w-[360px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden ${lang === "ar" ? "left-6" : "right-6"}`} style={{ height: "480px" }}>
      <div className="bg-green-700 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="AVA" className="w-8 h-8 rounded-full bg-white p-0.5" />
          <div><p className="text-white font-bold text-sm">AVA Assistant</p><p className="text-green-200 text-xs">{t("En ligne","Online","متصل")}</p></div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white text-lg font-bold">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-green-700 text-white rounded-br-md" : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"}`}>{m.text}</div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-gray-400 text-sm">● ● ●</div></div>}
        <div ref={endRef} />
      </div>
      <div className="border-t border-gray-200 p-3 bg-white shrink-0">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={t("Message...","Message...","رسالة...")} className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button onClick={send} disabled={loading || !input.trim()} className="bg-green-700 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-green-800 disabled:opacity-50 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-1">AVA × Claude AI</p>
      </div>
    </div>
  );
}