import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded bg-brand-red flex items-center justify-center text-white font-black text-xs">
                IDC
              </span>
              <span className="font-bold text-white">Produits IDC</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Distributeur québécois de matériaux pour la ventilation et le
              chauffage. Au service des entrepreneurs depuis des décennies.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Magasin / Entrepôt
            </h3>
            <address className="not-italic text-zinc-400 text-sm space-y-1">
              <p>1275 Rue Michelin</p>
              <p>Laval (Québec) H7L 4S2</p>
              <a href="tel:+14506638969" className="block text-brand-red hover:text-red-400 font-medium mt-2">
                (450) 663-8969
              </a>
              <p className="text-zinc-500">Télécopieur : (450) 663-0575</p>
            </address>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Administration
            </h3>
            <address className="not-italic text-zinc-400 text-sm space-y-1 mb-6">
              <p>1419 Rue Michelin</p>
              <p>Laval (Québec) H7L 4S2</p>
              <a href="tel:+14509750909" className="block text-brand-red hover:text-red-400 font-medium mt-2">
                (450) 975-0909
              </a>
              <a href="mailto:produits-idc@hotmail.com" className="block text-zinc-400 hover:text-white mt-1 break-all">
                produits-idc@hotmail.com
              </a>
            </address>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/catalogues", label: "Catalogues" },
                { href: "/fiches-techniques", label: "Fiches techniques" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-zinc-500 hover:text-white text-sm transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-zinc-600 text-xs">
            © {year} Produits IDC. Tous droits réservés.
          </p>
          <p className="text-zinc-700 text-xs">
            Le prix de catalogue ne comprend pas l&apos;escompte. En cas de
            différence, le prix de l&apos;entrepôt prévaut.
          </p>
        </div>
      </div>
    </footer>
  );
}
