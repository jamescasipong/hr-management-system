"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Lock, Database, UserCheck, FileText, Globe } from "lucide-react"

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

export default function PrivacyPage() {
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
        className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 border-b-[1px] dark:border-gray-700 z-10"
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
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-2 text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2024
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} className="prose prose-blue max-w-none dark:prose-invert">
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            At HRConnect, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform. Please read this privacy policy carefully. If you
            do not agree with the terms of this privacy policy, please do not access the platform.
          </motion.p>

          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Information We Collect
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            We collect information that you provide directly to us when you register for an account, create or modify
            your profile, set preferences, sign-up for or make purchases through the platform. This information may
            include:
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Data</TabsTrigger>
                <TabsTrigger value="usage">Usage Data</TabsTrigger>
                <TabsTrigger value="cookies">Cookies</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent key={"personal"} value="personal" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="dark:border-gray-700">
                      <CardHeader>
                        <CardTitle>Personal Data</CardTitle>
                        <CardDescription>Information that identifies you as an individual</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.ul
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300"
                        >
                          {[
                            "Name, email address, and contact information",
                            "Billing information and payment details",
                            "User profile information (job title, department, etc.)",
                            "Content you provide through the platform (documents, forms, etc.)",
                            "Communications with us (support requests, emails, etc.)",
                            "Information you provide when you participate in surveys or promotions",
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              variants={fadeInUp}
                              custom={index}
                              transition={{ delay: index * 0.05 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent key={"usage"} value="usage" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="dark:border-gray-700">
                      <CardHeader>
                        <CardTitle>Usage Data</CardTitle>
                        <CardDescription>Information about how you use our platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.ul
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300"
                        >
                          {[
                            "Log data (IP address, browser type, pages visited, time spent)",
                            "Device information (hardware model, operating system, unique device identifiers)",
                            "Location information (general location based on IP address)",
                            "Usage patterns and preferences",
                            "Feature utilization and interaction data",
                            "Performance data and error reports",
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              variants={fadeInUp}
                              custom={index}
                              transition={{ delay: index * 0.05 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent key={"cookies"} value="cookies" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="dark:border-gray-700">
                      <CardHeader>
                        <CardTitle>Cookies & Similar Technologies</CardTitle>
                        <CardDescription>
                          Information collected through cookies and tracking technologies
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.p variants={fadeInUp} initial="hidden"
                          animate="visible" className="text-gray-600 dark:text-gray-300 mb-4">
                          We use cookies and similar tracking technologies to track activity on our platform and hold
                          certain information. Cookies are files with a small amount of data which may include an
                          anonymous unique identifier.
                        </motion.p>
                        <motion.p variants={fadeInUp} initial="hidden"
                          animate="visible" className="text-gray-600 dark:text-gray-300 mb-4">
                          Types of cookies we use:
                        </motion.p>
                        <motion.ul
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300"
                        >
                          {[
                            "Essential cookies: necessary for the platform to function properly",
                            "Functional cookies: remember your preferences and settings",
                            "Analytics cookies: help us understand how you use our platform",
                            "Marketing cookies: used to deliver relevant advertisements",
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              variants={fadeInUp}
                              custom={index}
                              transition={{ delay: index * 0.0001 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>
                        <motion.div
                          variants={fadeInUp}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4"
                        >
                          <Link href="/cookies">
                            <Button variant="outline">View Cookie Policy</Button>
                          </Link>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            How We Use Your Information
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
            We use the information we collect for various purposes, including:
          </motion.p>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[
              {
                icon: FileText,
                title: "Providing Services",
                description:
                  "To provide and maintain our platform, process transactions, and send related information including confirmations and invoices.",
              },
              {
                icon: UserCheck,
                title: "Account Management",
                description: "To create and manage your account, provide customer service, and verify user identity.",
              },
              {
                icon: Lock,
                title: "Security",
                description: "To detect, prevent, and address technical issues, fraud, and security incidents.",
              },
              {
                icon: Database,
                title: "Improvement",
                description:
                  "To analyze usage patterns, develop new products and services, and improve existing features.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex items-start space-x-3"
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

          {/* Additional sections would follow the same pattern */}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
        >
          <div className="flex items-start">
            <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
            </motion.div>
            <div>
              <motion.h3 variants={fadeInUp} className="text-lg font-medium text-gray-900 dark:text-white">
                Regional Privacy Rights
              </motion.h3>
              <motion.p variants={fadeInUp} className="mt-2 text-gray-600 dark:text-gray-300">
                Depending on your location, you may have specific privacy rights under regional laws such as GDPR (EU),
                CCPA (California), or LGPD (Brazil). Please visit our regional privacy pages for more information.
              </motion.p>
              <motion.div variants={staggerContainer} className="mt-4 flex flex-wrap gap-4">
                {[
                  { href: "/privacy/gdpr", label: "GDPR (EU)" },
                  { href: "/privacy/ccpa", label: "CCPA (California)" },
                  { href: "/privacy/lgpd", label: "LGPD (Brazil)" },
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

