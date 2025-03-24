"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchMyNotification, updateNotfication } from "@/lib/api/notification";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";


const NotificationContext = createContext<NotificationProviderType | null>(null);

type NotificationType = {
    employeeId: number;
    notificationId: number;
    isRead: boolean;
    status: string;
    notification: {
        title: string;
        message: string;
        createdAt: string;
        updatedAt: string;
    }
}

type NotificationProviderType = {
    notifications: NotificationType[];
    isLoading: boolean;
    setNotifications: (notifications: NotificationType[]) => void;
    markAsRead: (notifId:number) => Promise<void>;
}

type NotificationProviderProps = {
    children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isLoading, startTransitioning] = useTransition();
    const pathname = usePathname();

    useEffect(() => {
        const fetchAndUpdate = async () => {
            if (pathname !== "/login" && pathname !== "/home"){
                startTransitioning(async () => {
                    const response = await fetchMyNotification();
    
                    try {
                        setNotifications(response.data);
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
            }
        };

        fetchAndUpdate();
    }, []);


    const markAsRead = async (notifId:number) => {
        const response = await updateNotfication(notifId);

        if (response.success){
            toast.success("Notification marked as read");
            return;
        }

        alert("Not working")
    }

    return (
        <NotificationContext.Provider value={{ notifications, isLoading, setNotifications, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
