"use client";
import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import client from '@/lib/apollo-client';

interface ApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  );
};
