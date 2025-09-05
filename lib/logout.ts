import { signOut } from "next-auth/react";

const handleLogout = async () => {
  try {
    // Appeler l'API de déconnexion pour déconnecter côté Keycloak
    await fetch("/api/auth/logout", { method: "POST" });
    
    // Déconnexion côté NextAuth
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    // En cas d'erreur, forcer la déconnexion côté NextAuth
    await signOut({ callbackUrl: "/" });
  }
};

export default handleLogout;
