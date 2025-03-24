"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Video, ChevronRight, Clock, BookOpen, Bookmark, Star, ArrowRight } from "lucide-react"
import { Footer } from "@/app/(home)/components/footer"

// Mock data for guides
const guides = [
  {
    id: "quick-start",
    title: "Quick Start Guide",
    description: "Get up and running with HRConnect in minutes",
    category: "getting-started",
    readTime: "5 min",
    updated: "2 weeks ago",
    featured: true,
    popular: true,
  },
  {
    id: "employee-management",
    title: "Employee Management",
    description: "Learn how to add, edit, and manage employee profiles",
    category: "core-features",
    readTime: "10 min",
    updated: "1 month ago",
    featured: false,
    popular: true,
  },
  {
    id: "attendance-tracking",
    title: "Attendance Tracking",
    description: "Set up and manage attendance tracking for your team",
    category: "core-features",
    readTime: "8 min",
    updated: "3 weeks ago",
    featured: true,
    popular: false,
  },
  {
    id: "leave-management",
    title: "Leave Management",
    description: "Configure leave policies and approval workflows",
    category: "core-features",
    readTime: "12 min",
    updated: "1 month ago",
    featured: false,
    popular: true,
  },
  {
    id: "payroll-setup",
    title: "Payroll Setup",
    description: "Configure payroll settings and process payments",
    category: "advanced",
    readTime: "15 min",
    updated: "2 months ago",
    featured: false,
    popular: false,
  },
  {
    id: "reporting",
    title: "Reporting & Analytics",
    description: "Generate and customize reports for your HR data",
    category: "advanced",
    readTime: "10 min",
    updated: "3 weeks ago",
    featured: false,
    popular: false,
  },
  {
    id: "api-integration",
    title: "API Integration",
    description: "Integrate HRConnect with your existing systems",
    category: "developers",
    readTime: "20 min",
    updated: "1 month ago",
    featured: true,
    popular: false,
  },
  {
    id: "webhooks",
    title: "Webhooks Setup",
    description: "Configure webhooks for real-time data updates",
    category: "developers",
    readTime: "15 min",
    updated: "2 months ago",
    featured: false,
    popular: false,
  },
]

// Mock data for video tutorials
const videoTutorials = [
  {
    id: "intro-video",
    title: "Introduction to HRConnect",
    description: "Overview of the platform and its features",
    duration: "5:32",
    thumbnail: "/placeholder.svg?height=180&width=320",
    category: "getting-started",
  },
  {
    id: "employee-video",
    title: "Managing Employees",
    description: "How to add and manage employee profiles",
    duration: "8:45",
    thumbnail: "/placeholder.svg?height=180&width=320",
    category: "core-features",
  },
  {
    id: "attendance-video",
    title: "Attendance Tracking",
    description: "Setting up attendance policies and tracking",
    duration: "7:20",
    thumbnail: "/placeholder.svg?height=180&width=320",
    category: "core-features",
  },
  {
    id: "leave-video",
    title: "Leave Management",
    description: "Managing leave requests and approvals",
    duration: "9:15",
    thumbnail: "/placeholder.svg?height=180&width=320",
    category: "core-features",
  },
]

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || guide.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const filteredVideos = videoTutorials.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || video.category === activeCategory

    return matchesSearch && matchesCategory
  })

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

      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">HRConnect Guides</h1>
          <p className="mt-4 text-xl text-blue-100">
            Step-by-step tutorials and resources to help you get the most out of HRConnect
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex rounded-md shadow-sm">
              <Input
                type="text"
                placeholder="Search guides and tutorials..."
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="all">All Guides</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="core-features">Core Features</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Featured Guides */}
        {activeCategory === "all" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Guides</h2>
              <Link href="/guides/featured">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides
                .filter((guide) => guide.featured)
                .map((guide) => (
                  <Card key={guide.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                        >
                          {guide.category
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="mr-1 h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Updated {guide.updated}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/guides/${guide.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Read Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {activeCategory === "all"
              ? "All Guides"
              : activeCategory
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") + " Guides"}
          </h2>

          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                      >
                        {guide.category
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {guide.readTime}
                      </div>
                    </div>
                    <CardTitle className="mt-2 flex items-start">
                      {guide.title}
                      {guide.popular && (
                        <Badge className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800">
                          Popular
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Updated {guide.updated}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/guides/${guide.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No guides found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Video Tutorials */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Tutorials</h2>
            <Link href="/guides/videos">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/guides/videos/${video.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Watch Video
                        <Video className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Video className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No videos found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Documentation
                </CardTitle>
                <CardDescription>Comprehensive documentation for all features</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Detailed documentation covering all aspects of the HRConnect platform, including API references and
                  integration guides.
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
                <CardTitle className="flex items-center">
                  <Bookmark className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Best Practices
                </CardTitle>
                <CardDescription>Tips and recommendations for optimal use</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn best practices for implementing HR processes, optimizing workflows, and getting the most out of
                  HRConnect.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/guides/best-practices" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Best Practices
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Case Studies
                </CardTitle>
                <CardDescription>Real-world implementation examples</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore how other companies have successfully implemented HRConnect to solve their HR challenges.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/guides/case-studies" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Case Studies
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}

