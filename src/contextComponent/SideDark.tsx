"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

interface AppContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: string;
  toggleDarkMode: () => void;
}

export const SideDark = createContext<AppContextProps | undefined>(undefined);

export const SideThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [theme, setTheme] = useState("light"); // Default to 'light'

  // Load the saved theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme); // Apply the saved theme (if available)
    }
  }, []);

  // Save the current theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme); // Save the current theme
    document.body.className = theme; // Apply the theme to the body element
  }, [theme]);

  // Toggle between light and dark themes

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <SideDark.Provider
      value={{ isSidebarOpen, toggleSidebar, theme, toggleDarkMode }}
    >
      {children}
    </SideDark.Provider>
  );
};
