import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const leadership = [
  { name: "Aisha", role: "Présidente", photo: "/team/president.jpg", desc: "Guide la vision stratégique de l'AVA." },
  { name: "Christelle Amina Kanani", role: "Vice-Présidente Afrique de l'Ouest", photo: "/team/vp-ouest.jpg", desc: "Coordonne les activités en Afrique de l'Ouest." },
  { name: "Juma Haroon", role: "Vice-Président Afrique Centrale", photo: "/team/vp-centre.jpg", desc: "Coordonne les activités en Afrique centrale." },
  { name: "Samuel Yao Brafo", role: "Vice-Président Afrique de l'Est", photo: "/team/vp-est.jpg", desc: "Coordonne les activités en Afrique de l'Est." },
  { name: "Kabuye Marvin", role: "Secrétaire Général", photo: "/team/secretaire.jpg", desc: "Gère l'administration et le registre des membres." },
  { name: "NIBISHAKA Fakiru", role: "Trésorier", photo: "/team/tresorier.jpg", desc: "Supervise la gestion financière et la comptabilité." },
];

const staff = [
  { name: "Jean-Lucien Fouf-Kagna Grebaye", role: "Directeur Exécutif", dept: "Direction", photo: "/team/directeur.jpg" },
  { name: "Yunus Ibrahim", role: "Resp. Réponse aux Urgences", dept: "Urgences", photo: "/team/resp-urgences.jpg" },
  { name: "Nada Idris", role: "Resp. Formation & Programmes", dept: "Formation", photo: "/team/resp-formation.jpg" },
  { name: "Soumaila Seyni Harouna", role: "Resp. IA, Cybersécurité & Innovation", dept: "Technologie", photo: "/team/resp-cyber.jpg" },
  { name: "Ibrahim Kah", role: "Resp. Bourses & Partenariats Académiques", dept: "Éducation", photo: "/team/resp-bourses.jpg" },
  { name: "Adam Ali Ousmane", role: "Resp. Communication & Plaidoyer", dept: "Communication", photo: "/team/resp-communication.jpg" },
  { name: "Andre Theophase Ndayisaba", role: "Resp. Administration & Finances", dept: "Admin & Finance", photo: "/team/resp-finances.jpg" },
  { name: "Gaoussou Binate", role: "Resp. Partenariats & Développement", dept: "Partenariats", photo: "/team/resp-partenariats.jpg" },
  { name: "À définir", role: "Chargé(e) Suivi-Évaluation", dept: "M&E", photo: "/team/charge-me.jpg" },
  { name: "À définir", role: "Formateur(trice) Principal(e)", dept: "Formation", photo: "/team/formateur.jpg" },
  { name: "À définir", role: "Développeur(se) Web / Plateforme", dept: "Technologie", photo: "/team/developpeur.jpg" },
  { name: "À définir", role: "Assistant(e) Administratif(ve)", dept: "Support", photo: "/team/assistant.jpg" },
  { name: "À définir", role: "Représentant(e) Genre", dept: "Transversal", photo: "/team/rep-genre.jpg" },
  { name: "À définir", role: "Représentant(e) Jeunesse 1", dept: "Jeunesse", photo: "/team/rep-jeunesse1.jpg" },
  { name: "À définir", role: "Représentant(e) Jeunesse 2", dept: "Jeunesse", photo: "/team/rep-jeunesse2.jpg" },
];

