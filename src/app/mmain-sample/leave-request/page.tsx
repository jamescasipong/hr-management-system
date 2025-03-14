"use client"

import { useState } from "react"
import { CalendarIcon, Check, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewLeaveRequestPage() {
  const router = useRouter()
  const [leaveType, setLeaveType] = useState("")
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  })
  const [duration, setDuration] = useState("full_day")
  const [reason, setReason] = useState("")
  const [contact, setContact] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate number of days in the leave request
  const calculateDays = () => {
    if (!dateRange.from || !dateRange.to) return 0

    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    // Adjust for half days
    if (duration === "half_day") {
      return diffDays * 0.5
    }

    return diffDays
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!leaveType) {
      toast("Missing Information", {
        description: "Please select a leave type.",
      })
      return
    }

    if (!dateRange.from || !dateRange.to) {
      toast("Missing Information", {
        description: "Please select a date range for your leave.",
      })
      return
    }

    if (!reason) {
      toast("Missing Information", {
        description: "Please provide a reason for your leave request.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast("Leave Request Submitted", {
        description: "Your leave request has been submitted for approval.",
      })

      setIsSubmitting(false)
      router.push("/main/my-attendance")
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">New Leave Request</h1>
        <p className="text-muted-foreground">Submit a new leave request for approval</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Leave Details</CardTitle>
            <CardDescription>Provide the details for your leave request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="leave-type">Leave Type</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger id="leave-type">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="bereavement">Bereavement Leave</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : <span>Start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : <span>End date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                      initialFocus
                      disabled={(date) => (dateRange.from ? date < dateRange.from : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {dateRange.from && dateRange.to && (
                <div className="flex items-center text-sm mt-2">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    Total: <strong>{calculateDays()}</strong> day{calculateDays() !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <RadioGroup value={duration} onValueChange={setDuration} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full_day" id="full_day" />
                  <Label htmlFor="full_day" className="font-normal">
                    Full Day
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="half_day" id="half_day" />
                  <Label htmlFor="half_day" className="font-normal">
                    Half Day
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                placeholder="Please provide details about your leave request"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Emergency Contact (Optional)</Label>
              <Input
                id="contact"
                placeholder="Phone number or email while on leave"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

