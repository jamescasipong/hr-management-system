"use client"

import {useContext, createContext, useState, useEffect, useTransition, Context} from "react";
import { hasClockedIn, hasClockedOut, hasShiftToday, apiAttendanceToday, AttendanceResponse } from "@/lib/api/dashboard/actions";
import {useAuthContext} from "@/context/api-state-session/authContext";
import { callApiClient } from "@/lib/axios";
import { callApi } from "@/lib/utils/fetchUtils";

interface ContextProviderType {
    clockedIn: boolean;
    clockedOut: boolean;
    setClockedOut: (state: boolean) => void;
    setClockedIn: (state: boolean) => void;
    hasShift: boolean;
    isPending: boolean;
    attendanceToday: AttendanceResponse | {};
    refreshAttendanceData: () => void;
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

    // Function to fetch attendance data - separated for reusability
    const fetchAttendanceData = async () => {
        try {
            console.log("Starting to fetch attendance data...");
            
            // Fetch attendance data first - using await to ensure it completes
            const attendanceResult = await apiAttendanceToday();
            console.log("Attendance API response:", attendanceResult);
            
            // Fetch shift data
            const shiftResult = await hasShiftToday()
            console.log("Shift API response:", shiftResult);
            
            // Fetch clocked in status
            const clockedInResult = await hasClockedIn();
            console.log("Clocked in API response:", clockedInResult);
            
            // Fetch clocked out status
            const clockedOutResult = await hasClockedOut();
            console.log("Clocked out API response:", clockedOutResult);
            
            // Update state based on results
            if (shiftResult && !shiftResult.error) {
                setShift(shiftResult.data === true);
                console.log("Setting hasShift to:", shiftResult.data === true);
            }
            
            if (clockedInResult && !clockedInResult.error) {
                setClockedIn(clockedInResult.data === true);
                console.log("Setting clockedIn to:", clockedInResult.data);
            }
            
            if (clockedOutResult && !clockedOutResult.error) {
                setClockedOut(clockedOutResult.data === true);
                console.log("Setting clockedOut to:", clockedOutResult.data);
            }
            
            if (attendanceResult && !attendanceResult.error) {
                setAttendanceToday(attendanceResult.data || null);
                console.log("Setting attendanceToday to:", attendanceResult.data ?? null);
            }
            
            console.log("All attendance data fetched successfully");
        } catch (error) {
            console.error("Error in fetchAttendanceData:", error);
        }
    };

    // Function to refresh data that can be exposed in the context
    const refreshAttendanceData = () => {
        startTransition(async () => {
            await fetchAttendanceData();
        });
    };

    // Initial data fetch
    useEffect(() => {
        refreshAttendanceData();
        
        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <ClockContext.Provider value={{
            clockedIn, 
            clockedOut, 
            setClockedIn, 
            setClockedOut, 
            hasShift, 
            isPending, 
            attendanceToday,
            refreshAttendanceData
        }}>
            {children}
        </ClockContext.Provider>
    );
};

export const useAttendance = () => {
    const context = useContext(ClockContext);
    if (context === null) {
        throw new Error("useAttendance must be used within an AttendanceProvider");
    }
    return context;
};