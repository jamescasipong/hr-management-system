"use server"
import {cookies} from "next/headers";
import { instanceApi } from "../axios";
import axios from "axios";


instanceApi.interceptors.request.use((config: any) => {
    config.withCredentials = true;

    return config;
}, (error: any) => {

    return Promise.reject(error);
}
);

type ResponseData = {
    success: boolean;
    message: string;
    data: any;
}


export const verify = async (email: string, code: string): Promise<ResponseData> => {
    const token = (await cookies()).toString();

    try {
        const response = await instanceApi.post(
            `user/account/login/verify`,
            { email, code }, // Request body
            {
                headers: {
                    Cookie: token
                }
            }
        );

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
            console.log("axioserror", error.response.data);

            throw error;
        } else {
            console.log("errorany", error);

            throw error;
        }
    }

}

export const sendEmailResetPassword = async (email: string) => {
    const token = (await cookies()).toString();

    const response = await instanceApi.post('user/account/send-reset', { email }, {
        headers: {
            Cookie: token
        }
    });

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