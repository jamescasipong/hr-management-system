
"use server"
import { AttendanceProvider } from '@/context/api-state-session/attendance-context';
import { AuthProvider } from '@/context/api-state-session/authContext';
import { NotificationProvider } from '@/context/api-state-session/notification-context';
import { SideBarProvider } from '@/context/layout/custom-sidebar';
import { SideBar } from '@/app/(dashboard)/components/sidebar';
import { headers } from 'next/headers';
import React from 'react';

export default async function NameLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers();

    const nav = headersList.get("disable-nav");
    const isAdmin = headersList.get("is-admin");
    const authenticated = headersList.get("authenticated");  
    const isDisabled = nav === "true";
    
    return (
      <div>
        <AuthProvider>
              <SideBarProvider>
              <AttendanceProvider>
              <NotificationProvider>
                    {authenticated ? <SideBar isAdmin={isAdmin === "Admin"} isDisabled={isDisabled}>{children}</SideBar> : children}
              </NotificationProvider>
              </AttendanceProvider>
              </SideBarProvider>
        </AuthProvider>
      </div>
    );
  }
  