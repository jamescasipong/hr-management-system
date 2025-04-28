import axios from 'axios';

// Ensure that API_URL is properly handled in production, otherwise fall back to a default
const url = process.env.NODE_ENV === "development"
    ? "http://localhost:5075"
    : process.env.API_URL ?? ""; // Default to an empty string if API_URL is undefined

// Ensure that the baseURL is valid (i.e., not an empty string)
if (!url) {
    throw new Error("API URL is not defined for production!");
}

export const instanceApi = axios.create({
    baseURL: `${url}/api/v1/`,
    responseType: 'json',
    withCredentials: true, // Needed to send/receive cookies
});