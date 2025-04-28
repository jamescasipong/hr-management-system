"use client";

import type * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Users,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/context/api-state-session/notification-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/layout/sidebar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect, useContext } from "react";
import { Building } from "lucide-react";
import { logout } from "@/lib/api/auth";
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
  };
};

type AppSidebarProps = {
  isAdmin: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
};

export function SideBar({
  isAdmin,
  isDisabled = false,
  children,
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://avatars.githubusercontent.com/u/144509235?v=4"
  );
  const [logo] = useState(
    "https://raw.githubusercontent.com/jamescasipong/hr-management-system/refs/heads/main/public/hrlogo.png"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for demo
  const [language, setLanguage] = useState("English");
  const { notifications, setNotifications, markAsRead } = useNotifications() ?? { notifications: [], setNotifications: () => {}, markAsRead: () => {}};

  console.log(notifications)


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

    markAsRead(id);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setIsProfileModalOpen(false);
    router.push("/signin");
    router.refresh();
  };

  const handleViewProfile = () => {
    setIsProfileModalOpen(false);
    router.push("/profile/me");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (isDisabled || pathname === "/") {
    return null;
  }

  const adminNavItems = [
    { icon: Home, label: "Dashboard", link: "/admin/dashboard" },
    { icon: Users, label: "Employees", link: "/admin/employees" },
    { icon: Calendar, label: "Attendance", link: "/admin/attendance" },
    { icon: DollarSign, label: "Payroll", link: "/admin/payroll" },
    { icon: Settings, label: "Settings", link: "/usersettings" },
    { icon: Building, label: "Department", link: "/admin/department" },
  ];

  const userNavItems = [
    { icon: Home, label: "Dashboard", link: "/dashboard" },
    { icon: Calendar, label: "Attendance", link: "/attendance" },
    { icon: DollarSign, label: "Payroll", link: "/payroll" },
    { icon: Settings, label: "Settings", link: "/usersettings" },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <SidebarProvider className="">
      <Sidebar className="">
        <SidebarHeader className="bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <img
                src={logo || "/placeholder.svg"}
                alt="HR Logo"
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold text-primary">HRConnect</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-card">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.link}
                      className="hover:bg-primary/10"
                    >
                      <a href={item.link}>
                        <item.icon className="size-5" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-card">
          <div className="p-4">
            <Dialog
              open={isProfileModalOpen}
              onOpenChange={setIsProfileModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-start gap-2"
                >
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-green-600 absolute bottom-0 right-0 z-10"></div>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={profilePicUrl} alt="Profile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="truncate">My Profile</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-lg">
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
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => {
                            setIsProfileModalOpen(false);
                          }}
                          className="w-full"
                        >
                          Save
                        </Button>
                        <Button onClick={handleViewProfile} className="w-full">
                          View Complete Profile
                        </Button>
                        <Button onClick={handleLogout} className="w-full">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className="space-y-4 mt-5">
                      <Select value={language} onValueChange={(value:string) => setLanguage(value)} >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {["English", "Filipino", "Japanese"].map((lang) => (
                              <SelectItem value={lang} key={lang}>{lang}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <Label htmlFor="notifications">Notifications</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="notifications" />
                          <Label htmlFor="notifications">
                            Receive email notifications
                          </Label>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setIsProfileModalOpen(false);
                        }}
                        className="w-full"
                      >
                        Save Settings
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <div className="flex-1">
        <header className="bg-card shadow-sm z-10 border-b sticky top-0">
          <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <DropdownMenuItem
                        key={notif.notificationId}
                        onClick={() =>
                          handleNotificationClick(notif.notificationId)
                        }
                        className={`flex items-center justify-between p-2 ${
                          notif.isRead ? "opacity-50" : ""
                        }`}
                      >
                        <div>
                          <div className="font-medium">
                            {notif.notification.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {notif.notification.message}
                          </div>
                        </div>
                        {!notif.isRead && (
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                        )}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      No notifications
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-green-600 absolute bottom-0 right-0 z-10"></div>
                    <Avatar>
                      <AvatarImage src={profilePicUrl} alt="Profile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DialogTrigger>
              </Dialog> */}
            </div>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
