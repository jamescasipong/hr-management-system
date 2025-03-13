"use client"

import {useContext, createContext, useState, useEffect, useTransition} from "react";
import { hasClockedIn, hasClockedOut, hasShiftToday, apiAttendanceToday, AttendanceResponse } from "@/api/dashboard/attendance";

type ContextProviderType = {
    clockedIn: boolean;
    clockedOut: boolean;
    setClockedOut: (state: boolean) => void;
    setClockedIn: (state: boolean) => void;
    hasShift: boolean;
    isPending: boolean;
    attendanceToday: AttendanceResponse | {};
}

const ClockContext = createContext<ContextProviderType | null>(null);

type AttendanceProviderProps = {
    children: React.ReactNode;
}

export const AttendanceProvider = ({children}: AttendanceProviderProps) => {
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);
    const [hasShift, setShift] = useState(false);
    const [attendanceToday, setAttendanceToday] = useState<AttendanceResponse | {}>({});
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
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
                const clockedInData = clockedInResponse?.data ?? false;
                console.log("clockedin:", clockedInData);
                setClockedIn(clockedInData);
            } catch (error) {
                console.log("Error fetching clocked in state:", error);
            }
        };

        startTransition(() => {
            fetchClockedInState();
        });
    }, []);

    useEffect(() => {
        const fetchClockedOutState = async () => {
            try {
                const clockedOutResponse = await hasClockedOut();
                const clockedOutData = clockedOutResponse?.data ?? false;
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