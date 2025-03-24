"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { ArrowLeft, FileText, Zap, Code, BookOpen, Search, Key, Clock, Shield, AlertTriangle, HelpCircle } from 'lucide-react'
import { useState } from "react"
import { categoryInfo, faqItems } from "../../../../../data/api-reference/faq"

export default function ApiFaqPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // FAQ items
  

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
