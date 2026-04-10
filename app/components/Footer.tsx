import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-bold text-white mb-4">
            <span className="text-green-400">African Visionaries</span>{" "}
            <span className="text-yellow-400">Alliance</span>
          </div>
          <p className="text-sm">Voir plus loin. Agir plus vite. Bâtir l&apos;Afrique.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Piliers</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/emergencies" className="hover:text-white">Urgences Sociales</Link></li>
            <li><Link href="/digital" className="hover:text-white">Souveraineté Numérique</Link></li>
            <li><Link href="/scholarships" className="hover:text-white">Bourses & Éducation</Link></li>
            <li><Link href="/youth" className="hover:text-white">Innovation Jeunesse</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Organisation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">À propos</Link></li>
            <li><Link href="/team" className="hover:text-white">Équipe</Link></li>
            <li><Link href="/#partners" className="hover:text-white">Partenaires</Link></li>
            <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Siège</h4>
          <p className="text-sm">Km 5, Bangui<br />République Centrafricaine</p>
          <p className="text-sm mt-2">contact@ava-africa.org</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs">
        © 2026 African Visionaries Alliance (AVA). Tous droits réservés.
      </div>
    </footer>
  );
}