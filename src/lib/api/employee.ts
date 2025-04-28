import axios from "axios";
import {instanceApi} from "../axios";


const getEmployee = async () => {
    try {
        const response = await instanceApi.get(
            `employee`,
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

        return {
            error: error.response.data,
            message: error.message,
        }
    }
}


export { getEmployee }