"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
    industry: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return false
    }

    return true
  }

  const validateStep2 = () => {
    if (!formData.companyName || !formData.companySize || !formData.industry) {
      setError("Please fill in all fields")
      return false
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return false
    }

    return true
  }

  const handleNextStep = () => {
    setError("")

    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsComplete(true)

      // Redirect to free trial after 2 seconds
      setTimeout(() => {
        router.push("/free-trial")
      }, 5000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isComplete) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4"
      >
        <motion.div variants={scaleIn} className="w-full max-w-md">
          <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CardTitle className="text-2xl mb-2">Account Created!</CardTitle>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CardDescription className="mb-6">
                  Your account has been successfully created. You'll be redirected to set up your free trial.
                </CardDescription>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4"
              >
                <Button className="w-full" onClick={() => router.push("/free-trial")}>
                  Continue to Free Trial
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
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

        <motion.div variants={scaleIn} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="w-full">
          <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center"
                >
                  {step}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-500"
                >
                  Step {step} of 2
                </motion.div>
              </div>
              <motion.div variants={fadeInUp}>
                <CardTitle className="text-2xl">{step === 1 ? "Create your account" : "Company information"}</CardTitle>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CardDescription>
                  {step === 1
                    ? "Enter your details to create your account"
                    : "Tell us about your company to customize your experience"}
                </CardDescription>
              </motion.div>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleNextStep()
              }}
            >
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

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          className="dark:border-gray-700"
                          id="fullName"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          className="dark:border-gray-700"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            className="dark:border-gray-700"
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </motion.div>
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            className="dark:border-gray-700"
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </motion.div>
                          </Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          className="dark:border-gray-700"
                          id="companyName"
                          name="companyName"
                          placeholder="Acme Inc."
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => handleSelectChange("companySize", value)}
                        >
                          <SelectTrigger className="dark:border-gray-700">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-700">
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501+">501+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleSelectChange("industry", value)}
                        >
                          <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:focus-visible:ring-blue-500">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-900 dark:border-gray-700 dark:focus-visible:ring-blue-500">
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="flex items-start space-x-2 pt-2">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm font-normal leading-tight cursor-pointer">
                          I agree to the{" "}
                          <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                            Privacy Policy
                          </Link>
                        </Label>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
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
                    ) : step === 1 ? (
                      "Continue"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>

                {step === 1 && (
                  <motion.p variants={fadeInUp} className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                      <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Sign in
                      </Link>
                    </motion.span>
                  </motion.p>
                )}

                {step === 2 && (
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full dark:border-gray-700"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

