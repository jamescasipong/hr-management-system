import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Smartphone, Building } from 'lucide-react';

export default function PaymentMethodSelector() {
  return (
    <RadioGroup defaultValue="gcash" className="space-y-4">
      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent">
        <RadioGroupItem value="gcash" id="gcash" />
        <Label htmlFor="gcash" className="flex items-center cursor-pointer flex-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 text-white p-2 rounded-md">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">GCash</p>
                <p className="text-sm text-muted-foreground">Pay using your GCash wallet</p>
              </div>
            </div>
            <img src="/placeholder.svg?height=30&width=60" alt="GCash" className="h-8" />
          </div>
        </Label>
      </div>

      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent">
        <RadioGroupItem value="grabpay" id="grabpay" />
        <Label htmlFor="grabpay" className="flex items-center cursor-pointer flex-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 text-white p-2 rounded-md">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">GrabPay</p>
                <p className="text-sm text-muted-foreground">Pay using your GrabPay wallet</p>
              </div>
            </div>
            <img src="/placeholder.svg?height=30&width=60" alt="GrabPay" className="h-8" />
          </div>
        </Label>
      </div>

      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent">
        <RadioGroupItem value="bank" id="bank" />
        <Label htmlFor="bank" className="flex items-center cursor-pointer flex-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500 text-white p-2 rounded-md">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
              </div>
            </div>
          </div>
        </Label>
      </div>

      <div className="mt-4 space-y-4 pt-4 border-t">
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input id="mobileNumber" placeholder="+63 XXX XXX XXXX" />
        </div>
        <Button className="w-full">Continue</Button>
      </div>
    </RadioGroup>
  );
}
