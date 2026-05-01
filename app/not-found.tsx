import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-4">
          Erreur 404
        </p>
        <h1 className="text-5xl font-black text-white mb-4">Page introuvable</h1>
        <p className="text-zinc-400 mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
