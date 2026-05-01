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
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="Catalogues PDF"
            title="Nos sections de produits"
            subtitle="Téléchargez les sections qui vous intéressent. Le catalogue Excel complet est aussi disponible sur demande par courriel."
          />
        </FadeInSection>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {catalogSections.map((section, i) => (
            <FadeInSection key={section.id} delay={i * 0.07}>
              <CatalogCard section={section} />
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="mt-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                <DocumentArrowDownIcon className="h-6 w-6 text-brand-red" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Catalogue complet</h3>
                <p className="text-slate-500 text-sm mt-1">
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

        <FadeInSection className="mt-6" delay={0.1}>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Formulaire de fabrication (FAB)</h3>
              <p className="text-slate-500 text-sm mt-1">
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

        <FadeInSection className="mt-8 text-center" delay={0.15}>
          <p className="text-slate-500 text-sm">
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
          <p className="text-slate-500 text-xs mt-2">
            * Le prix de catalogue ne comprend pas l&apos;escompte. En cas de
            différence, le prix de l&apos;entrepôt prévaut.
          </p>
        </FadeInSection>
      </div>
    </div>
  );
}
