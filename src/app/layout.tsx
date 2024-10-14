import { SideThemeProvider } from "@/contextComponent/SideDark";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/customComponents/navbar";
import App from "./app";

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
// Import your Navbar component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <App>{children}</App>;
}
