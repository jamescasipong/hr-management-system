"use server";
import { cookies } from "next/headers";
const API_BASE_URL = "http://localhost:5075/api/v1";

export const callApi = async (
  endpoint: string,
  method: string = "GET",
  body: any = null
) => {
  const cookie = (await cookies()).toString();

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      // For Next.js to pass cookies in server components
      credentials: "include",
      cache: "no-store",
    };

    if (body && (method === "POST" || method === "PUT")) {
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
        status: error.response?.status || error.status,
      },
      message: `Failed to call ${endpoint}: ${error.message}`,
      data: null,
    };
  }
};