const representatives = [
  { country: "Algérie", flag: "🇩🇿", region: "Nord" }, { country: "Égypte", flag: "🇪🇬", region: "Nord" }, { country: "Libye", flag: "🇱🇾", region: "Nord" }, { country: "Maroc", flag: "🇲🇦", region: "Nord" }, { country: "Tunisie", flag: "🇹🇳", region: "Nord" }, { country: "Mauritanie", flag: "🇲🇷", region: "Nord" }, { country: "Soudan", flag: "🇸🇩", region: "Nord" }, { country: "Sahara Occidental", flag: "🇪🇭", region: "Nord" },
  { country: "Bénin", flag: "🇧🇯", region: "Ouest" }, { country: "Burkina Faso", flag: "🇧🇫", region: "Ouest" }, { country: "Cap-Vert", flag: "🇨🇻", region: "Ouest" }, { country: "Côte d'Ivoire", flag: "🇨🇮", region: "Ouest" }, { country: "Gambie", flag: "🇬🇲", region: "Ouest" }, { country: "Ghana", flag: "🇬🇭", region: "Ouest" }, { country: "Guinée", flag: "🇬🇳", region: "Ouest" }, { country: "Guinée-Bissau", flag: "🇬🇼", region: "Ouest" }, { country: "Liberia", flag: "🇱🇷", region: "Ouest" }, { country: "Mali", flag: "🇲🇱", region: "Ouest" }, { country: "Niger", flag: "🇳🇪", region: "Ouest" }, { country: "Nigeria", flag: "🇳🇬", region: "Ouest" }, { country: "Sénégal", flag: "🇸🇳", region: "Ouest" }, { country: "Sierra Leone", flag: "🇸🇱", region: "Ouest" }, { country: "Togo", flag: "🇹🇬", region: "Ouest" },
  { country: "Cameroun", flag: "🇨🇲", region: "Centre" }, { country: "Centrafrique", flag: "🇨🇫", region: "Centre" }, { country: "Congo", flag: "🇨🇬", region: "Centre" }, { country: "RD Congo", flag: "🇨🇩", region: "Centre" }, { country: "Gabon", flag: "🇬🇦", region: "Centre" }, { country: "Guinée Équatoriale", flag: "🇬🇶", region: "Centre" }, { country: "Tchad", flag: "🇹🇩", region: "Centre" }, { country: "São Tomé-et-Príncipe", flag: "🇸🇹", region: "Centre" },
  { country: "Burundi", flag: "🇧🇮", region: "Est" }, { country: "Comores", flag: "🇰🇲", region: "Est" }, { country: "Djibouti", flag: "🇩🇯", region: "Est" }, { country: "Érythrée", flag: "🇪🇷", region: "Est" }, { country: "Éthiopie", flag: "🇪🇹", region: "Est" }, { country: "Kenya", flag: "🇰🇪", region: "Est" }, { country: "Madagascar", flag: "🇲🇬", region: "Est" }, { country: "Maurice", flag: "🇲🇺", region: "Est" }, { country: "Ouganda", flag: "🇺🇬", region: "Est" }, { country: "Rwanda", flag: "🇷🇼", region: "Est" }, { country: "Seychelles", flag: "🇸🇨", region: "Est" }, { country: "Somalie", flag: "🇸🇴", region: "Est" }, { country: "Soudan du Sud", flag: "🇸🇸", region: "Est" }, { country: "Tanzanie", flag: "🇹🇿", region: "Est" },
  { country: "Afrique du Sud", flag: "🇿🇦", region: "Sud" }, { country: "Angola", flag: "🇦🇴", region: "Sud" }, { country: "Botswana", flag: "🇧🇼", region: "Sud" }, { country: "Eswatini", flag: "🇸🇿", region: "Sud" }, { country: "Lesotho", flag: "🇱🇸", region: "Sud" }, { country: "Malawi", flag: "🇲🇼", region: "Sud" }, { country: "Mozambique", flag: "🇲🇿", region: "Sud" }, { country: "Namibie", flag: "🇳🇦", region: "Sud" }, { country: "Zambie", flag: "🇿🇲", region: "Sud" }, { country: "Zimbabwe", flag: "🇿🇼", region: "Sud" },
];

const regions = ["Nord", "Ouest", "Centre", "Est", "Sud"];
const regionColors: Record<string, string> = { Nord: "bg-blue-50 border-blue-200", Ouest: "bg-green-50 border-green-200", Centre: "bg-yellow-50 border-yellow-200", Est: "bg-orange-50 border-orange-200", Sud: "bg-purple-50 border-purple-200" };
const regionTitles: Record<string, string> = { Nord: "🏛️ Afrique du Nord", Ouest: "🌊 Afrique de l'Ouest", Centre: "🌳 Afrique Centrale", Est: "⛰️ Afrique de l'Est", Sud: "🌄 Afrique Australe" };

function PhotoBig({ photo, name }: { photo: string; name: string }) {
  if (photo.startsWith("/")) {
    return (
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-200 bg-gray-100">
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-5xl border-4 border-green-200">
      {photo}
    </div>
  );
}

function PhotoSmall({ photo, name }: { photo: string; name: string }) {
  if (photo.startsWith("/")) {
    return (
      <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100">
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">
      {photo}
    </div>
  );
}

export default function Team() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header current="/team" />

      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-green-800 to-yellow-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Notre Équipe</h1>
          <p className="text-xl text-green-200">Les visionnaires qui bâtissent la résilience africaine</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Bureau Exécutif</h2>
          <p className="text-center text-gray-500 mb-12">Les dirigeants élus par le Conseil d&apos;Administration</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((l) => (
              <div key={l.role} className="text-center">
                <PhotoBig photo={l.photo} name={l.name} />
                <h3 className="text-lg font-bold">{l.name}</h3>
                <p className="text-green-700 font-semibold text-sm mb-2">{l.role}</p>
                <p className="text-sm text-gray-500">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Équipe Opérationnelle</h2>
          <p className="text-center text-gray-500 mb-12">Les professionnels qui font tourner l&apos;AVA au quotidien</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {staff.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <PhotoSmall photo={s.photo} name={s.name} />
                <h3 className="text-sm font-bold">{s.name}</h3>
                <p className="text-xs text-green-700 font-medium">{s.role}</p>
                <p className="text-xs text-gray-400 mt-1">{s.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Représentants Nationaux</h2>
          <p className="text-center text-gray-500 mb-12">Un(e) représentant(e) dans chaque pays africain — {representatives.length} pays couverts</p>
          {regions.map((region) => {
            const countryList = representatives.filter((r) => r.region === region);
            return (
              <div key={region} className="mb-12">
                <h3 className="text-2xl font-bold mb-6">{regionTitles[region]}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {countryList.map((c) => (
                    <div key={c.country} className={`rounded-xl p-4 border ${regionColors[region]} text-center`}>
                      <div className="text-3xl mb-2">{c.flag}</div>
                      <p className="text-sm font-bold">{c.country}</p>
                      <p className="text-xs text-gray-500 mt-1">Représentant(e) à nommer</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Devenez représentant(e) de votre pays</h2>
          <p className="text-green-200 mb-8">Vous êtes un(e) jeune leader dans votre pays ? Postulez maintenant.</p>
          <Link href="/youth#join" className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition">Postuler comme représentant(e)</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}