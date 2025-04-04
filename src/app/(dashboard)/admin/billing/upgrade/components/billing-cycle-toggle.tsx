import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function BillingCycleToggle() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-2 sm:space-y-0">
      <div className="flex items-center space-x-2 mr-4">
        <Label htmlFor="billing-cycle" className="text-base">
          Monthly
        </Label>
        <Switch id="billing-cycle" />
        <Label htmlFor="billing-cycle" className="text-base">
          Annual
        </Label>
      </div>
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Save 20% with annual billing
      </Badge>
    </div>
  )
}

