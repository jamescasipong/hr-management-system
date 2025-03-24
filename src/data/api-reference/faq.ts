import { Code, Zap, HelpCircle, Shield, AlertTriangle, Clock, Key } from "lucide-react"

const faqItems = [
    {
      category: "authentication",
      question: "How do I get an API key?",
      answer: "You can get an API key by logging into your HRConnect account, navigating to Settings > API, and clicking on 'Generate API Key'. You'll need to provide a name for your key to help you identify it later. Make sure to copy and store your API key securely, as you won't be able to see it again."
    },
    {
      category: "authentication",
      question: "How do I reset my API key?",
      answer: "If you need to reset your API key, log into your HRConnect account, go to Settings > API, find the key you want to reset, and click on 'Revoke'. Then, generate a new API key. Note that revoking an API key will immediately invalidate it, so any applications using that key will stop working until you update them with the new key."
    },
    {
      category: "authentication",
      question: "Can I have multiple API keys?",
      answer: "Yes, you can generate multiple API keys for different applications or purposes. This is a good practice as it allows you to revoke access for a specific application without affecting others. Each key can also have different permissions based on your needs."
    },
    {
      category: "rate-limits",
      question: "What are the rate limits for the API?",
      answer: "Rate limits vary based on your plan. Basic plans have a limit of 100 requests per minute, Premium plans have 300 requests per minute, and Enterprise plans have 1000 requests per minute. If you exceed these limits, you'll receive a 429 Too Many Requests response. You can monitor your current rate limit status using the X-RateLimit-* headers included in all API responses."
    },
    {
      category: "rate-limits",
      question: "What happens if I exceed the rate limits?",
      answer: "If you exceed the rate limits, the API will return a 429 Too Many Requests response. The response will include a Retry-After header indicating how many seconds you should wait before making another request. We recommend implementing exponential backoff in your applications to handle rate limiting gracefully."
    },
    {
      category: "rate-limits",
      question: "Can I request an increase to my rate limits?",
      answer: "Yes, if you need higher rate limits, you can upgrade your plan or contact our sales team to discuss custom rate limits for your specific needs. Enterprise customers can request custom rate limits based on their usage patterns."
    },
    {
      category: "endpoints",
      question: "How do I paginate through results?",
      answer: "All list endpoints support pagination using the page and limit query parameters. For example, to get the second page of results with 20 items per page, you would make a request to /api/v1/employees?page=2&limit=20. The response includes pagination metadata with information about the total number of items, the current page, and links to navigate to other pages."
    },
    {
      category: "endpoints",
      question: "How do I filter results?",
      answer: "Most list endpoints support filtering using query parameters. For example, to get all employees in the Engineering department, you would make a request to /api/v1/employees?department=Engineering. You can combine multiple filters to narrow down the results. Check the documentation for each endpoint to see the available filter parameters."
    },
    {
      category: "endpoints",
      question: "How do I sort results?",
      answer: "You can sort results using the sort query parameter. For example, to sort employees by last name in ascending order, you would make a request to /api/v1/employees?sort=lastName. To sort in descending order, prefix the field name with a minus sign: /api/v1/employees?sort=-lastName. You can also sort by multiple fields by separating them with commas."
    },
    {
      category: "errors",
      question: "How do I handle API errors?",
      answer: "The API uses standard HTTP status codes to indicate the success or failure of requests. In addition to the status code, error responses include a JSON object with details about the error, including an error code, message, and sometimes additional information like the parameter that caused the error. We recommend implementing proper error handling in your applications to provide a good user experience."
    },
    {
      category: "errors",
      question: "What does the 'invalid_request' error mean?",
      answer: "The 'invalid_request' error typically means that there's something wrong with your request, such as missing required parameters or invalid parameter values. Check the error message and the param field in the error response for more details about what's wrong with your request."
    },
    {
      category: "errors",
      question: "I'm getting a 401 Unauthorized error. What should I do?",
      answer: "A 401 Unauthorized error means that your API key is missing or invalid. Make sure you're including your API key in the Authorization header of your requests using the Bearer authentication scheme: Authorization: Bearer YOUR_API_KEY. If you're sure your API key is correct, it may have been revoked. Try generating a new API key."
    },
    {
      category: "webhooks",
      question: "How do I set up webhooks?",
      answer: "To set up webhooks, go to your HRConnect account, navigate to Settings > Webhooks, and click on 'Add Webhook'. You'll need to provide a URL where we'll send the webhook events, and select the events you're interested in. We'll send a POST request to your URL whenever the selected events occur. Make sure your endpoint can handle these requests and respond with a 200 OK status code."
    },
    {
      category: "webhooks",
      question: "How do I verify webhook signatures?",
      answer: "Each webhook request includes a X-HRConnect-Signature header that you can use to verify that the request came from HRConnect. The signature is a HMAC SHA-256 hash of the request body, using your webhook secret as the key. To verify the signature, compute the HMAC SHA-256 hash of the request body using your webhook secret, and compare it to the value in the X-HRConnect-Signature header. They should match exactly."
    },
    {
      category: "webhooks",
      question: "What events can I subscribe to with webhooks?",
      answer: "You can subscribe to a variety of events, including employee created/updated/deleted, attendance recorded, leave request created/approved/rejected, payroll processed, and more. Check the Webhooks documentation for a complete list of available events."
    },
    {
      category: "security",
      question: "Is my data secure when using the API?",
      answer: "Yes, we take security seriously. All API requests are made over HTTPS, which encrypts the data in transit. Your API key is used to authenticate requests and should be kept secure. We also implement rate limiting and other security measures to protect against abuse. For more information about our security practices, see our Security Policy."
    },
    {
      category: "security",
      question: "Do you support OAuth 2.0?",
      answer: "Yes, we support OAuth 2.0 for user-specific actions. This allows you to build applications that can perform actions on behalf of users without requiring their HRConnect credentials. See our OAuth 2.0 documentation for more details on how to implement this authentication method."
    },
    {
      category: "security",
      question: "How should I store API keys in my application?",
      answer: "You should never store API keys in client-side code or public repositories. Instead, store them securely on your server and use environment variables or a secure configuration system. For mobile applications, consider using a backend service to make API requests rather than embedding the API key in the app."
    },
    {
      category: "general",
      question: "Do you have client libraries for the API?",
      answer: "Yes, we provide official client libraries for several programming languages, including JavaScript, Python, Ruby, PHP, and Java. These libraries handle authentication, error handling, and other common tasks for you. You can find them in our GitHub repository or install them using your language's package manager."
    },
    {
      category: "general",
      question: "How do I report a bug or request a feature?",
      answer: "If you find a bug or have a feature request, you can contact our support team through the HRConnect dashboard or email api-support@hrconnect.com. Please provide as much detail as possible, including steps to reproduce the issue, expected behavior, and actual behavior."
    },
    {
      category: "general",
      question: "Is there a sandbox environment for testing?",
      answer: "Yes, we provide a sandbox environment for testing your API integration before going to production. The sandbox environment is available at https://api-sandbox.hrconnect.com and uses separate API keys from the production environment. You can generate sandbox API keys from your HRConnect dashboard under Settings > API > Sandbox."
    }
  ]

  const categoryInfo = {
    authentication: { title: "Authentication", icon: Key },
    "rate-limits": { title: "Rate Limits", icon: Clock },
    endpoints: { title: "Endpoints & Parameters", icon: Code },
    errors: { title: "Errors & Troubleshooting", icon: AlertTriangle },
    webhooks: { title: "Webhooks", icon: Zap },
    security: { title: "Security", icon: Shield },
    general: { title: "General Questions", icon: HelpCircle }
  }


  export { faqItems, categoryInfo }