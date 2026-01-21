import { cn } from '@/lib/utils';

type RiskLevel = 'safe' | 'suspicious' | 'high-risk' | 'dangerous' | 'weak' | 'medium' | 'strong' | 'very-strong';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const levelConfig: Record<RiskLevel, { label: string; color: string; bgColor: string; glow: string }> = {
  'safe': {
    label: 'SAFE',
    color: 'text-success',
    bgColor: 'bg-success/10 border-success/30',
    glow: 'shadow-[0_0_10px_hsl(var(--success)/0.3)]',
  },
  'suspicious': {
    label: 'SUSPICIOUS',
    color: 'text-warning',
    bgColor: 'bg-warning/10 border-warning/30',
    glow: 'shadow-[0_0_10px_hsl(var(--warning)/0.3)]',
  },
  'high-risk': {
    label: 'HIGH RISK',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10 border-destructive/30',
    glow: 'shadow-[0_0_10px_hsl(var(--destructive)/0.3)]',
  },
  'dangerous': {
    label: 'DANGEROUS',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10 border-destructive/30',
    glow: 'shadow-[0_0_10px_hsl(var(--destructive)/0.3)]',
  },
  'weak': {
    label: 'WEAK',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10 border-destructive/30',
    glow: 'shadow-[0_0_10px_hsl(var(--destructive)/0.3)]',
  },
  'medium': {
    label: 'MEDIUM',
    color: 'text-warning',
    bgColor: 'bg-warning/10 border-warning/30',
    glow: 'shadow-[0_0_10px_hsl(var(--warning)/0.3)]',
  },
  'strong': {
    label: 'STRONG',
    color: 'text-success',
    bgColor: 'bg-success/10 border-success/30',
    glow: 'shadow-[0_0_10px_hsl(var(--success)/0.3)]',
  },
  'very-strong': {
    label: 'VERY STRONG',
    color: 'text-primary',
    bgColor: 'bg-primary/10 border-primary/30',
    glow: 'shadow-[0_0_10px_hsl(var(--primary)/0.3)]',
  },
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const config = levelConfig[level];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 font-mono text-xs font-semibold tracking-wider",
        "border rounded-full",
        config.bgColor,
        config.color,
        config.glow,
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
      {config.label}
    </span>
  );
}
