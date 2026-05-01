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
