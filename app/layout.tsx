import HomeProvider from "@/components/provider/HomeProvider";
import type { Metadata } from "next";
import type React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDULIFE IT Institute",
  description:
    "Educational Progressive Web App for EDULIFE IT Institute - শিক্ষামূলক প্রগ্রেসিভ ওয়েব অ্যাপ",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EDULIFE",
  },
  icons: {
    icon: "/edulife-logo.png",
    apple: "/edulife-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans antialiased">
        <HomeProvider>{children}</HomeProvider>
        <ToastContainer position="top-right" autoClose={100000} />
      </body>
    </html>
  );
}
