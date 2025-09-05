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
    async jwt({ token, account }: any) {
      const expire_marge = 60 * 1000;

      // Initial sign in
      if (account) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires - expire_marge) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.accessToken) {
        const decodedToken = jwtDecode<any>(token.accessToken);
        
        if (token) {
          session.user = {
            name: decodedToken.name,
            email: decodedToken.email,
            image: decodedToken.picture,
          };
          session.accessToken = token.accessToken;
          session.refreshToken = token.refreshToken;
          session.payerId = decodedToken.payer;
          session.error = token.error;
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
    payerId?: string;
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
    payerId?: string;
    error?: string;
  }
}
