"use client"

import { useState, useEffect } from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { ArrowDown, ArrowUp, BarChart3, Calendar, CheckCircle2, Clock, DollarSign, FileText, HelpCircle, Info, MoreHorizontal, Plus, RefreshCcw, Server, Settings, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClockInOutCard } from "@/components/clock-in-out-card"

// Mock data for charts and statistics
const departmentData = [
  { name: "Engineering", value: 40, color: "#3b82f6" },
  { name: "Marketing", value: 20, color: "#10b981" },
  { name: "Finance", value: 15, color: "#f59e0b" },
  { name: "HR", value: 10, color: "#8b5cf6" },
  { name: "Operations", value: 15, color: "#ec4899" },
]

const attendanceData = [
  { name: "Mon", present: 45, absent: 5, leave: 2 },
  { name: "Tue", present: 48, absent: 2, leave: 2 },
  { name: "Wed", present: 47, absent: 3, leave: 2 },
  { name: "Thu", present: 44, absent: 4, leave: 4 },
  { name: "Fri", present: 40, absent: 6, leave: 6 },
]

const recentActivities = [
  { 
    id: 1, 
    user: "Jane Smith", 
    action: "approved leave request", 
    target: "John Doe", 
    time: "10 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  { 
    id: 2, 
    user: "Admin", 
    action: "added new employee", 
    target: "Sarah Johnson", 
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  { 
    id: 3, 
    user: "System", 
    action: "generated payroll", 
    target: "All employees", 
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  { 
    id: 4, 
    user: "Mark Wilson", 
    action: "updated profile", 
    target: "", 
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  { 
    id: 5, 
    user: "HR Manager", 
    action: "scheduled interview", 
    target: "Developer position", 
    time: "Yesterday",
    avatar: "/placeholder.svg?height=32&width=32"
  },
]

export default function Dashboard() {
  const [userRole, setUserRole] = useState("employee")
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate loading and fetching user role
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, you would get the user role from your auth system
      // This is just for demo purposes
      const urlParams = new URLSearchParams(window.location.search)
      const role = urlParams.get("role")
      if (role && ["admin", "hr", "manager", "employee"].includes(role)) {
        setUserRole(role)
      } else {
        // Try to get from localStorage or default to employee
        const savedRole = localStorage.getItem("userRole") || "employee"
        setUserRole(savedRole)
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Function to refresh dashboard data
  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 800)
  }

  // Render different dashboard based on user role
  const renderDashboard = () => {
    if (isLoading) {
      return <DashboardSkeleton />
    }

    switch (userRole) {
      case "admin":
        return <AdminDashboard lastUpdated={lastUpdated} />
      case "hr":
        return <HRDashboard lastUpdated={lastUpdated} />
      case "manager":
        return <ManagerDashboard lastUpdated={lastUpdated} />
      case "employee":
      default:
        return <EmployeeDashboard lastUpdated={lastUpdated} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCcw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
      
      {renderDashboard()}
    </div>
  )
}

// Dashboard skeleton loader
function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2 lg:col-span-4 animate-pulse">
        <CardHeader>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </CardContent>
      </Card>
    </div>
  )
}

// Admin Dashboard
function AdminDashboard({ lastUpdated }: {lastUpdated: Date}) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <p className="text-xs text-muted-foreground">
              +6 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">98.2%</div>
            <div className="mt-2">
              <Progress value={98.2} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              57% of total employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Backup Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Completed</div>
            <p className="text-xs text-muted-foreground">
              Last backup: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Employee Distribution</CardTitle>
            <CardDescription>
              Breakdown of employees by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/settings">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/employees">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/reports">
                <FileText className="mr-2 h-4 w-4" />
                Generate Reports
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/system-logs">
                <HelpCircle className="mr-2 h-4 w-4" />
                System Logs
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Latest actions in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                      {activity.target && <span> for <span className="font-semibold">{activity.target}</span></span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </CardFooter>
      </Card>
    </>
  )
}

// HR Dashboard
function HRDashboard({ lastUpdated }: {lastUpdated: Date}) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>4% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 in final interview stage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              5 pending approval
            </p>
          </CardContent>
        </Card>
        <ClockInOutCard userRole="hr" />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>
              Employee attendance for the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present" fill="#10b981" />
                  <Bar dataKey="absent" name="Absent" fill="#ef4444" />
                  <Bar dataKey="leave" name="On Leave" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common HR tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/leaves">
                <Calendar className="mr-2 h-4 w-4" />
                Review Leaves
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/attendance">
                <Clock className="mr-2 h-4 w-4" />
                Check Attendance
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/employees">
                <Users className="mr-2 h-4 w-4" />
                Employee Directory
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/recruitment">
                <FileText className="mr-2 h-4 w-4" />
                Recruitment
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Latest HR-related activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                      {activity.target && <span> for <span className="font-semibold">{activity.target}</span></span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </CardFooter>
      </Card>
    </>
  )
}

