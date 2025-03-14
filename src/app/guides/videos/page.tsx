"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Video, Play, Clock, ArrowLeft, ChevronRight, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for video tutorials
const videoTutorials = [
  {
    id: "intro-video",
    title: "Introduction to HRConnect",
    description: "Overview of the platform and its features",
    duration: "5:32",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Introduction",
    category: "getting-started",
    views: 1245,
    date: "2024-02-15",
    featured: true,
  },
  {
    id: "employee-video",
    title: "Managing Employees",
    description: "How to add and manage employee profiles",
    duration: "8:45",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Employees",
    category: "core-features",
    views: 987,
    date: "2024-02-20",
    featured: true,
  },
  {
    id: "attendance-video",
    title: "Attendance Tracking",
    description: "Setting up attendance policies and tracking",
    duration: "7:20",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Attendance",
    category: "core-features",
    views: 876,
    date: "2024-02-25",
    featured: false,
  },
  {
    id: "leave-video",
    title: "Leave Management",
    description: "Managing leave requests and approvals",
    duration: "9:15",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Leave",
    category: "core-features",
    views: 765,
    date: "2024-03-01",
    featured: false,
  },
  {
    id: "payroll-video",
    title: "Payroll Processing",
    description: "How to set up and run payroll",
    duration: "12:30",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Payroll",
    category: "advanced",
    views: 654,
    date: "2024-03-05",
    featured: false,
  },
  {
    id: "reports-video",
    title: "Generating Reports",
    description: "Creating and customizing HR reports",
    duration: "10:15",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Reports",
    category: "advanced",
    views: 543,
    date: "2024-03-10",
    featured: false,
  },
  {
    id: "api-video",
    title: "API Integration Basics",
    description: "Getting started with the HRConnect API",
    duration: "15:45",
    thumbnail: "/placeholder.svg?height=180&width=320&text=API",
    category: "developers",
    views: 432,
    date: "2024-03-15",
    featured: true,
  },
  {
    id: "webhooks-video",
    title: "Setting Up Webhooks",
    description: "How to configure and use webhooks",
    duration: "11:20",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Webhooks",
    category: "developers",
    views: 321,
    date: "2024-03-20",
    featured: false,
  },
  {
    id: "mobile-app-video",
    title: "Using the Mobile App",
    description: "Features and functionality of the mobile application",
    duration: "6:45",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Mobile",
    category: "getting-started",
    views: 210,
    date: "2024-03-25",
    featured: false,
  },
  {
    id: "security-video",
    title: "Security Best Practices",
    description: "Securing your HRConnect account and data",
    duration: "13:10",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Security",
    category: "advanced",
    views: 198,
    date: "2024-03-30",
    featured: false,
  },
]

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Filter videos based on search query and category
  const filteredVideos = videoTutorials.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || video.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Sort videos based on selected sort option
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "most-viewed":
        return b.views - a.views
      case "least-viewed":
        return a.views - b.views
      case "longest":
        return (
          Number.parseInt(b.duration.split(":")[0]) * 60 +
          Number.parseInt(b.duration.split(":")[1]) -
          (Number.parseInt(a.duration.split(":")[0]) * 60 + Number.parseInt(a.duration.split(":")[1]))
        )
      case "shortest":
        return (
          Number.parseInt(a.duration.split(":")[0]) * 60 +
          Number.parseInt(a.duration.split(":")[1]) -
          (Number.parseInt(b.duration.split(":")[0]) * 60 + Number.parseInt(b.duration.split(":")[1]))
        )
      default:
        return 0
    }
  })

  // Get featured videos
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

      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link href="/guides" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guides
              </Link>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Video Tutorials</h1>
              <p className="mt-2 text-xl text-blue-100">
                Learn how to use HRConnect with our step-by-step video guides
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/guides">
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  View All Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="least-viewed">Least Viewed</SelectItem>
                  <SelectItem value="longest">Longest First</SelectItem>
                  <SelectItem value="shortest">Shortest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="core-features">Core Features</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Featured Videos */}
        {activeCategory === "all" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Videos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/20 text-white border-white/30 hover:bg-white/40"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                      >
                        {video.category
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {video.duration}
                      </div>
                    </div>
                    <CardTitle className="mt-2">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
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
          </div>
        )}

        {/* All Videos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {activeCategory === "all"
              ? "All Videos"
              : activeCategory
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") + " Videos"}
          </h2>

          {sortedVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/20 text-white border-white/30 hover:bg-white/40"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                      >
                        {video.category
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {video.duration}
                      </div>
                    </div>
                    <CardTitle className="mt-2">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{video.views.toLocaleString()} views</p>
                  </CardContent>
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

        {/* Request Video Section */}
        <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Can't find what you're looking for?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Request a tutorial on a specific topic and our team will create it for you.
              </p>
            </div>
            <Link href="/contact-us">
              <Button>
                Request a Tutorial
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

