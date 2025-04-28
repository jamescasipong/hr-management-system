"use server"
import {cookies} from "next/headers";
import instanceApi from "./auth";


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

    const response = await instanceApi.put(`notification/mark-as-read/${notificationId}`, {
        headers: {
            Cookie: cookie
        }
    });

    if (response.status !== 200){
        throw new Error("An error occourred");
    }

    return response.data;
}