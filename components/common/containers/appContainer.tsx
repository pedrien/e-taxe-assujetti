"use client";
import React, { JSX} from "react";
import Navbar from "@/components/layout/navbar/navbar";

function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="global-div min-h-screen flex flex-col">
      <Navbar />
      <div className="wrapper flex-grow bg-bgFond">{children}</div>
      <div className="footer bg-Card py-3">
        <div className="text-center text-xs text-colorMuted">
          <p>© 2025 etax. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
}

export default AppContainer;
