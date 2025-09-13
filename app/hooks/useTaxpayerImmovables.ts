"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useProfileData } from "./useProfileData";

export const useTaxpayerImmovables = (profileId?: string | null) => {
  const { immovables, loading, error, refetch } = useProfileData(profileId ?? null);
  
  // État pour gérer le chargement progressif
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Mémoriser le formatage des immobiliers pour éviter les recalculs
  const formattedImmovables = useMemo(() => 
    immovables?.collection?.map((immovable, index) => ({
      id: immovable?.taxId ?? String(index),
      taxId: immovable?.taxId ?? "",
      headLine: immovable?.headLine ?? "",
      nature: immovable?.nature?.headLine ?? "",
      usage: immovable?.usage?.headLine ?? "",
      range: immovable?.range?.headLine ?? "",
      area: immovable?.area ? `${Number(immovable.area).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²` : "-",
    })) ?? [], 
    [immovables?.collection]
  );

  // Mémoriser le total count
  const totalCount = useMemo(() => 
    immovables?.paginationInfo?.totalCount ?? 0, 
    [immovables?.paginationInfo?.totalCount]
  );

  // Gérer le chargement progressif
  useEffect(() => {
    if (immovables && !loading) {
      // Délai pour permettre l'affichage de la page avant le chargement du tableau
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [immovables, loading]);

  // Fonction de rafraîchissement avec gestion du chargement
  const handleRefresh = useCallback(async () => {
    setIsInitialLoad(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
    } finally {
      setTimeout(() => setIsInitialLoad(false), 100);
    }
  }, [refetch]);

  // Mémoriser le résultat final
  return useMemo(() => ({
    immovables: formattedImmovables,
    totalCount,
    loading: isInitialLoad, // Utiliser l'état de chargement progressif
    error,
    refetch: handleRefresh,
    isInitialLoad, // Exposer l'état pour l'UI
  }), [formattedImmovables, totalCount, isInitialLoad, error, handleRefresh]);
};
