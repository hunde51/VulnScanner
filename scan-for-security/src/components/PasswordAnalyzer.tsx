import { useState } from 'react';
import { TerminalInput } from './TerminalInput';
import { RiskBadge } from './RiskBadge';
import { Button } from '@/components/ui/button';
import { analyzePassword, PasswordResult } from '@/lib/security-utils';
import { KeyRound, Eye, EyeOff, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';

interface PasswordAnalyzerProps {
  onBack: () => void;
}

export function PasswordAnalyzer({ onBack }: PasswordAnalyzerProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<PasswordResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!password) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const analysisResult = analyzePassword(password);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const criteriaItems = [
    { key: 'length', label: 'At least 12 characters', check: result?.criteria.length },
    { key: 'uppercase', label: 'Uppercase letters (A-Z)', check: result?.criteria.uppercase },
    { key: 'lowercase', label: 'Lowercase letters (a-z)', check: result?.criteria.lowercase },
    { key: 'numbers', label: 'Numbers (0-9)', check: result?.criteria.numbers },
    { key: 'special', label: 'Special characters (!@#$%)', check: result?.criteria.special },
    { key: 'noCommon', label: 'Not a common password', check: result?.criteria.noCommon },
  ];

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
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <KeyRound className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Password Strength Analyzer</h2>
          <p className="text-muted-foreground">Check how secure your password is</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="relative">
          <TerminalInput
            label="Enter password to analyze"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
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
          onClick={handleAnalyze}
          disabled={!password || isAnalyzing}
          className="w-full font-mono"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ANALYZING...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <KeyRound className="w-4 h-4" />
              ANALYZE PASSWORD
            </span>
          )}
        </Button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-lg text-foreground">Strength Analysis</h3>
              <RiskBadge level={result.strength} />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm font-mono mb-2">
                <span className="text-muted-foreground">Strength Score</span>
                <span className="text-foreground">{result.score}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    result.score >= 80 ? 'bg-primary' :
                    result.score >= 60 ? 'bg-success' :
                    result.score >= 40 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg border border-border flex items-center gap-4">
              <Clock className="w-8 h-8 text-accent" />
              <div>
                <div className="font-mono text-sm text-muted-foreground">Estimated crack time</div>
                <div className="text-xl font-bold text-foreground">{result.crackTime}</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-mono text-lg text-foreground mb-4">Password Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {criteriaItems.map((item) => (
                <div 
                  key={item.key}
                  className={`flex items-center gap-3 p-3 rounded border ${
                    item.check 
                      ? 'bg-success/10 border-success/30' 
                      : 'bg-destructive/10 border-destructive/30'
                  }`}
                >
                  {item.check ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                  <span className="font-mono text-sm text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-mono text-lg text-foreground mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-secondary/30 rounded border border-border"
                  >
                    <span className="text-primary">›</span>
                    <span className="font-mono text-sm text-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
