import { gql } from "@apollo/client";

export const GET_TAXPAYER = gql`
  query getTaxpayer($id: ID!) {
    taxpayer(id: $id) {
      id
      payerProfile
      vehicles {
        paginationInfo {
          totalCount
        }
      }
      activities {
        paginationInfo {
          totalCount
        }
      }
      immovables {
        paginationInfo {
          totalCount
        }
      }
    }
  }
`;

export type TaxpayerCountsQuery = {
  taxpayer?: {
    id: string;
    payerProfile: string | null;
    vehicles?: { paginationInfo?: { totalCount?: number } };
    activities?: { paginationInfo?: { totalCount?: number } };
    immovables?: { paginationInfo?: { totalCount?: number } };
  };
};


