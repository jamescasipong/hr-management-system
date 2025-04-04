import axios from "axios";
import instanceApi from "../auth";


export const createDepartment = async (deptName: string, description: string) => {
    try {
        const response = await instanceApi.post(
            `department`,
            { deptName, description }, // Request body
        );

        if (response.status === 200) {
            const { data } = response;

            console.log("data", data);
            // console.log(data);
            return data;
        }
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

export const getDepartment = async () => {
    try {
        const response = await instanceApi.get(
            `department`,
        );

        if (response.status === 200) {
            const { data } = response;

            console.log("data", data);
            // console.log(data);
            return data;
        }
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