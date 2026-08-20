import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = usePortfolio();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-obsidian-900 border border-gold-500/50 text-stone-100 text-xs font-semibold shadow-2xl backdrop-blur-xl">
        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
