import { useState } from 'react';
import { RiskBadge } from './RiskBadge';
import { Button } from '@/components/ui/button';
import { detectSQLInjection, SQLInjectionResult } from '@/lib/security-utils';
import { Database, AlertTriangle, Shield, ArrowLeft, Code } from 'lucide-react';

interface SQLInjectionDetectorProps {
  onBack: () => void;
}

export function SQLInjectionDetector({ onBack }: SQLInjectionDetectorProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SQLInjectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const analysisResult = detectSQLInjection(input);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const examplePayloads = [
    "' OR '1'='1",
    "admin'--",
    "1; DROP TABLE users",
    "' UNION SELECT * FROM passwords--",
    "Robert'); DROP TABLE Students;--",
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
        <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
          <Database className="w-8 h-8 text-destructive" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">SQL Injection Detector</h2>
          <p className="text-muted-foreground">Detect potential SQL injection patterns in user input</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-mono text-muted-foreground">
            Enter input to analyze
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 font-mono text-primary text-glow">$</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter user input to check for SQL injection patterns..."
              className="w-full pl-10 pr-4 py-3 font-mono text-sm min-h-[120px] bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground font-mono">Try examples:</span>
          {examplePayloads.map((payload, index) => (
            <button
              key={index}
              onClick={() => setInput(payload)}
              className="px-2 py-1 text-xs font-mono bg-secondary hover:bg-secondary/80 border border-border rounded transition-colors text-foreground"
            >
              {payload.length > 20 ? payload.substring(0, 20) + '...' : payload}
            </button>
          ))}
        </div>
        
        <Button
          onClick={handleAnalyze}
          disabled={!input.trim() || isAnalyzing}
          className="w-full font-mono"
          variant="destructive"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
              SCANNING...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              DETECT INJECTION
            </span>
          )}
        </Button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-lg text-foreground">Detection Result</h3>
              <RiskBadge level={result.riskLevel} />
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-lg border border-border mb-4">
              <div className="font-mono text-sm text-muted-foreground mb-1">Analyzed Input</div>
              <div className="font-mono text-foreground break-all">{result.input}</div>
            </div>

            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </div>

          {result.detectedPatterns.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-mono text-lg text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Detected Patterns
              </h3>
              <ul className="space-y-2">
                {result.detectedPatterns.map((pattern, index) => (
                  <li 
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded border ${
                      result.riskLevel === 'dangerous' 
                        ? 'bg-destructive/10 border-destructive/30' 
                        : result.riskLevel === 'suspicious'
                        ? 'bg-warning/10 border-warning/30'
                        : 'bg-secondary/30 border-border'
                    }`}
                  >
                    <span className={
                      result.riskLevel === 'dangerous' ? 'text-destructive' :
                      result.riskLevel === 'suspicious' ? 'text-warning' : 'text-muted-foreground'
                    }>⚠</span>
                    <span className="font-mono text-sm text-foreground">{pattern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-mono text-lg text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Prevention Best Practices
            </h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-secondary/30 rounded border border-border"
                >
                  <span className="text-success">✓</span>
                  <span className="font-mono text-sm text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
