import Navbar from "@/app/customComponents/navbar"; // Import your Navbar component
import { AppProvider } from "@/contextComponent/SideDark";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HRConnect",
  description:
    "A website for employees to clock in/out, check payroll, attendances, performances, and file leaves. HRConnect simplifies employee management with features like payroll tracking, performance reviews, leave requests, and attendance monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <AppProvider>

        {/* Navbar Component */}
        <Navbar />

        {/* Page content */}
        {children}
        </AppProvider>
      </body>
    </html>
  );
}
