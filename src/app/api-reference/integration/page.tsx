"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Copy,
  Check,
  ArrowRight,
  AlertTriangle,
  Info,
  ExternalLink,
  Code,
  Database,
  Workflow,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function ApiIntegrationGuidePage() {
  const [activeTab, setActiveTab] = useState("zapier")
  const [copiedExample, setCopiedExample] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedExample(id)
    setTimeout(() => setCopiedExample(null), 2000)
  }

  // Code examples for different integrations
  const zapierExample = `// Zapier Trigger for New Employee
{
  "key": "new_employee",
  "noun": "Employee",
  "display": {
    "label": "New Employee",
    "description": "Triggers when a new employee is added to HRConnect."
  },
  "operation": {
    "perform": {
      "url": "https://api.hrconnect.com/api/v1/employees",
      "params": {
        "created_after": "{{after}}"
      },
      "headers": {
        "Authorization": "Bearer {{bundle.authData.api_key}}"
      }
    },
    "sample": {
      "id": "emp_12345",
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
  }
}`

  const webhookExample = `// Setting up a webhook for leave request events
curl -X POST "https://api.hrconnect.com/api/v1/webhooks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/hrconnect",
    "events": ["leave.created", "leave.updated", "leave.approved", "leave.rejected"],
    "secret": "your_webhook_secret"
  }'`

  const salesforceExample = `// Apex class for HRConnect integration
public class HRConnectIntegration {
    private static final String API_ENDPOINT = 'https://api.hrconnect.com/api/v1';
    private static final String API_KEY = 'YOUR_API_KEY';
    
    public static List<Map<String, Object>> getEmployees() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(API_ENDPOINT + '/employees');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + API_KEY);
        req.setHeader('Content-Type', 'application/json');
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        if (res.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            return (List<Map<String, Object>>) responseMap.get('data');
        } else {
            System.debug('Error: ' + res.getStatusCode() + ' ' + res.getStatus());
            return new List<Map<String, Object>>();
        }
    }
    
    public static void syncEmployeeToContact(String employeeId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(API_ENDPOINT + '/employees/' + employeeId);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + API_KEY);
        req.setHeader('Content-Type', 'application/json');
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        if (res.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            Map<String, Object> employee = (Map<String, Object>) responseMap.get('data');
            
            // Create or update Contact
            Contact contact = new Contact();
            contact.FirstName = (String) employee.get('firstName');
            contact.LastName = (String) employee.get('lastName');
            contact.Email = (String) employee.get('email');
            contact.Department = (String) employee.get('department');
            contact.Title = (String) employee.get('position');
            
            upsert contact Email;
        }
    }
}`

  const googleSheetsExample = `// Google Apps Script for HRConnect integration
function fetchEmployeesFromHRConnect() {
  const API_KEY = 'YOUR_API_KEY';
  const API_ENDPOINT = 'https://api.hrconnect.com/api/v1/employees';
  
  const options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = UrlFetchApp.fetch(API_ENDPOINT, options);
    const responseData = JSON.parse(response.getContentText());
    const employees = responseData.data;
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Employees') || ss.insertSheet('Employees');
    
    // Clear existing data
    sheet.clear();
    
    // Set headers
    sheet.appendRow(['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Position', 'Start Date', 'Status']);
    
    // Add employee data
    employees.forEach(function(employee) {
      sheet.appendRow([
        employee.id,
        employee.firstName,
        employee.lastName,
        employee.email,
        employee.department,
        employee.position,
        employee.startDate,
        employee.status
      ]);
    });
    
    // Format the sheet
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    sheet.autoResizeColumns(1, 8);
    
    Logger.log('Successfully imported ' + employees.length + ' employees');
  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Connect</span>
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
                  href="/api-reference/rest"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to API Reference
                </Link>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Integration Guide</h2>
                <nav className="space-y-1">
                  <a href="#introduction" className="block py-2 text-blue-600 dark:text-blue-400 hover:underline">
                    Introduction
                  </a>
                  <a
                    href="#zapier"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Zapier Integration
                  </a>
                  <a
                    href="#webhooks"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Webhooks
                  </a>
                  <a
                    href="#salesforce"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Salesforce Integration
                  </a>
                  <a
                    href="#google-sheets"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Google Sheets Integration
                  </a>
                  <a
                    href="#best-practices"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Integration Best Practices
                  </a>
                </nav>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">API Resources</h3>
                <nav className="space-y-1">
                  <Link
                    href="/api-reference/rest"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    REST API Reference
                  </Link>
                  <Link
                    href="/api-reference/quick-start"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Quick Start Guide
                  </Link>
                  <Link
                    href="/api-reference/faq"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/api-reference/integration"
                    className="block py-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Integration Guide
                  </Link>
                  <Link
                    href="/api-reference/videos"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Video Tutorials
                  </Link>
                  <Link
                    href="/api-reference/updates"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    API Updates
                  </Link>
                </nav>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Need help?</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  Our integration specialists are available to assist you with your integration project.
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Integration Guide</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This guide will help you integrate HRConnect with your existing systems and workflows. Whether you're
                using popular platforms like Zapier and Salesforce, or building a custom integration, we've got you
                covered.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Before you begin</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Make sure you have an HRConnect account with API access enabled and have generated an API key. If
                    you haven't done this yet, check out our{" "}
                    <Link
                      href="/api-reference/quick-start"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Quick Start Guide
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div id="zapier" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Zapier Integration</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Zapier allows you to connect HRConnect with thousands of other apps without writing any code. Our
                official Zapier integration supports triggers and actions for all major HRConnect features.
              </p>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Setting up the HRConnect Zapier Integration
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Log in to your Zapier account</li>
                  <li>Click "Create Zap"</li>
                  <li>Search for "HRConnect" in the app search</li>
                  <li>Select a trigger or action</li>
                  <li>Connect your HRConnect account by entering your API key</li>
                  <li>Configure the trigger or action and complete your Zap</li>
                </ol>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">Available Triggers</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    <strong>New Employee</strong> - Triggers when a new employee is added
                  </li>
                  <li>
                    <strong>Updated Employee</strong> - Triggers when an employee is updated
                  </li>
                  <li>
                    <strong>New Leave Request</strong> - Triggers when a new leave request is submitted
                  </li>
                  <li>
                    <strong>Leave Request Status Change</strong> - Triggers when a leave request status changes
                  </li>
                  <li>
                    <strong>New Attendance Record</strong> - Triggers when a new attendance record is created
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">Available Actions</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    <strong>Create Employee</strong> - Creates a new employee in HRConnect
                  </li>
                  <li>
                    <strong>Update Employee</strong> - Updates an existing employee
                  </li>
                  <li>
                    <strong>Create Leave Request</strong> - Creates a new leave request
                  </li>
                  <li>
                    <strong>Approve/Reject Leave Request</strong> - Updates the status of a leave request
                  </li>
                  <li>
                    <strong>Record Attendance</strong> - Records attendance for an employee
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">
                  Example: New Employee Trigger
                </h3>
                <div className="relative">
                  <div className="absolute right-2 top-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(zapierExample, "zapier-example")}
                    >
                      {copiedExample === "zapier-example" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                    <pre>{zapierExample}</pre>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="https://zapier.com/apps/hrconnect" target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center">
                      Get Started with Zapier
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="webhooks" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Webhooks</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Webhooks allow you to receive real-time notifications when events occur in your HRConnect account. This
                is useful for keeping external systems in sync with your HR data.
              </p>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Setting up Webhooks</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To set up a webhook, you'll need to register a URL where HRConnect can send event notifications. You
                  can do this through the API or in the HRConnect dashboard under Settings &gt; Integrations &gt;
                  Webhooks.
                </p>

                <div className="relative">
                  <div className="absolute right-2 top-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(webhookExample, "webhook-example")}
                    >
                      {copiedExample === "webhook-example" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                    <pre>{webhookExample}</pre>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">Available Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Employee Events</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>employee.created</li>
                      <li>employee.updated</li>
                      <li>employee.deleted</li>
                      <li>employee.status_changed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Attendance Events</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>attendance.clock_in</li>
                      <li>attendance.clock_out</li>
                      <li>attendance.updated</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Leave Events</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>leave.created</li>
                      <li>leave.updated</li>
                      <li>leave.approved</li>
                      <li>leave.rejected</li>
                      <li>leave.cancelled</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Payroll Events</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>payroll.period_created</li>
                      <li>payroll.calculated</li>
                      <li>payroll.processed</li>
                      <li>payslip.generated</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">Webhook Payload</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  When an event occurs, HRConnect will send a POST request to your webhook URL with a JSON payload
                  containing details about the event:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "event": "leave.approved",
  "created_at": "2023-04-15T10:30:45Z",
  "data": {
    "id": "leave_34567",
    "employeeId": "emp_12345",
    "startDate": "2023-05-01",
    "endDate": "2023-05-05",
    "type": "vacation",
    "status": "approved",
    "approvedBy": "emp_67890",
    "approvedAt": "2023-04-15T10:30:45Z"
  }
}`}</pre>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg flex items-start mt-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Webhook Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To verify that webhook requests are coming from HRConnect, we include a signature in the{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">X-HRConnect-Signature</code>{" "}
                      header. You should validate this signature using your webhook secret.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/api-reference/webhooks">
                    <Button className="flex items-center">
                      Learn More About Webhooks
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="salesforce" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Salesforce Integration</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Integrate HRConnect with Salesforce to sync employee data, automate HR processes, and create a unified
                view of your workforce.
              </p>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Integration Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">HRConnect Managed Package</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Our official Salesforce managed package provides a pre-built integration with a user-friendly
                        configuration interface.
                      </p>
                      <Link href="/integrations/salesforce/managed-package">
                        <Button variant="outline" size="sm" className="w-full">
                          Learn More
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Custom API Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Build a custom integration using Apex code and the HRConnect API for maximum flexibility.
                      </p>
                      <Link href="/integrations/salesforce/custom-api">
                        <Button variant="outline" size="sm" className="w-full">
                          Learn More
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">
                  Example: Syncing Employees to Salesforce Contacts
                </h3>
                <div className="relative">
                  <div className="absolute right-2 top-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(salesforceExample, "salesforce-example")}
                    >
                      {copiedExample === "salesforce-example" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                    <pre>{salesforceExample}</pre>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/integrations/salesforce">
                    <Button className="flex items-center">
                      View Salesforce Integration Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="google-sheets" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Google Sheets Integration</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Integrate HRConnect with Google Sheets to export HR data for reporting, analysis, or sharing with
                stakeholders who don't have access to HRConnect.
              </p>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Integration with Google Apps Script
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can use Google Apps Script to fetch data from the HRConnect API and populate Google Sheets. This
                  allows you to create custom reports and dashboards.
                </p>

                <div className="relative">
                  <div className="absolute right-2 top-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(googleSheetsExample, "google-sheets-example")}
                    >
                      {copiedExample === "google-sheets-example" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto mt-2">
                    <pre>{googleSheetsExample}</pre>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">
                  Setting up the Google Sheets Integration
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Create a new Google Sheet</li>
                  <li>Click on Extensions &gt; Apps Script</li>
                  <li>Copy and paste the example code, replacing YOUR_API_KEY with your actual API key</li>
                  <li>Save the script and give it a name</li>
                  <li>Run the function to fetch data from HRConnect</li>
                  <li>Optionally, set up a trigger to run the script automatically on a schedule</li>
                </ol>

                <div className="mt-6">
                  <Link href="/integrations/google-sheets">
                    <Button className="flex items-center">
                      View Google Sheets Integration Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="best-practices" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integration Best Practices</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Follow these best practices to ensure your integration is secure, reliable, and maintainable.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <CardTitle className="text-lg">Error Handling</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Implement robust error handling in your integration. Handle API errors gracefully, retry failed
                        requests with exponential backoff, and log errors for troubleshooting.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <CardTitle className="text-lg">Data Synchronization</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Use webhooks for real-time updates and implement incremental synchronization for batch
                        processes. Store the last sync timestamp and only fetch changes since then.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Workflow className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <CardTitle className="text-lg">Rate Limiting</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Respect API rate limits by implementing rate limiting in your code. Use the rate limit headers
                        in API responses to adjust your request rate dynamically.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <CardTitle className="text-lg">Performance Optimization</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Optimize API requests by using pagination, filtering, and selecting only the fields you need.
                        Cache frequently accessed data to reduce API calls.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start mt-4">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Security Considerations</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>Store API keys securely and never expose them in client-side code</li>
                      <li>Implement webhook signature verification to ensure requests are coming from HRConnect</li>
                      <li>Use HTTPS for all API requests</li>
                      <li>Follow the principle of least privilege when setting up API access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-start">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Need a Custom Integration?</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    If you need help building a custom integration or have specific requirements, our integration
                    specialists are here to help. We can provide guidance, review your integration code, or even build a
                    custom integration for you.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <Link href="/contact-us">
                      <Button>Contact Integration Team</Button>
                    </Link>
                    <Link href="/partners">
                      <Button variant="outline">View Integration Partners</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

