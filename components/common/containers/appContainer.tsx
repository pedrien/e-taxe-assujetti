"use client";
import React, { JSX } from "react";
import Navbar from "@/components/layout/navbar/navbar";
import { DrawerProvider } from "@/app/contexts/drawer/contextDrawer";
import { NextAuthProvider } from "@/app/contexts/auth/NextAuthProvider";
import NextAuthProtectedRoute from "@/app/contexts/auth/NextAuthProtectedRoute";
import { ApolloProvider } from "@/app/contexts/apollo/ApolloProvider";
import { ApolloAuthInitializer } from "@/app/contexts/apollo/ApolloAuthInitializer";

function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <NextAuthProvider>
      <ApolloProvider>
        <ApolloAuthInitializer>
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
            </DrawerProvider>
          </NextAuthProtectedRoute>
        </ApolloAuthInitializer>
      </ApolloProvider>
    </NextAuthProvider>
  );
}

export default AppContainer;
