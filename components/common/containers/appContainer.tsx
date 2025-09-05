"use client";
import React, { JSX } from "react";
import Navbar from "@/components/layout/navbar/navbar";
import { DrawerProvider } from "@/app/contexts/drawer/contextDrawer";
import { NextAuthProvider } from "@/app/contexts/auth/NextAuthProvider";
import NextAuthProtectedRoute from "@/app/contexts/auth/NextAuthProtectedRoute";
import AuthDebug from "@/app/contexts/auth/AuthDebug";

function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <NextAuthProvider>
      <NextAuthProtectedRoute>
        <DrawerProvider>
          <div className="global-div min-h-screen flex flex-col">
            <Navbar />
            <div className="wrapper flex-grow bg-bgFond">{children}</div>
            <div className="footer bg-Card py-3">
              <div className="text-center text-xs text-colorMuted">
                <p>© 2025 etax. All rights reserved. </p>
              </div>
            </div>
          </div>
          <AuthDebug />
        </DrawerProvider>
      </NextAuthProtectedRoute>
    </NextAuthProvider>
  );
}

export default AppContainer;
