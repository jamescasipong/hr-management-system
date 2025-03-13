import instanceApi from "../auth";

type ClockInOutScheme = {
    success: boolean;
    message: string;
}

type ClockedInOutScheme = {
    success: boolean;
    message: string;
    data: boolean;
}

type ApiResponse = {
    success: boolean;
    message: string;
    data: any;
}

export type AttendanceResponse = {
    attendanceId: number;
    employeeId: number;
    dateToday: string;
    clockIn: string;
    clockOut: string;
    workingHours: number;
    lateClockIn: string;
    earlyLeave: string;
    employee: any;
}

const clockIn = async (): Promise<ClockInOutScheme | undefined> => {
    const response = await instanceApi.post("attendance/clock-in");

    try {
        if (response.status == 200){
            const data = response.data as ClockInOutScheme;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const hasClockedIn = async (): Promise<ClockedInOutScheme | undefined>  => {
    const response = await instanceApi.get("attendance/clocked-in");
    
    try {
        if (response.status == 200){
            const data = response.data as ClockedInOutScheme;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const clockOut = async (): Promise<ClockInOutScheme | undefined> => {
    const response = await instanceApi.put("attendance/clock-out");

    try {
        if (response.status == 200){
            const data = response.data as ClockInOutScheme;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const hasClockedOut = async (): Promise<ClockedInOutScheme | undefined> => {
    const response = await instanceApi.get("attendance/clocked-out");
    
    try {
        if (response.status == 200){
            const data = response.data as ClockedInOutScheme;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}


const hasShiftToday = async (): Promise<ClockedInOutScheme | undefined> => {
    const response = await instanceApi.get("shift/shift-today");

    try {
        if (response.status == 200){
            const data = response.data as ClockedInOutScheme;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}


const apiAttendanceToday = async (): Promise<ApiResponse | undefined> => {
    const response = await instanceApi.get("attendance/my-attendance-today");

    try {
        if (response.status == 200){
            const data = response.data as ApiResponse;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
};


export {clockIn, clockOut, hasClockedIn, hasClockedOut, hasShiftToday, apiAttendanceToday}