"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-zinc-950"
        style={{
          backgroundImage: `
            linear-gradient(rgba(185, 28, 28, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(185, 28, 28, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 text-brand-red px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Distributeur HVAC — Laval, Québec
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight"
          >
            Tout ce qu&apos;il faut
            <br />
            <span className="text-brand-red">pour votre HVAC.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-zinc-400 max-w-2xl leading-relaxed"
          >
            Produits IDC distribue les matériaux spécialisés pour la
            ventilation, le chauffage et la tôlerie HVAC au Québec. Catalogues
            complets, fiches techniques et commande directe à l&apos;entrepôt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/catalogues"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-base"
            >
              Voir les catalogues
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="tel:+14506638969"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 text-base hover:bg-zinc-800"
            >
              <PhoneIcon className="h-4 w-4" />
              (450) 663-8969
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-8 border-t border-zinc-800 pt-8"
          >
            {[
              { value: "8", label: "Sections de catalogue" },
              { value: "73+", label: "Fiches techniques" },
              { value: "2", label: "Entrepôts à Laval" },
              { value: "B2B", label: "Spécialiste entrepreneurs" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-sm text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
