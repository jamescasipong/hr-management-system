"use server"
import {instanceApi} from "../../axios";
import {cookies} from "next/headers";

interface ResponseSchema<dataType> {
    data: dataType;
    status: number;
    statusText: string;
    headers: {};
    config: {};
    request: {};
}

interface ClockInOutScheme {
    success: boolean;
    message: string;
}


interface ApiResponseNoData {
    success: boolean;
    message: string;
}

interface ApiResponse extends ApiResponseNoData 
{
    data: any;
}

interface AttendanceData extends ApiResponse {
    data: AttendanceResponse;
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



const clockIn = async () => {
    const cookie = (await cookies()).toString();

    const response: ResponseSchema<ApiResponseNoData> = await instanceApi.post("attendance/clock-in", {
        headers: {
            Cookie: cookie
        }
    });

    try {
        if (response.status == 200){
            const data: ApiResponseNoData = response.data;

            return data;
        }

        return response.data;
    }
    catch(error: any){
        return {
            error: error, message: error.message
        }
    }
}

const hasClockedIn = async () => {
    const cookie = (await cookies()).toString();

    const response: ResponseSchema<ApiResponse> = await instanceApi.get("attendance/clocked-in", {
        headers: {
            Cookie: cookie
        }
    });
    
    try {
        if (response.status == 200){
            const data: ApiResponse = response.data;

            return data;
        }

        return response.data;
    }
    catch(error: any){
        return {error: error, message: error.message}
    }
}

const clockOut = async () => {
    const cookie = (await cookies()).toString();

    const response: ResponseSchema<ApiResponseNoData> = await instanceApi.put("attendance/clock-out", {
        headers: {
            Cookie: cookie
        }
    });

    try {
        if (response.status == 200){
            const data: ApiResponseNoData = response.data;

            return data;
        }

        return response.data;
    }
    catch(error: any){
        return {error: error, message: error.message}
    }
}

const hasClockedOut = async () => {
    const cookie = (await cookies()).toString();

    const response: ResponseSchema<ApiResponse> = await instanceApi.get("attendance/clocked-out", {
        headers: {
            Cookie: cookie
        }
    });
    
    try {
        if (response.status == 200){
            const data: ApiResponse = response.data;

            return data;
        }

        return response.data;
    }
    catch(error: any){
        return {
            error: error, message: error.message
        }
    }
}


const hasShiftToday = async () => {
    const cookie = (await cookies()).toString();

    const response: ResponseSchema<ApiResponse> = await instanceApi.get("shift/shift-today", {
        headers: {
            Cookie: cookie
        }
    });

    try {
        if (response.status == 200){
            const data: AttendanceData = response.data;

            return data;
        }

        return response.data;
    }
    catch(error: any){
        return {error: error.message, message: error.message}
    }
}


const apiAttendanceToday = async () => {
    const cookie = (await cookies()).toString();

    const response: ResponseSchema<ApiResponse> = await instanceApi.get("attendance/my-attendance-today", {
        headers: {
            Cookie: cookie
        }
    });

    try {
        if (response.status == 200){
            const data: ApiResponse = response.data;


            return data;
        }

        return response.data;
    }
    catch(error: any){
        return {error: error, message: error.message}
    }
};


export {clockIn, clockOut, hasClockedIn, hasClockedOut, hasShiftToday, apiAttendanceToday}