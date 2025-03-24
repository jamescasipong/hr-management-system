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

export { zapierExample, webhookExample, salesforceExample, googleSheetsExample }