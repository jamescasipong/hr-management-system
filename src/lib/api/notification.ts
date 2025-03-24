import instanceApi from "./auth";


export const fetchMyNotification = async () => {
    const response = await instanceApi.get('notification/my-notifications');
    
    if (response.status !== 200) {
        throw new Error("An error occurred");
    }

    return response.data;
}

export const updateNotfication = async (notificationId: number) => {
    const response = await instanceApi.put(`notification/mark-as-read/${notificationId}`);

    if (response.status !== 200){
        throw new Error("An error occourred");
    }

    return response.data;
}