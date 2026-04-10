import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const programs = [
  { icon: "🏗️", title: "Incubateur de Startups", desc: "Programme de 6 mois pour transformer votre idée technologique en entreprise viable.", benefits: ["Mentorat personnalisé", "Formation en business model", "Accès à un réseau d'investisseurs", "Espace de travail partagé"] },
  { icon: "💻", title: "Hackathons Panafricains", desc: "Compétitions de 48h pour résoudre des problèmes réels du continent avec la technologie.", benefits: ["Thématiques africaines réelles", "Équipes multi-pays", "Prix et financement", "Visibilité médiatique"] },
  { icon: "🤝", title: "Programme de Mentorat", desc: "Connexion avec des professionnels expérimentés de la tech et de l'entrepreneuriat.", benefits: ["Mentors de la diaspora", "Sessions mensuelles", "Réseau professionnel", "Guidance carrière"] },
  { icon: "🌍", title: "Volontariat d'Urgence", desc: "Rejoignez notre réseau de jeunes volontaires formés à la réponse aux crises.", benefits: ["Formation en réponse aux urgences", "Déploiement sur le terrain", "Certificat de service", "Expérience internationale"] },
  { icon: "👩‍💻", title: "Women in Tech Africa", desc: "Programme dédié aux femmes et filles dans la technologie.", benefits: ["Bourses de formation", "Mentorat féminin", "Réseau Women in Tech", "Événements dédiés"] },
  { icon: "📱", title: "Digital Leaders Fellowship", desc: "Programme de leadership de 12 mois pour les jeunes qui veulent diriger la transformation numérique.", benefits: ["Formation en leadership", "Projet communautaire financé", "Réseau continental", "Certification AVA"] },
];

const testimonials = [
  { name: "Aïcha M.", country: "Sénégal", role: "Développeuse Web", text: "Grâce à l'AVA, j'ai obtenu ma certification CompTIA Security+ et décroché mon premier emploi en cybersécurité." },
  { name: "Emmanuel K.", country: "RDC", role: "Fondateur de startup", text: "L'incubateur m'a permis de structurer mon projet et de trouver mes premiers clients. Aujourd'hui, ma startup emploie 5 personnes." },
  { name: "Fatima Z.", country: "Maroc", role: "Data Scientist", text: "Les formations en IA de l'AVA sont adaptées au contexte africain. J'utilise ces compétences pour améliorer l'agriculture dans ma région." },
];

export default function Youth() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/youth" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-yellow-600 via-yellow-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Innovation Jeunesse</h1>
          <p className="text-xl text-yellow-100">La jeunesse africaine ne demande pas la permission. Elle construit l&apos;avenir.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Pourquoi rejoindre l&apos;AVA ?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">L&apos;AVA n&apos;est pas juste une organisation — c&apos;est un mouvement. Un mouvement de jeunes Africains qui refusent d&apos;attendre que d&apos;autres résolvent les problèmes du continent.</p>
          <p className="text-gray-600 text-lg leading-relaxed">Que vous soyez développeur, étudiant, entrepreneur, humanitaire ou simplement un jeune Africain qui veut contribuer — il y a une place pour vous ici.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-yellow-500 text-gray-900">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: "6", label: "Programmes actifs" }, { value: "5", label: "Régions couvertes" }, { value: "18-35", label: "Âge cible" }, { value: "50%", label: "Objectif femmes" }].map((s) => (
            <div key={s.label}><div className="text-4xl md:text-5xl font-bold">{s.value}</div><div className="text-sm mt-2 font-medium">{s.label}</div></div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nos Programmes</h2>
          <p className="text-center text-gray-500 mb-12">Des opportunités concrètes pour chaque jeune Africain qui veut agir</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
                <div className="space-y-1">{p.benefits.map((b) => (<p key={b} className="text-xs text-green-700 font-medium">✓ {b}</p>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ils ont rejoint l&apos;AVA</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <p className="text-gray-600 mb-6 italic">&quot;{t.text}&quot;</p>
                <div><p className="font-bold">{t.name}</p><p className="text-sm text-gray-500">{t.role} — {t.country}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Comment rejoindre l&apos;AVA</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[{ number: "01", title: "Inscrivez-vous", desc: "Remplissez le formulaire ci-dessous." }, { number: "02", title: "Validation", desc: "Notre équipe examine votre candidature sous 45 jours." }, { number: "03", title: "Intégration", desc: "Participez à l'orientation." }, { number: "04", title: "Engagez-vous", desc: "Choisissez vos programmes et contribuez." }].map((s) => (
              <div key={s.number} className="text-center"><div className="text-4xl font-bold text-yellow-400 mb-3">{s.number}</div><h3 className="text-lg font-bold mb-2">{s.title}</h3><p className="text-sm text-green-200">{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Cotisations annuelles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ category: "Étudiant / Apprenant", price: "6 000 FCFA", usd: "~10 USD", desc: "Pour les étudiants et jeunes de moins de 25 ans", color: "border-green-200 bg-green-50" }, { category: "Jeune Professionnel", price: "15 000 FCFA", usd: "~25 USD", desc: "Pour les jeunes actifs en début de carrière", color: "border-yellow-200 bg-yellow-50" }, { category: "Professionnel Confirmé", price: "30 000 FCFA", usd: "~50 USD", desc: "Pour les professionnels avec revenu stable", color: "border-blue-200 bg-blue-50" }].map((c) => (
              <div key={c.category} className={`rounded-xl p-8 border-2 ${c.color} text-center`}><h3 className="text-lg font-bold mb-2">{c.category}</h3><div className="text-3xl font-bold text-green-800 mb-1">{c.price}</div><p className="text-sm text-gray-500 mb-4">{c.usd} / an</p><p className="text-sm text-gray-600">{c.desc}</p></div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">Plans de paiement échelonnés disponibles. Exemptions possibles sur demande motivée.</p>
        </div>
      </section>

      <section id="join" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Rejoignez l&apos;AVA maintenant</h2>
          <p className="text-center text-gray-500 mb-8">Remplissez ce formulaire et notre équipe vous contactera sous 45 jours.</p>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label><input type="text" placeholder="Votre prénom" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label><input type="text" placeholder="Votre nom" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email</label><input type="email" placeholder="votre@email.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Pays</label><input type="text" placeholder="Votre pays" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Âge</label><input type="number" placeholder="Votre âge" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Catégorie souhaitée</label><select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"><option value="">Choisissez une catégorie</option><option value="student">Étudiant / Apprenant (6 000 FCFA/an)</option><option value="young_pro">Jeune Professionnel (15 000 FCFA/an)</option><option value="pro">Professionnel Confirmé (30 000 FCFA/an)</option><option value="bienfaiteur">Bienfaiteur (60 000 FCFA/an)</option><option value="institutional">Membre Institutionnel (organisation)</option></select></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Programme qui vous intéresse</label><select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"><option value="">Choisissez un programme</option><option value="incubator">Incubateur de Startups</option><option value="hackathon">Hackathons Panafricains</option><option value="mentorship">Programme de Mentorat</option><option value="volunteer">Volontariat d&apos;Urgence</option><option value="women">Women in Tech Africa</option><option value="fellowship">Digital Leaders Fellowship</option><option value="formations">Formations (Cyber, IA, Dev)</option></select></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Pourquoi souhaitez-vous rejoindre l&apos;AVA ?</label><textarea placeholder="Parlez-nous de votre motivation..." rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" /></div>
              <button className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition">Envoyer ma candidature</button>
              <p className="text-xs text-gray-400 text-center">En soumettant ce formulaire, vous acceptez les statuts et le règlement intérieur de l&apos;AVA.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}