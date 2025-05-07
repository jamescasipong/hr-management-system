"use client"

import {useContext, createContext, useState, useEffect, useTransition, Context} from "react";
import { hasClockedIn, hasClockedOut, hasShiftToday, apiAttendanceToday, AttendanceResponse } from "@/lib/api/dashboard/attendance";
import {useAuthContext} from "@/context/api-state-session/authContext";

interface ContextProviderType {
    clockedIn: boolean;
    clockedOut: boolean;
    setClockedOut: (state: boolean) => void;
    setClockedIn: (state: boolean) => void;
    hasShift: boolean;
    isPending: boolean;
    attendanceToday: AttendanceResponse | {};
}

type ContextProviderProps = ContextProviderType | null;

const ClockContext:Context<ContextProviderProps> = createContext<ContextProviderProps>(null);

interface AttendanceProviderProps {
    children: React.ReactNode;
}

export const AttendanceProvider = ({children}: AttendanceProviderProps) => {
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);
    const [hasShift, setShift] = useState(false);
    const [attendanceToday, setAttendanceToday] = useState<AttendanceResponse | {}>({});
    const [isPending, startTransition] = useTransition();
    const {isAuthenticated} = useAuthContext();


    useEffect(() => {
        const fetchAllAttendanceData = async () => {
            try {
                const [shiftRes, inRes, outRes, attendanceRes]= await Promise.all([
                    hasShiftToday() as any,
                    hasClockedIn() as any,
                    hasClockedOut() as any,
                    apiAttendanceToday() as any
                ]);
    
                // Handle shift
                const shift = shiftRes?.data ?? false;
                setShift(!shiftRes?.error && shift);
    
                // Handle clockedIn
                const clockedIn = inRes?.data ?? false;
                setClockedIn(!inRes?.error && clockedIn);
    
                // Handle clockedOut
                const clockedOut = outRes?.data ?? false;
                setClockedOut(!outRes?.error && clockedOut);
    
                // Handle attendance today
                const attendance = attendanceRes?.data ?? {};
                setAttendanceToday(!attendanceRes?.error ? attendance : {});
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };
    
        startTransition(() => {
            if (isAuthenticated) fetchAllAttendanceData();
        });
    }, [isAuthenticated]);
    

    return (
        <ClockContext.Provider value={{clockedIn, clockedOut, setClockedIn, setClockedOut, hasShift, isPending, attendanceToday}}>
            {children}
        </ClockContext.Provider>
    )
}

export const useAttendance = () => useContext(ClockContext);