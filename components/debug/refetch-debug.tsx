import React from 'react';

interface RefetchDebugProps {
  refetch: unknown;
  componentName: string;
}

export const RefetchDebug: React.FC<RefetchDebugProps> = ({ refetch, componentName }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>{componentName}:</div>
      <div>refetch type: {typeof refetch}</div>
      <div>refetch exists: {refetch ? 'yes' : 'no'}</div>
      <div>is function: {typeof refetch === 'function' ? 'yes' : 'no'}</div>
    </div>
  );
};
