"use client";
import { useNextAuth } from "./useNextAuth";

const AuthDebug = () => {
  const { isAuthenticated, isLoading, user, payerId, session } = useNextAuth();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm text-xs">
      <h3 className="font-bold mb-2">🔐 Auth Debug</h3>
      <div className="space-y-1">
        <p><strong>Loading:</strong> {isLoading ? "✅" : "❌"}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated ? "✅" : "❌"}</p>
        {user && (
          <>
            <p><strong>Payer ID:</strong> {payerId || "N/A"}</p>
            <p><strong>Name:</strong> {user.name || "N/A"}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
          </>
        )}
        {session && (
          <p><strong>Access Token:</strong> {session.accessToken ? "✅" : "❌"}</p>
        )}
      </div>
    </div>
  );
};

export default AuthDebug;
