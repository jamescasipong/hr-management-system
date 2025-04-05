"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import {sendEmailResetPassword} from "@/lib/api/auth"

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        try {
            // Validate email
            forgotPasswordSchema.parse({ email })

            // Simulate API call to send reset link
            const sendLink = await sendEmailResetPassword(email);

            if (sendLink.success) {
                setIsEmailSent(true)
            }

            // Show success state

        } catch (error: any) {

            console.log(error)
            setError(error.response.data.message)

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center">
                        <Link href="/signin" className="mr-2">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <CardTitle className="text-2xl">Reset password</CardTitle>
                    </div>
                    <CardDescription>
                        {!isEmailSent
                            ? "Enter your email address and we'll send you a password reset link"
                            : "Check your email for the reset link"}
                    </CardDescription>
                </CardHeader>

                {!isEmailSent ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (error) setError("")
                                    }}
                                    required
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    "Send reset link"
                                )}
                            </Button>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Remember your password?{" "}
                                <Link href="/signin" className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
                                    Back to login
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                ) : (
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold">Reset Link Sent</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                We've sent a password reset link to <span className="font-medium">{email}</span>
                            </p>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                Please check your email and click on the link to reset your password. The link will expire in 24 hours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button onClick={() => setIsEmailSent(false)} variant="outline" className="w-full">
                                Try a different email
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/signin">Back to login</Link>
                            </Button>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}

