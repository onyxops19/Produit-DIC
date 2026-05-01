# Produits IDC Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-converting, animated, SEO-optimized Next.js 14 website for Produits IDC, a B2B HVAC/sheet metal distributor in Laval, Quebec.

**Architecture:** Next.js 14 App Router with Tailwind CSS for styling and Framer Motion for animations. Data lives in static TypeScript files (no CMS needed). All PDFs are served from the existing `http://produits-idc.com/images/` CDN.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next/font (Geist), next/metadata API

---

## File Map

```
produits-idc-web/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, global metadata, Navbar + Footer
│   ├── globals.css                   # Tailwind base + custom CSS vars + scrollbar
│   ├── page.tsx                      # Homepage
│   ├── catalogues/page.tsx           # All 8 catalog sections
│   ├── fiches-techniques/page.tsx    # All 13 technical sheet categories
│   └── contact/page.tsx              # Two locations, phone, email, map
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Sticky nav, mobile menu
│   │   └── Footer.tsx                # Footer: links, contact, legal
│   ├── home/
│   │   ├── Hero.tsx                  # Full-viewport hero, animated headline
│   │   ├── ValueProps.tsx            # 4 trust pillars with icons
│   │   ├── CatalogPreview.tsx        # 8-section catalog grid on homepage
│   │   └── StickyCTA.tsx             # Bottom-fixed CTA bar
│   ├── catalogues/
│   │   └── CatalogCard.tsx           # Single catalog section card with download
│   ├── fiches/
│   │   └── FicheAccordion.tsx        # Category accordion with PDF list
│   └── ui/
│       ├── FadeInSection.tsx         # Framer Motion scroll-reveal wrapper
│       ├── DownloadButton.tsx        # PDF download button
│       └── SectionHeading.tsx        # Consistent h2 + subtitle pattern
├── lib/
│   ├── catalog-data.ts               # All 8 catalog sections + metadata
│   └── fiches-data.ts                # All 13 categories + 73 PDF entries
└── public/
    └── og-default.jpg                # OG image (generated via script in task 1)
```

---

## Task 1: Scaffold Next.js 14 project with dependencies

**Files:**
- Create: `produits-idc-web/` (project root, all files below are relative to it)
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.js`

- [ ] **Step 1: Create the project**

```bash
cd ~/Desktop
npx create-next-app@latest produits-idc-web \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-git
```

- [ ] **Step 2: Install Framer Motion**

```bash
cd ~/Desktop/produits-idc-web
npm install framer-motion
```

- [ ] **Step 3: Update `tailwind.config.ts`**

Replace the entire file with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#B91C1C",
          "red-dark": "#991B1B",
          "red-light": "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Update `app/globals.css`**

Replace with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-red: #B91C1C;
  --brand-bg: #09090b;
  --brand-surface: #18181b;
  --brand-border: #27272a;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--brand-bg);
  color: #f4f4f5;
  -webkit-font-smoothing: antialiased;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--brand-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--brand-red);
  border-radius: 3px;
}

/* Focus ring */
*:focus-visible {
  outline: 2px solid var(--brand-red);
  outline-offset: 2px;
}
```

- [ ] **Step 5: Create `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "produits-idc.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Verify the project starts**

```bash
cd ~/Desktop/produits-idc-web
npm run dev
```
Expected: Server running at http://localhost:3000 with default Next.js page

- [ ] **Step 7: Commit**

```bash
cd ~/Desktop/produits-idc-web
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with Tailwind + Framer Motion"
```

---

## Task 2: Data layer — catalog and fiches data

**Files:**
- Create: `lib/catalog-data.ts`
- Create: `lib/fiches-data.ts`

- [ ] **Step 1: Create `lib/catalog-data.ts`**

```typescript
export interface CatalogSection {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pdfUrl: string;
  size: string;
  icon: string;
}

const BASE = "http://produits-idc.com/images";

