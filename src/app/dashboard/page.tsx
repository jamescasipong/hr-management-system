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
import { SideDark } from "../../contextComponent/SideDark";
import { ComboBoxResponsive } from "../../customComponents/comboBoxResponsive";
import calendar from "../../customComponents/customCalendar";
import employees from "../data";

export default function Dashboard() {
  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }
  const { isSidebarOpen, toggleSidebar } = context;
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [workingHours, setWorkingHours] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [chatIsOpen, setIsChatOpen] = useState(false);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://avatars.githubusercontent.com/u/144509235?v=4"
  );

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
    employees.find((e) => e.username === "jcasipong")
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
    if (isClockedIn && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = (now.getTime() - startTime.getTime()) / 1000 / 60 / 60;
        setWorkingHours(Number(diff.toFixed(2)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, startTime]);

  const changeStatus = (status: string) => {
    if (status === "In Office") {
      return "bg-green-500";
    }
    if (status === "On Leave") {
      return "bg-red-500";
    }
    if (status === "Working Remotely") {
      return "bg-yellow-500";
    }
  };

  const handleClockInOut = () => {
    const now = new Date();
    if (isClockedIn) {
      setIsClockedIn(false);
      setEndTime(now);
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
      setIsClockedIn(true);
      setStartTime(now);
      setWorkingHours(0);
      setEndTime(null);
    }
    setIsClockModalOpen(false);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: "You",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: newMessage.trim(),
        },
      ]);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "N/A";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex h-full  bg-gray-100  dark:bg-gray-900 transition-colors duration-200`}
    >
      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto duration-200 ${
          isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
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
            <Card className="lg:mb-6 md:mb-3 mb-6   dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between ">
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    My Schedule
                  </CardTitle>
                  <CalendarCheck2 className="text-blue-500"></CalendarCheck2>
                </div>
                <CardDescription>
                  <span className="font-medium t">Working Hours </span>{" "}
                  <span className="text-blue-400 font-bold">
                    8:00 AM to 5:00 PM
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between ">
                  <div className="">
                    <p className="text-2xl font-bold">
                      {workingHours.toFixed(2)} hrs
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-[14px]">
                      Today&apos;s working hour
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-[14px]">
                      Clock In: {formatTime(startTime)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-[14px]">
                      Clock Out: {formatTime(endTime)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center sm:flex-row flex-col gap-2">
                    <Dialog
                      open={isClockModalOpen}
                      onOpenChange={setIsClockModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="dark:bg-blue-600 dark:hover:bg-blue-700 w-full dark:text-white"
                          variant={isClockedIn ? "destructive" : "default"}
                        >
                          {isClockedIn ? "Clock Out" : "Clock In"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="dark:bg-gray-800 rounded-lg">
                        <DialogHeader>
                          <DialogTitle>
                            {isClockedIn ? "Clock Out" : "Clock In"}
                          </DialogTitle>
                          <DialogDescription>
                            {isClockedIn
                              ? "Are you sure you want to clock out?"
                              : "Are you ready to start your workday?"}
                          </DialogDescription>
                          <ComboBoxResponsive></ComboBoxResponsive>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button
                            className="border-gray-300 dark:border-gray-600 border shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600"
                            variant="outline"
                            onClick={() => setIsClockModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                            onClick={handleClockInOut}
                          >
                            {isClockedIn ? "Clock Out" : "Clock In"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="dark:bg-gray-900 dark:hover:bg-gray-700"
                      >
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
              <DialogContent className="sm:max-w-[625px] dark:bg-slate-800">
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
            <Card className="mb-6 dark:bg-gray-800 ">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    Co-workers Attendance
                  </CardTitle>
                  <Group className="text-blue-500"></Group>
                </div>

                <CardDescription>Today's attendance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                        className="flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg p-2 cursor-pointer transition-all duration-100 ease-in-out"
                      >
                        <div className="relative z-0">
                          <div
                            className={`w-3 h-3 rounded-full ${changeStatus(
                              coworker.status.type
                            )} absolute bottom-0 right-1 z-10`}
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
            <Card className="dark:bg-gray-800 ">
              <CardHeader>
                <div className="flex justify-between">
                  {" "}
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    My Time Off
                  </CardTitle>
                  <Timer className="text-blue-500"></Timer>
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
                          <h1 className="text-4xl font-semibold text-gray-800 dark:text-blue-600">
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
                                ? "bg-blue-300 dark:bg-blue-300"
                                : (value.hours / 120) * 100 < 75
                                ? "bg-blue-400 dark:bg-blue-400"
                                : (value.hours / 120) * 100 == 100
                                ? "bg-blue-600"
                                : "bg-blue-500 dark:bg-blue-500"
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
            <Card className=" dark:bg-gray-800  md:col-span-2 col-span-1">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-[20px] md:text-[24px] xl:text-[24px]">
                    Time Management
                  </CardTitle>
                  <CalendarDays className="text-blue-500"></CalendarDays>
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
