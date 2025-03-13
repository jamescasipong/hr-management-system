import React from "react";
import { AttendanceProvider } from "@/context/attendance-context";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <><AttendanceProvider> {children}</AttendanceProvider></>;
};

export default DashboardLayout;
