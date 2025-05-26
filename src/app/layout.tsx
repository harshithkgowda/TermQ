import "@/styles/globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { DevtoolsProvider } from 'creatr-devtools';
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};
export const metadata: Metadata = {
  title: {
    default: "Creatr",
    template: "%s | Creatr"
  },
  description: "A modern web application built with Next.js and TypeScript",
  applicationName: "Creatr",
  keywords: ["next.js", "react", "typescript", "web application"],
  authors: [{
    name: "Creatr Team"
  }],
  creator: "Creatr Team",
  publisher: "Creatr Team",
  icons: {
    icon: [{
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Creatr"
  },
  formatDetection: {
    telephone: false
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en" className={`${GeistSans.variable}`} data-unique-id="e5c51507-72ae-4e6f-a61c-2a937417d15c" data-file-name="app/layout.tsx">
      <body data-unique-id="28e37258-cf2b-4399-9e6a-ada4f89bf507" data-file-name="app/layout.tsx">
        <DevtoolsProvider>{children}</DevtoolsProvider>
      </body>
    </html>;
}