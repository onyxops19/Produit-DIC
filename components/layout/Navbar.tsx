"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded bg-brand-red flex items-center justify-center text-white font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
            IDC
          </span>
          <span className="font-bold text-white tracking-tight hidden sm:block">
            Produits IDC
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="tel:+14506638969"
          className="hidden md:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span>(450) 663-8969</span>
        </a>

        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href
                      ? "text-white bg-zinc-800"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="tel:+14506638969"
                className="block text-center bg-brand-red text-white font-semibold px-4 py-3 rounded-lg text-sm"
              >
                (450) 663-8969
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
