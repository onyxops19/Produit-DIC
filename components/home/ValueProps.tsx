import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  BoltIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const props = [
  {
    icon: BuildingStorefrontIcon,
    title: "Entrepôt sur place",
    body: "Venez chercher vos commandes directement au 1275 rue Michelin, Laval. Pas d'attente.",
    accent: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    icon: DocumentTextIcon,
    title: "Catalogue complet",
    body: "8 sections de produits et 73+ fiches techniques PDF disponibles en ligne en tout temps.",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: BoltIcon,
    title: "Commande rapide",
    body: "Formulaire FAB disponible pour soumettre vos commandes par télécopieur au (450) 663-0575.",
    accent: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    icon: UserGroupIcon,
    title: "Spécialiste B2B",
    body: "Nous servons exclusivement les entrepreneurs et ateliers de fabrication HVAC au Québec.",
    accent: "bg-red-50 text-brand-red border-red-100",
  },
];

export default function ValueProps() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionHeading
            eyebrow="Pourquoi Produits IDC"
            title="La référence HVAC au Québec"
            subtitle="Des décennies d'expérience au service des entrepreneurs en ventilation et chauffage."
            centered
          />
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map(({ icon: Icon, title, body, accent }, i) => (
            <FadeInSection key={title} delay={i * 0.1}>
              <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-base">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
