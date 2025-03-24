"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Play, Clock, Calendar, AlertTriangle, ExternalLink } from "lucide-react"
import { useState } from "react"
import { videoTutorials } from "@/data/api-reference/videos"

export default function ApiVideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter videos based on search query and category
  const filterVideos = (videos: any[]) => {
    return videos.filter((video) => {
      const matchesSearch =
        !searchQuery ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = activeCategory === "all" || video.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }

  const filteredVideos = filterVideos(videoTutorials)
  const featuredVideos = videoTutorials.filter((video) => video.featured)

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
                <Link
                  href="/api-reference/rest"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to API Reference
                </Link>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Video Tutorials</h2>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search videos..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="all">All Videos</TabsTrigger>
                    <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                    <TabsTrigger value="core-features">Core Features</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">API Resources</h3>
                <nav className="space-y-1">
                  <Link
                    href="/api-reference/rest"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    REST API Reference
                  </Link>
                  <Link
                    href="/api-reference/quick-start"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Quick Start Guide
                  </Link>
                  <Link
                    href="/api-reference/faq"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/api-reference/integration"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Integration Guide
                  </Link>
                  <Link
                    href="/api-reference/videos"
                    className="block py-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Video Tutorials
                  </Link>
                  <Link
                    href="/api-reference/updates"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    API Updates
                  </Link>
                </nav>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Subscribe to our channel</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  Get notified when we publish new API tutorial videos.
                </p>
                <div className="mt-3">
                  <Link href="https://www.youtube.com/channel/hrconnect" target="_blank" rel="noopener noreferrer">
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">API Video Tutorials</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Learn how to use the HRConnect API with our video tutorials. These videos cover everything from getting
                started to advanced integration techniques.
              </p>
            </div>

            {/* Featured Videos */}
            {activeCategory === "all" && searchQuery === "" && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {video.category === "getting-started"
                              ? "Getting Started"
                              : video.category === "core-features"
                                ? "Core Features"
                                : video.category === "advanced"
                                  ? "Advanced"
                                  : "Integrations"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          >
                            Featured
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Link href={video.url} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button variant="outline" className="w-full">
                            Watch Video
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Videos */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {activeCategory === "all"
                  ? "All Tutorials"
                  : activeCategory === "getting-started"
                    ? "Getting Started Tutorials"
                    : activeCategory === "core-features"
                      ? "Core Features Tutorials"
                      : activeCategory === "advanced"
                        ? "Advanced Tutorials"
                        : "Integration Tutorials"}
              </h2>

              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <Badge className="mb-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          {video.category === "getting-started"
                            ? "Getting Started"
                            : video.category === "core-features"
                              ? "Core Features"
                              : video.category === "advanced"
                                ? "Advanced"
                                : "Integrations"}
                        </Badge>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Link href={video.url} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button variant="outline" className="w-full">
                            Watch Video
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No videos found</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    No videos match your search criteria. Try adjusting your search or filter.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Live Webinars</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Join our live webinars to learn more about the HRConnect API and get your questions answered by our
                    experts.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-900 dark:text-white">Advanced API Integration Techniques</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">April 25, 2024 • 11:00 AM EST</p>
                      <Button size="sm" className="mt-3">
                        Register Now
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Building Custom HR Workflows with the API
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">May 10, 2024 • 2:00 PM EST</p>
                      <Button size="sm" className="mt-3">
                        Register Now
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/webinars" className="text-blue-600 dark:text-blue-400 hover:underline">
                      View all upcoming webinars
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

