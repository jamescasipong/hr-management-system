import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Calendar, AlertCircle, ChevronRight, CreditCard, Download, Users, HardDrive, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export const metadata: Metadata = {
  title: 'Manage Subscription | HR Connect',
  description: 'Manage your subscription plan and settings',
};

export default function ManageSubscriptionPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/billing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Manage Subscription</h1>
        <p className="text-muted-foreground">
          Review and modify your current subscription plan
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription details</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Standard Plan</h3>
                <p className="text-muted-foreground">Billed monthly</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-2xl font-bold">$120.00/month</p>
                <p className="text-sm text-muted-foreground">Next billing on Apr 15, 2025</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h4 className="font-semibold">Plan Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Up to 25 users</p>
                    <p className="text-sm text-muted-foreground">Currently using 10</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">5GB storage</p>
                    <p className="text-sm text-muted-foreground">2.4GB used</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Advanced reporting</p>
                    <p className="text-sm text-muted-foreground">Full access</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">API access</p>
                    <p className="text-sm text-muted-foreground">10,000 calls/month</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Email support</p>
                    <p className="text-sm text-muted-foreground">24-hour response time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-muted-foreground">Priority support</p>
                    <p className="text-sm text-muted-foreground">Available in higher plans</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto" asChild>
              <Link href="/billing/upgrade">Upgrade Plan</Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">Change Billing Cycle</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage & Limits</CardTitle>
            <CardDescription>Monitor your current usage against plan limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Users</span>
                </div>
                <span className="text-sm font-medium">10/25</span>
              </div>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-muted-foreground">40% of limit used</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Storage</span>
                </div>
                <span className="text-sm font-medium">2.4GB/5GB</span>
              </div>
              <Progress value={48} className="h-2" />
              <p className="text-xs text-muted-foreground">48% of limit used</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>API Calls</span>
                </div>
                <span className="text-sm font-medium">8.2k/10k</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">82% of monthly limit used</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add-ons</CardTitle>
            <CardDescription>Enhance your plan with additional features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Additional Users</h4>
                <p className="text-sm text-muted-foreground">Add more users to your plan</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$10/user/month</p>
                <Button size="sm" variant="outline" className="mt-2">Add Users</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Extra Storage</h4>
                <p className="text-sm text-muted-foreground">Increase your storage capacity</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$5/GB/month</p>
                <Button size="sm" variant="outline" className="mt-2">Add Storage</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Priority Support</h4>
                <p className="text-sm text-muted-foreground">Get faster response times</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$50/month</p>
                <Button size="sm" variant="outline" className="mt-2">Add Support</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Manage your billing details and payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-muted p-2 rounded-md">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/billing/payment-methods">
                  Change
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Billing Address</p>
                <p className="text-sm text-muted-foreground">123 Business St, Suite 100</p>
                <p className="text-sm text-muted-foreground">San Francisco, CA 94107</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Billing Contact</p>
                <p className="text-sm text-muted-foreground">billing@yourcompany.com</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Cancel Subscription</CardTitle>
            <CardDescription>
              Please note that cancelling your subscription will result in loss of access to premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Cancelling your subscription will immediately revoke access to premium features. 
                Your data will be retained for 30 days, after which it may be permanently deleted.
              </AlertDescription>
            </Alert>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
