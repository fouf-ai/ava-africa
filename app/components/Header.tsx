"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/emergencies", label: "Urgences" },
  { href: "/scholarships", label: "Bourses" },
  { href: "/digital", label: "Numérique" },
  { href: "/youth", label: "Jeunesse" },
  { href: "/team", label: "Équipe" },
];

export default function Header({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-green-700">African Visionaries</span>{" "}
          <span className="text-yellow-600">Alliance</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                current === link.href
                  ? "text-green-700 font-bold"
                  : "hover:text-green-700"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/youth"
          className="hidden md:block bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition"
        >
          Rejoindre
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-lg ${
                current === link.href
                  ? "text-green-700 font-bold"
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/youth"
            onClick={() => setOpen(false)}
            className="block bg-green-700 text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-green-800 transition mt-4"
          >
            Rejoindre l&apos;AVA
          </Link>
        </div>
      )}
    </header>
  );
}