"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Building2, Settings, Calendar } from "lucide-react";

export default function FreeTrialPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [setupProgress, setSetupProgress] = useState(0);
  const router = useRouter();

  const totalSteps = 4;

  const handleNextStep = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsLoading(false);

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      setSetupProgress((prev) => prev + 100 / totalSteps);
    } else {
      // Complete setup
      setSetupProgress(100);
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              HR
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Connect
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Your 14-day free trial has started
            </span>
            <Button
              className="dark:border-gray-700"
              variant="outline"
              size="sm"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Setup progress
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(setupProgress)}%
            </span>
          </div>
          <Progress value={setupProgress} className="h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Set up your HRConnect account
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Complete these steps to get the most out of your free trial
          </p>
        </div>

        <div className="mt-8">
          {currentStep === 1 && (
            <Card className="dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>
                      Set up your company details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Button size="sm">Upload Logo</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Input
                    className="dark:border-gray-700"
                    id="companyAddress"
                    placeholder="123 Business St."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      className="dark:border-gray-700"
                      id="city"
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      className="dark:border-gray-700"
                      id="zipCode"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    className="dark:border-gray-700"
                    id="companyWebsite"
                    placeholder="https://example.com"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className="dark:hover:bg-gray-950 dark:border-gray-700"
                  variant="outline"
                  onClick={handleSkip}
                >
                  Skip for now
                </Button>
                <Button onClick={handleNextStep} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Continue"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Add Team Members</CardTitle>
                    <CardDescription>
                      Invite your team to HRConnect
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emails">Email Addresses</Label>
                  <Input
                    className="dark:border-gray-700"
                    id="emails"
                    placeholder="Enter email addresses separated by commas"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    You can add up to 10 team members during your free trial
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <h3 className="font-medium mb-2">Or import team members</h3>
                  <div className="flex space-x-2">
                    <Button
                      className="dark:border-gray-700 dark:hover:bg-gray-700"
                      variant="outline"
                      size="sm"
                    >
                      Import from CSV
                    </Button>
                    <Button
                      className="dark:border-gray-700 dark:hover:bg-gray-700"
                      variant="outline"
                      size="sm"
                    >
                      Import from Excel
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4 dark:border-gray-700">
                  <h3 className="font-medium mb-2">
                    Customize invitation message
                  </h3>
                  <textarea
                    className="w-full h-24 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    defaultValue="Hi there! I'm inviting you to join our company's HR platform. Please sign up using the link below."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className="dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-900"
                  variant="outline"
                  onClick={handleSkip}
                >
                  Skip for now
                </Button>
                <Button onClick={handleNextStep} disabled={isLoading}>
                  {isLoading ? "Sending invites..." : "Continue"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Set Up Work Schedule</CardTitle>
                    <CardDescription>
                      Configure your company's work hours and policies
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="workdays">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="workdays">Work Days</TabsTrigger>
                    <TabsTrigger value="policies">Leave Policies</TabsTrigger>
                  </TabsList>
                  <TabsContent value="workdays" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Working Days</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((day, index) => (
                          <div
                            key={day}
                            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                              index < 5
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Click to toggle working days
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="workStart">Work Start Time</Label>
                        <Input
                          id="workStart"
                          type="time"
                          defaultValue="09:00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workEnd">Work End Time</Label>
                        <Input id="workEnd" type="time" defaultValue="17:00" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="breakDuration">Break Duration</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="breakDuration"
                          type="number"
                          defaultValue="60"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          minutes
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="policies" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Annual Leave Policy</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="annualDays">Annual Leave Days</Label>
                          <Input
                            id="annualDays"
                            type="number"
                            defaultValue="20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sickDays">Sick Leave Days</Label>
                          <Input
                            id="sickDays"
                            type="number"
                            defaultValue="10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Leave Approval Process</Label>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <input
                          type="radio"
                          id="auto"
                          name="approval"
                          defaultChecked
                        />
                        <Label htmlFor="auto" className="cursor-pointer">
                          Automatic approval
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <input type="radio" id="manager" name="approval" />
                        <Label htmlFor="manager" className="cursor-pointer">
                          Manager approval required
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleSkip}>
                  Skip for now
                </Button>
                <Button onClick={handleNextStep} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Continue"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Final Setup</CardTitle>
                    <CardDescription>
                      Choose modules and features for your account
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Enable Modules</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { name: "Employee Management", enabled: true },
                      { name: "Attendance Tracking", enabled: true },
                      { name: "Leave Management", enabled: true },
                      { name: "Payroll", enabled: false },
                      { name: "Performance Reviews", enabled: false },
                      { name: "Recruitment", enabled: false },
                    ].map((module, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 border rounded-md"
                      >
                        <input
                          type="checkbox"
                          id={`module-${index}`}
                          defaultChecked={module.enabled}
                        />
                        <Label
                          htmlFor={`module-${index}`}
                          className="cursor-pointer"
                        >
                          {module.name}
                          {!module.enabled && (
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                              (Premium)
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notification Preferences</Label>
                  <div className="space-y-2">
                    {[
                      "Email notifications for leave requests",
                      "Email notifications for attendance",
                      "Email digest of weekly reports",
                      "Browser notifications",
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`notification-${index}`}
                          defaultChecked
                        />
                        <Label
                          htmlFor={`notification-${index}`}
                          className="cursor-pointer"
                        >
                          {notification}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleSkip}>
                  Skip for now
                </Button>
                <Button onClick={handleNextStep} disabled={isLoading}>
                  {isLoading ? "Finalizing..." : "Complete Setup"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Steps indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentStep
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help setting up your account?{" "}
            <Link
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
