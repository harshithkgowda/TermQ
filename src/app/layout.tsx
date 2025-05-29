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
    default: "TermQ",
    template: "%s | TermQ"
  },
  description: "Catches Legal Red flags Before They Catch You",
  applicationName: "Creatr",
  keywords: ["next.js", "react", "typescript", "web application"],
  authors: [{
    name: "Creatr Team"
  }],
  creator: "Creatr Team",
  publisher: "Creatr Team",
  icons: {
    icon: [{
      url: "/termq.jpg",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/termq.jpg",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/termq.jpg",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/termq.jpg",
      sizes: "180x180",
      type: "image/png"
    }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TermQ"
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
  return <html lang="en" className={`${GeistSans.variable}`} data-unique-id="98720b65-8c22-43df-8912-8b781b71f536" data-file-name="app/layout.tsx">
      <body data-unique-id="4129eed6-f363-4a79-8fbb-e99fd304081d" data-file-name="app/layout.tsx">
        <DevtoolsProvider>{children}</DevtoolsProvider>
      </body>
    </html>;
}