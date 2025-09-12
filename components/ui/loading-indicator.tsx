import React from 'react';
import { Card } from '@/components/ui/card';

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = "Chargement...", 
  className = "min-h-[300px]" 
}) => {
  return (
    <Card className={`rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard p-6 ${className} flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primaryColor border-t-transparent"></div>
        <p className="text-colorMuted text-sm">{message}</p>
      </div>
    </Card>
  );
};

// Composant pour les indicateurs de chargement en arrière-plan
export const BackgroundLoadingIndicator: React.FC<{ message?: string }> = ({ 
  message = "Mise à jour..." 
}) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border">
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primaryColor border-t-transparent"></div>
        <p className="text-xs text-colorMuted">{message}</p>
      </div>
    </div>
  );
};
