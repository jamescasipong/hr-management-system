"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Shield, Lock, Server, UserCheck, AlertTriangle, CheckCircle2, Clock, RefreshCw } from "lucide-react"
import { Footer } from "@/app/(home)/components/footer"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/documentation">
              <Button  variant="ghost" size="sm">
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
            <Link href="/signin">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Policy</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Last updated: March 15, 2024</p>
        </div>

        <div className="prose prose-blue max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            At HRConnect, we take the security of your data seriously. This Security Policy outlines the measures we
            take to protect your information and ensure the integrity, confidentiality, and availability of our
            services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Security Commitment</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We are committed to implementing and maintaining a comprehensive security program that protects your data
            from unauthorized access, disclosure, alteration, and destruction. Our security practices are designed to
            meet or exceed industry standards and regulatory requirements.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <CardTitle className="text-lg">Data Protection</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We employ multiple layers of security to protect your data at rest and in transit, including
                  encryption, access controls, and regular security assessments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <CardTitle className="text-lg">Access Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We implement strict access controls, including role-based permissions, multi-factor authentication,
                  and regular access reviews.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <CardTitle className="text-lg">Infrastructure Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Our infrastructure is hosted in secure, SOC 2 compliant data centers with physical security measures
                  and environmental controls.
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="data-security" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="data-security">Data Security</TabsTrigger>
              <TabsTrigger value="access-control">Access Control</TabsTrigger>
              {/* <TabsTrigger value="compliance">Compliance</TabsTrigger> */}
              <TabsTrigger value="incident-response">Incident Response</TabsTrigger>
            </TabsList>

            <TabsContent value="data-security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Security Measures</CardTitle>
                  <CardDescription>How we protect your data at rest and in transit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Encryption</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.2 or higher.
                          Database backups are also encrypted.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Data Segregation</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Customer data is logically segregated to ensure that one customer's data cannot be accessed by
                          another customer.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Secure Development</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Our development process follows secure coding practices, including regular code reviews,
                          static code analysis, and vulnerability scanning.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Regular Backups</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We perform regular backups of all customer data and test restoration procedures to ensure data
                          can be recovered in case of an incident.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access-control" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Access Control Measures</CardTitle>
                  <CardDescription>How we manage and control access to systems and data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Multi-Factor Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          MFA is required for all administrative access to our systems and is available for all customer
                          accounts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Role-Based Access Control</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Access to customer data is restricted based on job responsibilities and follows the principle
                          of least privilege.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Regular Access Reviews</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We conduct regular reviews of access privileges to ensure that access rights remain
                          appropriate as roles change.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Secure Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We enforce strong password policies, including minimum length, complexity requirements, and
                          regular password rotation.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value="compliance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance & Certifications</CardTitle>
                  <CardDescription>Our compliance with industry standards and regulations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">SOC 2 Type II</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We maintain SOC 2 Type II compliance, which verifies our controls related to security,
                          availability, processing integrity, confidentiality, and privacy.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">GDPR Compliance</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Our platform is designed to help customers meet their GDPR obligations, with features for data
                          subject rights, consent management, and data protection.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">ISO 27001</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We are ISO 27001 certified, demonstrating our commitment to information security management
                          best practices.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Regular Audits</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We conduct regular internal and external security audits and penetration tests to identify and
                          address potential vulnerabilities.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="incident-response" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Response</CardTitle>
                  <CardDescription>How we handle security incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Incident Detection</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We use automated monitoring and alerting systems to detect potential security incidents in
                          real-time.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Incident Response Plan</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We maintain a comprehensive incident response plan that outlines the steps to be taken in the
                          event of a security incident.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Dedicated Team</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Our dedicated security team is available 24/7 to respond to and mitigate security incidents.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Regular Testing</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We regularly test our incident response procedures through tabletop exercises and simulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Security FAQs</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is my data protected?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data is protected using industry-standard encryption both at rest and in transit. We use AES-256
                  encryption for data at rest and TLS 1.2 or higher for data in transit. Additionally, we implement
                  strict access controls, regular security assessments, and continuous monitoring to protect against
                  unauthorized access.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Where is my data stored?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data is stored in secure, SOC 2 compliant data centers located in the United States and the
                  European Union. We can provide region-specific data storage for customers with specific compliance
                  requirements. All data centers have physical security measures, environmental controls, and redundant
                  systems to ensure high availability.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do you handle security incidents?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We have a comprehensive incident response plan that outlines the steps to be taken in the event of a
                  security incident. This includes detection, containment, eradication, recovery, and post-incident
                  analysis. We will notify affected customers promptly in accordance with our contractual obligations
                  and applicable laws and regulations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What security certifications do you have?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We maintain several security certifications, including SOC 2 Type II and ISO 27001. We also comply
                  with GDPR, CCPA, and other relevant data protection regulations. Our security program is regularly
                  audited by independent third parties to ensure compliance with these standards.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I request a security assessment?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we can provide security documentation, including our SOC 2 report, penetration test results, and
                  security questionnaire responses, upon request. For Enterprise customers, we can also accommodate
                  custom security assessments subject to our mutual non-disclosure agreement.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reporting Security Concerns</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We take security concerns seriously and encourage responsible disclosure of potential security issues. If
            you believe you've found a security vulnerability in our service, please report it to us at
            security@hrconnect.com or through our{" "}
            <Link href="/contact-us" className="text-blue-600 hover:underline dark:text-blue-400">
              contact form
            </Link>
            .
          </p>
          <p className="text-gray-600 dark:text-gray-300">We request that you:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Provide us with enough information to reproduce the issue</li>
            <li>Give us reasonable time to address the issue before disclosing it publicly</li>
            <li>Do not access or modify data belonging to other customers</li>
            <li>Act in good faith and do not conduct denial of service attacks or other disruptive activities</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Updates to this Security Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may update this Security Policy from time to time to reflect changes in our security practices or for
            other operational, legal, or regulatory reasons. We will notify customers of any material changes to this
            policy.
          </p>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
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
                <Link href="/documentation/security-best-practices">
                  <Button variant="outline">Security Best Practices</Button>
                </Link>
                <Link href="/contact-us">
                  <Button>Contact Security Team</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

