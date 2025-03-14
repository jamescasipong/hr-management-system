"use client"

import { useState } from "react"
import { CalendarIcon, Check, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewOvertimePage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [hours, setHours] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate hours when start and end times change
  const calculateHours = () => {
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number)
      const [endHour, endMinute] = endTime.split(":").map(Number)

      let totalMinutes = endHour * 60 + endMinute - (startHour * 60 + startMinute)

      // Handle overnight shifts
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60
      }

      const calculatedHours = (totalMinutes / 60).toFixed(2)
      setHours(calculatedHours)
    }
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
    if (endTime) {
      calculateHours()
    }
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value)
    if (startTime) {
      calculateHours()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (!date) {
      toast("Missing Information", {
        description: "Please select the date of overtime.",
      })
      return
    }

    if (!startTime || !endTime) {
      toast("Missing Information", {
        description: "Please enter both start and end times.",
      })
      return
    }

    if (!hours || Number.parseFloat(hours) <= 0) {
      toast("Invalid Hours", {
        description: "Please enter valid overtime hours.",
      })
      return
    }

    if (!reason) {
      toast("Missing Information", {
        description: "Please provide a reason for the overtime.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast("Overtime Request Submitted", {
        description: "Your overtime request has been submitted for approval.",
      })

      setIsSubmitting(false)
      router.push("/main/dashboard")
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Log Overtime</h1>
        <p className="text-muted-foreground">Submit a new overtime request for approval</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Overtime Details</CardTitle>
            <CardDescription>Provide the details for your overtime work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Date of Overtime</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date ?? undefined} onSelect={(day) => setDate(day ?? null)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start-time"
                    type="time"
                    className="pl-9"
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="end-time" type="time" className="pl-9" value={endTime} onChange={handleEndTimeChange} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Total Hours</Label>
              <Input
                id="hours"
                placeholder="0.00"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                readOnly={!!(startTime && endTime)}
              />
              {startTime && endTime && (
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically calculated based on start and end times
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Overtime</Label>
              <Textarea
                id="reason"
                placeholder="Explain why overtime was necessary"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
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

