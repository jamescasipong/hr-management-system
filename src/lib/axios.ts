import axios from 'axios'
const instanceApi = axios.create({
    baseURL: 'https://localhost:7147/api/v1/',
    responseType: 'json',

    withCredentials: true,
});

export {instanceApi}