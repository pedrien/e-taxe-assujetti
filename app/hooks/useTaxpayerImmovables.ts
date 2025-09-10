"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TAXPAYER_IMMOVABLES, TaxpayerImmovablesQuery } from "@/app/graphql/queries/getTaxpayerImmovables";

export const useTaxpayerImmovables = (payerId?: string | null) => {
  // L'API attend un ID de type IRI: /api/payer/taxpayers/{id}
  const iriId = payerId
    ? payerId.startsWith("/api/")
      ? payerId
      : `/api/payer/taxpayers/${payerId}`
    : undefined;

  const { data, loading, error } = useQuery<TaxpayerImmovablesQuery>(
    GET_TAXPAYER_IMMOVABLES,
    {
      variables: { id: iriId as string },
      skip: !iriId,
      fetchPolicy: "cache-and-network",
    }
  );

  const immovables = data?.taxpayer?.immovables?.collection?.map((immovable, index) => ({
    id: immovable.taxId ?? String(index),
    taxId: immovable.taxId ?? "",
    headLine: immovable.headLine ?? "",
    nature: immovable.nature?.headLine ?? "",
    usage: immovable.usage?.headLine ?? "",
    range: immovable.range?.headLine ?? "",
    area: immovable.area ? `${Number(immovable.area).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²` : "-",
  })) ?? [];

  const totalCount = data?.taxpayer?.immovables?.paginationInfo?.totalCount ?? 0;

  return {
    immovables,
    totalCount,
    loading,
    error,
  };
};
