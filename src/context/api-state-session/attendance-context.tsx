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


    useEffect((): void => {
        const fetchShiftState = async () => {
            try {
                const hasShiftTodayResponse = await hasShiftToday();
                const hasShiftData = hasShiftTodayResponse?.data ?? false;
                console.log("hasShift:", hasShiftData);
                setShift(hasShiftData);
            } catch (error) {
                console.log("Error fetching shift state:", error);
            }
        };

        startTransition(() => {
            fetchShiftState();
        });
    }, []);

    useEffect(() => {
        const fetchClockedInState = async () => {
            try {
                const clockedInResponse = await hasClockedIn();
                const clockedInData: boolean = clockedInResponse?.data ?? false;
                console.log("clockedin:", clockedInData);
                setClockedIn(clockedInData);
            } catch (error) {
                console.log("Error fetching clocked in state:", error);
            }
        };

        startTransition((): void => {
            fetchClockedInState();
        });
    }, []);

    useEffect((): void => {
        const fetchClockedOutState = async () => {
            try {
                const clockedOutResponse = await hasClockedOut();
                const clockedOutData:boolean = clockedOutResponse?.data ?? false;
                console.log("clockedout:", clockedOutData);
                setClockedOut(clockedOutData);
            } catch (error) {
                console.log("Error fetching clocked out state:", error);
            }
        };

        startTransition(() => {
            fetchClockedOutState();
        });
    }, []);

    useEffect(() => {
        const fetchAttendanceToday = async () => {
            try {
                const attendaceResponse = await apiAttendanceToday();
                const attendanceData = attendaceResponse?.data as AttendanceResponse ?? {};
                console.log("attendaceTodat", attendanceData);
                setAttendanceToday(attendanceData);
            } catch (error) {
                console.log("Error fetching clocked out state:", error);
            }
        };

        startTransition(() => {
            fetchAttendanceToday();
        });
    }, []);

    return (
        <ClockContext.Provider value={{clockedIn, clockedOut, setClockedIn, setClockedOut, hasShift, isPending, attendanceToday}}>
            {children}
        </ClockContext.Provider>
    )
}

export const useAttendance = () => useContext(ClockContext);