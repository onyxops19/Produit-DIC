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
