import { gql } from "@apollo/client";

export const GET_TAXPAYER_AVATAR = gql`
  query getTaxpayerAvatar($id: ID!) {
    taxpayer(id: $id) {
      id
      payerAvatar {
        path
        file
      }
    }
  }
`;

export type TaxpayerAvatarQuery = {
  taxpayer?: {
    id: string;
    payerAvatar?: {
      path?: string | null;
      file?: string | null; // data URI (e.g., data:image/jpeg;base64,...)
    } | null;
  } | null;
};


