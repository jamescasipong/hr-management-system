"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react'
import { apiUpdates } from "@/data/api-reference/updates"

export default function ApiUpdatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter updates based on search query
  const filterUpdates = (updates: any[]) => {
    if (!searchQuery) return updates
    return updates.filter(
      (update) =>
        update.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">API Updates</h2>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search updates..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">API Resources</h3>
                <nav className="space-y-1">
                  <Link href="/api-reference/rest" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    REST API Reference
                  </Link>
                  <Link href="/api-reference/quick-start" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Quick Start Guide
                  </Link>
                  <Link href="/api-reference/faq" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    FAQ
                  </Link>
                  <Link href="/api-reference/integration" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Integration Guide
                  </Link>
                  <Link href="/api-reference/videos" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Video Tutorials
                  </Link>
                  <Link href="/api-reference/updates" className="block py-2 text-blue-600 dark:text-blue-400 hover:underline">
                    API Updates
                  </Link>
                </nav>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Stay Updated</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  Subscribe to our developer newsletter to get notified about API updates.
                </p>
                <div className="mt-3">
                  <Link href="/api-reference/newsletter">
                    <Button variant="outline" size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">API Updates & Changelog</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Stay up to date with the latest changes and improvements to the HRConnect API. We regularly update our API to add new features, fix bugs, and improve performance.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-8">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">API Versioning Policy</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use semantic versioning (MAJOR.MINOR.PATCH) for our API. Breaking changes will only be introduced in MAJOR version updates, with at least 6 months notice.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {filterUpdates(apiUpdates).map((update, index) => (
                <Card key={index} className="relative overflow-hidden">
                  {update.breaking && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-medium">
                      Breaking Change
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {update.version}
                        </Badge>
                        <CardTitle>{update.title}</CardTitle>
                        <CardDescription>{update.description}</CardDescription>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{update.date}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Changes:</h3>
                    <ul className="space-y-2">
                      {update.changes.map((change: any, changeIndex: number) => (
                        <li key={changeIndex} className="flex items-start">
                          {change.type === "feature" && (
                            <Badge className="mr-2 mt-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              New
                            </Badge>
                          )}
                          {change.type === "improvement" && (
                            <Badge className="mr-2 mt-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Improved
                            </Badge>
                          )}
                          {change.type === "fix" && (
                            <Badge className="mr-2 mt-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Fixed
                            </Badge>
                          )}
                          {change.type === "breaking" && (
                            <Badge className="mr-2 mt-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Breaking
                            </Badge>
                          )}
                          <span className="text-gray-700 dark:text-gray-300">{change.description}</span>
                        </li>
                      ))}
                    </ul>
                    {update.version !== "v1.0.0" && (
                      <div className="mt-4">
                        <Link href={`/api-reference/updates/${update.version.toLowerCase()}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center">
                          View detailed release notes
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filterUpdates(apiUpdates).length === 0 && (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No updates found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  No updates match your search criteria. Try adjusting your search.
                </p>
              </div>
            )}

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Beta Features</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Want to try out new API features before they're officially released? Join our beta program to get early access to upcoming features and provide feedback.
                  </p>
                  <div className="mt-4">
                    <Link href="/api-reference/beta-program">
                      <Button>Join Beta Program</Button>
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
