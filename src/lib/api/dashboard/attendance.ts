import instanceApi from "../auth";

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

const clockIn = async (): Promise<ApiResponseNoData | undefined> => {
    const response: ResponseSchema<ApiResponseNoData> = await instanceApi.post("attendance/clock-in");

    try {
        if (response.status == 200){
            const data: ApiResponseNoData = response.data;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const hasClockedIn = async (): Promise<ApiResponse | undefined>  => {
    const response: ResponseSchema<ApiResponse> = await instanceApi.get("attendance/clocked-in");
    
    try {
        if (response.status == 200){
            const data: ApiResponse = response.data;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const clockOut = async (): Promise<ApiResponseNoData | undefined> => {
    const response: ResponseSchema<ApiResponseNoData> = await instanceApi.put("attendance/clock-out");

    try {
        if (response.status == 200){
            const data: ApiResponseNoData = response.data;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const hasClockedOut = async (): Promise<ApiResponse | undefined> => {
    const response: ResponseSchema<ApiResponse> = await instanceApi.get("attendance/clocked-out");
    
    try {
        if (response.status == 200){
            const data: ApiResponse = response.data;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}


const hasShiftToday = async (): Promise<ApiResponse | undefined> => {
    const response: ResponseSchema<ApiResponse> = await instanceApi.get("shift/shift-today");

    try {
        if (response.status == 200){
            const data: AttendanceData = response.data;

            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
}


const apiAttendanceToday = async (): Promise<ApiResponse | undefined> => {
    const response: ResponseSchema<ApiResponse> = await instanceApi.get("attendance/my-attendance-today");

    try {
        if (response.status == 200){
            const data: ApiResponse = response.data;


            return data;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
    }
};


export {clockIn, clockOut, hasClockedIn, hasClockedOut, hasShiftToday, apiAttendanceToday}