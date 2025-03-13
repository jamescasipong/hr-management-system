"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, User, Tag, ArrowRight, ChevronRight } from 'lucide-react'

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 HR Trends to Watch in 2024",
    excerpt: "Discover the top HR trends that will shape the workplace in 2024, from AI-powered recruitment to employee wellness programs.",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    authorRole: "HR Director",
    category: "trends",
    tags: ["AI", "Future of Work", "Employee Experience"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true
  },
  {
    id: 2,
    title: "How to Build an Effective Employee Onboarding Process",
    excerpt: "Learn how to create an onboarding process that helps new employees integrate quickly and become productive team members.",
    date: "March 10, 2024",
    author: "Michael Chen",
    authorRole: "Talent Acquisition Manager",
    category: "best-practices",
    tags: ["Onboarding", "Employee Retention", "HR Processes"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true
  },
  {
    id: 3,
    title: "The Impact of Remote Work on Company Culture",
    excerpt: "Explore how remote work has transformed company culture and what HR leaders can do to maintain a strong culture in hybrid environments.",
    date: "March 5, 2024",
    author: "Jessica Williams",
    authorRole: "Culture & Engagement Specialist",
    category: "remote-work",
    tags: ["Remote Work", "Company Culture", "Employee Engagement"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false
  },
  {
    id: 4,
    title: "Compliance Updates: What HR Professionals Need to Know",
    excerpt: "Stay up-to-date with the latest compliance regulations and how they affect your HR policies and procedures.",
    date: "February 28, 2024",
    author: "David Rodriguez",
    authorRole: "Legal Compliance Officer",
    category: "compliance",
    tags: ["Compliance", "Regulations", "HR Policies"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false
  },
  {
    id: 5,
    title: "Leveraging Data Analytics in HR Decision Making",
    excerpt: "Discover how data analytics can help HR professionals make better decisions about recruitment, retention, and performance management.",
    date: "February 20, 2024",
    author: "Alex Thompson",
    authorRole: "HR Analytics Lead",
    category: "analytics",
    tags: ["Data Analytics", "HR Metrics", "Decision Making"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false
  },
  {
    id: 6,
    title: "Creating a Diverse and Inclusive Workplace",
    excerpt: "Learn strategies for building a diverse and inclusive workplace that attracts top talent and drives innovation.",
    date: "February 15, 2024",
    author: "Maya Patel",
    authorRole: "Diversity & Inclusion Manager",
    category: "diversity",
    tags: ["Diversity", "Inclusion", "Workplace Culture"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    
    return matchesSearch && matchesCategory
  })
  
  const featuredPosts = blogPosts.filter(post => post.featured)
  
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
            <Link href="/documentation">
              <Button variant="ghost" size="sm">Documentation</Button>
            </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              HRConnect Blog
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Insights, best practices, and trends in HR management
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <div className="flex rounded-md shadow-sm">
                <Input
                  type="text"
                  placeholder="Search articles..."
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
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {searchQuery === "" && activeCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.image || "/placeholder.svg"} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar className="mr-1 h-4 w-4" />
                      {post.date}
                      <span className="mx-2">•</span>
                      <User className="mr-1 h-4 w-4" />
                      {post.author}
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Category Tabs */}
        <Tabs 
          defaultValue="all" 
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            <TabsTrigger value="remote-work">Remote Work</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="diversity">Diversity</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div>
                  <img 
                    src={post.image || "/placeholder.svg"} 
                    alt={post.title} 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.date}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                    <span className="mx-1">•</span>
                    {post.authorRole}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm">
                      Read <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No articles found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-center">Subscribe to Our Newsletter</CardTitle>
              <CardDescription className="text-center">
                Get the latest HR insights and tips delivered straight to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
                By subscribing, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link> and 
                to receive marketing communications from us.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
