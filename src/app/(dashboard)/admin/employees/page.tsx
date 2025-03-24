"use client"

import type React from "react"
import { useContext, useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSidebar } from "@/context/layout/custom-sidebar"
import { MoreHorizontal, Plus, Search, Save, X, Edit } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

type Employee = {
  id: number
  name: string
  email: string
  department: string
  position: string
  avatar: string
  isSelected?: boolean
  isEditing?: boolean
}

type EmployeeFormData = Omit<Employee, "id" | "avatar">

type EditedValues = {
  [key: number]: {
    name: string
    email: string
    department: string
    position: string
  }
}

function EmployeeForm({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EmployeeFormData) => void
}) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    department: "",
    position: "",
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        department: "",
        position: "",
      })
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, department: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>Enter the details of the new employee.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select onValueChange={handleDepartmentChange} value={formData.department}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Employee
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function Employees() {
  const param = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(param.get("search") || "")
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(param.toString())
      params.set(name, value)

      return params.toString()
    },
    [param],
  )
  const [departmentFilter, setDepartmentFilter] = useState(param.get("department") || "All")

  useEffect(() => {
    const filter = param.get("department") || "All";
    setDepartmentFilter(filter);
  
    if (typeof window !== "undefined" && filter === "All") {
      router.push(pathname + "?" + createQueryString("department", filter));
    }
  }, [param, pathname, router, createQueryString]);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  const [editedValues, setEditedValues] = useState<EditedValues>({})
  const [selectAll, setSelectAll] = useState(false)
  const context = useSidebar()


  const { toggleSidebar, isSidebarOpen } = context

  const initialEmployees: Employee[] = [
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
  ]

  const setDeparment = (value: string) => {
    router.push(pathname + "?" + createQueryString("department", value))
    setDepartmentFilter(value)
  }

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

  const handleAddEmployee = (newEmployeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      ...newEmployeeData,
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee])
  }

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(pathname + "?" + createQueryString("search", e.target.value))
      setSearchTerm(e.target.value)
    },
    [pathname, createQueryString, router],
  )

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDetailsModalOpen(true)
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDeleteEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id))
      setIsDeleteConfirmOpen(false)
    }
  }

  const toggleEditMode = () => {
    if (isEditMode) {
      // If exiting edit mode, clear selections and edits
      setIsEditMode(false)
      setSelectedEmployees([])
      setEditedValues({})
      setSelectAll(false)
    } else {
      // Enter edit mode
      setIsEditMode(true)

      // Initialize edited values with current values
      const initialEdits: EditedValues = {}
      employees.forEach((emp) => {
        initialEdits[emp.id] = {
          name: emp.name,
          email: emp.email,
          department: emp.department,
          position: emp.position,
        }
      })
      setEditedValues(initialEdits)
    }
  }

  const handleSelectEmployee = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedEmployees((prev) => [...prev, id])
    } else {
      setSelectedEmployees((prev) => prev.filter((empId) => empId !== id))
    }
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    if (newSelectAll) {
      // Select all visible employees
      const visibleEmployeeIds = filteredEmployees.map((emp) => emp.id)
      setSelectedEmployees(visibleEmployeeIds)
    } else {
      // Deselect all
      setSelectedEmployees([])
    }
  }

  const handleInputChange = (
    id: number,
    field: keyof Omit<Employee, "id" | "avatar" | "isSelected" | "isEditing">,
    value: string,
  ) => {
    setEditedValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const saveAllChanges = () => {
    const updatedEmployees = employees.map((emp) => {
      if (selectedEmployees.includes(emp.id)) {
        return {
          ...emp,
          ...editedValues[emp.id],
        }
      }
      return emp
    })

    setEmployees(updatedEmployees)
    toggleEditMode() // Exit edit mode after saving
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (departmentFilter === "All" || employee.department === departmentFilter),
  )

  return (
    <div className={`flex h-full w-full min-h-screen overflow-x-hidden transition-colors duration-200`}>
      {/* Main Content */}
      <main className={`flex-1 w-full duration-200`}>
        {/* Employees Content */}
        <div
          className={`mx-auto w-full py-6 sm:px-6 lg:px-8 p-1 ${
            isSidebarOpen ? "" : "pt-24 w-full max-w-[1500px] lg:w-full"
          }`}
        >
          <Card className="w-full overflow-visible">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Employee List</CardTitle>
                <div className="flex gap-2">
                  {isEditMode ? (
                    <>
                      <Button variant="default" onClick={saveAllChanges} disabled={selectedEmployees.length === 0}>
                        <Save className="sm:mr-2 mr-0 w-4 h-4" />
                        <p className="sm:block hidden">Save Changes</p>
                      </Button>
                      <Button variant="outline" onClick={toggleEditMode}>
                        <X className="sm:mr-2 mr-0 w-4 h-4" />
                        <p className="sm:block hidden">Cancel</p>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={toggleEditMode}>
                        <Edit className="sm:mr-2 mr-0 w-4 h-4" />
                        <p className="sm:block hidden">Edit Mode</p>
                      </Button>
                      <Button onClick={() => setIsAddEmployeeModalOpen(true)}>
                        <Plus className="sm:mr-2 mr-0 w-4 h-4" />
                        <p className="sm:block hidden">Add Employee</p>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <CardDescription className="sm:block hidden">Manage your company's employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4 overflow-x-visible">
                <div className="flex sm:flex-row flex-col gap-2">
                  <div className="flex items-center justify-center gap-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="sm:w-64 w-full"
                    />
                  </div>
                  <Select value={departmentFilter} onValueChange={setDeparment}>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    {isEditMode && (
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all employees"
                        />
                      </TableHead>
                    )}
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    {!isEditMode && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="border-b">
                      {isEditMode && (
                        <TableCell className="w-12">
                          <Checkbox
                            checked={selectedEmployees.includes(employee.id)}
                            onCheckedChange={(checked: boolean) => handleSelectEmployee(employee.id, checked === true)}
                            aria-label={`Select ${employee.name}`}
                          />
                        </TableCell>
                      )}
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
                          {isEditMode && selectedEmployees.includes(employee.id) ? (
                            <Input
                              value={editedValues[employee.id]?.name || employee.name}
                              onChange={(e) => handleInputChange(employee.id, "name", e.target.value)}
                              className="w-full"
                            />
                          ) : (
                            employee.name
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {isEditMode && selectedEmployees.includes(employee.id) ? (
                          <Input
                            value={editedValues[employee.id]?.email || employee.email}
                            onChange={(e) => handleInputChange(employee.id, "email", e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          employee.email
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditMode && selectedEmployees.includes(employee.id) ? (
                          <Select
                            value={editedValues[employee.id]?.department || employee.department}
                            onValueChange={(value:string) => handleInputChange(employee.id, "department", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          employee.department
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditMode && selectedEmployees.includes(employee.id) ? (
                          <Input
                            value={editedValues[employee.id]?.position || employee.position}
                            onChange={(e) => handleInputChange(employee.id, "position", e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          employee.position
                        )}
                      </TableCell>
                      {!isEditMode && (
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
                              <DropdownMenuItem onClick={() => handleViewDetails(employee)}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEmployee(employee)}>
                                Delete employee
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isEditMode && selectedEmployees.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <div className="bg-muted p-2 rounded-md text-sm">
                    {selectedEmployees.length} {selectedEmployees.length === 1 ? "employee" : "employees"} selected
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Employee Modal */}
      <EmployeeForm
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSubmit={handleAddEmployee}
      />

      {/* Employee Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedEmployee.avatar} />
                  <AvatarFallback>
                    {selectedEmployee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name</Label>
                <div className="col-span-3">{selectedEmployee.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email</Label>
                <div className="col-span-3">{selectedEmployee.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Department</Label>
                <div className="col-span-3">{selectedEmployee.department}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Position</Label>
                <div className="col-span-3">{selectedEmployee.position}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEmployee}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

