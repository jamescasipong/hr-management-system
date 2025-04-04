import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Billing | HR Connect",
  description: "Manage your subscription and billing information",
}

export default function BillingPage() {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link href="/billing/upgrade">
              Upgrade Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-bold">Standard</p>
                <p className="text-sm text-muted-foreground mt-1">10 users</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly fee</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Next billing date</span>
                <span>Apr 15, 2025</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/billing/manage">Manage Subscription</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-muted p-2 rounded-md">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 04/2026</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Billing address</span>
                <span>United States</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/billing/payment-methods">Update Payment Method</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Usage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Users</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">10/25</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">2.4/5 GB</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Calls</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">8.2k/10k</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/billing/usage">View Usage Details</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Your trial ends in 14 days</AlertTitle>
        <AlertDescription>
          Upgrade to a paid plan to continue using all features after your trial ends on April 15, 2025.
          <Button variant="link" className="p-0 h-auto ml-1" asChild>
            <Link href="/billing/upgrade">Upgrade now</Link>
          </Button>
        </AlertDescription>
      </Alert>

      <div>
        <h2 className="text-xl font-bold mb-6">Billing History</h2>
        <Tabs defaultValue="invoices">
          <TabsList className="mb-6">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Invoice</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-right p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4">INV-001</td>
                        <td className="p-4">Mar 1, 2025</td>
                        <td className="p-4">$120.00</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">INV-002</td>
                        <td className="p-4">Feb 1, 2025</td>
                        <td className="p-4">$120.00</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">INV-003</td>
                        <td className="p-4">Jan 1, 2025</td>
                        <td className="p-4">$120.00</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receipts">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Receipt</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Payment Method</th>
                        <th className="text-right p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4">RCP-001</td>
                        <td className="p-4">Mar 1, 2025</td>
                        <td className="p-4">$120.00</td>
                        <td className="p-4">Visa •••• 4242</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">RCP-002</td>
                        <td className="p-4">Feb 1, 2025</td>
                        <td className="p-4">$120.00</td>
                        <td className="p-4">Visa •••• 4242</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">RCP-003</td>
                        <td className="p-4">Jan 1, 2025</td>
                        <td className="p-4">$120.00</td>
                        <td className="p-4">Visa •••• 4242</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

