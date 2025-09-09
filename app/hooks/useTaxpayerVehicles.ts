"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TAXPAYER_VEHICLES, TaxpayerVehiclesQuery } from "@/app/graphql/queries/getTaxpayerVehicles";

export const useTaxpayerVehicles = (payerId?: string | null) => {
  const { data, loading, error } = useQuery<TaxpayerVehiclesQuery>(GET_TAXPAYER_VEHICLES, {
    variables: { id: payerId as string },
    skip: !payerId,
    fetchPolicy: "cache-and-network",
  });

  const vehicles = data?.taxpayer?.vehicles?.collection ?? [];

  return { vehicles, loading, error };
};


