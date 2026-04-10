import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const scholarships = [
  { name: "Mastercard Foundation Scholars", org: "Mastercard Foundation", target: "Jeunes Africains talentueux", covers: "Frais de scolarité, logement, livres, transport", level: "Licence & Master", link: "https://mastercardfdn.org/all/scholars/" },
  { name: "DAAD Scholarships", org: "Gouvernement Allemand", target: "Étudiants et professionnels africains", covers: "Frais de scolarité, allocation mensuelle, assurance", level: "Master & Doctorat", link: "https://www.daad.de/en/" },
  { name: "Chevening Scholarships", org: "Gouvernement Britannique", target: "Futurs leaders dans tous les domaines", covers: "Scolarité complète, allocation, voyages", level: "Master", link: "https://www.chevening.org/" },
  { name: "Bourses de la Francophonie", org: "Organisation Internationale de la Francophonie", target: "Étudiants des pays francophones", covers: "Frais de scolarité, allocation de vie", level: "Master & Doctorat", link: "https://www.francophonie.org/" },
  { name: "African Union Mwalimu Nyerere", org: "Union Africaine", target: "Étudiants africains pour études en Afrique", covers: "Scolarité, allocation, recherche", level: "Master & Doctorat", link: "https://au.int/" },
  { name: "Fulbright Program", org: "Gouvernement Américain", target: "Étudiants et chercheurs", covers: "Scolarité complète, allocation, voyages, assurance", level: "Master & Recherche", link: "https://foreign.fulbrightonline.org/" },
];

const moocs = [
  { name: "Coursera", desc: "Cours gratuits des meilleures universités mondiales. Certificats payants avec aide financière disponible.", link: "https://www.coursera.org/", icon: "📘" },
  { name: "edX", desc: "Programmes de Harvard, MIT et autres. Cours gratuits en audit, certificats vérifiés optionnels.", link: "https://www.edx.org/", icon: "📗" },
  { name: "FutureLearn", desc: "Cours britanniques et internationaux. Nombreux programmes en développement et santé.", link: "https://www.futurelearn.com/", icon: "📙" },
  { name: "Udemy", desc: "Large catalogue de formations techniques. Promotions fréquentes à prix réduit.", link: "https://www.udemy.com/", icon: "📕" },
  { name: "Khan Academy", desc: "Entièrement gratuit. Mathématiques, sciences, informatique. Idéal pour les fondamentaux.", link: "https://www.khanacademy.org/", icon: "📒" },
  { name: "Cisco Networking Academy", desc: "Formations gratuites en réseaux, cybersécurité et IoT avec certifications reconnues.", link: "https://www.netacad.com/", icon: "📓" },
];

const certifications = [
  { name: "CompTIA Security+", domain: "Cybersécurité", difficulty: "Débutant-Intermédiaire", desc: "Certification de base en cybersécurité. Reconnue mondialement. Porte d'entrée dans le domaine." },
  { name: "CEH (Certified Ethical Hacker)", domain: "Hacking éthique", difficulty: "Intermédiaire", desc: "Apprendre à penser comme un hacker pour mieux protéger les systèmes." },
  { name: "CISSP", domain: "Sécurité des SI", difficulty: "Avancé", desc: "La certification de référence pour les professionnels expérimentés en cybersécurité." },
  { name: "OSCP", domain: "Tests d'intrusion", difficulty: "Avancé", desc: "Certification pratique en pentest. Très respectée par les employeurs." },
  { name: "Google IT Support", domain: "Support informatique", difficulty: "Débutant", desc: "Programme Google via Coursera. Accessible sans prérequis. Certificat reconnu." },
  { name: "AWS Cloud Practitioner", domain: "Cloud Computing", difficulty: "Débutant", desc: "Introduction au cloud Amazon. Très demandé sur le marché de l'emploi." },
];

export default function Scholarships() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/scholarships" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bourses & Éducation</h1>
          <p className="text-xl text-blue-200">Accédez aux meilleures opportunités éducatives pour la jeunesse africaine</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Votre avenir commence ici</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">L&apos;AVA facilite l&apos;accès des jeunes Africains aux bourses internationales, aux plateformes de cours en ligne et aux certifications professionnelles reconnues. Nous vous accompagnons dans la recherche d&apos;opportunités et la constitution de vos dossiers.</p>
          <p className="text-gray-600 text-lg leading-relaxed">Que vous soyez étudiant, jeune professionnel ou en reconversion, il existe une opportunité pour vous. L&apos;AVA est là pour vous guider.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Bourses internationales</h2>
          <p className="text-center text-gray-500 mb-12">Opportunités de financement pour étudier dans les meilleures institutions</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s) => (
              <div key={s.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-lg font-bold mb-1 text-green-800">{s.name}</h3>
                <p className="text-sm text-yellow-600 font-medium mb-3">{s.org}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600"><span className="font-semibold">Public :</span> {s.target}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Couvre :</span> {s.covers}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Niveau :</span> {s.level}</p>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:text-green-800">En savoir plus →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Plateformes de cours en ligne (MOOC)</h2>
          <p className="text-center text-gray-500 mb-12">Apprenez gratuitement ou à faible coût depuis n&apos;importe où en Afrique</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moocs.map((m) => (
              <div key={m.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="text-lg font-bold mb-2">{m.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{m.desc}</p>
                <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:text-green-800">Accéder à la plateforme →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Certifications professionnelles</h2>
          <p className="text-center text-green-200 mb-12">Les certifications qui ouvrent les portes du marché de l&apos;emploi mondial</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c) => (
              <div key={c.name} className="bg-green-700/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-1">{c.name}</h3>
                <p className="text-xs text-green-300 mb-1">{c.domain} • {c.difficulty}</p>
                <p className="text-sm text-green-100">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Comment l&apos;AVA vous accompagne</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔍", title: "Recherche", desc: "Nous identifions les bourses et opportunités adaptées à votre profil et vos ambitions." },
              { icon: "📝", title: "Candidature", desc: "Nous vous aidons à constituer un dossier solide : CV, lettre de motivation, essais." },
              { icon: "🎯", title: "Suivi", desc: "Nous suivons votre parcours et vous connectons à notre réseau d'anciens boursiers." },
            ].map((a) => (
              <div key={a.title} className="text-center p-6">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="text-lg font-bold mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à saisir votre opportunité ?</h2>
          <p className="text-gray-500 mb-8">Rejoignez l&apos;AVA et accédez à notre accompagnement personnalisé pour les bourses, MOOC et certifications.</p>
          <Link href="/youth" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-800 transition">Accéder aux opportunités</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}