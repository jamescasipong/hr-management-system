"use server"
import {cookies} from "next/headers";
import {instanceApi} from "../axios";


export const fetchMyNotification = async () => {
    const cookie = (await cookies()).toString();
    const response = await instanceApi.get('notification/my-notifications', {
        headers: {
            Cookie: cookie
        }
    });
    
    if (response.status !== 200) {
        throw new Error("An error occurred");
    }

    return response.data;
}

export const updateNotfication = async (notificationId: number) => {
    const cookie = (await cookies()).toString();

    try {


    const response = await instanceApi.put(`notification/mark-as-read/${notificationId}`, {
        headers: {
            Cookie: cookie
        }
    });

    return response.data;
    }
    catch (error: any) {
        return {
            error: error, message: error.message
        }
    }
}