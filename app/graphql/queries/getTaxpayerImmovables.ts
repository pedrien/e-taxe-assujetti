import { gql } from "@apollo/client";

export const GET_TAXPAYER_IMMOVABLES = gql`
  query getTaxpayerImmovables($id: ID!) {
    taxpayer(id: $id) {
      id
      immovables {
        paginationInfo {
          totalCount
        }
        collection {
          taxId
          headLine
          nature {
            headLine
          }
          usage {
            headLine
          }
          range {
            headLine
          }
          area
        }
      }
    }
  }
`;

export type TaxpayerImmovablesQuery = {
  taxpayer?: {
    id: string;
    immovables?: {
      paginationInfo?: {
        totalCount?: number;
      };
      collection?: Array<{
        taxId?: string | null;
        headLine?: string | null;
        nature?: { headLine?: string | null } | null;
        usage?: { headLine?: string | null } | null;
        range?: { headLine?: string | null } | null;
        area?: string | number | null;
      }>;
    };
  };
};
