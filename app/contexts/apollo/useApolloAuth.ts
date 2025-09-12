"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useMemo } from 'react';

export const useApolloAuth = () => {
  const { data: session } = useSession();
  const previousTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const currentToken = session?.accessToken ?? null;
    
    // Éviter les mises à jour inutiles du localStorage
    if (currentToken !== previousTokenRef.current) {
      if (currentToken) {
        localStorage.setItem('accessToken', currentToken);
      } else {
        localStorage.removeItem('accessToken');
      }
      previousTokenRef.current = currentToken;
    }
  }, [session?.accessToken]);

  // Mémoriser le résultat pour éviter les re-renders
  return useMemo(() => ({
    isAuthenticated: !!session?.accessToken,
    accessToken: session?.accessToken,
  }), [session?.accessToken]);
};
