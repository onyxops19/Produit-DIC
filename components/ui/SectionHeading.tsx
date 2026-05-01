interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <p className="text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-extrabold text-slate-900 leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-500 text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
