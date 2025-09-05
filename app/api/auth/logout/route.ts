import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
  }

  const refreshToken = session.refreshToken;

  if (!refreshToken) {
    return NextResponse.json({ error: "Aucun refresh_token trouvé" }, { status: 400 });
  }

  const keycloakLogoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
  const clientId = process.env.KEYCLOAK_CLIENT_ID!;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET!;

  const logoutRes = await fetch(keycloakLogoutUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!logoutRes.ok) {
    return NextResponse.json({ error: "Échec de la déconnexion Keycloak" }, { status: 500 });
  }

  // Supprimer le cookie de session côté Next.js
  (await cookies()).delete("next-auth.session-token");

  return NextResponse.json({ message: "Déconnexion réussie" }, { status: 200 });
}
