"use client"

import type React from "react"

import { useRef, useReducer, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginReducer, ReducerActionType } from ".././utils"
import {login, logout} from "@/lib/api/auth"
import { isAxiosError } from "axios"
import instanceApi from "@/lib/api/auth"

export default function LoginPage() {
    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null)
    const [state, dispatch] = useReducer(loginReducer, {
        email: "",
        password: "",
        showPassword: false,
        twoFactorCode: "",
        error: "",
        twoFactorEnabled: false,
        rememberMe: false,
        isLoading: false,
    })
    const { email, password, showPassword, rememberMe, error, isLoading, twoFactorCode, twoFactorEnabled } = state;
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const handleIsLoading = (isLoading: boolean) => {
        dispatch({type: ReducerActionType.IS_LOADING, payload: isLoading})
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: ReducerActionType.EMAIL, payload: e.target.value})
        dispatch({type: ReducerActionType.ERROR, payload: ""})
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: ReducerActionType.PASSWORD, payload: e.target.value})
        dispatch({type: ReducerActionType.ERROR, payload: ""})
    }

    const handleTwoFactorEnabled = (payload: boolean) => {
        dispatch({type: ReducerActionType.TWO_FACTOR_ENABLED, payload: payload})
    }

    const handleShowPassword = () => {
        dispatch({type: ReducerActionType.SHOW_PASSWORD, payload: !showPassword})
    }

    const handleError = (error: string) => {
        dispatch({type: ReducerActionType.ERROR, payload: error})
    }

    const handleRememberMe = (checked: boolean) => {
        dispatch({type: ReducerActionType.REMEMBER_ME, payload: checked})
    }

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    setLocationError('Failed to get location');
                    console.error(error);
                },
                { enableHighAccuracy: true } // Request high accuracy
            );
        } else {
            console.log('Geolocation is not supported by this browser');
            setLocationError('Geolocation is not supported by this browser');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        handleIsLoading(true)
        handleError
        // Validate form
        if (!email || !password) {
            handleIsLoading(false)
            handleError("Enter email both email and password")
            return
        }

        try {
            // Simulate API call
            const response = await login(email, password)
            getLocation();

            if (response.success) {
                router.push("/dashboard")
                return;
            }

            if (!response.success && response.data?.twoFactor) {
                router.push("/verify-signin?email=" + encodeURIComponent(email))
            }

        } catch (err) {
            if (isAxiosError(err)) {
                handleError(err.response?.data?.message || "An error occurred")
            } else {
                handleError("An error occurred")
            }
        } finally {
            handleIsLoading(false)
        }
    }

    // console.log("state", state)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to home
                    </Link>
                    <div className="mt-6 flex justify-center">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">HR</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">Connect</span>
                    </div>
                </div>

                <Card className="w-full dark:bg-gray-800 border dark:border-gray-700">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="border dark:border-gray-700"
                                    id="email"
                                    ref={emailRef}
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        className="border dark:border-gray-700"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 hover:bg-transparent"
                                        onClick={handleShowPassword}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4 hover:text-blue-300" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => handleRememberMe(checked as boolean)}
                                />
                                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                                    Remember me for 30 days
                                </Label>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full bg-blue-600 dark:hover:bg-blue-700" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    By signing in, you agree to our{" "}
                    <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    )
}

