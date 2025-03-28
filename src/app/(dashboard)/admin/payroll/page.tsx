"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSidebar } from "@/context/layout/custom-sidebar";
import { ChevronDown, Download } from "lucide-react";
import { useContext, useState } from "react";

export default function Payroll() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const context = useSidebar();

  const { toggleSidebar, isSidebarOpen } = context;

  const paymentHistory = [
    { date: "2024-03-31", amount: 5000, status: "Paid" },
    { date: "2024-02-29", amount: 5000, status: "Paid" },
    { date: "2024-01-31", amount: 5000, status: "Paid" },
    { date: "2023-12-31", amount: 5000, status: "Paid" },
    { date: "2023-11-30", amount: 5000, status: "Paid" },
  ];

  return (
    <div
      className={`flex h-full bg-background transition-colors duration-200 `}
    >
      {/* Sidebar */}

      {/* Main Content */}
      <main
        className={`flex-1 w-full`}
      >
        {/* Payroll Content */}
        <div
          className={`mx-auto py-6 sm:px-6  lg:px-8 p-1 ${
            isSidebarOpen ? "" : "pt-24 max-w-[1500px] lg:w-full"
          }`}
        >
          {/* Salary Summary Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Salary Summary</CardTitle>
              <CardDescription>Your current salary information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Gross Salary
                  </p>
                  <p className="text-2xl font-bold">$5,000.00</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Net Salary
                  </p>
                  <p className="text-2xl font-bold">$4,200.00</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Next Payday
                  </p>
                  <p className="text-2xl font-bold">April 30, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent salary payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>
                  A list of your recent salary payments.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow
                      key={index}
                      className="dark:border-b"
                    >
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className=""
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Payslip
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="">
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
                <CardDescription>Manage your tax details</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Update Tax Information</Button>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
                <CardDescription>
                  Adjust your payroll preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      Payroll Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Update Bank Details</DropdownMenuItem>
                    <DropdownMenuItem>View Salary Structure</DropdownMenuItem>
                    <DropdownMenuItem>Request Salary Advance</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
