"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Search,
  Copy,
  Check,
  Users,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Lock,
  AlertTriangle,
  Info,
  ExternalLink,
} from "lucide-react";

export default function RestApiDocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("curl");
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  // Filter endpoints based on search query
  const filterEndpoints = (endpoints: any[]) => {
    if (!searchQuery) return endpoints;
    return endpoints.filter(
      (endpoint) =>
        endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        endpoint.method.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Example endpoints for each resource type
  const employeeEndpoints = [
    {
      method: "GET",
      path: "/api/v1/employees",
      description: "List all employees",
      parameters: [
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of results per page",
        },
        {
          name: "department",
          type: "string",
          required: false,
          description: "Filter by department",
        },
        {
          name: "status",
          type: "string",
          required: false,
          description: "Filter by employee status",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/employees/{id}",
      description: "Get a specific employee",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Employee ID",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/employees",
      description: "Create a new employee",
      parameters: [
        {
          name: "firstName",
          type: "string",
          required: true,
          description: "Employee's first name",
        },
        {
          name: "lastName",
          type: "string",
          required: true,
          description: "Employee's last name",
        },
        {
          name: "email",
          type: "string",
          required: true,
          description: "Employee's email address",
        },
        {
          name: "department",
          type: "string",
          required: true,
          description: "Employee's department",
        },
        {
          name: "position",
          type: "string",
          required: true,
          description: "Employee's job position",
        },
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Employee's start date",
        },
      ],
    },
    {
      method: "PUT",
      path: "/api/v1/employees/{id}",
      description: "Update an employee",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Employee ID",
        },
        {
          name: "firstName",
          type: "string",
          required: false,
          description: "Employee's first name",
        },
        {
          name: "lastName",
          type: "string",
          required: false,
          description: "Employee's last name",
        },
        {
          name: "email",
          type: "string",
          required: false,
          description: "Employee's email address",
        },
        {
          name: "department",
          type: "string",
          required: false,
          description: "Employee's department",
        },
        {
          name: "position",
          type: "string",
          required: false,
          description: "Employee's job position",
        },
      ],
    },
    {
      method: "DELETE",
      path: "/api/v1/employees/{id}",
      description: "Delete an employee",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Employee ID",
        },
      ],
    },
  ];

  const attendanceEndpoints = [
    {
      method: "GET",
      path: "/api/v1/attendance",
      description: "List attendance records",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: false,
          description: "Filter by employee ID",
        },
        {
          name: "startDate",
          type: "date",
          required: false,
          description: "Filter by start date",
        },
        {
          name: "endDate",
          type: "date",
          required: false,
          description: "Filter by end date",
        },
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of results per page",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/attendance/clock-in",
      description: "Record employee clock in",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: true,
          description: "Employee ID",
        },
        {
          name: "timestamp",
          type: "datetime",
          required: false,
          description: "Clock in time (defaults to current time)",
        },
        {
          name: "location",
          type: "string",
          required: false,
          description: "Clock in location",
        },
        {
          name: "notes",
          type: "string",
          required: false,
          description: "Additional notes",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/attendance/clock-out",
      description: "Record employee clock out",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: true,
          description: "Employee ID",
        },
        {
          name: "timestamp",
          type: "datetime",
          required: false,
          description: "Clock out time (defaults to current time)",
        },
        {
          name: "notes",
          type: "string",
          required: false,
          description: "Additional notes",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/attendance/summary",
      description: "Get attendance summary",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: false,
          description: "Filter by employee ID",
        },
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Start date for summary",
        },
        {
          name: "endDate",
          type: "date",
          required: true,
          description: "End date for summary",
        },
      ],
    },
  ];

  const leaveEndpoints = [
    {
      method: "GET",
      path: "/api/v1/leaves",
      description: "List leave requests",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: false,
          description: "Filter by employee ID",
        },
        {
          name: "status",
          type: "string",
          required: false,
          description: "Filter by status (pending, approved, rejected)",
        },
        {
          name: "startDate",
          type: "date",
          required: false,
          description: "Filter by start date",
        },
        {
          name: "endDate",
          type: "date",
          required: false,
          description: "Filter by end date",
        },
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of results per page",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/leaves",
      description: "Create a leave request",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: true,
          description: "Employee ID",
        },
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Leave start date",
        },
        {
          name: "endDate",
          type: "date",
          required: true,
          description: "Leave end date",
        },
        {
          name: "type",
          type: "string",
          required: true,
          description: "Leave type (vacation, sick, personal, etc.)",
        },
        {
          name: "reason",
          type: "string",
          required: false,
          description: "Reason for leave",
        },
      ],
    },
    {
      method: "PUT",
      path: "/api/v1/leaves/{id}/approve",
      description: "Approve a leave request",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Leave request ID",
        },
        {
          name: "approverNotes",
          type: "string",
          required: false,
          description: "Notes from approver",
        },
      ],
    },
    {
      method: "PUT",
      path: "/api/v1/leaves/{id}/reject",
      description: "Reject a leave request",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Leave request ID",
        },
        {
          name: "rejectionReason",
          type: "string",
          required: true,
          description: "Reason for rejection",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/leaves/balance",
      description: "Get employee leave balance",
      parameters: [
        {
          name: "employeeId",
          type: "string",
          required: true,
          description: "Employee ID",
        },
        {
          name: "year",
          type: "integer",
          required: false,
          description:
            "Year for balance calculation (defaults to current year)",
        },
      ],
    },
  ];

  const payrollEndpoints = [
    {
      method: "GET",
      path: "/api/v1/payroll/periods",
      description: "List payroll periods",
      parameters: [
        {
          name: "year",
          type: "integer",
          required: false,
          description: "Filter by year",
        },
        {
          name: "month",
          type: "integer",
          required: false,
          description: "Filter by month",
        },
        {
          name: "status",
          type: "string",
          required: false,
          description: "Filter by status (draft, processing, completed)",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/payroll/periods/{id}",
      description: "Get a specific payroll period",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Payroll period ID",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/payroll/periods",
      description: "Create a new payroll period",
      parameters: [
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Period start date",
        },
        {
          name: "endDate",
          type: "date",
          required: true,
          description: "Period end date",
        },
        {
          name: "paymentDate",
          type: "date",
          required: true,
          description: "Payment date",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/payroll/slips",
      description: "List payslips",
      parameters: [
        {
          name: "periodId",
          type: "string",
          required: false,
          description: "Filter by payroll period ID",
        },
        {
          name: "employeeId",
          type: "string",
          required: false,
          description: "Filter by employee ID",
        },
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of results per page",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/payroll/slips/{id}",
      description: "Get a specific payslip",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Payslip ID",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/payroll/calculate",
      description: "Calculate payroll for a period",
      parameters: [
        {
          name: "periodId",
          type: "string",
          required: true,
          description: "Payroll period ID",
        },
        {
          name: "employeeIds",
          type: "array",
          required: false,
          description: "Array of employee IDs (defaults to all employees)",
        },
      ],
    },
  ];

  const reportEndpoints = [
    {
      method: "GET",
      path: "/api/v1/reports/attendance",
      description: "Generate attendance report",
      parameters: [
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Report start date",
        },
        {
          name: "endDate",
          type: "date",
          required: true,
          description: "Report end date",
        },
        {
          name: "departmentId",
          type: "string",
          required: false,
          description: "Filter by department ID",
        },
        {
          name: "format",
          type: "string",
          required: false,
          description: "Report format (pdf, csv, json)",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/reports/leave",
      description: "Generate leave report",
      parameters: [
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Report start date",
        },
        {
          name: "endDate",
          type: "date",
          required: true,
          description: "Report end date",
        },
        {
          name: "departmentId",
          type: "string",
          required: false,
          description: "Filter by department ID",
        },
        {
          name: "leaveType",
          type: "string",
          required: false,
          description: "Filter by leave type",
        },
        {
          name: "format",
          type: "string",
          required: false,
          description: "Report format (pdf, csv, json)",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/reports/payroll",
      description: "Generate payroll report",
      parameters: [
        {
          name: "periodId",
          type: "string",
          required: true,
          description: "Payroll period ID",
        },
        {
          name: "departmentId",
          type: "string",
          required: false,
          description: "Filter by department ID",
        },
        {
          name: "format",
          type: "string",
          required: false,
          description: "Report format (pdf, csv, json)",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/reports/employee-turnover",
      description: "Generate employee turnover report",
      parameters: [
        {
          name: "startDate",
          type: "date",
          required: true,
          description: "Report start date",
        },
        {
          name: "endDate",
          type: "date",
          required: true,
          description: "Report end date",
        },
        {
          name: "departmentId",
          type: "string",
          required: false,
          description: "Filter by department ID",
        },
        {
          name: "format",
          type: "string",
          required: false,
          description: "Report format (pdf, csv, json)",
        },
      ],
    },
  ];

  // Code examples for different languages
  const getEmployeesExample = {
    curl: `curl -X GET "https://api.hrconnect.com/api/v1/employees" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    javascript: `fetch('https://api.hrconnect.com/api/v1/employees', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.hrconnect.com/api/v1/employees', headers=headers)
data = response.json()
print(data)`,
    csharp: `using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", "YOUR_API_KEY");
            
            var response = await client.GetAsync("https://api.hrconnect.com/api/v1/employees");
            response.EnsureSuccessStatusCode();
            
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
    }
}`,
  };

  const createEmployeeExample = {
    curl: `curl -X POST "https://api.hrconnect.com/api/v1/employees" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "position": "Software Engineer",
    "startDate": "2023-01-15"
  }'`,
    javascript: `fetch('https://api.hrconnect.com/api/v1/employees', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Software Engineer',
    startDate: '2023-01-15'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests
import json

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

data = {
    'firstName': 'John',
    'lastName': 'Doe',
    'email': 'john.doe@example.com',
    'department': 'Engineering',
    'position': 'Software Engineer',
    'startDate': '2023-01-15'
}

response = requests.post(
    'https://api.hrconnect.com/api/v1/employees',
    headers=headers,
    data=json.dumps(data)
)

print(response.json())`,
    csharp: `using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", "YOUR_API_KEY");
            
            var employee = new
            {
                firstName = "John",
                lastName = "Doe",
                email = "john.doe@example.com",
                department = "Engineering",
                position = "Software Engineer",
                startDate = "2023-01-15"
            };
            
            var content = new StringContent(
                System.Text.Json.JsonSerializer.Serialize(employee),
                Encoding.UTF8,
                "application/json");
            
            var response = await client.PostAsync("https://api.hrconnect.com/api/v1/employees", content);
            response.EnsureSuccessStatusCode();
            
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
    }
}`,
  };

  const clockInExample = {
    curl: `curl -X POST "https://api.hrconnect.com/api/v1/attendance/clock-in" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "employeeId": "emp_12345",
    "location": "Office"
  }'`,
    javascript: `fetch('https://api.hrconnect.com/api/v1/attendance/clock-in', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    employeeId: 'emp_12345',
    location: 'Office'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests
import json

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

data = {
    'employeeId': 'emp_12345',
    'location': 'Office'
}

response = requests.post(
    'https://api.hrconnect.com/api/v1/attendance/clock-in',
    headers=headers,
    data=json.dumps(data)
)

print(response.json())`,
    csharp: `using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", "YOUR_API_KEY");
            
            var clockIn = new
            {
                employeeId = "emp_12345",
                location = "Office"
            };
            
            var content = new StringContent(
                System.Text.Json.JsonSerializer.Serialize(clockIn),
                Encoding.UTF8,
                "application/json");
            
            var response = await client.PostAsync("https://api.hrconnect.com/api/v1/attendance/clock-in", content);
            response.EnsureSuccessStatusCode();
            
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
    }
}`,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                HR
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Connect
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/documentation">
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
            </Link>
            <Link href="/api-status">
              <Button variant="ghost" size="sm">
                API Status
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="ghost" size="sm">
                Contact Us
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <div>
                <Link
                  href="/documentation"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Documentation
                </Link>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  REST API Reference
                </h2>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search endpoints..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <nav className="space-y-1">
                  <a
                    href="#introduction"
                    className="block py-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Introduction
                  </a>
                  <a
                    href="#authentication"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Authentication
                  </a>
                  <a
                    href="#errors"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Errors
                  </a>
                  <a
                    href="#rate-limits"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Rate Limits
                  </a>
                  <a
                    href="#pagination"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Pagination
                  </a>
                  <a
                    href="#versioning"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Versioning
                  </a>
                </nav>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Resources
                </h3>
                <nav className="space-y-1">
                  <a
                    href="#employees"
                    className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Employees
                  </a>
                  <a
                    href="#attendance"
                    className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Attendance
                  </a>
                  <a
                    href="#leaves"
                    className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Leaves
                  </a>
                  <a
                    href="#payroll"
                    className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Payroll
                  </a>
                  <a
                    href="#reports"
                    className="flex items-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Reports
                  </a>
                </nav>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Need help?
                </h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  Our support team is available to assist you with API
                  integration.
                </p>
                <div className="mt-3">
                  <Link href="/contact-us">
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div id="introduction" className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                HRConnect REST API
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The HRConnect REST API provides programmatic access to all
                HRConnect resources. You can use the API to integrate HRConnect
                with your existing systems, build custom workflows, and automate
                HR processes.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Base URL
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All API requests should be made to:{" "}
                    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                      https://api.hrconnect.com
                    </code>
                  </p>
                </div>
              </div>
            </div>

            <div id="authentication" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Authentication
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The HRConnect API uses API keys to authenticate requests. You
                can view and manage your API keys in the HRConnect dashboard.
              </p>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>API Key Authentication</CardTitle>
                  <CardDescription>
                    Include your API key in the Authorization header of all
                    requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Authentication to the API is performed via HTTP Bearer
                      Authentication. Provide your API key as the bearer token
                      value in the Authorization header.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Keep your API key secure
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Your API key has many privileges, so be sure to keep
                          it secure. Do not share your API key in publicly
                          accessible areas such as GitHub, client-side code,
                          etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>OAuth 2.0 Authentication</CardTitle>
                  <CardDescription>
                    For user-specific actions, use OAuth 2.0 to request access
                    on behalf of users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    For integrations that need to perform actions on behalf of
                    users, we support OAuth 2.0 authentication. This allows
                    users to grant your application permission to access their
                    data without sharing their credentials.
                  </p>
                  <Link
                    href="/api-reference/oauth"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    View OAuth 2.0 Documentation{" "}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div id="errors" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Error Handling
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The HRConnect API uses conventional HTTP response codes to
                indicate the success or failure of an API request. In general,
                codes in the 2xx range indicate success, codes in the 4xx range
                indicate an error that failed given the information provided,
                and codes in the 5xx range indicate an error with our servers.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">200 - OK</TableCell>
                    <TableCell>Everything worked as expected.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">201 - Created</TableCell>
                    <TableCell>
                      A new resource was successfully created.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      400 - Bad Request
                    </TableCell>
                    <TableCell>
                      The request was unacceptable, often due to missing a
                      required parameter.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      401 - Unauthorized
                    </TableCell>
                    <TableCell>No valid API key provided.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      403 - Forbidden
                    </TableCell>
                    <TableCell>
                      The API key doesn't have permissions to perform the
                      request.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      404 - Not Found
                    </TableCell>
                    <TableCell>The requested resource doesn't exist.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      429 - Too Many Requests
                    </TableCell>
                    <TableCell>
                      Too many requests hit the API too quickly.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      500, 502, 503, 504 - Server Errors
                    </TableCell>
                    <TableCell>Something went wrong on our end.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                Error Response Format
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When an error occurs, the API will return a JSON response with
                an error object containing details about the error.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                <pre>{`{
  "error": {
    "code": "invalid_request",
    "message": "The request was unacceptable, often due to missing a required parameter.",
    "param": "email",
    "type": "validation_error"
  }
}`}</pre>
              </div>
            </div>

            <div id="rate-limits" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Rate Limits
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The HRConnect API implements rate limiting to protect our
                infrastructure and ensure fair usage. Rate limits vary based on
                your plan.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Rate Limit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Basic</TableCell>
                    <TableCell>100 requests per minute</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Premium</TableCell>
                    <TableCell>300 requests per minute</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Enterprise</TableCell>
                    <TableCell>1000 requests per minute</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Rate limit headers are included in all API responses:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                    X-RateLimit-Limit
                  </code>
                  : The maximum number of requests you're permitted to make per
                  minute.
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                    X-RateLimit-Remaining
                  </code>
                  : The number of requests remaining in the current rate limit
                  window.
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                    X-RateLimit-Reset
                  </code>
                  : The time at which the current rate limit window resets in
                  UTC epoch seconds.
                </li>
              </ul>
            </div>

            <div id="pagination" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pagination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All list endpoints support pagination using the{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                  page
                </code>{" "}
                and{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                  limit
                </code>{" "}
                query parameters.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                <pre>{`GET /api/v1/employees?page=2&limit=10`}</pre>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The response will include pagination metadata:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                <pre>{`{
  "data": [...],
  "pagination": {
    "total": 125,
    "page": 2,
    "limit": 10,
    "pages": 13,
    "prev": 1,
    "next": 3
  }
}`}</pre>
              </div>
            </div>

            <div id="versioning" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                API Versioning
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The HRConnect API is versioned to ensure backward compatibility
                as we evolve the API. The current version is v1.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All API requests should include the version in the URL path:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                <pre>{`https://api.hrconnect.com/api/v1/employees`}</pre>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                We will notify you well in advance of any breaking changes or
                deprecations to the API.
              </p>
            </div>

            {/* Employees Endpoints */}
            <div id="employees" className="mb-12">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Employees
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Employees API allows you to manage employee data, including
                personal information, job details, and more.
              </p>

              <Accordion type="single" collapsible className="mb-6">
                {filterEndpoints(employeeEndpoints).map((endpoint, index) => (
                  <AccordionItem key={index} value={`employee-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Badge
                          className={`mr-2 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <span className="font-mono text-sm">
                          {endpoint.path}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {endpoint.description}
                        </p>

                        {endpoint.parameters &&
                          endpoint.parameters.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Parameters
                              </h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Description</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {endpoint.parameters.map(
                                    (param: any, paramIndex: any) => (
                                      <TableRow key={paramIndex}>
                                        <TableCell className="font-medium">
                                          {param.name}
                                        </TableCell>
                                        <TableCell>{param.type}</TableCell>
                                        <TableCell>
                                          {param.required ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                          {param.description}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          )}

                        {endpoint.path === "/api/v1/employees" &&
                          endpoint.method === "GET" && (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Example Request
                              </h4>
                              <Tabs
                                value={activeLanguage}
                                onValueChange={setActiveLanguage}
                                className="mb-4"
                              >
                                <TabsList>
                                  <TabsTrigger value="curl">cURL</TabsTrigger>
                                  <TabsTrigger value="javascript">
                                    JavaScript
                                  </TabsTrigger>
                                  <TabsTrigger value="python">
                                    Python
                                  </TabsTrigger>
                                  <TabsTrigger value="csharp">C#</TabsTrigger>
                                </TabsList>
                                <TabsContent value="curl" className="relative">
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          getEmployeesExample.curl,
                                          "get-employees-curl"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "get-employees-curl" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{getEmployeesExample.curl}</pre>
                                  </div>
                                </TabsContent>
                                <TabsContent
                                  value="javascript"
                                  className="relative"
                                >
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          getEmployeesExample.javascript,
                                          "get-employees-js"
                                        )
                                      }
                                    >
                                      {copiedExample === "get-employees-js" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{getEmployeesExample.javascript}</pre>
                                  </div>
                                </TabsContent>
                                <TabsContent
                                  value="python"
                                  className="relative"
                                >
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          getEmployeesExample.python,
                                          "get-employees-python"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "get-employees-python" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{getEmployeesExample.python}</pre>
                                  </div>
                                </TabsContent>
                                <TabsContent
                                  value="csharp"
                                  className="relative"
                                >
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          getEmployeesExample.csharp,
                                          "get-employees-csharp"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "get-employees-csharp" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{getEmployeesExample.csharp}</pre>
                                  </div>
                                </TabsContent>
                              </Tabs>

                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Example Response
                              </h4>
                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                                <pre>{`{
  "data": [
    {
      "id": "emp_12345",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "department": "Engineering",
      "position": "Software Engineer",
      "startDate": "2023-01-15",
      "status": "active",
      "createdAt": "2023-01-10T14:23:45Z",
      "updatedAt": "2023-01-10T14:23:45Z"
    },
    {
      "id": "emp_12346",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "department": "Marketing",
      "position": "Marketing Manager",
      "startDate": "2022-11-01",
      "status": "active",
      "createdAt": "2022-10-25T09:12:33Z",
      "updatedAt": "2022-10-25T09:12:33Z"
    }
  ],
  "pagination": {
    "total": 125,
    "page": 1,
    "limit": 10,
    "pages": 13,
    "next": 2
  }
}`}</pre>
                              </div>
                            </div>
                          )}

                        {endpoint.path === "/api/v1/employees" &&
                          endpoint.method === "POST" && (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Example Request
                              </h4>
                              <Tabs
                                value={activeLanguage}
                                onValueChange={setActiveLanguage}
                                className="mb-4"
                              >
                                <TabsList>
                                  <TabsTrigger value="curl">cURL</TabsTrigger>
                                  <TabsTrigger value="javascript">
                                    JavaScript
                                  </TabsTrigger>
                                  <TabsTrigger value="python">
                                    Python
                                  </TabsTrigger>
                                  <TabsTrigger value="csharp">C#</TabsTrigger>
                                </TabsList>
                                <TabsContent value="curl" className="relative">
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          createEmployeeExample.curl,
                                          "create-employee-curl"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "create-employee-curl" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{createEmployeeExample.curl}</pre>
                                  </div>
                                </TabsContent>
                                <TabsContent
                                  value="javascript"
                                  className="relative"
                                >
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          createEmployeeExample.javascript,
                                          "create-employee-js"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "create-employee-js" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>
                                      {createEmployeeExample.javascript}
                                    </pre>
                                  </div>
                                </TabsContent>
                                <TabsContent
                                  value="python"
                                  className="relative"
                                >
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          createEmployeeExample.python,
                                          "create-employee-python"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "create-employee-python" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{createEmployeeExample.python}</pre>
                                  </div>
                                </TabsContent>
                                <TabsContent
                                  value="csharp"
                                  className="relative"
                                >
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        copyToClipboard(
                                          createEmployeeExample.csharp,
                                          "create-employee-csharp"
                                        )
                                      }
                                    >
                                      {copiedExample ===
                                      "create-employee-csharp" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                    <pre>{createEmployeeExample.csharp}</pre>
                                  </div>
                                </TabsContent>
                              </Tabs>

                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Example Response
                              </h4>
                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                                <pre>{`{
  "data": {
    "id": "emp_12347",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "position": "Software Engineer",
    "startDate": "2023-01-15",
    "status": "active",
    "createdAt": "2023-04-15T10:30:45Z",
    "updatedAt": "2023-04-15T10:30:45Z"
  }
}`}</pre>
                              </div>
                            </div>
                          )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Attendance Endpoints */}
            <div id="attendance" className="mb-12">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Attendance
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Attendance API allows you to track employee attendance,
                including clock-in and clock-out times, and generate attendance
                reports.
              </p>

              <Accordion type="single" collapsible className="mb-6">
                {filterEndpoints(attendanceEndpoints).map((endpoint, index) => (
                  <AccordionItem key={index} value={`attendance-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Badge
                          className={`mr-2 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <span className="font-mono text-sm">
                          {endpoint.path}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {endpoint.description}
                        </p>

                        {endpoint.parameters &&
                          endpoint.parameters.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Parameters
                              </h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Description</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {endpoint.parameters.map(
                                    (param: any, paramIndex: number) => (
                                      <TableRow key={paramIndex}>
                                        <TableCell className="font-medium">
                                          {param.name}
                                        </TableCell>
                                        <TableCell>{param.type}</TableCell>
                                        <TableCell>
                                          {param.required ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                          {param.description}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          )}

                        {endpoint.path === "/api/v1/attendance/clock-in" && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Example Request
                            </h4>
                            <Tabs
                              value={activeLanguage}
                              onValueChange={setActiveLanguage}
                              className="mb-4"
                            >
                              <TabsList>
                                <TabsTrigger value="curl">cURL</TabsTrigger>
                                <TabsTrigger value="javascript">
                                  JavaScript
                                </TabsTrigger>
                                <TabsTrigger value="python">Python</TabsTrigger>
                                <TabsTrigger value="csharp">C#</TabsTrigger>
                              </TabsList>
                              <TabsContent value="curl" className="relative">
                                <div className="absolute right-2 top-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      copyToClipboard(
                                        clockInExample.curl,
                                        "clock-in-curl"
                                      )
                                    }
                                  >
                                    {copiedExample === "clock-in-curl" ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                  <pre>{clockInExample.curl}</pre>
                                </div>
                              </TabsContent>
                              <TabsContent
                                value="javascript"
                                className="relative"
                              >
                                <div className="absolute right-2 top-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      copyToClipboard(
                                        clockInExample.javascript,
                                        "clock-in-js"
                                      )
                                    }
                                  >
                                    {copiedExample === "clock-in-js" ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                  <pre>{clockInExample.javascript}</pre>
                                </div>
                              </TabsContent>
                              <TabsContent value="python" className="relative">
                                <div className="absolute right-2 top-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      copyToClipboard(
                                        clockInExample.python,
                                        "clock-in-python"
                                      )
                                    }
                                  >
                                    {copiedExample === "clock-in-python" ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                  <pre>{clockInExample.python}</pre>
                                </div>
                              </TabsContent>
                              <TabsContent value="csharp" className="relative">
                                <div className="absolute right-2 top-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      copyToClipboard(
                                        clockInExample.csharp,
                                        "clock-in-csharp"
                                      )
                                    }
                                  >
                                    {copiedExample === "clock-in-csharp" ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                                  <pre>{clockInExample.csharp}</pre>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Example Response
                            </h4>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                              <pre>{`{
  "data": {
    "id": "att_67890",
    "employeeId": "emp_12345",
    "clockInTime": "2023-04-15T09:00:00Z",
    "location": "Office",
    "status": "active",
    "createdAt": "2023-04-15T09:00:00Z",
    "updatedAt": "2023-04-15T09:00:00Z"
  }
}`}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Leaves Endpoints */}
            <div id="leaves" className="mb-12">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Leaves
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Leaves API allows you to manage employee leave requests,
                approvals, and leave balances.
              </p>

              <Accordion type="single" collapsible className="mb-6">
                {filterEndpoints(leaveEndpoints).map((endpoint, index) => (
                  <AccordionItem key={index} value={`leave-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Badge
                          className={`mr-2 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <span className="font-mono text-sm">
                          {endpoint.path}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {endpoint.description}
                        </p>

                        {endpoint.parameters &&
                          endpoint.parameters.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Parameters
                              </h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Description</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {endpoint.parameters.map(
                                    (param: any, paramIndex: number) => (
                                      <TableRow key={paramIndex}>
                                        <TableCell className="font-medium">
                                          {param.name}
                                        </TableCell>
                                        <TableCell>{param.type}</TableCell>
                                        <TableCell>
                                          {param.required ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                          {param.description}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          )}

                        {endpoint.path === "/api/v1/leaves/balance" && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Example Response
                            </h4>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                              <pre>{`{
                                      "data": {
                                        "employeeId": "emp_12345",
                                        "year": 2023,
                                        "balances": [
                                          {
                                            "type": "vacation",
                                            "total": 20,
                                            "used": 5,
                                            "pending": 2,
                                            "remaining": 13
                                          },
                                          {
                                            "type": "sick",
                                            "total": 10,
                                            "used": 2,
                                            "pending": 0,
                                            "remaining": 8
                                          },
                                          {
                                            "type": "personal",
                                            "total": 5,
                                            "used": 1,
                                            "pending": 0,
                                            "remaining": 4
                                          }
                                        ],
                                        "updatedAt": "2023-04-15T10:30:45Z"
                                      }
                                    }`}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Payroll Endpoints */}
            <div id="payroll" className="mb-12">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Payroll
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Payroll API allows you to manage payroll periods, calculate
                payroll, and generate payslips.
              </p>

              <Accordion type="single" collapsible className="mb-6">
                {filterEndpoints(payrollEndpoints).map((endpoint, index) => (
                  <AccordionItem key={index} value={`payroll-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Badge
                          className={`mr-2 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <span className="font-mono text-sm">
                          {endpoint.path}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {endpoint.description}
                        </p>

                        {endpoint.parameters &&
                          endpoint.parameters.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Parameters
                              </h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Description</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {endpoint.parameters.map(
                                    (param: any, paramIndex: number) => (
                                      <TableRow key={paramIndex}>
                                        <TableCell className="font-medium">
                                          {param.name}
                                        </TableCell>
                                        <TableCell>{param.type}</TableCell>
                                        <TableCell>
                                          {param.required ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                          {param.description}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          )}

                        {endpoint.path === "/api/v1/payroll/slips/{id}" && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Example Response
                            </h4>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                              <pre>{`{
  "data": {
    "id": "slip_34567",
    "employeeId": "emp_12345",
    "periodId": "period_23456",
    "periodStartDate": "2023-04-01",
    "periodEndDate": "2023-04-30",
    "paymentDate": "2023-05-05",
    "grossAmount": 5000.00,
    "netAmount": 4200.00,
    "deductions": [
      {
        "type": "tax",
        "description": "Income Tax",
        "amount": 600.00
      },
      {
        "type": "insurance",
        "description": "Health Insurance",
        "amount": 200.00
      }
    ],
    "additions": [
      {
        "type": "bonus",
        "description": "Performance Bonus",
        "amount": 500.00
      }
    ],
    "status": "processed",
    "createdAt": "2023-05-01T10:30:45Z",
    "updatedAt": "2023-05-01T10:30:45Z"
  }
}`}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Reports Endpoints */}
            <div id="reports" className="mb-12">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Reports
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Reports API allows you to generate various HR reports,
                including attendance, leave, payroll, and employee turnover
                reports.
              </p>

              <Accordion type="single" collapsible className="mb-6">
                {filterEndpoints(reportEndpoints).map((endpoint, index) => (
                  <AccordionItem key={index} value={`report-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Badge
                          className={`mr-2 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <span className="font-mono text-sm">
                          {endpoint.path}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {endpoint.description}
                        </p>

                        {endpoint.parameters &&
                          endpoint.parameters.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Parameters
                              </h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Description</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {endpoint.parameters.map(
                                    (param: any, paramIndex: number) => (
                                      <TableRow key={paramIndex}>
                                        <TableCell className="font-medium">
                                          {param.name}
                                        </TableCell>
                                        <TableCell>{param.type}</TableCell>
                                        <TableCell>
                                          {param.required ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                          {param.description}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-start">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Need more help?
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    If you need additional assistance with our API or have
                    specific integration questions, our developer support team
                    is here to help.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <Link href="/contact-us">
                      <Button>Contact Developer Support</Button>
                    </Link>
                    <Link href="/api-reference/sdks">
                      <Button variant="outline">View SDKs & Libraries</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
