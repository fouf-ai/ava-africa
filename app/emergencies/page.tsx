import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const levels = [
  { level: "Niveau 1", name: "Veille", color: "bg-blue-100 text-blue-800 border-blue-200", desc: "Surveillance continue et préparation. Pas de déploiement. Collecte d'informations et alerte précoce.", actions: ["Monitoring des risques", "Formation des volontaires", "Pré-positionnement des ressources"] },
  { level: "Niveau 2", name: "Activation locale", color: "bg-yellow-100 text-yellow-800 border-yellow-200", desc: "Mobilisation des volontaires et ressources dans la zone concernée. Support technique à distance.", actions: ["Campagnes de sensibilisation", "Coordination avec les autorités locales", "Support technique à distance"] },
  { level: "Niveau 3", name: "Réponse complète", color: "bg-orange-100 text-orange-800 border-orange-200", desc: "Déploiement d'équipes d'évaluation et d'intervention. Distribution d'aide directe.", actions: ["Déploiement d'équipes terrain", "Distribution d'aide humanitaire", "Coordination inter-agences"] },
  { level: "Niveau 4", name: "Crise complexe", color: "bg-red-100 text-red-800 border-red-200", desc: "Réponse multi-zones. Activation de l'ensemble du réseau régional. Financements d'urgence.", actions: ["Activation du réseau continental", "Sollicitation de financements d'urgence", "Réponse multi-pays coordonnée"] },
];

const emergencyTypes = [
  { icon: "🏥", title: "Crises sanitaires", desc: "Épidémies, malnutrition, manque d'accès aux soins" },
  { icon: "🌊", title: "Catastrophes naturelles", desc: "Inondations, sécheresses, tremblements de terre" },
  { icon: "⚔️", title: "Conflits et déplacements", desc: "Crises humanitaires liées aux conflits armés" },
  { icon: "📚", title: "Crises éducatives", desc: "Interruption de la scolarité, manque d'infrastructures" },
  { icon: "💧", title: "Accès aux services de base", desc: "Eau potable, logement, assainissement" },
  { icon: "💻", title: "Cybermenaces", desc: "Attaques numériques affectant les communautés et institutions" },
];

export default function Emergencies() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/emergencies" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-red-800 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Urgences Sociales</h1>
          <p className="text-xl text-red-100">Préparer, répondre, reconstruire — avec la jeunesse africaine en première ligne</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Notre approche</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">L&apos;AVA coordonne la préparation, la réponse et le relèvement face aux crises sur le continent africain. Nous mobilisons un réseau de jeunes volontaires formés, déployés rapidement là où le besoin est le plus urgent.</p>
          <p className="text-gray-600 text-lg leading-relaxed">Notre protocole de réponse rapide garantit une évaluation en 24 heures, un rapport de situation en 48 heures, un plan de réponse en 72 heures et le début des opérations en 96 heures.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Types d&apos;urgences couvertes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {emergencyTypes.map((e) => (
              <div key={e.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{e.icon}</div>
                <h3 className="text-lg font-bold mb-2">{e.title}</h3>
                <p className="text-sm text-gray-600">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos 4 niveaux de réponse</h2>
          <div className="space-y-6">
            {levels.map((l) => (
              <div key={l.level} className={`rounded-xl p-8 border ${l.color}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-white/60">{l.level}</span>
                  <h3 className="text-xl font-bold">{l.name}</h3>
                </div>
                <p className="mb-4">{l.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {l.actions.map((a) => (<span key={a} className="text-xs px-3 py-1 rounded-full bg-white/60 font-medium">{a}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Protocole de réponse rapide</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { time: "24h", action: "Évaluation", desc: "Mobilisation d'une équipe d'évaluation rapide sur le terrain" },
              { time: "48h", action: "Rapport", desc: "Production du rapport de situation et identification des besoins" },
              { time: "72h", action: "Plan", desc: "Élaboration et validation du plan de réponse par la Direction" },
              { time: "96h", action: "Action", desc: "Début de la mise en œuvre des opérations de secours" },
            ].map((p) => (
              <div key={p.time} className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{p.time}</div>
                <div className="text-lg font-bold mb-2">{p.action}</div>
                <p className="text-sm text-green-200">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Devenez volontaire d&apos;urgence</h2>
          <p className="text-gray-500 mb-8">Rejoignez notre réseau de jeunes volontaires formés à la réponse aux crises. Votre énergie peut sauver des vies.</p>
          <Link href="/youth" className="inline-block bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-800 transition">S&apos;engager maintenant</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}