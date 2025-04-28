import axios from 'axios'


const url = process.env.NODE_ENV === "production" ? process.env.API_URL : "http://localhost:5075";


const instanceApi = axios.create({
    baseURL: `${url}/api/v1/`,
    responseType: 'json',
    withCredentials: true,
});

export {instanceApi}