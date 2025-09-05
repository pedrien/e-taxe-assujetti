"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import handleLogout from "@/lib/logout";

export const useNextAuth = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && !!session?.payerId;

  const login = () => {
    signIn("keycloak");
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await handleLogout();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Redirection automatique si pas authentifié (sauf si on est en train de se déconnecter)
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoggingOut) {
      login();
    }
  }, [isLoading, isAuthenticated, isLoggingOut]);

  return {
    user: session?.user,
    payerId: session?.payerId,
    isAuthenticated,
    isLoading: isLoading || isLoggingOut,
    login,
    logout,
    session,
  };
};
