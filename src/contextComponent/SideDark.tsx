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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("isDarkMode");
    if (savedState) {
      setIsDarkMode(JSON.parse(savedState));
    }
  }, []);

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
