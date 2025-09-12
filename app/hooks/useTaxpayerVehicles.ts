"use client";
import { useMemo } from "react";
import { useProfileData } from "./useProfileData";

export const useTaxpayerVehicles = (profileId?: string | null) => {
  const { vehicles, loading, error } = useProfileData(profileId ?? null);

  // Mémoriser le formatage des véhicules pour éviter les recalculs
  const formattedVehicles = useMemo(() => 
    vehicles?.collection?.map((vehicle, index) => ({
      id: vehicle?.taxId ?? String(index),
      taxId: vehicle?.taxId ?? "",
      registration: vehicle?.registration ?? "",
      chassisNumber: vehicle?.chassisNumber ?? "",
      circYear: vehicle?.circYear?.toString() ?? "",
      weight: vehicle?.weight ? `${vehicle.weight} Kg` : "",
      power: vehicle?.power ? `${vehicle.power} CH` : "",
      mark: vehicle?.mark?.headLine ?? "",
      model: vehicle?.model?.headLine ?? "",
      calender: vehicle?.calender?.headLine ?? "",
      color: vehicle?.color?.name ?? "",
    })) ?? [], 
    [vehicles?.collection]
  );

  // Mémoriser le total count
  const totalCount = useMemo(() => 
    vehicles?.paginationInfo?.totalCount ?? 0, 
    [vehicles?.paginationInfo?.totalCount]
  );

  // Mémoriser le résultat final
  return useMemo(() => ({
    vehicles: formattedVehicles,
    totalCount,
    loading,
    error,
  }), [formattedVehicles, totalCount, loading, error]);
};
