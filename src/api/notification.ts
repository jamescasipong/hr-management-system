import instanceApi from "./auth";


export const fetchMyNotification = async () => {
    const response = await instanceApi.get('notification/my-notifications');
    
    if (response.status !== 200) {
        throw new Error("An error occurred");
    }

    return response.data;
}