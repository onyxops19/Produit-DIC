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
