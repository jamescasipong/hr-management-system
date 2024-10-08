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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Calendar,
  CalendarCheck2,
  CalendarDays,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  Group,
  Home,
  Menu,
  Moon,
  Scaling,
  Send,
  Sun,
  Timer,
  Users
} from "lucide-react";
import React, { useEffect, useState } from "react";
import calendar from "../../components/ui/calendar";
import dropdown from "../../components/ui/dropdown";

export default function Dashboard() {
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [weeklyClockData, setWeeklyClockData] = useState([
    { day: "Monday", clockIn: "09:00 AM", clockOut: "05:00 PM" },
    { day: "Tuesday", clockIn: "08:45 AM", clockOut: "05:15 PM" },
    { day: "Wednesday", clockIn: "09:15 AM", clockOut: "05:30 PM" },
    { day: "Thursday", clockIn: "08:30 AM", clockOut: "04:45 PM" },
    { day: "Friday", clockIn: "09:00 AM", clockOut: "05:00 PM" },
  ]);
  const [coworkers, setCoworkers] = useState([
    {
      name: "Pereson One",
      avatar: "/placeholder.svg?height=32&width=32",
      status: { type: "In Office", color: "green" },
    },
    {
      name: "Person Two",
      avatar: "/placeholder.svg?height=32&width=32",
      status: { type: "On Leave", color: "red" },
    },
    {
      name: "Person Three",
      avatar: "/placeholder.svg?height=32&width=32",
      status: { type: "In Office", color: "green" },
    },
    {
      name: "Person Four",
      avatar: "/placeholder.svg?height=32&width=32",
      status: { type: "In Office", color: "green" },
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "N/A";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex h-full  bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <aside
        className={` fixed  inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            HR Connect
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {[
            { icon: Home, label: "Dashboard" },
            { icon: Users, label: "Employees" },
            { icon: Calendar, label: "Attendance" },
            { icon: DollarSign, label: "Payroll" },
            { icon: FileText, label: "Leaves" },
            { icon: Clock, label: "Overtimes" },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto duration-200 ${
          isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
        }`}
      >
        {/* Header */}
        <header
          className={`bg-white dark:bg-gray-800 shadow-sm z-10 border ${
            isSidebarOpen ? "" : "fixed top-0 right-0 left-0"
          }`}
        >
          <div
            className={` md:w-[1500px] w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center `}
          >
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={`mr-4 transition-all duration-300 ${
                  isSidebarOpen ? "opacity-0 invisible" : ""
                }`}
              >
                <Menu className="h-6 w-6" />
              </Button>
              {isSidebarOpen ? null : (
                <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                  HR Connect
                </h2>
              )}
            </div>
            <div className="flex items-center space-x-4 ">
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className=" dark:bg-blue-50"
              />
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Dialog
                open={isProfileModalOpen}
                onOpenChange={setIsProfileModalOpen}
              >
                <DialogTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={profilePicUrl} alt="Profile" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
                  <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogDescription>
                      View and update your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 ">
                      <TabsTrigger value="profile">My Profile</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={profilePicUrl} alt="Profile" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Label
                            htmlFor="picture"
                            className="cursor-pointer dark:bg-blue-500 dark:text-white bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-3 rounded-md"
                          >
                            Upload Picture
                          </Label>
                          <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePicChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="James Casipong" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            defaultValue="jamesxcasipong@gmail.com"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="w-full dark:bg-blue-500 text-white">
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              window.location.href = "/profile";
                            }}
                            className="w-full dark:bg-blue-500 text-white"
                          >
                            View Complete Profile
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="settings">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select
                            id="language"
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notifications">Notifications</Label>
                          <div className="flex items-center space-x-2 ">
                            <Switch
                              id="notifications"
                              className="dark:bg-blue-500"
                            />
                            <Label htmlFor="notifications">
                              Receive email notifications
                            </Label>
                          </div>
                        </div>
                        <Button className="w-full dark:bg-blue-500 text-white">
                          Save Settings
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div
          className={`mx-auto py-6 sm:px-6  lg:px-8 p-5 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}
        >
          {/* Clock In/Out Card */}
          <div className="grid md:grid-cols-2 md:gap-4 gap-0 ">
            <Card className="mb-6 dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>My Schedule</CardTitle>
                  <CalendarCheck2></CalendarCheck2>
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
                  <div>
                    <p className="text-2xl font-bold">
                      {workingHours.toFixed(2)} hours
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
                  <div className="space-y-2 space-x-2">
                    <Dialog
                      open={isClockModalOpen}
                      onOpenChange={setIsClockModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                          variant={isClockedIn ? "destructive" : "default"}
                        >
                          {isClockedIn ? "Clock Out" : "Clock In"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="dark:bg-gray-800">
                        <DialogHeader>
                          <DialogTitle>
                            {isClockedIn ? "Clock Out" : "Clock In"}
                          </DialogTitle>
                          <DialogDescription>
                            {isClockedIn
                              ? "Are you sure you want to clock out?"
                              : "Are you ready to start your workday?"}
                          </DialogDescription>
                          <div>{dropdown("Select a status")}</div>
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
                        className="dark:bg-gray-900 dark:hover:bg-gray-950"
                      >
                        <Button variant="outline">
                          View Summary <ChevronDown className="ml-2 h-4 w-4 " />
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
                  <CardTitle>Co-workers Attendance</CardTitle>
                  <Group></Group>
                </div>

                <CardDescription>Today's attendance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {coworkers.map((coworker, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="relative z-0">
                        <div
                          className={`w-3 h-3 rounded-full ${changeStatus(
                            coworker.status.type
                          )} absolute bottom-0 right-1 z-10`}
                        ></div>
                        <Avatar className="border-[1px] border-slate-200">
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
                <div className="flex justify-between"> <CardTitle>My Time Off</CardTitle>
                <Timer></Timer></div>
               
                
                <CardDescription className="text-[15px] font-medium"></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Vacation Leave",
                      hours: 120,
                      entitlement: 120,
                    },
                    {
                      type: "Sick Leave",
                      hours: 4,
                      entitlement: 24,
                    },
                  ].map((value, index) => (
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
                          <h1 className="text-4xl font-semibold text-blue-600">
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
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Progress
                        </div>
                        <div className="w-full h-10 bg-gray-200 rounded-md dark:bg-gray-700">
                          <div
                            className={`h-10 rounded-md ${
                              (value.hours / 120) * 100 < 50
                                ? "bg-blue-600 dark:bg-blue-500"
                                : (value.hours / 120) * 100 < 75
                                ? "bg-yellow-600 dark:bg-yellow-500"
                                : (value.hours / 120) * 100 == 100
                                ? "bg-red-800"
                                : "bg-red-600 dark:bg-red-500"
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
                <CardTitle>Time Management</CardTitle>
                <CalendarDays></CalendarDays>
                </div>
                <CardDescription>Tasks assigned to you</CardDescription>
              </CardHeader>
              <CardContent>{calendar()}</CardContent>
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
              className={`bg-blue-600 ${
                chatIsOpen ? "mb-5" : ""
              } rounded-t-lg rounded-b-sm cursor-pointer p-4`}
            >
              <div className="flex justify-between">
                {chatIsOpen ? (
                  <CardTitle className="text-white">IT Teams</CardTitle>
                ) : (
                  <div className="p-1 hover:bg-blue-600 transition-all duration-100 rounded-md flex gap-2 text-center text-white">
                    Chat<Menu className="text-white "></Menu>
                  </div>
                )}

                {chatIsOpen ? (
                  <div
                    onClick={() => {
                      window.location.href = "/xd";
                    }}
                    className="p-1 hover:bg-blue-600 transition-all duration-100 rounded-md"
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
