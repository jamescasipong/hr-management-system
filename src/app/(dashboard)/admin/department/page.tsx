"use client"

import type React from "react"
import { useContext, useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSidebar } from "@/context/layout/custom-sidebar"
import { MoreHorizontal, Plus, Search, Save, X, Edit, Users } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { getDepartment } from "@/lib/api/department/department"

type Department = {
  id: number
  name: string
  description: string
  manager: string
  employeeCount: number
  budget: string
}



type DepartmentFormData = Omit<Department, "id" | "employeeCount">

type EditedValues = {
  [key: number]: {
    name: string
    description: string
    manager: string
    budget: string
  }
}

function DepartmentForm({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DepartmentFormData) => void
}) {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    description: "",
    manager: "",
    budget: "",
  })

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartment()
        
        console.log(response)
      } catch (error) {
        console.error("Error fetching departments", error)
      }
    }
  
    fetchDepartments()
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        description: "",
        manager: "",
        budget: "",
      })
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
          <DialogDescription>Enter the details of the new department.</DialogDescription>
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
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3 min-h-[100px]"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manager" className="text-right">
                Manager
              </Label>
              <Input
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                Budget
              </Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="col-span-3"
                placeholder="$100,000"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Department
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function Departments() {
  const param = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(param.get("search") || "")
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(param.toString())
      params.set(name, value)
      return params.toString()
    },
    [param],
  )

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([])
  const [editedValues, setEditedValues] = useState<EditedValues>({})
  const [selectAll, setSelectAll] = useState(false)
  const context = useSidebar()

  const { isSidebarOpen } = context

  const initialDepartments: Department[] = [
    {
      id: 1,
      name: "Engineering",
      description: "Responsible for product development and technical infrastructure.",
      manager: "John Smith",
      employeeCount: 42,
      budget: "$1,200,000",
    },
    {
      id: 2,
      name: "Marketing",
      description: "Handles brand strategy, advertising, and customer acquisition.",
      manager: "Sarah Johnson",
      employeeCount: 18,
      budget: "$850,000",
    },
    {
      id: 3,
      name: "HR",
      description: "Manages recruitment, employee relations, and company culture.",
      manager: "Michael Brown",
      employeeCount: 8,
      budget: "$350,000",
    },
    {
      id: 4,
      name: "Finance",
      description: "Oversees budgeting, accounting, and financial reporting.",
      manager: "Jessica Williams",
      employeeCount: 12,
      budget: "$450,000",
    },
    {
      id: 5,
      name: "Customer Support",
      description: "Provides assistance and resolves issues for customers.",
      manager: "David Miller",
      employeeCount: 25,
      budget: "$600,000",
    },
  ]

  const [departments, setDepartments] = useState<Department[]>(initialDepartments)

  const handleAddDepartment = (newDepartmentData: DepartmentFormData) => {
    const newDepartment: Department = {
      id: departments.length + 1,
      ...newDepartmentData,
      employeeCount: 0,
    }
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment])
  }

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(pathname + "?" + createQueryString("search", e.target.value))
      setSearchTerm(e.target.value)
    },
    [pathname, createQueryString, router],
  )

  const handleViewDetails = (department: Department) => {
    setSelectedDepartment(department)
    setIsDetailsModalOpen(true)
  }

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDeleteDepartment = () => {
    if (selectedDepartment) {
      setDepartments(departments.filter((dept) => dept.id !== selectedDepartment.id))
      setIsDeleteConfirmOpen(false)
    }
  }

  const toggleEditMode = () => {
    if (isEditMode) {
      // If exiting edit mode, clear selections and edits
      setIsEditMode(false)
      setSelectedDepartments([])
      setEditedValues({})
      setSelectAll(false)
    } else {
      // Enter edit mode
      setIsEditMode(true)

      // Initialize edited values with current values
      const initialEdits: EditedValues = {}
      departments.forEach((dept) => {
        initialEdits[dept.id] = {
          name: dept.name,
          description: dept.description,
          manager: dept.manager,
          budget: dept.budget,
        }
      })
      setEditedValues(initialEdits)
    }
  }

  const handleSelectDepartment = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedDepartments((prev) => [...prev, id])
    } else {
      setSelectedDepartments((prev) => prev.filter((deptId) => deptId !== id))
    }
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    if (newSelectAll) {
      // Select all visible departments
      const visibleDepartmentIds = filteredDepartments.map((dept) => dept.id)
      setSelectedDepartments(visibleDepartmentIds)
    } else {
      // Deselect all
      setSelectedDepartments([])
    }
  }

  const handleInputChange = (id: number, field: keyof Omit<Department, "id" | "employeeCount">, value: string) => {
    setEditedValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const saveAllChanges = () => {
    const updatedDepartments = departments.map((dept) => {
      if (selectedDepartments.includes(dept.id)) {
        return {
          ...dept,
          ...editedValues[dept.id],
        }
      }
      return dept
    })

    setDepartments(updatedDepartments)
    toggleEditMode() // Exit edit mode after saving
  }

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className={`flex h-full w-full min-h-screen overflow-x-hidden transition-colors duration-200`}>
      {/* Main Content */}
      <main className={`flex-1 w-full duration-200`}>
        {/* Departments Content */}
        <div
          className={`mx-auto w-full py-6 sm:px-6 lg:px-8 p-1 ${
            isSidebarOpen ? "" : "pt-24 w-full max-w-[1500px] lg:w-full"
          }`}
        >
          <Card className="w-full overflow-visible">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Department List</CardTitle>
                <div className="flex gap-2">
                  {isEditMode ? (
                    <>
                      <Button variant="default" onClick={saveAllChanges} disabled={selectedDepartments.length === 0}>
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
                      <Button onClick={() => setIsAddDepartmentModalOpen(true)}>
                        <Plus className="sm:mr-2 mr-0 w-4 h-4" />
                        <p className="sm:block hidden">Add Department</p>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <CardDescription className="sm:block hidden">Manage your company's departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4 overflow-x-visible">
                <div className="flex sm:flex-row flex-col gap-2">
                  <div className="flex items-center justify-center gap-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search departments..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="sm:w-64 w-full"
                    />
                  </div>
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
                          aria-label="Select all departments"
                        />
                      </TableHead>
                    )}
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Budget</TableHead>
                    {!isEditMode && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id} className="border-b">
                      {isEditMode && (
                        <TableCell className="w-12">
                          <Checkbox
                            checked={selectedDepartments.includes(department.id)}
                            onCheckedChange={(checked) => handleSelectDepartment(department.id, checked === true)}
                            aria-label={`Select ${department.name}`}
                          />
                        </TableCell>
                      )}
                      <TableCell className="font-medium">
                        {isEditMode && selectedDepartments.includes(department.id) ? (
                          <Input
                            value={editedValues[department.id]?.name || department.name}
                            onChange={(e) => handleInputChange(department.id, "name", e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded-full mr-2">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            {department.name}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        {isEditMode && selectedDepartments.includes(department.id) ? (
                          <Textarea
                            value={editedValues[department.id]?.description || department.description}
                            onChange={(e) => handleInputChange(department.id, "description", e.target.value)}
                            className="w-full h-20"
                          />
                        ) : (
                          <div className="truncate">{department.description}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditMode && selectedDepartments.includes(department.id) ? (
                          <Input
                            value={editedValues[department.id]?.manager || department.manager}
                            onChange={(e) => handleInputChange(department.id, "manager", e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          department.manager
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          {department.employeeCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        {isEditMode && selectedDepartments.includes(department.id) ? (
                          <Input
                            value={editedValues[department.id]?.budget || department.budget}
                            onChange={(e) => handleInputChange(department.id, "budget", e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          department.budget
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
                              <DropdownMenuItem onClick={() => handleViewDetails(department)}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteDepartment(department)}
                              >
                                Delete department
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isEditMode && selectedDepartments.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <div className="bg-muted p-2 rounded-md text-sm">
                    {selectedDepartments.length} {selectedDepartments.length === 1 ? "department" : "departments"}{" "}
                    selected
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Department Modal */}
      <DepartmentForm
        isOpen={isAddDepartmentModalOpen}
        onClose={() => setIsAddDepartmentModalOpen(false)}
        onSubmit={handleAddDepartment}
      />

      {/* Department Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Department Details</DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedDepartment.name}</h3>
                  <p className="text-muted-foreground">Managed by {selectedDepartment.manager}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Employees</h4>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-2xl font-bold">{selectedDepartment.employeeCount}</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Budget</h4>
                  <p className="text-2xl font-bold">{selectedDepartment.budget}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedDepartment.description}</p>
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
              Are you sure you want to delete the {selectedDepartment?.name} department? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteDepartment}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

