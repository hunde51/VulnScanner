import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ label, prefix = '>', className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-mono text-muted-foreground">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <span className="absolute left-4 font-mono text-primary text-glow">
            {prefix}
          </span>
          <input
            ref={ref}
            className={cn(
              "w-full pl-10 pr-4 py-3 font-mono text-sm",
              "bg-secondary/50 border border-border rounded-lg",
              "text-foreground placeholder:text-muted-foreground/50",
              "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50",
              "transition-all duration-200",
              className
            )}
            {...props}
          />
          <span className="absolute right-4 w-2 h-5 bg-primary terminal-cursor" />
        </div>
      </div>
    );
  }
);

TerminalInput.displayName = 'TerminalInput';
