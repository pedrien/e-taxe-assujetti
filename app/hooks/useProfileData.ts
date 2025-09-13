import { useQuery } from '@apollo/client/react';
import { useMemo, useEffect, useRef, useCallback } from 'react';
import { GET_PROFILE_TAXPAYERS } from '../graphql/queries/getProfileTaxpayers';

export interface PayerProfile {
  givenName: string;
  familyName: string;
  firstName: string;
  birthDate: string;
  birthPlace: string;
  idCardNumber: string;
  idCartType: number;
  itExpatriate: boolean;
  gender: string;
  nif: string;
}

export interface Activity {
  paginationInfo: {
    totalCount: number;
  };
  collection: Array<{
    taxId: string;
    activityDetails: unknown; // Type Iterable! - sera parsé côté client
  }>;
}

export interface Immovable {
  taxId: string;
  headLine: string;
  nature: {
    headLine: string;
  };
  usage: {
    headLine: string;
  };
  range: {
    headLine: string;
  };
  area: string;
}

export interface Vehicle {
  taxId: string;
  registration?: string;
  chassisNumber?: string;
  circYear?: number;
  weight?: number;
  power?: number;
  mark?: {
    headLine: string;
  };
  model?: {
    headLine: string;
  };
  calender?: {
    headLine: string;
  };
  color?: {
    name: string;
  };
}

export interface Payer {
  id: string;
  payerProfile: string | PayerProfile; // Peut être soit une chaîne JSON soit un objet
  activities: Activity;
  immovables: {
    paginationInfo: {
      totalCount: number;
    };
    collection: Immovable[];
  };
  vehicles: {
    paginationInfo: {
      totalCount: number;
    };
    collection: Vehicle[];
  };
  payerAvatar: string;
}

export interface ProfileData {
  id: string;
  payers: {
    collection: Payer[];
  };
}

export const useProfileData = (profileId: string | null) => {
  // Ref pour tracker si c'est la première visite
  const isFirstVisit = useRef(true);
  
  // Convertir l'ID brut en IRI avec useMemo pour éviter les recalculs
  const iriProfileId = useMemo(() => 
    profileId ? `/api/payer/profiles/${profileId}` : null, 
    [profileId]
  );

  const { data, loading, error, refetch } = useQuery<{ profile: ProfileData }>(
    GET_PROFILE_TAXPAYERS,
    {
      variables: { id: iriProfileId },
      skip: !iriProfileId,
      fetchPolicy: 'cache-first', // Utiliser le cache en priorité
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: false, // Désactiver les notifications de changement de statut
      returnPartialData: true,
      // Désactiver le rafraîchissement automatique pour éviter les rechargements constants
      // pollInterval: 30000,
    }
  );

  // Actualisation automatique à la première visite
  useEffect(() => {
    if (isFirstVisit.current && iriProfileId && !loading) {
      isFirstVisit.current = false;
      // Délai pour permettre l'affichage initial, puis actualisation
      const timer = setTimeout(() => {
        refetch();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [iriProfileId, loading, refetch]);

  // Fonction de rafraîchissement optimisée avec debouncing
  const optimizedRefetch = useCallback(async () => {
    try {
      if (refetch && typeof refetch === 'function') {
        await refetch();
      } else {
        console.warn("Fonction refetch non disponible");
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des données:", error);
    }
  }, [refetch]);

  // Mémoriser les calculs coûteux
  const profile = useMemo(() => data?.profile, [data?.profile]);
  const firstPayer = useMemo(() => profile?.payers?.collection?.[0], [profile?.payers?.collection]);
  
  // Mémoriser le parsing du payerProfile
  const parsedPayerProfile = useMemo(() => {
    if (!firstPayer?.payerProfile) return null;
    
    try {
      if (typeof firstPayer.payerProfile === 'object') {
        return firstPayer.payerProfile as PayerProfile;
      } else {
        return JSON.parse(firstPayer.payerProfile);
      }
    } catch (e) {
      console.error('Error parsing payerProfile:', e, 'Value:', firstPayer.payerProfile);
      return null;
    }
  }, [firstPayer?.payerProfile]);

  // Fonction de fallback si refetch n'est pas disponible (commentée car non utilisée)
  // const fallbackRefetch = useCallback(async () => {
  //   console.warn("Fonction refetch non disponible, rechargement de la page...");
  //   if (typeof window !== 'undefined') {
  //     window.location.reload();
  //   }
  // }, []);

  // Mémoriser le résultat final
  const result = useMemo(() => ({
    profileId,
    iriProfileId,
    loading,
    error,
    profile,
    firstPayer,
    payerId: firstPayer?.id,
    payerProfile: parsedPayerProfile,
    activities: firstPayer?.activities,
    immovables: firstPayer?.immovables,
    vehicles: firstPayer?.vehicles,
    payerAvatar: firstPayer?.payerAvatar,
    refetch: optimizedRefetch, // Utiliser la fonction optimisée
  }), [
    profileId,
    iriProfileId,
    loading,
    error,
    profile,
    firstPayer,
    parsedPayerProfile,
    optimizedRefetch
  ]);

  return result;
};
