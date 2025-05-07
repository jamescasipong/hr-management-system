"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
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
import {format} from "date-fns"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/context/layout/custom-sidebar";
import { myAttendances } from "@/lib/api/attendance/actions";
import { addDays, set } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatToAmPm, getDayName } from "@/lib/utils/dateUtils";

type AttendanceRecord = {
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Leave" | "Overtime";
  shift?: string;
};

type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

type OvertimeRequest = {
  id: number;
  date: string;
  hours: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function Attendance() {
  const context = useSidebar();

  const { isSidebarOpen, toggleSidebar } = context;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>(
    []
  );
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isOvertimeModalOpen, setIsOvertimeModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [summaryDateRange, setSummaryDateRange] = useState<
    DateRange | undefined
  >({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [attendances, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchAttendances = async () => {
      setIsLoading(true);
      const attendanceRecords = await myAttendances()


      if (attendanceRecords.error) {
        setIsLoading(false);

        console.error("Error fetching attendance records:", attendanceRecords.error);
        return;
      };


      setAttendanceRecords(attendanceRecords.data)
      
      setIsLoading(false);

      console.log("Attendance Records:", attendanceRecords);
    }

    fetchAttendances()
  }, []);
  

  const handleCheckInOut = () => {
    const now = new Date();
    if (isCheckedIn) {
      setIsCheckedIn(false);
      setCheckInTime(null);
    } else {
      setIsCheckedIn(true);
      setCheckInTime(now.toLocaleTimeString());
    }
  };

  const attendanceRecords: AttendanceRecord[] = [
    {
      date: "2024-04-01",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      status: "Present",
      shift: "Day Shift",
    },
    {
      date: "2024-04-02",
      checkIn: "09:15 AM",
      checkOut: "05:30 PM",
      status: "Present",
      shift: "Day Shift",
    },
    {
      date: "2024-04-03",
      checkIn: "08:45 AM",
      checkOut: "04:45 PM",
      status: "Present",
      shift: "Day Shift",
    },
    { date: "2024-04-04", checkIn: "-", checkOut: "-", status: "Absent" },
    {
      date: "2024-04-05",
      checkIn: "09:30 AM",
      checkOut: "07:15 PM",
      status: "Overtime",
      shift: "Day Shift",
    },
    {
      date: "2024-04-06",
      checkIn: "-",
      checkOut: "-",
      status: "Leave",
    },
  ];

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getAttendanceStatus = (date: Date): AttendanceRecord | undefined => {
    const dateString = date.toISOString().split("T")[0];
    return attendances.find((record: any) => format(record.dateToday, "yyy-MM-dd") === dateString);
  };

  const RenderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    console.log(firstDayOfMonth)
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-2 border rounded-md bg-green-900 dark:bg-green-900"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      const isFuture = date > today;
      const attendanceStatus = getAttendanceStatus(date) as any;
      const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;

      days.push(
        <TooltipProvider key={day}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`p-2 border rounded-md cursor-pointer ${
                  isToday && ""
                } transition-colors duration-200
                  ${isToday ? " text-white" : ""}
                  ${isPast ? "bg-green-700 dark:bg-green-700" : ""}
                  ${isFuture ? "bg-green-600 dark:bg-green-600" : ""}
                  ${
                    !attendanceStatus?.clockIn && !attendanceStatus?.clockOut
                      ? "bg-red-200 dark:bg-red-900"
                      : ""
                  }
                  ${
                    attendanceStatus?.status === "Leave"
                      ? "bg-yellow-200 dark:bg-yellow-900"
                      : ""
                  }
                  ${
                    attendanceStatus?.status === "Overtime"
                      ? "bg-green-200 dark:bg-green-900"
                      : ""
                  }
                  hover:bg-blue-100 dark:hover:bg-blue-900`}
              >
                <span className="sm:text-sm text-xs">{day}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isToday ? "Today" : new Date(year, month, day).toDateString()}
              </p>
              {attendanceStatus && (
                <>
                  <p>Status: {attendanceStatus.clockIn && attendanceStatus.clockOut ? attendanceStatus.lateClockIn ? "Late" : "Present" : "Absent"}</p>
                  {attendanceStatus.shift && (
                    <p>Shift: {attendanceStatus.shift}</p>
                  )}
                  {attendanceStatus.checkIn !== "-" && (
                    <p>Check In: {formatToAmPm(attendanceStatus.clockIn)}</p>
                  )}
                  {attendanceStatus.checkOut !== "-" && (
                    <p>Check Out: {formatToAmPm(attendanceStatus.clockOut)}</p>
                  )}
                </>
              )}
              {isWeekday && !attendanceStatus && <p>Scheduled: Day Shift</p>}
              {!isWeekday && !attendanceStatus && <p>Off Day</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return days;
  };

  const handleLeaveRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLeaveRequest: LeaveRequest = {
      id: leaveRequests.length + 1,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      reason: formData.get("reason") as string,
      status: "Pending",
    };
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setIsLeaveModalOpen(false);
  };

  const handleOvertimeRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOvertimeRequest: OvertimeRequest = {
      id: overtimeRequests.length + 1,
      date: formData.get("date") as string,
      hours: Number(formData.get("hours")),
      reason: formData.get("reason") as string,
      status: "Pending",
    };
    setOvertimeRequests([...overtimeRequests, newOvertimeRequest]);
    setIsOvertimeModalOpen(false);
  };

  const renderAttendanceSummary = () => {
    const filteredRecords = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        summaryDateRange &&
        summaryDateRange.from &&
        summaryDateRange.to &&
        recordDate >= summaryDateRange.from &&
        recordDate <= summaryDateRange.to
      );
    });

    return (
      <Table>
        <TableCaption>Attendance Summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>{record.checkIn}</TableCell>
              <TableCell>{record.checkOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div
      className={`flex h-full min-h-screen bg-background transition-colors duration-200`}
    >
      <main
        className={`flex-1 duration-200
        }`}
      >
        <div
          className={`mx-auto py-6 sm:px-6 lg:px-8 p-1 ${
            isSidebarOpen ? "" : "pt-24 w-full max-w-[1500px] lg:w-full"
          }`}
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <Card className="mb-6 h-full">
              <CardHeader className="">
                <div className="flex items-center justify-between ">
                  <CardTitle className="md:text-[24px] text-[18px] ">
                    Attendance Calendar
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      className=""
                      variant="outline"
                      size="icon"
                      onClick={prevMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="sm:text-sm text-xs font-medium">
                      {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Button
                      className=""
                      variant="outline"
                      size="icon"
                      onClick={nextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="font-medium sm:text-md text-xs "
                      >
                        {day}
                      </div>
                    )
                  )}
                  {RenderCalendar()}
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                  Your recent attendance history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    A list of your recent attendance records.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Shift</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendances.map((record: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{record.dateToday != null ? format(record.dateToday, "yyy-MM-dd") : "N/A"}</TableCell>
                        <TableCell>{formatToAmPm(record.clockIn as string ?? "")}</TableCell>
                        <TableCell>{formatToAmPm(record.clockOut as string ?? "")}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.clockIn && record.clockOut 
                                ? "default"
                                : record.status === "Absent"
                                ? "destructive"
                                : record.status === "Leave"
                                ? "secondary"
                                : "outline" // Updated variant for Overtime
                            }
                          >
                            {record.clockIn && record.clockOut ? "Present" : record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{getDayName(record.dateToday) || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Leave</CardTitle>
                <CardDescription>
                  Submit a request for time off or leave
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog
                  open={isLeaveModalOpen}
                  onOpenChange={setIsLeaveModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">Request Leave</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Leave</DialogTitle>
                      <DialogDescription>
                        Fill out the form to request leave.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLeaveRequest}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="startDate" className="text-right">
                            Start Date
                          </Label>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="endDate" className="text-right">
                            End Date
                          </Label>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="reason" className="text-right">
                            Reason
                          </Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            className="col-span-3"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Submit Request</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Request Overtime</CardTitle>
                <CardDescription>Submit a request for overtime</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog
                  open={isOvertimeModalOpen}
                  onOpenChange={setIsOvertimeModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">Request Overtime</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Overtime</DialogTitle>
                      <DialogDescription>
                        Fill out the form to request overtime.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleOvertimeRequest}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="hours" className="text-right">
                            Hours
                          </Label>
                          <Input
                            id="hours"
                            name="hours"
                            type="number"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="reason" className="text-right">
                            Reason
                          </Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            className="col-span-3"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Submit Request</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>View your attendance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog
                  open={isSummaryModalOpen}
                  onOpenChange={setIsSummaryModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">View Summary</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl rounded-lg">
                    <DialogHeader>
                      <DialogTitle>Attendance Summary</DialogTitle>
                      <DialogDescription>
                        Your attendance summary for the selected date range.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <DatePickerWithRange
                        date={summaryDateRange}
                        setDate={setSummaryDateRange}
                      />
                    </div>
                    {renderAttendanceSummary()}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave and Overtime Requests</CardTitle>
                <CardDescription>
                  Your recent leave and overtime requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of your recent requests.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={`leave-${request.id}`}>
                        <TableCell>Leave</TableCell>
                        <TableCell>{`${request.startDate} to ${request.endDate}`}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Approved"
                                ? "outline" // Updated variant for Approved
                                : request.status === "Rejected"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {overtimeRequests.map((request) => (
                      <TableRow key={`overtime-${request.id}`}>
                        <TableCell>Overtime</TableCell>
                        <TableCell>{`${request.date} (${request.hours} hours)`}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Approved"
                                ? "outline" // Updated variant for Approved
                                : request.status === "Rejected"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
