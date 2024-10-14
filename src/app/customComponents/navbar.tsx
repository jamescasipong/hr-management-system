"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideDark } from "@/contextComponent/SideDark";
import {
  Bell,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Home,
  Menu,
  Moon,
  Sun,
  Users
} from "lucide-react";
import { usePathname } from "next/navigation"; // Import useRouter
import { useContext, useEffect, useState } from "react";
 

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("https://avatars.githubusercontent.com/u/144509235?v=4");
  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }
  const { isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode } = context;

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

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }
  , [isDarkMode]);
 
            {/*{ icon: FileText, label: "Leaves", link: "/leaves" },
            { icon: Clock, label: "Overtimes", link: "/overtimes" },*/}
  const pathname = usePathname();
  return (
    pathname !== "/" && <div>
      <aside
        className={` fixed  inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src={`${isDarkMode ? "hrlogowhite.png" : "hrlogo.png"}`}
              alt="HR Logo"
              className="h-8 w-8"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              HRConnect
            </h1>
          </div>
          <Button
            className="dark:hover:bg-gray-900"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {[
            { icon: Home, label: "Dashboard", link: "/dashboard" },
            { icon: Users, label: "Employees", link: "/employees" },
            { icon: Calendar, label: "Attendance", link: "/attendance" },
            { icon: DollarSign, label: "Payroll", link: "/payroll" },
            { icon: FileText, label: "Leaves", link: "/leaves" },
            { icon: Clock, label: "Overtimes",  link: "/overtimes" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <header
          className={`bg-white dark:bg-gray-800 shadow-sm z-10 border-b ${
            isSidebarOpen ? "" : "fixed top-0 right-0 left-0"
          }`}
        >
          <div
            className={` ${
              isSidebarOpen ? "w-full" : "2xl:w-[1500px] xl:w-full "
            } mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center `}
          >
            <div className="flex items-center">
              {isSidebarOpen ? null : (
                <div className="flex items-center space-x-2">
                  <img
                    src={`${isDarkMode ? "hrlogowhite.png" : "hrlogo.png"}`}
                    alt="HR Logo"
                    className="h-8 w-8"
                  />
                  <h2 className="text-xl font-bold leading-7 text-gray-900 dark:text-white sm:text-2xl sm:truncate">
                    HRConnect
                  </h2>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className=" dark:bg-blue-50 sm:flex hidden"
              />
              {isDarkMode ? (
                <Moon className="sm:flex hidden justify-center h-5 w-5 text-gray-300" />
              ) : (
                <Sun className="sm:flex hidden justify-center h-5 w-5 text-yellow-500" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="sm:flex justify-center hidden mr-2"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Dialog
                open={isProfileModalOpen}
                onOpenChange={setIsProfileModalOpen}
              >
                <DialogTrigger asChild>
                  <div className="dark:hover:bg-slate-300 relative z-0 p-1 dark:hover:border-slate-300 hover:bg-blue-400 transition-all duration-200 rounded-full ">
                    {/* <div className="relative z-0">
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
                      </div>*/}

                    <div
                      className={`w-3 h-3 rounded-full bg-green-600 absolute bottom-[2%] right-2 z-10`}
                    ></div>
                    <Avatar className="cursor-pointer ">
                      <AvatarImage src={profilePicUrl} alt="Profile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DialogTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className={`dark:hover:bg-gray-900 mr-4 transition-all duration-300 ${
                    isSidebarOpen ? "hidden" : ""
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
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
  </div>
  );
  }
  


export default Navbar;