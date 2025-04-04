import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Plus, Trash2, CheckCircle2, ChevronRight, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Payment Methods | HR Connect',
  description: 'Manage your payment methods',
};

export default function PaymentMethodsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/billing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Payment Methods</h1>
        <p className="text-muted-foreground">
          Manage your payment methods for subscription and other charges
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Saved Payment Methods</CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <CardDescription>
              Your saved payment methods for automatic billing
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {/* Credit Card */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-muted p-2 rounded-md">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">Visa ending in 4242</p>
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Default
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Mastercard */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-muted p-2 rounded-md">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Mastercard ending in 5678</p>
                    <p className="text-sm text-muted-foreground">Expires 08/2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* PayPal */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <img src="/placeholder.svg?height=20&width=20" alt="PayPal" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-muted-foreground">user@example.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Payment Method</CardTitle>
            <CardDescription>
              Select a payment method to add to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-6 justify-start">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span className="font-medium">Credit or Debit Card</span>
                </div>
                <span className="text-sm text-muted-foreground">Add Visa, Mastercard, Amex, or other cards</span>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center mb-2">
                  <img src="/placeholder.svg?height=20&width=20" alt="PayPal" className="h-5 w-5 mr-2" />
                  <span className="font-medium">PayPal</span>
                </div>
                <span className="text-sm text-muted-foreground">Connect your PayPal account</span>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center mb-2">
                  <img src="/placeholder.svg?height=20&width=20" alt="GCash" className="h-5 w-5 mr-2" />
                  <span className="font-medium">GCash</span>
                </div>
                <span className="text-sm text-muted-foreground">Pay using your GCash wallet</span>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center mb-2">
                  <img src="/placeholder.svg?height=20&width=20" alt="GrabPay" className="h-5 w-5 mr-2" />
                  <span className="font-medium">GrabPay</span>
                </div>
                <span className="text-sm text-muted-foreground">Pay using your GrabPay wallet</span>
              </div>
            </Button>
          </CardContent>
        </Card>

        <Alert variant="default" className="bg-muted border-none">
          <div className="flex items-start">
            <Shield className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
            <AlertDescription className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Secure Payment Processing</p>
              <p>All payment information is encrypted and securely processed. We never store your full card details on our servers.</p>
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </div>
  );
}
