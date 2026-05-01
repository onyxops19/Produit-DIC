import DownloadButton from "@/components/ui/DownloadButton";
import type { CatalogSection } from "@/lib/catalog-data";

interface CatalogCardProps {
  section: CatalogSection;
}

export default function CatalogCard({ section }: CatalogCardProps) {
  return (
    <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-brand-red/40 hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
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
