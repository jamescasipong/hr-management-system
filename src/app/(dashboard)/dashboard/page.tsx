"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarCheck2,
  CalendarDays,
  ChevronDown,
  Group,
  Timer,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../../../context/layout/custom-sidebar";
import calendar from "../components/custom-calendar";
import employees from "../../data";
import { useAttendance } from "@/context/api-state-session/attendance-context";
import { apiAttendanceToday, AttendanceResponse, clockIn, clockOut } from "@/lib/api/dashboard/actions";
import { set } from "date-fns";
import { time } from "console";

type AttendanceType = {
  clockedIn: boolean;
  clockedOut: boolean;
  setClockedOut: (state: boolean) => void;
  setClockedIn: (state: boolean) => void;
  hasShift: boolean;
  isPending: boolean;
  attendanceToday: AttendanceResponse;
};

export default function Dashboard() {
  const context = useSidebar();

  
  const {
    clockedIn,
    setClockedIn,
    hasShift,
    isPending,
    clockedOut,
    setClockedOut,
    attendanceToday,
  } = useAttendance() as AttendanceType;
  const { isSidebarOpen, toggleSidebar } = context;
  const [workingHours, setWorkingHours] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  useEffect(() => {
    setWorkingHours(attendanceToday?.workingHours ?? attendanceToday?.clockIn ? attendanceToday?.clockIn == "00:00:00" ? 0 : convertToDate(attendanceToday.clockIn).getTime() - new Date().getTime() : 0);
    setStartTime(attendanceToday?.clockIn ? attendanceToday?.clockIn == "00:00:00" ? null : convertToDate(attendanceToday.clockIn) : null);
    setEndTime(attendanceToday?.clockOut ? attendanceToday?.clockOut == "00:00:00" ? null : convertToDate(attendanceToday.clockOut) : null);

  }, [workingHours, attendanceToday, isPending]);

  const convertToDate = (time: string) => {
    const [hours, minutes] = time.split(".")[0].split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
  };

  const [weeklyClockData, setWeeklyClockData] = useState([
    { day: "Monday", clockIn: "09:00 AM", clockOut: "05:00 PM" },
    { day: "Tuesday", clockIn: "08:45 AM", clockOut: "05:15 PM" },
    { day: "Wednesday", clockIn: "09:15 AM", clockOut: "05:30 PM" },
    { day: "Thursday", clockIn: "08:30 AM", clockOut: "04:45 PM" },
    { day: "Friday", clockIn: "09:00 AM", clockOut: "05:00 PM" },
  ]);
  const [coworkers, setCoworkers] = useState(
    employees.filter((e) => e.username !== "jcasipong")
  );
  const [myProfile, setMyProfile] = useState(
    employees.find((e) => e.username === "blank")
  );

  const [leaveHours, setLeaveHours] = useState([
    {
      type: "Vacation Leave",
      hours: 120,
      entitlement: 120,
    },
    {
      type: "Sick Leave",
      hours: 5,
      entitlement: 24,
    },
  ]);
  const [messages, setMessages] = useState([
    {
      sender: "Alice Johnson",
      time: "10:00 AM",
      content: "Hey team, how's the project coming along?",
    },
    {
      sender: "Bob Smith",
      time: "10:05 AM",
      content: "Making good progress. We should be done by EOD.",
    },
    {
      sender: "You",
      time: "10:10 AM",
      content: "Great to hear! Let me know if you need any help.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (clockedIn && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = (now.getTime() - startTime.getTime()) / 1000 / 60 / 60;
        setWorkingHours(Number(diff.toFixed(2)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockedIn, startTime]);

  const handleClockInOut = () => {
    const now = new Date();

    if (!clockedOut) {
      if (clockedIn) {
        setClockedIn(false);
        clockOut();
        setEndTime(now);
        setWorkingHours(startTime ? (now.getTime() - startTime.getTime()) / 1000 / 60 / 60 : 0);
        setWeeklyClockData((prev) => {
          prev[0] = {
            ...prev[0],
            clockOut: now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          return prev;
        });
      } else {
        setWeeklyClockData((prev) => {
          prev[0] = {
            ...prev[0],
            clockIn: now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          return prev;
        });
        setClockedIn(true);
        clockIn();
        setStartTime(now);
        setWorkingHours(0);
        setEndTime(null);
      }
      setIsClockModalOpen(false);
    }
    else {
      alert("You have already clocked out");
    }
  };

  function convertTo12HourFormat(date?: Date | null) {
    if (date == null) return "N/A";

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Pad minutes with leading zero if needed
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    const format = `${hours}:${minutesStr} ${period}`;

    return format;
  }

  console.log(isPending, clockedOut, hasShift)

  return (
    <div className={`flex h-full transition-colors duration-200`}>
      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto duration-200
        }`}
      >
        {/* Dashboard Content */}
        <div
          className={`mx-auto  overflow-y-auto py-6 sm:px-6  lg:px-8 p-1 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}
        >
          {/* Clock In/Out Card */}
          <div className="grid lg:grid-cols-2 md:gap-4 md:grid-cols-1 gap-0 grid-cols-1">
            <Card className="lg:mb-6 md:mb-3 mb-6 ">
              <CardHeader>
                <div className="flex justify-between  border-b border-green-200 py-1 ">
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    My Schedule
                  </CardTitle>
                  <CalendarCheck2 className=""></CalendarCheck2>
                </div>
                <CardDescription>
                  <span className="font-medium t">Working </span>{" "}
                  <span className="text-green-400 font-bold">
                    8:00 AM to 5:00 PM
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between ">
                  <div className="">
                    <p className="text-2xl font-bold">
                        {isPending
                        ? "Loading..."
                        : attendanceToday?.workingHours ?? 0} {isPending ? "" : "hours"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-[14px]">
                      Today&apos;s working hour
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-[14px]">
                      Clock In: {convertTo12HourFormat(startTime ?? null)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-[14px]">
                      Clock Out: {convertTo12HourFormat(endTime ?? null)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center sm:flex-row flex-col gap-2">
                    <Dialog
                      open={isClockModalOpen}
                      onOpenChange={setIsClockModalOpen}
                    >
                      
                      <DialogTrigger asChild>
                        <Button
                          disabled={isPending || clockedOut || !hasShift}
                          className="w-full"
                          variant={clockedIn ? "destructive" : "default"}
                        >
                          {isPending
                            ? "Loading"
                            : clockedIn
                            ? clockedOut
                              ? "Clocked Out"
                              : "Clock Out"
                            : "Clock In"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-lg">
                        <DialogHeader>
                          <DialogTitle>
                            {clockedIn ? "Clock Out" : "Clock In"}
                          </DialogTitle>
                          <DialogDescription>
                            {clockedIn
                              ? "Are you sure you want to clock out?"
                              : "Are you ready to start your workday?"}
                          </DialogDescription>
                          {/* <ComboBoxResponsive></ComboBoxResponsive> */}
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button
                            className=""
                            variant="outline"
                            onClick={() => setIsClockModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="" onClick={handleClockInOut}>
                            {clockedIn ? "Clock Out" : "Clock In"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="">
                        <Button
                          className="border-gray-300 dark:border-gray-700 border-[1px]  dark:hover:bg-slate-800 shadow-sm"
                          variant="outline"
                        >
                          Summary <ChevronDown className="ml-2 h-4 w-4 " />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onSelect={() => setIsSummaryModalOpen(true)}
                        >
                          Weekly Summary
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary Modal */}
            <Dialog
              open={isSummaryModalOpen}
              onOpenChange={setIsSummaryModalOpen}
            >
              <DialogContent className="sm:max-w-[625px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Weekly Time Summary</DialogTitle>
                  <DialogDescription>
                    Your clock in and out times for this week
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Day</th>
                        <th className="text-left">Clock In</th>
                        <th className="text-left">Clock Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyClockData.map((day, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2">{day.day}</td>
                          <td className="py-2">{day.clockIn}</td>
                          <td className="py-2">{day.clockOut}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>
            {/* Co-workers Attendance */}
            <Card className="mb-6 ">
              <CardHeader>
                <div className="flex justify-between border-b border-green-200 py-1">
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    Co-workers Attendance
                  </CardTitle>
                  <Group className=""></Group>
                </div>

                <CardDescription>Today's attendance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
                  {coworkers
                    .filter(
                      (coworker) => coworker.department == myProfile?.department
                    )
                    .map((coworker, index) => (
                      <div
                        onClick={() => {
                          window.location.href =
                            "/profile/" + coworker.username;
                        }}
                        key={index}
                        className="flex items-center space-x-2 rounded-lg p-2 cursor-pointer transition-all duration-100 ease-in-out"
                      >
                        <div className="relative z-0">
                          <div
                            className={`w-3 h-3 rounded-full absolute bottom-0 right-1 z-10`}
                          ></div>
                          <Avatar className="border-[1px] dark:border-slate-700">
                            <AvatarImage
                              src={coworker.profilePicUrl}
                              alt={coworker.name}
                            />
                            <AvatarFallback>
                              {coworker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-medium">{coworker.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {coworker.status.type}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid lg:grid-cols-3 grid-cols-1 gap-4">
            <Card className="">
              <CardHeader>
                <div className="flex justify-between w-full border-b border-green-200 py-1">
                  {" "}
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    My Time Off
                  </CardTitle>
                  <Timer className=""></Timer>
                </div>

                <CardDescription className="text-[15px] font-medium"></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveHours.map((value, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 ">
                          {value.type}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline space-x-2">
                          <h1 className="text-4xl font-semibold text-gray-800 dark:text-green-600">
                            {value.hours}
                          </h1>
                          <span className="text-xl text-gray-500 dark:text-gray-400">
                            / 120 hours
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Used hours
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Entitlement
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium  text-gray-700 dark:text-gray-300">
                          Progress
                        </div>
                        <div className="w-full outline outline-1 outline-offset-1 outline-gray-300 dark:outline-slate-700 h-10 bg-gray-200 rounded-md dark:bg-gray-700">
                          <div
                            className={`h-10  rounded-md ${
                              (value.hours / 120) * 100 < 50
                                ? "bg-green-300 dark:bg-green-300"
                                : (value.hours / 120) * 100 < 75
                                ? "bg-green-400 dark:bg-green-400"
                                : (value.hours / 120) * 100 == 100
                                ? "bg-green-600"
                                : "bg-green-500 dark:bg-green-500"
                            }`}
                            style={{ width: `${(value.hours / 120) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 col-span-1">
              <CardHeader>
                <div className="flex justify-between border-b border-green-200 py-1">
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    Time Management
                  </CardTitle>
                  <CalendarDays className=""></CalendarDays>
                </div>
                <CardDescription>Tasks assigned to you</CardDescription>
              </CardHeader>
              <CardContent className="">
                {calendar({
                  vacation: 120 - leaveHours[0].hours,
                  sick: 120 - leaveHours[1].hours,
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
