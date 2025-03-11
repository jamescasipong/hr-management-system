"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface CountdownTimerProps {
  duration?: number // Duration in seconds
  onResend: () => void
  className?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
}

export function CountdownTimer({
  duration = 60,
  onResend,
  className,
  buttonVariant = "ghost",
  buttonSize = "sm",
}: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(0)
  const [isSending, setIsSending] = useState(false)

  // Handle countdown timer
  useEffect(() => {
    if (countdown <= 0) return

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  // Format the countdown as MM:SS
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleResend = () => {
    setIsSending(true)

    // Call the onResend callback
    Promise.resolve(() => {
      
    }).finally(() => {
      setIsSending(false)
      setCountdown(duration)
    })
  }

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      onClick={handleResend}
      disabled={countdown > 0 || isSending}
      className={className}
    >
      {isSending ? (
        <>
          <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
          Sending...
        </>
      ) : countdown > 0 ? (
        <>Resend code in {formatCountdown()}</>
      ) : (
        <>Resend code</>
      )}
    </Button>
  )
}

