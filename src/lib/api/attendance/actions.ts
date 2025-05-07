"use server"

import { callApi } from "@/lib/utils/fetchUtils"

export const myAttendances = async () => {
    return callApi("/attendance", "GET")
} 