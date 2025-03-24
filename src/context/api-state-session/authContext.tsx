"use client";

import React, {createContext, useState, ReactNode, Context, useContext} from 'react';



export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}
export type AuthContextTypes = AuthContextType;

export const AuthContext:Context<AuthContextTypes> = createContext<AuthContextTypes>({} as AuthContextTypes);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider:(props: AuthProviderProps) => React.JSX.Element = (props: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {children} = props;

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext:() => AuthContextTypes = (): AuthContextTypes => {
    const context: AuthContextTypes = useContext(AuthContext);
    return context;
}


