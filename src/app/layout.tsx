import { SideThemeProvider } from "@/contextComponent/SideDark";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Navbar from "../customComponents/navbar";
import { headers } from "next/headers";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

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
  const headersList = headers();

  const nav = headersList.get("disable-nav");
  const isAdmin = headersList.get("is-admin");

  const isDisabled = nav === "true";


  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SideThemeProvider>

            <AuthProvider>
              <Navbar isDisabled={isDisabled} isAdmin={isAdmin === 'Admin'}/>
              {children}
            </AuthProvider>
          </SideThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}