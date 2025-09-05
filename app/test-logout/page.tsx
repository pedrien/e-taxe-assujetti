"use client";
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";

export default function TestLogout() {
  const { user, payerId, isAuthenticated, isLoading, logout } = useNextAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgFond">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-colorTitle mb-4">
              Déconnecté avec succès ! ✅
            </h2>
            <p className="text-colorMuted mb-6">
              Vous avez été déconnecté côté NextAuth ET côté Keycloak
            </p>
            <a 
              href="/"
              className="w-full py-3 px-4 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 inline-block text-center"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgFond p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-colorTitle mb-8">
          Test de déconnexion complète
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Informations utilisateur :</h2>
          
          <div className="space-y-3 mb-6">
            <div>
              <strong>Payer ID :</strong> 
              <span className="ml-2 text-primaryColor font-mono">
                {payerId || "Non trouvé"}
              </span>
            </div>
            
            <div>
              <strong>Nom :</strong> 
              <span className="ml-2">{user?.name || "Non trouvé"}</span>
            </div>
            
            <div>
              <strong>Email :</strong> 
              <span className="ml-2">{user?.email || "Non trouvé"}</span>
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <button
              onClick={logout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Se déconnecter complètement
            </button>
            <p className="text-sm text-colorMuted mt-2">
              Ce bouton va vous déconnecter côté NextAuth ET côté Keycloak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
