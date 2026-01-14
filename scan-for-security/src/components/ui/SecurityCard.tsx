import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SecurityCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SecurityCard({ title, description, icon, onClick, className }: SecurityCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full p-6 text-left",
        "bg-card border border-border rounded-lg",
        "transition-all duration-300 ease-out",
        "hover:border-primary/50 hover:card-glow",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        className
      )}
    >
      {/* Scan line effect on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="scan-line absolute inset-0 h-20" />
      </div>
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors">
          <div className="text-primary group-hover:text-glow transition-all">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
