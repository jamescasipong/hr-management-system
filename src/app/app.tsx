import React from "react";
import { SideThemeProvider } from "@/contextComponent/SideDark";
import localFont from "next/font/local";
import Navbar from "@/customComponents/navbar";
import { useContext, useEffect } from "react";
import { SideDark } from "@/contextComponent/SideDark";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const App = ({ children }: any) => {
  const { isDarkMode } = useContext(SideDark) || { isDarkMode: false }; // Default to false

  useEffect(() => {
    const savedState = localStorage.getItem("isDarkMode");
    if (savedState) {
      document.documentElement.classList.toggle("dark", JSON.parse(savedState));
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}
      >
        <SideThemeProvider>
          {/* Conditionally render the Navbar */}
          <Navbar></Navbar>
          {/* Page content */}
          {children}
        </SideThemeProvider>
      </body>
    </html>
  );
};

export default App;
