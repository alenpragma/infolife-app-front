import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "EDULIFE IT Institute",
  description: "Educational Progressive Web App for EDULIFE IT Institute - শিক্ষামূলক প্রগ্রেসিভ ওয়েব অ্যাপ",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EDULIFE",
  },
  icons: {
    icon: "/edulife-logo.png",
    apple: "/edulife-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EDULIFE" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="EDULIFE" />
        <link rel="apple-touch-icon" href="/edulife-logo.png" />
        <link rel="icon" type="image/png" href="/edulife-logo.png" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
