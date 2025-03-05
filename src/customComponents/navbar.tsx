"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
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
import { ModeToggle } from "@/components/ui/modeToggle";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideDark } from "@/contextComponent/SideDark";
import {
  Bell,
  Calendar,
  DollarSign,
  Home,
  Menu,
  Users
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {logout} from "@/api/auth";
import instanceApi from "@/api/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/authContext";
import { stringify } from "querystring";


type UserNotification = {
  notificationId: number;
  employeeId: string;
  isRead: boolean;
  status: string;
  notification: {
    title: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }
}
type NavBar = {
  isAdmin: boolean;
  isDisabled: boolean;
}

const Navbar = ({isAdmin, isDisabled}: NavBar) => {
  const pathname = usePathname();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://avatars.githubusercontent.com/u/144509235?v=4"
  );

  const [logo] = useState(
    "https://raw.githubusercontent.com/jamescasipong/hr-management-system/refs/heads/main/public/hrlogo.png"
  );

  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  const context = useContext(SideDark);
  console.log("isDisabled", isDisabled);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await instanceApi.get("/notification/my-notifications");
        setNotifications(response.data.data);


        console.log("notifications", response.data  );

      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);


  if (!context) {
    throw new Error("SideDark context is undefined");
  }

  const { isSidebarOpen, toggleSidebar } = context;
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();

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


  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.notificationId === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  console.log("isAdmin", isAdmin);

  const handleLogout = async () => {
    await logout();
    setIsProfileModalOpen(false);
    router.push("/");
  }

  const handleViewProfile = async () => {
    setIsProfileModalOpen(false);
    router.push("/profile/me");
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;


  if (isDisabled) {
    return null;
  }

  return (
    pathname !== "/" && (
      <div>
        <aside
          className={`fixed inset-y-0 left-0 sm:block hidden z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="HR Logo" className={`h-10 w-10  `} />
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
            {
              isAdmin ?
              (
                  [
                    { icon: Home, label: "Dashboard", link: "/dashboard" },
                    { icon: Users, label: "Employees", link: "/employees" },
                    { icon: Calendar, label: "Attendance", link: "/attendance" },
                    { icon: DollarSign, label: "Payroll", link: "/payroll" },
                  ].map((item: { icon: React.ElementType; label: string; link: string }, index: number) => (
                    <a
                      key={index}
                      href={item.link}
                      className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </a>
                  ))
              ) : (
                [
                  { icon: Home, label: "Dashboard", link: "/dashboard" },
                  { icon: Calendar, label: "Attendance", link: "/attendance" },
                  { icon: DollarSign, label: "Payroll", link: "/payroll" },
                ].map((item: { icon: React.ElementType; label: string; link: string }, index: number) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </a>
                ))
              )
            }
          </nav>
        </aside>

        <aside
          className={`fixed inset-y-0 left-0 sm:hidden block h-full z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="HR Logo" className={`h-10 w-10  `} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                HRConnect
              </h1>
            </div>

            <Button
              className="dark:hover:bg-gray-900"
              variant="ghost"
              size="icon"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="mt-6">
           {(
              [
                { icon: Home, label: "Dashboard", link: "/dashboard" },
                { icon: Users, label: "Employees", link: "/employees" },
                { icon: Calendar, label: "Attendance", link: "/attendance" },
                { icon: DollarSign, label: "Payroll", link: "/payroll" },
              ].map((item: { icon: React.ElementType; label: string; link: string }, index: number) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              ))
            )}
          </nav>
        </aside>

        <header
          className={`bg-white dark:bg-gray-800 shadow-sm z-10 border-b ${
            isSidebarOpen ? "" : "fixed top-0 right-0 left-0"
          }`}
        >
          <div
            className={`${
              isSidebarOpen ? "w-full" : "2xl:w-[1500px] xl:w-full"
            } mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center`}
          >
            <div className="flex  items-center">
              {isSidebarOpen ? null : (
                <div className="sm:flex hidden items-center space-x-2">
                  <img src={logo} alt="HR Logo" className="h-12 w-12" />
                  <h2 className="text-xl font-bold leading-7 text-gray-900 dark:text-white sm:text-2xl sm:truncate">
                    HRConnect
                  </h2>
                </div>
              )}

              <div className="sm:hidden flex items-center space-x-2">
                <img src={logo} alt="HR Logo" className="h-12 w-12" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="sm:flex justify-center hidden mr-2 dark:hover:bg-gray-900 relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  {notifications.map((notif) => (
                    <DropdownMenuItem
                      key={notif.notificationId}
                      onClick={() => handleNotificationClick(notif.notificationId)}
                      className={`flex items-center justify-between p-2 ${
                        notif.isRead ? "opacity-50" : ""
                      }`}
                    >
                      <span>{notif.notificationId}</span>
                      {!notif.isRead && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={isProfileModalOpen}
                onOpenChange={setIsProfileModalOpen}
              >
                <DialogTrigger asChild>
                  <div className="dark:hover:bg-slate-300 relative z-0 p-1 dark:hover:border-slate-300 hover:bg-blue-400 transition-all duration-200 rounded-full">
                    <div
                      className={`w-3 h-3 rounded-full bg-green-600 absolute bottom-[2%] right-2 z-10`}
                    ></div>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={profilePicUrl} alt="Profile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DialogTrigger>
                {!isSidebarOpen && <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className={`sm:flex hidden dark:hover:bg-gray-900 mr-4 transition-all duration-300 `}
                >
                  <Menu className="h-6 w-6" />
                </Button>}
                {!mobileSidebarOpen && <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSidebarOpen((prev) => !prev)}
                  className={`sm:hidden flex  dark:hover:bg-gray-900 mr-4 transition-all duration-300 `}
                >
                  <Menu className="h-6 w-6" />
                </Button>}
                <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 rounded-lg">
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
                            className="cursor-pointer dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-3 rounded-md"
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
                          <Button
                            onClick={() => {
                              setIsProfileModalOpen(false);
                            }}
                            className="w-full dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleViewProfile}
                            className="w-full dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                          >
                            View Complete Profile
                          </Button>
                          <Button
                            onClick={handleLogout}
                            className="w-full dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                          >
                            Logout
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
                          <div className="flex items-center space-x-2">
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

        {/*

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
         */}
      </div>
    )
  );
};

export default Navbar;
