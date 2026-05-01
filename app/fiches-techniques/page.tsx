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
    <div className="min-h-screen pt-24 pb-20 bg-white">
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
