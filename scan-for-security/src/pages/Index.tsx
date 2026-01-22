import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { PhishingDetector } from '@/components/PhishingDetector';
import { PasswordAnalyzer } from '@/components/PasswordAnalyzer';
import { BruteForceEstimator } from '@/components/BruteForceEstimator';
import { SQLInjectionDetector } from '@/components/SQLInjectionDetector';
import { Shield } from 'lucide-react';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderSection = () => {
    switch (currentSection) {
      case 'phishing':
        return <PhishingDetector onBack={() => setCurrentSection('dashboard')} />;
      case 'password':
        return <PasswordAnalyzer onBack={() => setCurrentSection('dashboard')} />;
      case 'bruteforce':
        return <BruteForceEstimator onBack={() => setCurrentSection('dashboard')} />;
      case 'sql':
        return <SQLInjectionDetector onBack={() => setCurrentSection('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background matrix-bg">
      {/* Scan line overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        <div className="scan-line absolute inset-0 h-32 opacity-30" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-xl text-foreground">
                <span className="text-glow">Cyber</span>
                <span className="text-primary">Shield</span>
              </span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">SECURE CONNECTION</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="font-mono">
              © 2024 CyberShield • Educational Purpose Only
            </div>
            <div className="flex items-center gap-4 font-mono text-xs">
              <span>Detection & Prevention System</span>
              <span className="text-primary">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
