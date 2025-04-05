"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Cookie, Shield, Settings, Info } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
      delayChildren: 0.2,
    },
  },
}

export default function CookiesPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10"
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center space-x-4"
          >
            <motion.div variants={fadeInUp}>
              <Link href="/documentation">
                <Button variant="ghost" size="sm">
                  Documentation
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/api-status">
                <Button variant="ghost" size="sm">
                  API Status
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/contact-us">
                <Button variant="ghost" size="sm">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signin">
                <Button size="sm">Sign In</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <motion.div variants={fadeInUp} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ x: -5 }}
          >
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white">
            Cookie Policy
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-2 text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2024
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} className="prose prose-blue max-w-none dark:prose-invert">
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            This Cookie Policy explains how HRConnect ("we", "us", and "our") uses cookies and similar technologies to
            recognize you when you visit our website at hrconnect.com ("Website"). It explains what these technologies
            are and why we use them, as well as your rights to control our use of them.
          </motion.p>

          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            What are cookies?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            Cookies set by the website owner (in this case, HRConnect) are called "first-party cookies". Cookies set by
            parties other than the website owner are called "third-party cookies". Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </motion.p>

          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Why do we use cookies?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical
            reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary"
            cookies. Other cookies also enable us to track and target the interests of our users to enhance the
            experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and
            other purposes.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8">
            <Tabs defaultValue="types">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="types">Types of Cookies</TabsTrigger>
                <TabsTrigger value="specific">Specific Cookies Used</TabsTrigger>
                <TabsTrigger value="control">How to Control Cookies</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent key={"types"} value="types" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Types of Cookies We Use</CardTitle>
                        <CardDescription>The cookies we use fall into the following categories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          {[
                            {
                              icon: Cookie,
                              title: "Essential Cookies",
                              description:
                                "These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.",
                            },
                            {
                              icon: Settings,
                              title: "Functional Cookies",
                              description:
                                "These cookies enable the Website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, then some or all of these services may not function properly.",
                            },
                            {
                              icon: Info,
                              title: "Analytics Cookies",
                              description:
                                "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Website. They help us to know which pages are the most and least popular and see how visitors move around the Website. All information these cookies collect is aggregated and therefore anonymous.",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              variants={fadeInUp}
                              whileHover={{ y: -5, transition: { duration: 0.2 } }}
                              className="flex items-start space-x-4"
                            >
                              <motion.div
                                whileHover={{ rotate: 15 }}
                                transition={{ duration: 0.2 }}
                                className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full"
                              >
                                <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </motion.div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent key={"specific"} value="specific" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Specific Cookies We Use</CardTitle>
                        <CardDescription>Detailed information about the cookies on our Website</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Purpose</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Type</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {[
                                {
                                  name: "session_id",
                                  purpose: "Used to maintain your session",
                                  duration: "Session",
                                  type: "Essential",
                                },
                                {
                                  name: "backend_rt",
                                  purpose: "Used for authentication",
                                  duration: "30 days",
                                  type: "Essential",
                                },
                                {
                                  name: "sidebar:state",
                                  purpose: "Remembers sidebar state (expanded/collapsed)",
                                  duration: "7 days",
                                  type: "Functional",
                                },
                              ].map((cookie, index) => (
                                <motion.tr
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1, duration: 0.3 }}
                                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                >
                                  <TableCell className="font-medium">{cookie.name}</TableCell>
                                  <TableCell>{cookie.purpose}</TableCell>
                                  <TableCell>{cookie.duration}</TableCell>
                                  <TableCell>{cookie.type}</TableCell>
                                </motion.tr>
                              ))}
                            </TableBody>
                          </Table>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent key={"control"} value="control" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>How to Control Cookies</CardTitle>
                        <CardDescription>Options for controlling and managing cookies</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          {[
                            {
                              title: "Browser Settings",
                              description:
                                "Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.",
                            },
                            {
                              title: "Cookie Preference Tool",
                              description:
                                "You can manage your cookie preferences through our cookie preference tool, which allows you to selectively enable or disable non-essential cookies.",
                              hasButton: true,
                            },
                            {
                              title: "Do Not Track",
                              description:
                                'Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. These features are not yet uniform, so we are currently not set up to respond to those signals.',
                            },
                          ].map((item, index) => (
                            <motion.div key={index} variants={fadeInUp} className="space-y-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                              <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
                              {item.hasButton && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                                  <Button>Open Cookie Preferences</Button>
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Additional sections would follow the same pattern */}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
        >
          <div className="flex items-start">
            <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
            </motion.div>
            <div>
              <motion.h3 variants={fadeInUp} className="text-lg font-medium text-gray-900 dark:text-white">
                Your Privacy Matters
              </motion.h3>
              <motion.p variants={fadeInUp} className="mt-2 text-gray-600 dark:text-gray-300">
                At HRConnect, we are committed to protecting your privacy and being transparent about how we use data.
                In addition to this Cookie Policy, please review our:
              </motion.p>
              <motion.div variants={staggerContainer} className="mt-4 flex flex-col sm:flex-row gap-4">
                {[
                  { href: "/security", label: "Security Policy" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href={item.href}>
                      <Button variant="outline">{item.label}</Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

