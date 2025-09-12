"use client";
import { useProfileData } from "./useProfileData";

export const useTaxpayerAvatar = (profileId?: string | null) => {
  const { payerAvatar, loading, error } = useProfileData(profileId ?? null);

  return { src: payerAvatar, loading, error };
};


