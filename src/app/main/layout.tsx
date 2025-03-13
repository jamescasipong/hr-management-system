import { AttendanceProvider } from '@/context/attendance-context';
import { AuthProvider } from '@/context/authContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { Navbar } from '@/customComponents/navbar';
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
              <AttendanceProvider>
              <NotificationProvider>
                    {authenticated ? <Navbar isAdmin={isAdmin === "Admin"} isDisabled={isDisabled}>{children}</Navbar> : children}
              </NotificationProvider>
              </AttendanceProvider>
        </AuthProvider>
      </div>
    );
  }
  