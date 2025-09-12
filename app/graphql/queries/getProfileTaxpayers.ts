import { gql } from '@apollo/client';

export const GET_PROFILE_TAXPAYERS = gql`
  query getProfileTaxpayers($id: ID!) {
    profile(id: $id) {
      id
      payers {
        collection {
          id
          payerProfile
          activities {
            paginationInfo {
              totalCount
            }
            collection {
              taxId
              activityDetails
            }
          }
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
          vehicles {
            paginationInfo {
              totalCount
            }
            collection {
              taxId
              registration
              chassisNumber
              circYear
              weight
              power
              mark {
                headLine
              }
              model {
                headLine
              }
              calender {
                headLine
              }
              color {
                name
              }
            }
          }
          payerAvatar
        }
      }
    }
  }
`;

export type ProfileTaxpayersQuery = {
  profile?: {
    id: string;
    payers?: {
      collection?: Array<{
        id: string;
        payerProfile: string | object;
        activities?: {
          paginationInfo?: {
            totalCount?: number;
          };
          collection?: Array<{
            taxId?: string | null;
            activityDetails?: unknown; // Type Iterable! - sera parsé côté client
          }>;
        };
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
        vehicles?: {
          paginationInfo?: {
            totalCount?: number;
          };
          collection?: Array<{
            taxId?: string | null;
            registration?: string | null;
            chassisNumber?: string | null;
            circYear?: number | null;
            weight?: number | null;
            power?: number | null;
            mark?: { headLine?: string | null } | null;
            model?: { headLine?: string | null } | null;
            calender?: { headLine?: string | null } | null;
            color?: { name?: string | null } | null;
          }>;
        };
        payerAvatar?: string | null;
      }>;
    };
  };
};