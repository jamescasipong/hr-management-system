"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import {resetSessionExist} from "@/lib/api/send-verification"
import { set } from "date-fns"

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [tokenError, setTokenError] = useState<string | null>(null)

    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    // Check token validity
    useEffect(() => {
        // In a real app, you would verify the token with your backend
        // This is a simplified example that checks if the token exists and simulates validation
        const validateToken = async () => {
            if (!token) {
                setTokenError("Invalid or missing reset token")
                return
            }

            try {
                // Simulate token validation with backend
                // In a real app, you would make an API call to validate the token
                const response = await resetSessionExist(token)

                if (response){
                    return;
                }

                setTokenError("Invalid reset token")
            } catch (error) {

                setTokenError("Invalid reset token format")
            }
        }

        validateToken()
    }, [token, email])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors({})

        try {
            // Validate form data
            resetPasswordSchema.parse({ password, confirmPassword })

            // Simulate API call to reset password
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Show success state
            setIsComplete(true)

            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push("/signin")
            }, 3000)
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {}
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as string] = err.message
                    }
                })
                setErrors(newErrors)
            } else {
                setErrors({ form: "An unexpected error occurred. Please try again." })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center">
                        <Link href="/forgot-password" className="mr-2">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <CardTitle className="text-2xl">
                            {tokenError ? "Invalid Reset Link" : isComplete ? "Password Reset" : "Reset your password"}
                        </CardTitle>
                    </div>
                    <CardDescription>
                        {tokenError
                            ? "The password reset link is invalid or has expired"
                            : !isComplete
                                ? `Create a new password for ${email}`
                                : "Your password has been reset successfully"}
                    </CardDescription>
                </CardHeader>

                {tokenError ? (
                    <CardContent className="space-y-6">
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-md text-sm">
                            <p className="font-medium mb-2">We couldn't verify your reset request</p>
                            <p>{tokenError}</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">This may be because:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                <li>The reset link has expired (links are valid for 30 minutes)</li>
                                <li>The reset link was already used</li>
                                <li>The reset link was modified or is invalid</li>
                            </ul>
                        </div>
                        <Button onClick={() => router.push("/forgot-password")} className="w-full">
                            Request a new reset link
                        </Button>
                    </CardContent>
                ) : !isComplete ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            if (errors.password) {
                                                const { password, ...rest } = errors
                                                setErrors(rest)
                                            }
                                        }}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                            if (errors.confirmPassword) {
                                                const { confirmPassword, ...rest } = errors
                                                setErrors(rest)
                                            }
                                        }}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                            </div>

                            {errors.form && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-md text-sm">{errors.form}</div>
                            )}
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Resetting password..." : "Reset password"}
                            </Button>
                        </CardFooter>
                    </form>
                ) : (
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold">Password Reset Complete</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Your password has been reset successfully. You will be redirected to the login page.
                            </p>
                        </div>

                        <Button onClick={() => router.push("/signin")} className="w-full">
                            Go to Login
                        </Button>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}

