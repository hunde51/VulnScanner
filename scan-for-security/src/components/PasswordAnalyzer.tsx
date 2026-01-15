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
