import type { Metadata } from "next";
import FadeInSection from "@/components/ui/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Produits IDC à Laval (Québec). Deux adresses sur la rue Michelin. Téléphone, télécopieur et courriel disponibles.",
};

const locations = [
  {
    type: "Magasin / Entrepôt",
    address: "1275 Rue Michelin",
    city: "Laval (Québec) H7L 4S2",
    phone: "(450) 663-8969",
    phoneHref: "tel:+14506638969",
    fax: "(450) 663-0575",
    mapUrl: "https://www.google.com/maps/search/1275+Rue+Michelin+Laval+Quebec",
    primary: true,
  },
  {
    type: "Administration",
    address: "1419 Rue Michelin",
    city: "Laval (Québec) H7L 4S2",
    phone: "(450) 975-0909",
    phoneHref: "tel:+14509750909",
    fax: null,
    mapUrl: "https://www.google.com/maps/search/1419+Rue+Michelin+Laval+Quebec",
    primary: false,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: "Produits IDC",
  description:
    "Distributeur québécois de matériaux pour la ventilation et le chauffage (HVAC / tôlerie).",
  url: "https://produits-idc.com",
  email: "produits-idc@hotmail.com",
  telephone: "+14506638969",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1275 Rue Michelin",
    addressLocality: "Laval",
    addressRegion: "QC",
    postalCode: "H7L 4S2",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.5706,
    longitude: -73.7392,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-14">
          <SectionHeading
            eyebrow="Nous joindre"
            title="Contact"
            subtitle="Deux adresses à Laval. Notre équipe est disponible pour vous aider avec vos commandes et questions techniques."
          />
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {locations.map((loc, i) => (
            <FadeInSection key={loc.type} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-8 border transition-all duration-300 ${
                  loc.primary
                    ? "bg-white border-brand-red/30 shadow-lg shadow-red-50"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                {loc.primary && (
                  <span className="inline-block bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                    Principal
                  </span>
                )}
                <h2 className="text-xl font-bold text-slate-900 mb-5">{loc.type}</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="h-5 w-5 text-brand-red mt-0.5 shrink-0" />
                    <div>
                      <p className="text-slate-800">{loc.address}</p>
                      <p className="text-slate-500 text-sm">{loc.city}</p>
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-red hover:text-brand-red-dark text-sm mt-1 inline-block transition-colors font-medium"
                      >
                        Voir sur la carte →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-brand-red shrink-0" />
                    <a
                      href={loc.phoneHref}
                      className="text-slate-700 hover:text-slate-900 font-semibold transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>

                  {loc.fax && (
                    <div className="flex items-center gap-3">
                      <PrinterIcon className="h-5 w-5 text-slate-400 shrink-0" />
                      <span className="text-slate-500 text-sm">
                        Télécopieur : {loc.fax}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="mt-8" delay={0.2}>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                <EnvelopeIcon className="h-6 w-6 text-brand-red" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Envoyez-nous un courriel</p>
                <p className="text-slate-500 text-sm mt-0.5">
                  Pour les demandes de catalogue Excel ou questions techniques.
                </p>
              </div>
            </div>
            <a
              href="mailto:produits-idc@hotmail.com"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shrink-0"
            >
              <EnvelopeIcon className="h-4 w-4" />
              produits-idc@hotmail.com
            </a>
          </div>
        </FadeInSection>

        <FadeInSection className="mt-8" delay={0.25}>
          <div className="rounded-2xl overflow-hidden border border-slate-200 h-80 shadow-sm">
            <iframe
              title="Produits IDC — 1275 Rue Michelin, Laval"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3)" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.2!2d-73.74!3d45.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1275+Rue+Michelin%2C+Laval%2C+QC!5e0!3m2!1sfr!2sca!4v1"
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
