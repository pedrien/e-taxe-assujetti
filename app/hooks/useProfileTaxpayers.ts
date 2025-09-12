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
    immovables: taxpayers.reduce((total: number, taxpayer: unknown) => 
      total + ((taxpayer as { immovables?: { paginationInfo?: { totalCount?: number } } }).immovables?.paginationInfo?.totalCount ?? 0), 0),
    vehicles: taxpayers.reduce((total: number, taxpayer: unknown) => 
      total + ((taxpayer as { vehicles?: { paginationInfo?: { totalCount?: number } } }).vehicles?.paginationInfo?.totalCount ?? 0), 0),
    activities: taxpayers.reduce((total: number, taxpayer: unknown) => 
      total + ((taxpayer as { activities?: { paginationInfo?: { totalCount?: number } } }).activities?.paginationInfo?.totalCount ?? 0), 0),
  };

  // Récupérer tous les immovables de tous les taxpayers
  const allImmovables = taxpayers.flatMap((taxpayer: unknown) => {
    const t = taxpayer as { id: string; immovables?: { collection?: unknown[] }; payerProfile: unknown };
    return t.immovables?.collection?.map((immovable: unknown, index: number) => {
      const i = immovable as { taxId?: string; headLine?: string; nature?: { headLine?: string }; area?: string | number };
      return {
        id: i.taxId ?? `${t.id}-${index}`,
        taxId: i.taxId ?? "",
        headLine: i.headLine ?? "",
        nature: i.nature?.headLine ?? "",
        area: i.area ? `${Number(i.area).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²` : "-",
        taxpayerId: t.id,
        payerProfile: t.payerProfile,
      };
    }) ?? [];
  });

  // Récupérer tous les véhicules de tous les taxpayers
  const allVehicles = taxpayers.flatMap((taxpayer: unknown) => {
    const t = taxpayer as { id: string; vehicles?: { collection?: unknown[] }; payerProfile: unknown };
    return t.vehicles?.collection?.map((vehicle: unknown) => ({
      ...vehicle,
      taxpayerId: t.id,
      payerProfile: t.payerProfile,
    })) ?? [];
  });

  return {
    taxpayers,
    allImmovables,
    allVehicles,
    totalCounts,
    loading,
    error,
  };
};
