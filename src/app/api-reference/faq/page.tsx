"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { ArrowLeft, FileText, Zap, Code, BookOpen, Search, Key, Clock, Shield, AlertTriangle, HelpCircle } from 'lucide-react'
import { useState } from "react"

export default function ApiFaqPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // FAQ items
  const faqItems = [
    {
      category: "authentication",
      question: "How do I get an API key?",
      answer: "You can get an API key by logging into your HRConnect account, navigating to Settings > API, and clicking on 'Generate API Key'. You'll need to provide a name for your key to help you identify it later. Make sure to copy and store your API key securely, as you won't be able to see it again."
    },
    {
      category: "authentication",
      question: "How do I reset my API key?",
      answer: "If you need to reset your API key, log into your HRConnect account, go to Settings > API, find the key you want to reset, and click on 'Revoke'. Then, generate a new API key. Note that revoking an API key will immediately invalidate it, so any applications using that key will stop working until you update them with the new key."
    },
    {
      category: "authentication",
      question: "Can I have multiple API keys?",
      answer: "Yes, you can generate multiple API keys for different applications or purposes. This is a good practice as it allows you to revoke access for a specific application without affecting others. Each key can also have different permissions based on your needs."
    },
    {
      category: "rate-limits",
      question: "What are the rate limits for the API?",
      answer: "Rate limits vary based on your plan. Basic plans have a limit of 100 requests per minute, Premium plans have 300 requests per minute, and Enterprise plans have 1000 requests per minute. If you exceed these limits, you'll receive a 429 Too Many Requests response. You can monitor your current rate limit status using the X-RateLimit-* headers included in all API responses."
    },
    {
      category: "rate-limits",
      question: "What happens if I exceed the rate limits?",
      answer: "If you exceed the rate limits, the API will return a 429 Too Many Requests response. The response will include a Retry-After header indicating how many seconds you should wait before making another request. We recommend implementing exponential backoff in your applications to handle rate limiting gracefully."
    },
    {
      category: "rate-limits",
      question: "Can I request an increase to my rate limits?",
      answer: "Yes, if you need higher rate limits, you can upgrade your plan or contact our sales team to discuss custom rate limits for your specific needs. Enterprise customers can request custom rate limits based on their usage patterns."
    },
    {
      category: "endpoints",
      question: "How do I paginate through results?",
      answer: "All list endpoints support pagination using the page and limit query parameters. For example, to get the second page of results with 20 items per page, you would make a request to /api/v1/employees?page=2&limit=20. The response includes pagination metadata with information about the total number of items, the current page, and links to navigate to other pages."
    },
    {
      category: "endpoints",
      question: "How do I filter results?",
      answer: "Most list endpoints support filtering using query parameters. For example, to get all employees in the Engineering department, you would make a request to /api/v1/employees?department=Engineering. You can combine multiple filters to narrow down the results. Check the documentation for each endpoint to see the available filter parameters."
    },
    {
      category: "endpoints",
      question: "How do I sort results?",
      answer: "You can sort results using the sort query parameter. For example, to sort employees by last name in ascending order, you would make a request to /api/v1/employees?sort=lastName. To sort in descending order, prefix the field name with a minus sign: /api/v1/employees?sort=-lastName. You can also sort by multiple fields by separating them with commas."
    },
    {
      category: "errors",
      question: "How do I handle API errors?",
      answer: "The API uses standard HTTP status codes to indicate the success or failure of requests. In addition to the status code, error responses include a JSON object with details about the error, including an error code, message, and sometimes additional information like the parameter that caused the error. We recommend implementing proper error handling in your applications to provide a good user experience."
    },
    {
      category: "errors",
      question: "What does the 'invalid_request' error mean?",
      answer: "The 'invalid_request' error typically means that there's something wrong with your request, such as missing required parameters or invalid parameter values. Check the error message and the param field in the error response for more details about what's wrong with your request."
    },
    {
      category: "errors",
      question: "I'm getting a 401 Unauthorized error. What should I do?",
      answer: "A 401 Unauthorized error means that your API key is missing or invalid. Make sure you're including your API key in the Authorization header of your requests using the Bearer authentication scheme: Authorization: Bearer YOUR_API_KEY. If you're sure your API key is correct, it may have been revoked. Try generating a new API key."
    },
    {
      category: "webhooks",
      question: "How do I set up webhooks?",
      answer: "To set up webhooks, go to your HRConnect account, navigate to Settings > Webhooks, and click on 'Add Webhook'. You'll need to provide a URL where we'll send the webhook events, and select the events you're interested in. We'll send a POST request to your URL whenever the selected events occur. Make sure your endpoint can handle these requests and respond with a 200 OK status code."
    },
    {
      category: "webhooks",
      question: "How do I verify webhook signatures?",
      answer: "Each webhook request includes a X-HRConnect-Signature header that you can use to verify that the request came from HRConnect. The signature is a HMAC SHA-256 hash of the request body, using your webhook secret as the key. To verify the signature, compute the HMAC SHA-256 hash of the request body using your webhook secret, and compare it to the value in the X-HRConnect-Signature header. They should match exactly."
    },
    {
      category: "webhooks",
      question: "What events can I subscribe to with webhooks?",
      answer: "You can subscribe to a variety of events, including employee created/updated/deleted, attendance recorded, leave request created/approved/rejected, payroll processed, and more. Check the Webhooks documentation for a complete list of available events."
    },
    {
      category: "security",
      question: "Is my data secure when using the API?",
      answer: "Yes, we take security seriously. All API requests are made over HTTPS, which encrypts the data in transit. Your API key is used to authenticate requests and should be kept secure. We also implement rate limiting and other security measures to protect against abuse. For more information about our security practices, see our Security Policy."
    },
    {
      category: "security",
      question: "Do you support OAuth 2.0?",
      answer: "Yes, we support OAuth 2.0 for user-specific actions. This allows you to build applications that can perform actions on behalf of users without requiring their HRConnect credentials. See our OAuth 2.0 documentation for more details on how to implement this authentication method."
    },
    {
      category: "security",
      question: "How should I store API keys in my application?",
      answer: "You should never store API keys in client-side code or public repositories. Instead, store them securely on your server and use environment variables or a secure configuration system. For mobile applications, consider using a backend service to make API requests rather than embedding the API key in the app."
    },
    {
      category: "general",
      question: "Do you have client libraries for the API?",
      answer: "Yes, we provide official client libraries for several programming languages, including JavaScript, Python, Ruby, PHP, and Java. These libraries handle authentication, error handling, and other common tasks for you. You can find them in our GitHub repository or install them using your language's package manager."
    },
    {
      category: "general",
      question: "How do I report a bug or request a feature?",
      answer: "If you find a bug or have a feature request, you can contact our support team through the HRConnect dashboard or email api-support@hrconnect.com. Please provide as much detail as possible, including steps to reproduce the issue, expected behavior, and actual behavior."
    },
    {
      category: "general",
      question: "Is there a sandbox environment for testing?",
      answer: "Yes, we provide a sandbox environment for testing your API integration before going to production. The sandbox environment is available at https://api-sandbox.hrconnect.com and uses separate API keys from the production environment. You can generate sandbox API keys from your HRConnect dashboard under Settings > API > Sandbox."
    }
  ]

  // Filter FAQ items based on search query
  const filteredFaqItems = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems

  // Group FAQ items by category
  const groupedFaqItems = filteredFaqItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof faqItems>)

  // Category titles and icons
  const categoryInfo = {
    authentication: { title: "Authentication", icon: Key },
    "rate-limits": { title: "Rate Limits", icon: Clock },
    endpoints: { title: "Endpoints & Parameters", icon: Code },
    errors: { title: "Errors & Troubleshooting", icon: AlertTriangle },
    webhooks: { title: "Webhooks", icon: Zap },
    security: { title: "Security", icon: Shield },
    general: { title: "General Questions", icon: HelpCircle }
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">API FAQ</h2>
                <nav className="space-y-1">
                  <a href="#authentication" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Authentication
                  </a>
                  <a href="#rate-limits" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Rate Limits
                  </a>
                  <a href="#endpoints" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Endpoints & Parameters
                  </a>
                  <a href="#errors" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Errors & Troubleshooting
                  </a>
                  <a href="#webhooks" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Webhooks
                  </a>
                  <a href="#security" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Security
                  </a>
                  <a href="#general" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    General Questions
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
                  <Link href="/api-reference/quick-start" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Zap className="h-4 w-4 mr-2" />
                    Quick Start Guide
                  </Link>
                  <Link href="/api-reference/updates" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Zap className="h-4 w-4 mr-2" />
                    API Updates
                  </Link>
                  <Link href="/api-reference/integration" className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Code className="h-4 w-4 mr-2" />
                    Integration Guide
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Find answers to common questions about the HRConnect API. If you can't find the answer you're looking for, feel free to contact our support team.
              </p>

              <div className="relative mb-8">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search FAQ..."
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {Object.keys(groupedFaqItems).length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Try adjusting your search query or browse the categories below.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                Object.entries(groupedFaqItems).map(([category, items]) => {
                  const { title, icon: Icon } = categoryInfo[category as keyof typeof categoryInfo]
                  return (
                    <div key={category} id={category} className="mb-8">
                      <div className="flex items-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                      </div>

                      <Card>
                        <CardContent className="pt-6">
                          <Accordion type="single" collapsible className="w-full">
                            {items.map((item, index) => (
                              <AccordionItem key={index} value={`${category}-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white">
                                  {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="pt-2 pb-4 text-gray-600 dark:text-gray-300">
                                    {item.answer}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })
              )}
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Still have questions?</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    If you couldn't find the answer to your question, our developer support team is here to help.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <Link href="/contact-us">
                      <Button>Contact Developer Support</Button>
                    </Link>
                    <Link href="/api-reference/rest">
                      <Button variant="outline">View API Reference</Button>
                    </Link>
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
