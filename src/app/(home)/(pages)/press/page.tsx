"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, ArrowLeft, Download, ExternalLink, Newspaper, FileText, MessageSquare } from "lucide-react"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

// Custom hook for scroll animations
function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return { ref, controls, isInView }
}

// Mock press releases data
const pressReleases = [
  {
    id: 1,
    title: "HRConnect Raises $30M in Series B Funding to Accelerate Growth",
    excerpt:
        "Funding will support product development and international expansion as demand for HR management solutions continues to grow.",
    date: "March 10, 2024",
    category: "funding",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "HRConnect Launches AI-Powered Performance Management Module",
    excerpt:
        "New module uses artificial intelligence to provide personalized feedback and development recommendations for employees.",
    date: "February 15, 2024",
    category: "product",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 3,
    title: "HRConnect Named 'HR Tech Innovator of the Year' at Industry Awards",
    excerpt: "Company recognized for its innovative approach to HR management and exceptional user experience.",
    date: "January 20, 2024",
    category: "awards",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "HRConnect Expands European Presence with New Office in Berlin",
    excerpt:
        "New office will serve growing customer base in Europe and support company's international expansion strategy.",
    date: "December 5, 2023",
    category: "company",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "HRConnect Partners with Leading Payroll Provider to Enhance Integration Capabilities",
    excerpt:
        "Strategic partnership will provide customers with seamless payroll processing and enhanced reporting capabilities.",
    date: "November 12, 2023",
    category: "partnership",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 6,
    title: "HRConnect Achieves SOC 2 Type II Certification",
    excerpt: "Certification demonstrates company's commitment to data security and privacy for customers.",
    date: "October 8, 2023",
    category: "security",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
]

// Mock media coverage data
const mediaCoverage = [
  {
    id: 1,
    title: "How HRConnect is Transforming HR Management",
    publication: "TechCrunch",
    date: "March 5, 2024",
    excerpt:
        "An in-depth look at how HRConnect is using technology to streamline HR processes and improve employee experiences.",
    link: "#",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 2,
    title: "The Future of Work: Interview with HRConnect CEO",
    publication: "Forbes",
    date: "February 20, 2024",
    excerpt:
        "HRConnect CEO discusses the company's vision for the future of work and how technology is reshaping HR management.",
    link: "#",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 3,
    title: "HRConnect Named to Fast Company's Most Innovative Companies List",
    publication: "Fast Company",
    date: "February 10, 2024",
    excerpt:
        "HRConnect recognized for its innovative approach to HR management and rapid growth in the HR tech sector.",
    link: "#",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 4,
    title: "HR Tech Roundup: HRConnect Leads the Pack with New AI Features",
    publication: "HR Dive",
    date: "January 15, 2024",
    excerpt:
        "A review of the latest HR technology innovations, with HRConnect's AI-powered features highlighted as industry-leading.",
    link: "#",
    logo: "/placeholder.svg?height=40&width=120",
  },
]

export default function PressPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("press-releases")

  // Animation references
  const headerAnimation = useScrollAnimation(0.1)
  const heroAnimation = useScrollAnimation(0.1)
  const featuredAnimation = useScrollAnimation(0.2)
  const releasesAnimation = useScrollAnimation(0.1)
  const mediaAnimation = useScrollAnimation(0.1)
  const mediaKitAnimation = useScrollAnimation(0.1)

  const filteredReleases = pressReleases.filter((release) => {
    const matchesSearch =
        release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || release.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const featuredReleases = pressReleases.filter((release) => release.featured)

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 shadow-sm sticky top-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                  HR
                </motion.span>
                <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  Connect
                </motion.span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {["Documentation", "Contact Us"].map((item, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`}>
                      <Button variant="ghost" size="sm">
                        {item}
                      </Button>
                    </Link>
                  </motion.div>
              ))}
              <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link href="/login">
                  <Button size="sm">Sign In</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.div
            ref={heroAnimation.ref}
            initial="hidden"
            animate={heroAnimation.controls}
            variants={fadeIn}
            className="bg-blue-600 dark:bg-blue-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div variants={fadeInUp} className="text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Press & Media</h1>
              <p className="mt-4 text-xl text-blue-100">
                Latest news, press releases, and media coverage about HRConnect
              </p>
              <motion.div variants={fadeInUp} className="mt-8 max-w-xl mx-auto">
                <div className="flex rounded-md shadow-sm">
                  <Input
                      type="text"
                      placeholder="Search press releases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-l-md border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-full"
                  />
                  <Button className="rounded-l-none">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
          >
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </motion.div>

          <Tabs defaultValue="press-releases" value={activeTab} onValueChange={setActiveTab}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
                <TabsTrigger value="media-coverage">Media Coverage</TabsTrigger>
                <TabsTrigger value="media-kit">Media Kit</TabsTrigger>
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
              >
                <TabsContent value="press-releases">
                  {/* Featured Press Releases */}
                  {searchQuery === "" && activeCategory === "all" && (
                      <motion.div
                          ref={featuredAnimation.ref}
                          initial="hidden"
                          animate={featuredAnimation.controls}
                          variants={fadeIn}
                          className="mb-12"
                      >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Press Releases</h2>
                        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {featuredReleases.map((release, index) => (
                              <motion.div
                                  key={release.id}
                                  variants={scaleIn}
                                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                              >
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                  <div className="relative">
                                    <img
                                        src={release.image || "/placeholder.svg"}
                                        alt={release.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                      <Badge className="bg-blue-600 hover:bg-blue-700">Featured</Badge>
                                    </div>
                                  </div>
                                  <CardHeader>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                      <Calendar className="mr-1 h-4 w-4" />
                                      {release.date}
                                    </div>
                                    <CardTitle className="text-xl">{release.title}</CardTitle>
                                    <CardDescription>{release.excerpt}</CardDescription>
                                  </CardHeader>
                                  <CardFooter className="flex justify-between items-center">
                                    <Badge variant="outline" className="capitalize">
                                      {release.category}
                                    </Badge>
                                    <Link href={`/press/${release.id}`}>
                                      <Button variant="outline" size="sm">
                                        Read Full Release
                                      </Button>
                                    </Link>
                                  </CardFooter>
                                </Card>
                              </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                  )}

                  {/* Category Tabs */}
                  <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-8"
                  >
                    <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
                      <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="funding">Funding</TabsTrigger>
                        <TabsTrigger value="product">Product</TabsTrigger>
                        <TabsTrigger value="awards">Awards</TabsTrigger>
                        <TabsTrigger value="company">Company</TabsTrigger>
                        <TabsTrigger value="partnership">Partnerships</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </motion.div>

                  {/* Press Releases */}
                  <motion.div
                      ref={releasesAnimation.ref}
                      initial="hidden"
                      animate={releasesAnimation.controls}
                      variants={staggerContainer}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredReleases.length > 0 ? (
                        filteredReleases.map((release) => (
                            <motion.div
                                key={release.id}
                                variants={scaleIn}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                                <div>
                                  <img
                                      src={release.image || "/placeholder.svg"}
                                      alt={release.title}
                                      className="w-full h-40 object-cover"
                                  />
                                </div>
                                <CardHeader className="pb-2">
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {release.date}
                                  </div>
                                  <CardTitle className="text-lg line-clamp-2">{release.title}</CardTitle>
                                  <CardDescription className="line-clamp-3">{release.excerpt}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between items-center">
                                  <Badge variant="outline" className="capitalize">
                                    {release.category}
                                  </Badge>
                                  <Link href={`/press/${release.id}`}>
                                    <Button variant="ghost" size="sm">
                                      Read More
                                    </Button>
                                  </Link>
                                </CardFooter>
                              </Card>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            variants={fadeIn}
                            className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <Search className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                            No press releases found
                          </h3>
                          <p className="mt-1 text-gray-500 dark:text-gray-400">
                            Try adjusting your search or filter to find what you're looking for.
                          </p>
                        </motion.div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="media-coverage">
                  <motion.div
                      ref={mediaAnimation.ref}
                      initial="hidden"
                      animate={mediaAnimation.controls}
                      variants={fadeIn}
                      className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Media Coverage</h2>
                    <motion.div variants={staggerContainer} className="space-y-6">
                      {mediaCoverage.map((article, index) => (
                          <motion.div
                              key={article.id}
                              variants={fadeInUp}
                              whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          >
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                  <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full md:w-32 h-20">
                                    <img
                                        src={article.logo || "/placeholder.svg"}
                                        alt={article.publication}
                                        className="max-h-full max-w-full"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {article.publication}
                                  </span>
                                      <span className="mx-2">•</span>
                                      <Calendar className="mr-1 h-4 w-4" />
                                      {article.date}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                      {article.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                      <Link href={article.link} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="sm">
                                          Read Article <ExternalLink className="ml-1 h-4 w-4" />
                                        </Button>
                                      </Link>
                                    </motion.div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="mt-12">
                    <Card className="mt-12">
                      <CardHeader>
                        <CardTitle>Media Inquiries</CardTitle>
                        <CardDescription>For press and media inquiries, please contact our PR team</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Press Contact</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              For media inquiries, interview requests, and press information:
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 mt-1">press@hrconnect.com</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Newspaper className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Press Kit</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              Download our press kit for logos, executive bios, product images, and more.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-2 inline-block"
                            >
                              <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download Press Kit
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="media-kit">
                  <motion.div
                      ref={mediaKitAnimation.ref}
                      initial="hidden"
                      animate={mediaKitAnimation.controls}
                      variants={fadeIn}
                      className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Media Kit</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Download our media assets for use in articles, blog posts, and other publications. All assets are
                      available in high resolution and various formats.
                    </p>

                    <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        {
                          title: "Company Logos",
                          description: "HRConnect logo in various formats and colors",
                          content: (
                              <>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
                                    <img
                                        src="/placeholder.svg?height=80&width=200&text=Logo"
                                        alt="HRConnect Logo (Light)"
                                        className="max-h-full"
                                    />
                                  </div>
                                  <div className="bg-gray-900 p-4 rounded-lg border flex items-center justify-center h-32">
                                    <img
                                        src="/placeholder.svg?height=80&width=200&text=Logo"
                                        alt="HRConnect Logo (Dark)"
                                        className="max-h-full"
                                    />
                                  </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Logos (ZIP)
                                </Button>
                              </>
                          ),
                        },
                        {
                          title: "Executive Photos",
                          description: "High-resolution photos of our leadership team",
                          content: (
                              <>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=120&width=120"
                                        alt="CEO"
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=120&width=120"
                                        alt="CTO"
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=120&width=120"
                                        alt="COO"
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Photos (ZIP)
                                </Button>
                              </>
                          ),
                        },
                        {
                          title: "Product Screenshots",
                          description: "High-quality screenshots of the HRConnect platform",
                          content: (
                              <>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=100&width=180"
                                        alt="Dashboard Screenshot"
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=100&width=180"
                                        alt="Employee Profile Screenshot"
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Screenshots (ZIP)
                                </Button>
                              </>
                          ),
                        },
                        {
                          title: "Company Information",
                          description: "Fact sheets, executive bios, and company overview",
                          content: (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                                    <span>Company Fact Sheet</span>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                                    <span>Executive Bios</span>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                                    <span>Brand Guidelines</span>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                          ),
                        },
                      ].map((item, index) => (
                          <motion.div key={index} variants={scaleIn} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <Card>
                              <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                              </CardHeader>
                              <CardContent>{item.content}</CardContent>
                            </Card>
                          </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="mt-12">
                    <Card className="mt-12">
                      <CardHeader>
                        <CardTitle>Usage Guidelines</CardTitle>
                        <CardDescription>Please follow these guidelines when using our media assets</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">Logo Usage</h3>
                          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                            <li>Do not alter, distort, or modify the logo in any way</li>
                            <li>Maintain proper spacing around the logo</li>
                            <li>Do not use the logo on backgrounds that reduce legibility</li>
                            <li>Do not use the logo to imply endorsement of products or services</li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">Photo Usage</h3>
                          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                            <li>Photos must be credited as "Courtesy of HRConnect"</li>
                            <li>Do not crop or edit photos in a way that alters their meaning</li>
                            <li>Executive photos should only be used in content directly related to HRConnect</li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">Trademark Notice</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            HRConnect and the HRConnect logo are trademarks of HRConnect, Inc. All rights reserved.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
  )
}

