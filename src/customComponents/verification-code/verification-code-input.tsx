"use client"

import type React from "react"
import { useRef, useState, useEffect, type KeyboardEvent, type ClipboardEvent } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VerificationCodeInputProps {
  length?: number
  onComplete?: (code: string) => void
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  inputClassName?: string
  error?: string
  label?: string
}

export function VerificationCodeInput({
  length = 6,
  onComplete,
  disabled = false,
  autoFocus = true,
  className,
  inputClassName,
  error,
  label = "Verification code",
}: VerificationCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus on the first input when component mounts
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  console.log(error)

  // When code is complete, call the onComplete callback
  useEffect(() => {
    if (code.every((digit) => digit !== "") && onComplete) {
      onComplete(code.join(""))
    }
  }, [code, onComplete])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow one digit per input
    if (value.length > 1) {
      return
    }

    // Update the code state
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move focus to the next input if a digit was entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to the previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move focus with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only process if the pasted content matches the expected length
    if (pastedData.length === length && /^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("")
      setCode(newCode)

      // Focus on the last input
      if (inputRefs.current[length - 1]) {
        inputRefs.current[length - 1]?.focus()
      }
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={`code-input-0`}>{label}</Label>}

      <div className="flex gap-2 items-center justify-center">
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            id={`code-input-${index}`}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={code[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={disabled}
            className={cn(
              "w-10 h-12 text-center text-lg font-medium",
              error && "border-destructive focus-visible:ring-destructive",
              inputClassName,
            )}
            aria-label={`Digit ${index + 1} of verification code`}
          />
        ))}
      </div>

      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
}

