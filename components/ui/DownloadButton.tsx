"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface DownloadButtonProps {
  href: string;
  label?: string;
  size?: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function DownloadButton({
  href,
  label = "Télécharger le PDF",
  size,
  variant = "primary",
  className = "",
}: DownloadButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-lg font-semibold text-sm transition-all duration-200";
  const variants = {
    primary:
      "bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "border border-zinc-700 hover:border-brand-red text-zinc-300 hover:text-white px-4 py-2 hover:bg-zinc-800",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={`${base} ${variants[variant]} ${className}`}
    >
      <ArrowDownTrayIcon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      {size && <span className="text-xs opacity-60 font-normal">({size})</span>}
    </a>
  );
}
