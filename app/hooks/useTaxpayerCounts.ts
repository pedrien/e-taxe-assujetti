"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TAXPAYER, TaxpayerCountsQuery } from "@/app/graphql/queries/getTaxpayer";

export const useTaxpayerCounts = (payerId?: string | null) => {
  const { data, loading, error } = useQuery<TaxpayerCountsQuery>(GET_TAXPAYER, {
    variables: { id: payerId as string },
    skip: !payerId,
    fetchPolicy: "cache-and-network",
  });

  const counts = {
    immovables: data?.taxpayer?.immovables?.paginationInfo?.totalCount ?? 0,
    vehicles: data?.taxpayer?.vehicles?.paginationInfo?.totalCount ?? 0,
    activities: data?.taxpayer?.activities?.paginationInfo?.totalCount ?? 0,
  };

  return { counts, loading, error };
};


