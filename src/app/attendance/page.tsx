"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SideDark } from "@/contextComponent/SideDark";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function Attendance() {
  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }
  const { isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode } = context;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckInOut = () => {
    const now = new Date();
    if (isCheckedIn) {
      setIsCheckedIn(false);
      setCheckInTime(null);
    } else {
      setIsCheckedIn(true);
      setCheckInTime(now.toLocaleTimeString());
    }
  };

  const attendanceRecords = [
    {
      date: "2024-04-01",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      status: "Present",
    },
    {
      date: "2024-04-02",
      checkIn: "09:15 AM",
      checkOut: "05:30 PM",
      status: "Present",
    },
    {
      date: "2024-04-03",
      checkIn: "08:45 AM",
      checkOut: "04:45 PM",
      status: "Present",
    },
    { date: "2024-04-04", checkIn: "-", checkOut: "-", status: "Absent" },
    {
      date: "2024-04-05",
      checkIn: "09:30 AM",
      checkOut: "05:15 PM",
      status: "Present",
    },
  ];

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      const isFuture = date > today;

      days.push(
        <TooltipProvider key={day}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`p-2 border rounded-md cursor-pointer transition-colors duration-200
                  ${isToday ? "bg-blue-500 text-white" : ""}
                  ${isPast ? "bg-gray-200 dark:bg-gray-700" : ""}
                  ${isFuture ? "bg-white dark:bg-gray-800" : ""}
                  hover:bg-blue-100 dark:hover:bg-blue-900`}
              >
                <span className="text-sm">{day}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isToday ? "Today" : new Date(year, month, day).toDateString()}
              </p>
              {isPast && <p>Attendance: Present</p>}
              {isFuture && <p>Future date</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return days;
  };

  return (
    <div
      className={`flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto duration-200 ${
          isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
        }`}
      >
        {/* Header */}

        {/* Attendance Content */}
        <div
          className={`mx-auto py-6 sm:px-6  lg:px-8 p-5 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}
        >
          {/* Check In/Out Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>Check in and out for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {isCheckedIn ? "Checked In" : "Not Checked In"}
                  </p>
                  {checkInTime && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Checked in at: {checkInTime}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current time: {currentTime.toLocaleTimeString()}
                  </p>
                </div>
                <Button
                  onClick={handleCheckInOut}
                  variant={isCheckedIn ? "destructive" : "default"}
                >
                  {isCheckedIn ? "Check Out" : "Check In"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Calendar */}
          <div className="grid grid-cols-2 gap-5">
            <Card className="mb-6 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Attendance Calendar</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="font-medium text-gray-500 dark:text-gray-400"
                      >
                        {day}
                      </div>
                    )
                  )}
                  {renderCalendar()}
                </div>
              </CardContent>
            </Card>

            {/* Attendance Records */}
            <Card className=" h-full">
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                  Your recent attendance history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    A list of your recent attendance records.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.status === "Present"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          {/* Additional Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Time Off</CardTitle>
                <CardDescription>
                  Submit a request for time off or leave
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Request Time Off</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>
                  Generate and view attendance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full mt-4">Generate Report</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
