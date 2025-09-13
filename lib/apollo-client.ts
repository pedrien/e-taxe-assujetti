
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';

// URL de votre API GraphQL
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://api.main.etaxrdc.com/api/graphql',
});

// Link pour ajouter l'authentification
const authLink = setContext((_, prevContext) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const prevHeaders = (prevContext as { headers?: Record<string, string> })?.headers;
  
  return {
    headers: {
      ...(prevHeaders ?? {}),
      authorization: token ? `Bearer ${token}` : "",
      'Content-Type': 'application/json',
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

    if ('statusCode' in networkError && (networkError as Error & { statusCode: number }).statusCode === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }
  }
});

// Créer le client Apollo avec optimisations de cache avancées
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    // Optimisations de cache pour réduire les requêtes
    typePolicies: {
      Query: {
        fields: {
          profile: {
            // Cache pendant 5 minutes
            read(existing: unknown) {
              if (existing && typeof existing === 'object' && existing !== null && '__cacheTime' in existing && typeof existing.__cacheTime === 'number' && Date.now() - existing.__cacheTime < 300000) {
                return existing;
              }
              return undefined;
            },
            merge(existing: unknown, incoming: unknown) {
              if (typeof incoming === 'object' && incoming !== null) {
                return {
                  ...incoming,
                  __cacheTime: Date.now(),
                };
              }
              return incoming;
            },
          },
        },
      },
      // Optimiser les collections pour éviter les re-renders
      Payer: {
        fields: {
          activities: {
            merge: true,
          },
          immovables: {
            merge: true,
          },
          vehicles: {
            merge: true,
          },
        },
      },
    },
    // Optimisations de cache globales
    possibleTypes: {},
    dataIdFromObject: (object) => {
      // Utiliser des IDs stables pour le cache
      if (object.__typename && object.id) {
        return `${object.__typename}:${object.id}`;
      }
      return undefined;
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Utiliser le cache en priorité
      notifyOnNetworkStatusChange: false, // Réduire les re-renders
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
  // Optimisations de performance
  assumeImmutableResults: true, // Optimisation pour les données immutables
});

export default client;
