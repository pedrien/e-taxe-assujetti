
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';

// URL de votre API GraphQL
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

// Link pour ajouter l'authentification
const authLink = setContext((_, prevContext) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const prevHeaders = (prevContext as any)?.headers as Record<string, string> | undefined;
  return {
    headers: {
      ...(prevHeaders ?? {}),
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Link pour gérer les erreurs
const errorLink = onError((params) => {
  const { graphQLErrors, networkError } = params as unknown as {
    graphQLErrors?: readonly GraphQLError[];
    networkError?: Error & { statusCode?: number };
  };

  if (graphQLErrors && graphQLErrors.length > 0) {
    graphQLErrors.forEach((error) => {
      const { message, locations, path } = error;
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);

    if ('statusCode' in networkError && (networkError as any).statusCode === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }
  }
});

// Créer le client Apollo
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;
