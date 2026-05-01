"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const steps = 60;
          const step = to / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= to) { setCount(to); clearInterval(timer); }
            else setCount(Math.round(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-900">
      {/* Layered background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(185,28,28,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(30,64,175,0.12) 0%, transparent 60%), linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      />

      {/* Steel grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Animated floating orbs */}
      <div
        className="absolute top-16 right-[15%] w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #B91C1C 0%, transparent 70%)",
          animation: "floatA 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-24 right-[30%] w-48 h-48 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          animation: "floatB 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 right-[8%] w-32 h-32 rounded-full pointer-events-none opacity-15 border border-white/10"
        style={{ animation: "floatC 9s ease-in-out infinite" }}
      />

      {/* Diagonal red stripe */}
      <div
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none opacity-[0.04]"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, #B91C1C 40%, #B91C1C 60%, transparent 60%)",
        }}
      />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-brand-red/40 bg-brand-red/10 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Distributeur HVAC — Laval, Québec
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="font-display font-extrabold leading-[1.0] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
          >
            TOUT CE QU&apos;IL FAUT
            <br />
            <span className="text-brand-red">POUR VOTRE HVAC.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            Produits IDC distribue les matériaux spécialisés pour la ventilation,
            le chauffage et la tôlerie HVAC au Québec. Catalogues complets,{" "}
            <span className="text-slate-300">fiches techniques</span> et commande
            directe à l&apos;entrepôt.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/catalogues"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3.5 rounded-lg shadow-xl shadow-red-900/40 hover:-translate-y-1 hover:shadow-red-900/60 transition-all duration-200 text-base"
            >
              Voir les catalogues
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="tel:+14506638969"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 text-base hover:bg-white/5"
            >
              <PhoneIcon className="h-4 w-4" />
              (450) 663-8969
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { num: 8, suffix: "", label: "Sections de catalogue" },
              { num: 73, suffix: "+", label: "Fiches techniques" },
              { num: 2, suffix: "", label: "Entrepôts à Laval" },
            ].map(({ num, suffix, label }) => (
              <div key={label}>
                <p className="font-display font-extrabold text-white leading-none" style={{ fontSize: "2.5rem" }}>
                  <CountUp to={num} suffix={suffix} />
                </p>
                <p className="text-slate-500 text-xs mt-1 leading-tight">{label}</p>
              </div>
            ))}
            <div>
              <p className="font-display font-extrabold text-white leading-none" style={{ fontSize: "2.5rem" }}>
                B2B
              </p>
              <p className="text-slate-500 text-xs mt-1 leading-tight">Spécialiste entrepreneurs</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
