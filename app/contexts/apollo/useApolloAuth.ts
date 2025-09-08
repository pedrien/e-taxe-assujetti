"use client";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useApolloAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // Stocker le token d'accès dans localStorage pour Apollo
    if (session?.accessToken) {
      localStorage.setItem('accessToken', session.accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [session?.accessToken]);

  return {
    isAuthenticated: !!session?.accessToken,
    accessToken: session?.accessToken,
  };
};
