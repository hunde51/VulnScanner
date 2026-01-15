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
