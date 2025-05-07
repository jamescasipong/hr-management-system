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
  return callApi("/attendance/clock-in", "POST")
};

const hasClockedIn = async () => {
  return callApi("/attendance/clocked-in", "GET")
};

const clockOut = async () => {
  return callApi("/attendance/clock-out", "POST")
};

const hasClockedOut = async () => {
  return callApi("/attendance/clocked-out", "GET")
};

const hasShiftToday = async () => {
  return callApi("/attendance/has-shift-today", "GET")
};

const apiAttendanceToday = async () => {
  return callApi("/attendance/my-attendance-today", "GET")
};

const mySubordinates = async () => {
  return callApi("/employee/my-subordinates", "GET")
}

export {
  clockIn,
  clockOut,
  hasClockedIn,
  hasClockedOut,
  hasShiftToday,
  apiAttendanceToday,
  mySubordinates
};
