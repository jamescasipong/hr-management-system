"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle, AlertCircle, PlayCircle, StopCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

// Mock shift data
const mockShifts = {
  hr: {
    today: {
      start: "09:00",
      end: "17:00",
      hasShift: true
    }
  },
  manager: {
    today: {
      start: "08:30",
      end: "17:30",
      hasShift: true
    }
  },
  employee: {
    today: {
      start: "09:00",
      end: "18:00",
      hasShift: true
    }
  }
}

export function ClockInOutCard({ userRole }: { userRole: "hr" | "manager" | "employee" }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clockedIn, setClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null)
  const [shiftData, setShiftData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Format time as HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Load shift data and clock status
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const shift = mockShifts[userRole]?.today || { hasShift: false }
    setShiftData(shift)

    // Check if user has already clocked in today (from localStorage for demo)
    const savedClockInTime = localStorage.getItem(`clockIn_${userRole}`)
    const savedClockOutTime = localStorage.getItem(`clockOut_${userRole}`)
    
    if (savedClockInTime) {
      setClockInTime(new Date(savedClockInTime))
      setClockedIn(true)
      
      if (savedClockOutTime) {
        setClockOutTime(new Date(savedClockOutTime))
        setClockedIn(false)
      }
    }
  }, [userRole])

  // Check if current time is within shift hours
  const isWithinShiftHours = () => {
    if (!shiftData || !shiftData.hasShift) return false
    
    const now = currentTime
    const today = new Date()
    
    const [startHours, startMinutes] = shiftData.start.split(':').map(Number)
    const [endHours, endMinutes] = shiftData.end.split(':').map(Number)
    
    const shiftStart = new Date(today)
    shiftStart.setHours(startHours, startMinutes, 0)
    
    const shiftEnd = new Date(today)
    shiftEnd.setHours(endHours, endMinutes, 0)
    
    return now >= shiftStart && now <= shiftEnd
  }

  // Handle clock in
  const handleClockIn = () => {
    if (!shiftData?.hasShift) {
      toast("No Shift Scheduled", {
        description: "You don't have a shift scheduled for today.",
      })
      return
    }
    
    if (clockOutTime) {
      toast( "Already Clocked Out", {
        description: "You've already completed your shift for today.",
      })
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date()
      setClockInTime(now)
      setClockedIn(true)
      localStorage.setItem(`clockIn_${userRole}`, now.toString())
      
      toast( "Clocked In Successfully", {
        description: `You clocked in at ${formatTime(now)}.`,
      })
      
      setLoading(false)
    }, 1000)
  }

  // Handle clock out
  const handleClockOut = () => {
    if (!clockedIn) {
      toast( "Not Clocked In", {
        description: "You need to clock in first.",
      })
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date()
      setClockOutTime(now)
      setClockedIn(false)
      localStorage.setItem(`clockOut_${userRole}`, now.toString())
      
      // Calculate hours worked
      if (clockInTime) {
        const hoursWorked = ((now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)).toFixed(2)

        toast("Clocked Out Successfully", {
            description: `You clocked out at ${formatTime(now)}. Hours worked: ${hoursWorked}`,
          })
      }
      
      
      
      setLoading(false)
    }, 1000)
  }

  // Reset clock status (for demo purposes)
  const resetClockStatus = () => {
    localStorage.removeItem(`clockIn_${userRole}`)
    localStorage.removeItem(`clockOut_${userRole}`)
    setClockInTime(null)
    setClockOutTime(null)
    setClockedIn(false)
    
    toast("Clock Status Reset", {
      description: "Your clock status has been reset for demo purposes.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
          
          {shiftData?.hasShift ? (
            <div className="text-sm text-center">
              <span className="text-muted-foreground">Today's Shift: </span>
              <span className="font-medium">{shiftData.start} - {shiftData.end}</span>
            </div>
          ) : (
            <div className="text-sm text-center text-muted-foreground">
              No shift scheduled for today
            </div>
          )}
          
          <div className="flex items-center justify-center mt-2">
            {clockInTime && !clockOutTime && (
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Clocked In at {formatTime(clockInTime)}
              </Badge>
            )}
            
            {clockOutTime && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Shift Completed
              </Badge>
            )}
            
            {!clockInTime && !clockOutTime && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                Not Clocked In
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button 
                  onClick={handleClockIn}
                  disabled={clockedIn || !!clockOutTime || !shiftData?.hasShift || loading}
                  variant="outline"
                  className="w-full mr-2 text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-900 dark:hover:bg-green-900/20"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Clock In
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {!shiftData?.hasShift 
                ? "No shift scheduled for today" 
                : clockOutTime 
                  ? "You've already completed your shift" 
                  : ""}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button 
                  onClick={handleClockOut}
                  disabled={!clockedIn || loading}
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/20"
                >
                  <StopCircle className="h-4 w-4 mr-2" />
                  Clock Out
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {!clockedIn ? "You need to clock in first" : ""}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      
      {/* Reset button for demo purposes - would be removed in production */}
      <div className="px-6 pb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-xs text-muted-foreground"
          onClick={resetClockStatus}
        >
          Reset (Demo Only)
        </Button>
      </div>
    </Card>
  )
}
