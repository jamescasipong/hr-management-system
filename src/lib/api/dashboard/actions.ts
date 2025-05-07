"use server";
import { callApi } from "@/lib/utils/fetchUtils";
import { instanceApi } from "../../axios";
import { cookies } from "next/headers";

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

interface ApiResponse extends ApiResponseNoData {
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
};

const clockIn = async () => {
  const cookie = (await cookies()).toString();

  try {
    const response = await instanceApi.post(
      "/attendance/clock-in",
      {}, // Empty body object
      {
        headers: {
          Cookie: cookie,
        },
      }
    );

    // if (response.status === 200) {
    //   const data: ApiResponseNoData = response.data;
    //   return data;
    // }

    return response.data;
  } catch (error: any) {
    console.error("Clock in error:", error.message);
    return {
      success: false,
      error: error,
      message: error.message,
    };
  }
};

const hasClockedIn = async () => {
  const cookie = (await cookies()).toString();

  try {
    const response = await instanceApi.get("/attendance/clocked-in", {
      headers: {
        Cookie: cookie,
      },
    });

    // if (response.status === 200) {
    //   const data: ApiResponse = response.data;
    //   return data;
    // }

    return response.data;
  } catch (error: any) {
    console.error("Has clocked in error:", error.message);
    return {
      success: false,
      error: error,
      message: error.message,
    };
  }
};

const clockOut = async () => {
  const cookie = (await cookies()).toString();

  try {
    const response = await instanceApi.put(
      "/attendance/clock-out",
      {}, // Empty body object
      {
        headers: {
          Cookie: cookie,
        },
      }
    );

    // if (response.status === 200) {
    //   const data: ApiResponseNoData = response.data;
    //   return data;
    // }

    return response.data;
  } catch (error: any) {
    console.error("Clock out error:", error.message);
    return {
      success: false,
      error: error,
      message: error.message,
    };
  }
};

const hasClockedOut = async () => {
  const cookie = (await cookies()).toString();

  try {
    const response = await instanceApi.get("/attendance/clocked-out", {
      headers: {
        Cookie: cookie,
      },
    });

    // if (response.status === 200) {
    //   const data: ApiResponse = response.data;
    //   return data;
    // }

    return response.data;
  } catch (error: any) {
    console.error("Has clocked out error:", error.message);
    return {
      success: false,
      error: error,
      message: error.message,
    };
  }
};

const hasShiftToday = async () => {
  const cookie = (await cookies()).toString();

  try {
    const response = await instanceApi.get("shift/shift-today", {
      headers: {
        Cookie: cookie,
      },
    });

    const data: AttendanceData = response.data;
    console.log("shift today", response.data);
    return data;
  } catch (error: any) {
    console.error("Shift today error:", error.message);
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }
};

const apiAttendanceToday = async () => {
  return callApi("/attendance/my-attendance-today", "GET")
};

export {
  clockIn,
  clockOut,
  hasClockedIn,
  hasClockedOut,
  hasShiftToday,
  apiAttendanceToday,
};
