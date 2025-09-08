"use client";
import { useApolloAuth } from "./useApolloAuth";

interface ApolloAuthInitializerProps {
  children: React.ReactNode;
}

export const ApolloAuthInitializer = ({ children }: ApolloAuthInitializerProps) => {
  // Initialiser l'authentification Apollo
  useApolloAuth();
  
  return <>{children}</>;
};
