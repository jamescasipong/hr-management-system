"use client";
import { createContext, ReactNode, useState } from "react";

interface AppContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const SideDark = createContext<AppContextProps | undefined>(undefined);

export const SideThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <SideDark.Provider
      value={{ isSidebarOpen, toggleSidebar }}
    >
      {children}
    </SideDark.Provider>
  );
};
