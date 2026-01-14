import { useState } from 'react';
import { TerminalInput } from './TerminalInput';
import { Button } from '@/components/ui/button';
import { estimateCrackTime } from '@/lib/security-utils';
import { Timer, Eye, EyeOff, ArrowLeft, Cpu, Zap } from 'lucide-react';

interface BruteForceEstimatorProps {
  onBack: () => void;
}

export function BruteForceEstimator({ onBack }: BruteForceEstimatorProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<{
    crackTime: string;
    charsetSize: number;
    combinations: string;
    length: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    if (!password) return;
    
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charsetSize += 32;
    if (charsetSize === 0) charsetSize = 26;

    const combinations = Math.pow(charsetSize, password.length);
    
    setResult({
      crackTime: estimateCrackTime(password),
      charsetSize,
      combinations: combinations.toExponential(2),
      length: password.length,
    });
    setIsCalculating(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-mono text-sm">Back to Dashboard</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
          <Timer className="w-8 h-8 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Brute-Force Time Estimator</h2>
          <p className="text-muted-foreground">See how long it would take to crack your password</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="relative">
          <TerminalInput
            label="Enter password to estimate"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-12 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        <Button
          onClick={handleCalculate}
          disabled={!password || isCalculating}
          className="w-full font-mono"
          variant="secondary"
        >
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
              CALCULATING...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              ESTIMATE CRACK TIME
            </span>
          )}
        </Button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-card border border-accent/30 rounded-lg p-6 card-glow">
            <div className="text-center">
              <div className="font-mono text-sm text-muted-foreground mb-2">
                Estimated time to crack
              </div>
              <div className="text-4xl md:text-5xl font-bold text-accent text-glow-accent mb-4">
                {result.crackTime}
              </div>
              <div className="text-sm text-muted-foreground">
                Using modern GPU (10 billion guesses/second)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-sm text-muted-foreground">Password Length</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{result.length}</div>
              <div className="text-xs text-muted-foreground mt-1">characters</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="text-primary font-mono text-sm">Aa1</span>
                </div>
                <span className="font-mono text-sm text-muted-foreground">Character Set</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{result.charsetSize}</div>
              <div className="text-xs text-muted-foreground mt-1">possible characters</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="text-primary font-mono text-sm">∑</span>
                </div>
                <span className="font-mono text-sm text-muted-foreground">Combinations</span>
              </div>
              <div className="text-2xl font-bold text-foreground font-mono">{result.combinations}</div>
              <div className="text-xs text-muted-foreground mt-1">possible passwords</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-mono text-lg text-foreground mb-4">How It Works</h3>
            <div className="space-y-3 text-sm text-muted-foreground font-mono">
              <p>• The estimation assumes a brute-force attack checking all possible combinations</p>
              <p>• Modern GPUs can test approximately 10 billion password hashes per second</p>
              <p>• Longer passwords with more character variety exponentially increase crack time</p>
              <p>• Adding just one character multiplies the combinations by the charset size</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
