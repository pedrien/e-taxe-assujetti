import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { refreshAccessToken } from "./refresh.auth";

const clientId = process.env.KEYCLOAK_CLIENT_ID;
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
const issuer = process.env.KEYCLOAK_ISSUER;
const publicKey = process.env.KEYCLOAK_PUBLIC_KEY;
const secret = process.env.NEXTAUTH_SECRET;

if (!clientId || !clientSecret || !issuer || !publicKey || !secret) {
  throw new Error("Missing environment variables");
}

export const authOptions: AuthOptions = {
  secret,
  providers: [
    KeycloakProvider({
      clientId,
      clientSecret,
      issuer,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: publicKey,
  },
  callbacks: {
    async jwt({ token, account }: { token: Record<string, unknown>; account: Record<string, unknown> | null }) {
      const expire_marge = 60 * 1000;

      // Initial sign in
      if (account) {
        return {
          accessToken: account.access_token as string,
          accessTokenExpires: Date.now() + (account.expires_in as number) * 1000,
          refreshToken: account.refresh_token as string,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number) - expire_marge) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.accessToken) {
        const decodedToken = jwtDecode<Record<string, string | number | boolean>>(token.accessToken);
        
        if (token) {
          session.user = {
            name: decodedToken.name as string,
            email: decodedToken.email as string,
            image: decodedToken.picture as string,
          };
          session.accessToken = token.accessToken as string;
          session.refreshToken = token.refreshToken as string;
          // Le payerId du token est maintenant utilisé comme profileId
          session.profileId = decodedToken.payer as string;
          session.error = token.error as string;
        }
      }

      return session;
    },
  },
};

// Types pour NextAuth
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    profileId?: string; // Renommé de payerId à profileId
    error?: string;
  }

  interface User {
    payerId?: string;
    username?: string;
    given_name?: string;
    family_name?: string;
    name?: string;
    phone_number?: string;
    email?: string;
    gender?: string;
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    profileId?: string; // Renommé de payerId à profileId
    error?: string;
  }
}
