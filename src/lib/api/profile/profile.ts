const instanceApi = require('../auth');
import axios from 'axios';

export const getDashboardData = async () => {
    try {
        const response = await instanceApi.get('employee/me');

        if (response.status === 200) {
            const { data } = response;
            return data;
        }

        const { data } = response;
        return data;
    }
    catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw error;
        }
    }
}