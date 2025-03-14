"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ModeToggle } from "@/components/ui/modeToggle"
import Link from "next/link"
import { Bell, Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, DollarSign, FileText, Home, LogOut, Menu, Moon, Settings, Sun, Users, BarChart3, Building, Briefcase, HelpCircle, MessageSquare, BellIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock user data - in a real app, this would come from authentication
const mockUsers = {
  "admin": {
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  "hr": {
    name: "HR Manager",
    email: "hr@example.com",
    role: "hr",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  "manager": {
    name: "Department Manager",
    email: "manager@example.com",
    role: "manager",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  "employee": {
    name: "John Employee",
    email: "employee@example.com",
    role: "employee",
    avatar: "/placeholder.svg?height=40&width=40"
  }
}

type MainLayoutProps = {
  children: React.ReactNode
}

type User = {
  name: string,
  email: string,
  role: string,
  avatar: string
}

type UserRole = keyof typeof mockUsers;


export default function MainLayout({ children }: MainLayoutProps) {
  // For demo purposes, we'll use a state to simulate different user roles
  // In a real app, this would come from your authentication system

  const [userRole, setUserRole] = useState<UserRole>("employee")
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.employee)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  const router = useRouter()
  const pathname = usePathname()

  // Simulate checking authentication
  useEffect(() => {
    // In a real app, you would check if the user is authenticated
    // and redirect to login if not
    const simulatedAuthCheck = true
    if (!simulatedAuthCheck) {
      router.push("/login")
    }
  }, [router])

  // Update current user when role changes
  useEffect(() => {
    setCurrentUser(mockUsers[userRole])
  }, [userRole])



  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className={``}>
      <MainLayoutContent 
        userRole={userRole} 
        setUserRole={setUserRole} 
        currentUser={currentUser}
        pathname={pathname}
        toggleDarkMode={toggleDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      >
        {children}
      </MainLayoutContent>
    </div>
  )
}

type MainLayoutContentProps = {
  children: React.ReactNode,
  userRole: string,
  setUserRole: (role: UserRole) => void,
  currentUser: { name: string, email: string, role: string, avatar: string },
  pathname: string,
  toggleDarkMode: () => void,
  isSidebarCollapsed: boolean,
  toggleSidebar: () => void
}

function MainLayoutContent({ 
  children, 
  userRole, 
  setUserRole, 
  currentUser, 
  pathname,
  toggleDarkMode,
  isSidebarCollapsed,
  toggleSidebar
}: MainLayoutContentProps) {
  const [notifications, setNotifications] = useState([
    "New payroll has been processed",
    "Meeting scheduled for tomorrow at 10 AM",
    "3 leave requests pending approval"
  ])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const {theme, setTheme} = useTheme()
  const isDarkMode = theme === "dark"
  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    window.location.href = "/login"
  }

  const removeNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index))
  }

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      { icon: Home, label: "Dashboard", href: "/main/dashboard" },
      { icon: Calendar, label: "Calendar", href: "/main/calendar" },
    ]

    const roleSpecificItems: any = {
      admin: [
        { 
          icon: Users, 
          label: "Employees", 
          href: "/main/employees",
          badge: { text: "New", variant: "default" }
        },
        { icon: DollarSign, label: "Payroll", href: "/main/payroll" },
        { icon: Clock, label: "Attendance", href: "/main/attendance" },
        { icon: FileText, label: "Reports", href: "/main/reports" },
        { icon: Building, label: "Departments", href: "/main/departments" },
        { icon: Settings, label: "Settings", href: "/main/settings" },
      ],
      hr: [
        { icon: Users, label: "Employees", href: "/main/employees" },
        { icon: DollarSign, label: "Payroll", href: "/main/payroll" },
        { icon: Clock, label: "Attendance", href: "/main/attendance" },
        { icon: FileText, label: "Leave Management", href: "/main/leaves" },
        { icon: BarChart3, label: "Reports", href: "/main/hr-reports" },
      ],
      manager: [
        { icon: Users, label: "My Team", href: "/main/team" },
        { icon: Clock, label: "Team Attendance", href: "/main/team-attendance" },
        { icon: FileText, label: "Leave Approvals", href: "/main/leave-approvals" },
        { icon: BarChart3, label: "Performance", href: "/main/performance" },
        { 
          icon: MessageSquare, 
          label: "Team Chat", 
          href: "/main/team-chat",
          badge: { text: "3", variant: "destructive" }
        },
      ],
      employee: [
        { icon: Clock, label: "My Attendance", href: "/main/my-attendance" },
        { icon: FileText, label: "Leave Requests", href: "/main/leave-requests" },
        { icon: DollarSign, label: "My Payslips", href: "/main/payslips" },
        { icon: Briefcase, label: "My Tasks", href: "/main/tasks" },
      ],
    }

    return [...commonItems, ...roleSpecificItems[userRole]]
  }

  const navigationItems = getNavigationItems()
  const supportItems = [
    { icon: HelpCircle, label: "Help Center", href: "/main/help" },
    { icon: MessageSquare, label: "Support", href: "/main/support" },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-[80px]" : "w-[280px]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground">
              <Briefcase className="h-6 w-6" />
            </div>
            {!isSidebarCollapsed && (
              <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">HR Connect</h1>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile */}
        <div className={cn(
          "flex items-center p-4 border-b dark:border-gray-700",
          isSidebarCollapsed ? "flex-col" : "space-x-3"
        )}>
          <Avatar className={isSidebarCollapsed ? "h-10 w-10 mb-2" : "h-10 w-10"}>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">{currentUser.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize truncate">{currentUser.role}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navigationItems.map((item, index) => (
              <TooltipProvider key={index} delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                        pathname === item.href 
                          ? "bg-primary/10 text-primary dark:bg-primary/20" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                        isSidebarCollapsed ? "justify-center" : "justify-start"
                      )}
                    >
                      <item.icon className={cn(
                        "flex-shrink-0 h-5 w-5",
                        pathname === item.href 
                          ? "text-primary" 
                          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      )} />
                      {!isSidebarCollapsed && (
                        <>
                          <span className="ml-3 truncate">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.badge.variant} 
                              className="ml-auto"
                            >
                              {item.badge.text}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isSidebarCollapsed && (
                    <TooltipContent side="right">
                      <div className="flex items-center">
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant={item.badge.variant} 
                            className="ml-2"
                          >
                            {item.badge.text}
                          </Badge>
                        )}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>

          {/* Support Section */}
          <div className="mt-6">
            <div className={cn(
              "px-3 mb-2",
              isSidebarCollapsed ? "text-center" : ""
            )}>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {!isSidebarCollapsed ? "Support" : "•••"}
              </h3>
            </div>
            <nav className="px-2 space-y-1">
              {supportItems.map((item, index) => (
                <TooltipProvider key={index} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                          pathname === item.href 
                            ? "bg-primary/10 text-primary dark:bg-primary/20" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                          isSidebarCollapsed ? "justify-center" : "justify-start"
                        )}
                      >
                        <item.icon className={cn(
                          "flex-shrink-0 h-5 w-5",
                          pathname === item.href 
                            ? "text-primary" 
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                        )} />
                        {!isSidebarCollapsed && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {isSidebarCollapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </nav>
          </div>

          {/* Role Switcher (Demo Only) */}
          <div className="mt-6 px-4">
            {!isSidebarCollapsed && (
              <div className="mb-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Demo Controls
                </h3>
              </div>
            )}
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={isSidebarCollapsed ? "flex justify-center" : ""}>
                    {!isSidebarCollapsed ? (
                      <select 
                        value={userRole}
                        onChange={(e: any) => setUserRole(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary focus:border-primary"
                      >
                        <option value="admin">Admin</option>
                        <option value="hr">HR Manager</option>
                        <option value="manager">Department Manager</option>
                        <option value="employee">Employee</option>
                      </select>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setUserRole(prev => {
                          const roles = ["admin", "hr", "manager", "employee"];
                          const currentIndex = roles.indexOf(prev);
                          const nextIndex = (currentIndex + 1) % roles.length;
                          return roles[nextIndex];
                        })}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TooltipTrigger>
                {isSidebarCollapsed && (
                  <TooltipContent side="right">
                    Switch Role (Current: {userRole})
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="space-y-4">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center",
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                  )}>
                    {!isSidebarCollapsed && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">Dark Mode</span>
                    )}
                    <div className="flex items-center">
                    <ModeToggle/>
                    </div>
                  </div>
                </TooltipTrigger>
                {isSidebarCollapsed && (
                  <TooltipContent side="right">
                    Toggle Dark Mode
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20",
                      isSidebarCollapsed ? "w-full justify-center" : "w-full justify-start"
                    )}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    {!isSidebarCollapsed && <span className="ml-2">Logout</span>}
                  </Button>
                </TooltipTrigger>
                {isSidebarCollapsed && (
                  <TooltipContent side="right">
                    Logout
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[280px]"
      )}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="mr-4 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <span className="font-medium">Notifications</span>
                    <Button variant="ghost" size="sm">Mark all as read</Button>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                      No new notifications
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div key={index} className="px-4 py-3 border-b last:border-0 flex justify-between items-start">
                          <p className="text-sm">{notification}</p>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-2 -mt-1"
                            onClick={() => removeNotification(index)}
                          >
                            <span className="sr-only">Dismiss</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/main/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/main/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
