import { gql } from "@apollo/client";

export const GET_TAXPAYER_ACTIVITIES = gql`
  query getTaxpayerActivities($id: ID!) {
    taxpayer(id: $id) {
      id
      activities {
        paginationInfo {
          totalCount
        }
        collection {
          taxId
          activityDetails {
            activity {
              id
              headLine
              description
            }
            category {
              id
              headLine
            }
            dimension {
              id
              headLine
            }
            pretence {
              id
              headLine
            }
            wording {
              id
              headLine
            }
            marketplace {
              id
              headLine
            }
            manager {
              givenName
              familyName
              firstName
              birthDate
              birthPlace
              idCardNumber
              idCartType
              itExpatriate
              gender
              nif
            }
          }
        }
      }
    }
  }
`;

export type TaxpayerActivitiesQuery = {
  taxpayer?: {
    id: string;
    activities: {
      paginationInfo: {
        totalCount: number;
      };
      collection: Array<{
        taxId: string;
        activityDetails: {
          activity: {
            id: string;
            headLine: string;
            description: string;
          };
          category: {
            id: string;
            headLine: string;
          };
          dimension: {
            id: string;
            headLine: string;
          };
          pretence: {
            id: string;
            headLine: string;
          };
          wording: {
            id: string;
            headLine: string;
          };
          marketplace: {
            id: string;
            headLine: string;
          };
          manager: {
            givenName: string;
            familyName: string;
            firstName: string;
            birthDate: string;
            birthPlace: string;
            idCardNumber: string;
            idCartType: number;
            itExpatriate: boolean;
            gender: string;
            nif: string;
          };
        };
      }>;
    };
  };
};

// Constantes pour les types d'activité principale
export const ACTIVITY_TYPES = {
  IMPORTATEUR: 0,
  PRODUCTEUR_FABRIQUANT: 1,
  GROSSISTE: 2,
  DETAILLANT: 3,
} as const;

export type ActivityType = typeof ACTIVITY_TYPES[keyof typeof ACTIVITY_TYPES];

// Fonction utilitaire pour obtenir le libellé du type d'activité
export const getActivityTypeLabel = (type: ActivityType): string => {
  switch (type) {
    case ACTIVITY_TYPES.IMPORTATEUR:
      return "Importateur";
    case ACTIVITY_TYPES.PRODUCTEUR_FABRIQUANT:
      return "Producteur/Fabriquant";
    case ACTIVITY_TYPES.GROSSISTE:
      return "Grossiste";
    case ACTIVITY_TYPES.DETAILLANT:
      return "Détaillant";
    default:
      return "Inconnu";
  }
};
