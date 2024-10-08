"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Switch } from "@/app/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  Home,
  Menu,
  Moon,
  Send,
  Sun,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [workingHours, setWorkingHours] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://github.com/shadcn.png"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weeklyClockData, setWeeklyClockData] = useState([
    { day: "Monday", clockIn: "09:00 AM", clockOut: "05:00 PM" },
    { day: "Tuesday", clockIn: "08:45 AM", clockOut: "05:15 PM" },
    { day: "Wednesday", clockIn: "09:15 AM", clockOut: "05:30 PM" },
    { day: "Thursday", clockIn: "08:30 AM", clockOut: "04:45 PM" },
    { day: "Friday", clockIn: "09:00 AM", clockOut: "05:00 PM" },
  ]);
  const [coworkers, setCoworkers] = useState([
    {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "In Office",
    },
    {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "Remote",
    },
    {
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "In Office",
    },
    {
      name: "Diana Prince",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "On Leave",
    },
  ]);
  const [messages, setMessages] = useState([
    {
      sender: "Alice Johnson",
      content: "Hey team, how's the project coming along?",
    },
    {
      sender: "Bob Smith",
      content: "Making good progress. We should be done by EOD.",
    },
    {
      sender: "You",
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

  const handleClockInOut = () => {
    const now = new Date();
    if (isClockedIn) {
      setIsClockedIn(false);
      setEndTime(now);
      setWeeklyClockData((prev) => { prev[0] = { ...prev[0], clockOut: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }; return prev; });
    } else {
      setWeeklyClockData((prev) => { prev[0] = { ...prev[0], clockIn: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }; return prev; });
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
      setMessages([...messages, { sender: "You", content: newMessage.trim() }]);
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
      className={`flex h-screen  bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed  inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            HR System
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
        className={`flex-1 overflow-y-auto transition-all duration-200 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className={`bg-white dark:bg-gray-800 shadow-sm ${isSidebarOpen ? "" : "fixed top-0 right-0 left-0"}`}>
          <div className={`max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center `}>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={`mr-4 transition-all duration-300 ${isSidebarOpen ? "opacity-0 invisible" : ""}`}
              >
                <Menu className="h-6 w-6" />
              </Button>
              {isSidebarOpen ? null : <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                HR System
              </h2>}
            </div>
            <div className="flex items-center space-x-4">
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-blue-600"
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
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogDescription>
                      View and update your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
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
                            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-3 rounded-md"
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
                        <Button className="w-full">Update Profile</Button>
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
                          <div className="flex items-center space-x-2">
                            <Switch id="notifications" />
                            <Label htmlFor="notifications">
                              Receive email notifications
                            </Label>
                          </div>
                        </div>
                        <Button className="w-full">Save Settings</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className={`max-w-7xl  mx-auto py-6 sm:px-6 lg:px-8 p-5 ${isSidebarOpen ? "" : "pt-24"}`}>
          {/* Clock In/Out Card */}
          <Card className="mb-6 dark:bg-gray-800">
            <CardHeader>
              <CardTitle>My Schedule</CardTitle>
              <CardDescription>
                <span className="font-medium t">Working Hours </span> <span className="text-green-900 font-bold">8:00 AM to 5:00 PM</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {workingHours.toFixed(2)} hours
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Today's working hours
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Clock In: {formatTime(startTime)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Clock Out: {formatTime(endTime)}
                  </p>
                </div>
                <div className="space-y-2 space-x-2">
                  <Dialog
                    open={isClockModalOpen}
                    onOpenChange={setIsClockModalOpen}
                  >
                    <DialogTrigger asChild >
                      <Button variant={isClockedIn ? "destructive" : "default"}>
                        {isClockedIn ? "Clock Out" : "Clock In"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {isClockedIn ? "Clock Out" : "Clock In"}
                        </DialogTitle>
                        <DialogDescription>
                          {isClockedIn
                            ? "Are you sure you want to clock out?"
                            : "Are you ready to start your workday?"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsClockModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleClockInOut}>
                          {isClockedIn ? "Clock Out" : "Clock In"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="dark:bg-gray-900 dark:hover:bg-gray-950">
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
            <DialogContent className="sm:max-w-[625px] ">
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
          <Card className="mb-6 dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Co-workers Attendance</CardTitle>
              <CardDescription>Today's attendance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {coworkers.map((coworker, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={coworker.avatar} alt={coworker.name} />
                      <AvatarFallback>
                        {coworker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{coworker.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {coworker.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat System */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Team Chat</CardTitle>
              <CardDescription>
                Communicate with your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4 dark:border-gray-700">
                {messages.map((message, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{message.sender}</p>
                    <p className="text-gray-700 dark:text-gray-300">
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
