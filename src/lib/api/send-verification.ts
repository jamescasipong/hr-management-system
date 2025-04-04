import axios from "axios";
import instanceApi from "./auth";

export const resetPassword = async (token: string, password: string) => {
    const response = await instanceApi.post("user/account/reset-password", { password }, {
        params: {
            token
        }
    })

    console.log("response", response)
    try {
        if (response.status === 200) {
            return true
        }

        return false
    }
    catch(err){
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            return false
        }
        throw new Error("An unexpected error occurred. Please try again.")
    }
}

export const resetSessionExist =  async (token: string) => {
    const response = await instanceApi.get("user/account/reset-password", {
        params: {
            token
        }
    })

    console.log(response)

    try {

    

        if (response.status === 200) {
            return true
        }

        return false

    }
    catch(err){
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            throw false
        }
        throw false
    }
}