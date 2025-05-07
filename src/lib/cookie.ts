"use server"
import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode";

export const getSessionState = async () => {
    const cookieStore = (await cookies()).get("at_session");

    const token = cookieStore?.value as string || "";
    const decodedJWT = jwtDecode(token) as { [key: string]: any };
    
    return decodedJWT;
};