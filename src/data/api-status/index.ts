const apiServices = [
    { name: "Authentication API", status: "operational", uptime: "99.99%" },
    { name: "Employee API", status: "operational", uptime: "99.98%" },
    { name: "Attendance API", status: "operational", uptime: "99.95%" },
    { name: "Leave Management API", status: "degraded", uptime: "98.75%" },
    { name: "Payroll API", status: "operational", uptime: "99.97%" },
    { name: "Reporting API", status: "operational", uptime: "99.93%" },
    { name: "Notification API", status: "operational", uptime: "99.91%" },
    { name: "Webhooks", status: "operational", uptime: "99.89%" },
  ]
  
  // Mock data for incidents
  const incidents = [
    {
      id: "INC-2023-06-15",
      title: "Leave Management API Degraded Performance",
      status: "investigating",
      date: "June 15, 2023",
      updates: [
        {
          timestamp: "2023-06-15T10:30:00Z",
          message: "We are investigating reports of slow response times in the Leave Management API.",
        },
        {
          timestamp: "2023-06-15T11:15:00Z",
          message: "We have identified the issue as high database load due to increased traffic.",
        },
        {
          timestamp: "2023-06-15T12:00:00Z",
          message: "We are scaling up database resources to address the performance issues.",
        },
      ],
    },
    {
      id: "INC-2023-05-22",
      title: "Authentication API Outage",
      status: "resolved",
      date: "May 22, 2023",
      updates: [
        {
          timestamp: "2023-05-22T08:15:00Z",
          message: "We are investigating reports of users unable to authenticate.",
        },
        {
          timestamp: "2023-05-22T08:45:00Z",
          message: "We have identified an issue with our authentication provider.",
        },
        {
          timestamp: "2023-05-22T09:30:00Z",
          message: "The issue has been resolved and authentication services are back to normal.",
        },
      ],
    },
  ]

export { apiServices, incidents }