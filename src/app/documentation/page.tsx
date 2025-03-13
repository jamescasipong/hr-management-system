"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, Code, Users, Calendar, DollarSign, Settings, ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react'

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 border-b-[1px] dark:border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/api-status">
              <Button variant="ghost" size="sm">API Status</Button>
            </Link>
            {/* <Link href="/guides">
              <Button variant="ghost" size="sm">Guides</Button>
            </Link> */}
            <Link href="/contact-us">
              <Button variant="ghost" size="sm">Contact Us</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            HRConnect Documentation
          </h1>
          <p className="mt-4 text-xl text-blue-100">
            Everything you need to know about using and integrating with HRConnect
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex rounded-md shadow-sm">
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-md border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
              <Button className="rounded-l-none">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Documentation</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="#getting-started" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Getting Started
                    </Link>
                  </li>
                  <li>
                    <Link href="#user-guide" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      User Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#api-reference" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link href="#integrations" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Modules</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="#employee-management" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Employee Management
                    </Link>
                  </li>
                  <li>
                    <Link href="#attendance" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Attendance
                    </Link>
                  </li>
                  <li>
                    <Link href="#leave-management" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Leave Management
                    </Link>
                  </li>
                  <li>
                    <Link href="#payroll" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Payroll
                    </Link>
                  </li>
                  <li>
                    <Link href="#reports" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Reports
                    </Link>
                  </li>
                </ul>
              </div> */}
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Need help?</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <div className="mt-3">
                  <Link href="/contact-us">
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div id="getting-started" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Welcome to HRConnect! This guide will help you get started with our platform and make the most of its features.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Quick Start Guide</CardTitle>
                    <CardDescription>Set up your account in minutes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-2">
                          1
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">Create your account</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-2">
                          2
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">Set up your company profile</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-2">
                          3
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">Add your employees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-2">
                          4
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">Configure your settings</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link href="/guides/quick-start">
                        <Button variant="outline" size="sm" className="w-full">
                          Read Full Guide
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                    <CardDescription>Learn through step-by-step videos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <Link href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                          <FileText className="mr-2 h-4 w-4" />
                          Introduction to HRConnect
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                          <FileText className="mr-2 h-4 w-4" />
                          Setting Up Your Account
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                          <FileText className="mr-2 h-4 w-4" />
                          Managing Employees
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                          <FileText className="mr-2 h-4 w-4" />
                          Tracking Attendance
                        </Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link href="/guides/videos">
                        <Button variant="outline" size="sm" className="w-full">
                          View All Videos
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Key Features</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="p-4 border rounded-md mt-2 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">HRConnect Overview</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      HRConnect is a comprehensive HR management platform designed to streamline your HR processes, 
                      boost employee productivity, and provide valuable insights through data-driven analytics.
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Our platform offers a range of modules including employee management, attendance tracking, 
                      leave management, payroll processing, and reporting tools.
                    </p>
                  </TabsContent>
                  <TabsContent value="features" className="p-4 border rounded-md mt-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Key Features</h3>
                    <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <Users className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>Centralized employee database with comprehensive profiles</span>
                      </li>
                      <li className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>Automated attendance tracking with multiple check-in options</span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>Streamlined leave management with approval workflows</span>
                      </li>
                      <li className="flex items-start">
                        <DollarSign className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>Integrated payroll processing with tax calculations</span>
                      </li>
                      <li className="flex items-start">
                        <Settings className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>Customizable settings to match your company policies</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="requirements" className="p-4 border rounded-md mt-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Requirements</h3>
                    <div className="mt-2 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Web Browser</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          HRConnect works on all modern browsers including Chrome, Firefox, Safari, and Edge.
                          We recommend using the latest version for the best experience.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Mobile Devices</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Our mobile app is available for iOS (12.0+) and Android (8.0+) devices.
                          Employees can also access the platform via mobile web browsers.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Internet Connection</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          A stable internet connection is required for real-time features like attendance tracking.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white" id="api-reference">API Reference</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Integrate HRConnect with your existing systems using our comprehensive API.
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>REST API</CardTitle>
                    <CardDescription>Standard REST endpoints for all resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our REST API provides access to all HRConnect resources and supports standard HTTP methods.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                      <code>GET /api/v1/employees</code>
                    </div>
                    <div className="mt-4">
                      <Link href="/api-reference/rest">
                        <Button variant="outline" size="sm" className="w-full">
                          View REST API Docs
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>Real-time event notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Subscribe to events and receive real-time notifications when data changes in HRConnect.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                      <code>POST /api/v1/webhooks/subscribe</code>
                    </div>
                    <div className="mt-4">
                      <Link href="/api-reference/webhooks">
                        <Button variant="outline" size="sm" className="w-full">
                          View Webhooks Docs
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card className="dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>API Authentication</CardTitle>
                    <CardDescription>Secure your API requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      All API requests must be authenticated using API keys or OAuth 2.0.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">API Keys</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Include your API key in the Authorization header of your requests:
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm mt-2 overflow-x-auto">
                          <code>Authorization: Bearer YOUR_API_KEY</code>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">OAuth 2.0</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          For user-specific actions, use OAuth 2.0 to request access on behalf of users.
                        </p>
                        <div className="mt-2">
                          <Link href="/api-reference/oauth">
                            <Button variant="outline" size="sm">
                              OAuth 2.0 Guide
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link href="/api-reference">
                  <Button>
                    View Full API Documentation
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
