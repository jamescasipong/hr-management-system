"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

interface AppContextProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const SideDark = createContext<AppContextProps | undefined>(undefined);

export const SideThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem("isSidebarOpen");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedState = localStorage.getItem("isDarkMode");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SideDark.Provider
      value={{ isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode }}
    >
      {children}
    </SideDark.Provider>
  );
};
