"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Key, Lock, Terminal, Code, FileText, Zap, BookOpen } from 'lucide-react'
import {apiKeyExample, createEmployeeExample} from "../../../../../data/api-reference/quick-start"

export default function QuickStartGuidePage() {
  const [activeLanguage, setActiveLanguage] = useState("curl")
  const [copiedExample, setCopiedExample] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedExample(id)
    setTimeout(() => setCopiedExample(null), 2000)
  }

  // API key example
  
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <div>
                <Link href="/api-reference/rest" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to API Reference
                </Link>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Start Guide</h2>
                <nav className="space-y-1">
                  <a href="#introduction" className="block py-2 text-blue-600 dark:text-blue-400 hover:underline">
                    Introduction
                  </a>
                  <a href="#authentication" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Authentication
                  </a>
                  <a href="#first-request" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Your First Request
                  </a>
                  <a href="#create-resource" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Creating Resources
                  </a>
                  <a href="#error-handling" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Error Handling
                  </a>
                  <a href="#next-steps" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Next Steps
                  </a>
                </nav>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Related Resources</h3>
                <nav className="space-y-1">
                  <Link href="/api-reference/rest" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <FileText className="h-4 w-4 mr-2" />
                    API Reference
                  </Link>
                  <Link href="/api-reference/updates" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Zap className="h-4 w-4 mr-2" />
                    API Updates
                  </Link>
                  <Link href="/api-reference/faq" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <BookOpen className="h-4 w-4 mr-2" />
                    API FAQ
                  </Link>
                  <Link href="/api-reference/integration" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Code className="h-4 w-4 mr-2" />
                    Integration Guide
                  </Link>
                  <Link href="/api-reference/videos" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <FileText className="h-4 w-4 mr-2" />
                    Video Tutorials
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div id="introduction" className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quick Start Guide</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome to the HRConnect API Quick Start Guide! This guide will help you get up and running with the HRConnect API in just a few minutes. By the end of this guide, you'll be able to make your first API request and understand the basics of working with our API.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Prerequisites</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>A HRConnect account with API access enabled</li>
                  <li>Basic knowledge of HTTP requests and JSON</li>
                  <li>A tool to make HTTP requests (cURL, Postman, or your preferred programming language)</li>
                </ul>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                The HRConnect API is organized around REST principles. It uses standard HTTP methods, returns JSON responses, and uses standard HTTP status codes to indicate the success or failure of requests.
              </p>
            </div>

            <div id="authentication" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 1: Authentication</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Before you can make requests to the HRConnect API, you need to authenticate. We use API keys to authenticate requests. You can view and manage your API keys in the HRConnect dashboard.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Getting Your API Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-300">
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">Log in to your HRConnect account</span>
                      <p>Navigate to the HRConnect dashboard at <a href="https://app.hrconnect.com" className="text-blue-600 hover:underline dark:text-blue-400">https://app.hrconnect.com</a></p>
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">Go to Settings</span>
                      <p>Click on your profile icon in the top-right corner and select "Settings" from the dropdown menu.</p>
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">Navigate to API Settings</span>
                      <p>In the settings menu, click on "API" or "Developer" to access your API settings.</p>
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">Generate an API Key</span>
                      <p>Click the "Generate API Key" button. You'll be asked to provide a name for your key to help you identify it later.</p>
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">Copy your API Key</span>
                      <p>Your new API key will be displayed. Make sure to copy it and store it securely, as you won't be able to see it again.</p>
                    </li>
                  </ol>
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Important Security Note</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your API key grants access to your HRConnect data. Keep it secure and never share it in publicly accessible areas such as GitHub, client-side code, etc. If you believe your API key has been compromised, you should revoke it immediately and generate a new one.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Using Your API Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    To authenticate your API requests, include your API key in the Authorization header of all requests using the Bearer authentication scheme:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto mb-4">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Here's an example of how to include your API key in a request:
                  </p>
                  <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="mb-4">
                    <TabsList>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="csharp">C#</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.curl, "api-key-curl")}
                        >
                          {copiedExample === "api-key-curl" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.curl}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="javascript" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.javascript, "api-key-js")}
                        >
                          {copiedExample === "api-key-js" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.javascript}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="python" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.python, "api-key-python")}
                        >
                          {copiedExample === "api-key-python" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.python}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="csharp" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.csharp, "api-key-csharp")}
                        >
                          {copiedExample === "api-key-csharp" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.csharp}</pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div id="first-request" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 2: Make Your First Request</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Now that you have your API key, let's make your first request to the HRConnect API. We'll start by retrieving a list of employees.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Retrieving Employees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    To retrieve a list of employees, make a GET request to the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/api/v1/employees</code> endpoint:
                  </p>
                  <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="mb-4">
                    <TabsList>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="csharp">C#</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.curl, "get-employees-curl")}
                        >
                          {copiedExample === "get-employees-curl" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.curl}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="javascript" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.javascript, "get-employees-js")}
                        >
                          {copiedExample === "get-employees-js" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.javascript}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="python" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.python, "get-employees-python")}
                        >
                          {copiedExample === "get-employees-python" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.python}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="csharp" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKeyExample.csharp, "get-employees-csharp")}
                        >
                          {copiedExample === "get-employees-csharp" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{apiKeyExample.csharp}</pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If your request is successful, you'll receive a response like this:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "data": [
    {
      "id": "emp_12345",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "department": "Engineering",
      "position": "Software Engineer",
      "startDate": "2023-01-15",
      "status": "active",
      "createdAt": "2023-01-10T14:23:45Z",
      "updatedAt": "2023-01-10T14:23:45Z"
    },
    {
      "id": "emp_12346",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "department": "Marketing",
      "position": "Marketing Manager",
      "startDate": "2022-11-01",
      "status": "active",
      "createdAt": "2022-10-25T09:12:33Z",
      "updatedAt": "2022-10-25T09:12:33Z"
    }
  ],
  "pagination": {
    "total": 125,
    "page": 1,
    "limit": 10,
    "pages": 13,
    "next": 2
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Understanding the Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The response contains two main sections:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">data</span>: An array of employee objects, each containing details about an employee.
                    </li>
                    <li>
                      <span className="font-medium text-gray-900 dark:text-white">pagination</span>: Information about the pagination of results, including the total number of employees, the current page, and links to navigate to other pages.
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    You can use the pagination information to navigate through the results. For example, to get the next page of results, you would make a request to <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/api/v1/employees?page=2</code>.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div id="create-resource" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 3: Create a Resource</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Now let's try creating a new resource. We'll create a new employee by making a POST request to the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/api/v1/employees</code> endpoint.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Creating an Employee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    To create a new employee, you need to send a POST request with the employee's details in the request body:
                  </p>
                  <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="mb-4">
                    <TabsList>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="csharp">C#</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(createEmployeeExample.curl, "create-employee-curl")}
                        >
                          {copiedExample === "create-employee-curl" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{createEmployeeExample.curl}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="javascript" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(createEmployeeExample.javascript, "create-employee-js")}
                        >
                          {copiedExample === "create-employee-js" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{createEmployeeExample.javascript}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="python" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(createEmployeeExample.python, "create-employee-python")}
                        >
                          {copiedExample === "create-employee-python" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{createEmployeeExample.python}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="csharp" className="relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(createEmployeeExample.csharp, "create-employee-csharp")}
                        >
                          {copiedExample === "create-employee-csharp" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                        <pre>{createEmployeeExample.csharp}</pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If the employee is created successfully, you'll receive a response with a 201 Created status code and the details of the newly created employee:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "data": {
    "id": "emp_12347",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "position": "Software Engineer",
    "startDate": "2023-01-15",
    "status": "active",
    "createdAt": "2023-04-15T10:30:45Z",
    "updatedAt": "2023-04-15T10:30:45Z"
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="error-handling" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 4: Handling Errors</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When working with the API, you'll need to handle errors that might occur. The HRConnect API uses standard HTTP status codes to indicate the success or failure of requests.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Common Error Codes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="font-medium text-gray-900 dark:text-white w-24">400 Bad Request</span>
                      <span>The request was unacceptable, often due to missing a required parameter.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-gray-900 dark:text-white w-24">401 Unauthorized</span>
                      <span>No valid API key provided.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-gray-900 dark:text-white w-24">403 Forbidden</span>
                      <span>The API key doesn't have permissions to perform the request.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-gray-900 dark:text-white w-24">404 Not Found</span>
                      <span>The requested resource doesn't exist.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-gray-900 dark:text-white w-24">429 Too Many Requests</span>
                      <span>Too many requests hit the API too quickly.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium text-gray-900 dark:text-white w-24">500, 502, 503, 504 Server Errors</span>
                      <span>Something went wrong on our end.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Error Response Format
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    When an error occurs, the API will return a JSON response with an error object containing details about the error:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`{
  "error": {
    "code": "invalid_request",
    "message": "The request was unacceptable, often due to missing a required parameter.",
    "param": "email",
    "type": "validation_error"
  }
}`}</pre>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    When handling errors in your application, you should check the HTTP status code and the error details in the response body to determine the appropriate action to take.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div id="next-steps" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Next Steps</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Congratulations! You've made your first requests to the HRConnect API. Here are some next steps to continue your journey:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Explore the API Reference
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Dive deeper into the HRConnect API by exploring our comprehensive API reference documentation. Learn about all available endpoints, request parameters, and response formats.
                    </p>
                    <Link href="/api-reference/rest">
                      <Button variant="outline" className="w-full">
                        View API Reference
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Integration Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Learn how to integrate the HRConnect API with your existing systems and workflows. Our integration guide provides step-by-step instructions and best practices.
                    </p>
                    <Link href="/api-reference/integration">
                      <Button variant="outline" className="w-full">
                        View Integration Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-start">
                  <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Need help?</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      If you have any questions or need assistance with the HRConnect API, our developer support team is here to help.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                      <Link href="/contact-us">
                        <Button>Contact Developer Support</Button>
                      </Link>
                      <Link href="/api-reference/faq">
                        <Button variant="outline">View API FAQ</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
