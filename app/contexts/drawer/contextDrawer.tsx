import { createContext, useContext, useState, ReactNode } from "react";

type DrawerState = Record<string, boolean>;

type DrawerContextType = {
  openDrawer: (drawerName: string) => void;
  closeDrawer: (drawerName: string) => void;
  isDrawerOpen: (drawerName: string) => boolean;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [drawers, setDrawers] = useState<DrawerState>({});

  const openDrawer = (drawerName: string) => {
    setDrawers((prev) => ({ ...prev, [drawerName]: true }));
  };

  const closeDrawer = (drawerName: string) => {
    setDrawers((prev) => ({ ...prev, [drawerName]: false }));
  };

  const isDrawerOpen = (drawerName: string) => !!drawers[drawerName];

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, isDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer doit être utilisé dans un DrawerProvider");
  }
  return context;
};
