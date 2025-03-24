// apiConfig.ts
export const API_CONFIG = {
    BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
    API_KEY: process.env.API_KEY || 'default-api-key', // You can use a default API key, but it's best to rely on env variables
    TIMEOUT: 5000, // Timeout duration for API calls
};