// Manager Dashboard
function ManagerDashboard({ lastUpdated }: {lastUpdated: Date}) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 on leave today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 leave requests, 2 expenses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>3% increase</span>
            </div>
          </CardContent>
        </Card>
        <ClockInOutCard userRole="manager" />
      </div>

      <Tabs defaultValue="team">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">Team Overview</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="team" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Availability</CardTitle>
              <CardDescription>
                Current status of your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Alice Johnson", status: "Available", avatar: "/placeholder.svg?height=32&width=32" },
                  { name: "Bob Smith", status: "In a meeting", avatar: "/placeholder.svg?height=32&width=32" },
                  { name: "Carol Williams", status: "On leave", avatar: "/placeholder.svg?height=32&width=32" },
                  { name: "Dave Brown", status: "Available", avatar: "/placeholder.svg?height=32&width=32" },
                  { name: "Eve Davis", status: "Remote", avatar: "/placeholder.svg?height=32&width=32" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">Software Engineer</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        member.status === "Available" ? "outline" : 
                        member.status === "On leave" ? "destructive" : 
                        "secondary"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approvals" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Requests waiting for your approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    type: "Leave Request", 
                    from: "Alice Johnson", 
                    details: "Vacation: May 10-15", 
                    submitted: "2 days ago",
                    avatar: "/placeholder.svg?height=32&width=32"
                  },
                  { 
                    type: "Expense Claim", 
                    from: "Bob Smith", 
                    details: "$120 - Office supplies", 
                    submitted: "Yesterday",
                    avatar: "/placeholder.svg?height=32&width=32"
                  },
                  { 
                    type: "Overtime Request", 
                    from: "Carol Williams", 
                    details: "4 hours on May 5", 
                    submitted: "3 hours ago",
                    avatar: "/placeholder.svg?height=32&width=32"
                  },
                ].map((request, i) => (
                  <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={request.avatar} alt={request.from} />
                        <AvatarFallback>{request.from[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">{request.type}</Badge>
                          <p className="text-sm text-muted-foreground">Submitted {request.submitted}</p>
                        </div>
                        <p className="text-sm font-medium mt-1">From: {request.from}</p>
                        <p className="text-sm">{request.details}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-red-500">Decline</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Project Completion Rate</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage of projects completed on time</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Team Satisfaction</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Based on last quarterly survey</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Code Quality</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Based on code reviews and test coverage</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Latest activities in your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                      {activity.target && <span> for <span className="font-semibold">{activity.target}</span></span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </CardFooter>
      </Card>
    </>
  )
}

// Employee Dashboard
function EmployeeDashboard({ lastUpdated }: {lastUpdated: Date}) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 days</div>
            <p className="text-xs text-muted-foreground">
              5 days used this year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.5%</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>2.1% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Payslip</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 30</div>
            <p className="text-xs text-muted-foreground">
              10 days from now
            </p>
          </CardContent>
        </Card>
        <ClockInOutCard userRole="employee" />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Your schedule for the next few days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Team Meeting", 
                  date: "Today, 2:00 PM", 
                  description: "Weekly sprint planning",
                  type: "meeting"
                },
                { 
                  title: "Project Deadline", 
                  date: "Tomorrow, 5:00 PM", 
                  description: "Submit final deliverables for Project X",
                  type: "deadline"
                },
                { 
                  title: "Performance Review", 
                  date: "May 15, 10:00 AM", 
                  description: "Quarterly performance discussion with manager",
                  type: "review"
                },
                { 
                  title: "Company Holiday", 
                  date: "May 29", 
                  description: "Memorial Day - Office Closed",
                  type: "holiday"
                },
              ].map((event, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    event.type === "meeting" ? "bg-blue-500" :
                    event.type === "deadline" ? "bg-red-500" :
                    event.type === "review" ? "bg-purple-500" :
                    "bg-green-500"
                  }`} />
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{event.title}</p>
                      <Badge 
                        variant="outline" 
                        className="ml-2"
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/leave-requests/new">
                <FileText className="mr-2 h-4 w-4" />
                Request Leave
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/expenses/new">
                <DollarSign className="mr-2 h-4 w-4" />
                Submit Expense
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/overtime/new">
                <Clock className="mr-2 h-4 w-4" />
                Log Overtime
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/my-attendance">
                <Calendar className="mr-2 h-4 w-4" />
                View Attendance
              </a>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/main/team-directory">
                <Users className="mr-2 h-4 w-4" />
                Team Directory
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Payslips</CardTitle>
            <CardDescription>
              Your recent salary payments
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View All Payslips</DropdownMenuItem>
              <DropdownMenuItem>Download Tax Statement</DropdownMenuItem>
              <DropdownMenuItem>Update Bank Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: "April 2024", amount: "$4,250.00", date: "Apr 30, 2024", status: "Paid" },
              { month: "March 2024", amount: "$4,250.00", date: "Mar 31, 2024", status: "Paid" },
              { month: "February 2024", amount: "$4,250.00", date: "Feb 29, 2024", status: "Paid" },
            ].map((payslip, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{payslip.month}</p>
                  <p className="text-sm text-muted-foreground">Paid on {payslip.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payslip.amount}</p>
                  <Badge variant="outline" className="mt-1">
                    {payslip.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </CardFooter>
      </Card>
    </>
  )
}
