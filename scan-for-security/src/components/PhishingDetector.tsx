import { useState } from 'react';
import { TerminalInput } from './TerminalInput';
import { RiskBadge } from './RiskBadge';
import { Button } from '@/components/ui/button';
import { analyzePhishingURL, PhishingResult } from '@/lib/security-utils';
import { Link2, AlertTriangle, CheckCircle, Shield, ArrowLeft } from 'lucide-react';

interface PhishingDetectorProps {
  onBack: () => void;
}

export function PhishingDetector({ onBack }: PhishingDetectorProps) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysisResult = analyzePhishingURL(url);
    setResult(analysisResult);
    setIsAnalyzing(false);
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
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <Link2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Phishing URL Detector</h2>
          <p className="text-muted-foreground">Analyze URLs for potential phishing indicators</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <TerminalInput
          label="Enter URL to analyze"
          placeholder="https://example.com/login"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        
        <Button
          onClick={handleAnalyze}
          disabled={!url.trim() || isAnalyzing}
          className="w-full font-mono"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ANALYZING...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              SCAN URL
            </span>
          )}
        </Button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-lg text-foreground">Analysis Result</h3>
              <RiskBadge level={result.riskLevel} />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="font-mono text-sm text-muted-foreground mb-1">Analyzed URL</div>
                <div className="font-mono text-foreground break-all">{result.url}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="font-mono text-sm text-muted-foreground mb-1">Risk Score</div>
                  <div className="text-3xl font-bold text-foreground">{result.riskScore}%</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="font-mono text-sm text-muted-foreground mb-1">Indicators Found</div>
                  <div className="text-3xl font-bold text-foreground">{result.indicators.length}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-mono text-lg text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Detected Indicators
            </h3>
            <ul className="space-y-2">
              {result.indicators.map((indicator, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-secondary/30 rounded border border-border"
                >
                  <span className="text-warning">›</span>
                  <span className="font-mono text-sm text-foreground">{indicator}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-mono text-lg text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Security Recommendations
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
