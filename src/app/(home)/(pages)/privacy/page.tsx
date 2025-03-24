"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Lock, Database, UserCheck, FileText, Globe } from 'lucide-react'
import { Footer } from "@/app/(home)/components/footer"

export default function PrivacyPage() {
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2024
          </p>
        </div>
        
        <div className="prose prose-blue max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            At HRConnect, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Information We Collect</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through the platform. This information may include:
          </p>
          
          <Tabs defaultValue="personal" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Data</TabsTrigger>
              <TabsTrigger value="usage">Usage Data</TabsTrigger>
              <TabsTrigger value="cookies">Cookies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-4">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Personal Data</CardTitle>
                  <CardDescription>Information that identifies you as an individual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Name, email address, and contact information</li>
                    <li>Billing information and payment details</li>
                    <li>User profile information (job title, department, etc.)</li>
                    <li>Content you provide through the platform (documents, forms, etc.)</li>
                    <li>Communications with us (support requests, emails, etc.)</li>
                    <li>Information you provide when you participate in surveys or promotions</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-4">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Usage Data</CardTitle>
                  <CardDescription>Information about how you use our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Log data (IP address, browser type, pages visited, time spent)</li>
                    <li>Device information (hardware model, operating system, unique device identifiers)</li>
                    <li>Location information (general location based on IP address)</li>
                    <li>Usage patterns and preferences</li>
                    <li>Feature utilization and interaction data</li>
                    <li>Performance data and error reports</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cookies" className="mt-4">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Cookies & Similar Technologies</CardTitle>
                  <CardDescription>Information collected through cookies and tracking technologies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Types of cookies we use:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Essential cookies: necessary for the platform to function properly</li>
                    <li>Functional cookies: remember your preferences and settings</li>
                    <li>Analytics cookies: help us understand how you use our platform</li>
                    <li>Marketing cookies: used to deliver relevant advertisements</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/cookies">
                      <Button variant="outline">View Cookie Policy</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How We Use Your Information</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We use the information we collect for various purposes, including:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Providing Services</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To provide and maintain our platform, process transactions, and send related information including confirmations and invoices.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Account Management</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To create and manage your account, provide customer service, and verify user identity.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To detect, prevent, and address technical issues, fraud, and security incidents.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Improvement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To analyze usage patterns, develop new products and services, and improve existing features.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Sharing Your Information</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We may share your information with:
          </p>
          
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <span className="font-medium">Service Providers:</span> Third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
            </li>
            <li>
              <span className="font-medium">Business Partners:</span> With your consent, we may share your information with our business partners to offer you certain products, services, or promotions.
            </li>
            <li>
              <span className="font-medium">Legal Requirements:</span> If required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
            </li>
            <li>
              <span className="font-medium">Business Transfers:</span> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </li>
            <li>
              <span className="font-medium">With Your Consent:</span> We may share your information for other purposes with your consent.
            </li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Data Retention</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Data Security</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information, including:
          </p>
          
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>All sensitive information is encrypted using secure socket layer technology (SSL)</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and authentication requirements</li>
            <li>Regular security training for our employees</li>
            <li>Monitoring for suspicious activities</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Your Data Protection Rights</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          
          <div className="mt-6 space-y-4">
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Right to Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to request copies of your personal information.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Right to Rectification</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Right to Erasure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to request that we erase your personal information, under certain conditions.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Right to Restrict Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to request that we restrict the processing of your personal information, under certain conditions.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Right to Data Portability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mt-6">
            If you would like to exercise any of these rights, please contact us at privacy@hrconnect.com.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">International Data Transfers</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Your information, including personal information, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including personal information, to the United States and process it there.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Children's Privacy</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Our platform is not intended for use by children under the age of 18 ("Child" or "Children"). We do not knowingly collect personally identifiable information from Children under 18. If you become aware that a Child has provided us with personal information, please contact us. If we become aware that we have collected personal information from Children without verification of parental consent, we take steps to remove that information from our servers.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Changes to This Privacy Policy</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>By email: privacy@hrconnect.com</li>
            <li>By visiting our contact page: <Link href="/contact-us" className="text-blue-600 hover:underline dark:text-blue-400">www.hrconnect.com/contact-us</Link></li>
            <li>By mail: HRConnect, Inc., 123 Tech Park Avenue, Suite 456, San Francisco, CA 94107, United States</li>
          </ul>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-start">
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Regional Privacy Rights</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Depending on your location, you may have specific privacy rights under regional laws such as GDPR (EU), CCPA (California), or LGPD (Brazil). Please visit our regional privacy pages for more information.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/privacy/gdpr">
                  <Button variant="outline">GDPR (EU)</Button>
                </Link>
                <Link href="/privacy/ccpa">
                  <Button variant="outline">CCPA (California)</Button>
                </Link>
                <Link href="/privacy/lgpd">
                  <Button variant="outline">LGPD (Brazil)</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
