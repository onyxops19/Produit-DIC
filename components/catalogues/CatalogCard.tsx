import DownloadButton from "@/components/ui/DownloadButton";
import CatalogIcon from "@/components/ui/CatalogIcon";
import type { CatalogSection } from "@/lib/catalog-data";

interface CatalogCardProps {
  section: CatalogSection;
}

export default function CatalogCard({ section }: CatalogCardProps) {
  return (
    <article className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Gradient top */}
      <div className={`bg-gradient-to-br ${section.gradient} px-5 pt-5 pb-6 flex items-start justify-between gap-3`}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
            {section.subtitle}
          </span>
          <h2 className="text-base font-bold text-white mt-1 leading-snug max-w-[160px]">
            {section.title}
          </h2>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <CatalogIcon name={section.icon} className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {section.description}
        </p>
        <DownloadButton
          href={section.pdfUrl}
          label="Télécharger"
          size={section.size}
          variant="primary"
          className="w-full justify-center"
        />
      </div>
    </article>
  );
}