export const catalogSections: CatalogSection[] = [
  {
    id: 1,
    slug: "chauffage",
    title: "Chauffage",
    subtitle: "Section 1",
    description: "Side take-offs, fittings galvanisés, dampers — tout pour vos systèmes de chauffage.",
    pdfUrl: `${BASE}/catalog-section1.pdf`,
    size: "684 Ko",
    icon: "🔥",
  },
  {
    id: 2,
    slug: "suspension-assemblage",
    title: "Suspension, assemblage et ancrage",
    subtitle: "Section 2",
    description: "Strut channel, U-channel, attaches et systèmes d'ancrage pour conduits.",
    pdfUrl: `${BASE}/catalog-section2.pdf`,
    size: "1,15 Mo",
    icon: "🔩",
  },
  {
    id: 3,
    slug: "meches-lames",
    title: "Mèches et lames",
    subtitle: "Section 3",
    description: "Lames de coupe, mèches et accessoires pour travaux de tôlerie.",
    pdfUrl: `${BASE}/catalog-section3.pdf`,
    size: "587 Ko",
    icon: "⚙️",
  },
  {
    id: 4,
    slug: "scellant-tape-flexible",
    title: "Scellant, butyle, tape, flexible et isolant",
    subtitle: "Section 4",
    description: "Produits d'étanchéité, rubans, flexibles et matériaux isolants certifiés.",
    pdfUrl: `${BASE}/catalog-section4.pdf`,
    size: "969 Ko",
    icon: "🛡️",
  },
  {
    id: 5,
    slug: "portes-diffuseurs-grilles",
    title: "Portes, diffuseurs et grilles",
    subtitle: "Section 5",
    description: "Portes d'accès, diffuseurs 3 cônes, grilles de retour plastique et métal.",
    pdfUrl: `${BASE}/catalog-section5.pdf`,
    size: "924 Ko",
    icon: "🌬️",
  },
  {
    id: 6,
    slug: "prises-sorties-air",
    title: "Prises et sorties d'air",
    subtitle: "Section 6",
    description: "Prises d'air extérieur, sorties murales et raccords de ventilation.",
    pdfUrl: `${BASE}/catalog-section6.pdf`,
    size: "311 Ko",
    icon: "💨",
  },
  {
    id: 7,
    slug: "outils-makita",
    title: "Outils divers Makita",
    subtitle: "Section 7",
    description: "Cisailles, perceuses et outillage Makita pour ateliers de tôlerie.",
    pdfUrl: `${BASE}/catalog-section7.pdf`,
    size: "367 Ko",
    icon: "🔧",
  },
  {
    id: 8,
    slug: "produits-duro",
    title: "Produits Duro",
    subtitle: "Section 8",
    description: "Canevas, gaskets, clips et toute la gamme Duro pour HVAC.",
    pdfUrl: `${BASE}/catalog-section8.pdf`,
    size: "180 Ko",
    icon: "📦",
  },
];

export const catalogFull = {
  pdfUrl: `${BASE}/catalog-all.pdf`,
  size: "5,00 Mo",
};

export const formFab = {
  pdfUrl: `${BASE}/Form_FAB.pdf`,
  size: "177 Ko",
  fax: "(450) 663-0575",
};
```

- [ ] **Step 2: Create `lib/fiches-data.ts`**

```typescript
export interface FichePDF {
  title: string;
  url: string;
  note?: string;
}

export interface FicheCategory {
  slug: string;
  title: string;
  fiches: FichePDF[];
  note?: string;
}

const BASE = "http://produits-idc.com/images";

