"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchMyNotification } from "@/api/notification";
import { useTransition } from "react";



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
}

type NotificationProviderProps = {
    children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isLoading, startTransitioning] = useTransition();

    useEffect(() => {
        const fetchAndUpdate = async () => {
            startTransitioning(async () => {
                const response = await fetchMyNotification();

                setNotifications(response.data);
            });
        };

        fetchAndUpdate();
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, isLoading, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
