import { gql } from "@apollo/client";

export const GET_TAXPAYER_VEHICLES = gql`
  query getTaxpayerVehicles($id: ID!) {
    taxpayer(id: $id) {
      id
      vehicles {
        collection {
          registration
          chassisNumber
          circYear
          weight
          power
          mark { headLine }
          model { headLine }
          calender { headLine }
          color { name }
        }
      }
    }
  }
`;

export type TaxpayerVehiclesQuery = {
  taxpayer?: {
    id: string;
    vehicles?: {
      collection?: Array<{
        registration?: string | null;
        chassisNumber?: string | null;
        circYear?: number | string | null;
        weight?: number | string | null;
        power?: number | string | null;
        mark?: { headLine?: string | null } | null;
        model?: { headLine?: string | null } | null;
        calender?: { headLine?: string | null } | null;
        color?: { name?: string | null } | null;
      }>;
    };
  };
};


