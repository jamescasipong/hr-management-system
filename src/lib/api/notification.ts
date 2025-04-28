"use server"
import {cookies} from "next/headers";
import {instanceApi} from "../axios";


export const fetchMyNotification = async () => {
    const cookie = (await cookies()).toString();
   try {
       const response = await instanceApi.get('notification/my-notifications', {
           headers: {
               Cookie: cookie
           }
       });

       return response.data
   }
   catch (error: any) {
       return {
           error: error,
           message: error.message
       }
   }

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