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


export {clockInExample, createEmployeeExample, getEmployeesExample, reportEndpoints, payrollEndpoints, leaveEndpoints, attendanceEndpoints, employeeEndpoints}