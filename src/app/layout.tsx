import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers();

  const newToken = headersList.get("new-token");

  if (newToken == "true") {
    redirect("/dashboard")
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
          {/* Add the Google Analytics script */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-HW2R20MB46`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-HW2R20MB46');
              `,
            }}
          ></script>
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          themes={["light", "dark", "system"]}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Toaster />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}