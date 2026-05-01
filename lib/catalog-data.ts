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
