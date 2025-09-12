"use client";
import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_TAXPAYERS, ProfileTaxpayersQuery } from "@/app/graphql/queries/getProfileTaxpayers";

export const useProfileTaxpayers = (profileId?: string | null) => {
  // L'API attend un ID de type IRI: /api/payer/profiles/{id}
  const iriId = profileId
    ? profileId.startsWith("/api/")
      ? profileId
      : `/api/payer/profiles/${profileId}`
    : undefined;

  const { data, loading, error } = useQuery<ProfileTaxpayersQuery>(
    GET_PROFILE_TAXPAYERS,
    {
      variables: { id: iriId as string },
      skip: !iriId,
      fetchPolicy: "cache-and-network",
    }
  );

  const taxpayers = data?.profile?.payers?.collection ?? [];
  
  // Calculer les totaux pour tous les taxpayers
  const totalCounts = {
    immovables: taxpayers.reduce((total: number, taxpayer: any) => 
      total + (taxpayer.immovables?.paginationInfo?.totalCount ?? 0), 0),
    vehicles: taxpayers.reduce((total: number, taxpayer: any) => 
      total + (taxpayer.vehicles?.paginationInfo?.totalCount ?? 0), 0),
    activities: taxpayers.reduce((total: number, taxpayer: any) => 
      total + (taxpayer.activities?.paginationInfo?.totalCount ?? 0), 0),
  };

  // Récupérer tous les immovables de tous les taxpayers
  const allImmovables = taxpayers.flatMap((taxpayer: any) => 
    taxpayer.immovables?.collection?.map((immovable: any, index: number) => ({
      id: immovable.taxId ?? `${taxpayer.id}-${index}`,
      taxId: immovable.taxId ?? "",
      headLine: immovable.headLine ?? "",
      nature: immovable.nature?.headLine ?? "",
      area: immovable.area ? `${Number(immovable.area).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²` : "-",
      taxpayerId: taxpayer.id,
      payerProfile: taxpayer.payerProfile,
    })) ?? []
  );

  // Récupérer tous les véhicules de tous les taxpayers
  const allVehicles = taxpayers.flatMap((taxpayer: any) => 
    taxpayer.vehicles?.collection?.map((vehicle: any) => ({
      ...vehicle,
      taxpayerId: taxpayer.id,
      payerProfile: taxpayer.payerProfile,
    })) ?? []
  );

  return {
    taxpayers,
    allImmovables,
    allVehicles,
    totalCounts,
    loading,
    error,
  };
};
