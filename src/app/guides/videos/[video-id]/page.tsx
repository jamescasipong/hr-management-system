"use client"

import { useState, useEffect } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  ThumbsUp,
  MessageSquare,
  Share2,
  Download,
  Bookmark,
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  FileText,
} from "lucide-react"

// Mock data for video tutorials
const videoTutorials = [
  {
    id: "intro-video",
    title: "Introduction to HRConnect",
    description: "Overview of the platform and its features",
    longDescription:
      "Get a comprehensive overview of the HRConnect platform and learn about all the key features that can help streamline your HR processes. This video covers the dashboard, employee management, attendance tracking, leave management, payroll processing, and reporting features.",
    duration: "5:32",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Introduction",
    videoUrl: "#", // In a real app, this would be the actual video URL
    category: "getting-started",
    views: 1245,
    date: "2024-02-15",
    featured: true,
    instructor: {
      name: "Sarah Johnson",
      role: "Product Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["overview", "basics", "dashboard", "navigation"],
    transcript:
      "Welcome to HRConnect! In this video, we'll give you a comprehensive overview of our platform and show you how to navigate through the different features. HRConnect is designed to streamline your HR processes and make managing your workforce easier than ever before. Let's start by looking at the dashboard...",
  },
  {
    id: "employee-video",
    title: "Managing Employees",
    description: "How to add and manage employee profiles",
    longDescription:
      "Learn how to add, edit, and manage employee profiles in HRConnect. This video covers creating new employee records, updating employee information, managing departments and roles, and handling employee onboarding and offboarding processes.",
    duration: "8:45",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Employees",
    videoUrl: "#",
    category: "core-features",
    views: 987,
    date: "2024-02-20",
    featured: true,
    instructor: {
      name: "Michael Chen",
      role: "HR Solutions Expert",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["employees", "profiles", "onboarding", "departments"],
    transcript:
      "In this tutorial, we'll cover everything you need to know about managing employee profiles in HRConnect. We'll start by showing you how to add a new employee to the system...",
  },
  {
    id: "attendance-video",
    title: "Attendance Tracking",
    description: "Setting up attendance policies and tracking",
    longDescription:
      "Discover how to set up and manage attendance tracking in HRConnect. This video shows you how to configure attendance policies, track employee attendance, manage time-off requests, and generate attendance reports.",
    duration: "7:20",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Attendance",
    videoUrl: "#",
    category: "core-features",
    views: 876,
    date: "2024-02-25",
    featured: false,
    instructor: {
      name: "Jessica Williams",
      role: "Implementation Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["attendance", "time tracking", "policies", "reports"],
    transcript:
      "Today we're going to look at attendance tracking in HRConnect. We'll cover how to set up your attendance policies, track employee check-ins and check-outs, and generate reports...",
  },
  {
    id: "leave-video",
    title: "Leave Management",
    description: "Managing leave requests and approvals",
    longDescription:
      "Learn how to effectively manage employee leave in HRConnect. This video covers setting up leave types, configuring leave policies, handling leave requests and approvals, and tracking leave balances.",
    duration: "9:15",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Leave",
    videoUrl: "#",
    category: "core-features",
    views: 765,
    date: "2024-03-01",
    featured: false,
    instructor: {
      name: "David Rodriguez",
      role: "Customer Success Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["leave", "time off", "approvals", "policies"],
    transcript:
      "In this video, we'll walk through the leave management features in HRConnect. You'll learn how to set up different leave types, configure approval workflows, and track leave balances...",
  },
  {
    id: "payroll-video",
    title: "Payroll Processing",
    description: "How to set up and run payroll",
    longDescription:
      "Master the payroll processing features in HRConnect. This video guides you through setting up payroll configurations, processing payments, managing deductions and benefits, and generating payroll reports and tax documents.",
    duration: "12:30",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Payroll",
    videoUrl: "#",
    category: "advanced",
    views: 654,
    date: "2024-03-05",
    featured: false,
    instructor: {
      name: "Amanda Lee",
      role: "Financial Systems Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["payroll", "compensation", "taxes", "payments"],
    transcript:
      "Today we're going to cover payroll processing in HRConnect. We'll show you how to configure your payroll settings, process payments, manage deductions, and generate reports...",
  },
]

// Mock data for comments
const initialComments = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "This video was really helpful! I was struggling with setting up the attendance tracking, but now I understand how it works.",
    date: "2024-03-15",
    likes: 5,
  },
  {
    id: 2,
    user: {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Great explanation of the features. Could you make a follow-up video that goes into more detail about the reporting capabilities?",
    date: "2024-03-14",
    likes: 3,
  },
  {
    id: 3,
    user: {
      name: "Robert Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm having trouble with the integration part mentioned at 3:45. Is there a specific guide for connecting with our existing systems?",
    date: "2024-03-12",
    likes: 2,
  },
]

export default function VideoPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = params["video-id"] as string

  const [video, setVideo] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [relatedVideos, setRelatedVideos] = useState<any[]>([])

  // Find the video based on the ID
  useEffect(() => {
    const foundVideo = videoTutorials.find((v) => v.id === videoId)
    if (foundVideo) {
      setVideo(foundVideo)

      // Get related videos (same category, excluding current video)
      const related = videoTutorials
        .filter((v) => v.category === foundVideo.category && v.id !== foundVideo.id)
        .slice(0, 3)
      setRelatedVideos(related)

      // Parse duration string to seconds for progress bar
      const [minutes, seconds] = foundVideo.duration.split(":").map(Number)
      setDuration(minutes * 60 + seconds)
    } else {
      // Video not found, redirect to videos page
      router.push("/guides/videos")
    }
  }, [videoId, router])

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Format time (seconds) to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: newComment,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
      }
      setComments([newCommentObj, ...comments])
      setNewComment("")
    }
  }

  // Handle like comment
  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading video...</p>
        </div>
      </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/guides/videos" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {/* Video Placeholder - In a real app, this would be a video player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col">
                  {/* Video Controls - Top */}
                  <div className="flex-1"></div>

                  {/* Video Controls - Center */}
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white/20 text-white border-white/30 hover:bg-white/40 w-16 h-16"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                  </div>

                  {/* Video Controls - Bottom */}
                  <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-1 bg-gray-600 rounded-full flex-1 overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {video.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                          <SkipBack className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                          <SkipForward className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{video.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {video.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(video.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {video.duration}
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                >
                  {video.category
                    .split("-")
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
              </div>
            </div>

            {/* Video Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="flex items-center">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={video.instructor.avatar} alt={video.instructor.name} />
                <AvatarFallback>
                  {video.instructor.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{video.instructor.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{video.instructor.role}</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{video.longDescription}</p>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="transcript" className="mt-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{video.transcript}</p>
                </div>
              </TabsContent>
              <TabsContent value="comments" className="mt-4 space-y-6">
                {/* Comment Form */}
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="resize-none"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleCommentSubmit}>Post Comment</Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>
                          {comment.user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">{comment.user.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            onClick={() => handleLikeComment(comment.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Videos */}
            <Card>
              <CardHeader>
                <CardTitle>Related Videos</CardTitle>
                <CardDescription>More videos in this category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedVideos.length > 0 ? (
                  relatedVideos.map((relatedVideo) => (
                    <Link href={`/guides/videos/${relatedVideo.id}`} key={relatedVideo.id}>
                      <div className="flex space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0">
                          <img
                            src={relatedVideo.thumbnail || "/placeholder.svg"}
                            alt={relatedVideo.title}
                            className="w-24 h-16 object-cover rounded-md"
                          />
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                            {relatedVideo.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {relatedVideo.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                            {relatedVideo.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {relatedVideo.views.toLocaleString()} views
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No related videos found</p>
                )}
                <div className="pt-2">
                  <Link href="/guides/videos">
                    <Button variant="outline" className="w-full">
                      View All Videos
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Helpful materials related to this topic</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/documentation"
                  className="flex items-center text-blue-600 hover:underline dark:text-blue-400"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation:{" "}
                  {video.category
                    .split("-")
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Link>
                <Link
                  href="/guides/quick-start"
                  className="flex items-center text-blue-600 hover:underline dark:text-blue-400"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Quick Start Guide
                </Link>
                <Link href="/guides" className="flex items-center text-blue-600 hover:underline dark:text-blue-400">
                  <FileText className="h-4 w-4 mr-2" />
                  Related Guides
                </Link>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>We're here to assist you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If you have any questions about the topics covered in this video, our support team is ready to help.
                </p>
                <Link href="/contact-us">
                  <Button className="w-full">Contact Support</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

