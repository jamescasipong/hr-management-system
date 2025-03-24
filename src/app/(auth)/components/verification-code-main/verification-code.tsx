"use client"

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2 } from "lucide-react"

interface VerificationCodeProps {
  length?: number
  onComplete?: (code: string) => void
}

export default function VerificationCode({ length = 6, onComplete }: VerificationCodeProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""))
  const [isComplete, setIsComplete] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer for code expiration
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  // Check if code is complete
  useEffect(() => {
    const isCodeComplete = code.every((digit) => digit !== "")
    setIsComplete(isCodeComplete)

    if (isCodeComplete && onComplete) {
      setIsVerifying(true)
      // Simulate verification process
      setTimeout(() => {
        onComplete(code.join(""))
        setIsVerifying(false)
        setIsSuccess(true)
      }, 1500)
    }
  }, [code, onComplete])

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    // Take only the last character if multiple characters are entered
    newCode[index] = value.slice(-1)
    setCode(newCode)

    // Move to next input if a digit was entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key press
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a number and has the correct length
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.split("").slice(0, length)
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
    }
  }

  // Handle resend code
  const handleResendCode = () => {
    setIsResending(true)
    // Simulate resending code
    setTimeout(() => {
      setTimeLeft(60)
      setCode(Array(length).fill(""))
      setIsComplete(false)
      setIsSuccess(false)
      setIsResending(false)
      // Focus the first input
      inputRefs.current[0]?.focus()
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Verification Code</h2>
        <p className="text-muted-foreground">Enter the {length}-digit code sent to your device</p>
      </div>

      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`w-12 h-12 text-center text-lg font-medium ${isSuccess ? "border-green-500" : ""}`}
            disabled={isVerifying || isSuccess}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {isVerifying && (
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Verifying...</span>
        </div>
      )}

      {isSuccess && (
        <div className="flex justify-center items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Verification successful</span>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        {timeLeft > 0 ? <p>Code expires in {timeLeft} seconds</p> : <p>Code expired</p>}
      </div>

      <div className="flex justify-center">
        <Button variant="link" onClick={handleResendCode} disabled={timeLeft > 0 || isResending} className="text-sm">
          {isResending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resending code...
            </>
          ) : (
            "Resend code"
          )}
        </Button>
      </div>
    </div>
  )
}

