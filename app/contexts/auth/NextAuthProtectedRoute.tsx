"use client";
import { useNextAuth } from "./useNextAuth";

interface NextAuthProtectedRouteProps {
  children: React.ReactNode;
}

const NextAuthProtectedRoute = ({ children }: NextAuthProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useNextAuth();

  // Affichage du loading pendant l'initialisation
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgFond">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor mx-auto mb-4"></div>
          <p className="text-colorMuted">Chargement...</p>
        </div>
      </div>
    );
  }

  // Redirection si pas authentifié
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgFond">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor mx-auto mb-4"></div>
          <p className="text-colorMuted">Redirection vers l&apos;authentification...</p>
        </div>
      </div>
    );
  }

  // Rendu des enfants si authentifié
  return <>{children}</>;
};

export default NextAuthProtectedRoute;
