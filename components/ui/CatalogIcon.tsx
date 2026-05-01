import {
  SunIcon,
  Squares2X2Icon,
  BoltIcon,
  ShieldCheckIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: SunIcon,
  squares: Squares2X2Icon,
  bolt: BoltIcon,
  shield: ShieldCheckIcon,
  "arrows-out": ArrowsPointingOutIcon,
  "arrows-lr": ArrowsRightLeftIcon,
  tools: WrenchScrewdriverIcon,
  cube: CubeIcon,
};

export default function CatalogIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? CubeIcon;
  return <Icon className={className} />;
}
