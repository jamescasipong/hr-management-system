"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Calendar, ChevronLeft, Clock, FileText, Filter, Home, Search, Tag, ThumbsUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for updates
const updates = [
  {
    id: 1,
    title: "New Attendance Tracking System",
    description: "We've completely revamped our attendance tracking system with improved accuracy and real-time updates.",
    date: "March 10, 2025",
    category: "Feature",
    isNew: true,
    isImportant: true,
  },
  {
    id: 2,
    title: "Payroll Module Updates",
    description: "The payroll module now supports multiple currencies and automated tax calculations for international employees.",
    date: "March 5, 2025",
    category: "Enhancement",
    isNew: true,
    isImportant: false,
  },
  {
    id: 3,
    title: "Security Patch",
    description: "Critical security updates have been applied to protect your data and ensure compliance with the latest regulations.",
    date: "February 28, 2025",
    category: "Security",
    isNew: false,
    isImportant: true,
  },
  {
    id: 4,
    title: "Mobile App Launch",
    description: "Our new mobile app is now available for iOS and Android. Access HR functions on the go!",
    date: "February 20, 2025",
    category: "Release",
    isNew: false,
    isImportant: false,
  },
  {
    id: 5,
    title: "Performance Review Templates",
    description: "New customizable templates for quarterly and annual performance reviews are now available.",
    date: "February 15, 2025",
    category: "Feature",
    isNew: false,
    isImportant: false,
  },
  {
    id: 6,
    title: "UI Improvements",
    description: "We've made several UI improvements for better accessibility and user experience across the platform.",
    date: "February 10, 2025",
    category: "Enhancement",
    isNew: false,
    isImportant: false,
  },
  {
    id: 7,
    title: "Data Export Functionality",
    description: "You can now export data in multiple formats including CSV, Excel, and PDF for all reports.",
    date: "February 5, 2025",
    category: "Feature",
    isNew: false,
    isImportant: false,
  },
  {
    id: 8,
    title: "System Maintenance Notice",
    description: "Scheduled maintenance will occur on March 15, 2025 from 2:00 AM to 4:00 AM UTC. The system may be unavailable during this time.",
    date: "February 1, 2025",
    category: "Maintenance",
    isNew: false,
    isImportant: true,
  },
]

// Categories with their corresponding colors
const categories = {
  "Feature": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Enhancement": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Security": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "Release": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Maintenance": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

export default function UpdatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showImportantOnly, setShowImportantOnly] = useState(false)

  // Filter updates based on search query, category, and importance
  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          update.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? update.category === selectedCategory : true
    const matchesImportance = showImportantOnly ? update.isImportant : true
    
    return matchesSearch && matchesCategory && matchesImportance
  })

  // Get unique categories from updates
  const uniqueCategories = Array.from(new Set(updates.map(update => update.category)))

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 `}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Updates</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Stay informed about the latest features, enhancements, and important notices
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search updates..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={showImportantOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowImportantOnly(!showImportantOnly)}
                    className="flex items-center"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Important Only
                  </Button>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {selectedCategory || "All Categories"}
                    </Button>
                    {uniqueCategories.map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="mt-1 w-full justify-start"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Updates</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {filteredUpdates.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No updates match your filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUpdates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="new">
            {filteredUpdates.filter(u => u.isNew).length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No new updates match your filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUpdates.filter(u => u.isNew).map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="features">
            {filteredUpdates.filter(u => u.category === "Feature").length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No feature updates match your filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUpdates.filter(u => u.category === "Feature").map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="security">
            {filteredUpdates.filter(u => u.category === "Security").length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No security updates match your filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUpdates.filter(u => u.category === "Security").map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Subscribe to Updates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Subscribe to receive notifications about new updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Update Card Component
function UpdateCard({ update }) {
  const [liked, setLiked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Badge className={categories[update.category] || "bg-gray-100 text-gray-800"}>
                {update.category}
              </Badge>
              {update.isNew && (
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                  New
                </Badge>
              )}
              {update.isImportant && (
                <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                  Important
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {update.date}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{update.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {expanded ? update.description : update.description.length > 150 
              ? `${update.description.substring(0, 150)}...` 
              : update.description}
          </p>
          {update.description.length > 150 && (
            <Button 
              variant="link" 
              className="p-0 h-auto mt-2 text-blue-600 dark:text-blue-400"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
        <Separator />
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center ${liked ? 'text-blue-600 dark:text-blue-400' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {liked ? "Liked" : "Like"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
