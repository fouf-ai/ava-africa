import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/about" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-green-800 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">À propos de l&apos;AVA</h1>
          <p className="text-xl text-green-200">Qui sommes-nous et pourquoi nous existons</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Notre histoire</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">L&apos;African Visionaries Alliance (AVA) fondée par des jeunes visionnaires africains déterminés à bâtir la résilience du continent par la technologie et l'action sociale.</p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">Basée à Bangui, en République Centrafricaine, l&apos;AVA opère à l&apos;échelle continentale à travers cinq bureaux régionaux couvrant l&apos;Afrique du Nord, de l&apos;Ouest, Centrale, de l&apos;Est et Australe.</p>
          <p className="text-gray-600 text-lg leading-relaxed">Nous sommes une organisation non gouvernementale, apolitique et non confessionnelle, régie par l&apos;Ordonnance n° 66/024 du 21 février 1966 relative aux associations en République Centrafricaine. Nos pratiques de gestion sont alignées sur les standards des bailleurs internationaux (USAID, Union Européenne, AFD, Banque Mondiale, BAD).</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-green-800">Notre Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">Promouvoir la résilience africaine par l&apos;action sociale, la souveraineté numérique et l&apos;autonomisation de la jeunesse. Nous connectons les visionnaires du continent pour répondre aux urgences sociales, former les talents numériques de demain et bâtir une Afrique souveraine dans l&apos;espace numérique.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-yellow-600">Notre Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">Une Afrique où chaque communauté est préparée aux crises, où la jeunesse dirige l&apos;innovation numérique, et où la souveraineté technologique du continent est une réalité. Nous voyons un continent qui prend soin de ses propres populations avec rapidité, compassion et dignité.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🤝", title: "Unité Africaine", desc: "Quand une communauté souffre, nous répondons tous ensemble, au-delà des frontières." },
              { icon: "💡", title: "Innovation", desc: "Les jeunes apportent des idées nouvelles. Nous encourageons la créativité et les solutions modernes." },
              { icon: "⚖️", title: "Transparence", desc: "Les gens nous confient des ressources. Nous devons prouver que nous en sommes dignes." },
              { icon: "🌍", title: "Inclusivité", desc: "Nous aidons selon le besoin, sans distinction de tribu, religion ou politique." },
              { icon: "🛡️", title: "Intégrité", desc: "Honnêteté et bonne foi dans toutes nos interactions. Tolérance zéro pour la corruption." },
              { icon: "🌱", title: "Résilience", desc: "Nous ne fournissons pas juste une aide d'urgence — nous aidons les communautés à devenir plus fortes." },
            ].map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Gouvernance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Assemblée Générale", desc: "Organe suprême. Tous les membres fondateurs, actifs et institutionnels à jour de cotisation." },
              { title: "Conseil d'Administration", desc: "7 à 15 membres élus. Orientation stratégique, supervision et contrôle. Au moins 40% de femmes." },
              { title: "Bureau Exécutif", desc: "Président, 3 Vice-Présidents régionaux, Secrétaire Général, Trésorier. Gestion courante mensuelle." },
              { title: "Direction Exécutive", desc: "Pilotage opérationnel quotidien. Coordination des départements et des réponses aux urgences." },
              { title: "Comités Consultatifs", desc: "Scientifique, Éthique, Audit et Urgences. Expertise technique et conseil aux organes décisionnels." },
              { title: "Conseil des Sages", desc: "Personnalités reconnues. Rôle de mentorat et d'orientation stratégique." },
            ].map((g) => (
              <div key={g.title} className="bg-green-700/50 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2 text-yellow-400">{g.title}</h3>
                <p className="text-sm text-green-100">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Nos Bureaux Régionaux</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { region: "Afrique du Nord", emoji: "🏛️" },
              { region: "Afrique de l'Ouest", emoji: "🌊" },
              { region: "Afrique Centrale", emoji: "🌳" },
              { region: "Afrique de l'Est", emoji: "⛰️" },
              { region: "Afrique Australe", emoji: "🌄" },
            ].map((b) => (
              <div key={b.region} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{b.emoji}</div>
                <p className="text-sm font-semibold text-gray-700">{b.region}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 mt-8">Siège social : Km 5, Bangui, République Centrafricaine</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Faites partie de la vision</h2>
          <p className="text-gray-500 mb-8">Que vous soyez jeune Africain, organisation, bailleur ou université — il y a une place pour vous dans l&apos;AVA.</p>
          <Link href="/youth" className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-800 transition">Rejoindre l&apos;AVA</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}