"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useProfileData } from "./useProfileData";

export const useTaxpayerVehicles = (profileId?: string | null) => {
  const { vehicles, loading, error, refetch } = useProfileData(profileId ?? null);
  
  // État pour gérer le chargement progressif
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Mémoriser le formatage des véhicules pour éviter les recalculs
  const formattedVehicles = useMemo(() => 
    vehicles?.collection?.map((vehicle, index) => ({
      id: vehicle?.taxId ?? String(index),
      taxId: vehicle?.taxId ?? "",
      registration: vehicle?.registration ?? "",
      chassisNumber: vehicle?.chassisNumber ?? "",
      circYear: vehicle?.circYear?.toString() ?? "",
      weight: vehicle?.weight ? `${vehicle.weight} Kg` : "",
      power: vehicle?.power ? `${vehicle.power} CH` : "",
      mark: vehicle?.mark?.headLine ?? "",
      model: vehicle?.model?.headLine ?? "",
      calender: vehicle?.calender?.headLine ?? "",
      color: vehicle?.color?.name ?? "",
    })) ?? [], 
    [vehicles?.collection]
  );

  // Mémoriser le total count
  const totalCount = useMemo(() => 
    vehicles?.paginationInfo?.totalCount ?? 0, 
    [vehicles?.paginationInfo?.totalCount]
  );

  // Gérer le chargement progressif
  useEffect(() => {
    if (vehicles && !loading) {
      // Délai pour permettre l'affichage de la page avant le chargement du tableau
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [vehicles, loading]);

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
    vehicles: formattedVehicles,
    totalCount,
    loading: isInitialLoad, // Utiliser l'état de chargement progressif
    error,
    refetch: handleRefresh,
    isInitialLoad, // Exposer l'état pour l'UI
  }), [formattedVehicles, totalCount, isInitialLoad, error, handleRefresh]);
};
