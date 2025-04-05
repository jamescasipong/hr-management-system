"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Shield, Lock, Server, UserCheck, AlertTriangle, CheckCircle2, Clock, RefreshCw } from 'lucide-react'
import { Footer } from "@/app/(home)/components/footer"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
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

export default function SecurityPage() {
  const headerAnimation = useScrollAnimation(0.1)
  const introAnimation = useScrollAnimation(0.1)
  const cardsAnimation = useScrollAnimation(0.1)
  const tabsAnimation = useScrollAnimation(0.1)
  const faqAnimation = useScrollAnimation(0.1)
  const reportingAnimation = useScrollAnimation(0.1)
  const ctaAnimation = useScrollAnimation(0.1)

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
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
            <div className="flex items-center space-x-4">
              {["Documentation", "API Status", "Contact Us", "Sign In"].map((item, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <Link href={item === "Sign In" ? "/signin" : `/${item.toLowerCase().replace(" ", "-")}`}>
                      <Button variant={item === "Sign In" ? "default" : "ghost"} size="sm">
                        {item}
                      </Button>
                    </Link>
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
              ref={headerAnimation.ref}
              initial="hidden"
              animate={headerAnimation.controls}
              variants={fadeIn}
              className="mb-8"
          >
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <motion.h1
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Security Policy
            </motion.h1>
            <motion.p
                variants={fadeInUp}
                className="mt-2 text-gray-600 dark:text-gray-300"
            >
              Last updated: March 15, 2024
            </motion.p>
          </motion.div>

          <motion.div
              ref={introAnimation.ref}
              initial="hidden"
              animate={introAnimation.controls}
              variants={fadeIn}
              className="prose prose-blue max-w-none dark:prose-invert"
          >
            <motion.p
                variants={fadeInUp}
                className="text-gray-600 dark:text-gray-300"
            >
              At HRConnect, we take the security of your data seriously. This Security Policy outlines the measures we
              take to protect your information and ensure the integrity, confidentiality, and availability of our
              services.
            </motion.p>

            <motion.h2
                variants={fadeInUp}
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
            >
              Our Security Commitment
            </motion.h2>
            <motion.p
                variants={fadeInUp}
                className="text-gray-600 dark:text-gray-300"
            >
              We are committed to implementing and maintaining a comprehensive security program that protects your data
              from unauthorized access, disclosure, alteration, and destruction. Our security practices are designed to
              meet or exceed industry standards and regulatory requirements.
            </motion.p>

            <motion.div
                ref={cardsAnimation.ref}
                initial="hidden"
                animate={cardsAnimation.controls}
                variants={staggerContainer}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: Shield, title: "Data Protection", description: "We employ multiple layers of security to protect your data at rest and in transit, including encryption, access controls, and regular security assessments." },
                { icon: Lock, title: "Access Control", description: "We implement strict access controls, including role-based permissions, multi-factor authentication, and regular access reviews." },
                { icon: Server, title: "Infrastructure Security", description: "Our infrastructure is hosted in secure, SOC 2 compliant data centers with physical security measures and environmental controls." }
              ].map((item, index) => (
                  <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>

            <motion.div
                ref={tabsAnimation.ref}
                initial="hidden"
                animate={tabsAnimation.controls}
                variants={fadeIn}
                className="mt-8"
            >
              <Tabs defaultValue="data-security">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="data-security">Data Security</TabsTrigger>
                  <TabsTrigger value="access-control">Access Control</TabsTrigger>
                  <TabsTrigger value="incident-response">Incident Response</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent key={"data"} value="data-security" className="mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Data Security Measures</CardTitle>
                          <CardDescription>How we protect your data at rest and in transit</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <motion.div
                              variants={staggerContainer}
                              initial="hidden"
                              animate="visible"
                              className="space-y-4"
                          >
                            {[
                              { title: "Encryption", description: "All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.2 or higher. Database backups are also encrypted." },
                              { title: "Data Segregation", description: "Customer data is logically segregated to ensure that one customer's data cannot be accessed by another customer." },
                              { title: "Secure Development", description: "Our development process follows secure coding practices, including regular code reviews, static code analysis, and vulnerability scanning." },
                              { title: "Regular Backups", description: "We perform regular backups of all customer data and test restoration procedures to ensure data can be recovered in case of an incident." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="flex items-start space-x-3"
                                >
                                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                  <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                      {item.description}
                                    </p>
                                  </div>
                                </motion.div>
                            ))}
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent key={"access"} value="access-control" className="mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Access Control Measures</CardTitle>
                          <CardDescription>How we manage and control access to systems and data</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <motion.div
                              variants={staggerContainer}
                              initial="hidden"
                              animate="visible"
                              className="space-y-4"
                          >
                            {[
                              { title: "Multi-Factor Authentication", description: "MFA is required for all administrative access to our systems and is available for all customer accounts." },
                              { title: "Role-Based Access Control", description: "Access to customer data is restricted based on job responsibilities and follows the principle of least privilege." },
                              { title: "Regular Access Reviews", description: "We conduct regular reviews of access privileges to ensure that access rights remain appropriate as roles change." },
                              { title: "Secure Authentication", description: "We enforce strong password policies, including minimum length, complexity requirements, and regular password rotation." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="flex items-start space-x-3"
                                >
                                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                  <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                      {item.description}
                                    </p>
                                  </div>
                                </motion.div>
                            ))}
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent key={"incident"} value="incident-response" className="mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Incident Response</CardTitle>
                          <CardDescription>How we handle security incidents</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <motion.div
                              variants={staggerContainer}
                              initial="hidden"
                              animate="visible"
                              className="space-y-4"
                          >
                            {[
                              { icon: Clock, title: "Incident Detection", description: "We use automated monitoring and alerting systems to detect potential security incidents in real-time." },
                              { icon: AlertTriangle, title: "Incident Response Plan", description: "We maintain a comprehensive incident response plan that outlines the steps to be taken in the event of a security incident." },
                              { icon: UserCheck, title: "Dedicated Team", description: "Our dedicated security team is available 24/7 to respond to and mitigate security incidents." },
                              { icon: RefreshCw, title: "Regular Testing", description: "We regularly test our incident response procedures through tabletop exercises and simulations." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="flex items-start space-x-3"
                                >
                                  <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                  <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                      {item.description}
                                    </p>
                                  </div>
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

            <motion.div
                ref={faqAnimation.ref}
                initial="hidden"
                animate={faqAnimation.controls}
                variants={fadeIn}
            >
              <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
              >
                Security FAQs
              </motion.h2>

              <Accordion type="single" collapsible className="w-full">
                {[
                  { question: "How is my data protected?", answer: "Your data is protected using industry-standard encryption both at rest and in transit. We use AES-256 encryption for data at rest and TLS 1.2 or higher for data in transit. Additionally, we implement strict access controls, regular security assessments, and continuous monitoring to protect against unauthorized access." },
                  { question: "Where is my data stored?", answer: "Your data is stored in secure, SOC 2 compliant data centers located in the United States and the European Union. We can provide region-specific data storage for customers with specific compliance requirements. All data centers have physical security measures, environmental controls, and redundant systems to ensure high availability." },
                  { question: "How do you handle security incidents?", answer: "We have a comprehensive incident response plan that outlines the steps to be taken in the event of a security incident. This includes detection, containment, eradication, recovery, and post-incident analysis. We will notify affected customers promptly in accordance with our contractual obligations and applicable laws and regulations." },
                  { question: "What security certifications do you have?", answer: "We maintain several security certifications, including SOC 2 Type II and ISO 27001. We also comply with GDPR, CCPA, and other relevant data protection regulations. Our security program is regularly audited by independent third parties to ensure compliance with these standards." },
                  { question: "Can I request a security assessment?", answer: "Yes, we can provide security documentation, including our SOC 2 report, penetration test results, and security questionnaire responses, upon request. For Enterprise customers, we can also accommodate custom security assessments subject to our mutual non-disclosure agreement." }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        custom={index}
                    >
                      <AccordionItem value={`item-${index + 1}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
                ref={reportingAnimation.ref}
                initial="hidden"
                animate={reportingAnimation.controls}
                variants={fadeIn}
            >
              <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
              >
                Reporting Security Concerns
              </motion.h2>
              <motion.p
                  variants={fadeInUp}
                  className="text-gray-600 dark:text-gray-300"
              >
                We take security concerns seriously and encourage responsible disclosure of potential security issues. If
                you believe you've found a security vulnerability in our service, please report it to us at
                security@hrconnect.com or through our{" "}
                <Link href="/contact-us" className="text-blue-600 hover:underline dark:text-blue-400">
                  contact form
                </Link>
                .
              </motion.p>
              <motion.p
                  variants={fadeInUp}
                  className="text-gray-600 dark:text-gray-300"
              >
                We request that you:
              </motion.p>
              <motion.ul
                  variants={staggerContainer}
                  className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300"
              >
                {[
                  "Provide us with enough information to reproduce the issue",
                  "Give us reasonable time to address the issue before disclosing it publicly",
                  "Do not access or modify data belonging to other customers",
                  "Act in good faith and do not conduct denial of service attacks or other disruptive activities"
                ].map((item, index) => (
                    <motion.li key={index} variants={fadeInUp}>
                      {item}
                    </motion.li>
                ))}
              </motion.ul>

              <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
              >
                Updates to this Security Policy
              </motion.h2>
              <motion.p
                  variants={fadeInUp}
                  className="text-gray-600 dark:text-gray-300"
              >
                We may update this Security Policy from time to time to reflect changes in our security practices or for
                other operational, legal, or regulatory reasons. We will notify customers of any material changes to this
                policy.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
              ref={ctaAnimation.ref}
              initial="hidden"
              animate={ctaAnimation.controls}
              variants={fadeInUp}
              className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
          >
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security is a Shared Responsibility</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  While we take extensive measures to protect our platform and your data, security is a shared
                  responsibility. We encourage you to implement strong security practices within your organization, such
                  as using strong passwords, enabling multi-factor authentication, and regularly reviewing user access.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/documentation/security-best-practices">
                      <Button variant="outline">Security Best Practices</Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/contact-us">
                      <Button>Contact Security Team</Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  )
}
