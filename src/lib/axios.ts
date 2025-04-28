import axios from 'axios'
import * as https from "node:https";
const instanceApi = axios.create({
    baseURL: 'http://localhost:5075/api/v1/',
    responseType: 'json',
    withCredentials: true,
});

export {instanceApi}