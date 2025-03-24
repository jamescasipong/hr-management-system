"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { VerificationCodeInput } from "../components/verification-code-input"
import {verify} from "@/lib/api/auth"
import { boolean } from "zod"

export default function VerifySignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "user@example.com"

  const handleComplete = async (code: string) => {
    setIsLoading(true)

    try {
      // Simulate API call to verify code
      const response = await verify(email, code)

      if (response.success) {
        console.log("Verification successful")
        router.push("/dashboard")

        return true;
      }

    } catch (error) {
      return false;
      console.error("Verification failed:", error)
    } finally {
      setIsLoading(false)
    }

    return false
  }

  const handleResend = async () => {
    // Simulate API call to resend code
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Resending verification code to:", email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <VerificationCodeInput
        title="Two-Factor Authentication"
        description={`We've sent a verification code to ${email}. Please enter it below to continue.`}
        backLink="/signin"
        backText="Need to use a different account?"
        onComplete={handleComplete}
        onResend={handleResend}
        isLoading={isLoading}
      />
    </div>
  )
}

