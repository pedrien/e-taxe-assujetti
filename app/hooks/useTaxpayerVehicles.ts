"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TAXPAYER_VEHICLES, TaxpayerVehiclesQuery } from "@/app/graphql/queries/getTaxpayerVehicles";

export const useTaxpayerVehicles = (payerId?: string | null) => {
  // L'API attend un ID de type IRI: /api/payer/taxpayers/{id}
  const iriId = payerId
    ? payerId.startsWith("/api/")
      ? payerId
      : `/api/payer/taxpayers/${payerId}`
    : undefined;

  const { data, loading, error } = useQuery<TaxpayerVehiclesQuery>(GET_TAXPAYER_VEHICLES, {
    variables: { id: iriId as string },
    skip: !iriId,
    fetchPolicy: "cache-and-network",
  });

  // Debug logs
  const vehicles = data?.taxpayer?.vehicles?.collection ?? [];

  return { vehicles, loading, error };
};


