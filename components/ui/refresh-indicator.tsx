import React from 'react';

interface RefreshIndicatorProps {
  isVisible: boolean;
}

export const RefreshIndicator: React.FC<RefreshIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
        <p className="text-xs text-gray-600 font-medium">Mise a jour...</p>
      </div>
    </div>
  );
};
