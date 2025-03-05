import { headers } from "next/headers";


const axios = require('axios');

const instanceApi = axios.create({
    baseURL: 'http://localhost:5075/api/v1/',
    // timeout: 1000,
    withCredentials: true,
    headers: {
        'Authorization': 'X-API-KEY key'
    },
    responseType: 'json',
});



export const login = async (email: string, password: string) => {

    try {
        const response = await instanceApi.post('user/account/login', { email, password });


        if (response.status === 200) {
            const { data } = response;
            console.log(data);
            return data;
        }

        const { data } = response;
        return data;
        
    }
    catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw error;
        }
    }
}

export const logout = async () => {

    try {
        const response = await instanceApi.post('user/account/logout');

        
    }
    catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw error;
        }
    }
}

export default instanceApi;