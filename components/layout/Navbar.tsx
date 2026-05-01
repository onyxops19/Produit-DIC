"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/catalogues", label: "Catalogues" },
  { href: "/fiches-techniques", label: "Fiches techniques" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-200/60"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
          <Image
            src="/IDC-logo.gif"
            alt="Les Produits de Chauffage IDC Inc."
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-brand-red bg-red-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Phone CTA */}
        <a
          href="tel:+14506638969"
          className="hidden md:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-red-900/20"
        >
          <PhoneIcon className="h-4 w-4" />
          <span>(450) 663-8969</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 shadow-lg">
          <ul className="flex flex-col gap-1 pt-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href
                      ? "text-brand-red bg-red-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="tel:+14506638969"
                className="flex items-center justify-center gap-2 bg-brand-red text-white font-semibold px-4 py-3 rounded-lg text-sm"
              >
                <PhoneIcon className="h-4 w-4" />
                (450) 663-8969
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
