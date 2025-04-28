"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Download, ExternalLink } from "lucide-react"
import dotenv from "dotenv"
export default function QuickStartPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      // Scroll to top when changing steps
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Scroll to top when changing steps
      window.scrollTo(0, 0)
    }
  }

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/documentation">
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
            </Link>
            <Link href="/api-status">
              <Button variant="ghost" size="sm">
                API Status
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="ghost" size="sm">
                Contact Us
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Start Guide</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/guides" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quick Start Guide</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Get up and running with HRConnect in just a few minutes
          </p>
        </div>

        {/* Step 1: Create Your Account */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Account</h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    To get started with HRConnect, you'll need to create an account. Follow these simple steps:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Visit the{" "}
                          <Link href="/signup" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">
                            signup page
                          </Link>{" "}
                          and click on "Get Started"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Enter your name, email address, and create a secure password
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        3
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Provide your company information, including company name, size, and industry
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        4
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Agree to the terms of service and privacy policy
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        5
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Click "Create Account" to complete the registration process
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">Pro Tip</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Use a strong, unique password for your HRConnect account. We recommend a combination of uppercase
                      and lowercase letters, numbers, and special characters.
                    </p>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=600&text=Signup+Screenshot"
                      alt="Signup Screenshot"
                      className="w-full"
                    />
                    <div className="p-4 bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        The HRConnect signup page where you'll create your account
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <div></div>
              <Button onClick={handleNextStep}>
                Next: Set Up Your Company Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Set Up Your Company Profile */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set Up Your Company Profile</h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    After creating your account, you'll need to set up your company profile. This information will be
                    used throughout the platform.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Navigate to the "Company Settings" section in the dashboard
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Upload your company logo (recommended size: 200x200px)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        3
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">
                          Enter your company address, phone number, and website
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        4
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">Set your business hours and time zone</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        5
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200">Click "Save" to update your company profile</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">Why This Matters</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Your company profile information will be used in reports, employee communications, and other
                      documents generated by the system. Keeping this information accurate and up-to-date ensures a
                      professional appearance.
                    </p>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=600&text=Company+Profile+Screenshot"
                      alt="Company Profile Screenshot"
                      className="w-full"
                    />
                    <div className="p-4 bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm text-gray-500 dark:text-gray-400">The company profile settings page</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Create Your Account
              </Button>
              <Button onClick={handleNextStep}>
                Next: Add Your Employees
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Add Your Employees */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Your Employees</h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    Now it's time to add your employees to the system. You can add employees individually or import them
                    in bulk.
                  </p>

                  <Tabs defaultValue="individual">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="individual">Add Individually</TabsTrigger>
                      <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
                    </TabsList>
                    <TabsContent value="individual" className="space-y-4 pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          1
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Navigate to the "Employees" section in the dashboard
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          2
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">Click the "Add Employee" button</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          3
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Fill in the employee's personal information (name, email, phone, etc.)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          4
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Enter employment details (job title, department, start date, etc.)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          5
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Click "Save" to add the employee to the system
                          </p>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden mt-4">
                        <img
                          src="/placeholder.svg?height=300&width=600&text=Add+Employee+Screenshot"
                          alt="Add Employee Screenshot"
                          className="w-full"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="bulk" className="space-y-4 pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          1
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Navigate to the "Employees" section in the dashboard
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          2
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">Click the "Import Employees" button</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          3
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">Download the CSV template</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          4
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Fill in the template with your employee data
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          5
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-200">
                            Upload the completed CSV file and click "Import"
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download CSV Template
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">Required Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      At minimum, you'll need each employee's full name, email address, job title, and department. Other
                      information can be added later.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Set Up Your Company Profile
              </Button>
              <Button onClick={handleNextStep}>
                Next: Configure Settings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Configure Settings */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                4
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configure Settings</h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    Configure your system settings to match your company's policies and workflows.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Attendance Settings</h3>
                      <div className="space-y-4 pl-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">
                              Set your company's working hours (e.g., 9:00 AM - 5:00 PM)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">
                              Define your work week (e.g., Monday to Friday)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">Configure break time policies</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Leave Management</h3>
                      <div className="space-y-4 pl-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">
                              Set up leave types (vacation, sick leave, personal leave, etc.)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">
                              Define leave accrual rules and entitlements
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">
                              Configure approval workflows for leave requests
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Notifications</h3>
                      <div className="space-y-4 pl-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">
                              Set up email notifications for important events
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">Configure in-app notifications</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-gray-200">Set up reminder schedules</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">Default Settings</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      HRConnect comes with sensible default settings that work for most companies. You can always adjust
                      these settings later as your needs change.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Add Your Employees
              </Button>
              <Button onClick={handleNextStep}>
                Next: Start Using HRConnect
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Start Using HRConnect */}
        {currentStep === 5 && (
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                5
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Start Using HRConnect</h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Congratulations!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      You've successfully set up HRConnect. Here are some next steps to get the most out of the
                      platform:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Invite Your Team</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Invite your HR team members and managers to access the system.
                      </p>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full">
                          Manage Users
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Explore Features</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Take a tour of all the features available in HRConnect.
                      </p>
                      <Link href="/guides">
                        <Button variant="outline" className="w-full">
                          View Feature Guides
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Watch Tutorials</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Learn how to use HRConnect with our video tutorials.
                      </p>
                      <Link href="/guides/videos">
                        <Button variant="outline" className="w-full">
                          Watch Videos
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Get Support</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Contact our support team if you need any assistance.
                      </p>
                      <Link href="/contact-us">
                        <Button variant="outline" className="w-full">
                          Contact Support
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">Need More Help?</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Our support team is available to help you with any questions or issues you may have. You can also
                      schedule a one-on-one onboarding session with one of our specialists.
                    </p>
                    <div className="mt-4">
                      <Link href="/contact-us">
                        <Button>
                          Schedule Onboarding Session
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Configure Settings
              </Button>
              <Link href="/dashboard">
                <Button>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Related Resources */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Learn through step-by-step videos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Watch our video tutorials to learn how to use HRConnect effectively.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/guides/videos" className="w-full">
                  <Button variant="outline" className="w-full">
                    Watch Videos
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Detailed guides and references</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse our comprehensive documentation for in-depth information.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/documentation" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Documentation
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
                <CardDescription>Get help when you need it</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Contact our support team for assistance with any issues or questions.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/contact-us" className="w-full">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

