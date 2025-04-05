"use client"

import type React from "react"

import { useRef, useReducer, useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginReducer, ReducerActionType } from "./utils"
import { login } from "@/lib/api/auth"
import { isAxiosError } from "axios"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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
  const { email, password, showPassword, rememberMe, error, isLoading, twoFactorCode, twoFactorEnabled } = state
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const handleIsLoading = (isLoading: boolean) => {
    dispatch({ type: ReducerActionType.IS_LOADING, payload: isLoading })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ReducerActionType.EMAIL, payload: e.target.value })
    dispatch({ type: ReducerActionType.ERROR, payload: "" })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ReducerActionType.PASSWORD, payload: e.target.value })
    dispatch({ type: ReducerActionType.ERROR, payload: "" })
  }

  const handleTwoFactorEnabled = (payload: boolean) => {
    dispatch({ type: ReducerActionType.TWO_FACTOR_ENABLED, payload: payload })
  }

  const handleShowPassword = () => {
    dispatch({ type: ReducerActionType.SHOW_PASSWORD, payload: !showPassword })
  }

  const handleError = (error: string) => {
    dispatch({ type: ReducerActionType.ERROR, payload: error })
  }

  const handleRememberMe = (checked: boolean) => {
    dispatch({ type: ReducerActionType.REMEMBER_ME, payload: checked })
  }

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
        },
        (error) => {
          setLocationError("Failed to get location")
          console.error(error)
        },
        { enableHighAccuracy: true }, // Request high accuracy
      )
    } else {
      console.log("Geolocation is not supported by this browser")
      setLocationError("Geolocation is not supported by this browser")
    }
  }

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
      getLocation()

      if (response.success) {
        router.push("/dashboard")
        return
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4"
    >
      <motion.div variants={fadeInUp} className="w-full max-w-md">
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex justify-center"
          >
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">HR</span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">Connect</span>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="w-full">
          <Card className="w-full dark:bg-gray-800 border dark:border-gray-700">
            <CardHeader className="space-y-1">
              <motion.div variants={fadeInUp}>
                <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CardDescription className="text-center">
                  Enter your credentials to sign in to your account
                </CardDescription>
              </motion.div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={fadeInUp} className="space-y-2">
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
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Forgot password?
                      </Link>
                    </motion.div>
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
                      <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 hover:text-blue-300" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => handleRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </motion.div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button type="submit" className="w-full bg-blue-600 dark:hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </motion.div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </motion.div>
                <motion.p variants={fadeInUp} className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Link
                      href="/signup"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign up
                    </Link>
                  </motion.span>
                </motion.p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          By signing in, you agree to our{" "}
          <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
            <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Terms of Service
            </Link>
          </motion.span>{" "}
          and{" "}
          <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
            <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Privacy Policy
            </Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

