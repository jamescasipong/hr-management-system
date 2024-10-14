"use client"
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AppContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const SideDark = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSidebarState = localStorage.getItem('isSidebarOpen');
            const savedDarkModeState = localStorage.getItem('isDarkMode');
            if (savedSidebarState) {
                setIsSidebarOpen(JSON.parse(savedSidebarState));
            }
            if (savedDarkModeState) {
                setIsDarkMode(JSON.parse(savedDarkModeState));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
        }
    }, [isSidebarOpen]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        }
    }, [isDarkMode]);

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