import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Info, CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PaymentMethodSelector from './components/payment-method-selector';
import BillingCycleToggle from './components/billing-cycle-toggle';

export const metadata: Metadata = {
  title: 'Upgrade Plan | HR Connect',
  description: 'Upgrade your HR Connect subscription plan',
};

export default function UpgradePage() {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upgrade Your Plan</h1>
        <p className="text-muted-foreground">
          Choose the plan that best fits your organization's needs
        </p>
      </div>

      <BillingCycleToggle />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Standard Plan */}
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle className="text-xl">Standard</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">$12</span>
              <span className="text-muted-foreground ml-1">/ user / month</span>
            </div>
            <CardDescription className="mt-2">
              For small teams getting started with HR management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Up to 25 employees</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Basic attendance tracking</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Leave management</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Employee profiles</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Professional Plan */}
        <Card className="border-2 border-primary relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-md">
            POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Professional</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">$24</span>
              <span className="text-muted-foreground ml-1">/ user / month</span>
            </div>
            <CardDescription className="mt-2">
              For growing businesses that need more features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Up to 100 employees</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced attendance with geolocation</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Payroll processing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Performance reviews</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>API access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Upgrade to Professional
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle className="text-xl">Enterprise</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">$36</span>
              <span className="text-muted-foreground ml-1">/ user / month</span>
            </div>
            <CardDescription className="mt-2">
              For large organizations with advanced needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Unlimited employees</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced analytics & reporting</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Custom workflows</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>24/7 phone & email support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>SSO & advanced security</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="other">Other Methods</TabsTrigger>
            </TabsList>
            
            <TabsContent value="card">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Smith" />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <img src="/placeholder.svg?height=24&width=36" alt="Visa" className="h-6" />
                        <img src="/placeholder.svg?height=24&width=36" alt="Mastercard" className="h-6" />
                        <img src="/placeholder.svg?height=24&width=36" alt="Amex" className="h-6" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <img src="/placeholder.svg?height=60&width=200" alt="PayPal" className="h-12" />
                <p className="text-center text-muted-foreground">
                  Click the button below to connect your PayPal account
                </p>
                <Button className="w-full md:w-auto">
                  Continue with PayPal
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="other">
              <div className="space-y-6">
                <PaymentMethodSelector />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Professional Plan (Monthly)</span>
                  <span>$24.00</span>
                </div>
                <div className="flex justify-between">
                  <span>10 Users</span>
                  <span>$240.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>$24.00</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total (monthly)</span>
                    <span>$264.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed monthly. Cancel anytime.
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    Complete Upgrade
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    By upgrading, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-primary">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-primary">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 bg-muted/50 rounded-lg p-4 flex items-start space-x-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Secure Payment</p>
              <p>
                All payments are processed securely. Your payment information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
