"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Users, Calendar, Clock, FileText, BarChart2, Settings, HelpCircle, Bell, LogOut, User, DollarSign, ChevronDown, Mail, MenuIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

type UserRole = "admin" | "manager" | "employee"

interface UserData {
  name: string
  email: string
  role: UserRole
  avatar?: string
  department?: string
  position?: string
  notifications?: number
}

interface SidebarProps {
  userData: UserData
}

export function DashboardSidebar({ userData }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  // Define navigation items based on user role
  const getNavigationItems = (role: UserRole) => {
    const items = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: Home,
        access: ["admin", "manager", "employee"],
      },
      {
        name: "Employees",
        href: "/employees",
        icon: Users,
        access: ["admin", "manager"],
        subItems: [
          { name: "Directory", href: "/employees/directory" },
          { name: "Onboarding", href: "/employees/onboarding" },
          { name: "Performance", href: "/employees/performance" },
        ],
      },
      {
        name: "Attendance",
        href: "/attendance",
        icon: Calendar,
        access: ["admin", "manager", "employee"],
      },
      {
        name: "Leave Requests",
        href: "/leave-requests",
        icon: FileText,
        access: ["admin", "manager", "employee"],
      },
      {
        name: "Overtime",
        href: "/overtime",
        icon: Clock,
        access: ["admin", "manager", "employee"],
      },
      {
        name: "Payroll",
        href: "/payroll",
        icon: DollarSign,
        access: ["admin", "manager", "employee"],
      },
      {
        name: "Analytics",
        href: "/analytics",
        icon: BarChart2,
        access: ["admin", "manager"],
        subItems: [
          { name: "Attendance", href: "/analytics/attendance" },
          { name: "Performance", href: "/analytics/performance" },
          { name: "Payroll", href: "/analytics/payroll" },
        ],
      },
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
        access: ["admin"],
        subItems: [
          { name: "Company", href: "/settings/company" },
          { name: "Departments", href: "/settings/departments" },
          { name: "Roles", href: "/settings/roles" },
          { name: "Integrations", href: "/settings/integrations" },
        ],
      },
    ]

    return items.filter(item => item.access.includes(role))
  }

  const navigationItems = getNavigationItems(userData.role)

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-4">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Connect</span>
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* User Profile Section */}
          <div className="px-4 py-2">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarImage src={userData.avatar || "/placeholder.svg?height=32&width=32"} alt={userData.name} />
                <AvatarFallback>
                  {userData.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{userData.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData.position}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800 w-full justify-center">
              {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
            </Badge>
          </div>

          <div className="mt-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {item.subItems ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton tooltip={item.name}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={item.href}>
                          <DropdownMenuItem>Overview</DropdownMenuItem>
                        </Link>
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.name} href={subItem.href}>
                            <DropdownMenuItem>{subItem.name}</DropdownMenuItem>
                          </Link>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href={item.href}>
                      <SidebarMenuButton 
                        isActive={isActive(item.href)}
                        tooltip={item.name}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </Link>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-4 py-2 space-y-2">
            <Link href="/help">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </Link>
            {mounted && (
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>
            )}
            <Link href="/logout">
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
        <MenuIcon className="h-6 w-6" />
      </Button>
      
      <div className="ml-auto flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Mail className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/logout">
              <DropdownMenuItem className="text-red-500 hover:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
