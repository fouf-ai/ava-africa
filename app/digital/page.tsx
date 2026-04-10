import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const formations = [
  { icon: "🛡️", title: "Cybersécurité Fondamentale", duration: "12 semaines", level: "Débutant", desc: "Les bases de la sécurité informatique : réseaux, systèmes, menaces et défenses. Préparation à CompTIA Security+.", modules: ["Réseaux et protocoles", "Menaces et vulnérabilités", "Cryptographie", "Sécurité des systèmes"] },
  { icon: "🔓", title: "Hacking Éthique & Pentest", duration: "16 semaines", level: "Intermédiaire", desc: "Apprendre à penser comme un attaquant pour mieux défendre. Tests d'intrusion, audit de sécurité. Préparation CEH/OSCP.", modules: ["Reconnaissance et scanning", "Exploitation de vulnérabilités", "Post-exploitation", "Rédaction de rapports"] },
  { icon: "🤖", title: "Intelligence Artificielle Appliquée", duration: "14 semaines", level: "Intermédiaire", desc: "IA au service du développement africain : agriculture, santé, éducation, réponse aux urgences.", modules: ["Fondamentaux du Machine Learning", "Traitement du langage naturel", "Vision par ordinateur", "IA et données africaines"] },
  { icon: "☁️", title: "Cloud Computing & Infrastructure", duration: "10 semaines", level: "Débutant-Intermédiaire", desc: "Déployer et sécuriser des infrastructures cloud. AWS, Azure, ou GCP.", modules: ["Architecture cloud", "Déploiement de services", "Sécurité cloud", "Gestion des coûts"] },
  { icon: "📊", title: "Data Science & Analyse de Données", duration: "12 semaines", level: "Intermédiaire", desc: "Collecter, analyser et visualiser les données pour la prise de décision. Python, SQL, tableaux de bord.", modules: ["Python pour la data", "SQL et bases de données", "Visualisation de données", "Projets pratiques africains"] },
  { icon: "🌐", title: "Développement Web Full-Stack", duration: "16 semaines", level: "Débutant", desc: "Concevoir des sites et applications web modernes. HTML, CSS, JavaScript, React, Node.js.", modules: ["HTML/CSS/JavaScript", "React et Next.js", "Backend avec Node.js", "Déploiement et DevOps"] },
];

const services = [
  { icon: "🔍", title: "Audits de Cybersécurité", desc: "Évaluation complète de la sécurité de vos systèmes, réseaux et applications.", forWho: "Entreprises, institutions publiques, ONG" },
  { icon: "🧪", title: "Tests d'Intrusion", desc: "Simulation d'attaques réelles pour identifier les failles de sécurité.", forWho: "Banques, télécoms, gouvernements" },
  { icon: "📋", title: "Conseil en Conformité", desc: "Accompagnement pour la mise en conformité RGPD, normes ISO 27001.", forWho: "Toute organisation traitant des données personnelles" },
  { icon: "🎓", title: "Formations Corporate", desc: "Programmes de formation sur mesure pour vos équipes.", forWho: "Entreprises et institutions de toute taille" },
];

export default function Digital() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/digital" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-gray-900 via-green-900 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Souveraineté Numérique & IA</h1>
          <p className="text-xl text-green-300">Former les talents. Protéger les infrastructures. Construire la souveraineté technologique de l&apos;Afrique.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Pourquoi la souveraineté numérique ?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">L&apos;Afrique ne peut pas dépendre d&apos;autres continents pour protéger ses données, sécuriser ses infrastructures et développer ses solutions technologiques. La souveraineté numérique, c&apos;est la capacité du continent à maîtriser son destin dans l&apos;espace numérique.</p>
          <p className="text-gray-600 text-lg leading-relaxed">L&apos;AVA forme la prochaine génération d&apos;experts africains en cybersécurité et en intelligence artificielle.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: "6", label: "Formations disponibles" }, { value: "500+", label: "Heures de contenu" }, { value: "4", label: "Services B2B" }, { value: "1", label: "Cyber Range" }].map((s) => (
            <div key={s.label}><div className="text-4xl md:text-5xl font-bold text-green-400">{s.value}</div><div className="text-sm mt-2 text-gray-400">{s.label}</div></div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nos Formations</h2>
          <p className="text-center text-gray-500 mb-12">Programmes conçus pour le contexte africain, dispensés en présentiel, en ligne et en hybride</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold mb-1">{f.title}</h3>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">{f.duration}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">{f.level}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{f.desc}</p>
                <div className="space-y-1">{f.modules.map((m) => (<p key={m} className="text-xs text-gray-500">✓ {m}</p>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-green-900 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">🖥️ Cyber Range AVA</h2>
            <p className="text-lg text-green-200 mb-6">Notre laboratoire virtuel de cybersécurité permet aux apprenants de pratiquer dans un environnement sécurisé et réaliste.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[{ title: "Simulations réalistes", desc: "Environnements reproduisant des infrastructures d'entreprises africaines" }, { title: "Exercices CTF", desc: "Compétitions de hacking éthique pour tester vos compétences" }, { title: "Accessible à distance", desc: "Pratiquez depuis n'importe où avec une connexion internet" }].map((c) => (
                <div key={c.title} className="bg-white/10 rounded-xl p-4"><h3 className="font-bold mb-2 text-yellow-400">{c.title}</h3><p className="text-sm text-green-200">{c.desc}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Services aux Entreprises & Institutions</h2>
          <p className="text-center text-gray-500 mb-12">L&apos;AVA accompagne les organisations africaines dans leur sécurisation numérique</p>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 mb-3">{s.desc}</p>
                <p className="text-sm text-green-700 font-medium">Pour : {s.forWho}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à développer vos compétences numériques ?</h2>
          <p className="text-gray-500 mb-8">Que vous soyez étudiant, professionnel ou entreprise, l&apos;AVA a une solution pour vous.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/youth" className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-800 transition">S&apos;inscrire aux formations</Link>
            <Link href="/#contact" className="inline-block border-2 border-green-700 text-green-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-50 transition">Demander un audit</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}