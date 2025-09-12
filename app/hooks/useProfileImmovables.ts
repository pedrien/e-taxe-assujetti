"use client";
import { useProfileTaxpayers } from "./useProfileTaxpayers";

export const useProfileImmovables = (profileId?: string | null) => {
  const { allImmovables, totalCounts, loading, error } = useProfileTaxpayers(profileId);

  return {
    immovables: allImmovables,
    totalCount: totalCounts.immovables,
    loading,
    error,
  };
};
