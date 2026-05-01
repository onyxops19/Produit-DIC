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
              <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-brand-red/40 transition-all duration-300 flex flex-col h-full">
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
