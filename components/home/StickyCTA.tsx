"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneIcon, EnvelopeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600 && !dismissed) setVisible(true);
      else if (window.scrollY < 600) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:left-auto z-40 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/60 p-4 flex items-center gap-4 max-w-sm sm:max-w-xs w-full sm:w-auto"
        >
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Besoin d&apos;un produit?</p>
            <p className="text-zinc-400 text-xs mt-0.5">On est là pour vous aider.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:+14506638969"
              className="w-9 h-9 rounded-lg bg-brand-red hover:bg-brand-red-dark flex items-center justify-center text-white transition-colors"
              title="Appeler"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <a
              href="mailto:produits-idc@hotmail.com"
              className="w-9 h-9 rounded-lg border border-zinc-700 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              title="Courriel"
            >
              <EnvelopeIcon className="h-4 w-4" />
            </a>
          </div>
          <button
            onClick={() => { setDismissed(true); setVisible(false); }}
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
            aria-label="Fermer"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
