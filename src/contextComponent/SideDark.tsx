"use client"
import { createContext, ReactNode, useState } from 'react';

interface AppContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const SideDark = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false
    );

    const [isDarkMode, setIsDarkMode] = useState(false
    );


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <SideDark.Provider value={{ isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode }}>
            {children}
        </SideDark.Provider>
    );
};