"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SideDark } from "@/contextComponent/SideDark";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { useContext, useState } from "react";

export default function Employees() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }

  const { toggleSidebar, isSidebarOpen } = context;

  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
      position: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Marketing",
      position: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      department: "HR",
      position: "HR Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      department: "Finance",
      position: "Financial Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      department: "Engineering",
      position: "DevOps Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === "All" || employee.department === departmentFilter)
  );

  return (
    <div
      className={`flex h-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}
    >
      {/* Main Content */}
      <main
        className={`flex-1 w-full duration-200 ${
          isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
        }`}
      >
        {/* Employees Content */}
        <div
          className={`mx-auto  overflow-y-auto py-6 sm:px-6  lg:px-8 p-5 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}
        >
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex justify-between  items-center ">
                <CardTitle>Employee List</CardTitle>
                <Button onClick={() => setIsAddEmployeeModalOpen(true)}>
                  <Plus className="sm:mr-2 mr-0 w-4 h-4" />{" "}
                  <p className="sm:block hidden">Add Employee</p>
                </Button>
              </div>
              <CardDescription className="sm:block hidden">
                Manage your company's employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex sm:flex-row flex-col gap-2">
                  <div className="flex items-center justify-center gap-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="sm:w-64 w-full"
                    />
                  </div>
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {filteredEmployees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="border-b dark:border-gray-700"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {employee.name}
                        </div>
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit employee</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Employee Modal */}
      <Dialog
        open={isAddEmployeeModalOpen}
        onOpenChange={setIsAddEmployeeModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter the details of the new employee.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Name
              </Label>
              <Input id="new-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-email" className="text-right">
                Email
              </Label>
              <Input id="new-email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-department" className="text-right">
                Department
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-position" className="text-right">
                Position
              </Label>
              <Input id="new-position" className="col-span-3" />
            </div>
          </div>
          <Button className="w-full">Add Employee</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
