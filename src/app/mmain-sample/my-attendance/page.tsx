"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Download, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ClockInOutCard } from "@/components/clock-in-out-card"

// Mock attendance data
const mockAttendanceData = [
  {
    date: "2024-05-13",
    clockIn: "08:55",
    clockOut: "17:05",
    status: "Present",
    hoursWorked: "8.17",
    overtime: "0.08",
    notes: "",
  },
  {
    date: "2024-05-12",
    clockIn: "09:02",
    clockOut: "17:30",
    status: "Present",
    hoursWorked: "8.47",
    overtime: "0.50",
    notes: "Stayed late to finish project",
  },
  {
    date: "2024-05-11",
    clockIn: "08:58",
    clockOut: "17:03",
    status: "Present",
    hoursWorked: "8.08",
    overtime: "0.05",
    notes: "",
  },
  {
    date: "2024-05-10",
    clockIn: "09:15",
    clockOut: "17:00",
    status: "Late",
    hoursWorked: "7.75",
    overtime: "0.00",
    notes: "Traffic delay",
  },
  {
    date: "2024-05-09",
    clockIn: "08:50",
    clockOut: "17:10",
    status: "Present",
    hoursWorked: "8.33",
    overtime: "0.17",
    notes: "",
  },
  {
    date: "2024-05-08",
    clockIn: "09:00",
    clockOut: "17:00",
    status: "Present",
    hoursWorked: "8.00",
    overtime: "0.00",
    notes: "",
  },
  {
    date: "2024-05-07",
    clockIn: "09:00",
    clockOut: "17:00",
    status: "Present",
    hoursWorked: "8.00",
    overtime: "0.00",
    notes: "",
  },
  {
    date: "2024-05-06",
    clockIn: "09:30",
    clockOut: "17:00",
    status: "Late",
    hoursWorked: "7.50",
    overtime: "0.00",
    notes: "Doctor appointment",
  },
  {
    date: "2024-05-05",
    clockIn: "",
    clockOut: "",
    status: "Absent",
    hoursWorked: "0.00",
    overtime: "0.00",
    notes: "Sick leave",
  },
  {
    date: "2024-05-04",
    clockIn: "",
    clockOut: "",
    status: "Weekend",
    hoursWorked: "0.00",
    overtime: "0.00",
    notes: "",
  },
  {
    date: "2024-05-03",
    clockIn: "08:45",
    clockOut: "17:15",
    status: "Present",
    hoursWorked: "8.50",
    overtime: "0.25",
    notes: "",
  },
]

// Mock summary data
const mockSummary = {
  present: 8,
  late: 2,
  absent: 1,
  leave: 0,
  totalHours: "64.80",
  overtime: "1.05",
  averageHours: "8.10",
}

export default function MyAttendancePage() {
  const [date, setDate] = useState(new Date())
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData)
  const [filteredData, setFilteredData] = useState(mockAttendanceData)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [userRole, setUserRole] = useState("employee")

  // Get user role from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") || "employee"
    setUserRole(savedRole)
  }, [])

  // Filter data based on status and search query
  useEffect(() => {
    let filtered = [...attendanceData]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((record) => record.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply search filter (search in notes)
    if (searchQuery) {
      filtered = filtered.filter(
        (record) => record.notes.toLowerCase().includes(searchQuery.toLowerCase()) || record.date.includes(searchQuery),
      )
    }

    setFilteredData(filtered)
  }, [statusFilter, searchQuery, attendanceData])

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy")
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "outline"
      case "late":
        return "secondary"
      case "absent":
        return "destructive"
      case "weekend":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Attendance</h1>
          <p className="text-muted-foreground">Track your attendance records and clock in/out</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "MMMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ClockInOutCard userRole={userRole} />

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Your attendance statistics for {format(date, "MMMM yyyy")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Present</div>
                <div className="text-2xl font-bold">{mockSummary.present}</div>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Late</div>
                <div className="text-2xl font-bold">{mockSummary.late}</div>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Absent</div>
                <div className="text-2xl font-bold">{mockSummary.absent}</div>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">On Leave</div>
                <div className="text-2xl font-bold">{mockSummary.leave}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Total Hours</div>
                <div className="text-2xl font-bold">{mockSummary.totalHours}</div>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Overtime</div>
                <div className="text-2xl font-bold">{mockSummary.overtime}</div>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Avg. Hours/Day</div>
                <div className="text-2xl font-bold">{mockSummary.averageHours}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>Your detailed attendance history</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by date or notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="weekend">Weekend/Holiday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">Date</th>
                    <th className="h-12 px-4 text-left font-medium">Clock In</th>
                    <th className="h-12 px-4 text-left font-medium">Clock Out</th>
                    <th className="h-12 px-4 text-left font-medium">Status</th>
                    <th className="h-12 px-4 text-left font-medium">Hours</th>
                    <th className="h-12 px-4 text-left font-medium">Overtime</th>
                    <th className="h-12 px-4 text-left font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 align-middle font-medium">{formatDate(record.date)}</td>
                      <td className="p-4 align-middle">{record.clockIn || "-"}</td>
                      <td className="p-4 align-middle">{record.clockOut || "-"}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={getStatusBadge(record.status)}>{record.status}</Badge>
                      </td>
                      <td className="p-4 align-middle">{record.hoursWorked}</td>
                      <td className="p-4 align-middle">{record.overtime}</td>
                      <td className="p-4 align-middle">{record.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {attendanceData.length} records
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

