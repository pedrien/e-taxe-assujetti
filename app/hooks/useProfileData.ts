import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
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
    activityDetails: any; // Type Iterable! - sera parsé côté client
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
      fetchPolicy: 'cache-and-network', // Utiliser le cache ET le réseau
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true, // Notifier les changements de statut
      returnPartialData: true,
      // Rafraîchissement automatique toutes les 30 secondes
      pollInterval: 30000,
    }
  );

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
    refetch, // Exposer la fonction de rafraîchissement manuel
  }), [
    profileId,
    iriProfileId,
    loading,
    error,
    profile,
    firstPayer,
    parsedPayerProfile,
    refetch
  ]);

  return result;
};
