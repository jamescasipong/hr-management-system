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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarCheck2,
  CalendarDays,
  ChevronDown,
  Group,
  Menu,
  Scaling,
  Send,
  Timer
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { SideDark } from "../../contextComponent/SideDark";
import { ComboBoxResponsive } from "../customComponents/comboBoxResponsive";
import calendar from "../customComponents/customCalendar";

export default function Dashboard() {
  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }
  const {isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode} = context;
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
  const [coworkers, setCoworkers] = useState([
    {
      name: "Light Yagami",
      avatar:
        "https://styles.redditmedia.com/t5_3jtcg/styles/communityIcon_hjdrjuo032a41.png",
      status: { type: "In Office", color: "green" },
    },
    {
      name: "Arisu Sakayanagi",
      avatar: "https://up.quizlet.com/3j85ur-Vcyjj-256s.jpg",
      status: { type: "On Leave", color: "red" },
    },
    {
      name: "Beluga",
      avatar:
        "data:image/jpeg;base64,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",
      status: { type: "In Office", color: "green" },
    },
    {
      name: "Sosuke Aizen",
      avatar:
        "https://styles.redditmedia.com/t5_bzsm0u/styles/profileIcon_hv49qtnbg3dd1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=d656ec20a2c7d43b4bddf4687a0fcb891a9a8cca",
      status: { type: "In Office", color: "green" },
    },
  ]);
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

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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
      className={`flex h-full  bg-gray-100  dark:bg-gray-900 transition-colors duration-200 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto duration-200 ${
          isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
        }`}
      >
        

        {/* Dashboard Content */}
        <div
          className={`mx-auto  overflow-y-auto py-6 sm:px-6  lg:px-8 p-5 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}
        >
          {/* Clock In/Out Card */}
          <div className="grid lg:grid-cols-2 md:gap-4 gap-0 grid-cols-1">
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
                          <div>{ComboBoxResponsive()}</div>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button
                            className="border-2 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600"
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
                          className="border-gray-300 dark:border-gray-500 border-[1px] dark:hover:bg-slate-800 shadow-sm"
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
                  {coworkers.map((coworker, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="relative z-0">
                        <div
                          className={`w-3 h-3 rounded-full ${changeStatus(
                            coworker.status.type
                          )} absolute bottom-0 right-1 z-10`}
                        ></div>
                        <Avatar className="border-[1px] dark:border-slate-700">
                          <AvatarImage
                            src={coworker.avatar}
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

          {/* Chat System */}

          <Card
            className={` ${
              chatIsOpen ? "" : "w-[100px]"
            } dark:bg-gray-800 bottom-0 fixed right-1 shadow-md transition-all duration-300 ease-in-out`}
          >
            <CardHeader
              onClick={() => setIsChatOpen((prev) => !prev)}
              className={`bg-gray-700 ${
                chatIsOpen ? "mb-5" : ""
              } rounded-t-lg rounded-b-sm cursor-pointer p-4`}
            >
              <div className="flex justify-between">
                {chatIsOpen ? (
                  <CardTitle className="text-white">IT Teams</CardTitle>
                ) : (
                  <div className="p-0  transition-all duration-100 rounded-md flex gap-2 text-center text-white">
                    Chat<Menu className="text-white "></Menu>
                  </div>
                )}

                {chatIsOpen ? (
                  <div
                    onClick={() => {
                      window.location.href = "/xd";
                    }}
                    className="p-1 hover:bg-gray-600 transition-all duration-100 rounded-md"
                  >
                    <Scaling className="text-white"></Scaling>
                  </div>
                ) : null}
              </div>
              <CardDescription
                className={` ${chatIsOpen ? "" : "hidden"} text-blue-50`}
              >
                Communicate with your team members
              </CardDescription>
            </CardHeader>

            <CardContent
              className={`transition-all duration-300 ease-in-out ${
                chatIsOpen
                  ? "max-h-[400px] opacity-100"
                  : "p-0  scale-0 max-h-0  opacity-0 overflow-hidden"
              }`}
            >
              <ScrollArea className="h-[300px] w-full rounded-md border p-4 dark:border-gray-700">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 dark:border-gray-600  border shadow-sm rounded-md p-2`}
                  >
                    <p
                      className={`font-semibold ${
                        message.sender == "You" ? "flex justify-end mr-5" : ""
                      }`}
                    >
                      {message.sender}
                    </p>
                    <p
                      className={`text-[12px] ${
                        message.sender == "You" ? "flex justify-end mr-5" : ""
                      } mb-2`}
                    >
                      {message.time}
                    </p>
                    <p
                      className={`text-gray-700 ${
                        message.sender == "You" ? "flex justify-start" : ""
                      } dark:text-gray-300`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex mt-4">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="dark:bg-gray-700 dark:text-white"
                />
                <Button onClick={handleSendMessage} className="ml-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