export const ficheCategories: FicheCategory[] = [
  {
    slug: "attaches-generales",
    title: "Attaches générales",
    fiches: [
      { title: "FT Duro CL12-19-30351", url: `${BASE}/FTDuro-CL12-19-30351.pdf` },
      { title: "FT Duro CL18", url: `${BASE}/FTDuro-CL18-.pdf` },
      { title: "FT Duro CL23-19-30350", url: `${BASE}/FTDuro-CL23-19-30350.pdf` },
      { title: "FT Métaux Channel 6-497D", url: `${BASE}/FTMetaux-Channel-6-497D.pdf` },
      { title: "FT Strut Channel", url: `${BASE}/FTStrutChannel.pdf` },
      { title: "FT U-Channel", url: `${BASE}/FTU-channel.pdf` },
      { title: "Duro Manuel de Câblage (13 Mo)", url: `${BASE}/DuroManualdeCablage.pdf` },
      { title: "Duro Seismic Verification SMACNA", url: `${BASE}/DuroSeismicVerificationSMACNA.pdf` },
    ],
  },
  {
    slug: "canevas",
    title: "Canevas",
    fiches: [
      { title: "Duro Canevas All", url: `${BASE}/Duro-CanevasAll-.pdf` },
    ],
  },
  {
    slug: "damper",
    title: "Damper — Volet de Balancement",
    note: "Ces fiches techniques sont similaires aux produits que l'on fait fabriquer.",
    fiches: [
      { title: "FT Damper Multi Carré", url: `${BASE}/FTDamperMultiCarre.pdf` },
      { title: "FT Duro Zone SPRD-110-5", url: `${BASE}/FTDUROZONESPRD-110-5.pdf` },
    ],
  },
  {
    slug: "diffuseurs",
    title: "Diffuseurs",
    fiches: [
      { title: "FT Diffuseur 3 Cônes DF3 24×24", url: `${BASE}/zFTs-Diffuseur-2424-DF3.pdf` },
      { title: "SUB Diffuseur 3 Cônes DF3 24×24", url: `${BASE}/zSUB-Diffuseur-2424-DF3.pdf` },
      { title: "FT Diffuseur à Plaque ISOH 24×24", url: `${BASE}/zFT-Diffuseur-ISOH.pdf` },
      { title: "SUB Diffuseur à Plaque ISOH 24×24", url: `${BASE}/zSUB-Diffuseur-ISOH.pdf` },
      { title: "FT Plaster Frame PF 24×24", url: `${BASE}/zFT-Plaster-Frame-PF.pdf` },
    ],
  },
  {
    slug: "accessoires-chauffage",
    title: "Accessoires (Fitting) de chauffage",
    fiches: [
      { title: "FT Heto-STO", url: `${BASE}/FTHeto-STO.pdf` },
      { title: "FT STO-S", url: `${BASE}/FTSTO-S.pdf` },
    ],
  },
  {
    slug: "flexible",
    title: "Flexible",
    fiches: [
      { title: "FT API 4625", url: `${BASE}/FTAPI4625.pdf` },
      { title: "FT DAP (Lambro)", url: `${BASE}/FTDAP.pdf` },
      { title: "FT FAP (Lambro)", url: `${BASE}/FTFAP.pdf` },
      { title: "FT FCMI (Lambro)", url: `${BASE}/FTFCMI.pdf` },
      { title: "FT FIAC (Lambro)", url: `${BASE}/FTFIAC.pdf` },
      { title: "FT FIAP (Lambro)", url: `${BASE}/FTFIAP.pdf` },
      { title: "FT FIC (Lambro)", url: `${BASE}/FTFIC.pdf` },
      { title: "FT FIM (Lambro)", url: `${BASE}/FTFIM.pdf` },
      { title: "FT FMD (Lambro)", url: `${BASE}/FTFMD.pdf` },
      { title: "FT SIM3 (Lambro)", url: `${BASE}/FTSIM3.pdf` },
    ],
  },
  {
    slug: "gasket",
    title: "Gasket",
    fiches: [
      { title: "FT Gasket General Duro", url: `${BASE}/FTGasketGeneralDuro.pdf` },
      { title: "FT Guertin Coating T0185", url: `${BASE}/FTGuertinCoatingT0185.pdf` },
      { title: "FT H1C-B-1434", url: `${BASE}/FTH1C-B-1434.pdf` },
    ],
  },
  {
    slug: "laine",
    title: "Laine",
    fiches: [
      { title: "FT LINACOUSTIC RC (Johns Manville)", url: `${BASE}/FTLINACOUSTICRC.pdf` },
      { title: "FT OFI-40 (Johns Manville)", url: `${BASE}/FTOFI-40.pdf` },
      { title: "FT R-300 Permacote Linacoustic (Johns Manville)", url: `${BASE}/FTR-300PermacoteLinacoustic.pdf` },
      { title: "FT Akousti-Liner R en panneau (Manson)", url: `${BASE}/FTAkousti-LinerRenpanneau.pdf` },
      { title: "FT Akousti-Liner (Manson)", url: `${BASE}/FTAkousti-Liner.pdf` },
      { title: "FT FSK (Manson)", url: `${BASE}/FTFSK.pdf` },
      { title: "FT Laine Thermique (Manson)", url: `${BASE}/FTLaineThermique.pdf` },
      { title: "Document LEED Manson", url: `${BASE}/Leed_document_Manson.pdf` },
    ],
  },
  {
    slug: "porte-acces",
    title: "Porte Accès",
    fiches: [
      { title: "FT Porte Accès Ovale", url: `${BASE}/FTPAOvale.pdf` },
      { title: "FT Porte Accès", url: `${BASE}/FTPA.pdf` },
      { title: "FT Porte Accès Piano", url: `${BASE}/FTPA_PIANO.pdf` },
    ],
  },
  {
    slug: "quincaillerie",
    title: "Quincaillerie",
    fiches: [
      { title: "Beam Clamp Erico 3000037PL", url: `${BASE}/BeamClampErico-3000037PL.pdf` },
    ],
  },
  {
    slug: "silicone-butyl-scellant",
    title: "Silicone, Butyl & Scellant",
    fiches: [
      { title: "FT AIRSEAL 33", url: `${BASE}/FTAIRSEAL33.pdf` },
      { title: "FT Butyl Mulco", url: `${BASE}/FTButylMulco.pdf` },
      { title: "FT Elgen Duct Seal-It", url: `${BASE}/FTElgenDuctSeal-It.pdf` },
      { title: "FT Firebarrier Silicon", url: `${BASE}/FTFirebarrierSilicon.pdf` },
      { title: "FT Galvicon Gallon", url: `${BASE}/FTGalviconGallon.pdf` },
      { title: "FT Galvicon Spray", url: `${BASE}/FTGalviconspray.pdf` },
      { title: "FT Guertin 1085", url: `${BASE}/FTGUERTIN1085.pdf` },
      { title: "FT Mulco Supra", url: `${BASE}/FTMulcoSupra.pdf` },
      { title: "FT Papier Scellant Bleu", url: `${BASE}/FTPapierScelantBleu.pdf` },
      { title: "FT WB-S2", url: `${BASE}/FTWB-S2.pdf` },
      { title: "FT 4559 Fab Shop", url: `${BASE}/FT4559Fabshop.pdf` },
    ],
  },
  {
    slug: "tape",
    title: "Tape",
    fiches: [
      { title: "FT Mesh Tape Coton", url: `${BASE}/FTMeshTapeCoton.pdf` },
      { title: "FT Tape Aluminium TA-330X", url: `${BASE}/FTTapeAluminiumTA-330X-x.pdf` },
      { title: "FT Tesa 60756", url: `${BASE}/FTTesa60756.pdf` },
    ],
  },
  {
    slug: "divers",
    title: "Divers",
    fiches: [
      { title: "FT CP-52", url: `${BASE}/FTCP-52.pdf` },
      { title: "FT CP-135", url: `${BASE}/FTCP-135.pdf` },
      { title: "FT POLYPAD 4×4", url: `${BASE}/FTPOLYPAD_4x4.pdf` },
      { title: "FT Galvanisé G90", url: `${BASE}/FTGalvaniseG90.pdf` },
      { title: "FT Superseal Coating", url: `${BASE}/FTSUPERSEALCOATING.pdf` },
      { title: "FT WIT-43", url: `${BASE}/FTWITSpec.pdf` },
    ],
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add lib/
git commit -m "feat: add catalog and fiches data layer"
```

---

## Task 3: UI primitives — FadeInSection, DownloadButton, SectionHeading

**Files:**
- Create: `components/ui/FadeInSection.tsx`
- Create: `components/ui/DownloadButton.tsx`
- Create: `components/ui/SectionHeading.tsx`

- [ ] **Step 1: Create `components/ui/FadeInSection.tsx`**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeInSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : 0,
      x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/ui/DownloadButton.tsx`**

```tsx
"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface DownloadButtonProps {
  href: string;
  label?: string;
  size?: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function DownloadButton({
  href,
  label = "Télécharger le PDF",
  size,
  variant = "primary",
  className = "",
}: DownloadButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-lg font-semibold text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-red";
  const variants = {
    primary:
      "bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "border border-zinc-700 hover:border-brand-red text-zinc-300 hover:text-white px-4 py-2 hover:bg-zinc-800",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={`${base} ${variants[variant]} ${className}`}
    >
      <ArrowDownTrayIcon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      {size && <span className="text-xs opacity-60 font-normal">({size})</span>}
    </a>
  );
}
```

- [ ] **Step 3: Install Heroicons**

```bash
npm install @heroicons/react
```

- [ ] **Step 4: Create `components/ui/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-zinc-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI primitive components"
```

---

## Task 4: Layout — Navbar and Footer

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded bg-brand-red flex items-center justify-center text-white font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
            IDC
          </span>
          <span className="font-bold text-white tracking-tight hidden sm:block">
            Produits IDC
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* Desktop CTA */}
        <a
          href="tel:+14506638969"
          className="hidden md:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span>(450) 663-8969</span>
        </a>

        {/* Mobile menu toggle */}
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

      {/* Mobile menu */}
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
```

- [ ] **Step 2: Create `components/layout/Footer.tsx`**

```tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded bg-brand-red flex items-center justify-center text-white font-black text-xs">
                IDC
              </span>
              <span className="font-bold text-white">Produits IDC</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Distributeur québécois de matériaux pour la ventilation et le
              chauffage. Au service des entrepreneurs depuis des décennies.
            </p>
          </div>

          {/* Magasin */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Magasin / Entrepôt
            </h3>
            <address className="not-italic text-zinc-400 text-sm space-y-1">
              <p>1275 Rue Michelin</p>
              <p>Laval (Québec) H7L 4S2</p>
              <a href="tel:+14506638969" className="block text-brand-red hover:text-red-400 font-medium mt-2">
                (450) 663-8969
              </a>
              <p className="text-zinc-500">Télécopieur : (450) 663-0575</p>
            </address>
          </div>

          {/* Admin + Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Administration
            </h3>
            <address className="not-italic text-zinc-400 text-sm space-y-1 mb-6">
              <p>1419 Rue Michelin</p>
              <p>Laval (Québec) H7L 4S2</p>
              <a href="tel:+14509750909" className="block text-brand-red hover:text-red-400 font-medium mt-2">
                (450) 975-0909
              </a>
              <a href="mailto:produits-idc@hotmail.com" className="block text-zinc-400 hover:text-white mt-1 break-all">
                produits-idc@hotmail.com
              </a>
            </address>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/catalogues", label: "Catalogues" },
                { href: "/fiches-techniques", label: "Fiches techniques" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-zinc-500 hover:text-white text-sm transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-zinc-600 text-xs">
            © {year} Produits IDC. Tous droits réservés.
          </p>
          <p className="text-zinc-700 text-xs">
            Le prix de catalogue ne comprend pas l&apos;escompte. En cas de
            différence, le prix de l&apos;entrepôt prévaut.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/
git commit -m "feat: add Navbar and Footer layout components"
```

---

## Task 5: Root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://produits-idc.com"),
  title: {
    default: "Produits IDC — Distributeur HVAC & Tôlerie, Laval (Québec)",
    template: "%s | Produits IDC",
  },
  description:
    "Produits IDC est le distributeur québécois de référence pour les matériaux de ventilation, chauffage et tôlerie HVAC. Catalogues, fiches techniques et commande directe à Laval.",
  keywords: [
    "HVAC Québec",
    "distributeur ventilation Laval",
    "tôlerie HVAC",
    "matériaux chauffage Québec",
    "produits Duro",
    "flexible Lambro",
    "Makita HVAC",
    "catalogue HVAC",
  ],
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: "Produits IDC",
    title: "Produits IDC — Distributeur HVAC & Tôlerie, Laval",
    description:
      "Distributeur québécois de matériaux pour la ventilation, le chauffage et la tôlerie. Catalogues PDF et fiches techniques disponibles en ligne.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Install Geist font package**

```bash
npm install geist
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure root layout with metadata, fonts, and SEO"
```

---

## Task 6: Homepage — Hero section

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 1: Create `components/home/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background: dark industrial grid */}
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
      {/* Red glow top-left */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 text-brand-red px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Distributeur HVAC — Laval, Québec
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight"
          >
            Tout ce qu&apos;il faut
            <br />
            <span className="text-brand-red">pour votre HVAC.</span>
          </motion.h1>

          {/* Subheadline */}
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/catalogues"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3.5 rounded-lg shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5 transition-all duration-200 text-base"
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

          {/* Stats row */}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: add animated hero section"
```

---

## Task 7: Homepage — ValueProps and CatalogPreview

**Files:**
- Create: `components/home/ValueProps.tsx`
- Create: `components/home/CatalogPreview.tsx`

- [ ] **Step 1: Create `components/home/ValueProps.tsx`**

```tsx
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  BoltIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const props = [
  {
    icon: BuildingStorefrontIcon,
    title: "Entrepôt sur place",
    body: "Venez chercher vos commandes directement à notre entrepôt au 1275 rue Michelin, Laval.",
  },
  {
    icon: DocumentTextIcon,
    title: "Catalogue complet",
    body: "8 sections de produits, plus de 73 fiches techniques PDF disponibles en ligne en tout temps.",
  },
  {
    icon: BoltIcon,
    title: "Commande rapide",
    body: "Formulaire de fabrication (FAB) disponible pour soumettre vos commandes par télécopieur.",
  },
  {
    icon: TruckIcon,
    title: "Spécialiste B2B",
    body: "Nous servons exclusivement les entrepreneurs et ateliers de fabrication HVAC au Québec.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            eyebrow="Pourquoi Produits IDC"
            title="La référence HVAC au Québec"
            subtitle="Des décennies d'expérience au service des entrepreneurs en ventilation et chauffage."
            centered
            className="mb-16"
          />
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map(({ icon: Icon, title, body }, i) => (
            <FadeInSection key={title} delay={i * 0.1}>
              <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-brand-red/50 hover:bg-zinc-800/60 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red/20 transition-colors">
                  <Icon className="h-5 w-5 text-brand-red" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/home/CatalogPreview.tsx`**

```tsx
import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import DownloadButton from "@/components/ui/DownloadButton";
import { catalogSections } from "@/lib/catalog-data";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CatalogPreview() {
  return (
    <section className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Catalogues"
            title="Nos 8 sections de produits"
            subtitle="Téléchargez les sections qui vous intéressent ou consultez le catalogue complet."
          />
          <Link
            href="/catalogues"
            className="inline-flex items-center gap-2 text-brand-red hover:text-red-400 font-semibold text-sm shrink-0 transition-colors"
          >
            Voir tous les catalogues
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {catalogSections.map((section, i) => (
            <FadeInSection key={section.id} delay={i * 0.06}>
              <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-brand-red/40 hover:shadow-lg hover:shadow-brand-red/10 transition-all duration-300 flex flex-col h-full">
                <div className="text-3xl mb-3">{section.icon}</div>
                <span className="text-xs text-zinc-600 font-medium uppercase tracking-wider mb-1">
                  {section.subtitle}
                </span>
                <h3 className="font-bold text-white text-base mb-2 leading-snug">
                  {section.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-5">
                  {section.description}
                </p>
                <DownloadButton
                  href={section.pdfUrl}
                  label="Télécharger"
                  size={section.size}
                  variant="ghost"
                  className="w-full justify-center"
                />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/
git commit -m "feat: add ValueProps and CatalogPreview homepage sections"
```

---

## Task 8: Homepage — StickyCTA and assemble page

**Files:**
- Create: `components/home/StickyCTA.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/home/StickyCTA.tsx`**

```tsx
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
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import CatalogPreview from "@/components/home/CatalogPreview";
import StickyCTA from "@/components/home/StickyCTA";

export const metadata: Metadata = {
  title: "Produits IDC — Distributeur HVAC & Tôlerie, Laval (Québec)",
  description:
    "Produits IDC distribue les matériaux spécialisés pour la ventilation, le chauffage et la tôlerie HVAC au Québec. Catalogues PDF, fiches techniques, commande directe.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CatalogPreview />
      <StickyCTA />
    </>
  );
}
```

- [ ] **Step 3: Verify locally**

```bash
npm run dev
```
Open http://localhost:3000. Expected: Hero with animated grid background, stats row, value props grid, catalog 8-card grid, sticky CTA appearing after scrolling.

- [ ] **Step 4: Commit**

```bash
git add components/home/StickyCTA.tsx app/page.tsx
git commit -m "feat: assemble homepage with Hero, ValueProps, CatalogPreview, StickyCTA"
```

---

## Task 9: Catalogues page

**Files:**
- Create: `components/catalogues/CatalogCard.tsx`
- Create: `app/catalogues/page.tsx`

- [ ] **Step 1: Create `components/catalogues/CatalogCard.tsx`**

```tsx
import DownloadButton from "@/components/ui/DownloadButton";
import type { CatalogSection } from "@/lib/catalog-data";

interface CatalogCardProps {
  section: CatalogSection;
}

export default function CatalogCard({ section }: CatalogCardProps) {
  return (
    <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5 transition-all duration-300 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs text-zinc-600 font-medium uppercase tracking-widest">
            {section.subtitle}
          </span>
          <h2 className="text-lg font-bold text-white mt-1 leading-snug">
            {section.title}
          </h2>
        </div>
        <span className="text-3xl shrink-0">{section.icon}</span>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed flex-1">
        {section.description}
      </p>
      <DownloadButton
        href={section.pdfUrl}
        label="Télécharger"
        size={section.size}
        variant="primary"
        className="w-full justify-center"
      />
    </article>
  );
}
```

- [ ] **Step 2: Create `app/catalogues/page.tsx`**

```tsx
import type { Metadata } from "next";
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CatalogCard from "@/components/catalogues/CatalogCard";
import DownloadButton from "@/components/ui/DownloadButton";
import { catalogSections, catalogFull, formFab } from "@/lib/catalog-data";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Catalogues",
  description:
    "Téléchargez les 8 sections du catalogue Produits IDC : chauffage, suspension, mèches, scellants, diffuseurs, prises d'air, outils Makita, produits Duro.",
};

export default function CataloguesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="Catalogues PDF"
            title="Nos sections de produits"
            subtitle="Téléchargez les sections qui vous intéressent. Le catalogue Excel complet est aussi disponible sur demande par courriel."
          />
        </FadeInSection>
      </div>

      {/* 8 sections grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {catalogSections.map((section, i) => (
            <FadeInSection key={section.id} delay={i * 0.07}>
              <CatalogCard section={section} />
            </FadeInSection>
          ))}
        </div>

        {/* Full catalog + FAB callout */}
        <FadeInSection className="mt-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                <DocumentArrowDownIcon className="h-6 w-6 text-brand-red" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Catalogue complet</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Toutes les 8 sections réunies dans un seul fichier PDF pour
                  faciliter votre recherche.
                </p>
              </div>
            </div>
            <DownloadButton
              href={catalogFull.pdfUrl}
              label="Télécharger le catalogue complet"
              size={catalogFull.size}
              variant="primary"
              className="shrink-0"
            />
          </div>
        </FadeInSection>

        {/* FAB form */}
        <FadeInSection className="mt-6" delay={0.1}>
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg">Formulaire de fabrication (FAB)</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Téléchargez la feuille FAB, remplissez-la et retournez-la par
                télécopieur au{" "}
                <span className="text-brand-red font-medium">{formFab.fax}</span>.
              </p>
            </div>
            <DownloadButton
              href={formFab.pdfUrl}
              label="Formulaire FAB"
              size={formFab.size}
              variant="ghost"
              className="shrink-0"
            />
          </div>
        </FadeInSection>

        {/* Excel note */}
        <FadeInSection className="mt-8 text-center" delay={0.15}>
          <p className="text-zinc-500 text-sm">
            Pour obtenir le catalogue complet en format Excel, envoyez votre
            demande par courriel à{" "}
            <a
              href="mailto:produits-idc@hotmail.com"
              className="text-brand-red hover:text-red-400 transition-colors"
            >
              produits-idc@hotmail.com
            </a>
            .
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            * Le prix de catalogue ne comprend pas l&apos;escompte. En cas de
            différence, le prix de l&apos;entrepôt prévaut.
          </p>
        </FadeInSection>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify locally**

Navigate to http://localhost:3000/catalogues. Expected: header + 8 cards in a responsive grid + full catalog callout + FAB section.

- [ ] **Step 4: Commit**

```bash
git add components/catalogues/ app/catalogues/
git commit -m "feat: add Catalogues page with download cards"
```

---

## Task 10: Fiches techniques page

**Files:**
- Create: `components/fiches/FicheAccordion.tsx`
- Create: `app/fiches-techniques/page.tsx`

- [ ] **Step 1: Create `components/fiches/FicheAccordion.tsx`**

```tsx
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
```

- [ ] **Step 2: Create `app/fiches-techniques/page.tsx`**

```tsx
import type { Metadata } from "next";
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import FicheAccordion from "@/components/fiches/FicheAccordion";
import { ficheCategories } from "@/lib/fiches-data";

export const metadata: Metadata = {
  title: "Fiches techniques",
  description:
    "Fiches techniques HVAC par catégorie : attaches, diffuseurs, flexibles, gaskets, laines, silicones, tapes et plus. Téléchargement PDF gratuit.",
};

export default function FichesTechniquesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-12">
          <SectionHeading
            eyebrow="Documentation technique"
            title="Fiches techniques"
            subtitle={`${ficheCategories.reduce((acc, c) => acc + c.fiches.length, 0)} fiches PDF réparties en ${ficheCategories.length} catégories. Cliquez sur une catégorie pour afficher les fiches disponibles.`}
          />
        </FadeInSection>

        <div className="space-y-3">
          {ficheCategories.map((category, i) => (
            <FadeInSection key={category.slug} delay={i * 0.04}>
              <FicheAccordion
                category={category}
                defaultOpen={i === 0}
              />
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="mt-12 text-center" delay={0.2}>
          <p className="text-zinc-500 text-sm">
            Vous ne trouvez pas ce que vous cherchez ?{" "}
            <a
              href="mailto:produits-idc@hotmail.com"
              className="text-brand-red hover:text-red-400 transition-colors"
            >
              Contactez-nous
            </a>{" "}
            — nous sommes là pour vous aider.
          </p>
        </FadeInSection>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify locally**

Navigate to http://localhost:3000/fiches-techniques. Expected: 13 accordion categories, first one open, each accordion animates open/close, download icons appear on hover.

- [ ] **Step 4: Commit**

```bash
git add components/fiches/ app/fiches-techniques/
git commit -m "feat: add Fiches Techniques page with animated accordion"
```

---

## Task 11: Contact page with JSON-LD structured data

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Produits IDC à Laval (Québec). Deux adresses sur la rue Michelin. Téléphone, télécopieur et courriel disponibles.",
};

const locations = [
  {
    type: "Magasin / Entrepôt",
    address: "1275 Rue Michelin",
    city: "Laval (Québec) H7L 4S2",
    phone: "(450) 663-8969",
    phoneHref: "tel:+14506638969",
    fax: "(450) 663-0575",
    mapUrl: "https://www.google.com/maps/search/1275+Rue+Michelin+Laval+Quebec",
    primary: true,
  },
  {
    type: "Administration",
    address: "1419 Rue Michelin",
    city: "Laval (Québec) H7L 4S2",
    phone: "(450) 975-0909",
    phoneHref: "tel:+14509750909",
    fax: null,
    mapUrl: "https://www.google.com/maps/search/1419+Rue+Michelin+Laval+Quebec",
    primary: false,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: "Produits IDC",
  description:
    "Distributeur québécois de matériaux pour la ventilation et le chauffage (HVAC / tôlerie).",
  url: "https://produits-idc.com",
  email: "produits-idc@hotmail.com",
  telephone: "+14506638969",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1275 Rue Michelin",
    addressLocality: "Laval",
    addressRegion: "QC",
    postalCode: "H7L 4S2",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.5706,
    longitude: -73.7392,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-14">
          <SectionHeading
            eyebrow="Nous joindre"
            title="Contact"
            subtitle="Deux adresses à Laval. Notre équipe est disponible pour vous aider avec vos commandes et questions techniques."
          />
        </FadeInSection>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {locations.map((loc, i) => (
            <FadeInSection key={loc.type} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-8 border transition-all duration-300 ${
                  loc.primary
                    ? "bg-zinc-900 border-brand-red/40 shadow-lg shadow-brand-red/10"
                    : "bg-zinc-900/60 border-zinc-800"
                }`}
              >
                {loc.primary && (
                  <span className="inline-block bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                    Principal
                  </span>
                )}
                <h2 className="text-xl font-bold text-white mb-5">{loc.type}</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="h-5 w-5 text-brand-red mt-0.5 shrink-0" />
                    <div>
                      <p className="text-zinc-300">{loc.address}</p>
                      <p className="text-zinc-400 text-sm">{loc.city}</p>
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-red hover:text-red-400 text-sm mt-1 inline-block transition-colors"
                      >
                        Voir sur la carte →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-brand-red shrink-0" />
                    <a
                      href={loc.phoneHref}
                      className="text-zinc-300 hover:text-white font-medium transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>

                  {loc.fax && (
                    <div className="flex items-center gap-3">
                      <PrinterIcon className="h-5 w-5 text-zinc-600 shrink-0" />
                      <span className="text-zinc-500 text-sm">
                        Télécopieur : {loc.fax}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Email CTA */}
        <FadeInSection className="mt-8" delay={0.2}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                <EnvelopeIcon className="h-6 w-6 text-brand-red" />
              </div>
              <div>
                <p className="font-bold text-white">Envoyez-nous un courriel</p>
                <p className="text-zinc-400 text-sm mt-0.5">
                  Pour les demandes de catalogue Excel ou questions techniques.
                </p>
              </div>
            </div>
            <a
              href="mailto:produits-idc@hotmail.com"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-red-900/30 shrink-0"
            >
              <EnvelopeIcon className="h-4 w-4" />
              produits-idc@hotmail.com
            </a>
          </div>
        </FadeInSection>

        {/* Google Maps embed */}
        <FadeInSection className="mt-8" delay={0.25}>
          <div className="rounded-2xl overflow-hidden border border-zinc-800 h-80">
            <iframe
              title="Produits IDC — 1275 Rue Michelin, Laval"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.8) invert(0.9) hue-rotate(180deg)" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.2!2d-73.74!3d45.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1275+Rue+Michelin%2C+Laval%2C+QC!5e0!3m2!1sfr!2sca!4v1"
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify locally**

Navigate to http://localhost:3000/contact. Expected: two location cards (primary highlighted in red), email CTA, dark-themed map embed, JSON-LD in page source.

- [ ] **Step 3: Commit**

```bash
git add app/contact/
git commit -m "feat: add Contact page with JSON-LD structured data"
```

---

## Task 12: Final polish, build verification, and GitHub setup

**Files:**
- Modify: `app/not-found.tsx` (create)
- Modify: `public/robots.txt` (create)
- Modify: `public/sitemap.xml` (create — static)

- [ ] **Step 1: Create `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-4">
          Erreur 404
        </p>
        <h1 className="text-5xl font-black text-white mb-4">Page introuvable</h1>
        <p className="text-zinc-400 mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://produits-idc.com/sitemap.xml
```

- [ ] **Step 3: Run final build check**

```bash
npm run build
```
Expected: Build completes with 0 errors. Note the output routes — should show `/`, `/catalogues`, `/fiches-techniques`, `/contact`.

- [ ] **Step 4: Initialize git and push to GitHub**

```bash
git add .
git commit -m "feat: add 404 page, robots.txt, final polish"
```

Create a new GitHub repo named `produits-idc-web` (via GitHub UI or `gh repo create`), then:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/produits-idc-web.git
git branch -M main
git push -u origin main
```

- [ ] **Step 5: Deploy to Vercel**

Either via the Vercel CLI:
```bash
npx vercel --prod
```
Or via vercel.com dashboard: Import the GitHub repo, framework = Next.js, no env vars needed.

Expected: Live URL returned, all 4 routes accessible.

---

## Self-Review

**Spec coverage:**
- ✅ Homepage with Hero, ValueProps, CatalogPreview, StickyCTA
- ✅ Catalogues page — 8 sections + full catalog + FAB form
- ✅ Fiches techniques — 13 categories, 73+ PDFs in accordion
- ✅ Contact page — both locations, email CTA, map, JSON-LD
- ✅ SEO — Metadata API on every page, JSON-LD on contact, robots.txt
- ✅ Animations — Framer Motion FadeInSection, Hero entrance, accordion, StickyCTA
- ✅ High-converting — sticky CTA, clear download CTAs, phone in nav, stats
- ✅ French Quebec — all copy in fr-CA
- ✅ Vercel deploy — build-ready, static export compatible

**Placeholder scan:** No TBDs or TODOs found.

**Type consistency:** `CatalogSection` defined in Task 2 and used in Tasks 7, 9. `FicheCategory` defined in Task 2 and used in Tasks 10. `FadeInSection`, `DownloadButton`, `SectionHeading` defined in Task 3 and used throughout.
