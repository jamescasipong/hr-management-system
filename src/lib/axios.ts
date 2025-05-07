import axios from 'axios';

// Ensure that API_URL is properly handled in production, otherwise fall back to a default
const url = process.env.NODE_ENV === "development"
    ? "http://localhost:5075"
    : process.env.NEXT_PUBLIC_API_URL ?? ""; // Default to an empty string if API_URL is undefined

// Ensure that the baseURL is valid (i.e., not an empty string)
if (!url) {
    throw new Error("API URL is not defined for production!");
}

export const instanceApi = axios.create({
    baseURL: `${url}/api/v1`,
    responseType: 'json',
    withCredentials: true, // Needed to send/receive cookies
});

const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5075/api/v1" : `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const callApiClient = async (endpoint: string, method: string = 'GET', body: any = null) => {
    
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include',
        },
        // For Next.js to pass cookies in server components
        credentials: 'include',
        cache: 'no-store',
      };
      
      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }
      
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Calling API: ${method} ${url}`);
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`API response from ${endpoint}:`, data);
      return data;
    } catch (error: any) {
      console.error(`Error in API call to ${endpoint}:`, error.message);
      return {
        success: false,
        error: {
          message: error.message,
          status: error.response?.status || error.status
        },
        message: `Failed to call ${endpoint}: ${error.message}`,
        data: null
      };
    }
  };