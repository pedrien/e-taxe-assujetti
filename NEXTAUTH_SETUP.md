# Configuration NextAuth.js avec Keycloak

## 🔐 Authentification NextAuth + Keycloak

Cette application utilise NextAuth.js avec Keycloak comme provider d'authentification, avec gestion automatique du refresh token et décodage JWT.

### Configuration requise

1. **Variables d'environnement** - Créez un fichier `.env.local` avec :

```env
NEXTAUTH_SECRET=1xYY4tCL8scMZJhy7kcgfUwzq9pj2fG4
NEXTAUTH_URL="http://localhost:3000"
KEYCLOAK_ISSUER="https://auth.etaxrdc.com/realms/etax-systems"
KEYCLOAK_CLIENT_ID=your-client-id-here
KEYCLOAK_CLIENT_SECRET=your-client-secret-here
KEYCLOAK_PUBLIC_KEY="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApp1uKU3a41jRXZmWyWRIIQrIzhBjQmtGSpbpzEpSzcIhwBA6pEQm2z1emr+ytaEvdPx3PxR3rlB59ieNKbeaeTmY1RIF5/0GVbowDBBGQDk3izM6ekPx9hPhnljvYLgiFchdjijb2ZThJmFh7Z3UB5CfCJ41TaoWd63kKLoHB30LHUliQw6yUiytIy/b3URDwBIZeIprkcyQTFXobOP3Kob8o8ti8ZJg/p5rCBb/RoF/HXiBch/CWGASq8e2/7sAzHnIeMzKtkJwnCfkiNBf6ykyW7i8EhM7dhb6MkKZKD0eOpYPiXPZyFWPBsTrCNcK57Ymb1XFckaryx+basnPvQIDAQAB"
```

2. **Configuration Keycloak** :
   - URL : `https://auth.etaxrdc.com`
   - Realm : `etax-systems`
   - Client ID : `etaxe-client`
   - Client Secret : (à récupérer depuis Keycloak)
   - Client Protocol : `openid-connect`
   - Access Type : `confidential`
   - Valid Redirect URIs : `http://localhost:3000/api/auth/callback/keycloak`
   - Web Origins : `http://localhost:3000`

### Flow d'authentification

1. **Vérification** : NextAuth vérifie la session
2. **Redirection** : Si pas connecté → Redirection vers Keycloak
3. **Callback** : Keycloak redirige vers `/api/auth/callback/keycloak`
4. **Token** : NextAuth récupère et stocke les tokens
5. **Payer ID** : Extraction du champ `payer` du token ID
6. **Session** : Création de la session avec les infos utilisateur

### Structure des tokens

Le token ID Keycloak doit contenir :
```json
{
  "payer": "0197c9b3-9aa1-7112-a1aa-4459ceede287",
  "email": "user@example.com",
  "name": "Nom Utilisateur",
  "preferred_username": "username"
}
```

### Composants créés

- `lib/auth.ts` - Configuration NextAuth
- `app/api/auth/[...nextauth]/route.ts` - API route NextAuth
- `app/contexts/auth/NextAuthProvider.tsx` - Provider NextAuth
- `app/contexts/auth/useNextAuth.ts` - Hook personnalisé
- `app/contexts/auth/NextAuthProtectedRoute.tsx` - Protection des routes

### Utilisation

```tsx
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";

const MyComponent = () => {
  const { user, payerId, isAuthenticated, logout } = useNextAuth();
  
  if (!isAuthenticated) return <div>Non connecté</div>;
  
  return (
    <div>
      <p>Payer ID: {payerId}</p>
      <p>Nom: {user?.name}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};
```

### Avantages de NextAuth

- ✅ Intégration native avec Next.js
- ✅ Gestion automatique des sessions
- ✅ Support de multiples providers
- ✅ Sécurité intégrée
- ✅ TypeScript support
- ✅ Middleware pour la protection des routes

### Debug

En mode développement, un panneau de debug s'affiche en bas à droite avec :
- État de l'authentification
- Informations utilisateur
- Payer ID extrait
- Présence du token d'accès
