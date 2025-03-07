"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import instanceApi, {login as Login, logout as Logout} from '@/api/auth';

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    login: (e: React.FormEvent, email: string, password: string) => Promise<{ success: boolean, message: string, data: any }>;
    logout: () => Promise<void>;
    data: any;
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    }

    const login = async (e: React.FormEvent, email: string, password: string) => {
        e.preventDefault();

        try {
            const response = await Login(email, password);
            
            if (response.data){
                setIsAuthenticated(false);
                return response;
            }
            setIsAuthenticated(response.success);
            
            return response;       
        }
        catch (error) {
            console.error(error);
            setIsAuthenticated(false);
            return { success: false, message: 'An error occurred' };
        }
    };

    const logout = async () => {
        await Logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, data, setLoading } as AuthContextType}>
            {children}
        </AuthContext.Provider>
    );
};

