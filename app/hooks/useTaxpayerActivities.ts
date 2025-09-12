"use client";
import { useMemo } from "react";
import { useProfileData } from "./useProfileData";
import { getActivityTypeLabel } from "@/app/graphql/queries/getTaxpayerActivities";

export const useTaxpayerActivities = (profileId?: string | null) => {
  const { activities, loading, error } = useProfileData(profileId ?? null);

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
        activitePrinc: getActivityTypeLabel(parseInt(activityDetails?.category?.id ?? "0") as number),
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

  // Mémoriser le résultat final
  return useMemo(() => ({
    activities: formattedActivities,
    totalCount,
    loading,
    error,
  }), [formattedActivities, totalCount, loading, error]);
};
