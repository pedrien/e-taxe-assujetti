"use client";
import { useProfileTaxpayers } from "./useProfileTaxpayers";

export const useProfileCounts = (profileId?: string | null) => {
  const { totalCounts, loading, error } = useProfileTaxpayers(profileId);

  return {
    counts: totalCounts,
    loading,
    error,
  };
};
