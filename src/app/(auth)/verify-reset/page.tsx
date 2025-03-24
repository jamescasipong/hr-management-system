"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { VerificationCodeInput } from "../components/verification-code-input"

export default function VerifyResetPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "user@example.com"

  const handleComplete = async (code: string) => {
    setIsLoading(true)

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would verify the code with your backend
      console.log("Verifying reset code:", code)

      // Redirect to reset password page after successful verification
      setTimeout(() => {
        router.push(`/reset-password?token=${btoa(code)}&email=${encodeURIComponent(email)}`)
      }, 1000)

      return true;
    } catch (error) {
      console.error("Verification failed:", error)

      return false;
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    // Simulate API call to resend code
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Resending reset verification code to:", email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <VerificationCodeInput
        title="Verify Your Identity"
        description={`We've sent a verification code to ${email}. Please enter it below to reset your password.`}
        backLink="/forgot-password"
        backText="Need to use a different email?"
        onComplete={handleComplete}
        onResend={handleResend}
        isLoading={isLoading}
      />
    </div>
  )
}

