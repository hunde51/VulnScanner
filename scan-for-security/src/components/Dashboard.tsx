import { SecurityCard } from './SecurityCard';
import { Link2, KeyRound, Timer, Database, Shield, Terminal } from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const tools = [
    {
      id: 'phishing',
      title: 'Phishing URL Detector',
      description: 'Analyze URLs for phishing indicators and malicious patterns',
      icon: <Link2 className="w-6 h-6" />,
    },
    {
      id: 'password',
      title: 'Password Strength Analyzer',
      description: 'Check password security and get improvement recommendations',
      icon: <KeyRound className="w-6 h-6" />,
    },
    {
      id: 'bruteforce',
      title: 'Brute-Force Time Estimator',
      description: 'Calculate how long it would take to crack a password',
      icon: <Timer className="w-6 h-6" />,
    },
    {
      id: 'sql',
      title: 'SQL Injection Detector',
      description: 'Identify SQL injection patterns in user input',
      icon: <Database className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl border border-primary/20 mb-4 pulse-glow">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          <span className="text-glow">Cyber</span>
          <span className="text-primary">Shield</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Educational cybersecurity detection and prevention system. 
          Analyze threats, strengthen defenses, and learn security best practices.
        </p>
        
        {/* Terminal-style status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border rounded-full">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-muted-foreground">
            system_status: <span className="text-success">ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Security Tools', value: '4', color: 'text-primary' },
          { label: 'Detection Types', value: '15+', color: 'text-accent' },
          { label: 'Attack Patterns', value: '50+', color: 'text-warning' },
          { label: 'Best Practices', value: '20+', color: 'text-success' },
        ].map((stat, index) => (
          <div 
            key={stat.label}
            className={`bg-card border border-border rounded-lg p-4 text-center animate-fade-in-delay-${index + 1}`}
          >
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Security Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <span className="text-primary font-mono">$</span>
          Security Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <div key={tool.id} className={`animate-fade-in-delay-${index + 1}`}>
              <SecurityCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                onClick={() => onNavigate(tool.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-mono text-lg text-foreground mb-4 flex items-center gap-2">
          <span className="text-primary">//</span>
          About This System
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div className="space-y-3">
            <p>
              <strong className="text-foreground">Purpose:</strong> This educational platform demonstrates 
              common cybersecurity threats and how to detect them.
            </p>
            <p>
              <strong className="text-foreground">Focus:</strong> Detection and prevention only. 
              This system does not perform actual attacks.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <strong className="text-foreground">Technologies:</strong> Built with React, TypeScript, 
              and custom security analysis algorithms.
            </p>
            <p>
              <strong className="text-foreground">Learning:</strong> Each tool provides detailed 
              explanations and actionable security recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
