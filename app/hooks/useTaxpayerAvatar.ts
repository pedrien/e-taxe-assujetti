"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TAXPAYER_AVATAR, TaxpayerAvatarQuery } from "@/app/graphql/queries/getTaxpayerAvatar";

export const useTaxpayerAvatar = (payerId?: string | null) => {
  const { data, loading, error } = useQuery<TaxpayerAvatarQuery>(GET_TAXPAYER_AVATAR, {
    variables: { id: payerId as string },
    skip: !payerId,
    fetchPolicy: "cache-and-network",
  });

  // Priorité: file (data URI) si présent, sinon path si backend sert le fichier
  const fileDataUri = data?.taxpayer?.payerAvatar?.file ?? null;
  const path = data?.taxpayer?.payerAvatar?.path ?? null;

  const src = fileDataUri || (path ? path : null);

  return { src, loading, error };
};


