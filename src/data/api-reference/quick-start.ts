const apiKeyExample = {
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
  }

  // Create employee example
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
  }


export { apiKeyExample, createEmployeeExample } 