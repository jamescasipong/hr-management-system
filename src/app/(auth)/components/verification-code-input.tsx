"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"


interface VerificationCodeInputProps {
  length?: number
  onComplete?: (code: string) => Promise<unknown>
  onResend?: () => void
  title: string
  description: string
  backLink: string
  backText: string
  resendText?: string
  expiresIn?: number // in seconds
  isLoading?: boolean
}

export function VerificationCodeInput({
  length = 6,
  onComplete,
  onResend,
  title,
  description,
  backLink,
  backText,
  resendText = "Didn't receive a code?",
  expiresIn = 300, // 5 minutes by default
  isLoading = false,
}: VerificationCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""))
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(expiresIn)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])


  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Timer for code expiration
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format time remaining
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    // Update the code array
    const newCode = [...code]
    newCode[index] = value.slice(-1) // Only take the last character if multiple are pasted
    setCode(newCode)

    // Clear error when user types
    if (error) setError(null)

    // Auto-focus next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if code is complete
    if (newCode.every((digit) => digit !== "") && !newCode.includes("")) {
      handleSubmit(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is all digits and matches expected length
    if (!/^\d+$/.test(pastedData)) {
      setError("Please paste numbers only")
      return
    }

    const digits = pastedData.slice(0, length).split("")
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    // Focus the next empty input or the last one if all are filled
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
      handleSubmit(newCode.join(""))
    }
  }

  const handleSubmit = async (fullCode: string) => {
    // Simulate verification
    if (onComplete) {
      const isVerified = await onComplete(fullCode)

      if (isVerified) {
        setIsVerified(true)
      } else {
        setError("Invalid or expired password. Please try again.")
        setCode(Array(length).fill(""))
        inputRefs.current[0]?.focus()
      }
    }
  }

  const handleResend = () => {
    setCode(Array(length).fill(""))
    setError(null)
    setTimeLeft(expiresIn)
    if (onResend) onResend()
    // Focus the first input
    inputRefs.current[0]?.focus()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Link href={backLink} className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isVerified ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold">Verification Successful</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your identity has been verified. You will be redirected shortly.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>
            )}

            <div className="flex justify-center space-x-2">
              {Array.from({ length }).map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-lg font-semibold"
                  disabled={isLoading || isVerified}
                />
              ))}
            </div>

            {timeLeft > 0 && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Code expires in {formatTimeLeft()}</p>
            )}

            {timeLeft <= 0 && (
              <p className="text-center text-sm text-red-500">
                Verification code has expired. Please request a new one.
              </p>
            )}
          </>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        {!isVerified && (
          <>
            <Button
              onClick={() => handleSubmit(code.join(""))}
              className="w-full"
              disabled={code.includes("") || isLoading || timeLeft <= 0 || isVerified}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{resendText}</p>
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={isLoading || timeLeft > 0 || isVerified}
                className="text-sm"
              >
                Resend code {timeLeft > 0 && `(${formatTimeLeft()})`}
              </Button>
            </div>
          </>
        )}

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          {backText}{" "}
          <Link href={backLink} className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
            Go back
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

