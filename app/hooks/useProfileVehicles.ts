"use client";
import { useProfileTaxpayers } from "./useProfileTaxpayers";

export const useProfileVehicles = (profileId?: string | null) => {
  const { allVehicles, totalCounts, loading, error } = useProfileTaxpayers(profileId);

  return {
    vehicles: allVehicles,
    totalCount: totalCounts.vehicles,
    loading,
    error,
  };
};
