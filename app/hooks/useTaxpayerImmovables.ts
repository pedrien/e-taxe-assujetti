"use client";
import { useMemo } from "react";
import { useProfileData } from "./useProfileData";

export const useTaxpayerImmovables = (profileId?: string | null) => {
  const { immovables, loading, error } = useProfileData(profileId ?? null);

  // Mémoriser le formatage des immobiliers pour éviter les recalculs
  const formattedImmovables = useMemo(() => 
    immovables?.collection?.map((immovable, index) => ({
      id: immovable?.taxId ?? String(index),
      taxId: immovable?.taxId ?? "",
      headLine: immovable?.headLine ?? "",
      nature: immovable?.nature?.headLine ?? "",
      usage: immovable?.usage?.headLine ?? "",
      range: immovable?.range?.headLine ?? "",
      area: immovable?.area ? `${Number(immovable.area).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²` : "-",
    })) ?? [], 
    [immovables?.collection]
  );

  // Mémoriser le total count
  const totalCount = useMemo(() => 
    immovables?.paginationInfo?.totalCount ?? 0, 
    [immovables?.paginationInfo?.totalCount]
  );

  // Mémoriser le résultat final
  return useMemo(() => ({
    immovables: formattedImmovables,
    totalCount,
    loading,
    error,
  }), [formattedImmovables, totalCount, loading, error]);
};
