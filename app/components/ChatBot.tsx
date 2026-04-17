"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

export default function ChatBot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([{
        role: "assistant",
        text: t(
          "👋 Bonjour ! Je suis l'assistant IA de l'AVA. Je peux vous aider à :\n\n🎓 Trouver des bourses\n💻 Créer un site web\n📄 Rédiger un business plan\n🛡️ Audit de cybersécurité\n💡 Valider une idée de startup\n\nComment puis-je vous aider ?",
          "👋 Hello! I'm AVA's AI assistant. I can help you with:\n\n🎓 Finding scholarships\n💻 Building a website\n📄 Writing a business plan\n🛡️ Cybersecurity audit\n💡 Validating a startup idea\n\nHow can I help you?",
          "👋 مرحباً! أنا مساعد الذكاء الاصطناعي لتحالف الرؤية الأفريقية. يمكنني مساعدتك في:\n\n🎓 البحث عن منح\n💻 إنشاء موقع إلكتروني\n📄 كتابة خطة عمل\n🛡️ تدقيق الأمن السيبراني\n💡 التحقق من فكرة شركة ناشئة\n\nكيف يمكنني مساعدتك؟"
        )
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
          messages: [...messages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.text,
          })), { role: "user", content: userMsg }],
          system: `You are AVA's AI Assistant — African Visionaries Alliance. You are embedded on ava-africa.me as a chatbot widget.

Your capabilities:
- Help find scholarships and educational opportunities
- Help build websites and business plans
- Provide cybersecurity recommendations
- Validate startup ideas for the African market
- Answer questions about AVA's programs and services
- Guide users to the right page on the website

Key pages to recommend:
- /learn → Scholarships, universities, certifications, training
- /join → Become a member, country representative, or volunteer
- /tools → AI tools and B2B services
- /emergencies → Social emergency response
- /news → Latest news and opportunities

Be practical, concise, warm, and adapted to the African context. Respond in the same language the user writes in (French, English, or Arabic). Keep responses short (2-3 paragraphs max) since this is a chat widget, not a full page.`,
        }),
      });
      const data = await response.json();
      const aiText = data.content?.map((item: { type: string; text?: string }) => (item.type === "text" ? item.text : "")).filter(Boolean).join("\n") || t("Désolé, je n'ai pas pu traiter votre demande.", "Sorry, I couldn't process your request.", "عذراً، لم أتمكن من معالجة طلبك.");
      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: t(
        "⚠️ Le service IA n'est pas disponible pour le moment. Contactez-nous à contact@ava-africa.me",
        "⚠️ AI service is currently unavailable. Contact us at contact@ava-africa.me",
        "⚠️ خدمة الذكاء الاصطناعي غير متوفرة حالياً. اتصل بنا على contact@ava-africa.me"
      )}]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 z-50 w-[360px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden ${lang === "ar" ? "left-6" : "right-6"}`} style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-green-700 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="AVA" className="w-8 h-8 rounded-full bg-white p-0.5" />
              <div>
                <h3 className="text-white font-bold text-sm">AVA Assistant</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-green-200 text-xs">{t("En ligne", "Online", "متصل")}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition text-lg font-bold w-8 h-8 flex items-center justify-center">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                  m.role === "user"
                    ? "bg-green-700 text-white rounded-br-md"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={t("Écrivez votre message...", "Type your message...", "اكتب رسالتك...")}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-green-700 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-green-800 transition disabled:opacity-50 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Powered by AVA × Claude AI</p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${
          isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-green-700 hover:bg-green-800 animate-bounce"
        } ${lang === "ar" ? "left-24" : "right-24"}`}
        aria-label="Chat with AVA AI"
        style={{ animationDuration: isOpen ? "0s" : "2s", animationIterationCount: 3 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </button>

      {/* Tooltip on first load */}
      {!isOpen && (
        <div className={`fixed bottom-[84px] z-50 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-2.5 max-w-[200px] animate-fade-in ${lang === "ar" ? "left-20" : "right-20"}`}>
          <p className="text-sm font-medium text-gray-700">{t("💬 Besoin d'aide ?", "💬 Need help?", "💬 تحتاج مساعدة؟")}</p>
          <p className="text-xs text-gray-500">{t("Discutez avec notre IA", "Chat with our AI", "تحدث مع ذكائنا الاصطناعي")}</p>
          <div className={`absolute -bottom-2 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 ${lang === "ar" ? "left-6" : "right-6"}`} />
        </div>
      )}
    </>
  );
}