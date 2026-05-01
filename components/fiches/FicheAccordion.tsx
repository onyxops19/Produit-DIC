"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import type { FicheCategory } from "@/lib/fiches-data";

interface FicheAccordionProps {
  category: FicheCategory;
  defaultOpen?: boolean;
}

export default function FicheAccordion({ category, defaultOpen = false }: FicheAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-200 ${open ? "border-brand-red/40 bg-zinc-900" : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"}`}>
      <button
        className="w-full flex items-center justify-between p-5 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
          <span className="font-semibold text-white">{category.title}</span>
          <span className="text-xs text-zinc-600 font-medium">
            {category.fiches.length} fiche{category.fiches.length > 1 ? "s" : ""}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDownIcon className="h-5 w-5 text-zinc-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-zinc-800">
              {category.note && (
                <p className="text-zinc-500 text-sm italic mt-4 mb-3">{category.note}</p>
              )}
              <ul className="mt-4 space-y-2">
                {category.fiches.map((fiche) => (
                  <li key={fiche.url}>
                    <a
                      href={fiche.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-zinc-800 transition-colors"
                    >
                      <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                        {fiche.title}
                      </span>
                      <DocumentArrowDownIcon className="h-4 w-4 text-zinc-600 group-hover:text-brand-red shrink-0 transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
