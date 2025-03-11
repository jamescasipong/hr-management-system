import { headers } from "next/headers";


const axios = require('axios');

const instanceApi = axios.create({
    baseURL: 'https://localhost:7147/api/v1/',
    responseType: 'json',
    withCredentials: true
});

instanceApi.interceptors.request.use((config: any) => {
    config.withCredentials = true;

    return config;
}, (error: any) => {

    return Promise.reject(error);
}
);



export const login = async (email: string, password: string) => {

    try {
        const response = await instanceApi.post('user/account/login', { email, password });


        if (response.status === 200) {
            const { data } = response;
            // console.log(data);
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
        const response = await instanceApi.post('user/account/logout', {
            withCredentials: true
        });

        
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