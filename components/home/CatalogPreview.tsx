import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import DownloadButton from "@/components/ui/DownloadButton";
import CatalogIcon from "@/components/ui/CatalogIcon";
import { catalogSections } from "@/lib/catalog-data";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CatalogPreview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Nos produits"
            title="8 sections de catalogue"
            subtitle="Téléchargez les sections qui vous intéressent ou consultez le catalogue complet."
          />
          <Link
            href="/catalogues"
            className="inline-flex items-center gap-2 text-brand-red hover:text-brand-red-dark font-semibold text-sm shrink-0 transition-colors group"
          >
            Voir tous les catalogues
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {catalogSections.map((section, i) => (
            <FadeInSection key={section.id} delay={i * 0.06}>
              <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
                {/* Gradient header with icon */}
                <div className={`bg-gradient-to-br ${section.gradient} p-5 flex items-center justify-between`}>
                  <div className="text-white/90">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                      {section.subtitle}
                    </p>
                    <h3 className="font-bold text-white text-sm leading-snug max-w-[140px]">
                      {section.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <CatalogIcon name={section.icon} className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4">
                    {section.description}
                  </p>
                  <DownloadButton
                    href={section.pdfUrl}
                    label="Télécharger"
                    size={section.size}
                    variant="ghost"
                    className="w-full justify-center text-xs"
                  />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
