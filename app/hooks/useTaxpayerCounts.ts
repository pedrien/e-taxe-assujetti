"use client";
import { useProfileData } from "./useProfileData";

export const useTaxpayerCounts = (profileId?: string | null) => {
  const { immovables, vehicles, activities, loading, error } = useProfileData(profileId ?? null);

  const counts = {
    immovables: immovables?.paginationInfo?.totalCount ?? 0,
    vehicles: vehicles?.paginationInfo?.totalCount ?? 0,
    activities: activities?.paginationInfo?.totalCount ?? 0,
  };

  return { counts, loading, error };
};


