"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { useState } from "react"
import { Calendar } from "../../components/ui/calendar"

export default function EnhancedLeaveRequestModal({ vacation, sick }: { vacation: number; sick: number }) {
  const [requestType, setRequestType] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", { requestType, startDate, endDate, startTime, endTime })
    // You would typically send this data to your backend here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className="font-medium dark:bg-blue-600 dark:hover:bg-blue-700 text-white">Request Leave/OT</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Leave or OT</DialogTitle>
          <DialogDescription className="text-lg">
            Fill out this form to request leave, overtime, or a certificate of attendance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <Card className="dark:bg-gray-800 border dark:border-gray-600">
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-4  items-center gap-4">
                  <Label htmlFor="request-type" className="text-right text-lg ">
                    Request Type
                  </Label>
                  <Select onValueChange={setRequestType} required>
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-600  border-gray-300 col-span-3 h-12 text-lg ">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600 border-gray-300 ">
                      <SelectItem className="dark:hover:bg-gray-700" value="vacation">Vacation Leave</SelectItem>
                      <SelectItem className="dark:hover:bg-gray-700" value="sick">Sick Leave</SelectItem>
                      <SelectItem className="dark:hover:bg-gray-700" value="ot">Overtime (OT)</SelectItem>
                      <SelectItem className="dark:hover:bg-gray-700" value="coa">Certificate of Attendance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right text-lg">
                    Start Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3 dark:bg-gray-800 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-900 h-12 justify-start text-left text-lg font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {(requestType === "vacation" || requestType === "sick") && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end-date" className="text-right text-lg">
                      End Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "col-span-3 h-12 justify-start dark:bg-gray-800 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-700 text-left text-lg font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                {requestType === "ot" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-time" className="text-right text-lg">
                        Start Time
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <Clock className="mr-2 h-5 w-5 " />
                        <Input
                          id="start-time"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="h-12 text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white  border-gray-300 dark:hover:bg-gray-700"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-time" className="text-right text-lg">
                        End Time
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        <Input
                          id="end-time"
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="h-12 text-lg dark:bg-gray-800 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-700"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-4  items-start gap-4">
                  <Label htmlFor="reason" className="text-right text-lg pt-2">
                    Reason
                  </Label>
                  <Textarea
                    id="reason"
                    className="col-span-3 h-32 text-lg dark:bg-gray-800 dark:border-gray-600 border-gray-300"
                    placeholder="Enter reason for request"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between items-center">
            <div className="space-x-2 ">
              <Badge variant="outline" className="dark:border-gray-600 border-gray-300 py-1">Remaining Vacation Hours: {vacation.toString()}</Badge>
              <Badge variant="outline" className="dark:border-gray-600 border-gray-300 py-1">Remaining Sick Hours: {sick.toString()}</Badge>
            </div>
            <DialogFooter>
              <Button type="submit" className="dark:bg-gray-500 dark:hover:bg-gray-600 dark:text-white">Submit Request</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}