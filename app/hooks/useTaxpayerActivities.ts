"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useProfileData } from "./useProfileData";
import { getActivityTypeLabel } from "@/app/graphql/queries/getTaxpayerActivities";

export const useTaxpayerActivities = (profileId?: string | null) => {
  const { activities, loading, error, refetch } = useProfileData(profileId ?? null);
  
  // État pour gérer le chargement progressif
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Mémoriser le formatage des activités pour éviter les recalculs
  const formattedActivities = useMemo(() => {
    if (!activities?.collection) return [];
    
    return activities.collection.map((activity, index) => {
      // Parser activityDetails qui est de type Iterable!
      let activityDetails = null;
      try {
        if (typeof activity?.activityDetails === 'string') {
          activityDetails = JSON.parse(activity.activityDetails);
        } else if (typeof activity?.activityDetails === 'object') {
          activityDetails = activity.activityDetails;
        }
      } catch (e) {
        console.warn('Erreur lors du parsing de activityDetails:', e);
      }

      return {
        id: activity?.taxId ?? String(index),
        taxId: activity?.taxId ?? "",
        typeActive: activityDetails?.activity?.headLine ?? "",
        description: activityDetails?.activity?.description ?? "",
        dimension: activityDetails?.dimension?.headLine ?? "",
        activitePrinc: getActivityTypeLabel(parseInt(activityDetails?.category?.id ?? "0") as 0 | 1 | 2 | 3),
        nature: activityDetails?.category?.headLine ?? "",
        denomination: activityDetails?.activity?.description ?? "",
        lieu: activityDetails?.pretence?.headLine ?? "",
        marketplace: activityDetails?.marketplace?.headLine ?? "",
        manager: {
          givenName: activityDetails?.manager?.givenName ?? "",
          familyName: activityDetails?.manager?.familyName ?? "",
          firstName: activityDetails?.manager?.firstName ?? "",
          birthDate: activityDetails?.manager?.birthDate ?? "",
          birthPlace: activityDetails?.manager?.birthPlace ?? "",
          idCardNumber: activityDetails?.manager?.idCardNumber ?? "",
          idCartType: activityDetails?.manager?.idCartType ?? 0,
          itExpatriate: activityDetails?.manager?.itExpatriate ?? false,
          gender: activityDetails?.manager?.gender ?? "",
          nif: activityDetails?.manager?.nif ?? "",
        },
      };
    });
  }, [activities?.collection]);

  // Mémoriser le total count
  const totalCount = useMemo(() => 
    activities?.paginationInfo?.totalCount ?? 0, 
    [activities?.paginationInfo?.totalCount]
  );

  // Gérer le chargement progressif
  useEffect(() => {
    if (activities && !loading) {
      // Délai pour permettre l'affichage de la page avant le chargement du tableau
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activities, loading]);

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
    activities: formattedActivities,
    totalCount,
    loading: isInitialLoad, // Utiliser l'état de chargement progressif
    error,
    refetch: handleRefresh,
    isInitialLoad, // Exposer l'état pour l'UI
  }), [formattedActivities, totalCount, isInitialLoad, error, handleRefresh]);
};
