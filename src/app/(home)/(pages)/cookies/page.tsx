"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Cookie, Shield, Settings, Info } from "lucide-react"
import { Footer } from "@/app/(home)/components/footer"

export default function CookiesPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Last updated: March 15, 2024</p>
        </div>

        <div className="prose prose-blue max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            This Cookie Policy explains how HRConnect ("we", "us", and "our") uses cookies and similar technologies to
            recognize you when you visit our website at hrconnect.com ("Website"). It explains what these technologies
            are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What are cookies?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Cookies set by the website owner (in this case, HRConnect) are called "first-party cookies". Cookies set by
            parties other than the website owner are called "third-party cookies". Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why do we use cookies?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical
            reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary"
            cookies. Other cookies also enable us to track and target the interests of our users to enhance the
            experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and
            other purposes.
          </p>

          <Tabs defaultValue="types" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="types">Types of Cookies</TabsTrigger>
              <TabsTrigger value="specific">Specific Cookies Used</TabsTrigger>
              <TabsTrigger value="control">How to Control Cookies</TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                  <CardDescription>The cookies we use fall into the following categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Cookie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Essential Cookies</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          These cookies are strictly necessary to provide you with services available through our
                          Website and to use some of its features, such as access to secure areas. Because these cookies
                          are strictly necessary to deliver the Website, you cannot refuse them without impacting how
                          our Website functions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Functional Cookies</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          These cookies enable the Website to provide enhanced functionality and personalization. They
                          may be set by us or by third-party providers whose services we have added to our pages. If you
                          do not allow these cookies, then some or all of these services may not function properly.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Analytics Cookies</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          These cookies allow us to count visits and traffic sources so we can measure and improve the
                          performance of our Website. They help us to know which pages are the most and least popular
                          and see how visitors move around the Website. All information these cookies collect is
                          aggregated and therefore anonymous.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specific" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Specific Cookies We Use</CardTitle>
                  <CardDescription>Detailed information about the cookies on our Website</CardDescription>
                </CardHeader>
                <CardContent>
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
                      <TableRow>
                        <TableCell className="font-medium">session_id</TableCell>
                        <TableCell>Used to maintain your session</TableCell>
                        <TableCell>Session</TableCell>
                        <TableCell>Essential</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">auth_token</TableCell>
                        <TableCell>Used for authentication</TableCell>
                        <TableCell>30 days</TableCell>
                        <TableCell>Essential</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">theme_preference</TableCell>
                        <TableCell>Stores your theme preference (light/dark)</TableCell>
                        <TableCell>1 year</TableCell>
                        <TableCell>Functional</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">sidebar:state</TableCell>
                        <TableCell>Remembers sidebar state (expanded/collapsed)</TableCell>
                        <TableCell>7 days</TableCell>
                        <TableCell>Functional</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">_ga</TableCell>
                        <TableCell>Google Analytics</TableCell>
                        <TableCell>2 years</TableCell>
                        <TableCell>Analytics</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">_gid</TableCell>
                        <TableCell>Google Analytics</TableCell>
                        <TableCell>24 hours</TableCell>
                        <TableCell>Analytics</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="control" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>How to Control Cookies</CardTitle>
                  <CardDescription>Options for controlling and managing cookies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Browser Settings</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Most web browsers allow you to control cookies through their settings preferences. However, if
                        you limit the ability of websites to set cookies, you may worsen your overall user experience,
                        since it will no longer be personalized to you. It may also stop you from saving customized
                        settings like login information.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Cookie Preference Tool</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        You can manage your cookie preferences through our cookie preference tool, which allows you to
                        selectively enable or disable non-essential cookies.
                      </p>
                      <Button className="mt-4">Open Cookie Preferences</Button>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Do Not Track</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to
                        have your online activities tracked. These features are not yet uniform, so we are currently not
                        set up to respond to those signals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Updates to this Cookie Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies
            we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy
            regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about our use of cookies or other technologies, please email us at
            privacy@hrconnect.com or use the contact form on our website.
          </p>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Privacy Matters</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                At HRConnect, we are committed to protecting your privacy and being transparent about how we use data.
                In addition to this Cookie Policy, please review our:
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/security">
                  <Button variant="outline">Security Policy</Button>
                </Link>
                <Link href="/privacy">
                  <Button variant="outline">Privacy Policy</Button>
                </Link>
                <Link href="/terms">
                  <Button variant="outline">Terms of Service</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

