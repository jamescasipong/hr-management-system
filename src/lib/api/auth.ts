

const axios = require('axios');

const instanceApi = axios.create({
    baseURL: 'https://localhost:7147/api/v1/',
    responseType: 'json',
});

// instanceApi.interceptors.response.use(function (response: any) {
//     // Optional: Do something with response data
//     return response;
//   }, function (error:any) {

//     return Promise.reject(error);
//   });

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

            console.log("data", data);
            // console.log(data);
            return data;
        }

        console.log(response.status)

        const { data } = response;
        return data;
        
    }
    catch (error: any) {
        console.log(error.response.status)

        console.log("error", error);
        if (axios.isAxiosError(error) && error.response) {
            throw error;
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

type ResponseData = {
    success: boolean;
    message: string;
    data: any;
}


export const verify = async (email: string, code: string): Promise<ResponseData> => {
    try {
        const response = await instanceApi.post(
            `user/account/login/verify`,
            { email, code }, // Request body
        );

        if (response.status === 200) {
            const { data }: ResponseData = response;

            console.log("data", data);
            // console.log(data);
            return data;
        }

        console.log(response.status)

        const { data }: ResponseData = response;
        return data;
        
    }
    catch (error: any) {
        console.log(error.response.status)

        console.log("error", error);
        if (axios.isAxiosError(error) && error.response) {
            console.log("axioserror", error.response.data);

            return error.response.data;
        } else {
            console.log("errorany", error);

            throw error;
        }
    }

}

export const sendEmailResetPassword = async (email: string) => {

    const response = await instanceApi.post('user/account/send-reset', { email });

    console.log("response", response)
    try {


        
        if (response.status === 200) {
            
            return response.data;
        }

        return response.data;
        
    }
    catch (error: any) {
        throw error;
    }
}

export default instanceApi;