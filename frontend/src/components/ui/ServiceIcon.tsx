import {
  Code2,
  Film,
  Palette,
  Share2,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  film: Film,
  palette: Palette,
  share2: Share2,
  code2: Code2,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Film;
  return <Icon className={className} />;
}
